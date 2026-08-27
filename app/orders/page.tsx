"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { suppliers as supplierDirectory, type Supplier } from "../data/suppliers";
import { resolveActiveWorkspace } from "../lib/clientWorkspace";
import {
  defaultOrganisationSettings,
  getRegularOrderItems,
  ORGANISATION_SETTINGS_KEY,
  orderEmailBody,
  type OrganisationSettings,
  type PurchaseOrder,
  type PurchaseOrderLine,
} from "../lib/purchasing";
import { supabase } from "../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceState,
  readWorkspaceStates,
} from "../lib/workspaceState";

type Relation<T> = T | T[] | null;
type OrderStep = "start" | "order" | "review" | "receive";
type SupplierTab = "catalogue" | "regular" | "history";
const REGULAR_ORDER_PRODUCTS_KEY = "regularOrderProductIds";

type ProductRow = {
  id: string;
  supplier_product_name: string;
  supplier_product_code: string | null;
  price_unit: string | null;
  latest_price: number | string | null;
  preferred: boolean | null;
  supplier: Relation<{ id: string; name: string }>;
  ingredient: Relation<{ id: string; name: string }>;
};

type Product = {
  id: string;
  supplier: string;
  ingredient: string;
  supplierProduct: string;
  sku: string;
  unit: string;
  price: number | null;
  preferred: boolean;
};

type StockItem = {
  name: string;
  quantity: number | null;
  unit: string;
};

function first<T>(value: Relation<T>): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function supplierInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const supplierAliases: Record<string, string> = {
  "k and d meats": "Crazy Dan's House of Meat",
  "k d meats": "Crazy Dan's House of Meat",
  "crazy dan": "Crazy Dan's House of Meat",
  "crazy dans": "Crazy Dan's House of Meat",
  "fin flounder": "Fin and Flounder",
  "fin and flounder": "Fin and Flounder",
  "james knight": "James Knight of Mayfair",
  "woods fine foods": "Woods Foodservice",
  "woods foodservice": "Woods Foodservice",
  "spitalfields fruit veg": "Spitalfields Fruit & Veg",
};

function supplierProfile(name: string): Supplier | null {
  const direct = supplierDirectory[name];
  if (direct) return direct;
  const key = normalise(name);
  const alias = supplierAliases[key];
  if (alias && supplierDirectory[alias]) return supplierDirectory[alias];
  return (
    Object.values(supplierDirectory).find((supplier) => normalise(supplier.name) === key) ??
    null
  );
}

function SupplierLogo({ supplier, size = "normal" }: { supplier: string; size?: "normal" | "small" }) {
  const profile = supplierProfile(supplier);
  const pixels = size === "small" ? 32 : 42;
  return (
    <div className={`supplier-choice-avatar ${size === "small" ? "supplier-choice-avatar-small" : ""}`}>
      {profile?.logo ? (
        <Image src={profile.logo} alt="" width={pixels} height={pixels} className="supplier-logo" />
      ) : (
        <span>{supplierInitials(supplier)}</span>
      )}
    </div>
  );
}

function quantityOptions(unit: string, current: number) {
  const key = normalise(unit);
  const allowsHalf = ["kg", "kilogram", "kilograms", "l", "ltr", "litre", "litres"].includes(key);
  const values = new Set<number>([0]);
  if (allowsHalf) {
    for (let value = 0.5; value <= 10; value += 0.5) values.add(value);
  } else {
    for (let value = 1; value <= 20; value += 1) values.add(value);
  }
  [12, 15, 20, 25, 30, 40, 50].forEach((value) => values.add(value));
  if (current > 0) values.add(current);
  return Array.from(values).sort((a, b) => a - b);
}

async function accessToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Your session has expired. Sign in again.");
  return session.access_token;
}

