"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, generateInsights } from "./data/insights";
import { loadInsightWorkspaceData } from "./lib/insightWorkspaceData";

type Input = Awaited<ReturnType<typeof loadInsightWorkspaceData>>;

type ActionTile = {
  href: string;
  icon: string;
  title: string;
  description: string;
  tone: string;
  wide?: boolean;
};

const actionTiles: ActionTile[] = [
  {
    href: "/orders",
    icon: "+",
    title: "Orders",
    description: "Build and send purchase orders",
    tone: "royal",
  },
  {
    href: "/invoices",
    icon: "▤",
    title: "Invoices",
    description: "Review supplier invoices",
    tone: "blue",
  },
  {
    href: "/stock",
    icon: "□",
    title: "Stock",
    description: "Count stock and see movements",
    tone: "cyan",
  },
  {
    href: "/recipes",
    icon: "◇",
    title: "Recipes",
    description: "Cost recipes and prep",
    tone: "indigo",
  },
  {
    href: "/insights",
    icon: "✦",
    title: "Insights",
    description: "Spot cost and performance changes",
    tone: "teal",
  },
  {
    href: "/suppliers",
    icon: "◯",
    title: "Suppliers",
    description: "Contacts, products and pricing",
    tone: "orange",
  },
  {
    href: "/reports",
    icon: "↗",
    title: "Reports",
    description: "COGS, spend and GP reporting",
    tone: "navy",
    wide: true,
  },
  {
    href: "/invoices/upload",
    icon: "⇧",
    title: "Upload invoice",
    description: "Camera, gallery or file upload",
    tone: "electric",
    wide: true,
  },
];

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

  return (
    <div className="page metro-dashboard">
      {error && <div className="notice">{error}</div>}

      <section className="metro-metric-grid" aria-label="Kitchen performance at a glance">
        <MetricTile
          label="Spend this month"
          value={metrics ? formatCurrency(metrics.spendThisMonth) : "—"}
          note="Selected site invoices"
          icon="£"
          tone="spend"
        />
        <MetricTile
          label="Stock value"
          value={metrics?.currentStockValue == null ? "—" : formatCurrency(metrics.currentStockValue)}
          note="Latest selected-site stock"
          icon="□"
          tone="stock"
        />
        <MetricTile
          label="Actual COGS"
          value={metrics?.actualCogs == null ? "—" : formatCurrency(metrics.actualCogs)}
          note="Purchases and stock movement"
          icon="▥"
          tone="cogs"
        />
        <MetricTile
          label="Food cost variance"
          value={metrics?.foodCostVariancePercent == null ? "—" : `${metrics.foodCostVariancePercent.toFixed(1)}%`}
          note="Actual versus theoretical"
          icon="%"
          tone="variance"
        />
      </section>

      <section className="metro-actions" aria-labelledby="metro-actions-title">
        <div className="metro-section-heading">
          <div>
            <p className="eyebrow">Kitchen home</p>
            <h1 id="metro-actions-title">What do you need to do?</h1>
          </div>
          <Link href="/insights" className="metro-text-link">View insights →</Link>
        </div>

        <div className="metro-tile-grid">
          {actionTiles.map((tile) => (
            <Link
              href={tile.href}
              key={tile.title}
              className={`metro-action-tile metro-tone-${tile.tone} ${tile.wide ? "metro-action-wide" : ""}`}
            >
              <span className="metro-action-icon" aria-hidden="true">{tile.icon}</span>
              <span className="metro-action-copy">
                <strong>{tile.title}</strong>
                <span>{tile.description}</span>
              </span>
              <span className="metro-action-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="metro-attention-card">
        <div className="metro-attention-heading">
          <div>
            <p className="panel-kicker">Needs attention</p>
            <h2>{urgent.length} high-priority {urgent.length === 1 ? "issue" : "issues"}</h2>
          </div>
          <Link href="/insights">View all →</Link>
        </div>

        <div className="metro-alert-grid">
          {urgent.length ? urgent.slice(0, 3).map((item) => (
            <Link href="/insights" className="metro-alert-item" key={item.id}>
              <span className="metro-alert-dot" aria-hidden="true" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.message}</small>
              </span>
            </Link>
          )) : (
            <div className="metro-empty-message">No high-priority issues in this workspace.</div>
          )}
        </div>
      </section>

      <section className="metro-supplier-strip">
        <div className="metro-attention-heading">
          <div>
            <p className="panel-kicker">Purchasing</p>
            <h2>Top supplier spend</h2>
          </div>
          <Link href="/reports">Reports →</Link>
        </div>
        <div className="metro-supplier-grid">
          {result?.supplierSpend.length ? result.supplierSpend.slice(0, 4).map((supplier) => (
            <div className="metro-supplier-item" key={supplier.supplier}>
              <span>{supplier.supplier}</span>
              <strong>{formatCurrency(supplier.total)}</strong>
              <small>{supplier.invoiceCount} invoices</small>
            </div>
          )) : <div className="metro-empty-message">No supplier spend recorded for this workspace.</div>}
        </div>
      </section>
    </div>
  );
}

function MetricTile({
  label,
  value,
  note,
  icon,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  icon: string;
  tone: string;
}) {
  return (
    <article className={`metro-metric-tile metro-metric-${tone}`}>
      <div className="metro-metric-copy">
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
      <span className="metro-metric-icon" aria-hidden="true">{icon}</span>
    </article>
  );
}
