import { NextResponse } from "next/server";
import { Resend } from "resend";

import { extractInvoicesFromFiles } from "../../../../lib/invoiceExtraction";
import { serviceSupabase } from "../../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const resend = new Resend(process.env.RESEND_API_KEY);
const supportedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function normaliseName(value: string) {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function normaliseInvoiceNumber(value: unknown) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function safeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "invoice";
}

function numberOrNull(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function defaultDueDate(invoiceDate: unknown) {
  if (typeof invoiceDate !== "string" || !invoiceDate) return null;
  const date = new Date(`${invoiceDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}

async function saveForReview(
  invoice: any,
  context: { organisationId: string; siteId: string; fileName: string; filePath: string }
) {
  const supplierName = String(invoice.supplier || "Unknown supplier").trim();
  const { data: supplierRows, error: supplierLoadError } = await serviceSupabase
    .from("suppliers")
    .select("id,name")
    .eq("organisation_id", context.organisationId);
  if (supplierLoadError) throw supplierLoadError;

  let supplier = (supplierRows || []).find(
    (row) => normaliseName(row.name) === normaliseName(supplierName)
  );
  if (!supplier) {
    const { data, error } = await serviceSupabase
      .from("suppliers")
      .insert({ organisation_id: context.organisationId, name: supplierName })
      .select("id,name")
      .single();
    if (error || !data) throw error || new Error("Could not create supplier");
    supplier = data;
  }

  const invoiceNumber = String(invoice.invoiceNumber || "").trim() || null;
  if (invoiceNumber) {
    const { data: existing, error } = await serviceSupabase
      .from("invoices")
      .select("id,invoice_number")
      .eq("organisation_id", context.organisationId)
      .eq("site_id", context.siteId)
      .eq("supplier_id", supplier.id);
    if (error) throw error;
    const key = normaliseInvoiceNumber(invoiceNumber);
    if (existing?.some((row) => normaliseInvoiceNumber(row.invoice_number) === key)) {
      return { duplicate: true as const, invoiceId: existing.find((row) => normaliseInvoiceNumber(row.invoice_number) === key)?.id };
    }
  }

  const { data: savedInvoice, error: invoiceError } = await serviceSupabase
    .from("invoices")
    .insert({
      organisation_id: context.organisationId,
      site_id: context.siteId,
      supplier_id: supplier.id,
      invoice_number: invoiceNumber,
      invoice_date: invoice.invoiceDate || null,
      due_date: invoice.dueDate || defaultDueDate(invoice.invoiceDate),
      payment_terms: invoice.paymentTerms || "30 days",
      payment_status: "unpaid",
      subtotal: numberOrNull(invoice.subtotal),
      vat: numberOrNull(invoice.vat),
      total: numberOrNull(invoice.total),
      file_name: context.fileName,
      file_path: context.filePath,
      status: "review",
      approved_at: null,
    })
    .select("id")
    .single();
  if (invoiceError || !savedInvoice) throw invoiceError || new Error("Could not save invoice");

  const { data: products, error: productsError } = await serviceSupabase
    .from("supplier_products")
    .select("id,ingredient_id,supplier_product_name")
    .eq("organisation_id", context.organisationId)
    .eq("supplier_id", supplier.id)
    .limit(5000);
  if (productsError) throw productsError;
  const productMap = new Map((products || []).map((product) => [normaliseName(product.supplier_product_name), product]));
  const lineRows: Record<string, unknown>[] = [];

  for (const item of Array.isArray(invoice.lineItems) ? invoice.lineItems : []) {
    const productName = String(item.product || item.description || "Unknown product").trim();
    const key = normaliseName(productName);
    const quantity = numberOrNull(item.quantity);
    const unitPrice = numberOrNull(item.unitPrice);
    const lineTotal = numberOrNull(item.total);
    const latestPrice = unitPrice ?? (lineTotal !== null && quantity !== null && quantity > 0 ? lineTotal / quantity : null);
    let product = productMap.get(key);
    if (!product) {
      const { data, error } = await serviceSupabase
        .from("supplier_products")
        .insert({
          organisation_id: context.organisationId,
          supplier_id: supplier.id,
          supplier_product_name: productName,
          price_unit: item.priceUnit || item.pack || null,
          latest_price: latestPrice,
        })
        .select("id,ingredient_id,supplier_product_name")
        .single();
      if (error || !data) throw error || new Error("Could not create supplier product");
      product = data;
      productMap.set(key, data);
    }
    lineRows.push({
      invoice_id: savedInvoice.id,
      supplier_product_id: product.id,
      ingredient_id: product.ingredient_id,
      product_name: productName,
      quantity,
      pack: item.pack || null,
      unit_price: unitPrice,
      line_total: lineTotal,
      price_unit: item.priceUnit || null,
    });
  }

  if (lineRows.length) {
    const { error } = await serviceSupabase.from("invoice_lines").insert(lineRows);
    if (error) {
      await serviceSupabase.from("invoices").delete().eq("id", savedInvoice.id);
      throw error;
    }
  }
  return { duplicate: false as const, invoiceId: savedInvoice.id };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let event: any;
  try {
    if (!process.env.RESEND_WEBHOOK_SECRET) throw new Error("RESEND_WEBHOOK_SECRET is not configured");
    event = resend.webhooks.verify({
      payload: rawBody,
      headers: {
        id: request.headers.get("svix-id") || "",
        timestamp: request.headers.get("svix-timestamp") || "",
        signature: request.headers.get("svix-signature") || "",
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET,
    });
  } catch (error) {
    console.error("Inbound invoice webhook signature rejected", error);
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  if (event.type !== "email.received") return NextResponse.json({ accepted: true });

  const data = event.data;
  const recipients = Array.isArray(data.to) ? data.to.map((value: string) => value.toLowerCase()) : [];
  const { data: routes, error: routeError } = await serviceSupabase
    .from("inbound_invoice_routes")
    .select("organisation_id,site_id,email_address")
    .eq("active", true)
    .in("email_address", recipients);
  if (routeError) throw routeError;
  const route = routes?.[0];
  if (!route) return NextResponse.json({ accepted: true, ignored: "Unknown inbound address" });

  const { data: existing } = await serviceSupabase
    .from("inbound_invoice_emails")
    .select("id,status")
    .eq("resend_email_id", data.email_id)
    .maybeSingle();
  if (existing && !["failed", "received"].includes(existing.status)) {
    return NextResponse.json({ accepted: true, duplicate: true });
  }

  const emailPayload = {
    organisation_id: route.organisation_id,
    site_id: route.site_id,
    resend_email_id: data.email_id,
    message_id: data.message_id || null,
    sender: data.from,
    recipients,
    subject: data.subject || null,
    status: "processing",
    error_message: null,
    received_at: data.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { data: emailRow, error: emailError } = await serviceSupabase
    .from("inbound_invoice_emails")
    .upsert(emailPayload, { onConflict: "resend_email_id" })
    .select("id")
    .single();
  if (emailError || !emailRow) throw emailError || new Error("Could not queue inbound email");

  try {
    const attachments = (Array.isArray(data.attachments) ? data.attachments : []).filter((item: any) => supportedTypes.has(item.content_type));
    if (!attachments.length) {
      await serviceSupabase.from("inbound_invoice_emails").update({ status: "ignored", error_message: "No supported PDF or image attachment", processed_at: new Date().toISOString() }).eq("id", emailRow.id);
      return NextResponse.json({ accepted: true, ignored: "No invoice attachment" });
    }

    let saved = 0;
    let duplicates = 0;
    for (const attachment of attachments) {
      let attachmentSaved = 0;
      let attachmentDuplicates = 0;
      const result = await resend.emails.receiving.attachments.get({ emailId: data.email_id, id: attachment.id });
      if (result.error || !result.data?.download_url) throw new Error(result.error?.message || "Could not download attachment");
      const download = await fetch(result.data.download_url);
      if (!download.ok) throw new Error(`Attachment download failed (${download.status})`);
      const bytes = Buffer.from(await download.arrayBuffer());
      const fileName = safeFileName(attachment.filename || `invoice-${attachment.id}`);
      const storagePath = `${route.organisation_id}/email/${data.email_id}/${attachment.id}-${fileName}`;
      const { error: uploadError } = await serviceSupabase.storage.from("invoice-files").upload(storagePath, bytes, { contentType: attachment.content_type, upsert: true });
      if (uploadError) throw uploadError;

      const { data: signed, error: signedError } = await serviceSupabase.storage.from("invoice-files").createSignedUrl(storagePath, 900);
      if (signedError || !signed?.signedUrl) throw signedError || new Error("Could not create extraction URL");
      const invoices = await extractInvoicesFromFiles([{ fileUrl: signed.signedUrl, fileType: attachment.content_type, fileName }]);
      let firstInvoiceId: string | null = null;
      for (const invoice of invoices) {
        const outcome = await saveForReview(invoice, { organisationId: route.organisation_id, siteId: route.site_id, fileName, filePath: storagePath });
        firstInvoiceId ||= outcome.invoiceId || null;
        if (outcome.duplicate) {
          duplicates += 1;
          attachmentDuplicates += 1;
        } else {
          saved += 1;
          attachmentSaved += 1;
        }
      }
      await serviceSupabase.from("inbound_invoice_attachments").upsert({
        inbound_email_id: emailRow.id,
        resend_attachment_id: attachment.id,
        invoice_id: firstInvoiceId,
        file_name: fileName,
        content_type: attachment.content_type,
        size_bytes: result.data.size || bytes.length,
        storage_path: storagePath,
        status: attachmentSaved > 0 ? "extracted" : attachmentDuplicates > 0 ? "duplicate" : "failed",
        error_message: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "inbound_email_id,resend_attachment_id" });
    }

    await serviceSupabase.from("inbound_invoice_emails").update({
      status: saved > 0 ? "needs_review" : "duplicate",
      processed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", emailRow.id);
    return NextResponse.json({ accepted: true, saved, duplicates });
  } catch (error: any) {
    console.error("Inbound invoice processing failed", error);
    await serviceSupabase.from("inbound_invoice_emails").update({ status: "failed", error_message: error?.message || "Invoice processing failed", updated_at: new Date().toISOString() }).eq("id", emailRow.id);
    return NextResponse.json({ error: "Invoice processing failed" }, { status: 500 });
  }
}
