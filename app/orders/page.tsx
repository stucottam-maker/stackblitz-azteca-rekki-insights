"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supplierCatalogue } from "../data/supplierCatalogue";
import { suppliers as supplierDirectory } from "../data/suppliers";
import { getSupplierEmail } from "../data/suppliers";
import {
  getRegularOrderItems,
  orderEmailBody,
  readOrganisationSettings,
} from "../lib/purchasing";

type IngredientPrice = {
  price: number;
  unit: string;
  supplier: string;
  product: string;
  updatedAt: string;
};

type StockItem = {
  name: string;
  category: string;
  quantity: number | null;
  unit: string;
  price: number | null;
  priceUnit: string;
  supplier: string;
};

type OrderPriceMode = "default" | "split" | "case";

type OrderLine = {
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

  priceMode?: OrderPriceMode;

  lastOrdered?: string;
  lastOrderedQty?: number | null;
  lastOrderVariation?: string;

  brand?: string;
  woodsId?: number;
};

type PurchaseOrder = {
  id: string;
  supplier: string;
  createdAt: string;
  status: "Draft" | "Sent" | "Received" | "Completed";
  lines: OrderLine[];
  estimatedTotal: number;
  sentAt?: string;
  sentTo?: string;
  copiedTo?: string[];
  notes?: string;
};

type OrderStep = "start" | "order" | "review";
type SupplierTab = "catalogue" | "regular" | "history";

function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function supplierInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function findStockItem(
  currentStock: StockItem[],
  ingredient: string
) {
  const target = ingredient
    .toLowerCase()
    .trim();

  return (
    currentStock.find(
      (item) =>
        item.name
          .toLowerCase()
          .trim() === target
    ) ?? null
  );
}

function getEffectivePrice(line: OrderLine) {
  if (
    line.priceMode === "case" &&
    line.casePrice !== null &&
    line.casePrice !== undefined
  ) {
    return line.casePrice;
  }

  if (
    line.priceMode === "split" &&
    line.splitPrice !== null &&
    line.splitPrice !== undefined
  ) {
    return line.splitPrice;
  }

  return line.unitPrice;
}

function getEffectiveUnit(line: OrderLine) {
  if (line.priceMode === "case") {
    return "case";
  }

  return line.orderUnit;
}

