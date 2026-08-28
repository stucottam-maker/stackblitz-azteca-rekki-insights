"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { resolveActiveWorkspace } from "../../lib/clientWorkspace";
import {
  type PurchaseOrder,
  type PurchaseOrderLine,
} from "../../lib/purchasing";
import { supabase } from "../../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceStates,
} from "../../lib/workspaceState";
import styles from "./suggested.module.css";

type Relation<T> = T | T[] | null;

type FrequentProduct = {
  productId: string;
  supplier: string;
  supplierProduct: string;
  averageQuantity: number;
  orderUnit: string;
  invoiceCount: number;
  lastOrderedAt: string;
  averageIntervalDays: number | null;
  weightedScore: number;
  latestUnitPrice: number | null;
};

type ProductRow = {
  id: string;
  supplier_product_name: string;
  supplier_product_code: string | null;
  price_unit: string | null;
  latest_price: number | string | null;
  supplier: Relation<{ id: string; name: string }>;
  ingredient: Relation<{ id: string; name: string }>;
};

type StockItem = {
  name: string;
  quantity: number | null;
  unit: string;
};

type StockTakeSnapshot = {
  id?: string;
  createdAt?: string;
  items?: StockItem[];
};

type SuggestedItem = {
  productId: string;
  supplier: string;
  ingredient: string;
  supplierProduct: string;
  sku: string;
  orderUnit: string;
  unitPrice: number | null;
  usualQuantity: number;
  suggestedQuantity: number;
  invoiceCount: number;
  lastOrderedAt: string;
  averageIntervalDays: number | null;
  daysSinceLastOrder: number;
  stockItem: StockItem | null;
  comparableStock: number | null;
  reason: string;
};

const DAY_MS = 86_400_000;

function first<T>(value: Relation<T>): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function formatShortDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
      }).format(date);
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

function numeric(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

type UnitInfo = {
  family: "weight" | "volume" | "count";
  basePerOrderUnit: number;
  label: string;
};

const COUNT_ALIASES: Record<string, string> = {
  each: "each",
  ea: "each",
  unit: "each",
  units: "each",
  piece: "each",
  pieces: "each",
  pc: "each",
  pcs: "each",
  bunch: "bunch",
  bunches: "bunch",
  punnet: "punnet",
  punnets: "punnet",
  pack: "pack",
  packs: "pack",
  box: "case",
  boxes: "case",
  case: "case",
  cases: "case",
  bag: "bag",
  bags: "bag",
  bottle: "bottle",
  bottles: "bottle",
  jar: "jar",
  jars: "jar",
  tin: "tin",
  tins: "tin",
  tub: "tub",
  tubs: "tub",
  roll: "roll",
  rolls: "roll",
};

function parseUnit(value: string): UnitInfo | null {
  const words = normalise(value).split(" ").filter(Boolean);

  // Prefer the container/count unit when a pack size is embedded in the unit,
  // e.g. "25g punnet" or "case 18".
  for (const word of words) {
    const alias = COUNT_ALIASES[word];
    if (alias) return { family: "count", basePerOrderUnit: 1, label: alias };
  }

  const compact = value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/litres?/g, "l")
    .replace(/ltr/g, "l");

  const weight = compact.match(/^(\d+(?:\.\d+)?)?(kg|g)$/);
  if (weight) {
    const amount = weight[1] ? Number(weight[1]) : 1;
    const basePerOrderUnit = weight[2] === "kg" ? amount : amount / 1000;
    return { family: "weight", basePerOrderUnit, label: "kg" };
  }

  const volume = compact.match(/^(\d+(?:\.\d+)?)?(l|ml)$/);
  if (volume) {
    const amount = volume[1] ? Number(volume[1]) : 1;
    const basePerOrderUnit = volume[2] === "l" ? amount : amount / 1000;
    return { family: "volume", basePerOrderUnit, label: "L" };
  }

  const alias = COUNT_ALIASES[compact];
  return alias ? { family: "count", basePerOrderUnit: 1, label: alias } : null;
}

function stockInOrderUnits(stock: StockItem, orderUnit: string) {
  const stockQuantity = numeric(stock.quantity);
  if (stockQuantity === null) return null;

  const stockInfo = parseUnit(stock.unit);
  const orderInfo = parseUnit(orderUnit);
  if (!stockInfo || !orderInfo || stockInfo.family !== orderInfo.family) return null;

  if (stockInfo.family === "count" && stockInfo.label !== orderInfo.label) return null;

  const baseStock = stockQuantity * stockInfo.basePerOrderUnit;
  return Math.max(0, baseStock / orderInfo.basePerOrderUnit);
}

