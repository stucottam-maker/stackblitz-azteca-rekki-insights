"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

import {
  generateInsights,
  formatCurrency,
  formatPercent,
  KitchenInsight,
  IngredientPriceRecord,
  PurchaseOrder,
  ApprovedInvoice,
  StockTake,
  RecipeCostSummary,
} from "../data/insights";

type InsightFilter =
  | "all"
  | "cost"
  | "purchasing"
  | "stock"
  | "performance"
  | "data";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function severityLabel(severity: KitchenInsight["severity"]) {
  if (severity === "high") return "High";
  if (severity === "medium") return "Medium";
  return "Low";
}

function severityClass(severity: KitchenInsight["severity"]) {
  if (severity === "high") return "insight-severity-high";
  if (severity === "medium") return "insight-severity-medium";
  return "insight-severity-low";
}

function categoryLabel(category: KitchenInsight["category"]) {
  switch (category) {
    case "cost":
      return "Cost";
    case "purchasing":
      return "Purchasing";
    case "stock":
      return "Stock";
    case "performance":
      return "Performance";
    case "data":
      return "Data";
    default:
      return category;
  }
}

export default function InsightsPage() {
  const [ingredientPrices, setIngredientPrices] = useState<
    Record<string, IngredientPriceRecord>
  >({});

  const [previousIngredientPrices, setPreviousIngredientPrices] = useState<
    Record<string, IngredientPriceRecord>
  >({});

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [invoices, setInvoices] = useState<ApprovedInvoice[]>([]);
  const [stockTakes, setStockTakes] = useState<StockTake[]>([]);
  const [recipeCosts, setRecipeCosts] = useState<RecipeCostSummary[]>([]);

  const [salesThisPeriod, setSalesThisPeriod] = useState<number | null>(null);

  const [theoreticalFoodCostPercent, setTheoreticalFoodCostPercent] =
    useState<number | null>(null);

  const [activeFilter, setActiveFilter] = useState<InsightFilter>("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const prices = safeParse<Record<string, IngredientPriceRecord>>(
      localStorage.getItem("ingredientPrices"),
      {}
    );

    const previousPrices = safeParse<Record<string, IngredientPriceRecord>>(
      localStorage.getItem("previousIngredientPrices"),
      {}
    );

    const orders = safeParse<PurchaseOrder[]>(
      localStorage.getItem("purchaseOrders"),
      []
    );

    const invoiceHistory = safeParse<ApprovedInvoice[]>(
      localStorage.getItem("approvedInvoices"),
      []
    );

    const singleApprovedInvoice = safeParse<ApprovedInvoice | null>(
      localStorage.getItem("approvedInvoiceDraft"),
      null
    );

    const stockHistory = safeParse<StockTake[]>(
      localStorage.getItem("stockTakeHistory"),
      []
    );

    const currentStock = safeParse<StockTake | null>(
      localStorage.getItem("currentStockTake"),
      null
    );

    const storedRecipeCosts = safeParse<RecipeCostSummary[]>(
      localStorage.getItem("recipeCostSummaries"),
      []
    );

    const storedSales = Number(localStorage.getItem("salesThisPeriod"));

    const storedTheoretical = Number(
      localStorage.getItem("theoreticalFoodCostPercent")
    );

    setIngredientPrices(prices);
    setPreviousIngredientPrices(previousPrices);
    setPurchaseOrders(orders);

    if (invoiceHistory.length > 0) {
      setInvoices(invoiceHistory);
    } else if (singleApprovedInvoice) {
      setInvoices([singleApprovedInvoice]);
    } else {
      setInvoices([]);
    }

    const combinedStock = [...stockHistory];

    if (currentStock) {
      const currentId = currentStock.id;

      const alreadyExists = currentId
        ? combinedStock.some((item) => item.id === currentId)
        : false;

      if (!alreadyExists) {
        combinedStock.push(currentStock);
      }
    }

    setStockTakes(combinedStock);
    setRecipeCosts(storedRecipeCosts);

    setSalesThisPeriod(
      Number.isFinite(storedSales) && storedSales > 0 ? storedSales : null
    );

    setTheoreticalFoodCostPercent(
      Number.isFinite(storedTheoretical) && storedTheoretical > 0
        ? storedTheoretical
        : null
    );
  }, []);

  const insightData = useMemo(
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

  const filteredInsights = useMemo(() => {
    if (activeFilter === "all") {
      return insightData.insights;
    }

    return insightData.insights.filter(
      (insight) => insight.category === activeFilter
    );
  }, [activeFilter, insightData.insights]);

  const visibleInsights = showAll
    ? filteredInsights
    : filteredInsights.slice(0, 8);

  const highPriority = insightData.insights.filter(
    (insight) => insight.severity === "high"
  ).length;

  const mediumPriority = insightData.insights.filter(
    (insight) => insight.severity === "medium"
  ).length;

  const estimatedImpact = insightData.insights.reduce((sum, insight) => {
    if (!insight.financialImpact) return sum;

    return sum + Math.abs(insight.financialImpact);
  }, 0);

  return (
    <div className="app-shell">
      <Sidebar active="insights" />

      <main className="main-content insights-page">
        <div className="insights-header">
          <div>
            <p className="page-eyebrow">Kitchen intelligence</p>

            <h1>Insights</h1>

            <p className="insights-subtitle">
              What changed, why it matters, and where to look next.
            </p>
          </div>

          <div className="insights-header-actions">
            <Link href="/reports" className="secondary-button">
              Reports
            </Link>

            <Link href="/invoices/upload" className="primary-button">
              Upload invoice
            </Link>
          </div>
        </div>

        <section className="insights-summary-grid">
          <div className="insight-summary-card">
            <span className="insight-summary-label">Needs attention</span>

            <div className="insight-summary-value">
              {highPriority + mediumPriority}
            </div>

            <p>
              {highPriority} high priority
              {mediumPriority > 0 ? ` · ${mediumPriority} medium` : ""}
            </p>
          </div>

          <div className="insight-summary-card">
            <span className="insight-summary-label">
              Recorded spend this month
            </span>

            <div className="insight-summary-value">
              {formatCurrency(insightData.metrics.spendThisMonth)}
            </div>

            <p>
              {insightData.metrics.spendChangePercent === null
                ? "No previous-month comparison yet"
                : `${formatPercent(
                    Math.abs(insightData.metrics.spendChangePercent)
                  )} ${
                    insightData.metrics.spendChangePercent >= 0
                      ? "above"
                      : "below"
                  } last month`}
            </p>
          </div>

          <div className="insight-summary-card">
            <span className="insight-summary-label">Latest stock value</span>

            <div className="insight-summary-value">
              {formatCurrency(insightData.metrics.currentStockValue)}
            </div>

            <p>
              {insightData.metrics.stockValueChange === null
                ? "Complete another count for movement"
                : `${insightData.metrics.stockValueChange >= 0 ? "+" : "-"}${formatCurrency(
                    Math.abs(insightData.metrics.stockValueChange)
                  )} since previous count`}
            </p>
          </div>

          <div className="insight-summary-card">
            <span className="insight-summary-label">Actual COGS</span>

            <div className="insight-summary-value">
              {formatCurrency(insightData.metrics.actualCogs)}
            </div>

            <p>
              {insightData.metrics.actualFoodCostPercent === null
                ? "Sales data needed for food cost %"
                : `${formatPercent(
                    insightData.metrics.actualFoodCostPercent
                  )} actual food cost`}
            </p>
          </div>
        </section>

        <section className="attention-panel">
          <div className="attention-panel-copy">
            <div className="attention-icon">!</div>

            <div>
              <p className="attention-eyebrow">Current picture</p>

              {highPriority > 0 ? (
                <>
                  <h2>
                    {highPriority} high-priority{" "}
                    {highPriority === 1 ? "issue needs" : "issues need"} attention
                  </h2>

                  <p>
                    Kitchen Insights has ranked the most significant changes
                    across purchasing, costs, stock and performance.
                  </p>
                </>
              ) : insightData.insights.length > 0 ? (
                <>
                  <h2>No high-priority issues detected</h2>

                  <p>
                    There are still {insightData.insights.length} items worth
                    reviewing across the operation.
                  </p>
                </>
              ) : (
                <>
                  <h2>Not enough data yet</h2>

                  <p>
                    Approve invoices, complete stock counts and cost recipes to
                    start generating meaningful insights.
                  </p>
                </>
              )}
            </div>
          </div>

          {estimatedImpact > 0 && (
            <div className="attention-impact">
              <span>Visible financial movement</span>

              <strong>{formatCurrency(estimatedImpact)}</strong>
            </div>
          )}
        </section>

        <section className="insights-performance-grid">
          <div className="performance-card">
            <span>Actual food cost</span>

            <strong>
              {formatPercent(insightData.metrics.actualFoodCostPercent)}
            </strong>
          </div>

          <div className="performance-card">
            <span>Theoretical food cost</span>

            <strong>
              {formatPercent(
                insightData.metrics.theoreticalFoodCostPercent
              )}
            </strong>
          </div>

          <div className="performance-card">
            <span>Variance</span>

            <strong
              className={
                insightData.metrics.foodCostVariancePercent !== null &&
                insightData.metrics.foodCostVariancePercent > 0
                  ? "metric-negative"
                  : "metric-positive"
              }
            >
              {insightData.metrics.foodCostVariancePercent === null
                ? "—"
                : `${
                    insightData.metrics.foodCostVariancePercent >= 0 ? "+" : ""
                  }${insightData.metrics.foodCostVariancePercent.toFixed(
                    1
                  )} pts`}
            </strong>
          </div>

          <div className="performance-card">
            <span>Orders awaiting invoice</span>

            <strong>{insightData.metrics.ordersAwaitingInvoice}</strong>
          </div>
        </section>

        <div className="insights-content-grid">
          <section className="insights-main-panel">
            <div className="insights-panel-header">
              <div>
                <p className="page-eyebrow">Prioritised</p>

                <h2>What needs attention</h2>
              </div>

              <span className="insights-count">
                {filteredInsights.length}{" "}
                {filteredInsights.length === 1 ? "insight" : "insights"}
              </span>
            </div>

            <div className="insights-filter-bar">
              {(
                [
                  ["all", "All"],
                  ["cost", "Cost"],
                  ["purchasing", "Purchasing"],
                  ["stock", "Stock"],
                  ["performance", "Performance"],
                  ["data", "Data"],
                ] as [InsightFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`insight-filter-button ${
                    activeFilter === value
                      ? "insight-filter-button-active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveFilter(value);
                    setShowAll(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="insight-card-list">
              {visibleInsights.length === 0 ? (
                <div className="insights-empty-state">
                  <div className="insights-empty-icon">✓</div>

                  <h3>No insights in this category</h3>

                  <p>
                    As more invoices, stock counts and recipe costs are recorded,
                    relevant issues will appear here automatically.
                  </p>
                </div>
              ) : (
                visibleInsights.map((insight) => (
                  <article className="insight-card" key={insight.id}>
                    <div className="insight-card-top">
                      <div className="insight-card-badges">
                        <span
                          className={`insight-severity ${severityClass(
                            insight.severity
                          )}`}
                        >
                          {severityLabel(insight.severity)}
                        </span>

                        <span className="insight-category">
                          {categoryLabel(insight.category)}
                        </span>
                      </div>

                      {insight.metric && (
                        <strong
                          className={
                            insight.change && insight.change > 0
                              ? "insight-card-metric metric-negative"
                              : "insight-card-metric"
                          }
                        >
                          {insight.metric}
                        </strong>
                      )}
                    </div>

                    <h3>{insight.title}</h3>

                    <p>{insight.message}</p>

                    {insight.financialImpact !== null &&
                      insight.financialImpact !== undefined && (
                        <div className="insight-impact-row">
                          <span>Financial movement</span>

                          <strong>
                            {insight.financialImpact >= 0 ? "+" : "-"}
                            {formatCurrency(
                              Math.abs(insight.financialImpact)
                            )}
                          </strong>
                        </div>
                      )}

                    {insight.actions && insight.actions.length > 0 && (
                      <div className="insight-actions">
                        {insight.actions.map((action) => (
                          <Link
                            key={`${insight.id}-${action.href}`}
                            href={action.href}
                            className="insight-action-link"
                          >
                            {action.label}

                            <span>→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>

            {filteredInsights.length > 8 && (
              <button
                type="button"
                className="show-more-insights"
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll
                  ? "Show fewer insights"
                  : `Show all ${filteredInsights.length} insights`}
              </button>
            )}
          </section>

          <aside className="insights-sidebar-panel">
            <section className="insights-side-card">
              <div className="insights-side-header">
                <div>
                  <p className="page-eyebrow">Purchasing</p>

                  <h2>Supplier spend</h2>
                </div>

                <Link href="/reports">View report</Link>
              </div>

              {insightData.supplierSpend.length === 0 ? (
                <p className="insights-side-empty">
                  Supplier spend will appear after invoices are approved.
                </p>
              ) : (
                <div className="supplier-spend-list">
                  {insightData.supplierSpend.slice(0, 6).map((supplier) => {
                    const largestSpend =
                      insightData.supplierSpend[0]?.total || 1;

                    const width = Math.max(
                      6,
                      (supplier.total / largestSpend) * 100
                    );

                    return (
                      <div
                        className="supplier-spend-row"
                        key={supplier.supplier}
                      >
                        <div className="supplier-spend-heading">
                          <span>{supplier.supplier}</span>

                          <strong>{formatCurrency(supplier.total)}</strong>
                        </div>

                        <div className="supplier-spend-track">
                          <div
                            className="supplier-spend-bar"
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <small>
                          {supplier.invoiceCount}{" "}
                          {supplier.invoiceCount === 1
                            ? "invoice"
                            : "invoices"}
                        </small>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="insights-side-card">
              <div className="insights-side-header">
                <div>
                  <p className="page-eyebrow">Data health</p>

                  <h2>Coverage</h2>
                </div>
              </div>

              <div className="coverage-list">
                <div className="coverage-row">
                  <span>Approved invoices</span>

                  <strong>{insightData.metrics.approvedInvoices}</strong>
                </div>

                <div className="coverage-row">
                  <span>Active suppliers</span>

                  <strong>{insightData.metrics.activeSuppliers}</strong>
                </div>

                <div className="coverage-row">
                  <span>Open orders</span>

                  <strong>{insightData.metrics.openOrders}</strong>
                </div>

                <div className="coverage-row">
                  <span>Missing ingredient prices</span>

                  <strong>
                    {insightData.metrics.missingIngredientPrices}
                  </strong>
                </div>
              </div>
            </section>

            <section className="insights-side-card">
              <div className="insights-side-header">
                <div>
                  <p className="page-eyebrow">COGS</p>

                  <h2>Stock period</h2>
                </div>
              </div>

              <div className="coverage-list">
                <div className="coverage-row">
                  <span>Opening stock</span>

                  <strong>
                    {formatCurrency(insightData.metrics.openingStockValue)}
                  </strong>
                </div>

                <div className="coverage-row">
                  <span>Purchases</span>

                  <strong>
                    {formatCurrency(
                      insightData.metrics.purchasesBetweenCounts
                    )}
                  </strong>
                </div>

                <div className="coverage-row">
                  <span>Closing stock</span>

                  <strong>
                    {formatCurrency(insightData.metrics.closingStockValue)}
                  </strong>
                </div>

                <div className="coverage-row coverage-row-total">
                  <span>Actual COGS</span>

                  <strong>
                    {formatCurrency(insightData.metrics.actualCogs)}
                  </strong>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