export default function OrdersPage() {
  const [step, setStep] = useState<OrderStep>("start");
  const [supplierTab, setSupplierTab] = useState<SupplierTab>("catalogue");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [regularProductIds, setRegularProductIds] = useState<string[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [settings, setSettings] = useState<OrganisationSettings>(defaultOrganisationSettings);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [receivingOrderId, setReceivingOrderId] = useState("");
  const [receivedQuantities, setReceivedQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const activeWorkspace = await resolveActiveWorkspace();
        if (!activeWorkspace) throw new Error("No active restaurant workspace");

        const [productResult, workspace] = await Promise.all([
          supabase
            .from("supplier_products")
            .select(`
              id,
              supplier_product_name,
              supplier_product_code,
              price_unit,
              latest_price,
              preferred,
              supplier:suppliers(id,name),
              ingredient:ingredients(id,name)
            `)
            .eq("organisation_id", activeWorkspace.organisationId)
            .order("preferred", { ascending: false })
            .order("supplier_product_name", { ascending: true })
            .limit(1000),
          readWorkspaceStates(["purchaseOrders", "currentStockTake", REGULAR_ORDER_PRODUCTS_KEY, ORGANISATION_SETTINGS_KEY]),
        ]);

        if (productResult.error) throw productResult.error;

        const liveProducts = ((productResult.data ?? []) as unknown as ProductRow[])
          .flatMap((row) => {
            const supplierRow = first(row.supplier);
            const ingredientRow = first(row.ingredient);
            if (!supplierRow) return [];
            return [
              {
                id: row.id,
                supplier: supplierRow.name,
                ingredient: ingredientRow?.name ?? row.supplier_product_name,
                supplierProduct: row.supplier_product_name,
                sku: row.supplier_product_code ?? "",
                unit: row.price_unit ?? "each",
                price:
                  row.latest_price === null || row.latest_price === undefined
                    ? null
                    : Number(row.latest_price),
                preferred: Boolean(row.preferred),
              },
            ];
          })
          .sort(
            (a, b) =>
              a.supplier.localeCompare(b.supplier) ||
              Number(b.preferred) - Number(a.preferred) ||
              a.ingredient.localeCompare(b.ingredient)
          );

        setProducts(liveProducts);
        setOrders((workspace.get("purchaseOrders") ?? []) as PurchaseOrder[]);
        setRegularProductIds((workspace.get(REGULAR_ORDER_PRODUCTS_KEY) ?? []) as string[]);
        const stockTake = (workspace.get("currentStockTake") ?? { items: [] }) as { items?: StockItem[] };
        setStock(stockTake.items ?? []);
        setSettings(
          (workspace.get(ORGANISATION_SETTINGS_KEY) ?? defaultOrganisationSettings) as OrganisationSettings
        );
      } catch (error: any) {
        setMessage(error?.message || "Could not load ordering data");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const supplierNames = useMemo(
    () => Array.from(new Set(products.map((product) => product.supplier))).sort(),
    [products]
  );

  const supplierProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter(
      (product) =>
        product.supplier === selectedSupplier &&
        (!query ||
          product.ingredient.toLowerCase().includes(query) ||
          product.supplierProduct.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query))
    );
  }, [products, selectedSupplier, search]);

  const selectedLines = useMemo(() => {
    return products.flatMap((product) => {
      const orderQty = Number(quantities[product.id] ?? 0);
      if (product.supplier !== selectedSupplier || orderQty <= 0) return [];
      const stockItem = stock.find((item) => normalise(item.name) === normalise(product.ingredient));
      const line: PurchaseOrderLine = {
        id: product.id,
        ingredient: product.ingredient,
        supplier: product.supplier,
        supplierProduct: product.supplierProduct,
        stockQty: Number(stockItem?.quantity ?? 0),
        stockUnit: stockItem?.unit ?? product.unit,
        orderQty,
        orderUnit: product.unit,
        unitPrice: product.price,
        suggestedQty: 0,
        sku: product.sku || undefined,
      };
      return [line];
    });
  }, [products, selectedSupplier, quantities, stock]);

  const estimatedTotal = selectedLines.reduce(
    (sum, line) => sum + (line.unitPrice === null ? 0 : line.orderQty * line.unitPrice),
    0
  );

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10),
    [orders]
  );

  const supplierOrderHistory = useMemo(
    () =>
      orders
        .filter((order) => order.supplier === selectedSupplier)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [orders, selectedSupplier]
  );

  const regularOrderItems = useMemo(() => {
    const learned = getRegularOrderItems(orders, selectedSupplier);
    const learnedProducts = new Set(
      learned.flatMap((item) => [
        normalise(item.ingredient),
        normalise(item.supplierProduct),
      ])
    );
    const saved = products
      .filter(
        (product) =>
          product.supplier === selectedSupplier &&
          regularProductIds.includes(product.id) &&
          !learnedProducts.has(normalise(product.ingredient)) &&
          !learnedProducts.has(normalise(product.supplierProduct))
      )
      .map((product) => ({
        lineId: product.id,
        ingredient: product.ingredient,
        supplierProduct: product.supplierProduct,
        orderUnit: product.unit,
        averageQuantity: 1,
        lastOrderedAt: "",
        averageIntervalDays: null,
        orderCount: 0,
      }));
    return [...learned, ...saved];
  }, [orders, products, regularProductIds, selectedSupplier]);

  const receivingOrder = orders.find((order) => order.id === receivingOrderId) ?? null;

  async function persistOrders(next: PurchaseOrder[]) {
    await persistWorkspaceState("purchaseOrders", JSON.stringify(next));
    setOrders(next);
  }

  function chooseSupplier(supplier: string) {
    setSelectedSupplier(supplier);
    setSearch("");
    setQuantities({});
    setSupplierTab("catalogue");
    setStep("order");
    setMessage("");
  }

  function setQuantity(productId: string, quantity: number) {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(0, Math.round(quantity * 100) / 100),
    }));
  }

  function changeQuantity(product: Product, direction: -1 | 1) {
    const current = Number(quantities[product.id] ?? 0);
    const increment = ["kg", "kilogram", "kilograms", "l", "ltr", "litre", "litres"].includes(
      normalise(product.unit)
    )
      ? 0.5
      : 1;
    setQuantity(product.id, current + increment * direction);
  }

  function previousAverage(product: Product) {
    const values = orders
      .filter((order) => order.supplier === product.supplier && order.status !== "Draft")
      .flatMap((order) =>
        order.lines
          .filter(
            (line) =>
              line.id === product.id ||
              normalise(line.ingredient) === normalise(product.ingredient) ||
              normalise(line.supplierProduct) === normalise(product.supplierProduct)
          )
          .map((line) => Number(line.orderQty || 0))
      )
      .filter((value) => value > 0);
    if (!values.length) return null;
    return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
  }

  function applyPreviousOrder(order: PurchaseOrder) {
    setSelectedSupplier(order.supplier);
    const next: Record<string, number> = {};
    products
      .filter((product) => product.supplier === order.supplier)
      .forEach((product) => {
        const previous = order.lines.find(
          (line) =>
            line.id === product.id ||
            normalise(line.ingredient) === normalise(product.ingredient) ||
            normalise(line.supplierProduct) === normalise(product.supplierProduct)
        );
        if (previous) next[product.id] = previous.orderQty;
      });
    setQuantities(next);
    setSearch("");
    setSupplierTab("catalogue");
    setStep("order");
  }

  function applyRegularItems() {
    const next = { ...quantities };
    products
      .filter((product) => product.supplier === selectedSupplier)
      .forEach((product) => {
        const regular = regularOrderItems.find(
          (item) =>
            item.lineId === product.id ||
            normalise(item.ingredient) === normalise(product.ingredient) ||
            normalise(item.supplierProduct) === normalise(product.supplierProduct)
        );
        if (regular) next[product.id] = regular.averageQuantity;
      });
    setQuantities(next);
    setSupplierTab("catalogue");
  }

  async function openWhatsApp(order: PurchaseOrder, profile: Supplier) {
    const currentSettings = await readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      settings
    );
    const body = orderEmailBody(order, currentSettings.name);
    window.location.href = `https://wa.me/${String(profile.whatsapp || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(body)}`;
    setMessage("WhatsApp opened. When the supplier message has gone, use Mark sent on the draft.");
  }

  async function markSent(order: PurchaseOrder, sentTo?: string, copiedTo?: string[]) {
    const now = new Date().toISOString();
    const base = orders.some((item) => item.id === order.id) ? orders : [order, ...orders];
    const next = base.map((item) =>
      item.id === order.id
        ? { ...item, status: "Sent" as const, sentAt: item.sentAt ?? now, sentTo: sentTo ?? item.sentTo, copiedTo: copiedTo ?? item.copiedTo }
        : item
    );
    await persistOrders(next);
  }

  async function sendOrder(order: PurchaseOrder) {
    if (sending) return;
    setSending(true);
    setMessage("");
    try {
      const currentSettings = await readWorkspaceState<OrganisationSettings>(
        ORGANISATION_SETTINGS_KEY,
        settings
      );
      const profile = supplierProfile(order.supplier);
      const prefersWhatsApp = Boolean(
        profile?.whatsapp && String(profile.orderMethod || "").toLowerCase().includes("whatsapp")
      );

      if (prefersWhatsApp && profile) {
        await openWhatsApp(order, profile);
        return;
      }

      const token = await accessToken();
      const response = await fetch("/api/orders/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
          settings: currentSettings,
          supplierEmail: profile?.email || order.supplierEmail || "",
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        if (payload.needsSupplierEmail && profile?.whatsapp) {
          await openWhatsApp(order, profile);
          return;
        }
        throw new Error(payload.error || "The purchase order could not be sent.");
      }

      await markSent(order, payload.sentTo, payload.copiedTo);
      setMessage(`${order.id} sent directly to ${payload.sentTo}.`);
    } catch (error: any) {
      setMessage(`Order kept as Draft. ${error?.message || "Sending failed."}`);
    } finally {
      setSending(false);
    }
  }

  async function createOrder() {
    if (!selectedSupplier || selectedLines.length === 0) {
      setMessage("Add at least one item first.");
      return;
    }
    const currentSettings = await readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      settings
    );
    const profile = supplierProfile(selectedSupplier);
    const order: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      supplier: selectedSupplier,
      supplierEmail: profile?.email,
      createdAt: new Date().toISOString(),
      status: "Draft",
      lines: selectedLines,
      estimatedTotal,
      notes: currentSettings.includeOrderNotes ? notes.trim() || undefined : undefined,
    };

    await persistOrders([order, ...orders]);
    setQuantities({});
    setNotes("");
    setStep("start");

    if (currentSettings.sendSupplierEmail === false) {
      setMessage(`${order.id} saved as Draft.`);
      return;
    }
    await sendOrder(order);
  }

  async function markDraftSent(order: PurchaseOrder) {
    await markSent(order);
    setMessage(`${order.id} marked Sent.`);
  }

  function startReceive(order: PurchaseOrder) {
    setReceivingOrderId(order.id);
    setReceivedQuantities(
      Object.fromEntries(order.lines.map((line) => [line.id, Number(line.receivedQty ?? line.orderQty)]))
    );
    setStep("receive");
    setMessage("");
  }

  async function confirmReceive() {
    if (!receivingOrder) return;
    const now = new Date().toISOString();
    const lines = receivingOrder.lines.map((line) => ({
      ...line,
      receivedQty: Number(receivedQuantities[line.id] ?? line.orderQty),
    }));
    const receivedTotal = lines.reduce(
      (sum, line) => sum + (line.unitPrice === null ? 0 : Number(line.receivedQty || 0) * line.unitPrice),
      0
    );
    const next = orders.map((order) =>
      order.id === receivingOrder.id
        ? { ...order, status: "Received" as const, receivedAt: now, receivedTotal, lines }
        : order
    );
    await persistOrders(next);
    setReceivingOrderId("");
    setReceivedQuantities({});
    setStep("start");
    setMessage(`${receivingOrder.id} received and checked against the order.`);
  }

  async function completeOrder(order: PurchaseOrder) {
    const next = orders.map((item) =>
      item.id === order.id
        ? { ...item, status: "Completed" as const, completedAt: new Date().toISOString() }
        : item
    );
    await persistOrders(next);
    setMessage(`${order.id} completed.`);
  }

  return (
    <div className="page quick-order-page chef-orders-page">
      {message && <div className="notice">{message}</div>}

      {step === "start" && (
        <>
          <header className="topbar">
            <div>
              <p className="eyebrow">Purchasing</p>
              <h1>Orders</h1>
              <p className="page-description">Choose a supplier, tap quantities and send the PO from Kitchen Insights.</p>
            </div>
          </header>

          <section className="panel quick-order-start">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">New order</p>
                <h2>Who are you ordering from?</h2>
              </div>
            </div>
            {loading ? (
              <div className="empty-table-message">Loading suppliers…</div>
            ) : supplierNames.length === 0 ? (
              <div className="empty-table-message">No supplier products yet. Upload an invoice first.</div>
            ) : (
              <div className="supplier-choice-grid">
                {supplierNames.map((supplier) => {
                  const count = products.filter((product) => product.supplier === supplier).length;
                  const profile = supplierProfile(supplier);
                  return (
                    <button type="button" className="supplier-choice-card" key={supplier} onClick={() => chooseSupplier(supplier)}>
                      <SupplierLogo supplier={supplier} />
                      <div className="supplier-choice-copy">
                        <strong>{supplier}</strong>
                        <span>{count} {count === 1 ? "product" : "products"}</span>
                        {(profile?.email || profile?.orderMethod) && (
                          <small>{profile?.orderMethod ?? "Email"}{profile?.email ? ` · ${profile.email}` : ""}</small>
                        )}
                      </div>
                      <span className="supplier-choice-arrow">→</span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Recent orders</p>
                <h2>Latest purchasing</h2>
              </div>
            </div>
            <div className="chef-order-history">
              {recentOrders.length === 0 ? (
                <div className="empty-table-message">No purchase orders yet.</div>
              ) : (
                recentOrders.map((order) => (
                  <article className="chef-order-history-card" key={order.id}>
                    <div className="chef-order-meta">
                      <SupplierLogo supplier={order.supplier} size="small" />
                      <div>
                        <strong>{order.supplier}</strong>
                        <span>{order.id} · {formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div>
                      <strong>{money(order.receivedTotal ?? order.estimatedTotal)}</strong>
                      <span>{order.lines.length} items · {order.status}</span>
                    </div>
                    <div className="chef-order-actions">
                      <button type="button" className="secondary-inline-button" onClick={() => applyPreviousOrder(order)}>Repeat</button>
                      {order.status === "Draft" && (
                        <>
                          <button type="button" className="primary-button" disabled={sending} onClick={() => void sendOrder(order)}>
                            {sending ? "Sending…" : "Send now"}
                          </button>
                          {supplierProfile(order.supplier)?.whatsapp && (
                            <button type="button" className="secondary-inline-button" onClick={() => void markDraftSent(order)}>Mark sent</button>
                          )}
                        </>
                      )}
                      {order.status === "Sent" && (
                        <button type="button" className="primary-button" onClick={() => startReceive(order)}>Receive</button>
                      )}
                      {order.status === "Received" && (
                        <button type="button" className="secondary-inline-button" onClick={() => void completeOrder(order)}>Complete</button>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </>
      )}

      {step === "order" && (
        <>
          <header className="quick-order-header">
            <div>
              <button className="quick-order-back" type="button" onClick={() => setStep("start")}>← Orders</button>
              <div className="quick-order-supplier-title">
                <SupplierLogo supplier={selectedSupplier} />
                <div>
                  <p className="eyebrow">New order</p>
                  <h1>{selectedSupplier}</h1>
                  <p className="page-description">Tap − / + or choose a quantity.</p>
                </div>
              </div>
            </div>
            <div className="quick-order-header-total">
              <span>Estimated order</span>
              <strong>{money(estimatedTotal)}</strong>
              <span>{selectedLines.length} items</span>
            </div>
          </header>

          <section className="quick-order-toolbar">
            <div className="ingredient-search">
              <input type="search" placeholder="Search product or SKU…" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            <button className="cancel-button" type="button" onClick={() => setQuantities({})}>Clear</button>
            {regularOrderItems.length > 0 && (
              <button className="secondary-inline-button" type="button" onClick={applyRegularItems}>Add regulars</button>
            )}
          </section>

          <nav className="purchasing-tabs" aria-label="Supplier order views">
            {([
              ["catalogue", `Order (${supplierProducts.length})`],
              ["regular", `Regular (${regularOrderItems.length})`],
              ["history", `History (${supplierOrderHistory.length})`],
            ] as const).map(([tab, label]) => (
              <button type="button" key={tab} className={supplierTab === tab ? "purchasing-tab-active" : ""} onClick={() => setSupplierTab(tab)}>
                {label}
              </button>
            ))}
          </nav>

          {supplierTab === "catalogue" && (
            <section className="panel quick-order-panel">
              <div className="quick-order-column-headings"><span>Product</span><span>In stock</span><span>Order</span></div>
              <div className="quick-order-lines">
                {supplierProducts.map((product) => {
                  const stockItem = stock.find((item) => normalise(item.name) === normalise(product.ingredient));
                  const currentQty = Number(quantities[product.id] ?? 0);
                  const average = previousAverage(product);
                  return (
                    <article className={`quick-order-line ${currentQty > 0 ? "quick-order-line-active" : ""}`} key={product.id}>
                      <div className="quick-order-product">
                        <div className="quick-order-product-title">
                          <strong>{product.ingredient}</strong>
                          {product.preferred && <span className="quick-order-sku">Preferred</span>}
                          {product.sku && <span className="quick-order-sku">SKU {product.sku}</span>}
                        </div>
                        {product.supplierProduct !== product.ingredient && <span>{product.supplierProduct}</span>}
                        <span className="quick-order-price-note">{product.price === null ? "Price unavailable" : `${money(product.price)}/${product.unit}`}</span>
                        {average !== null && (
                          <button type="button" className="quick-suggestion" onClick={() => setQuantity(product.id, average)}>
                            Usual {average} {product.unit}
                          </button>
                        )}
                      </div>
                      <div className="quick-order-stock"><strong>{stockItem?.quantity ?? "—"}</strong><span>{stockItem?.unit ?? ""}</span></div>
                      <div className="quick-order-quantity">
                        <button type="button" onClick={() => changeQuantity(product, -1)} aria-label={`Decrease ${product.ingredient}`}>−</button>
                        <select value={currentQty} onChange={(event) => setQuantity(product.id, Number(event.target.value))} aria-label={`Order quantity for ${product.ingredient}`}>
                          {quantityOptions(product.unit, currentQty).map((value) => <option key={value} value={value}>{value}</option>)}
                        </select>
                        <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Increase ${product.ingredient}`}>+</button>
                        <span>{product.unit}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {supplierTab === "regular" && (
            <section className="panel purchasing-list-panel">
              <div className="panel-header"><div><p className="panel-kicker">Saved regulars and order history</p><h2>Regularly ordered</h2></div></div>
              {regularOrderItems.length === 0 ? (
                <div className="empty-table-message">Regular items appear after orders have been sent.</div>
              ) : regularOrderItems.map((item) => (
                <article className="regular-order-row" key={item.lineId}>
                  <div><strong>{item.ingredient}</strong><span>{item.supplierProduct}</span></div>
                  <span>{item.lastOrderedAt ? `Last ${formatShortDate(item.lastOrderedAt)}` : "Saved as a regular item"}</span>
                  <span>{item.orderCount === 0 ? "Starting quantity" : item.averageIntervalDays ? `Every ${item.averageIntervalDays} days` : "Ordered once"}</span>
                  <strong>{item.averageQuantity} {item.orderUnit}</strong>
                </article>
              ))}
            </section>
          )}

          {supplierTab === "history" && (
            <section className="panel purchasing-list-panel">
              <div className="panel-header"><div><p className="panel-kicker">Audit trail</p><h2>Order history</h2></div></div>
              {supplierOrderHistory.length === 0 ? <div className="empty-table-message">No orders for this supplier yet.</div> : supplierOrderHistory.map((order) => (
                <article className="order-history-card" key={order.id}>
                  <div><strong>{order.id}</strong><span>{formatDate(order.sentAt ?? order.createdAt)}</span></div>
                  <span>{order.lines.length} items</span>
                  <strong>{money(order.estimatedTotal)}</strong>
                  <span className={`status-badge ${order.status === "Draft" ? "" : "status-approved"}`}>{order.status}</span>
                  <button className="secondary-inline-button" type="button" onClick={() => applyPreviousOrder(order)}>Repeat order</button>
                </article>
              ))}
            </section>
          )}

          <div className="quick-order-footer">
            <div><span>{selectedLines.length} items</span><strong>{money(estimatedTotal)}</strong></div>
            <button type="button" className="primary-button quick-review-button" disabled={selectedLines.length === 0} onClick={() => setStep("review")}>Review order →</button>
          </div>
        </>
      )}

      {step === "review" && (
        <div className="order-review-page">
          <header className="quick-order-header order-review-header">
            <div>
              <button className="quick-order-back" type="button" onClick={() => setStep("order")}>← Edit order</button>
              <div className="quick-order-supplier-title">
                <SupplierLogo supplier={selectedSupplier} />
                <div><p className="eyebrow">Review</p><h1>{selectedSupplier}</h1><p className="page-description">Check quantities, then send the PO.</p></div>
              </div>
            </div>
            <div className="quick-order-header-total"><span>Estimated total</span><strong>{money(estimatedTotal)}</strong><span>{selectedLines.length} items</span></div>
          </header>

          <section className="panel order-review-card">
            <div className="panel-header">
              <div><p className="panel-kicker">Purchase order</p><h2>Order summary</h2></div>
              <div className="order-review-recipient"><span>Send via</span><strong>{supplierProfile(selectedSupplier)?.orderMethod ?? "Email"}</strong></div>
            </div>
            <div className="quick-review-headings" aria-hidden="true"><span>Product</span><span>Quantity</span><span>Price</span><span>Line total</span></div>
            <div className="quick-review-list">
              {selectedLines.map((line) => (
                <article className="quick-review-row" key={line.id}>
                  <div><strong>{line.ingredient}</strong>{line.supplierProduct !== line.ingredient && <span>{line.supplierProduct}</span>}{line.sku && <span>SKU {line.sku}</span>}</div>
                  <div className="quick-review-qty"><strong>{line.orderQty} {line.orderUnit}</strong></div>
                  <div className="quick-review-cost"><span>{line.unitPrice === null ? "Price unavailable" : `${money(line.unitPrice)}/${line.orderUnit}`}</span></div>
                  <div className="quick-review-line-total"><strong>{line.unitPrice === null ? "—" : money(line.orderQty * line.unitPrice)}</strong></div>
                </article>
              ))}
            </div>
            <label className="order-notes-field">
              <span>Delivery or order notes</span>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Delivery instructions or a note for the supplier…" />
            </label>
          </section>

          <div className="quick-order-footer order-review-footer">
            <div><span>Estimated total</span><strong>{money(estimatedTotal)}</strong><span className="order-review-footer-count">{selectedLines.length} {selectedLines.length === 1 ? "item" : "items"}</span></div>
            <button type="button" className="primary-button quick-review-button" disabled={sending} onClick={() => void createOrder()}>
              {sending ? "Sending…" : supplierProfile(selectedSupplier)?.whatsapp && String(supplierProfile(selectedSupplier)?.orderMethod || "").toLowerCase().includes("whatsapp") ? "Save & open WhatsApp" : "Send order"}
            </button>
          </div>
        </div>
      )}

      {step === "receive" && receivingOrder && (
        <div className="receive-order-page">
          <header className="topbar">
            <div>
              <p className="eyebrow">Goods in</p>
              <h1>Receive {receivingOrder.supplier}</h1>
              <p className="page-description">Check what actually arrived. Short or over deliveries are kept against the PO.</p>
            </div>
          </header>

          <section className="panel">
            <div className="receive-order-summary">
              <div><span>{receivingOrder.id}</span><strong>{money(receivingOrder.estimatedTotal)}</strong></div>
              <span>{receivingOrder.lines.length} items</span>
            </div>
            <div className="receive-order-lines">
              {receivingOrder.lines.map((line) => {
                const actual = Number(receivedQuantities[line.id] ?? line.orderQty);
                const difference = Math.round((actual - line.orderQty) * 100) / 100;
                return (
                  <article className="receive-order-row" key={line.id}>
                    <div>
                      <strong>{line.ingredient}</strong>
                      <span>{line.supplierProduct}</span>
                    </div>
                    <div>
                      <span>Ordered</span>
                      <strong>{line.orderQty} {line.orderUnit}</strong>
                    </div>
                    <div>
                      <label>
                        <span>Received</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={actual}
                          onChange={(event) =>
                            setReceivedQuantities((current) => ({ ...current, [line.id]: Number(event.target.value) }))
                          }
                        />
                      </label>
                      <span className={`receive-order-difference ${difference === 0 ? "ok" : "warn"}`}>
                        {difference === 0 ? "Matches order" : `${difference > 0 ? "+" : ""}${difference} ${line.orderUnit}`}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="receive-order-actions">
            <button type="button" className="secondary-inline-button" onClick={() => { setStep("start"); setReceivingOrderId(""); }}>Cancel</button>
            <button type="button" className="primary-button" onClick={() => void confirmReceive()}>Confirm received</button>
          </div>
        </div>
      )}
    </div>
  );
}
