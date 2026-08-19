import { NextResponse } from "next/server";

import {
  authErrorResponse,
  requireOrganisation,
  serviceSupabase,
} from "../../lib/serverAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { organisationId } = await requireOrganisation(request);

    const { data: invoices, error: invoiceError } = await serviceSupabase
      .from("invoices")
      .select("id,supplier_id,invoice_date")
      .eq("organisation_id", organisationId)
      .eq("status", "approved")
      .order("invoice_date", { ascending: false })
      .limit(1000);

    if (invoiceError) throw invoiceError;

    const invoiceIds = (invoices ?? []).map((row) => row.id);
    const supplierIds = Array.from(
      new Set((invoices ?? []).map((row) => row.supplier_id).filter(Boolean))
    ) as string[];

    const [supplierResult, lineResult, mappingResult] = await Promise.all([
      supplierIds.length
        ? serviceSupabase
            .from("suppliers")
            .select("id,name")
            .in("id", supplierIds)
        : Promise.resolve({ data: [], error: null }),
      invoiceIds.length
        ? serviceSupabase
            .from("invoice_lines")
            .select("invoice_id,product_name,pack,price_unit,unit_price,line_total,quantity")
            .in("invoice_id", invoiceIds)
            .range(0, 4999)
        : Promise.resolve({ data: [], error: null }),
      serviceSupabase
        .from("workspace_state")
        .select("state_value")
        .eq("organisation_id", organisationId)
        .eq("state_key", "invoiceProductMappings")
        .maybeSingle(),
    ]);

    if (supplierResult.error) throw supplierResult.error;
    if (lineResult.error) throw lineResult.error;
    if (mappingResult.error) throw mappingResult.error;

    const supplierById = new Map(
      (supplierResult.data ?? []).map((supplier: any) => [supplier.id, supplier.name])
    );
    const invoiceById = new Map(
      (invoices ?? []).map((invoice: any) => [invoice.id, invoice])
    );

    const seen = new Set<string>();
    const products = (lineResult.data ?? []).flatMap((line: any) => {
      const invoice = invoiceById.get(line.invoice_id) as any;
      if (!invoice || !line.product_name) return [];

      const supplier = supplierById.get(invoice.supplier_id) ?? "Unknown supplier";
      const key = `${supplier}::${line.product_name}`.toLowerCase();
      if (seen.has(key)) return [];
      seen.add(key);

      return [
        {
          supplier,
          productName: line.product_name,
          pack: line.pack,
          priceUnit: line.price_unit,
          unitPrice: line.unit_price,
          lineTotal: line.line_total,
          quantity: line.quantity,
          invoiceDate: invoice.invoice_date,
        },
      ];
    });

    products.sort((a: any, b: any) =>
      a.supplier.localeCompare(b.supplier) || a.productName.localeCompare(b.productName)
    );

    return NextResponse.json({
      catalogueCount: products.length,
      mappings: mappingResult.data?.state_value ?? {},
    });
  } catch (error) {
    const response = authErrorResponse(error);
    return NextResponse.json(
      { error: response.message },
      { status: response.status }
    );
  }
}
