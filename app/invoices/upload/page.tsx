"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const STORAGE_BUCKET = "invoice-files";
const MAX_SOURCE_SIZE = 30 * 1024 * 1024;
const MAX_PHOTO_PAGES = 12;
const MAX_TOTAL_UPLOAD_SIZE = 50 * 1024 * 1024;
const MAX_PREVIEW_SIZE = 3 * 1024 * 1024;
const DIRECT_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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
  return type === "application/pdf" || DIRECT_IMAGE_TYPES.has(type);
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
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
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

function normaliseFile(file: File) {
  const type = inferFileType(file);

  if (DIRECT_IMAGE_TYPES.has(type) || type === "application/pdf") {
    if (file.type || !type) return file;
    return new File([file], file.name, {
      type,
      lastModified: file.lastModified,
    });
  }

  if (type === "image/heic" || type === "image/heif") {
    throw new Error(
      "That photo is HEIC/HEIF. Please use Take photo, or choose a JPG, PNG, WEBP or PDF."
    );
  }

  throw new Error("Please use a JPG, PNG, WEBP or PDF invoice.");
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
  const type = inferFileType(entry.file);
  const isImage = type.startsWith("image/");
  const canPreview = isImage && entry.file.size <= MAX_PREVIEW_SIZE;
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!canPreview) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(entry.file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [entry.file, canPreview]);

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
          minHeight: 116,
          borderRadius: 10,
          overflow: "hidden",
          background: "#f5f2ec",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`Invoice page ${index + 1}`}
            loading="lazy"
            style={{ width: "100%", height: 150, objectFit: "contain" }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 32 }}>{isImage ? "📷" : "📄"}</div>
            <strong>{isImage ? `Page ${index + 1}` : "PDF invoice"}</strong>
            {isImage && entry.file.size > MAX_PREVIEW_SIZE && (
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 11,
                  opacity: 0.6,
                }}
              >
                Preview skipped to save phone memory
              </span>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 9, minWidth: 0 }}>
        <strong style={{ display: "block", overflowWrap: "anywhere" }}>
          {isImage ? `Invoice page ${index + 1}` : entry.file.name}
        </strong>
        <span
          style={{ display: "block", marginTop: 3, opacity: 0.65, fontSize: 12 }}
        >
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
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<SelectedInvoiceFile[]>([]);
  const [preparing, setPreparing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");

  const totalSize = useMemo(
    () => files.reduce((sum, entry) => sum + entry.file.size, 0),
    [files]
  );

  const hasPdf = files.some(
    (entry) => inferFileType(entry.file) === "application/pdf"
  );
  const busy = preparing || uploading;

  const processSelectedFiles = useCallback(
    async (selectedFiles: File[], mode: "append" | "replace") => {
      setError("");
      setStage("");

      if (selectedFiles.length === 0) return;

      if (selectedFiles.some((selected) => !isAcceptedFile(selected))) {
        const hasHeic = selectedFiles.some((selected) => {
          const type = inferFileType(selected);
          return type === "image/heic" || type === "image/heif";
        });
        setError(
          hasHeic
            ? "That photo is HEIC/HEIF. Please use Take photo, or choose a JPG, PNG, WEBP or PDF."
            : "Please choose invoice photos or one PDF."
        );
        return;
      }

      if (selectedFiles.some((selected) => selected.size > MAX_SOURCE_SIZE)) {
        setError(
          "One of those files is over 30 MB. Please take another photo or choose a smaller file."
        );
        return;
      }

      const selectedPdfs = selectedFiles.filter(
        (selected) => inferFileType(selected) === "application/pdf"
      );

      if (selectedPdfs.length > 0 && selectedFiles.length > 1) {
        setError(
          "Please upload one PDF on its own, or use photos for a multi-page invoice."
        );
        return;
      }

      const existingImageCount = files.filter(
        (entry) => inferFileType(entry.file) !== "application/pdf"
      ).length;

      if (
        selectedPdfs.length === 0 &&
        (mode === "append" ? existingImageCount : 0) + selectedFiles.length >
          MAX_PHOTO_PAGES
      ) {
        setError(`You can capture up to ${MAX_PHOTO_PAGES} invoice pages at once.`);
        return;
      }

      try {
        setPreparing(true);
        setStage(selectedPdfs.length ? "Preparing PDF…" : "Preparing photo…");

        const preparedEntries = selectedFiles.map((selected) => ({
          id: randomId(),
          file: normaliseFile(selected),
        }));

        const currentBase =
          mode === "append" && !hasPdf && selectedPdfs.length === 0 ? files : [];
        const nextFiles = [...currentBase, ...preparedEntries];
        const nextSize = nextFiles.reduce(
          (sum, entry) => sum + entry.file.size,
          0
        );

        if (nextSize > MAX_TOTAL_UPLOAD_SIZE) {
          throw new Error(
            "Those pages are over 50 MB together. Upload fewer photos or retake them at normal camera quality."
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
            : "This invoice could not be prepared. Please try again."
        );
      } finally {
        setPreparing(false);
      }
    },
    [files, hasPdf]
  );

  useEffect(() => {
    function onNativeCameraFile(event: Event) {
      const detail = (event as CustomEvent<{ file?: File }>).detail;
      if (detail?.file instanceof File) {
        void processSelectedFiles([detail.file], "append");
      }
    }

    window.addEventListener("ki:invoice-camera-file", onNativeCameraFile);
    return () =>
      window.removeEventListener("ki:invoice-camera-file", onNativeCameraFile);
  }, [processSelectedFiles]);

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    mode: "append" | "replace"
  ) {
    const selectedFiles = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    await processSelectedFiles(selectedFiles, mode);
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

  async function getFreshSession() {
    const {
      data: { session: existingSession },
    } = await supabase.auth.getSession();

    if (!existingSession) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userError && userData.user) return existingSession;

    const { data: refreshed, error: refreshError } =
      await supabase.auth.refreshSession();

    if (refreshError || !refreshed.session) return null;
    return refreshed.session;
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
      setStage("Checking your session…");

      const session = await getFreshSession();
      if (!session?.access_token || !session.user?.id) {
        setError("Your session has expired. Please sign in again.");
        router.replace("/login");
        return;
      }

      const dateFolder = new Date().toISOString().slice(0, 10);
      const uploaded: UploadedInvoiceFile[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const selected = files[index].file;
        const fileType = inferFileType(selected) || "application/octet-stream";
        const storagePath = `uploads/${session.user.id}/${dateFolder}/${Date.now()}-${randomId()}-${safeFileName(
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

      setStage(
        files.length === 1 ? "Reading invoice…" : "Reading all invoice pages…"
      );

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
          fileType:
            uploaded.length === 1 ? uploaded[0].fileType : "image/jpeg",
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
      setError(err?.message || "Invoice extraction failed");

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
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={(event) => void handleInputChange(event, "append")}
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
        tabIndex={-1}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp"
        onChange={(event) => void handleInputChange(event, "replace")}
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
        tabIndex={-1}
      />

      <div className="page-header">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Upload invoice</h1>
          <p>
            Take a photo of the invoice, or choose an existing photo or PDF from
            your device. We will upload it securely and extract the invoice for
            review.
          </p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 820 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow">Invoice source</p>
            <h2 style={{ marginTop: 0 }}>Add invoice</h2>
          </div>
          {files.length > 0 && (
            <div style={{ textAlign: "right" }}>
              <strong>
                {hasPdf ? "1 PDF" : `${files.length} page${files.length === 1 ? "" : "s"}`}
              </strong>
              <span
                style={{ display: "block", marginTop: 3, opacity: 0.62, fontSize: 12 }}
              >
                {formatFileSize(totalSize)} ready
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
          <button
            type="button"
            className="primary-button"
            data-ki-camera-trigger="true"
            style={{ minHeight: 58 }}
            disabled={busy || hasPdf || files.length >= MAX_PHOTO_PAGES}
            onClick={() => cameraInputRef.current?.click()}
          >
            📷 {files.length > 0 && !hasPdf ? "Add another photo" : "Take photo"}
          </button>

          <button
            type="button"
            className="secondary-inline-button"
            style={{ minHeight: 58 }}
            disabled={busy}
            onClick={() => fileInputRef.current?.click()}
          >
            📁 Choose photos or PDF
          </button>
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
            <strong>No invoice selected yet</strong>
            <span style={{ marginTop: 5, opacity: 0.7 }}>
              Camera · JPG · PNG · WEBP · PDF
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

        {stage && (
          <div className="notice" style={{ marginTop: 16 }}>
            {stage}
          </div>
        )}
        {error && (
          <div className="notice" style={{ marginTop: 16 }}>
            <strong>Invoice upload problem</strong>
            <div style={{ marginTop: 4 }}>{error}</div>
          </div>
        )}

        <button
          type="button"
          className="primary-button"
          style={{ marginTop: 20, minHeight: 54, width: "100%" }}
          onClick={() => void extractInvoice()}
          disabled={busy || files.length === 0}
        >
          {uploading
            ? "Working…"
            : hasPdf
              ? "Upload and read PDF"
              : files.length > 1
                ? `Upload and read ${files.length} pages`
                : "Upload and read invoice"}
        </button>

        <p style={{ marginTop: 16, opacity: 0.68, fontSize: 14 }}>
          For photos, keep all four corners of the invoice visible and avoid glare.
          For a multi-page invoice, take each page before pressing Upload and read.
        </p>
      </div>
    </div>
  );
}
