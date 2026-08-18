"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function InvoicesPage() {

  const [invoices, setInvoices] = useState<any[]>([]);


  useEffect(() => {

    try {

      const stored =
        localStorage.getItem("invoices");

      if (stored) {

        setInvoices(
          JSON.parse(stored)
        );

      }

    } catch (error) {

      console.error(
        "Loading invoices failed",
        error
      );

    }

  }, []);




  const totalSpend =
    invoices.reduce(
      (sum, invoice) =>
        sum + Number(invoice.total || 0),
      0
    );



  const suppliers =
    new Set(
      invoices.map(
        invoice =>
          invoice.supplier
      )
    ).size;



  return (

    <div className="page">


      <div className="topbar">


        <div>

          <p className="eyebrow">
            Purchasing
          </p>


          <h1>
            Invoices
          </h1>


          <p className="page-description">
            Supplier invoice history and spend tracking.
          </p>

        </div>



        <Link
          href="/invoices/upload"
          className="primary-button"
        >
          + Upload invoice
        </Link>


      </div>





      <div className="stats-grid invoice-stats">


        <div className="stat-card">

          <p className="stat-label">
            Invoices
          </p>

          <p className="stat-value">
            {invoices.length}
          </p>

        </div>




        <div className="stat-card">

          <p className="stat-label">
            Recorded spend
          </p>


          <p className="stat-value">
            £
            {totalSpend.toFixed(2)}
          </p>

        </div>





        <div className="stat-card">

          <p className="stat-label">
            Suppliers
          </p>


          <p className="stat-value">
            {suppliers}
          </p>


        </div>



        <div className="stat-card">

          <p className="stat-label">
            Status
          </p>


          <p className="stat-value">
            —
          </p>


          <p className="stat-change neutral">
            Tracking active
          </p>


        </div>


      </div>





      <div className="panel invoices-page-panel">


        <div className="invoice-toolbar">


          <div>

            <h2>
              Invoice history
            </h2>


          </div>



          <button
            className="secondary-button"
            onClick={() =>
              window.location.reload()
            }
          >
            Refresh
          </button>


        </div>





        {
          invoices.length === 0 ? (

            <div
              className="empty-extraction"
            >

              <p>
                No invoices yet
              </p>

              <span>
                Upload your first supplier invoice.
              </span>


            </div>


          ) : (



            <div className="table-wrapper">


              <table>


                <thead>

                  <tr>

                    <th>
                      Supplier
                    </th>

                    <th>
                      Invoice number
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>


                </thead>



                <tbody>


                {
                  invoices.map(
                    (invoice,index)=>(


                      <tr
                        key={index}
                      >

                        <td>
                          <strong>
                            {invoice.supplier || "Unknown"}
                          </strong>
                        </td>


                        <td>
                          {invoice.invoiceNumber || "-"}
                        </td>


                        <td>
                          {invoice.invoiceDate || "-"}
                        </td>


                        <td>
                          £
                          {invoice.total || "0.00"}
                        </td>


                        <td>

                          <span className="status-badge status-approved">
                            Saved
                          </span>

                        </td>


                      </tr>


                    )
                  )
                }


                </tbody>


              </table>


            </div>


          )

        }


      </div>


    </div>

  );

}
