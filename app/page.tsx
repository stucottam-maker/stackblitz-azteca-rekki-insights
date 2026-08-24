"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, generateInsights } from "./data/insights";
import { loadInsightWorkspaceData } from "./lib/insightWorkspaceData";

type Input = Awaited<ReturnType<typeof loadInsightWorkspaceData>>;

export default function DashboardPage() {
  const [data, setData] = useState<Input | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    loadInsightWorkspaceData().then(setData).catch((reason) =>
      setError(reason instanceof Error ? reason.message : "Could not load dashboard")
    );
  }, []);
  const result = useMemo(() => (data ? generateInsights(data) : null), [data]);
  const metrics = result?.metrics;
  const urgent = result?.insights.filter((item) => item.severity === "high") ?? [];

  return <div className="page metro-dashboard-page">
    <section className="metro-dashboard-hero">
      <div className="metro-dashboard-hero-copy">
        <p className="metro-dashboard-kicker">Kitchen operations, connected</p>
        <h1>Know what your kitchen costs—before it costs you.</h1>
        <p>Live purchasing, stock and food-cost signals for the selected restaurant.</p>
      </div>
      <div className="metro-dashboard-actions">
        <Link href="/insights" className="metro-secondary-action">View insights</Link>
        <Link href="/invoices/upload" className="metro-primary-action">Upload invoice</Link>
      </div>
      <div className="metro-dashboard-orbit metro-dashboard-orbit-one" aria-hidden="true" />
      <div className="metro-dashboard-orbit metro-dashboard-orbit-two" aria-hidden="true" />
    </section>
    {error && <div className="metro-sync-notice" role="status"><span>Syncing</span> Some live totals are still connecting to this workspace.</div>}
    <div className="stats-grid metro-stats-grid">
      <Metric label="Spend this month" value={metrics ? formatCurrency(metrics.spendThisMonth) : "—"} note="Approved supplier invoices" icon="£" />
      <Metric label="Latest stock value" value={metrics?.currentStockValue == null ? "—" : formatCurrency(metrics.currentStockValue)} note="Most recent completed count" icon="□" />
      <Metric label="Actual COGS" value={metrics?.actualCogs == null ? "—" : formatCurrency(metrics.actualCogs)} note="Purchases and stock movement" icon="↗" />
      <Metric label="Food cost variance" value={metrics?.foodCostVariancePercent == null ? "—" : `${metrics.foodCostVariancePercent.toFixed(1)}%`} note="Actual versus theoretical" icon="%" />
    </div>
    <div className="dashboard-grid metro-dashboard-grid">
      <section className="panel metro-dashboard-panel"><div className="panel-header"><div><p className="panel-kicker">Needs attention</p>
        <h2>{urgent.length} high-priority {urgent.length === 1 ? "issue" : "issues"}</h2></div></div>
        <div className="alert-list">{urgent.length ? urgent.slice(0, 3).map((item) =>
          <div className="price-alert" key={item.id}><div><p className="alert-ingredient">{item.title}</p><p className="muted-text">{item.message}</p></div></div>
        ) : <p className="muted-text">No high-priority issues in this workspace.</p>}</div></section>
      <section className="panel metro-dashboard-panel"><div className="panel-header"><div><p className="panel-kicker">Purchasing</p><h2>Supplier spend</h2></div></div>
        <div className="food-cost-list">{result?.supplierSpend.length ? result.supplierSpend.slice(0, 6).map((supplier) =>
          <div className="food-cost-row" key={supplier.supplier}><div><p className="food-cost-dish">{supplier.supplier}</p>
          <p className="muted-text">{supplier.invoiceCount} invoices</p></div><strong>{formatCurrency(supplier.total)}</strong></div>
        ) : <p className="muted-text">No supplier spend recorded for this workspace.</p>}</div></section>
    </div>
  </div>;
}

function Metric({ label, value, note, icon }: { label: string; value: string; note: string; icon: string }) {
  return <div className="stat-card metro-stat-card"><div className="metro-stat-heading"><p className="stat-label">{label}</p><span aria-hidden="true">{icon}</span></div><p className="stat-value">{value}</p>
    <p className="stat-change neutral">{note}</p></div>;
}
