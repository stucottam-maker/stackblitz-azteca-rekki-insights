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
  // MANUAL SUPPLIERS
  // =====================================================


  {
    id:"fin-trout",
    ingredient:"Trout",
    supplier:"Fin and Flounder",
    supplierProduct:"Trout Chalk Stream Whole",
    unit:"kg",
    fallbackPrice:12.5,
    preferred:true,
    category:"Fish",
  },


  {
    id:"crazy-ribeye",
    ingredient:"Ribeye",
    supplier:"Crazy Dan's House of Meat",
    supplierProduct:"Ribeye steak",
    unit:"kg",
    fallbackPrice:null,
    preferred:true,
    category:"Beef",
  },


  {
    id:"bigk-charcoal",
    ingredient:"Restaurant charcoal",
    supplier:"Big K Charcoal",
    supplierProduct:"Restaurant Charcoal 15kg",
    unit:"bag",
    fallbackPrice:16,
    preferred:true,
    category:"Non Food",
  },


  {
    id:"albion-miso",
    ingredient:"Miso",
    supplier:"Albion Fine Foods",
    supplierProduct:"Miso Paste",
    unit:"kg",
    fallbackPrice:null,
    category:"Japanese",
  },


];
