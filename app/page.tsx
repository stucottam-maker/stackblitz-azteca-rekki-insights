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
    <div className="page metro-tile-page kommee-dashboard">
      <div className="metro-desktop-dashboard home-control-room">
        <Link href="/compliance" className="kommee-compliance-banner mb-4 flex items-center justify-between gap-4 rounded-2xl px-6 py-5 shadow-sm"><span><strong className="text-lg">✓ Compliance <small className="ml-2 rounded-full px-2 py-1 text-xs">BETA</small></strong><span className="mt-1 block text-sm">Food safety checks, records and daily logs</span></span><span aria-hidden="true" className="text-2xl">›</span></Link>
        <header className="metro-desktop-heading">
          <div><p>YOUR KITCHEN, AT A GLANCE</p><h1>Good to see you, Chef.</h1><span>Less admin. More cooking.</span></div>
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

      <div className="metro-mobile-dashboard ki-v2-mobile" style={{background:"#f8f7f2",minHeight:"100vh",paddingBottom:88}}>
        <header style={{background:"linear-gradient(140deg,#064237,#0b5b48)",color:"#fff",padding:"30px 20px 34px",borderRadius:"0 0 28px 28px"}}>
          <div style={{fontSize:25,fontWeight:800,letterSpacing:"-.7px",marginBottom:22}}><span style={{color:"#67d5a3"}}>✳</span> Kommee</div>
          <h1 style={{fontSize:28,fontWeight:750,margin:"0 0 6px"}}>Good morning, Chef</h1>
          <p style={{margin:0,color:"#d4e9de",fontSize:14}}>Your kitchen, all in one place.</p>
        </header>
        <section aria-label="Quick access" style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:13,padding:"18px 16px"}}>
          <Link href="/invoices/upload" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>📷</span><span>Scan Invoice</span>
          </Link>
          <Link href="/orders" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>🛒</span><span>New Order</span>
          </Link>
          <Link href="/invoices" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>📄</span><span>Invoices</span>
          </Link>
          <Link href="/suppliers" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>🏪</span><span>Suppliers</span>
          </Link>
          <Link href="/products" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>📦</span><span>Products</span>
          </Link>
          <Link href="/reports" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>📊</span><span>Reports</span>
          </Link>
          <Link href="/compliance" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>☑️</span><span>Compliance</span>
          </Link>
          <Link href="/restaurants" style={{background:"#fff",border:"1px solid #e7e9e3",borderRadius:19,minHeight:128,boxShadow:"0 4px 15px rgba(10,48,35,.05)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,textDecoration:"none",color:"#173d32",fontWeight:700,fontSize:15,textAlign:"center",padding:12}}>
            <span aria-hidden="true" style={{fontSize:32,lineHeight:1}}>🏬</span><span>Restaurants</span>
          </Link>
        </section>
        <section aria-label="Compliance shortcuts" style={{margin:"0 16px 20px",background:"#fff",borderRadius:20,padding:18,border:"1px solid #e7e9e3"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h2 style={{fontSize:18,fontWeight:750,margin:0,color:"#173d32"}}>Today's compliance</h2><Link href="/compliance" style={{color:"#0a795a",fontWeight:650,fontSize:13}}>View all →</Link></div>
          <p style={{color:"#68766e",fontSize:13,margin:"0 0 12px"}}>Keep your daily food safety records on track.</p>
          <Link href="/compliance" style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:600,fontSize:14}}><span>🌡️</span><span style={{flex:1}}>Fridge & freezer temperatures</span><span aria-hidden="true">›</span></Link>
          <Link href="/compliance" style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:600,fontSize:14}}><span>🧽</span><span style={{flex:1}}>Cleaning schedules</span><span aria-hidden="true">›</span></Link>
          <Link href="/compliance" style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:600,fontSize:14}}><span>☑️</span><span style={{flex:1}}>Opening & closing checks</span><span aria-hidden="true">›</span></Link>
        </section>
        <nav aria-label="Mobile navigation" style={{position:"sticky",bottom:0,background:"#fff",borderTop:"1px solid #e6eae5",padding:"13px 8px",display:"flex",justifyContent:"space-around",borderRadius:"16px 16px 0 0"}}>
          <Link href="/" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:"#155c48",textDecoration:"none",fontSize:12,fontWeight:600}}><span style={{fontSize:22}}>⌂</span>Home</Link>
          <Link href="/invoices" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:"#155c48",textDecoration:"none",fontSize:12,fontWeight:600}}><span style={{fontSize:22}}>▤</span>Invoices</Link>
          <Link href="/compliance" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:"#155c48",textDecoration:"none",fontSize:12,fontWeight:600}}><span style={{fontSize:22}}>☑</span>Compliance</Link>
          <Link href="/restaurants" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:"#155c48",textDecoration:"none",fontSize:12,fontWeight:600}}><span style={{fontSize:22}}>•••</span>More</Link>
        </nav>
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
