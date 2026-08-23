import type { PurchaseOrder } from "./purchasing";
import { serviceSupabase } from "./serverAuth";

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

export type OrderMatchResult = {
  matchStatus: "unmatched" | "matched" | "discrepancy";
  discrepancyAmount: number | null;
  matchedOrderRef: string | null;
};

export async function matchInvoiceToPurchaseOrder(input: {
  organisationId: string;
  siteId: string;
  supplierName: string;
  invoiceTotal: number | null;
  invoiceDate?: string | null;
}): Promise<OrderMatchResult> {
  if (input.invoiceTotal === null || !Number.isFinite(input.invoiceTotal)) {
    return { matchStatus: "unmatched", discrepancyAmount: null, matchedOrderRef: null };
  }

  const { data, error } = await serviceSupabase
    .from("workspace_state")
    .select("state_value")
    .eq("organisation_id", input.organisationId)
    .eq("site_id", input.siteId)
    .eq("state_key", "purchaseOrders")
    .maybeSingle();
  if (error) throw error;

  const orders = Array.isArray(data?.state_value) ? (data!.state_value as PurchaseOrder[]) : [];
  if (!orders.length) {
    return { matchStatus: "unmatched", discrepancyAmount: null, matchedOrderRef: null };
  }

  const { data: alreadyMatched, error: matchedError } = await serviceSupabase
    .from("invoices")
    .select("matched_order_ref")
    .eq("organisation_id", input.organisationId)
    .eq("site_id", input.siteId)
    .not("matched_order_ref", "is", null);
  if (matchedError) throw matchedError;
  const used = new Set((alreadyMatched ?? []).map((row) => row.matched_order_ref).filter(Boolean));

  const invoiceTime = input.invoiceDate
    ? new Date(`${input.invoiceDate}T12:00:00`).getTime()
    : Date.now();
  const supplierKey = normalise(input.supplierName);

  const candidates = orders
    .filter((order) =>
      order.status !== "Draft" &&
      normalise(order.supplier) === supplierKey &&
      !used.has(order.id)
    )
    .map((order) => {
      const orderTime = new Date(order.receivedAt ?? order.sentAt ?? order.createdAt).getTime();
      const days = Number.isFinite(orderTime) ? Math.abs(invoiceTime - orderTime) / 86_400_000 : 9999;
      const difference = input.invoiceTotal! - Number(order.estimatedTotal || 0);
      return { order, days, difference, absDifference: Math.abs(difference) };
    })
    .filter((candidate) => candidate.days <= 45)
    .sort((a, b) => a.absDifference - b.absDifference || a.days - b.days);

  const best = candidates[0];
  if (!best) {
    return { matchStatus: "unmatched", discrepancyAmount: null, matchedOrderRef: null };
  }

  const tolerance = Math.max(1, Math.abs(input.invoiceTotal) * 0.005);
  const roundedDifference = Math.round(best.difference * 100) / 100;
  const isMatch = best.absDifference <= tolerance;

  return {
    matchStatus: isMatch ? "matched" : "discrepancy",
    discrepancyAmount: isMatch ? 0 : roundedDifference,
    matchedOrderRef: best.order.id,
  };
}
