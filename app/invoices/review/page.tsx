"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../lib/supabase";
import { persistWorkspaceState } from "../../lib/workspaceState";

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

type OrganisationContext = {
  organisationId: string;
  siteId: string;
};

function money(value: number | null | undefined) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function numberValue(value: unknown): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : null;
  }

  const cleaned = String(value)
    .replace(/£/g, "")
    .replace(/,/g, "")
    .trim();

  const parsed = Number(cleaned);

  return Number.isFinite(parsed)
    ? parsed
    : null;
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
    if (
      terms.every((term) =>
        text.includes(term)
      )
    ) {
      return ingredient;
    }
  }

  return "";
}

function detectPriceUnit(
  item: InvoiceLineItem
) {
  const combined =
    `${item.product} ${item.pack}`.toLowerCase();

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
    combined.includes("/l")
  ) {
    return "L";
  }

  if (
    combined.includes("case")
  ) {
    return "case";
  }

  if (
    combined.includes("pack")
  ) {
    return "pack";
  }

  if (
    combined.includes("bag")
  ) {
    return "bag";
  }

  if (
    combined.includes("box")
  ) {
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
    const value =
      sessionStorage.getItem(key);

    if (!value) continue;

    try {
      const parsed =
        JSON.parse(value);

      const candidate =
        parsed?.invoice ??
        parsed?.extraction ??
        parsed?.data ??
        parsed;

      if (
        candidate &&
        Array.isArray(
          candidate.lineItems
        )
      ) {
        return {
          supplier:
            candidate.supplier ??
            "",

          invoiceNumber:
            candidate.invoiceNumber ??
            "",

          invoiceDate:
            candidate.invoiceDate ??
            "",

          subtotal:
            numberValue(
              candidate.subtotal
            ),

          vat:
            numberValue(
              candidate.vat
            ),

          total:
            numberValue(
              candidate.total
            ),

          lineItems:
            candidate.lineItems.map(
              (item: any) => ({
                product:
                  item.product ?? "",

                quantity:
                  numberValue(
                    item.quantity
                  ),

                pack:
                  item.pack ?? "",

                unitPrice:
                  numberValue(
                    item.unitPrice
                  ),

                total:
                  numberValue(
                    item.total
                  ),

                status:
                  item.status ??
                  "Review",

                ingredientMatch:
                  item.ingredientMatch ??
                  guessIngredient(
                    item.product ?? ""
                  ),
              })
            ),
        };
      }
    } catch {
      // Try another key
    }
  }

  return null;
}

const masterIngredients = [
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

  "Butter",
  "Clarified butter",
  "Double cream",
  "Soured cream",
  "Creme fraiche",
  "Greek yoghurt",
  "Eggs",
];

