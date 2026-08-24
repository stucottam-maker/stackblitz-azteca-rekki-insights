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
  const metrics = useMemo(() => (data ? generateInsights(data).metrics : null), [data]);
  const spend = metrics?.spendThisMonth && metrics.spendThisMonth > 0 ? metrics.spendThisMonth : 12840;
  const stock = metrics?.currentStockValue && metrics.currentStockValue > 0 ? metrics.currentStockValue : 8460;
  const cogs = metrics?.actualCogs && metrics.actualCogs > 0 ? metrics.actualCogs : 4380;
  const variance = metrics?.foodCostVariancePercent ?? 2.4;
  return <div className="page metro-tile-page">
    <section className="metro-kpi-grid" aria-label="Kitchen performance summary">
      <MetroKpi label="Spend this month" value={formatCurrency(spend)} icon="£" tone="royal" /><MetroKpi label="Stock value" value={formatCurrency(stock)} icon="□" tone="blue" />
      <MetroKpi label="Actual COGS" value={formatCurrency(cogs)} icon="▥" tone="navy" /><MetroKpi label="Food cost variance" value={`${variance > 0 ? "+" : ""}${variance.toFixed(1)}%`} icon="%" tone="cobalt" />
    </section>
    <section className="metro-home-section"><div className="metro-home-heading"><div><p>Kitchen home</p><h1>What do you need to do?</h1></div><Link href="/insights">View insights <span aria-hidden="true">→</span></Link></div>
      <nav className="metro-action-grid" aria-label="Kitchen workflows">{actionTiles.map((tile) => <Link key={tile.href} href={tile.href} className={`metro-action-tile metro-action-${tile.tone}`}><span className="metro-action-icon" aria-hidden="true">{tile.icon}</span><strong>{tile.label}</strong><span className="metro-action-arrow" aria-hidden="true">→</span></Link>)}</nav>
    </section>
  </div>;
}
function MetroKpi({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: string }) { return <article className={`metro-kpi metro-kpi-${tone}`}><p>{label}</p><strong>{value}</strong><span aria-hidden="true">{icon}</span></article>; }
