"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../components/Sidebar";
import { supabase } from "../lib/supabase";
import { observedApprovedInvoices } from "../data/invoiceOrderHistory";

type SupplierRelation =
  | {
      name: string;
    }
  | {
      name: string;
    }[]
  | null;

type InvoiceRow = {
  id: string;
  invoice_number: string | null;
  invoice_date: string | null;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  status: string;
  approved_at: string | null;
  created_at: string;
  supplier?: SupplierRelation;
  invoice_lines?: {
    id: string;
  }[];
};

function money(
  value: number | null | undefined
) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function formatDate(
  value: string | null | undefined
) {
  if (!value) {
    return "—";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getSupplierName(
  invoice: InvoiceRow
) {
  if (!invoice.supplier) {
    return "";
  }

  if (Array.isArray(invoice.supplier)) {
    return invoice.supplier[0]?.name ?? "";
  }

  return invoice.supplier.name ?? "";
}

export default function InvoicesPage() {
  const router = useRouter();

  const [invoices, setInvoices] =
    useState<InvoiceRow[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    supplierFilter,
    setSupplierFilter,
  ] = useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadInvoices = useCallback(
    async () => {
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
          data,
          error: invoiceError,
        } = await supabase
          .from("invoices")
          .select(`
            id,
            invoice_number,
            invoice_date,
            subtotal,
            vat,
            total,
            status,
            approved_at,
            created_at,
            supplier:suppliers (
              name
            ),
            invoice_lines (
              id
            )
          `)
          .order("invoice_date", {
            ascending: false,
          })
          .order("created_at", {
            ascending: false,
          });

        if (invoiceError) {
          throw invoiceError;
        }

        const databaseInvoices = (data as unknown as InvoiceRow[]) ?? [];
        const databaseNumbers = new Set(
          databaseInvoices.map((invoice) => invoice.invoice_number).filter(Boolean)
        );
        const observedRows: InvoiceRow[] = observedApprovedInvoices
          .filter((invoice) => !databaseNumbers.has(invoice.invoiceNumber ?? null))
          .map((invoice) => ({
            id: invoice.id,
            invoice_number: invoice.invoiceNumber ?? null,
            invoice_date: invoice.invoiceDate ?? null,
            subtotal: invoice.subtotal ?? null,
            vat: invoice.vat ?? null,
            total: invoice.total ?? null,
            status: invoice.estimatedTotal ? "Approved · estimated" : "Approved",
            approved_at: invoice.invoiceDate ?? null,
            created_at: invoice.invoiceDate ?? new Date(0).toISOString(),
            supplier: { name: invoice.supplier },
            invoice_lines: invoice.lineItems.map((line, index) => ({
              id: `${invoice.id}-line-${index}`,
            })),
          }));

        setInvoices(
          [...databaseInvoices, ...observedRows].sort(
            (a, b) =>
              new Date(b.invoice_date ?? b.created_at).getTime() -
              new Date(a.invoice_date ?? a.created_at).getTime()
          )
        );
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Could not load invoice history."
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    void loadInvoices();
  }, [loadInvoices]);

  const supplierNames =
    useMemo(() => {
      return Array.from(
        new Set(
          invoices
            .map((invoice) =>
              getSupplierName(invoice)
            )
            .filter(
              (name): name is string =>
                Boolean(name)
            )
        )
      ).sort((a, b) =>
        a.localeCompare(b)
      );
    }, [invoices]);

  const filteredInvoices =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return invoices.filter(
        (invoice) => {
          const supplierName =
            getSupplierName(invoice);

          const matchesSupplier =
            supplierFilter ===
              "All" ||
            supplierName ===
              supplierFilter;

          const matchesSearch =
            !query ||
            supplierName
              .toLowerCase()
              .includes(query) ||
            (
              invoice.invoice_number ??
              ""
            )
              .toLowerCase()
              .includes(query);

          return (
            matchesSupplier &&
            matchesSearch
          );
        }
      );
    }, [
      invoices,
      search,
      supplierFilter,
    ]);

  const totalSpend =
    useMemo(() => {
      return invoices.reduce(
        (sum, invoice) =>
          sum +
          Number(
            invoice.total ?? 0
          ),
        0
      );
    }, [invoices]);

  const thisMonthSpend =
    useMemo(() => {
      const now = new Date();

      return invoices.reduce(
        (sum, invoice) => {
          if (
            !invoice.invoice_date
          ) {
            return sum;
          }

          const invoiceDate =
            new Date(
              invoice.invoice_date
            );

          if (
            Number.isNaN(
              invoiceDate.getTime()
            ) ||
            invoiceDate.getMonth() !==
              now.getMonth() ||
            invoiceDate.getFullYear() !==
              now.getFullYear()
          ) {
            return sum;
          }

          return (
            sum +
            Number(
              invoice.total ?? 0
            )
          );
        },
        0
      );
    }, [invoices]);

  const approvedCount =
    invoices.filter(
      (invoice) =>
        invoice.status ===
        "approved"
    ).length;

  const supplierCount =
    supplierNames.length;

  return (
    <div className="app-shell">
      <Sidebar active="invoices" />

      <main className="main-content invoices-page">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Purchasing
            </p>

            <h1>Invoices</h1>

            <p className="page-description">
              Shared supplier invoice
              history for your kitchen
              team.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              router.push(
                "/invoices/upload"
              )
            }
          >
            + Upload invoice
          </button>
        </header>

        <section className="stats-grid invoice-stats">
          <article className="stat-card">
            <p className="stat-label">
              Approved invoices
            </p>

            <p className="stat-value">
              {approvedCount}
            </p>

            <p className="stat-change neutral">
              Processed and stored
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Total recorded spend
            </p>

            <p className="stat-value">
              {money(totalSpend)}
            </p>

            <p className="stat-change neutral">
              Approved invoice value
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              This month
            </p>

            <p className="stat-value">
              {money(
                thisMonthSpend
              )}
            </p>

            <p className="stat-change neutral">
              Current month spend
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Active suppliers
            </p>

            <p className="stat-value">
              {supplierCount}
            </p>

            <p className="stat-change neutral">
              In invoice history
            </p>
          </article>
        </section>

        <section className="panel invoices-main-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Invoice history
              </p>

              <h2>
                Approved invoices
              </h2>
            </div>

            <div className="invoice-panel-actions">
              <button
                type="button"
                className="secondary-inline-button"
                onClick={() =>
                  void loadInvoices()
                }
                disabled={loading}
              >
                {loading
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <button
                type="button"
                className="secondary-inline-button"
                onClick={() =>
                  router.push(
                    "/invoices/upload"
                  )
                }
              >
                Upload new
              </button>
            </div>
          </div>

          <div className="invoice-toolbar-clean">
            <div className="invoice-search-clean">
              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search supplier or invoice number..."
              />
            </div>

            <div className="invoice-filter-clean">
              <select
                value={
                  supplierFilter
                }
                onChange={(event) =>
                  setSupplierFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All suppliers
                </option>

                {supplierNames.map(
                  (supplier) => (
                    <option
                      key={supplier}
                      value={supplier}
                    >
                      {supplier}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {error && (
            <div className="invoice-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="invoice-empty-state">
              <div className="invoice-empty-icon">
                ↻
              </div>

              <h3>
                Loading invoices
              </h3>

              <p>
                Fetching shared
                supplier invoice
                history.
              </p>
            </div>
          ) : filteredInvoices.length ===
            0 ? (
            <div className="invoice-empty-state">
              <div className="invoice-empty-icon">
                ▤
              </div>

              <h3>
                {invoices.length ===
                0
                  ? "No approved invoices yet"
                  : "No invoices match your filters"}
              </h3>

              <p>
                {invoices.length ===
                0
                  ? "Upload and approve your first supplier invoice to begin building spend, pricing and supplier history."
                  : "Try clearing your search or choosing another supplier."}
              </p>

              {invoices.length ===
                0 && (
                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    router.push(
                      "/invoices/upload"
                    )
                  }
                >
                  Upload first invoice
                </button>
              )}
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="invoice-history-table">
                <thead>
                  <tr>
                    <th>
                      Supplier
                    </th>

                    <th>
                      Invoice
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Lines
                    </th>

                    <th>
                      Subtotal
                    </th>

                    <th>
                      VAT
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map(
                    (invoice) => (
                      <tr
                        key={invoice.id}
                      >
                        <td className="invoice-supplier-cell">
                          <strong>
                            {getSupplierName(
                              invoice
                            ) ||
                              "Unknown supplier"}
                          </strong>

                          <span>
                            Approved{" "}
                            {formatDate(
                              invoice.approved_at
                            )}
                          </span>
                        </td>

                        <td>
                          {invoice.invoice_number ||
                            "—"}
                        </td>

                        <td>
                          {formatDate(
                            invoice.invoice_date
                          )}
                        </td>

                        <td>
                          {invoice
                            .invoice_lines
                            ?.length ??
                            0}
                        </td>

                        <td>
                          {money(
                            invoice.subtotal
                          )}
                        </td>

                        <td>
                          {money(
                            invoice.vat
                          )}
                        </td>

                        <td className="invoice-total-cell">
                          <strong>
                            {money(
                              invoice.total
                            )}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={`invoice-status-badge ${
                              invoice.status ===
                              "approved"
                                ? "invoice-status-approved"
                                : ""
                            }`}
                          >
                            {invoice.status ===
                            "approved"
                              ? "✓ Approved"
                              : invoice.status}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="panel invoice-workflow-panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Shared database
              </p>

              <h2>
                Team invoice workflow
              </h2>
            </div>
          </div>

          <div className="invoice-workflow-grid">
            <article className="invoice-workflow-step">
              <span>1</span>

              <div>
                <strong>
                  Upload
                </strong>

                <p>
                  Upload the supplier
                  invoice.
                </p>
              </div>
            </article>

            <article className="invoice-workflow-step">
              <span>2</span>

              <div>
                <strong>
                  Extract
                </strong>

                <p>
                  AI reads supplier,
                  totals and line items.
                </p>
              </div>
            </article>

            <article className="invoice-workflow-step">
              <span>3</span>

              <div>
                <strong>
                  Approve
                </strong>

                <p>
                  Match ingredients and
                  verify pricing.
                </p>
              </div>
            </article>

            <article className="invoice-workflow-step">
              <span>4</span>

              <div>
                <strong>
                  Shared
                </strong>

                <p>
                  Approved data becomes
                  available to the team.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
