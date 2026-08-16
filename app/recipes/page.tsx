"use client";

import Link from "next/link";

import Sidebar from "../components/Sidebar";
import {
  recipes,
  recipeSlug,
  type Recipe,
} from "../data/recipes";

function RecipeRow({
  recipe,
}: {
  recipe: Recipe;
}) {
  const hasYield =
    recipe.yieldAmount !== null &&
    recipe.yieldAmount !== undefined;

  const previewIngredients =
    recipe.ingredients.slice(0, 3);

  const remainingIngredients =
    Math.max(
      recipe.ingredients.length -
        previewIngredients.length,
      0
    );

  return (
    <Link
      href={`/recipes/${recipeSlug(
        recipe.name
      )}`}
      className="recipe-overview-row"
    >
      <div className="recipe-overview-main">
        <div className="recipe-overview-title-row">
          <strong>
            {recipe.name}
          </strong>

          {recipe.type === "Prep" ? (
            <span className="recipe-type-badge recipe-type-prep">
              Prep
            </span>
          ) : (
            <span className="recipe-type-badge recipe-type-menu">
              Menu
            </span>
          )}
        </div>

        <p className="recipe-overview-subtitle">
          {recipe.type === "Menu" &&
          recipe.linkedMenuItem
            ? `Used in ${recipe.linkedMenuItem}`
            : `${recipe.ingredients.length} ingredients`}
        </p>

        <div className="recipe-overview-ingredients">
          {previewIngredients.map(
            (ingredient) => (
              <span
                key={ingredient.name}
              >
                {ingredient.name}
              </span>
            )
          )}

          {remainingIngredients > 0 && (
            <span>
              +{remainingIngredients}
            </span>
          )}
        </div>
      </div>

      <div className="recipe-overview-right">
        <div className="recipe-overview-yield">
          <span>Yield</span>

          <strong>
            {hasYield
              ? `${recipe.yieldAmount} ${
                  recipe.yieldUnit ??
                  ""
                }`
              : "Not set"}
          </strong>
        </div>

        <span
          className={`recipe-overview-status ${
            hasYield
              ? "recipe-overview-status-ready"
              : "recipe-overview-status-warning"
          }`}
        >
          {hasYield
            ? "Recipe ready"
            : "Yield needed"}
        </span>

        <span className="recipe-overview-arrow">
          →
        </span>
      </div>
    </Link>
  );
}

export default function RecipesPage() {
  const prepRecipes =
    recipes.filter(
      (recipe) =>
        recipe.type === "Prep"
    );

  const menuRecipes =
    recipes.filter(
      (recipe) =>
        recipe.type === "Menu"
    );

  const recipesWithYield =
    recipes.filter(
      (recipe) =>
        recipe.yieldAmount !== null &&
        recipe.yieldAmount !==
          undefined
    ).length;

  const incompleteRecipes =
    recipes.length -
    recipesWithYield;

  return (
    <div className="app-shell">
      <Sidebar active="recipes" />

      <main className="main-content recipes-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Recipe costing
            </p>

            <h1>
              Recipes
            </h1>

            <p className="page-description">
              Build prep and menu
              recipes to calculate
              live dish costs from
              current ingredient
              prices.
            </p>
          </div>

          <Link
            href="/recipes/new"
            className="primary-button"
          >
            + Add recipe
          </Link>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Total recipes
            </p>

            <p className="stat-value">
              {recipes.length}
            </p>

            <p className="stat-change neutral">
              Prep and menu recipes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Prep recipes
            </p>

            <p className="stat-value">
              {prepRecipes.length}
            </p>

            <p className="stat-change neutral">
              Sauces, marinades and
              batches
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Menu recipes
            </p>

            <p className="stat-value">
              {menuRecipes.length}
            </p>

            <p className="stat-change neutral">
              Linked to menu dishes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Incomplete
            </p>

            <p className="stat-value">
              {incompleteRecipes}
            </p>

            <p
              className={`stat-change ${
                incompleteRecipes > 0
                  ? "warning"
                  : "neutral"
              }`}
            >
              {incompleteRecipes > 0
                ? "Recipes still need setup"
                : "All recipes configured"}
            </p>
          </article>
        </section>

        <section className="recipes-overview-grid">
          <article className="panel recipes-overview-panel">
            <div className="panel-header recipes-overview-header">
              <div>
                <p className="panel-kicker">
                  Batch recipes
                </p>

                <h2>
                  Prep recipes
                </h2>

                <p>
                  Sauces, marinades,
                  dressings and prep
                  batches.
                </p>
              </div>

              <span className="recipes-section-count">
                {prepRecipes.length}
              </span>
            </div>

            <div className="recipes-overview-list">
              {prepRecipes.map(
                (recipe) => (
                  <RecipeRow
                    key={recipe.name}
                    recipe={recipe}
                  />
                )
              )}
            </div>
          </article>

          <article className="panel recipes-overview-panel">
            <div className="panel-header recipes-overview-header">
              <div>
                <p className="panel-kicker">
                  Menu dishes
                </p>

                <h2>
                  Menu recipes
                </h2>

                <p>
                  Finished dishes linked
                  to selling prices and
                  menu costing.
                </p>
              </div>

              <span className="recipes-section-count">
                {menuRecipes.length}
              </span>
            </div>

            <div className="recipes-overview-list">
              {menuRecipes.map(
                (recipe) => (
                  <RecipeRow
                    key={recipe.name}
                    recipe={recipe}
                  />
                )
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
