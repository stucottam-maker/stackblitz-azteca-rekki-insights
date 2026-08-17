import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const maxDuration = 120;


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

    const apiKey =
      process.env.OPENAI_API_KEY;


    if (!apiKey) {

      return NextResponse.json(
        {
          error:
            "OpenAI API key is missing.",
        },
        {
          status: 500,
        }
      );

    }



    const openai =
      new OpenAI({
        apiKey,
      });



    /*
      Receive uploaded Supabase file
    */

    const body =
      await request.json();



    const {
      fileUrl,
      fileName,
      fileType,
    } = body;



    if (!fileUrl) {

      return NextResponse.json(
        {
          error:
            "No invoice file URL supplied.",
        },
        {
          status:400,
        }
      );

    }



    if (
      !fileType ||
      ![
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(fileType)
    ) {

      return NextResponse.json(
        {
          error:
            "Unsupported invoice file type.",
        },
        {
          status:400,
        }
      );

    }



    /*
      Build OpenAI file reference
    */


    const fileReference =
      fileType === "application/pdf"

        ? {
            type:
              "input_file" as const,

            file_url:
              fileUrl,
          }


        : {

            type:
              "input_image" as const,

            image_url:
              fileUrl,

            detail:
              "high" as const,

          };





    const extractionPrompt = `

You are extracting structured data from a UK restaurant supplier invoice.

Rules:

- Do not invent values.
- Return null when information is missing.
- Extract every genuine invoice line.
- Preserve supplier product descriptions exactly where possible.
- Ignore delivery notes and payment terms.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack should contain pack/unit information.
- unitPrice means the price charged per invoice unit.
- total means the invoice line total/net value.
- Invoice totals must come from the invoice totals section.
- Dates should use YYYY-MM-DD format where possible.

Pay special attention to:
- supplier name
- invoice number
- invoice date
- VAT
- subtotal
- total
- every product line

`.trim();





    const response =
      await openai.responses.create({

        model:
          "gpt-5-mini",


        input: [

          {

            role:
              "user",


            content: [

              {

                type:
                  "input_text",

                text:
                  extractionPrompt,

              },


              fileReference,

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
            "OpenAI returned no invoice data.",
        },
        {
          status:502,
        }
      );

    }





    let extractedInvoice;


    try {

      extractedInvoice =
        JSON.parse(outputText);

    } 
    
    catch(error) {

      console.error(
        "JSON parsing failed",
        outputText
      );


      return NextResponse.json(
        {
          error:
            "Could not parse invoice extraction.",
        },
        {
          status:502,
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



      lineItems:

        Array.isArray(
          extractedInvoice.lineItems
        )

        ?

        extractedInvoice.lineItems

          .filter(
            (item:any) =>
              item?.product &&
              item.product.trim()
          )


          .map(
            (item:any)=>({

              product:
                item.product.trim(),


              quantity:
                typeof item.quantity === "number"
                  ? item.quantity
                  : null,


              pack:
                item.pack ??
                null,


              unitPrice:
                typeof item.unitPrice === "number"
                  ? item.unitPrice
                  : null,


              total:
                typeof item.total === "number"
                  ? item.total
                  : null,


              status:
                item.status ??
                "Review",

            })
          )

        :

        [],

    };





    console.log(
      `Invoice extracted: ${
        cleanedInvoice.supplier ?? "Unknown"
      } - ${
        cleanedInvoice.lineItems.length
      } lines`
    );





    return NextResponse.json(
      cleanedInvoice
    );



  }


  catch(error:any) {


    console.error(
      "Invoice extraction error:",
      error
    );



    return NextResponse.json(

      {

        error:
          "Invoice extraction failed.",


        details:
          error?.message ??
          String(error),

      },


      {
        status:500,
      }

    );

  }

}
