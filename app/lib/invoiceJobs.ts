import { extractInvoicesFromFiles } from "./invoiceExtraction";
import { serviceSupabase } from "./serverAuth";

export type InvoiceJobFile = {
  fileName: string;
  fileType: string;
  filePath: string;
};

type InvoiceExtractionJobRow = {
  id: string;
  organisation_id: string;
  site_id: string;
  created_by: string | null;
  source_type: "upload" | "email";
  source_ref: string | null;
  files: InvoiceJobFile[] | null;
  status: "queued" | "processing" | "needs_review" | "saved" | "failed" | "discarded";
  extracted_payload: { invoices?: any[] } | any[] | null;
  error_message: string | null;
  attempt_count: number;
  last_attempt_at: string | null;
  created_at: string;
  updated_at: string;
};

const STORAGE_BUCKET = "invoice-files";
const SUPPORTED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function cleanFiles(value: unknown): InvoiceJobFile[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const file = entry as Record<string, unknown>;
    const fileName = String(file.fileName || "invoice").trim();
    const fileType = String(file.fileType || "").toLowerCase().trim();
    const filePath = String(file.filePath || "").trim();
    if (!filePath || !SUPPORTED_TYPES.has(fileType)) return [];
    return [{ fileName, fileType, filePath }];
  });
}

export function extractionErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "Invoice extraction failed");

  if (/no credits remaining|credit_balance_exhausted|insufficient_quota/i.test(message)) {
    return "Invoice extraction is paused because the OpenAI API account has no credits. The invoice is safely stored and can be retried after credits are added.";
  }

  if (/rate limit|429/i.test(message)) {
    return "Invoice extraction is temporarily busy. The invoice is safely stored and can be retried from the invoice inbox.";
  }

  return message || "Invoice extraction failed. The invoice is safely stored and can be retried.";
}

export async function createInvoiceExtractionJob(input: {
  organisationId: string;
  siteId: string;
  createdBy?: string | null;
  sourceType: "upload" | "email";
  sourceRef?: string | null;
  files: InvoiceJobFile[];
}) {
  const files = cleanFiles(input.files);
  if (!files.length) throw new Error("No supported invoice files were supplied.");

  if (input.sourceRef) {
    const { data: existing, error: existingError } = await serviceSupabase
      .from("invoice_extraction_jobs")
      .select("*")
      .eq("organisation_id", input.organisationId)
      .eq("site_id", input.siteId)
      .eq("source_type", input.sourceType)
      .eq("source_ref", input.sourceRef)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) return existing as InvoiceExtractionJobRow;
  }

  const { data, error } = await serviceSupabase
    .from("invoice_extraction_jobs")
    .insert({
      organisation_id: input.organisationId,
      site_id: input.siteId,
      created_by: input.createdBy ?? null,
      source_type: input.sourceType,
      source_ref: input.sourceRef ?? null,
      files,
      status: "queued",
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error || !data) throw error || new Error("Could not create invoice extraction job.");
  return data as InvoiceExtractionJobRow;
}

export async function loadInvoiceExtractionJob(
  jobId: string,
  scope?: { organisationId?: string; siteId?: string }
) {
  let query = serviceSupabase.from("invoice_extraction_jobs").select("*").eq("id", jobId);
  if (scope?.organisationId) query = query.eq("organisation_id", scope.organisationId);
  if (scope?.siteId) query = query.eq("site_id", scope.siteId);

  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Invoice extraction job was not found.");
  return data as InvoiceExtractionJobRow;
}

function payloadInvoices(payload: InvoiceExtractionJobRow["extracted_payload"]) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.invoices)) return payload.invoices;
  return [];
}

export async function runInvoiceExtractionJob(
  jobId: string,
  scope?: { organisationId?: string; siteId?: string }
) {
  const job = await loadInvoiceExtractionJob(jobId, scope);
  const cachedInvoices = payloadInvoices(job.extracted_payload);

  if (job.status === "needs_review" && cachedInvoices.length) {
    return { job, invoices: cachedInvoices, cached: true };
  }

  if (job.status === "saved") {
    throw new Error("This invoice has already been saved.");
  }

  const files = cleanFiles(job.files);
  if (!files.length) throw new Error("This extraction job has no stored invoice file.");

  const attemptAt = new Date().toISOString();
  const { error: processingError } = await serviceSupabase
    .from("invoice_extraction_jobs")
    .update({
      status: "processing",
      error_message: null,
      attempt_count: Number(job.attempt_count || 0) + 1,
      last_attempt_at: attemptAt,
      updated_at: attemptAt,
    })
    .eq("id", job.id);

  if (processingError) throw processingError;

  try {
    const extractionFiles = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await serviceSupabase.storage
          .from(STORAGE_BUCKET)
          .createSignedUrl(file.filePath, 15 * 60);

        if (error || !data?.signedUrl) {
          throw error || new Error(`Could not open ${file.fileName}`);
        }

        return {
          fileName: file.fileName,
          fileType: file.fileType,
          fileUrl: data.signedUrl,
        };
      })
    );

    const invoices = await extractInvoicesFromFiles(extractionFiles);
    if (!Array.isArray(invoices) || !invoices.length) {
      throw new Error("No invoice was found in the stored file.");
    }

    const updatedAt = new Date().toISOString();
    const { error } = await serviceSupabase
      .from("invoice_extraction_jobs")
      .update({
        status: "needs_review",
        extracted_payload: { invoices },
        error_message: null,
        updated_at: updatedAt,
      })
      .eq("id", job.id);

    if (error) throw error;

    return {
      job: { ...job, status: "needs_review" as const, extracted_payload: { invoices } },
      invoices,
      cached: false,
    };
  } catch (error) {
    const message = extractionErrorMessage(error);
    await serviceSupabase
      .from("invoice_extraction_jobs")
      .update({
        status: "failed",
        error_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", job.id);
    throw new Error(message);
  }
}

export async function markInvoiceExtractionJobSaved(jobId: string) {
  const { error } = await serviceSupabase
    .from("invoice_extraction_jobs")
    .update({
      status: "saved",
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);
  if (error) throw error;
}
