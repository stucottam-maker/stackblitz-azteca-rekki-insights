"use client";

import { useLayoutEffect } from "react";
import {
  observedApprovedInvoices,
  observedIngredientPrices,
} from "../data/invoiceOrderHistory";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function InvoiceSeedHydrator() {
  useLayoutEffect(() => {
    const existingInvoices = safeParse<Array<{ id?: string }>>(
      localStorage.getItem("approvedInvoices"),
      []
    );
    const existingIds = new Set(existingInvoices.map((invoice) => invoice.id));
    const mergedInvoices = [
      ...existingInvoices,
      ...observedApprovedInvoices.filter((invoice) => !existingIds.has(invoice.id)),
    ];
    localStorage.setItem("approvedInvoices", JSON.stringify(mergedInvoices));

    const existingPrices = safeParse<Record<string, unknown>>(
      localStorage.getItem("ingredientPrices"),
      {}
    );
    localStorage.setItem(
      "ingredientPrices",
      JSON.stringify({ ...observedIngredientPrices, ...existingPrices })
    );
  }, []);

  return null;
}
