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

      <div className="metro-mobile-dashboard">
        <section className="mx-auto max-w-3xl space-y-5 px-1 pb-8">
          <div className="flex items-center justify-between gap-3">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Kitchen Insights</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Kitchen home</h1><p className="text-sm text-slate-500">Everything you need, in one place.</p></div>
            <details className="relative shrink-0"><summary aria-label="More kitchen tools" className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl font-bold text-slate-700 shadow-sm">⋯</summary><nav className="absolute right-0 z-20 mt-2 grid w-52 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><Link className="rounded-xl px-3 py-2 text-sm hover:bg-slate-50" href="/insights">Insights</Link><Link className="rounded-xl px-3 py-2 text-sm hover:bg-slate-50" href="/suppliers">Suppliers</Link><Link className="rounded-xl px-3 py-2 text-sm hover:bg-slate-50" href="/invoices/upload">Upload invoice</Link><Link className="rounded-xl px-3 py-2 text-sm hover:bg-slate-50" href="/reports">Full reports</Link></nav></details>
          </div>
          <nav aria-label="Kitchen workflows" className="grid grid-cols-2 gap-3">
            {([
              {href:"/invoices",title:"Invoices",desc:"Upload and manage invoices",icon:"▤",tone:"bg-emerald-50 text-emerald-900"},
              {href:"/stock",title:"Stock",desc:"Inventory and stock value",icon:"▦",tone:"bg-indigo-50 text-indigo-950"},
              {href:"/recipes",title:"Recipes",desc:"Costing and margins",icon:"◇",tone:"bg-amber-50 text-amber-950"},
              {href:"/orders",title:"Ordering",desc:"Suppliers and orders",icon:"🛒",tone:"bg-sky-50 text-sky-950"},
              {href:"/compliance",title:"Compliance",desc:"Food safety checks and logs",icon:"✓",tone:"bg-emerald-800 text-white",beta:true},
              {href:"/reports",title:"Reporting",desc:"Reports and performance",icon:"▥",tone:"bg-teal-50 text-teal-950"}
            ] as const).map(tile=><Link key={tile.href} href={tile.href} className={`flex min-h-40 flex-col justify-between rounded-3xl p-4 shadow-sm transition-transform active:scale-[0.98] ${tile.tone}`}><span className="flex items-start justify-between gap-2"><span className="text-3xl" aria-hidden="true">{tile.icon}</span>{'beta' in tile && <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase">Beta</span>}</span><span><strong className="block text-lg leading-tight">{tile.title}</strong><span className="mt-1 block text-xs leading-snug opacity-80">{tile.desc}</span></span></Link>)}
          </nav>
          <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm" aria-label="Kitchen snapshot">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Kitchen snapshot</h2><Link href="/reports" className="text-sm font-semibold text-emerald-700">View all</Link></div>
            <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Spend this month</p><strong className="mt-1 block text-lg text-slate-900">{spend}</strong></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Stock value</p><strong className="mt-1 block text-lg text-slate-900">{stock}</strong></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Actual COGS</p><strong className="mt-1 block text-lg text-slate-900">{cogs}</strong></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Food cost variance</p><strong className="mt-1 block text-lg text-slate-900">{varianceLabel}</strong></div></div>
          </section>
          <div className="flex flex-wrap gap-2"><Link href="/insights" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Insights</Link><Link href="/suppliers" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Suppliers</Link><Link href="/invoices/upload" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Upload invoice</Link></div>
        </section>
      </div>
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
