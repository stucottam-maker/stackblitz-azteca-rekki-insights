"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { resolveActiveWorkspace } from "../lib/clientWorkspace";
import { supabase } from "../lib/supabase";

type IngredientRelation =
  | { id: string; name: string; category: string | null; base_unit: string | null }
  | { id: string; name: string; category: string | null; base_unit: string | null }[]
  | null;

type SupplierRelation =
  | { id: string; name: string }
  | { id: string; name: string }[]
  | null;

type IngredientPriceRow = {
  id: string;
  price: number | null;
  unit: string | null;
  effective_date: string | null;
  updated_at: string | null;
  ingredient: IngredientRelation;
  supplier: SupplierRelation;
};

type IngredientView = {
  priceId: string;
  ingredientId: string;
  name: string;
  category: string;
  baseUnit: string;
  price: number | null;
  priceUnit: string;
  supplier: string;
  effectiveDate: string;
  updatedAt: string;
};

const RAW_INVOICE_CATEGORY = "Invoice observed";
const HIDDEN_EXTRACTION_FRAGMENTS = new Set([
  ") s o",
  "24",
  "250g",
  "60x70gbridor pepperblack coarse ground",
  "avocado ready to eat rawfresh corn on cob case of",
  "coconut desiccated 1kg red lakeland unsaltedbutter",
  "ginger freshroot peachhalvesinsyrup2.65kg",
]);

const INGREDIENT_PRESENTATION: Record<string, { name: string; category?: string }> = {
  "500g flowersfresh-ediblepunnet": { name: "Fresh Edible Flowers (500g Punnet)" },
  "applecidervinegar5% beaufor": { name: "Beaufor Apple Cider Vinegar (5%)" },
  "applecidervinegar5%beaufor": { name: "Beaufor Apple Cider Vinegar (5%)" },
  "butternut squash(appr 1kg)": { name: "Butternut Squash (Approx. 1kg)", category: "Produce" },
  "cabbage-hispi": { name: "Hispi Cabbage" },
  "cabbage-redapprx2.5kg": { name: "Red Cabbage (Approx. 2.5kg)" },
  "chilli&garlicsaucelee kumkee": { name: "Lee Kum Kee Chilli & Garlic Sauce", category: "Dry goods" },
  "edamame(soya)beansin podyutaka": { name: "Yutaka Edamame Beans in Pod" },
  "edamamebeansshelled (withoutshell)soyayutaka": { name: "Yutaka Shelled Edamame Beans" },
  "f peeledkoffmanpotatoes (prepped)-orderby10pm": { name: "Peeled Koffmann Potatoes (Prepped)" },
  "fantaorangecans": { name: "Fanta Orange Cans" },
  "flour potato(starch)": { name: "Potato Flour (Starch)", category: "Dry goods" },
  "flourgram(chick pea flour)core": { name: "Gram Flour (Chickpea Flour)" },
  "flowersfresh-ediblepunnet": { name: "Fresh Edible Flowers (Punnet)" },
  "flowersfresh-ediblepunnet 30g": { name: "Fresh Edible Flowers (30g Punnet)" },
  "flowersfreshpansies6g": { name: "Fresh Pansies (6g)" },
  "garlic-peeled(1kg) 1peeled chippiespotato": { name: "Peeled Garlic (1kg)" },
  "garlic(200g)": { name: "Garlic (200g)" },
  "glovesbluevinylxlpwdfree x100": { name: "Blue Vinyl Gloves XL, Powder Free (100)" },
  "gratedwhitemildcheddar 2kg": { name: "Grated Mild White Cheddar (2kg)" },
};

function normaliseIngredientName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function isExtractionFragment(name: string) {
  return HIDDEN_EXTRACTION_FRAGMENTS.has(normaliseIngredientName(name));
}

function ingredientPresentation(name: string, category: string | null) {
  const override = INGREDIENT_PRESENTATION[normaliseIngredientName(name)];
  return {
    name: override?.name ?? name,
    category: override?.category ?? category ?? "Uncategorised",
  };
}

function formatUnit(value: string | null | undefined) {
  const unit = value?.trim().replace(/\.$/, "") ?? "";
  if (!unit) return "";

  const simpleUnits: Record<string, string> = {
    each: "each",
    unit: "unit",
    bunch: "bunch",
    case: "case",
    packet: "packet",
    punnet: "punnet",
    box: "box",
    bulk: "bulk",
  };
  const simple = simpleUnits[unit.toLowerCase()];
  if (simple) return simple;

  return unit.replace(/(\d(?:\.\d+)?)\s*(kg|g|ml|ltr|m)\b/gi, (_, amount, measure) =>
    `${amount}${String(measure).toLowerCase()}`
  );
}

