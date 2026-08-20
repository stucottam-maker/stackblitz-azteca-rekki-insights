"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { useWorkspace } from "../../components/WorkspaceProvider";
import { recipes as legacyRecipes } from "../../data/allRecipes";
import { usesAztecaLegacyCatalogue } from "../../lib/workspaceCatalogues";
import { supabase } from "../../lib/supabase";
import {
  persistWorkspaceState,
  readWorkspaceState,
} from "../../lib/workspaceState";

type AutomaticMatch = {
  price?: number;
  unit?: string;
  supplier: string;
  product: string;
  confidence?: number;
  matchType?: string;
};

type Mapping = { supplier?: string; productName?: string };
type MappingMap = Record<string, Mapping>;

function normalise(value: string) {
  return value.trim().toLowerCase();
}

export default function IngredientMatchingPage() {
  const { activeWorkspace } = useWorkspace();
  const recipes = useMemo(
    () =>
      usesAztecaLegacyCatalogue(activeWorkspace?.organisationId)
        ? legacyRecipes
        : [],
    [activeWorkspace?.organisationId]
  );

  const [automaticMatches, setAutomaticMatches] = useState<Record<string, AutomaticMatch>>({});
  const [mappings, setMappings] = useState<MappingMap>({});
  const [loading, setLoading] = useState(true);
  const [catalogueCount, setCatalogueCount] = useState(0);
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
  }, [recipes]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        if (!ingredientNames.length) {
          setAutomaticMatches({});
          setMappings({});
          setCatalogueCount(0);
          setMessage("");
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) return;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        };
        const [mappingResponse, priceResponse] = await Promise.all([
          fetch("/api/ingredient-match-options", { headers, cache: "no-store" }),
          fetch("/api/ingredient-prices", {
            method: "POST",
            headers,
            body: JSON.stringify({ ingredients: ingredientNames }),
            cache: "no-store",
          }),
        ]);
        const [mappingData, priceData] = await Promise.all([
          mappingResponse.json(),
          priceResponse.json(),
        ]);
        if (!mappingResponse.ok) {
          throw new Error(mappingData.error || "Could not load matching data");
        }
        if (!priceResponse.ok) {
          throw new Error(priceData.error || "Could not automate ingredient matching");
        }

        const stored = await readWorkspaceState<MappingMap>("invoiceProductMappings", {});
        setMappings({ ...(mappingData.mappings ?? {}), ...stored });
        setCatalogueCount(Number(mappingData.catalogueCount ?? 0));
        setAutomaticMatches(priceData.prices ?? {});
      } catch (error: any) {
        setMessage(error?.message || "Could not load matching data");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [ingredientNames]);

  const filteredIngredients = ingredientNames.filter((name) =>
    name.toLowerCase().includes(search.trim().toLowerCase())
  );

  async function removeManualMapping(ingredient: string) {
    const key = normalise(ingredient);
    const next = { ...mappings };
    delete next[key];

    setSaving(ingredient);
    setMappings(next);
    try {
      await persistWorkspaceState("invoiceProductMappings", JSON.stringify(next));
      setMessage(`${ingredient} returned to automatic matching.`);
      window.dispatchEvent(
        new CustomEvent("kitchen-insights:ingredient-mappings-updated")
      );
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
            Matches are selected automatically from approved invoices and refreshed as prices change.
          </p>
        </div>
        <Link href="/ingredients" className="secondary-inline-button">← Ingredients</Link>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Review</p>
            <h2>Recipe ingredients</h2>
            <p>
              {ingredientNames.length
                ? `${catalogueCount} supplier products checked automatically.`
                : `No recipe ingredients in ${activeWorkspace?.organisationName ?? "this workspace"} yet.`}
            </p>
          </div>
          {ingredientNames.length > 0 && (
            <input
              type="search"
              placeholder="Search ingredients…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ minWidth: 220 }}
            />
          )}
        </div>

        {message && <div className="notice">{message}</div>}

        {loading ? (
          <div className="empty-table-message">Loading invoice products…</div>
        ) : filteredIngredients.length === 0 ? (
          <div className="empty-table-message">
            {ingredientNames.length
              ? "No ingredients match your search."
              : "Add recipes to this restaurant before matching recipe ingredients to invoice products."}
          </div>
        ) : (
          <div className="matching-list">
            {filteredIngredients.map((ingredient) => {
              const mapping = mappings[normalise(ingredient)];
              const automatic = automaticMatches[ingredient];
              const matchedProduct = mapping?.productName ?? automatic?.product;
              const matchedSupplier = mapping?.supplier ?? automatic?.supplier;
              const confidence = mapping?.productName ? 100 : automatic?.confidence;

              return (
                <div className="matching-row" key={ingredient}>
                  <div className="matching-ingredient">
                    <strong>{ingredient}</strong>
                    <span>
                      {mapping?.productName
                        ? "Manual override"
                        : matchedProduct
                          ? `Automatic match · ${confidence ?? 0}% confidence`
                          : "Needs more invoice data"}
                    </span>
                  </div>

                  <div className="automatic-match-result">
                    {matchedProduct ? (
                      <>
                        <strong>{matchedProduct}</strong>
                        <span>{matchedSupplier || "Unknown supplier"}</span>
                      </>
                    ) : (
                      <span>No reliable product match yet</span>
                    )}
                    {mapping?.productName && (
                      <button
                        type="button"
                        className="secondary-inline-button"
                        onClick={() => void removeManualMapping(ingredient)}
                        disabled={saving === ingredient}
                      >
                        Use automation
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
