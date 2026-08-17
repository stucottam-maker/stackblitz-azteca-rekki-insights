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
  documentTotal?: number;
  estimatedTotal?: boolean;
  items: ObservedInvoiceItem[];
};

// Seed history transcribed from supplied invoices and delivery notes.
// It provides an initial "ordered once" baseline; saved purchase orders
// take over as soon as repeat history exists.
export const observedInvoiceOrders: ObservedInvoiceOrder[] = [
  {
    supplier: "Spitalfields Fruit & Veg",
    invoiceDate: "2026-07-15",
    invoiceNumber: "73424",
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
    supplier: "Fin and Flounder",
    invoiceDate: "2026-08-07",
    invoiceNumber: "SI-94861",
    documentTotal: 231.15,
    items: [
      { ingredient: "Stonebass", supplierProduct: "Stone Bass Fillet", quantity: 3.05, unit: "kg", unitPrice: 13.8 },
      { ingredient: "26/30 prawn", supplierProduct: "Frozen Raw Peeled Deveined Prawn 26/30 1kg Bag", quantity: 5, unit: "kg", unitPrice: 10.5 },
      { ingredient: "Black cod", supplierProduct: "Frozen Black Cod 2-3kg Head Off", quantity: 1.9, unit: "kg", unitPrice: 25.9 },
      { ingredient: "Cod", supplierProduct: "Cod Whole 4-7kg Filleted", quantity: 7.31, unit: "kg", unitPrice: 11.95 },
    ],
  },
  {
    supplier: "Masafina",
    invoiceDate: "2026-07-31",
    invoiceNumber: "MAS-14565",
    documentTotal: 513.3,
    items: [
      { ingredient: "Yellow Corn Tortilla 12cm", supplierProduct: "Case of 12cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 5, unit: "case", unitPrice: 36.95 },
      { ingredient: "Yellow Corn Tortilla 10cm", supplierProduct: "Case of 10cm Yellow Heirloom Corn Tortillas (6 x 750g)", quantity: 4, unit: "case", unitPrice: 35.95 },
      { ingredient: "Heritage Purple Corn Tortilla 12cm", supplierProduct: "Case of 12cm Purple Heirloom Corn Tortillas (5 x 1kg)", quantity: 2, unit: "case", unitPrice: 39.95 },
      { ingredient: "Yellow Corn Tortilla 15cm", supplierProduct: "Case of 15cm Heirloom Corn Tortillas (5 x 1kg)", quantity: 3, unit: "case", unitPrice: 34.95 },
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
    supplier: "Mexgrocer",
    invoiceDate: "2026-08-07",
    invoiceNumber: "381642",
    documentType: "delivery_note",
    items: [
      { ingredient: "Goya Aji amarillo", supplierProduct: "Goya Aji Amarillo Yellow Hot Pepper Paste 213g", quantity: 6, unit: "each" },
      { ingredient: "Agave syrup", supplierProduct: "Agave Syrup 25kg", quantity: 2, unit: "25kg" },
      { ingredient: "Abuelita Chocolate", supplierProduct: "Abuelita Chocolate 540g", quantity: 4, unit: "540g" },
    ],
  },
  {
    supplier: "Woods Foodservice",
    invoiceDate: "2026-08-06",
    invoiceNumber: "26-386223",
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

export const observedApprovedInvoices = observedInvoiceOrders.map((order) => ({
  id: `observed-${order.supplier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${order.invoiceNumber}`,
  supplier: order.supplier,
  invoiceNumber: order.invoiceNumber,
  invoiceDate: order.invoiceDate,
  subtotal: order.documentTotal,
  vat: order.documentTotal === undefined ? undefined : 0,
  total: order.documentTotal,
  status: "Approved",
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

export const observedCatalogueItems = observedInvoiceOrders
  .filter((order) =>
    ["Albion Fine Foods", "Spitalfields Fruit & Veg"].includes(order.supplier)
  )
  .flatMap((order) =>
  order.items.map((item, index) => ({
    id: `invoice-${order.supplier.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    ingredient: item.ingredient,
    supplier: order.supplier,
    supplierProduct: item.supplierProduct,
    unit: item.unit,
    fallbackPrice: item.unitPrice ?? null,
    category: "Invoice observed",
  }))
  );
