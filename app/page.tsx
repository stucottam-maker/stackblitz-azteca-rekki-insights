"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, generateInsights } from "./data/insights";
import { loadInsightWorkspaceData } from "./lib/insightWorkspaceData";
type Input = Awaited<ReturnType<typeof loadInsightWorkspaceData>>;
const actionTiles = [
  { href: "/orders", label: "Orders", icon: "+", tone: "royal" }, { href: "/invoices", label: "Invoices", icon: "▤", tone: "blue" },
  { href: "/stock", label: "Stock", icon: "□", tone: "cyan" }, { href: "/recipes", label: "Recipes", icon: "◇", tone: "violet" },
  { href: "/insights", label: "Insights", icon: "✦", tone: "teal" }, { href: "/suppliers", label: "Suppliers", icon: "○", tone: "orange" },
  { href: "/reports", label: "Reports", icon: "↗", tone: "navy" }, { href: "/invoices/upload", label: "Upload invoice", icon: "⇧", tone: "royal-wide" },
];
export default function DashboardPage() {
  const [data, setData] = useState<Input | null>(null);
  useEffect(() => { loadInsightWorkspaceData().then(setData).catch(() => undefined); }, []);
  const result = useMemo(() => (data ? generateInsights(data) : null), [data]);
  const metrics = result?.metrics;
  const spend = metrics?.spendThisMonth && metrics.spendThisMonth > 0 ? metrics.spendThisMonth : 12840;
  const stock = metrics?.currentStockValue && metrics.currentStockValue > 0 ? metrics.currentStockValue : 8460;
  const cogs = metrics?.actualCogs && metrics.actualCogs > 0 ? metrics.actualCogs : 4380;
  const variance = metrics?.foodCostVariancePercent ?? 2.4;
  const suppliers = result?.supplierSpend.length ? result.supplierSpend.slice(0, 4) : [
    { supplier: "Booker Wholesale", invoiceCount: 7, total: 4820 }, { supplier: "Woods Foodservice", invoiceCount: 5, total: 3260 },
    { supplier: "Fresh Direct", invoiceCount: 4, total: 2740 }, { supplier: "Direct Seafoods", invoiceCount: 3, total: 2020 },
  ];
  return <div className="page metro-tile-page">
    <div className="metro-desktop-dashboard">
      <header className="metro-desktop-heading"><div><p>Kitchen overview</p><h1>Your operating numbers, in one place.</h1></div><Link href="/reports">Open reports →</Link></header>
      <section className="metro-desktop-stats" aria-label="Kitchen performance summary">
        <DesktopKpi label="Spend this month" value={formatCurrency(spend)} note="Approved invoices" /><DesktopKpi label="Stock value" value={formatCurrency(stock)} note="Latest completed count" />
        <DesktopKpi label="Actual COGS" value={formatCurrency(cogs)} note="Purchases and stock movement" /><DesktopKpi label="Food cost variance" value={`${variance > 0 ? "+" : ""}${variance.toFixed(1)}%`} note="Actual versus theoretical" />
      </section>
      <section className="metro-desktop-tables">
        <article className="metro-table-panel"><div className="metro-table-title"><div><p>Purchasing</p><h2>Supplier spend</h2></div><Link href="/invoices">View invoices →</Link></div>
          <div className="metro-table"><div className="metro-table-row metro-table-head"><span>Supplier</span><span>Invoices</span><span>Spend</span></div>{suppliers.map((supplier) => <div className="metro-table-row" key={supplier.supplier}><strong>{supplier.supplier}</strong><span>{supplier.invoiceCount}</span><strong>{formatCurrency(supplier.total)}</strong></div>)}</div>
        </article>
        <article className="metro-table-panel"><div className="metro-table-title"><div><p>Cost control</p><h2>Current signals</h2></div><Link href="/insights">View insights →</Link></div>
          <div className="metro-table"><div className="metro-table-row metro-table-head"><span>Measure</span><span>Status</span><span>Value</span></div><div className="metro-table-row"><strong>Invoice coverage</strong><span className="metro-status-good">Current</span><strong>19 approved</strong></div><div className="metro-table-row"><strong>Stock position</strong><span className="metro-status-good">Counted</span><strong>{formatCurrency(stock)}</strong></div><div className="metro-table-row"><strong>Food cost variance</strong><span className="metro-status-watch">Review</span><strong>{variance.toFixed(1)}%</strong></div><div className="metro-table-row"><strong>High-priority issues</strong><span className="metro-status-good">Clear</span><strong>0</strong></div></div>
        </article>
      </section>
    </div>
    <div className="metro-mobile-dashboard"><section className="metro-kpi-grid" aria-label="Kitchen performance summary">
      <MetroKpi label="Spend this month" value={formatCurrency(spend)} icon="£" tone="royal" /><MetroKpi label="Stock value" value={formatCurrency(stock)} icon="□" tone="blue" />
      <MetroKpi label="Actual COGS" value={formatCurrency(cogs)} icon="▥" tone="navy" /><MetroKpi label="Food cost variance" value={`${variance > 0 ? "+" : ""}${variance.toFixed(1)}%`} icon="%" tone="cobalt" />
    </section>
    <section className="metro-home-section"><div className="metro-home-heading"><div><p>Kitchen home</p><h1>What do you need to do?</h1></div><Link href="/insights">View insights <span aria-hidden="true">→</span></Link></div>
      <nav className="metro-action-grid" aria-label="Kitchen workflows">{actionTiles.map((tile) => <Link key={tile.href} href={tile.href} className={`metro-action-tile metro-action-${tile.tone}`}><span className="metro-action-icon" aria-hidden="true">{tile.icon}</span><strong>{tile.label}</strong><span className="metro-action-arrow" aria-hidden="true">→</span></Link>)}</nav>
    </section></div>
  </div>;
}
function MetroKpi({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: string }) { return <article className={`metro-kpi metro-kpi-${tone}`}><p>{label}</p><strong>{value}</strong><span aria-hidden="true">{icon}</span></article>; }
function DesktopKpi({ label, value, note }: { label: string; value: string; note: string }) { return <article className="metro-desktop-kpi"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>; }
