import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export const runtime = "nodejs";



const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!

);






export async function POST(
  request: Request
) {


  try {


    const body =
      await request.json();



    const {
      invoices,
      organisation_id,
    } = body;




    if(
      !Array.isArray(invoices) ||
      invoices.length === 0
    ){

      return NextResponse.json(
        {
          error:
          "No invoices supplied"
        },
        {
          status:400
        }
      );

    }







    const savedInvoices:any[] = [];







    for(
      const invoice of invoices
    ){



      /*
        1. Create / find supplier
      */


      let supplierId = null;



      if(invoice.supplier){


        const {
          data: existingSupplier
        } =
        await supabase
          .from("suppliers")
          .select("id")
          .eq(
            "name",
            invoice.supplier
          )
          .eq(
            "organisation_id",
            organisation_id
          )
          .maybeSingle();




        if(existingSupplier){


          supplierId =
            existingSupplier.id;



        } else {



          const {
            data:newSupplier,
            error:supplierError

          } =
          await supabase
          .from("suppliers")
          .insert({

            name:
              invoice.supplier,

            organisation_id,

          })
          .select()
          .single();



          if(supplierError)
            throw supplierError;



          supplierId =
            newSupplier.id;


        }


      }








      /*
        2. Save invoice header
      */


      const {
        data:savedInvoice,
        error:invoiceError

      } =
      await supabase
      .from("invoices")
      .insert({

        supplier_id:
          supplierId,


        supplier:
          invoice.supplier,


        invoice_number:
          invoice.invoiceNumber,


        invoice_date:
          invoice.invoiceDate,


        subtotal:
          invoice.subtotal,


        vat:
          invoice.vat,


        total:
          invoice.total,


        organisation_id,


        status:
          "approved",

      })
      .select()
      .single();




      if(invoiceError)
        throw invoiceError;








      /*
        3. Save invoice lines
      */


      if(
        Array.isArray(
          invoice.lineItems
        )
      ){


        const lines =
        invoice.lineItems.map(
          (item:any)=>({

            invoice_id:
              savedInvoice.id,


            product:
              item.product,


            quantity:
              item.quantity,


            pack:
              item.pack,


            unit_price:
              item.unitPrice,


            total:
              item.total,


            organisation_id,

          })
        );




        const {
          error:lineError

        } =
        await supabase
        .from("invoice_lines")
        .insert(lines);



        if(lineError)
          throw lineError;


      }





      savedInvoices.push(
        savedInvoice
      );



    }








    return NextResponse.json({

      success:true,

      saved:
        savedInvoices.length,

      invoices:
        savedInvoices,

    });





  }


  catch(error:any){


    console.error(
      "SAVE INVOICE ERROR:",
      error
    );



    return NextResponse.json(

      {

        error:
          "Could not save invoices",

        details:
          error.message,

      },

      {
        status:500
      }

    );


  }


}
