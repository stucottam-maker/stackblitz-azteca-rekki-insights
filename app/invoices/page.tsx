"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Sidebar from "../components/Sidebar";
import { supabase } from "../lib/supabase";


type InvoiceRow = {
  id: string;
  invoice_number: string | null;
  invoice_date: string | null;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  status: string;
  approved_at: string | null;
  created_at: string;

  supplier:
    | {
        name: string;
      }
    | null;

  invoice_lines?: {
    id: string;
  }[];
};


function money(
  value: number | null | undefined
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
    }
  ).format(value);
}


function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(value)
  );
}


export default function InvoicesPage() {

  const router = useRouter();

  const [
    invoices,
    setInvoices,
  ] = useState<InvoiceRow[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const loadInvoices =
    useCallback(
      async () => {

        setLoading(true);
        setError("");

        try {

          const {
            data,
            error,
          } =
            await supabase
              .from("invoices")
              .select(`
                id,
                invoice_number,
                invoice_date,
                subtotal,
                vat,
                total,
                status,
                approved_at,
                created_at,

                supplier:suppliers(
                  name
                ),

                invoice_lines(
                  id
                )
              `)
              .order(
                "created_at",
                {
                  ascending:false,
                }
              );


          if (error) {
            throw error;
          }


          setInvoices(
            (data as InvoiceRow[]) ?? []
          );


        } catch(err) {

          console.error(err);

          setError(
            err instanceof Error
              ? err.message
              : "Could not load invoices."
          );

        } finally {

          setLoading(false);

        }

      },
      []
    );


  useEffect(() => {

    void loadInvoices();

  }, [loadInvoices]);



  const totalSpend =
    useMemo(
      () =>
        invoices.reduce(
          (
            total,
            invoice
          ) =>
            total +
            Number(
              invoice.total ?? 0
            ),
          0
        ),
      [invoices]
    );



  const suppliers =
    useMemo(
      () =>
        new Set(
          invoices.map(
            invoice =>
              invoice.supplier?.name
          )
          .filter(Boolean)
        ).size,

      [invoices]
    );



  return (

    <div className="app-shell">


      <Sidebar active="invoices" />


      <main className="main-content">


        <header className="topbar">

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


          <button
            className="primary-button"
            onClick={() =>
              router.push(
                "/invoices/upload"
              )
            }
          >
            + Upload invoice
          </button>


        </header>



        <section className="stats-grid">


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
              {money(totalSpend)}
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


        </section>



        <section className="panel">


          <div className="panel-header">

            <h2>
              Invoice history
            </h2>


            <button
              className="secondary-inline-button"
              onClick={() =>
                void loadInvoices()
              }
            >
              Refresh
            </button>

          </div>



          {error && (

            <p className="invoice-error">
              {error}
            </p>

          )}



          {loading ? (

            <p>
              Loading invoices...
            </p>


          ) : invoices.length === 0 ? (

            <div className="invoice-empty-state">

              <h3>
                No invoices yet
              </h3>

              <p>
                Upload your first supplier invoice.
              </p>

            </div>


          ) : (


            <div className="table-wrapper">


              <table className="invoice-history-table">


                <thead>

                  <tr>

                    <th>
                      Supplier
                    </th>

                    <th>
                      Invoice
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Lines
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


                  {invoices.map(
                    invoice => (

                    <tr
                      key={invoice.id}
                    >

                      <td>
                        {invoice.supplier?.name ??
                          "Unknown"}
                      </td>


                      <td>
                        {invoice.invoice_number ??
                          "—"}
                      </td>


                      <td>
                        {formatDate(
                          invoice.invoice_date
                        )}
                      </td>


                      <td>
                        {
                          invoice.invoice_lines
                            ?.length ?? 0
                        }
                      </td>


                      <td>
                        {money(
                          invoice.total
                        )}
                      </td>


                      <td>
                        {invoice.status}
                      </td>


                    </tr>

                  ))}


                </tbody>


              </table>


            </div>


          )}


        </section>


      </main>


    </div>

  );

}
