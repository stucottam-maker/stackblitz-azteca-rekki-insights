export type InsightSeverity = "high" | "medium" | "low";
export type InsightCategory =
  | "cost"
  | "purchasing"
  | "stock"
  | "performance"
  | "data";

export type InsightAction = {
  label: string;
  href: string;
};

export type KitchenInsight = {
  id: string;
  title: string;
  message: string;
  category: InsightCategory;
  severity: InsightSeverity;
  financialImpact?: number | null;
  metric?: string;
  change?: number | null;
  actions?: InsightAction[];
};

export type IngredientPriceRecord = {
  price: number;
  unit?: string;
  supplier?: string;
  product?: string;
  updatedAt?: string;
};

export type PurchaseOrderLine = {
  ingredient?: string;
  supplierProduct?: string;
  orderQty?: number;
  orderUnit?: string;
  unitPrice?: number | null;
};

export type PurchaseOrder = {
  id?: string;
  supplier?: string;
  createdAt?: string;
  deliveryDate?: string;
  status?: string;
  lines?: PurchaseOrderLine[];
  estimatedTotal?: number;
};

export type InvoiceLine = {
  product?: string;
  ingredientMatch?: string;
  quantity?: number;
  unitPrice?: number;
  total?: number;
};

export type ApprovedInvoice = {
  id?: string;
  supplier?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  total?: number;
  subtotal?: number;
  lineItems?: InvoiceLine[];
};

export type StockItem = {
  name?: string;
  ingredient?: string;
  quantity?: number;
  unit?: string;
  value?: number;
};

export type StockTake = {
  id?: string;
  date?: string;
  createdAt?: string;
  completedAt?: string;
  items?: StockItem[];
  totalValue?: number;
};

export type RecipeCostSummary = {
  name: string;
  sellingPrice?: number | null;
  totalCost?: number | null;
  foodCostPercent?: number | null;
  targetFoodCostPercent?: number | null;
};

export type SupplierSpend = {
  supplier: string;
  total: number;
  invoiceCount: number;
};

export type DashboardMetrics = {
  spendThisMonth: number;
  spendPreviousMonth: number;
  spendChangePercent: number | null;

  approvedInvoices: number;
  activeSuppliers: number;

  currentStockValue: number | null;
  previousStockValue: number | null;
  stockValueChange: number | null;

  openingStockValue: number | null;
  closingStockValue: number | null;
  purchasesBetweenCounts: number;
  actualCogs: number | null;

  theoreticalFoodCostPercent: number | null;
  actualFoodCostPercent: number | null;
  foodCostVariancePercent: number | null;

  openOrders: number;
  ordersAwaitingInvoice: number;

  missingIngredientPrices: number;
};

export type InsightsData = {
  metrics: DashboardMetrics;
  insights: KitchenInsight[];
  supplierSpend: SupplierSpend[];
};

type GenerateInsightsInput = {
  ingredientPrices?: Record<string, IngredientPriceRecord>;
  previousIngredientPrices?: Record<string, IngredientPriceRecord>;

  purchaseOrders?: PurchaseOrder[];
  invoices?: ApprovedInvoice[];
  stockTakes?: StockTake[];

  recipeCosts?: RecipeCostSummary[];

  salesThisPeriod?: number | null;
  theoreticalFoodCostPercent?: number | null;
};

const HIGH_IMPACT = 100;
const MEDIUM_IMPACT = 40;

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function safePercentChange(
  current: number,
  previous: number
): number | null {
  if (!previous) return null;

  return ((current - previous) / previous) * 100;
}

function severityFromImpact(
  financialImpact: number | null | undefined
): InsightSeverity {
  const impact = Math.abs(financialImpact ?? 0);

  if (impact >= HIGH_IMPACT) return "high";
  if (impact >= MEDIUM_IMPACT) return "medium";

  return "low";
}

