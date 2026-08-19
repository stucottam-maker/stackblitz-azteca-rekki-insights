import OpenAI from "openai";
import { NextResponse } from "next/server";

import { authErrorResponse, requireOrganisation } from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supportedFileTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isTrustedInvoiceUrl(value: unknown) {
  if (typeof value !== "string") return false;

  try {
    const fileUrl = new URL(value);
    const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");
    return fileUrl.protocol === "https:" && fileUrl.hostname === supabaseUrl.hostname;
  } catch {
    return false;
  }
}

const invoiceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    invoices: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          supplier: { type: ["string", "null"] },
          invoiceNumber: { type: ["string", "null"] },
          invoiceDate: { type: ["string", "null"] },
          subtotal: { type: ["number", "null"] },
          vat: { type: ["number", "null"] },
          total: { type: ["number", "null"] },
          lineItems: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                product: { type: "string" },
                quantity: { type: ["number", "null"] },
                pack: { type: ["string", "null"] },
                unitPrice: { type: ["number", "null"] },
                total: { type: ["number", "null"] },
                status: { type: ["string", "null"] },
              },
              required: [
                "product",
                "quantity",
                "pack",
                "unitPrice",
                "total",
                "status",
              ],
            },
          },
        },
        required: [
          "supplier",
          "invoiceNumber",
          "invoiceDate",
          "subtotal",
          "vat",
          "total",
          "lineItems",
        ],
      },
    },
  },
  required: ["invoices"],
};

const prompt = `
You extract structured data from UK restaurant supplier invoices.
The uploaded file may contain multiple invoices.
Read every page.

Rules:
- Extract every invoice separately.
- Do not merge invoices.
- Extract every genuine product line.
- Do not return empty lineItems when products are visible.
- Preserve supplier product descriptions exactly.
- Ignore delivery notes, payment terms and account summaries.
- Do not invent information. Use null if unknown.
- Money values must be numbers.
- Quantity must be numeric where possible.
- Dates must be YYYY-MM-DD.

For every invoice return supplier, invoice number, invoice date, subtotal, VAT and total.
For every line return product, quantity, pack, unit price and line total.
`;

export async function POST(request: Request) {
  try {
    await requireOrganisation(request);

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invoice extraction expects a JSON upload request." },
        { status: 415 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "The invoice upload request was incomplete. Please try again." },
        { status: 400 }
      );
    }

    const { fileUrl, fileType } = body;

    if (!fileUrl) {
      return NextResponse.json({ error: "Missing file URL" }, { status: 400 });
    }

    if (
      !isTrustedInvoiceUrl(fileUrl)
    ) {
      return NextResponse.json({ error: "Invalid invoice file URL" }, { status: 400 });
    }

    if (typeof fileType !== "string" || !supportedFileTypes.has(fileType)) {
      return NextResponse.json(
        { error: "Upload a PDF, JPG, PNG or WebP invoice." },
        { status: 415 }
      );
    }

    const content: any[] = [];

    if (fileType === "application/pdf") {
      content.push({ type: "input_file", file_url: fileUrl } as any);
    } else {
      content.push({
        type: "input_image",
        image_url: fileUrl,
        detail: "high",
      } as any);
    }

    content.push({ type: "input_text", text: prompt });

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [{ role: "user", content }],
      text: {
        format: {
          type: "json_schema",
          name: "invoice_batch",
          strict: true,
          schema: invoiceSchema,
        },
      },
    });

    const output = response.output_text?.trim();
    if (!output) throw new Error("The invoice reader returned no data.");

    let parsed: { invoices?: unknown[] };
    try {
      parsed = JSON.parse(output);
    } catch {
      throw new Error("The invoice reader returned an incomplete result. Please try again.");
    }

    if (!Array.isArray(parsed.invoices) || parsed.invoices.length === 0) {
      return NextResponse.json(
        { error: "No invoices could be read from this file." },
        { status: 422 }
      );
    }

    return NextResponse.json({ invoices: parsed.invoices });
  } catch (error: any) {
    console.error("Invoice extraction error:", error);
    const response = authErrorResponse(error);

    return NextResponse.json(
      {
        error:
          response.status === 500
            ? "Invoice extraction failed."
            : response.message,
        details: response.status === 500 ? error?.message : undefined,
      },
      { status: response.status }
    );
  }
}
