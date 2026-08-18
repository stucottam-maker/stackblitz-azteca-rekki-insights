"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function InvoiceUploadPage() {

  const router = useRouter();

  const [file,setFile] = useState<File | null>(null);

  const [uploading,setUploading] = useState(false);

  const [error,setError] = useState("");



  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    setError("");

    const selected =
      e.target.files?.[0];


    if(!selected){
      return;
    }


    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp"
    ];


    if(
      !allowed.includes(selected.type)
    ){

      setError(
        "Please upload a PDF, JPG, PNG or WEBP file."
      );

      return;

    }


    setFile(selected);

  }





  async function extractInvoice(){


    if(!file){

      setError(
        "Please choose an invoice first."
      );

      return;

    }



    try {


      setUploading(true);

      setError("");



      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );




      const response =
        await fetch(
          "/api/invoices/extract",
          {
            method:"POST",
            body:formData
          }
        );





      const text =
        await response.text();



      let data:any;


      try {

        data =
          JSON.parse(text);

      }
      catch {

        throw new Error(
          text ||
          "Invalid server response"
        );

      }





      if(!response.ok){

        throw new Error(
          data.error ||
          "Invoice extraction failed"
        );

      }





      console.log(
        "EXTRACT RESULT",
        data
      );





      const invoices =
        Array.isArray(data)
          ? data
          : data.invoices;



      if(
        !Array.isArray(invoices) ||
        invoices.length === 0
      ){

        throw new Error(
          "No invoices were extracted"
        );

      }




      sessionStorage.setItem(
        "extractedInvoices",
        JSON.stringify(invoices)
      );



      router.push(
        "/invoices/review"
      );



    }


    catch(err:any){


      console.error(
        "UPLOAD ERROR",
        err
      );


      setError(
        err.message ||
        "Invoice extraction failed"
      );


    }


    finally{

      setUploading(false);

    }

  }





  return (

    <div className="page">


      <div className="page-header">


        <div>

          <p className="eyebrow">
            Purchasing
          </p>


          <h1>
            Upload invoice
          </h1>


          <p>
            Upload supplier invoices. Kitchen Insights extracts products,
            quantities and pricing.
          </p>


        </div>


      </div>






      <div className="card">


        <h2>
          Capture invoice
        </h2>



        <label
          style={{
            display:"block",
            marginTop:30,
            border:"2px dashed #ddd",
            borderRadius:20,
            padding:50,
            textAlign:"center",
            cursor:"pointer"
          }}
        >


          <input
            type="file"
            hidden
            accept="
              application/pdf,
              image/jpeg,
              image/png,
              image/webp
            "
            onChange={handleFileChange}
          />



          <strong>

            {
              file
              ? file.name
              : "Choose invoice file"
            }

          </strong>



          <p>
            PDF · JPG · PNG · WEBP
          </p>



        </label>






        {
          error &&

          <div className="notice">

            {error}

          </div>

        }






        <button
          className="primary-button"
          style={{
            marginTop:25
          }}
          onClick={extractInvoice}
          disabled={uploading}
        >

          {
            uploading
            ? "Extracting..."
            : "Extract invoice"
          }

        </button>



      </div>



    </div>

  );

}
