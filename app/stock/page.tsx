"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type IngredientPrice = {
  price: number;
  unit: string;
  supplier: string;
  product: string;
  updatedAt: string;
};

type StockItem = {
  name: string;
  category: string;
  quantity: number | null;
  stockUnit: string;
  price: number | null;
  priceUnit: string;
  supplier: string;
};

type SavedStockTake = {
  id: string;
  createdAt: string;
  items: StockItem[];
};

const ingredientCategories: Record<string, string> = {
  // FISH
  Cod: "Fish",
  "Black cod": "Fish",
  "26/30 prawn": "Fish",
  "King prawn": "Fish",
  "Tuna loin": "Fish",
  Stonebass: "Fish",
  Trout: "Fish",
  Salmon: "Fish",

  // MEAT
  Ribeye: "Meat",
  "Short rib": "Meat",
  "Pork belly": "Meat",
  "Chicken thigh": "Meat",
  "Birria beef": "Meat",
  "Carnitas pork": "Meat",
  "Lamb cutlets": "Meat",
  "Half chicken": "Meat",
  Tomahawk: "Meat",

  // TORTILLAS / DRY GOODS
  "Masafina tortilla 12cm": "Dry goods",
  "Masafina tortilla 10cm": "Dry goods",
  "Masafina blue corn tortilla 12cm": "Dry goods",

  Miso: "Dry goods",
  Sugar: "Dry goods",
  Mirin: "Dry goods",
  Sake: "Dry goods",
  "Rice vinegar": "Dry goods",
  "Gram flour": "Dry goods",
  "Rice flour": "Dry goods",
  "Potato flour": "Dry goods",
  Cornstarch: "Dry goods",
  "Powdered milk": "Dry goods",
  "Black beans": "Dry goods",
  "Chipotle salt": "Dry goods",

  // PRODUCE
  Chives: "Produce",
  Coriander: "Produce",
  Shallot: "Produce",
  Lemongrass: "Produce",
  Lime: "Produce",
  Garlic: "Produce",
  "Spring onion": "Produce",
  "Kaffir lime leaf": "Produce",

  // SAUCES
  "Fish sauce": "Sauces",
  "Pickled jalapeño": "Sauces",
  "Aji Amarillo": "Sauces",
  "Kimchi no moto": "Sauces",

  // OILS
  "Grapeseed oil": "Oils",
  "Rapeseed oil": "Oils",

  // DAIRY
  Butter: "Dairy",
  Comté: "Dairy",
};

