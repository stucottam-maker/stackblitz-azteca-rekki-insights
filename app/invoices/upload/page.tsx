"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import { supabase } from "../../lib/supabase";


const MAX_FILE_SIZE = 60 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];


export default function UploadInvoicePage() {

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");


  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const selected = event.target.files?.[0];

    setError("");

    if (!selected) return;


    if (!ACCEPTED_TYPES.includes(selected.type)) {

      setError(
        "Please upload PDF, JPG, PNG or WEBP files only."
      );

      return;
    }


    if (selected.size > MAX_FILE_SIZE) {

      setError(
        "File too large. Maximum size is 60MB."
      );

      return;
    }


    setFile(selected);
  }



  async function extractInvoice() {

    if (!file || uploading) return;


    setUploading(true);
    setError("");


    try {

      /*
        1. Upload file to Supabase Storage
      */


      const filePath =
        `invoices/${Date.now()}-${file.name}`;


      const {
        error: uploadError,
      } = await supabase.storage
        .from("invoice-files")
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );


      if (uploadError) {

        console.error(
          "Storage upload error:",
          uploadError
        );

        throw new Error(
          uploadError.message
        );
      }



      /*
        2. Get public URL
      */


      const {
        data: urlData,
      } = supabase.storage
        .from("invoice-files")
        .getPublicUrl(filePath);


      const fileUrl =
        urlData.publicUrl;



      /*
        3. Send URL to extraction API
      */


      const response =
        await fetch(
          "/api/invoices/extract",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({

              fileUrl,

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



      /*
        4. Store result temporarily
      */


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



    } catch (err:any) {

      console.error(
        err
      );


      setError(
        err.message ||
        "Invoice upload failed."
      );


    } finally {

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
              Upload a supplier invoice and
              Kitchen Insights will extract
              products, quantities and prices.
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
              Upload PDF or photograph a paper invoice.
            </p>


            <p
              style={{
                color:"#888",
                marginTop:"12px",
              }}
            >
              PDF · JPG · PNG · WEBP
            </p>


          </label>



          {
            error && (

              <p
                style={{
                  color:"#b42318",
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

            disabled={
              !file ||
              uploading
            }

            onClick={
              extractInvoice
            }

            style={{
              marginTop:"25px",
            }}

          >

            {
              uploading
              ? "Uploading invoice..."
              : "Extract invoice"
            }


          </button>



        </section>


      </section>


    </main>

  );

}
