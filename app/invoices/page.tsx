"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


type Invoice = {
  id: string;
  supplier: string;
  invoice_number?: string | null;
  invoice_date?: string | null;
  subtotal?: number | null;
  vat?: number | null;
  total?: number | null;
  line_items?: any[];
  created_at?: string;
};


export default function InvoicesPage() {

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);


  async function loadInvoices() {

    setLoading(true);

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", {
        ascending: false
      });


    if (error) {
      console.error(
        "Invoice loading error:",
        error
      );
      setInvoices([]);
    } else {
      setInvoices(data || []);
    }

    setLoading(false);
  }


  useEffect(() => {
    loadInvoices();
  }, []);



  const totalSpend =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.total || 0),
      0
    );


  const suppliers =
    Array.from(
      new Set(
        invoices.map(
          invoice =>
            invoice.supplier
        )
      )
    );



  return (

    <main className="page">

      <div className="page-header">

        <div>
          <p className="eyebrow">
            PURCHASING
          </p>

          <h1>
            Invoices
          </h1>

          <p className="subtitle">
            Supplier invoice history and spend tracking.
          </p>
        </div>


        <Link
          href="/invoices/upload"
          className="button"
        >
          + Upload invoice
        </Link>

      </div>



      <section className="stats-grid">

        <div className="card">
          <span>
            Invoices
          </span>

          <strong>
            {invoices.length}
          </strong>
        </div>


        <div className="card">

          <span>
            Recorded spend
          </span>

          <strong>
            £
            {totalSpend.toFixed(2)}
          </strong>

        </div>



        <div className="card">

          <span>
            Suppliers
          </span>

          <strong>
            {suppliers.length}
          </strong>

        </div>

      </section>




      <section className="card invoice-history">

        <div className="section-header">

          <h2>
            Invoice history
          </h2>


          <button
            onClick={loadInvoices}
            className="secondary-button"
          >
            Refresh
          </button>

        </div>



        {loading && (
          <p>
            Loading invoices...
          </p>
        )}



        {!loading &&
          invoices.length === 0 && (

          <div className="empty">

            <h3>
              No invoices yet
            </h3>

            <p>
              Upload your first supplier invoice.
            </p>

          </div>

        )}




        <div className="invoice-list">

          {invoices.map(invoice => (

            <div
              key={invoice.id}
              className="invoice-row"
            >

              <div>

                <h3>
                  {invoice.supplier}
                </h3>


                <p>
                  {invoice.invoice_number ||
                    "No invoice number"}
                </p>


                <p>
                  {invoice.invoice_date ||
                    ""}
                </p>

              </div>



              <div className="invoice-total">

                £
                {Number(
                  invoice.total || 0
                ).toFixed(2)}

              </div>


            </div>

          ))}

        </div>


      </section>


    </main>

  );
}
