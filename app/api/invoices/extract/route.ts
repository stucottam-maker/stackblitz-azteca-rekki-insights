import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const invoiceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    supplier: {
      type: ["string", "null"],
    },
    invoiceNumber: {
      type: ["string", "null"],
    },
    invoiceDate: {
      type: ["string", "null"],
      description: "Invoice date, preferably YYYY-MM-DD where possible.",
    },
    subtotal: {
      type: ["number", "null"],
    },
    vat: {
      type: ["number", "null"],
    },
    total: {
      type: ["number", "null"],
    },
    lineItems: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          product: {
            type: "string",
          },
          quantity: {
            type: ["number", "null"],
          },
          pack: {
            type: ["string", "null"],
          },
          unitPrice: {
            type: ["number", "null"],
          },
          total: {
            type: ["number", "null"],
          },
          status: {
            type: ["string", "null"],
          },
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
};

export async function POST(request: Request) {
  try {
    // ---------------------------------------------------------
    // OPENAI
    // Create client only when this endpoint is actually called.
    // This prevents npm run build failing when the key isn't
    // available in the local StackBlitz build environment.
    // ---------------------------------------------------------

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured. Add OPENAI_API_KEY to the server environment.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    // ---------------------------------------------------------
    // READ UPLOADED FILE
    // ---------------------------------------------------------

    const formData = await request.formData();
    const uploadedFile = formData.get("file");

    if (!uploadedFile || !(uploadedFile instanceof File)) {
      return NextResponse.json(
        {
          error: "No invoice file was uploaded.",
        },
        { status: 400 }
      );
    }

    if (uploadedFile.size === 0) {
      return NextResponse.json(
        {
          error: "The uploaded invoice file is empty.",
        },
        { status: 400 }
      );
    }

    if (uploadedFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Invoice image is too large. Maximum size is 10 MB.",
        },
        { status: 400 }
      );
    }

    if (!SUPPORTED_IMAGE_TYPES.includes(uploadedFile.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload a JPEG, PNG or WEBP invoice image.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // CONVERT IMAGE TO BASE64
    // ---------------------------------------------------------

    const bytes = await uploadedFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const imageUrl = `data:${uploadedFile.type};base64,${base64}`;

    // ---------------------------------------------------------
    // EXTRACT INVOICE
    // ---------------------------------------------------------

    const response = await openai.responses.create({
      model: "gpt-5-mini",

      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
You are extracting structured data from a UK restaurant supplier invoice.

Read the invoice carefully and return the invoice data according to the supplied JSON schema.

IMPORTANT RULES:

- Do not invent values.
- If a value cannot be determined, return null.
- Preserve the supplier's product description as closely as possible.
- Extract every genuine invoice line item.
- Ignore headers, footers, delivery notes and payment terms unless they are relevant invoice fields.
- Monetary values must be numbers only, without £ symbols.
- Quantity must be numeric where possible.
- If a pack size or ordering unit is shown, include it in "pack".
- "unitPrice" means the price charged per invoiced unit shown on the invoice.
- "total" on each line means that invoice line's total/net value.
- Invoice subtotal, VAT and total should come from the invoice totals section.
- Do not calculate missing monetary values unless the invoice clearly provides enough information and the calculation is unambiguous.
- Dates should preferably be returned as YYYY-MM-DD.
              `.trim(),
            },
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "high",
            },
          ],
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "restaurant_invoice",
          strict: true,
          schema: invoiceSchema,
        },
      },
    });

    // ---------------------------------------------------------
    // READ STRUCTURED RESULT
    // ---------------------------------------------------------

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json(
        {
          error: "No invoice data was returned by the extraction model.",
        },
        { status: 502 }
      );
    }

    let extractedInvoice;

    try {
      extractedInvoice = JSON.parse(outputText);
    } catch (error) {
      console.error("Invoice JSON parsing failed:", error);
      console.error("Raw model output:", outputText);

      return NextResponse.json(
        {
          error: "The extracted invoice data could not be parsed.",
        },
        { status: 502 }
      );
    }

    // ---------------------------------------------------------
    // BASIC CLEANUP
    // ---------------------------------------------------------

    const cleanedInvoice = {
      supplier: extractedInvoice.supplier ?? null,
      invoiceNumber: extractedInvoice.invoiceNumber ?? null,
      invoiceDate: extractedInvoice.invoiceDate ?? null,

      subtotal:
        typeof extractedInvoice.subtotal === "number"
          ? extractedInvoice.subtotal
          : null,

      vat:
        typeof extractedInvoice.vat === "number"
          ? extractedInvoice.vat
          : null,

      total:
        typeof extractedInvoice.total === "number"
          ? extractedInvoice.total
          : null,

      lineItems: Array.isArray(extractedInvoice.lineItems)
        ? extractedInvoice.lineItems
            .filter(
              (item: any) =>
                typeof item?.product === "string" &&
                item.product.trim().length > 0
            )
            .map((item: any) => ({
              product: item.product.trim(),

              quantity:
                typeof item.quantity === "number"
                  ? item.quantity
                  : null,

              pack:
                typeof item.pack === "string" &&
                item.pack.trim()
                  ? item.pack.trim()
                  : null,

              unitPrice:
                typeof item.unitPrice === "number"
                  ? item.unitPrice
                  : null,

              total:
                typeof item.total === "number"
                  ? item.total
                  : null,

              status:
                typeof item.status === "string" &&
                item.status.trim()
                  ? item.status.trim()
                  : null,
            }))
        : [],
    };

    console.log(
      `Invoice extracted: ${cleanedInvoice.supplier ?? "Unknown supplier"} - ${
        cleanedInvoice.lineItems.length
      } lines`
    );

    // Keep the response as the invoice object itself so the
    // existing upload/review flow can consume it directly.
    return NextResponse.json(cleanedInvoice);
  } catch (error: any) {
    console.error("Invoice extraction error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown invoice extraction error";

    return NextResponse.json(
      {
        error: "Invoice extraction failed.",
        details:
          process.env.NODE_ENV === "development"
            ? message
            : undefined,
      },
      { status: 500 }
    );
  }
}
