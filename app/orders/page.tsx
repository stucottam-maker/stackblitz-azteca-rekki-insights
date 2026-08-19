"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { suppliers as supplierDirectory, type Supplier } from "../data/suppliers";
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
type OrderStep = "start" | "order" | "review";
type SupplierTab = "catalogue" | "regular" | "history";

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
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
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
    Object.values(supplierDirectory).find(
      (supplier) => normalise(supplier.name) === key
    ) ?? null
  );
}

function SupplierLogo({
  supplier,
  size = "normal",
}: {
  supplier: string;
  size?: "normal" | "small";
}) {
  const profile = supplierProfile(supplier);
  const logo = profile?.logo;
  const pixels = size === "small" ? 32 : 42;

  return (
    <div
      className={`supplier-choice-avatar ${
        size === "small" ? "supplier-choice-avatar-small" : ""
      }`}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={pixels}
          height={pixels}
          className="supplier-logo"
        />
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

export default function OrdersPage() {
  const [step, setStep] = useState<OrderStep>("start");
  const [supplierTab, setSupplierTab] = useState<SupplierTab>("catalogue");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [settings, setSettings] = useState<OrganisationSettings>(defaultOrganisationSettings);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

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
            .order("preferred", { ascending: false })
            .order("supplier_product_name", { ascending: true })
            .limit(1000),
          readWorkspaceStates([
            "purchaseOrders",
            "currentStockTake",
            ORGANISATION_SETTINGS_KEY,
          ]),
        ]);

        if (productResult.error) throw productResult.error;

        setProducts(
          ((productResult.data ?? []) as unknown as ProductRow[]).flatMap((row) => {
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
        );

        setOrders((workspace.get("purchaseOrders") ?? []) as PurchaseOrder[]);
        const stockTake = (workspace.get("currentStockTake") ?? { items: [] }) as {
          items?: StockItem[];
        };
        setStock(stockTake.items ?? []);
        setSettings(
          (workspace.get(ORGANISATION_SETTINGS_KEY) ??
            defaultOrganisationSettings) as OrganisationSettings
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

      const stockItem = stock.find(
        (item) => normalise(item.name) === normalise(product.ingredient)
      );

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

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const supplierOrderHistory = orders
    .filter((order) => order.supplier === selectedSupplier)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const regularOrderItems = getRegularOrderItems(orders, selectedSupplier);

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
    const unit = normalise(product.unit);
    const increment = ["kg", "kilogram", "kilograms", "l", "ltr", "litre", "litres"].includes(unit)
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

  function clearSupplierOrder() {
    setQuantities({});
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

  async function updateStatus(orderId: string, status: PurchaseOrder["status"]) {
    const now = new Date().toISOString();
    const next = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status,
            ...(status === "Sent" ? { sentAt: order.sentAt ?? now } : {}),
          }
        : order
    );

    await persistWorkspaceState("purchaseOrders", JSON.stringify(next));
    setOrders(next);
    setMessage(`${orderId} marked ${status}.`);
  }

  async function openOrderMessage(order: PurchaseOrder) {
    const currentSettings = await readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      settings
    );
    const profile = supplierProfile(order.supplier);
    const body = orderEmailBody(order, currentSettings.name);

    if (profile?.whatsapp) {
      window.location.href = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(body)}`;
      setMessage("WhatsApp opened. Mark the order Sent after you send the message.");
      return;
    }

    if (profile?.email) {
      const copiedTo = currentSettings.sendInternalCopy
        ? currentSettings.internalOrderEmails.filter(Boolean)
        : [];
      const subject = `Purchase Order ${order.id} - ${currentSettings.name}`;
      window.location.href = `mailto:${encodeURIComponent(profile.email)}?cc=${encodeURIComponent(
        copiedTo.join(",")
      )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setMessage("Email composer opened. Mark the order Sent after it has actually gone.");
      return;
    }

    setMessage(`No email or WhatsApp number is saved for ${order.supplier}. The draft is still saved.`);
  }

  async function saveDraftAndOpen() {
    if (!selectedSupplier || selectedLines.length === 0) {
      setMessage("Add at least one item first.");
      return;
    }

    const profile = supplierProfile(selectedSupplier);
    const currentSettings = await readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      settings
    );
    const copiedTo = currentSettings.sendInternalCopy
      ? currentSettings.internalOrderEmails.filter(Boolean)
      : [];

    const order: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      supplier: selectedSupplier,
      createdAt: new Date().toISOString(),
      status: "Draft",
      lines: selectedLines,
      estimatedTotal,
      sentTo: profile?.email,
      copiedTo,
      notes: currentSettings.includeOrderNotes ? notes.trim() || undefined : undefined,
    };

    const next = [order, ...orders];
    await persistWorkspaceState("purchaseOrders", JSON.stringify(next));
    setOrders(next);
    setQuantities({});
    setNotes("");
    setStep("start");
    setMessage(`${order.id} saved as Draft.`);

    if (currentSettings.sendSupplierEmail !== false || profile?.whatsapp) {
      await openOrderMessage(order);
    }
  }

  return (
    <div className="page quick-order-page">
      {message && <div className="notice">{message}</div>}

      {step === "start" && (
        <>
          <header className="topbar">
            <div>
              <p className="eyebrow">Purchasing</p>
              <h1>Orders</h1>
              <p className="page-description">
                Choose a supplier, tap quantities and build an order quickly.
              </p>
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
            ) : (
              <div className="supplier-choice-grid">
                {supplierNames.map((supplier) => {
                  const count = products.filter((product) => product.supplier === supplier).length;
                  const profile = supplierProfile(supplier);

                  return (
                    <button
                      type="button"
                      className="supplier-choice-card"
                      key={supplier}
                      onClick={() => chooseSupplier(supplier)}
                    >
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

            <div className="quick-order-history">
              {recentOrders.length === 0 ? (
                <div className="empty-table-message">No purchase orders yet.</div>
              ) : (
                recentOrders.map((order) => (
                  <article className="quick-order-history-row quick-order-history-row-actions" key={order.id}>
                    <div className="quick-order-history-supplier">
                      <SupplierLogo supplier={order.supplier} size="small" />
                      <div>
                        <strong>{order.supplier}</strong>
                        <span>{order.id} · {formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    <span>{order.lines.length} items</span>
                    <strong>{money(order.estimatedTotal)}</strong>
                    <span className={`status-badge ${order.status === "Draft" ? "" : "status-approved"}`}>
                      {order.status}
                    </span>

                    <div className="quick-order-history-actions">
                      <button type="button" className="secondary-inline-button" onClick={() => applyPreviousOrder(order)}>
                        Repeat
                      </button>
                      {order.status === "Draft" && (
                        <>
                          <button type="button" className="secondary-inline-button" onClick={() => void openOrderMessage(order)}>
                            Open message
                          </button>
                          <button type="button" className="primary-button" onClick={() => void updateStatus(order.id, "Sent")}>
                            Mark sent
                          </button>
                        </>
                      )}
                      {order.status === "Sent" && (
                        <button type="button" className="primary-button" onClick={() => void updateStatus(order.id, "Received")}>
                          Mark received
                        </button>
                      )}
                      {order.status === "Received" && (
                        <button type="button" className="secondary-inline-button" onClick={() => void updateStatus(order.id, "Completed")}>
                          Complete
                        </button>
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
              <button className="quick-order-back" type="button" onClick={() => setStep("start")}>
                ← Orders
              </button>

              <div className="quick-order-supplier-title">
                <SupplierLogo supplier={selectedSupplier} />
                <div>
                  <p className="eyebrow">New order</p>
                  <h1>{selectedSupplier}</h1>
                  <p className="page-description">Tap − / + or choose a quantity from the selector.</p>
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
              <input
                type="search"
                placeholder="Search product or SKU…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <button className="cancel-button" type="button" onClick={clearSupplierOrder}>Clear</button>
            {regularOrderItems.length > 0 && (
              <button className="secondary-inline-button" type="button" onClick={applyRegularItems}>
                Add regulars
              </button>
            )}
          </section>

          <nav className="purchasing-tabs" aria-label="Supplier order views">
            {([
              ["catalogue", "Order"],
              ["regular", `Regular (${regularOrderItems.length})`],
              ["history", `History (${supplierOrderHistory.length})`],
            ] as const).map(([tab, label]) => (
              <button
                type="button"
                key={tab}
                className={supplierTab === tab ? "purchasing-tab-active" : ""}
                onClick={() => setSupplierTab(tab)}
              >
                {label}
              </button>
            ))}
          </nav>

          {supplierTab === "catalogue" && (
            <section className="panel quick-order-panel">
              <div className="quick-order-column-headings">
                <span>Product</span>
                <span>In stock</span>
                <span>Order</span>
              </div>

              <div className="quick-order-lines">
                {supplierProducts.length === 0 ? (
                  <div className="empty-table-message">No matching products.</div>
                ) : (
                  supplierProducts.map((product) => {
                    const stockItem = stock.find(
                      (item) => normalise(item.name) === normalise(product.ingredient)
                    );
                    const currentQty = Number(quantities[product.id] ?? 0);
                    const average = previousAverage(product);

                    return (
                      <article
                        className={`quick-order-line ${currentQty > 0 ? "quick-order-line-active" : ""}`}
                        key={product.id}
                      >
                        <div className="quick-order-product">
                          <div className="quick-order-product-title">
                            <strong>{product.ingredient}</strong>
                            {product.preferred && <span className="quick-order-sku">Preferred</span>}
                            {product.sku && <span className="quick-order-sku">SKU {product.sku}</span>}
                          </div>

                          {product.supplierProduct !== product.ingredient && (
                            <span>{product.supplierProduct}</span>
                          )}

                          <span className="quick-order-price-note">
                            {product.price === null ? "Price unavailable" : `${money(product.price)}/${product.unit}`}
                          </span>

                          {average !== null && (
                            <button
                              type="button"
                              className="quick-suggestion"
                              onClick={() => setQuantity(product.id, average)}
                            >
                              Usual {average} {product.unit}
                            </button>
                          )}
                        </div>

                        <div className="quick-order-stock">
                          <strong>{stockItem?.quantity ?? "—"}</strong>
                          <span>{stockItem?.unit ?? ""}</span>
                        </div>

                        <div className="quick-order-quantity">
                          <button type="button" onClick={() => changeQuantity(product, -1)} aria-label={`Decrease ${product.ingredient}`}>
                            −
                          </button>

                          <select
                            value={currentQty}
                            onChange={(event) => setQuantity(product.id, Number(event.target.value))}
                            aria-label={`Order quantity for ${product.ingredient}`}
                          >
                            {quantityOptions(product.unit, currentQty).map((value) => (
                              <option key={value} value={value}>{value}</option>
                            ))}
                          </select>

                          <button type="button" onClick={() => changeQuantity(product, 1)} aria-label={`Increase ${product.ingredient}`}>
                            +
                          </button>
                          <span>{product.unit}</span>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {supplierTab === "regular" && (
            <section className="panel purchasing-list-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Learned from order history</p>
                  <h2>Regularly ordered</h2>
                </div>
                {regularOrderItems.length > 0 && (
                  <button className="secondary-inline-button" type="button" onClick={applyRegularItems}>
                    Add all regular items
                  </button>
                )}
              </div>

              {regularOrderItems.length === 0 ? (
                <div className="empty-table-message">Regular items appear after orders have been marked Sent.</div>
              ) : (
                regularOrderItems.map((item) => (
                  <article className="regular-order-row" key={item.lineId}>
                    <div><strong>{item.ingredient}</strong><span>{item.supplierProduct}</span></div>
                    <span>Last ordered {formatShortDate(item.lastOrderedAt)}</span>
                    <span>{item.averageIntervalDays ? `Every ${item.averageIntervalDays} days` : "Ordered once"}</span>
                    <strong>{item.averageQuantity} {item.orderUnit}</strong>
                  </article>
                ))
              )}
            </section>
          )}

          {supplierTab === "history" && (
            <section className="panel purchasing-list-panel">
              <div className="panel-header">
                <div><p className="panel-kicker">Audit trail</p><h2>Order history</h2></div>
              </div>

              {supplierOrderHistory.length === 0 ? (
                <div className="empty-table-message">No orders for this supplier yet.</div>
              ) : (
                supplierOrderHistory.map((order) => (
                  <article className="order-history-card" key={order.id}>
                    <div><strong>{order.id}</strong><span>{formatDate(order.sentAt ?? order.createdAt)}</span></div>
                    <span>{order.lines.length} items</span>
                    <strong>{money(order.estimatedTotal)}</strong>
                    <span className={`status-badge ${order.status === "Draft" ? "" : "status-approved"}`}>{order.status}</span>
                    <button className="secondary-inline-button" type="button" onClick={() => applyPreviousOrder(order)}>Repeat order</button>
                  </article>
                ))
              )}
            </section>
          )}

          <div className="quick-order-footer">
            <div>
              <span>{selectedLines.length} items</span>
              <strong>{money(estimatedTotal)}</strong>
            </div>
            <button
              type="button"
              className="primary-button quick-review-button"
              disabled={selectedLines.length === 0}
              onClick={() => setStep("review")}
            >
              Review order →
            </button>
          </div>
        </>
      )}

      {step === "review" && (
        <div className="order-review-page">
          <header className="quick-order-header order-review-header">
            <div>
              <button className="quick-order-back" type="button" onClick={() => setStep("order")}>
                ← Edit order
              </button>

              <div className="quick-order-supplier-title">
                <SupplierLogo supplier={selectedSupplier} />
                <div>
                  <p className="eyebrow">Review</p>
                  <h1>{selectedSupplier}</h1>
                  <p className="page-description">Check the order before opening the supplier message.</p>
                </div>
              </div>
            </div>

            <div className="quick-order-header-total">
              <span>Estimated total</span>
              <strong>{money(estimatedTotal)}</strong>
              <span>{selectedLines.length} items</span>
            </div>
          </header>

          <section className="panel order-review-card">
            <div className="panel-header">
              <div><p className="panel-kicker">Purchase order</p><h2>Order summary</h2></div>
              <div className="order-review-recipient">
                <span>Ordering via</span>
                <strong>
                  {supplierProfile(selectedSupplier)?.orderMethod ??
                    (supplierProfile(selectedSupplier)?.whatsapp ? "WhatsApp" : "Email")}
                </strong>
              </div>
            </div>

            <div className="quick-review-headings" aria-hidden="true">
              <span>Product</span><span>Quantity</span><span>Price</span><span>Line total</span>
            </div>

            <div className="quick-review-list">
              {selectedLines.map((line) => (
                <article className="quick-review-row" key={line.id}>
                  <div>
                    <strong>{line.ingredient}</strong>
                    {line.supplierProduct !== line.ingredient && <span>{line.supplierProduct}</span>}
                    {line.sku && <span>SKU {line.sku}</span>}
                  </div>
                  <div className="quick-review-qty"><strong>{line.orderQty} {line.orderUnit}</strong></div>
                  <div className="quick-review-cost">
                    <span>{line.unitPrice === null ? "Price unavailable" : `${money(line.unitPrice)}/${line.orderUnit}`}</span>
                  </div>
                  <div className="quick-review-line-total">
                    <strong>{line.unitPrice === null ? "—" : money(line.orderQty * line.unitPrice)}</strong>
                  </div>
                </article>
              ))}
            </div>

            <label className="order-notes-field">
              <span>Delivery or order notes</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add delivery instructions or a note for the supplier…"
              />
            </label>
          </section>

          <div className="quick-order-footer order-review-footer">
            <div>
              <span>Estimated total</span>
              <strong>{money(estimatedTotal)}</strong>
              <span className="order-review-footer-count">{selectedLines.length} {selectedLines.length === 1 ? "item" : "items"}</span>
            </div>
            <button type="button" className="primary-button quick-review-button" onClick={() => void saveDraftAndOpen()}>
              Save draft & open message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
