export type CatalogueItem = {
    ingredient: string;
    supplier: string;
    supplierProduct: string;
    unit: string;
    fallbackPrice: number | null;
  };
  
  export const supplierCatalogue: CatalogueItem[] = [
    // FIN AND FLOUNDER
    {
      ingredient: "Cod",
      supplier: "Fin and Flounder",
      supplierProduct: "Cod Fillet",
      unit: "kg",
      fallbackPrice: 24.95,
    },
    {
      ingredient: "Black cod",
      supplier: "Fin and Flounder",
      supplierProduct: "Frozen Black Cod",
      unit: "kg",
      fallbackPrice: 24.5,
    },
    {
      ingredient: "26/30 prawn",
      supplier: "Fin and Flounder",
      supplierProduct: "Raw Peeled Deveined Prawn 26/30",
      unit: "kg",
      fallbackPrice: 10.5,
    },
    {
      ingredient: "King prawn",
      supplier: "Fin and Flounder",
      supplierProduct: "King Prawn 10/20",
      unit: "kg",
      fallbackPrice: 15.5,
    },
    {
      ingredient: "Tuna loin",
      supplier: "Fin and Flounder",
      supplierProduct: "Tuna Loin AAA",
      unit: "kg",
      fallbackPrice: 32.5,
    },
  
    // CRAZY DAN'S HOUSE OF MEAT
    {
      ingredient: "Ribeye",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Ribeye",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Short rib",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Longhorn Short Rib",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Pork belly",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Pork Belly",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Chicken thigh",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Chicken Thigh",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Birria beef",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Beef for Birria",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Carnitas pork",
      supplier: "Crazy Dan's House of Meat",
      supplierProduct: "Pork for Carnitas",
      unit: "kg",
      fallbackPrice: null,
    },
  
    // MEXGROCER
    {
      ingredient: "Masafina tortilla 12cm",
      supplier: "Mexgrocer",
      supplierProduct: "Masafina Corn Tortilla 12cm",
      unit: "each",
      fallbackPrice: null,
    },
    {
      ingredient: "Masafina tortilla 10cm",
      supplier: "Mexgrocer",
      supplierProduct: "Masafina Corn Tortilla 10cm",
      unit: "each",
      fallbackPrice: null,
    },
    {
      ingredient: "Masafina blue corn tortilla 12cm",
      supplier: "Mexgrocer",
      supplierProduct: "Masafina Blue Corn Tortilla 12cm",
      unit: "each",
      fallbackPrice: null,
    },
    {
      ingredient: "Aji Amarillo",
      supplier: "Mexgrocer",
      supplierProduct: "Aji Amarillo Paste",
      unit: "kg",
      fallbackPrice: null,
    },
  
    // ALBION FINE FOODS
    {
      ingredient: "Miso",
      supplier: "Albion Fine Foods",
      supplierProduct: "Miso Paste",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Mirin",
      supplier: "Albion Fine Foods",
      supplierProduct: "Mirin",
      unit: "L",
      fallbackPrice: null,
    },
    {
      ingredient: "Rice vinegar",
      supplier: "Albion Fine Foods",
      supplierProduct: "Rice Vinegar",
      unit: "L",
      fallbackPrice: null,
    },
    {
      ingredient: "Fish sauce",
      supplier: "Albion Fine Foods",
      supplierProduct: "Fish Sauce",
      unit: "L",
      fallbackPrice: null,
    },
    {
      ingredient: "Rapeseed oil",
      supplier: "Albion Fine Foods",
      supplierProduct: "Rapeseed Oil",
      unit: "L",
      fallbackPrice: null,
    },
  
    // JAMES KNIGHT OF MAYFAIR
    {
      ingredient: "Trout",
      supplier: "James Knight of Mayfair",
      supplierProduct: "Trout",
      unit: "kg",
      fallbackPrice: null,
    },
    {
      ingredient: "Stonebass",
      supplier: "James Knight of Mayfair",
      supplierProduct: "Stonebass",
      unit: "kg",
      fallbackPrice: null,
    },
  ];