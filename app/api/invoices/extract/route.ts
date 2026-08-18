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
            "OpenAI API key missing",
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





    // -----------------------------
    // RECEIVE JSON FROM UPLOAD PAGE
    // -----------------------------


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
            "No invoice file URL received",
        },
        {
          status: 400,
        }
      );

    }



    console.log(
      "Invoice URL received:",
      fileName,
      fileType,
      fileUrl
    );





    // -----------------------------
    // OPENAI EXTRACTION
    // -----------------------------


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
`
You are extracting structured data from a UK restaurant supplier invoice.

Rules:

- Do not invent values.
- Return null when information is missing.
- Extract every genuine invoice line.
- Preserve supplier product descriptions exactly where possible.
- Ignore delivery notes, terms and footer text.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack should contain pack/unit information.
- unitPrice means the price charged per invoice unit.
- total means the line total/net value.
- Invoice totals must come from the totals section.
- Dates should use YYYY-MM-DD where possible.
`.trim(),

              },



              {

                type:
                  "input_file",


                file_url:
                  fileUrl,

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



    console.log(
      "OpenAI output:",
      outputText?.slice(0,500)
    );




    if (!outputText) {

      throw new Error(
        "No extraction result returned"
      );

    }




    const invoice =
      JSON.parse(outputText);





    const cleanedInvoice = {


      supplier:
        invoice.supplier ?? null,


      invoiceNumber:
        invoice.invoiceNumber ?? null,


      invoiceDate:
        invoice.invoiceDate ?? null,


      subtotal:
        typeof invoice.subtotal === "number"
        ? invoice.subtotal
        : null,


      vat:
        typeof invoice.vat === "number"
        ? invoice.vat
        : null,


      total:
        typeof invoice.total === "number"
        ? invoice.total
        : null,



      lineItems:

        Array.isArray(invoice.lineItems)

        ?

        invoice.lineItems
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
              item.pack ?? null,

            unitPrice:
              typeof item.unitPrice === "number"
              ? item.unitPrice
              : null,

            total:
              typeof item.total === "number"
              ? item.total
              : null,

            status:
              item.status ?? null,

          })
        )

        :

        [],

    };





    console.log(
      "Invoice extracted:",
      cleanedInvoice.supplier,
      cleanedInvoice.lineItems.length,
      "lines"
    );





    return NextResponse.json(
      cleanedInvoice
    );



  }

  catch(error:any) {


    console.error(
      "FULL INVOICE EXTRACTION ERROR:",
      error
    );



    return NextResponse.json(
      {

        error:
          "Invoice extraction failed",


        details:
          error?.message ||
          String(error),

      },

      {
        status:500,
      }

    );


  }

}
