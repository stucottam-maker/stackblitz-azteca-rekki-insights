"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
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

  ingredient:
    IngredientRelation;

  supplier:
    SupplierRelation;
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
  relation:
    | T
    | T[]
    | null
    | undefined
): T | null {
  if (!relation) {
    return null;
  }

  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function money(
  value: number | null
) {
  if (value === null) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }
  ).format(value);
}

function formatDate(
  value: string
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

export default function IngredientsPage() {
  const router = useRouter();

  const [
    ingredients,
    setIngredients,
  ] =
    useState<IngredientView[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All");

  async function loadIngredients() {
    setLoading(true);
    setError("");

    try {
      const {
        data: userData,
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !userData.user
      ) {
        router.replace("/login");
        return;
      }

      const {
        data: membership,
        error:
          membershipError,
      } = await supabase
        .from(
          "organisation_members"
        )
        .select(
          "organisation_id"
        )
        .eq(
          "user_id",
          userData.user.id
        )
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
        error:
          ingredientError,
      } = await supabase
        .from(
          "ingredient_prices"
        )
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
        .eq(
          "site_id",
          site.id
        )
        .order(
          "updated_at",
          {
            ascending: false,
          }
        );

      if (ingredientError) {
        throw ingredientError;
      }

      const rows =
        (data ??
          []) as unknown as IngredientPriceRow[];

      const mapped =
        rows
          .map((row) => {
            const ingredient =
              relationFirst(
                row.ingredient
              );

            const supplier =
              relationFirst(
                row.supplier
              );

            if (!ingredient) {
              return null;
            }

            return {
              priceId: row.id,

              ingredientId:
                ingredient.id,

              name:
                ingredient.name,

              category:
                ingredient.category ||
                "Uncategorised",

              baseUnit:
                ingredient.base_unit ||
                "",

              price: row.price,

              priceUnit:
                row.unit ||
                ingredient.base_unit ||
                "",

              supplier:
                supplier?.name ||
                "Unknown supplier",

              effectiveDate:
                row.effective_date ||
                "",

              updatedAt:
                row.updated_at ||
                "",
            };
          })
          .filter(
            (
              item
            ): item is IngredientView =>
              item !== null
          );

      mapped.sort((a, b) =>
        a.name.localeCompare(
          b.name
        )
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
  }

  useEffect(() => {
    loadIngredients();
  }, []);

  const categories =
    useMemo(() => {
      const values =
        new Set<string>();

      ingredients.forEach(
        (ingredient) =>
          values.add(
            ingredient.category
          )
      );

      return [
        "All",
        ...Array.from(values).sort(),
      ];
    }, [ingredients]);

  const filtered =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

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
            categoryFilter ===
              "All" ||
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
      (item) =>
        item.price !== null
    ).length;

  const supplierCount =
    new Set(
      ingredients.map(
        (item) =>
          item.supplier
      )
    ).size;

  return (
    <main className="app-shell">
      <Sidebar active="ingredients" />

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Cost control
            </p>

            <h1>
              Ingredients
            </h1>

            <p className="page-description">
              Live ingredient pricing
              generated from approved
              supplier invoices.
            </p>
          </div>

          <button
            type="button"
            className="secondary-inline-button"
            onClick={
              loadIngredients
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
            <span>
              Ingredients
            </span>

            <strong>
              {ingredients.length}
            </strong>

            <small>
              Shared database
            </small>
          </article>

          <article className="stat-card">
            <span>
              Current prices
            </span>

            <strong>
              {pricedCount}
            </strong>

            <small>
              Invoice-derived
            </small>
          </article>

          <article className="stat-card">
            <span>
              Suppliers
            </span>

            <strong>
              {supplierCount}
            </strong>

            <small>
              Supplying priced
              ingredients
            </small>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Cost database
              </p>

              <h2>
                Ingredient prices
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom:
                "18px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="search"
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search ingredients or suppliers..."
              style={{
                flex: "1 1 280px",
              }}
            />

            <select
              value={
                categoryFilter
              }
              onChange={(
                event
              ) =>
                setCategoryFilter(
                  event.target.value
                )
              }
              style={{
                minWidth:
                  "180px",
              }}
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

          {error && (
            <div
              style={{
                padding:
                  "14px 16px",
                borderRadius:
                  "10px",
                marginBottom:
                  "16px",
                background:
                  "#fff0ed",
                color:
                  "#9d352c",
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div
              style={{
                padding:
                  "36px 0",
                textAlign:
                  "center",
                opacity: 0.65,
              }}
            >
              Loading ingredient
              prices...
            </div>
          ) : filtered.length ===
            0 ? (
            <div
              style={{
                padding:
                  "36px 0",
                textAlign:
                  "center",
                opacity: 0.65,
              }}
            >
              No ingredients found.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table className="data-table">
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
                        <td>
                          <strong>
                            {
                              ingredient.name
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            ingredient.category
                          }
                        </td>

                        <td>
                          {
                            ingredient.supplier
                          }
                        </td>

                        <td>
                          <strong>
                            {money(
                              ingredient.price
                            )}
                          </strong>
                        </td>

                        <td>
                          {ingredient.priceUnit ||
                            ingredient.baseUnit ||
                            "—"}
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

        <section
          className="panel"
          style={{
            marginTop: "24px",
            marginBottom:
              "60px",
          }}
        >
          <div>
            <p className="panel-kicker">
              How pricing works
            </p>

            <h2>
              Invoice-driven costs
            </h2>

            <p
              style={{
                maxWidth:
                  "760px",
                opacity: 0.72,
                lineHeight: 1.6,
              }}
            >
              When an invoice is
              approved, Kitchen
              Insights updates the
              current ingredient price
              for this site and stores
              the previous changes in
              price history. This page
              now reads that shared
              Supabase data directly.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
