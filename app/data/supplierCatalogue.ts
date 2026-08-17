import { woodsCatalogueItems } from "./woodsCatalogue";
import { mexgrocerCatalogue } from "./mexgrocerCatalogue";
import { ouiChefCatalogueItems } from "./ouiChefCatalogue";
import { masafinaCatalogueItems } from "./masafinaCatalogue";
import { raynorCatalogueItems } from "./raynorCatalogue";

export type CatalogueItem = {
  id: string;
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  unit: string;

  fallbackPrice: number | null;

  preferred?: boolean;
  category?: string;

  sku?: string;
  packSize?: number | null;
  casePrice?: number | null;
  splitPrice?: number | null;

  lastOrdered?: string;
  lastOrderedQty?: number | null;
  lastOrderVariation?: string;
  brand?: string;
  woodsId?: number;
};

export type SupplierContact = {
  name: string;
  email?: string;
};

export const supplierContacts: SupplierContact[] = [
  { name: "Fin and Flounder" },
  { name: "James Knight of Mayfair" },
  { name: "Crazy Dan's House of Meat" },
  { name: "Mexgrocer" },
  { name: "Woods Foodservice" },
  { name: "Oui Chef" },
  { name: "Albion Fine Foods" },
  { name: "Spitalfields Fruit & Veg" },
  { name: "Big K Charcoal" },
  { name: "Masafina" },
  { name: "Raynor Hygiene" },
  {
    name: "Tazaki Foods",
    email: "japanesesales@tazakifoods.com",
  },
];

// Helper to keep imported catalogues safe
function normaliseCatalogue(
  items: readonly any[],
  supplier?: string
): CatalogueItem[] {
  return items.map((item) => ({
    id: item.id ?? crypto.randomUUID(),

    ingredient:
      item.ingredient ??
      item.title ??
      item.name ??
      "Unknown",

    supplier:
      item.supplier ??
      supplier ??
      "Unknown",

    supplierProduct:
      item.supplierProduct ??
      item.title ??
      item.name ??
      "Unknown",

    unit:
      item.unit ??
      "each",

    fallbackPrice:
      item.fallbackPrice ??
      item.price ??
      null,

    preferred:
      item.preferred ??
      false,

    category:
      item.category ??
      item.categorySlug ??
      "Other",

    sku:
      item.sku,

    packSize:
      item.packSize ??
      null,

    casePrice:
      item.casePrice ??
      null,

    splitPrice:
      item.splitPrice ??
      null,

    lastOrdered:
      item.lastOrdered,

    lastOrderedQty:
      item.lastOrderedQty ??
      null,

    lastOrderVariation:
      item.lastOrderVariation,

    brand:
      item.brand,
  }));
}

