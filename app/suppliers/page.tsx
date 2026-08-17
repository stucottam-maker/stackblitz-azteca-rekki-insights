"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";
import { loadInsightWorkspaceData } from "../lib/insightWorkspaceData";
import { getSupplier, suppliers as supplierDirectory } from "../data/suppliers";

import {
  supplierCatalogue,
  supplierContacts,
  type CatalogueItem,
} from "../data/supplierCatalogue";

import {
  generateInsights,
  formatCurrency,
  type ApprovedInvoice,
  type IngredientPriceRecord,
  type PurchaseOrder,
  type StockTake,
  type RecipeCostSummary,
} from "../data/insights";

type SupplierSummary = {
  name: string;
  email?: string;
  phone?: string;
  orderMethod?: string;
  deliveryDays?: string[];
  productCount: number;
  preferredCount: number;
  categories: string[];
  spend: number;
  invoiceCount: number;
  lastInvoiceDate?: string;
};

function formatDate(
  value?: string
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
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

function supplierInitials(
  name: string
) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) =>
      word.charAt(0)
    )
    .join("")
    .toUpperCase();
}

export default function SuppliersPage() {
  const [
    ingredientPrices,
    setIngredientPrices,
  ] = useState<
    Record<
      string,
      IngredientPriceRecord
    >
  >({});

  const [
    purchaseOrders,
    setPurchaseOrders,
  ] =
    useState<PurchaseOrder[]>(
      []
    );

  const [
    invoices,
    setInvoices,
  ] =
    useState<ApprovedInvoice[]>(
      []
    );

  const [
    stockTakes,
    setStockTakes,
  ] =
    useState<StockTake[]>(
      []
    );

  const [
    recipeCosts,
    setRecipeCosts,
  ] =
    useState<
      RecipeCostSummary[]
    >([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedSupplier,
    setSelectedSupplier,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    loadInsightWorkspaceData()
      .then((data) => {
        setIngredientPrices(data.ingredientPrices);
        setPurchaseOrders(data.purchaseOrders);
        setInvoices(data.invoices);
        setStockTakes(data.stockTakes);
        setRecipeCosts(data.recipeCosts);
      })
      .catch((error) => console.error("Suppliers cloud load failed", error));
  }, []);

  const insightData =
    useMemo(
      () =>
        generateInsights({
          ingredientPrices,
          purchaseOrders,
          invoices,
          stockTakes,
          recipeCosts,
        }),
      [
        ingredientPrices,
        purchaseOrders,
        invoices,
        stockTakes,
        recipeCosts,
      ]
    );

  const supplierSummaries =
    useMemo<
      SupplierSummary[]
    >(() => {
      const names =
        new Set<string>();

      supplierContacts.forEach(
        (supplier) =>
          names.add(
            supplier.name
          )
      );

      Object.keys(supplierDirectory).forEach((name) => names.add(name));

      supplierCatalogue.forEach(
        (item) =>
          names.add(
            item.supplier
          )
      );

      invoices.forEach(
        (invoice) => {
          if (
            invoice.supplier
          ) {
            names.add(
              invoice.supplier
            );
          }
        }
      );

      return Array.from(names)
        .map((name) => {
          const contact =
            supplierContacts.find(
              (supplier) =>
                supplier.name ===
                name
            );

          const supplierProfile = getSupplier(name);

          const products =
            supplierCatalogue.filter(
              (item) =>
                item.supplier ===
                name
            );

          const supplierInvoices =
            invoices.filter(
              (invoice) =>
                invoice.supplier ===
                name
            );

          const spendRow =
            insightData.supplierSpend.find(
              (supplier) =>
                supplier.supplier ===
                name
            );

          const categories =
            Array.from(
              new Set(
                products
                  .map(
                    (item) =>
                      item.category
                  )
                  .filter(
                    (
                      value
                    ): value is string =>
                      Boolean(
                        value
                      )
                  )
              )
            );

          const lastInvoiceDate =
            supplierInvoices
              .map(
                (invoice) =>
                  invoice.invoiceDate
              )
              .filter(
                (
                  value
                ): value is string =>
                  Boolean(
                    value
                  )
              )
              .sort()
              .at(-1);

          return {
            name,
            email:
              supplierProfile?.email ?? contact?.email,

            phone: supplierProfile?.phone,

            orderMethod: supplierProfile?.orderMethod,

            deliveryDays: supplierProfile?.deliveryDays,

            productCount:
              products.length,

            preferredCount:
              products.filter(
                (item) =>
                  item.preferred
              ).length,

            categories,

            spend:
              spendRow?.total ??
              0,

            invoiceCount:
              spendRow?.invoiceCount ??
              supplierInvoices.length,

            lastInvoiceDate,
          };
        })
        .sort((a, b) => {
          if (
            b.spend !==
            a.spend
          ) {
            return (
              b.spend -
              a.spend
            );
          }

          return a.name.localeCompare(
            b.name
          );
        });
    }, [
      invoices,
      insightData.supplierSpend,
    ]);

  const filteredSuppliers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return supplierSummaries;
      }

      return supplierSummaries.filter(
        (supplier) =>
          supplier.name
            .toLowerCase()
            .includes(query) ||
          supplier.categories.some(
            (category) =>
              category
                .toLowerCase()
                .includes(
                  query
                )
          )
      );
    }, [
      search,
      supplierSummaries,
    ]);

  const selectedProducts =
    useMemo<
      CatalogueItem[]
    >(() => {
      if (
        !selectedSupplier
      ) {
        return [];
      }

      return supplierCatalogue
        .filter(
          (item) =>
            item.supplier ===
            selectedSupplier
        )
        .sort((a, b) => {
          if (
            a.preferred &&
            !b.preferred
          ) {
            return -1;
          }

          if (
            !a.preferred &&
            b.preferred
          ) {
            return 1;
          }

          return a.ingredient.localeCompare(
            b.ingredient
          );
        });
    }, [
      selectedSupplier,
    ]);

  const selectedSummary =
    selectedSupplier
      ? supplierSummaries.find(
          (supplier) =>
            supplier.name ===
            selectedSupplier
        ) ?? null
      : null;

  const totalCatalogueProducts =
    supplierCatalogue.length;

  const totalPreferred =
    supplierCatalogue.filter(
      (item) =>
        item.preferred
    ).length;

  const totalRecordedSpend =
    insightData.supplierSpend.reduce(
      (sum, supplier) =>
        sum +
        supplier.total,
      0
    );

  return (
    <div className="app-shell">
      <Sidebar active="suppliers" />

      <main className="main-content suppliers-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Purchasing
            </p>

            <h1>
              Suppliers
            </h1>

            <p className="page-description">
              Supplier catalogue,
              spend, contacts and
              preferred sourcing
              lines.
            </p>
          </div>

          <div className="supplier-header-actions">
            <Link
              href="/orders"
              className="secondary-inline-button"
            >
              New order
            </Link>

            <Link
              href="/invoices/upload"
              className="primary-button"
            >
              Upload invoice
            </Link>
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Suppliers
            </p>

            <p className="stat-value">
              {
                supplierSummaries.length
              }
            </p>

            <p className="stat-change neutral">
              Active catalogue
              suppliers
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Catalogue products
            </p>

            <p className="stat-value">
              {
                totalCatalogueProducts
              }
            </p>

            <p className="stat-change neutral">
              Available supplier
              lines
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Preferred products
            </p>

            <p className="stat-value">
              {totalPreferred}
            </p>

            <p className="stat-change neutral">
              Primary sourcing
              lines
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Total recorded spend
            </p>

            <p className="stat-value">
              {formatCurrency(
                totalRecordedSpend
              )}
            </p>

            <p className="stat-change neutral">
              From approved
              invoices
            </p>
          </article>
        </section>

        <section className="supplier-workspace">
          <section className="panel supplier-directory-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Directory
                </p>

                <h2>
                  Supplier list
                </h2>
              </div>

              <span className="supplier-result-count">
                {
                  filteredSuppliers.length
                }{" "}
                {filteredSuppliers.length ===
                1
                  ? "supplier"
                  : "suppliers"}
              </span>
            </div>

            <div className="supplier-search">
              <input
                type="search"
                placeholder="Search supplier or category..."
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
              />
            </div>

            <div className="supplier-directory-list">
              {filteredSuppliers.map(
                (supplier) => {
                  const isSelected =
                    selectedSupplier ===
                    supplier.name;

                  return (
                    <button
                      type="button"
                      key={
                        supplier.name
                      }
                      className={`supplier-directory-row ${
                        isSelected
                          ? "supplier-directory-row-active"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSupplier(
                          supplier.name
                        )
                      }
                    >
                      <div className="supplier-directory-left">
                        <div className="supplier-avatar">
                          {supplierInitials(
                            supplier.name
                          )}
                        </div>

                        <div className="supplier-directory-copy">
                          <strong>
                            {
                              supplier.name
                            }
                          </strong>

                          <span>
                            {
                              supplier.productCount
                            }{" "}
                            {supplier.productCount ===
                            1
                              ? "product"
                              : "products"}
                          </span>

                          {supplier.categories.length >
                            0 && (
                            <small>
                              {supplier.categories
                                .slice(
                                  0,
                                  2
                                )
                                .join(
                                  " · "
                                )}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="supplier-directory-meta">
                        <strong>
                          {formatCurrency(
                            supplier.spend
                          )}
                        </strong>

                        <span>
                          {
                            supplier.invoiceCount
                          }{" "}
                          {supplier.invoiceCount ===
                          1
                            ? "invoice"
                            : "invoices"}
                        </span>

                        <span className="supplier-directory-arrow">
                          →
                        </span>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </section>

          <aside className="supplier-detail-column">
            {!selectedSummary ? (
              <section className="panel supplier-empty-state">
                <div className="supplier-empty-icon">
                  ◎
                </div>

                <h2>
                  Select a supplier
                </h2>

                <p>
                  Choose a supplier
                  from the directory
                  to view spend,
                  catalogue lines,
                  contact details and
                  preferred products.
                </p>
              </section>
            ) : (
              <>
                <section className="panel supplier-detail-card">
                  <div className="supplier-detail-header">
                    <div>
                      <p className="panel-kicker">
                        Supplier
                      </p>

                      <h2>
                        {
                          selectedSummary.name
                        }
                      </h2>
                    </div>

                    <Link
                      href="/orders"
                      className="secondary-inline-button"
                    >
                      Create order
                    </Link>
                  </div>

                  <div className="supplier-detail-kpis">
                    <div>
                      <span>
                        Spend
                      </span>

                      <strong>
                        {formatCurrency(
                          selectedSummary.spend
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Invoices
                      </span>

                      <strong>
                        {
                          selectedSummary.invoiceCount
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Products
                      </span>

                      <strong>
                        {
                          selectedSummary.productCount
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Preferred
                      </span>

                      <strong>
                        {
                          selectedSummary.preferredCount
                        }
                      </strong>
                    </div>
                  </div>

                  <div className="supplier-contact-list">
                    <div>
                      <span>
                        Email
                      </span>

                      <strong>
                        {selectedSummary.email ??
                          "Not added"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Last invoice
                      </span>

                      <strong>
                        {formatDate(
                          selectedSummary.lastInvoiceDate
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Ordering method</span>
                      <strong>{selectedSummary.orderMethod ?? "Not added"}</strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{selectedSummary.phone ?? "Not added"}</strong>
                    </div>

                    <div>
                      <span>Delivery days</span>
                      <strong>
                        {selectedSummary.deliveryDays?.length
                          ? selectedSummary.deliveryDays.join(", ")
                          : "Not added"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Categories
                      </span>

                      <strong>
                        {selectedSummary.categories.length >
                        0
                          ? selectedSummary.categories.join(
                              ", "
                            )
                          : "Not categorised"}
                      </strong>
                    </div>
                  </div>
                </section>

                <section className="panel supplier-detail-card">
                  <div className="supplier-detail-header">
                    <div>
                      <p className="panel-kicker">
                        Catalogue
                      </p>

                      <h2>
                        Products
                      </h2>
                    </div>

                    <span className="supplier-product-count">
                      {
                        selectedProducts.length
                      }
                    </span>
                  </div>

                  {selectedProducts.length ===
                  0 ? (
                    <div className="supplier-products-empty">
                      <p>
                        No catalogue
                        products have
                        been added for
                        this supplier.
                      </p>
                    </div>
                  ) : (
                    <div className="supplier-product-list">
                      {selectedProducts.map(
                        (product) => (
                          <div
                            className="supplier-product-row"
                            key={
                              product.id
                            }
                          >
                            <div className="supplier-product-copy">
                              <div className="supplier-product-heading">
                                <strong>
                                  {
                                    product.ingredient
                                  }
                                </strong>

                                {product.preferred && (
                                  <span>
                                    Preferred
                                  </span>
                                )}
                              </div>

                              <p>
                                {
                                  product.supplierProduct
                                }
                              </p>

                              <small>
                                {product.category ??
                                  "Uncategorised"}
                              </small>
                            </div>

                            <div className="supplier-product-price">
                              <strong>
                                {product.fallbackPrice ===
                                null
                                  ? "—"
                                  : formatCurrency(
                                      product.fallbackPrice
                                    )}
                              </strong>

                              <span>
                                /{" "}
                                {
                                  product.unit
                                }
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </section>
              </>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
