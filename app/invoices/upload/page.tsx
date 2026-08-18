"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const STORAGE_BUCKET = "invoice-files";
const MAX_SOURCE_SIZE = 30 * 1024 * 1024;
const MAX_IMAGE_EDGE = 2400;

const DIRECT_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function inferFileType(file: File) {
  if (file.type) return file.type.toLowerCase();
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "application/pdf";
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "heic") return "image/heic";
  if (extension === "heif") return "image/heif";
  return "";
}

function isAcceptedFile(file: File) {
  const type = inferFileType(file);
  return type === "application/pdf" || type.startsWith("image/");
}

function safeFileName(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "invoice"
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function loadBrowserImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This photo format could not be prepared on this device."));
    };
    image.src = url;
  });
}

async function prepareImageForUpload(file: File) {
  const originalType = inferFileType(file);

  if (DIRECT_IMAGE_TYPES.has(originalType) && file.size <= 2.5 * 1024 * 1024) {
    return file;
  }

  try {
    const image = await loadBrowserImage(file);
    const largestEdge = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = largestEdge > MAX_IMAGE_EDGE ? MAX_IMAGE_EDGE / largestEdge : 1;
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare this photo.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });
    if (!blob) throw new Error("Could not prepare this photo.");

    const stem = file.name.replace(/\.[^.]+$/, "") || "invoice-photo";
    return new File([blob], `${stem}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (error) {
    if (DIRECT_IMAGE_TYPES.has(originalType) && file.size <= 8 * 1024 * 1024) {
      return file;
    }
    throw error;
  }
}

export default function InvoiceUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setError("");
    setStage("");
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;

    if (!isAcceptedFile(selected)) {
      setFile(null);
      setError("Please choose a PDF or an invoice photo.");
      return;
    }
    if (selected.size > MAX_SOURCE_SIZE) {
      setFile(null);
      setError("That file is too large. Please use a file under 30 MB.");
      return;
    }

    try {
      setPreparing(true);
      setStage(inferFileType(selected).startsWith("image/") ? "Preparing photo…" : "");
      let prepared = selected;
      const type = inferFileType(selected);
      if (type.startsWith("image/")) {
        prepared = await prepareImageForUpload(selected);
      } else if (!selected.type && type) {
        prepared = new File([selected], selected.name, {
          type,
          lastModified: selected.lastModified,
        });
      }
      setFile(prepared);
      setStage("");
    } catch (err) {
      console.error("PHOTO PREP ERROR", err);
      setFile(null);
      setStage("");
      setError(
        "This photo could not be prepared. Try the Take photo button, or choose a JPG, PNG, WEBP or PDF."
      );
    } finally {
      setPreparing(false);
    }
  }

  async function extractInvoice() {
    if (!file) {
      setError("Please take a photo or choose an invoice first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setStage("Uploading invoice…");

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token || !session.user?.id) {
        router.replace("/login");
        return;
      }

      const fileType = inferFileType(file) || "application/octet-stream";
      const dateFolder = new Date().toISOString().slice(0, 10);
      const randomPart =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      const storagePath = `uploads/${session.user.id}/${dateFolder}/${Date.now()}-${randomPart}-${safeFileName(
        file.name
      )}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, file, {
          contentType: fileType,
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      const { data: signedData, error: signedError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(storagePath, 15 * 60);
      if (signedError || !signedData?.signedUrl) {
        throw new Error(signedError?.message || "The uploaded invoice could not be opened.");
      }

      setStage("Reading invoice…");
      const response = await fetch("/api/invoices/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          fileUrl: signedData.signedUrl,
          fileType,
          fileName: file.name,
        }),
      });

      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || "Invalid server response");
      }
      if (!response.ok) {
        throw new Error(data.details || data.error || "Invoice extraction failed");
      }

      const invoices = Array.isArray(data) ? data : data.invoices;
      if (!Array.isArray(invoices) || invoices.length === 0) {
        throw new Error("No invoices were extracted from this file.");
      }

      sessionStorage.setItem("extractedInvoices", JSON.stringify(invoices));
      sessionStorage.setItem(
        "extractedInvoiceSource",
        JSON.stringify({
          fileName: file.name,
          fileType,
          filePath: storagePath,
        })
      );

      setStage("Opening review…");
      router.push("/invoices/review");
    } catch (err: any) {
      console.error("UPLOAD ERROR", err);
      setStage("");
      setError(err.message || "Invoice extraction failed");
    } finally {
      setUploading(false);
    }
  }

  const busy = preparing || uploading;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Upload invoice</h1>
          <p>
            Take a clear photo on your phone, or choose an existing PDF or image.
            Kitchen Insights will extract the supplier, products and pricing.
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 760 }}>
        <h2>Capture invoice</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 12,
            marginTop: 24,
          }}
        >
          <label
            className="primary-button"
            style={{
              minHeight: 54,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.6 : 1,
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              disabled={busy}
            />
            📷 Take photo
          </label>

          <label
            style={{
              minHeight: 54,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d7d7d2",
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 700,
              textAlign: "center",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.6 : 1,
              background: "#fff",
            }}
          >
            <input
              type="file"
              hidden
              accept="application/pdf,image/*,.pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={handleFileChange}
              disabled={busy}
            />
            Choose file or photo
          </label>
        </div>

        <div
          style={{
            marginTop: 18,
            border: "2px dashed #ddd",
            borderRadius: 16,
            padding: 20,
            minHeight: 92,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {file ? (
            <>
              <strong style={{ overflowWrap: "anywhere" }}>{file.name}</strong>
              <span style={{ marginTop: 5, opacity: 0.7 }}>
                {formatFileSize(file.size)} · {inferFileType(file) || "file"}
              </span>
            </>
          ) : (
            <>
              <strong>No invoice selected</strong>
              <span style={{ marginTop: 5, opacity: 0.7 }}>
                PDF · JPG · PNG · WEBP · iPhone/Android camera
              </span>
            </>
          )}
        </div>

        {stage && <div className="notice" style={{ marginTop: 16 }}>{stage}</div>}
        {error && <div className="notice" style={{ marginTop: 16 }}>{error}</div>}

        <button
          className="primary-button"
          style={{ marginTop: 20, minHeight: 52 }}
          onClick={extractInvoice}
          disabled={busy || !file}
        >
          {uploading ? "Working…" : "Extract invoice"}
        </button>

        <p style={{ marginTop: 14, opacity: 0.68, fontSize: 14 }}>
          For best results, fill the frame with the invoice, keep all four corners visible and avoid glare or heavy shadows.
        </p>
      </div>
    </div>
  );
}