export const supplierCatalogue: CatalogueItem[] = [
  // =====================================================
  // IMPORTED SUPPLIER CATALOGUES
  // =====================================================

  ...normaliseCatalogue(
    mexgrocerCatalogue,
    "Mexgrocer"
  ),

  ...normaliseCatalogue(
    woodsCatalogueItems,
    "Woods Foodservice"
  ),

  ...normaliseCatalogue(
    ouiChefCatalogueItems,
    "Oui Chef"
  ),

  ...normaliseCatalogue(
    masafinaCatalogueItems,
    "Masafina"
  ),

  ...normaliseCatalogue(
    raynorCatalogueItems,
    "Raynor Hygiene"
  ),

  // =====================================================
  // FIN AND FLOUNDER
  // =====================================================

  {
    id: "fin-cod-fillet",
    ingredient: "Cod",
    supplier: "Fin and Flounder",
    supplierProduct: "Cod Fillet 1-2kg",
    unit: "kg",
    fallbackPrice: 24.95,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-black-cod",
    ingredient: "Black cod",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Black Cod 2-3kg Head Off",
    unit: "kg",
    fallbackPrice: 24.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-prawn-26-30",
    ingredient: "26/30 prawn",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Raw Peeled Deveined Prawn 26/30 1kg Bag",
    unit: "kg",
    fallbackPrice: 10.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-king-prawn",
    ingredient: "King prawn",
    supplier: "Fin and Flounder",
    supplierProduct: "King Prawn 10/20",
    unit: "kg",
    fallbackPrice: 15.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-tuna-loin",
    ingredient: "Tuna loin",
    supplier: "Fin and Flounder",
    supplierProduct: "Tuna Loin AAA Line Caught",
    unit: "kg",
    fallbackPrice: 32.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-stonebass-fillet",
    ingredient: "Stonebass",
    supplier: "Fin and Flounder",
    supplierProduct: "Stone Bass Fillet",
    unit: "kg",
    fallbackPrice: 13.8,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-trout",
    ingredient: "Trout",
    supplier: "Fin and Flounder",
    supplierProduct: "Trout Chalk Stream",
    unit: "kg",
    fallbackPrice: 12.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-hake",
    ingredient: "Hake",
    supplier: "Fin and Flounder",
    supplierProduct: "Hake",
    unit: "kg",
    fallbackPrice: 13.95,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-squid",
    ingredient: "Squid",
    supplier: "Fin and Flounder",
    supplierProduct: "Squid",
    unit: "kg",
    fallbackPrice: 16.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-wild-seabass",
    ingredient: "Wild sea bass",
    supplier: "Fin and Flounder",
    supplierProduct: "Wild Sea Bass",
    unit: "kg",
    fallbackPrice: 19.95,
    preferred: true,
    category: "Fish",
  },

  // =====================================================
  // CRAZY DAN'S HOUSE OF MEAT
  // =====================================================

  {
    id: "crazy-ribeye",
    ingredient: "Ribeye",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Ribeye",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-short-rib",
    ingredient: "Short rib",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Longhorn Short Rib",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-pork-belly",
    ingredient: "Pork belly",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Pork Belly No Ribs",
    unit: "kg",
    fallbackPrice: 6,
    preferred: true,
    category: "Pork",
  },
  {
    id: "crazy-pork-skin",
    ingredient: "Pork belly skin",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Pork Skin",
    unit: "kg",
    fallbackPrice: 2.2,
    preferred: true,
    category: "Pork",
  },
  {
    id: "crazy-chicken-thigh",
    ingredient: "Chicken thigh",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Chicken Thigh Skin Off Boneless",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Poultry",
  },
  {
    id: "crazy-whole-chicken",
    ingredient: "Whole chicken",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Whole Corn Fed Chicken",
    unit: "each",
    fallbackPrice: null,
    preferred: true,
    category: "Poultry",
  },
  {
    id: "crazy-brisket",
    ingredient: "Brisket",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Brisket",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-ox-cheek",
    ingredient: "Ox cheek",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Ox Cheek",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-tomahawk",
    ingredient: "Tomahawk",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Tomahawk Steak",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-lamb-rack",
    ingredient: "Lamb cutlets",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Lamb Rack",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Lamb",
  },
  {
    id: "crazy-lamb-shoulder",
    ingredient: "Lamb shoulder",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Lamb Shoulder",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Lamb",
  },
  {
    id: "crazy-chorizo",
    ingredient: "Chorizo",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Chorizo",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Pork",
  },

  // =====================================================
  // OTHER MANUAL SUPPLIERS
  // =====================================================

  {
    id: "bigk-charcoal",
    ingredient: "Restaurant charcoal",
    supplier: "Big K Charcoal",
    supplierProduct: "Restaurant Charcoal 15kg",
    unit: "bag",
    fallbackPrice: 16,
    preferred: true,
    category: "Non Food",
  },

  {
    id: "albion-miso",
    ingredient: "Miso",
    supplier: "Albion Fine Foods",
    supplierProduct: "Miso Paste",
    unit: "kg",
    fallbackPrice: null,
    category: "Japanese",
  },

  // James Knight is retained as a backup fish supplier.
  {
    id: "james-knight-trout",
    ingredient: "Trout",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Trout",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "james-knight-stonebass",
    ingredient: "Stonebass",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Stonebass",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
];
