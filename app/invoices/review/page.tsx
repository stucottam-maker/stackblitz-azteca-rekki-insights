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
  status?: string | null;
};


type Invoice = {
  supplier?: string | null;
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  subtotal?: number | null;
  vat?: number | null;
  total?: number | null;
  lineItems: LineItem[];
};



export default function InvoiceReviewPage() {


  const router = useRouter();


  const [invoices, setInvoices] =
    useState<Invoice[]>([]);


  const [error, setError] =
    useState("");



  const [saving, setSaving] =
    useState(false);





  useEffect(() => {


    const stored =
      sessionStorage.getItem(
        "invoiceExtraction"
      );


    console.log(
      "REVIEW DATA:",
      stored
    );



    if(!stored){

      setError(
        "No invoice extraction found."
      );

      return;

    }




    try {


      const data =
        JSON.parse(stored);



      let extracted: Invoice[] = [];





      // New batch format

      if(
        Array.isArray(
          data.invoices
        )
      ){

        extracted =
          data.invoices;

      }





      // If API returned array directly

      else if(
        Array.isArray(data)
      ){

        extracted =
          data;

      }





      // Old single invoice format

      else if(
        data.supplier ||
        data.lineItems
      ){

        extracted =
          [
            data
          ];

      }





      extracted =
        extracted.map(
          (invoice)=>({

            ...invoice,

            lineItems:
              Array.isArray(
                invoice.lineItems
              )
              ?
              invoice.lineItems
              :
              [],

          })
        );




      console.log(
        "NORMALISED INVOICES:",
        extracted
      );



      setInvoices(
        extracted
      );



    }

    catch(err){

      console.error(
        err
      );

      setError(
        "Could not read invoice extraction."
      );

    }



  },[]);







  function money(
    value:number|null|undefined
  ){

    if(
      value === null ||
      value === undefined
    ){

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







  async function approve(){


    setSaving(true);


    try {


      /*
        Temporary storage.
        Next step:
        connect to Supabase invoices table.
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
Check extracted supplier invoices before approval.
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
invoices.length === 0
?

<div className="panel">

<h2>
No invoices found
</h2>

<p>
The extraction completed but no invoice records were returned.
</p>

</div>


:


invoices.map(
(invoice,index)=>(


<section
className="panel"
key={index}
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
{
invoice.supplier ||
"Unknown supplier"
}
</h2>

</div>


</div>






<div className="stats-grid">


<div className="stat-card">

<p className="stat-label">
Invoice number
</p>

<p className="stat-value">
{
invoice.invoiceNumber ||
"—"
}
</p>

</div>




<div className="stat-card">

<p className="stat-label">
Date
</p>

<p className="stat-value">
{
invoice.invoiceDate ||
"—"
}
</p>

</div>




<div className="stat-card">

<p className="stat-label">
Total
</p>

<p className="stat-value">
{
money(invoice.total)
}
</p>

</div>


</div>







<div className="table-wrapper">


<table className="invoice-history-table">


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
Unit
</th>

<th>
Total
</th>

</tr>

</thead>




<tbody>


{
invoice.lineItems.map(
(item,line)=>(


<tr
key={line}
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







{
invoices.length > 0 && (

<button

className="primary-button"

disabled={saving}

onClick={approve}

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

)

}




</section>


</main>

);

}