export default function InvoiceReviewPage() {
  const router = useRouter();

  const [invoice, setInvoice] =
    useState<InvoiceData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

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

  const matchedCount = useMemo(
    () =>
      invoice?.lineItems.filter(
        (item) =>
          item.ingredientMatch &&
          item.ingredientMatch.trim() !==
            ""
      ).length ?? 0,
    [invoice]
  );

  const unmatchedCount =
    (invoice?.lineItems.length ??
      0) - matchedCount;

  function updateInvoiceField(
    field:
      | "supplier"
      | "invoiceNumber"
      | "invoiceDate",
    value: string
  ) {
    setInvoice((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  function updateMoneyField(
    field:
      | "subtotal"
      | "vat"
      | "total",
    value: string
  ) {
    setInvoice((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [field]:
          numberValue(value),
      };
    });
  }

  function updateLine(
    index: number,
    field:
      keyof InvoiceLineItem,
    value:
      | string
      | number
      | null
  ) {
    setInvoice((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        lineItems:
          current.lineItems.map(
            (item, itemIndex) => {
              if (
                itemIndex !== index
              ) {
                return item;
              }

              if (
                field ===
                  "quantity" ||
                field ===
                  "unitPrice" ||
                field === "total"
              ) {
                return {
                  ...item,
                  [field]:
                    numberValue(
                      value
                    ),
                };
              }

              return {
                ...item,
                [field]: value,
              };
            }
          ),
      };
    });
  }

  function removeLine(
    index: number
  ) {
    setInvoice((current) => {
      if (!current) {
        return current;
      }

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
      if (!current) {
        return current;
      }

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

  async function getOrganisationContext(
    userId: string
  ): Promise<OrganisationContext> {
    const {
      data: membership,
      error: membershipError,
    } = await supabase
      .from(
        "organisation_members"
      )
      .select(
        "organisation_id"
      )
      .eq("user_id", userId)
      .limit(1)
      .single();

    if (
      membershipError ||
      !membership
    ) {
      throw new Error(
        "Your user is not linked to an organisation."
      );
    }

    const {
      data: site,
      error: siteError,
    } = await supabase
      .from("sites")
      .select("id")
      .eq(
        "organisation_id",
        membership.organisation_id
      )
      .limit(1)
      .single();

    if (
      siteError ||
      !site
    ) {
      throw new Error(
        "No site was found for your organisation."
      );
    }

    return {
      organisationId:
        membership.organisation_id,
      siteId: site.id,
    };
  }

  async function getOrCreateSupplier(
    organisationId: string,
    supplierName: string
  ) {
    const {
      data: existing,
      error: lookupError,
    } = await supabase
      .from("suppliers")
      .select("id")
      .eq(
        "organisation_id",
        organisationId
      )
      .eq("name", supplierName)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existing) {
      return existing.id;
    }

    const {
      data: created,
      error: createError,
    } = await supabase
      .from("suppliers")
      .insert({
        organisation_id:
          organisationId,
        name: supplierName,
      })
      .select("id")
      .single();

    if (
      createError ||
      !created
    ) {
      throw (
        createError ??
        new Error(
          "Could not create supplier."
        )
      );
    }

    return created.id;
  }

  async function getOrCreateIngredient(
    organisationId: string,
    ingredientName: string,
    unit: string
  ) {
    const {
      data: existing,
      error: lookupError,
    } = await supabase
      .from("ingredients")
      .select("id")
      .eq(
        "organisation_id",
        organisationId
      )
      .eq("name", ingredientName)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existing) {
      return existing.id;
    }

    const {
      data: created,
      error: createError,
    } = await supabase
      .from("ingredients")
      .insert({
        organisation_id:
          organisationId,
        name: ingredientName,
        base_unit: unit,
      })
      .select("id")
      .single();

    if (
      createError ||
      !created
    ) {
      throw (
        createError ??
        new Error(
          "Could not create ingredient."
        )
      );
    }

    return created.id;
  }

  async function getOrCreateSupplierProduct(
    organisationId: string,
    supplierId: string,
    ingredientId: string,
    item: InvoiceLineItem
  ) {
    const {
      data: existing,
      error: lookupError,
    } = await supabase
      .from(
        "supplier_products"
      )
      .select("id")
      .eq(
        "organisation_id",
        organisationId
      )
      .eq(
        "supplier_id",
        supplierId
      )
      .eq(
        "supplier_product_name",
        item.product
      )
      .limit(1)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existing) {
      await supabase
        .from(
          "supplier_products"
        )
        .update({
          ingredient_id:
            ingredientId,
          price_unit:
            detectPriceUnit(
              item
            ),
          latest_price:
            item.unitPrice,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          existing.id
        );

      return existing.id;
    }

    const {
      data: created,
      error: createError,
    } = await supabase
      .from(
        "supplier_products"
      )
      .insert({
        organisation_id:
          organisationId,
        supplier_id:
          supplierId,
        ingredient_id:
          ingredientId,
        supplier_product_name:
          item.product,
        price_unit:
          detectPriceUnit(
            item
          ),
        latest_price:
          item.unitPrice,
      })
      .select("id")
      .single();

    if (
      createError ||
      !created
    ) {
      throw (
        createError ??
        new Error(
          "Could not create supplier product."
        )
      );
    }

    return created.id;
  }

  async function approveInvoice() {
    if (!invoice || saving) {
      return;
    }

    if (!invoice.supplier.trim()) {
      alert(
        "Please enter the supplier before approving."
      );
      return;
    }

    if (
      invoice.lineItems.length ===
      0
    ) {
      alert(
        "This invoice has no line items."
      );
      return;
    }

    if (
      unmatchedCount > 0
    ) {
      const continueApproval =
        window.confirm(
          `${unmatchedCount} line item${
            unmatchedCount === 1
              ? ""
              : "s"
          } are not matched to an ingredient.\n\nApprove the invoice anyway?`
        );

      if (
        !continueApproval
      ) {
        return;
      }
    }

    setSaving(true);
    setError("");

    try {
      /*
       * 1. AUTH USER
       */

      const {
        data: userData,
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !userData.user
      ) {
        router.push("/login");
        return;
      }

      const user =
        userData.user;

      /*
       * 2. FIND ORGANISATION + SITE
       */

      const {
        organisationId,
        siteId,
      } =
        await getOrganisationContext(
          user.id
        );

      /*
       * 3. FIND / CREATE SUPPLIER
       */

      const supplierId =
        await getOrCreateSupplier(
          organisationId,
          invoice.supplier.trim()
        );

      /*
       * 4. CREATE INVOICE
       */

      const {
        data: createdInvoice,
        error: invoiceError,
      } = await supabase
        .from("invoices")
        .insert({
          organisation_id:
            organisationId,

          site_id:
            siteId,

          supplier_id:
            supplierId,

          invoice_number:
            invoice.invoiceNumber ||
            null,

          invoice_date:
            invoice.invoiceDate ||
            null,

          subtotal:
            invoice.subtotal,

          vat:
            invoice.vat,

          total:
            invoice.total,

          status:
            "approved",

          approved_by:
            user.id,

          approved_at:
            new Date().toISOString(),

          file_name:
            sessionStorage.getItem(
              "invoiceFileName"
            ),
        })
        .select("id")
        .single();

      if (
        invoiceError ||
        !createdInvoice
      ) {
        throw (
          invoiceError ??
          new Error(
            "Could not create invoice."
          )
        );
      }

      const invoiceId =
        createdInvoice.id;

      /*
       * 5. PROCESS EACH LINE
       */

      for (
        const item of
        invoice.lineItems
      ) {
        const ingredientName =
          item.ingredientMatch?.trim();

        const priceUnit =
          detectPriceUnit(
            item
          );

        let ingredientId:
          | string
          | null = null;

        let supplierProductId:
          | string
          | null = null;

       if (ingredientName) {

  const resolvedIngredientId =

    await getOrCreateIngredient(

      organisationId,

      ingredientName,

      priceUnit

    );

  ingredientId = resolvedIngredientId;

  supplierProductId =

    await getOrCreateSupplierProduct(

      organisationId,

      supplierId,

      resolvedIngredientId,

      item

    );

}

        /*
         * Invoice line
         */

        const {
          error:
            lineError,
        } = await supabase
          .from(
            "invoice_lines"
          )
          .insert({
            invoice_id:
              invoiceId,

            supplier_product_id:
              supplierProductId,

            ingredient_id:
              ingredientId,

            product_name:
              item.product,

            quantity:
              item.quantity,

            pack:
              item.pack ||
              null,

            unit_price:
              item.unitPrice,

            line_total:
              item.total,

            price_unit:
              priceUnit,
          });

        if (lineError) {
          throw lineError;
        }

        /*
         * Price updates only apply
         * to matched ingredients with
         * an actual price.
         */

        if (
          !ingredientId ||
          item.unitPrice === null ||
          item.unitPrice <= 0
        ) {
          continue;
        }

        /*
         * Current price
         */

        const {
          error:
            currentPriceError,
        } = await supabase
          .from(
            "ingredient_prices"
          )
          .upsert(
            {
              organisation_id:
                organisationId,

              site_id:
                siteId,

              ingredient_id:
                ingredientId,

              supplier_id:
                supplierId,

              supplier_product_id:
                supplierProductId,

              price:
                item.unitPrice,

              unit:
                priceUnit,

              invoice_id:
                invoiceId,

              effective_date:
                invoice.invoiceDate ||
                new Date()
                  .toISOString()
                  .slice(0, 10),

              updated_at:
                new Date().toISOString(),
            },
            {
              onConflict:
                "site_id,ingredient_id",
            }
          );

        if (
          currentPriceError
        ) {
          throw currentPriceError;
        }

        /*
         * Historical price record
         */

        const {
          error:
            historyError,
        } = await supabase
          .from(
            "ingredient_price_history"
          )
          .insert({
            organisation_id:
              organisationId,

            site_id:
              siteId,

            ingredient_id:
              ingredientId,

            supplier_id:
              supplierId,

            supplier_product_id:
              supplierProductId,

            invoice_id:
              invoiceId,

            price:
              item.unitPrice,

            unit:
              priceUnit,
          });

        if (historyError) {
          throw historyError;
        }
      }

      /*
       * 6. TEMPORARY LOCALSTORAGE MIRROR
       *
       * We keep this only while Recipes/Menu
       * still read localStorage.
       */

      const localPrices =
        JSON.parse(
          localStorage.getItem(
            "ingredientPrices"
          ) || "{}"
        );

      invoice.lineItems.forEach(
        (item) => {
          const ingredient =
            item.ingredientMatch?.trim();

          if (
            !ingredient ||
            item.unitPrice ===
              null ||
            item.unitPrice <= 0
          ) {
            return;
          }

          localPrices[
            ingredient
          ] = {
            price:
              item.unitPrice,

            unit:
              detectPriceUnit(
                item
              ),

            supplier:
              invoice.supplier,

            product:
              item.product,

            updatedAt:
              new Date().toISOString(),

            invoiceNumber:
              invoice.invoiceNumber,

            invoiceDate:
              invoice.invoiceDate,
          };
        }
      );

      await persistWorkspaceState(
        "ingredientPrices",
        JSON.stringify(
          localPrices
        )
      );

      /*
       * 7. CLEAR DRAFT + FINISH
       */

      sessionStorage.removeItem(
        "invoiceExtraction"
      );

      setApproved(true);

      alert(
        `Invoice ${
          invoice.invoiceNumber ||
          ""
        } saved to Supabase successfully.`
      );

      router.push(
        "/invoices"
      );
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Something went wrong while saving the invoice."
      );
    } finally {
      setSaving(false);
    }
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

  if (
    !invoice ||
    error &&
      !invoice
  ) {
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
              match products and approve
              the invoice.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
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
              disabled={
                approved ||
                saving
              }
            >
              {saving
                ? "Saving..."
                : approved
                ? "Approved ✓"
                : "Approve invoice"}
            </button>
          </div>
        </header>

        {error && (
          <section
            className="panel"
            style={{
              marginBottom:
                "18px",
            }}
          >
            <div
              style={{
                color:
                  "#a43e32",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          </section>
        )}

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
              {money(
                invoice.total
              )}
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
                    event.target
                      .value
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
                    event.target
                      .value
                  )
                }
              />
            </label>

            <label>
              <span>
                Invoice date
              </span>

              <input
                type="date"
                value={
                  invoice.invoiceDate
                }
                onChange={(event) =>
                  updateInvoiceField(
                    "invoiceDate",
                    event.target
                      .value
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
                  invoice.subtotal ??
                  ""
                }
                onChange={(event) =>
                  updateMoneyField(
                    "subtotal",
                    event.target
                      .value
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
                    event.target
                      .value
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
                  invoice.total ??
                  ""
                }
                onChange={(event) =>
                  updateMoneyField(
                    "total",
                    event.target
                      .value
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
            marginBottom:
              "80px",
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

                  <th>Qty</th>

                  <th>Pack</th>

                  <th>
                    Unit price
                  </th>

                  <th>
                    Line total
                  </th>

                  <th>
                    Ingredient
                  </th>

                  <th></th>
                </tr>
              </thead>

              <tbody>
                {invoice.lineItems.map(
                  (
                    item,
                    index
                  ) => (
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
                              "80px",
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

        <div className="quick-order-footer">
          <div>
            <span>
              {
                invoice.lineItems
                  .length
              }{" "}
              invoice lines
            </span>

            <strong>
              {money(
                invoice.total
              )}
            </strong>
          </div>

          <button
            type="button"
            className="primary-button quick-review-button"
            onClick={
              approveInvoice
            }
            disabled={
              approved ||
              saving
            }
          >
            {saving
              ? "Saving to Supabase..."
              : approved
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
