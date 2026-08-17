import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const maxDuration = 120;

const MAX_FILE_SIZE = 60 * 1024 * 1024; // 60 MB

const SUPPORTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }


    const openai = new OpenAI({
      apiKey,
    });


    const formData =
      await request.formData();

    const uploadedFile =
      formData.get("file");


    if (
      !uploadedFile ||
      !(uploadedFile instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "No invoice file uploaded.",
        },
        {
          status: 400,
        }
      );
    }


    if (
      uploadedFile.size === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Uploaded file is empty.",
        },
        {
          status: 400,
        }
      );
    }


    if (
      uploadedFile.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          error:
            "File too large. Maximum size is 60MB.",
        },
        {
          status: 400,
        }
      );
    }


    if (
      !SUPPORTED_FILE_TYPES.includes(
        uploadedFile.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Upload JPG, PNG, WEBP or PDF.",
        },
        {
          status: 400,
        }
      );
    }


    const bytes =
      await uploadedFile.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const base64 =
      buffer.toString("base64");


    const fileUrl =
      `data:${uploadedFile.type};base64,${base64}`;



    const extractionPrompt = `
You are extracting structured data from a UK restaurant supplier invoice.

Rules:

- Do not invent values.
- Return null when information is missing.
- Extract every genuine invoice line.
- Preserve supplier product descriptions.
- Ignore delivery notes and payment terms.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack should contain pack/unit information.
- unitPrice means the price charged per invoice unit.
- total means line total/net value.
- Invoice totals must come from the totals section.
- Dates should use YYYY-MM-DD format where possible.
`.trim();



   const fileContent =
  uploadedFile.type === "application/pdf"
    ? {
        type: "input_file" as const,
        filename: uploadedFile.name,
        file_data: fileUrl,
      }
    : {
        type: "input_image" as const,
        image_url: fileUrl,
        detail: "high" as const,
      };



    const response =
      await openai.responses.create({

        model:
          "gpt-5-mini",

        input: [
          {
            role:
              "user",

            content: [
              fileContent,

              {
                type:
                  "input_text",

                text:
                  extractionPrompt,
              },
            ],
          },
        ],


        text: {
          format: {
            type:
              "json_schema",

            name:
              "restaurant_invoice",

            strict:
              true,

            schema:
              invoiceSchema,
          },
        },

      });



    const outputText =
      response.output_text;


    if (!outputText) {
      return NextResponse.json(
        {
          error:
            "No invoice data returned.",
        },
        {
          status: 502,
        }
      );
    }



    let extractedInvoice;


    try {

      extractedInvoice =
        JSON.parse(outputText);

    } catch (error) {

      console.error(
        "JSON parse failed",
        error
      );

      console.error(
        outputText
      );

      return NextResponse.json(
        {
          error:
            "Could not parse extracted invoice.",
        },
        {
          status: 502,
        }
      );
    }



    const cleanedInvoice = {

      supplier:
        extractedInvoice.supplier ??
        null,


      invoiceNumber:
        extractedInvoice.invoiceNumber ??
        null,


      invoiceDate:
        extractedInvoice.invoiceDate ??
        null,


      subtotal:
        typeof extractedInvoice.subtotal ===
        "number"
          ? extractedInvoice.subtotal
          : null,


      vat:
        typeof extractedInvoice.vat ===
        "number"
          ? extractedInvoice.vat
          : null,


      total:
        typeof extractedInvoice.total ===
        "number"
          ? extractedInvoice.total
          : null,


      lineItems:
        Array.isArray(
          extractedInvoice.lineItems
        )
          ? extractedInvoice.lineItems
              .filter(
                (item:any) =>
                  item?.product &&
                  item.product.trim()
              )
              .map(
                (item:any) => ({
                  product:
                    item.product.trim(),

                  quantity:
                    typeof item.quantity ===
                    "number"
                      ? item.quantity
                      : null,

                  pack:
                    item.pack ??
                    null,

                  unitPrice:
                    typeof item.unitPrice ===
                    "number"
                      ? item.unitPrice
                      : null,

                  total:
                    typeof item.total ===
                    "number"
                      ? item.total
                      : null,

                  status:
                    item.status ??
                    null,
                })
              )
          : [],
    };


    console.log(
      `Invoice extracted: ${
        cleanedInvoice.supplier ??
        "Unknown"
      } - ${
        cleanedInvoice.lineItems.length
      } lines`
    );


    return NextResponse.json(
      cleanedInvoice
    );


  } catch(error:any){

    console.error(
      "Invoice extraction error:",
      error
    );


    return NextResponse.json(
      {
        error:
          "Invoice extraction failed.",

        details:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,
      },
      {
        status:500,
      }
    );
  }
}
