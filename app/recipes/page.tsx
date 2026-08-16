"use client";

import { useMemo } from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { recipes, recipeSlug } from "../data/recipes";

export default function RecipesPage() {
  const prepRecipes = useMemo(
    () => recipes.filter((recipe) => recipe.type === "Prep"),
    []
  );

  const menuRecipes = useMemo(
    () => recipes.filter((recipe) => recipe.type === "Menu"),
    []
  );

  return (
    <div className="app-shell">
      <Sidebar active="recipes" />

      <main className="main-content recipes-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">Recipe costing</p>
            <h1>Recipes</h1>
            <p className="page-description">
              Prep recipes and menu recipes used to calculate live dish costs.
            </p>
          </div>

          <Link href="/recipes/new" className="primary-button">
            + Add recipe
          </Link>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">Total recipes</p>
            <p className="stat-value">{recipes.length}</p>
            <p className="stat-change neutral">
              Prep and menu recipes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Prep recipes</p>
            <p className="stat-value">{prepRecipes.length}</p>
            <p className="stat-change neutral">
              Sauces, marinades and batches
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Menu recipes</p>
            <p className="stat-value">{menuRecipes.length}</p>
            <p className="stat-change neutral">
              Linked to menu dishes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Costed recipes</p>
            <p className="stat-value">0</p>
            <p className="stat-change warning">
              Ingredient prices needed
            </p>
          </article>
        </section>

        <section className="recipe-section-grid">
          <div className="panel recipe-list-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Batch recipes</p>
                <h2>Prep recipes</h2>
              </div>

              <span className="menu-section-count">
                {prepRecipes.length}
              </span>
            </div>

            <div className="recipe-card-list">
              {prepRecipes.map((recipe) => (
                <Link
                  key={recipe.name}
                  href={`/recipes/${recipeSlug(recipe.name)}`}
                  className="recipe-card recipe-card-link"
                >
                  <div className="recipe-card-top">
                    <div>
                      <p className="recipe-name">{recipe.name}</p>
                      <p className="muted-text">Prep recipe</p>
                    </div>

                    <span className="status-badge status-review">
                      {recipe.yieldAmount
                        ? `${recipe.yieldAmount} ${recipe.yieldUnit ?? ""}`
                        : "Yield needed"}
                    </span>
                  </div>

                  <div className="recipe-meta">
                    <span>{recipe.ingredients.length} ingredients</span>

                    <span>
                      Yield:{" "}
                      {recipe.yieldAmount
                        ? `${recipe.yieldAmount} ${recipe.yieldUnit ?? ""}`
                        : "needed"}
                    </span>
                  </div>

                  <div className="recipe-ingredients-preview">
                    {recipe.ingredients.slice(0, 4).map((ingredient) => (
                      <span key={ingredient.name}>
                        {ingredient.name}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel recipe-list-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Menu dishes</p>
                <h2>Menu recipes</h2>
              </div>

              <span className="menu-section-count">
                {menuRecipes.length}
              </span>
            </div>

            <div className="recipe-card-list">
              {menuRecipes.map((recipe) => (
                <Link
                  key={recipe.name}
                  href={`/recipes/${recipeSlug(recipe.name)}`}
                  className="recipe-card recipe-card-link"
                >
                  <div className="recipe-card-top">
                    <div>
                      <p className="recipe-name">{recipe.name}</p>

                      <p className="muted-text">
                        {recipe.linkedMenuItem
                          ? `Used in ${recipe.linkedMenuItem}`
                          : "Menu recipe"}
                      </p>
                    </div>

                    <span className="status-badge status-review">
                      Recipe incomplete
                    </span>
                  </div>

                  <div className="recipe-meta">
                    <span>{recipe.ingredients.length} ingredients</span>

                    <span>
                      Yield:{" "}
                      {recipe.yieldAmount
                        ? `${recipe.yieldAmount} ${recipe.yieldUnit ?? ""}`
                        : "needed"}
                    </span>
                  </div>

                  <div className="recipe-ingredients-preview">
                    {recipe.ingredients.slice(0, 4).map((ingredient) => (
                      <span key={ingredient.name}>
                        {ingredient.name}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
