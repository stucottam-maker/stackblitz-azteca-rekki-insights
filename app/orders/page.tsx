"use client";

import { useEffect, useMemo, useState } from "react";

import { getSupplierEmail } from "../data/suppliers";
import {
  defaultOrganisationSettings,
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

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function OrdersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [settings, setSettings] = useState<OrganisationSettings>(defaultOrganisationSettings);
  const [supplier, setSupplier] = useState("");
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

  const suppliers = useMemo(
    () => Array.from(new Set(products.map((product) => product.supplier))).sort(),
    [products]
  );

  const supplierProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter(
      (product) =>
        product.supplier === supplier &&
        (!query ||
          product.ingredient.toLowerCase().includes(query) ||
          product.supplierProduct.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query))
    );
  }, [products, supplier, search]);

  const selectedLines = useMemo(() => {
    return products.flatMap((product) => {
      const orderQty = Number(quantities[product.id] ?? 0);
      if (product.supplier !== supplier || orderQty <= 0) return [];

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
  }, [products, supplier, quantities, stock]);

  const estimatedTotal = selectedLines.reduce(
    (sum, line) => sum + (line.unitPrice === null ? 0 : line.orderQty * line.unitPrice),
    0
  );

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);

  function previousAverage(product: Product) {
    const values = orders
      .filter((order) => order.supplier === product.supplier && order.status !== "Draft")
      .flatMap((order) =>
        order.lines
          .filter(
            (line) =>
              line.id === product.id ||
              normalise(line.ingredient) === normalise(product.ingredient)
          )
          .map((line) => Number(line.orderQty || 0))
      )
      .filter((value) => value > 0);

    if (!values.length) return null;
    return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
  }

  async function saveOrder() {
    if (!supplier || selectedLines.length === 0) {
      setMessage("Choose a supplier and add at least one product.");
      return;
    }

    const order: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      supplier,
      createdAt: new Date().toISOString(),
      status: "Draft",
      lines: selectedLines,
      estimatedTotal,
      notes: notes.trim() || undefined,
    };

    const next = [order, ...orders];
    await persistWorkspaceState("purchaseOrders", JSON.stringify(next));
    setOrders(next);
    setQuantities({});
    setNotes("");
    setMessage(`${order.id} saved as Draft. Open the email, then mark it Sent once it has actually gone.`);
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

  async function openEmail(order: PurchaseOrder) {
    const currentSettings = await readWorkspaceState<OrganisationSettings>(
      ORGANISATION_SETTINGS_KEY,
      settings
    );
    const supplierEmail = getSupplierEmail(order.supplier);
    if (!supplierEmail) {
      setMessage(`No email is saved for ${order.supplier}. Add it in supplier settings first.`);
      return;
    }

    const copiedTo = currentSettings.sendInternalCopy
      ? currentSettings.internalOrderEmails.filter(Boolean)
      : [];
    const subject = `Purchase Order ${order.id} - ${currentSettings.name}`;
    const body = orderEmailBody(order, currentSettings.name);

    window.location.href = `mailto:${encodeURIComponent(supplierEmail)}?cc=${encodeURIComponent(
      copiedTo.join(",")
    )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setMessage("Email composer opened. The order stays Draft until you confirm it was sent.");
  }

  return (
    <div className="page orders-v2-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Orders</h1>
          <p className="page-description">
            Build orders from the live Supabase supplier catalogue. Draft, Sent and Received statuses now reflect what actually happened.
          </p>
        </div>
      </header>

      {message && <div className="notice">{message}</div>}

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Live products</p>
          <p className="stat-value">{loading ? "—" : products.length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Suppliers</p>
          <p className="stat-value">{loading ? "—" : suppliers.length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Current order</p>
          <p className="stat-value">{selectedLines.length}</p>
          <p className="stat-change neutral">{money(estimatedTotal)} estimated</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Awaiting receipt</p>
          <p className="stat-value">{orders.filter((order) => order.status === "Sent").length}</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">New purchase order</p>
            <h2>{supplier || "Choose a supplier"}</h2>
          </div>
          <strong>{money(estimatedTotal)}</strong>
        </div>

        <div className="order-v2-toolbar">
          <select value={supplier} onChange={(event) => { setSupplier(event.target.value); setQuantities({}); }}>
            <option value="">Select supplier…</option>
            {suppliers.map((name) => <option key={name}>{name}</option>)}
          </select>
          <input
            type="search"
            placeholder="Search product or SKU…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {supplier && (
          <div className="order-v2-products">
            {supplierProducts.map((product) => {
              const stockItem = stock.find(
                (item) => normalise(item.name) === normalise(product.ingredient)
              );
              const average = previousAverage(product);

              return (
                <div className="order-v2-row" key={product.id}>
                  <div className="order-v2-product">
                    <strong>{product.ingredient}</strong>
                    <span>{product.supplierProduct}{product.sku ? ` · ${product.sku}` : ""}</span>
                  </div>
                  <div className="order-v2-meta">
                    <span>Stock <strong>{stockItem?.quantity ?? "—"} {stockItem?.unit ?? ""}</strong></span>
                    <span>Price <strong>{product.price === null ? "—" : `${money(product.price)}/${product.unit}`}</strong></span>
                    {average !== null && (
                      <button type="button" className="secondary-inline-button" onClick={() => setQuantities((current) => ({ ...current, [product.id]: average }))}>
                        Usual {average}
                      </button>
                    )}
                  </div>
                  <div className="order-v2-qty">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      aria-label={`Order quantity for ${product.ingredient}`}
                      value={quantities[product.id] ?? ""}
                      onChange={(event) =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: Math.max(0, Number(event.target.value || 0)),
                        }))
                      }
                    />
                    <span>{product.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <label className="order-v2-notes">
          <span>Delivery / order notes</span>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
        </label>

        <button type="button" className="primary-button" disabled={!supplier || selectedLines.length === 0} onClick={() => void saveOrder()}>
          Save draft order
        </button>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">History</p>
            <h2>Purchase orders</h2>
          </div>
        </div>

        <div className="order-v2-history">
          {recentOrders.length === 0 ? (
            <div className="empty-table-message">No purchase orders yet.</div>
          ) : (
            recentOrders.map((order) => (
              <article className="order-v2-history-row" key={order.id}>
                <div>
                  <strong>{order.supplier}</strong>
                  <span>{order.id} · {formatDate(order.createdAt)} · {order.lines.length} items</span>
                </div>
                <strong>{money(order.estimatedTotal)}</strong>
                <span className={`status-badge ${order.status === "Draft" ? "" : "status-approved"}`}>{order.status}</span>
                <div className="order-v2-actions">
                  {order.status === "Draft" && (
                    <>
                      <button type="button" className="secondary-inline-button" onClick={() => void openEmail(order)}>Open email</button>
                      <button type="button" className="primary-button" onClick={() => void updateStatus(order.id, "Sent")}>Mark sent</button>
                    </>
                  )}
                  {order.status === "Sent" && (
                    <button type="button" className="primary-button" onClick={() => void updateStatus(order.id, "Received")}>Mark received</button>
                  )}
                  {order.status === "Received" && (
                    <button type="button" className="secondary-inline-button" onClick={() => void updateStatus(order.id, "Completed")}>Complete</button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
