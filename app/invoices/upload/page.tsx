"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { supabase } from "../../lib/supabase";


const MAX_FILE_SIZE =
  60 * 1024 * 1024;


const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
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
        "Please upload PDF, JPG, PNG or WEBP."
      );

      return;
    }


    if (
      selected.size >
      MAX_FILE_SIZE
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


      /*
       ---------------------------------
       1. Upload original invoice
       to Supabase Storage
       ---------------------------------
      */


      const safeName =
        file.name
          .replace(/\s+/g, "-")
          .toLowerCase();


      const filePath =
        `invoices/${Date.now()}-${safeName}`;



      const {
        data: uploadData,
        error: uploadError,
      } =
        await supabase.storage
          .from("invoice-files")
          .upload(
            filePath,
            file,
            {
              contentType:
                file.type,
            }
          );


      if (uploadError) {
        throw uploadError;
      }



      /*
       ---------------------------------
       2. Create temporary signed URL
       ---------------------------------
      */


      const {
        data: signedData,
        error: signedError,
      } =
        await supabase.storage
          .from("invoice-files")
          .createSignedUrl(
            uploadData.path,
            600
          );


      if (signedError) {
        throw signedError;
      }



      /*
       ---------------------------------
       3. Send only URL to API
       ---------------------------------
      */


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

              fileUrl:
                signedData.signedUrl,

              fileName:
                file.name,

              fileType:
                file.type,

            }),
          }
        );



      const result =
        await response.json();



      if (!response.ok) {

        throw new Error(
          result.error ||
          "Invoice extraction failed."
        );

      }



      sessionStorage.setItem(
        "invoiceExtraction",
        JSON.stringify(result)
      );


      sessionStorage.setItem(
        "invoiceFileName",
        file.name
      );



      router.push(
        "/invoices/review"
      );


    } catch(err:any) {


      console.error(err);


      setError(
        err.message ||
        "Could not process invoice."
      );


    } finally {


      setUploading(false);


    }

  }



  return (

    <div className="app-shell">


      <Sidebar active="invoices" />



      <main className="main-content invoices-page">


        <header className="topbar">

          <div>

            <p className="eyebrow">
              Purchasing
            </p>


            <h1>
              Upload invoice
            </h1>


            <p className="page-description">
              Upload supplier invoices.
              Kitchen Insights extracts products,
              quantities and pricing.
            </p>

          </div>


        </header>




        <section className="panel">


          <div className="panel-header">

            <div>

              <p className="panel-kicker">
                Invoice
              </p>


              <h2>
                Capture invoice
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
                image/jpeg,
                image/png,
                image/webp
              "
              onChange={
                handleFileChange
              }
            />



            <div
              style={{
                fontSize:"42px",
              }}
            >
              ↑
            </div>



            <h3>

              {
                file
                ? file.name
                : "Add an invoice"
              }

            </h3>



            <p>
              Upload PDF or invoice photo.
            </p>



            <small>
              PDF · JPG · PNG · WEBP
            </small>



          </label>




          {
            error && (

              <p
                style={{
                  color:"#b33",
                  marginTop:"20px",
                  fontWeight:600,
                }}
              >
                {error}
              </p>

            )
          }





          <button

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
              ? "Uploading & extracting..."
              : "Extract invoice"
            }


          </button>




        </section>



      </main>



    </div>

  );

}
