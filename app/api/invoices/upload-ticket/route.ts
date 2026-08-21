import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STORAGE_BUCKET = "invoice-files";
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

function randomSuffix() {
  return `${Date.now()}-${crypto.randomUUID()}`;
}

export async function POST(request: Request) {
  try {
    const { user } = await requireOrganisation(request);
    const body = await request.json();
    const action = String(body.action || "");
    const prefix = `uploads/${user.id}/`;

    if (action === "prepare") {
      const fileName = String(body.fileName || "invoice");
      const fileType = String(body.fileType || "").toLowerCase();
      if (!ALLOWED_TYPES.has(fileType)) {
        return NextResponse.json({ error: "Unsupported invoice file type" }, { status: 400 });
      }

      const dateFolder = new Date().toISOString().slice(0, 10);
      const filePath = `${prefix}${dateFolder}/${randomSuffix()}-${safeFileName(fileName)}`;
      const { data, error } = await serviceSupabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUploadUrl(filePath);

      if (error || !data?.token) {
        throw error || new Error("Could not prepare invoice upload");
      }

      return NextResponse.json({ filePath, token: data.token });
    }

    if (action === "sign") {
      const filePath = String(body.filePath || "");
      if (!filePath.startsWith(prefix)) {
        return NextResponse.json({ error: "Invalid invoice file path" }, { status: 400 });
      }

      const { data, error } = await serviceSupabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(filePath, 15 * 60);

      if (error || !data?.signedUrl) {
        throw error || new Error("Could not open uploaded invoice");
      }

      return NextResponse.json({ fileUrl: data.signedUrl });
    }

    return NextResponse.json({ error: "Unknown upload action" }, { status: 400 });
  } catch (error) {
    console.error("INVOICE UPLOAD TICKET FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}

export async function DELETE(request: Request) {
  try {
    const { user } = await requireOrganisation(request);
    const body = await request.json();
    const prefix = `uploads/${user.id}/`;
    const paths = (Array.isArray(body.paths) ? body.paths : []).filter(
      (path): path is string => typeof path === "string" && path.startsWith(prefix)
    );

    if (!paths.length) return NextResponse.json({ removed: 0 });

    const { error } = await serviceSupabase.storage.from(STORAGE_BUCKET).remove(paths);
    if (error) throw error;

    return NextResponse.json({ removed: paths.length });
  } catch (error) {
    console.error("INVOICE UPLOAD CLEANUP FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