function severityFromPercentage(
  percentage: number
): InsightSeverity {
  const change = Math.abs(percentage);

  if (change >= 10) return "high";
  if (change >= 5) return "medium";

  return "low";
}

function startOfMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
}

function startOfPreviousMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  );
}

function isDateBetween(
  value: string | undefined,
  start: Date,
  end: Date
): boolean {
  if (!value) return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date >= start && date < end;
}

function getInvoiceTotal(invoice: ApprovedInvoice): number {
  if (typeof invoice.total === "number") {
    return invoice.total;
  }

  if (typeof invoice.subtotal === "number") {
    return invoice.subtotal;
  }

  return (
    invoice.lineItems?.reduce(
      (sum, line) => sum + asNumber(line.total),
      0
    ) ?? 0
  );
}

function getOrderTotal(order: PurchaseOrder): number {
  if (
    typeof order.estimatedTotal === "number" &&
    Number.isFinite(order.estimatedTotal)
  ) {
    return order.estimatedTotal;
  }

  return (
    order.lines?.reduce((sum, line) => {
      return (
        sum +
        asNumber(line.orderQty) *
          asNumber(line.unitPrice)
      );
    }, 0) ?? 0
  );
}

function calculateStockTakeValue(
  stockTake: StockTake,
  ingredientPrices: Record<
    string,
    IngredientPriceRecord
  >
): number {
  if (
    typeof stockTake.totalValue === "number" &&
    Number.isFinite(stockTake.totalValue)
  ) {
    return stockTake.totalValue;
  }

  return (
    stockTake.items?.reduce((sum, item) => {
      if (
        typeof item.value === "number" &&
        Number.isFinite(item.value)
      ) {
        return sum + item.value;
      }

      const ingredientName =
        item.ingredient ?? item.name ?? "";

      const priceRecord =
        ingredientPrices[ingredientName];

      if (!priceRecord) {
        return sum;
      }

      return (
        sum +
        asNumber(item.quantity) *
          asNumber(priceRecord.price)
      );
    }, 0) ?? 0
  );
}

function sortStockTakes(
  stockTakes: StockTake[]
): StockTake[] {
  return [...stockTakes].sort((a, b) => {
    const dateA = new Date(
      a.completedAt ??
        a.date ??
        a.createdAt ??
        0
    ).getTime();

    const dateB = new Date(
      b.completedAt ??
        b.date ??
        b.createdAt ??
        0
    ).getTime();

    return dateA - dateB;
  });
}

function totalPurchasesBetween(
  invoices: ApprovedInvoice[],
  startDate: string | undefined,
  endDate: string | undefined
): number {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0;
  }

  return invoices.reduce((sum, invoice) => {
    if (!invoice.invoiceDate) {
      return sum;
    }

    const invoiceDate = new Date(
      invoice.invoiceDate
    );

    if (
      Number.isNaN(invoiceDate.getTime()) ||
      invoiceDate <= start ||
      invoiceDate > end
    ) {
      return sum;
    }

    return sum + getInvoiceTotal(invoice);
  }, 0);
}

function buildSupplierSpend(
  invoices: ApprovedInvoice[]
): SupplierSpend[] {
  const supplierMap: Record<
    string,
    SupplierSpend
  > = {};

  invoices.forEach((invoice) => {
    const supplier =
      invoice.supplier?.trim() ||
      "Unknown supplier";

    if (!supplierMap[supplier]) {
      supplierMap[supplier] = {
        supplier,
        total: 0,
        invoiceCount: 0,
      };
    }

    supplierMap[supplier].total +=
      getInvoiceTotal(invoice);

    supplierMap[supplier].invoiceCount += 1;
  });

  return Object.values(supplierMap).sort(
    (a, b) => b.total - a.total
  );
}

