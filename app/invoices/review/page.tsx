"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type InvoiceLineItem = {
  product: string;
  quantity: string | number;
  pack: string;
  unitPrice: string | number;
  total: string | number;
  status?: string;
};

type InvoiceExtraction = {
  supplier?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  subtotal?: number | string | null;
  vat?: number | string | null;
  total?: number | string | null;
  lineItems?: InvoiceLineItem[];
};

export default function InvoiceReviewPage() {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [invoice, setInvoice] = useState<InvoiceExtraction>({
    supplier: "",
    invoiceNumber: "",
    invoiceDate: "",
    subtotal: null,
    vat: null,
    total: null,
    lineItems: [],
  });

  useEffect(() => {
    const storedName =
      sessionStorage.getItem("invoiceFileName") ?? "";

    const storedType =
      sessionStorage.getItem("invoiceFileType") ?? "";

    const storedSize =
      sessionStorage.getItem("invoiceFileSize") ?? "";

    const storedPreview =
      sessionStorage.getItem("invoicePreviewUrl");

    const storedExtraction =
      sessionStorage.getItem("invoiceExtraction");

    setFileName(storedName);
    setFileType(storedType);
    setFileSize(storedSize);
    setPreviewUrl(storedPreview);

    if (storedExtraction) {
      try {
        const parsed = JSON.parse(
          storedExtraction
        ) as InvoiceExtraction;

        setInvoice(parsed);
      } catch (error) {
        console.error(
          "Could not read invoice extraction",
          error
        );
      }
    }
  }, []);

  const sizeInMb = fileSize
    ? (Number(fileSize) / 1024 / 1024).toFixed(2)
    : "";

  function formatMoney(
    value: number | string | null | undefined
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    const numericValue =
      typeof value === "number"
        ? value
        : Number(
            String(value)
              .replace("£", "")
              .replace(",", "")
          );

    if (Number.isNaN(numericValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(numericValue);
  }

  const lineItems = invoice.lineItems ?? [];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <p className="brand-name">
              Azteca Insights
            </p>

            <p className="brand-subtitle">
              Kitchen cost control
            </p>
          </div>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >
          <Link className="nav-link" href="/">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <Link
            className="nav-link nav-link-active"
            href="/invoices"
          >
            <span className="nav-icon">▤</span>
            Invoices
          </Link>

          <Link
            className="nav-link"
            href="/ingredients"
          >
            <span className="nav-icon">◫</span>
            Ingredients
          </Link>

          <Link
            className="nav-link"
            href="/recipes"
          >
            <span className="nav-icon">◇</span>
            Recipes
          </Link>

          <Link
            className="nav-link"
            href="/stock"
          >
            <span className="nav-icon">□</span>
            Stock counts
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="restaurant-card">
            <div className="restaurant-avatar">
              AZ
            </div>

            <div>
              <p className="restaurant-name">
                Azteca
              </p>

              <p className="restaurant-location">
                Battersea, London
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <div className="upload-page">
          <header className="upload-header">
            <Link
              className="back-link"
              href="/invoices/upload"
            >
              ← Back to upload
            </Link>

            <p className="eyebrow">
              Invoice processing
            </p>

            <h1>Review invoice</h1>

            <p className="page-description">
              Check the uploaded invoice and extracted
              details before approval.
            </p>
          </header>

          <section className="dashboard-grid">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    Uploaded file
                  </p>

                  <h2>Invoice preview</h2>
                </div>
              </div>

              {previewUrl ? (
                <div className="review-image-preview">
                  <img
                    src={previewUrl}
                    alt="Uploaded invoice preview"
                  />
                </div>
              ) : fileType ===
                "application/pdf" ? (
                <div className="review-pdf-preview">
                  <div className="pdf-preview-icon">
                    PDF
                  </div>

                  <div>
                    <p className="selected-file-name">
                      {fileName || "Uploaded PDF"}
                    </p>

                    <p className="selected-file-meta">
                      PDF preview will be added when
                      file storage is connected.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="review-preview-placeholder">
                  No invoice preview available
                </div>
              )}

              {fileName && (
                <div className="review-file-info">
                  <div>
                    <span>File</span>
                    <strong>{fileName}</strong>
                  </div>

                  <div>
                    <span>Size</span>

                    <strong>
                      {sizeInMb
                        ? `${sizeInMb} MB`
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Type</span>

                    <strong>
                      {fileType || "Unknown"}
                    </strong>
                  </div>
                </div>
              )}
            </article>

            <article className="panel">
              <p className="panel-kicker">
                Extracted details
              </p>

              <h2>Invoice information</h2>

              <div className="review-details">
                <div>
                  <span>Supplier</span>

                  <strong>
                    {invoice.supplier || "—"}
                  </strong>
                </div>

                <div>
                  <span>Invoice number</span>

                  <strong>
                    {invoice.invoiceNumber || "—"}
                  </strong>
                </div>

                <div>
                  <span>Date</span>

                  <strong>
                    {invoice.invoiceDate || "—"}
                  </strong>
                </div>

                <div>
                  <span>Subtotal</span>

                  <strong>
                    {formatMoney(invoice.subtotal)}
                  </strong>
                </div>

                <div>
                  <span>VAT</span>

                  <strong>
                    {formatMoney(invoice.vat)}
                  </strong>
                </div>

                <div>
                  <span>Total</span>

                  <strong>
                    {formatMoney(invoice.total)}
                  </strong>
                </div>
              </div>
            </article>
          </section>

          <section className="panel review-lines-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Extracted products
                </p>

                <h2>Line items</h2>
              </div>

              <span className="alert-count">
                {lineItems.length}
              </span>
            </div>

            {lineItems.length > 0 ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Pack</th>
                      <th>Unit price</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lineItems.map(
                      (item, index) => (
                        <tr
                          key={`${item.product}-${index}`}
                        >
                          <td>
                            <strong>
                              {item.product}
                            </strong>
                          </td>

                          <td>
                            {item.quantity}
                          </td>

                          <td>
                            {item.pack || "—"}
                          </td>

                          <td>
                            {formatMoney(
                              item.unitPrice
                            )}
                          </td>

                          <td>
                            <strong>
                              {formatMoney(
                                item.total
                              )}
                            </strong>
                          </td>

                          <td>
                            <span
                              className={`status-badge ${
                                item.status ===
                                "Needs review"
                                  ? "status-review"
                                  : "status-approved"
                              }`}
                            >
                              {item.status ||
                                "Extracted"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-extraction">
                <p>
                  No line items have been extracted
                  yet.
                </p>

                <span>
                  We’ll populate these automatically
                  once the invoice reader is connected.
                </span>
              </div>
            )}

            <div className="upload-actions">
              <Link
                className="cancel-button"
                href="/invoices/upload"
              >
                Back
              </Link>

              <button
                className="primary-button"
                type="button"
              >
                Approve invoice
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}