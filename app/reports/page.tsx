"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { loadInsightWorkspaceData } from "../lib/insightWorkspaceData";

import {
  generateInsights,
  formatCurrency,
  formatPercent,
  type IngredientPriceRecord,
  type PurchaseOrder,
  type ApprovedInvoice,
  type StockTake,
  type RecipeCostSummary,
} from "../data/insights";

type ReportView =
  | "overview"
  | "supplier"
  | "cogs"
  | "prices"
  | "stock"
  | "recipes";

export default function ReportsPage() {
  const [
    ingredientPrices,
    setIngredientPrices,
  ] = useState<
    Record<
      string,
      IngredientPriceRecord
    >
  >({});

  const [
    previousIngredientPrices,
    setPreviousIngredientPrices,
  ] = useState<
    Record<
      string,
      IngredientPriceRecord
    >
  >({});

  const [
    purchaseOrders,
    setPurchaseOrders,
  ] =
    useState<PurchaseOrder[]>(
      []
    );

  const [
    invoices,
    setInvoices,
  ] =
    useState<ApprovedInvoice[]>(
      []
    );

  const [
    stockTakes,
    setStockTakes,
  ] =
    useState<StockTake[]>(
      []
    );

  const [
    recipeCosts,
    setRecipeCosts,
  ] =
    useState<
      RecipeCostSummary[]
    >([]);

  const [
    salesThisPeriod,
    setSalesThisPeriod,
  ] = useState<
    number | null
  >(null);

  const [
    theoreticalFoodCostPercent,
    setTheoreticalFoodCostPercent,
  ] = useState<
    number | null
  >(null);

  const [
    activeView,
    setActiveView,
  ] =
    useState<ReportView>(
      "overview"
    );

  useEffect(() => {
    loadInsightWorkspaceData()
      .then((data) => {
        setIngredientPrices(data.ingredientPrices);
        setPreviousIngredientPrices(data.previousIngredientPrices);
        setPurchaseOrders(data.purchaseOrders);
        setInvoices(data.invoices);
        setStockTakes(data.stockTakes);
        setRecipeCosts(data.recipeCosts);
        setSalesThisPeriod(data.salesThisPeriod);
        setTheoreticalFoodCostPercent(data.theoreticalFoodCostPercent);
      })
      .catch((error) => console.error("Reports cloud load failed", error));
  }, []);

  const insightData =
    useMemo(
      () =>
        generateInsights({
          ingredientPrices,
          previousIngredientPrices,
          purchaseOrders,
          invoices,
          stockTakes,
          recipeCosts,
          salesThisPeriod,
          theoreticalFoodCostPercent,
        }),
      [
        ingredientPrices,
        previousIngredientPrices,
        purchaseOrders,
        invoices,
        stockTakes,
        recipeCosts,
        salesThisPeriod,
        theoreticalFoodCostPercent,
      ]
    );

  const supplierRows =
    insightData.supplierSpend;

  const priceChanges =
    useMemo(() => {
      return Object.entries(
        ingredientPrices
      )
        .map(
          ([
            ingredient,
            current,
          ]) => {
            const previous =
              previousIngredientPrices[
                ingredient
              ];

            if (
              !previous ||
              !previous.price ||
              !current.price
            ) {
              return null;
            }

            const change =
              ((current.price -
                previous.price) /
                previous.price) *
              100;

            return {
              ingredient,

              supplier:
                current.supplier ??
                "Unknown supplier",

              oldPrice:
                previous.price,

              newPrice:
                current.price,

              unit:
                current.unit ??
                "unit",

              change,
            };
          }
        )
        .filter(
          (
            item
          ): item is {
            ingredient: string;
            supplier: string;
            oldPrice: number;
            newPrice: number;
            unit: string;
            change: number;
          } =>
            Boolean(item)
        )
        .sort(
          (a, b) =>
            Math.abs(
              b.change
            ) -
            Math.abs(
              a.change
            )
        );
    }, [
      ingredientPrices,
      previousIngredientPrices,
    ]);

  const totalSupplierSpend =
    supplierRows.reduce(
      (sum, supplier) =>
        sum +
        supplier.total,
      0
    );

  const monthlySpend = useMemo(() => {
    const totals = new Map<string, number>();

    invoices.forEach((invoice) => {
      if (!invoice.invoiceDate) return;
      const date = new Date(invoice.invoiceDate);
      if (Number.isNaN(date.getTime())) return;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      totals.set(key, (totals.get(key) ?? 0) + (invoice.total ?? invoice.subtotal ?? 0));
    });

    return Array.from(totals.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, total]) => ({
        month,
        label: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(
          new Date(`${month}-01T12:00:00`)
        ),
        total,
      }));
  }, [invoices]);

  const supplierChartRows = supplierRows.slice(0, 6);
  const supplierChartMax = Math.max(...supplierChartRows.map((row) => row.total), 1);
  const priceChartRows = priceChanges.slice(0, 6);
  const priceChartMax = Math.max(...priceChartRows.map((row) => Math.abs(row.change)), 1);
  const trendChartMax = Math.max(...monthlySpend.map((row) => row.total), 1);
  const trendPoints = monthlySpend.map((row, index) => {
    const x = monthlySpend.length === 1 ? 50 : (index / (monthlySpend.length - 1)) * 100;
    const y = 92 - (row.total / trendChartMax) * 76;
    return { ...row, x, y };
  });

  const reportTabs: [
    ReportView,
    string
  ][] = [
    [
      "overview",
      "Overview",
    ],
    [
      "supplier",
      "Purchases by supplier",
    ],
    [
      "cogs",
      "COGS & GP",
    ],
    [
      "prices",
      "Price changes",
    ],
    [
      "stock",
      "Stock",
    ],
    [
      "recipes",
      "Recipe margins",
    ],
  ];

  return (
    <div className="app-shell">
      <Sidebar active="reports" />

      <main className="main-content reports-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Analysis
            </p>

            <h1>
              Reports
            </h1>

            <p className="page-description">
              Purchasing, COGS,
              supplier spend, stock
              movement and menu
              margin reporting.
            </p>
          </div>

          <div className="reports-header-actions">
            <Link
              href="/insights"
              className="secondary-inline-button"
            >
              View insights
            </Link>

            <Link
              href="/invoices/upload"
              className="primary-button"
            >
              Upload invoice
            </Link>
          </div>
        </header>

        <nav className="reports-tabs-clean">
          {reportTabs.map(
            ([
              value,
              label,
            ]) => (
              <button
                key={value}
                type="button"
                className={`reports-tab-clean ${
                  activeView ===
                  value
                    ? "reports-tab-clean-active"
                    : ""
                }`}
                onClick={() =>
                  setActiveView(
                    value
                  )
                }
              >
                {label}
              </button>
            )
          )}
        </nav>

        {activeView ===
          "overview" && (
          <>
            <section className="stats-grid">
              <article className="stat-card">
                <p className="stat-label">
                  Spend this month
                </p>

                <p className="stat-value">
                  {formatCurrency(
                    insightData
                      .metrics
                      .spendThisMonth
                  )}
                </p>

                <p className="stat-change neutral">
                  {insightData
                    .metrics
                    .spendChangePercent ===
                  null
                    ? "No prior comparison"
                    : `${formatPercent(
                        Math.abs(
                          insightData
                            .metrics
                            .spendChangePercent
                        )
                      )} ${
                        insightData
                          .metrics
                          .spendChangePercent >=
                        0
                          ? "above"
                          : "below"
                      } last month`}
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Actual COGS
                </p>

                <p className="stat-value">
                  {formatCurrency(
                    insightData
                      .metrics
                      .actualCogs
                  )}
                </p>

                <p className="stat-change neutral">
                  {insightData
                    .metrics
                    .actualFoodCostPercent ===
                  null
                    ? "Sales data required"
                    : `${formatPercent(
                        insightData
                          .metrics
                          .actualFoodCostPercent
                      )} of sales`}
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Theoretical food
                  cost
                </p>

                <p className="stat-value">
                  {formatPercent(
                    insightData
                      .metrics
                      .theoreticalFoodCostPercent
                  )}
                </p>

                <p className="stat-change neutral">
                  Recipe-based food
                  cost
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Food cost variance
                </p>

                <p
                  className={`stat-value ${
                    insightData
                      .metrics
                      .foodCostVariancePercent !==
                      null &&
                    insightData
                      .metrics
                      .foodCostVariancePercent >
                      0
                      ? "report-value-negative"
                      : ""
                  }`}
                >
                  {insightData
                    .metrics
                    .foodCostVariancePercent ===
                  null
                    ? "—"
                    : `${
                        insightData
                          .metrics
                          .foodCostVariancePercent >=
                        0
                          ? "+"
                          : ""
                      }${insightData.metrics.foodCostVariancePercent.toFixed(
                        1
                      )} pts`}
                </p>

                <p className="stat-change neutral">
                  Actual vs
                  theoretical
                </p>
              </article>
            </section>

            <section className="report-chart-grid" aria-label="Purchasing charts">
              <article className="panel report-chart-card">
                <div className="report-chart-heading">
                  <div>
                    <p className="panel-kicker">Purchasing mix</p>
                    <h2>Spend by supplier</h2>
                  </div>
                  <span>Top {supplierChartRows.length}</span>
                </div>

                {supplierChartRows.length === 0 ? (
                  <p className="report-chart-empty">Approve invoices to build this chart.</p>
                ) : (
                  <div className="report-bar-chart">
                    {supplierChartRows.map((supplier) => (
                      <div className="report-bar-row" key={supplier.supplier}>
                        <div className="report-bar-label">
                          <span title={supplier.supplier}>{supplier.supplier}</span>
                          <strong>{formatCurrency(supplier.total)}</strong>
                        </div>
                        <div className="report-bar-track" aria-hidden="true">
                          <span style={{ width: `${(supplier.total / supplierChartMax) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <article className="panel report-chart-card">
                <div className="report-chart-heading">
                  <div>
                    <p className="panel-kicker">Invoice history</p>
                    <h2>Spend over time</h2>
                  </div>
                  <span>Last 6 months</span>
                </div>

                {trendPoints.length === 0 ? (
                  <p className="report-chart-empty">Invoice dates will create this trend automatically.</p>
                ) : (
                  <div className="report-line-chart">
                    <svg viewBox="0 0 100 100" role="img" aria-label="Monthly purchasing spend trend" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="spend-area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2f7255" stopOpacity=".26" />
                          <stop offset="100%" stopColor="#2f7255" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {[24, 50, 76].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className="report-chart-gridline" />)}
                      {trendPoints.length > 1 && (
                        <>
                          <polygon points={`0,92 ${trendPoints.map((point) => `${point.x},${point.y}`).join(" ")} 100,92`} fill="url(#spend-area)" />
                          <polyline points={trendPoints.map((point) => `${point.x},${point.y}`).join(" ")} className="report-chart-line" />
                        </>
                      )}
                      {trendPoints.map((point) => <circle key={point.month} cx={point.x} cy={point.y} r="2.2" className="report-chart-dot" />)}
                    </svg>
                    <div className="report-line-labels">
                      {trendPoints.map((point) => (
                        <div key={point.month}>
                          <strong>{formatCurrency(point.total)}</strong>
                          <span>{point.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <article className="panel report-chart-card">
                <div className="report-chart-heading">
                  <div>
                    <p className="panel-kicker">Cost movement</p>
                    <h2>Largest price changes</h2>
                  </div>
                  <button type="button" onClick={() => setActiveView("prices")}>View all →</button>
                </div>

                {priceChartRows.length === 0 ? (
                  <p className="report-chart-empty">A second price period is needed for comparison.</p>
                ) : (
                  <div className="report-change-chart">
                    {priceChartRows.map((item) => (
                      <div className="report-change-row" key={`${item.supplier}-${item.ingredient}`}>
                        <span title={item.ingredient}>{item.ingredient}</span>
                        <div className="report-change-track" aria-hidden="true">
                          <span className={item.change >= 0 ? "increase" : "decrease"} style={{ width: `${(Math.abs(item.change) / priceChartMax) * 100}%` }} />
                        </div>
                        <strong className={item.change >= 0 ? "increase-text" : "decrease-text"}>
                          {item.change >= 0 ? "+" : ""}{item.change.toFixed(1)}%
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </section>

            <section className="reports-overview-grid-clean">
              <article className="panel report-overview-panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-kicker">
                      Purchasing
                    </p>

                    <h2>
                      Supplier spend
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="report-text-button"
                    onClick={() =>
                      setActiveView(
                        "supplier"
                      )
                    }
                  >
                    Full report →
                  </button>
                </div>

                {supplierRows.length ===
                0 ? (
                  <div className="report-empty-state">
                    <div className="report-empty-icon">
                      £
                    </div>

                    <h3>
                      No supplier
                      spend yet
                    </h3>

                    <p>
                      Supplier spend
                      will appear here
                      as invoices are
                      approved.
                    </p>
                  </div>
                ) : (
                  <div className="report-supplier-list-clean">
                    {supplierRows
                      .slice(
                        0,
                        6
                      )
                      .map(
                        (
                          supplier
                        ) => (
                          <div
                            className="report-supplier-row-clean"
                            key={
                              supplier.supplier
                            }
                          >
                            <div>
                              <strong>
                                {
                                  supplier.supplier
                                }
                              </strong>

                              <span>
                                {
                                  supplier.invoiceCount
                                }{" "}
                                {supplier.invoiceCount ===
                                1
                                  ? "invoice"
                                  : "invoices"}
                              </span>
                            </div>

                            <strong>
                              {formatCurrency(
                                supplier.total
                              )}
                            </strong>
                          </div>
                        )
                      )}
                  </div>
                )}
              </article>

              <article className="panel report-overview-panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-kicker">
                      Inventory
                    </p>

                    <h2>
                      Latest COGS
                      period
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="report-text-button"
                    onClick={() =>
                      setActiveView(
                        "cogs"
                      )
                    }
                  >
                    Full report →
                  </button>
                </div>

                <div className="report-kpi-list-clean">
                  <div>
                    <span>
                      Opening stock
                    </span>

                    <strong>
                      {formatCurrency(
                        insightData
                          .metrics
                          .openingStockValue
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Purchases
                    </span>

                    <strong>
                      {formatCurrency(
                        insightData
                          .metrics
                          .purchasesBetweenCounts
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Closing stock
                    </span>

                    <strong>
                      {formatCurrency(
                        insightData
                          .metrics
                          .closingStockValue
                      )}
                    </strong>
                  </div>

                  <div className="report-kpi-total-clean">
                    <span>
                      Actual COGS
                    </span>

                    <strong>
                      {formatCurrency(
                        insightData
                          .metrics
                          .actualCogs
                      )}
                    </strong>
                  </div>
                </div>
              </article>
            </section>
          </>
        )}

        {activeView ===
          "supplier" && (
          <section className="panel report-main-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Purchasing
                </p>

                <h2>
                  Purchases by
                  supplier
                </h2>
              </div>

              <span className="report-result-count">
                {
                  supplierRows.length
                }{" "}
                suppliers
              </span>
            </div>

            {supplierRows.length ===
            0 ? (
              <div className="report-empty-state">
                <div className="report-empty-icon">
                  £
                </div>

                <h3>
                  No purchase data
                </h3>

                <p>
                  Approved invoice
                  data will populate
                  this report.
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="report-table-clean">
                  <thead>
                    <tr>
                      <th>
                        Supplier
                      </th>

                      <th>
                        Invoices
                      </th>

                      <th>
                        Spend
                      </th>

                      <th>
                        Share
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {supplierRows.map(
                      (
                        supplier
                      ) => {
                        const share =
                          totalSupplierSpend >
                          0
                            ? (supplier.total /
                                totalSupplierSpend) *
                              100
                            : 0;

                        return (
                          <tr
                            key={
                              supplier.supplier
                            }
                          >
                            <td>
                              <strong>
                                {
                                  supplier.supplier
                                }
                              </strong>
                            </td>

                            <td>
                              {
                                supplier.invoiceCount
                              }
                            </td>

                            <td>
                              <strong className="report-money-value">
                                {formatCurrency(
                                  supplier.total
                                )}
                              </strong>
                            </td>

                            <td>
                              <span className="report-share-badge">
                                {share.toFixed(
                                  1
                                )}
                                %
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeView ===
          "cogs" && (
          <>
            <section className="panel report-main-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    Performance
                  </p>

                  <h2>
                    COGS & gross
                    profit
                  </h2>
                </div>
              </div>

              <div className="report-cogs-formula-clean">
                <div>
                  <span>
                    Opening stock
                  </span>

                  <strong>
                    {formatCurrency(
                      insightData
                        .metrics
                        .openingStockValue
                    )}
                  </strong>
                </div>

                <span className="report-formula-symbol">
                  +
                </span>

                <div>
                  <span>
                    Purchases
                  </span>

                  <strong>
                    {formatCurrency(
                      insightData
                        .metrics
                        .purchasesBetweenCounts
                    )}
                  </strong>
                </div>

                <span className="report-formula-symbol">
                  −
                </span>

                <div>
                  <span>
                    Closing stock
                  </span>

                  <strong>
                    {formatCurrency(
                      insightData
                        .metrics
                        .closingStockValue
                    )}
                  </strong>
                </div>

                <span className="report-formula-symbol">
                  =
                </span>

                <div className="report-formula-result-clean">
                  <span>
                    Actual COGS
                  </span>

                  <strong>
                    {formatCurrency(
                      insightData
                        .metrics
                        .actualCogs
                    )}
                  </strong>
                </div>
              </div>
            </section>

            <section className="stats-grid reports-secondary-stats">
              <article className="stat-card">
                <p className="stat-label">
                  Sales
                </p>

                <p className="stat-value">
                  {formatCurrency(
                    salesThisPeriod
                  )}
                </p>

                <p className="stat-change neutral">
                  Current period
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Actual food cost
                </p>

                <p className="stat-value">
                  {formatPercent(
                    insightData
                      .metrics
                      .actualFoodCostPercent
                  )}
                </p>

                <p className="stat-change neutral">
                  Based on COGS
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Theoretical
                </p>

                <p className="stat-value">
                  {formatPercent(
                    insightData
                      .metrics
                      .theoreticalFoodCostPercent
                  )}
                </p>

                <p className="stat-change neutral">
                  Recipe-based
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Variance
                </p>

                <p className="stat-value">
                  {insightData
                    .metrics
                    .foodCostVariancePercent ===
                  null
                    ? "—"
                    : `${
                        insightData
                          .metrics
                          .foodCostVariancePercent >=
                        0
                          ? "+"
                          : ""
                      }${insightData.metrics.foodCostVariancePercent.toFixed(
                        1
                      )} pts`}
                </p>

                <p className="stat-change neutral">
                  Actual vs target
                </p>
              </article>
            </section>
          </>
        )}

        {activeView ===
          "prices" && (
          <section className="panel report-main-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Cost movement
                </p>

                <h2>
                  Ingredient price
                  changes
                </h2>
              </div>

              <span className="report-result-count">
                {
                  priceChanges.length
                }{" "}
                changes
              </span>
            </div>

            {priceChanges.length ===
            0 ? (
              <div className="report-empty-state">
                <div className="report-empty-icon">
                  ↕
                </div>

                <h3>
                  No price movement
                  yet
                </h3>

                <p>
                  Price changes will
                  appear once previous
                  supplier prices are
                  stored.
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="report-table-clean">
                  <thead>
                    <tr>
                      <th>
                        Ingredient
                      </th>

                      <th>
                        Supplier
                      </th>

                      <th>
                        Previous
                      </th>

                      <th>
                        Current
                      </th>

                      <th>
                        Change
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {priceChanges.map(
                      (item) => (
                        <tr
                          key={`${item.ingredient}-${item.supplier}`}
                        >
                          <td>
                            <strong>
                              {
                                item.ingredient
                              }
                            </strong>
                          </td>

                          <td>
                            {
                              item.supplier
                            }
                          </td>

                          <td>
                            £
                            {item.oldPrice.toFixed(
                              2
                            )}{" "}
                            / {item.unit}
                          </td>

                          <td>
                            <strong className="report-money-value">
                              £
                              {item.newPrice.toFixed(
                                2
                              )}{" "}
                              /{" "}
                              {
                                item.unit
                              }
                            </strong>
                          </td>

                          <td>
                            <span
                              className={`report-change-badge ${
                                item.change >
                                0
                                  ? "report-change-negative"
                                  : "report-change-positive"
                              }`}
                            >
                              {item.change >
                              0
                                ? "+"
                                : ""}
                              {item.change.toFixed(
                                1
                              )}
                              %
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeView ===
          "stock" && (
          <section className="panel report-main-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Inventory
                </p>

                <h2>
                  Stock summary
                </h2>
              </div>

              <Link
                href="/stock"
                className="report-text-link"
              >
                Open stock →
              </Link>
            </div>

            <section className="stats-grid reports-inner-stats">
              <article className="stat-card">
                <p className="stat-label">
                  Latest stock value
                </p>

                <p className="stat-value">
                  {formatCurrency(
                    insightData
                      .metrics
                      .currentStockValue
                  )}
                </p>

                <p className="stat-change neutral">
                  Most recent count
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Previous stock
                </p>

                <p className="stat-value">
                  {formatCurrency(
                    insightData
                      .metrics
                      .previousStockValue
                  )}
                </p>

                <p className="stat-change neutral">
                  Prior count
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Movement
                </p>

                <p className="stat-value">
                  {insightData
                    .metrics
                    .stockValueChange ===
                  null
                    ? "—"
                    : `${
                        insightData
                          .metrics
                          .stockValueChange >=
                        0
                          ? "+"
                          : "-"
                      }${formatCurrency(
                        Math.abs(
                          insightData
                            .metrics
                            .stockValueChange
                        )
                      )}`}
                </p>

                <p className="stat-change neutral">
                  Value movement
                </p>
              </article>

              <article className="stat-card">
                <p className="stat-label">
                  Stock counts
                </p>

                <p className="stat-value">
                  {
                    stockTakes.length
                  }
                </p>

                <p className="stat-change neutral">
                  Available periods
                </p>
              </article>
            </section>
          </section>
        )}

        {activeView ===
          "recipes" && (
          <section className="panel report-main-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Menu costing
                </p>

                <h2>
                  Recipe margins
                </h2>
              </div>

              <Link
                href="/recipes"
                className="report-text-link"
              >
                Open recipes →
              </Link>
            </div>

            {recipeCosts.length ===
            0 ? (
              <div className="report-empty-state">
                <div className="report-empty-icon">
                  %
                </div>

                <h3>
                  No recipe margins
                  yet
                </h3>

                <p>
                  Recipe margins will
                  appear once recipe
                  costs and selling
                  prices are linked.
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="report-table-clean">
                  <thead>
                    <tr>
                      <th>
                        Recipe
                      </th>

                      <th>
                        Selling price
                      </th>

                      <th>
                        Cost
                      </th>

                      <th>
                        Food cost
                      </th>

                      <th>
                        Target
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recipeCosts.map(
                      (recipe) => (
                        <tr
                          key={
                            recipe.name
                          }
                        >
                          <td>
                            <strong>
                              {
                                recipe.name
                              }
                            </strong>
                          </td>

                          <td>
                            {formatCurrency(
                              recipe.sellingPrice
                            )}
                          </td>

                          <td>
                            <strong className="report-money-value">
                              {formatCurrency(
                                recipe.totalCost
                              )}
                            </strong>
                          </td>

                          <td>
                            {formatPercent(
                              recipe.foodCostPercent
                            )}
                          </td>

                          <td>
                            {formatPercent(
                              recipe.targetFoodCostPercent ??
                                30
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
