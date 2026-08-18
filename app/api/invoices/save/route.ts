import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export const runtime = "nodejs";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);



export async function POST(
  req: Request
) {

  try {


    const body = await req.json();


    const invoices =
      body.invoices || [];


    const organisation_id =
      body.organisation_id;



    if (!invoices.length) {

      return NextResponse.json(
        {
          error:"No invoices supplied"
        },
        {
          status:400
        }
      );

    }



    const rows =
      invoices.map(
        (invoice:any)=>({

          organisation_id,


          supplier:
          invoice.supplier ||
          "Unknown supplier",


          invoice_number:
          invoice.invoiceNumber ||
          null,


          invoice_date:
          invoice.invoiceDate ||
          null,


          subtotal:
          Number(invoice.subtotal || 0),


          vat:
          Number(invoice.vat || 0),


          total:
          Number(invoice.total || 0),


          line_items:
          invoice.lineItems || [],


          created_at:
          new Date().toISOString()

        })
      );




    console.log(
      "INSERTING",
      rows.length,
      "INVOICES"
    );



    const {
      data,
      error
    } =
    await supabase
      .from("invoices")
      .insert(rows)
      .select();



    if(error){

      console.error(
        error
      );


      return NextResponse.json(
        {
          error:error.message
        },
        {
          status:500
        }
      );

    }




    return NextResponse.json(
      {
        success:true,
        saved:data.length,
        invoices:data
      }
    );



  }


  catch(error:any){


    console.error(
      "SAVE ERROR",
      error
    );


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );


  }

}
