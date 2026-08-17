export type ObservedInvoiceItem = {
  ingredient: string;
  supplierProduct: string;
  quantity: number;
  unit: string;
  unitPrice?: number;
};

export type ObservedInvoiceOrder = {
  supplier: string;
  invoiceDate: string;
  invoiceNumber?: string;
  documentType?: "invoice" | "packing_slip" | "delivery_note";
  documentSubtotal?: number;
  documentVat?: number;
  documentTotal?: number;
  estimatedTotal?: boolean;
  items: ObservedInvoiceItem[];
};

export type ObservedOrderMeta = {
  lastOrdered: string;
  lastOrderedQty: number;
  unit: string;
};

// Seed history transcribed from supplied invoices and delivery notes.
// It provides real purchasing history immediately while the relational
// invoice tables continue to become the long-term source of truth.
export const observedInvoiceOrders: ObservedInvoiceOrder[] = [
  // =====================================================
  // SPITALFIELDS FRUIT & VEG
  // =====================================================
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-08-06",
    invoiceNumber: "73727",
    documentSubtotal: 98.66,
    documentVat: 13.5,
    documentTotal: 112.16,
    items: [
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 1, unit: "case (6 x 1L)", unitPrice: 40.5 },
      { ingredient: "Limes", supplierProduct: "Limes", quantity: 1, unit: "1x54 box", unitPrice: 10.5 },
      { ingredient: "Passion fruit", supplierProduct: "Passion Fruit", quantity: 10, unit: "each", unitPrice: 0.7 },
      { ingredient: "Cucumber", supplierProduct: "Cucumber", quantity: 5, unit: "each", unitPrice: 1.12 },
      { ingredient: "Orange", supplierProduct: "Oranges Medium", quantity: 5, unit: "each", unitPrice: 0.32 },
      { ingredient: "Mint", supplierProduct: "Loose Bunch Mint", quantity: 1, unit: "150g bunch", unitPrice: 1.01 },
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 4, unit: "1L each", unitPrice: 6.75 },
      { ingredient: "Viola flower", supplierProduct: "Viola Flower", quantity: 1, unit: "30g", unitPrice: 5.45 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-08-01",
    invoiceNumber: "73671",
    documentSubtotal: 305.62,
    documentVat: 2.7,
    documentTotal: 308.32,
    items: [
      { ingredient: "Avocado", supplierProduct: "Avocado (Ready to Eat)", quantity: 4, unit: "1x18 box", unitPrice: 20.8 },
      { ingredient: "Limes", supplierProduct: "Limes", quantity: 1, unit: "1x54 box", unitPrice: 10.5 },
      { ingredient: "Aubergine", supplierProduct: "Aubergines", quantity: 2, unit: "1x5kg box", unitPrice: 12.8 },
      { ingredient: "Pink fur potato", supplierProduct: "Pink Fur Potato", quantity: 2, unit: "bag", unitPrice: 24.3 },
      { ingredient: "Micro red amaranth", supplierProduct: "Micro Cress Red Amaranth", quantity: 5, unit: "30g", unitPrice: 2.7 },
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 2, unit: "1L each", unitPrice: 6.75 },
      { ingredient: "Shiso leaf", supplierProduct: "Shiso Leaf", quantity: 2, unit: "bunch", unitPrice: 9.3 },
      { ingredient: "Mouli", supplierProduct: "Mouli (By The Each)", quantity: 2, unit: "each", unitPrice: 2.07 },
      { ingredient: "Micro coriander", supplierProduct: "Micro Cress Coriander", quantity: 5, unit: "each", unitPrice: 2.7 },
      { ingredient: "Lemon balm", supplierProduct: "Bch Lemon Balm", quantity: 5, unit: "bunch", unitPrice: 2.7 },
      { ingredient: "Coriander", supplierProduct: "Coriander (Iced-Box)", quantity: 3, unit: "140g", unitPrice: 1.24 },
      { ingredient: "Pea shoot micro cress", supplierProduct: "Pea-Shoot Micro Cress", quantity: 1, unit: "packet", unitPrice: 3.96 },
      { ingredient: "Sweet potato", supplierProduct: "Sweet Pots (Orange Flesh)", quantity: 5, unit: "kg", unitPrice: 2.05 },
      { ingredient: "Corn on the cob", supplierProduct: "Corn on Cob Fresh", quantity: 20, unit: "each", unitPrice: 1.1 },
      { ingredient: "Hispi cabbage", supplierProduct: "Sugar Loaf (Hispy)", quantity: 10, unit: "each", unitPrice: 1.56 },
      { ingredient: "Viola flower", supplierProduct: "Viola Flower", quantity: 1, unit: "30g", unitPrice: 5.45 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-08-01",
    invoiceNumber: "73673",
    documentSubtotal: 16.5,
    documentVat: 0,
    documentTotal: 16.5,
    items: [
      { ingredient: "Grated mozzarella", supplierProduct: "Grated Mozzarella Cheese", quantity: 1, unit: "pack", unitPrice: 16.5 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-18",
    invoiceNumber: "73476",
    documentSubtotal: 18.6,
    documentVat: 0,
    documentTotal: 18.6,
    items: [
      { ingredient: "New mid potatoes", supplierProduct: "New Mid Potatoes", quantity: 1, unit: "10kg box", unitPrice: 12 },
      { ingredient: "New mid potatoes", supplierProduct: "New Mid Potatoes", quantity: 5, unit: "kg", unitPrice: 1.32 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-15",
    invoiceNumber: "73418",
    documentSubtotal: 4.77,
    documentVat: 0,
    documentTotal: 4.77,
    items: [
      { ingredient: "Black seedless grapes", supplierProduct: "Black Seedless Grape", quantity: 1, unit: "kg", unitPrice: 4.77 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-15",
    invoiceNumber: "73419",
    documentSubtotal: 6.46,
    documentVat: 0,
    documentTotal: 6.46,
    items: [
      { ingredient: "Pak choi", supplierProduct: "Pakboc Choi", quantity: 1, unit: "kg", unitPrice: 6.46 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-15",
    invoiceNumber: "73424",
    documentSubtotal: 33.02,
    documentVat: 0,
    documentTotal: 33.02,
    items: [
      { ingredient: "Double cream", supplierProduct: "Double Cream 1/2 Gallon", quantity: 1, unit: "1/2 gallon", unitPrice: 11.85 },
      { ingredient: "Japanese aubergine", supplierProduct: "Japanese Aubergines", quantity: 2, unit: "kg", unitPrice: 4.03 },
      { ingredient: "Banana", supplierProduct: "Banana", quantity: 3, unit: "kg", unitPrice: 1.75 },
      { ingredient: "Baby corn", supplierProduct: "Baby Corn", quantity: 3, unit: "packet", unitPrice: 1.42 },
      { ingredient: "Spring onions", supplierProduct: "Spring Onions", quantity: 3, unit: "each", unitPrice: 0.45 },
      { ingredient: "Chives", supplierProduct: "Loose Bunch Chives 50g", quantity: 1, unit: "50g", unitPrice: 1.24 },
      { ingredient: "Chervil", supplierProduct: "Loose Bunch Chervil 100g", quantity: 1, unit: "100g", unitPrice: 1.01 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-10",
    invoiceNumber: "73345",
    documentSubtotal: 72.9,
    documentVat: 0,
    documentTotal: 72.9,
    items: [
      { ingredient: "Pink fur potato", supplierProduct: "Pink Fur Potato", quantity: 3, unit: "bag", unitPrice: 24.3 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-06-29",
    invoiceNumber: "73197",
    documentSubtotal: 54.07,
    documentVat: 5.4,
    documentTotal: 59.47,
    items: [
      { ingredient: "Birdseye red chilli", supplierProduct: "Thai (Birdseye) Red Chillie", quantity: 0.5, unit: "kg", unitPrice: 13.43 },
      { ingredient: "Peeled garlic", supplierProduct: "Peeled Garlic 1kg", quantity: 1, unit: "1kg", unitPrice: 4.95 },
      { ingredient: "Dutch radish", supplierProduct: "Fresh Dutch Radish", quantity: 1, unit: "bunch", unitPrice: 1.03 },
      { ingredient: "Viola flower", supplierProduct: "Viola Flower", quantity: 1, unit: "30g", unitPrice: 5.45 },
      { ingredient: "Passion fruit", supplierProduct: "Passion Fruit", quantity: 10, unit: "each", unitPrice: 0.7 },
      { ingredient: "Strawberries", supplierProduct: "Strawberries (English)", quantity: 1, unit: "each", unitPrice: 1.92 },
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 4, unit: "1L each", unitPrice: 6.75 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-06-27",
    invoiceNumber: "73168",
    documentSubtotal: 3.42,
    documentVat: 0,
    documentTotal: 3.42,
    items: [
      { ingredient: "Enoki mushroom", supplierProduct: "Enoki Mushroom", quantity: 2, unit: "packet", unitPrice: 1.71 },
    ],
  },
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-06-27",
    invoiceNumber: "73161",
    documentSubtotal: 72.59,
    documentVat: 10.8,
    documentTotal: 83.39,
    items: [
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 1, unit: "case (6 x 1L)", unitPrice: 40.5 },
      { ingredient: "Aubergine", supplierProduct: "Aubergines", quantity: 1, unit: "1x5kg box", unitPrice: 12.8 },
      { ingredient: "Fresh lime juice", supplierProduct: "Fresh Lime Juice (1 Litre)", quantity: 2, unit: "1L each", unitPrice: 6.75 },
      { ingredient: "Banana", supplierProduct: "Banana", quantity: 2, unit: "kg", unitPrice: 1.75 },
      { ingredient: "Mint", supplierProduct: "Loose Bunch Mint", quantity: 1, unit: "150g bunch", unitPrice: 1.01 },
      { ingredient: "Orange", supplierProduct: "Oranges Medium", quantity: 4, unit: "each", unitPrice: 0.32 },
    ],
  },

  // =====================================================
  // MASAFINA
  // =====================================================
  {
    supplier: "Masafina",
    invoiceDate: "2026-07-31",
    invoiceNumber: "MAS-14565",
    documentSubtotal: 513.3,
    documentVat: 0,
    documentTotal: 513.3,
    items: [
      { ingredient: "Yellow Corn Tortilla 12cm", supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 5, unit: "case", unitPrice: 36.95 },
      { ingredient: "Yellow Corn Tortilla 10cm", supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)", quantity: 4, unit: "case", unitPrice: 35.95 },
      { ingredient: "Heritage Purple Corn Tortilla 12cm", supplierProduct: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)", quantity: 2, unit: "case", unitPrice: 39.95 },
      { ingredient: "Yellow Corn Tortilla 15cm", supplierProduct: "Case of 15cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 3, unit: "case", unitPrice: 34.95 },
    ],
  },
  {
    supplier: "Masafina",
    invoiceDate: "2026-07-17",
    invoiceNumber: "MAS-14251",
    documentSubtotal: 339.55,
    documentVat: 0,
    documentTotal: 339.55,
    items: [
      { ingredient: "Yellow Corn Tortilla 12cm", supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 4, unit: "case", unitPrice: 36.95 },
      { ingredient: "Yellow Corn Tortilla 10cm", supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)", quantity: 2, unit: "case", unitPrice: 35.95 },
      { ingredient: "Heritage Purple Corn Tortilla 12cm", supplierProduct: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)", quantity: 3, unit: "case", unitPrice: 39.95 },
    ],
  },
  {
    supplier: "Masafina",
    invoiceDate: "2026-07-08",
    invoiceNumber: "MAS-13926",
    documentSubtotal: 291.6,
    documentVat: 0,
    documentTotal: 291.6,
    items: [
      { ingredient: "Yellow Corn Tortilla 12cm", supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 4, unit: "case", unitPrice: 36.95 },
      { ingredient: "Yellow Corn Tortilla 10cm", supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)", quantity: 4, unit: "case", unitPrice: 35.95 },
    ],
  },
  {
    supplier: "Masafina",
    invoiceDate: "2026-06-10",
    invoiceNumber: "MAS-13263",
    documentSubtotal: 377.55,
    documentVat: 0,
    documentTotal: 377.55,
    items: [
      { ingredient: "Yellow Corn Tortilla 12cm", supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 5, unit: "case", unitPrice: 36.95 },
      { ingredient: "Yellow Corn Tortilla 10cm", supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)", quantity: 4, unit: "case", unitPrice: 35.95 },
      { ingredient: "Quesillo cheese", supplierProduct: "Quesillo Cheese (500g)", quantity: 4, unit: "500g bag", unitPrice: 12.25 },
    ],
  },

  // =====================================================
  // MEXGROCER DELIVERY NOTES
  // =====================================================
  {
    supplier: "Mexgrocer",
    invoiceDate: "2026-08-07",
    invoiceNumber: "355014",
    documentType: "delivery_note",
    items: [
      { ingredient: "Goya Aji amarillo", supplierProduct: "Goya Aji Amarillo Yellow Hot Pepper Paste 213g", quantity: 6, unit: "each" },
      { ingredient: "Agave syrup", supplierProduct: "Agave Syrup 25kg", quantity: 2, unit: "25kg" },
      { ingredient: "Abuelita Chocolate", supplierProduct: "Abuelita Chocolate 540g", quantity: 4, unit: "540g" },
    ],
  },
  {
    supplier: "Mexgrocer",
    invoiceDate: "2026-07-17",
    invoiceNumber: "351861",
    documentType: "delivery_note",
    items: [
      { ingredient: "Achiote paste", supplierProduct: "El Yucateco Achiote Paste 1kg", quantity: 3, unit: "1kg" },
      { ingredient: "Goya Aji amarillo", supplierProduct: "Goya Aji Amarillo Yellow Hot Pepper Paste 213g", quantity: 10, unit: "each" },
      { ingredient: "Whole dried habanero", supplierProduct: "Habanero Whole Dried Chilli 1kg", quantity: 1, unit: "1kg" },
      { ingredient: "Mayordomo chocolate", supplierProduct: "Mayordomo Chocolate 500g", quantity: 1, unit: "500g" },
      { ingredient: "Agave syrup", supplierProduct: "Agave Syrup 25kg", quantity: 2, unit: "25kg" },
      { ingredient: "Tajin seasoning", supplierProduct: "Tajin Seasoning Bottle 90g", quantity: 1, unit: "90g" },
    ],
  },
  {
    supplier: "Mexgrocer",
    invoiceDate: "2026-07-07",
    invoiceNumber: "350237",
    documentType: "delivery_note",
    items: [
      { ingredient: "Achiote paste", supplierProduct: "El Yucateco Achiote Paste 1kg", quantity: 4, unit: "1kg" },
      { ingredient: "Goya Aji amarillo", supplierProduct: "Goya Aji Amarillo Yellow Hot Pepper Paste 213g", quantity: 10, unit: "each" },
      { ingredient: "Chipotle in adobo", supplierProduct: "La Costena Chipotle in Adobo 2.8kg", quantity: 3, unit: "2.8kg" },
      { ingredient: "Mexican oregano", supplierProduct: "Terana Oregano 400g", quantity: 1, unit: "400g" },
      { ingredient: "Jarritos Guava", supplierProduct: "Jarritos Guava 24 x 370ml Case", quantity: 1, unit: "case" },
      { ingredient: "Jarritos Mexican Cola", supplierProduct: "Jarritos Mexican Cola 24 x 370ml Case", quantity: 1, unit: "case" },
      { ingredient: "Jarritos Pineapple", supplierProduct: "Jarritos Pineapple 24 x 370ml Case", quantity: 1, unit: "case" },
    ],
  },

  // =====================================================
  // RAYNOR HYGIENE DELIVERY NOTES
  // =====================================================
  {
    supplier: "Raynor Hygiene",
    invoiceDate: "2026-07-23",
    invoiceNumber: "0000017122",
    documentType: "delivery_note",
    items: [
      { ingredient: "Plastic tax", supplierProduct: "Plastic Tax for VB003", quantity: 1, unit: "each" },
      { ingredient: "Blue centrefeed", supplierProduct: "Embossed Blue Centrefeed Unbleached 100% Recycled 1x6", quantity: 7, unit: "pack" },
      { ingredient: "Vacuum pouch 200x300", supplierProduct: "Vacuum Pouch 200x300 1x1000", quantity: 1, unit: "pack" },
      { ingredient: "Latex disposable gloves large", supplierProduct: "Latex Disposable Gloves - Large", quantity: 3, unit: "box" },
      { ingredient: "Latex disposable gloves XL", supplierProduct: "Latex Disposable Gloves - XLarge", quantity: 3, unit: "box" },
      { ingredient: "Baking parchment", supplierProduct: "Baking Parchment 18in/450mm 100% Compostable & Biodegradable", quantity: 4, unit: "roll" },
      { ingredient: "Cling film", supplierProduct: "Cling Film 18in Cutter Box", quantity: 4, unit: "box" },
    ],
  },
  {
    supplier: "Raynor Hygiene",
    invoiceDate: "2026-07-20",
    invoiceNumber: "0000016881",
    documentType: "delivery_note",
    items: [
      { ingredient: "Dishmachine rinse aid", supplierProduct: "Dishmachine Rinse Aid 2x5 Ltr", quantity: 2, unit: "case" },
      { ingredient: "Machine dishwash detergent", supplierProduct: "Machine Dishwash Det. (HW) 2x5 Ltr", quantity: 2, unit: "case" },
      { ingredient: "Oven cleaner", supplierProduct: "Oven Cleaner 2x5 Ltr", quantity: 2, unit: "case" },
      { ingredient: "Griddle pads", supplierProduct: "Griddle Pads 1x10", quantity: 2, unit: "pack" },
      { ingredient: "Griddle screens", supplierProduct: "Griddle Screens", quantity: 1, unit: "pack" },
      { ingredient: "Black rubber gloves large", supplierProduct: "Black Rubber Gloves Large", quantity: 1, unit: "pair" },
    ],
  },

  // =====================================================
  // EXISTING OBSERVED HISTORY
  // =====================================================
  {
    supplier: "Fin and Flounder",
    invoiceDate: "2026-08-07",
    invoiceNumber: "S/94861",
    documentSubtotal: 231.15,
    documentVat: 0,
    documentTotal: 231.15,
    items: [
      { ingredient: "Stonebass", supplierProduct: "Stone Bass Fillet", quantity: 3.05, unit: "kg", unitPrice: 13.8 },
      { ingredient: "26/30 prawn", supplierProduct: "Frozen Raw Peeled Deveined Prawn 26/30 1kg Bag", quantity: 5, unit: "kg", unitPrice: 10.5 },
      { ingredient: "Black cod", supplierProduct: "Frozen Black Cod 2-3kg Head Off", quantity: 1.9, unit: "kg", unitPrice: 25.9 },
      { ingredient: "Cod", supplierProduct: "Cod Whole 4-7kg Filleted", quantity: 7.31, unit: "kg", unitPrice: 11.95 },
    ],
  },
  {
    supplier: "Albion Fine Foods",
    invoiceDate: "2026-06-26",
    invoiceNumber: "71699040",
    documentType: "packing_slip",
    documentTotal: 290.05,
    estimatedTotal: true,
    items: [
      { ingredient: "Machine dishwasher detergent", supplierProduct: "Machine DishWash 5ltr", quantity: 2, unit: "5L", unitPrice: 6.39 },
      { ingredient: "Avocado", supplierProduct: "Avocado Ready to Eat", quantity: 90, unit: "each", unitPrice: 0.89 },
      { ingredient: "Pink potatoes", supplierProduct: "Potatoes - Pink", quantity: 10, unit: "kg", unitPrice: 3.39 },
      { ingredient: "Corn on the cob", supplierProduct: "Raw Fresh Corn on Cob case of 24", quantity: 1, unit: "case", unitPrice: 27.5 },
      { ingredient: "Hispi cabbage", supplierProduct: "Cabbage Hispi", quantity: 15, unit: "each", unitPrice: 1.81 },
      { ingredient: "Micro red amaranth", supplierProduct: "Micro Red Amaranth Punnet 25g", quantity: 5, unit: "punnet", unitPrice: 2.55 },
      { ingredient: "Micro lemon balm", supplierProduct: "Micro Lemon Balm Punnet 30g", quantity: 3, unit: "punnet", unitPrice: 2.55 },
      { ingredient: "Limes", supplierProduct: "Limes", quantity: 4, unit: "case", unitPrice: 3.24 },
      { ingredient: "Butternut squash", supplierProduct: "Butternut Squash per kg", quantity: 10, unit: "kg", unitPrice: 1.95 },
      { ingredient: "Aubergine", supplierProduct: "Aubergines", quantity: 5, unit: "kg", unitPrice: 4.7 },
      { ingredient: "Unsalted butter", supplierProduct: "Lakeland Unsalted Butter 250g", quantity: 5, unit: "250g", unitPrice: 1.79 },
      { ingredient: "Black nitrile gloves", supplierProduct: "Gloves Black Nitrile Large x 100", quantity: 3, unit: "box", unitPrice: 7.77 },
    ],
  },
  {
    supplier: "Woods Foodservice",
    invoiceDate: "2026-08-06",
    invoiceNumber: "26-386223",
    documentSubtotal: 302.58,
    documentVat: 0,
    documentTotal: 302.58,
    items: [
      { ingredient: "Peach halves", supplierProduct: "Peach Halves in Syrup Fontinella 2.65kg", quantity: 2, unit: "tin", unitPrice: 6.22 },
      { ingredient: "Roasted peppers", supplierProduct: "Pimento Whole Roasted Red Peppers 2.5kg", quantity: 1, unit: "tin", unitPrice: 8.61 },
      { ingredient: "Chilli garlic sauce", supplierProduct: "Chilli & Garlic Sauce Lee Kum Kee 368g", quantity: 4, unit: "each", unitPrice: 2.51 },
      { ingredient: "Desiccated coconut", supplierProduct: "Coconut Fine Desiccated 1kg", quantity: 3, unit: "kg", unitPrice: 6.85 },
      { ingredient: "Chipotle peppers in adobo", supplierProduct: "Chipotle Peppers in Adobo Sauce 2.8kg", quantity: 2, unit: "tin", unitPrice: 12.75 },
      { ingredient: "Blue corn tortillas 15cm", supplierProduct: "Soft Blue Corn Tortillas 15cm (6 x 24)", quantity: 5, unit: "case", unitPrice: 18.19 },
      { ingredient: "Coriander", supplierProduct: "Fresh Coriander 100g", quantity: 5, unit: "bunch", unitPrice: 1.41 },
      { ingredient: "Avocado", supplierProduct: "Hass Ready to Eat Avocados", quantity: 4, unit: "case", unitPrice: 24.17 },
      { ingredient: "Viola flowers", supplierProduct: "Viola Flowers 4g Punnet", quantity: 1, unit: "punnet", unitPrice: 2.46 },
      { ingredient: "Pink potatoes", supplierProduct: "Peeled Chipping Potatoes 1kg", quantity: 2, unit: "kg", unitPrice: 3.79 },
      { ingredient: "Vegan mayonnaise", supplierProduct: "Hellmann's Vegan Mayonnaise 5L", quantity: 1, unit: "5L", unitPrice: 22.13 },
    ],
  },
];

function docStatus(order: ObservedInvoiceOrder) {
  if (order.documentType === "delivery_note") return "Delivery note";
  if (order.documentType === "packing_slip") return "Packing slip";
  return "Approved";
}

export const observedApprovedInvoices = observedInvoiceOrders.map((order) => ({
  id: `observed-${order.supplier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${order.invoiceNumber}`,
  supplier: order.supplier,
  invoiceNumber: order.invoiceNumber,
  invoiceDate: order.invoiceDate,
  subtotal:
    order.documentSubtotal ??
    (order.documentTotal !== undefined && order.documentVat !== undefined
      ? Math.round((order.documentTotal - order.documentVat) * 100) / 100
      : order.documentTotal),
  vat: order.documentVat,
  total: order.documentTotal,
  status: docStatus(order),
  documentType: order.documentType ?? "invoice",
  estimatedTotal: order.estimatedTotal ?? false,
  lineItems: order.items.map((item) => ({
    product: item.supplierProduct,
    ingredientMatch: item.ingredient,
    quantity: item.quantity,
    pack: item.unit,
    unitPrice: item.unitPrice,
    total:
      item.unitPrice === undefined
        ? undefined
        : Math.round(item.quantity * item.unitPrice * 100) / 100,
  })),
}));

export const observedIngredientPrices = observedInvoiceOrders.reduce<
  Record<
    string,
    { price: number; unit: string; supplier: string; product: string; updatedAt: string }
  >
>((prices, order) => {
  order.items.forEach((item) => {
    if (item.unitPrice === undefined) return;
    const existing = prices[item.ingredient];
    if (!existing || new Date(order.invoiceDate) > new Date(existing.updatedAt)) {
      prices[item.ingredient] = {
        price: item.unitPrice,
        unit: item.unit,
        supplier: order.supplier,
        product: item.supplierProduct,
        updatedAt: order.invoiceDate,
      };
    }
  });
  return prices;
}, {});

function productKey(supplier: string, supplierProduct: string) {
  return `${supplier}::${supplierProduct}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const observedOrderMeta = observedInvoiceOrders.reduce<
  Record<string, ObservedOrderMeta>
>((meta, order) => {
  order.items.forEach((item) => {
    const key = productKey(order.supplier, item.supplierProduct);
    const existing = meta[key];
    if (!existing || new Date(order.invoiceDate) > new Date(existing.lastOrdered)) {
      meta[key] = {
        lastOrdered: order.invoiceDate,
        lastOrderedQty: item.quantity,
        unit: item.unit,
      };
    }
  });
  return meta;
}, {});

export function getObservedOrderMeta(
  supplier: string,
  supplierProduct: string
): ObservedOrderMeta | undefined {
  return observedOrderMeta[productKey(supplier, supplierProduct)];
}

type ObservedCatalogueItem = {
  id: string;
  ingredient: string;
  supplier: string;
  supplierProduct: string;
  unit: string;
  fallbackPrice: number | null;
  category: string;
  lastOrdered: string;
  lastOrderedQty: number;
};

const observedCatalogueMap = new Map<string, ObservedCatalogueItem>();

observedInvoiceOrders
  .filter((order) =>
    ["Albion Fine Foods", "Spitalfields Fruit & Veg"].includes(order.supplier)
  )
  .forEach((order) => {
    order.items.forEach((item) => {
      const key = `${productKey(order.supplier, item.supplierProduct)}::${item.unit.toLowerCase()}`;
      const existing = observedCatalogueMap.get(key);
      if (!existing || new Date(order.invoiceDate) > new Date(existing.lastOrdered)) {
        observedCatalogueMap.set(key, {
          id: `invoice-${order.supplier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${key.replace(/[^a-z0-9]+/g, "-")}`,
          ingredient: item.ingredient,
          supplier: order.supplier,
          supplierProduct: item.supplierProduct,
          unit: item.unit,
          fallbackPrice: item.unitPrice ?? existing?.fallbackPrice ?? null,
          category: "Invoice observed",
          lastOrdered: order.invoiceDate,
          lastOrderedQty: item.quantity,
        });
      }
    });
  });

export const observedCatalogueItems = Array.from(observedCatalogueMap.values());
