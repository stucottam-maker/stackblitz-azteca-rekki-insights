"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const STORAGE_BUCKET = "invoice-files";
const MAX_FILE_SIZE = 30 * 1024 * 1024;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
const MAX_PHOTO_PAGES = 12;
const MAX_CAMERA_EDGE = 2200;

type SelectedFile = { id: string; file: File };
type UploadedFile = { fileName: string; fileType: string; filePath: string };

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
  return ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(inferFileType(file));
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export default function InvoiceUploadV3() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraFallbackRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const filesRef = useRef<SelectedFile[]>([]);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [safeJobId, setSafeJobId] = useState("");

  const totalSize = useMemo(() => files.reduce((sum, item) => sum + item.file.size, 0), [files]);
  const hasPdf = files.some((item) => inferFileType(item.file) === "application/pdf");

  useEffect(() => { filesRef.current = files; }, [files]);
  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !cameraStreamRef.current) return;
    videoRef.current.srcObject = cameraStreamRef.current;
    void videoRef.current.play().catch(() => undefined);
  }, [cameraOpen]);
  useEffect(() => {
    const receiveNativeFile = (event: Event) => {
      const detail = (event as CustomEvent<{ file?: File }>).detail;
      if (detail?.file) addFiles([detail.file], "append");
    };
    window.addEventListener("ki:invoice-camera-file", receiveNativeFile);
    return () => {
      window.removeEventListener("ki:invoice-camera-file", receiveNativeFile);
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
    setSafeJobId("");
    if (!selected.length) return;
    if (selected.some((file) => !acceptedFile(file))) {
      const hasHeic = selected.some((file) => /heic|heif/.test(inferFileType(file)));
      setError(hasHeic ? "HEIC/HEIF is not supported yet. Use Take photo, JPG, PNG, WEBP or PDF." : "Please choose a JPG, PNG, WEBP or PDF invoice.");
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
    const currentFiles = filesRef.current;
    const currentHasPdf = currentFiles.some((item) => inferFileType(item.file) === "application/pdf");
    const base = mode === "append" && !currentHasPdf && !pdfs.length ? currentFiles : [];
    const next = [...base, ...selected.map((file) => ({ id: randomId(), file }))];
    if (!pdfs.length && next.length > MAX_PHOTO_PAGES) {
      setError(`You can add up to ${MAX_PHOTO_PAGES} invoice photos at once.`);
      return;
    }
    if (next.reduce((sum, item) => sum + item.file.size, 0) > MAX_TOTAL_SIZE) {
      setError("Those files are over 50 MB together. Please use fewer or smaller photos.");
      return;
    }
    setFiles(next);
    setStage(pdfs.length ? "PDF ready." : next.length === 1 ? "Photo ready — add another page if needed." : `${next.length} photos ready.`);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>, mode: "append" | "replace") {
    const selected = Array.from(event.currentTarget.files ?? []) as File[];
    event.currentTarget.value = "";
    addFiles(selected, mode);
  }

  async function openCamera() {
    setError("");
    if (busy || hasPdf || files.length >= MAX_PHOTO_PAGES) return;
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      cameraFallbackRef.current?.click();
      return;
    }
    try {
      setCameraStarting(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1440 } },
      });
      cameraStreamRef.current = stream;
      setCameraOpen(true);
    } catch (cameraError) {
      console.error("CAMERA OPEN FAILED", cameraError);
      cameraFallbackRef.current?.click();
    } finally { setCameraStarting(false); }
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;
    try {
      const sourceWidth = video.videoWidth;
      const sourceHeight = video.videoHeight;
      if (!sourceWidth || !sourceHeight) throw new Error("Camera is still starting.");
      const scale = Math.min(1, MAX_CAMERA_EDGE / Math.max(sourceWidth, sourceHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(sourceWidth * scale));
      canvas.height = Math.max(1, Math.round(sourceHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not prepare the camera image.");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
      if (!blob) throw new Error("The camera did not return a photo.");
      const file = new File([blob], `invoice-${Date.now()}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
      closeCamera();
      addFiles([file], "append");
    } catch (captureError) {
      setError(captureError instanceof Error ? captureError.message : "Could not capture photo.");
    }
  }

  async function getSession() {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) return sessionData.session;
    const { data, error: refreshError } = await supabase.auth.refreshSession();
    return refreshError ? null : data.session;
  }

  async function apiJson(path: string, token: string, body: Record<string, unknown>) {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let data: any = {};
    try { data = text ? JSON.parse(text) : {}; }
    catch { throw new Error(text || "Invalid server response"); }
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function uploadFile(file: File, token: string): Promise<UploadedFile> {
    const fileType = inferFileType(file) || "application/octet-stream";
    const ticket = await apiJson("/api/invoices/upload-ticket", token, { action: "prepare", fileName: file.name, fileType });
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .uploadToSignedUrl(ticket.filePath, ticket.token, file, { contentType: fileType });
    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
    return { fileName: file.name, fileType, filePath: ticket.filePath };
  }

  async function extractInvoice() {
    if (!files.length) { setError("Take a photo or upload an invoice first."); return; }
    let jobCreated = false;
    let jobId = "";
    try {
      setBusy(true);
      setError("");
      setSafeJobId("");
      setStage("Checking your session…");
      const session = await getSession();
      if (!session?.access_token) { router.replace("/login"); return; }

      const uploaded: UploadedFile[] = [];
      for (let index = 0; index < files.length; index += 1) {
        setStage(files.length === 1 ? "Safely storing invoice…" : `Safely storing page ${index + 1} of ${files.length}…`);
        uploaded.push(await uploadFile(files[index].file, session.access_token));
      }

      const created = await apiJson("/api/invoices/jobs", session.access_token, { action: "create", files: uploaded });
      jobId = String(created.jobId || "");
      jobCreated = Boolean(jobId);
      setSafeJobId(jobId);
      setStage("Reading invoice…");
      const extracted = await apiJson("/api/invoices/jobs", session.access_token, { action: "extract", jobId });
      const invoices = Array.isArray(extracted.invoices) ? extracted.invoices : [];
      if (!invoices.length) throw new Error("No invoice was found in that file.");

      sessionStorage.setItem("extractedInvoices", JSON.stringify(invoices));
      sessionStorage.setItem("invoiceExtractionJobId", jobId);
      sessionStorage.setItem("extractedInvoiceSource", JSON.stringify({
        fileName: uploaded.length === 1 ? uploaded[0].fileName : `${uploaded.length} camera photos`,
        fileType: uploaded.length === 1 ? uploaded[0].fileType : "image/jpeg",
        filePath: uploaded.length === 1 ? uploaded[0].filePath : JSON.stringify(uploaded.map((item) => item.filePath)),
        files: uploaded,
      }));
      setStage("Opening review…");
      router.push("/invoices/review");
    } catch (uploadError) {
      console.error("INVOICE UPLOAD FAILED", uploadError);
      setStage("");
      const message = uploadError instanceof Error ? uploadError.message : "Invoice upload failed.";
      setError(jobCreated ? `${message} Your invoice is safely stored — retry it from the Invoice inbox without photographing it again.` : message);
      if (jobId) setSafeJobId(jobId);
    } finally { setBusy(false); }
  }

  return (
    <div className="page invoice-upload-chef-page">
      <input ref={cameraFallbackRef} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }} onChange={(event) => handleFileInput(event, "append")} tabIndex={-1} />
      <input ref={fileInputRef} type="file" multiple accept="application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp" style={{ position: "fixed", left: "-9999px", width: 1, height: 1 }} onChange={(event) => handleFileInput(event, "replace")} tabIndex={-1} />

      <header className="topbar"><div><p className="eyebrow">Invoices</p><h1>Scan an invoice</h1><p className="page-description">Take the photo, check the figures, approve. If extraction ever fails, the original is kept safely for retry.</p></div></header>
      {error && <div className="notice invoice-safe-notice" role="alert"><strong>{safeJobId ? "Invoice saved safely." : "Could not process invoice."}</strong><span>{error}</span></div>}

      <section className="panel chef-upload-panel">
        <div className="chef-upload-actions">
          <button type="button" className="primary-button chef-big-action" data-ki-camera-trigger="true" disabled={busy || cameraStarting || hasPdf || files.length >= MAX_PHOTO_PAGES} onClick={() => void openCamera()}><span aria-hidden="true">📷</span><span>{cameraStarting ? "Opening camera…" : files.length && !hasPdf ? "Add another page" : "Take photo"}</span></button>
          <button type="button" className="secondary-inline-button chef-big-action" disabled={busy} onClick={() => fileInputRef.current?.click()}><span aria-hidden="true">▤</span><span>Choose photos or PDF</span></button>
        </div>

        {files.length > 0 && <div className="chef-file-stack">{files.map((item, index) => <div className="chef-file-row" key={item.id}><div><strong>{hasPdf ? "PDF invoice" : `Page ${index + 1}`}</strong><span>{item.file.name} · {formatFileSize(item.file.size)}</span></div><button type="button" className="text-button" disabled={busy} onClick={() => setFiles((current) => current.filter((file) => file.id !== item.id))}>Remove</button></div>)}</div>}

        <div className="chef-upload-footer"><div><strong>{files.length ? `${files.length} file${files.length === 1 ? "" : "s"} ready` : "No invoice selected"}</strong><span>{files.length ? `${formatFileSize(totalSize)} total` : "Photo or PDF · up to 12 pages"}</span></div><button type="button" className="primary-button chef-review-action" disabled={busy || files.length === 0} onClick={() => void extractInvoice()}>{busy ? stage || "Working…" : "Read invoice →"}</button></div>
      </section>

      {cameraOpen && <div className="invoice-camera-overlay" role="dialog" aria-modal="true" aria-label="Invoice camera"><div className="invoice-camera-card"><video ref={videoRef} playsInline muted className="invoice-camera-video" /><div className="invoice-camera-actions"><button className="secondary-inline-button" type="button" onClick={closeCamera}>Cancel</button><button className="primary-button" type="button" onClick={() => void capturePhoto()}>Capture invoice</button></div></div></div>}
    </div>
  );
}
