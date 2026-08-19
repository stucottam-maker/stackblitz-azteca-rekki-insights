import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";

function normaliseName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function toNumberOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normaliseInvoiceNumber(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export async function POST(req: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(req);
    const body = await req.json();
    const invoices = Array.isArray(body.invoices) ? body.invoices : [];
    const source = body.source && typeof body.source === "object" ? body.source : null;

    if (invoices.length === 0) {
      return NextResponse.json({ error: "No invoices supplied" }, { status: 400 });
    }

    const { data: supplierRows, error: supplierError } = await serviceSupabase
      .from("suppliers")
      .select("id, name")
      .eq("organisation_id", organisationId);

    if (supplierError) throw supplierError;

    const supplierMap = new Map<string, { id: string; name: string }>();
    for (const supplier of supplierRows || []) {
      supplierMap.set(normaliseName(supplier.name), supplier);
    }

    const savedInvoices: any[] = [];
    let skipped = 0;

    for (const invoice of invoices) {
      const supplierName = String(invoice.supplier || "Unknown supplier").trim();
      const supplierKey = normaliseName(supplierName);
      let supplier = supplierMap.get(supplierKey);

      if (!supplier) {
        const { data: createdSupplier, error: createSupplierError } =
          await serviceSupabase
            .from("suppliers")
            .insert({ organisation_id: organisationId, name: supplierName })
            .select("id, name")
            .single();

        if (createSupplierError || !createdSupplier) {
          throw new Error(
            createSupplierError?.message || `Could not create supplier ${supplierName}`
          );
        }

        supplier = createdSupplier;
        supplierMap.set(supplierKey, createdSupplier);
      }

      const invoiceNumber = String(invoice.invoiceNumber || "").trim() || null;

      if (invoiceNumber) {
        const { data: existing, error: existingError } = await serviceSupabase
          .from("invoices")
          .select("id, invoice_number")
          .eq("organisation_id", organisationId)
          .eq("site_id", siteId)
          .eq("supplier_id", supplier.id)
          .limit(1000);

        if (existingError) throw existingError;

        const invoiceKey = normaliseInvoiceNumber(invoiceNumber);
        if (
          existing?.some(
            (row) => normaliseInvoiceNumber(row.invoice_number) === invoiceKey
          )
        ) {
          skipped += 1;
          continue;
        }
      }

      const { data: savedInvoice, error: invoiceError } = await serviceSupabase
        .from("invoices")
        .insert({
          organisation_id: organisationId,
          site_id: siteId,
          supplier_id: supplier.id,
          invoice_number: invoiceNumber,
          invoice_date: invoice.invoiceDate || null,
          subtotal: toNumberOrNull(invoice.subtotal),
          vat: toNumberOrNull(invoice.vat),
          total: toNumberOrNull(invoice.total),
          file_name: typeof source?.fileName === "string" ? source.fileName : null,
          file_path: typeof source?.filePath === "string" ? source.filePath : null,
          status: "approved",
          approved_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (invoiceError || !savedInvoice) {
        throw new Error(invoiceError?.message || "Could not save invoice");
      }

      const lineItems = Array.isArray(invoice.lineItems) ? invoice.lineItems : [];

      if (lineItems.length > 0) {
        const lineRows = lineItems.map((item: any) => ({
          invoice_id: savedInvoice.id,
          product_name:
            item.product || item.productName || item.description || "Unknown product",
          quantity: toNumberOrNull(item.quantity),
          pack: item.pack || item.unit || null,
          unit_price: toNumberOrNull(item.unitPrice),
          line_total: toNumberOrNull(item.total),
          price_unit: item.priceUnit || null,
        }));

        const { error: lineError } = await serviceSupabase
          .from("invoice_lines")
          .insert(lineRows);

        if (lineError) {
          await serviceSupabase.from("invoices").delete().eq("id", savedInvoice.id);
          throw lineError;
        }
      }

      savedInvoices.push(savedInvoice);
    }

    return NextResponse.json({
      success: true,
      saved: savedInvoices.length,
      skipped,
      invoices: savedInvoices,
    });
  } catch (error) {
    console.error("SAVE ERROR", error);
    const response = authErrorResponse(error);

    return NextResponse.json(
      { error: response.message },
      { status: response.status }
    );
  }
}
