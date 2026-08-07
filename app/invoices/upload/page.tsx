import Link from "next/link";

export default function UploadInvoicePage() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <p className="brand-name">Azteca Insights</p>
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
            <div>
              <Link className="back-link" href="/invoices">
                ← Back to invoices
              </Link>

              <p className="eyebrow">Invoice processing</p>
              <h1>Upload invoice</h1>
              <p className="page-description">
                Upload a supplier invoice and we’ll extract the key details for
                review.
              </p>
            </div>
          </header>

          <section className="upload-layout">
            <article className="panel upload-panel">
              <div className="upload-panel-heading">
                <p className="panel-kicker">Step 1</p>
                <h2>Select invoice</h2>
                <p className="upload-help">
                  Upload a PDF, JPG or PNG. Clear photos work best.
                </p>
              </div>

              <label className="dropzone" htmlFor="invoice-file">
                <input
                  id="invoice-file"
                  name="invoice-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                />

                <div className="dropzone-icon">↑</div>

                <div>
                  <p className="dropzone-title">Choose an invoice</p>
                  <p className="dropzone-text">
                    Click to browse or drag a file here
                  </p>
                </div>

                <span className="file-types">PDF · JPG · PNG</span>
              </label>

              <div className="upload-divider">
                <span>Invoice details</span>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="supplier">Supplier</label>
                  <select id="supplier" defaultValue="">
                    <option value="" disabled>
                      Select supplier
                    </option>
                    <option>Smithfield Butchers</option>
                    <option>Direct Seafoods</option>
                    <option>Fresh Direct</option>
                    <option>Mexgrocer</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="invoice-number">Invoice number</label>
                  <input
                    id="invoice-number"
                    placeholder="Will be extracted automatically"
                    type="text"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="invoice-date">Invoice date</label>
                  <input id="invoice-date" type="date" />
                </div>

                <div className="form-field">
                  <label htmlFor="invoice-total">Invoice total</label>

                  <div className="currency-input">
                    <span>£</span>
                    <input
                      id="invoice-total"
                      inputMode="decimal"
                      placeholder="0.00"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="upload-actions">
                <Link className="cancel-button" href="/invoices">
                  Cancel
                </Link>

                <button className="primary-button" type="button">
                  Continue to review →
                </button>
              </div>
            </article>

            <aside className="upload-side-column">
              <article className="panel process-card">
                <p className="panel-kicker">What happens next</p>
                <h2>Invoice review</h2>

                <div className="process-list">
                  <div className="process-item">
                    <span className="process-number">1</span>
                    <div>
                      <p>Read the invoice</p>
                      <span>
                        Supplier, invoice number, date, totals and products.
                      </span>
                    </div>
                  </div>

                  <div className="process-item">
                    <span className="process-number">2</span>
                    <div>
                      <p>Check line items</p>
                      <span>
                        Review product names, quantities, pack sizes and prices.
                      </span>
                    </div>
                  </div>

                  <div className="process-item">
                    <span className="process-number">3</span>
                    <div>
                      <p>Match ingredients</p>
                      <span>
                        Link supplier products to your master ingredient list.
                      </span>
                    </div>
                  </div>

                  <div className="process-item">
                    <span className="process-number">4</span>
                    <div>
                      <p>Update costings</p>
                      <span>
                        New prices feed into ingredient and recipe costs.
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="upload-tip">
                <p className="upload-tip-title">Tip</p>
                <p>
                  For paper invoices, photograph the page from directly above
                  and make sure all four corners are visible.
                </p>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}