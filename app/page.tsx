import Link from "next/link";
import Sidebar from "./components/Sidebar";

const stats = [
  {
    label: "Spend this month",
    value: "£18,420",
    change: "+4.2% vs last month",
    tone: "negative",
  },
  {
    label: "Average food cost",
    value: "28.6%",
    change: "Target: 27%",
    tone: "warning",
  },
  {
    label: "Invoices processed",
    value: "47",
    change: "3 awaiting review",
    tone: "neutral",
  },
  {
    label: "Price increases",
    value: "14",
    change: "In the last 30 days",
    tone: "negative",
  },
];

const suppliers = [
  {
    name: "Albion Fine Foods",
    category: "Foodservice",
    spend: "£6,840",
    percentage: 37,
  },
  {
    name: "Fin and Flounder",
    category: "Fish",
    spend: "£3,260",
    percentage: 18,
  },
  {
    name: "Crazy Dan's House of Meat",
    category: "Meat",
    spend: "£2,970",
    percentage: 16,
  },
  {
    name: "Mexgrocer",
    category: "Dry goods",
    spend: "£2,140",
    percentage: 12,
  },
];

const priceAlerts = [
  {
    ingredient: "Ribeye",
    supplier: "Crazy Dan's House of Meat",
    previousPrice: "£16.20/kg",
    currentPrice: "£17.50/kg",
    change: "+8.0%",
  },
  {
    ingredient: "Short rib",
    supplier: "Crazy Dan's House of Meat",
    previousPrice: "£9.10/kg",
    currentPrice: "£9.85/kg",
    change: "+8.2%",
  },
  {
    ingredient: "Tuna loin",
    supplier: "Fin and Flounder",
    previousPrice: "£18.90/kg",
    currentPrice: "£20.10/kg",
    change: "+6.3%",
  },
];

const recentInvoices = [
  {
    supplier: "Fin and Flounder",
    invoiceNumber: "SI-82760",
    date: "30 Mar 2026",
    total: "£493.63",
    status: "Approved",
  },
  {
    supplier: "Albion Fine Foods",
    invoiceNumber: "INV-10482",
    date: "3 Aug 2026",
    total: "£1,284.60",
    status: "Approved",
  },
  {
    supplier: "Crazy Dan's House of Meat",
    invoiceNumber: "DS-88341",
    date: "2 Aug 2026",
    total: "£746.20",
    status: "Review",
  },
  {
    supplier: "Mexgrocer",
    invoiceNumber: "MX-21983",
    date: "1 Aug 2026",
    total: "£392.40",
    status: "Approved",
  },
];

const foodCostAlerts = [
  {
    dish: "Ribeye",
    foodCost: "34.2%",
    target: "30%",
  },
  {
    dish: "Tuna tostada",
    foodCost: "31.8%",
    target: "29%",
  },
  {
    dish: "Birria tacos",
    foodCost: "29.4%",
    target: "28%",
  },
];

export default function HomePage() {
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
          <Link className="nav-link nav-link-active" href="/">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <Link className="nav-link" href="/invoices">
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

          <Link className="nav-link" href="/menu">
            <span className="nav-icon">☰</span>
            Menu
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
            <p className="eyebrow">Overview</p>

            <h1>Good morning</h1>

            <p className="page-description">
              Here is what is happening with your kitchen costs.
            </p>
          </div>

          <Link className="primary-button" href="/invoices/upload">
            <span aria-hidden="true">＋</span>
            Upload invoice
          </Link>
        </header>

        <section className="stats-grid" aria-label="Summary">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p className="stat-label">{stat.label}</p>

              <p className="stat-value">{stat.value}</p>

              <p className={`stat-change ${stat.tone}`}>
                {stat.change}
              </p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel supplier-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">Purchasing</p>
                <h2>Supplier spend</h2>
              </div>

              <button className="text-button" type="button">
                View report
              </button>
            </div>

            <div className="supplier-list">
              {suppliers.map((supplier) => (
                <div className="supplier-row" key={supplier.name}>
                  <div className="supplier-details">
                    <div>
                      <p className="supplier-name">
                        {supplier.name}
                      </p>

                      <p className="muted-text">
                        {supplier.category}
                      </p>
                    </div>

                    <p className="supplier-spend">
                      {supplier.spend}
                    </p>
                  </div>

                  <div
                    className="progress-track"
                    aria-label={`${supplier.name}: ${supplier.percentage}% of supplier spend`}
                  >
                    <div
                      className="progress-value"
                      style={{
                        width: `${supplier.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel alerts-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Attention needed
                </p>

                <h2>Price increases</h2>
              </div>

              <span className="alert-count">
                {priceAlerts.length}
              </span>
            </div>

            <div className="alert-list">
              {priceAlerts.map((alert) => (
                <div
                  className="price-alert"
                  key={alert.ingredient}
                >
                  <div>
                    <p className="alert-ingredient">
                      {alert.ingredient}
                    </p>

                    <p className="muted-text">
                      {alert.supplier}
                    </p>
                  </div>

                  <div className="price-comparison">
                    <p>
                      <span>{alert.previousPrice}</span>
                      <span aria-hidden="true"> → </span>
                      <strong>{alert.currentPrice}</strong>
                    </p>

                    <span className="increase-badge">
                      {alert.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-grid lower-grid">
          <article className="panel invoices-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Latest activity
                </p>

                <h2>Recent invoices</h2>
              </div>

              <Link
                className="text-button"
                href="/invoices"
              >
                View all
              </Link>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.invoiceNumber}>
                      <td>
                        <strong>{invoice.supplier}</strong>
                      </td>

                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.total}</td>

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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel food-cost-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Menu costing
                </p>

                <h2>Above target</h2>
              </div>
            </div>

            <div className="food-cost-list">
              {foodCostAlerts.map((item) => (
                <div
                  className="food-cost-row"
                  key={item.dish}
                >
                  <div>
                    <p className="food-cost-dish">
                      {item.dish}
                    </p>

                    <p className="muted-text">
                      Target {item.target}
                    </p>
                  </div>

                  <p className="food-cost-value">
                    {item.foodCost}
                  </p>
                </div>
              ))}
            </div>

            <Link
              className="secondary-button"
              href="/menu"
            >
              Review menu costs
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
}