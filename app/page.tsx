import Link from "next/link";
import Sidebar from "./components/Sidebar";

const supplierSpend = [
  {
    supplier: "Albion Fine Foods",
    category: "Foodservice",
    spend: 6840,
    width: 38,
  },
  {
    supplier: "Fin and Flounder",
    category: "Fish",
    spend: 3260,
    width: 21,
  },
  {
    supplier: "Crazy Dan's House of Meat",
    category: "Meat",
    spend: 2970,
    width: 16,
  },
  {
    supplier: "Mexgrocer",
    category: "Dry goods",
    spend: 2140,
    width: 12,
  },
];

const priceIncreases = [
  {
    ingredient: "Ribeye",
    supplier: "Crazy Dan's House of Meat",
    oldPrice: "£16.20/kg",
    newPrice: "£17.50/kg",
    increase: "+8.0%",
  },
  {
    ingredient: "Short rib",
    supplier: "Crazy Dan's House of Meat",
    oldPrice: "£9.10/kg",
    newPrice: "£9.85/kg",
    increase: "+8.2%",
  },
  {
    ingredient: "Tuna loin",
    supplier: "Fin and Flounder",
    oldPrice: "£18.90/kg",
    newPrice: "£20.10/kg",
    increase: "+6.3%",
  },
];

const recentActivity = [
  {
    title: "Fin and Flounder invoice reviewed",
    detail: "5 products extracted and matched",
    time: "Today",
  },
  {
    title: "Stock take updated",
    detail: "Latest BOH quantities saved",
    time: "Yesterday",
  },
  {
    title: "Recipe costing updated",
    detail: "Ingredient prices available for costing",
    time: "2 days ago",
  },
];

const menuCosting = [
  {
    item: "Miso Black Cod",
    cost: "31.8%",
    target: "28%",
  },
  {
    item: "Ribeye Steak 300g",
    cost: "30.6%",
    target: "28%",
  },
  {
    item: "Pork Carnitas",
    cost: "29.4%",
    target: "28%",
  },
];

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage() {
  return (
    <main className="app-shell">
      <Sidebar active="dashboard" />

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Overview
            </p>

            <h1>
              Insights
            </h1>

            <p className="page-description">
              Here is what is happening with your kitchen costs.
            </p>
          </div>

          <Link
            className="primary-button"
            href="/invoices/upload"
          >
            + Upload invoice
          </Link>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Spend this month
            </p>

            <p className="stat-value">
              £18,420
            </p>

            <p className="stat-change warning">
              +4.2% vs last month
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Average food cost
            </p>

            <p className="stat-value">
              28.6%
            </p>

            <p className="stat-change neutral">
              Target: 27%
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Invoices processed
            </p>

            <p className="stat-value">
              47
            </p>

            <p className="stat-change neutral">
              3 awaiting review
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Price increases
            </p>

            <p className="stat-value">
              14
            </p>

            <p className="stat-change warning">
              In the last 30 days
            </p>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Purchasing
                </p>

                <h2>
                  Supplier spend
                </h2>
              </div>

              <Link
                className="panel-link"
                href="/orders"
              >
                View orders
              </Link>
            </div>

            <div className="supplier-spend-list">
              {supplierSpend.map((supplier) => (
                <div
                  className="supplier-spend-row"
                  key={supplier.supplier}
                >
                  <div className="supplier-spend-heading">
                    <div>
                      <p className="supplier-name">
                        {supplier.supplier}
                      </p>

                      <p className="muted-text">
                        {supplier.category}
                      </p>
                    </div>

                    <strong>
                      {money(supplier.spend)}
                    </strong>
                  </div>

                  <div className="spend-progress">
                    <div
                      className="spend-progress-fill"
                      style={{
                        width: `${supplier.width}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Attention needed
                </p>

                <h2>
                  Price increases
                </h2>
              </div>

              <span className="alert-count">
                {priceIncreases.length}
              </span>
            </div>

            <div className="price-alert-list">
              {priceIncreases.map((item) => (
                <div
                  className="price-alert-row"
                  key={item.ingredient}
                >
                  <div>
                    <p className="price-alert-name">
                      {item.ingredient}
                    </p>

                    <p className="muted-text">
                      {item.supplier}
                    </p>
                  </div>

                  <div className="price-alert-value">
                    <div>
                      <span>
                        {item.oldPrice}
                      </span>

                      <span>
                        →
                      </span>

                      <strong>
                        {item.newPrice}
                      </strong>
                    </div>

                    <span className="increase-badge">
                      {item.increase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-grid dashboard-lower-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Latest activity
                </p>

                <h2>
                  Recent updates
                </h2>
              </div>

              <Link
                className="panel-link"
                href="/invoices"
              >
                View all
              </Link>
            </div>

            <div className="activity-list">
              {recentActivity.map((item) => (
                <div
                  className="activity-row"
                  key={item.title}
                >
                  <div className="activity-dot" />

                  <div className="activity-content">
                    <p className="activity-title">
                      {item.title}
                    </p>

                    <p className="muted-text">
                      {item.detail}
                    </p>
                  </div>

                  <span className="activity-time">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Menu costing
                </p>

                <h2>
                  Above target
                </h2>
              </div>

              <Link
                className="panel-link"
                href="/menu"
              >
                View menu
              </Link>
            </div>

            <div className="menu-cost-list">
              {menuCosting.map((item) => (
                <div
                  className="menu-cost-row"
                  key={item.item}
                >
                  <div>
                    <p className="menu-cost-name">
                      {item.item}
                    </p>

                    <p className="muted-text">
                      Target {item.target}
                    </p>
                  </div>

                  <strong className="menu-cost-value">
                    {item.cost}
                  </strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-quick-actions">
          <Link
            className="quick-action-card"
            href="/orders"
          >
            <span className="quick-action-icon">
              +
            </span>

            <div>
              <strong>
                Create supplier order
              </strong>

              <p>
                Build orders from stock and par levels.
              </p>
            </div>
          </Link>

          <Link
            className="quick-action-card"
            href="/stock"
          >
            <span className="quick-action-icon">
              □
            </span>

            <div>
              <strong>
                Start stock count
              </strong>

              <p>
                Count current BOH inventory.
              </p>
            </div>
          </Link>

          <Link
            className="quick-action-card"
            href="/recipes"
          >
            <span className="quick-action-icon">
              ◇
            </span>

            <div>
              <strong>
                Review recipes
              </strong>

              <p>
                Check recipe costs and missing prices.
              </p>
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}