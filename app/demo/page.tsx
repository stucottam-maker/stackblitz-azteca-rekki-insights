"use client";

import Link from "next/link";
import { useState } from "react";
import { MarketingShell, MarketingIcon } from "../components/MarketingShell";

type Tab = "overview" | "purchasing" | "compliance";

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>("overview");
  return <MarketingShell>
    <main className="km-container km-secondary-main">
      <p className="km-eyebrow"><span className="km-kicker-line"/> TRY KOMMEE</p>
      <h1>A little look inside<span className="km-dot">.</span></h1>
      <p className="km-secondary-lead">Explore a read-only preview of the workspace. Everything here is fictional sample data, never a real restaurant’s information.</p>
      <div className="km-demo-box">
        <aside className="km-demo-side">
          <strong>kommee<span className="km-dot">.</span></strong>
          <span>Demo kitchen</span>
          <div role="group" aria-label="Sample feature tabs">
            <button type="button" className={tab==="overview"?"km-demo-active":""} onClick={()=>setTab("overview")}>Overview</button>
            <button type="button" className={tab==="purchasing"?"km-demo-active":""} onClick={()=>setTab("purchasing")}>Purchasing</button>
            <button type="button" className={tab==="compliance"?"km-demo-active":""} onClick={()=>setTab("compliance")}>Compliance</button>
          </div>
        </aside>
        <div className="km-demo-content">
          <span className="km-preview-caption">FICTIONAL SAMPLE DATA</span>
          <h2>{tab==="overview"?"Good to see you, Chef.":tab==="purchasing"?"Purchasing, organised.":"Ready for the day."}</h2>
          <p>{tab==="overview"?"Your kitchen, at a glance.":tab==="purchasing"?"Know your suppliers, orders and costs.":"Keep everyday checks together."}</p>
          {tab==="overview" ? <><div className="km-demo-metrics"><div>Monthly spend<strong>£4,280</strong></div><div>Stock value<strong>£8,420</strong></div><div>Food cost<strong>29.4%</strong></div></div><div className="km-demo-list"><strong>Recent activity</strong><span>✓ Invoice reviewed</span><span>✓ Stock count completed</span><span>✓ Opening checks logged</span></div></> : null}
          {tab==="purchasing" ? <div className="km-demo-list"><strong>Supplier activity · Example</strong><span>Fresh produce <b>£625.40</b></span><span>Dry goods <b>£328.60</b></span><span>Dairy <b>£184.20</b></span><span>All figures are sample only</span></div> : null}
          {tab==="compliance" ? <div className="km-demo-list"><strong>Today’s food safety checks · Example</strong><span>✓ Fridge temperatures</span><span>✓ Opening checklist</span><span>○ Closing checklist · Not started</span></div> : null}
        </div>
      </div>
      <div className="km-secondary-actions"><Link className="km-btn km-btn-accent" href="/join">Join a kitchen <MarketingIcon name="arrow" size={18}/></Link><Link className="km-btn km-btn-outline" href="/pricing">See example plans</Link></div>
    </main>
  </MarketingShell>;
}
