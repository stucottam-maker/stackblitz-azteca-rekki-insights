"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { formatCurrency, generateInsights } from "./data/insights";
import { loadInsightWorkspaceData } from "./lib/insightWorkspaceData";

type Input = Awaited<ReturnType<typeof loadInsightWorkspaceData>>;

const actionTiles = [
  { href: "/orders", label: "Orders", icon: "+", tone: "royal" },
  { href: "/invoices", label: "Invoices", icon: "▤", tone: "blue" },
  { href: "/stock", label: "Stock", icon: "□", tone: "cyan" },
  { href: "/recipes", label: "Recipes", icon: "◇", tone: "violet" },
  { href: "/insights", label: "Insights", icon: "✦", tone: "teal" },
  { href: "/suppliers", label: "Suppliers", icon: "○", tone: "orange" },
  { href: "/reports", label: "Reporting", icon: "▥", tone: "navy" },
  { href: "/invoices/upload", label: "Upload invoice", icon: "⇧", tone: "royal-wide" },
];

export default function DashboardPage() {
  const [data, setData] = useState<Input | null>(null);

  useEffect(() => {
    loadInsightWorkspaceData().then(setData).catch(() => undefined);
  }, []);

  const result = useMemo(() => (data ? generateInsights(data) : null), [data]);
  const monthlySpend = useMemo(() => {
    const totals = new Map<string, number>();
    (data?.invoices ?? []).forEach((invoice) => {
      if (!invoice.invoiceDate) return;
      const date = new Date(invoice.invoiceDate);
      if (Number.isNaN(date.getTime())) return;
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      totals.set(month, (totals.get(month) ?? 0) + (invoice.total ?? invoice.subtotal ?? 0));
    });
    return Array.from(totals.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .reverse()
      .map(([month, total]) => ({
        month,
        label: new Intl.DateTimeFormat("en-GB", { month: "short", year: "2-digit" }).format(
          new Date(`${month}-01T12:00:00`)
        ),
        total,
      }));
  }, [data]);
  const priceChanges = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.ingredientPrices)
      .flatMap(([ingredient, current]) => {
        const previous = data.previousIngredientPrices[ingredient];
        if (!previous?.price || !current.price) return [];
        return [{
          ingredient,
          supplier: current.supplier ?? "Unknown supplier",
          change: ((current.price - previous.price) / previous.price) * 100,
        }];
      })
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 5);
  }, [data]);

  const metrics = result?.metrics;
  const spend = metrics ? formatCurrency(metrics.spendThisMonth) : "—";
  const stock = metrics?.currentStockValue != null ? formatCurrency(metrics.currentStockValue) : "—";
  const cogs = metrics?.actualCogs != null ? formatCurrency(metrics.actualCogs) : "—";
  const variance = metrics?.foodCostVariancePercent;
  const varianceLabel = variance != null ? `${variance > 0 ? "+" : ""}${variance.toFixed(1)}%` : "—";
  const suppliers = result?.supplierSpend.slice(0, 5) ?? [];
  const invoiceCount = metrics?.approvedInvoices;
  const highPriorityIssues = result?.insights.filter((insight) => insight.severity === "high").length;

  return (
    <div className="page metro-tile-page">
      <div className="metro-desktop-dashboard home-control-room">
        <Link href="/compliance" className="mb-4 flex items-center justify-between gap-4 rounded-2xl bg-emerald-800 px-6 py-5 text-white shadow-sm"><span><strong className="text-lg">✓ Compliance <small className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs">BETA</small></strong><span className="mt-1 block text-sm">Food safety checks, records and daily logs</span></span><span aria-hidden="true" className="text-2xl">›</span></Link>
        <header className="metro-desktop-heading">
          <div><p>Kitchen overview</p><h1>Home</h1><span>Your key numbers and reports at a glance.</span></div>
          <Link href="/reports">Open full reports →</Link>
        </header>
      <section className="metro-desktop-stats" aria-label="Kitchen performance summary">
          <DesktopKpi label="Spend this month" value={spend} note="Approved invoices" />
          <DesktopKpi label="Stock value" value={stock} note="Latest completed count" />
          <DesktopKpi label="Actual COGS" value={cogs} note="Purchases and stock movement" />
          <DesktopKpi label="Food cost variance" value={varianceLabel} note="Actual versus theoretical" />
      </section>

        <section className="metro-desktop-tables home-report-grid" aria-label="Home reports">
          <article className="metro-table-panel">
            <div className="metro-table-title"><div><p>Purchasing</p><h2>Supplier spend</h2></div><Link href="/reports">Full report →</Link></div>
            <div className="metro-table">
              <div className="metro-table-row metro-table-head"><span>Supplier</span><span>Invoices</span><span>Spend</span></div>
              {suppliers.length ? suppliers.map((supplier) => (
                <div className="metro-table-row" key={supplier.supplier}><strong>{supplier.supplier}</strong><span>{supplier.invoiceCount}</span><strong>{formatCurrency(supplier.total)}</strong></div>
              )) : <EmptyTable message="No approved supplier invoices yet." />}
            </div>
          </article>

          <article className="metro-table-panel">
            <div className="metro-table-title"><div><p>Invoice history</p><h2>Spend over time</h2></div><Link href="/reports">Full report →</Link></div>
            <div className="metro-table home-period-table">
              <div className="metro-table-row metro-table-head"><span>Period</span><span></span><span>Spend</span></div>
              {monthlySpend.length ? monthlySpend.map((period) => (
                <div className="metro-table-row" key={period.month}><strong>{period.label}</strong><span></span><strong>{formatCurrency(period.total)}</strong></div>
              )) : <EmptyTable message="Invoice dates will create this report." />}
            </div>
          </article>

          <article className="metro-table-panel">
            <div className="metro-table-title"><div><p>Cost movement</p><h2>Largest price changes</h2></div><Link href="/reports">Full report →</Link></div>
            <div className="metro-table home-change-table">
              <div className="metro-table-row metro-table-head"><span>Ingredient</span><span>Supplier</span><span>Change</span></div>
              {priceChanges.length ? priceChanges.map((item) => (
                <div className="metro-table-row" key={`${item.supplier}-${item.ingredient}`}><strong>{item.ingredient}</strong><span title={item.supplier}>{item.supplier}</span><strong className={item.change > 0 ? "home-change-up" : "home-change-down"}>{item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%</strong></div>
              )) : <EmptyTable message="A second price period is needed." />}
            </div>
          </article>

          <article className="metro-table-panel">
            <div className="metro-table-title"><div><p>Cost control</p><h2>Current signals</h2></div><Link href="/insights">View insights →</Link></div>
            <div className="metro-table">
              <div className="metro-table-row metro-table-head"><span>Measure</span><span>Status</span><span>Value</span></div>
              <div className="metro-table-row"><strong>Invoice coverage</strong><span className="metro-status-good">Current</span><strong>{invoiceCount != null ? `${invoiceCount} approved` : "—"}</strong></div>
              <div className="metro-table-row"><strong>Stock position</strong><span className="metro-status-good">Counted</span><strong>{stock}</strong></div>
              <div className="metro-table-row"><strong>Food cost variance</strong><span className="metro-status-watch">Review</span><strong>{varianceLabel}</strong></div>
              <div className="metro-table-row"><strong>High-priority issues</strong><span className="metro-status-good">{highPriorityIssues ? "Action" : "Clear"}</span><strong>{highPriorityIssues ?? "—"}</strong></div>
            </div>
          </article>
        </section>
      </div>

      <div className="metro-mobile-dashboard ki-v2-mobile">
        <div className="ki-v2-intro">
          <p className="ki-v2-eyebrow">Kitchen overview</p>
          <h1>Good to see you, Chef</h1>
          <p>Your kitchen at a glance.</p>
        </div>
        <section className="ki-v2-metrics" aria-label="Kitchen performance">
          <Link href="/invoices" className="ki-v2-metric ki-v2-blue"><span className="ki-v2-metric-icon" aria-hidden="true">▤</span><span>Invoices<strong>{invoiceCount ?? "—"}</strong><small>Approved</small></span><span className="ki-v2-arrow">›</span></Link>
          <Link href="/orders" className="ki-v2-metric ki-v2-peach"><span className="ki-v2-metric-icon" aria-hidden="true">▣</span><span>Orders<strong>View</strong><small>Purchasing</small></span><span className="ki-v2-arrow">›</span></Link>
          <Link href="/stock" className="ki-v2-metric ki-v2-green"><span className="ki-v2-metric-icon" aria-hidden="true">▦</span><span>Stock<strong>{stock}</strong><small>Latest count</small></span><span className="ki-v2-arrow">›</span></Link>
          <Link href="/compliance" className="ki-v2-metric ki-v2-lilac"><span className="ki-v2-metric-icon" aria-hidden="true">✓</span><span>Compliance<strong>Checks</strong><small>Daily records</small></span><span className="ki-v2-arrow">›</span></Link>
        </section>
        <section className="ki-v2-panel" aria-label="Today's kitchen checks">
          <div className="ki-v2-panel-heading"><h2>Today's checks</h2><Link href="/compliance">Open all ›</Link></div>
          <p className="ki-v2-helper">Keep food safety records up to date.</p>
          <Link href="/compliance" className="ki-v2-check"><span className="ki-v2-check-icon">◯</span><span>Fridge &amp; freezer temperatures</span><span>›</span></Link>
          <Link href="/compliance" className="ki-v2-check"><span className="ki-v2-check-icon">◯</span><span>Daily cleaning checks</span><span>›</span></Link>
          <Link href="/compliance" className="ki-v2-check"><span className="ki-v2-check-icon">◯</span><span>Opening &amp; closing checks</span><span>›</span></Link>
          <Link href="/compliance" className="ki-v2-check-cta">Open compliance checks →</Link>
        </section>
        <section className="ki-v2-panel" aria-label="Quick actions">
          <div className="ki-v2-panel-heading"><h2>Quick actions</h2></div>
          <div className="ki-v2-actions">
            <Link href="/orders">＋ <span>New order</span></Link>
            <Link href="/invoices/upload">⇧ <span>Upload invoice</span></Link>
            <Link href="/stock">▦ <span>Stock count</span></Link>
            <Link href="/recipes">◇ <span>Recipes</span></Link>
          </div>
        </section>
        <section className="ki-v2-panel" aria-label="Cost overview">
          <div className="ki-v2-panel-heading"><h2>Cost overview</h2><Link href="/reports">Reports ›</Link></div>
          <div className="ki-v2-cost-row"><span>Spend this month</span><strong>{spend}</strong></div>
          <div className="ki-v2-cost-row"><span>Actual COGS</span><strong>{cogs}</strong></div>
          <div className="ki-v2-cost-row"><span>Food cost variance</span><strong>{varianceLabel}</strong></div>
        </section>
    </div>
  );
}

function EmptyTable({ message }: { message: string }) {
  return <div className="metro-table-row metro-table-empty"><span>{message}</span></div>;
}

function MetroKpi({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: string }) {
  return <article className={`metro-kpi metro-kpi-${tone}`}><p>{label}</p><strong>{value}</strong><span aria-hidden="true">{icon}</span></article>;
}

function DesktopKpi({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="metro-desktop-kpi"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>;
}
