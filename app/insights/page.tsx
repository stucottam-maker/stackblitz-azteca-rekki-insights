"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, generateInsights } from "../data/insights";
import { loadInsightWorkspaceData } from "../lib/insightWorkspaceData";

type Input = Awaited<ReturnType<typeof loadInsightWorkspaceData>>;

export default function InsightsPage() {
  const [data, setData] = useState<Input | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    loadInsightWorkspaceData().then(setData).catch((reason) =>
      setError(reason instanceof Error ? reason.message : "Could not load insights")
    );
  }, []);
  const result = useMemo(() => (data ? generateInsights(data) : null), [data]);
  const urgent = result?.insights.filter((item) => item.severity === "high") ?? [];

  return <div className="page">
    <div className="topbar"><div><p className="eyebrow">Kitchen intelligence</p><h1>Insights</h1>
      <p className="page-description">Recommendations for the selected restaurant workspace.</p></div>
      <div><Link href="/reports" className="secondary-button">Reports</Link>
      <Link href="/invoices/upload" className="primary-button" style={{ marginLeft: 10 }}>Upload invoice</Link></div></div>
    {error && <div className="notice">{error}</div>}
    <div className="stats-grid">
      <Metric label="Needs attention" value={result ? String(urgent.length) : "—"} />
      <Metric label="Spend this month" value={result ? formatCurrency(result.metrics.spendThisMonth) : "—"} />
      <Metric label="Active suppliers" value={result ? String(result.metrics.activeSuppliers) : "—"} />
      <Metric label="Open orders" value={result ? String(result.metrics.openOrders) : "—"} />
    </div>
    <section className="panel"><div className="panel-header"><div><p className="panel-kicker">Prioritised</p><h2>Workspace insights</h2></div></div>
      <div className="alert-list">{result?.insights.length ? result.insights.map((item) =>
        <div className="price-alert" key={item.id}><div><p className="alert-ingredient">{item.title}</p><p className="muted-text">{item.message}</p></div>
        {item.financialImpact != null && <strong>{formatCurrency(item.financialImpact)}</strong>}</div>
      ) : <p className="muted-text">No insights have been generated for this workspace yet.</p>}</div></section>
  </div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="stat-card"><p className="stat-label">{label}</p><p className="stat-value">{value}</p>
    <p className="stat-change neutral">Selected workspace</p></div>;
}
