import { woodsCatalogueItems } from "./woodsCatalogue";
import { mexgrocerCatalogue } from "./mexgrocerCatalogue";
import { ouiChefCatalogueItems } from "./ouiChefCatalogue";
import { masafinaCatalogueItems } from "./masafinaCatalogue";
import { raynorCatalogueItems } from "./raynorCatalogue";
function normalizeProductName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isPreferredMexgrocerProduct(title: string) {
  const name = normalizeProductName(title);

  return [
    // EL Yucateco - Achiote Paste 1kg
    name.includes("el yucateco") &&
      name.includes("achiote") &&
      name.includes("1kg"),

    // La Costena - Chipotle in Adobo 2.8kg
    name.includes("la costena") &&
      name.includes("chipotle") &&
      name.includes("adobo") &&
      name.includes("2 8kg"),

    // Dried Black Beans 25kg
    name.includes("dried black beans") &&
      name.includes("25kg"),

    // Tajin - Ancho Chilli 75g
    name.includes("tajin") &&
      name.includes("ancho") &&
      name.includes("75g"),

    // Choco has 26kg, public catalogue currently has 25kg
    name.includes("agave syrup") &&
      (name.includes("25kg") ||
        name.includes("26kg")),

    // Abuelita Chocolate 540g
    name.includes("abuelita") &&
      name.includes("chocolate") &&
      name.includes("540g"),

    // Chatica Dulce de Leche
    name.includes("chatica") &&
      name.includes("dulce de leche") &&
      name.includes("450g"),

    // Azteca Mole Rojo 5kg
    name.includes("mole rojo") &&
      name.includes("5kg"),

    // Ancho chilli
    name.includes("ancho") &&
      name.includes("whole dried") &&
      name.includes("1kg"),

    // Goya Aji Amarillo
    name.includes("aji amarillo") &&
      name.includes("paste"),

    // Avocado leaf powder
    name.includes("avocado leaf powder") &&
      name.includes("1kg"),

    // Morita powder
    name.includes("morita") &&
      name.includes("powder") &&
      name.includes("100g"),

    // Habanero whole
    name.includes("habanero") &&
      name.includes("whole dried") &&
      name.includes("1kg"),

    // Jalapeno whole
    name.includes("jalapeno") &&
      name.includes("whole dried") &&
      name.includes("1kg"),

    // Morita whole
    name.includes("morita") &&
      name.includes("whole dried") &&
      name.includes("1kg"),

    // Tajin Pasilla
    name.includes("tajin") &&
      name.includes("pasilla") &&
      name.includes("75g"),

    // Arbol chilli
    name.includes("arbol") &&
      name.includes("whole dried") &&
      name.includes("1kg"),

    // La Fonda cactus pouch
    name.includes("la fonda") &&
      name.includes("cactus") &&
      name.includes("whole leaves") &&
      name.includes("pouch"),

    // Choco's "La fonda tradicional tortillas 15"
    // Closest catering catalogue item
    name.includes("la fonda ls tradicional corn tortilla") &&
      name.includes("case"),

    // Dona Maria brown mole
    name.includes("dona maria") &&
      name.includes("mole brown"),

    // Choco Mexican oregano — restaurant-size catalogue option
    name.includes("terana oregano") &&
      name.includes("400g"),
  ].some(Boolean);
}
export type CatalogueItem = {
  id: string;
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  unit: string;
  fallbackPrice: number | null;
  preferred?: boolean;
  category?: string;

  // Optional supplier-product metadata.
  // Currently used mainly by Woods Foodservice.
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
  {
    name: "Fin and Flounder",
  },
  {
    name: "James Knight of Mayfair",
  },
  {
    name: "Crazy Dan's House of Meat",
  },
  {
    name: "Mexgrocer",
  },
  {
    name: "Woods Foodservice",
  },
  {
    name: "Oui Chef",
  },
  {
    name: "Albion Fine Foods",
  },
  {
    name: "Spitalfields Fruit & Veg",
  },
  {
    name: "Big K Charcoal",
  },
   {
    name: "Masafina",
  },
  {
    name: "Raynor Hygiene",
  },
  {
    name: "Tazaki Foods",
    email: "japanesesales@tazakifoods.com",
  },
];

