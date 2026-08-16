"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  generateInsights,
  formatCurrency,
  formatPercent,
  IngredientPriceRecord,
  PurchaseOrder,
  ApprovedInvoice,
  StockTake,
  RecipeCostSummary,
} from "../data/insights";

type ReportView =
  | "overview"
  | "supplier"
  | "cogs"
  | "prices"
  | "stock"
  | "recipes";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function ReportsPage() {
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

  const [activeView, setActiveView] = useState<ReportView>("overview");

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

  const supplierRows = insightData.supplierSpend;

  const priceChanges = useMemo(() => {
    return Object.entries(ingredientPrices)
      .map(([ingredient, current]) => {
        const previous = previousIngredientPrices[ingredient];

        if (!previous || !previous.price || !current.price) {
          return null;
        }

        const change =
          ((current.price - previous.price) / previous.price) * 100;

        return {
          ingredient,
          supplier: current.supplier ?? "Unknown supplier",
          oldPrice: previous.price,
          newPrice: current.price,
          unit: current.unit ?? "unit",
          change,
        };
      })
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
        } => Boolean(item)
      )
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  }, [ingredientPrices, previousIngredientPrices]);

  const totalSupplierSpend = supplierRows.reduce(
    (sum, supplier) => sum + supplier.total,
    0
  );

  return (
    <div className="app-shell">
      <Sidebar active="reports" />

      <main className="main-content reports-page">
        <header className="reports-header">
          <div>
            <p className="page-eyebrow">Analysis</p>
            <h1>Reports</h1>
            <p className="reports-subtitle">
              Purchasing, COGS, supplier spend, stock movement and margins.
            </p>
          </div>

          <div className="reports-header-actions">
            <Link href="/insights" className="secondary-button">
              View insights
            </Link>

            <Link href="/invoices/upload" className="primary-button">
              Upload invoice
            </Link>
          </div>
        </header>

        <nav className="reports-tabs">
          {(
            [
              ["overview", "Overview"],
              ["supplier", "Purchases by supplier"],
              ["cogs", "COGS & GP"],
              ["prices", "Price changes"],
              ["stock", "Stock"],
              ["recipes", "Recipe margins"],
            ] as [ReportView, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`reports-tab ${
                activeView === value ? "reports-tab-active" : ""
              }`}
              onClick={() => setActiveView(value)}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeView === "overview" && (
          <>
            <section className="reports-summary-grid">
              <article className="report-summary-card">
                <span>Spend this month</span>
                <strong>
                  {formatCurrency(insightData.metrics.spendThisMonth)}
                </strong>
                <p>
                  {insightData.metrics.spendChangePercent === null
                    ? "No prior comparison"
                    : `${formatPercent(
                        Math.abs(insightData.metrics.spendChangePercent)
                      )} ${
                        insightData.metrics.spendChangePercent >= 0
                          ? "above"
                          : "below"
                      } last month`}
                </p>
              </article>

              <article className="report-summary-card">
                <span>Actual COGS</span>
                <strong>
                  {formatCurrency(insightData.metrics.actualCogs)}
                </strong>
                <p>
                  {insightData.metrics.actualFoodCostPercent === null
                    ? "Sales data required"
                    : `${formatPercent(
                        insightData.metrics.actualFoodCostPercent
                      )} of sales`}
                </p>
              </article>

              <article className="report-summary-card">
                <span>Theoretical food cost</span>
                <strong>
                  {formatPercent(
                    insightData.metrics.theoreticalFoodCostPercent
                  )}
                </strong>
                <p>Recipe-based food cost</p>
              </article>

              <article className="report-summary-card">
                <span>Food cost variance</span>
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
                        insightData.metrics.foodCostVariancePercent >= 0
                          ? "+"
                          : ""
                      }${insightData.metrics.foodCostVariancePercent.toFixed(
                        1
                      )} pts`}
                </strong>
                <p>Actual vs theoretical</p>
              </article>
            </section>

            <div className="reports-overview-grid">
              <section className="report-panel">
                <div className="report-panel-header">
                  <div>
                    <p className="page-eyebrow">Purchasing</p>
                    <h2>Supplier spend</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveView("supplier")}
                  >
                    Full report
                  </button>
                </div>

                {supplierRows.length === 0 ? (
                  <p className="report-empty">
                    Supplier spend will appear as invoices are approved.
                  </p>
                ) : (
                  <div className="report-supplier-list">
                    {supplierRows.slice(0, 6).map((supplier) => (
                      <div
                        className="report-supplier-row"
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

              <section className="report-panel">
                <div className="report-panel-header">
                  <div>
                    <p className="page-eyebrow">Inventory</p>
                    <h2>Latest COGS period</h2>
                  </div>

                  <button type="button" onClick={() => setActiveView("cogs")}>
                    Full report
                  </button>
                </div>

                <div className="report-kpi-list">
                  <div>
                    <span>Opening stock</span>
                    <strong>
                      {formatCurrency(insightData.metrics.openingStockValue)}
                    </strong>
                  </div>

                  <div>
                    <span>Purchases</span>
                    <strong>
                      {formatCurrency(
                        insightData.metrics.purchasesBetweenCounts
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Closing stock</span>
                    <strong>
                      {formatCurrency(insightData.metrics.closingStockValue)}
                    </strong>
                  </div>

                  <div className="report-kpi-total">
                    <span>Actual COGS</span>
                    <strong>
                      {formatCurrency(insightData.metrics.actualCogs)}
                    </strong>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {activeView === "supplier" && (
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <p className="page-eyebrow">Purchasing</p>
                <h2>Purchases by supplier</h2>
              </div>
            </div>

            {supplierRows.length === 0 ? (
              <p className="report-empty">
                No approved invoice data is available yet.
              </p>
            ) : (
              <div className="report-table-wrap">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Invoices</th>
                      <th>Spend</th>
                      <th>Share</th>
                    </tr>
                  </thead>

                  <tbody>
                    {supplierRows.map((supplier) => {
                      const share =
                        totalSupplierSpend > 0
                          ? (supplier.total / totalSupplierSpend) * 100
                          : 0;

                      return (
                        <tr key={supplier.supplier}>
                          <td>{supplier.supplier}</td>
                          <td>{supplier.invoiceCount}</td>
                          <td>{formatCurrency(supplier.total)}</td>
                          <td>{share.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeView === "cogs" && (
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <p className="page-eyebrow">Performance</p>
                <h2>COGS & gross profit</h2>
              </div>
            </div>

            <div className="report-cogs-formula">
              <div>
                <span>Opening stock</span>
                <strong>
                  {formatCurrency(insightData.metrics.openingStockValue)}
                </strong>
              </div>

              <span className="report-formula-symbol">+</span>

              <div>
                <span>Purchases</span>
                <strong>
                  {formatCurrency(
                    insightData.metrics.purchasesBetweenCounts
                  )}
                </strong>
              </div>

              <span className="report-formula-symbol">−</span>

              <div>
                <span>Closing stock</span>
                <strong>
                  {formatCurrency(insightData.metrics.closingStockValue)}
                </strong>
              </div>

              <span className="report-formula-symbol">=</span>

              <div className="report-formula-result">
                <span>Actual COGS</span>
                <strong>
                  {formatCurrency(insightData.metrics.actualCogs)}
                </strong>
              </div>
            </div>

            <section className="reports-summary-grid reports-summary-grid-small">
              <article className="report-summary-card">
                <span>Sales</span>
                <strong>{formatCurrency(salesThisPeriod)}</strong>
              </article>

              <article className="report-summary-card">
                <span>Actual food cost</span>
                <strong>
                  {formatPercent(insightData.metrics.actualFoodCostPercent)}
                </strong>
              </article>

              <article className="report-summary-card">
                <span>Theoretical</span>
                <strong>
                  {formatPercent(
                    insightData.metrics.theoreticalFoodCostPercent
                  )}
                </strong>
              </article>

              <article className="report-summary-card">
                <span>Variance</span>
                <strong>
                  {insightData.metrics.foodCostVariancePercent === null
                    ? "—"
                    : `${
                        insightData.metrics.foodCostVariancePercent >= 0
                          ? "+"
                          : ""
                      }${insightData.metrics.foodCostVariancePercent.toFixed(
                        1
                      )} pts`}
                </strong>
              </article>
            </section>
          </section>
        )}

        {activeView === "prices" && (
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <p className="page-eyebrow">Cost movement</p>
                <h2>Ingredient price changes</h2>
              </div>
            </div>

            {priceChanges.length === 0 ? (
              <p className="report-empty">
                Price movements will appear once previous supplier prices are
                stored.
              </p>
            ) : (
              <div className="report-table-wrap">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Supplier</th>
                      <th>Previous</th>
                      <th>Current</th>
                      <th>Change</th>
                    </tr>
                  </thead>

                  <tbody>
                    {priceChanges.map((item) => (
                      <tr key={`${item.ingredient}-${item.supplier}`}>
                        <td>{item.ingredient}</td>
                        <td>{item.supplier}</td>
                        <td>
                          £{item.oldPrice.toFixed(2)} / {item.unit}
                        </td>
                        <td>
                          £{item.newPrice.toFixed(2)} / {item.unit}
                        </td>
                        <td
                          className={
                            item.change > 0
                              ? "report-negative"
                              : "report-positive"
                          }
                        >
                          {item.change > 0 ? "+" : ""}
                          {item.change.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeView === "stock" && (
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <p className="page-eyebrow">Inventory</p>
                <h2>Stock summary</h2>
              </div>

              <Link href="/stock">Open stock</Link>
            </div>

            <section className="reports-summary-grid reports-summary-grid-small">
              <article className="report-summary-card">
                <span>Latest stock value</span>
                <strong>
                  {formatCurrency(insightData.metrics.currentStockValue)}
                </strong>
              </article>

              <article className="report-summary-card">
                <span>Previous stock</span>
                <strong>
                  {formatCurrency(insightData.metrics.previousStockValue)}
                </strong>
              </article>

              <article className="report-summary-card">
                <span>Movement</span>
                <strong>
                  {insightData.metrics.stockValueChange === null
                    ? "—"
                    : `${insightData.metrics.stockValueChange >= 0 ? "+" : "-"}${formatCurrency(
                        Math.abs(insightData.metrics.stockValueChange)
                      )}`}
                </strong>
              </article>

              <article className="report-summary-card">
                <span>Stock counts</span>
                <strong>{stockTakes.length}</strong>
              </article>
            </section>
          </section>
        )}

        {activeView === "recipes" && (
          <section className="report-panel">
            <div className="report-panel-header">
              <div>
                <p className="page-eyebrow">Menu costing</p>
                <h2>Recipe margins</h2>
              </div>

              <Link href="/recipes">Open recipes</Link>
            </div>

            {recipeCosts.length === 0 ? (
              <p className="report-empty">
                Recipe margins will appear once recipe costs and selling prices
                are linked.
              </p>
            ) : (
              <div className="report-table-wrap">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Recipe</th>
                      <th>Selling price</th>
                      <th>Cost</th>
                      <th>Food cost</th>
                      <th>Target</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recipeCosts.map((recipe) => (
                      <tr key={recipe.name}>
                        <td>{recipe.name}</td>
                        <td>{formatCurrency(recipe.sellingPrice)}</td>
                        <td>{formatCurrency(recipe.totalCost)}</td>
                        <td>{formatPercent(recipe.foodCostPercent)}</td>
                        <td>
                          {formatPercent(recipe.targetFoodCostPercent ?? 30)}
                        </td>
                      </tr>
                    ))}
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
