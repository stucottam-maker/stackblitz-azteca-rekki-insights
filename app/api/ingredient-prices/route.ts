import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type InvoiceLineRow = {
  id: string;
  invoice_id: string;
  product_name: string | null;
  quantity: number | string | null;
  pack: string | null;
  unit_price: number | string | null;
  line_total: number | string | null;
  price_unit: string | null;
  created_at: string | null;
};

type InvoiceRow = {
  id: string;
  supplier_id: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
};

type SupplierRow = {
  id: string;
  name: string;
};

type ManualMapping =
  | string
  | {
      productName?: string;
      supplier?: string;
    };

type NormalisedPrice = {
  price: number;
  unit: string;
  rawUnit: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalise(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function compact(value?: string | null) {
  return normalise(value).replace(/\s+/g, "");
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function singularToken(token: string) {
  if (token.endsWith("ies") && token.length > 4) {
    return `${token.slice(0, -3)}y`;
  }

  if (token.endsWith("es") && token.length > 4) {
    return token.slice(0, -2);
  }

  if (token.endsWith("s") && token.length > 3) {
    return token.slice(0, -1);
  }

  return token;
}

function tokens(value: string) {
  return normalise(value)
    .split(" ")
    .filter(Boolean)
    .map(singularToken);
}

function ingredientVariants(name: string) {
  const key = normalise(name);
  const variants = new Set<string>([key]);

  const descriptorStripped = key
    .replace(/\b(grated|shaved|sliced|seedless|finely|fine|whole|fresh|cooked|toasted|blitzed|peeled)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (descriptorStripped) variants.add(descriptorStripped);

  const aliases: Record<string, string[]> = {
    "white miso": ["miso white paste", "white miso paste", "miso paste"],
    "miso paste": ["miso white paste", "white miso"],
    "lime juice": ["lime juice cold pressed", "limejuice"],
    "desiccated coconut": ["coconut fine desiccated", "coconut desiccated"],
    "wild mushroom": ["mushroom mix wild", "wild mushroom mix"],
    "wild mushrooms": ["mushroom mix wild", "wild mushroom mix"],
    "black pepper": ["black cracked pepper", "cracked black pepper"],
    "plain flour": ["plain flour"],
    "corn flour": ["corn flour", "cornflour"],
    "cornflour": ["corn flour", "cornflour"],
    "caster sugar": ["caster sugar", "castor sugar"],
    "rapeseed oil": ["rapeseed oil"],
    "soy sauce": ["soy sauce", "tamari soy sauce", "soy sauce tamari"],
    "soya sauce": ["soy sauce", "tamari soy sauce", "soy sauce tamari"],
    "red cabbage": ["cabbage red"],
    "purple cabbage": ["cabbage red", "red cabbage"],
    "orange sweet potato": ["sweet potato orange", "sweet potato"],
    "sweet red peppers": ["red pepper", "red peppers"],
    "white onions": ["white onion"],
    "red onions": ["red onion"],
    "garlic cloves": ["garlic"],
    "garlic clove": ["garlic"],
    "coriander with the stem": ["coriander"],
    "coriander stem": ["coriander"],
    "coriander stems": ["coriander"],
    "milk": ["semi skimmed milk", "whole milk"],
    "double cream": ["double cream"],
    "soft cheese": ["soft cheese", "cream cheese"],
    "avocado": ["avocado hass ready to eat"],
    "aubergine": ["aubergine"],
    "carrots": ["carrot"],
    "ginger": ["ginger"],
    "coriander": ["coriander"],
  };

  for (const alias of aliases[key] ?? []) {
    variants.add(normalise(alias));
  }

  return Array.from(variants).filter(Boolean);
}

function productScore(ingredientName: string, productName: string) {
  const productKey = normalise(productName);
  const productCompact = compact(productName);
  let best = 0;

  for (const variant of ingredientVariants(ingredientName)) {
    const variantCompact = compact(variant);
    const ingredientTokens = tokens(variant).filter((token) => token.length > 1);
    const productTokens = new Set(tokens(productName));

    if (!variantCompact || ingredientTokens.length === 0) continue;

    let score = 0;

    if (productKey === variant) score = 100;
    else if (productCompact === variantCompact) score = 98;
    else {
      const matched = ingredientTokens.filter((token) => productTokens.has(token)).length;
      const coverage = matched / ingredientTokens.length;
      score = coverage * 74;

      if (productCompact.includes(variantCompact)) score += 18;
      if (variantCompact.includes(productCompact) && productCompact.length >= 5) score += 8;

      const extraTokens = Math.max(productTokens.size - matched, 0);
      score -= Math.min(extraTokens * 1.5, 12);
    }

    const ingredientKey = normalise(ingredientName);
    const productHasMicro = /\b(micro|cress)\b/.test(productKey);
    const ingredientHasMicro = /\b(micro|cress)\b/.test(ingredientKey);

    if (productHasMicro && !ingredientHasMicro) score -= 48;

    if (/\bjuice\b/.test(ingredientKey) && !/juice/.test(productKey)) score -= 24;
    if (/\boil\b/.test(ingredientKey) && !/oil/.test(productKey)) score -= 18;
    if (/\bflour\b/.test(ingredientKey) && !/flour/.test(productKey)) score -= 24;

    best = Math.max(best, score);
  }

  return Math.max(0, Math.min(best, 100));
}

function parseMeasure(value?: string | null) {
  const key = normalise(value);
  const match = key.match(/(\d+(?:\.\d+)?)\s*(kg|kilogram|kilograms|g|gram|grams|ltr|litre|litres|liter|liters|l|ml|millilitre|millilitres)/i);

  if (!match) return null;

  const amount = Number(match[1]);
  const rawUnit = match[2].toLowerCase();

  if (!Number.isFinite(amount) || amount <= 0) return null;

  if (["kg", "kilogram", "kilograms"].includes(rawUnit)) {
    return { amount, unit: "kg" as const };
  }

  if (["g", "gram", "grams"].includes(rawUnit)) {
    return { amount: amount / 1000, unit: "kg" as const };
  }

  if (["ltr", "litre", "litres", "liter", "liters", "l"].includes(rawUnit)) {
    return { amount, unit: "L" as const };
  }

  return { amount: amount / 1000, unit: "L" as const };
}

function normaliseLinePrice(line: InvoiceLineRow): NormalisedPrice | null {
  const quantity = toNumber(line.quantity);
  const unitPrice = toNumber(line.unit_price);
  const lineTotal = toNumber(line.line_total);
  const perPackPrice =
    unitPrice !== null && unitPrice > 0
      ? unitPrice
      : lineTotal !== null && lineTotal > 0 && quantity !== null && quantity > 0
        ? lineTotal / quantity
        : null;

  if (perPackPrice === null || !Number.isFinite(perPackPrice) || perPackPrice < 0) {
    return null;
  }

  const rawUnit = line.price_unit || line.pack || "";
  const rawKey = normalise(rawUnit);
  const productKey = normalise(line.product_name);

  // Explicit price units such as £/kg or £/L should win over pack text.
  if (/^(kg|kilogram|kilograms)$/.test(rawKey)) {
    return { price: perPackPrice, unit: "kg", rawUnit };
  }

  if (/^(l|ltr|litre|litres|liter|liters)$/.test(rawKey)) {
    return { price: perPackPrice, unit: "L", rawUnit };
  }

  const packMeasure = parseMeasure(line.pack) || parseMeasure(line.price_unit);

  if (packMeasure) {
    return {
      price: perPackPrice / packMeasure.amount,
      unit: packMeasure.unit,
      rawUnit,
    };
  }

  // Bunches/punnets sometimes include their weight in the product description.
  const productMeasure = parseMeasure(line.product_name);
  if (productMeasure && /\b(bunch|punnet|bag|pack)\b/.test(rawKey)) {
    return {
      price: perPackPrice / productMeasure.amount,
      unit: productMeasure.unit,
      rawUnit,
    };
  }

  if (/\b(each|ea)\b/.test(rawKey)) {
    return { price: perPackPrice, unit: "each", rawUnit };
  }

  if (/\bbunch\b/.test(rawKey)) {
    return { price: perPackPrice, unit: "bunch", rawUnit };
  }

  const numericPack = rawKey.match(/^\d+(?:\.\d+)?$/);
  if (numericPack) {
    const count = Number(numericPack[0]);
    if (count > 1) {
      return { price: perPackPrice / count, unit: "each", rawUnit };
    }
  }

  // Some fish invoices are extracted as "unit" even though the quantity is kg.
  const looksWeightPriced =
    /\b(per ?kg|fillet|loin|prawn|cod|bass|tuna|fish)\b/.test(productKey) &&
    line.pack === null &&
    quantity !== null &&
    quantity > 0 &&
    !Number.isInteger(quantity);

  if (looksWeightPriced) {
    return { price: perPackPrice, unit: "kg", rawUnit };
  }

  if (/\b(unit|each|ea)\b/.test(rawKey)) {
    return { price: perPackPrice, unit: "each", rawUnit };
  }

  return null;
}

function mappingMatches(mapping: ManualMapping, supplier: string, productName: string) {
  if (typeof mapping === "string") {
    return normalise(mapping) === normalise(productName);
  }

  if (mapping.productName && normalise(mapping.productName) !== normalise(productName)) {
    return false;
  }

  if (mapping.supplier && normalise(mapping.supplier) !== normalise(supplier)) {
    return false;
  }

  return Boolean(mapping.productName || mapping.supplier);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ingredientNames = Array.from(
      new Set(
        (Array.isArray(body.ingredients) ? body.ingredients : [])
          .map((value: unknown) => String(value ?? "").trim())
          .filter(Boolean)
      )
    );

    if (ingredientNames.length === 0) {
      return NextResponse.json({ prices: {}, matched: 0, requested: 0 });
    }

    const { data: invoices, error: invoiceError } = await supabase
      .from("invoices")
      .select("id, supplier_id, invoice_number, invoice_date")
      .eq("status", "approved")
      .order("invoice_date", { ascending: false })
      .limit(1000);

    if (invoiceError) throw new Error(invoiceError.message);

    const invoiceRows = (invoices ?? []) as InvoiceRow[];
    const invoiceIds = invoiceRows.map((invoice) => invoice.id);

    if (invoiceIds.length === 0) {
      return NextResponse.json({ prices: {}, matched: 0, requested: ingredientNames.length });
    }

    const [{ data: supplierRows, error: supplierError }, { data: lineRows, error: lineError }, { data: mappingRows }] =
      await Promise.all([
        supabase.from("suppliers").select("id, name").limit(1000),
        supabase
          .from("invoice_lines")
          .select("id, invoice_id, product_name, quantity, pack, unit_price, line_total, price_unit, created_at")
          .in("invoice_id", invoiceIds)
          .range(0, 4999),
        supabase
          .from("workspace_state")
          .select("state_value, updated_at")
          .eq("state_key", "invoiceProductMappings")
          .order("updated_at", { ascending: false })
          .limit(1),
      ]);

    if (supplierError) throw new Error(supplierError.message);
    if (lineError) throw new Error(lineError.message);

    const supplierById = new Map(
      ((supplierRows ?? []) as SupplierRow[]).map((supplier) => [supplier.id, supplier.name])
    );
    const invoiceById = new Map(invoiceRows.map((invoice) => [invoice.id, invoice]));
    const mappings = ((mappingRows?.[0]?.state_value ?? {}) as Record<string, ManualMapping>);

    const candidates = ((lineRows ?? []) as InvoiceLineRow[])
      .map((line) => {
        const invoice = invoiceById.get(line.invoice_id);
        if (!invoice || !line.product_name) return null;

        const normalisedPrice = normaliseLinePrice(line);
        if (!normalisedPrice) return null;

        return {
          line,
          invoice,
          supplier: supplierById.get(invoice.supplier_id ?? "") ?? "Unknown supplier",
          normalisedPrice,
          dateNumber: new Date(invoice.invoice_date ?? line.created_at ?? 0).getTime() || 0,
        };
      })
      .filter(Boolean) as Array<{
        line: InvoiceLineRow;
        invoice: InvoiceRow;
        supplier: string;
        normalisedPrice: NormalisedPrice;
        dateNumber: number;
      }>;

    const prices: Record<string, unknown> = {};

    for (const ingredientName of ingredientNames) {
      const mapping = mappings[normalise(ingredientName)] ?? mappings[ingredientName];

      const ranked = candidates
        .map((candidate) => {
          const manual = mapping
            ? mappingMatches(mapping, candidate.supplier, candidate.line.product_name ?? "")
            : false;
          const score = manual
            ? 1000
            : productScore(ingredientName, candidate.line.product_name ?? "");

          return { ...candidate, score, manual };
        })
        .filter((candidate) => candidate.manual || candidate.score >= 68)
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return b.dateNumber - a.dateNumber;
        });

      const best = ranked[0];
      if (!best) continue;

      prices[ingredientName] = {
        price: Number(best.normalisedPrice.price.toFixed(6)),
        unit: best.normalisedPrice.unit,
        supplier: best.supplier,
        product: best.line.product_name,
        invoiceNumber: best.invoice.invoice_number,
        invoiceDate: best.invoice.invoice_date,
        updatedAt: best.invoice.invoice_date ?? best.line.created_at,
        source: "invoice",
        matchType: best.manual ? "mapped" : "automatic",
        confidence: best.manual ? 100 : Math.round(best.score),
        rawPriceUnit: best.line.price_unit,
        rawPack: best.line.pack,
      };
    }

    return NextResponse.json({
      prices,
      matched: Object.keys(prices).length,
      requested: ingredientNames.length,
    });
  } catch (error: any) {
    console.error("INGREDIENT PRICE ERROR", error);
    return NextResponse.json(
      { error: error?.message || "Could not derive invoice ingredient prices" },
      { status: 500 }
    );
  }
}
