"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import {
  persistWorkspaceState,
  readWorkspaceStates,
} from "../../lib/workspaceState";

export default function ReportsSetupPage() {
  const [sales, setSales] = useState("");
  const [theoretical, setTheoretical] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    readWorkspaceStates(["salesThisPeriod", "theoreticalFoodCostPercent"])
      .then((state) => {
        const salesValue = state.get("salesThisPeriod");
        const theoreticalValue = state.get("theoreticalFoodCostPercent");
        if (typeof salesValue === "number") setSales(String(salesValue));
        if (typeof theoreticalValue === "number") setTheoretical(String(theoreticalValue));
      })
      .catch((error) => console.error("COGS setup load failed", error));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const salesNumber = sales.trim() === "" ? null : Number(sales);
    const theoreticalNumber = theoretical.trim() === "" ? null : Number(theoretical);

    await Promise.all([
      persistWorkspaceState("salesThisPeriod", JSON.stringify(salesNumber)),
      persistWorkspaceState(
        "theoreticalFoodCostPercent",
        JSON.stringify(theoreticalNumber)
      ),
    ]);

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="page reports-setup-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Reporting setup</p>
          <h1>COGS period data</h1>
          <p className="page-description">
            Add sales for the same period as your stock counts so Kitchen Insights can calculate actual food cost and variance.
          </p>
        </div>
        <Link href="/reports" className="secondary-inline-button">← Reports</Link>
      </header>

      <form className="panel" onSubmit={submit} style={{ maxWidth: 720 }}>
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Current period</p>
            <h2>Sales & target</h2>
          </div>
          <button type="submit" className="primary-button">Save period data</button>
        </div>

        {saved && <div className="notice">Period data saved. Reports will use it immediately.</div>}

        <div className="settings-field" style={{ marginTop: 20 }}>
          <span>Net food sales for stock period (£)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="e.g. 32500"
            value={sales}
            onChange={(event) => setSales(event.target.value)}
          />
          <small>Use sales covering the same dates as the opening and closing stock counts.</small>
        </div>

        <div className="settings-field" style={{ marginTop: 20 }}>
          <span>Theoretical food cost target (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            inputMode="decimal"
            placeholder="e.g. 28"
            value={theoretical}
            onChange={(event) => setTheoretical(event.target.value)}
          />
          <small>This gives the reports a target until full POS/menu-sales integration is added.</small>
        </div>
      </form>
    </div>
  );
}
