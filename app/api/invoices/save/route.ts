import { NextResponse } from "next/server";

import { matchInvoiceToPurchaseOrder } from "../../../lib/orderMatching";
import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";

function normaliseName(value: string) {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function toNumberOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normaliseInvoiceNumber(value: unknown) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function defaultDueDate(invoiceDate: unknown) {
  if (typeof invoiceDate !== "string" || !invoiceDate) return null;
  const date = new Date(`${invoiceDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}

function sourceFiles(source: Record<string, unknown> | null) {
  if (!source || !Array.isArray(source.files)) return [];
  return source.files.flatMap((value) => {
    if (!value || typeof value !== "object") return [];
    const file = value as Record<string, unknown>;
    const filePath = typeof file.filePath === "string" ? file.filePath : "";
    if (!filePath) return [];
    return [{
      fileName: typeof file.fileName === "string" ? file.fileName : "",
      fileType: typeof file.fileType === "string" ? file.fileType : "",
      filePath,
    }];
  });
}

function sourceFileName(source: Record<string, unknown> | null) {
  const files = sourceFiles(source);
  if (files.length > 1) return `${files.length} camera photos`;
  if (files.length === 1 && files[0].fileName) return files[0].fileName;
  return typeof source?.fileName === "string" ? source.fileName : null;
}

function sourceFilePath(source: Record<string, unknown> | null) {
  const files = sourceFiles(source);
  if (files.length > 1) return JSON.stringify(files.map((file) => file.filePath));
  if (files.length === 1) return files[0].filePath;
  return typeof source?.filePath === "string" ? source.filePath : null;
}

export async function POST(req: Request) {
  try {
    const { organisationId, siteId, user } = await requireOrganisation(req);
    const body = await req.json();
    const invoices = Array.isArray(body.invoices) ? body.invoices : [];
    const source = body.source && typeof body.source === "object"
      ? (body.source as Record<string, unknown>)
      : null;

    if (!invoices.length) {
      return NextResponse.json({ error: "No invoices supplied" }, { status: 400 });
    }

    const { data: supplierRows, error: supplierError } = await serviceSupabase
      .from("suppliers")
      .select("id,name")
      .eq("organisation_id", organisationId);
    if (supplierError) throw supplierError;

    const supplierMap = new Map<string, { id: string; name: string }>();
    for (const supplier of supplierRows || []) supplierMap.set(normaliseName(supplier.name), supplier);

    const savedInvoices: any[] = [];
    let skipped = 0;

    for (const invoice of invoices) {
      const supplierName = String(invoice.supplier || "Unknown supplier").trim();
      const supplierKey = normaliseName(supplierName);
      let supplier = supplierMap.get(supplierKey);

      if (!supplier) {
        const { data: createdSupplier, error: createSupplierError } = await serviceSupabase
          .from("suppliers")
          .insert({ organisation_id: organisationId, name: supplierName })
          .select("id,name")
          .single();
        if (createSupplierError || !createdSupplier) {
          throw new Error(createSupplierError?.message || `Could not create supplier ${supplierName}`);
        }
        supplier = createdSupplier;
        supplierMap.set(supplierKey, createdSupplier);
      }

      const invoiceNumber = String(invoice.invoiceNumber || "").trim() || null;
      if (invoiceNumber) {
        const { data: existing, error: existingError } = await serviceSupabase
          .from("invoices")
          .select("id,invoice_number")
          .eq("organisation_id", organisationId)
          .eq("site_id", siteId)
          .eq("supplier_id", supplier.id)
          .limit(1000);
        if (existingError) throw existingError;
        const invoiceKey = normaliseInvoiceNumber(invoiceNumber);
        if (existing?.some((row) => normaliseInvoiceNumber(row.invoice_number) === invoiceKey)) {
          skipped += 1;
          continue;
        }
      }

      const total = toNumberOrNull(invoice.total);
      const orderMatch = await matchInvoiceToPurchaseOrder({
        organisationId,
        siteId,
        supplierName,
        invoiceTotal: total,
        invoiceDate: invoice.invoiceDate || null,
      });

      const { data: savedInvoice, error: invoiceError } = await serviceSupabase
        .from("invoices")
        .insert({
          organisation_id: organisationId,
          site_id: siteId,
          supplier_id: supplier.id,
          invoice_number: invoiceNumber,
          invoice_date: invoice.invoiceDate || null,
          due_date: invoice.dueDate || defaultDueDate(invoice.invoiceDate),
          payment_terms: invoice.paymentTerms || "30 days",
          payment_status: "unpaid",
          subtotal: toNumberOrNull(invoice.subtotal),
          vat: toNumberOrNull(invoice.vat),
          total,
          file_name: sourceFileName(source),
          file_path: sourceFilePath(source),
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          match_status: orderMatch.matchStatus,
          discrepancy_amount: orderMatch.discrepancyAmount,
          matched_order_ref: orderMatch.matchedOrderRef,
        })
        .select()
        .single();
      if (invoiceError || !savedInvoice) throw new Error(invoiceError?.message || "Could not save invoice");

      const lineItems = Array.isArray(invoice.lineItems) ? invoice.lineItems : [];
      if (lineItems.length) {
        const { data: existingProducts, error: productLoadError } = await serviceSupabase
          .from("supplier_products")
          .select("id,ingredient_id,supplier_product_name")
          .eq("organisation_id", organisationId)
          .eq("supplier_id", supplier.id)
          .limit(5000);
        if (productLoadError) throw productLoadError;

        const productMap = new Map<string, any>(
          (existingProducts ?? []).map((product) => [normaliseName(product.supplier_product_name), product])
        );
        const lineRows: Record<string, unknown>[] = [];

        for (const item of lineItems) {
          const productName = String(item.product || item.productName || item.description || "Unknown product").trim();
          const productKey = normaliseName(productName);
          const unitPrice = toNumberOrNull(item.unitPrice);
          const quantity = toNumberOrNull(item.quantity);
          const lineTotal = toNumberOrNull(item.total);
          const latestPrice = unitPrice ?? (
            lineTotal !== null && quantity !== null && quantity > 0 ? lineTotal / quantity : null
          );
          let supplierProduct = productMap.get(productKey);

          if (!supplierProduct) {
            const { data: createdProduct, error: createProductError } = await serviceSupabase
              .from("supplier_products")
              .insert({
                organisation_id: organisationId,
                supplier_id: supplier.id,
                supplier_product_name: productName,
                price_unit: item.priceUnit || item.pack || item.unit || null,
                latest_price: latestPrice,
              })
              .select("id,ingredient_id,supplier_product_name")
              .single();
            if (createProductError || !createdProduct) {
              await serviceSupabase.from("invoices").delete().eq("id", savedInvoice.id);
              throw new Error(createProductError?.message || `Could not catalogue ${productName}`);
            }
            supplierProduct = createdProduct;
            productMap.set(productKey, createdProduct);
          } else if (latestPrice !== null) {
            const { error: updateProductError } = await serviceSupabase
              .from("supplier_products")
              .update({
                latest_price: latestPrice,
                price_unit: item.priceUnit || item.pack || item.unit || null,
                updated_at: new Date().toISOString(),
              })
              .eq("id", supplierProduct.id);
            if (updateProductError) throw updateProductError;
          }

          lineRows.push({
            invoice_id: savedInvoice.id,
            supplier_product_id: supplierProduct.id,
            ingredient_id: supplierProduct.ingredient_id,
            product_name: productName,
            quantity,
            pack: item.pack || item.unit || null,
            unit_price: unitPrice,
            line_total: lineTotal,
            price_unit: item.priceUnit || null,
          });
        }

        const { error: lineError } = await serviceSupabase.from("invoice_lines").insert(lineRows);
        if (lineError) {
          await serviceSupabase.from("invoices").delete().eq("id", savedInvoice.id);
          throw lineError;
        }
      }

      savedInvoices.push(savedInvoice);
    }

    return NextResponse.json({ success: true, saved: savedInvoices.length, skipped, invoices: savedInvoices });
  } catch (error) {
    console.error("SAVE ERROR", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
