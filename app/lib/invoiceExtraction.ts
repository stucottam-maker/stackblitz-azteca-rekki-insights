import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type InvoiceInputFile = {
  fileUrl: string;
  fileType: string;
  fileName?: string;
};

export type ExtractedInvoice = {
  supplier: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  paymentTerms: string | null;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  lineItems: Array<Record<string, unknown>>;
};

const invoiceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    invoices: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          supplier: { type: ["string", "null"] },
          invoiceNumber: { type: ["string", "null"] },
          invoiceDate: { type: ["string", "null"] },
          dueDate: { type: ["string", "null"] },
          paymentTerms: { type: ["string", "null"] },
          subtotal: { type: ["number", "null"] },
          vat: { type: ["number", "null"] },
          total: { type: ["number", "null"] },
          lineItems: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                product: { type: "string" },
                quantity: { type: ["number", "null"] },
                pack: { type: ["string", "null"] },
                priceUnit: { type: ["string", "null"] },
                unitPrice: { type: ["number", "null"] },
                total: { type: ["number", "null"] },
                status: { type: ["string", "null"] },
              },
              required: [
                "product",
                "quantity",
                "pack",
                "priceUnit",
                "unitPrice",
                "total",
                "status",
              ],
            },
          },
        },
        required: [
          "supplier",
          "invoiceNumber",
          "invoiceDate",
          "dueDate",
          "paymentTerms",
          "subtotal",
          "vat",
          "total",
          "lineItems",
        ],
      },
    },
  },
  required: ["invoices"],
};

const prompt = `
You extract structured data from UK restaurant supplier invoices.
The uploaded input may be one PDF or several phone-camera photos.
When there are several photos, treat them as consecutive pages in the order supplied unless the document clearly starts a new invoice.
Read every page and every visible product line.

Rules:
- Extract every invoice separately.
- Do not merge separate invoice numbers.
- Do combine consecutive photos that are clearly pages of the same invoice.
- Extract every genuine product line.
- Do not return empty lineItems when products are visible.
- Preserve supplier product descriptions exactly as printed. Do not join text from neighbouring rows.
- Ignore delivery notes, page headers repeated as line items, account summaries, delivery windows and unrelated footer text.
- Extract the due date and payment terms when printed. Do not calculate them.
- Do not invent information. Use null if unknown.
- Money values must be numbers.
- Quantity must be numeric where possible.
- Dates must be YYYY-MM-DD.
- priceUnit is the printed pricing basis when clear, for example kg, each, case, bag, 1.4kg, 5L or 100pk. Do not infer a price unit from unrelated text.

For every invoice return supplier, invoice number, invoice date, due date, payment terms, subtotal, VAT and total.
For every line return product, quantity, pack, priceUnit, unit price and line total.
`;

const FAST_MODEL = process.env.INVOICE_FAST_MODEL || "gpt-5.6-luna";
const FALLBACK_MODEL = process.env.INVOICE_FALLBACK_MODEL || "gpt-5.6-terra";
const MONEY_TOLERANCE = 0.08;

function moneyClose(left: number, right: number) {
  const difference = Math.abs(left - right);
  const tolerance = Math.max(MONEY_TOLERANCE, Math.abs(right) * 0.0025);
  return difference <= tolerance;
}

