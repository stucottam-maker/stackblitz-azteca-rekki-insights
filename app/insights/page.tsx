"use client";

import Link from "next/link";

export default function InsightsPage() {
  return (
    <div className="page">

      <div className="topbar">

        <div>
          <p className="eyebrow">
            Kitchen intelligence
          </p>

          <h1>
            Insights
          </h1>

          <p className="page-description">
            What changed, why it matters, and where to look next.
          </p>
        </div>


        <div>

          <Link
            href="/reports"
            className="secondary-button"
          >
            Reports
          </Link>

          <Link
            href="/invoices/upload"
            className="primary-button"
            style={{
              marginLeft:"10px"
            }}
          >
            Upload invoice
          </Link>

        </div>

      </div>



      <div className="stats-grid">


        <div className="stat-card">

          <p className="stat-label">
            Needs attention
          </p>

          <p className="stat-value">
            3
          </p>

          <p className="stat-change warning">
            High priority
          </p>

        </div>



        <div className="stat-card">

          <p className="stat-label">
            Recorded spend this month
          </p>

          <p className="stat-value">
            £970.71
          </p>

          <p className="stat-change negative">
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

          <p className="stat-change neutral">
            Complete another count
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
            Sales data required
          </p>

        </div>


      </div>





      <div className="dashboard-grid">



        <div className="panel">


          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Current picture
              </p>

              <h2>
                3 high-priority issues need attention
              </h2>

              <p className="muted-text">
                Kitchen Insights has ranked the most significant changes across purchasing, costs, stock and performance.
              </p>

            </div>


          </div>





          <div className="alert-list">


            <div className="price-alert">

              <div>

                <p className="alert-ingredient">
                  Visible financial movement
                </p>

                <p className="muted-text">
                  £1,755.17 recorded supplier movement.
                </p>

              </div>

            </div>




            <div className="price-alert">

              <div>

                <p className="alert-ingredient">
                  Actual food cost
                </p>

                <p className="muted-text">
                  Complete stock counts and sales connection to calculate actual COGS.
                </p>

              </div>

            </div>




            <div className="price-alert">

              <div>

                <p className="alert-ingredient">
                  Theoretical food cost
                </p>

                <p className="muted-text">
                  Menu costing data is required.
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
                What needs attention
              </h2>

            </div>


          </div>





          <div className="food-cost-list">



            <div className="food-cost-row">

              <div>

                <p className="food-cost-dish">
                  Purchasing
                </p>

                <p className="muted-text">
                  Review supplier changes and spend movement.
                </p>

              </div>

            </div>





            <div className="food-cost-row">

              <div>

                <p className="food-cost-dish">
                  Stock
                </p>

                <p className="muted-text">
                  More stock history needed for actual COGS.
                </p>

              </div>

            </div>





            <div className="food-cost-row">

              <div>

                <p className="food-cost-dish">
                  Performance data
                </p>

                <p className="muted-text">
                  Connect sales data for food cost variance.
                </p>

              </div>

            </div>


          </div>


        </div>



      </div>





      <div className="panel" style={{marginTop:"17px"}}>


        <div className="panel-header">

          <div>

            <p className="panel-kicker">
              Supplier analysis
            </p>

            <h2>
              Latest movements
            </h2>

          </div>


        </div>





        <div className="supplier-list">


          <div>

            <div className="supplier-details">

              <span className="supplier-name">
                Masafina
              </span>

              <span className="supplier-spend">
                -£1144.45
              </span>

            </div>

            <p className="muted-text">
              Spend decreased 100% compared with last month.
            </p>

          </div>





          <div>

            <div className="supplier-details">

              <span className="supplier-name">
                Spitalfields Fruit & Veg
              </span>

              <span className="supplier-spend">
                +£301.23
              </span>

            </div>

            <p className="muted-text">
              Spend increased 221.9% compared with last month.
            </p>

          </div>



        </div>



      </div>


    </div>
  );
}
