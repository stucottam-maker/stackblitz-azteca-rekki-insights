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

export async function extractInvoicesFromFiles(files: InvoiceInputFile[]) {
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
        detail: "high",
      } as any);
    }
  });

  content.push({ type: "input_text", text: prompt });

  const response = await openai.responses.create({
    model: "gpt-5",
    input: [{ role: "user", content }],
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
