"use client";

import { useEffect, useMemo, useState } from "react";

import { resolveActiveWorkspace } from "../lib/clientWorkspace";
import { supabase } from "../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceStates,
  removeWorkspaceState,
} from "../lib/workspaceState";

type IngredientPrice = {
  price: number;
  unit: string;
  supplier: string;
  product: string;
  updatedAt?: string;
};

type StockItem = {
  id: string;
  name: string;
  category: string;
  quantity: number | null;
  unit: string;
  price: number | null;
  priceUnit: string;
  supplier: string;
  notes?: string;
  priceSource?: string;
  priceSourceProduct?: string;
  priceSourceDate?: string;
  priceReconciledAt?: string;
};

type SavedStockTake = {
  id: string;
  createdAt: string;
  items: StockItem[];
  linkedHistoryId?: string;
};

type Relation<T> = T | T[] | null;

function first<T>(value: Relation<T>): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}


function calculableStockValue(item: StockItem): number | null {
  if (item.quantity === null || item.price === null) return null;

  const quantity = Number(item.quantity);
  const price = Number(item.price);
  if (!Number.isFinite(quantity) || !Number.isFinite(price)) return null;

  const unit = item.unit.toLowerCase().trim();
  const priceUnit = item.priceUnit.toLowerCase().trim();
  if (unit === priceUnit) return quantity * price;
  if (unit === "g" && priceUnit === "kg") return (quantity / 1000) * price;
  if (unit === "kg" && priceUnit === "g") return quantity * 1000 * price;
  if (unit === "ml" && ["l", "ltr", "litre"].includes(priceUnit)) return (quantity / 1000) * price;
  if (["l", "ltr", "litre"].includes(unit) && ["l", "ltr", "litre"].includes(priceUnit)) return quantity * price;
  if (["l", "ltr", "litre"].includes(unit) && priceUnit === "ml") return quantity * 1000 * price;
  return null;
}

function stockValue(item: StockItem) {
  return calculableStockValue(item) ?? 0;
}

function stockValuation(stockItems: StockItem[]) {
  const countedItems = stockItems.filter((item) => item.quantity !== null);
  const pricedItems = countedItems.filter((item) => item.price !== null);
  const valuedItems = pricedItems.filter((item) => calculableStockValue(item) !== null);
  return {
    countedLines: countedItems.length,
    pricedLines: pricedItems.length,
    valuedLines: valuedItems.length,
    missingPriceLines: stockItems.filter((item) => item.price === null).length,
    value: valuedItems.reduce((sum, item) => sum + stockValue(item), 0),
    incomplete: valuedItems.length !== countedItems.length,
  };
}

