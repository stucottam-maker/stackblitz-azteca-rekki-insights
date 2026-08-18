"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { supabase } from "../../lib/supabase";


const MAX_FILE_SIZE =
  60 * 1024 * 1024;


const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];



export default function UploadInvoicePage() {


  const router = useRouter();


  const [file, setFile] =
    useState<File | null>(null);


  const [uploading, setUploading] =
    useState(false);


  const [error, setError] =
    useState("");





  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {


    const selected =
      event.target.files?.[0];


    setError("");



    if (!selected) {
      return;
    }



    if (
      !ACCEPTED_TYPES.includes(
        selected.type
      )
    ) {

      setError(
        `Unsupported file type: ${
          selected.type || "unknown"
        }. Please upload PDF, JPG, PNG, WEBP or HEIC.`
      );

      return;

    }



    if (
      selected.size > MAX_FILE_SIZE
    ) {

      setError(
        "File too large. Maximum size is 60MB."
      );

      return;

    }



    setFile(selected);

  }







  async function extractInvoice() {


    if (
      !file ||
      uploading
    ) {

      return;

    }



    setUploading(true);

    setError("");



    try {


      // -----------------------------
      // Upload to Supabase Storage
      // -----------------------------


      const safeName =
        file.name
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9.-]/g, "");



      const filePath =
        `invoices/${Date.now()}-${safeName}`;




      const {
        error: uploadError
      } =
      await supabase.storage
        .from("invoice-files")
        .upload(
          filePath,
          file,
          {
            contentType:
              file.type ||
              "application/octet-stream",

            upsert:false,
          }
        );



      if (uploadError) {

        throw new Error(
          `Storage upload failed: ${uploadError.message}`
        );

      }





      const {
        data:urlData
      } =
      supabase.storage
        .from("invoice-files")
        .getPublicUrl(
          filePath
        );



      const fileUrl =
        urlData.publicUrl;



      console.log(
        "Stored invoice:",
        fileUrl
      );







      // -----------------------------
      // Call extraction API
      // -----------------------------


      const response =
        await fetch(
          "/api/invoices/extract",
          {

            method:"POST",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:JSON.stringify({

              fileUrl,

              fileName:
                file.name,

              fileType:
                file.type ||
                "application/octet-stream",

            }),

          }
        );






      const responseText =
        await response.text();



      let result:any;



      try {

        result =
          JSON.parse(responseText);

      }

      catch {

        console.error(
          "Non JSON response:",
          responseText
        );


        throw new Error(
          responseText ||
          "Unknown extraction error"
        );

      }






      console.log(
        "Extraction:",
        result
      );






      if (!response.ok) {

        throw new Error(
          result.details ||
          result.error ||
          "Invoice extraction failed"
        );

      }







      // -----------------------------
      // Store extraction result
      // -----------------------------


      sessionStorage.setItem(
        "invoiceExtraction",
        JSON.stringify(result)
      );



      sessionStorage.setItem(
        "invoiceFileName",
        file.name
      );



      sessionStorage.setItem(
        "invoiceFileUrl",
        fileUrl
      );





      router.push(
        "/invoices/review"
      );



    }

    catch(error:any) {


      console.error(
        "Invoice upload error:",
        error
      );


      setError(
        error.message ||
        "Invoice extraction failed"
      );


    }

    finally {

      setUploading(false);

    }


  }








  return (

    <main className="app-shell">


      <Sidebar active="invoices" />



      <section className="main-content">



        <header className="topbar">

          <div>

            <p className="eyebrow">
              Purchasing
            </p>


            <h1>
              Upload invoice
            </h1>


            <p className="page-description">
              Upload supplier invoices and extract products, quantities and pricing.
            </p>


          </div>


        </header>






        <section className="panel">



          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Invoice capture
              </p>


              <h2>
                Add supplier invoice
              </h2>


            </div>


          </div>






          <label
            style={{
              display:"block",
              border:"2px dashed #ddd",
              borderRadius:"18px",
              padding:"50px",
              textAlign:"center",
              cursor:"pointer",
            }}
          >



            <input

              type="file"

              hidden

              accept="
                application/pdf,
                image/*
              "

              onChange={
                handleFileChange
              }

            />



            <div
              style={{
                fontSize:"42px",
                marginBottom:"15px",
              }}
            >
              ↑
            </div>




            <h3>

              {
                file
                ?
                file.name
                :
                "Choose invoice file"
              }

            </h3>



            <p>
              PDF or photo from your phone.
            </p>



            <p
              style={{
                marginTop:"12px",
                color:"#888",
              }}
            >
              PDF · JPG · PNG · WEBP · HEIC
            </p>


          </label>







          {
            error && (

              <div
                style={{
                  marginTop:"20px",
                  color:"#a43e32",
                  fontWeight:600,
                  whiteSpace:"pre-wrap",
                }}
              >
                {error}
              </div>

            )
          }








          <button

            type="button"

            className="primary-button"

            style={{
              marginTop:"25px",
            }}

            disabled={
              !file ||
              uploading
            }

            onClick={
              extractInvoice
            }

          >

            {
              uploading
              ?
              "Processing invoice..."
              :
              "Extract invoice"
            }


          </button>





        </section>



      </section>


    </main>

  );


}
