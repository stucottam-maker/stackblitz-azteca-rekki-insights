import type {
  ApprovedInvoice,
  IngredientPriceRecord,
  PurchaseOrder,
  RecipeCostSummary,
  StockTake,
} from "../data/insights";
import {
  historicalStockTakes,
  type HistoricalStockItem,
} from "../data/stockHistory";
import { supabase } from "./supabase";
import { readWorkspaceStates } from "./workspaceState";

const INSIGHT_KEYS = [
  "ingredientPrices",
  "previousIngredientPrices",
  "purchaseOrders",
  "approvedInvoices",
  "approvedInvoiceDraft",
  "stockTakeHistory",
  "recipeCostSummaries",
  "salesThisPeriod",
  "theoreticalFoodCostPercent",
  "organisationSettings",
] as const;

type OrganisationSettings = {
  name?: string;
};

type WorkspaceStockItem = {
  name?: string;
  ingredient?: string;
  quantity?: number | null;
  unit?: string;
  value?: number;
  price?: number | null;
  priceUnit?: string;
};

const STOCK_PRICE_ALIASES: Record<string, string[]> = {
  tuna: ["Tuna", "Tuna loin"],
  "pork belly chicharron": ["Pork belly"],
  "chicken thigh pastor marinade": ["Chicken thigh"],
  "carnitas service": ["Carnitas pork"],
  birria: ["Birria beef"],
  "10cm tortillas": ["10cm masafina tortilla", "10cm masafina tortillas"],
  "12cm tortillas": ["12cm masafina tortilla", "12cm masafina tortillas"],
  "heirloom blue masafina": ["12cm masafina heritage blue corn tortilla"],
  "white onions": ["Onion", "White onion"],
  "red onions": ["Red onion"],
  "aubergines, prep": ["Aubergine"],
  "jalapeño fresh": ["Jalapeño", "Jalapeño, fresh"],
};

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

function normaliseName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ");
}

function normaliseUnit(value: string | undefined) {
  const unit = (value ?? "").trim().toLowerCase();

  if (["kg", "kgs", "kilogram", "kilograms"].includes(unit)) return "kg";
  if (["g", "gr", "gram", "grams"].includes(unit)) return "g";
  if (["l", "ltr", "litre", "litres", "liter", "liters"].includes(unit)) return "L";
  if (["ml", "millilitre", "millilitres", "milliliter", "milliliters"].includes(unit)) {
    return "ml";
  }
  if (["u", "unit", "units", "each"].includes(unit)) return "each";
  if (["packet", "packets", "pack", "packs"].includes(unit)) return "pack";
  if (["punnet", "punnets"].includes(unit)) return "punnet";
  if (["bunch", "bunches"].includes(unit)) return "bunch";
  if (["box", "boxes"].includes(unit)) return "box";
  if (["tin", "tins", "can", "cans"].includes(unit)) return "tin";

  return value?.trim() ?? "";
}