function csvCell(value: string | number | null | undefined) {
  const text = value == null ? "" : String(value);
  // Prevent spreadsheet formula execution in user-supplied names and notes.
  const safeText =
    typeof value === "string" && /^[\s\x00-\x1f]*[=+\-@]/.test(text)
      ? `'${text}`
      : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function downloadStockCsv(stockItems: StockItem[], filename: string) {
  const header = [
    "Category",
    "Item",
    "Quantity",
    "Unit",
    "Unit price (GBP)",
    "Price unit",
    "Stock value (GBP)",
    "Supplier",
    "Notes",
    "Price source",
    "Matched product",
    "Source date",
  ];
  const rows = stockItems.map((item) => [
    item.category,
    item.name,
    item.quantity,
    item.unit,
    item.price,
    item.priceUnit,
    calculableStockValue(item) === null
      ? null
      : Number(stockValue(item).toFixed(2)),
    item.supplier,
    item.notes ?? "",
    item.priceSource ?? "",
    item.priceSourceProduct ?? "",
    item.priceSourceDate ?? "",
  ]);

  const csv =
    "\uFEFF" +
    [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

function preferredPrice(
  name: string,
  ingredientPrices: Record<string, IngredientPrice>,
  fallbackPrice: number | null,
  fallbackUnit: string,
  fallbackSupplier: string
) {
  const key = Object.keys(ingredientPrices).find(
    (candidate) => normalise(candidate) === normalise(name)
  );
  const stored = key ? ingredientPrices[key] : null;

  return {
    price: stored?.price ?? fallbackPrice,
    priceUnit: stored?.unit ?? fallbackUnit,
    supplier: stored?.supplier ?? fallbackSupplier,
  };
}

function mergeMissingStockItems(existing: StockItem[], extras: StockItem[]) {
  const existingIds = new Set(existing.map((item) => item.id));
  const existingNames = new Set(existing.map((item) => normalise(item.name)));
  return [
    ...existing,
    ...extras.filter(
      (item) => !existingIds.has(item.id) && !existingNames.has(normalise(item.name))
    ),
  ].sort((a, b) => `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`));
}

export default function StockPage() {
  const [tab, setTab] = useState<"count" | "history">("count");
  const [items, setItems] = useState<StockItem[]>([]);
  const [history, setHistory] = useState<SavedStockTake[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [reviewMissing, setReviewMissing] = useState(false);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [linkedHistoryId, setLinkedHistoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const [workspaceLabel, setWorkspaceLabel] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setMessage("");

        const workspace = await resolveActiveWorkspace();
        if (!workspace) throw new Error("No active restaurant workspace.");
        setWorkspaceLabel(`${workspace.organisationName}_${workspace.siteName}`);

        const [state, catalogueResult, prepResult] = await Promise.all([
          readWorkspaceStates([
            "ingredientPrices",
            "currentStockTake",
            "stockTakeHistory",
          ]),
          supabase
            .from("supplier_products")
            .select(`
              id,
              supplier_product_name,
              price_unit,
              latest_price,
              preferred,
              supplier:suppliers(name),
              ingredient:ingredients(id,name,category,base_unit)
            `)
            .eq("organisation_id", workspace.organisationId)
            .order("preferred", { ascending: false })
            .order("supplier_product_name")
            .limit(5000),
          supabase
            .from("ingredients")
            .select("id,name,category,base_unit")
            .eq("organisation_id", workspace.organisationId)
            .eq("category", "Prepared batches")
            .order("name"),
        ]);

        if (catalogueResult.error) throw catalogueResult.error;
        if (prepResult.error) throw prepResult.error;

        const ingredientPrices = (state.get("ingredientPrices") ?? {}) as Record<
          string,
          IngredientPrice
        >;
        const savedDraft = (state.get("currentStockTake") ?? null) as SavedStockTake | null;
        const savedHistory = (state.get("stockTakeHistory") ?? []) as SavedStockTake[];

        const prepItems: StockItem[] = (prepResult.data ?? []).map((row) => ({
          id: row.id,
          name: row.name,
          category: row.category || "Prepared batches",
          quantity: null,
          unit: row.base_unit || "kg",
          price: null,
          priceUnit: row.base_unit || "kg",
          supplier: "Kitchen prep",
        }));

        const safeHistory = Array.isArray(savedHistory) ? savedHistory : [];
        setHistory(safeHistory);
        setLinkedHistoryId(
          savedDraft?.linkedHistoryId ??
          safeHistory.find(
            (entry) => entry.createdAt === savedDraft?.createdAt && entry.items?.length === savedDraft?.items?.length
          )?.id ??
          null
        );

        if (savedDraft?.items?.length) {
          setItems(mergeMissingStockItems(savedDraft.items, prepItems));
          setLastSaved(savedDraft.createdAt || "");
          return;
        }

        const byIngredient = new Map<string, StockItem>();

        for (const row of catalogueResult.data ?? []) {
          const supplier = first(row.supplier as Relation<{ name: string }>);
          const ingredient = first(
            row.ingredient as Relation<{
              id: string;
              name: string;
              category: string | null;
              base_unit: string | null;
            }>
          );

          const name = ingredient?.name || row.supplier_product_name;
          const id = ingredient?.id || `product-${row.id}`;
          const key = ingredient?.id || normalise(name);
          const current = byIngredient.get(key);

          // Preferred supplier products are returned first, so keep the first row.
          if (current) continue;

          const price = preferredPrice(
            name,
            ingredientPrices,
            row.latest_price == null ? null : Number(row.latest_price),
            row.price_unit || ingredient?.base_unit || "each",
            supplier?.name || ""
          );

          byIngredient.set(key, {
            id,
            name,
            category: ingredient?.category || "Other",
            quantity: null,
            unit: ingredient?.base_unit || row.price_unit || "each",
            price: price.price,
            priceUnit: price.priceUnit,
            supplier: price.supplier,
          });
        }

        for (const prepItem of prepItems) {
          if (!byIngredient.has(prepItem.id)) byIngredient.set(prepItem.id, prepItem);
        }

        setItems(
          Array.from(byIngredient.values()).sort((a, b) =>
            `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`)
          )
        );
      } catch (error) {
        console.error("Stock load failed", error);
        setMessage(error instanceof Error ? error.message : "Could not load stock.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))).sort(),
    ],
    [items]
  );

  const visibleItems = useMemo(() => {
    const query = normalise(search);
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        !query ||
        normalise(item.name).includes(query) ||
        normalise(item.category).includes(query) ||
        normalise(item.supplier).includes(query);
      const matchesReview = !reviewMissing || reviewIds.includes(item.id);
      return matchesCategory && matchesSearch && matchesReview;
    });
  }, [items, search, category, reviewMissing, reviewIds]);

  const currentValuation = stockValuation(items);
  const counted = currentValuation.countedLines;
  const missingPrices = currentValuation.missingPriceLines;
  const totalValue = currentValuation.value;

  function togglePriceReview() {
    if (!reviewMissing) {
      setReviewIds(
        items.filter((item) =>
          item.quantity !== null && calculableStockValue(item) === null
        ).map((item) => item.id)
      );
      setCategory("All");
      setSearch("");
    }
    setReviewMissing((previous) => !previous);
  }

  function updateUnitPrice(id: string, value: string) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const price = value.trim() === "" ? null : Number(value);
        if (price !== null && (!Number.isFinite(price) || price < 0)) return item;
        return {
          ...item,
          price,
          priceUnit: item.unit,
          priceSource: "Manually entered in Kommee",
          priceSourceProduct: item.name,
          priceSourceDate: new Date().toISOString().slice(0, 10),
        };
      })
    );
  }

  function updateQuantity(id: string, value: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: value === "" ? null : Number(value),
            }
          : item
      )
    );
  }

  function bumpQuantity(id: string, direction: -1 | 1) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const unit = item.unit.toLowerCase();
        const step = ["kg", "l", "ltr", "litre"].includes(unit) ? 0.5 : 1;
        const next = Math.max(0, Number(item.quantity ?? 0) + step * direction);
        return { ...item, quantity: Math.round(next * 100) / 100 };
      })
    );
  }

  function exportStock(stockItems: StockItem[], createdAt?: string) {
    if (!stockItems.length) return;

    const date = createdAt ? createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
    const location = (workspaceLabel || "Kommee")
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "");
    const kind = createdAt ? "completed" : "current";
    try {
      downloadStockCsv(stockItems, `${location}_stock_${date}_${kind}.csv`);
      setMessage("Stock take downloaded as an Excel-compatible CSV file.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not download stock take.");
    }
  }

  async function saveDraft() {
    try {
      setSaving(true);
      const now = new Date().toISOString();
      const draft: SavedStockTake = {
        id: "current",
        createdAt: now,
        items,
        linkedHistoryId: linkedHistoryId ?? undefined,
      };

      await persistWorkspaceState("currentStockTake", JSON.stringify(draft));

      // A historical count linked to this draft receives price corrections,
      // but never changes its original quantities, names or timestamp.
      if (linkedHistoryId) {
        const byId = new Map(items.map((item) => [item.id, item]));
        const nextHistory = history.map((take) =>
          take.id === linkedHistoryId
            ? {
                ...take,
                items: take.items.map((original) => {
                  const edited = byId.get(original.id);
                  return edited
                    ? {
                        ...original,
                        price: edited.price,
                        priceUnit: edited.priceUnit,
                        supplier: edited.supplier,
                        priceSource: edited.priceSource,
                        priceSourceProduct: edited.priceSourceProduct,
                        priceSourceDate: edited.priceSourceDate,
                      }
                    : original;
                }),
              }
            : take
        );
        await persistWorkspaceState("stockTakeHistory", JSON.stringify(nextHistory));
        setHistory(nextHistory);
      }
      setLastSaved(now);
      setMessage("Stock prices and counts saved to this restaurant.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save stock count.");
    } finally {
      setSaving(false);
    }
  }

  async function completeCount() {
    const confirmed = window.confirm(
      `Complete this stock take? ${counted} of ${items.length} lines have been counted.`
    );
    if (!confirmed) return;

    try {
      setSaving(true);
      const now = new Date().toISOString();
      const completed: SavedStockTake = {
        id: `stock-${Date.now()}`,
        createdAt: now,
        items,
      };
      const nextHistory = [completed, ...history].slice(0, 100);

      await persistWorkspaceState("stockTakeHistory", JSON.stringify(nextHistory));
      await removeWorkspaceState("currentStockTake");

      setHistory(nextHistory);
      setLinkedHistoryId(null);
      setLastSaved("");
      setMessage(currentValuation.incomplete
        ? "Stock count completed. Valuation is partial until missing prices and units are resolved."
        : `Stock take completed · ${money(totalValue)} counted value.`);
      setItems((current) => current.map((item) => ({ ...item, quantity: null })));
      setTab("history");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not complete stock take.");
    } finally {
      setSaving(false);
    }
  }

  async function startFreshCount() {
    const hasCounts = items.some((item) => item.quantity !== null);
    if (
      hasCounts &&
      !window.confirm("Start a fresh count? The current draft quantities will be cleared.")
    ) {
      return;
    }

    await removeWorkspaceState("currentStockTake");
    setItems((current) => current.map((item) => ({ ...item, quantity: null })));
    setLastSaved("");
    setLinkedHistoryId(null);
    setReviewMissing(false);
    setReviewIds([]);
    setMessage("Fresh stock count ready.");
  }

  return (
    <div className="page stock-page chef-stock-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Stock</h1>
          <p className="page-description">
            Count what is actually in the kitchen, including bought-in products and prepared batches.
          </p>
          {lastSaved && <p className="stock-last-saved">Draft saved {formatDate(lastSaved)}</p>}
        </div>

        <div className="stock-header-actions">
          <button
            type="button"
            className="secondary-inline-button"
            disabled={loading || (tab === "count" ? !items.length : !history.length)}
            onClick={() =>
              tab === "count"
                ? exportStock(items)
                : exportStock(history[0].items, history[0].createdAt)
            }
          >
            Download CSV
          </button>
          {tab === "count" && (<>
            <button type="button" className="secondary-inline-button" onClick={() => void startFreshCount()}>
              New count
            </button>
            <button type="button" className="secondary-inline-button" disabled={saving} onClick={() => void saveDraft()}>
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button type="button" className="primary-button" disabled={saving || !items.length} onClick={() => void completeCount()}>
              Complete count
            </button>
          </>)}
        </div>
      </header>

      {message && <div className="notice">{message}</div>}

      <div className="stock-tabs chef-stock-tabs">
        <button type="button" className={`stock-tab ${tab === "count" ? "stock-tab-active" : ""}`} onClick={() => setTab("count")}>
          Count now
        </button>
        <button type="button" className={`stock-tab ${tab === "history" ? "stock-tab-active" : ""}`} onClick={() => setTab("history")}>
          History <span>{history.length}</span>
        </button>
      </div>

      {tab === "count" && (
        <>
          <section className="stats-grid chef-stock-stats">
            <article className="stat-card">
              <p className="stat-label">Counted</p>
              <p className="stat-value">{loading ? "—" : `${counted}/${items.length}`}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">{currentValuation.incomplete ? "Priced portion only" : "Current value"}</p>
              <p className="stat-value">{loading ? "—" : money(totalValue)}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">Missing prices</p>
              <p className="stat-value">{loading ? "—" : missingPrices}</p>
            </article>
          </section>
          {!loading && currentValuation.incomplete && (
            <div className="stock-valuation-warning" role="status">
              <strong>Stock valuation incomplete</strong>
              <span>
                {currentValuation.pricedLines} of {currentValuation.countedLines} counted lines have a price.
                {currentValuation.pricedLines > currentValuation.valuedLines
                  ? ` ${currentValuation.pricedLines - currentValuation.valuedLines} priced lines also need compatible units.`
                  : ""}
                {" "}The figure above is only the costed portion, not the total stock value.
              </span>
            </div>
          )}

          <section className="panel chef-stock-panel">
            <div className="stock-toolbar chef-stock-toolbar">
              <div className="ingredient-search">
                <input
                  type="search"
                  placeholder="Search ingredient, batch or supplier…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="ingredient-filter">
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <button
                className="secondary-inline-button stock-review-button"
                type="button"
                onClick={togglePriceReview}
                disabled={loading || saving}
              >
                {reviewMissing ? "Show all stock" : "Review missing prices"}
              </button>
            </div>
            {reviewMissing && (
              <div className="stock-price-review-help">
                Enter a confirmed purchase cost per displayed unit, then tap <strong>Save draft</strong>.
                Prices for the linked 17 November count will update in History without altering its quantities.
              </div>
            )}

            {loading ? (
              <div className="empty-table-message">Loading this restaurant&apos;s stock list…</div>
            ) : items.length === 0 ? (
              <div className="empty-extraction">
                <p>No stock items yet</p>
                <span>Upload supplier invoices first. Products will then appear here automatically.</span>
              </div>
            ) : (
              <div className="chef-stock-list">
                {visibleItems.map((item) => (
                  <article className={`chef-stock-row ${item.quantity !== null ? "chef-stock-row-counted" : ""}`} key={item.id}>
                    <div className="chef-stock-copy">
                      <span className="ingredient-category-badge">{item.category}</span>
                      <strong>{item.name}</strong>
                      <small>
                        {item.category === "Prepared batches" && item.price === null
                          ? "Kitchen prep · recipe cost pending"
                          : <>
                              {item.supplier || "No supplier"}
                              {item.price !== null ? ` · ${money(item.price)}/${item.priceUnit || item.unit}` : " · price needed"}
                            </>}
                      </small>
                    </div>

                    <div className="chef-stock-counter" aria-label={`Count ${item.name}`}>
                      <button type="button" onClick={() => bumpQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button>
                      <input
                        inputMode="decimal"
                        value={item.quantity ?? ""}
                        placeholder="0"
                        onChange={(event) => updateQuantity(item.id, event.target.value)}
                        aria-label={`${item.name} quantity`}
                      />
                      <span>{item.unit}</span>
                      <button type="button" onClick={() => bumpQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button>
                    </div>

                    {reviewMissing && (
                      <label className="stock-price-editor">
                        <span>Cost per {item.unit} (£)</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="any"
                          placeholder="Enter cost"
                          value={item.price !== null && item.priceUnit.toLowerCase() === item.unit.toLowerCase() ? item.price : ""}
                          onChange={(event) => updateUnitPrice(item.id, event.target.value)}
                          aria-label={`Price per ${item.unit} for ${item.name}`}
                        />
                      </label>
                    )}
                    <strong className="chef-stock-value">
                      {calculableStockValue(item) !== null ? money(stockValue(item)) : "—"}
                    </strong>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {tab === "history" && (
        <section className="panel chef-stock-history-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Completed counts</p>
              <h2>Stock history</h2>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="empty-extraction">
              <p>No completed stock counts yet</p>
              <span>Your first completed count will appear here.</span>
            </div>
          ) : (
            <div className="chef-stock-history-list">
              {history.map((take) => {
                const valuation = stockValuation(take.items);
                return (
                  <article className="chef-stock-history-row" key={take.id}>
                    <div className="chef-stock-history-main">
                      <strong>{formatDate(take.createdAt)}</strong>
                      <span>{valuation.countedLines} of {take.items.length} lines counted</span>
                    </div>
                    <div className="chef-stock-history-meta">
                      <strong>{valuation.incomplete ? `Costed portion: ${money(valuation.value)}` : money(valuation.value)}</strong>
                      <span>
                        {valuation.incomplete
                          ? `${valuation.pricedLines} priced, ${valuation.missingPriceLines} missing prices · Not a total value`
                          : "All counted lines valued"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="secondary-inline-button chef-stock-history-download"
                      onClick={() => exportStock(take.items, take.createdAt)}
                    >
                      Download CSV
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
