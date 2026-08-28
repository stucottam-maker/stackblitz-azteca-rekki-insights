import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOOKBACK_DAYS = 90;
const MIN_INVOICE_COUNT = 3;
const DAY_MS = 86_400_000;

type InvoiceRow = {
  id: string;
  invoice_date: string | null;
};

type InvoiceLineRow = {
  invoice_id: string;
  supplier_product_id: string | null;
  quantity: number | string | null;
  price_unit: string | null;
  unit_price: number | string | null;
};

type ProductRow = {
  id: string;
  supplier_product_name: string;
  price_unit: string | null;
  latest_price: number | string | null;
  supplier: { id: string; name: string } | { id: string; name: string }[] | null;
};

function first<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function numeric(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

export async function GET(request: Request) {
  try {
    const { organisationId, siteId } = await requireOrganisation(request);
    const cutoff = new Date(Date.now() - LOOKBACK_DAYS * DAY_MS).toISOString().slice(0, 10);

    const { data: invoiceData, error: invoiceError } = await serviceSupabase
      .from("invoices")
      .select("id,invoice_date")
      .eq("organisation_id", organisationId)
      .eq("site_id", siteId)
      .eq("status", "approved")
      .gte("invoice_date", cutoff)
      .not("invoice_date", "is", null);

    if (invoiceError) throw invoiceError;
    const invoices = (invoiceData ?? []) as InvoiceRow[];
    if (!invoices.length) {
      return NextResponse.json({ products: [], lookbackDays: LOOKBACK_DAYS, minimumInvoices: MIN_INVOICE_COUNT });
    }

    const invoiceDateById = new Map(
      invoices.flatMap((invoice) => invoice.invoice_date ? [[invoice.id, invoice.invoice_date] as const] : [])
    );

    const { data: lineData, error: lineError } = await serviceSupabase
      .from("invoice_lines")
      .select("invoice_id,supplier_product_id,quantity,price_unit,unit_price")
      .in("invoice_id", invoices.map((invoice) => invoice.id))
      .not("supplier_product_id", "is", null);

    if (lineError) throw lineError;
    const lines = (lineData ?? []) as InvoiceLineRow[];

    const byProduct = new Map<
      string,
      Map<string, { quantity: number; priceUnit: string | null; unitPrice: number | null }>
    >();

    for (const line of lines) {
      if (!line.supplier_product_id || !invoiceDateById.has(line.invoice_id)) continue;
      const productInvoices = byProduct.get(line.supplier_product_id) ?? new Map();
      const existing = productInvoices.get(line.invoice_id) ?? {
        quantity: 0,
        priceUnit: line.price_unit,
        unitPrice: numeric(line.unit_price),
      };
      const quantity = numeric(line.quantity);
      if (quantity !== null && quantity > 0) existing.quantity += quantity;
      if (!existing.priceUnit && line.price_unit) existing.priceUnit = line.price_unit;
      if (existing.unitPrice === null) existing.unitPrice = numeric(line.unit_price);
      productInvoices.set(line.invoice_id, existing);
      byProduct.set(line.supplier_product_id, productInvoices);
    }

    const frequentIds = Array.from(byProduct.entries())
      .filter(([, productInvoices]) => productInvoices.size >= MIN_INVOICE_COUNT)
      .map(([productId]) => productId);

    if (!frequentIds.length) {
      return NextResponse.json({ products: [], lookbackDays: LOOKBACK_DAYS, minimumInvoices: MIN_INVOICE_COUNT });
    }

    const { data: productData, error: productError } = await serviceSupabase
      .from("supplier_products")
      .select("id,supplier_product_name,price_unit,latest_price,supplier:suppliers(id,name)")
      .eq("organisation_id", organisationId)
      .in("id", frequentIds);

    if (productError) throw productError;
    const products = (productData ?? []) as unknown as ProductRow[];
    const now = Date.now();

    const result = products.flatMap((product) => {
      const supplier = first(product.supplier);
      const invoiceEntries = Array.from(byProduct.get(product.id)?.entries() ?? []);
      if (!supplier || invoiceEntries.length < MIN_INVOICE_COUNT) return [];

      const dated = invoiceEntries
        .flatMap(([invoiceId, entry]) => {
          const date = invoiceDateById.get(invoiceId);
          return date ? [{ date, entry }] : [];
        })
        .sort((a, b) => a.date.localeCompare(b.date));

      if (dated.length < MIN_INVOICE_COUNT) return [];

      const quantities = dated.map(({ entry }) => entry.quantity).filter((quantity) => quantity > 0);
      const intervals = dated.slice(1).map((item, index) =>
        Math.max(
          1,
          Math.round(
            (new Date(item.date).getTime() - new Date(dated[index].date).getTime()) / DAY_MS
          )
        )
      );
      const weightedScore = dated.reduce((score, item) => {
        const daysAgo = Math.max(0, (now - new Date(item.date).getTime()) / DAY_MS);
        return score + Math.max(0.25, 1 - daysAgo / 120);
      }, 0);
      const latestEntry = dated[dated.length - 1];

      return [{
        productId: product.id,
        supplier: supplier.name,
        supplierProduct: product.supplier_product_name,
        averageQuantity: quantities.length
          ? round2(quantities.reduce((sum, quantity) => sum + quantity, 0) / quantities.length)
          : 1,
        orderUnit: product.price_unit || latestEntry.entry.priceUnit || "each",
        invoiceCount: dated.length,
        lastOrderedAt: latestEntry.date,
        averageIntervalDays: intervals.length
          ? Math.round(intervals.reduce((sum, days) => sum + days, 0) / intervals.length)
          : null,
        weightedScore: round2(weightedScore),
        latestUnitPrice: numeric(product.latest_price) ?? latestEntry.entry.unitPrice,
      }];
    });

    result.sort(
      (a, b) =>
        b.weightedScore - a.weightedScore ||
        b.invoiceCount - a.invoiceCount ||
        b.lastOrderedAt.localeCompare(a.lastOrderedAt) ||
        a.supplierProduct.localeCompare(b.supplierProduct)
    );

    return NextResponse.json({
      products: result,
      lookbackDays: LOOKBACK_DAYS,
      minimumInvoices: MIN_INVOICE_COUNT,
    });
  } catch (error) {
    console.error("FREQUENT ORDER PRODUCTS FAILED", error);
    const response = authErrorResponse(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
