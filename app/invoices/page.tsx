"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { supabase } from "../lib/supabase";

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
  supplier?:

  | {

      name: string;

    }

  | {

      name: string;

    }[]

  | null;
  invoice_lines?: {
    id: string;
  }[];
};

function money(value: number | null | undefined) {
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

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "—";
  }
function getSupplierName(invoice: InvoiceRow) {
  if (!invoice.supplier) {
    return "";
  }

  if (Array.isArray(invoice.supplier)) {
    return invoice.supplier[0]?.name ?? "";
  }

  return invoice.supplier.name ?? "";
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

export default function InvoicesPage() {
  const router = useRouter();

  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [search, setSearch] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    setLoading(true);
    setError("");

    try {
      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        router.push("/login");
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

      setInvoices(

  (data as unknown as InvoiceRow[]) ?? []

);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Could not load invoice history."
      );
    } finally {
      setLoading(false);
    }
  }

  const suppliers = useMemo(() => {
    const uniqueSuppliers = Array.from(
      new Set(
        invoices
          .map(
            (invoice) =>
             getSupplierName(invoice)
          )
          .filter(
            (name): name is string =>
              Boolean(name)
          )
      )
    );

    return uniqueSuppliers.sort(
      (a, b) =>
        a.localeCompare(b)
    );
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return invoices.filter(
      (invoice) => {
        const supplierName =
          invoice.supplier?.name ??
          "";

        const matchesSupplier =
          supplierFilter === "All" ||
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

  const totalSpend = useMemo(() => {
    return invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.total ?? 0
        ),
      0
    );
  }, [invoices]);

  const thisMonthSpend = useMemo(() => {
    const now = new Date();

    return invoices.reduce(
      (sum, invoice) => {
        if (!invoice.invoice_date) {
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
    suppliers.length;

  return (
    <main className="app-shell">
      <Sidebar active="invoices" />

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Purchasing
            </p>

            <h1>
              Invoices
            </h1>

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

        <section
          className="stats-grid"
          style={{
            marginBottom: "24px",
          }}
        >
          <article className="stat-card">
            <span>
              Approved invoices
            </span>

            <strong>
              {approvedCount}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              Total recorded spend
            </span>

            <strong>
              {money(totalSpend)}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              This month
            </span>

            <strong>
              {money(thisMonthSpend)}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              Active suppliers
            </span>

            <strong>
              {supplierCount}
            </strong>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Invoice history
              </p>

              <h2>
                Approved invoices
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="secondary-inline-button"
                onClick={
                  loadInvoices
                }
              >
                Refresh
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

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search supplier or invoice number..."
              style={{
                flex: "1 1 280px",
                minWidth: "220px",
              }}
            />

            <select
              value={supplierFilter}
              onChange={(event) =>
                setSupplierFilter(
                  event.target.value
                )
              }
              style={{
                minWidth: "210px",
              }}
            >
              <option value="All">
                All suppliers
              </option>

              {suppliers.map(
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

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#fff0ed",
                color: "#9f3f33",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div className="empty-table-message">
              Loading invoices...
            </div>
          ) : filteredInvoices.length ===
            0 ? (
            <div
              style={{
                padding: "56px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "12px",
                }}
              >
                ▤
              </div>

              <h3
                style={{
                  marginBottom: "8px",
                }}
              >
                {invoices.length === 0
                  ? "No approved invoices yet"
                  : "No invoices match your filters"}
              </h3>

              <p
                style={{
                  maxWidth: "520px",
                  margin:
                    "0 auto 18px auto",
                  opacity: 0.7,
                }}
              >
                {invoices.length === 0
                  ? "Upload and approve your first supplier invoice. It will be stored in Supabase and visible to authorised team members on any device."
                  : "Try clearing the search or changing the supplier filter."}
              </p>

              {invoices.length === 0 && (
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
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table className="ingredients-table">
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
                        key={
                          invoice.id
                        }
                      >
                        <td>
                          <div
                            style={{
                              display:
                                "flex",
                              flexDirection:
                                "column",
                              gap: "3px",
                            }}
                          >
                            <strong>
                              {invoice
                                .supplier
                                ?.name ||
                                "Unknown supplier"}
                            </strong>

                            <span
                              style={{
                                fontSize:
                                  "12px",
                                opacity:
                                  0.58,
                              }}
                            >
                              Approved{" "}
                              {formatDate(
                                invoice.approved_at
                              )}
                            </span>
                          </div>
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
                            ?.length ?? 0}
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

                        <td>
                          <strong>
                            {money(
                              invoice.total
                            )}
                          </strong>
                        </td>

                        <td>
                          <span
                            style={{
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              gap: "6px",
                              padding:
                                "5px 9px",
                              borderRadius:
                                "999px",
                              background:
                                invoice.status ===
                                "approved"
                                  ? "#edf4ef"
                                  : "#f3f1ec",
                              color:
                                invoice.status ===
                                "approved"
                                  ? "#245e48"
                                  : "#6f6a61",
                              fontSize:
                                "12px",
                              fontWeight:
                                700,
                            }}
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

        <section
          className="panel"
          style={{
            marginTop: "24px",
            marginBottom: "60px",
          }}
        >
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                padding: "16px",
                border:
                  "1px solid #e4dfd6",
                borderRadius: "12px",
              }}
            >
              <strong>
                1. Upload
              </strong>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  opacity: 0.68,
                  fontSize:
                    "13px",
                }}
              >
                Upload the supplier invoice.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                border:
                  "1px solid #e4dfd6",
                borderRadius: "12px",
              }}
            >
              <strong>
                2. Extract
              </strong>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  opacity: 0.68,
                  fontSize:
                    "13px",
                }}
              >
                AI reads the invoice data.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                border:
                  "1px solid #e4dfd6",
                borderRadius: "12px",
              }}
            >
              <strong>
                3. Approve
              </strong>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  opacity: 0.68,
                  fontSize:
                    "13px",
                }}
              >
                Match ingredients and approve.
              </p>
            </div>

            <div
              style={{
                padding: "16px",
                border:
                  "1px solid #e4dfd6",
                borderRadius: "12px",
              }}
            >
              <strong>
                4. Shared
              </strong>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  opacity: 0.68,
                  fontSize:
                    "13px",
                }}
              >
                The whole authorised team sees the same data.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
