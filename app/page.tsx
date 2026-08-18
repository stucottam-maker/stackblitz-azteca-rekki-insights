"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="page">

      <div className="topbar">
        <div>
          <p className="eyebrow">
            Kitchen Insights
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="page-description">
            A live view of cost, purchasing, stock and operational risk.
          </p>
        </div>

        <div>
          <Link
            href="/insights"
            className="secondary-button"
          >
            View insights
          </Link>

          <Link
            href="/invoices/upload"
            className="primary-button"
            style={{
              marginLeft: "10px"
            }}
          >
            Upload invoice
          </Link>
        </div>
      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <p className="stat-label">
            Spend this month
          </p>

          <p className="stat-value">
            £970.71
          </p>

          <p className="stat-change neutral">
            24.2% below last month
          </p>
        </div>


        <div className="stat-card">
          <p className="stat-label">
            Latest stock value
          </p>

          <p className="stat-value">
            —
          </p>

          <p className="stat-change warning">
            Complete another stock count
          </p>
        </div>


        <div className="stat-card">
          <p className="stat-label">
            Actual COGS
          </p>

          <p className="stat-value">
            —
          </p>

          <p className="stat-change neutral">
            Sales data needed
          </p>
        </div>


        <div className="stat-card">
          <p className="stat-label">
            Food cost variance
          </p>

          <p className="stat-value">
            —
          </p>

          <p className="stat-change warning">
            Theoretical costing not available
          </p>
        </div>

      </div>



      <div className="dashboard-grid">


        <div className="panel">

          <div className="panel-header">

            <div>
              <p className="panel-kicker">
                Needs attention
              </p>

              <h2>
                3 high-priority issues
              </h2>

              <p className="muted-text">
                Kitchen Insights has identified operational changes worth reviewing.
              </p>
            </div>


            <Link
              href="/insights"
              className="text-button"
            >
              Open insights →
            </Link>

          </div>



          <div className="alert-list">

            <div className="price-alert">

              <div>
                <p className="alert-ingredient">
                  Purchasing
                </p>

                <p className="muted-text">
                  Review supplier movement and recent invoice changes.
                </p>
              </div>

            </div>


            <div className="price-alert">

              <div>
                <p className="alert-ingredient">
                  Stock control
                </p>

                <p className="muted-text">
                  Complete another stock count to calculate movement.
                </p>
              </div>

            </div>


            <div className="price-alert">

              <div>
                <p className="alert-ingredient">
                  Food cost
                </p>

                <p className="muted-text">
                  Connect sales data for variance reporting.
                </p>
              </div>

            </div>

          </div>


        </div>




        <div className="panel">

          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Prioritised
              </p>

              <h2>
                Latest insights
              </h2>

            </div>


            <Link
              href="/insights"
              className="text-button"
            >
              View all
            </Link>

          </div>



          <div className="food-cost-list">


            <div className="food-cost-row">

              <div>
                <p className="food-cost-dish">
                  Masafina spend decreased
                </p>

                <p className="muted-text">
                  This month £0.00 recorded compared with previous spend.
                </p>
              </div>

            </div>



            <div className="food-cost-row">

              <div>
                <p className="food-cost-dish">
                  Purchasing activity
                </p>

                <p className="muted-text">
                  Supplier spend is currently being tracked.
                </p>
              </div>

            </div>



          </div>

        </div>


      </div>



      <div className="lower-grid dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Purchasing
              </p>

              <h2>
                Supplier spend
              </h2>

            </div>

          </div>


          <div className="supplier-list">

            <div>

              <div className="supplier-details">

                <span className="supplier-name">
                  Current suppliers
                </span>

                <span className="supplier-spend">
                  —
                </span>

              </div>

              <div className="progress-track">
                <div
                  className="progress-value"
                  style={{
                    width:"0%"
                  }}
                />
              </div>

            </div>

          </div>

        </div>



        <div className="panel">

          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Status
              </p>

              <h2>
                System overview
              </h2>

            </div>

          </div>


          <p className="muted-text">
            Invoice extraction, stock and costing modules are connected.
          </p>


        </div>


      </div>


    </div>
  );
}
