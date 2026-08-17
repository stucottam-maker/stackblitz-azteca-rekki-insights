import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;


const MAX_FILE_SIZE = 60 * 1024 * 1024;


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

    invoices: {
      type: "array",

      items: {

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

      },

    },

  },


  required: [
    "invoices",
  ],

};




export async function POST(
  request: Request
) {

  try {


    const apiKey =
      process.env.OPENAI_API_KEY;


    if (!apiKey) {

      return NextResponse.json(
        {
          error:
            "OpenAI API key missing.",
        },
        {
          status:500,
        }
      );

    }



    const openai =
      new OpenAI({
        apiKey,
      });




    const formData =
      await request.formData();


    const file =
      formData.get("file");



    if (
      !file ||
      !(file instanceof File)
    ) {

      return NextResponse.json(
        {
          error:
            "No invoice file uploaded.",
        },
        {
          status:400,
        }
      );

    }



    if (
      file.size >
      MAX_FILE_SIZE
    ) {

      return NextResponse.json(
        {
          error:
            "File too large. Maximum size is 60MB.",
        },
        {
          status:400,
        }
      );

    }



    if (
      !SUPPORTED_FILE_TYPES.includes(
        file.type
      )
    ) {

      return NextResponse.json(
        {
          error:
            "Unsupported file type.",
        },
        {
          status:400,
        }
      );

    }



    const bytes =
      await file.arrayBuffer();


    const buffer =
      Buffer.from(bytes);


    const base64 =
      buffer.toString("base64");


    const dataUrl =
      `data:${file.type};base64,${base64}`;





    const fileContent =
      file.type === "application/pdf"

        ? {
            type:
              "input_file" as const,

            filename:
              file.name,

            file_data:
              dataUrl,
          }

        : {

            type:
              "input_image" as const,

            image_url:
              dataUrl,

            detail:
              "high" as const,

          };






    const extractionPrompt = `

You are extracting UK restaurant supplier invoices.

The uploaded file may contain ONE invoice or MULTIPLE invoices.

Read every page carefully.

Rules:

- Extract every separate invoice.
- If invoice numbers differ, create separate invoice objects.
- Do not merge separate invoices.
- Do not invent values.
- Return null when information is missing.
- Extract every genuine invoice line.
- Preserve supplier product descriptions.
- Ignore delivery notes and payment terms.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack should contain pack/unit information.
- unitPrice means invoice unit price.
- total means invoice line total.
- Invoice subtotal, VAT and total must come from totals section.
- Dates should use YYYY-MM-DD.

`;





    const response =
      await openai.responses.create({

        model:
          "gpt-5-mini",


        input:[

          {

            role:
              "user",


            content:[

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



        text:{

          format:{

            type:
              "json_schema",

            name:
              "restaurant_invoices",

            strict:
              true,

            schema:
              invoiceSchema,

          },

        },

      });





    const outputText =
      response.output_text;



    if(!outputText){

      return NextResponse.json(
        {
          error:
            "No extraction returned.",
        },
        {
          status:502,
        }
      );

    }





    const extracted =
      JSON.parse(outputText);




    const cleaned = {


      invoices:

        extracted.invoices.map(
          (invoice:any)=>({

            supplier:
              invoice.supplier ?? null,


            invoiceNumber:
              invoice.invoiceNumber ?? null,


            invoiceDate:
              invoice.invoiceDate ?? null,


            subtotal:
              invoice.subtotal ?? null,


            vat:
              invoice.vat ?? null,


            total:
              invoice.total ?? null,


            lineItems:

              Array.isArray(
                invoice.lineItems
              )

              ? invoice.lineItems
                  .filter(
                    (item:any)=>
                      item.product
                  )
                  .map(
                    (item:any)=>({

                      product:
                        item.product,


                      quantity:
                        item.quantity ?? null,


                      pack:
                        item.pack ?? null,


                      unitPrice:
                        item.unitPrice ?? null,


                      total:
                        item.total ?? null,


                      status:
                        item.status ?? null,

                    })
                  )

              : [],


          })
        ),

    };





    console.log(
      "Invoices extracted:",
      cleaned.invoices.length
    );



    return NextResponse.json(
      cleaned
    );




  }

  catch(error:any){


    console.error(
      "Invoice extraction error:",
      error
    );


    return NextResponse.json(

      {
        error:
          "Invoice extraction failed.",

        details:
          error.message,

      },

      {
        status:500,
      }

    );

  }

}
