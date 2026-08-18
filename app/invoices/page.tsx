"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Invoice = {
  id?: string;
  supplier?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  total?: number;
  lineItems?: any[];
};



export default function InvoicesPage() {


  const [invoices,setInvoices] = useState<Invoice[]>([]);
  const [loading,setLoading] = useState(true);



  async function loadInvoices(){

    try {

      setLoading(true);


      const response =
        await fetch(
          "/api/invoices",
          {
            cache:"no-store"
          }
        );


      const data =
        await response.json();


      console.log(
        "INVOICE DATA",
        data
      );


      if(Array.isArray(data)){

        setInvoices(data);

      }
      else if(Array.isArray(data.invoices)){

        setInvoices(data.invoices);

      }
      else {

        setInvoices([]);

      }


    }
    catch(error){

      console.error(
        "Loading invoices failed",
        error
      );

      setInvoices([]);

    }
    finally{

      setLoading(false);

    }

  }



  useEffect(()=>{

    loadInvoices();

  },[]);




  const spend =
    invoices.reduce(
      (sum,invoice)=>
        sum + Number(invoice.total || 0),
      0
    );



  const suppliers =
    new Set(
      invoices
      .map(i=>i.supplier)
      .filter(Boolean)
    ).size;



  return (

    <div className="page">


      <div className="page-header">


        <div>

          <p className="eyebrow">
            Purchasing
          </p>


          <h1>
            Invoices
          </h1>


          <p>
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





      <div className="card-grid">


        <div className="stat-card">

          <span>
            Invoices
          </span>


          <strong>
            {invoices.length}
          </strong>

        </div>





        <div className="stat-card">

          <span>
            Recorded spend
          </span>


          <strong>
            £
            {spend.toFixed(2)}
          </strong>

        </div>





        <div className="stat-card">

          <span>
            Suppliers
          </span>


          <strong>
            {suppliers}
          </strong>

        </div>



      </div>







      <div className="card invoice-history">


        <div className="page-header">


          <div>

            <h2>
              Invoice history
            </h2>

          </div>



          <button
            className="secondary-button"
            onClick={loadInvoices}
          >

            Refresh

          </button>


        </div>







        {
          loading &&

          <p>
            Loading invoices...
          </p>

        }







        {
          !loading &&
          invoices.length === 0 &&

          <div
            style={{
              textAlign:"center",
              padding:"50px"
            }}
          >

            <h3>
              No invoices yet
            </h3>


            <p>
              Upload your first supplier invoice.
            </p>


          </div>

        }








        {
          invoices.length > 0 &&

          <table>


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
                  Total
                </th>

              </tr>

            </thead>



            <tbody>


            {
              invoices.map(
                (invoice,index)=>(


                  <tr key={invoice.id || index}>


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
                      {Number(invoice.total || 0).toFixed(2)}

                    </td>


                  </tr>


                )
              )
            }


            </tbody>


          </table>

        }



      </div>



    </div>

  );

}