function numberOrNull(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function validateInvoice(invoice: ExtractedInvoice) {
  const reasons: string[] = [];
  const lines = Array.isArray(invoice.lineItems) ? invoice.lineItems : [];

  if (!String(invoice.supplier || "").trim()) reasons.push("missing supplier");
  if (!String(invoice.invoiceNumber || "").trim()) reasons.push("missing invoice number");
  if (!String(invoice.invoiceDate || "").trim()) reasons.push("missing invoice date");
  if (!lines.length) reasons.push("no line items");

  const subtotal = numberOrNull(invoice.subtotal);
  const vat = numberOrNull(invoice.vat);
  const total = numberOrNull(invoice.total);
  const lineTotals = lines
    .map((line) => numberOrNull((line as Record<string, unknown>).total))
    .filter((value): value is number => value !== null);

  if (subtotal !== null && lineTotals.length === lines.length && lineTotals.length > 0) {
    const summedLines = lineTotals.reduce((sum, value) => sum + value, 0);
    if (!moneyClose(summedLines, subtotal)) reasons.push("line totals do not match subtotal");
  }

  if (subtotal !== null && vat !== null && total !== null && !moneyClose(subtotal + vat, total)) {
    reasons.push("subtotal plus VAT does not match total");
  }

  if (total !== null && total < 0) reasons.push("negative total");
  if (subtotal !== null && subtotal < 0) reasons.push("negative subtotal");

  const suspiciousLines = lines.filter((line) => {
    const product = String((line as Record<string, unknown>).product || "").trim();
    return !product || product.length > 220;
  });
  if (suspiciousLines.length) reasons.push("suspicious product rows");

  return { valid: reasons.length === 0, reasons };
}

function validateBatch(invoices: ExtractedInvoice[]) {
  if (!Array.isArray(invoices) || invoices.length === 0) {
    return { valid: false, reasons: ["no invoices returned"] };
  }

  const reasons = invoices.flatMap((invoice, index) =>
    validateInvoice(invoice).reasons.map((reason) => `invoice ${index + 1}: ${reason}`)
  );
  return { valid: reasons.length === 0, reasons };
}

function buildContent(files: InvoiceInputFile[], detail: "auto" | "high") {
  const content: any[] = [];

  files.forEach((file, index) => {
    if (files.length > 1) {
      content.push({
        type: "input_text",
        text: `Invoice source page ${index + 1}${file.fileName ? `: ${file.fileName}` : ""}`,
      });
    }

    if (file.fileType === "application/pdf") {
      content.push({ type: "input_file", file_url: file.fileUrl } as any);
    } else {
      content.push({
        type: "input_image",
        image_url: file.fileUrl,
        detail,
      } as any);
    }
  });

  content.push({ type: "input_text", text: prompt });
  return content;
}

async function runExtraction(
  files: InvoiceInputFile[],
  options: { model: string; detail: "auto" | "high"; effort: "none" | "low" }
) {
  const response = await openai.responses.create({
    model: options.model,
    reasoning: { effort: options.effort },
    input: [{ role: "user", content: buildContent(files, options.detail) }],
    text: {
      format: {
        type: "json_schema",
        name: "invoice_batch",
        strict: true,
        schema: invoiceSchema,
      },
    },
  });

  const output = response.output_text?.trim();
  if (!output) throw new Error("The invoice reader returned no data.");

  let parsed: { invoices?: ExtractedInvoice[] };
  try {
    parsed = JSON.parse(output);
  } catch {
    throw new Error("The invoice reader returned an incomplete result. Please try again.");
  }

  if (!Array.isArray(parsed.invoices) || parsed.invoices.length === 0) {
    throw Object.assign(new Error("No invoices could be read from this file."), {
      status: 422,
    });
  }

  return parsed.invoices;
}

export async function extractInvoicesFromFiles(files: InvoiceInputFile[]) {
  const startedAt = Date.now();

  try {
    const fastInvoices = await runExtraction(files, {
      model: FAST_MODEL,
      detail: "auto",
      effort: "none",
    });
    const validation = validateBatch(fastInvoices);

    console.info("INVOICE FAST PASS", {
      model: FAST_MODEL,
      files: files.length,
      invoices: fastInvoices.length,
      valid: validation.valid,
      reasons: validation.reasons,
      elapsedMs: Date.now() - startedAt,
    });

    if (validation.valid) return fastInvoices;
  } catch (fastError) {
    console.warn("INVOICE FAST PASS FAILED", fastError);
  }

  const fallbackStartedAt = Date.now();
  const fallbackInvoices = await runExtraction(files, {
    model: FALLBACK_MODEL,
    detail: "high",
    effort: "low",
  });

  console.info("INVOICE FALLBACK PASS", {
    model: FALLBACK_MODEL,
    files: files.length,
    invoices: fallbackInvoices.length,
    elapsedMs: Date.now() - fallbackStartedAt,
    totalElapsedMs: Date.now() - startedAt,
  });

  return fallbackInvoices;
}
