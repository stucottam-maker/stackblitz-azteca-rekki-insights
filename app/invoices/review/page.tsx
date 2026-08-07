import Link from "next/link";

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

        <nav className="sidebar-nav">
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
              Check the extracted invoice details before approving.
            </p>
          </header>

          <section className="dashboard-grid">
            <article className="panel">
              <p className="panel-kicker">Invoice</p>
              <h2>Invoice preview</h2>

              <div className="review-preview-placeholder">
                Invoice preview will appear here
              </div>
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

              <span className="alert-count">3</span>
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