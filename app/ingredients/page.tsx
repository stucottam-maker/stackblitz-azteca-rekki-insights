"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

type IngredientRelation =
  | {
      id: string;
      name: string;
      category: string | null;
      base_unit: string | null;
    }
  | {
      id: string;
      name: string;
      category: string | null;
      base_unit: string | null;
    }[]
  | null;

type SupplierRelation =
  | {
      id: string;
      name: string;
    }
  | {
      id: string;
      name: string;
    }[]
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

function relationFirst<T>(
  relation: T | T[] | null | undefined
): T | null {
  if (!relation) {
    return null;
  }

  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function money(value: number | null) {
  if (value === null) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function IngredientsPage() {
  const router = useRouter();

  const [ingredients, setIngredients] =
    useState<IngredientView[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const loadIngredients = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (
        userError ||
        !userData.user
      ) {
        router.replace("/login");
        return;
      }

      const {
        data: membership,
        error: membershipError,
      } = await supabase
        .from("organisation_members")
        .select("organisation_id")
        .eq("user_id", userData.user.id)
        .limit(1)
        .maybeSingle();

      if (
        membershipError ||
        !membership
      ) {
        throw new Error(
          "No organisation membership found for this user."
        );
      }

      const organisationId =
        membership.organisation_id;

      const {
        data: site,
        error: siteError,
      } = await supabase
        .from("sites")
        .select("id")
        .eq(
          "organisation_id",
          organisationId
        )
        .limit(1)
        .maybeSingle();

      if (
        siteError ||
        !site
      ) {
        throw new Error(
          "No site found for this organisation."
        );
      }

      const {
        data,
        error: ingredientError,
      } = await supabase
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
        .eq(
          "organisation_id",
          organisationId
        )
        .eq("site_id", site.id)
        .order("updated_at", {
          ascending: false,
        });

      if (ingredientError) {
        throw ingredientError;
      }

      const rows =
        (data ??
          []) as unknown as IngredientPriceRow[];

      const mapped = rows
        .map((row) => {
          const ingredient =
            relationFirst(row.ingredient);

          const supplier =
            relationFirst(row.supplier);

          if (!ingredient) {
            return null;
          }

          return {
            priceId: row.id,
            ingredientId: ingredient.id,

            name: ingredient.name,

            category:
              ingredient.category ||
              "Uncategorised",

            baseUnit:
              ingredient.base_unit || "",

            price: row.price,

            priceUnit:
              row.unit ||
              ingredient.base_unit ||
              "",

            supplier:
              supplier?.name ||
              "Unknown supplier",

            effectiveDate:
              row.effective_date || "",

            updatedAt:
              row.updated_at || "",
          };
        })
        .filter(
          (
            item
          ): item is IngredientView =>
            item !== null
        );

      mapped.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setIngredients(mapped);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load ingredients."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadIngredients();
  }, [loadIngredients]);

  const categories = useMemo(() => {
    const values =
      new Set<string>();

    ingredients.forEach(
      (ingredient) => {
        values.add(
          ingredient.category
        );
      }
    );

    return [
      "All",
      ...Array.from(values).sort(),
    ];
  }, [ingredients]);

  const filtered = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return ingredients.filter(
      (ingredient) => {
        const matchesSearch =
          !query ||
          ingredient.name
            .toLowerCase()
            .includes(query) ||
          ingredient.supplier
            .toLowerCase()
            .includes(query) ||
          ingredient.category
            .toLowerCase()
            .includes(query);

        const matchesCategory =
          categoryFilter === "All" ||
          ingredient.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }, [
    ingredients,
    search,
    categoryFilter,
  ]);

  const pricedCount =
    ingredients.filter(
      (ingredient) =>
        ingredient.price !== null
    ).length;

  const supplierCount =
    new Set(
      ingredients
        .map(
          (ingredient) =>
            ingredient.supplier
        )
        .filter(
          (supplier) =>
            supplier !==
            "Unknown supplier"
        )
    ).size;

  return (
    <div className="ingredients-page page">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Cost control
            </p>

            <h1>Ingredients</h1>

            <p className="page-description">
              Live ingredient pricing generated from
              approved supplier invoices.
            </p>
          </div>

          <button
            type="button"
            className="secondary-inline-button"
            onClick={() =>
              void loadIngredients()
            }
            disabled={loading}
          >
            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Ingredients
            </p>

            <p className="stat-value">
              {ingredients.length}
            </p>

            <p className="stat-change neutral">
              Shared database
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Current prices
            </p>

            <p className="stat-value">
              {pricedCount}
            </p>

            <p className="stat-change neutral">
              Invoice-derived
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Suppliers
            </p>

            <p className="stat-value">
              {supplierCount}
            </p>

            <p className="stat-change neutral">
              Supplying priced ingredients
            </p>
          </article>
        </section>

        <section className="panel ingredients-main-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Cost database
              </p>

              <h2>
                Ingredient prices
              </h2>
            </div>

            <span className="ingredients-result-count">
              {filtered.length}{" "}
              {filtered.length === 1
                ? "ingredient"
                : "ingredients"}
            </span>
          </div>

          <div className="ingredient-toolbar">
            <div className="ingredient-search">
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search ingredients, suppliers or categories..."
              />
            </div>

            <div className="ingredient-filter">
              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {error && (
            <div className="ingredients-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="ingredients-empty-state">
              <div className="ingredients-empty-icon">
                ↻
              </div>

              <h3>
                Loading ingredient prices
              </h3>

              <p>
                Fetching the latest pricing
                from the shared database.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="ingredients-empty-state">
              <div className="ingredients-empty-icon">
                ◇
              </div>

              <h3>
                No ingredients found
              </h3>

              <p>
                Try another search term or
                change the category filter.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="ingredients-table">
                <thead>
                  <tr>
                    <th>
                      Ingredient
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Supplier
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Unit
                    </th>

                    <th>
                      Effective
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map(
                    (ingredient) => (
                      <tr
                        key={
                          ingredient.priceId
                        }
                      >
                        <td className="ingredient-name-cell">
                          <strong>
                            {ingredient.name}
                          </strong>
                        </td>

                        <td>
                          <span className="ingredient-category-badge">
                            {
                              ingredient.category
                            }
                          </span>
                        </td>

                        <td>
                          {
                            ingredient.supplier
                          }
                        </td>

                        <td>
                          <strong className="ingredient-price-value">
                            {money(
                              ingredient.price
                            )}
                          </strong>
                        </td>

                        <td>
                          <span className="ingredient-unit">
                            {ingredient.priceUnit ||
                              ingredient.baseUnit ||
                              "—"}
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            ingredient.effectiveDate ||
                              ingredient.updatedAt
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="panel ingredients-info-panel">
          <div className="ingredients-info-icon">
            £
          </div>

          <div>
            <p className="panel-kicker">
              How pricing works
            </p>

            <h2>
              Invoice-driven costs
            </h2>

            <p>
              When an invoice is approved,
              Kitchen Insights updates the
              current ingredient price for this
              site while retaining previous
              pricing changes for historical
              reporting and cost analysis.
            </p>
          </div>
        </section>
    </div>
  );
}
