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

throw new Error(
"Missing OPENAI_API_KEY"
);

}



const openai =
new OpenAI({
apiKey,
});





// -------------------------
// RECEIVE SUPABASE URL
// -------------------------


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
error:"Missing file URL"
},
{
status:400
}
);

}



console.log(
"Downloading:",
fileName,
fileType
);





// -------------------------
// DOWNLOAD FILE
// -------------------------


const fileResponse =
await fetch(fileUrl);



if(!fileResponse.ok){

throw new Error(
"Could not download invoice file"
);

}



const fileBuffer =
await fileResponse.arrayBuffer();





const blob =
new Blob(
[
fileBuffer
],
{
type:fileType
}
);





const file =
new File(
[
blob
],
fileName,
{
type:fileType
}
);






// -------------------------
// SEND TO OPENAI
// -------------------------


const uploaded =
await openai.files.create({

file,

purpose:"user_data",

});



console.log(
"OpenAI file uploaded:",
uploaded.id
);






const response =
await openai.responses.create({

model:"gpt-5",


input:[

{

role:"user",

content:[


{

type:"input_text",

text:`

You are processing UK restaurant supplier invoices.

This document may contain:
- multiple pages
- multiple invoices
- invoice continuation pages


IMPORTANT:

Read the entire document.

If multiple invoices exist:
- create one invoice object per invoice
- keep invoice numbers separate
- keep dates separate
- keep totals separate


Rules:

- Extract every genuine invoice line.
- Do not stop after the first page.
- Preserve product descriptions exactly.
- Do not invent values.
- Return null if unknown.
- Ignore delivery notes and payment terms.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack must contain unit information.
- Dates should be YYYY-MM-DD.

Before returning:
Check that every page has been reviewed.

`.trim(),

},



{

type:"input_file",

file_id:uploaded.id,

},


],

},

],



text:{

format:{

type:"json_schema",

name:"batch_invoice",

strict:true,

schema:invoiceSchema,

}

}

});







const output =
response.output_text;



if(!output){

throw new Error(
"No OpenAI response"
);

}




console.log(
"Extraction complete:",
output.substring(0,300)
);




return NextResponse.json(
JSON.parse(output)
);



}

catch(error:any){


console.error(
"INVOICE EXTRACTION ERROR:",
error
);



return NextResponse.json(

{

error:
"Invoice extraction failed",

details:
error?.message ||
String(error)

},

{
status:500
}

);


}

}
