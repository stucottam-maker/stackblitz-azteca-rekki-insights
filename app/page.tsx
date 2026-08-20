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

  return <div className="page">
    <div className="topbar"><div><p className="eyebrow">Kitchen Insights</p><h1>Dashboard</h1>
      <p className="page-description">Live cost, purchasing and stock for the selected workspace.</p></div>
      <div><Link href="/insights" className="secondary-button">View insights</Link>
      <Link href="/invoices/upload" className="primary-button" style={{ marginLeft: 10 }}>Upload invoice</Link></div></div>
    {error && <div className="notice">{error}</div>}
    <div className="stats-grid">
      <Metric label="Spend this month" value={metrics ? formatCurrency(metrics.spendThisMonth) : "—"} note="Selected site invoices" />
      <Metric label="Latest stock value" value={metrics?.currentStockValue == null ? "—" : formatCurrency(metrics.currentStockValue)} note="Selected site stock" />
      <Metric label="Actual COGS" value={metrics?.actualCogs == null ? "—" : formatCurrency(metrics.actualCogs)} note="Purchases and stock movement" />
      <Metric label="Food cost variance" value={metrics?.foodCostVariancePercent == null ? "—" : `${metrics.foodCostVariancePercent.toFixed(1)}%`} note="Actual versus theoretical" />
    </div>
    <div className="dashboard-grid">
      <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Needs attention</p>
        <h2>{urgent.length} high-priority {urgent.length === 1 ? "issue" : "issues"}</h2></div></div>
        <div className="alert-list">{urgent.length ? urgent.slice(0, 3).map((item) =>
          <div className="price-alert" key={item.id}><div><p className="alert-ingredient">{item.title}</p><p className="muted-text">{item.message}</p></div></div>
        ) : <p className="muted-text">No high-priority issues in this workspace.</p>}</div></section>
      <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Purchasing</p><h2>Supplier spend</h2></div></div>
        <div className="food-cost-list">{result?.supplierSpend.length ? result.supplierSpend.slice(0, 6).map((supplier) =>
          <div className="food-cost-row" key={supplier.supplier}><div><p className="food-cost-dish">{supplier.supplier}</p>
          <p className="muted-text">{supplier.invoiceCount} invoices</p></div><strong>{formatCurrency(supplier.total)}</strong></div>
        ) : <p className="muted-text">No supplier spend recorded for this workspace.</p>}</div></section>
    </div>
  </div>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="stat-card"><p className="stat-label">{label}</p><p className="stat-value">{value}</p>
    <p className="stat-change neutral">{note}</p></div>;
}
