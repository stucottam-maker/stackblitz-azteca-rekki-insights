"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "./components/Sidebar";

import {
  generateInsights,
  formatCurrency,
  formatPercent,
  IngredientPriceRecord,
  PurchaseOrder,
  ApprovedInvoice,
  StockTake,
  RecipeCostSummary,
} from "./data/insights";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function DashboardPage() {
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

  const topInsights = insightData.insights.slice(0, 5);

  const highPriority = insightData.insights.filter(
    (insight) => insight.severity === "high"
  ).length;

  const mediumPriority = insightData.insights.filter(
    (insight) => insight.severity === "medium"
  ).length;

  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />

      <main className="main-content dashboard-page">
        <header className="dashboard-header">
          <div>
            <p className="page-eyebrow">Kitchen Insights</p>
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">
              A live view of cost, purchasing, stock and operational risk.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <Link href="/insights" className="secondary-button">
              View insights
            </Link>

            <Link href="/invoices/upload" className="primary-button">
              Upload invoice
            </Link>
          </div>
        </header>

        <section className="dashboard-overview-grid">
          <article className="dashboard-overview-card">
            <div className="dashboard-overview-top">
              <span>Spend this month</span>
              <Link href="/reports">View</Link>
            </div>

            <strong>
              {formatCurrency(insightData.metrics.spendThisMonth)}
            </strong>

            <p>
              {insightData.metrics.spendChangePercent === null
                ? "No comparison yet"
                : `${formatPercent(
                    Math.abs(insightData.metrics.spendChangePercent)
                  )} ${
                    insightData.metrics.spendChangePercent >= 0
                      ? "above"
                      : "below"
                  } last month`}
            </p>
          </article>

          <article className="dashboard-overview-card">
            <div className="dashboard-overview-top">
              <span>Latest stock value</span>
              <Link href="/stock">View</Link>
            </div>

            <strong>
              {formatCurrency(insightData.metrics.currentStockValue)}
            </strong>

            <p>
              {insightData.metrics.stockValueChange === null
                ? "Complete another stock count"
                : `${insightData.metrics.stockValueChange >= 0 ? "+" : "-"}${formatCurrency(
                    Math.abs(insightData.metrics.stockValueChange)
                  )} vs previous count`}
            </p>
          </article>

          <article className="dashboard-overview-card">
            <div className="dashboard-overview-top">
              <span>Actual COGS</span>
              <Link href="/reports">View</Link>
            </div>

            <strong>{formatCurrency(insightData.metrics.actualCogs)}</strong>

            <p>
              {insightData.metrics.actualFoodCostPercent === null
                ? "Sales data needed for %"
                : `${formatPercent(
                    insightData.metrics.actualFoodCostPercent
                  )} actual food cost`}
            </p>
          </article>

          <article className="dashboard-overview-card">
            <div className="dashboard-overview-top">
              <span>Food cost variance</span>
              <Link href="/insights">Review</Link>
            </div>

            <strong
              className={
                insightData.metrics.foodCostVariancePercent !== null &&
                insightData.metrics.foodCostVariancePercent > 0
                  ? "metric-negative"
                  : ""
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

            <p>
              {insightData.metrics.theoreticalFoodCostPercent === null
                ? "Theoretical costing not available"
                : `${formatPercent(
                    insightData.metrics.theoreticalFoodCostPercent
                  )} theoretical`}
            </p>
          </article>
        </section>

        <section className="dashboard-attention-card">
          <div className="dashboard-attention-copy">
            <div className="dashboard-attention-icon">!</div>

            <div>
              <p className="page-eyebrow dashboard-dark-eyebrow">
                Needs attention
              </p>

              {highPriority > 0 ? (
                <>
                  <h2>
                    {highPriority} high-priority{" "}
                    {highPriority === 1 ? "issue" : "issues"}
                  </h2>

                  <p>
                    {mediumPriority > 0
                      ? `${mediumPriority} additional medium-priority items are also worth reviewing.`
                      : "Kitchen Insights has identified operational changes worth reviewing."}
                  </p>
                </>
              ) : insightData.insights.length > 0 ? (
                <>
                  <h2>No high-priority issues</h2>

                  <p>
                    There are {insightData.insights.length} lower-priority items
                    worth keeping an eye on.
                  </p>
                </>
              ) : (
                <>
                  <h2>More operational data needed</h2>

                  <p>
                    Approve invoices, count stock and cost recipes to unlock
                    useful comparisons.
                  </p>
                </>
              )}
            </div>
          </div>

          <Link href="/insights" className="dashboard-attention-link">
            Open Insights
            <span>→</span>
          </Link>
        </section>

        <div className="dashboard-main-grid">
          <section className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <p className="page-eyebrow">Prioritised</p>
                <h2>Latest insights</h2>
              </div>

              <Link href="/insights">View all</Link>
            </div>

            {topInsights.length === 0 ? (
              <div className="dashboard-empty-state">
                <div className="dashboard-empty-icon">✓</div>

                <h3>No insights yet</h3>

                <p>
                  As more invoices, stock counts and recipe costs are added,
                  Kitchen Insights will begin surfacing useful changes here.
                </p>
              </div>
            ) : (
              <div className="dashboard-insight-list">
                {topInsights.map((insight) => (
                  <Link
                    href={insight.actions?.[0]?.href ?? "/insights"}
                    key={insight.id}
                    className="dashboard-insight-row"
                  >
                    <div className="dashboard-insight-main">
                      <span
                        className={`dashboard-insight-dot dashboard-insight-dot-${insight.severity}`}
                      />

                      <div>
                        <strong>{insight.title}</strong>
                        <p>{insight.message}</p>
                      </div>
                    </div>

                    <div className="dashboard-insight-meta">
                      {insight.metric && <strong>{insight.metric}</strong>}

                      <span>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <aside className="dashboard-side-column">
            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <p className="page-eyebrow">Purchasing</p>
                  <h2>Supplier spend</h2>
                </div>

                <Link href="/reports">Report</Link>
              </div>

              {insightData.supplierSpend.length === 0 ? (
                <p className="dashboard-side-empty">
                  Supplier totals will appear as invoices are approved.
                </p>
              ) : (
                <div className="dashboard-supplier-list">
                  {insightData.supplierSpend.slice(0, 5).map((supplier) => (
                    <div
                      className="dashboard-supplier-row"
                      key={supplier.supplier}
                    >
                      <div>
                        <strong>{supplier.supplier}</strong>

                        <span>
                          {supplier.invoiceCount}{" "}
                          {supplier.invoiceCount === 1
                            ? "invoice"
                            : "invoices"}
                        </span>
                      </div>

                      <strong>{formatCurrency(supplier.total)}</strong>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <p className="page-eyebrow">Operation</p>
                  <h2>Current status</h2>
                </div>
              </div>

              <div className="dashboard-status-list">
                <Link href="/orders" className="dashboard-status-row">
                  <span>Open orders</span>
                  <strong>{insightData.metrics.openOrders}</strong>
                </Link>

                <Link href="/invoices" className="dashboard-status-row">
                  <span>Approved invoices</span>
                  <strong>{insightData.metrics.approvedInvoices}</strong>
                </Link>

                <Link href="/suppliers" className="dashboard-status-row">
                  <span>Active suppliers</span>
                  <strong>{insightData.metrics.activeSuppliers}</strong>
                </Link>

                <Link href="/ingredients" className="dashboard-status-row">
                  <span>Missing prices</span>
                  <strong>{insightData.metrics.missingIngredientPrices}</strong>
                </Link>
              </div>
            </section>
          </aside>
        </div>

        <section className="dashboard-cogs-card">
          <div className="dashboard-cogs-header">
            <div>
              <p className="page-eyebrow">Stock & COGS</p>
              <h2>Latest stock period</h2>
            </div>

            <Link href="/reports">Full report</Link>
          </div>

          <div className="dashboard-cogs-grid">
            <div>
              <span>Opening stock</span>
              <strong>
                {formatCurrency(insightData.metrics.openingStockValue)}
              </strong>
            </div>

            <div className="dashboard-cogs-symbol">+</div>

            <div>
              <span>Purchases</span>
              <strong>
                {formatCurrency(
                  insightData.metrics.purchasesBetweenCounts
                )}
              </strong>
            </div>

            <div className="dashboard-cogs-symbol">−</div>

            <div>
              <span>Closing stock</span>
              <strong>
                {formatCurrency(insightData.metrics.closingStockValue)}
              </strong>
            </div>

            <div className="dashboard-cogs-symbol">=</div>

            <div className="dashboard-cogs-result">
              <span>Actual COGS</span>
              <strong>{formatCurrency(insightData.metrics.actualCogs)}</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
