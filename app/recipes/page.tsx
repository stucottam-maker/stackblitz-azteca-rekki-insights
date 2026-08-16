"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";
import {
  recipes,
  recipeSlug,
  type Recipe,
  type RecipeIngredient,
} from "../data/recipes";
type IngredientPrice = {
  price?: number;
  unit?: string;
  supplier?: string;
  product?: string;
  updatedAt?: string;
};

type IngredientPrices = Record<string, IngredientPrice>;

type RecipeTab =
  | "yield"
  | "conversions"
  | "procedure"
  | "used-in"
  | "allergens";

type EditableIngredient = RecipeIngredient & {
  grossQuantity?: number | null;
  wastePercent?: number | null;
  type?: "Inventory item" | "Sub-recipe";
};

const ALLERGENS = [
  "Gluten",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Peanuts",
  "Soybeans",
  "Milk",
  "Nuts",
  "Celery",
  "Mustard",
  "Sesame",
  "Sulphites",
  "Lupin",
  "Molluscs",
];

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normaliseUnit(unit?: string) {
  return (unit ?? "").trim().toLowerCase();
}

function convertQuantityToPriceUnit(
  quantity: number,
  recipeUnit: string,
  priceUnit: string
) {
  const from = normaliseUnit(recipeUnit);
  const to = normaliseUnit(priceUnit);

  if (from === to) return quantity;

  if (from === "g" && to === "kg") return quantity / 1000;
  if (from === "kg" && to === "g") return quantity * 1000;

  if (from === "ml" && to === "l") return quantity / 1000;
  if (from === "l" && to === "ml") return quantity * 1000;

  return quantity;
}

