"use client";

import Link from "next/link";
import { useWorkspace } from "./components/WorkspaceProvider";
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
  const { activeWorkspace, availableWorkspaces, switchWorkspace, switching } = useWorkspace();
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

      <div className="metro-mobile-dashboard ki-v2-mobile" style={{background:"#f7f8f6",minHeight:"100vh",paddingBottom:80,fontFamily:"inherit"}}>
        <header style={{background:"linear-gradient(125deg,#003e32 0%,#064d3e 62%,#0b5844 100%)",color:"#fff",padding:"25px 22px 62px",position:"relative",overflow:"hidden",minHeight:270}}>
          <div aria-hidden="true" style={{position:"absolute",right:-58,top:96,width:260,height:235,borderRadius:"50%",backgroundImage:"linear-gradient(90deg,rgba(0,62,50,.36),rgba(0,62,50,0) 55%),url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=85)",backgroundSize:"cover",backgroundPosition:"center",boxShadow:"0 0 0 12px rgba(255,255,255,.07)",opacity:.94}} />
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:45,position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <svg width="37" height="37" viewBox="0 0 40 40" aria-hidden="true"><path d="M19 19C7 18 4 9 7 3c10-2 16 5 12 16Z" fill="#e58b77"/><path d="M21 19C22 7 30 3 37 6c1 10-6 16-16 13Z" fill="#8cce9d"/><path d="M19 21C7 22 3 30 6 37c10 1 16-6 13-16Z" fill="#55bb9b"/><path d="M21 21c1 12 9 16 16 13 1-10-6-16-16-13Z" fill="#f0c5a4"/></svg>
              <strong style={{fontSize:29,letterSpacing:"-1.1px",lineHeight:1,color:"#fff"}}>Kommee</strong>
            </div>
            <Link href="/restaurants" aria-label="Restaurant options" style={{color:"#e5f2e9",fontSize:24,textDecoration:"none",padding:"0 5px"}}>⋮</Link>
          </div>
          <div style={{position:"relative",zIndex:1}}>
            <h1 style={{fontSize:28,fontWeight:750,color:"#fff",margin:"0 0 9px",lineHeight:1.15}}>Good morning</h1>
            <label style={{display:"inline-flex",alignItems:"center",gap:7,color:"#f0f6f1",fontSize:16,fontWeight:500}}>
              <span className="sr-only">Select restaurant</span>
              <select aria-label="Select restaurant" value={activeWorkspace ? activeWorkspace.organisationId + "." + activeWorkspace.siteId : ""} disabled={switching || !availableWorkspaces.length} onChange={(event) => { const [organisationId,siteId] = event.target.value.split("."); if (organisationId && siteId) void switchWorkspace(organisationId,siteId); }} style={{background:"transparent",color:"#fff",border:0,outline:0,maxWidth:230,fontSize:16,fontWeight:500,appearance:"none",padding:0}}>
                {!activeWorkspace && <option value="">Select restaurant</option>}
                {availableWorkspaces.flatMap((org) => org.sites.map((site) => <option key={org.organisationId + "." + site.id} value={org.organisationId + "." + site.id} style={{color:"#173d32"}}>{site.name}</option>))}
              </select>
              <span aria-hidden="true">⌄</span>
            </label>
          </div>
        </header>
        <div style={{position:"relative",marginTop:-38,background:"#f7f8f6",borderRadius:"32px 32px 0 0",padding:"22px 16px 8px"}}>
          <section aria-label="Quick access" style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:12}}>
            <Link href="/invoices/upload" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="camera" /><span>Scan Invoice</span>
            </Link>
            <Link href="/orders" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="cart" /><span>New Order</span>
            </Link>
            <Link href="/invoices" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="file" /><span>Invoices</span>
            </Link>
            <Link href="/suppliers" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="store" /><span>Suppliers</span>
            </Link>
            <Link href="/products" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="box" /><span>Products</span>
            </Link>
            <Link href="/compliance" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="check" /><span>Compliance</span>
            </Link>
            <Link href="/reports" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="chart" /><span>Reports</span>
            </Link>
            
            <Link href="/restaurants" style={{background:"#fff",border:"1px solid #edf0ed",borderRadius:22,minHeight:137,boxShadow:"0 4px 15px rgba(17,50,39,.06)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textDecoration:"none",color:"#182f27",fontWeight:750,fontSize:15,textAlign:"center",padding:12}}>
              <KommeeHomeIcon name="building" /><span>Restaurants</span>
            </Link>
          </section>
          <section aria-label="Compliance shortcuts" style={{marginTop:20,background:"#fff",borderRadius:22,padding:"18px 18px 8px",boxShadow:"0 4px 15px rgba(17,50,39,.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:12}}><h2 style={{fontSize:17,fontWeight:750,margin:0,color:"#173d32"}}>Today&apos;s compliance</h2><Link href="/compliance" style={{color:"#087e60",fontWeight:650,fontSize:13}}>View all →</Link></div>
            <Link href="/compliance" style={{display:"flex",alignItems:"center",gap:10,padding:"13px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:550,fontSize:14}}><span style={{color:"#15936e",fontSize:18}}>○</span><span style={{flex:1}}>Fridge & freezer temperatures</span><span aria-hidden="true">›</span></Link>
            <Link href="/compliance" style={{display:"flex",alignItems:"center",gap:10,padding:"13px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:550,fontSize:14}}><span style={{color:"#15936e",fontSize:18}}>○</span><span style={{flex:1}}>Cleaning schedules</span><span aria-hidden="true">›</span></Link>
            <Link href="/compliance" style={{display:"flex",alignItems:"center",gap:10,padding:"13px 0",borderTop:"1px solid #edf0eb",color:"#173d32",textDecoration:"none",fontWeight:550,fontSize:14}}><span style={{color:"#15936e",fontSize:18}}>○</span><span style={{flex:1}}>Opening & closing checks</span><span aria-hidden="true">›</span></Link>
          </section>
        </div>

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

function KommeeHomeIcon({ name, small = false }: { name: string; small?: boolean }) {
  const paths: Record<string, React.ReactNode> = {
    camera: <><path d="M4 7h4l2-3h4l2 3h4v12H4z"/><circle cx="12" cy="13" r="4"/></>,
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 4h3l3 12h11l3-9H6"/></>,
    file: <><path d="M6 2h8l5 5v15H6z"/><path d="M14 2v6h5M9 12h7M9 16h7"/></>,
    store: <><path d="M3 10l2-7h14l2 7-2 3H5zM5 13v8h14v-8M9 21v-6h6"/></>,
    box: <><path d="M3 7l9-5 9 5v10l-9 5-9-5zM3 7l9 5 9-5M12 12v10M8 4l9 5"/></>,
    chart: <><path d="M5 20v-6h3v6M11 20V9h3v11M17 20V4h3v16"/></>,
    check: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 12l3 3 5-6"/></>,
    building: <><path d="M4 21V5h16v16M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-5h6v5"/></>,
    home: <><path d="M3 11l9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>
  };
  return <svg width={small ? 24 : 35} height={small ? 24 : 35} viewBox="0 0 24 24" fill="none" stroke="#11936C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.home}</svg>;
}
