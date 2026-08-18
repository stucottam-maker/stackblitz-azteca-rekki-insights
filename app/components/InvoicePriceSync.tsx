"use client";

import { useEffect } from "react";

import { recipes } from "../data/allRecipes";
import { supabase } from "../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceState,
} from "../lib/workspaceState";

type IngredientPrice = {
  price?: number;
  unit?: string;
  supplier?: string;
  product?: string;
  updatedAt?: string;
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  source?: string;
  matchType?: string;
  confidence?: number;
  rawPriceUnit?: string | null;
  rawPack?: string | null;
  conversionAssumption?: string;
};

type IngredientPrices = Record<string, IngredientPrice>;
type UnitFamily = "mass" | "volume" | "count" | "bunch" | "other";

function normalise(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

function unitFamily(unit?: string): UnitFamily {
  const value = normalise(unit);
  if (["g", "gram", "grams", "kg", "kilogram", "kilograms"].includes(value)) {
    return "mass";
  }
  if (["ml", "millilitre", "millilitres", "l", "ltr", "litre", "litres"].includes(value)) {
    return "volume";
  }
  if (
    [
      "each",
      "ea",
      "unit",
      "units",
      "head",
      "heads",
      "can",
      "cans",
      "piece",
      "pieces",
      "portion",
      "portions",
      "unt",
    ].includes(value)
  ) {
    return "count";
  }
  if (["bunch", "bunches"].includes(value)) return "bunch";
  return "other";
}

function isLiquidLike(name: string) {
  return /\b(juice|oil|sauce|vinegar|cream|milk|mayo|mayonnaise|syrup|stock|mirin|tequila|mezcal)\b/i.test(name);
}

function buildIngredientUsage() {
  const recipeNames = new Set(recipes.map((recipe) => normalise(recipe.name)));
  const names = new Map<string, { name: string; families: Set<UnitFamily> }>();

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const name = ingredient.name?.trim();
      if (!name) continue;

      const key = normalise(name);
      if (recipeNames.has(key)) continue;

      const current = names.get(key) ?? { name, families: new Set<UnitFamily>() };
      current.families.add(unitFamily(ingredient.unit));
      names.set(key, current);
    }
  }

  return names;
}

function makeCompatiblePrice(
  ingredient: string,
  price: IngredientPrice,
  families: Set<UnitFamily>
): IngredientPrice | null {
  const sourceFamily = unitFamily(price.unit);

  if (families.has(sourceFamily)) return price;

  // Many kitchen recipes weigh liquids even when suppliers sell them by litre.
  // Until a density table is added, use the standard costing approximation 1 L ≈ 1 kg.
  if (isLiquidLike(ingredient) && sourceFamily === "volume" && families.has("mass")) {
    return {
      ...price,
      unit: "kg",
      conversionAssumption: "1 L ≈ 1 kg for recipe costing",
    };
  }

  if (isLiquidLike(ingredient) && sourceFamily === "mass" && families.has("volume")) {
    return {
      ...price,
      unit: "L",
      conversionAssumption: "1 kg ≈ 1 L for recipe costing",
    };
  }

  return null;
}

function comparablePrice(value?: IngredientPrice) {
  return JSON.stringify({
    price: value?.price ?? null,
    unit: value?.unit ?? null,
    supplier: value?.supplier ?? null,
    product: value?.product ?? null,
    updatedAt: value?.updatedAt ?? null,
    invoiceNumber: value?.invoiceNumber ?? null,
    invoiceDate: value?.invoiceDate ?? null,
    source: value?.source ?? null,
    matchType: value?.matchType ?? null,
    confidence: value?.confidence ?? null,
    conversionAssumption: value?.conversionAssumption ?? null,
  });
}

export default function InvoicePriceSync() {
  useEffect(() => {
    let cancelled = false;
    let syncing = false;

    async function syncPrices() {
      if (syncing) return;
      syncing = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) return;

        const usage = buildIngredientUsage();
        const ingredientNames = Array.from(usage.values()).map((item) => item.name);
        if (ingredientNames.length === 0) return;

        const response = await fetch("/api/ingredient-prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ ingredients: ingredientNames }),
        });

        if (!response.ok) {
          throw new Error(`Invoice price sync failed (${response.status})`);
        }

        const payload = (await response.json()) as { prices?: IngredientPrices };
        const invoicePrices = payload.prices ?? {};

        if (cancelled || Object.keys(invoicePrices).length === 0) return;

        const current = await readWorkspaceState<IngredientPrices>("ingredientPrices", {});
        const previous = { ...current };
        const merged: IngredientPrices = { ...current };
        let changed = false;

        for (const [ingredient, rawPrice] of Object.entries(invoicePrices)) {
          const usageEntry = usage.get(normalise(ingredient));
          if (!usageEntry) continue;

          const price = makeCompatiblePrice(
            ingredient,
            rawPrice,
            usageEntry.families
          );
          if (!price) continue;

          const existingKey = Object.keys(merged).find(
            (key) => normalise(key) === normalise(ingredient)
          );
          const targetKey = existingKey ?? ingredient;

          if (comparablePrice(merged[targetKey]) !== comparablePrice(price)) {
            merged[targetKey] = price;
            changed = true;
          }
        }

        if (!changed || cancelled) return;

        await persistWorkspaceState(
          "previousIngredientPrices",
          JSON.stringify(previous)
        );
        await persistWorkspaceState(
          "ingredientPrices",
          JSON.stringify(merged)
        );

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("kitchen-insights:ingredient-prices-synced")
          );

          // A recipe editor may already have loaded the old price snapshot.
          // Reload it once after a genuine price change; the next sync is unchanged.
          if (window.location.pathname.startsWith("/recipes/")) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Invoice price sync failed", error);
      } finally {
        syncing = false;
      }
    }

    void syncPrices();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        void syncPrices();
      }
    });

    const resync = () => void syncPrices();
    window.addEventListener("kitchen-insights:ingredient-mappings-updated", resync);

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
      window.removeEventListener("kitchen-insights:ingredient-mappings-updated", resync);
    };
  }, []);

  return null;
}
