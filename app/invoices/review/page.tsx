"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

export default function InvoiceReviewPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("extractedInvoices");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) setInvoices(parsed);
      else if (Array.isArray(parsed?.invoices)) setInvoices(parsed.invoices);
    } catch (error) {
      console.error("Review load error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  async function saveInvoices() {
    try {
      setSaving(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      let source: Record<string, unknown> | null = null;
      const storedSource = sessionStorage.getItem("extractedInvoiceSource");
      if (storedSource) {
        try {
          source = JSON.parse(storedSource);
        } catch {
          source = null;
        }
      }

      const response = await fetch("/api/invoices/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ invoices, source }),
      });

      const raw = await response.text();
      let data: any;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(raw || "Invalid server response");
      }

      if (!response.ok) {
        throw new Error(data.error || "Could not save invoices");
      }

      const saved = Number(data.saved ?? invoices.length);
      const skipped = Number(data.skipped ?? 0);
      setMessage(
        skipped > 0
          ? `Saved ${saved} invoice${saved === 1 ? "" : "s"}; ${skipped} duplicate${skipped === 1 ? "" : "s"} skipped.`
          : `Saved ${saved} invoice${saved === 1 ? "" : "s"}.`
      );

      sessionStorage.removeItem("extractedInvoices");
      sessionStorage.removeItem("extractedInvoiceSource");

      window.setTimeout(() => router.push("/invoices"), 800);
    } catch (error: any) {
      console.error("SAVE FAILED", error);
      setMessage(error.message || "Could not save invoices");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="page">Loading invoices…</div>;
  }

  return (
    <div className="page invoice-review-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Review invoices</h1>
          <p>Check the extracted supplier, totals and product lines before approval.</p>
        </div>

        <button
          className="primary-button"
          disabled={saving || invoices.length === 0}
          onClick={() => void saveInvoices()}
        >
          {saving
            ? "Saving…"
            : `Approve ${invoices.length} invoice${invoices.length === 1 ? "" : "s"}`}
        </button>
      </div>

      {message && <div className="notice">{message}</div>}

      {invoices.length === 0 ? (
        <div className="card">
          <h2>No invoices found</h2>
          <p>Return to upload and extract an invoice.</p>
        </div>
      ) : (
        <div className="invoice-review-list">
          {invoices.map((invoice, index) => (
            <article key={index} className="panel invoice-review-card">
              <div className="invoice-review-heading">
                <div>
                  <span className="badge">Invoice {index + 1}</span>
                  <h2>{invoice.supplier || "Unknown supplier"}</h2>
                  <p>
                    {invoice.invoiceNumber || "No invoice number"} · {invoice.invoiceDate || "No date"}
                  </p>
                </div>
                <strong className="invoice-review-total">
                  £{Number(invoice.total || 0).toFixed(2)}
                </strong>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Pack</th>
                      <th>Qty</th>
                      <th>Unit price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoice.lineItems || []).map((item: any, itemIndex: number) => (
                      <tr key={itemIndex}>
                        <td><strong>{item.product}</strong></td>
                        <td>{item.pack || "—"}</td>
                        <td>{item.quantity ?? "—"}</td>
                        <td>{item.unitPrice == null ? "—" : `£${Number(item.unitPrice).toFixed(2)}`}</td>
                        <td>{item.total == null ? "—" : `£${Number(item.total).toFixed(2)}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