function roundSuggestion(value: number, orderUnit: string) {
  if (value <= 0) return 0;
  const compact = normalise(orderUnit);
  const step = ["kg", "kilogram", "kilograms", "l", "ltr", "litre", "litres"].includes(compact)
    ? 0.5
    : 1;
  return Math.round(Math.ceil(value / step) * step * 100) / 100;
}

function prettyOrderQuantity(quantity: number, orderUnit: string) {
  const unitInfo = parseUnit(orderUnit);
  if (unitInfo?.family === "count") {
    const label = quantity === 1 ? unitInfo.label : `${unitInfo.label}s`;
    return `${quantity} ${label}`;
  }

  const compact = orderUnit
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/litres?/g, "l")
    .replace(/ltr/g, "l");
  const packaged = compact.match(/^(\d+(?:\.\d+)?)(kg|g|l|ml)$/);
  if (packaged && Number(packaged[1]) !== 1) {
    return `${quantity} × ${packaged[1]}${packaged[2] === "l" ? "L" : packaged[2]}`;
  }

  return `${quantity} ${orderUnit}`;
}

function priceUnitLabel(orderUnit: string) {
  const unitInfo = parseUnit(orderUnit);
  if (unitInfo?.family === "count") return unitInfo.label;
  return orderUnit;
}

function latestStockItems(
  currentStock: StockTakeSnapshot | null,
  history: StockTakeSnapshot[]
): StockItem[] {
  if (currentStock?.items?.length) return currentStock.items;

  const completed = [...history]
    .filter((snapshot) => snapshot?.items?.length)
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  return completed[0]?.items ?? [];
}

