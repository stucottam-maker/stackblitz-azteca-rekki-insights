"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const lineItems = [
  {
    product: "Ribeye",
    quantity: "2",
    pack: "3.6kg",
    unitPrice: "£63.00",
    total: "£126.00",
    status: "Matched",
  },
  {
    product: "Short rib",
    quantity: "4",
    pack: "5kg",
    unitPrice: "£49.25",
    total: "£197.00",
    status: "Matched",
  },
  {
    product: "Chicken thighs",
    quantity: "2",
    pack: "5kg",
    unitPrice: "£32.00",
    total: "£64.00",
    status: "Needs review",
  },
];

export default function InvoiceReviewPage() {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem("invoiceFileName") ?? "";
    const storedType = sessionStorage.getItem("invoiceFileType") ?? "";
    const storedSize = sessionStorage.getItem("invoiceFileSize") ?? "";
    const storedPreview = sessionStorage.getItem("invoicePreviewUrl");

    setFileName(storedName);
    setFileType(storedType);
    setFileSize(storedSize);
    setPreviewUrl(storedPreview);
  }, []);

  const sizeInMb = fileSize
    ? (Number(fileSize) / 1024 / 1024).toFixed(2)
    : "";

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <p className="brand-name">Insights</p>
            <p className="brand-subtitle">Kitchen cost control</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <Link className="nav-link" href="/">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <Link className="nav-link nav-link-active" href="/invoices">
            <span className="nav-icon">▤</span>
            Invoices
          </Link>

          <Link className="nav-link" href="/ingredients">
            <span className="nav-icon">◫</span>
            Ingredients
          </Link>

          <Link className="nav-link" href="/recipes">
            <span className="nav-icon">◇</span>
            Recipes
          </Link>

          <Link className="nav-link" href="/stock">
            <span className="nav-icon">□</span>
            Stock counts
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="restaurant-card">
            <div className="restaurant-avatar">AZ</div>

            <div>
              <p className="restaurant-name">Azteca</p>
              <p className="restaurant-location">Battersea, London</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <div className="upload-page">
          <header className="upload-header">
            <Link className="back-link" href="/invoices/upload">
              ← Back to upload
            </Link>

            <p className="eyebrow">Invoice processing</p>

            <h1>Review invoice</h1>

            <p className="page-description">
              Check the uploaded invoice and extracted details before approval.
            </p>
          </header>

          <section className="dashboard-grid">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Uploaded file</p>
                  <h2>Invoice preview</h2>
                </div>
              </div>

              {previewUrl ? (
                <div className="review-image-preview">
                  <img src={previewUrl} alt="Uploaded invoice preview" />
                </div>
              ) : fileType === "application/pdf" ? (
                <div className="review-pdf-preview">
                  <div className="pdf-preview-icon">PDF</div>

                  <div>
                    <p className="selected-file-name">
                      {fileName || "Uploaded PDF"}
                    </p>

                    <p className="selected-file-meta">
                      PDF preview will be added when we connect file storage.
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
                    <strong>{sizeInMb ? `${sizeInMb} MB` : "—"}</strong>
                  </div>

                  <div>
                    <span>Type</span>
                    <strong>{fileType || "Unknown"}</strong>
                  </div>
                </div>
              )}
            </article>

            <article className="panel">
              <p className="panel-kicker">Extracted details</p>

              <h2>Invoice information</h2>

              <div className="review-details">
                <div>
                  <span>Supplier</span>
                  <strong>Albion Fine Foods</strong>
                </div>

                <div>
                  <span>Invoice number</span>
                  <strong>INV-10482</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>3 Aug 2026</strong>
                </div>

                <div>
                  <span>Subtotal</span>
                  <strong>£1,070.50</strong>
                </div>

                <div>
                  <span>VAT</span>
                  <strong>£214.10</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>£1,284.60</strong>
                </div>
              </div>
            </article>
          </section>

          <section className="panel review-lines-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Extracted products</p>
                <h2>Line items</h2>
              </div>

              <span className="alert-count">{lineItems.length}</span>
            </div>

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
                  {lineItems.map((item) => (
                    <tr key={item.product}>
                      <td>
                        <strong>{item.product}</strong>
                      </td>

                      <td>{item.quantity}</td>
                      <td>{item.pack}</td>
                      <td>{item.unitPrice}</td>

                      <td>
                        <strong>{item.total}</strong>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            item.status === "Matched"
                              ? "status-approved"
                              : "status-review"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="upload-actions">
              <Link className="cancel-button" href="/invoices/upload">
                Back
              </Link>

              <button className="primary-button" type="button">
                Approve invoice
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}