function relationFirst<T>(relation: T | T[] | null | undefined): T | null {
  if (!relation) return null;
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function IngredientsPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<IngredientView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadIngredients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const workspace = await resolveActiveWorkspace();
      if (!workspace) {
        router.replace("/login");
        return;
      }

      const { data, error: ingredientError } = await supabase
        .from("ingredient_prices")
        .select(`
          id,
          price,
          unit,
          effective_date,
          updated_at,
          ingredient:ingredients (
            id,
            name,
            category,
            base_unit
          ),
          supplier:suppliers (
            id,
            name
          )
        `)
        .eq("organisation_id", workspace.organisationId)
        .eq("site_id", workspace.siteId)
        .order("updated_at", { ascending: false });

      if (ingredientError) throw ingredientError;

      const rows = (data ?? []) as unknown as IngredientPriceRow[];
      const mapped = rows.flatMap((row) => {
        const ingredient = relationFirst(row.ingredient);
        const supplier = relationFirst(row.supplier);

        if (!ingredient) return [];
        if (ingredient.category === RAW_INVOICE_CATEGORY) return [];
        if (isExtractionFragment(ingredient.name)) return [];

        const presentation = ingredientPresentation(ingredient.name, ingredient.category);

        return [{
          priceId: row.id,
          ingredientId: ingredient.id,
          name: presentation.name,
          category: presentation.category,
          baseUnit: formatUnit(ingredient.base_unit),
          price: row.price,
          priceUnit: formatUnit(row.unit || ingredient.base_unit),
          supplier: supplier?.name || "Unknown supplier",
          effectiveDate: row.effective_date || "",
          updatedAt: row.updated_at || "",
        } satisfies IngredientView];
      });

      mapped.sort((a, b) => a.name.localeCompare(b.name));
      setIngredients(mapped);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to load ingredients.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadIngredients();
  }, [loadIngredients]);

  const categories = useMemo(() => {
    const values = new Set(ingredients.map((ingredient) => ingredient.category));
    return ["All", ...Array.from(values).sort()];
  }, [ingredients]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ingredients.filter((ingredient) => {
      const matchesSearch =
        !query ||
        ingredient.name.toLowerCase().includes(query) ||
        ingredient.supplier.toLowerCase().includes(query) ||
        ingredient.category.toLowerCase().includes(query);
      const matchesCategory =
        categoryFilter === "All" || ingredient.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [ingredients, search, categoryFilter]);

  const pricedCount = ingredients.filter((ingredient) => ingredient.price !== null).length;
  const supplierCount = new Set(
    ingredients
      .map((ingredient) => ingredient.supplier)
      .filter((supplier) => supplier !== "Unknown supplier")
  ).size;

  return (
    <div className="ingredients-page page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cost control</p>
          <h1>Ingredients</h1>
          <p className="page-description">
            Matched ingredient pricing from approved supplier invoices. Raw invoice descriptions stay in Catalogue and Matching until they are confirmed.
          </p>
        </div>
        <button
          type="button"
          className="secondary-inline-button"
          onClick={() => void loadIngredients()}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Ingredients</p>
          <p className="stat-value">{ingredients.length}</p>
          <p className="stat-change neutral">Matched master data</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Current prices</p>
          <p className="stat-value">{pricedCount}</p>
          <p className="stat-change neutral">Invoice-derived</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Suppliers</p>
          <p className="stat-value">{supplierCount}</p>
          <p className="stat-change neutral">Supplying matched ingredients</p>
        </article>
      </section>

      <section className="panel ingredients-main-panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Cost database</p>
            <h2>Ingredient prices</h2>
          </div>
          <span className="ingredients-result-count">
            {filtered.length} {filtered.length === 1 ? "ingredient" : "ingredients"}
          </span>
        </div>

        <div className="ingredient-toolbar">
          <div className="ingredient-search">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search ingredients, suppliers or categories..."
            />
          </div>
          <div className="ingredient-filter">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="ingredients-error">{error}</div>}

        {loading ? (
          <div className="ingredients-empty-state">
            <div className="ingredients-empty-icon">↻</div>
            <h3>Loading ingredient prices</h3>
            <p>Fetching the latest matched pricing from the selected restaurant.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ingredients-empty-state">
            <div className="ingredients-empty-icon">◇</div>
            <h3>No ingredients found</h3>
            <p>Try another search term or change the category filter.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="ingredients-table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Effective</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ingredient) => (
                  <tr key={ingredient.priceId}>
                    <td className="ingredient-name-cell"><strong>{ingredient.name}</strong></td>
                    <td><span className="ingredient-category-badge">{ingredient.category}</span></td>
                    <td>{ingredient.supplier}</td>
                    <td><strong className="ingredient-price-value">{money(ingredient.price)}</strong></td>
                    <td><span className="ingredient-unit">{ingredient.priceUnit || ingredient.baseUnit || "—"}</span></td>
                    <td>{formatDate(ingredient.effectiveDate || ingredient.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel ingredients-info-panel">
        <div className="ingredients-info-icon">£</div>
        <div>
          <p className="panel-kicker">How pricing works</p>
          <h2>Matched invoice costs</h2>
          <p>
            Approved invoices can update prices for confirmed ingredients. Unmatched supplier descriptions remain in the catalogue and matching workflow instead of becoming new ingredient names automatically.
          </p>
        </div>
      </section>
    </div>
  );
}