async function fetchFrequentProducts(): Promise<FrequentProduct[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("Your session has expired. Sign in again.");

  const response = await fetch("/api/orders/frequent-products", {
    headers: { Authorization: `Bearer ${session.access_token}` },
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Could not calculate frequent products.");
  return Array.isArray(payload.products) ? payload.products : [];
}

export default function SuggestedOrdersPage() {
  const [suggestions, setSuggestions] = useState<SuggestedItem[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [creatingSupplier, setCreatingSupplier] = useState("");
  const [createdSuppliers, setCreatedSuppliers] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const workspace = await resolveActiveWorkspace();
        if (!workspace) throw new Error("No active restaurant workspace.");

        const [frequent, workspaceState] = await Promise.all([
          fetchFrequentProducts(),
          readWorkspaceStates(["purchaseOrders", "currentStockTake", "stockTakeHistory"]),
        ]);

        const currentStock = (workspaceState.get("currentStockTake") ?? null) as StockTakeSnapshot | null;
        const stockHistory = (workspaceState.get("stockTakeHistory") ?? []) as StockTakeSnapshot[];
        const stock = latestStockItems(currentStock, Array.isArray(stockHistory) ? stockHistory : []);
        const purchaseOrders = (workspaceState.get("purchaseOrders") ?? []) as PurchaseOrder[];
        setOrders(purchaseOrders);

        if (!frequent.length) {
          setSuggestions([]);
          return;
        }

        const { data, error } = await supabase
          .from("supplier_products")
          .select(`
            id,
            supplier_product_name,
            supplier_product_code,
            price_unit,
            latest_price,
            supplier:suppliers(id,name),
            ingredient:ingredients(id,name)
          `)
          .eq("organisation_id", workspace.organisationId)
          .in("id", frequent.map((item) => item.productId));

        if (error) throw error;
        const productRows = (data ?? []) as unknown as ProductRow[];
        const productById = new Map(productRows.map((product) => [product.id, product]));
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextSuggestions = frequent.flatMap((frequentItem) => {
          const product = productById.get(frequentItem.productId);
          if (!product) return [];
          const supplier = first(product.supplier);
          const ingredient = first(product.ingredient);
          if (!supplier) return [];

          const ingredientName = ingredient?.name || product.supplier_product_name;
          const stockItem =
            stock.find((item) => normalise(item.name) === normalise(ingredientName)) ??
            stock.find((item) => normalise(item.name) === normalise(product.supplier_product_name)) ??
            null;

          const lastOrderDate = new Date(frequentItem.lastOrderedAt);
          lastOrderDate.setHours(0, 0, 0, 0);
          const daysSinceLastOrder = Number.isNaN(lastOrderDate.getTime())
            ? 0
            : Math.max(0, Math.round((today.getTime() - lastOrderDate.getTime()) / DAY_MS));
          const dueThreshold = frequentItem.averageIntervalDays
            ? Math.max(1, Math.ceil(frequentItem.averageIntervalDays * 0.75))
            : 0;
          const isDue = dueThreshold === 0 || daysSinceLastOrder >= dueThreshold;

          const orderUnit = product.price_unit || frequentItem.orderUnit || "each";
          const comparableStock = stockItem ? stockInOrderUnits(stockItem, orderUnit) : null;
          const shortfall = comparableStock === null
            ? frequentItem.averageQuantity
            : Math.max(0, frequentItem.averageQuantity - comparableStock);
          const suggestedQuantity = isDue ? roundSuggestion(shortfall, orderUnit) : 0;

          let reason = "Based on your usual invoice quantity.";
          if (!isDue && frequentItem.averageIntervalDays) {
            const daysUntil = Math.max(1, dueThreshold - daysSinceLastOrder);
            reason = `Not due yet. Usually reordered every ${frequentItem.averageIntervalDays} days, about ${daysUntil} day${daysUntil === 1 ? "" : "s"} to go.`;
          } else if (comparableStock !== null && suggestedQuantity === 0) {
            reason = "Current stock already covers the usual order quantity.";
          } else if (comparableStock !== null) {
            reason = `Usual ${prettyOrderQuantity(frequentItem.averageQuantity, orderUnit)}, about ${prettyOrderQuantity(Math.round(comparableStock * 100) / 100, orderUnit)} in stock.`;
          } else if (stockItem) {
            reason = `Stock is recorded as ${stockItem.quantity ?? "?"} ${stockItem.unit}, but the units are not safely comparable, so the usual quantity is used.`;
          } else {
            reason = "No matching stock count found, so the usual invoice quantity is used.";
          }

          return [{
            productId: product.id,
            supplier: supplier.name,
            ingredient: ingredientName,
            supplierProduct: product.supplier_product_name,
            sku: product.supplier_product_code ?? "",
            orderUnit,
            unitPrice: numeric(product.latest_price) ?? frequentItem.latestUnitPrice,
            usualQuantity: frequentItem.averageQuantity,
            suggestedQuantity,
            invoiceCount: frequentItem.invoiceCount,
            lastOrderedAt: frequentItem.lastOrderedAt,
            averageIntervalDays: frequentItem.averageIntervalDays,
            daysSinceLastOrder,
            stockItem,
            comparableStock,
            reason,
          }];
        });

        setSuggestions(
          nextSuggestions.sort(
            (a, b) =>
              Number(b.suggestedQuantity > 0) - Number(a.suggestedQuantity > 0) ||
              a.supplier.localeCompare(b.supplier) ||
              b.invoiceCount - a.invoiceCount ||
              a.ingredient.localeCompare(b.ingredient)
          )
        );
      } catch (error: any) {
        setMessage(error?.message || "Could not build suggested orders.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const actionable = useMemo(
    () => suggestions.filter((item) => item.suggestedQuantity > 0),
    [suggestions]
  );

  const supplierGroups = useMemo(() => {
    const grouped = new Map<string, SuggestedItem[]>();
    actionable.forEach((item) => {
      const list = grouped.get(item.supplier) ?? [];
      list.push(item);
      grouped.set(item.supplier, list);
    });
    return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [actionable]);

  const estimatedValue = actionable.reduce(
    (sum, item) => sum + (item.unitPrice === null ? 0 : item.unitPrice * item.suggestedQuantity),
    0
  );

  async function createDraft(supplier: string, items: SuggestedItem[]) {
    if (creatingSupplier) return;
    setCreatingSupplier(supplier);
    setMessage("");
    try {
      const lines: PurchaseOrderLine[] = items.map((item) => ({
        id: item.productId,
        ingredient: item.ingredient,
        supplier: item.supplier,
        supplierProduct: item.supplierProduct,
        stockQty: Number(item.stockItem?.quantity ?? 0),
        stockUnit: item.stockItem?.unit || item.orderUnit,
        orderQty: item.suggestedQuantity,
        orderUnit: item.orderUnit,
        unitPrice: item.unitPrice,
        suggestedQty: item.suggestedQuantity,
        sku: item.sku || undefined,
      }));
      const estimatedTotal = lines.reduce(
        (sum, line) => sum + (line.unitPrice === null ? 0 : line.unitPrice * line.orderQty),
        0
      );
      const draft: PurchaseOrder = {
        id: `PO-${Date.now()}`,
        supplier,
        createdAt: new Date().toISOString(),
        status: "Draft",
        lines,
        estimatedTotal,
        notes: "Suggested from approved invoice frequency and the latest stock take.",
      };
      const nextOrders = [draft, ...orders];
      await persistWorkspaceState("purchaseOrders", JSON.stringify(nextOrders));
      setOrders(nextOrders);
      setCreatedSuppliers((current) => [...new Set([...current, supplier])]);
      setMessage(`${draft.id} created as a draft for ${supplier}. Review it in Orders before sending.`);
    } catch (error: any) {
      setMessage(error?.message || "Could not create the draft order.");
    } finally {
      setCreatingSupplier("");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Kitchen assistant</p>
          <h1>Suggested order</h1>
          <p>
            Built from approved invoice frequency, your usual quantities and the latest stock take. Nothing is sent automatically.
          </p>
        </div>
      </header>

      {message && <div className={styles.notice}>{message}</div>}

      <section className={styles.summary} aria-label="Suggested order summary">
        <div className={styles.summaryCard}>
          <span>Items to consider</span>
          <strong>{loading ? "…" : actionable.length}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Suppliers</span>
          <strong>{loading ? "…" : supplierGroups.length}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Estimated value</span>
          <strong>{loading ? "…" : money(estimatedValue)}</strong>
        </div>
      </section>

      {loading ? (
        <div className={styles.empty}>Reading invoice habits and comparing the latest stock take…</div>
      ) : supplierGroups.length === 0 ? (
        <div className={styles.empty}>
          Nothing obvious needs ordering right now. The engine only suggests frequent products when they are due and stock does not already cover the usual quantity.
        </div>
      ) : (
        <section className={styles.grid}>
          {supplierGroups.map(([supplier, items]) => {
            const supplierTotal = items.reduce(
              (sum, item) => sum + (item.unitPrice === null ? 0 : item.unitPrice * item.suggestedQuantity),
              0
            );
            const created = createdSuppliers.includes(supplier);
            return (
              <article className={styles.supplierCard} key={supplier}>
                <div className={styles.supplierHeader}>
                  <div className={styles.supplierTitle}>
                    <div className={styles.avatar}>{supplierInitials(supplier)}</div>
                    <div>
                      <h2>{supplier}</h2>
                      <p>{items.length} suggested item{items.length === 1 ? "" : "s"} · about {money(supplierTotal)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.button}
                    disabled={created || creatingSupplier === supplier}
                    onClick={() => void createDraft(supplier, items)}
                  >
                    {created ? "Draft created" : creatingSupplier === supplier ? "Creating…" : "Create draft"}
                  </button>
                </div>

                <div className={styles.items}>
                  {items.map((item) => (
                    <div className={styles.item} key={item.productId}>
                      <div className={styles.product}>
                        <strong>{item.ingredient}</strong>
                        {item.supplierProduct !== item.ingredient && <span>{item.supplierProduct}</span>}
                        <span className={styles.tag}>{item.invoiceCount} invoices · last {formatShortDate(item.lastOrderedAt)}</span>
                      </div>
                      <div className={styles.meta}>
                        <strong>Usual {prettyOrderQuantity(item.usualQuantity, item.orderUnit)}</strong>
                        <span>{item.averageIntervalDays ? `About every ${item.averageIntervalDays} days` : "Frequent purchase"}</span>
                      </div>
                      <div className={styles.stock}>
                        <strong>{item.stockItem ? `${item.stockItem.quantity ?? "?"} ${item.stockItem.unit}` : "No stock match"}</strong>
                        <span>{item.reason}</span>
                      </div>
                      <div className={styles.quantity}>
                        <span>Suggest</span>
                        <strong>{prettyOrderQuantity(item.suggestedQuantity, item.orderUnit)}</strong>
                        <span>{item.unitPrice === null ? "Price unavailable" : `${money(item.unitPrice)} / ${priceUnitLabel(item.orderUnit)}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      )}

      <Link className={styles.backLink} href="/orders">← Back to Orders</Link>
    </main>
  );
}