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


    const loadInvoices = () => {


      try {


        const stored =
          sessionStorage.getItem(
            "extractedInvoices"
          );



        console.log(
          "REVIEW STORAGE:",
          stored
        );



        if(!stored){

          setLoading(false);

          return;

        }




        const parsed =
          JSON.parse(stored);





        if(
          Array.isArray(parsed)
        ){

          setInvoices(parsed);

        }


        else if(
          Array.isArray(parsed.invoices)
        ){

          setInvoices(
            parsed.invoices
          );

        }





      }

      catch(error){

        console.error(
          "Review load error",
          error
        );


      }


      setLoading(false);


    };



    loadInvoices();



  },[]);








  async function saveInvoices(){


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
                "application/json"
            },


            body:JSON.stringify({

              invoices

            })

          }
        );







      const raw =
        await response.text();



      let data:any;


      try {

        data =
          JSON.parse(raw);

      }

      catch {

        throw new Error(
          raw ||
          "Invalid server response"
        );

      }





      if(!response.ok){

        throw new Error(
          data.error ||
          "Could not save invoices"
        );

      }






      console.log(
        "SAVE RESULT:",
        data
      );





      setMessage(
        `Saved ${
          data.saved ||
          data.count ||
          invoices.length
        } invoices`
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
        "SAVE FAILED",
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

    return (

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
            Check extracted invoices before adding them to your records.
          </p>


        </div>





        <button

          className="primary-button"

          disabled={
            saving ||
            invoices.length === 0
          }

          onClick={
            saveInvoices
          }

        >

          {
            saving
            ?
            "Saving..."
            :
            `Approve ${invoices.length} invoice${
              invoices.length === 1
              ? ""
              : "s"
            }`
          }


        </button>



      </div>








      {
        message && (

          <div className="notice">

            {message}

          </div>

        )
      }







      {
        invoices.length === 0 && (

          <div className="card">

            <h2>
              No invoices found
            </h2>


            <p>
              Return to upload and extract an invoice.
            </p>


          </div>

        )
      }








      <div className="list">


      {
        invoices.map(
          (invoice,index)=>(


            <div
              key={index}
              className="list-item"
            >



              <div
                style={{
                  display:"flex",
                  justifyContent:"space-between",
                  marginBottom:20
                }}
              >

                <div>

                  <span className="badge">
                    Invoice {index + 1}
                  </span>


                  <h2
                    style={{
                      marginTop:12
                    }}
                  >

                    {
                      invoice.supplier ||
                      "Unknown supplier"
                    }

                  </h2>


                </div>



                <strong>

                  £
                  {
                    Number(
                      invoice.total || 0
                    ).toFixed(2)
                  }

                </strong>


              </div>






              <p>

                Invoice:
                {" "}
                {
                  invoice.invoiceNumber ||
                  "-"
                }

                {" · "}

                {
                  invoice.invoiceDate ||
                  "-"
                }

              </p>









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
                      Unit price
                    </th>

                    <th>
                      Total
                    </th>

                  </tr>

                </thead>





                <tbody>


                {
                  (
                    invoice.lineItems ||
                    []
                  )
                  .map(
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
                          {item.quantity ?? "-"}
                        </td>


                        <td>
                          £
                          {item.unitPrice ?? "-"}
                        </td>


                        <td>
                          £
                          {item.total ?? "-"}
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
