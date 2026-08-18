"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  recipes,
  recipeSlug,
  type Recipe,
  type RecipeIngredient,
} from "../../data/allRecipes";
import {
  persistWorkspaceState,
  readWorkspaceStates,
} from "../../lib/workspaceState";

type IngredientPrice = {
  price?: number;
  unit?: string;
  supplier?: string;
  product?: string;
  updatedAt?: string;
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  source?: string;
  conversionAssumption?: string;
};

type IngredientPrices = Record<string, IngredientPrice>;

type EditableIngredient = RecipeIngredient & {
  type?: "Inventory item" | "Sub-recipe";
};

type StoredRecipePayload = {
  recipe?: Recipe;
  ingredients?: EditableIngredient[];
  yieldAmount?: number | null;
  yieldUnit?: string;
  notes?: string;
  procedure?: string;
  allergens?: string[];
  summary?: {
    totalCost?: number | null;
    costPerYieldUnit?: number | null;
    pricedLineCount?: number;
    missingLineCount?: number;
  };
  updatedAt?: string;
};

type UnitFamily = "mass" | "volume" | "count" | "bunch" | "other";

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

function normalise(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

function recipeKey(name: string) {
  return `recipe:${recipeSlug(name)}`;
}

function unitFamily(unit?: string): UnitFamily {
  const value = normalise(unit);
  if (["g", "gram", "grams", "kg", "kilogram", "kilograms"].includes(value)) return "mass";
  if (["ml", "millilitre", "millilitres", "l", "ltr", "litre", "litres"].includes(value)) return "volume";
  if (["each", "ea", "unit", "units", "head", "heads", "can", "cans", "piece", "pieces", "portion", "portions", "unt"].includes(value)) return "count";
  if (["bunch", "bunches"].includes(value)) return "bunch";
  return "other";
}

function baseUnit(unit?: string) {
  const value = normalise(unit);
  if (["kg", "kilogram", "kilograms"].includes(value)) return "kg";
  if (["g", "gram", "grams"].includes(value)) return "g";
  if (["l", "ltr", "litre", "litres"].includes(value)) return "l";
  if (["ml", "millilitre", "millilitres"].includes(value)) return "ml";
  return value;
}

function convertQuantity(quantity: number, fromUnit: string, toUnit: string) {
  const from = baseUnit(fromUnit);
  const to = baseUnit(toUnit);
  const fromFamily = unitFamily(fromUnit);
  const toFamily = unitFamily(toUnit);

  if (!from || !to) return null;
  if (from === to) return quantity;
  if (fromFamily !== toFamily) return null;

  if (from === "g" && to === "kg") return quantity / 1000;
  if (from === "kg" && to === "g") return quantity * 1000;
  if (from === "ml" && to === "l") return quantity / 1000;
  if (from === "l" && to === "ml") return quantity * 1000;

  if (fromFamily === "count" || fromFamily === "bunch") return quantity;
  return null;
}

function findPrice(prices: IngredientPrices, ingredient: string) {
  const direct = prices[ingredient];
  if (direct) return direct;
  const key = Object.keys(prices).find(
    (candidate) => normalise(candidate) === normalise(ingredient)
  );
  return key ? prices[key] : undefined;
}

function findSubRecipe(name: string) {
  return recipes.find((recipe) => normalise(recipe.name) === normalise(name));
}

function money(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function RecipeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const baseRecipe = useMemo(
    () => recipes.find((recipe) => recipeSlug(recipe.name) === slug) ?? null,
    [slug]
  );

  const [recipe, setRecipe] = useState<Recipe | null>(baseRecipe);
  const [ingredients, setIngredients] = useState<EditableIngredient[]>([]);
  const [prices, setPrices] = useState<IngredientPrices>({});
  const [storedRecipes, setStoredRecipes] = useState<Record<string, StoredRecipePayload>>({});
  const [yieldAmount, setYieldAmount] = useState<number | null>(null);
  const [yieldUnit, setYieldUnit] = useState("");
  const [notes, setNotes] = useState("");
  const [procedure, setProcedure] = useState("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!baseRecipe) {
      setLoading(false);
      return;
    }

    const recipeKeys = recipes.map((item) => recipeKey(item.name));
    readWorkspaceStates(["ingredientPrices", ...recipeKeys])
      .then((state) => {
        const stored = (state.get(recipeKey(baseRecipe.name)) ?? null) as StoredRecipePayload | null;
        const startingRecipe = stored?.recipe ?? baseRecipe;
        const startingIngredients =
          stored?.ingredients ??
          startingRecipe.ingredients.map((ingredient) => ({
            ...ingredient,
            type: findSubRecipe(ingredient.name) ? "Sub-recipe" : "Inventory item",
          }));

        setRecipe(startingRecipe);
        setIngredients(startingIngredients);
        setYieldAmount(stored?.yieldAmount ?? startingRecipe.yieldAmount ?? null);
        setYieldUnit(stored?.yieldUnit ?? startingRecipe.yieldUnit ?? "");
        setNotes(stored?.notes ?? startingRecipe.notes ?? "");
        setProcedure(stored?.procedure ?? "");
        setAllergens(stored?.allergens ?? []);
        setPrices((state.get("ingredientPrices") ?? {}) as IngredientPrices);
        setStoredRecipes(
          Object.fromEntries(
            recipeKeys.flatMap((key) => {
              const value = state.get(key) as StoredRecipePayload | undefined;
              return value ? [[key, value]] : [];
            })
          )
        );
      })
      .catch((error) => setMessage(error?.message || "Could not load recipe"))
      .finally(() => setLoading(false));
  }, [baseRecipe]);

  const lineCosts = useMemo(() => {
    return ingredients.map((ingredient) => {
      const quantity = Number(ingredient.quantity ?? 0);
      if (!quantity || quantity <= 0) {
        return { cost: null as number | null, source: "Quantity needed", detail: "" };
      }

      const subRecipe = findSubRecipe(ingredient.name);
      if (ingredient.type === "Sub-recipe" || subRecipe) {
        if (!subRecipe) return { cost: null, source: "Sub-recipe missing", detail: "" };
        const stored = storedRecipes[recipeKey(subRecipe.name)];
        const unitCost = stored?.summary?.costPerYieldUnit ?? null;
        if (unitCost === null || !Number.isFinite(unitCost)) {
          return { cost: null, source: "Sub-recipe not costed", detail: "" };
        }
        return {
          cost: quantity * unitCost,
          source: "Sub-recipe",
          detail: `${money(unitCost)}/${stored?.yieldUnit ?? subRecipe.yieldUnit ?? "unit"}`,
        };
      }

      const price = findPrice(prices, ingredient.name);
      if (!price?.price || !Number.isFinite(price.price)) {
        return { cost: null, source: "Missing price", detail: "" };
      }

      const converted = convertQuantity(
        quantity,
        ingredient.unit,
        price.unit ?? ingredient.unit
      );
      if (converted === null) {
        return {
          cost: null,
          source: "Unit mismatch",
          detail: `${ingredient.unit} → ${price.unit ?? "unknown"}`,
        };
      }

      const audit = [
        price.supplier,
        price.product,
        price.invoiceNumber ? `invoice ${price.invoiceNumber}` : null,
        price.invoiceDate,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        cost: converted * price.price,
        source: price.supplier ?? "Invoice price",
        detail: audit,
      };
    });
  }, [ingredients, prices, storedRecipes]);

  const totalCost = useMemo(() => {
    if (!ingredients.length) return null;
    const valid = lineCosts.map((line) => line.cost).filter((cost): cost is number => cost !== null);
    return valid.length ? valid.reduce((sum, cost) => sum + cost, 0) : null;
  }, [ingredients.length, lineCosts]);

  const pricedLineCount = lineCosts.filter((line) => line.cost !== null).length;
  const missingLineCount = ingredients.length - pricedLineCount;
  const costPerYieldUnit =
    totalCost !== null && yieldAmount !== null && yieldAmount > 0
      ? totalCost / yieldAmount
      : null;

  const usedIn = useMemo(() => {
    if (!recipe) return [];
    return recipes.filter((candidate) =>
      candidate.ingredients.some(
        (ingredient) => normalise(ingredient.name) === normalise(recipe.name)
      )
    );
  }, [recipe]);

  function updateIngredient(index: number, field: keyof EditableIngredient, value: string) {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) =>
        ingredientIndex === index
          ? {
              ...ingredient,
              [field]: field === "quantity" ? (value === "" ? null : Number(value)) : value,
              ...(field === "name"
                ? { type: findSubRecipe(value) ? "Sub-recipe" : "Inventory item" }
                : {}),
            }
          : ingredient
      )
    );
  }

  function addIngredient() {
    setIngredients((current) => [
      ...current,
      { name: "", quantity: null, unit: "g", type: "Inventory item" },
    ]);
  }

  async function saveRecipe() {
    if (!recipe) return;

    const updatedRecipe: Recipe = {
      ...recipe,
      yieldAmount,
      yieldUnit,
      notes,
      ingredients: ingredients.map(({ name, quantity, unit }) => ({ name, quantity, unit })),
    };

    const payload: StoredRecipePayload = {
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

    try {
      await persistWorkspaceState(recipeKey(baseRecipe?.name ?? recipe.name), JSON.stringify(payload));
      setRecipe(updatedRecipe);
      setStoredRecipes((current) => ({
        ...current,
        [recipeKey(baseRecipe?.name ?? recipe.name)]: payload,
      }));
      setMessage("Recipe saved.");
    } catch (error: any) {
      setMessage(error?.message || "Could not save recipe");
    }
  }

  if (loading) return <div className="page"><div className="panel">Loading recipe…</div></div>;
  if (!baseRecipe || !recipe) {
    return (
      <div className="page">
        <Link href="/recipes" className="back-link">← Recipes</Link>
        <section className="panel"><h1>Recipe not found</h1></section>
      </div>
    );
  }

  return (
    <div className="page recipe-v2-page">
      <header className="topbar">
        <div>
          <Link href="/recipes" className="back-link">← Recipes</Link>
          <p className="eyebrow">Recipe costing</p>
          <input
            className="recipe-editor-title-input"
            value={recipe.name}
            onChange={(event) => setRecipe((current) => current ? { ...current, name: event.target.value } : current)}
          />
          <p className="page-description">
            {recipe.type} recipe{recipe.linkedMenuItem ? ` · linked to ${recipe.linkedMenuItem}` : ""}
          </p>
        </div>
        <button type="button" className="primary-button" onClick={() => void saveRecipe()}>
          Save recipe
        </button>
      </header>

      {message && <div className="notice">{message}</div>}

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Batch cost</p>
          <p className="stat-value">{money(totalCost)}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Cost per yield unit</p>
          <p className="stat-value">{money(costPerYieldUnit)}</p>
          <p className="stat-change neutral">{yieldUnit || "Set yield below"}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Priced lines</p>
          <p className="stat-value">{pricedLineCount}/{ingredients.length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Needs attention</p>
          <p className="stat-value">{missingLineCount}</p>
          <p className={`stat-change ${missingLineCount ? "warning" : "neutral"}`}>
            {missingLineCount ? "Quantity, price or unit issue" : "Fully costed"}
          </p>
        </article>
      </section>

      <section className="panel recipe-v2-yield">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Yield</p>
            <h2>Batch output</h2>
            <p>Use the actual finished yield after cooking/prep. Kitchen Insights will not guess reductions or trim loss.</p>
          </div>
        </div>
        <div className="recipe-v2-yield-fields">
          <label>
            <span>Yield amount</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={yieldAmount ?? ""}
              onChange={(event) => setYieldAmount(event.target.value === "" ? null : Number(event.target.value))}
            />
          </label>
          <label>
            <span>Yield unit</span>
            <input
              value={yieldUnit}
              placeholder="g, ml, portions…"
              onChange={(event) => setYieldUnit(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Costing</p>
            <h2>Ingredients</h2>
          </div>
          <button type="button" className="secondary-inline-button" onClick={addIngredient}>+ Add ingredient</button>
        </div>

        <div className="recipe-v2-lines">
          {ingredients.map((ingredient, index) => {
            const line = lineCosts[index];
            const price = findPrice(prices, ingredient.name);
            return (
              <div className="recipe-v2-line" key={`${index}-${ingredient.name}`}>
                <input
                  className="recipe-v2-name"
                  value={ingredient.name}
                  onChange={(event) => updateIngredient(index, "name", event.target.value)}
                  placeholder="Ingredient"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={ingredient.quantity ?? ""}
                  onChange={(event) => updateIngredient(index, "quantity", event.target.value)}
                  placeholder="Qty"
                />
                <input
                  value={ingredient.unit}
                  onChange={(event) => updateIngredient(index, "unit", event.target.value)}
                  placeholder="Unit"
                />
                <div className="recipe-v2-price-source">
                  <strong>{line.cost === null ? line.source : money(line.cost)}</strong>
                  <span>
                    {line.detail ||
                      (price?.price
                        ? `${money(price.price)}/${price.unit ?? ingredient.unit}`
                        : "No usable invoice price")}
                  </span>
                </div>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIngredients((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                  aria-label={`Remove ${ingredient.name || "ingredient"}`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="recipe-v2-bottom-grid">
        <article className="panel">
          <div className="panel-header"><div><p className="panel-kicker">Kitchen</p><h2>Method & notes</h2></div></div>
          <label className="recipe-v2-textarea">
            <span>Procedure</span>
            <textarea rows={8} value={procedure} onChange={(event) => setProcedure(event.target.value)} placeholder="Step-by-step method…" />
          </label>
          <label className="recipe-v2-textarea">
            <span>Notes</span>
            <textarea rows={5} value={notes} onChange={(event) => setNotes(event.target.value)} />
          </label>
        </article>

        <article className="panel">
          <div className="panel-header"><div><p className="panel-kicker">Food safety</p><h2>Allergens</h2></div></div>
          <div className="recipe-v2-allergens">
            {ALLERGENS.map((allergen) => (
              <label key={allergen}>
                <input
                  type="checkbox"
                  checked={allergens.includes(allergen)}
                  onChange={() =>
                    setAllergens((current) =>
                      current.includes(allergen)
                        ? current.filter((item) => item !== allergen)
                        : [...current, allergen]
                    )
                  }
                />
                {allergen}
              </label>
            ))}
          </div>

          <div className="recipe-v2-used-in">
            <strong>Used in</strong>
            {usedIn.length ? (
              usedIn.map((item) => (
                <Link key={item.name} href={`/recipes/${recipeSlug(item.name)}`}>{item.name}</Link>
              ))
            ) : (
              <span>No other recipes currently reference this recipe.</span>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
