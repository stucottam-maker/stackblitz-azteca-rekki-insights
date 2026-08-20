import type {
  ApprovedInvoice,
  IngredientPriceRecord,
  PurchaseOrder,
  RecipeCostSummary,
  StockTake,
} from "../data/insights";
import { supabase } from "./supabase";
import { readWorkspaceStates } from "./workspaceState";

const INSIGHT_KEYS = [
  "ingredientPrices",
  "previousIngredientPrices",
  "purchaseOrders",
  "approvedInvoices",
  "approvedInvoiceDraft",
  "stockTakeHistory",
  "currentStockTake",
  "recipeCostSummaries",
  "salesThisPeriod",
  "theoreticalFoodCostPercent",
] as const;

function invoiceKey(invoice: ApprovedInvoice) {
  return `${invoice.supplier ?? ""}::${invoice.invoiceNumber ?? invoice.id ?? ""}`
    .toLowerCase()
    .trim();
}

function mergeInvoices(...sources: Array<ApprovedInvoice[] | null>) {
  const merged = new Map<string, ApprovedInvoice>();

  sources.forEach((source) =>
    source?.forEach((invoice) => merged.set(invoiceKey(invoice), invoice))
  );

  return Array.from(merged.values());
}

async function loadRelationalInvoices(): Promise<ApprovedInvoice[]> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return [];

  const response = await fetch("/api/invoices", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not load tenant invoices");
  const payload = (await response.json()) as { invoices?: ApprovedInvoice[] };
  return payload.invoices ?? [];
}

export async function loadInsightWorkspaceData() {
  const [state, relationalInvoices] = await Promise.all([
    readWorkspaceStates(INSIGHT_KEYS),
    loadRelationalInvoices(),
  ]);
  const invoiceHistory = (state.get("approvedInvoices") ?? []) as ApprovedInvoice[];
  const singleInvoice = (state.get("approvedInvoiceDraft") ?? null) as
    | ApprovedInvoice
    | null;
  const stockHistory = (state.get("stockTakeHistory") ?? []) as StockTake[];
  const currentStock = (state.get("currentStockTake") ?? null) as StockTake | null;
  const stockTakes = [...stockHistory];

  if (currentStock && !stockTakes.some((item) => item.id === currentStock.id)) {
    stockTakes.push(currentStock);
  }

  const sales = Number(state.get("salesThisPeriod"));
  const theoretical = Number(state.get("theoreticalFoodCostPercent"));
  const workspaceIngredientPrices = (state.get("ingredientPrices") ?? {}) as Record<
    string,
    IngredientPriceRecord
  >;

  return {
    ingredientPrices: workspaceIngredientPrices,
    previousIngredientPrices: (state.get("previousIngredientPrices") ?? {}) as Record<
      string,
      IngredientPriceRecord
    >,
    purchaseOrders: (state.get("purchaseOrders") ?? []) as PurchaseOrder[],
    invoices: mergeInvoices(
      relationalInvoices,
      invoiceHistory,
      singleInvoice ? [singleInvoice] : null
    ),
    stockTakes,
    recipeCosts: (state.get("recipeCostSummaries") ?? []) as RecipeCostSummary[],
    salesThisPeriod: Number.isFinite(sales) && sales > 0 ? sales : null,
    theoreticalFoodCostPercent:
      Number.isFinite(theoretical) && theoretical > 0 ? theoretical : null,
  };
}
