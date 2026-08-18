import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const invoices = Array.isArray(body.invoices) ? body.invoices : [];

    if (invoices.length === 0) {
      return NextResponse.json(
        { error: "No invoices supplied" },
        { status: 400 }
      );
    }

    let organisationId = body.organisation_id || null;
    let siteId = body.site_id || null;

    if (!organisationId || !siteId) {
      const { data: site, error: siteError } = await supabase
        .from("sites")
        .select("id, organisation_id")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (siteError || !site) {
        throw new Error(siteError?.message || "No site is configured");
      }

      organisationId = organisationId || site.organisation_id;
      siteId = siteId || site.id;
    }

    const { data: supplierRows, error: supplierError } = await supabase
      .from("suppliers")
      .select("id, name")
      .eq("organisation_id", organisationId);

    if (supplierError) {
      throw new Error(supplierError.message);
    }

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
        const { data: createdSupplier, error: createSupplierError } = await supabase
          .from("suppliers")
          .insert({
            organisation_id: organisationId,
            name: supplierName,
          })
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

      const invoiceNumber = invoice.invoiceNumber || null;

      if (invoiceNumber) {
        const { data: existing, error: existingError } = await supabase
          .from("invoices")
          .select("id")
          .eq("site_id", siteId)
          .eq("supplier_id", supplier.id)
          .eq("invoice_number", invoiceNumber)
          .limit(1);

        if (existingError) {
          throw new Error(existingError.message);
        }

        if (existing && existing.length > 0) {
          skipped += 1;
          continue;
        }
      }

      const { data: savedInvoice, error: invoiceError } = await supabase
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
            item.product ||
            item.productName ||
            item.description ||
            "Unknown product",
          quantity: toNumberOrNull(item.quantity),
          pack: item.pack || item.unit || null,
          unit_price: toNumberOrNull(item.unitPrice),
          line_total: toNumberOrNull(item.total),
          price_unit: item.priceUnit || null,
        }));

        const { error: lineError } = await supabase
          .from("invoice_lines")
          .insert(lineRows);

        if (lineError) {
          console.error("INVOICE LINE SAVE ERROR", lineError);
          throw new Error(lineError.message);
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
  } catch (error: any) {
    console.error("SAVE ERROR", error);

    return NextResponse.json(
      { error: error.message || "Could not save invoices" },
      { status: 500 }
    );
  }
}
