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
};

type SavedStockTake = {
  id: string;
  createdAt: string;
  items: StockItem[];
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

function stockValue(item: StockItem) {
  if (item.quantity === null || item.price === null) return 0;

  const quantity = Number(item.quantity);
  const price = Number(item.price);
  if (!Number.isFinite(quantity) || !Number.isFinite(price)) return 0;

  const unit = item.unit.toLowerCase();
  const priceUnit = item.priceUnit.toLowerCase();

  if (unit === priceUnit) return quantity * price;
  if (unit === "g" && priceUnit === "kg") return (quantity / 1000) * price;
  if (unit === "ml" && ["l", "ltr", "litre"].includes(priceUnit)) {
    return (quantity / 1000) * price;
  }

  return 0;
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [lastSaved, setLastSaved] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setMessage("");

        const workspace = await resolveActiveWorkspace();
        if (!workspace) throw new Error("No active restaurant workspace.");

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

        setHistory(Array.isArray(savedHistory) ? savedHistory : []);

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
      return matchesCategory && matchesSearch;
    });
  }, [items, search, category]);

  const counted = items.filter((item) => item.quantity !== null).length;
  const missingPrices = items.filter(
    (item) => item.price === null && item.category !== "Prepared batches"
  ).length;
  const totalValue = items.reduce((sum, item) => sum + stockValue(item), 0);

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

  async function saveDraft() {
    try {
      setSaving(true);
      const now = new Date().toISOString();
      const draft: SavedStockTake = {
        id: "current",
        createdAt: now,
        items,
      };
      await persistWorkspaceState("currentStockTake", JSON.stringify(draft));
      setLastSaved(now);
      setMessage("Stock count saved.");
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
      setLastSaved("");
      setMessage(`Stock take completed · ${money(totalValue)} counted value.`);
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

        {tab === "count" && (
          <div className="stock-header-actions">
            <button type="button" className="secondary-inline-button" onClick={() => void startFreshCount()}>
              New count
            </button>
            <button type="button" className="secondary-inline-button" disabled={saving} onClick={() => void saveDraft()}>
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button type="button" className="primary-button" disabled={saving || !items.length} onClick={() => void completeCount()}>
              Complete count
            </button>
          </div>
        )}
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
              <p className="stat-label">Current value</p>
              <p className="stat-value">{loading ? "—" : money(totalValue)}</p>
            </article>
            <article className="stat-card">
              <p className="stat-label">Missing prices</p>
              <p className="stat-value">{loading ? "—" : missingPrices}</p>
            </article>
          </section>

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
            </div>

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

                    <strong className="chef-stock-value">
                      {item.quantity !== null && item.price !== null ? money(stockValue(item)) : "—"}
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
                const countedLines = take.items.filter((item) => item.quantity !== null).length;
                const value = take.items.reduce((sum, item) => sum + stockValue(item), 0);
                return (
                  <article className="chef-stock-history-row" key={take.id}>
                    <div>
                      <strong>{formatDate(take.createdAt)}</strong>
                      <span>{countedLines} counted lines</span>
                    </div>
                    <strong>{money(value)}</strong>
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