export const supplierCatalogue: CatalogueItem[] = [
  // ============================================================
  // FIN AND FLOUNDER
  // ============================================================

  {
    id: "fin-trout-chalk-stream",
    ingredient: "Trout",
    supplier: "Fin and Flounder",
    supplierProduct: "Trout Chalk Stream - 2.5/3kg - Whole No Prep",
    unit: "kg",
    fallbackPrice: 12.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-cod-fillet",
    ingredient: "Cod",
    supplier: "Fin and Flounder",
    supplierProduct: "Cod Fillet",
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
    fallbackPrice: 25.9,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-stonebass",
    ingredient: "Stonebass",
    supplier: "Fin and Flounder",
    supplierProduct: "Stone Bass Fillet",
    unit: "kg",
    fallbackPrice: 13.8,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-tuna-loin",
    ingredient: "Tuna loin",
    supplier: "Fin and Flounder",
    supplierProduct: "Tuna Loin AAA - Line Caught",
    unit: "kg",
    fallbackPrice: 32.5,
    preferred: true,
    category: "Fish",
  },
  {
    id: "fin-bluefin-tuna",
    ingredient: "Bluefin tuna loin",
    supplier: "Fin and Flounder",
    supplierProduct: "Blue Fin Tuna Loin",
    unit: "kg",
    fallbackPrice: 34.95,
    preferred: false,
    category: "Fish",
  },
  {
    id: "fin-king-prawn",
    ingredient: "King prawn",
    supplier: "Fin and Flounder",
    supplierProduct: "King Prawn 10/20 pieces per kg",
    unit: "kg",
    fallbackPrice: 15.5,
    preferred: true,
    category: "Shellfish",
  },
  {
    id: "fin-prawn-26-30",
    ingredient: "26/30 prawn",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Raw Peel Deveined Prawn 26/30 - 1kg Bag",
    unit: "kg",
    fallbackPrice: 10.5,
    preferred: true,
    category: "Shellfish",
  },
  {
    id: "fin-squid",
    ingredient: "Squid",
    supplier: "Fin and Flounder",
    supplierProduct: "Squid 300/500g Cleaned",
    unit: "kg",
    fallbackPrice: 16.5,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "fin-baby-squid",
    ingredient: "Baby squid",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Chiperoni Baby Squid",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "fin-octopus",
    ingredient: "Octopus",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Octopus 3-4kg",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "fin-seabass",
    ingredient: "Sea bass",
    supplier: "Fin and Flounder",
    supplierProduct: "Seabass Wild 500/1000 Hook + Line",
    unit: "kg",
    fallbackPrice: 19.95,
    preferred: false,
    category: "Fish",
  },
  {
    id: "fin-hake",
    ingredient: "Hake",
    supplier: "Fin and Flounder",
    supplierProduct: "Hake 3/4kg Descale Fillet",
    unit: "kg",
    fallbackPrice: 13.95,
    preferred: false,
    category: "Fish",
  },

  // ============================================================
  // JAMES KNIGHT OF MAYFAIR
  // ============================================================

  {
    id: "jk-trout-chalk-stream",
    ingredient: "Trout",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Chalk Stream Trout XL Whole",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-trout-fillet",
    ingredient: "Trout",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Chalk Stream Trout Filleted",
    unit: "each",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-cod",
    ingredient: "Cod",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Cod Fillets Large",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-stonebass",
    ingredient: "Stonebass",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Stone Basse Filleted",
    unit: "each",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-tuna-yellowfin",
    ingredient: "Tuna loin",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Tuna Loin Fresh Yellowfin",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-tuna-sashimi",
    ingredient: "Tuna loin",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Tuna Loin Sashimi",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },
  {
    id: "jk-prawn-26-30",
    ingredient: "26/30 prawn",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Frozen Raw Peeled Blocks 26/30",
    unit: "each",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "jk-tiger-prawn-10-20",
    ingredient: "King prawn",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Frozen Tigers Prawns 10/20",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "jk-squid",
    ingredient: "Squid",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Frozen Squid Tubes U10",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "jk-octopus",
    ingredient: "Octopus",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Frozen Octopus/Polpi 3-4",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Shellfish",
  },
  {
    id: "jk-fish-bones",
    ingredient: "Fish bones",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Fish Bones",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fish",
  },

  // ============================================================
  // CRAZY DAN'S HOUSE OF MEAT
  // ============================================================

  {
    id: "crazy-ribeye",
    ingredient: "Ribeye",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Ribeye steak omugi",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-short-rib",
    ingredient: "Short rib",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Beef Ribs",
    unit: "kg",
    fallbackPrice: 8.5,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-brisket",
    ingredient: "Beef brisket",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "UK Beef brisket",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-ox-cheek",
    ingredient: "Ox cheek",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Ox cheeks",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-chicken-thigh-skin-off",
    ingredient: "Chicken thigh",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Skin off boneless chicken thighs",
    unit: "kg",
    fallbackPrice: null,
    preferred: true,
    category: "Chicken",
  },
  {
    id: "crazy-chicken-thigh-skin-on",
    ingredient: "Chicken thigh skin on",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Chicken thighs skin on",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Chicken",
  },
  {
    id: "crazy-whole-chicken",
    ingredient: "Whole chicken",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Whole corn fed chicken",
    unit: "each",
    fallbackPrice: null,
    preferred: true,
    category: "Chicken",
  },
  {
    id: "crazy-lamb-rack",
    ingredient: "Lamb rack",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Lamb Rack With Bones",
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
    unit: "each",
    fallbackPrice: null,
    preferred: false,
    category: "Lamb",
  },
  {
    id: "crazy-pork-belly",
    ingredient: "Pork belly",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Pork belly no ribs",
    unit: "each",
    fallbackPrice: 6,
    preferred: true,
    category: "Pork",
  },
  {
    id: "crazy-pork-skin",
    ingredient: "Pork skin",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Pork skin",
    unit: "kg",
    fallbackPrice: 2.2,
    preferred: true,
    category: "Pork",
  },
  {
    id: "crazy-pork-collar",
    ingredient: "Pork collar",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Pork collar 1cm steaks",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Pork",
  },
  {
    id: "crazy-tomahawk",
    ingredient: "Tomahawk",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Tomahawk Ribeye Large bone 1.2-1.3kg",
    unit: "each",
    fallbackPrice: null,
    preferred: true,
    category: "Beef",
  },
  {
    id: "crazy-chorizo",
    ingredient: "Chorizo",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Chorizo sausages",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Pork",
  },

   // ============================================================
  // MEXGROCER
  // 481 cleaned catalogue products
  // Choco order-guide items are preferred
  // ============================================================

  ...mexgrocerCatalogue
    .map((product) => {
      const preferred =
        isPreferredMexgrocerProduct(product.title);

      return {
        id: `mex-${
          product.itemId ??
          product.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
        }`,

        ingredient: product.title,

        supplier: "Mexgrocer",

        supplierProduct: product.title,

        unit: "each",

        fallbackPrice: product.price,

        preferred,

        category:
          product.categorySlug || "Mexican",
      };
    })
    .sort(
      (a, b) =>
        Number(b.preferred) -
        Number(a.preferred)
    ),


  // ============================================================
  // WOODS FOODSERVICE
  // Full 191-product Buy Again catalogue
  // ============================================================

  ...woodsCatalogueItems,

  // ============================================================
  // OUI CHEF
  // Full Choco order guide
  // ============================================================

  ...ouiChefCatalogueItems,
  
// ============================================================
// MASAFINA TORTILLAS
// ============================================================

...masafinaCatalogueItems,
  // ============================================================
  // ALBION FINE FOODS
  // ============================================================

  {
    id: "albion-miso",
    ingredient: "Miso",
    supplier: "Albion Fine Foods",
    supplierProduct: "Miso Paste",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "albion-mirin",
    ingredient: "Mirin",
    supplier: "Albion Fine Foods",
    supplierProduct: "Mirin",
    unit: "L",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "albion-rice-vinegar",
    ingredient: "Rice vinegar",
    supplier: "Albion Fine Foods",
    supplierProduct: "Rice Vinegar",
    unit: "L",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "albion-fish-sauce",
    ingredient: "Fish sauce",
    supplier: "Albion Fine Foods",
    supplierProduct: "Fish Sauce",
    unit: "L",
    fallbackPrice: null,
    preferred: true,
    category: "Sauces",
  },
  {
    id: "albion-rapeseed-oil",
    ingredient: "Rapeseed oil",
    supplier: "Albion Fine Foods",
    supplierProduct: "Rapeseed Oil",
    unit: "L",
    fallbackPrice: null,
    preferred: true,
    category: "Oil",
  },

  // ============================================================
  // TAZAKI FOODS
  // ============================================================

  {
    id: "tazaki-white-sesame",
    ingredient: "White sesame seeds",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Roasted White Sesame Seeds 1kg Bag",
    unit: "bag",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-black-sesame",
    ingredient: "Black sesame seeds",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Roasted Black Sesame Seeds 1kg Bag",
    unit: "bag",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-edamame-pods",
    ingredient: "Edamame pods",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Edamame Soybeans With Pods 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-edamame-shelled",
    ingredient: "Edamame beans",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Edamame Shelled Soybeans 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-kewpie",
    ingredient: "Kewpie mayonnaise",
    supplier: "Tazaki Foods",
    supplierProduct: "Kewpie Mayonnaise 450g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-sesame-oil",
    ingredient: "Sesame oil",
    supplier: "Tazaki Foods",
    supplierProduct: "Kadoya Sesame Oil Tin 1527g",
    unit: "tin",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-sesame-oil-blended",
    ingredient: "Sesame oil",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Blended Sesame Oil 1.8L Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-pure-sesame-oil",
    ingredient: "Sesame oil",
    supplier: "Tazaki Foods",
    supplierProduct: "Bo-Lan Pure Sesame Oil 5L Tub",
    unit: "tub",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-katsuobushi",
    ingredient: "Katsuobushi",
    supplier: "Tazaki Foods",
    supplierProduct: "Wadakyu Katsuobushi - Bonito Flakes Standard 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-wakame",
    ingredient: "Wakame",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Dried Wakame Seaweed 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-kombu",
    ingredient: "Kombu",
    supplier: "Tazaki Foods",
    supplierProduct: "Naya Kelp - Hakodate Ma Kombu 1st Grade 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-nori",
    ingredient: "Nori",
    supplier: "Tazaki Foods",
    supplierProduct: "Kofuku Nori Roasted Seaweed Yakinori B Full Size 100pc Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-gochujang",
    ingredient: "Gochujang",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Gochujang 500g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-miso",
    ingredient: "Miso",
    supplier: "Tazaki Foods",
    supplierProduct: "Hikari Shinshu Awase Miso 1kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-white-miso",
    ingredient: "White miso",
    supplier: "Tazaki Foods",
    supplierProduct: "Masuya Sweet White Miso 1kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-white-miso-bulk",
    ingredient: "White miso",
    supplier: "Tazaki Foods",
    supplierProduct: "Hikari White Miso 20kg Case",
    unit: "case",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-rice-vinegar",
    ingredient: "Rice vinegar",
    supplier: "Tazaki Foods",
    supplierProduct: "Mizkan Shiragiku Vinegar Case",
    unit: "case",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-suehiro-vinegar",
    ingredient: "Rice vinegar",
    supplier: "Tazaki Foods",
    supplierProduct: "Mizkan Suehiro Vinegar Case",
    unit: "case",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-mirin",
    ingredient: "Mirin",
    supplier: "Tazaki Foods",
    supplierProduct: "Mizkan Honteri Mirin - Sweet Seasoning 18L Case",
    unit: "case",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-soy-sauce",
    ingredient: "Soy sauce",
    supplier: "Tazaki Foods",
    supplierProduct: "Yamasa Standard Dark Soy Sauce Tokuyo 18L Bag in Box",
    unit: "case",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-low-salt-soy",
    ingredient: "Reduced salt soy sauce",
    supplier: "Tazaki Foods",
    supplierProduct: "Yamasa Less Salt Dark Soy Sauce Non GMO 18L Case",
    unit: "case",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-gf-soy",
    ingredient: "Gluten free soy sauce",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Gluten Free Reduced Salt Soy Sauce 5L Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-tamari",
    ingredient: "Tamari soy sauce",
    supplier: "Tazaki Foods",
    supplierProduct: "Tamari Soy Sauce",
    unit: "bottle",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-ponzu",
    ingredient: "Ponzu",
    supplier: "Tazaki Foods",
    supplierProduct: "Fukuizumi Ponzu - Citrus Sauce 1.8L Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-shichimi",
    ingredient: "Shichimi",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Chili Pepper - Shichimi 300g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-yuzu-kosho",
    ingredient: "Yuzu kosho",
    supplier: "Tazaki Foods",
    supplierProduct: "Mera Shokuhin Yuzu Kosho 50g Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-yuzu-seasoning",
    ingredient: "Yuzu juice",
    supplier: "Tazaki Foods",
    supplierProduct: "Mera Shokuhin Yuzu Seasoning 100% 1kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-yuzu-seasoning-salted",
    ingredient: "Yuzu seasoning",
    supplier: "Tazaki Foods",
    supplierProduct: "JA Yuzu Seasoning with Salt 1.8L Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-potato-starch",
    ingredient: "Potato flour",
    supplier: "Tazaki Foods",
    supplierProduct: "Kawamitsu Katakuri Ko - Potato Starch 400g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Dry Goods",
  },
  {
    id: "tazaki-cornflour",
    ingredient: "Cornflour",
    supplier: "Tazaki Foods",
    supplierProduct: "JJ Corn Flour 3kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Dry Goods",
  },
  {
    id: "tazaki-panko",
    ingredient: "Panko breadcrumbs",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Panko Bread Crumbs 1kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: true,
    category: "Dry Goods",
  },
  {
    id: "tazaki-tempura-mix",
    ingredient: "Tempura batter mix",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Tempura Batter Mix 18.1kg Bag",
    unit: "bag",
    fallbackPrice: null,
    preferred: false,
    category: "Dry Goods",
  },
  {
    id: "tazaki-wasabi",
    ingredient: "Wasabi",
    supplier: "Tazaki Foods",
    supplierProduct: "Yutaka Wasabi Paste 43g Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-wasabi-powder",
    ingredient: "Wasabi",
    supplier: "Tazaki Foods",
    supplierProduct: "Kinjirushi Kona Wasabits AR-1 Powdered Horseradish 1kg Packet",
    unit: "pack",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },
  {
    id: "tazaki-sake-junmai",
    ingredient: "Sake",
    supplier: "Tazaki Foods",
    supplierProduct: "Shochikubai Junmai Sake 18L 15% Case",
    unit: "case",
    fallbackPrice: null,
    preferred: true,
    category: "Japanese",
  },
  {
    id: "tazaki-sake-ginjo",
    ingredient: "Sake",
    supplier: "Tazaki Foods",
    supplierProduct: "Tosatsuru Azure Ginjo - Sake 720ml 15% Bottle",
    unit: "bottle",
    fallbackPrice: null,
    preferred: false,
    category: "Japanese",
  },

  // ============================================================
  // BIG K CHARCOAL
  // ============================================================

  {
    id: "bigk-binchotan",
    ingredient: "Binchotan charcoal",
    supplier: "Big K Charcoal",
    supplierProduct: "Binchotan Lumpwood Charcoal 10kg",
    unit: "box",
    fallbackPrice: 17,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "bigk-briquette",
    ingredient: "Charcoal briquettes",
    supplier: "Big K Charcoal",
    supplierProduct: "Restaurant Charcoal Briquette FSC 100% 10kg",
    unit: "bag",
    fallbackPrice: 15.5,
    preferred: false,
    category: "Non-Food",
  },
  {
    id: "bigk-restaurant-charcoal",
    ingredient: "Restaurant charcoal",
    supplier: "Big K Charcoal",
    supplierProduct: "Restaurant Charcoal 15kg",
    unit: "bag",
    fallbackPrice: 16,
    preferred: true,
    category: "Non-Food",
  },

  // ============================================================
  // RAYNOR HYGIENE
  // ============================================================

  {
    id: "raynor-dishwash-detergent",
    ingredient: "Dishwasher detergent",
    supplier: "Raynor Hygiene",
    supplierProduct: "Machine Dishwash Detergent - Hard Water 2 x 5L",
    unit: "pack",
    fallbackPrice: 11.85,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-rinse-aid",
    ingredient: "Dishwasher rinse aid",
    supplier: "Raynor Hygiene",
    supplierProduct: "Dishmachine Rinse Aid 2 x 5L",
    unit: "pack",
    fallbackPrice: 10.85,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-glasswash-detergent",
    ingredient: "Glasswasher detergent",
    supplier: "Raynor Hygiene",
    supplierProduct: "Machine Glasswash Detergent Non-Caustic 2 x 5L",
    unit: "pack",
    fallbackPrice: 11.85,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-glass-rinse-aid",
    ingredient: "Glasswasher rinse aid",
    supplier: "Raynor Hygiene",
    supplierProduct: "Glassmachine Rinse Aid 2 x 5L",
    unit: "pack",
    fallbackPrice: 10.85,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-salt",
    ingredient: "Dishwasher salt",
    supplier: "Raynor Hygiene",
    supplierProduct: "Salt - Granular 25kg",
    unit: "unit",
    fallbackPrice: 11.9,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-salt-tablets",
    ingredient: "Dishwasher salt tablets",
    supplier: "Raynor Hygiene",
    supplierProduct: "Salt Tablets 25kg",
    unit: "unit",
    fallbackPrice: 12.9,
    preferred: false,
    category: "Cleaning",
  },
  {
    id: "raynor-sanitiser",
    ingredient: "Surface sanitiser",
    supplier: "Raynor Hygiene",
    supplierProduct: "Surface Sanitiser En1276 Sachet 10 x 750ml",
    unit: "packet",
    fallbackPrice: 9.95,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-degreaser",
    ingredient: "Degreaser",
    supplier: "Raynor Hygiene",
    supplierProduct: "Heavy Duty Degreaser Sachet x10",
    unit: "packet",
    fallbackPrice: 14.95,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-oven-cleaner",
    ingredient: "Oven cleaner",
    supplier: "Raynor Hygiene",
    supplierProduct: "Oven Cleaner - Heavy Duty 2 x 5L",
    unit: "packet",
    fallbackPrice: 9.65,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-descaler",
    ingredient: "Descaler",
    supplier: "Raynor Hygiene",
    supplierProduct: "Descaler 2 x 5L",
    unit: "packet",
    fallbackPrice: 18.95,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-washing-up-liquid",
    ingredient: "Washing up liquid",
    supplier: "Raynor Hygiene",
    supplierProduct: "Manual Detergent Concentrated Washing Up Detergent 2 x 5L",
    unit: "pack",
    fallbackPrice: 8.95,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-cling-film-450",
    ingredient: "Cling film 450mm",
    supplier: "Raynor Hygiene",
    supplierProduct: 'Cling Film Cutter Box 18" 450mm',
    unit: "box",
    fallbackPrice: 5.95,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-cling-refill",
    ingredient: "Cling film refill 450mm",
    supplier: "Raynor Hygiene",
    supplierProduct: "Speedwrap Cling Film Refills 450mm x3",
    unit: "pack",
    fallbackPrice: 25.95,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-foil",
    ingredient: "Catering foil",
    supplier: "Raynor Hygiene",
    supplierProduct: 'Catering Foil Cutter 18" 450mm',
    unit: "box",
    fallbackPrice: 6.85,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-vacuum-150",
    ingredient: "Vacuum pouch 150x200",
    supplier: "Raynor Hygiene",
    supplierProduct: "Vacuum Pouch 150x200 x1000",
    unit: "pack",
    fallbackPrice: 37.29,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-vacuum-200",
    ingredient: "Vacuum pouch 200x300",
    supplier: "Raynor Hygiene",
    supplierProduct: "Vacuum Pouch 200x300 x1000",
    unit: "pack",
    fallbackPrice: 66.9,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-food-labels",
    ingredient: "Food labels",
    supplier: "Raynor Hygiene",
    supplierProduct: "Food Information Labels 1x500",
    unit: "unit",
    fallbackPrice: 4.85,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-day-dots",
    ingredient: "Day dots",
    supplier: "Raynor Hygiene",
    supplierProduct: "Day Dots Monday - Sunday",
    unit: "roll",
    fallbackPrice: 1.35,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-parchment",
    ingredient: "Baking parchment",
    supplier: "Raynor Hygiene",
    supplierProduct: "Baking Parchment - Compostable & Biodegradable",
    unit: "box",
    fallbackPrice: 4.9,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-blue-roll",
    ingredient: "Blue roll",
    supplier: "Raynor Hygiene",
    supplierProduct: "Embossed Blue Centrefeed Roll",
    unit: "pack",
    fallbackPrice: 9.75,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-jcloth",
    ingredient: "J cloth",
    supplier: "Raynor Hygiene",
    supplierProduct: "J-Cloth Biodegradable & Compostable Green Microfibre Black x50",
    unit: "unit",
    fallbackPrice: 8.89,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-microfibre-black",
    ingredient: "Microfibre cloth black",
    supplier: "Raynor Hygiene",
    supplierProduct: "Microfibre Black Cloth 40x40cm x10",
    unit: "pack",
    fallbackPrice: 6.95,
    preferred: true,
    category: "Non-Food",
  },
  {
    id: "raynor-handsoap",
    ingredient: "Hand soap",
    supplier: "Raynor Hygiene",
    supplierProduct: "Bactericidal Handsoap 5L",
    unit: "unit",
    fallbackPrice: 7.45,
    preferred: true,
    category: "Cleaning",
  },
  {
    id: "raynor-butane",
    ingredient: "Butane gas",
    supplier: "Raynor Hygiene",
    supplierProduct: "Butane Gas 8oz",
    unit: "unit",
    fallbackPrice: 4.95,
    preferred: true,
    category: "Non-Food",
  },

  // ============================================================
  // SPITALFIELDS FRUIT & VEG
  // ============================================================

  {
    id: "spitalfields-lime",
    ingredient: "Lime",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Limes",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fruit & Veg",
  },
  {
    id: "spitalfields-avocado",
    ingredient: "Avocado",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Hass Avocado",
    unit: "box",
    fallbackPrice: null,
    preferred: false,
    category: "Fruit & Veg",
  },
  {
    id: "spitalfields-onion",
    ingredient: "Red onion",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Red Onion",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fruit & Veg",
  },
  {
    id: "spitalfields-garlic",
    ingredient: "Garlic",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Garlic",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
    category: "Fruit & Veg",
  },
  {
    id: "spitalfields-coriander",
    ingredient: "Coriander",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Coriander",
    unit: "bunch",
    fallbackPrice: null,
    preferred: false,
    category: "Fruit & Veg",
  },
];