function buildPriceInsights(
  currentPrices: Record<
    string,
    IngredientPriceRecord
  >,
  previousPrices: Record<
    string,
    IngredientPriceRecord
  >
): KitchenInsight[] {
  const insights: KitchenInsight[] = [];

  Object.entries(currentPrices).forEach(
    ([ingredient, current]) => {
      const previous =
        previousPrices[ingredient];

      if (!previous) return;

      const oldPrice = asNumber(previous.price);
      const newPrice = asNumber(current.price);

      if (!oldPrice || !newPrice) {
        return;
      }

      const changePercent =
        ((newPrice - oldPrice) / oldPrice) *
        100;

      if (Math.abs(changePercent) < 3) {
        return;
      }

      const increase =
        changePercent > 0;

      insights.push({
        id: `price-${ingredient
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
        title: `${ingredient} ${
          increase ? "price increased" : "price decreased"
        } ${Math.abs(changePercent).toFixed(
          1
        )}%`,
        message: `${
          current.supplier ??
          "The current supplier"
        } price moved from £${oldPrice.toFixed(
          2
        )} to £${newPrice.toFixed(2)} per ${
          current.unit ?? "unit"
        }.`,
        category: "cost",
        severity:
          severityFromPercentage(
            changePercent
          ),
        metric: `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(
          1
        )}%`,
        change: changePercent,
        actions: [
          {
            label: "View ingredients",
            href: "/ingredients",
          },
          {
            label: "View invoices",
            href: "/invoices",
          },
        ],
      });
    }
  );

  return insights;
}

function buildSupplierInsights(
  invoices: ApprovedInvoice[]
): KitchenInsight[] {
  const insights: KitchenInsight[] = [];

  const now = new Date();
  const currentMonthStart =
    startOfMonth(now);
  const previousMonthStart =
    startOfPreviousMonth(now);

  const supplierMonthly: Record<
    string,
    {
      current: number;
      previous: number;
    }
  > = {};

  invoices.forEach((invoice) => {
    const supplier =
      invoice.supplier?.trim() ||
      "Unknown supplier";

    if (!supplierMonthly[supplier]) {
      supplierMonthly[supplier] = {
        current: 0,
        previous: 0,
      };
    }

    const total =
      getInvoiceTotal(invoice);

    if (
      isDateBetween(
        invoice.invoiceDate,
        currentMonthStart,
        new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          1
        )
      )
    ) {
      supplierMonthly[supplier].current +=
        total;
    }

    if (
      isDateBetween(
        invoice.invoiceDate,
        previousMonthStart,
        currentMonthStart
      )
    ) {
      supplierMonthly[
        supplier
      ].previous += total;
    }
  });

  Object.entries(supplierMonthly).forEach(
    ([supplier, spend]) => {
      if (!spend.previous) return;

      const change =
        safePercentChange(
          spend.current,
          spend.previous
        );

      if (
        change === null ||
        Math.abs(change) < 10
      ) {
        return;
      }

      const financialDifference =
        spend.current - spend.previous;

      insights.push({
        id: `supplier-${supplier
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
        title: `${supplier} spend ${
          change > 0 ? "increased" : "decreased"
        } ${Math.abs(change).toFixed(1)}%`,
        message: `This month £${spend.current.toFixed(
          2
        )} has been recorded compared with £${spend.previous.toFixed(
          2
        )} last month.`,
        category: "purchasing",
        severity:
          severityFromImpact(
            financialDifference
          ),
        financialImpact:
          financialDifference,
        metric: `${
          financialDifference >= 0
            ? "+"
            : "-"
        }£${Math.abs(
          financialDifference
        ).toFixed(2)}`,
        change,
        actions: [
          {
            label: "View invoices",
            href: "/invoices",
          },
          {
            label: "View reports",
            href: "/reports",
          },
        ],
      });
    }
  );

  return insights;
}

