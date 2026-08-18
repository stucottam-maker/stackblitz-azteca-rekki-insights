"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  recipes,
  recipeSlug,
  type Recipe,
} from "../data/allRecipes";
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

type RecipeView = {
  recipe: Recipe;
  yieldAmount: number | null;
  yieldUnit: string;
  totalCost: number | null;
  costPerYieldUnit: number | null;
  missingLineCount: number;
};

function money(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function RecipeRow({ view }: { view: RecipeView }) {
  const { recipe } = view;
  const hasYield = view.yieldAmount !== null && view.yieldAmount > 0;
  const fullyCosted = view.totalCost !== null && view.missingLineCount === 0;
  const previewIngredients = recipe.ingredients.slice(0, 3);
  const remainingIngredients = Math.max(recipe.ingredients.length - previewIngredients.length, 0);

  return (
    <Link href={`/recipes/${recipeSlug(recipe.name)}`} className="recipe-overview-row">
      <div className="recipe-overview-main">
        <div className="recipe-overview-title-row">
          <strong>{recipe.name}</strong>
          <span className={`recipe-type-badge ${recipe.type === "Prep" ? "recipe-type-prep" : "recipe-type-menu"}`}>
            {recipe.type}
          </span>
        </div>

        <p className="recipe-overview-subtitle">
          {recipe.linkedMenuItem
            ? `Used in ${recipe.linkedMenuItem}`
            : `${recipe.ingredients.length} ingredients`}
        </p>

        <div className="recipe-overview-ingredients">
          {previewIngredients.map((ingredient) => (
            <span key={ingredient.name}>{ingredient.name}</span>
          ))}
          {remainingIngredients > 0 && <span>+{remainingIngredients}</span>}
        </div>
      </div>

      <div className="recipe-overview-right">
        <div className="recipe-overview-yield">
          <span>Yield</span>
          <strong>{hasYield ? `${view.yieldAmount} ${view.yieldUnit}` : "Not set"}</strong>
        </div>
        <div className="recipe-overview-yield">
          <span>Batch cost</span>
          <strong>{money(view.totalCost)}</strong>
        </div>
        <span
          className={`recipe-overview-status ${
            fullyCosted && hasYield
              ? "recipe-overview-status-ready"
              : "recipe-overview-status-warning"
          }`}
        >
          {!hasYield
            ? "Yield needed"
            : view.missingLineCount > 0
            ? `${view.missingLineCount} price${view.missingLineCount === 1 ? "" : "s"} missing`
            : fullyCosted
            ? "Costed"
            : "Save to cost"}
        </span>
        <span className="recipe-overview-arrow">→</span>
      </div>
    </Link>
  );
}

export default function RecipesPage() {
  const [stored, setStored] = useState<Record<string, StoredRecipePayload>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keys = recipes.map((recipe) => `recipe:${recipeSlug(recipe.name)}`);
    readWorkspaceStates(keys)
      .then((state) => {
        setStored(
          Object.fromEntries(
            keys.flatMap((key) => {
              const value = state.get(key) as StoredRecipePayload | undefined;
              return value ? [[key, value]] : [];
            })
          )
        );
      })
      .catch((error) => console.error("Recipes cloud load failed", error))
      .finally(() => setLoading(false));
  }, []);

  const views = useMemo<RecipeView[]>(() => {
    return recipes.map((baseRecipe) => {
      const payload = stored[`recipe:${recipeSlug(baseRecipe.name)}`];
      const recipe = payload?.recipe ?? baseRecipe;
      return {
        recipe,
        yieldAmount: payload?.yieldAmount ?? recipe.yieldAmount ?? null,
        yieldUnit: payload?.yieldUnit ?? recipe.yieldUnit ?? "",
        totalCost: payload?.summary?.totalCost ?? null,
        costPerYieldUnit: payload?.summary?.costPerYieldUnit ?? null,
        missingLineCount: payload?.summary?.missingLineCount ?? recipe.ingredients.length,
      };
    });
  }, [stored]);

  const prepRecipes = views.filter((view) => view.recipe.type === "Prep");
  const menuRecipes = views.filter((view) => view.recipe.type === "Menu");
  const withYield = views.filter((view) => view.yieldAmount !== null && view.yieldAmount > 0).length;
  const fullyCosted = views.filter(
    (view) => view.totalCost !== null && view.missingLineCount === 0
  ).length;

  return (
    <div className="recipes-page page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Recipe costing</p>
          <h1>Recipes</h1>
          <p className="page-description">
            Build prep and menu recipes and calculate live costs from approved invoices.
          </p>
        </div>
        <Link href="/recipes/new" className="primary-button">+ Add recipe</Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Total recipes</p>
          <p className="stat-value">{recipes.length}</p>
          <p className="stat-change neutral">Prep and menu recipes</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Yields set</p>
          <p className="stat-value">{loading ? "—" : withYield}</p>
          <p className="stat-change neutral">Needed for portion costing</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Fully costed</p>
          <p className="stat-value">{loading ? "—" : fullyCosted}</p>
          <p className="stat-change neutral">No ingredient prices missing</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Needs attention</p>
          <p className="stat-value">{loading ? "—" : recipes.length - Math.min(withYield, fullyCosted)}</p>
          <p className="stat-change warning">Yield or pricing still incomplete</p>
        </article>
      </section>

      <section className="recipes-overview-grid">
        <article className="panel recipes-overview-panel">
          <div className="panel-header recipes-overview-header">
            <div>
              <p className="panel-kicker">Batch recipes</p>
              <h2>Prep recipes</h2>
              <p>Sauces, marinades, dressings and prep batches.</p>
            </div>
            <span className="recipes-section-count">{prepRecipes.length}</span>
          </div>
          <div className="recipes-overview-list">
            {prepRecipes.map((view) => <RecipeRow key={view.recipe.name} view={view} />)}
          </div>
        </article>

        <article className="panel recipes-overview-panel">
          <div className="panel-header recipes-overview-header">
            <div>
              <p className="panel-kicker">Menu dishes</p>
              <h2>Menu recipes</h2>
              <p>Finished dishes linked to selling prices and menu costing.</p>
            </div>
            <span className="recipes-section-count">{menuRecipes.length}</span>
          </div>
          <div className="recipes-overview-list">
            {menuRecipes.map((view) => <RecipeRow key={view.recipe.name} view={view} />)}
          </div>
        </article>
      </section>
    </div>
  );
}
