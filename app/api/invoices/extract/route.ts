import OpenAI from "openai";
import { NextResponse } from "next/server";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;



const invoiceSchema = {

  type: "object",

  additionalProperties:false,


  properties:{


    invoices:{

      type:"array",

      items:{

        type:"object",

        additionalProperties:false,


        properties:{


          supplier:{
            type:["string","null"],
          },


          invoiceNumber:{
            type:["string","null"],
          },


          invoiceDate:{
            type:["string","null"],
          },


          subtotal:{
            type:["number","null"],
          },


          vat:{
            type:["number","null"],
          },


          total:{
            type:["number","null"],
          },



          lineItems:{


            type:"array",


            items:{


              type:"object",

              additionalProperties:false,


              properties:{


                product:{
                  type:"string",
                },


                quantity:{
                  type:["number","null"],
                },


                pack:{
                  type:["string","null"],
                },


                unitPrice:{
                  type:["number","null"],
                },


                total:{
                  type:["number","null"],
                },


                status:{
                  type:["string","null"],
                },


              },


              required:[

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


        required:[

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


  required:[

    "invoices",

  ],

};





export async function POST(request:Request){


try{


const apiKey =
process.env.OPENAI_API_KEY;



if(!apiKey){

return NextResponse.json(
{
error:"OpenAI API key missing"
},
{
status:500
}
);

}



const openai =
new OpenAI({
apiKey
});





const body =
await request.json();



const {
fileUrl,
fileName,
fileType
}=body;



if(!fileUrl){

return NextResponse.json(
{
error:"No invoice URL received"
},
{
status:400
}
);

}




console.log(
"Processing invoice:",
fileName,
fileType
);






const response =
await openai.responses.create({


model:"gpt-5-mini",



input:[


{


role:"user",


content:[


{


type:"input_text",


text:`

You are processing a UK restaurant supplier invoice PDF.

IMPORTANT:

This PDF may contain multiple invoices.

Read EVERY page.

Do not stop after the first page.

If the PDF contains multiple invoices:
- create one object per invoice
- keep each invoice number separate
- keep each invoice date separate
- keep each invoice total separate
- combine all product lines belonging to that invoice


Rules:

- Extract every genuine invoice line.
- Preserve supplier product descriptions exactly.
- Do not invent values.
- Return null when information is missing.
- Ignore delivery notes, payment terms, bank details and footer text.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack should contain pack/unit information.
- unitPrice means price per invoiced unit.
- total means line total/net value.
- Dates should use YYYY-MM-DD.

Before answering:
Check every page has been reviewed.

`


},



{


type:"input_file",


file_url:fileUrl,


},


],


},


],



text:{


format:{


type:"json_schema",


name:"batch_restaurant_invoice",


strict:true,


schema:invoiceSchema,


},


},


});






const output =
response.output_text;



console.log(
"Extraction output:",
output?.slice(0,500)
);



if(!output){

throw new Error(
"No extraction output returned"
);

}





const parsed =
JSON.parse(output);





return NextResponse.json(
parsed
);



}

catch(error:any){


console.error(
"FULL EXTRACTION ERROR:",
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
status:500
}

);


}


}
