export type WoodsProduct = {
  woodsId: number;
  sku: string;
  product: string;
  size: string | null;
  packSize: number | null;
  caseSize: number | null;
  nominalWeight: number | null;
  productType: string | null;
  casePrice: number | null;
  splitPrice: number | null;
  brand: string;
  supplierCode: string;
  categoryId: number | null;
  storageType: number | null;
  taxRate: number | null;
  contractPrice: boolean;
  promotionPrice: boolean;
  lastOrdered: string;
  lastOrderedQty: number | null;
  lastOrderVariation: string;
  stock: number | null;
};

export type WoodsCatalogueItem = {
  id: string;
  ingredient: string;
  supplier: "Woods Foodservice";
  supplierProduct: string;
  unit: string;
  fallbackPrice: number | null;
  preferred: boolean;
  category: string;

  sku: string;
  packSize: number | null;
  casePrice: number | null;
  splitPrice: number | null;
  lastOrdered: string;
  lastOrderedQty: number | null;
  lastOrderVariation: string;
  brand: string;
  woodsId: number;
};

export const woodsProducts: WoodsProduct[] = [
  // Paste the 191 generated product objects here
];

function getWoodsUnit(product: WoodsProduct): string {
  const size = (product.size ?? "").toLowerCase();

  if (product.splitPrice !== null) {
    if (size.includes("kg")) return "kg";
    if (size.includes("litre") || size.includes("liter") || size.includes(" l")) {
      return "L";
    }
    if (size.includes("bunch")) return "bunch";
    if (size.includes("punnet")) return "punnet";
    if (size.includes("box")) return "box";
    if (size.includes("bag")) return "bag";
    if (size.includes("pack")) return "pack";
    if (size.includes("pkt")) return "pack";
    if (size.includes("each")) return "each";

    return "each";
  }

  if ((product.packSize ?? 0) > 1) {
    return "pack";
  }

  if (size.includes("bunch")) return "bunch";
  if (size.includes("punnet")) return "punnet";
  if (size.includes("box")) return "box";
  if (size.includes("bag")) return "bag";
  if (size.includes("pack")) return "pack";
  if (size.includes("pkt")) return "pack";

  return "each";
}

function getWoodsCategory(product: WoodsProduct): string {
  const title = product.product.toLowerCase();

  if (
    title.includes("cloth") ||
    title.includes("glove") ||
    title.includes("container") ||
    title.includes("lid") ||
    title.includes("foil") ||
    title.includes("film") ||
    title.includes("bag") ||
    title.includes("cleaner") ||
    title.includes("detergent") ||
    title.includes("sanitiser") ||
    title.includes("soap")
  ) {
    return "Non-Food";
  }

  if (
    title.includes("cream") ||
    title.includes("butter") ||
    title.includes("yoghurt") ||
    title.includes("yogurt") ||
    title.includes("cheese") ||
    title.includes("milk") ||
    title.includes("egg")
  ) {
    return "Dairy & Eggs";
  }

  if (
    title.includes("oil") ||
    title.includes("vinegar") ||
    title.includes("mustard") ||
    title.includes("mayonnaise") ||
    title.includes("mayo") ||
    title.includes("sauce")
  ) {
    return "Sauces, Oils & Vinegars";
  }

  if (
    title.includes("pepper") ||
    title.includes("cumin") ||
    title.includes("coriander seed") ||
    title.includes("cinnamon") ||
    title.includes("salt") ||
    title.includes("spice") ||
    title.includes("chilli") ||
    title.includes("chili")
  ) {
    return "Spices";
  }

  if (
    title.includes("flour") ||
    title.includes("sugar") ||
    title.includes("rice") ||
    title.includes("bean") ||
    title.includes("lentil") ||
    title.includes("panko") ||
    title.includes("breadcrumb") ||
    title.includes("quinoa")
  ) {
    return "Dry Goods";
  }

  if (
    title.includes("chocolate") ||
    title.includes("cocoa") ||
    title.includes("cacao") ||
    title.includes("glucose") ||
    title.includes("dulce")
  ) {
    return "Dessert";
  }

  return "Woods Foodservice";
}

export const woodsCatalogueItems: WoodsCatalogueItem[] =
  woodsProducts.map((product) => ({
    id: `woods-${product.sku}`,
    ingredient: product.product,
    supplier: "Woods Foodservice",
    supplierProduct: product.product,
    unit: getWoodsUnit(product),

    fallbackPrice:
      product.splitPrice !== null
        ? product.splitPrice
        : product.casePrice,

    preferred: true,
    category: getWoodsCategory(product),

    sku: product.sku,
    packSize: product.packSize,
    casePrice: product.casePrice,
    splitPrice: product.splitPrice,
    lastOrdered: product.lastOrdered,
    lastOrderedQty: product.lastOrderedQty,
    lastOrderVariation: product.lastOrderVariation,
    brand: product.brand,
    woodsId: product.woodsId,
  }));

export const woodsProductCount = woodsProducts.length;

export const woodsProductsBySku = new Map(
  woodsProducts.map((product) => [product.sku, product])
);

export const woodsRecentlyOrdered = [...woodsProducts]
  .filter((product) => product.lastOrdered)
  .sort((a, b) => b.lastOrdered.localeCompare(a.lastOrdered));

export const woodsSplitProducts = woodsProducts.filter(
  (product) => product.splitPrice !== null
);
