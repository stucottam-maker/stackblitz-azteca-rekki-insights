import { observedInvoiceOrders } from "../data/invoiceOrderHistory";

export const PURCHASE_ORDERS_KEY = "purchaseOrders";
export const ORGANISATION_SETTINGS_KEY = "organisationSettings";

export type OrderStatus = "Draft" | "Sent" | "Received" | "Completed";

export type PurchaseOrderLine = {
  id: string;
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  stockQty: number;
  stockUnit: string;
  orderQty: number;
  orderUnit: string;
  unitPrice: number | null;
  suggestedQty: number;
  sku?: string;
  packSize?: number | null;
  casePrice?: number | null;
  splitPrice?: number | null;
  priceMode?: "default" | "split" | "case";
  brand?: string;
  woodsId?: number;
  receivedQty?: number | null;
};

export type PurchaseOrder = {
  id: string;
  supplier: string;
  supplierId?: string;
  supplierEmail?: string;
  createdAt: string;
  sentAt?: string;
  sentTo?: string;
  copiedTo?: string[];
  receivedAt?: string;
  completedAt?: string;
  status: OrderStatus;
  lines: PurchaseOrderLine[];
  estimatedTotal: number;
  receivedTotal?: number | null;
  notes?: string;
};

export type OrganisationSettings = {
  name: string;
  internalOrderEmails: string[];
  sendInternalCopy: boolean;
  sendSupplierEmail: boolean;
  attachPurchaseOrder: boolean;
  includeOrderNotes: boolean;
};

export const defaultOrganisationSettings: OrganisationSettings = {
  name: "Kitchen Insights",
  internalOrderEmails: [],
  sendInternalCopy: true,
  sendSupplierEmail: true,
  attachPurchaseOrder: true,
  includeOrderNotes: true,
};

export function organisationSettingsDefaults(name?: string | null): OrganisationSettings {
  return {
    ...defaultOrganisationSettings,
    name: name?.trim() || defaultOrganisationSettings.name,
    internalOrderEmails: [],
  };
}

export function orderEmailBody(order: PurchaseOrder, organisationName: string) {
  const lines = order.lines.map(
    (line) => `- ${line.supplierProduct || line.ingredient}: ${line.orderQty} ${line.orderUnit}`
  );

  return [
    `Purchase order ${order.id} from ${organisationName}`,
    "",
    ...lines,
    "",
    `Estimated total: ${new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(order.estimatedTotal)}`,
    order.notes ? `Notes: ${order.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export type RegularOrderItem = {
  lineId: string;
  ingredient: string;
  supplierProduct: string;
  orderUnit: string;
  averageQuantity: number;
  lastOrderedAt: string;
  averageIntervalDays: number | null;
  orderCount: number;
};

export function getRegularOrderItems(
  orders: PurchaseOrder[],
  supplier: string
): RegularOrderItem[] {
  const supplierOrders = orders
    .filter((order) => order.supplier === supplier && order.status !== "Draft")
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const history = new Map<
    string,
    { line: PurchaseOrderLine; quantities: number[]; dates: string[] }
  >();

  supplierOrders.forEach((order) => {
    order.lines.forEach((line) => {
      const key = line.id || `${line.ingredient}:${line.supplierProduct}`;
      const entry = history.get(key) ?? { line, quantities: [], dates: [] };
      entry.quantities.push(line.orderQty);
      entry.dates.push(order.createdAt);
      history.set(key, entry);
    });
  });

  const calculated = Array.from(history.entries())
    .map(([lineId, entry]) => {
      const intervals = entry.dates.slice(1).map((date, index) =>
        Math.max(
          1,
          Math.round(
            (new Date(date).getTime() - new Date(entry.dates[index]).getTime()) /
              86_400_000
          )
        )
      );

      return {
        lineId,
        ingredient: entry.line.ingredient,
        supplierProduct: entry.line.supplierProduct,
        orderUnit: entry.line.orderUnit,
        averageQuantity:
          Math.round(
            (entry.quantities.reduce((sum, quantity) => sum + quantity, 0) /
              entry.quantities.length) *
              100
          ) / 100,
        lastOrderedAt: entry.dates[entry.dates.length - 1],
        averageIntervalDays: intervals.length
          ? Math.round(intervals.reduce((sum, days) => sum + days, 0) / intervals.length)
          : null,
        orderCount: entry.quantities.length,
      };
    })
    .sort((a, b) => b.orderCount - a.orderCount || a.ingredient.localeCompare(b.ingredient));

  const observed = observedInvoiceOrders
    .filter((order) => order.supplier === supplier)
    .flatMap((order) =>
      order.items.map((item, index) => ({
        lineId: `invoice-${supplier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
        ingredient: item.ingredient,
        supplierProduct: item.supplierProduct,
        orderUnit: item.unit,
        averageQuantity: item.quantity,
        lastOrderedAt: order.invoiceDate,
        averageIntervalDays: null,
        orderCount: 1,
      }))
    );

  const calculatedIngredients = new Set(calculated.map((item) => item.ingredient.toLowerCase()));
  return [
    ...calculated,
    ...observed.filter((item) => !calculatedIngredients.has(item.ingredient.toLowerCase())),
  ];
}
