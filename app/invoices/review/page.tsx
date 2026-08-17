"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Sidebar from "../../components/Sidebar";


type LineItem = {
  product:string;
  quantity:number|null;
  pack:string|null;
  unitPrice:number|null;
  total:number|null;
  status:string|null;
};


type Invoice = {

  supplier:string|null;

  invoiceNumber:string|null;

  invoiceDate:string|null;

  subtotal:number|null;

  vat:number|null;

  total:number|null;

  lineItems:LineItem[];

};



export default function InvoiceReviewPage(){

  const router = useRouter();


  const [invoices,setInvoices] =
    useState<Invoice[]>([]);


  const [saving,setSaving] =
    useState(false);


  const [error,setError] =
    useState("");



  useEffect(()=>{

    const stored =
      sessionStorage.getItem(
        "invoiceExtraction"
      );


    if(!stored){

      router.push(
        "/invoices/upload"
      );

      return;

    }


    const parsed =
      JSON.parse(stored);



    if(
      Array.isArray(parsed.invoices)
    ){

      setInvoices(
        parsed.invoices
      );

    }


  },[router]);




  function updateInvoice(
    index:number,
    field:keyof Invoice,
    value:any
  ){

    setInvoices(prev=>{

      const copy =
        [...prev];

      copy[index] = {

        ...copy[index],

        [field]:
          value,

      };


      return copy;

    });

  }




  async function approveInvoices(){


    setSaving(true);
    setError("");



    try{


      const response =
        await fetch(
          "/api/invoices/save",
          {

            method:
              "POST",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                invoices,
              }),

          }
        );



      const result =
        await response.json();



      if(!response.ok){

        throw new Error(
          result.error ||
          "Could not save invoices."
        );

      }



      sessionStorage.removeItem(
        "invoiceExtraction"
      );


      router.push(
        "/invoices"
      );



    }
    catch(err:any){

      setError(
        err.message
      );

    }
    finally{

      setSaving(false);

    }

  }





  return (

    <div className="app-shell">

      <Sidebar active="invoices"/>


      <main className="main-content">


        <header className="topbar">

          <div>

            <p className="eyebrow">
              Purchasing
            </p>


            <h1>
              Review invoices
            </h1>


            <p className="page-description">
              Check extracted invoices before saving them.
            </p>

          </div>

        </header>





        {
          invoices.map(
            (invoice,index)=>(


              <section
                key={index}
                className="panel"
              >


                <div className="panel-header">

                  <div>

                    <p className="panel-kicker">
                      Invoice {index+1}
                    </p>


                    <h2>
                      {invoice.supplier ||
                      "Unknown supplier"}
                    </h2>

                  </div>

                </div>





                <div className="form-grid">


                  <label>

                    Supplier

                    <input

                      value={
                        invoice.supplier ?? ""
                      }

                      onChange={
                        e=>
                          updateInvoice(
                            index,
                            "supplier",
                            e.target.value
                          )
                      }

                    />

                  </label>




                  <label>

                    Invoice number

                    <input

                      value={
                        invoice.invoiceNumber ?? ""
                      }

                      onChange={
                        e=>
                          updateInvoice(
                            index,
                            "invoiceNumber",
                            e.target.value
                          )
                      }

                    />

                  </label>




                  <label>

                    Date

                    <input

                      value={
                        invoice.invoiceDate ?? ""
                      }

                      onChange={
                        e=>
                          updateInvoice(
                            index,
                            "invoiceDate",
                            e.target.value
                          )
                      }

                    />

                  </label>




                  <label>

                    Total

                    <input

                      value={
                        invoice.total ?? ""
                      }

                      onChange={
                        e=>
                          updateInvoice(
                            index,
                            "total",
                            Number(e.target.value)
                          )
                      }

                    />

                  </label>


                </div>





                <h3>
                  Line items ({invoice.lineItems.length})
                </h3>



                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>

                        <th>
                          Product
                        </th>

                        <th>
                          Qty
                        </th>

                        <th>
                          Pack
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
                      invoice.lineItems.map(
                        (item,lineIndex)=>(

                          <tr
                            key={lineIndex}
                          >

                            <td>
                              {item.product}
                            </td>

                            <td>
                              {item.quantity ?? "-"}
                            </td>

                            <td>
                              {item.pack ?? "-"}
                            </td>

                            <td>
                              £{item.unitPrice ?? "-"}
                            </td>

                            <td>
                              £{item.total ?? "-"}
                            </td>


                          </tr>

                        )
                      )
                    }


                    </tbody>


                  </table>

                </div>


              </section>


            )

          )
        }





        {
          error &&

          <div className="invoice-error">

            {error}

          </div>

        }





        <button

          className="primary-button"

          disabled={
            saving ||
            invoices.length===0
          }

          onClick={
            approveInvoices
          }

        >

          {
            saving
            ? "Saving..."
            : `Approve ${invoices.length} invoice${invoices.length > 1 ? "s" : ""}`
          }

        </button>



      </main>

    </div>

  );

}
