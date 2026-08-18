import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Line = {
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

type Invoice = {
  id: string;
  supplier_id: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
};

type Mapping = string | { productName?: string; supplier?: string };

type NormalisedPrice = {
  price: number;
  unit: "kg" | "L" | "each" | "bunch";
};

function clean(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function compact(value?: string | null) {
  return clean(value).replace(/\s+/g, "");
}

function num(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function singular(token: string) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("es") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 3) return token.slice(0, -1);
  return token;
}

function wordSet(value: string) {
  return new Set(clean(value).split(" ").filter(Boolean).map(singular));
}

const aliases: Record<string, string[]> = {
  "white miso": ["miso white paste", "white miso paste", "miso paste"],
  "miso paste": ["miso white paste", "white miso"],
  "lime juice": ["lime juice cold pressed", "limejuice"],
  "desiccated coconut": ["coconut fine desiccated", "coconut desiccated"],
  "wild mushroom": ["mushroom mix wild", "wild mushroom mix"],
  "wild mushrooms": ["mushroom mix wild", "wild mushroom mix"],
  "purple cabbage": ["cabbage red", "red cabbage"],
  "red cabbage": ["cabbage red"],
  "black pepper": ["black cracked pepper", "cracked black pepper"],
  "corn flour": ["cornflour", "corn flour"],
  cornflour: ["corn flour", "cornflour"],
  "soy sauce": ["soy sauce", "soy sauce tamari", "tamari soy sauce"],
  "soya sauce": ["soy sauce", "soy sauce tamari", "tamari soy sauce"],
  "orange sweet potato": ["sweet potato", "sweet potato orange"],
  "sweet red peppers": ["red pepper", "red peppers"],
  "white onions": ["white onion"],
  "red onions": ["red onion"],
  "garlic cloves": ["garlic"],
  "garlic clove": ["garlic"],
  "coriander with the stem": ["coriander"],
  "coriander stem": ["coriander"],
  "coriander stems": ["coriander"],
  milk: ["semi skimmed milk", "whole milk"],
  avocado: ["avocado hass ready to eat"],
  carrots: ["carrot"],
};

function variants(name: string) {
  const key = clean(name);
  const stripped = key
    .replace(/\b(grated|shaved|sliced|seedless|finely|fine|whole|fresh|cooked|toasted|blitzed|peeled|cracked)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return Array.from(new Set([key, stripped, ...(aliases[key] ?? [])].filter(Boolean)));
}

function matchScore(ingredient: string, product: string) {
  const productClean = clean(product);
  const productCompact = compact(product);
  let best = 0;

  for (const variant of variants(ingredient)) {
    const ingredientWords = [...wordSet(variant)].filter((word) => word.length > 1);
    const productWords = wordSet(product);
    if (!ingredientWords.length) continue;

    const matched = ingredientWords.filter((word) => productWords.has(word)).length;
    const coverage = matched / ingredientWords.length;
    let score = coverage * 75;

    if (productClean === clean(variant)) score = 100;
    else if (productCompact === compact(variant)) score = 98;
    else if (productCompact.includes(compact(variant))) score += 18;

    score -= Math.min(Math.max(productWords.size - matched, 0) * 1.25, 10);

    const ingredientClean = clean(ingredient);
    if (/\b(micro|cress)\b/.test(productClean) && !/\b(micro|cress)\b/.test(ingredientClean)) score -= 50;
    if (/\bjuice\b/.test(ingredientClean) && !/juice/.test(productClean)) score -= 25;
    if (/\boil\b/.test(ingredientClean) && !/oil/.test(productClean)) score -= 20;
    if (/\bflour\b/.test(ingredientClean) && !/flour/.test(productClean)) score -= 25;

    best = Math.max(best, score);
  }

  return Math.max(0, Math.min(100, best));
}

function measure(value?: string | null) {
  const match = clean(value).match(/(\d+(?:\.\d+)?)\s*(kg|kilogram|kilograms|g|gram|grams|ltr|litre|litres|liter|liters|l|ml)/);
  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2];
  if (!Number.isFinite(amount) || amount <= 0) return null;

  if (["kg", "kilogram", "kilograms"].includes(unit)) return { amount, unit: "kg" as const };
  if (["g", "gram", "grams"].includes(unit)) return { amount: amount / 1000, unit: "kg" as const };
  if (["ltr", "litre", "litres", "liter", "liters", "l"].includes(unit)) return { amount, unit: "L" as const };
  return { amount: amount / 1000, unit: "L" as const };
}

function normalisePrice(line: Line): NormalisedPrice | null {
  const quantity = num(line.quantity);
  const directPrice = num(line.unit_price);
  const total = num(line.line_total);
  const price = directPrice && directPrice > 0
    ? directPrice
    : total && total > 0 && quantity && quantity > 0
      ? total / quantity
      : null;

  if (price === null) return null;

  const priceUnit = clean(line.price_unit);
  const rawUnit = clean(line.price_unit || line.pack);

  if (/^(kg|kilogram|kilograms)$/.test(priceUnit)) return { price, unit: "kg" };
  if (/^(l|ltr|litre|litres|liter|liters)$/.test(priceUnit)) return { price, unit: "L" };

  const packMeasure = measure(line.pack) || measure(line.price_unit);
  if (packMeasure) return { price: price / packMeasure.amount, unit: packMeasure.unit };

  const productMeasure = measure(line.product_name);
  if (productMeasure && /\b(bunch|punnet|bag|pack)\b/.test(rawUnit)) {
    return { price: price / productMeasure.amount, unit: productMeasure.unit };
  }

  if (/\b(each|ea)\b/.test(rawUnit)) return { price, unit: "each" };
  if (/\bbunch\b/.test(rawUnit)) return { price, unit: "bunch" };

  const numericPack = rawUnit.match(/^\d+(?:\.\d+)?$/);
  if (numericPack && Number(numericPack[0]) > 1) {
    return { price: price / Number(numericPack[0]), unit: "each" };
  }

  const product = clean(line.product_name);
  const looksLikeKg =
    line.pack === null &&
    quantity !== null &&
    quantity > 0 &&
    !Number.isInteger(quantity) &&
    /\b(per ?kg|fillet|loin|prawn|cod|bass|tuna|fish)\b/.test(product);

  if (looksLikeKg) return { price, unit: "kg" };
  if (/\b(unit|each|ea)\b/.test(rawUnit)) return { price, unit: "each" };

  return null;
}

function mappingMatches(mapping: Mapping, supplier: string, product: string) {
  if (typeof mapping === "string") return clean(mapping) === clean(product);
  if (mapping.productName && clean(mapping.productName) !== clean(product)) return false;
  if (mapping.supplier && clean(mapping.supplier) !== clean(supplier)) return false;
  return Boolean(mapping.productName || mapping.supplier);
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: membership, error: membershipError } = await supabase
      .from("organisation_members")
      .select("organisation_id")
      .eq("user_id", authData.user.id)
      .limit(1)
      .maybeSingle();

    if (membershipError) throw new Error(membershipError.message);
    if (!membership?.organisation_id) {
      return NextResponse.json({ error: "No organisation" }, { status: 403 });
    }

    const body = await req.json();
    const ingredientNames: string[] = Array.from(
      new Set<string>(
        (Array.isArray(body.ingredients) ? body.ingredients : [])
          .map((value: unknown) => String(value ?? "").trim())
          .filter(Boolean)
      )
    );

    if (!ingredientNames.length) {
      return NextResponse.json({ prices: {}, matched: 0, requested: 0 });
    }

    const organisationId = membership.organisation_id;
    const { data: invoices, error: invoiceError } = await supabase
      .from("invoices")
      .select("id,supplier_id,invoice_number,invoice_date")
      .eq("organisation_id", organisationId)
      .eq("status", "approved")
      .order("invoice_date", { ascending: false })
      .limit(1000);

    if (invoiceError) throw new Error(invoiceError.message);

    const invoiceRows = (invoices ?? []) as Invoice[];
    const invoiceIds = invoiceRows.map((invoice) => invoice.id);
    if (!invoiceIds.length) {
      return NextResponse.json({ prices: {}, matched: 0, requested: ingredientNames.length });
    }

    const [suppliersResult, linesResult, mappingResult] = await Promise.all([
      supabase.from("suppliers").select("id,name").eq("organisation_id", organisationId).limit(1000),
      supabase
        .from("invoice_lines")
        .select("id,invoice_id,product_name,quantity,pack,unit_price,line_total,price_unit,created_at")
        .in("invoice_id", invoiceIds)
        .range(0, 4999),
      supabase
        .from("workspace_state")
        .select("state_value")
        .eq("organisation_id", organisationId)
        .eq("state_key", "invoiceProductMappings")
        .maybeSingle(),
    ]);

    if (suppliersResult.error) throw new Error(suppliersResult.error.message);
    if (linesResult.error) throw new Error(linesResult.error.message);

    const supplierById = new Map<string, string>(
      (suppliersResult.data ?? []).map((supplier) => [supplier.id, supplier.name])
    );
    const invoiceById = new Map(invoiceRows.map((invoice) => [invoice.id, invoice]));
    const mappings = (mappingResult.data?.state_value ?? {}) as Record<string, Mapping>;

    const candidates = ((linesResult.data ?? []) as Line[])
      .flatMap((line) => {
        const invoice = invoiceById.get(line.invoice_id);
        const normalised = normalisePrice(line);
        if (!invoice || !line.product_name || !normalised) return [];

        return [{
          line,
          invoice,
          supplier: supplierById.get(invoice.supplier_id ?? "") ?? "Unknown supplier",
          normalised,
          date: new Date(invoice.invoice_date ?? line.created_at ?? 0).getTime() || 0,
        }];
      });

    const prices: Record<string, unknown> = {};

    for (const ingredient of ingredientNames) {
      const mapping = mappings[clean(ingredient)] ?? mappings[ingredient];
      const ranked = candidates
        .map((candidate) => {
          const manual = mapping
            ? mappingMatches(mapping, candidate.supplier, candidate.line.product_name ?? "")
            : false;
          return {
            ...candidate,
            manual,
            score: manual ? 1000 : matchScore(ingredient, candidate.line.product_name ?? ""),
          };
        })
        .filter((candidate) => candidate.manual || candidate.score >= 68)
        .sort((a, b) => b.score - a.score || b.date - a.date);

      const best = ranked[0];
      if (!best) continue;

      prices[ingredient] = {
        price: Number(best.normalised.price.toFixed(6)),
        unit: best.normalised.unit,
        supplier: best.supplier,
        product: best.line.product_name,
        updatedAt: best.invoice.invoice_date ?? best.line.created_at,
        invoiceNumber: best.invoice.invoice_number,
        invoiceDate: best.invoice.invoice_date,
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
