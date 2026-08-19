import { NextResponse } from "next/server";

import { extractInvoicesFromFiles, type InvoiceInputFile } from "../../../lib/invoiceExtraction";
import { authErrorResponse, requireOrganisation } from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_INPUT_FILES = 12;
const supportedFileTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isTrustedInvoiceUrl(value: unknown) {
  if (typeof value !== "string") return false;

  try {
    const fileUrl = new URL(value);
    const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");
    return fileUrl.protocol === "https:" && fileUrl.hostname === supabaseUrl.hostname;
  } catch {
    return false;
  }
}

function invoiceFilesFromBody(body: Record<string, unknown>) {
  if (Array.isArray(body.files)) {
    return body.files
      .filter((value): value is Record<string, unknown> => Boolean(value && typeof value === "object"))
      .map((value) => ({
        fileUrl: typeof value.fileUrl === "string" ? value.fileUrl : "",
        fileType: typeof value.fileType === "string" ? value.fileType : "",
        fileName: typeof value.fileName === "string" ? value.fileName : undefined,
      }));
  }

  if (typeof body.fileUrl === "string" || typeof body.fileType === "string") {
    return [
      {
        fileUrl: typeof body.fileUrl === "string" ? body.fileUrl : "",
        fileType: typeof body.fileType === "string" ? body.fileType : "",
        fileName: typeof body.fileName === "string" ? body.fileName : undefined,
      },
    ];
  }

  return [];
}

export async function POST(request: Request) {
  try {
    await requireOrganisation(request);

    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invoice extraction expects a JSON upload request." },
        { status: 415 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "The invoice upload request was incomplete. Please try again." },
        { status: 400 }
      );
    }

    const files = invoiceFilesFromBody(body);
    if (files.length === 0) {
      return NextResponse.json({ error: "Missing invoice file" }, { status: 400 });
    }
    if (files.length > MAX_INPUT_FILES) {
      return NextResponse.json(
        { error: `Upload up to ${MAX_INPUT_FILES} invoice pages at once.` },
        { status: 413 }
      );
    }

    for (const file of files) {
      if (!isTrustedInvoiceUrl(file.fileUrl)) {
        return NextResponse.json({ error: "Invalid invoice file URL" }, { status: 400 });
      }
      if (!supportedFileTypes.has(file.fileType)) {
        return NextResponse.json(
          { error: "Upload a PDF, JPG, PNG or WebP invoice." },
          { status: 415 }
        );
      }
    }

    const invoices = await extractInvoicesFromFiles(files);
    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error("Invoice extraction error:", error);
    const response = authErrorResponse(error);

    return NextResponse.json(
      {
        error:
          response.status === 500
            ? "Invoice extraction failed."
            : response.message,
        details: response.status === 500 ? error?.message : undefined,
      },
      { status: response.status }
    );
  }
}
