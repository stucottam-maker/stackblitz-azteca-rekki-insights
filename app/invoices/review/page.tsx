"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";


type LineItem = {
  product: string;
  quantity: number | null;
  pack: string | null;
  unitPrice: number | null;
  total: number | null;
  status: string | null;
};


type Invoice = {
  supplier: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  lineItems: LineItem[];
};


export default function InvoiceReviewPage() {


  const router = useRouter();


  const [invoices, setInvoices] =
    useState<Invoice[]>([]);


  const [saving, setSaving] =
    useState(false);


  const [error, setError] =
    useState("");





  useEffect(() => {


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



    try {


      const data =
        JSON.parse(stored);



      /*
        New batch format
      */


      if(
        Array.isArray(
          data.invoices
        )
      ){

        setInvoices(
          data.invoices
        );

      }



      /*
        Backwards compatibility
      */


      else {

        setInvoices([
          data
        ]);

      }



    }

    catch(err){

      setError(
        "Could not read invoice data."
      );

    }



  },[router]);







  function money(
    value:number|null
  ){

    if(value === null){
      return "—";
    }


    return new Intl.NumberFormat(
      "en-GB",
      {
        style:"currency",
        currency:"GBP",
      }
    ).format(value);

  }







  async function approveInvoices(){


    setSaving(true);

    setError("");



    try {


      /*
        Temporary save step.

        This keeps the extracted
        invoices ready for Supabase
        insertion.
      */


      sessionStorage.setItem(
        "approvedInvoices",
        JSON.stringify(invoices)
      );



      router.push(
        "/invoices"
      );


    }

    catch(err:any){

      setError(
        err.message ||
        "Could not approve invoices."
      );

    }

    finally{

      setSaving(false);

    }


  }








return (

<main className="app-shell">


<Sidebar active="invoices"/>



<section className="main-content">



<header className="topbar">

<div>

<p className="eyebrow">
Purchasing
</p>


<h1>
Review invoices
</h1>


<p className="page-description">
Check extracted supplier invoices before saving.
</p>


</div>


</header>







{
error && (

<div
className="invoice-error"
>
{error}
</div>

)

}







{
invoices.map(
(invoice,index)=>(


<section
key={index}
className="panel"
style={{
marginBottom:"25px",
}}
>


<div className="panel-header">

<div>

<p className="panel-kicker">
Invoice {index + 1}
</p>


<h2>
{invoice.supplier || "Unknown supplier"}
</h2>


</div>

</div>





<div
className="stats-grid"
>


<div className="stat-card">

<p className="stat-label">
Invoice number
</p>

<p className="stat-value">
{invoice.invoiceNumber || "—"}
</p>

</div>




<div className="stat-card">

<p className="stat-label">
Date
</p>

<p className="stat-value">
{invoice.invoiceDate || "—"}
</p>

</div>





<div className="stat-card">

<p className="stat-label">
Total
</p>

<p className="stat-value">
{money(invoice.total)}
</p>

</div>


</div>







<div className="table-wrapper">


<table
className="invoice-history-table"
>


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
invoice.lineItems.map(
(item,lineIndex)=>(


<tr
key={lineIndex}
>


<td>

<strong>
{item.product}
</strong>

</td>


<td>
{item.pack || "—"}
</td>


<td>
{item.quantity ?? "—"}
</td>


<td>
{money(item.unitPrice)}
</td>


<td>
{money(item.total)}
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
?
"Saving..."
:
`Approve ${invoices.length} invoice${
invoices.length > 1 ? "s" : ""
}`
}


</button>





</section>


</main>


);


}
