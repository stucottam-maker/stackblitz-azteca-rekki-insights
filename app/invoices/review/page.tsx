"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function InvoiceReviewPage() {


  const router = useRouter();


  const [invoices,setInvoices] =
    useState<any[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [message,setMessage] =
    useState("");





  useEffect(()=>{


    try {


      const stored =
        sessionStorage.getItem(
          "extractedInvoices"
        );


      if(stored){

        const parsed =
          JSON.parse(stored);


        console.log(
          "REVIEW DATA:",
          parsed
        );



        if(
          Array.isArray(parsed)
        ){

          setInvoices(parsed);

        }

        else if(
          Array.isArray(
            parsed.invoices
          )
        ){

          setInvoices(
            parsed.invoices
          );

        }

      }



    }

    catch(error){

      console.error(
        "Loading review failed",
        error
      );

    }


    setLoading(false);


  },[]);








  async function approveInvoices(){


    try {


      setSaving(true);

      setMessage("");



      const response =
        await fetch(
          "/api/invoices/save",
          {

            method:"POST",

            headers:{
              "Content-Type":
                "application/json",
            },


            body:
              JSON.stringify({

                invoices,

                /*
                  temporary
                  replace with real
                  organisation id
                  once auth is connected
                */

                organisation_id:
                  "00000000-0000-0000-0000-000000000000"


              })

          }
        );





      const data =
        await response.json();




      if(!response.ok){

        throw new Error(
          data.error ||
          "Failed saving invoices"
        );

      }





      console.log(
        "SAVED:",
        data
      );



      setMessage(
        `Saved ${data.saved} invoices successfully`
      );



      sessionStorage.removeItem(
        "extractedInvoices"
      );



      setTimeout(()=>{

        router.push(
          "/invoices"
        );

      },1200);




    }


    catch(error:any){


      console.error(
        error
      );


      setMessage(
        error.message
      );


    }


    finally{

      setSaving(false);

    }


  }








  if(loading){

    return(

      <div className="page">

        Loading invoices...

      </div>

    );

  }






  return (

    <div className="page">


      <div className="page-header">

        <div>

          <p className="eyebrow">
            Purchasing
          </p>


          <h1>
            Review invoices
          </h1>


          <p>
            Check extracted supplier invoices before approval.
          </p>

        </div>



        <button

          onClick={
            approveInvoices
          }

          disabled={
            saving ||
            invoices.length===0
          }

          className="primary-button"

        >

          {saving
            ? "Saving..."
            : `Approve ${invoices.length} invoices`
          }


        </button>


      </div>







      {
        message &&

        <div className="notice">

          {message}

        </div>

      }









      {
        invoices.length===0 &&


        <div className="card">

          <h2>
            No invoices found
          </h2>

          <p>
            Upload and extract invoices first.
          </p>


        </div>


      }










      <div className="invoice-list">


      {
        invoices.map(
          (invoice,index)=>(


          <div
            key={index}
            className="card"
          >


            <div className="invoice-title">

              <span className="badge">

                INVOICE {index+1}

              </span>


              <h2>

                {
                  invoice.supplier ||
                  "Unknown supplier"
                }

              </h2>


            </div>







            <div className="invoice-meta">


              <div>

                <small>
                  Invoice number
                </small>

                <strong>

                  {
                    invoice.invoiceNumber ||
                    "-"
                  }

                </strong>

              </div>





              <div>

                <small>
                  Date
                </small>


                <strong>

                  {
                    invoice.invoiceDate ||
                    "-"
                  }

                </strong>


              </div>






              <div>

                <small>
                  Total
                </small>


                <strong>

                  £
                  {
                    invoice.total ||
                    0
                  }


                </strong>


              </div>



            </div>









            <table>


              <thead>

                <tr>

                  <th>
                    Product
                  </th>


                  <th>
                    Pack
                  </th>


                  <th>
                    Qty
                  </th>


                  <th>
                    Price
                  </th>


                  <th>
                    Total
                  </th>


                </tr>

              </thead>




              <tbody>


              {
                invoice.lineItems?.map(
                  (
                    item:any,
                    i:number
                  )=>(


                  <tr key={i}>


                    <td>
                      {item.product}
                    </td>


                    <td>
                      {item.pack || "-"}
                    </td>


                    <td>
                      {item.quantity || "-"}
                    </td>


                    <td>
                      £
                      {item.unitPrice || "-"}
                    </td>


                    <td>
                      £
                      {item.total || "-"}
                    </td>


                  </tr>


                  )

                )

              }


              </tbody>



            </table>



          </div>


          )

        )

      }


      </div>


    </div>

  );


}
