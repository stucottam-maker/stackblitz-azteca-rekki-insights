"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

type Invoice = {
  id: string;
  supplier: string;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  subtotal: number | string | null;
  vat: number | string | null;
  total: number | string | null;
  status: string | null;
  dueDate: string | null;
  paymentTerms: string | null;
  paymentStatus: "unpaid" | "scheduled" | "paid" | "disputed";
  paidAt: string | null;
  matchStatus: "unmatched" | "matched" | "discrepancy";
  discrepancyAmount: number | string | null;
  createdAt: string | null;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("open");
  const [updatingId, setUpdatingId] = useState("");

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Please sign in again.");
      }

      const response = await fetch("/api/invoices", {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const raw = await response.text();
      let data: any;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(raw || "Invalid server response");
      }

      if (!response.ok) {
        throw new Error(data.error || "Could not load invoices");
      }

      setInvoices(Array.isArray(data.invoices) ? data.invoices : []);
    } catch (err: any) {
      console.error("Loading invoices failed", err);
      setError(err.message || "Could not load invoices");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInvoices();
  }, [loadInvoices]);

  const totalSpend = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  const suppliers = new Set(
    invoices.map((invoice) => invoice.supplier).filter(Boolean)
  ).size;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const openInvoices = invoices.filter((invoice) => invoice.paymentStatus !== "paid");
  const overdueInvoices = openInvoices.filter(
    (invoice) => invoice.dueDate && new Date(`${invoice.dueDate}T00:00:00`) < today
  );
  const dueSoonInvoices = openInvoices.filter((invoice) => {
    if (!invoice.dueDate) return false;
    const days = (new Date(`${invoice.dueDate}T00:00:00`).getTime() - today.getTime()) / 86400000;
    return days >= 0 && days <= 7;
  });
  const outstandingValue = openInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );
  const visibleInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    if (filter === "overdue") return overdueInvoices.some((item) => item.id === invoice.id);
    if (filter === "paid") return invoice.paymentStatus === "paid";
    return invoice.paymentStatus !== "paid";
  });

  async function updatePaymentStatus(invoiceId: string, paymentStatus: Invoice["paymentStatus"]) {
    try {
      setUpdatingId(invoiceId);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Please sign in again.");
      const response = await fetch("/api/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ invoiceId, paymentStatus }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update payment status");
      setInvoices((current) => current.map((invoice) =>
        invoice.id === invoiceId
          ? { ...invoice, paymentStatus, paidAt: data.invoice?.paid_at ?? null }
          : invoice
      ));
    } catch (err: any) {
      setError(err.message || "Could not update payment status");
    } finally {
      setUpdatingId("");
    }
  }

  function exportAccountingCsv() {
    const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = [
      ["Supplier", "Invoice number", "Invoice date", "Due date", "Net", "VAT", "Gross", "Payment status"],
      ...visibleInvoices.map((invoice) => [
        invoice.supplier, invoice.invoiceNumber, invoice.invoiceDate, invoice.dueDate,
        invoice.subtotal, invoice.vat, invoice.total, invoice.paymentStatus,
      ]),
    ];
    const blob = new Blob([rows.map((row) => row.map(escape).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `kitchen-insights-ap-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page">
      <div className="topbar">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Invoices</h1>
          <p className="page-description">Accounts payable, invoice approvals and supplier spend.</p>
        </div>

        <div className="ap-header-actions">
          <button type="button" className="secondary-inline-button" onClick={exportAccountingCsv}>Export CSV</button>
          <Link href="/invoices/upload" className="primary-button">+ Upload invoice</Link>
        </div>
      </div>

      <div className="stats-grid invoice-stats">
        <div className="stat-card">
          <p className="stat-label">Outstanding</p>
          <p className="stat-value">{loading ? "—" : `£${outstandingValue.toFixed(2)}`}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Open invoices</p>
          <p className="stat-value">{loading ? "—" : openInvoices.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Due in 7 days</p>
          <p className="stat-value">{loading ? "—" : dueSoonInvoices.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Overdue</p>
          <p className={`stat-value ${overdueInvoices.length ? "ap-overdue-value" : ""}`}>{loading ? "—" : overdueInvoices.length}</p>
          <p className="stat-change neutral">{suppliers} suppliers · £{totalSpend.toFixed(2)} recorded</p>
        </div>
      </div>

      <div className="panel invoices-page-panel">
        <div className="invoice-toolbar">
          <div>
            <div>
              <p className="panel-kicker">Accounts payable</p>
              <h2>Invoice inbox</h2>
            </div>
          </div>

          <div className="ap-toolbar-actions">
            <div className="ap-filters" role="group" aria-label="Filter invoices">
              {["open", "overdue", "paid", "all"].map((value) => (
                <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{value}</button>
              ))}
            </div>
            <button className="secondary-inline-button" onClick={() => void loadInvoices()} disabled={loading}>{loading ? "Loading…" : "Refresh"}</button>
          </div>
        </div>

        {error && <div className="notice">{error}</div>}

        {loading ? (
          <div className="empty-extraction">
            <p>Loading invoices...</p>
            <span>Fetching records from Supabase.</span>
          </div>
        ) : invoices.length === 0 ? (
          <div className="empty-extraction">
            <p>No invoices yet</p>
            <span>Upload your first supplier invoice.</span>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Invoice number</th>
                  <th>Date</th>
                  <th>Due</th>
                  <th>Total</th>
                  <th>Order match</th>
                  <th>Payment</th>
                </tr>
              </thead>

              <tbody>
                {visibleInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <Link href={`/invoices/${invoice.id}`} className="invoice-detail-link">
                        <strong>{invoice.supplier || "Unknown"}</strong>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/invoices/${invoice.id}`} className="invoice-detail-link">
                        {invoice.invoiceNumber || "-"}
                      </Link>
                    </td>
                    <td>{invoice.invoiceDate || "-"}</td>
                    <td>
                      <span className={overdueInvoices.some((item) => item.id === invoice.id) ? "ap-due-overdue" : ""}>
                        {invoice.dueDate || "—"}
                      </span>
                      {invoice.paymentTerms && <small className="ap-terms">{invoice.paymentTerms}</small>}
                    </td>
                    <td>
                      {invoice.total === null || invoice.total === undefined
                        ? "—"
                        : `£${Number(invoice.total).toFixed(2)}`}
                    </td>
                    <td><span className={`ap-match-badge ${invoice.matchStatus}`}>{invoice.matchStatus || "unmatched"}</span></td>
                    <td>
                      <select
                        className={`ap-status-select ${invoice.paymentStatus}`}
                        value={invoice.paymentStatus || "unpaid"}
                        disabled={updatingId === invoice.id}
                        onChange={(event) => void updatePaymentStatus(invoice.id, event.target.value as Invoice["paymentStatus"])}
                        aria-label={`Payment status for ${invoice.invoiceNumber || invoice.supplier}`}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="paid">Paid</option>
                        <option value="disputed">Disputed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
