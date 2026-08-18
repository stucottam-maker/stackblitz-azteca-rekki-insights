import OpenAI from "openai";
import { NextResponse } from "next/server";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;


const MAX_FILE_SIZE = 60 * 1024 * 1024;


const SUPPORTED_FILE_TYPES = [
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

      type:"array",

      items: {

        type:"object",

        additionalProperties:false,

        properties: {

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





const extractionPrompt = `

You are extracting structured data from a UK restaurant supplier invoice.

Read the invoice carefully.

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
- total means the invoice line total.
- Invoice totals must come from the totals section.
- Dates should use YYYY-MM-DD format where possible.

`;





export async function POST(request:Request){

try{


const apiKey = process.env.OPENAI_API_KEY;


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



const openai = new OpenAI({
apiKey,
});





// ===============================
// GET FILE FROM UPLOAD FORM
// ===============================


const formData =
await request.formData();


const uploadedFile =
formData.get("file");



if(
!uploadedFile ||
!(uploadedFile instanceof File)
){

return NextResponse.json(
{
error:"No invoice file uploaded"
},
{
status:400
}
);

}





if(uploadedFile.size === 0){

return NextResponse.json(
{
error:"File is empty"
},
{
status:400
}
);

}




if(uploadedFile.size > MAX_FILE_SIZE){

return NextResponse.json(
{
error:"File too large. Maximum 60MB."
},
{
status:400
}
);

}





if(
!SUPPORTED_FILE_TYPES.includes(
uploadedFile.type
)
){

return NextResponse.json(
{
error:"Unsupported file type"
},
{
status:400
}
);

}





console.log(
"Invoice received:",
uploadedFile.name,
uploadedFile.type,
uploadedFile.size
);





// ===============================
// CONVERT FILE
// ===============================


const bytes =
await uploadedFile.arrayBuffer();


const buffer =
Buffer.from(bytes);


const base64 =
buffer.toString("base64");



const dataUrl =
`data:${uploadedFile.type};base64,${base64}`;






// ===============================
// OPENAI FILE CONTENT
// ===============================


const fileContent =

uploadedFile.type === "application/pdf"

?

{

type:"input_file" as const,

filename:
uploadedFile.name,

file_data:
dataUrl,

}

:

{

type:"input_image" as const,

image_url:
dataUrl,

detail:"high" as const,

};







// ===============================
// EXTRACTION
// ===============================



const response =
await openai.responses.create({

model:"gpt-5-mini",


input:[

{

role:"user",

content:[


{

type:"input_text",

text:extractionPrompt,

},


fileContent,


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





const outputText =
response.output_text;



if(!outputText){

return NextResponse.json(
{
error:"No extraction result returned"
},
{
status:502
}
);

}





let invoice;



try{

invoice =
JSON.parse(outputText);

}

catch(error){

console.error(
"JSON parse failed",
outputText
);


return NextResponse.json(
{
error:"Invalid JSON returned"
},
{
status:502
}
);

}





// ===============================
// CLEAN RESULT
// ===============================



const cleaned = {


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
(item:any)=>
item.product &&
item.product.trim()
)

.map(
(item:any)=>({

product:item.product.trim(),

quantity:
typeof item.quantity==="number"
? item.quantity
: null,

pack:
item.pack ?? null,

unitPrice:
typeof item.unitPrice==="number"
? item.unitPrice
: null,

total:
typeof item.total==="number"
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
cleaned.supplier,
cleaned.lineItems.length,
"lines"
);





return NextResponse.json(cleaned);



}

catch(error:any){

console.error(
"Invoice extraction error:",
error
);


return NextResponse.json(

{

error:"Invoice extraction failed.",

details:
process.env.NODE_ENV==="development"
?
error.message
:
undefined,

},

{
status:500
}

);


}

}
