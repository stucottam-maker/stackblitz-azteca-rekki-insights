import Link from "next/link";

const invoices = [
  {
    supplier: "Albion Fine Foods",
    invoiceNumber: "INV-10482",
    date: "3 Aug 2026",
    subtotal: "£1,284.60",
    vat: "£0.00",
    total: "£1,284.60",
    status: "Approved",
  },
  {
    supplier: "Crazy Dan's House of Meat",
    invoiceNumber: "DS-88341",
    date: "2 Aug 2026",
    subtotal: "£746.20",
    vat: "£0.00",
    total: "£746.20",
    status: "Review",
  },
  {
    supplier: "Fin and Flounder",
    invoiceNumber: "FD-62017",
    date: "2 Aug 2026",
    subtotal: "£365.63",
    vat: "£73.12",
    total: "£438.75",
    status: "Approved",
  },
  {
    supplier: "Mexgrocer",
    invoiceNumber: "MX-21983",
    date: "1 Aug 2026",
    subtotal: "£327.00",
    vat: "£65.40",
    total: "£392.40",
    status: "Approved",
  },
  {
    supplier: "James Knight of Mayfair",
    invoiceNumber: "INV-10421",
    date: "29 Jul 2026",
    subtotal: "£968.40",
    vat: "£0.00",
    total: "£968.40",
    status: "Approved",
  },
  {
    supplier: "Woods Foodservice",
    invoiceNumber: "DS-88176",
    date: "28 Jul 2026",
    subtotal: "£514.80",
    vat: "£0.00",
    total: "£514.80",
    status: "Approved",
  },
  {
    supplier: "Raynor Hygiene",
    invoiceNumber: "DS-88176",
    date: "28 Jul 2026",
    subtotal: "£514.80",
    vat: "£0.00",
    total: "£514.80",
    status: "Approved",
  },
  {
    supplier: "Big K Charcoal",
    invoiceNumber: "DS-88176",
    date: "28 Jul 2026",
    subtotal: "£514.80",
    vat: "£0.00",
    total: "£514.80",
    status: "Approved",
  },
  {
    supplier: "Ascot Wholesale",
    invoiceNumber: "DS-88176",
    date: "28 Jul 2026",
    subtotal: "£514.80",
    vat: "£0.00",
    total: "£514.80",
    status: "Approved",
  },
];

export default function InvoicesPage() {
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
        <header className="topbar">
          <div>
            <p className="eyebrow">Purchasing</p>
            <h1>Invoices</h1>
            <p className="page-description">
              Upload, review and track supplier invoices.
            </p>
          </div>

          <Link className="primary-button" href="/invoices/upload">
            <span aria-hidden="true">＋</span>
            Upload invoice
          </Link>
        </header>

        <section className="stats-grid invoice-stats">
          <article className="stat-card">
            <p className="stat-label">Spend this month</p>
            <p className="stat-value">£18,420</p>
            <p className="stat-change negative">+4.2% vs last month</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Invoices this month</p>
            <p className="stat-value">47</p>
            <p className="stat-change neutral">Across 8 suppliers</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Awaiting review</p>
            <p className="stat-value">3</p>
            <p className="stat-change warning">Action required</p>
          </article>

          <article className="stat-card">
            <p className="stat-label">Average invoice</p>
            <p className="stat-value">£391.91</p>
            <p className="stat-change neutral">Current month</p>
          </article>
        </section>

        <section className="panel invoices-page-panel">
          <div className="invoice-toolbar">
            <div className="invoice-search">
              <label htmlFor="invoice-search">Search invoices</label>
              <input
                id="invoice-search"
                name="invoice-search"
                placeholder="Supplier or invoice number"
                type="search"
              />
            </div>

            <div className="invoice-filter">
              <label htmlFor="invoice-status">Status</label>
              <select id="invoice-status" name="invoice-status" defaultValue="all">
                <option value="all">All statuses</option>
                <option value="approved">Approved</option>
                <option value="review">Needs review</option>
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Invoice number</th>
                  <th>Date</th>
                  <th>Subtotal</th>
                  <th>VAT</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.invoiceNumber}>
                    <td>
                      <strong>{invoice.supplier}</strong>
                    </td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.subtotal}</td>
                    <td>{invoice.vat}</td>
                    <td>
                      <strong>{invoice.total}</strong>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          invoice.status === "Approved"
                            ? "status-approved"
                            : "status-review"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <button className="row-action" type="button">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}