function buildRecipeInsights(
  recipes: RecipeCostSummary[]
): KitchenInsight[] {
  return recipes
    .filter((recipe) => {
      if (
        recipe.foodCostPercent === null ||
        recipe.foodCostPercent === undefined
      ) {
        return false;
      }

      const target =
        recipe.targetFoodCostPercent ?? 30;

      return (
        recipe.foodCostPercent > target
      );
    })
    .map((recipe) => {
      const target =
        recipe.targetFoodCostPercent ?? 30;

      const variance =
        asNumber(recipe.foodCostPercent) -
        target;

      return {
        id: `recipe-${recipe.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
        title: `${recipe.name} is above food-cost target`,
        message: `Current theoretical food cost is ${asNumber(
          recipe.foodCostPercent
        ).toFixed(
          1
        )}% against a ${target.toFixed(
          1
        )}% target.`,
        category: "cost" as const,
        severity:
          variance >= 8
            ? ("high" as const)
            : variance >= 3
            ? ("medium" as const)
            : ("low" as const),
        metric: `${asNumber(
          recipe.foodCostPercent
        ).toFixed(1)}%`,
        change: variance,
        actions: [
          {
            label: "View recipes",
            href: "/recipes",
          },
          {
            label: "View menu",
            href: "/menu",
          },
        ],
      };
    });
}

function buildDataQualityInsights(
  ingredientPrices: Record<
    string,
    IngredientPriceRecord
  >
): KitchenInsight[] {
  const missing = Object.entries(
    ingredientPrices
  ).filter(([, record]) => {
    return !asNumber(record.price);
  });

  if (!missing.length) {
    return [];
  }

  return [
    {
      id: "missing-ingredient-prices",
      title: `${missing.length} ingredient ${
        missing.length === 1
          ? "price is"
          : "prices are"
      } missing`,
      message:
        "Recipes using these ingredients cannot be costed accurately until supplier prices are available.",
      category: "data",
      severity:
        missing.length >= 10
          ? "high"
          : missing.length >= 4
          ? "medium"
          : "low",
      metric: `${missing.length}`,
      actions: [
        {
          label: "View ingredients",
          href: "/ingredients",
        },
        {
          label: "Upload invoice",
          href: "/invoices/upload",
        },
      ],
    },
  ];
}

function buildOrderInsights(
  orders: PurchaseOrder[],
  invoices: ApprovedInvoice[]
): KitchenInsight[] {
  const sentOrders = orders.filter(
    (order) => {
      const status =
        order.status?.toLowerCase() ?? "";

      return (
        status === "sent" ||
        status === "confirmed" ||
        status === "delivered"
      );
    }
  );

  const ordersAwaitingInvoice =
    sentOrders.filter((order) => {
      const supplier =
        order.supplier
          ?.trim()
          .toLowerCase();

      if (!supplier) return true;

      const orderDate = new Date(
        order.createdAt ?? 0
      );

      return !invoices.some((invoice) => {
        const invoiceSupplier =
          invoice.supplier
            ?.trim()
            .toLowerCase();

        const invoiceDate = new Date(
          invoice.invoiceDate ?? 0
        );

        if (
          invoiceSupplier !== supplier ||
          Number.isNaN(
            orderDate.getTime()
          ) ||
          Number.isNaN(
            invoiceDate.getTime()
          )
        ) {
          return false;
        }

        const daysDifference =
          Math.abs(
            invoiceDate.getTime() -
              orderDate.getTime()
          ) /
          (1000 * 60 * 60 * 24);

        return daysDifference <= 10;
      });
    });

  if (!ordersAwaitingInvoice.length) {
    return [];
  }

  const value =
    ordersAwaitingInvoice.reduce(
      (sum, order) =>
        sum + getOrderTotal(order),
      0
    );

  return [
    {
      id: "orders-awaiting-invoices",
      title: `${ordersAwaitingInvoice.length} ${
        ordersAwaitingInvoice.length === 1
          ? "order is"
          : "orders are"
      } awaiting an invoice`,
      message:
        "These sent orders do not yet appear to have a matching supplier invoice recorded.",
      category: "purchasing",
      severity:
        ordersAwaitingInvoice.length >= 4
          ? "high"
          : "medium",
      financialImpact:
        value || null,
      metric:
        value > 0
          ? `£${value.toFixed(2)}`
          : `${ordersAwaitingInvoice.length}`,
      actions: [
        {
          label: "View orders",
          href: "/orders",
        },
        {
          label: "Upload invoice",
          href: "/invoices/upload",
        },
      ],
    },
  ];
}

function buildStockInsights(
  stockTakes: StockTake[],
  ingredientPrices: Record<
    string,
    IngredientPriceRecord
  >,
  invoices: ApprovedInvoice[],
  salesThisPeriod: number | null | undefined,
  theoreticalFoodCostPercent:
    | number
    | null
    | undefined
): {
  insights: KitchenInsight[];
  openingStockValue: number | null;
  closingStockValue: number | null;
  purchasesBetweenCounts: number;
  actualCogs: number | null;
  actualFoodCostPercent: number | null;
  variance: number | null;
} {
  const insights: KitchenInsight[] = [];

  const sorted =
    sortStockTakes(stockTakes);

  if (sorted.length < 2) {
    return {
      insights: [
        {
          id: "insufficient-stock-history",
          title:
            "More stock history is needed for actual COGS",
          message:
            "Complete at least two stock counts so Kitchen Insights can calculate opening stock + purchases − closing stock.",
          category: "stock",
          severity: "low",
          actions: [
            {
              label: "View stock",
              href: "/stock",
            },
          ],
        },
      ],
      openingStockValue: null,
      closingStockValue: null,
      purchasesBetweenCounts: 0,
      actualCogs: null,
      actualFoodCostPercent: null,
      variance: null,
    };
  }

  const opening =
    sorted[sorted.length - 2];

  const closing =
    sorted[sorted.length - 1];

  const openingValue =
    calculateStockTakeValue(
      opening,
      ingredientPrices
    );

  const closingValue =
    calculateStockTakeValue(
      closing,
      ingredientPrices
    );

  const openingDate =
    opening.completedAt ??
    opening.date ??
    opening.createdAt;

  const closingDate =
    closing.completedAt ??
    closing.date ??
    closing.createdAt;

  const purchases =
    totalPurchasesBetween(
      invoices,
      openingDate,
      closingDate
    );

  const actualCogs =
    openingValue +
    purchases -
    closingValue;

  let actualFoodCostPercent:
    | number
    | null = null;

  let variance: number | null = null;

  if (
    salesThisPeriod &&
    salesThisPeriod > 0
  ) {
    actualFoodCostPercent =
      (actualCogs /
        salesThisPeriod) *
      100;

    if (
      theoreticalFoodCostPercent !==
        null &&
      theoreticalFoodCostPercent !==
        undefined
    ) {
      variance =
        actualFoodCostPercent -
        theoreticalFoodCostPercent;

      if (Math.abs(variance) >= 1.5) {
        insights.push({
          id: "actual-vs-theoretical-food-cost",
          title:
            variance > 0
              ? "Actual food cost is above theoretical"
              : "Actual food cost is below theoretical",
          message: `Actual food cost is ${actualFoodCostPercent.toFixed(
            1
          )}% versus ${theoreticalFoodCostPercent.toFixed(
            1
          )}% theoretical, a ${Math.abs(
            variance
          ).toFixed(1)} point ${
            variance > 0
              ? "overspend"
              : "favourable variance"
          }.`,
          category: "performance",
          severity:
            Math.abs(variance) >= 5
              ? "high"
              : Math.abs(variance) >= 2.5
              ? "medium"
              : "low",
          metric: `${
            variance >= 0 ? "+" : ""
          }${variance.toFixed(1)} pts`,
          change: variance,
          actions: [
            {
              label:
                "View stock movement",
              href: "/stock",
            },
            {
              label:
                "View reports",
              href: "/reports",
            },
          ],
        });
      }
    }
  }

  const stockMovement =
    closingValue - openingValue;

  const stockMovementPercent =
    safePercentChange(
      closingValue,
      openingValue
    );

  if (
    stockMovementPercent !== null &&
    Math.abs(stockMovementPercent) >= 15
  ) {
    insights.push({
      id: "stock-value-movement",
      title: `Stock value ${
        stockMovement >= 0
          ? "increased"
          : "decreased"
      } ${Math.abs(
        stockMovementPercent
      ).toFixed(1)}%`,
      message: `Latest stock value is £${closingValue.toFixed(
        2
      )}, compared with £${openingValue.toFixed(
        2
      )} at the previous count.`,
      category: "stock",
      severity:
        severityFromImpact(
          stockMovement
        ),
      financialImpact:
        stockMovement,
      metric: `${
        stockMovement >= 0 ? "+" : "-"
      }£${Math.abs(
        stockMovement
      ).toFixed(2)}`,
      change: stockMovementPercent,
      actions: [
        {
          label: "View stock",
          href: "/stock",
        },
      ],
    });
  }

  return {
    insights,
    openingStockValue:
      openingValue,
    closingStockValue:
      closingValue,
    purchasesBetweenCounts:
      purchases,
    actualCogs,
    actualFoodCostPercent,
    variance,
  };
}

function sortInsights(
  insights: KitchenInsight[]
): KitchenInsight[] {
  const severityScore: Record<
    InsightSeverity,
    number
  > = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return [...insights].sort((a, b) => {
    const severityDifference =
      severityScore[b.severity] -
      severityScore[a.severity];

    if (severityDifference !== 0) {
      return severityDifference;
    }

    return (
      Math.abs(
        b.financialImpact ?? 0
      ) -
      Math.abs(
        a.financialImpact ?? 0
      )
    );
  });
}

export function generateInsights({
  ingredientPrices = {},
  previousIngredientPrices = {},
  purchaseOrders = [],
  invoices = [],
  stockTakes = [],
  recipeCosts = [],
  salesThisPeriod = null,
  theoreticalFoodCostPercent = null,
}: GenerateInsightsInput): InsightsData {
  const now = new Date();

  const currentMonthStart =
    startOfMonth(now);

  const previousMonthStart =
    startOfPreviousMonth(now);

  const nextMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );

  const currentMonthInvoices =
    invoices.filter((invoice) =>
      isDateBetween(
        invoice.invoiceDate,
        currentMonthStart,
        nextMonthStart
      )
    );

  const previousMonthInvoices =
    invoices.filter((invoice) =>
      isDateBetween(
        invoice.invoiceDate,
        previousMonthStart,
        currentMonthStart
      )
    );

  const spendThisMonth =
    currentMonthInvoices.reduce(
      (sum, invoice) =>
        sum + getInvoiceTotal(invoice),
      0
    );

  const spendPreviousMonth =
    previousMonthInvoices.reduce(
      (sum, invoice) =>
        sum + getInvoiceTotal(invoice),
      0
    );

  const spendChangePercent =
    safePercentChange(
      spendThisMonth,
      spendPreviousMonth
    );

  const supplierSpend =
    buildSupplierSpend(invoices);

  const activeSuppliers =
    supplierSpend.length;

  const openOrders =
    purchaseOrders.filter((order) => {
      const status =
        order.status
          ?.trim()
          .toLowerCase() ?? "";

      return (
        status === "draft" ||
        status === "sent" ||
        status === "confirmed"
      );
    }).length;

  const sentOrders =
    purchaseOrders.filter((order) => {
      const status =
        order.status
          ?.trim()
          .toLowerCase() ?? "";

      return (
        status === "sent" ||
        status === "confirmed" ||
        status === "delivered"
      );
    });

  const ordersAwaitingInvoice =
    sentOrders.filter((order) => {
      const supplier =
        order.supplier
          ?.trim()
          .toLowerCase();

      if (!supplier) return true;

      return !invoices.some(
        (invoice) =>
          invoice.supplier
            ?.trim()
            .toLowerCase() ===
          supplier
      );
    }).length;

  const missingIngredientPrices =
    Object.values(
      ingredientPrices
    ).filter(
      (record) =>
        !asNumber(record.price)
    ).length;

  const stockResult =
    buildStockInsights(
      stockTakes,
      ingredientPrices,
      invoices,
      salesThisPeriod,
      theoreticalFoodCostPercent
    );

  let currentStockValue:
    | number
    | null = null;

  let previousStockValue:
    | number
    | null = null;

  let stockValueChange:
    | number
    | null = null;

  const sortedStock =
    sortStockTakes(stockTakes);

  if (sortedStock.length >= 1) {
    currentStockValue =
      calculateStockTakeValue(
        sortedStock[
          sortedStock.length - 1
        ],
        ingredientPrices
      );
  }

  if (sortedStock.length >= 2) {
    previousStockValue =
      calculateStockTakeValue(
        sortedStock[
          sortedStock.length - 2
        ],
        ingredientPrices
      );

    stockValueChange =
      currentStockValue !== null
        ? currentStockValue -
          previousStockValue
        : null;
  }

  const insights: KitchenInsight[] = [
    ...buildPriceInsights(
      ingredientPrices,
      previousIngredientPrices
    ),
    ...buildSupplierInsights(
      invoices
    ),
    ...buildRecipeInsights(
      recipeCosts
    ),
    ...buildOrderInsights(
      purchaseOrders,
      invoices
    ),
    ...buildDataQualityInsights(
      ingredientPrices
    ),
    ...stockResult.insights,
  ];

  if (
    spendChangePercent !== null &&
    Math.abs(spendChangePercent) >= 15
  ) {
    insights.push({
      id: "monthly-spend-movement",
      title: `Purchasing spend ${
        spendChangePercent > 0
          ? "increased"
          : "decreased"
      } ${Math.abs(
        spendChangePercent
      ).toFixed(1)}%`,
      message: `Recorded supplier spend is £${spendThisMonth.toFixed(
        2
      )} this month versus £${spendPreviousMonth.toFixed(
        2
      )} last month.`,
      category: "purchasing",
      severity:
        severityFromImpact(
          spendThisMonth -
            spendPreviousMonth
        ),
      financialImpact:
        spendThisMonth -
        spendPreviousMonth,
      metric: `${
        spendChangePercent > 0
          ? "+"
          : ""
      }${spendChangePercent.toFixed(
        1
      )}%`,
      change: spendChangePercent,
      actions: [
        {
          label: "View invoices",
          href: "/invoices",
        },
        {
          label: "View reports",
          href: "/reports",
        },
      ],
    });
  }

  return {
    metrics: {
      spendThisMonth,
      spendPreviousMonth,
      spendChangePercent,

      approvedInvoices:
        invoices.length,

      activeSuppliers,

      currentStockValue,
      previousStockValue,
      stockValueChange,

      openingStockValue:
        stockResult.openingStockValue,

      closingStockValue:
        stockResult.closingStockValue,

      purchasesBetweenCounts:
        stockResult.purchasesBetweenCounts,

      actualCogs:
        stockResult.actualCogs,

      theoreticalFoodCostPercent,

      actualFoodCostPercent:
        stockResult.actualFoodCostPercent,

      foodCostVariancePercent:
        stockResult.variance,

      openOrders,
      ordersAwaitingInvoice,

      missingIngredientPrices,
    },

    insights:
      sortInsights(insights),

    supplierSpend,
  };
}

export function formatCurrency(
  value: number | null | undefined
): string {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
    }
  ).format(value);
}

export function formatPercent(
  value: number | null | undefined,
  decimals = 1
): string {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return `${value.toFixed(
    decimals
  )}%`;
}
