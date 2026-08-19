"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const STORAGE_BUCKET = "invoice-files";
const MAX_SOURCE_SIZE = 30 * 1024 * 1024;
const MAX_IMAGE_EDGE = 2400;
const MAX_PHOTO_PAGES = 12;
const MAX_TOTAL_PREPARED_SIZE = 36 * 1024 * 1024;

const DIRECT_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type SelectedInvoiceFile = {
  id: string;
  file: File;
};

type UploadedInvoiceFile = {
  fileName: string;
  fileType: string;
  filePath: string;
  fileUrl: string;
};

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

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function loadBrowserImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
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
    let imageSource: CanvasImageSource;
    let widthSource = 0;
    let heightSource = 0;
    let closeImage: (() => void) | null = null;

    if (typeof createImageBitmap === "function") {
      try {
        const bitmap = await createImageBitmap(file);
        imageSource = bitmap;
        widthSource = bitmap.width;
        heightSource = bitmap.height;
        closeImage = () => bitmap.close();
      } catch {
        const image = await loadBrowserImage(file);
        imageSource = image;
        widthSource = image.naturalWidth;
        heightSource = image.naturalHeight;
      }
    } else {
      const image = await loadBrowserImage(file);
      imageSource = image;
      widthSource = image.naturalWidth;
      heightSource = image.naturalHeight;
    }

    const largestEdge = Math.max(widthSource, heightSource);
    const scale = largestEdge > MAX_IMAGE_EDGE ? MAX_IMAGE_EDGE / largestEdge : 1;
    const width = Math.max(1, Math.round(widthSource * scale));
    const height = Math.max(1, Math.round(heightSource * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare this photo.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(imageSource, 0, 0, width, height);
    closeImage?.();

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

function PhotoPreview({
  entry,
  index,
  onRemove,
  disabled,
}: {
  entry: SelectedInvoiceFile;
  index: number;
  onRemove: (id: string) => void;
  disabled: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState("");
  const type = inferFileType(entry.file);
  const isImage = type.startsWith("image/");

  useEffect(() => {
    if (!isImage) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(entry.file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [entry.file, isImage]);

  return (
    <article
      style={{
        border: "1px solid #dedbd4",
        borderRadius: 14,
        padding: 10,
        background: "#fff",
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 5",
          borderRadius: 10,
          overflow: "hidden",
          background: "#f5f2ec",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt={`Invoice page ${index + 1}`}
            width={320}
            height={400}
            unoptimized
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 32 }}>📄</div>
            <strong>PDF invoice</strong>
          </div>
        )}
      </div>

      <div style={{ marginTop: 9, minWidth: 0 }}>
        <strong style={{ display: "block", overflowWrap: "anywhere" }}>
          {isImage ? `Page ${index + 1}` : entry.file.name}
        </strong>
        <span style={{ display: "block", marginTop: 3, opacity: 0.65, fontSize: 12 }}>
          {formatFileSize(entry.file.size)}
        </span>
        <button
          type="button"
          className="secondary-inline-button"
          style={{ marginTop: 8, width: "100%" }}
          onClick={() => onRemove(entry.id)}
          disabled={disabled}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default function InvoiceUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<SelectedInvoiceFile[]>([]);
  const [preparing, setPreparing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");

  const totalPreparedSize = useMemo(
    () => files.reduce((sum, entry) => sum + entry.file.size, 0),
    [files]
  );

  const hasPdf = files.some((entry) => inferFileType(entry.file) === "application/pdf");
  const busy = preparing || uploading;

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
    mode: "append" | "replace"
  ) {
    setError("");
    setStage("");
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selectedFiles.length === 0) return;

    if (selectedFiles.some((selected) => !isAcceptedFile(selected))) {
      setError("Please choose invoice photos or one PDF.");
      return;
    }

    if (selectedFiles.some((selected) => selected.size > MAX_SOURCE_SIZE)) {
      setError("One of those files is over 30 MB. Please take another photo or choose a smaller file.");
      return;
    }

    const selectedPdfs = selectedFiles.filter(
      (selected) => inferFileType(selected) === "application/pdf"
    );
    if (selectedPdfs.length > 0 && selectedFiles.length > 1) {
      setError("Please upload one PDF on its own, or use photos for a multi-page invoice.");
      return;
    }

    const existingImageCount = files.filter(
      (entry) => inferFileType(entry.file) !== "application/pdf"
    ).length;
    if (
      selectedPdfs.length === 0 &&
      (mode === "append" ? existingImageCount : 0) + selectedFiles.length > MAX_PHOTO_PAGES
    ) {
      setError(`You can capture up to ${MAX_PHOTO_PAGES} invoice pages at once.`);
      return;
    }

    try {
      setPreparing(true);
      setStage(selectedPdfs.length ? "Preparing PDF…" : "Preparing photo…");

      const preparedEntries: SelectedInvoiceFile[] = [];
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const selected = selectedFiles[index];
        const type = inferFileType(selected);
        setStage(
          type.startsWith("image/")
            ? `Preparing photo ${index + 1} of ${selectedFiles.length}…`
            : "Preparing PDF…"
        );

        let prepared = selected;
        if (type.startsWith("image/")) {
          prepared = await prepareImageForUpload(selected);
        } else if (!selected.type && type) {
          prepared = new File([selected], selected.name, {
            type,
            lastModified: selected.lastModified,
          });
        }

        preparedEntries.push({ id: randomId(), file: prepared });
      }

      const currentBase =
        mode === "append" && !hasPdf && selectedPdfs.length === 0 ? files : [];
      const nextFiles = [...currentBase, ...preparedEntries];
      const nextSize = nextFiles.reduce((sum, entry) => sum + entry.file.size, 0);
      if (nextSize > MAX_TOTAL_PREPARED_SIZE) {
        throw new Error(
          "Those photos are still too large together. Remove a page or retake it slightly further back."
        );
      }

      setFiles(nextFiles);
      setStage(
        selectedPdfs.length
          ? "PDF ready to extract."
          : nextFiles.length === 1
            ? "Photo ready — add another page if needed."
            : `${nextFiles.length} pages ready.`
      );
    } catch (err) {
      console.error("PHOTO PREP ERROR", err);
      setStage("");
      setError(
        err instanceof Error
          ? err.message
          : "This photo could not be prepared. Try taking the photo again."
      );
    } finally {
      setPreparing(false);
    }
  }

  function removeFile(id: string) {
    setError("");
    setStage("");
    setFiles((current) => current.filter((entry) => entry.id !== id));
  }

  async function uploadWithRetry(path: string, file: File, contentType: string) {
    let lastMessage = "Upload failed";

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, {
          contentType,
          cacheControl: "3600",
          upsert: false,
        });

      if (!uploadError) return;
      lastMessage = uploadError.message;

      if (attempt > 0 && /already exists|duplicate/i.test(uploadError.message)) {
        return;
      }

      if (attempt < 2) await sleep(500 * (attempt + 1));
    }

    throw new Error(`Upload failed: ${lastMessage}`);
  }

  async function createSignedUrlWithRetry(path: string) {
    let lastMessage = "The uploaded invoice could not be opened.";

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { data, error: signedError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(path, 15 * 60);

      if (!signedError && data?.signedUrl) return data.signedUrl;
      lastMessage = signedError?.message || lastMessage;
      if (attempt < 2) await sleep(350 * (attempt + 1));
    }

    throw new Error(lastMessage);
  }

  async function extractInvoice() {
    if (files.length === 0) {
      setError("Please take a photo or choose an invoice first.");
      return;
    }

    const uploadedPaths: string[] = [];

    try {
      setUploading(true);
      setError("");
      setStage("Starting secure upload…");

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token || !session.user?.id) {
        router.replace("/login");
        return;
      }

      const dateFolder = new Date().toISOString().slice(0, 10);
      const uploaded: UploadedInvoiceFile[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const selected = files[index].file;
        const fileType = inferFileType(selected) || "application/octet-stream";
        const randomPart = randomId();
        const storagePath = `uploads/${session.user.id}/${dateFolder}/${Date.now()}-${randomPart}-${safeFileName(
          selected.name
        )}`;

        setStage(
          files.length === 1
            ? "Uploading invoice…"
            : `Uploading page ${index + 1} of ${files.length}…`
        );

        await uploadWithRetry(storagePath, selected, fileType);
        uploadedPaths.push(storagePath);
        const signedUrl = await createSignedUrlWithRetry(storagePath);

        uploaded.push({
          fileName: selected.name,
          fileType,
          filePath: storagePath,
          fileUrl: signedUrl,
        });
      }

      setStage(files.length === 1 ? "Reading invoice…" : "Reading all invoice pages…");
      const response = await fetch("/api/invoices/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          files: uploaded.map(({ fileName, fileType, fileUrl }) => ({
            fileName,
            fileType,
            fileUrl,
          })),
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
        throw new Error("No invoices were extracted from these pages.");
      }

      sessionStorage.setItem("extractedInvoices", JSON.stringify(invoices));
      sessionStorage.setItem(
        "extractedInvoiceSource",
        JSON.stringify({
          fileName:
            uploaded.length === 1
              ? uploaded[0].fileName
              : `${uploaded.length} camera photos`,
          fileType: uploaded.length === 1 ? uploaded[0].fileType : "image/jpeg",
          filePath:
            uploaded.length === 1
              ? uploaded[0].filePath
              : JSON.stringify(uploaded.map((item) => item.filePath)),
          files: uploaded.map(({ fileName, fileType, filePath }) => ({
            fileName,
            fileType,
            filePath,
          })),
        })
      );

      setStage("Opening review…");
      router.push("/invoices/review");
    } catch (err: any) {
      console.error("UPLOAD ERROR", err);
      setStage("");
      setError(err.message || "Invoice extraction failed");

      if (uploadedPaths.length > 0) {
        try {
          await supabase.storage.from(STORAGE_BUCKET).remove(uploadedPaths);
        } catch (cleanupError) {
          console.error("INVOICE UPLOAD CLEANUP ERROR", cleanupError);
        }
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Upload invoice</h1>
          <p>
            Use your phone camera as the scanner. Take page one, add any extra pages,
            then Kitchen Insights uploads, reads and opens the invoice for approval.
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 820 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className="eyebrow">Camera-first upload</p>
            <h2 style={{ marginTop: 0 }}>Capture invoice</h2>
          </div>
          {files.length > 0 && (
            <div style={{ textAlign: "right" }}>
              <strong>{hasPdf ? "1 PDF" : `${files.length} page${files.length === 1 ? "" : "s"}`}</strong>
              <span style={{ display: "block", marginTop: 3, opacity: 0.62, fontSize: 12 }}>
                {formatFileSize(totalPreparedSize)} prepared
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 12,
            marginTop: 20,
          }}
        >
          <label
            className="primary-button"
            style={{
              minHeight: 58,
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
              onChange={(event) => void handleFileChange(event, "append")}
              disabled={busy || hasPdf || files.length >= MAX_PHOTO_PAGES}
            />
            📷 {files.length > 0 && !hasPdf ? "Add another page" : "Take photo"}
          </label>

          <label
            style={{
              minHeight: 58,
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
              multiple
              accept="application/pdf,image/*,.pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={(event) => void handleFileChange(event, "replace")}
              disabled={busy}
            />
            Choose photos or PDF
          </label>
        </div>

        {files.length === 0 ? (
          <div
            style={{
              marginTop: 18,
              border: "2px dashed #ddd",
              borderRadius: 16,
              padding: 22,
              minHeight: 106,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <strong>No invoice captured yet</strong>
            <span style={{ marginTop: 5, opacity: 0.7 }}>
              iPhone · Android · JPG · PNG · WEBP · HEIC/HEIF where the browser can decode it · PDF
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
              marginTop: 18,
            }}
          >
            {files.map((entry, index) => (
              <PhotoPreview
                key={entry.id}
                entry={entry}
                index={index}
                onRemove={removeFile}
                disabled={busy}
              />
            ))}
          </div>
        )}

        {stage && <div className="notice" style={{ marginTop: 16 }}>{stage}</div>}
        {error && <div className="notice" style={{ marginTop: 16 }}>{error}</div>}

        <button
          className="primary-button"
          style={{ marginTop: 20, minHeight: 54, width: "100%" }}
          onClick={() => void extractInvoice()}
          disabled={busy || files.length === 0}
        >
          {uploading
            ? "Working…"
            : hasPdf
              ? "Extract PDF invoice"
              : files.length > 1
                ? `Extract ${files.length} invoice pages`
                : "Extract invoice photo"}
        </button>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 10,
            fontSize: 13,
            opacity: 0.72,
          }}
        >
          <span>✓ Rear camera requested automatically</span>
          <span>✓ Large photos compressed before upload</span>
          <span>✓ Up to {MAX_PHOTO_PAGES} pages per invoice</span>
          <span>✓ Upload retries on weak mobile signal</span>
        </div>

        <p style={{ marginTop: 16, opacity: 0.68, fontSize: 14 }}>
          Best result: fill the frame, keep all four corners visible, hold the phone directly above the invoice and avoid glare. If the invoice continues onto another page, use Add another page before extracting.
        </p>
      </div>
    </div>
  );
}
