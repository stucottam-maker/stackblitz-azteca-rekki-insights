import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const invoiceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    invoices: {
      type: "array",
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

const extractionPrompt = `
You are processing UK restaurant supplier invoices.

The document may contain multiple pages or multiple invoices.

IMPORTANT:
- Read the entire document.
- Extract every genuine invoice line.
- Preserve product descriptions exactly.
- Do not invent values.
- Return null if unknown.
- Ignore payment terms and unrelated footer text.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack must contain unit information where visible.
- Dates should be YYYY-MM-DD.

If the document is a delivery/despatch note with no prices, still extract the supplier,
document/order number where appropriate, date, products and quantities, leaving money fields null.

If multiple invoices exist:
- create one invoice object per invoice
- keep invoice numbers separate
- keep dates separate
- keep totals separate

Before returning, check that the whole document has been reviewed.
`.trim();

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const openai = new OpenAI({ apiKey });
    const body = await request.json();

    const fileUrl = String(body?.fileUrl ?? "");
    const fileName = String(body?.fileName ?? "invoice");
    const fileType = String(body?.fileType ?? "application/octet-stream").toLowerCase();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "Missing file URL" },
        { status: 400 }
      );
    }

    const isPdf = fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");
    const isImage =
      fileType === "image/jpeg" ||
      fileType === "image/jpg" ||
      fileType === "image/png" ||
      fileType === "image/webp" ||
      /\.(jpe?g|png|webp)$/i.test(fileName);

    if (!isPdf && !isImage) {
      return NextResponse.json(
        {
          error: "Unsupported invoice file",
          details: "Please use PDF, JPG, PNG or WEBP for invoice extraction.",
        },
        { status: 400 }
      );
    }

    let content:
      | Array<
          | { type: "input_text"; text: string }
          | { type: "input_image"; image_url: string; detail: "high" }
          | { type: "input_file"; file_id: string }
        >;

    if (isImage) {
      // Images must be sent as vision input. Uploading a JPG as an input_file
      // makes the API treat it as a context-stuffing document and returns a 400.
      content = [
        { type: "input_text", text: extractionPrompt },
        {
          type: "input_image",
          image_url: fileUrl,
          detail: "high",
        },
      ];
    } else {
      // PDFs are supported as document inputs. Download from Supabase Storage,
      // upload to OpenAI, then reference the resulting file id.
      const fileResponse = await fetch(fileUrl);

      if (!fileResponse.ok) {
        throw new Error("Could not download invoice PDF");
      }

      const fileBuffer = await fileResponse.arrayBuffer();
      const file = new File([fileBuffer], fileName, {
        type: "application/pdf",
      });

      const uploaded = await openai.files.create({
        file,
        purpose: "user_data",
      });

      content = [
        { type: "input_text", text: extractionPrompt },
        { type: "input_file", file_id: uploaded.id },
      ];
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "batch_invoice",
          strict: true,
          schema: invoiceSchema,
        },
      },
    });

    if (!response.output_text) {
      throw new Error("No OpenAI response");
    }

    const parsed = JSON.parse(response.output_text);
    const invoices = Array.isArray(parsed?.invoices) ? parsed.invoices : [];

    if (!invoices.length) {
      throw new Error("No invoice data was extracted");
    }

    // The current review screen handles one invoice at a time. Keep that
    // interface for normal phone/photo uploads while preserving batch output
    // for multi-invoice PDFs so we can add the batch-review UI next.
    if (invoices.length === 1) {
      return NextResponse.json(invoices[0]);
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("INVOICE EXTRACTION ERROR:", error);

    return NextResponse.json(
      {
        error: "Invoice extraction failed",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