function formatMoney(value: number | null) {
  if (value === null || Number.isNaN(value)) return "—";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function findSubRecipe(name: string) {
  return recipes.find(
    (recipe) =>
      recipe.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
}

function getRecipeStoredKey(slug: string) {
  return `recipe:${slug}`;
}

export default function RecipeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const baseRecipe = useMemo(
    () => recipes.find((recipe) => recipeSlug(recipe.name) === slug),
    [slug]
  );

  const [activeTab, setActiveTab] = useState<RecipeTab>("yield");
  const [recipe, setRecipe] = useState<Recipe | null>(baseRecipe ?? null);

  const [ingredients, setIngredients] = useState<EditableIngredient[]>([]);
  const [ingredientPrices, setIngredientPrices] =
    useState<IngredientPrices>({});

  const [yieldAmount, setYieldAmount] = useState<number | null>(
    baseRecipe?.yieldAmount ?? null
  );

  const [yieldUnit, setYieldUnit] = useState(baseRecipe?.yieldUnit ?? "");
  const [notes, setNotes] = useState(baseRecipe?.notes ?? "");
  const [procedure, setProcedure] = useState("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (!baseRecipe) return;

    const savedRecipe = safeParse<{
      recipe?: Recipe;
      ingredients?: EditableIngredient[];
      yieldAmount?: number | null;
      yieldUnit?: string;
      notes?: string;
      procedure?: string;
      allergens?: string[];
    } | null>(localStorage.getItem(getRecipeStoredKey(slug)), null);

    const startingRecipe = savedRecipe?.recipe ?? baseRecipe;

    const startingIngredients =
      savedRecipe?.ingredients ??
      startingRecipe.ingredients.map((ingredient) => ({
        ...ingredient,
        grossQuantity: ingredient.quantity,
        wastePercent: 0,
        type: findSubRecipe(ingredient.name)
          ? "Sub-recipe"
          : "Inventory item",
      }));

    setRecipe(startingRecipe);
    setIngredients(startingIngredients);
    setYieldAmount(savedRecipe?.yieldAmount ?? startingRecipe.yieldAmount ?? null);
    setYieldUnit(savedRecipe?.yieldUnit ?? startingRecipe.yieldUnit ?? "");
    setNotes(savedRecipe?.notes ?? startingRecipe.notes ?? "");
    setProcedure(savedRecipe?.procedure ?? "");
    setAllergens(savedRecipe?.allergens ?? []);

    setIngredientPrices(
      safeParse<IngredientPrices>(
        localStorage.getItem("ingredientPrices"),
        {}
      )
    );
  }, [baseRecipe, slug]);

  const lineCosts = useMemo(() => {
    return ingredients.map((ingredient) => {
      const quantity = Number(ingredient.quantity ?? 0);

      if (!quantity || quantity <= 0) {
        return {
          name: ingredient.name,
          cost: null,
          source: null,
        };
      }

      if (ingredient.type === "Sub-recipe") {
        const subRecipe = findSubRecipe(ingredient.name);

        if (!subRecipe) {
          return {
            name: ingredient.name,
            cost: null,
            source: "Missing sub-recipe",
          };
        }

        const subRecipeKey = getRecipeStoredKey(recipeSlug(subRecipe.name));

        const storedSubRecipe = safeParse<{
          summary?: {
            totalCost?: number | null;
            costPerYieldUnit?: number | null;
          };
          yieldAmount?: number | null;
          yieldUnit?: string;
        } | null>(localStorage.getItem(subRecipeKey), null);

        const costPerYieldUnit =
          storedSubRecipe?.summary?.costPerYieldUnit ?? null;

        if (costPerYieldUnit === null) {
          return {
            name: ingredient.name,
            cost: null,
            source: "Sub-recipe not costed",
          };
        }

        return {
          name: ingredient.name,
          cost: quantity * costPerYieldUnit,
          source: "Sub-recipe",
        };
      }

      const match =
        ingredientPrices[ingredient.name] ??
        ingredientPrices[
          Object.keys(ingredientPrices).find(
            (key) =>
              key.trim().toLowerCase() ===
              ingredient.name.trim().toLowerCase()
          ) ?? ""
        ];

      if (!match?.price) {
        return {
          name: ingredient.name,
          cost: null,
          source: "Missing price",
        };
      }

      const quantityInPriceUnit = convertQuantityToPriceUnit(
        quantity,
        ingredient.unit,
        match.unit ?? ingredient.unit
      );

      return {
        name: ingredient.name,
        cost: quantityInPriceUnit * match.price,
        source: match.supplier ?? "Ingredient price",
      };
    });
  }, [ingredients, ingredientPrices]);

  const totalCost = useMemo(() => {
    const validCosts = lineCosts
      .map((line) => line.cost)
      .filter((value): value is number => value !== null);

    if (validCosts.length === 0) return null;

    return validCosts.reduce((sum, cost) => sum + cost, 0);
  }, [lineCosts]);

  const costPerYieldUnit = useMemo(() => {
    if (
      totalCost === null ||
      yieldAmount === null ||
      !Number.isFinite(yieldAmount) ||
      yieldAmount <= 0
    ) {
      return null;
    }

    return totalCost / yieldAmount;
  }, [totalCost, yieldAmount]);

  const pricedLineCount = lineCosts.filter(
    (line) => line.cost !== null
  ).length;

  const missingLineCount = ingredients.length - pricedLineCount;

  const usedInRecipes = useMemo(() => {
    if (!recipe) return [];

    return recipes.filter((candidate) =>
      candidate.ingredients.some(
        (ingredient) =>
          ingredient.name.trim().toLowerCase() ===
          recipe.name.trim().toLowerCase()
      )
    );
  }, [recipe]);

  function updateIngredient(
    index: number,
    field: keyof EditableIngredient,
    value: string
  ) {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) => {
        if (ingredientIndex !== index) return ingredient;

        if (
          field === "quantity" ||
          field === "grossQuantity" ||
          field === "wastePercent"
        ) {
          return {
            ...ingredient,
            [field]: value === "" ? null : Number(value),
          };
        }

        return {
          ...ingredient,
          [field]: value,
        };
      })
    );
  }

  function addIngredient() {
    setIngredients((current) => [
      ...current,
      {
        name: "",
        quantity: null,
        grossQuantity: null,
        wastePercent: 0,
        unit: "g",
        type: "Inventory item",
      },
    ]);
  }

  function removeIngredient(index: number) {
    setIngredients((current) =>
      current.filter((_, ingredientIndex) => ingredientIndex !== index)
    );
  }

  function toggleAllergen(allergen: string) {
    setAllergens((current) =>
      current.includes(allergen)
        ? current.filter((item) => item !== allergen)
        : [...current, allergen]
    );
  }

  function saveRecipe() {
    if (!recipe) return;

    const updatedRecipe: Recipe = {
      ...recipe,
      yieldAmount,
      yieldUnit,
      notes,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    };

    const payload = {
      recipe: updatedRecipe,
      ingredients,
      yieldAmount,
      yieldUnit,
      notes,
      procedure,
      allergens,
      summary: {
        totalCost,
        costPerYieldUnit,
        pricedLineCount,
        missingLineCount,
      },
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(getRecipeStoredKey(slug), JSON.stringify(payload));

    setRecipe(updatedRecipe);

    const storedSummaries = safeParse<
      {
        name: string;
        totalCost: number | null;
        foodCostPercent: number | null;
        sellingPrice: number | null;
        targetFoodCostPercent?: number | null;
      }[]
    >(localStorage.getItem("recipeCostSummaries"), []);

    const existingIndex = storedSummaries.findIndex(
      (item) => item.name === updatedRecipe.name
    );

    const nextSummary = {
      name: updatedRecipe.name,
      totalCost,
      foodCostPercent: null,
      sellingPrice: null,
      targetFoodCostPercent: 30,
    };

    if (existingIndex >= 0) {
      storedSummaries[existingIndex] = nextSummary;
    } else {
      storedSummaries.push(nextSummary);
    }

    localStorage.setItem(
      "recipeCostSummaries",
      JSON.stringify(storedSummaries)
    );

    setSavedMessage("Saved");
    window.setTimeout(() => setSavedMessage(""), 1800);
  }

  if (!baseRecipe || !recipe) {
    return (
      <div className="app-shell">
        <Sidebar active="recipes" />

        <main className="main-content recipe-editor-page">
          <Link href="/recipes" className="back-link">
            ← Back to recipes
          </Link>

          <section className="panel">
            <h1>Recipe not found</h1>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar active="recipes" />

      <main className="main-content recipe-editor-page">
        <div className="recipe-editor-topbar">
          <div>
            <Link href="/recipes" className="back-link">
              ← Recipes
            </Link>

            <p className="page-eyebrow">Recipe costing</p>

            <input
              className="recipe-editor-title-input"
              value={recipe.name}
              onChange={(event) =>
                setRecipe((current) =>
                  current
                    ? {
                        ...current,
                        name: event.target.value,
                      }
                    : current
                )
              }
            />

            <div className="recipe-editor-meta">
              <span>{recipe.type}</span>

              {recipe.linkedMenuItem && (
                <span>Used in {recipe.linkedMenuItem}</span>
              )}
            </div>
          </div>

          <div className="recipe-editor-actions">
            {savedMessage && (
              <span className="recipe-save-message">{savedMessage}</span>
            )}

            <button
              type="button"
              className="primary-button"
              onClick={saveRecipe}
            >
              Save recipe
            </button>
          </div>
        </div>

        <section className="recipe-editor-summary">
          <div className="recipe-editor-summary-item">
            <span>Batch cost</span>
            <strong>{formatMoney(totalCost)}</strong>
          </div>

          <div className="recipe-editor-summary-item">
            <span>Yield</span>
            <strong>
              {yieldAmount ?? "—"} {yieldUnit}
            </strong>
          </div>

          <div className="recipe-editor-summary-item">
            <span>Cost / {yieldUnit || "yield unit"}</span>
            <strong>{formatMoney(costPerYieldUnit)}</strong>
          </div>

          <div className="recipe-editor-summary-item">
            <span>Cost coverage</span>
            <strong>
              {pricedLineCount}/{ingredients.length}
            </strong>

            <small>
              {missingLineCount === 0
                ? "All lines priced"
                : `${missingLineCount} missing`}
            </small>
          </div>
        </section>

        <nav className="recipe-editor-tabs">
          {[
            ["yield", "Recipe & Yield"],
            ["conversions", "Conversions / Inventory"],
            ["procedure", "Procedure"],
            ["used-in", "Used In"],
            ["allergens", "Allergens"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`recipe-editor-tab ${
                activeTab === value ? "recipe-editor-tab-active" : ""
              }`}
              onClick={() => setActiveTab(value as RecipeTab)}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "yield" && (
          <>
            <section className="recipe-yield-panel">
              <div>
                <label>Yield quantity</label>

                <input
                  type="number"
                  step="0.01"
                  value={yieldAmount ?? ""}
                  onChange={(event) =>
                    setYieldAmount(
                      event.target.value === ""
                        ? null
                        : Number(event.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label>Yield unit</label>

                <select
                  value={yieldUnit}
                  onChange={(event) => setYieldUnit(event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="portion">portion</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                  <option value="each">each</option>
                  <option value="batch">batch</option>
                </select>
              </div>

              <div className="recipe-yield-cost">
                <span>Calculated cost</span>
                <strong>{formatMoney(totalCost)}</strong>
              </div>
            </section>

            <section className="recipe-editor-table-card">
              <div className="recipe-editor-table-header">
                <div>
                  <p className="page-eyebrow">Recipe</p>
                  <h2>Ingredients</h2>
                </div>

                <button
                  type="button"
                  className="secondary-inline-button"
                  onClick={addIngredient}
                >
                  + Add ingredient
                </button>
              </div>

              <div className="recipe-editor-table-wrap">
                <table className="recipe-marketman-table">
                  <thead>
                    <tr>
                      <th>Item name</th>
                      <th>Type</th>
                      <th>Net quantity</th>
                      <th>Gross quantity</th>
                      <th>Unit</th>
                      <th>Cost</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {ingredients.map((ingredient, index) => {
                      const lineCost = lineCosts[index];

                      return (
                        <tr key={`${ingredient.name}-${index}`}>
                          <td className="recipe-name-column">
                            <input
                              value={ingredient.name}
                              onChange={(event) =>
                                updateIngredient(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <select
                              value={ingredient.type ?? "Inventory item"}
                              onChange={(event) =>
                                updateIngredient(
                                  index,
                                  "type",
                                  event.target.value
                                )
                              }
                            >
                              <option value="Inventory item">
                                Inventory item
                              </option>
                              <option value="Sub-recipe">
                                Sub-recipe
                              </option>
                            </select>
                          </td>

                          <td>
                            <input
                              type="number"
                              step="0.001"
                              value={ingredient.quantity ?? ""}
                              onChange={(event) =>
                                updateIngredient(
                                  index,
                                  "quantity",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              step="0.001"
                              value={ingredient.grossQuantity ?? ""}
                              onChange={(event) =>
                                updateIngredient(
                                  index,
                                  "grossQuantity",
                                  event.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <select
                              value={ingredient.unit}
                              onChange={(event) =>
                                updateIngredient(
                                  index,
                                  "unit",
                                  event.target.value
                                )
                              }
                            >
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="ml">ml</option>
                              <option value="L">L</option>
                              <option value="each">each</option>
                              <option value="tbsp">tbsp</option>
                              <option value="tsp">tsp</option>
                              <option value="head">head</option>
                              <option value="bunch">bunch</option>
                            </select>
                          </td>

                          <td className="recipe-cost-column">
                            <strong>{formatMoney(lineCost.cost)}</strong>
                            <span>{lineCost.source ?? ""}</span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="remove-recipe-line"
                              onClick={() => removeIngredient(index)}
                              aria-label="Remove ingredient"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="recipe-notes-panel panel">
              <div className="panel-header">
                <div>
                  <p className="page-eyebrow">Notes</p>
                  <h2>Recipe notes</h2>
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Service notes, storage, prep details..."
              />
            </section>
          </>
        )}

        {activeTab === "conversions" && (
          <section className="recipe-editor-table-card">
            <div className="recipe-editor-table-header">
              <div>
                <p className="page-eyebrow">Inventory</p>
                <h2>Recipe conversions</h2>
              </div>
            </div>

            <div className="recipe-editor-table-wrap">
              <table className="recipe-marketman-table">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Gross qty</th>
                    <th>Net qty</th>
                    <th>Waste %</th>
                    <th>Unit</th>
                  </tr>
                </thead>

                <tbody>
                  {ingredients.map((ingredient, index) => {
                    const gross = Number(ingredient.grossQuantity ?? 0);
                    const net = Number(ingredient.quantity ?? 0);

                    const calculatedWaste =
                      gross > 0 && net >= 0
                        ? Math.max(0, ((gross - net) / gross) * 100)
                        : 0;

                    return (
                      <tr key={`${ingredient.name}-conversion-${index}`}>
                        <td>
                          <strong>{ingredient.name || "Unnamed item"}</strong>
                        </td>

                        <td>
                          <input
                            type="number"
                            step="0.001"
                            value={ingredient.grossQuantity ?? ""}
                            onChange={(event) =>
                              updateIngredient(
                                index,
                                "grossQuantity",
                                event.target.value
                              )
                            }
                          />
                        </td>

                        <td>{ingredient.quantity ?? "—"}</td>

                        <td>{calculatedWaste.toFixed(1)}%</td>

                        <td>{ingredient.unit}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "procedure" && (
          <section className="recipe-procedure-card">
            <div className="recipe-editor-table-header">
              <div>
                <p className="page-eyebrow">Method</p>
                <h2>Procedure</h2>
              </div>
            </div>

            <textarea
              className="recipe-procedure-textarea"
              value={procedure}
              onChange={(event) => setProcedure(event.target.value)}
              placeholder="Add the preparation method here..."
            />
          </section>
        )}

        {activeTab === "used-in" && (
          <section className="recipe-used-in-card">
            <div className="recipe-editor-table-header">
              <div>
                <p className="page-eyebrow">Usage</p>
                <h2>Recipes using this item</h2>
              </div>
            </div>

            {usedInRecipes.length === 0 ? (
              <div className="recipe-empty-state">
                <p>
                  This recipe is not currently used as a sub-recipe elsewhere.
                </p>
              </div>
            ) : (
              <div className="recipe-used-in-list">
                {usedInRecipes.map((usedIn) => (
                  <Link
                    href={`/recipes/${recipeSlug(usedIn.name)}`}
                    key={usedIn.name}
                    className="recipe-used-in-row"
                  >
                    <div>
                      <strong>{usedIn.name}</strong>
                      <span>{usedIn.type}</span>
                    </div>

                    <span>→</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "allergens" && (
          <section className="recipe-allergens-card">
            <div className="recipe-editor-table-header">
              <div>
                <p className="page-eyebrow">Safety</p>
                <h2>Allergens</h2>
              </div>
            </div>

            <div className="recipe-allergen-grid">
              {ALLERGENS.map((allergen) => {
                const checked = allergens.includes(allergen);

                return (
                  <button
                    type="button"
                    key={allergen}
                    className={`recipe-allergen-option ${
                      checked ? "recipe-allergen-option-active" : ""
                    }`}
                    onClick={() => toggleAllergen(allergen)}
                  >
                    <span className="recipe-allergen-check">
                      {checked ? "✓" : ""}
                    </span>

                    <strong>{allergen}</strong>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
