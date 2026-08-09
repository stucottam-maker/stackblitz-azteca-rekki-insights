"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

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
  unit: string;
  price: number | null;
  priceUnit: string;
  supplier: string;
};

type OrderLine = {
  id: string;
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  stockQty: number;
  stockUnit: string;
  parLevel: number;
  suggestedQty: number;
  orderQty: number;
  orderUnit: string;
  unitPrice: number | null;
  notes: string;
};

type PurchaseOrder = {
  id: string;
  supplier: string;
  createdAt: string;
  status: "Draft" | "Sent";
  lines: OrderLine[];
  estimatedTotal: number;
};

type PageTab = "draft" | "sent" | "history";

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function formatDate(value: string) {
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

function calculateLineTotal(line: OrderLine) {
  if (line.unitPrice === null) {
    return 0;
  }

  return line.orderQty * line.unitPrice;
}

function buildOrderLines(
  ingredientPrices: Record<string, IngredientPrice>,
  currentStock: StockItem[]
) {
  const names = Array.from(
    new Set([
      ...Object.keys(ingredientPrices),
      ...currentStock.map((item) => item.name),
    ])
  );

  return names.map((name, index): OrderLine => {
    const price = ingredientPrices[name];

    const stock =
      currentStock.find(
        (item) =>
          item.name.toLowerCase() ===
          name.toLowerCase()
      ) ?? null;

    const stockQty = Number(stock?.quantity ?? 0);

    const stockUnit =
      stock?.unit ||
      price?.unit ||
      "kg";

    const defaultPar =
      stockQty > 0
        ? round(stockQty * 1.5)
        : 0;

    const suggestedQty =
      Math.max(
        defaultPar - stockQty,
        0
      );

    return {
      id: `line-${index}-${name}`,
      ingredient: name,
      supplier:
        price?.supplier ||
        stock?.supplier ||
        "Unassigned",
      supplierProduct:
        price?.product || "",
      stockQty,
      stockUnit,
      parLevel: defaultPar,
      suggestedQty,
      orderQty: suggestedQty,
      orderUnit:
        price?.unit ||
        stock?.unit ||
        "kg",
      unitPrice:
        price?.price ?? null,
      notes: "",
    };
  });
}

export default function OrdersPage() {
  const [tab, setTab] =
    useState<PageTab>("draft");

  const [lines, setLines] =
    useState<OrderLine[]>([]);

  const [purchaseOrders, setPurchaseOrders] =
    useState<PurchaseOrder[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const ingredientPrices =
      JSON.parse(
        localStorage.getItem(
          "ingredientPrices"
        ) || "{}"
      ) as Record<string, IngredientPrice>;

    const stockTake =
      JSON.parse(
        localStorage.getItem(
          "currentStockTake"
        ) || '{"items":[]}'
      ) as {
        items?: StockItem[];
      };

    const existingDraft =
      localStorage.getItem(
        "draftOrderLines"
      );

    if (existingDraft) {
      try {
        setLines(
          JSON.parse(existingDraft)
        );
      } catch {
        setLines(
          buildOrderLines(
            ingredientPrices,
            stockTake.items ?? []
          )
        );
      }
    } else {
      setLines(
        buildOrderLines(
          ingredientPrices,
          stockTake.items ?? []
        )
      );
    }

    const storedPOs =
      JSON.parse(
        localStorage.getItem(
          "purchaseOrders"
        ) || "[]"
      ) as PurchaseOrder[];

    setPurchaseOrders(
      storedPOs
    );
  }, []);

  const filteredLines =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return lines.filter((line) => {
        return (
          !query ||
          line.ingredient
            .toLowerCase()
            .includes(query) ||
          line.supplier
            .toLowerCase()
            .includes(query) ||
          line.supplierProduct
            .toLowerCase()
            .includes(query)
        );
      });
    }, [lines, search]);

  const supplierGroups =
    useMemo(() => {
      const groups: Record<
        string,
        OrderLine[]
      > = {};

      filteredLines.forEach((line) => {
        if (!groups[line.supplier]) {
          groups[line.supplier] = [];
        }

        groups[line.supplier].push(line);
      });

      return groups;
    }, [filteredLines]);

  const estimatedOrderValue =
    lines.reduce(
      (total, line) =>
        total +
        calculateLineTotal(line),
      0
    );

  const supplierCount =
    new Set(
      lines
        .filter(
          (line) =>
            line.orderQty > 0
        )
        .map(
          (line) =>
            line.supplier
        )
    ).size;

  const orderLineCount =
    lines.filter(
      (line) =>
        line.orderQty > 0
    ).length;

  const needsPriceCount =
    lines.filter(
      (line) =>
        line.orderQty > 0 &&
        line.unitPrice === null
    ).length;

  const sentOrders =
    purchaseOrders.filter(
      (order) =>
        order.status === "Sent"
    );

  const historyOrders =
    [...purchaseOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  function updateLine(
    id: string,
    field: keyof OrderLine,
    value: string
  ) {
    setLines((current) =>
      current.map((line) => {
        if (line.id !== id) {
          return line;
        }

        if (
          field === "stockQty" ||
          field === "parLevel" ||
          field === "suggestedQty" ||
          field === "orderQty"
        ) {
          return {
            ...line,
            [field]:
              value === ""
                ? 0
                : Number(value),
          };
        }

        if (field === "unitPrice") {
          return {
            ...line,
            unitPrice:
              value === ""
                ? null
                : Number(value),
          };
        }

        return {
          ...line,
          [field]: value,
        };
      })
    );
  }

  function recalculateSuggested(
    id: string
  ) {
    setLines((current) =>
      current.map((line) => {
        if (line.id !== id) {
          return line;
        }

        const suggested =
          Math.max(
            line.parLevel -
              line.stockQty,
            0
          );

        return {
          ...line,
          suggestedQty:
            round(suggested),
          orderQty:
            round(suggested),
        };
      })
    );
  }

  function saveDraft() {
    localStorage.setItem(
      "draftOrderLines",
      JSON.stringify(lines)
    );

    alert(
      "Draft orders saved."
    );
  }

  function markSupplierSent(
    supplier: string
  ) {
    const supplierLines =
      lines.filter(
        (line) =>
          line.supplier ===
            supplier &&
          line.orderQty > 0
      );

    if (
      supplierLines.length === 0
    ) {
      alert(
        "There are no order lines for this supplier."
      );
      return;
    }

    const estimatedTotal =
      supplierLines.reduce(
        (total, line) =>
          total +
          calculateLineTotal(line),
        0
      );

    const order: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      supplier,
      createdAt:
        new Date().toISOString(),
      status: "Sent",
      lines: supplierLines,
      estimatedTotal,
    };

    const nextOrders = [
      order,
      ...purchaseOrders,
    ];

    setPurchaseOrders(
      nextOrders
    );

    localStorage.setItem(
      "purchaseOrders",
      JSON.stringify(nextOrders)
    );

    alert(
      `${supplier} order marked as sent.`
    );
  }

  function clearOrders() {
    const confirmed =
      window.confirm(
        "Clear all order quantities?"
      );

    if (!confirmed) {
      return;
    }

    setLines((current) =>
      current.map((line) => ({
        ...line,
        suggestedQty: 0,
        orderQty: 0,
      }))
    );

    localStorage.removeItem(
      "draftOrderLines"
    );
  }

  function renderOrderTable(
    supplier: string,
    supplierLines: OrderLine[]
  ) {
    const supplierTotal =
      supplierLines.reduce(
        (total, line) =>
          total +
          calculateLineTotal(line),
        0
      );

    return (
      <section
        className="panel order-supplier-panel"
        key={supplier}
      >
        <div className="panel-header">
          <div>
            <p className="panel-kicker">
              Supplier order
            </p>

            <h2>
              {supplier}
            </h2>
          </div>

          <div className="order-supplier-summary">
            <strong>
              {money(
                supplierTotal
              )}
            </strong>

            <button
              className="secondary-inline-button"
              type="button"
              onClick={() =>
                markSupplierSent(
                  supplier
                )
              }
            >
              Mark as sent
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Supplier product</th>
                <th>Stock</th>
                <th>Par</th>
                <th>Suggested</th>
                <th>Order qty</th>
                <th>Unit</th>
                <th>Unit cost</th>
                <th>Est. total</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {supplierLines.map(
                (line) => (
                  <tr
                    key={line.id}
                  >
                    <td>
                      <strong>
                        {line.ingredient}
                      </strong>
                    </td>

                    <td className="order-product-cell">
                      {line.supplierProduct ||
                        "—"}
                    </td>

                    <td>
                      <div className="order-stock-cell">
                        <input
                          value={
                            line.stockQty
                          }
                          inputMode="decimal"
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              line.id,
                              "stockQty",
                              event.target.value
                            )
                          }
                        />

                        <span>
                          {line.stockUnit}
                        </span>
                      </div>
                    </td>

                    <td>
                      <input
                        className="order-number-input"
                        value={
                          line.parLevel
                        }
                        inputMode="decimal"
                        onChange={(
                          event
                        ) =>
                          updateLine(
                            line.id,
                            "parLevel",
                            event.target.value
                          )
                        }
                        onBlur={() =>
                          recalculateSuggested(
                            line.id
                          )
                        }
                      />
                    </td>

                    <td>
                      <button
                        className="suggested-order-button"
                        type="button"
                        onClick={() =>
                          recalculateSuggested(
                            line.id
                          )
                        }
                      >
                        {line.suggestedQty}
                      </button>
                    </td>

                    <td>
                      <input
                        className="order-number-input order-qty-input"
                        value={
                          line.orderQty
                        }
                        inputMode="decimal"
                        onChange={(
                          event
                        ) =>
                          updateLine(
                            line.id,
                            "orderQty",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <select
                        className="order-unit-select"
                        value={
                          line.orderUnit
                        }
                        onChange={(
                          event
                        ) =>
                          updateLine(
                            line.id,
                            "orderUnit",
                            event.target.value
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

                        <option value="case">
                          case
                        </option>

                        <option value="pack">
                          pack
                        </option>
                      </select>
                    </td>

                    <td>
                      <div className="table-money-input">
                        <span>£</span>

                        <input
                          value={
                            line.unitPrice ??
                            ""
                          }
                          inputMode="decimal"
                          placeholder="0.00"
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              line.id,
                              "unitPrice",
                              event.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      <strong>
                        {line.unitPrice !==
                        null
                          ? money(
                              calculateLineTotal(
                                line
                              )
                            )
                          : "—"}
                      </strong>
                    </td>

                    <td>
                      <input
                        className="order-notes-input"
                        value={
                          line.notes
                        }
                        placeholder="Optional"
                        onChange={(
                          event
                        ) =>
                          updateLine(
                            line.id,
                            "notes",
                            event.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <main className="app-shell">
      <Sidebar active="orders" />

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Purchasing
            </p>

            <h1>
              Orders
            </h1>

            <p className="page-description">
              Build supplier purchase
              orders from current stock,
              par levels and latest
              invoice prices.
            </p>
          </div>

          {tab === "draft" && (
            <div className="stock-header-actions">
              <button
                className="cancel-button"
                type="button"
                onClick={
                  clearOrders
                }
              >
                Clear
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={
                  saveDraft
                }
              >
                Save draft
              </button>
            </div>
          )}
        </header>

        <div className="stock-tabs">
          <button
            className={`stock-tab ${
              tab === "draft"
                ? "stock-tab-active"
                : ""
            }`}
            type="button"
            onClick={() =>
              setTab("draft")
            }
          >
            Draft orders
          </button>

          <button
            className={`stock-tab ${
              tab === "sent"
                ? "stock-tab-active"
                : ""
            }`}
            type="button"
            onClick={() =>
              setTab("sent")
            }
          >
            Sent orders
            <span>
              {sentOrders.length}
            </span>
          </button>

          <button
            className={`stock-tab ${
              tab === "history"
                ? "stock-tab-active"
                : ""
            }`}
            type="button"
            onClick={() =>
              setTab("history")
            }
          >
            Order history
          </button>
        </div>

        {tab === "draft" && (
          <>
            <section className="stats-grid">
              <article className="stat-card">
                <p className="stat-label">
                  Estimated order
                </p>

                <p className="stat-value">
                  {money(
                    estimatedOrderValue
                  )}
                </p>

                <p className="stat-change neutral">
                  Current draft
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Suppliers
                </p>

                <p className="stat-value">
                  {supplierCount}
                </p>

                <p className="stat-change neutral">
                  With order lines
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Lines to order
                </p>

                <p className="stat-value">
                  {orderLineCount}
                </p>

                <p className="stat-change neutral">
                  Qty above zero
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Missing prices
                </p>

                <p className="stat-value">
                  {needsPriceCount}
                </p>

                <p
                  className={
                    needsPriceCount > 0
                      ? "stat-change warning"
                      : "stat-change neutral"
                  }
                >
                  {needsPriceCount > 0
                    ? "Needs supplier cost"
                    : "All priced"}
                </p>
              </article>
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    Draft builder
                  </p>

                  <h2>
                    Supplier orders
                  </h2>
                </div>
              </div>

              <div className="ingredient-toolbar">
                <div className="ingredient-search">
                  <input
                    type="search"
                    placeholder="Search ingredient, product or supplier..."
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>

            {Object.entries(
              supplierGroups
            ).map(
              ([
                supplier,
                supplierLines,
              ]) =>
                renderOrderTable(
                  supplier,
                  supplierLines
                )
            )}
          </>
        )}

        {tab === "sent" && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Open purchase orders
                </p>

                <h2>
                  Sent orders
                </h2>
              </div>
            </div>

            <div className="order-history-list">
              {sentOrders.length ===
              0 ? (
                <div className="empty-table-message">
                  No sent purchase orders
                  yet.
                </div>
              ) : (
                sentOrders.map(
                  (order) => (
                    <article
                      className="order-history-card"
                      key={order.id}
                    >
                      <div>
                        <p className="order-history-supplier">
                          {order.supplier}
                        </p>

                        <p className="muted-text">
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      </div>

                      <div>
                        <span className="status-badge status-approved">
                          Sent
                        </span>
                      </div>

                      <div>
                        <strong>
                          {order.lines.length}{" "}
                          lines
                        </strong>
                      </div>

                      <div>
                        <strong>
                          {money(
                            order.estimatedTotal
                          )}
                        </strong>
                      </div>
                    </article>
                  )
                )
              )}
            </div>
          </section>
        )}

        {tab === "history" && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Purchasing history
                </p>

                <h2>
                  Purchase orders
                </h2>
              </div>
            </div>

            <div className="order-history-list">
              {historyOrders.length ===
              0 ? (
                <div className="empty-table-message">
                  No purchase order
                  history yet.
                </div>
              ) : (
                historyOrders.map(
                  (order) => (
                    <article
                      className="order-history-card"
                      key={order.id}
                    >
                      <div>
                        <p className="order-history-supplier">
                          {order.supplier}
                        </p>

                        <p className="muted-text">
                          {order.id}
                        </p>
                      </div>

                      <div>
                        <span className="status-badge status-approved">
                          {order.status}
                        </span>
                      </div>

                      <div>
                        <span className="muted-text">
                          {formatDate(
                            order.createdAt
                          )}
                        </span>
                      </div>

                      <div>
                        <strong>
                          {money(
                            order.estimatedTotal
                          )}
                        </strong>
                      </div>
                    </article>
                  )
                )
              )}
            </div>
          </section>
        )}
      </section>
      </main>

);

}