import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No invoice file provided." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "For the first version, please upload a JPG, PNG or WEBP invoice.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const base64 = Buffer.from(bytes).toString("base64");

    const dataUrl = `data:${file.type};base64,${base64}`;

    const response = await openai.responses.create({
      model: "gpt-5.4-mini",

      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
You are extracting purchasing information from a UK restaurant supplier invoice.

Read the invoice carefully.

Return:
- supplier name
- invoice number
- invoice date
- subtotal before VAT
- VAT
- invoice total
- every purchased product line

For each product line extract:
- supplier product description exactly as shown
- quantity purchased
- pack size if visible
- unit price
- line total

Important rules:
- Do not invent missing information.
- If something cannot be read, return null.
- Monetary values must be numbers only, without £ symbols.
- Keep the original supplier wording for product descriptions.
- Ignore headers, payment information, delivery information and totals when identifying product lines.
              `.trim(),
            },
            {
              type: "input_image",
              image_url: dataUrl,
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

          schema: {
            type: "object",

            properties: {
              supplier: {
                type: ["string", "null"],
              },

              invoiceNumber: {
                type: ["string", "null"],
              },

              invoiceDate: {
                type: ["string", "null"],
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

                  properties: {
                    product: {
                      type: "string",
                    },

                    quantity: {
                      type: ["number", "string", "null"],
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
                      type: "string",
                      enum: ["Extracted"],
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

                  additionalProperties: false,
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

            additionalProperties: false,
          },
        },
      },
    });

    const outputText = response.output_text;

    if (!outputText) {
      throw new Error("No extraction returned from OpenAI.");
    }

    const invoice = JSON.parse(outputText);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      invoice,
    });
  } catch (error) {
    console.error("Invoice extraction error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process invoice.",
      },
      { status: 500 }
    );
  }
}