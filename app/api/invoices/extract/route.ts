import OpenAI from "openai";
import { NextResponse } from "next/server";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});





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
- Ignore delivery notes.
- Ignore payment terms.
- Ignore account summaries.

For every invoice return:

supplier
invoice number
invoice date
subtotal
VAT
total

For every line:

product
quantity
pack
unit price
line total

Rules:

- Do not invent information.
- Use null if unknown.
- Money values must be numbers.
- Quantity must be numeric where possible.
- Dates must be YYYY-MM-DD.

If there are 32 invoices, return 32 invoices.

`;








export async function POST(
  request: Request
) {


  try {


    const body =
      await request.json();



    const {
      fileUrl,
      fileType,
      fileName,
    } = body;



    if (!fileUrl) {

      return NextResponse.json(
        {
          error:
            "Missing file URL",
        },
        {
          status:400,
        }
      );

    }






    const content:any[] = [];



    if (
      fileType === "application/pdf"
    ) {


      content.push({

        type: "input_file",

        file_url: fileUrl,

      } as any);



    } else {


      content.push({

        type: "input_image",

        image_url: fileUrl,

        detail: "high",

      } as any);


    }





    content.push({

      type:"input_text",

      text:prompt,

    });








    console.log(
      "Starting extraction:",
      fileName
    );








    const response =
      await openai.responses.create({


        model:
          "gpt-5",



        input:[

          {

            role:"user",

            content,

          },

        ],



        text:{

          format:{

            type:"json_schema",

            name:
              "invoice_batch",


            strict:true,


            schema:
              invoiceSchema,

          },

        },


      });







    const output =
      response.output_text;



    console.log(
      "AI OUTPUT LENGTH:",
      output?.length
    );






    if(!output){


      throw new Error(
        "No response from OpenAI"
      );


    }






    const parsed =
      JSON.parse(output);






    return NextResponse.json({

      invoices:
        parsed.invoices || [],

    });







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
          error.message,

      },


      {
        status:500,
      }

    );


  }


}
