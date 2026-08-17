import type {
  ApprovedInvoice,
  IngredientPriceRecord,
  PurchaseOrder,
  RecipeCostSummary,
  StockTake,
} from "../data/insights";
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

export async function loadInsightWorkspaceData() {
  const state = await readWorkspaceStates(INSIGHT_KEYS);
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

  return {
    ingredientPrices: (state.get("ingredientPrices") ?? {}) as Record<
      string,
      IngredientPriceRecord
    >,
    previousIngredientPrices: (state.get("previousIngredientPrices") ?? {}) as Record<
      string,
      IngredientPriceRecord
    >,
    purchaseOrders: (state.get("purchaseOrders") ?? []) as PurchaseOrder[],
    invoices: invoiceHistory.length ? invoiceHistory : singleInvoice ? [singleInvoice] : [],
    stockTakes,
    recipeCosts: (state.get("recipeCostSummaries") ?? []) as RecipeCostSummary[],
    salesThisPeriod: Number.isFinite(sales) && sales > 0 ? sales : null,
    theoreticalFoodCostPercent:
      Number.isFinite(theoretical) && theoretical > 0 ? theoretical : null,
  };
}
