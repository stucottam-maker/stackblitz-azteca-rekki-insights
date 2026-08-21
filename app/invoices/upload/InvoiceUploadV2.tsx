"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

const STORAGE_BUCKET = "invoice-files";
const MAX_FILE_SIZE = 30 * 1024 * 1024;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
const MAX_PHOTO_PAGES = 12;
const MAX_CAMERA_EDGE = 2200;

type SelectedFile = {
  id: string;
  file: File;
};

type UploadedFile = {
  fileName: string;
  fileType: string;
  filePath: string;
  fileUrl: string;
};

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

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

function acceptedFile(file: File) {
  const type = inferFileType(file);
  return ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(type);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export default function InvoiceUploadV2() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraFallbackRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);

  const totalSize = useMemo(
    () => files.reduce((sum, item) => sum + item.file.size, 0),
    [files]
  );
  const hasPdf = files.some((item) => inferFileType(item.file) === "application/pdf");

  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !cameraStreamRef.current) return;
    videoRef.current.srcObject = cameraStreamRef.current;
    void videoRef.current.play().catch(() => undefined);
  }, [cameraOpen]);

  useEffect(() => {
    return () => {
      stopStream(cameraStreamRef.current);
      cameraStreamRef.current = null;
    };
  }, []);

  function closeCamera() {
    stopStream(cameraStreamRef.current);
    cameraStreamRef.current = null;
    setCameraOpen(false);
    setCameraStarting(false);
  }

  function addFiles(selected: File[], mode: "append" | "replace") {
    setError("");
    setStage("");
    if (!selected.length) return;

    if (selected.some((file) => !acceptedFile(file))) {
      const hasHeic = selected.some((file) => {
        const type = inferFileType(file);
        return type === "image/heic" || type === "image/heif";
      });
      setError(
        hasHeic
          ? "HEIC/HEIF is not supported for invoice extraction yet. Use Take photo, JPG, PNG, WEBP or PDF."
          : "Please choose a JPG, PNG, WEBP or PDF invoice."
      );
      return;
    }

    if (selected.some((file) => file.size > MAX_FILE_SIZE)) {
      setError("One of those files is over 30 MB. Please use a smaller photo or PDF.");
      return;
    }

    const pdfs = selected.filter((file) => inferFileType(file) === "application/pdf");
    if (pdfs.length && selected.length > 1) {
      setError("Upload one PDF on its own, or use photos for a multi-page invoice.");
      return;
    }

    const base = mode === "append" && !hasPdf && !pdfs.length ? files : [];
    const next = [...base, ...selected.map((file) => ({ id: randomId(), file }))];

    if (!pdfs.length && next.length > MAX_PHOTO_PAGES) {
      setError(`You can add up to ${MAX_PHOTO_PAGES} invoice photos at once.`);
      return;
    }

    const nextSize = next.reduce((sum, item) => sum + item.file.size, 0);
    if (nextSize > MAX_TOTAL_SIZE) {
      setError("Those files are over 50 MB together. Please use fewer or smaller photos.");
      return;
    }

    setFiles(next);
    setStage(
      pdfs.length
        ? "PDF ready."
        : next.length === 1
          ? "Photo ready — add another page if needed."
          : `${next.length} photos ready.`
    );
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>, mode: "append" | "replace") {
    const selected = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    addFiles(selected, mode);
  }

  async function openCamera() {
    setError("");
    setStage("");

    if (busy || hasPdf || files.length >= MAX_PHOTO_PAGES) return;

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      cameraFallbackRef.current?.click();
      return;
    }

    try {
      setCameraStarting(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1440 },
        },
      });
      cameraStreamRef.current = stream;
      setCameraOpen(true);
    } catch (err) {
      console.error("CAMERA OPEN FAILED", err);
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError") {
        setError(
          "Camera permission is blocked. Allow Camera for Kitchen Insights in your browser settings, then try again."
        );
      } else {
        setError("The camera could not be opened. You can still use Upload from device.");
      }
    } finally {
      setCameraStarting(false);
    }
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;

    try {
      const sourceWidth = video.videoWidth;
      const sourceHeight = video.videoHeight;
      if (!sourceWidth || !sourceHeight) {
        throw new Error("Camera is still starting. Try again in a moment.");
      }

      const scale = Math.min(1, MAX_CAMERA_EDGE / Math.max(sourceWidth, sourceHeight));
      const width = Math.max(1, Math.round(sourceWidth * scale));
      const height = Math.max(1, Math.round(sourceHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not prepare the camera image.");
      context.drawImage(video, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.9)
      );
      if (!blob) throw new Error("The camera did not return a photo.");

      const file = new File([blob], `invoice-${Date.now()}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      closeCamera();
      addFiles([file], "append");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not capture the photo.");
    }
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userError && userData.user) return session;

    const { data, error: refreshError } = await supabase.auth.refreshSession();
    return refreshError ? null : data.session;
  }

  async function apiJson(path: string, token: string, body: Record<string, unknown>) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(text || "Invalid server response");
    }
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function uploadFile(file: File, token: string): Promise<UploadedFile> {
    const fileType = inferFileType(file) || "application/octet-stream";
    const ticket = await apiJson("/api/invoices/upload-ticket", token, {
      action: "prepare",
      fileName: file.name,
      fileType,
    });

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .uploadToSignedUrl(ticket.filePath, ticket.token, file, {
        contentType: fileType,
      });

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const signed = await apiJson("/api/invoices/upload-ticket", token, {
      action: "sign",
      filePath: ticket.filePath,
    });

    return {
      fileName: file.name,
      fileType,
      filePath: ticket.filePath,
      fileUrl: signed.fileUrl,
    };
  }

  async function cleanupUploads(paths: string[], token: string) {
    if (!paths.length) return;
    try {
      await fetch("/api/invoices/upload-ticket", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paths }),
      });
    } catch (cleanupError) {
      console.error("UPLOAD CLEANUP FAILED", cleanupError);
    }
  }

  async function extractInvoice() {
    if (!files.length) {
      setError("Take a photo or upload an invoice first.");
      return;
    }

    let accessToken = "";
    const uploadedPaths: string[] = [];

    try {
      setBusy(true);
      setError("");
      setStage("Checking your session…");

      const session = await getSession();
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      accessToken = session.access_token;

      const uploaded: UploadedFile[] = [];
      for (let index = 0; index < files.length; index += 1) {
        setStage(
          files.length === 1
            ? "Uploading invoice…"
            : `Uploading page ${index + 1} of ${files.length}…`
        );
        const uploadedFile = await uploadFile(files[index].file, accessToken);
        uploaded.push(uploadedFile);
        uploadedPaths.push(uploadedFile.filePath);
      }

      setStage(files.length === 1 ? "Reading invoice…" : "Reading invoice pages…");
      const response = await fetch("/api/invoices/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
        throw new Error(text || "Invalid extraction response");
      }
      if (!response.ok) {
        throw new Error(data.details || data.error || "Invoice extraction failed");
      }

      const invoices = Array.isArray(data) ? data : data.invoices;
      if (!Array.isArray(invoices) || !invoices.length) {
        throw new Error("No invoice was found in that file.");
      }

      sessionStorage.setItem("extractedInvoices", JSON.stringify(invoices));
      sessionStorage.setItem(
        "extractedInvoiceSource",
        JSON.stringify({
          fileName: uploaded.length === 1 ? uploaded[0].fileName : `${uploaded.length} camera photos`,
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
    } catch (err) {
      console.error("INVOICE UPLOAD FAILED", err);
      setStage("");
      setError(err instanceof Error ? err.message : "Invoice upload failed.");
      if (accessToken) await cleanupUploads(uploadedPaths, accessToken);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <input
        ref={cameraFallbackRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
        onChange={(event) => handleFileInput(event, "append")}
        tabIndex={-1}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp"
        style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }}
        onChange={(event) => handleFileInput(event, "replace")}
        tabIndex={-1}
      />

      <div className="page-header">
        <div>
          <p className="eyebrow">Purchasing</p>
          <h1>Upload invoice</h1>
          <p>Photograph an invoice or upload an existing photo/PDF, then review the extracted data before saving.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 820 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <button
            type="button"
            className="primary-button"
            style={{ minHeight: 60 }}
            disabled={busy || cameraStarting || hasPdf || files.length >= MAX_PHOTO_PAGES}
            onClick={() => void openCamera()}
          >
            📷 {cameraStarting ? "Opening camera…" : files.length && !hasPdf ? "Add another photo" : "Take photo"}
          </button>
          <button
            type="button"
            className="secondary-inline-button"
            style={{ minHeight: 60 }}
            disabled={busy}
            onClick={() => fileInputRef.current?.click()}
          >
            📁 Upload from device
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          {!files.length ? (
            <div style={{ border: "2px dashed #ddd", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <strong>No invoice selected</strong>
              <div style={{ marginTop: 6, opacity: 0.68, fontSize: 13 }}>Camera · JPG · PNG · WEBP · PDF</div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {files.map((item, index) => (
                <div
                  key={item.id}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, border: "1px solid #e2dfd8", borderRadius: 12, padding: 12 }}
                >
                  <div style={{ minWidth: 0 }}>
                    <strong style={{ display: "block", overflowWrap: "anywhere" }}>
                      {inferFileType(item.file) === "application/pdf" ? item.file.name : `Invoice photo ${index + 1}`}
                    </strong>
                    <span style={{ fontSize: 12, opacity: 0.65 }}>{formatFileSize(item.file.size)}</span>
                  </div>
                  <button
                    type="button"
                    className="secondary-inline-button"
                    disabled={busy}
                    onClick={() => setFiles((current) => current.filter((entry) => entry.id !== item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div style={{ fontSize: 12, opacity: 0.65 }}>{formatFileSize(totalSize)} total</div>
            </div>
          )}
        </div>

        {stage && <div className="notice" style={{ marginTop: 16 }}>{stage}</div>}
        {error && <div className="notice" style={{ marginTop: 16 }}>{error}</div>}

        <button
          type="button"
          className="primary-button"
          style={{ width: "100%", minHeight: 54, marginTop: 18 }}
          disabled={busy || !files.length}
          onClick={() => void extractInvoice()}
        >
          {busy ? "Working…" : hasPdf ? "Extract PDF invoice" : files.length > 1 ? `Extract ${files.length} invoice photos` : "Extract invoice"}
        </button>
      </div>

      {cameraOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph invoice"
          style={{ position: "fixed", inset: 0, zIndex: 100000, background: "#111", display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", color: "white" }}>
            <strong>Photograph invoice</strong>
            <button type="button" className="secondary-inline-button" onClick={closeCamera}>Cancel</button>
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 0, background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            <div style={{ position: "absolute", inset: "7%", border: "2px solid rgba(255,255,255,.85)", borderRadius: 12, pointerEvents: "none" }} />
          </div>
          <div style={{ padding: "14px 16px 20px", color: "white", background: "#111" }}>
            <div style={{ textAlign: "center", fontSize: 13, opacity: 0.78, marginBottom: 10 }}>Keep all four corners visible and avoid glare.</div>
            <button type="button" className="primary-button" style={{ width: "100%", minHeight: 58 }} onClick={() => void capturePhoto()}>
              Take photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
