import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .select(`
        id,
        invoice_number,
        invoice_date,
        subtotal,
        vat,
        total,
        status,
        created_at,
        suppliers (
          name
        )
      `)
      .order("invoice_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("INVOICE LIST ERROR", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const invoices = (data || []).map((invoice: any) => {
      const supplierRelation = invoice.suppliers;
      const supplier = Array.isArray(supplierRelation)
        ? supplierRelation[0]?.name
        : supplierRelation?.name;

      return {
        id: invoice.id,
        supplier: supplier || "Unknown supplier",
        invoiceNumber: invoice.invoice_number,
        invoiceDate: invoice.invoice_date,
        subtotal: invoice.subtotal,
        vat: invoice.vat,
        total: invoice.total,
        status: invoice.status,
        createdAt: invoice.created_at,
      };
    });

    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error("INVOICE LIST FAILED", error);

    return NextResponse.json(
      { error: error.message || "Could not load invoices" },
      { status: 500 }
    );
  }
}
