"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "../components/Sidebar";

import {
  supplierCatalogue,
  supplierContacts,
  CatalogueItem,
} from "../data/supplierCatalogue";

import {
  generateInsights,
  formatCurrency,
  ApprovedInvoice,
  IngredientPriceRecord,
  PurchaseOrder,
  StockTake,
  RecipeCostSummary,
} from "../data/insights";

type SupplierSummary = {
  name: string;
  email?: string;
  productCount: number;
  preferredCount: number;
  categories: string[];
  spend: number;
  invoiceCount: number;
  lastInvoiceDate?: string;
};

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function SuppliersPage() {
  const [ingredientPrices, setIngredientPrices] = useState<
    Record<string, IngredientPriceRecord>
  >({});

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [invoices, setInvoices] = useState<ApprovedInvoice[]>([]);
  const [stockTakes, setStockTakes] = useState<StockTake[]>([]);
  const [recipeCosts, setRecipeCosts] = useState<RecipeCostSummary[]>([]);

  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  useEffect(() => {
    setIngredientPrices(
      safeParse<Record<string, IngredientPriceRecord>>(
        localStorage.getItem("ingredientPrices"),
        {}
      )
    );

    setPurchaseOrders(
      safeParse<PurchaseOrder[]>(
        localStorage.getItem("purchaseOrders"),
        []
      )
    );

    const invoiceHistory = safeParse<ApprovedInvoice[]>(
      localStorage.getItem("approvedInvoices"),
      []
    );

    const singleApprovedInvoice = safeParse<ApprovedInvoice | null>(
      localStorage.getItem("approvedInvoiceDraft"),
      null
    );

    if (invoiceHistory.length > 0) {
      setInvoices(invoiceHistory);
    } else if (singleApprovedInvoice) {
      setInvoices([singleApprovedInvoice]);
    } else {
      setInvoices([]);
    }

    const stockHistory = safeParse<StockTake[]>(
      localStorage.getItem("stockTakeHistory"),
      []
    );

    const currentStock = safeParse<StockTake | null>(
      localStorage.getItem("currentStockTake"),
      null
    );

    const combinedStock = [...stockHistory];

    if (currentStock) {
      const alreadyExists = currentStock.id
        ? combinedStock.some((item) => item.id === currentStock.id)
        : false;

      if (!alreadyExists) {
        combinedStock.push(currentStock);
      }
    }

    setStockTakes(combinedStock);

    setRecipeCosts(
      safeParse<RecipeCostSummary[]>(
        localStorage.getItem("recipeCostSummaries"),
        []
      )
    );
  }, []);

  const insightData = useMemo(
    () =>
      generateInsights({
        ingredientPrices,
        purchaseOrders,
        invoices,
        stockTakes,
        recipeCosts,
      }),
    [ingredientPrices, purchaseOrders, invoices, stockTakes, recipeCosts]
  );

  const supplierSummaries = useMemo<SupplierSummary[]>(() => {
    const names = new Set<string>();

    supplierContacts.forEach((supplier) => names.add(supplier.name));
    supplierCatalogue.forEach((item) => names.add(item.supplier));
    invoices.forEach((invoice) => {
      if (invoice.supplier) names.add(invoice.supplier);
    });

    return Array.from(names)
      .map((name) => {
        const contact = supplierContacts.find(
          (supplier) => supplier.name === name
        );

        const products = supplierCatalogue.filter(
          (item) => item.supplier === name
        );

        const supplierInvoices = invoices.filter(
          (invoice) => invoice.supplier === name
        );

        const spendRow = insightData.supplierSpend.find(
          (supplier) => supplier.supplier === name
        );

        const categories = Array.from(
          new Set(
            products
              .map((item) => item.category)
              .filter((value): value is string => Boolean(value))
          )
        );

        const lastInvoiceDate = supplierInvoices
          .map((invoice) => invoice.invoiceDate)
          .filter((value): value is string => Boolean(value))
          .sort()
          .at(-1);

        return {
          name,
          email: contact?.email,
          productCount: products.length,
          preferredCount: products.filter((item) => item.preferred).length,
          categories,
          spend: spendRow?.total ?? 0,
          invoiceCount: spendRow?.invoiceCount ?? supplierInvoices.length,
          lastInvoiceDate,
        };
      })
      .sort((a, b) => {
        if (b.spend !== a.spend) {
          return b.spend - a.spend;
        }

        return a.name.localeCompare(b.name);
      });
  }, [invoices, insightData.supplierSpend]);

  const filteredSuppliers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return supplierSummaries;
    }

    return supplierSummaries.filter((supplier) => {
      return (
        supplier.name.toLowerCase().includes(query) ||
        supplier.categories.some((category) =>
          category.toLowerCase().includes(query)
        )
      );
    });
  }, [search, supplierSummaries]);

  const selectedProducts = useMemo<CatalogueItem[]>(() => {
    if (!selectedSupplier) return [];

    return supplierCatalogue
      .filter((item) => item.supplier === selectedSupplier)
      .sort((a, b) => {
        if (a.preferred && !b.preferred) return -1;
        if (!a.preferred && b.preferred) return 1;

        return a.ingredient.localeCompare(b.ingredient);
      });
  }, [selectedSupplier]);

  const selectedSummary = selectedSupplier
    ? supplierSummaries.find((supplier) => supplier.name === selectedSupplier)
    : null;

  const totalCatalogueProducts = supplierCatalogue.length;
  const totalPreferred = supplierCatalogue.filter(
    (item) => item.preferred
  ).length;

  return (
    <div className="app-shell">
      <Sidebar active="suppliers" />

      <main className="main-content suppliers-page">
        <header className="suppliers-header">
          <div>
            <p className="page-eyebrow">Purchasing</p>
            <h1>Suppliers</h1>
            <p className="suppliers-subtitle">
              Supplier catalogue, spend, contacts and preferred products.
            </p>
          </div>

          <div className="suppliers-header-actions">
            <Link href="/orders" className="secondary-button">
              New order
            </Link>

            <Link href="/invoices/upload" className="primary-button">
              Upload invoice
            </Link>
          </div>
        </header>

        <section className="suppliers-summary-grid">
          <article className="supplier-summary-card">
            <span>Suppliers</span>
            <strong>{supplierSummaries.length}</strong>
            <p>Active catalogue suppliers</p>
          </article>

          <article className="supplier-summary-card">
            <span>Catalogue products</span>
            <strong>{totalCatalogueProducts}</strong>
            <p>Available supplier lines</p>
          </article>

          <article className="supplier-summary-card">
            <span>Preferred products</span>
            <strong>{totalPreferred}</strong>
            <p>Primary sourcing lines</p>
          </article>

          <article className="supplier-summary-card">
            <span>Total recorded spend</span>
            <strong>
              {formatCurrency(
                insightData.supplierSpend.reduce(
                  (sum, supplier) => sum + supplier.total,
                  0
                )
              )}
            </strong>
            <p>From approved invoices</p>
          </article>
        </section>

        <div className="suppliers-content-grid">
          <section className="suppliers-panel">
            <div className="suppliers-panel-header">
              <div>
                <p className="page-eyebrow">Directory</p>
                <h2>Supplier list</h2>
              </div>

              <span>
                {filteredSuppliers.length}{" "}
                {filteredSuppliers.length === 1 ? "supplier" : "suppliers"}
              </span>
            </div>

            <div className="supplier-search-wrap">
              <input
                type="search"
                placeholder="Search supplier or category..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="supplier-list">
              {filteredSuppliers.map((supplier) => {
                const isSelected = selectedSupplier === supplier.name;

                return (
                  <button
                    type="button"
                    className={`supplier-list-row ${
                      isSelected ? "supplier-list-row-active" : ""
                    }`}
                    key={supplier.name}
                    onClick={() => setSelectedSupplier(supplier.name)}
                  >
                    <div className="supplier-list-main">
                      <div className="supplier-avatar">
                        {supplier.name
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word.charAt(0))
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{supplier.name}</strong>

                        <span>
                          {supplier.productCount}{" "}
                          {supplier.productCount === 1 ? "product" : "products"}
                          {supplier.categories.length > 0
                            ? ` · ${supplier.categories.slice(0, 2).join(", ")}`
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="supplier-list-meta">
                      <strong>{formatCurrency(supplier.spend)}</strong>
                      <span>
                        {supplier.invoiceCount}{" "}
                        {supplier.invoiceCount === 1 ? "invoice" : "invoices"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="supplier-detail-column">
            {!selectedSummary ? (
              <section className="supplier-detail-empty">
                <div className="supplier-detail-empty-icon">◎</div>
                <h2>Select a supplier</h2>
                <p>
                  Choose a supplier to view catalogue products, spend, contact
                  information and preferred lines.
                </p>
              </section>
            ) : (
              <>
                <section className="supplier-detail-card">
                  <div className="supplier-detail-header">
                    <div>
                      <p className="page-eyebrow">Supplier</p>
                      <h2>{selectedSummary.name}</h2>
                    </div>

                    <Link href="/orders">Create order</Link>
                  </div>

                  <div className="supplier-detail-kpis">
                    <div>
                      <span>Spend</span>
                      <strong>{formatCurrency(selectedSummary.spend)}</strong>
                    </div>

                    <div>
                      <span>Invoices</span>
                      <strong>{selectedSummary.invoiceCount}</strong>
                    </div>

                    <div>
                      <span>Products</span>
                      <strong>{selectedSummary.productCount}</strong>
                    </div>

                    <div>
                      <span>Preferred</span>
                      <strong>{selectedSummary.preferredCount}</strong>
                    </div>
                  </div>

                  <div className="supplier-contact-list">
                    <div>
                      <span>Email</span>
                      <strong>{selectedSummary.email ?? "Not added"}</strong>
                    </div>

                    <div>
                      <span>Last invoice</span>
                      <strong>
                        {formatDate(selectedSummary.lastInvoiceDate)}
                      </strong>
                    </div>

                    <div>
                      <span>Categories</span>
                      <strong>
                        {selectedSummary.categories.length > 0
                          ? selectedSummary.categories.join(", ")
                          : "Not categorised"}
                      </strong>
                    </div>
                  </div>
                </section>

                <section className="supplier-detail-card">
                  <div className="supplier-detail-header">
                    <div>
                      <p className="page-eyebrow">Catalogue</p>
                      <h2>Products</h2>
                    </div>

                    <span>{selectedProducts.length}</span>
                  </div>

                  {selectedProducts.length === 0 ? (
                    <p className="supplier-products-empty">
                      No catalogue products have been added for this supplier.
                    </p>
                  ) : (
                    <div className="supplier-product-list">
                      {selectedProducts.map((product) => (
                        <div
                          className="supplier-product-row"
                          key={product.id}
                        >
                          <div>
                            <div className="supplier-product-heading">
                              <strong>{product.ingredient}</strong>

                              {product.preferred && (
                                <span>Preferred</span>
                              )}
                            </div>

                            <p>{product.supplierProduct}</p>

                            <small>
                              {product.category ?? "Uncategorised"}
                            </small>
                          </div>

                          <div className="supplier-product-price">
                            <strong>
                              {product.fallbackPrice === null
                                ? "—"
                                : formatCurrency(product.fallbackPrice)}
                            </strong>

                            <span>/ {product.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
