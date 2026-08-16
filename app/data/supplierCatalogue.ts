// Imports
import { woodsCatalogueItems } from "./woodsCatalogue";
import { mexgrocerCatalogue } from "./mexgrocerCatalogue";
import { ouiChefCatalogueItems } from "./ouiChefCatalogue";
import { masafinaCatalogueItems } from "./masafinaCatalogue";
import { raynorCatalogueItems } from "./raynorCatalogue";


// Types
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


// Helpers
function normalizeProductName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}


// Supplier catalogue

export const supplierCatalogue: CatalogueItem[] = [

  // Existing manually built suppliers
  // Fin & Flounder
  // James Knight
  // Crazy Dan
  // Albion
  // Tazaki
  // Big K
  // Spitalfields


  // Mexgrocer
  ...mexgrocerCatalogue.map((product) => ({
    id: `mex-${product.itemId ?? normalizeProductName(product.title)}`,
    ingredient: product.title,
    supplier: "Mexgrocer",
    supplierProduct: product.title,
    unit: "each",
    fallbackPrice: product.price ?? null,
    category: product.categorySlug ?? "Mexican",
    preferred: false,
  })),


  // Woods
  ...woodsCatalogueItems,


  // Oui Chef
  ...ouiChefCatalogueItems,


  // Masafina tortillas
  ...masafinaCatalogueItems,


  // Raynor
  ...raynorCatalogueItems,


];
