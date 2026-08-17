export type HistoricalInvoiceLine = {
  sku?: string;
  product: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type HistoricalInvoice = {
  id: string;
  supplier: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  currency: "GBP";
  subtotal: number;
  vat: number;
  total: number;
  source: "chat-upload" | "app-upload" | "import";
  lines: HistoricalInvoiceLine[];
};

export const historicalInvoices: HistoricalInvoice[] = [
  {
    id: "masafina-mas-13263",
    supplier: "Masafina",
    invoiceNumber: "MAS-13263",
    invoiceDate: "2026-06-10",
    dueDate: "2026-07-10",
    currency: "GBP",
    subtotal: 377.55,
    vat: 0,
    total: 377.55,
    source: "chat-upload",
    lines: [
      {
        sku: "WC-007",
        product: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 5,
        unitPrice: 36.95,
        lineTotal: 184.75,
      },
      {
        sku: "WC-005",
        product: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)",
        unit: "case",
        quantity: 4,
        unitPrice: 35.95,
        lineTotal: 143.8,
      },
      {
        sku: "CC-001U",
        product: "Quesillo Cheese (500g)",
        unit: "bag",
        quantity: 4,
        unitPrice: 12.25,
        lineTotal: 49,
      },
    ],
  },
  {
    id: "masafina-mas-13926",
    supplier: "Masafina",
    invoiceNumber: "MAS-13926",
    invoiceDate: "2026-07-08",
    dueDate: "2026-08-07",
    currency: "GBP",
    subtotal: 291.6,
    vat: 0,
    total: 291.6,
    source: "chat-upload",
    lines: [
      {
        sku: "WC-007",
        product: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 4,
        unitPrice: 36.95,
        lineTotal: 147.8,
      },
      {
        sku: "WC-005",
        product: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)",
        unit: "case",
        quantity: 4,
        unitPrice: 35.95,
        lineTotal: 143.8,
      },
    ],
  },
  {
    id: "masafina-mas-14251",
    supplier: "Masafina",
    invoiceNumber: "MAS-14251",
    invoiceDate: "2026-07-17",
    dueDate: "2026-08-16",
    currency: "GBP",
    subtotal: 339.55,
    vat: 0,
    total: 339.55,
    source: "chat-upload",
    lines: [
      {
        sku: "WC-007",
        product: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 4,
        unitPrice: 36.95,
        lineTotal: 147.8,
      },
      {
        sku: "WC-005",
        product: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)",
        unit: "case",
        quantity: 2,
        unitPrice: 35.95,
        lineTotal: 71.9,
      },
      {
        sku: "PC-005",
        product: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 3,
        unitPrice: 39.95,
        lineTotal: 119.85,
      },
    ],
  },
  {
    id: "masafina-mas-14565",
    supplier: "Masafina",
    invoiceNumber: "MAS-14565",
    invoiceDate: "2026-07-31",
    dueDate: "2026-08-30",
    currency: "GBP",
    subtotal: 513.3,
    vat: 0,
    total: 513.3,
    source: "chat-upload",
    lines: [
      {
        sku: "WC-007",
        product: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 5,
        unitPrice: 36.95,
        lineTotal: 184.75,
      },
      {
        sku: "WC-005",
        product: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)",
        unit: "case",
        quantity: 4,
        unitPrice: 35.95,
        lineTotal: 143.8,
      },
      {
        sku: "PC-005",
        product: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 2,
        unitPrice: 39.95,
        lineTotal: 79.9,
      },
      {
        sku: "WC-008",
        product: "Case of 15cm Heirloom Corn Tortillas (5 x 1kg)",
        unit: "case",
        quantity: 3,
        unitPrice: 34.95,
        lineTotal: 104.85,
      },
    ],
  },
];
