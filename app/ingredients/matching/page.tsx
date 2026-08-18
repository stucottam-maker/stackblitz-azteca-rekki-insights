"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { recipes } from "../../data/allRecipes";
import { supabase } from "../../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceState,
} from "../../lib/workspaceState";

type ProductOption = {
  supplier: string;
  productName: string;
  pack?: string | null;
  priceUnit?: string | null;
  invoiceDate?: string | null;
};

type Mapping = { supplier?: string; productName?: string };
type MappingMap = Record<string, Mapping>;

function normalise(value: string) {
  return value.trim().toLowerCase();
}

export default function IngredientMatchingPage() {
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [mappings, setMappings] = useState<MappingMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const ingredientNames = useMemo(() => {
    const recipeNames = new Set(recipes.map((recipe) => normalise(recipe.name)));
    const names = new Map<string, string>();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const name = ingredient.name?.trim();
        if (!name || recipeNames.has(normalise(name))) return;
        names.set(normalise(name), name);
      });
    });

    return Array.from(names.values()).sort((a, b) => a.localeCompare(b));
  }, []);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) return;

        const response = await fetch("/api/ingredient-match-options", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load invoice products");

        const stored = await readWorkspaceState<MappingMap>("invoiceProductMappings", {});
        setProducts(Array.isArray(data.products) ? data.products : []);
        setMappings({ ...(data.mappings ?? {}), ...stored });
      } catch (error: any) {
        setMessage(error?.message || "Could not load matching data");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const filteredIngredients = ingredientNames.filter((name) =>
    name.toLowerCase().includes(search.trim().toLowerCase())
  );

  async function saveMapping(ingredient: string, selection: string) {
    const key = normalise(ingredient);
    const next = { ...mappings };

    if (!selection) {
      delete next[key];
    } else {
      const [supplier, productName] = selection.split("|||", 2);
      next[key] = { supplier, productName };
    }

    setSaving(ingredient);
    setMappings(next);
    try {
      await persistWorkspaceState("invoiceProductMappings", JSON.stringify(next));
      setMessage(`${ingredient} mapping saved.`);
      window.dispatchEvent(new CustomEvent("kitchen-insights:ingredient-prices-updated"));
    } catch (error: any) {
      setMessage(error?.message || "Could not save mapping");
    } finally {
      setSaving("");
    }
  }

  return (
    <div className="page ingredient-matching-page">
      <div className="topbar">
        <div>
          <p className="eyebrow">Invoice pricing</p>
          <h1>Ingredient matching</h1>
          <p className="page-description">
            Confirm which supplier invoice product belongs to each recipe ingredient.
            Saved mappings override automatic matching on future invoices.
          </p>
        </div>
        <Link href="/ingredients" className="secondary-inline-button">← Ingredients</Link>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Review</p>
            <h2>Recipe ingredients</h2>
          </div>
          <input
            type="search"
            placeholder="Search ingredients…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{ minWidth: 220 }}
          />
        </div>

        {message && <div className="notice">{message}</div>}

        {loading ? (
          <div className="empty-table-message">Loading invoice products…</div>
        ) : (
          <div className="matching-list">
            {filteredIngredients.map((ingredient) => {
              const mapping = mappings[normalise(ingredient)];
              const currentValue = mapping?.productName
                ? `${mapping.supplier ?? ""}|||${mapping.productName}`
                : "";

              return (
                <div className="matching-row" key={ingredient}>
                  <div className="matching-ingredient">
                    <strong>{ingredient}</strong>
                    <span>{mapping?.productName ? "Manual match" : "Automatic / unmatched"}</span>
                  </div>

                  <select
                    value={currentValue}
                    onChange={(event) => void saveMapping(ingredient, event.target.value)}
                    disabled={saving === ingredient}
                  >
                    <option value="">Use automatic matching</option>
                    {products.map((product) => {
                      const value = `${product.supplier}|||${product.productName}`;
                      return (
                        <option key={value} value={value}>
                          {product.supplier} — {product.productName}
                          {product.pack ? ` · ${product.pack}` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
