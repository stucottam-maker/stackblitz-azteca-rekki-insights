import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoices = Array.isArray(body)
      ? body
      : body.invoices || [];

    if (!invoices.length) {
      return NextResponse.json(
        {
          error: "No invoices supplied"
        },
        { status: 400 }
      );
    }


    const rows = invoices.map((invoice: any) => ({
      supplier:
        invoice.supplier ||
        "Unknown supplier",

      invoice_number:
        invoice.invoiceNumber ||
        invoice.invoice_number ||
        null,

      invoice_date:
        invoice.invoiceDate ||
        invoice.invoice_date ||
        null,

      subtotal:
        Number(invoice.subtotal) || 0,

      vat:
        Number(invoice.vat) || 0,

      total:
        Number(
          invoice.total ||
          invoice.totalAmount
        ) || 0,

      line_items:
        invoice.lineItems ||
        invoice.items ||
        [],

      created_at:
        new Date().toISOString()
    }));


    console.log(
      "Saving invoices:",
      rows.length
    );


    const { data, error } =
      await supabase
        .from("invoices")
        .insert(rows)
        .select();


    if (error) {
      console.error(
        "SUPABASE SAVE ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message
        },
        {
          status: 500
        }
      );
    }


    return NextResponse.json(
      {
        success: true,
        count: data.length,
        invoices: data
      },
      {
        status: 200
      }
    );


  } catch (error: any) {

    console.error(
      "SAVE ROUTE ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed saving invoices"
      },
      {
        status: 500
      }
    );
  }
}
