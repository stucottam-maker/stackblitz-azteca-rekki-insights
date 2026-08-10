export type CatalogueItem = {
  id?: string;
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
    ingredient: "Cod whole filleted",
    supplier: "Fin and Flounder",
    supplierProduct: "Cod Whole 4-7kg Filleted",
    unit: "kg",
    fallbackPrice: 11.95,
  },
  {
    ingredient: "Black cod",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Black Cod 2-3kg Head Off",
    unit: "kg",
    fallbackPrice: 25.9,
  },
  {
    ingredient: "26/30 prawn",
    supplier: "Fin and Flounder",
    supplierProduct: "Frozen Raw Peeled Deveined Prawn 26/30 - 1kg Bag",
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
  {
    id: "fin-stonebass-fillet",
    ingredient: "Stonebass",
    supplier: "Fin and Flounder",
    supplierProduct: "Stone Bass Fillet",
    unit: "kg",
    fallbackPrice: 13.8,
    preferred: true,
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
  {
    ingredient: "Ox cheek",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Ox Cheek",
    unit: "kg",
    fallbackPrice: null,
  },
  {
    ingredient: "Brisket",
    supplier: "Crazy Dan's House of Meat",
    supplierProduct: "Brisket",
    unit: "kg",
    fallbackPrice: null,
  },

  // MEXGROCER
  {
    ingredient: "Aji Amarillo",
    supplier: "Mexgrocer",
    supplierProduct: "Goya Aji Amarillo Yellow Hot Pepper Paste 213g",
    unit: "each",
    fallbackPrice: null,
  },
  {
    ingredient: "Agave syrup",
    supplier: "Mexgrocer",
    supplierProduct: "Agave Syrup 25kg",
    unit: "each",
    fallbackPrice: null,
  },
  {
    ingredient: "Abuelita chocolate",
    supplier: "Mexgrocer",
    supplierProduct: "Abuelita Chocolate 540g",
    unit: "each",
    fallbackPrice: null,
  },

  // MASAFINA
  {
    ingredient: "Masafina tortilla 12cm",
    supplier: "Masafina",
    supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)",
    unit: "case",
    fallbackPrice: 36.95,
  },
  {
    ingredient: "Masafina tortilla 10cm",
    supplier: "Masafina",
    supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)",
    unit: "case",
    fallbackPrice: 35.95,
  },
  {
    ingredient: "Masafina purple tortilla 12cm",
    supplier: "Masafina",
    supplierProduct: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)",
    unit: "case",
    fallbackPrice: 39.95,
  },
  {
    ingredient: "Masafina tortilla 15cm",
    supplier: "Masafina",
    supplierProduct: "Case of 15cm Heirloom Corn Tortillas (5 x 1kg)",
    unit: "case",
    fallbackPrice: 34.95,
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
  {
    ingredient: "Avocado",
    supplier: "Albion Fine Foods",
    supplierProduct: "Avocado Ready to Eat",
    unit: "each",
    fallbackPrice: 0.89,
  },
  {
    ingredient: "Pink potatoes",
    supplier: "Albion Fine Foods",
    supplierProduct: "Potatoes - Pink",
    unit: "kg",
    fallbackPrice: 3.39,
  },
  {
    ingredient: "Corn on the cob",
    supplier: "Albion Fine Foods",
    supplierProduct: "Raw Fresh Corn on Cob - Case of 24",
    unit: "case",
    fallbackPrice: 27.5,
  },
  {
    ingredient: "Hispi cabbage",
    supplier: "Albion Fine Foods",
    supplierProduct: "Cabbage Hispi",
    unit: "each",
    fallbackPrice: 1.81,
  },
  {
    ingredient: "Red amaranth",
    supplier: "Albion Fine Foods",
    supplierProduct: "Micro Red Amaranth Punnet 25g",
    unit: "punnet",
    fallbackPrice: 2.55,
  },
  {
    ingredient: "Lemon balm",
    supplier: "Albion Fine Foods",
    supplierProduct: "Micro Lemon Balm Punnet 30g",
    unit: "punnet",
    fallbackPrice: 2.55,
  },
  {
    ingredient: "Limes",
    supplier: "Albion Fine Foods",
    supplierProduct: "Limes",
    unit: "case",
    fallbackPrice: 3.24,
  },
  {
    ingredient: "Butternut squash",
    supplier: "Albion Fine Foods",
    supplierProduct: "Butternut Squash per kg",
    unit: "kg",
    fallbackPrice: 1.95,
  },
  {
    ingredient: "Aubergine",
    supplier: "Albion Fine Foods",
    supplierProduct: "Aubergines",
    unit: "case",
    fallbackPrice: 4.7,
  },
  {
    ingredient: "Butter",
    supplier: "Albion Fine Foods",
    supplierProduct: "Red Lakeland Unsalted Butter 250g",
    unit: "each",
    fallbackPrice: 1.79,
  },
  {
    ingredient: "Dishwasher chemical",
    supplier: "Albion Fine Foods",
    supplierProduct: "Machine DishWash 5ltr",
    unit: "each",
    fallbackPrice: 6.39,
  },
  {
    ingredient: "Nitrile gloves large",
    supplier: "Albion Fine Foods",
    supplierProduct: "Gloves Black Nitrile Large x100",
    unit: "box",
    fallbackPrice: 7.77,
  },

  // WOODS FINE FOODS
  {
    ingredient: "Peach halves in syrup",
    supplier: "Woods Fine Foods",
    supplierProduct: "Fontinella Peach Halves in Syrup 2.65kg",
    unit: "each",
    fallbackPrice: 6.22,
  },
  {
    ingredient: "Piquillo peppers",
    supplier: "Woods Fine Foods",
    supplierProduct: "Pimientos Piquillo Red Peppers 2.5kg",
    unit: "each",
    fallbackPrice: 8.61,
  },
  {
    ingredient: "Garlic sauce",
    supplier: "Woods Fine Foods",
    supplierProduct: "Garlic Sauce 386g",
    unit: "each",
    fallbackPrice: 2.51,
  },
  {
    ingredient: "Desiccated coconut",
    supplier: "Woods Fine Foods",
    supplierProduct: "Coconut Fine Desiccated 1kg",
    unit: "kg",
    fallbackPrice: 6.85,
  },
  {
    ingredient: "Chipotle in adobo",
    supplier: "Woods Fine Foods",
    supplierProduct: "San Marcos Chipotle Peppers in Adobo 2.8kg",
    unit: "each",
    fallbackPrice: 12.75,
  },
  {
    ingredient: "Blue corn tortilla 15cm",
    supplier: "Woods Fine Foods",
    supplierProduct: "Soft Blue Corn Tortillas 15cm (6 inch), 24 pack",
    unit: "pack",
    fallbackPrice: 18.19,
  },
  {
    ingredient: "Coriander",
    supplier: "Woods Fine Foods",
    supplierProduct: "Coriander 100g Bunch",
    unit: "bunch",
    fallbackPrice: 1.41,
  },
  {
    ingredient: "Avocado",
    supplier: "Woods Fine Foods",
    supplierProduct: "Avocado Hass Ready to Eat - 18",
    unit: "case",
    fallbackPrice: 24.17,
  },
  {
    ingredient: "Viola flowers",
    supplier: "Woods Fine Foods",
    supplierProduct: "Viola Flowers 4g Punnet",
    unit: "punnet",
    fallbackPrice: 2.46,
  },
  {
    ingredient: "Prepared chipped potato",
    supplier: "Woods Fine Foods",
    supplierProduct: "Peeled Chipped Potato 1kg",
    unit: "kg",
    fallbackPrice: 3.79,
  },
  {
    ingredient: "Vegan mayonnaise",
    supplier: "Woods Fine Foods",
    supplierProduct: "Hellmann's Vegan Mayonnaise 5L",
    unit: "each",
    fallbackPrice: 22.13,
  },

  // SPITALFIELDS FRUIT & VEG
  {
    ingredient: "Double cream",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Double Cream 1/2 Gallon",
    unit: "each",
    fallbackPrice: 11.85,
  },
  {
    ingredient: "Japanese aubergine",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Japanese Aubergines",
    unit: "kg",
    fallbackPrice: 4.03,
  },
  {
    ingredient: "Banana",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Banana",
    unit: "kg",
    fallbackPrice: 1.75,
  },
  {
    ingredient: "Baby corn",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Baby Corn",
    unit: "pack",
    fallbackPrice: 1.42,
  },
  {
    ingredient: "Spring onion",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Spring Onions",
    unit: "each",
    fallbackPrice: 0.45,
  },
  {
    ingredient: "Chives",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Loose Bunch Chives 50g",
    unit: "bunch",
    fallbackPrice: 1.24,
  },
  {
    ingredient: "Chervil",
    supplier: "Spitalfields Fruit & Veg",
    supplierProduct: "Loose Bunch Chervil 100g",
    unit: "bunch",
    fallbackPrice: 1.01,
  },

  // OUI CHEF
  {
    id: "oui-chef-placeholder",
    ingredient: "Oui Chef placeholder",
    supplier: "Oui Chef",
    supplierProduct: "Supplier catalogue pending",
    unit: "each",
    fallbackPrice: null,
  },

  // JAMES KNIGHT OF MAYFAIR
  {

    id: "james-knight-trout",
    ingredient: "Trout",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Trout",
    unit: "kg",
    fallbackPrice: null,
  
  },
  { 
    id: "james-knight-stonebass",
    ingredient: "Stonebass",
    supplier: "James Knight of Mayfair",
    supplierProduct: "Stonebass",
    unit: "kg",
    fallbackPrice: null,
    preferred: false,
  
  },
];
