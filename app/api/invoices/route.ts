import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(request);

    const { data, error } = await serviceSupabase
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
      .eq("organisation_id", organisationId)
      .eq("site_id", siteId)
      .order("invoice_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
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
  } catch (error) {
    console.error("INVOICE LIST FAILED", error);
    const response = authErrorResponse(error);

    return NextResponse.json(
      { error: response.message },
      { status: response.status }
    );
  }
}
