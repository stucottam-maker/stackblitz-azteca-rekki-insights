import { NextResponse } from "next/server";
import { Resend } from "resend";

import type { OrganisationSettings, PurchaseOrder } from "../../../lib/purchasing";
import { authErrorResponse, requireOrganisation, serviceSupabase } from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function money(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildSimplePurchaseOrderPdf(order: PurchaseOrder, organisationName: string) {
  const rawLines = [
    "KITCHEN INSIGHTS - PURCHASE ORDER",
    "",
    `From: ${organisationName}`,
    `PO: ${order.id}`,
    `Supplier: ${order.supplier}`,
    `Created: ${new Date(order.createdAt).toLocaleString("en-GB")}`,
    "",
    "ITEM                                      QTY       EST. PRICE",
    ...order.lines.map((line) => {
      const name = (line.supplierProduct || line.ingredient).slice(0, 40).padEnd(40, " ");
      const qty = `${line.orderQty} ${line.orderUnit}`.slice(0, 10).padEnd(10, " ");
      const price = line.unitPrice === null ? "-" : money(line.orderQty * line.unitPrice);
      return `${name} ${qty} ${price}`;
    }),
    "",
    `Estimated total: ${money(order.estimatedTotal)}`,
    order.notes ? `Notes: ${order.notes}` : "",
  ].filter((line) => line !== undefined);

  const content = rawLines
    .flatMap((line) => {
      const text = String(line);
      if (text.length <= 88) return [text];
      const pieces: string[] = [];
      for (let i = 0; i < text.length; i += 88) pieces.push(text.slice(i, i + 88));
      return pieces;
    })
    .slice(0, 55)
    .map((line, index) => `BT /F1 ${index === 0 ? 13 : 9} Tf 50 ${790 - index * 13} Td (${pdfEscape(line)}) Tj ET`)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf, "utf8");
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}

function orderHtml(order: PurchaseOrder, organisationName: string) {
  const rows = order.lines.map((line) => {
    const lineTotal = line.unitPrice === null ? "—" : money(line.orderQty * line.unitPrice);
    return `<tr><td style="padding:9px 8px;border-bottom:1px solid #e5e7eb">${escapeHtml(line.supplierProduct || line.ingredient)}</td><td style="padding:9px 8px;border-bottom:1px solid #e5e7eb">${escapeHtml(`${line.orderQty} ${line.orderUnit}`)}</td><td style="padding:9px 8px;border-bottom:1px solid #e5e7eb;text-align:right">${escapeHtml(lineTotal)}</td></tr>`;
  }).join("");

  return `<div style="font-family:Arial,sans-serif;color:#172033;max-width:720px">
    <h2 style="margin:0 0 4px">Purchase order ${escapeHtml(order.id)}</h2>
    <p style="margin:0 0 20px;color:#64748b">${escapeHtml(organisationName)} → ${escapeHtml(order.supplier)}</p>
    <table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left;padding:8px">Item</th><th style="text-align:left;padding:8px">Quantity</th><th style="text-align:right;padding:8px">Est. line total</th></tr></thead><tbody>${rows}</tbody></table>
    <p style="font-size:18px;font-weight:700;text-align:right;margin:18px 0">Estimated total: ${escapeHtml(money(order.estimatedTotal))}</p>
    ${order.notes ? `<div style="padding:12px;background:#f8fafc;border-radius:8px"><strong>Delivery notes</strong><br>${escapeHtml(order.notes)}</div>` : ""}
    <p style="margin-top:22px;color:#64748b;font-size:12px">Sent from Kitchen Insights.</p>
  </div>`;
}

export async function POST(request: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(request);
    const body = await request.json();
    const order = body.order as PurchaseOrder;
    const settings = (body.settings ?? {}) as Partial<OrganisationSettings>;
    const suppliedEmail = String(body.supplierEmail || "").trim();

    if (!order?.id || !order?.supplier || !Array.isArray(order.lines) || !order.lines.length) {
      return NextResponse.json({ error: "This purchase order has no items." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Order email is not configured yet (missing RESEND_API_KEY)." }, { status: 503 });
    }

    const { data: suppliers, error: supplierError } = await serviceSupabase
      .from("suppliers")
      .select("id,name,email,whatsapp,order_method")
      .eq("organisation_id", organisationId)
      .ilike("name", order.supplier)
      .limit(5);
    if (supplierError) throw supplierError;

    const supplier = suppliers?.find((row) => row.name.toLowerCase() === order.supplier.toLowerCase()) ?? suppliers?.[0];
    const to = suppliedEmail || supplier?.email || order.supplierEmail || order.sentTo || "";
    if (!to) {
      return NextResponse.json({
        error: `Add an order email for ${order.supplier} before sending.`,
        needsSupplierEmail: true,
      }, { status: 400 });
    }

    if (supplier?.id && suppliedEmail && suppliedEmail !== supplier.email) {
      const { error } = await serviceSupabase
        .from("suppliers")
        .update({ email: suppliedEmail, order_method: "Email", updated_at: new Date().toISOString() })
        .eq("id", supplier.id)
        .eq("organisation_id", organisationId);
      if (error) throw error;
    }

    const { data: organisation } = await serviceSupabase
      .from("organisations")
      .select("name")
      .eq("id", organisationId)
      .maybeSingle();
    const organisationName = String(settings.name || organisation?.name || "Kitchen Insights");
    const cc = settings.sendInternalCopy === false
      ? []
      : Array.isArray(settings.internalOrderEmails)
        ? settings.internalOrderEmails.map((value) => String(value).trim()).filter(Boolean)
        : [];

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.ORDER_FROM_EMAIL || "Kitchen Insights <orders@kitcheninsights.uk>";
    const attachments = settings.attachPurchaseOrder === false
      ? undefined
      : [{ filename: `${order.id}.pdf`, content: buildSimplePurchaseOrderPdf(order, organisationName) }];

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      cc: cc.length ? cc : undefined,
      replyTo: cc[0] || undefined,
      subject: `Purchase Order ${order.id} - ${organisationName}`,
      html: orderHtml(order, organisationName),
      attachments,
    });

    if (error) throw new Error(error.message || "Resend could not send the purchase order.");

    return NextResponse.json({
      sent: true,
      messageId: data?.id ?? null,
      sentTo: to,
      copiedTo: cc,
      siteId,
    });
  } catch (error) {
    console.error("PURCHASE ORDER SEND FAILED", error);
    const response = authErrorResponse(error);
    const message = response.message.includes("domain")
      ? `${response.message} Verify the Kitchen Insights sending domain in Resend or set ORDER_FROM_EMAIL to a verified sender.`
      : response.message;
    return NextResponse.json({ error: message }, { status: response.status === 500 ? 503 : response.status });
  }
}