function buildOrderLines(
  ingredientPrices: Record<string, IngredientPrice>,
  currentStock: StockItem[]
): OrderLine[] {
  const catalogueLines: OrderLine[] =
    supplierCatalogue.map((catalogueItem, index) => {
      const livePrice =
        ingredientPrices[catalogueItem.ingredient];

      const stock = findStockItem(
        currentStock,
        catalogueItem.ingredient
      );

      const matchingLivePrice =
        livePrice &&
        livePrice.supplier === catalogueItem.supplier
          ? livePrice
          : null;

      const hasSplitPrice =
        catalogueItem.splitPrice !== null &&
        catalogueItem.splitPrice !== undefined;

      const hasCasePrice =
        catalogueItem.casePrice !== null &&
        catalogueItem.casePrice !== undefined;

      const defaultPriceMode: OrderPriceMode =
        hasSplitPrice
          ? "split"
          : hasCasePrice
          ? "case"
          : "default";

      const orderUnit =
        matchingLivePrice?.unit ||
        catalogueItem.unit ||
        stock?.unit ||
        "each";

      const stockQty = Number(
        stock?.quantity ?? 0
      );

      const stockUnit =
        stock?.unit || orderUnit;

      const unitPrice =
        matchingLivePrice?.price ??
        catalogueItem.fallbackPrice ??
        null;

      const suggestedQty =
        stockQty > 0
          ? round(stockQty * 0.5)
          : 0;

      return {
        id:
          catalogueItem.id ||
          `catalogue-${index}-${catalogueItem.supplier}-${catalogueItem.ingredient}`,

        ingredient:
          catalogueItem.ingredient,

        supplier:
          catalogueItem.supplier,

        supplierProduct:
          matchingLivePrice?.product ||
          catalogueItem.supplierProduct,

        stockQty,
        stockUnit,

        orderQty: 0,
        orderUnit,

        unitPrice,
        suggestedQty,

        sku: catalogueItem.sku,

        packSize:
          catalogueItem.packSize,

        casePrice:
          catalogueItem.casePrice,

        splitPrice:
          catalogueItem.splitPrice,

        priceMode:
          defaultPriceMode,

        lastOrdered:
          catalogueItem.lastOrdered,

        lastOrderedQty:
          catalogueItem.lastOrderedQty,

        lastOrderVariation:
          catalogueItem.lastOrderVariation,

        brand:
          catalogueItem.brand,

        woodsId:
          catalogueItem.woodsId,
      };
    });

  const catalogueKeys =
    new Set(
      supplierCatalogue.map(
        (item) =>
          `${item.supplier}::${item.ingredient}`.toLowerCase()
      )
    );

  const invoiceOnlyLines: OrderLine[] =
    Object.entries(ingredientPrices)
      .filter(([ingredient, price]) => {
        const key =
          `${price.supplier}::${ingredient}`.toLowerCase();

        return !catalogueKeys.has(key);
      })
      .map(([ingredient, price], index) => {
        const stock = findStockItem(
          currentStock,
          ingredient
        );

        const stockQty = Number(
          stock?.quantity ?? 0
        );

        const orderUnit =
          price.unit ||
          stock?.unit ||
          "each";

        return {
          id: `invoice-${index}-${price.supplier}-${ingredient}`,

          ingredient,
          supplier:
            price.supplier,

          supplierProduct:
            price.product ||
            ingredient,

          stockQty,

          stockUnit:
            stock?.unit ||
            orderUnit,

          orderQty: 0,

          orderUnit,

          unitPrice:
            price.price,

          suggestedQty:
            stockQty > 0
              ? round(
                  stockQty * 0.5
                )
              : 0,

          priceMode:
            "default",
        };
      });

  return [
    ...catalogueLines,
    ...invoiceOnlyLines,
  ];
}

function SupplierLogo({
  supplier,
  size = "normal",
}: {
  supplier: string;
  size?: "normal" | "small";
}) {
  const logo =
    supplierDirectory[supplier]?.logo;

  return (
    <div
      className={`supplier-choice-avatar ${
        size === "small"
          ? "supplier-choice-avatar-small"
          : ""
      }`}
    >
      {logo ? (
        <img
          src={logo}
          alt=""
          className="supplier-logo"
        />
      ) : (
        <span>
          {supplierInitials(supplier)}
        </span>
      )}
    </div>
  );
}

