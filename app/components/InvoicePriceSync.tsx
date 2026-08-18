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
};

type IngredientPrices = Record<string, IngredientPrice>;

function normalise(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

function buildIngredientList() {
  const recipeNames = new Set(
    recipes.map((recipe) => normalise(recipe.name))
  );
  const names = new Map<string, string>();

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      const name = ingredient.name?.trim();
      if (!name) continue;

      const key = normalise(name);
      if (recipeNames.has(key)) continue;
      if (!names.has(key)) names.set(key, name);
    }
  }

  return Array.from(names.values());
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
  });
}

export default function InvoicePriceSync() {
  useEffect(() => {
    let cancelled = false;

    async function syncPrices() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) return;

        const ingredientNames = buildIngredientList();
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

        const payload = (await response.json()) as {
          prices?: IngredientPrices;
        };
        const invoicePrices = payload.prices ?? {};

        if (cancelled || Object.keys(invoicePrices).length === 0) return;

        const current = await readWorkspaceState<IngredientPrices>(
          "ingredientPrices",
          {}
        );

        const previous = { ...current };
        const merged: IngredientPrices = { ...current };
        let changed = false;

        for (const [ingredient, price] of Object.entries(invoicePrices)) {
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
            new CustomEvent("kitchen-insights:ingredient-prices-updated")
          );
        }
      } catch (error) {
        console.error("Invoice price sync failed", error);
      }
    }

    void syncPrices();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        void syncPrices();
      }
    });

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
