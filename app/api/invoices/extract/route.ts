import OpenAI from "openai";
import { NextResponse } from "next/server";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const maxDuration = 300;



const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });





const invoiceSchema = {


  type:"object",


  additionalProperties:false,


  properties:{


    invoices:{


      type:"array",


      minItems:1,


      items:{


        type:"object",


        additionalProperties:false,


        properties:{


          supplier:{
            type:[
              "string",
              "null"
            ]
          },


          invoiceNumber:{
            type:[
              "string",
              "null"
            ]
          },


          invoiceDate:{
            type:[
              "string",
              "null"
            ]
          },


          subtotal:{
            type:[
              "number",
              "null"
            ]
          },


          vat:{
            type:[
              "number",
              "null"
            ]
          },


          total:{
            type:[
              "number",
              "null"
            ]
          },



          lineItems:{


            type:"array",


            minItems:1,


            items:{


              type:"object",


              additionalProperties:false,


              properties:{


                product:{
                  type:"string"
                },


                quantity:{
                  type:[
                    "number",
                    "null"
                  ]
                },


                pack:{
                  type:[
                    "string",
                    "null"
                  ]
                },


                unitPrice:{
                  type:[
                    "number",
                    "null"
                  ]
                },


                total:{
                  type:[
                    "number",
                    "null"
                  ]
                },


                status:{
                  type:[
                    "string",
                    "null"
                  ]
                }


              },


              required:[

                "product",
                "quantity",
                "pack",
                "unitPrice",
                "total",
                "status"

              ]

            }


          }



        },


        required:[

          "supplier",
          "invoiceNumber",
          "invoiceDate",
          "subtotal",
          "vat",
          "total",
          "lineItems"

        ]

      }

    }


  },


  required:[
    "invoices"
  ]


};







const extractionPrompt = `

You are extracting structured data from UK restaurant supplier invoices.

The uploaded PDF may contain MULTIPLE invoices.

Read every page carefully.

IMPORTANT:

- Separate every invoice.
- Do not merge invoices together.
- Extract every genuine invoice line.
- Never create empty lineItems if products are visible.
- Preserve exact supplier product descriptions.
- Ignore delivery notes.
- Ignore payment terms.
- Ignore account summaries.

For each invoice extract:

supplier
invoice number
invoice date
subtotal
VAT
total

For every product line extract:

product
quantity
pack size
unit price
line total

Rules:

- Do not invent values.
- Return null when unknown.
- Keep product names exactly as written.
- Quantity must be numeric where possible.
- Money values must be numbers only.
- Dates must use YYYY-MM-DD.

If a PDF contains 11 invoices, return 11 invoices.

`;







export async function POST(
 request:Request
){


try{


const body =
 await request.json();



const {
 fileUrl,
 fileType,
 fileName
}=body;



if(!fileUrl){

return NextResponse.json(
 {
  error:
  "No file URL supplied"
 },
 {
  status:400
 }
);

}






const fileContent =

fileType === "application/pdf"

?

{

 type:
 "input_file",

 file_url:
 fileUrl

}

:

{

 type:
 "input_image",

 image_url:
 fileUrl,

 detail:
 "high"

};








console.log(
"Extracting:",
{
 fileName,
 fileType,
 fileUrl
}
);









const response =

await openai.responses.create({



model:
"gpt-5",



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
extractionPrompt

}


]


}


],





text:{


format:{


type:
"json_schema",


name:
"restaurant_invoice_batch",


strict:true,


schema:
invoiceSchema


}


}



});









const output =
response.output_text;





if(!output){


return NextResponse.json(

{
error:
"No extraction output"
},

{
status:500
}

);


}







let parsed;


try{


parsed =
JSON.parse(output);


}

catch(err){


console.error(
"JSON parse failed",
output
);



return NextResponse.json(

{
error:
"Invalid AI response",

raw:
output
},

{
status:500
}

);


}







const invoices =

(parsed.invoices || [])

.map((invoice:any)=>(


{


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

?

invoice.lineItems
.filter(
(item:any)=>
item.product
)

:

[]


}


));









console.log(

"Extracted invoices:",
invoices.length

);









return NextResponse.json({

invoices

});






}

catch(error:any){



console.error(
"Invoice extraction error:",
error
);




return NextResponse.json(

{

error:
"Invoice extraction failed",

details:
error?.message

},

{
status:500
}

);



}



}
