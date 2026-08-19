"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { supabase } from "../../lib/supabase";

type SupplierRelation =
  | {
      name: string;
    }
  | {
      name: string;
    }[]
  | null;

type InvoiceLine = {
  id: string;
  product_name: string | null;
  quantity: number | null;
  pack: string | null;
  unit_price: number | null;
  line_total: number | null;
  price_unit: string | null;
};

type Invoice = {
  id: string;
  invoice_number: string | null;
  invoice_date: string | null;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  status: string;
  file_name: string | null;
  file_path: string | null;
  approved_at: string | null;
  supplier: SupplierRelation;
  invoice_lines: InvoiceLine[];
};

type InvoiceSource = {
  path: string;
  url: string;
  isPdf: boolean;
  label: string;
};

function getSupplierName(supplier: SupplierRelation) {
  if (!supplier) return "Unknown supplier";
  if (Array.isArray(supplier)) return supplier[0]?.name || "Unknown supplier";
  return supplier.name || "Unknown supplier";
}

function money(value: number | null) {
  if (value === null) return "—";

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function invoiceSourcePaths(value: string | null) {
  if (!value) return [];
  const trimmed = value.trim();

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((path): path is string => typeof path === "string" && path.length > 0);
      }
    } catch {
      return [value];
    }
  }

  return [value];
}

function isPdfPath(path: string) {
  return /\.pdf(?:$|\?)/i.test(path);
}

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoiceSources, setInvoiceSources] = useState<InvoiceSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoice() {
      try {
        setLoading(true);
        setError("");

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          router.replace("/login");
          return;
        }

        const { data, error: invoiceError } = await supabase
          .from("invoices")
          .select(`
            id,
            invoice_number,
            invoice_date,
            subtotal,
            vat,
            total,
            status,
            file_name,
            file_path,
            approved_at,
            supplier:suppliers (name),
            invoice_lines (
              id,
              product_name,
              quantity,
              pack,
              unit_price,
              line_total,
              price_unit
            )
          `)
          .eq("id", invoiceId)
          .single();

        if (invoiceError) throw invoiceError;

        const resolvedInvoice = data as unknown as Invoice;
        setInvoice(resolvedInvoice);

        const paths = invoiceSourcePaths(resolvedInvoice.file_path);
        if (paths.length > 0) {
          const signedSources = await Promise.all(
            paths.map(async (path, index) => {
              const { data: signedData, error: signedError } = await supabase.storage
                .from("invoice-files")
                .createSignedUrl(path, 60 * 60);

              if (signedError || !signedData?.signedUrl) {
                console.error("Invoice source signing failed", signedError);
                return null;
              }

              return {
                path,
                url: signedData.signedUrl,
                isPdf: isPdfPath(path),
                label: paths.length > 1 ? `Page ${index + 1}` : "Original invoice",
              } satisfies InvoiceSource;
            })
          );

          setInvoiceSources(
            signedSources.filter((source): source is InvoiceSource => source !== null)
          );
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unable to load invoice.");
      } finally {
        setLoading(false);
      }
    }

    if (invoiceId) void loadInvoice();
  }, [invoiceId, router]);

  if (loading) return <div className="page">Loading invoice…</div>;

  if (error || !invoice) {
    return (
      <div className="page">
        <div className="notice">
          <strong>Unable to load invoice</strong>
          <p>{error || "Invoice not found."}</p>
        </div>
      </div>
    );
  }

  const supplierName = getSupplierName(invoice.supplier);

  return (
    <div className="page invoice-detail-page">
      <header className="topbar">
        <div>
          <button
            type="button"
            className="secondary-inline-button"
            onClick={() => router.push("/invoices")}
            style={{ marginBottom: "14px" }}
          >
            ← Invoices
          </button>

          <p className="eyebrow">Invoice</p>
          <h1>{supplierName}</h1>
          <p className="page-description">
            {invoice.invoice_number ? `Invoice ${invoice.invoice_number}` : "Supplier invoice"}
          </p>
        </div>

        <span style={{ textTransform: "capitalize", fontWeight: 700 }}>
          {invoice.status}
        </span>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Invoice date</span>
          <strong>{formatDate(invoice.invoice_date)}</strong>
        </article>

        <article className="stat-card">
          <span>Subtotal</span>
          <strong>{money(invoice.subtotal)}</strong>
        </article>

        <article className="stat-card">
          <span>VAT</span>
          <strong>{money(invoice.vat)}</strong>
        </article>

        <article className="stat-card">
          <span>Total</span>
          <strong>{money(invoice.total)}</strong>
        </article>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            invoiceSources.length > 0
              ? "minmax(300px, 0.8fr) minmax(500px, 1.2fr)"
              : "1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {invoiceSources.length > 0 && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Original</p>
                <h2>{invoiceSources.length > 1 ? "Invoice pages" : "Invoice file"}</h2>
              </div>
              {invoiceSources.length > 1 && <strong>{invoiceSources.length} pages</strong>}
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {invoiceSources.map((source) => (
                <div key={source.path}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.isPdf ? (
                      <div
                        style={{
                          minHeight: 160,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          padding: 20,
                          borderRadius: 10,
                          background: "#f5f2ec",
                          textAlign: "center",
                        }}
                      >
                        <span style={{ fontSize: 38 }}>📄</span>
                        <strong>Open original PDF</strong>
                      </div>
                    ) : (
                      <Image
                        src={source.url}
                        alt={source.label}
                        width={1200}
                        height={1600}
                        unoptimized
                        style={{
                          display: "block",
                          width: "100%",
                          maxHeight: invoiceSources.length > 1 ? "520px" : "720px",
                          objectFit: "contain",
                          borderRadius: "10px",
                          background: "#f5f2ec",
                        }}
                      />
                    )}
                  </a>
                  {invoiceSources.length > 1 && (
                    <strong style={{ display: "block", marginTop: 7, fontSize: 13 }}>
                      {source.label}
                    </strong>
                  )}
                </div>
              ))}
            </div>

            {invoice.file_name && (
              <p style={{ marginTop: "12px", opacity: 0.6, fontSize: "12px" }}>
                {invoice.file_name}
              </p>
            )}
          </section>
        )}

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Extracted data</p>
              <h2>Invoice lines</h2>
            </div>
            <strong>{invoice.invoice_lines.length} lines</strong>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Pack</th>
                  <th>Unit price</th>
                  <th>Price unit</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.invoice_lines.map((line) => (
                  <tr key={line.id}>
                    <td>
                      <strong>{line.product_name || "Unnamed product"}</strong>
                    </td>
                    <td>{line.quantity ?? "—"}</td>
                    <td>{line.pack || "—"}</td>
                    <td>{money(line.unit_price)}</td>
                    <td>{line.price_unit || "—"}</td>
                    <td>
                      <strong>{money(line.line_total)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="panel" style={{ marginTop: "24px", marginBottom: "60px" }}>
        <p className="panel-kicker">Approval</p>
        <h2>Invoice record</h2>
        <p style={{ opacity: 0.7 }}>Approved {formatDate(invoice.approved_at)}</p>
      </section>
    </div>
  );
}
