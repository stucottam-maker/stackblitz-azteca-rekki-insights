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
  createdAt: string | null;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="page">
      <div className="topbar">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Invoices</h1>
          <p className="page-description">
            Supplier invoice history and spend tracking.
          </p>
        </div>

        <Link href="/invoices/upload" className="primary-button">
          + Upload invoice
        </Link>
      </div>

      <div className="stats-grid invoice-stats">
        <div className="stat-card">
          <p className="stat-label">Invoices</p>
          <p className="stat-value">{loading ? "—" : invoices.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Recorded spend</p>
          <p className="stat-value">
            {loading ? "—" : `£${totalSpend.toFixed(2)}`}
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Suppliers</p>
          <p className="stat-value">{loading ? "—" : suppliers}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Status</p>
          <p className="stat-value">—</p>
          <p className="stat-change neutral">
            {error ? "Load error" : loading ? "Loading" : "Tracking active"}
          </p>
        </div>
      </div>

      <div className="panel invoices-page-panel">
        <div className="invoice-toolbar">
          <div>
            <h2>Invoice history</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => void loadInvoices()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
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
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <strong>{invoice.supplier || "Unknown"}</strong>
                    </td>
                    <td>{invoice.invoiceNumber || "-"}</td>
                    <td>{invoice.invoiceDate || "-"}</td>
                    <td>
                      {invoice.total === null || invoice.total === undefined
                        ? "—"
                        : `£${Number(invoice.total).toFixed(2)}`}
                    </td>
                    <td>
                      <span className="status-badge status-approved">
                        {invoice.status || "Saved"}
                      </span>
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
