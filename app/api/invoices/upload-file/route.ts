import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const STORAGE_BUCKET = "invoice-files";
const MAX_SERVER_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function safeFileName(value: string) {
  return (
    value
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "invoice"
  );
}

function inferFileType(fileName: string, suppliedType: string) {
  const type = suppliedType.toLowerCase();
  if (ALLOWED_TYPES.has(type)) return type;

  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "application/pdf";
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  return "";
}

export async function POST(request: Request) {
  try {
    const { user } = await requireOrganisation(request);
    const form = await request.formData();
    const entry = form.get("file");

    if (!entry || typeof entry === "string" || typeof entry.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Missing invoice file" }, { status: 400 });
    }

    const file = entry as File;
    const fileName = file.name || "invoice";
    const fileType = inferFileType(fileName, file.type || "");

    if (!ALLOWED_TYPES.has(fileType)) {
      return NextResponse.json(
        { error: "Upload a PDF, JPG, PNG or WebP invoice." },
        { status: 415 }
      );
    }

    if (file.size > MAX_SERVER_FILE_SIZE) {
      return NextResponse.json(
        { error: "This file is too large for the reliable upload path." },
        { status: 413 }
      );
    }

    const dateFolder = new Date().toISOString().slice(0, 10);
    const filePath = `uploads/${user.id}/${dateFolder}/${Date.now()}-${crypto.randomUUID()}-${safeFileName(fileName)}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const { error } = await serviceSupabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, bytes, {
        contentType: fileType,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    return NextResponse.json({ fileName, fileType, filePath });
  } catch (error) {
    console.error("SERVER INVOICE FILE UPLOAD FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
