"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

type InvoiceLineItem = {
  product: string;
  quantity: number | null;
  pack: string;
  unitPrice: number | null;
  total: number | null;
  status?: string;
  ingredientMatch?: string;
};

type InvoiceData = {
  supplier: string;
  invoiceNumber: string;
  invoiceDate: string;
  subtotal: number | null;
  vat: number | null;
  total: number | null;
  lineItems: InvoiceLineItem[];
};

type IngredientPrice = {
  price: number;
  unit: string;
  supplier: string;
  product: string;
  updatedAt: string;
  invoiceNumber?: string;
  invoiceDate?: string;
};

type PriceHistoryEntry = {
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  price: number;
  unit: string;
  invoiceNumber: string;
  invoiceDate: string;
  recordedAt: string;
};

type ApprovedInvoice = InvoiceData & {
  id: string;
  status: "Approved";
  approvedAt: string;
};

const masterIngredients = [
  // FISH
  "Cod",
  "Black cod",
  "26/30 prawn",
  "King prawn",
  "Tuna loin",
  "Stonebass",
  "Trout",
  "Salmon",
  "Hake",
  "Sea bass",
  "Squid",
  "Octopus",
  "Scallop",
  "Crab meat",
  "Mussels",

  // MEAT
  "Ribeye",
  "Short rib",
  "Pork belly",
  "Chicken thigh",
  "Whole chicken",
  "Birria beef",
  "Carnitas pork",
  "Brisket",
  "Ox cheek",
  "Lamb cutlet",
  "Lamb rack",
  "Tomahawk",
  "Chorizo",

  // TORTILLAS / MEXICAN
  "Masafina tortilla 12cm",
  "Masafina tortilla 10cm",
  "Masafina blue corn tortilla 12cm",
  "Aji Amarillo",
  "Achiote paste",
  "Chipotle in adobo",
  "Black beans",
  "Ancho chilli",
  "Morita chilli",
  "Habanero chilli",
  "Arbol chilli",
  "Mexican oregano",
  "Agave syrup",

  // PRODUCE
  "Avocado",
  "Lime",
  "Lemon",
  "Orange",
  "Pineapple",
  "Plantain",
  "Aubergine",
  "Spring onion",
  "Red onion",
  "White onion",
  "Spanish onion",
  "Garlic",
  "Peeled garlic",
  "Ginger",
  "Coriander",
  "Chives",
  "Fennel",
  "Hispi cabbage",
  "Red cabbage",
  "Carrot",
  "Cauliflower",
  "Celery",
  "Courgette",
  "Sweet potato",
  "Green tomato",
  "Plum tomato",
  "Cherry tomato",
  "Jalapeño",
  "Padron pepper",
  "Maitake mushroom",
  "King oyster mushroom",

  // DRY GOODS
  "Rice flour",
  "Potato flour",
  "Cornflour",
  "Plain flour",
  "Self raising flour",
  "Panko",
  "Caster sugar",
  "Brown sugar",
  "Glucose syrup",
  "Milk powder",
  "Salt",
  "Sea salt",
  "Black pepper",
  "Cumin",
  "Coriander seed",
  "Fennel seed",
  "Fenugreek",
  "Cinnamon",
  "Cardamom",
  "Star anise",

  // SAUCES / OILS
  "Miso",
  "Mirin",
  "Rice vinegar",
  "Fish sauce",
  "Rapeseed oil",
  "Grapeseed oil",
  "Olive oil",
  "Red wine vinegar",
  "Dijon mustard",
  "Wholegrain mustard",
  "Vegan mayo",
  "Coconut milk",

  // DAIRY
  "Butter",
  "Clarified butter",
  "Double cream",
  "Soured cream",
  "Creme fraiche",
  "Greek yoghurt",
  "Eggs",
];

