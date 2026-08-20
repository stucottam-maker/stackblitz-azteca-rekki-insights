"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { useWorkspace } from "../components/WorkspaceProvider";
import { menuSections as legacyMenuSections } from "../data/menuCatalogue";
import {
  recipes as legacyRecipes,
  recipeSlug,
  type Recipe,
} from "../data/allRecipes";
import { usesAztecaLegacyCatalogue } from "../lib/workspaceCatalogues";
import { readWorkspaceStates } from "../lib/workspaceState";

type StoredRecipePayload = {
  recipe?: Recipe;
  yieldAmount?: number | null;
  yieldUnit?: string;
  summary?: {
    totalCost?: number | null;
    costPerYieldUnit?: number | null;
    pricedLineCount?: number;
    missingLineCount?: number;
  };
};

type MenuCostView = {
  recipe: Recipe | null;
  recipeCost: number | null;
  foodCostPercent: number | null;
  gpPercent: number | null;
  missingLineCount: number;
  status: "Costed" | "Incomplete" | "Recipe needed";
};

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function formatMoney(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function MenuPage() {
  const { activeWorkspace } = useWorkspace();
  const menuSections = useMemo(
    () =>
      usesAztecaLegacyCatalogue(activeWorkspace?.organisationId)
        ? legacyMenuSections
        : [],
    [activeWorkspace?.organisationId]
  );
  const recipes = useMemo(
    () =>
      usesAztecaLegacyCatalogue(activeWorkspace?.organisationId)
        ? legacyRecipes
        : [],
    [activeWorkspace?.organisationId]
  );

  const [storedRecipes, setStoredRecipes] = useState<Record<string, StoredRecipePayload>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStoredRecipes({});
    setLoading(true);

    const keys = recipes.map((recipe) => `recipe:${recipeSlug(recipe.name)}`);
    if (!keys.length) {
      setLoading(false);
      return;
    }

    readWorkspaceStates(keys)
      .then((state) => {
        setStoredRecipes(
          Object.fromEntries(
            keys.flatMap((key) => {
              const value = state.get(key) as StoredRecipePayload | undefined;
              return value ? [[key, value]] : [];
            })
          )
        );
      })
      .catch((error) => console.error("Menu recipe costing load failed", error))
      .finally(() => setLoading(false));
  }, [recipes]);

  const itemCosts = useMemo(() => {
    const result = new Map<string, MenuCostView>();

    for (const section of menuSections) {
      for (const item of section.items) {
        const menuRecipe = recipes.find(
          (recipe) =>
            recipe.type === "Menu" &&
            (normalise(recipe.linkedMenuItem ?? "") === normalise(item.name) ||
              normalise(recipe.name) === normalise(item.name))
        );

        if (!menuRecipe) {
          result.set(item.name, {
            recipe: null,
            recipeCost: null,
            foodCostPercent: null,
            gpPercent: null,
            missingLineCount: 0,
            status: "Recipe needed",
          });
          continue;
        }

        const payload = storedRecipes[`recipe:${recipeSlug(menuRecipe.name)}`];
        const yieldAmount = payload?.yieldAmount ?? menuRecipe.yieldAmount ?? null;
        const yieldUnit = payload?.yieldUnit ?? menuRecipe.yieldUnit ?? "";
        const totalCost = payload?.summary?.totalCost ?? null;
        const missingLineCount = payload?.summary?.missingLineCount ?? menuRecipe.ingredients.length;

        const isPortionRecipe =
          yieldAmount === 1 && /portion|dish|serving|serve/i.test(yieldUnit || "portion");
        const recipeCost = isPortionRecipe ? totalCost : null;
        const foodCostPercent =
          recipeCost !== null && item.price > 0 ? (recipeCost / item.price) * 100 : null;

        result.set(item.name, {
          recipe: menuRecipe,
          recipeCost,
          foodCostPercent,
          gpPercent: foodCostPercent === null ? null : 100 - foodCostPercent,
          missingLineCount,
          status:
            recipeCost !== null && missingLineCount === 0
              ? "Costed"
              : "Incomplete",
        });
      }
    }

    return result;
  }, [menuSections, recipes, storedRecipes]);

  const allItems = menuSections.flatMap((section) => section.items);
  const totalItems = allItems.length;
  const costedItems = allItems.filter((item) => itemCosts.get(item.name)?.status === "Costed").length;
  const costedWithFoodCost = allItems
    .map((item) => itemCosts.get(item.name)?.foodCostPercent ?? null)
    .filter((value): value is number => value !== null);
  const averageFoodCost = costedWithFoodCost.length
    ? costedWithFoodCost.reduce((sum, value) => sum + value, 0) / costedWithFoodCost.length
    : null;
  const aboveTarget = costedWithFoodCost.filter((value) => value > 30).length;
  const hasMenu = totalItems > 0;

  return (
    <div className="menu-page page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Menu costing</p>
          <h1>Menu</h1>
          <p className="page-description">
            {hasMenu
              ? "Selling prices are connected to saved menu recipes and invoice-derived ingredient costs."
              : `${activeWorkspace?.organisationName ?? "This restaurant"} has a clean menu workspace with no dishes yet.`}
          </p>
        </div>
        <Link className="primary-button" href="/recipes">Recipes</Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Menu items</p>
          <p className="stat-value">{totalItems}</p>
          <p className="stat-change neutral">{hasMenu ? "Current live menu" : "No menu loaded"}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Recipes costed</p>
          <p className="stat-value">{loading ? "—" : costedItems}</p>
          <p className="stat-change warning">
            {hasMenu ? `${totalItems - costedItems} still incomplete` : "Starts clean"}
          </p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Average food cost</p>
          <p className="stat-value">{averageFoodCost === null ? "—" : `${averageFoodCost.toFixed(1)}%`}</p>
          <p className="stat-change neutral">Across fully costed dishes</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Above target</p>
          <p className="stat-value">{averageFoodCost === null ? "—" : aboveTarget}</p>
          <p className="stat-change neutral">Items above 30% food cost</p>
        </article>
      </section>

      <section className="menu-section-stack">
        {!hasMenu ? (
          <article className="panel menu-section-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Clean workspace</p>
                <h2>No menu items yet</h2>
                <p>
                  Add the Beaufort House menu here when it is ready. Azteca dishes remain only in the Azteca workspace.
                </p>
              </div>
            </div>
          </article>
        ) : (
          menuSections.map((section) => (
            <article className="panel menu-section-panel" key={section.name}>
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Menu section</p>
                  <h2>{section.name}</h2>
                </div>
                <span className="menu-section-count">{section.items.length} items</span>
              </div>

              <div className="table-wrapper">
                <table className="menu-costing-table">
                  <thead>
                    <tr>
                      <th>Dish</th>
                      <th>Selling price</th>
                      <th>Recipe cost</th>
                      <th>Food cost</th>
                      <th>GP</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => {
                      const cost = itemCosts.get(item.name)!;
                      return (
                        <tr key={item.name}>
                          <td className="menu-dish-cell">
                            <div className="menu-dish-title-row">
                              {cost.recipe ? (
                                <Link href={`/recipes/${recipeSlug(cost.recipe.name)}`}>
                                  <strong>{item.name}</strong>
                                </Link>
                              ) : (
                                <strong>{item.name}</strong>
                              )}
                              {item.dietary && <span className="menu-dietary-badge">{item.dietary}</span>}
                            </div>
                            {item.description && <p>{item.description}</p>}
                          </td>
                          <td><strong className="menu-selling-price">{formatMoney(item.price)}</strong></td>
                          <td>{formatMoney(cost.recipeCost)}</td>
                          <td>{cost.foodCostPercent === null ? "—" : `${cost.foodCostPercent.toFixed(1)}%`}</td>
                          <td>{cost.gpPercent === null ? "—" : `${cost.gpPercent.toFixed(1)}%`}</td>
                          <td>
                            <span className={`menu-status-badge ${cost.status === "Costed" ? "menu-status-costed" : "menu-status-needed"}`}>
                              {cost.status === "Incomplete" && cost.missingLineCount > 0
                                ? `${cost.missingLineCount} prices missing`
                                : cost.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
