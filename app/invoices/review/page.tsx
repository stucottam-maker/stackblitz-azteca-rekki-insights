"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type InvoiceLineItem = {
  product: string;
  quantity: string | number | null;
  pack: string | null;
  unitPrice: number | string | null;
  total: number | string | null;
  status?: string;
  ingredientMatch?: string;
};

type InvoiceExtraction = {
  supplier?: string | null;
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  subtotal?: number | string | null;
  vat?: number | string | null;
  total?: number | string | null;
  lineItems?: InvoiceLineItem[];
};

type StoredIngredientPrice = {
  price: number;
  unit: string;
  supplier: string;
  product: string;
  updatedAt: string;
};

const masterIngredients = [
  "Cod",
  "Black cod",
  "26/30 prawn",
  "King prawn",
  "Tuna loin",
  "Stonebass",
  "Trout",
  "Salmon",
  "Ribeye",
  "Short rib",
  "Pork belly",
  "Chicken thigh",
  "Birria beef",
  "Carnitas pork",
];

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

        setInvoice({
          ...parsed,
          lineItems:
            parsed.lineItems?.map((item) => ({
              ...item,
              ingredientMatch: guessIngredient(item.product),
            })) ?? [],
        });
      } catch (error) {
        console.error(
          "Could not read invoice extraction",
          error
        );
      }
    }
  }, []);

  function guessIngredient(product: string) {
    const value = product.toLowerCase();

    if (value.includes("black cod")) {
      return "Black cod";
    }

    if (
      value.includes("26/30") &&
      value.includes("prawn")
    ) {
      return "26/30 prawn";
    }

    if (
      value.includes("king prawn") ||
      value.includes("10/20")
    ) {
      return "King prawn";
    }

    if (value.includes("tuna")) {
      return "Tuna loin";
    }

    if (
      value.includes("cod fillet") ||
      value.includes("gadus")
    ) {
      return "Cod";
    }

    if (value.includes("stonebass")) {
      return "Stonebass";
    }

    if (value.includes("trout")) {
      return "Trout";
    }

    if (value.includes("salmon")) {
      return "Salmon";
    }

    if (value.includes("ribeye")) {
      return "Ribeye";
    }

    if (value.includes("short rib")) {
      return "Short rib";
    }

    if (value.includes("pork belly")) {
      return "Pork belly";
    }

    if (
      value.includes("chicken thigh") ||
      value.includes("chicken thighs")
    ) {
      return "Chicken thigh";
    }

    if (value.includes("birria")) {
      return "Birria beef";
    }

    if (value.includes("carnitas")) {
      return "Carnitas pork";
    }

    return "";
  }

  function updateInvoiceField(
    field: keyof InvoiceExtraction,
    value: string
  ) {
    setInvoice((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateLineItem(
    index: number,
    field: keyof InvoiceLineItem,
    value: string
  ) {
    setInvoice((current) => {
      const nextLines = [
        ...(current.lineItems ?? []),
      ];

      nextLines[index] = {
        ...nextLines[index],
        [field]: value,
      };

      return {
        ...current,
        lineItems: nextLines,
      };
    });
  }

  const sizeInMb = fileSize
    ? (Number(fileSize) / 1024 / 1024).toFixed(2)
    : "";

  const lineItems = invoice.lineItems ?? [];

  const unmatchedCount = useMemo(
    () =>
      lineItems.filter(
        (item) => !item.ingredientMatch
      ).length,
    [lineItems]
  );

  function moneyInputValue(
    value: number | string | null | undefined
  ) {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value).replace("£", "");
  }

  function detectPriceUnit(item: InvoiceLineItem) {
    const pack = (item.pack ?? "").toLowerCase();
    const product = item.product.toLowerCase();

    if (
      pack.includes("kg") ||
      product.includes("per kg") ||
      product.includes("(per kg)")
    ) {
      return "kg";
    }

    if (
      pack.includes("litre") ||
      pack.includes("liter") ||
      pack === "l" ||
      product.includes("per litre")
    ) {
      return "L";
    }

    return "each";
  }

  function approveInvoice() {
    const payload = {
      ...invoice,
      lineItems,
    };

    const ingredientPrices =
      JSON.parse(
        localStorage.getItem("ingredientPrices") || "{}"
      ) as Record<string, StoredIngredientPrice>;

    lineItems.forEach((item) => {
      if (!item.ingredientMatch) return;

      const unitPrice = Number(item.unitPrice ?? 0);

      if (
        !unitPrice ||
        Number.isNaN(unitPrice)
      ) {
        return;
      }

      ingredientPrices[item.ingredientMatch] = {
        price: unitPrice,
        unit: detectPriceUnit(item),
        supplier:
          invoice.supplier ?? "Unknown supplier",
        product: item.product,
        updatedAt: new Date().toISOString(),
      };
    });

    localStorage.setItem(
      "ingredientPrices",
      JSON.stringify(ingredientPrices)
    );

    localStorage.setItem(
      "approvedInvoiceDraft",
      JSON.stringify(payload)
    );

    alert(
      unmatchedCount > 0
        ? `Invoice saved. ${unmatchedCount} product line${
            unmatchedCount === 1 ? "" : "s"
          } still need ingredient matching.`
        : "Invoice approved and ingredient prices updated."
    );
  }

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
            href="/menu"
          >
            <span className="nav-icon">☰</span>
            Menu
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
              Check the extracted data, correct anything
              that looks wrong, and match each supplier
              product to a master ingredient.
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
              ) : fileType === "application/pdf" ? (
                <div className="review-pdf-preview">
                  <div className="pdf-preview-icon">
                    PDF
                  </div>

                  <div>
                    <p className="selected-file-name">
                      {fileName || "Uploaded PDF"}
                    </p>

                    <p className="selected-file-meta">
                      PDF preview is not available in this
                      local version yet.
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

              <div className="review-edit-grid">
                <div className="form-field">
                  <label>Supplier</label>

                  <input
                    value={invoice.supplier ?? ""}
                    onChange={(event) =>
                      updateInvoiceField(
                        "supplier",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Invoice number</label>

                  <input
                    value={
                      invoice.invoiceNumber ?? ""
                    }
                    onChange={(event) =>
                      updateInvoiceField(
                        "invoiceNumber",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Date</label>

                  <input
                    value={
                      invoice.invoiceDate ?? ""
                    }
                    onChange={(event) =>
                      updateInvoiceField(
                        "invoiceDate",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="form-field">
                  <label>Subtotal</label>

                  <div className="currency-input">
                    <span>£</span>

                    <input
                      inputMode="decimal"
                      value={moneyInputValue(
                        invoice.subtotal
                      )}
                      onChange={(event) =>
                        updateInvoiceField(
                          "subtotal",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>VAT</label>

                  <div className="currency-input">
                    <span>£</span>

                    <input
                      inputMode="decimal"
                      value={moneyInputValue(
                        invoice.vat
                      )}
                      onChange={(event) =>
                        updateInvoiceField(
                          "vat",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Total</label>

                  <div className="currency-input">
                    <span>£</span>

                    <input
                      inputMode="decimal"
                      value={moneyInputValue(
                        invoice.total
                      )}
                      onChange={(event) =>
                        updateInvoiceField(
                          "total",
                          event.target.value
                        )
                      }
                    />
                  </div>
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

              <div className="review-summary">
                <span className="status-badge status-approved">
                  {lineItems.length} extracted
                </span>

                {unmatchedCount > 0 && (
                  <span className="status-badge status-review">
                    {unmatchedCount} need matching
                  </span>
                )}
              </div>
            </div>

            <div className="table-wrapper">
              <table className="review-edit-table">
                <thead>
                  <tr>
                    <th>Supplier product</th>
                    <th>Qty</th>
                    <th>Pack</th>
                    <th>Unit price</th>
                    <th>Total</th>
                    <th>Master ingredient</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {lineItems.map(
                    (item, index) => (
                      <tr
                        key={`${item.product}-${index}`}
                      >
                        <td className="review-product-cell">
                          <textarea
                            value={item.product}
                            onChange={(event) =>
                              updateLineItem(
                                index,
                                "product",
                                event.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            className="table-input table-input-small"
                            value={
                              item.quantity ?? ""
                            }
                            onChange={(event) =>
                              updateLineItem(
                                index,
                                "quantity",
                                event.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <input
                            className="table-input"
                            value={item.pack ?? ""}
                            onChange={(event) =>
                              updateLineItem(
                                index,
                                "pack",
                                event.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          <div className="table-money-input">
                            <span>£</span>

                            <input
                              inputMode="decimal"
                              value={moneyInputValue(
                                item.unitPrice
                              )}
                              onChange={(event) =>
                                updateLineItem(
                                  index,
                                  "unitPrice",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </td>

                        <td>
                          <div className="table-money-input">
                            <span>£</span>

                            <input
                              inputMode="decimal"
                              value={moneyInputValue(
                                item.total
                              )}
                              onChange={(event) =>
                                updateLineItem(
                                  index,
                                  "total",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </td>

                        <td>
                          <select
                            className="ingredient-match-select"
                            value={
                              item.ingredientMatch ?? ""
                            }
                            onChange={(event) =>
                              updateLineItem(
                                index,
                                "ingredientMatch",
                                event.target.value
                              )
                            }
                          >
                            <option value="">
                              Select ingredient
                            </option>

                            {masterIngredients.map(
                              (ingredient) => (
                                <option
                                  key={ingredient}
                                  value={ingredient}
                                >
                                  {ingredient}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              item.ingredientMatch
                                ? "status-approved"
                                : "status-review"
                            }`}
                          >
                            {item.ingredientMatch
                              ? "Matched"
                              : "Needs review"}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

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
                onClick={approveInvoice}
              >
                {unmatchedCount > 0
                  ? "Save review"
                  : "Approve invoice"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}