function money(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function numberValue(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const cleaned = String(value)
    .replace(/£/g, "")
    .replace(/,/g, "")
    .trim();

  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : null;
}

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function guessIngredient(product: string) {
  const text = normalise(product);

  const rules: Array<[string[], string]> = [
    [["black cod"], "Black cod"],
    [["cod fillet"], "Cod"],
    [["cod whole"], "Cod"],
    [["chalk stream trout"], "Trout"],
    [["trout"], "Trout"],
    [["stone bass"], "Stonebass"],
    [["stonebass"], "Stonebass"],
    [["sea bass"], "Sea bass"],
    [["seabass"], "Sea bass"],
    [["tuna loin"], "Tuna loin"],
    [["yellowfin tuna"], "Tuna loin"],

    [["26 30", "prawn"], "26/30 prawn"],
    [["king prawn"], "King prawn"],
    [["tiger prawn"], "King prawn"],

    [["ribeye"], "Ribeye"],
    [["beef ribs"], "Short rib"],
    [["short rib"], "Short rib"],
    [["pork belly"], "Pork belly"],
    [["chicken thigh"], "Chicken thigh"],
    [["whole chicken"], "Whole chicken"],
    [["brisket"], "Brisket"],
    [["ox cheek"], "Ox cheek"],
    [["tomahawk"], "Tomahawk"],
    [["lamb rack"], "Lamb rack"],
    [["chorizo"], "Chorizo"],

    [["aji amarillo"], "Aji Amarillo"],
    [["achiote"], "Achiote paste"],
    [["chipotle", "adobo"], "Chipotle in adobo"],
    [["black beans"], "Black beans"],
    [["ancho"], "Ancho chilli"],
    [["morita"], "Morita chilli"],
    [["habanero"], "Habanero chilli"],
    [["arbol"], "Arbol chilli"],
    [["oregano"], "Mexican oregano"],
    [["agave"], "Agave syrup"],

    [["avocado"], "Avocado"],
    [["lime"], "Lime"],
    [["lemon"], "Lemon"],
    [["pineapple"], "Pineapple"],
    [["aubergine"], "Aubergine"],
    [["spring onion"], "Spring onion"],
    [["red onion"], "Red onion"],
    [["white onion"], "White onion"],
    [["spanish onion"], "Spanish onion"],
    [["garlic peeled"], "Peeled garlic"],
    [["garlic"], "Garlic"],
    [["ginger"], "Ginger"],
    [["chives"], "Chives"],
    [["fennel"], "Fennel"],
    [["hispi"], "Hispi cabbage"],
    [["red cabbage"], "Red cabbage"],
    [["carrot"], "Carrot"],
    [["cauliflower"], "Cauliflower"],
    [["celery"], "Celery"],
    [["courgette"], "Courgette"],
    [["sweet potato"], "Sweet potato"],
    [["green tomato"], "Green tomato"],
    [["plum tomato"], "Plum tomato"],
    [["cherry tomato"], "Cherry tomato"],
    [["jalapeno"], "Jalapeño"],
    [["padron"], "Padron pepper"],
    [["maitake"], "Maitake mushroom"],
    [["king oyster"], "King oyster mushroom"],

    [["miso"], "Miso"],
    [["mirin"], "Mirin"],
    [["rice vinegar"], "Rice vinegar"],
    [["fish sauce"], "Fish sauce"],
    [["rapeseed"], "Rapeseed oil"],
    [["grapeseed"], "Grapeseed oil"],
    [["olive oil"], "Olive oil"],

    [["double cream"], "Double cream"],
    [["soured cream"], "Soured cream"],
    [["creme fraiche"], "Creme fraiche"],
    [["yoghurt"], "Greek yoghurt"],
    [["egg"], "Eggs"],
    [["milk powder"], "Milk powder"],
  ];

  for (const [terms, ingredient] of rules) {
    if (terms.every((term) => text.includes(term))) {
      return ingredient;
    }
  }

  return "";
}

function detectPriceUnit(item: InvoiceLineItem) {
  const combined = `${item.product} ${item.pack}`.toLowerCase();

  if (
    combined.includes("per kg") ||
    combined.includes("/kg") ||
    combined.includes(" kilo") ||
    combined.includes("kg")
  ) {
    return "kg";
  }

  if (
    combined.includes("litre") ||
    combined.includes("liter") ||
    combined.includes(" ltr") ||
    combined.includes(" per l") ||
    combined.includes("/l")
  ) {
    return "L";
  }

  if (
    combined.includes("each") ||
    combined.includes(" ea") ||
    combined.includes("unit")
  ) {
    return "each";
  }

  if (combined.includes("case")) {
    return "case";
  }

  if (combined.includes("pack")) {
    return "pack";
  }

  if (combined.includes("bag")) {
    return "bag";
  }

  if (combined.includes("box")) {
    return "box";
  }

  return "each";
}

function loadInvoiceFromSession(): InvoiceData | null {
  const possibleKeys = [
    "invoiceExtraction",
    "extractedInvoice",
    "invoiceData",
    "invoiceDraft",
    "invoiceReview",
  ];

  for (const key of possibleKeys) {
    const value = sessionStorage.getItem(key);

    if (!value) continue;

    try {
      const parsed = JSON.parse(value);

      const candidate =
        parsed?.invoice ??
        parsed?.extraction ??
        parsed?.data ??
        parsed;

      if (
        candidate &&
        Array.isArray(candidate.lineItems)
      ) {
        return {
          supplier: candidate.supplier ?? "",
          invoiceNumber: candidate.invoiceNumber ?? "",
          invoiceDate: candidate.invoiceDate ?? "",
          subtotal: numberValue(candidate.subtotal),
          vat: numberValue(candidate.vat),
          total: numberValue(candidate.total),
          lineItems: candidate.lineItems.map(
            (item: any) => ({
              product: item.product ?? "",
              quantity: numberValue(item.quantity),
              pack: item.pack ?? "",
              unitPrice: numberValue(item.unitPrice),
              total: numberValue(item.total),
              status: item.status ?? "Review",
              ingredientMatch:
                item.ingredientMatch ??
                guessIngredient(item.product ?? ""),
            })
          ),
        };
      }
    } catch {
      // Try next possible session key
    }
  }

  return null;
}

export default function InvoiceReviewPage() {
  const router = useRouter();

  const [invoice, setInvoice] =
    useState<InvoiceData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [approved, setApproved] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const storedInvoice =
      loadInvoiceFromSession();

    if (!storedInvoice) {
      setError(
        "No extracted invoice was found. Upload an invoice first."
      );
      setLoading(false);
      return;
    }

    setInvoice(storedInvoice);
    setLoading(false);
  }, []);

  const matchedCount = useMemo(() => {
    return (
      invoice?.lineItems.filter(
        (item) =>
          item.ingredientMatch &&
          item.ingredientMatch.trim() !== ""
      ).length ?? 0
    );
  }, [invoice]);

  const unmatchedCount =
    (invoice?.lineItems.length ?? 0) -
    matchedCount;

  function updateInvoiceField(
    field:
      | "supplier"
      | "invoiceNumber"
      | "invoiceDate",
    value: string
  ) {
    setInvoice((current) => {
      if (!current) return current;

      return {
        ...current,
        [field]: value,
      };
    });
  }

  function updateMoneyField(
    field: "subtotal" | "vat" | "total",
    value: string
  ) {
    setInvoice((current) => {
      if (!current) return current;

      return {
        ...current,
        [field]: numberValue(value),
      };
    });
  }

  function updateLine(
    index: number,
    field: keyof InvoiceLineItem,
    value: string | number | null
  ) {
    setInvoice((current) => {
      if (!current) return current;

      const nextItems =
        current.lineItems.map(
          (item, itemIndex) => {
            if (itemIndex !== index) {
              return item;
            }

            if (
              field === "quantity" ||
              field === "unitPrice" ||
              field === "total"
            ) {
              return {
                ...item,
                [field]: numberValue(value),
              };
            }

            return {
              ...item,
              [field]: value,
            };
          }
        );

      return {
        ...current,
        lineItems: nextItems,
      };
    });
  }

  function removeLine(index: number) {
    setInvoice((current) => {
      if (!current) return current;

      return {
        ...current,
        lineItems:
          current.lineItems.filter(
            (_, itemIndex) =>
              itemIndex !== index
          ),
      };
    });
  }

  function addLine() {
    setInvoice((current) => {
      if (!current) return current;

      return {
        ...current,
        lineItems: [
          ...current.lineItems,
          {
            product: "",
            quantity: 1,
            pack: "",
            unitPrice: null,
            total: null,
            status: "Review",
            ingredientMatch: "",
          },
        ],
      };
    });
  }

  function approveInvoice() {
    if (!invoice) return;

    if (!invoice.supplier.trim()) {
      alert(
        "Please enter the supplier before approving."
      );
      return;
    }

    if (invoice.lineItems.length === 0) {
      alert(
        "This invoice has no line items."
      );
      return;
    }

    const unmatched =
      invoice.lineItems.filter(
        (item) =>
          !item.ingredientMatch ||
          !item.ingredientMatch.trim()
      );

    if (unmatched.length > 0) {
      const continueApproval =
        window.confirm(
          `${unmatched.length} line item${
            unmatched.length === 1
              ? ""
              : "s"
          } are not matched to an ingredient.\n\nApprove the invoice anyway?`
        );

      if (!continueApproval) {
        return;
      }
    }

    const now =
      new Date().toISOString();

    /*
     * ------------------------------------------------
     * 1. LOAD CURRENT LIVE INGREDIENT PRICES
     * ------------------------------------------------
     */

    const ingredientPrices =
      JSON.parse(
        localStorage.getItem(
          "ingredientPrices"
        ) || "{}"
      ) as Record<
        string,
        IngredientPrice
      >;

    /*
     * ------------------------------------------------
     * 2. LOAD HISTORICAL PRICE DATA
     * ------------------------------------------------
     */

    const priceHistory =
      JSON.parse(
        localStorage.getItem(
          "ingredientPriceHistory"
        ) || "[]"
      ) as PriceHistoryEntry[];

    /*
     * ------------------------------------------------
     * 3. UPDATE PRICES FROM MATCHED INVOICE LINES
     * ------------------------------------------------
     */

    invoice.lineItems.forEach(
      (item) => {
        const ingredient =
          item.ingredientMatch?.trim();

        if (!ingredient) {
          return;
        }

        const unitPrice =
          numberValue(item.unitPrice);

        if (
          unitPrice === null ||
          unitPrice <= 0
        ) {
          return;
        }

        const priceUnit =
          detectPriceUnit(item);

        /*
         * Current/latest price
         */

        ingredientPrices[ingredient] = {
          price: unitPrice,
          unit: priceUnit,
          supplier:
            invoice.supplier,
          product:
            item.product,
          updatedAt: now,
          invoiceNumber:
            invoice.invoiceNumber,
          invoiceDate:
            invoice.invoiceDate,
        };

        /*
         * Historical price entry
         */

        const historyEntry: PriceHistoryEntry =
          {
            ingredient,
            supplier:
              invoice.supplier,
            supplierProduct:
              item.product,
            price: unitPrice,
            unit: priceUnit,
            invoiceNumber:
              invoice.invoiceNumber,
            invoiceDate:
              invoice.invoiceDate,
            recordedAt: now,
          };

        /*
         * Avoid accidentally adding the exact
         * same invoice line twice if Approve
         * gets clicked again.
         */

        const alreadyExists =
          priceHistory.some(
            (entry) =>
              entry.ingredient ===
                historyEntry.ingredient &&
              entry.supplier ===
                historyEntry.supplier &&
              entry.invoiceNumber ===
                historyEntry.invoiceNumber &&
              entry.price ===
                historyEntry.price
          );

        if (!alreadyExists) {
          priceHistory.push(
            historyEntry
          );
        }
      }
    );

    localStorage.setItem(
      "ingredientPrices",
      JSON.stringify(
        ingredientPrices
      )
    );

    localStorage.setItem(
      "ingredientPriceHistory",
      JSON.stringify(
        priceHistory
      )
    );

    /*
     * ------------------------------------------------
     * 4. SAVE THE APPROVED INVOICE
     * ------------------------------------------------
     */

    const existingInvoices =
      JSON.parse(
        localStorage.getItem(
          "approvedInvoices"
        ) || "[]"
      ) as ApprovedInvoice[];

    const invoiceId =
      `${invoice.supplier}-${invoice.invoiceNumber}-${invoice.invoiceDate}`
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-|-$/g,
          ""
        );

    const approvedInvoice: ApprovedInvoice =
      {
        ...invoice,
        id:
          invoiceId ||
          `invoice-${Date.now()}`,
        status: "Approved",
        approvedAt: now,
      };

    /*
     * Replace same invoice if it has already
     * been approved rather than duplicating it.
     */

    const withoutExisting =
      existingInvoices.filter(
        (savedInvoice) =>
          savedInvoice.id !==
          approvedInvoice.id
      );

    const nextInvoices = [
      approvedInvoice,
      ...withoutExisting,
    ];

    localStorage.setItem(
      "approvedInvoices",
      JSON.stringify(
        nextInvoices
      )
    );

    /*
     * Keep this key because other existing
     * parts of the project may already use it.
     */

    localStorage.setItem(
      "approvedInvoiceDraft",
      JSON.stringify(
        approvedInvoice
      )
    );

    /*
     * ------------------------------------------------
     * 5. SAVE SUPPLIER PRODUCT KNOWLEDGE
     * ------------------------------------------------
     */

    const supplierProducts =
      JSON.parse(
        localStorage.getItem(
          "supplierProducts"
        ) || "{}"
      ) as Record<
        string,
        {
          ingredient: string;
          supplier: string;
          product: string;
          unit: string;
          latestPrice: number | null;
          updatedAt: string;
        }
      >;

    invoice.lineItems.forEach(
      (item) => {
        const ingredient =
          item.ingredientMatch?.trim();

        if (!ingredient) return;

        const key =
          `${invoice.supplier}|${item.product}`
            .toLowerCase();

        supplierProducts[key] = {
          ingredient,
          supplier:
            invoice.supplier,
          product: item.product,
          unit:
            detectPriceUnit(item),
          latestPrice:
            numberValue(
              item.unitPrice
            ),
          updatedAt: now,
        };
      }
    );

    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(
        supplierProducts
      )
    );

    /*
     * ------------------------------------------------
     * 6. FINISH
     * ------------------------------------------------
     */

    setApproved(true);

    alert(
      `Invoice ${invoice.invoiceNumber || ""} approved.\n\nIngredient prices and price history have been updated.`
    );
  }

  if (loading) {
    return (
      <main className="app-shell">
        <Sidebar active="invoices" />

        <section className="main-content">
          <div className="empty-table-message">
            Loading invoice...
          </div>
        </section>
      </main>
    );
  }

  if (!invoice || error) {
    return (
      <main className="app-shell">
        <Sidebar active="invoices" />

        <section className="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">
                Invoice review
              </p>

              <h1>
                No invoice found
              </h1>

              <p className="page-description">
                {error}
              </p>
            </div>
          </header>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              router.push(
                "/invoices/upload"
              )
            }
          >
            Upload invoice
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Sidebar active="invoices" />

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Invoice review
            </p>

            <h1>
              Review invoice
            </h1>

            <p className="page-description">
              Check the extracted data,
              match supplier products to
              ingredients and approve the
              invoice.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                router.push(
                  "/invoices/upload"
                )
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={
                approveInvoice
              }
              disabled={approved}
            >
              {approved
                ? "Approved ✓"
                : "Approve invoice"}
            </button>
          </div>
        </header>

        <section
          className="stats-grid"
          style={{
            marginBottom: "24px",
          }}
        >
          <article className="stat-card">
            <span>
              Supplier
            </span>

            <strong>
              {invoice.supplier ||
                "Unknown"}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              Invoice total
            </span>

            <strong>
              {money(invoice.total)}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              Matched
            </span>

            <strong>
              {matchedCount}
            </strong>
          </article>

          <article className="stat-card">
            <span>
              Needs matching
            </span>

            <strong>
              {unmatchedCount}
            </strong>
          </article>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Invoice details
              </p>

              <h2>
                Header
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            <label>
              <span>
                Supplier
              </span>

              <input
                value={
                  invoice.supplier
                }
                onChange={(event) =>
                  updateInvoiceField(
                    "supplier",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Invoice number
              </span>

              <input
                value={
                  invoice.invoiceNumber
                }
                onChange={(event) =>
                  updateInvoiceField(
                    "invoiceNumber",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Invoice date
              </span>

              <input
                value={
                  invoice.invoiceDate
                }
                onChange={(event) =>
                  updateInvoiceField(
                    "invoiceDate",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Subtotal
              </span>

              <input
                type="number"
                step="0.01"
                value={
                  invoice.subtotal ?? ""
                }
                onChange={(event) =>
                  updateMoneyField(
                    "subtotal",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                VAT
              </span>

              <input
                type="number"
                step="0.01"
                value={
                  invoice.vat ?? ""
                }
                onChange={(event) =>
                  updateMoneyField(
                    "vat",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Total
              </span>

              <input
                type="number"
                step="0.01"
                value={
                  invoice.total ?? ""
                }
                onChange={(event) =>
                  updateMoneyField(
                    "total",
                    event.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section
          className="panel"
          style={{
            marginTop: "24px",
          }}
        >
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Extracted products
              </p>

              <h2>
                Line items
              </h2>
            </div>

            <button
              type="button"
              className="secondary-inline-button"
              onClick={addLine}
            >
              + Add line
            </button>
          </div>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table className="ingredients-table">
              <thead>
                <tr>
                  <th>
                    Supplier product
                  </th>

                  <th>
                    Qty
                  </th>

                  <th>
                    Pack
                  </th>

                  <th>
                    Unit price
                  </th>

                  <th>
                    Line total
                  </th>

                  <th>
                    Match ingredient
                  </th>

                  <th></th>
                </tr>
              </thead>

              <tbody>
                {invoice.lineItems.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          value={
                            item.product
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "product",
                              event
                                .target
                                .value
                            )
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={
                            item.quantity ??
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "quantity",
                              event
                                .target
                                .value
                            )
                          }
                          style={{
                            width:
                              "85px",
                          }}
                        />
                      </td>

                      <td>
                        <input
                          value={
                            item.pack
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "pack",
                              event
                                .target
                                .value
                            )
                          }
                          style={{
                            width:
                              "120px",
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={
                            item.unitPrice ??
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "unitPrice",
                              event
                                .target
                                .value
                            )
                          }
                          style={{
                            width:
                              "100px",
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={
                            item.total ??
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "total",
                              event
                                .target
                                .value
                            )
                          }
                          style={{
                            width:
                              "100px",
                          }}
                        />
                      </td>

                      <td>
                        <select
                          value={
                            item.ingredientMatch ??
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateLine(
                              index,
                              "ingredientMatch",
                              event
                                .target
                                .value
                            )
                          }
                        >
                          <option value="">
                            Select ingredient
                          </option>

                          {masterIngredients.map(
                            (
                              ingredient
                            ) => (
                              <option
                                key={
                                  ingredient
                                }
                                value={
                                  ingredient
                                }
                              >
                                {
                                  ingredient
                                }
                              </option>
                            )
                          )}
                        </select>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() =>
                            removeLine(
                              index
                            )
                          }
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section
          className="panel"
          style={{
            marginTop: "24px",
            marginBottom: "100px",
          }}
        >
          <div className="panel-header">
            <div>
              <p className="panel-kicker">
                Integration
              </p>

              <h2>
                What happens when you approve?
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            <div>
              ✓ Invoice saved to invoice
              history
            </div>

            <div>
              ✓ Latest ingredient prices
              updated
            </div>

            <div>
              ✓ Previous prices retained in
              price history
            </div>

            <div>
              ✓ Supplier product mappings
              remembered
            </div>

            <div>
              ✓ New prices available to
              recipes, menu costing and
              ordering
            </div>
          </div>
        </section>

        <div className="quick-order-footer">
          <div>
            <span>
              {invoice.lineItems.length}{" "}
              invoice lines
            </span>

            <strong>
              {money(invoice.total)}
            </strong>
          </div>

          <button
            type="button"
            className="primary-button quick-review-button"
            onClick={
              approveInvoice
            }
            disabled={approved}
          >
            {approved
              ? "Invoice approved ✓"
              : `Approve invoice${
                  unmatchedCount
                    ? ` · ${unmatchedCount} unmatched`
                    : ""
                }`}
          </button>
        </div>
      </section>
    </main>
  );
}
