import { NextResponse } from "next/server";

import {
  createInvoiceExtractionJob,
  loadInvoiceExtractionJob,
  markInvoiceExtractionJobSaved,
  runInvoiceExtractionJob,
  type InvoiceJobFile,
} from "../../../lib/invoiceJobs";
import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function filesFromBody(value: unknown): InvoiceJobFile[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const file = entry as Record<string, unknown>;
    const fileName = String(file.fileName || "invoice").trim();
    const fileType = String(file.fileType || "").trim().toLowerCase();
    const filePath = String(file.filePath || "").trim();
    return filePath ? [{ fileName, fileType, filePath }] : [];
  });
}

export async function GET(request: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(request);
    const { data, error } = await serviceSupabase
      .from("invoice_extraction_jobs")
      .select("id,source_type,source_ref,files,status,error_message,attempt_count,last_attempt_at,created_at,updated_at")
      .eq("organisation_id", organisationId)
      .eq("site_id", siteId)
      .in("status", ["queued", "processing", "needs_review", "failed"])
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) throw error;
    return NextResponse.json({ jobs: data ?? [] });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}

export async function POST(request: Request) {
  try {
    const { organisationId, siteId, user } = await requireOrganisation(request);
    const body = await request.json();
    const action = String(body.action || "");

    if (action === "create") {
      const files = filesFromBody(body.files);
      const prefix = `uploads/${user.id}/`;
      if (!files.length || files.some((file) => !file.filePath.startsWith(prefix))) {
        return NextResponse.json({ error: "Invalid stored invoice files" }, { status: 400 });
      }

      const job = await createInvoiceExtractionJob({
        organisationId,
        siteId,
        createdBy: user.id,
        sourceType: "upload",
        files,
      });

      return NextResponse.json({ jobId: job.id, status: job.status });
    }

    if (action === "extract" || action === "retry" || action === "open") {
      const jobId = String(body.jobId || "").trim();
      if (!jobId) {
        return NextResponse.json({ error: "Missing invoice extraction job" }, { status: 400 });
      }

      const result = await runInvoiceExtractionJob(jobId, { organisationId, siteId });
      const job = await loadInvoiceExtractionJob(jobId, { organisationId, siteId });
      return NextResponse.json({
        jobId,
        status: job.status,
        invoices: result.invoices,
        files: job.files ?? [],
        sourceType: job.source_type,
        cached: result.cached,
      });
    }

    return NextResponse.json({ error: "Unknown invoice job action" }, { status: 400 });
  } catch (error) {
    console.error("INVOICE EXTRACTION JOB FAILED", error);
    const response = authErrorResponse(error);
    const status = response.status === 500 ? 503 : response.status;
    return NextResponse.json({ error: response.message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(request);
    const body = await request.json();
    const jobId = String(body.jobId || "").trim();
    const action = String(body.action || "");

    if (!jobId) {
      return NextResponse.json({ error: "Missing invoice extraction job" }, { status: 400 });
    }

    await loadInvoiceExtractionJob(jobId, { organisationId, siteId });

    if (action === "saved") {
      await markInvoiceExtractionJobSaved(jobId);
      return NextResponse.json({ saved: true });
    }

    if (action === "discard") {
      const { error } = await serviceSupabase
        .from("invoice_extraction_jobs")
        .update({ status: "discarded", updated_at: new Date().toISOString() })
        .eq("id", jobId)
        .eq("organisation_id", organisationId)
        .eq("site_id", siteId);
      if (error) throw error;
      return NextResponse.json({ discarded: true });
    }

    return NextResponse.json({ error: "Unknown invoice job action" }, { status: 400 });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
