import type {
  ApprovedInvoice,
  IngredientPriceRecord,
  PurchaseOrder,
  RecipeCostSummary,
  StockTake,
} from "../data/insights";
import {
  observedApprovedInvoices,
  observedIngredientPrices,
} from "../data/invoiceOrderHistory";
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

function mergeInvoices(
  workspaceInvoices: ApprovedInvoice[],
  singleInvoice: ApprovedInvoice | null
) {
  const merged = new Map<string, ApprovedInvoice>();

  observedApprovedInvoices.forEach((invoice) => {
    merged.set(invoiceKey(invoice), invoice as ApprovedInvoice);
  });

  workspaceInvoices.forEach((invoice) => {
    merged.set(invoiceKey(invoice), invoice);
  });

  if (singleInvoice) {
    merged.set(invoiceKey(singleInvoice), singleInvoice);
  }

  return Array.from(merged.values());
}

function mergeIngredientPrices(
  workspacePrices: Record<string, IngredientPriceRecord>
) {
  const merged: Record<string, IngredientPriceRecord> = {
    ...observedIngredientPrices,
  };

  Object.entries(workspacePrices).forEach(([ingredient, price]) => {
    const observed = merged[ingredient];

    if (!observed) {
      merged[ingredient] = price;
      return;
    }

    const observedDate = new Date(observed.updatedAt ?? 0).getTime();
    const workspaceDate = new Date(price.updatedAt ?? 0).getTime();

    if (
      !Number.isFinite(observedDate) ||
      !Number.isFinite(workspaceDate) ||
      workspaceDate >= observedDate
    ) {
      merged[ingredient] = price;
    }
  });

  return merged;
}

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
  const workspaceIngredientPrices = (state.get("ingredientPrices") ?? {}) as Record<
    string,
    IngredientPriceRecord
  >;

  return {
    ingredientPrices: mergeIngredientPrices(workspaceIngredientPrices),
    previousIngredientPrices: (state.get("previousIngredientPrices") ?? {}) as Record<
      string,
      IngredientPriceRecord
    >,
    purchaseOrders: (state.get("purchaseOrders") ?? []) as PurchaseOrder[],
    invoices: mergeInvoices(invoiceHistory, singleInvoice),
    stockTakes,
    recipeCosts: (state.get("recipeCostSummaries") ?? []) as RecipeCostSummary[],
    salesThisPeriod: Number.isFinite(sales) && sales > 0 ? sales : null,
    theoreticalFoodCostPercent:
      Number.isFinite(theoretical) && theoretical > 0 ? theoretical : null,
  };
}