const baseIngredients = Object.keys(ingredientCategories);

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function formatDateTime(value: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function defaultStockUnit(priceUnit: string) {
  if (priceUnit === "kg") return "kg";
  if (priceUnit === "L") return "L";
  if (priceUnit === "each") return "each";

  return "kg";
}

function calculateStockValue(item: StockItem) {
  if (
    item.quantity === null ||
    item.price === null
  ) {
    return 0;
  }

  const quantity = Number(item.quantity);
  const price = Number(item.price);

  if (
    Number.isNaN(quantity) ||
    Number.isNaN(price)
  ) {
    return 0;
  }

  if (
    item.stockUnit === "g" &&
    item.priceUnit === "kg"
  ) {
    return (quantity / 1000) * price;
  }

  if (
    item.stockUnit === "ml" &&
    item.priceUnit === "L"
  ) {
    return (quantity / 1000) * price;
  }

  return quantity * price;
}

export default function StockPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [lastSaved, setLastSaved] =
    useState("");

  useEffect(() => {
    const storedPrices = JSON.parse(
      localStorage.getItem("ingredientPrices") || "{}"
    ) as Record<string, IngredientPrice>;

    const draftStock = localStorage.getItem(
      "currentStockTake"
    );

    if (draftStock) {
      try {
        const parsed = JSON.parse(
          draftStock
        ) as SavedStockTake;

        setItems(parsed.items ?? []);
        setLastSaved(parsed.createdAt ?? "");

        return;
      } catch (error) {
        console.error(
          "Could not load current stock take",
          error
        );
      }
    }

    const allNames = Array.from(
      new Set([
        ...baseIngredients,
        ...Object.keys(storedPrices),
      ])
    );

    const startingItems: StockItem[] =
      allNames.map((name) => {
        const storedPrice = storedPrices[name];

        const priceUnit =
          storedPrice?.unit ?? "";

        return {
          name,
          category:
            ingredientCategories[name] ??
            "Uncategorised",
          quantity: null,
          stockUnit:
            defaultStockUnit(priceUnit),
          price:
            storedPrice?.price ?? null,
          priceUnit,
          supplier:
            storedPrice?.supplier ?? "",
        };
      });

    startingItems.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(
          b.category
        );
      }

      return a.name.localeCompare(b.name);
    });

    setItems(startingItems);
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          items.map((item) => item.category)
        )
      ).sort(),
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          .toLowerCase()
          .includes(query) ||
        item.supplier
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    items,
    search,
    categoryFilter,
  ]);

  const totalStockValue = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        calculateStockValue(item),
      0
    );
  }, [items]);

  const countedCount = items.filter(
    (item) => item.quantity !== null
  ).length;

  const notCountedCount =
    items.length - countedCount;

  const pricedCount = items.filter(
    (item) => item.price !== null
  ).length;

  function updateItem(
    name: string,
    field: keyof StockItem,
    value: string
  ) {
    setItems((current) =>
      current.map((item) => {
        if (item.name !== name) {
          return item;
        }

        if (field === "quantity") {
          return {
            ...item,
            quantity:
              value === ""
                ? null
                : Number(value),
          };
        }

        return {
          ...item,
          [field]: value,
        };
      })
    );
  }

  function saveDraft() {
    const now =
      new Date().toISOString();

    const stockTake: SavedStockTake = {
      id: "current",
      createdAt: now,
      items,
    };

    localStorage.setItem(
      "currentStockTake",
      JSON.stringify(stockTake)
    );

    setLastSaved(now);

    alert("Stock count saved.");
  }

  function completeStockTake() {
    const now =
      new Date().toISOString();

    const stockTake: SavedStockTake = {
      id: `stock-${Date.now()}`,
      createdAt: now,
      items,
    };

    const history = JSON.parse(
      localStorage.getItem(
        "stockTakeHistory"
      ) || "[]"
    ) as SavedStockTake[];

    history.unshift(stockTake);

    localStorage.setItem(
      "stockTakeHistory",
      JSON.stringify(history)
    );

    localStorage.setItem(
      "currentStockTake",
      JSON.stringify(stockTake)
    );

    setLastSaved(now);

    alert(
      `Stock take completed. Total stock value: ${money(
        totalStockValue
      )}`
    );
  }

  function clearCounts() {
    const confirmed = window.confirm(
      "Clear all entered stock quantities?"
    );

    if (!confirmed) return;

    setItems((current) =>
      current.map((item) => ({
        ...item,
        quantity: null,
      }))
    );

    localStorage.removeItem(
      "currentStockTake"
    );

    setLastSaved("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            A
          </div>

          <div>
            <p className="brand-name">
              Azteca Insights
            </p>

            <p className="brand-subtitle">
              Kitchen cost control
            </p>
          </div>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >
          <Link
            className="nav-link"
            href="/"
          >
            <span className="nav-icon">
              ⌂
            </span>
            Dashboard
          </Link>

          <Link
            className="nav-link"
            href="/invoices"
          >
            <span className="nav-icon">
              ▤
            </span>
            Invoices
          </Link>

          <Link
            className="nav-link"
            href="/ingredients"
          >
            <span className="nav-icon">
              ◫
            </span>
            Ingredients
          </Link>

          <Link
            className="nav-link"
            href="/recipes"
          >
            <span className="nav-icon">
              ◇
            </span>
            Recipes
          </Link>

          <Link
            className="nav-link"
            href="/menu"
          >
            <span className="nav-icon">
              ☰
            </span>
            Menu
          </Link>

          <Link
            className="nav-link nav-link-active"
            href="/stock"
          >
            <span className="nav-icon">
              □
            </span>
            Stock counts
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="restaurant-card">
            <div className="restaurant-avatar">
              AZ
            </div>

            <div>
              <p className="restaurant-name">
                Azteca
              </p>

              <p className="restaurant-location">
                Battersea, London
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Inventory control
            </p>

            <h1>Stock count</h1>

            <p className="page-description">
              Count current kitchen stock and calculate
              inventory value using the latest supplier
              prices.
            </p>

            {lastSaved && (
              <p className="stock-last-saved">
                Last saved{" "}
                {formatDateTime(lastSaved)}
              </p>
            )}
          </div>

          <div className="stock-header-actions">
            <button
              className="cancel-button"
              type="button"
              onClick={clearCounts}
            >
              Clear
            </button>

            <button
              className="cancel-button"
              type="button"
              onClick={saveDraft}
            >
              Save draft
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={completeStockTake}
            >
              Complete stock take
            </button>
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Stock value
            </p>

            <p className="stat-value">
              {money(totalStockValue)}
            </p>

            <p className="stat-change neutral">
              Current counted inventory
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Counted
            </p>

            <p className="stat-value">
              {countedCount}
            </p>

            <p className="stat-change neutral">
              of {items.length} ingredients
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Still to count
            </p>

            <p className="stat-value">
              {notCountedCount}
            </p>

            <p
              className={
                notCountedCount > 0
                  ? "stat-change warning"
                  : "stat-change neutral"
              }
            >
              {notCountedCount > 0
                ? "Stock lines remaining"
                : "Count complete"}
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Priced ingredients
            </p>

            <p className="stat-value">
              {pricedCount}
            </p>

            <p className="stat-change neutral">
              Invoice-linked costs
            </p>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Current count
              </p>

              <h2>Kitchen inventory</h2>
            </div>

            <span className="menu-section-count">
              {filteredItems.length}
            </span>
          </div>

          <div className="ingredient-toolbar">
            <div className="ingredient-search">
              <input
                type="search"
                placeholder="Search stock..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="ingredient-filter">
              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Category</th>
                  <th>Count</th>
                  <th>Unit</th>
                  <th>Current cost</th>
                  <th>Supplier</th>
                  <th>Stock value</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map(
                  (item) => {
                    const value =
                      calculateStockValue(
                        item
                      );

                    return (
                      <tr
                        key={item.name}
                      >
                        <td>
                          <strong className="stock-item-name">
                            {item.name}
                          </strong>
                        </td>

                        <td>
                          <span className="ingredient-category-badge">
                            {item.category}
                          </span>
                        </td>

                        <td>
                          <input
                            className="stock-count-input"
                            inputMode="decimal"
                            placeholder="0"
                            value={
                              item.quantity ??
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateItem(
                                item.name,
                                "quantity",
                                event.target
                                  .value
                              )
                            }
                          />
                        </td>

                        <td>
                          <select
                            className="stock-unit-select"
                            value={
                              item.stockUnit
                            }
                            onChange={(
                              event
                            ) =>
                              updateItem(
                                item.name,
                                "stockUnit",
                                event.target
                                  .value
                              )
                            }
                          >
                            <option value="kg">
                              kg
                            </option>

                            <option value="g">
                              g
                            </option>

                            <option value="L">
                              L
                            </option>

                            <option value="ml">
                              ml
                            </option>

                            <option value="each">
                              each
                            </option>
                          </select>
                        </td>

                        <td>
                          {item.price !== null ? (
                            <>
                              <strong>
                                {money(
                                  item.price
                                )}
                              </strong>

                              <span className="stock-price-unit">
                                {" "}
                                /{" "}
                                {item.priceUnit ||
                                  "unit"}
                              </span>
                            </>
                          ) : (
                            <span className="stock-missing-price">
                              No price
                            </span>
                          )}
                        </td>

                        <td>
                          {item.supplier ||
                            "—"}
                        </td>

                        <td>
                          <strong>
                            {item.quantity !==
                              null &&
                            item.price !==
                              null
                              ? money(value)
                              : "—"}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              item.quantity !==
                              null
                                ? "status-approved"
                                : "status-review"
                            }`}
                          >
                            {item.quantity !==
                            null
                              ? "Counted"
                              : "Not counted"}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}