function PriceSummary({
  line,
}: {
  line: OrderLine;
}) {
  const hasCase =
    line.casePrice !== null &&
    line.casePrice !== undefined;

  const hasSplit =
    line.splitPrice !== null &&
    line.splitPrice !== undefined;

  if (!hasCase && !hasSplit) {
    return line.unitPrice !== null ? (
      <span className="quick-order-price-note">
        {money(line.unitPrice)}/{line.orderUnit}
      </span>
    ) : (
      <span className="quick-order-price-note">
        Price unavailable
      </span>
    );
  }

  return (
    <div className="quick-order-price-summary">
      {hasSplit && (
        <span>
          Split{" "}
          <strong>
            {money(line.splitPrice!)}
          </strong>
        </span>
      )}

      {hasCase && (
        <span>
          Case{" "}
          <strong>
            {money(line.casePrice!)}
          </strong>

          {line.packSize &&
            line.packSize > 1 && (
              <>
                {" "}
                · {line.packSize} units
              </>
            )}
        </span>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [step, setStep] =
    useState<OrderStep>("start");

  const [
    selectedSupplier,
    setSelectedSupplier,
  ] = useState("");

  const [lines, setLines] =
    useState<OrderLine[]>([]);

  const [
    purchaseOrders,
    setPurchaseOrders,
  ] = useState<PurchaseOrder[]>([]);

  const [search, setSearch] =
    useState("");

  const [supplierTab, setSupplierTab] =
    useState<SupplierTab>("catalogue");

  const [orderNotes, setOrderNotes] =
    useState("");

  useEffect(() => {
    const ingredientPrices =
      JSON.parse(
        localStorage.getItem(
          "ingredientPrices"
        ) || "{}"
      ) as Record<string, IngredientPrice>;

    const stockTake =
      JSON.parse(
        localStorage.getItem(
          "currentStockTake"
        ) || '{"items":[]}'
      ) as {
        items?: StockItem[];
      };

    setLines(
      buildOrderLines(
        ingredientPrices,
        stockTake.items ?? []
      )
    );

    const storedOrders =
      JSON.parse(
        localStorage.getItem(
          "purchaseOrders"
        ) || "[]"
      ) as PurchaseOrder[];

    setPurchaseOrders(storedOrders);
  }, []);

  const supplierNames =
    useMemo(() => {
      return Array.from(
        new Set(
          lines
            .map((line) => line.supplier)
            .filter(
              (supplier) =>
                supplier &&
                supplier !== "Unassigned"
            )
        )
      ).sort();
    }, [lines]);

  const supplierLines =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return lines.filter((line) => {
        if (
          line.supplier !==
          selectedSupplier
        ) {
          return false;
        }

        if (!query) {
          return true;
        }

        return (
          line.ingredient
            .toLowerCase()
            .includes(query) ||
          line.supplierProduct
            .toLowerCase()
            .includes(query) ||
          line.sku
            ?.toLowerCase()
            .includes(query) ||
          line.brand
            ?.toLowerCase()
            .includes(query)
        );
      });
    }, [
      lines,
      selectedSupplier,
      search,
    ]);

  const selectedOrderLines =
    useMemo(() => {
      return lines.filter(
        (line) =>
          line.supplier ===
            selectedSupplier &&
          line.orderQty > 0
      );
    }, [
      lines,
      selectedSupplier,
    ]);

  const estimatedTotal =
    selectedOrderLines.reduce(
      (total, line) => {
        const effectivePrice =
          getEffectivePrice(line);

        if (effectivePrice === null) {
          return total;
        }

        return (
          total +
          line.orderQty *
            effectivePrice
        );
      },
      0
    );

  function updateOrderQty(
    id: string,
    quantity: number
  ) {
    setLines((current) =>
      current.map((line) =>
        line.id === id
          ? {
              ...line,
              orderQty: Math.max(
                round(quantity),
                0
              ),
            }
          : line
      )
    );
  }

  function changeQty(
    line: OrderLine,
    amount: number
  ) {
    updateOrderQty(
      line.id,
      line.orderQty + amount
    );
  }

  function applySuggested(
    line: OrderLine
  ) {
    updateOrderQty(
      line.id,
      line.suggestedQty
    );
  }

  function setPriceMode(
    id: string,
    mode: OrderPriceMode
  ) {
    setLines((current) =>
      current.map((line) =>
        line.id === id
          ? {
              ...line,
              priceMode: mode,
            }
          : line
      )
    );
  }

  function useAllSuggested() {
    setLines((current) =>
      current.map((line) => {
        if (
          line.supplier !==
          selectedSupplier
        ) {
          return line;
        }

        return {
          ...line,
          orderQty:
            line.suggestedQty,
        };
      })
    );
  }

  function clearSupplierOrder() {
    setLines((current) =>
      current.map((line) =>
        line.supplier ===
        selectedSupplier
          ? {
              ...line,
              orderQty: 0,
            }
          : line
      )
    );
  }

  function chooseSupplier(
    supplier: string
  ) {
    setSelectedSupplier(
      supplier
    );

    setSearch("");

    setSupplierTab("catalogue");

    setStep("order");
  }

  function applyPreviousOrder(order: PurchaseOrder) {
    setSelectedSupplier(order.supplier);
    setLines((current) =>
      current.map((line) => {
        const previous = order.lines.find(
          (orderedLine) =>
            orderedLine.id === line.id || orderedLine.ingredient === line.ingredient
        );
        return previous ? { ...line, orderQty: previous.orderQty } : line;
      })
    );
    setSupplierTab("catalogue");
    setStep("order");
  }

  function applyRegularItems() {
    const regular = getRegularOrderItems(
      purchaseOrders as Parameters<typeof getRegularOrderItems>[0],
      selectedSupplier
    );
    setLines((current) =>
      current.map((line) => {
        const suggestion = regular.find(
          (item) => item.lineId === line.id || item.ingredient === line.ingredient
        );
        return suggestion ? { ...line, orderQty: suggestion.averageQuantity } : line;
      })
    );
    setSupplierTab("catalogue");
  }

  function sendOrder() {
    if (
      selectedOrderLines.length === 0
    ) {
      alert(
        "Add at least one item to the order first."
      );

      return;
    }

    const now = new Date().toISOString();
    const settings = readOrganisationSettings();
    const supplierEmail = getSupplierEmail(selectedSupplier) ?? undefined;
    const copiedTo = settings.sendInternalCopy
      ? settings.internalOrderEmails.filter(Boolean)
      : [];

    const order: PurchaseOrder = {
      id: `PO-${Date.now()}`,

      supplier:
        selectedSupplier,

      createdAt: now,

      sentAt: now,

      sentTo: supplierEmail,

      copiedTo,

      status: "Sent",

      lines:
        selectedOrderLines,

      estimatedTotal,

      notes: settings.includeOrderNotes ? orderNotes.trim() : undefined,
    };

    const nextOrders = [
      order,
      ...purchaseOrders,
    ];

    localStorage.setItem(
      "purchaseOrders",
      JSON.stringify(nextOrders)
    );

    setPurchaseOrders(nextOrders);

    clearSupplierOrder();

    setOrderNotes("");

    setStep("start");

    if (settings.sendSupplierEmail && supplierEmail) {
      const subject = `Purchase Order ${order.id} - ${settings.name}`;
      window.location.href = `mailto:${encodeURIComponent(
        supplierEmail
      )}?cc=${encodeURIComponent(copiedTo.join(","))}&subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        orderEmailBody(
          order as Parameters<typeof orderEmailBody>[0],
          settings.name
        )
      )}`;
    } else {
      alert(`${selectedSupplier} order saved as sent.`);
    }
  }

  const recentOrders =
    [...purchaseOrders]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(0, 6);

  const supplierOrderHistory = purchaseOrders
    .filter((order) => order.supplier === selectedSupplier)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const regularOrderItems = getRegularOrderItems(
    purchaseOrders as Parameters<typeof getRegularOrderItems>[0],
    selectedSupplier
  );

  return (
    <main className="app-shell">
      <Sidebar active="orders" />

      <section className="main-content">
        {step === "start" && (
          <>
            <header className="topbar">
              <div>
                <p className="eyebrow">
                  Purchasing
                </p>

                <h1>Orders</h1>

                <p className="page-description">
                  Choose a supplier and build an
                  order in a few seconds.
                </p>
              </div>
            </header>

            <section className="panel quick-order-start">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    New order
                  </p>

                  <h2>
                    Who are you ordering from?
                  </h2>
                </div>
              </div>

              <div className="supplier-choice-grid">
                {supplierNames.map(
                  (supplier) => {
                    const count =
                      lines.filter(
                        (line) =>
                          line.supplier ===
                          supplier
                      ).length;

                    return (
                      <button
                        type="button"
                        className="supplier-choice-card"
                        key={supplier}
                        onClick={() =>
                          chooseSupplier(
                            supplier
                          )
                        }
                      >
                        <SupplierLogo
                          supplier={
                            supplier
                          }
                        />

                        <div className="supplier-choice-copy">
                          <strong>
                            {supplier}
                          </strong>

                          <span>
                            {count}{" "}
                            {count === 1
                              ? "product"
                              : "products"}
                          </span>

                          {getSupplierEmail(supplier) && (
                            <small>{getSupplierEmail(supplier)}</small>
                          )}
                        </div>

                        <span className="supplier-choice-arrow">
                          →
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    Recent orders
                  </p>

                  <h2>
                    Latest purchasing
                  </h2>
                </div>
              </div>

              <div className="quick-order-history">
                {recentOrders.length ===
                0 ? (
                  <div className="empty-table-message">
                    No orders sent yet.
                  </div>
                ) : (
                  recentOrders.map(
                    (order) => (
                      <article
                        className="quick-order-history-row"
                        key={order.id}
                      >
                        <div className="quick-order-history-supplier">
                          <SupplierLogo
                            supplier={
                              order.supplier
                            }
                            size="small"
                          />

                          <div>
                            <strong>
                              {
                                order.supplier
                              }
                            </strong>

                            <span>
                              {formatDate(
                                order.createdAt
                              )}
                            </span>
                          </div>
                        </div>

                        <span>
                          {
                            order.lines
                              .length
                          }{" "}
                          items
                        </span>

                        <strong>
                          {money(
                            order.estimatedTotal
                          )}
                        </strong>

                        <span className="status-badge status-approved">
                          Sent
                        </span>

                        <button
                          type="button"
                          className="secondary-inline-button"
                          onClick={() => applyPreviousOrder(order)}
                        >
                          Repeat
                        </button>
                      </article>
                    )
                  )
                )}
              </div>
            </section>
          </>
        )}

        {step === "order" && (
          <>
            <header className="quick-order-header">
              <div>
                <button
                  className="quick-order-back"
                  type="button"
                  onClick={() =>
                    setStep("start")
                  }
                >
                  ← Orders
                </button>

                <div className="quick-order-supplier-title">
                  <SupplierLogo
                    supplier={
                      selectedSupplier
                    }
                  />

                  <div>
                    <p className="eyebrow">
                      New order
                    </p>

                    <h1>
                      {selectedSupplier}
                    </h1>

                    <p className="page-description">
                      Enter what you want
                      to order.
                    </p>
                  </div>
                </div>
              </div>

              <div className="quick-order-header-total">
                <span>
                  Estimated order
                </span>

                <strong>
                  {money(
                    estimatedTotal
                  )}
                </strong>

                <span>
                  {
                    selectedOrderLines.length
                  }{" "}
                  items
                </span>
              </div>
            </header>

            <section className="quick-order-toolbar">
              <div className="ingredient-search">
                <input
                  type="search"
                  placeholder="Search product, SKU or brand..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />
              </div>

              <button
                className="cancel-button"
                type="button"
                onClick={
                  clearSupplierOrder
                }
              >
                Clear
              </button>

              <button
                className="secondary-inline-button"
                type="button"
                onClick={
                  useAllSuggested
                }
              >
                Use suggested
              </button>
            </section>

            <nav className="purchasing-tabs" aria-label="Supplier order views">
              {([
                ["catalogue", "Order"],
                ["regular", `Regular orders (${regularOrderItems.length})`],
                ["history", `Order history (${supplierOrderHistory.length})`],
              ] as const).map(([tab, label]) => (
                <button
                  type="button"
                  key={tab}
                  className={supplierTab === tab ? "purchasing-tab-active" : ""}
                  onClick={() => setSupplierTab(tab)}
                >
                  {label}
                </button>
              ))}
            </nav>

            {supplierTab === "catalogue" && <section className="panel quick-order-panel">
              <div className="quick-order-column-headings">
                <span>Product</span>
                <span>In stock</span>
                <span>Order</span>
              </div>

              <div className="quick-order-lines">
                {supplierLines.map(
                  (line) => {
                    const hasSplit =
                      line.splitPrice !==
                        null &&
                      line.splitPrice !==
                        undefined;

                    const hasCase =
                      line.casePrice !==
                        null &&
                      line.casePrice !==
                        undefined;

                    return (
                      <article
                        className={`quick-order-line ${
                          line.orderQty > 0
                            ? "quick-order-line-active"
                            : ""
                        }`}
                        key={line.id}
                      >
                        <div className="quick-order-product">
                          <div className="quick-order-product-title">
                            <strong>
                              {line.ingredient}
                            </strong>

                            {line.sku && (
                              <span className="quick-order-sku">
                                SKU{" "}
                                {line.sku}
                              </span>
                            )}
                          </div>

                          {line.brand && (
                            <span className="quick-order-brand">
                              {line.brand}
                            </span>
                          )}

                          {!line.sku &&
                            line.supplierProduct &&
                            line.supplierProduct !==
                              line.ingredient && (
                              <span>
                                {
                                  line.supplierProduct
                                }
                              </span>
                            )}

                          <PriceSummary
                            line={line}
                          />

                          {(hasSplit ||
                            hasCase) && (
                            <div className="quick-price-mode">
                              {hasSplit && (
                                <button
                                  type="button"
                                  className={
                                    line.priceMode ===
                                    "split"
                                      ? "quick-price-mode-active"
                                      : ""
                                  }
                                  onClick={() =>
                                    setPriceMode(
                                      line.id,
                                      "split"
                                    )
                                  }
                                >
                                  Split
                                </button>
                              )}

                              {hasCase && (
                                <button
                                  type="button"
                                  className={
                                    line.priceMode ===
                                    "case"
                                      ? "quick-price-mode-active"
                                      : ""
                                  }
                                  onClick={() =>
                                    setPriceMode(
                                      line.id,
                                      "case"
                                    )
                                  }
                                >
                                  Case
                                </button>
                              )}
                            </div>
                          )}

                          {line.lastOrdered && (
                            <span className="quick-order-last-ordered">
                              Last ordered{" "}
                              {formatShortDate(
                                line.lastOrdered
                              )}

                              {line.lastOrderedQty !==
                                null &&
                                line.lastOrderedQty !==
                                  undefined && (
                                  <>
                                    {" "}
                                    · qty{" "}
                                    {
                                      line.lastOrderedQty
                                    }
                                  </>
                                )}
                            </span>
                          )}

                          {line.suggestedQty >
                            0 && (
                            <button
                              type="button"
                              className="quick-suggestion"
                              onClick={() =>
                                applySuggested(
                                  line
                                )
                              }
                            >
                              Suggested{" "}
                              {
                                line.suggestedQty
                              }{" "}
                              {
                                line.orderUnit
                              }
                            </button>
                          )}
                        </div>

                        <div className="quick-order-stock">
                          <strong>
                            {
                              line.stockQty
                            }
                          </strong>

                          <span>
                            {
                              line.stockUnit
                            }
                          </span>
                        </div>

                        <div className="quick-order-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              changeQty(
                                line,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <input
                            inputMode="decimal"
                            value={
                              line.orderQty
                            }
                            onChange={(event) =>
                              updateOrderQty(
                                line.id,
                                Number(
                                  event.target
                                    .value ||
                                    0
                                )
                              )
                            }
                          />

                          <button
                            type="button"
                            onClick={() =>
                              changeQty(
                                line,
                                1
                              )
                            }
                          >
                            +
                          </button>

                          <span>
                            {getEffectiveUnit(
                              line
                            )}
                          </span>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </section>}

            {supplierTab === "regular" && (
              <section className="panel purchasing-list-panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-kicker">Learned from order history</p>
                    <h2>Regularly ordered</h2>
                  </div>
                  {regularOrderItems.length > 0 && (
                    <button className="secondary-inline-button" type="button" onClick={applyRegularItems}>
                      Add all regular items
                    </button>
                  )}
                </div>
                {regularOrderItems.length === 0 ? (
                  <div className="empty-table-message">Regular items appear after orders have been sent.</div>
                ) : regularOrderItems.map((item) => (
                  <article className="regular-order-row" key={item.lineId}>
                    <div><strong>{item.ingredient}</strong><span>{item.supplierProduct}</span></div>
                    <span>Last ordered {formatShortDate(item.lastOrderedAt)}</span>
                    <span>{item.averageIntervalDays ? `Every ${item.averageIntervalDays} days` : "Ordered once"}</span>
                    <strong>{item.averageQuantity} {item.orderUnit}</strong>
                  </article>
                ))}
              </section>
            )}

            {supplierTab === "history" && (
              <section className="panel purchasing-list-panel">
                <div className="panel-header"><div><p className="panel-kicker">Audit trail</p><h2>Order history</h2></div></div>
                {supplierOrderHistory.length === 0 ? (
                  <div className="empty-table-message">No orders have been sent to this supplier yet.</div>
                ) : supplierOrderHistory.map((order) => (
                  <article className="order-history-card" key={order.id}>
                    <div><strong>{order.id}</strong><span>{formatDate(order.sentAt ?? order.createdAt)}</span></div>
                    <span>{order.lines.length} items</span>
                    <strong>{money(order.estimatedTotal)}</strong>
                    <span className="status-badge status-approved">{order.status}</span>
                    <button className="secondary-inline-button" type="button" onClick={() => applyPreviousOrder(order)}>Repeat order</button>
                  </article>
                ))}
              </section>
            )}

            <div className="quick-order-footer">
              <div>
                <span>
                  {
                    selectedOrderLines.length
                  }{" "}
                  items
                </span>

                <strong>
                  {money(
                    estimatedTotal
                  )}
                </strong>
              </div>

              <button
                type="button"
                className="primary-button quick-review-button"
                disabled={
                  selectedOrderLines.length ===
                  0
                }
                onClick={() =>
                  setStep("review")
                }
              >
                Review order →
              </button>
            </div>
          </>
        )}

        {step === "review" && (
          <>
            <header className="quick-order-header">
              <div>
                <button
                  className="quick-order-back"
                  type="button"
                  onClick={() =>
                    setStep("order")
                  }
                >
                  ← Edit order
                </button>

                <div className="quick-order-supplier-title">
                  <SupplierLogo
                    supplier={
                      selectedSupplier
                    }
                  />

                  <div>
                    <p className="eyebrow">
                      Review
                    </p>

                    <h1>
                      {selectedSupplier}
                    </h1>

                    <p className="page-description">
                      Review the order details before sending to the supplier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="quick-order-header-total">
                <span>
                  Estimated total
                </span>

                <strong>
                  {money(
                    estimatedTotal
                  )}
                </strong>

                <span>
                  {
                    selectedOrderLines.length
                  }{" "}
                  items
                </span>
              </div>
            </header>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">
                    Purchase order
                  </p>

                  <h2>
                    Order summary
                  </h2>
                </div>
              </div>

              <div className="quick-review-list">
                {selectedOrderLines.map(
                  (line) => {
                    const price =
                      getEffectivePrice(
                        line
                      );

                    const unit =
                      getEffectiveUnit(
                        line
                      );

                    return (
                      <article
                        className="quick-review-row"
                        key={line.id}
                      >
                        <div>
                          <strong>
                            {line.ingredient}
                          </strong>

                          {!line.sku &&
                            line.supplierProduct &&
                            line.supplierProduct !==
                              line.ingredient && (
                              <span>
                                {
                                  line.supplierProduct
                                }
                              </span>
                            )}

                          {line.brand && (
                            <span>
                              {line.brand}
                            </span>
                          )}

                          {line.sku && (
                            <span>
                              SKU{" "}
                              {line.sku}
                            </span>
                          )}
                        </div>

                        <div className="quick-review-qty">
                          <strong>
                            {
                              line.orderQty
                            }{" "}
                            {unit}
                          </strong>
                        </div>

                        <div className="quick-review-cost">
                          {price !==
                          null ? (
                            <>
                              <span>
                                {money(
                                  price
                                )}
                                /{unit}
                              </span>

                              <strong>
                                {money(
                                  line.orderQty *
                                    price
                                )}
                              </strong>
                            </>
                          ) : (
                            <span>
                              Price
                              unavailable
                            </span>
                          )}
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              <label className="order-notes-field">
                <span>Delivery or order notes</span>
                <textarea
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  placeholder="Add delivery instructions or a note for the supplier..."
                />
              </label>
            </section>

            <div className="quick-order-footer">
              <div>
                <span>
                  Estimated total
                </span>

                <strong>
                  {money(
                    estimatedTotal
                  )}
                </strong>
              </div>

              <button
                type="button"
                className="primary-button quick-review-button"
                onClick={sendOrder}
              >
                Send order
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