function parseHistoricalQuantity(item: HistoricalStockItem) {
  const unit = normaliseUnit(item.unit);
  const value = item.quantity;

  if (typeof value === "number" && Number.isFinite(value)) {
    return { quantity: value, unit };
  }

  if (typeof value !== "string") {
    return { quantity: null, unit };
  }

  const text = value.trim();
  const direct = Number(text);

  if (Number.isFinite(direct)) {
    return { quantity: direct, unit };
  }

  const gramsPlusKg = text.match(
    /(\d+(?:\.\d+)?)\s*g[^+]*\+\s*(\d+(?:\.\d+)?)\s*kg/i
  );
  if (gramsPlusKg) {
    return {
      quantity: Number(gramsPlusKg[1]) / 1000 + Number(gramsPlusKg[2]),
      unit: "kg",
    };
  }

  const packsByGrams = text.match(
    /(\d+(?:\.\d+)?)\s*(?:packets?|packs?)\s*x\s*(\d+(?:\.\d+)?)\s*g/i
  );
  if (packsByGrams) {
    return {
      quantity: (Number(packsByGrams[1]) * Number(packsByGrams[2])) / 1000,
      unit: "kg",
    };
  }

  const slashValue = text.match(/\/\s*(\d+(?:\.\d+)?)\s*$/);
  if (slashValue) {
    return {
      quantity: Number(slashValue[1]),
      unit,
    };
  }

  const multiplied = text.match(
    /(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*(kg|g|l|ml)\b/i
  );
  if (multiplied) {
    const quantity = Number(multiplied[1]) * Number(multiplied[2]);
    return {
      quantity,
      unit: normaliseUnit(multiplied[3]),
    };
  }

  return { quantity: null, unit };
}

function buildPriceIndex(prices: Record<string, IngredientPriceRecord>) {
  const index = new Map<string, IngredientPriceRecord>();

  Object.entries(prices).forEach(([name, record]) => {
    index.set(normaliseName(name), record);
  });

  return index;
}

function resolvePriceRecord(
  name: string,
  prices: Record<string, IngredientPriceRecord>,
  priceIndex: Map<string, IngredientPriceRecord>
) {
  if (prices[name]) return prices[name];

  const normalised = normaliseName(name);
  const direct = priceIndex.get(normalised);
  if (direct) return direct;

  const aliases = STOCK_PRICE_ALIASES[normalised] ?? [];
  for (const alias of aliases) {
    const exact = prices[alias];
    if (exact) return exact;

    const matched = priceIndex.get(normaliseName(alias));
    if (matched) return matched;
  }

  return null;
}

function convertStockValue(
  quantity: number,
  stockUnit: string,
  price: number,
  priceUnit: string
) {
  const from = normaliseUnit(stockUnit);
  const to = normaliseUnit(priceUnit);

  if (!from || !to || !Number.isFinite(quantity) || !Number.isFinite(price)) {
    return null;
  }

  if (from === to) return quantity * price;
  if (from === "g" && to === "kg") return (quantity / 1000) * price;
  if (from === "kg" && to === "g") return quantity * 1000 * price;
  if (from === "ml" && to === "L") return (quantity / 1000) * price;
  if (from === "L" && to === "ml") return quantity * 1000 * price;

  return null;
}

function valueStockTake(
  stockTake: StockTake,
  prices: Record<string, IngredientPriceRecord>,
  priceIndex: Map<string, IngredientPriceRecord>
): StockTake {
  let totalValue = 0;

  const items = (stockTake.items ?? []).map((rawItem) => {
    const item = rawItem as WorkspaceStockItem;
    const quantity =
      typeof item.quantity === "number" && Number.isFinite(item.quantity)
        ? item.quantity
        : null;
    const name = item.ingredient ?? item.name ?? "";
    const stockUnit = normaliseUnit(item.unit);

    let value: number | null = null;

    if (quantity !== null) {
      const directPrice =
        typeof item.price === "number" && Number.isFinite(item.price)
          ? item.price
          : null;

      if (directPrice !== null) {
        value = convertStockValue(
          quantity,
          stockUnit,
          directPrice,
          item.priceUnit ?? stockUnit
        );
      }

      if (value === null && name) {
        const priceRecord = resolvePriceRecord(name, prices, priceIndex);
        if (priceRecord && Number.isFinite(priceRecord.price)) {
          value = convertStockValue(
            quantity,
            stockUnit,
            priceRecord.price,
            priceRecord.unit ?? stockUnit
          );
        }
      }
    }

    const safeValue = value ?? 0;
    totalValue += safeValue;

    return {
      ...rawItem,
      quantity: quantity ?? undefined,
      unit: stockUnit,
      value: safeValue,
    };
  });

  return {
    ...stockTake,
    items,
    totalValue,
  };
}

function historicalToStockTake(
  take: (typeof historicalStockTakes)[number]
): StockTake {
  return {
    id: take.id,
    date: take.date,
    completedAt: `${take.date}T12:00:00.000Z`,
    items: take.items.map((item) => {
      const parsed = parseHistoricalQuantity(item);

      return {
        name: item.name,
        quantity: parsed.quantity ?? undefined,
        unit: parsed.unit,
      };
    }),
  };
}

function mergeStockTakes(...sources: StockTake[][]) {
  const merged = new Map<string, StockTake>();

  sources.forEach((source) => {
    source.forEach((stockTake, index) => {
      const key =
        stockTake.id ??
        stockTake.completedAt ??
        stockTake.date ??
        stockTake.createdAt ??
        `stock-${index}`;
      merged.set(key, stockTake);
    });
  });

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
  const organisationSettings = (state.get("organisationSettings") ?? {}) as OrganisationSettings;
  const isAztecaWorkspace = /azteca/i.test(organisationSettings.name ?? "");

  const sales = Number(state.get("salesThisPeriod"));
  const theoretical = Number(state.get("theoreticalFoodCostPercent"));
  const workspaceIngredientPrices = (state.get("ingredientPrices") ?? {}) as Record<
    string,
    IngredientPriceRecord
  >;
  const priceIndex = buildPriceIndex(workspaceIngredientPrices);

  const seededHistory = isAztecaWorkspace
    ? historicalStockTakes.map(historicalToStockTake)
    : [];

  const stockTakes = mergeStockTakes(seededHistory, stockHistory).map((stockTake) =>
    valueStockTake(stockTake, workspaceIngredientPrices, priceIndex)
  );

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
