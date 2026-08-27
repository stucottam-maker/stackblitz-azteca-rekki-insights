"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { generateInsights } from "../data/insights";
import { loadInsightWorkspaceData } from "../lib/insightWorkspaceData";
import { useWorkspace } from "./WorkspaceProvider";

type WidgetPlugin = {
  update: (payload: Record<string, string>) => Promise<unknown>;
};

type CapacitorWindow = Window & {
  Capacitor?: {
    Plugins?: {
      KitchenInsightsWidget?: WidgetPlugin;
    };
  };
};

function isKitchenInsightsAndroid() {
  if (typeof window === "undefined") return false;
  return /KitchenInsightsAndroid|; wv\)/i.test(navigator.userAgent) && /Android/i.test(navigator.userAgent);
}

function formatWidgetCurrency(value: number | null | undefined, mexicanPesos: boolean) {
  if (value == null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(mexicanPesos ? "es-MX" : "en-GB", {
    style: "currency",
    currency: mexicanPesos ? "MXN" : "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function compactIssue(value: string | undefined, fallback: string) {
  const text = value?.trim() || fallback;
  return text.length > 64 ? `${text.slice(0, 61)}…` : text;
}

export default function AndroidWidgetSync() {
  const pathname = usePathname();
  const { activeWorkspace } = useWorkspace();

  useEffect(() => {
    if (!isKitchenInsightsAndroid() || !activeWorkspace) return;

    const workspace = activeWorkspace;
    let cancelled = false;

    async function sync() {
      const plugin = (window as CapacitorWindow).Capacitor?.Plugins?.KitchenInsightsWidget;
      if (!plugin?.update) return;

      try {
        const data = await loadInsightWorkspaceData();
        if (cancelled) return;

        const result = generateInsights(data);
        const { metrics, insights } = result;
        const mexicanPesos = /benditos mexicali/i.test(workspace.organisationName);
        const locale = mexicanPesos ? "es" : "en";
        const now = new Date();
        const twoDaysAway = new Date(now);
        twoDaysAway.setDate(twoDaysAway.getDate() + 2);

        const ordersDue = data.purchaseOrders.filter((order) => {
          if (!order.deliveryDate) return false;
          if (/completed|received|cancelled/i.test(order.status ?? "")) return false;
          const delivery = new Date(order.deliveryDate);
          if (Number.isNaN(delivery.getTime())) return false;
          return delivery >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && delivery <= twoDaysAway;
        }).length;

        const stockAlerts = insights.filter(
          (item) => item.category === "stock" && item.severity !== "low"
        ).length;
        const costAlerts = insights.filter(
          (item) => item.category === "cost" && item.severity !== "low"
        ).length;
        const priority = insights
          .filter((item) => item.severity === "high")
          .slice(0, 3);

        const noIssues = mexicanPesos ? "Sin alertas prioritarias" : "No priority alerts";

        await plugin.update({
          locale,
          workspace: `${workspace.organisationName} · ${workspace.siteName}`,
          monthSpend: formatWidgetCurrency(metrics.spendThisMonth, mexicanPesos),
          stockValue: formatWidgetCurrency(metrics.currentStockValue, mexicanPesos),
          actualCogs: formatWidgetCurrency(metrics.actualCogs, mexicanPesos),
          variance:
            metrics.foodCostVariancePercent == null
              ? "—"
              : `${metrics.foodCostVariancePercent > 0 ? "+" : ""}${metrics.foodCostVariancePercent.toFixed(1)}%`,
          invoiceCount: String(metrics.approvedInvoices ?? 0),
          openOrders: String(metrics.openOrders ?? 0),
          awaitingInvoice: String(metrics.ordersAwaitingInvoice ?? 0),
          ordersDue: String(ordersDue),
          stockAlerts: String(stockAlerts),
          costAlerts: String(costAlerts),
          highPriority: String(priority.length),
          issue1: compactIssue(priority[0]?.title, noIssues),
          issue2: compactIssue(priority[1]?.title, noIssues),
          issue3: compactIssue(priority[2]?.title, noIssues),
          updated: new Intl.DateTimeFormat(mexicanPesos ? "es-MX" : "en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(now),
        });
      } catch (error) {
        console.warn("Android widget sync skipped", error);
      }
    }

    void sync();
    const onFocus = () => void sync();
    window.addEventListener("focus", onFocus);
    const timer = window.setInterval(() => void sync(), 15 * 60 * 1000);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      window.clearInterval(timer);
    };
  }, [activeWorkspace, pathname]);

  return null;
}
