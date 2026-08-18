import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;


const MAX_FILE_SIZE = 60 * 1024 * 1024;


const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];


const invoiceSchema = {
  type: "object",
  additionalProperties: false,

  properties: {

    supplier: {
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
};



export async function POST(request:Request){

try{


const apiKey = process.env.OPENAI_API_KEY;


if(!apiKey){

return NextResponse.json(
{
error:"Missing OPENAI_API_KEY"
},
{
status:500
}
);

}



const openai = new OpenAI({
apiKey
});



// =============================
// RECEIVE UPLOAD
// =============================


const formData =
await request.formData();


const file =
formData.get("file");



if(!file || !(file instanceof File)){

return NextResponse.json(
{
error:"No file received"
},
{
status:400
}
);

}



console.log(
"Invoice upload:",
file.name,
file.type,
file.size
);




if(file.size > MAX_FILE_SIZE){

return NextResponse.json(
{
error:"File exceeds 60MB limit"
},
{
status:400
}
);

}




if(!ALLOWED_TYPES.includes(file.type)){

return NextResponse.json(
{
error:"Unsupported file type"
},
{
status:400
}
);

}




// =============================
// UPLOAD FILE TO OPENAI
// =============================


const openaiFile =
await openai.files.create({

file,

purpose:"user_data",

});



console.log(
"OpenAI file:",
openaiFile.id
);




// =============================
// EXTRACT
// =============================


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

You are extracting data from a UK restaurant supplier invoice.

Rules:

- Extract every invoice line.
- Do not invent values.
- Return null if unknown.
- Keep product names exactly as written.
- Money values must be numbers only.
- Quantity must be numeric where possible.
- Pack must contain unit information.
- Dates should be YYYY-MM-DD.

`,

},



{

type:"input_file",

file_id:openaiFile.id,

},


],

},

],



text:{

format:{

type:"json_schema",

name:"restaurant_invoice",

strict:true,

schema:invoiceSchema,

},

},


});





const result =
response.output_text;



if(!result){

throw new Error(
"No output returned from OpenAI"
);

}




console.log(
"RAW RESULT:",
result.slice(0,500)
);



const invoice =
JSON.parse(result);





return NextResponse.json(invoice);



}
catch(error:any){

console.error(
"========== INVOICE EXTRACTION ERROR =========="
);

console.error(error);


return NextResponse.json(
{
error:"Invoice extraction failed",

details:
error?.message ??
JSON.stringify(error),

},

{
status:500,
    }
  );

}

}
