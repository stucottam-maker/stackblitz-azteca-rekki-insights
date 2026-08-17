"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";

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

    if (!selected) {
      return;
    }

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError(
        "Please upload a PDF, JPG, PNG or WEBP invoice."
      );
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError(
        "File is too large. Maximum size is 10MB."
      );
      return;
    }

    setFile(selected);
  }

  async function extractInvoice() {
    if (!file || uploading) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/invoices/extract",
        {
          method: "POST",
          body: formData,
        }
      );

     const text = await response.text();

let result;

try {
  result = JSON.parse(text);
} catch {
  throw new Error(text);
}

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

      router.push("/invoices/review");

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not extract invoice."
      );

    } finally {
      setUploading(false);
    }
  }


  return (
    <div className="app-shell">

      <Sidebar active="invoices" />

      <main className="main-content">

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
              display: "block",
              border: "2px dashed #ddd",
              borderRadius: "18px",
              padding: "50px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >

            <input
              type="file"
              hidden
              accept="application/pdf,image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />


            <div
              style={{
                fontSize: "42px",
                marginBottom: "15px",
              }}
            >
              ↑
            </div>


            <h3>
              {file
                ? file.name
                : "Add an invoice"}
            </h3>


            <p>
              Upload PDF or photograph a paper invoice.
            </p>


            <p
              style={{
                marginTop: "15px",
                color: "#888",
              }}
            >
              PDF · JPG · PNG · WEBP
            </p>

          </label>


          {error && (
            <div
              style={{
                marginTop: "20px",
                color: "#a43e32",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}


          <button
            type="button"
            className="primary-button"
            style={{
              marginTop: "25px",
            }}
            disabled={!file || uploading}
            onClick={extractInvoice}
          >

            {uploading
              ? "Extracting invoice..."
              : "Extract invoice"}

          </button>


        </section>

      </main>

    </div>
  );
}
