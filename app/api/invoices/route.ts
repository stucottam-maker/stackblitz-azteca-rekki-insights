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
        due_date,
        payment_terms,
        payment_status,
        paid_at,
        match_status,
        discrepancy_amount,
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
        dueDate: invoice.due_date,
        paymentTerms: invoice.payment_terms,
        paymentStatus: invoice.payment_status,
        paidAt: invoice.paid_at,
        matchStatus: invoice.match_status,
        discrepancyAmount: invoice.discrepancy_amount,
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

export async function PATCH(request: Request) {
  try {
    const { organisationId, siteId, user } = await requireOrganisation(request);
    const body = await request.json();
    const invoiceId = String(body.invoiceId || "");
    const invoiceStatus = String(body.invoiceStatus || "");
    const paymentStatus = String(body.paymentStatus || "");
    const filePath = typeof body.filePath === "string" ? body.filePath.trim() : "";
    const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
    const allowed = new Set(["unpaid", "scheduled", "paid", "disputed"]);
    const hasAttachmentUpdate = Boolean(filePath || fileName);

    if (
      !invoiceId ||
      (!hasAttachmentUpdate &&
        !allowed.has(paymentStatus) &&
        !["review", "approved"].includes(invoiceStatus))
    ) {
      return NextResponse.json({ error: "Invalid invoice update" }, { status: 400 });
    }

    if (hasAttachmentUpdate) {
      if (!filePath || !fileName) {
        return NextResponse.json(
          { error: "Both filePath and fileName are required" },
          { status: 400 }
        );
      }

      const requiredPrefix = `uploads/${user.id}/`;
      if (!filePath.startsWith(requiredPrefix)) {
        return NextResponse.json(
          { error: "Invoice attachment path is not valid for this user" },
          { status: 400 }
        );
      }

      const { data, error } = await serviceSupabase
        .from("invoices")
        .update({
          file_name: fileName,
          file_path: filePath,
          updated_at: new Date().toISOString(),
        })
        .eq("id", invoiceId)
        .eq("organisation_id", organisationId)
        .eq("site_id", siteId)
        .select("id,file_name,file_path")
        .single();

      if (error) throw error;
      return NextResponse.json({ invoice: data });
    }

    if (["review", "approved"].includes(invoiceStatus)) {
      const { data, error } = await serviceSupabase
        .from("invoices")
        .update({
          status: invoiceStatus,
          approved_by: invoiceStatus === "approved" ? user.id : null,
          approved_at: invoiceStatus === "approved" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", invoiceId)
        .eq("organisation_id", organisationId)
        .eq("site_id", siteId)
        .select("id,status,approved_at")
        .single();
      if (error) throw error;
      return NextResponse.json({ invoice: data });
    }

    const { data, error } = await serviceSupabase
      .from("invoices")
      .update({
        payment_status: paymentStatus,
        paid_at: paymentStatus === "paid" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", invoiceId)
      .eq("organisation_id", organisationId)
      .eq("site_id", siteId)
      .select("id, payment_status, paid_at")
      .single();

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (error) {
    console.error("INVOICE UPDATE FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
