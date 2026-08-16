export type OuiChefCatalogueProduct = {
  sku: string;
  name: string;
  unit: string;
  price: number | null;
  category: string;
  lastOrderDate: number | null;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeUnit(value: string) {
  return value.trim().toLowerCase();
}

// Complete 134-item Oui Chef Choco order guide captured from paginated responses.
// Preferred means the product has a non-null Choco lastOrderDate.
export const rawOuiChefCatalogue: OuiChefCatalogueProduct[] = [
  { sku: "APP-GRAN", name: "APPLE GRANNY SMITH", unit: "Kg", price: 1.81, category: "Fruits", lastOrderDate: 1724878878242 },
  { sku: "ORA-LARGE", name: "ORANGE LARGE", unit: "Kg", price: 1.76, category: "Fruits", lastOrderDate: 1731533603277 },
  { sku: "PINE-EX", name: "Pineapple Extra Sweet", unit: "Each", price: 3.68, category: "Fruits", lastOrderDate: 1731276138055 },
  { sku: "PLANTAIN-RIPE", name: "PLANTAIN RIPE", unit: "Kg", price: 2.93, category: "Fruits", lastOrderDate: null },
  { sku: "LIM", name: "LIME (54xBox)", unit: "Box", price: 14.03, category: "Fruits", lastOrderDate: 1731879578918 },
  { sku: "LEMON-LGE", name: "LEMON LARGE", unit: "Kg", price: null, category: "Fruits", lastOrderDate: 1731622291289 },
  { sku: "COLD-ORANGE", name: "COLDPRESSED ORANGE JUICE 2LTR", unit: "Each", price: null, category: "Fruits", lastOrderDate: 1729630892784 },
  { sku: "PEACH", name: "PEACH YELLOW", unit: "Kg", price: null, category: "Fruits", lastOrderDate: 1731019021766 },
  { sku: "BER-BLACK", name: "BLACKBERRY PUNNET X125G", unit: "Each", price: null, category: "Fruits", lastOrderDate: 1731276138055 },
  { sku: "BER-RASP", name: "RASPBERRY PUNNET X125G", unit: "Each", price: null, category: "Fruits", lastOrderDate: 1731276138055 },
  { sku: "BLU-W", name: "FROZEN BLUEBERRY WHOLE KG", unit: "Each", price: null, category: "Fruits", lastOrderDate: 1731276138055 },
  { sku: "RASP-FROZ-W", name: "FROZEN RASPBERRY WHOLE KG", unit: "Each", price: null, category: "Fruits", lastOrderDate: 1731276138055 },
  { sku: "BET - RAW", name: "Beetroot - Raw", unit: "Unit", price: 1.07, category: "Vegetables", lastOrderDate: null },
  { sku: "CAB - RED", name: "Cabbage Red 25kg", unit: "Bag", price: 17.69, category: "Vegetables", lastOrderDate: 1727124506844 },
  { sku: "CAR - BAA", name: "Carrots Baby", unit: "Bunch", price: 2.93, category: "Vegetables", lastOrderDate: null },
  { sku: "AVO-HS-BOX", name: "AVOCADO HASS (20xBox)", unit: "Box", price: 22.57, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "CAB-RED", name: "Cabbage Red 25kg", unit: "Unit", price: 17.69, category: "Vegetables", lastOrderDate: 1722199170140 },
  { sku: "CABBAGEBLACKKG", name: "CABBAGE BLACK", unit: "Kg", price: 7.28, category: "Vegetables", lastOrderDate: null },
  { sku: "FENNEL", name: "FENNEL", unit: "Kg", price: 3.49, category: "Vegetables", lastOrderDate: null },
  { sku: "GARLIC", name: "GARLIC SPANISH", unit: "Kg", price: 4.24, category: "Vegetables", lastOrderDate: 1730928741283 },
  { sku: "GAR-PEELED", name: "GARLIC PEELED KG", unit: "Kg", price: 4.79, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "ICEBERG", name: "LETTUCE ICEBERG", unit: "Each", price: 1.26, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "MOUL-EA", name: "MOULI KG", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1731879578918 },
  { sku: "ONI-RED", name: "ONION RED", unit: "Kg", price: 1.26, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "ONI-WHITE", name: "ONION WHITE", unit: "Kg", price: 2.26, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "PEP-JALAPENO", name: "PEPPER JALAPENO (2xBox)", unit: "Box", price: null, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "TOM-P", name: "Tomatoes Cherry", unit: "Punnet", price: 1.68, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "MUS-MAIT", name: "MUSHROOM MAITAKE", unit: "Kg", price: 28.5, category: "Vegetables", lastOrderDate: 1721942414310 },
  { sku: "MUS-OK", name: "MUSHROOM EYRINGHI KG", unit: "Kg", price: 15.69, category: "Vegetables", lastOrderDate: null },
  { sku: "MUS-PORT-BOX", name: "MUSHROOM PORTOBELLO", unit: "Kg", price: 4.36, category: "Vegetables", lastOrderDate: 1726697018654 },
  { sku: "ONI-SPANISH", name: "ONION SPANISH", unit: "Kg", price: 1.06, category: "Vegetables", lastOrderDate: null },
  { sku: "PEP-P", name: "PEPPERS PADRON KG", unit: "Kg", price: 8.16, category: "Vegetables", lastOrderDate: 1731533603277 },
  { sku: "POT-SWEET", name: "POTATOES SWEET", unit: "Kg", price: 2.1, category: "Vegetables", lastOrderDate: 1731449037067 },
  { sku: "RHUB", name: "Rhubarb English", unit: "Kg", price: 9.21, category: "Vegetables", lastOrderDate: null },
  { sku: "SHAL-BAG", name: "SHALLOTS BANANA", unit: "Kg", price: 2.36, category: "Vegetables", lastOrderDate: 1731107883661 },
  { sku: "SPRIN", name: "Spring Onion", unit: "Bunch", price: 0.63, category: "Vegetables", lastOrderDate: 1731622291289 },
  { sku: "SQUASH", name: "SQUASH", unit: "Kg", price: 1.32, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "TOM-GREEN", name: "TOMATOES GREEN", unit: "Kg", price: 5.02, category: "Vegetables", lastOrderDate: 1731879578918 },
  { sku: "TOM-PLUM-VINE", name: "TOMATOES PLUM VINE", unit: "Kg", price: 3.14, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "BEET-CANKG", name: "BEETROOT CANDY", unit: "Kg", price: 2.51, category: "Vegetables", lastOrderDate: null },
  { sku: "BEET-GOLKG", name: "BEETROOT GOLDEN", unit: "Kg", price: 2.51, category: "Vegetables", lastOrderDate: 1729805376666 },
  { sku: "BET-RAW", name: "BEETROOT RAW", unit: "Kg", price: 1.07, category: "Vegetables", lastOrderDate: 1729805376666 },
  { sku: "CAB-HISPI", name: "CABBAGE HISPI", unit: "Each", price: 2.1, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "CAB-SAV-EA", name: "CABBAGE SAVOY", unit: "Each", price: 1.64, category: "Vegetables", lastOrderDate: 1725222487784 },
  { sku: "CARROT", name: "CARROTS", unit: "Kg", price: 0.82, category: "Vegetables", lastOrderDate: 1730325098499 },
  { sku: "CAUL-EACH", name: "CAULIFLOWER", unit: "Each", price: 2.77, category: "Vegetables", lastOrderDate: 1730759189484 },
  { sku: "CELERY", name: "CELERY *ALLERGEN*", unit: "Each", price: 1.01, category: "Vegetables", lastOrderDate: 1731276138055 },
  { sku: "CURLY", name: "CURLY KALE", unit: "Kg", price: 5.93, category: "Vegetables", lastOrderDate: null },
  { sku: "GIN", name: "GINGER", unit: "Kg", price: 4.52, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "MUS-E", name: "MUSHROOM ENOKI", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1731107883661 },
  { sku: "CHE-GR", name: "CHEESE GRATED CHEDDAR X2KG", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1731622291289 },
  { sku: "BUTTERMILK1LTR", name: "DAIRY BUTTER MILK 1LTR", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1722029750586 },
  { sku: "CHE-BUR", name: "CHEESE BURRATA 250GM", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1731879578918 },
  { sku: "EGG-W", name: "DAIRY EGG WHITE X 1KG (ALLERGEN)", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: null },
  { sku: "CHE-PG", name: "CHEESE PARMESAN BLOCK KG", unit: "Kg", price: null, category: "Dairy & Eggs", lastOrderDate: 1722200639847 },
  { sku: "CREM-FRES-FREN", name: "CREME FRAICHE #FRENCH# 1KG", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1731622291289 },
  { sku: "MSTD15", name: "Dijon Mustard Extra Strong Small 1kg", unit: "Unit", price: 4.86, category: "Ambient", lastOrderDate: null },
  { sku: "CTMT10", name: "Core - Chopped Tomatoes 2.5kg", unit: "Unit", price: 30.3, category: "Ambient", lastOrderDate: 1729111007293 },
  { sku: "FRPK21", name: "Kalamansi Puree - Boiron Frozen 1kg", unit: "Unit", price: 12.4, category: "Frozen", lastOrderDate: null },
  { sku: "FRPP11", name: "Peach White Puree - Boirion No Added Sugar 1kg", unit: "Unit", price: 7.98, category: "Frozen", lastOrderDate: 1731622885497 },
  { sku: "FRPA10", name: "Apple Green Puree - Boiron Frozen 1kg", unit: "Unit", price: 6.94, category: "Frozen", lastOrderDate: null },
  { sku: "FRPL10", name: "Lychee Puree - Boiron Frozen 1kg", unit: "Unit", price: 9.91, category: "Frozen", lastOrderDate: null },
  { sku: "FRPM10", name: "Mango Puree - Boiron Frozen 1kg", unit: "Unit", price: 10.05, category: "Frozen", lastOrderDate: 1725052896584 },
  { sku: "FRP010", name: "Orange Blood Puree - Boiron Frozen 1kg", unit: "Unit", price: 8.25, category: "Frozen", lastOrderDate: 1731107883661 },
  { sku: "FRZE20", name: "Edamame Beans Shelled without Shell Soya - Yutaka 500g", unit: "Unit", price: 1.62, category: "Frozen", lastOrderDate: 1731533603277 },
  { sku: "PUR-GUAVA", name: "PUREE GUAVA FRZ 1KG", unit: "Each", price: null, category: "Frozen", lastOrderDate: 1731622885497 },
  { sku: "CRMS04", name: "Soured Cream - BV Dairy 2kg", unit: "Unit", price: 6.21, category: "Chilled", lastOrderDate: 1731710409284 },
  { sku: "CHSVF05", name: "Greek Style Feta - Vegan Violife V 200g", unit: "Unit", price: 2.81, category: "Chilled", lastOrderDate: 1730414445526 },
  { sku: "YOGG02", name: "Yoghurt Greek - BV Dairy 2kg", unit: "Unit", price: 5.33, category: "Chilled", lastOrderDate: null },
  { sku: "CRMD06", name: "Double Cream - Wells Farm 2.27L", unit: "Unit", price: 8.5, category: "Chilled", lastOrderDate: 1731879578918 },
  { sku: "MLKW12", name: "Milk - Wells Farm Whole 2L", unit: "Unit", price: 1.63, category: "Chilled", lastOrderDate: 1731710409284 },
  { sku: "BUTU08", name: "Butter Unsalted - Arla 250g", unit: "Each", price: 72.8, category: "Chilled", lastOrderDate: 1731710409284 },
  { sku: "EGGY01", name: "Egg Liquid Yolk Free Range 1L", unit: "Unit", price: 10.68, category: "Chilled", lastOrderDate: 1731879578918 },
  { sku: "HBSF50", name: "Fenugreek Seeds - Greenfields 500g", unit: "Unit", price: 3.38, category: "Spices", lastOrderDate: null },
  { sku: "SPIM15", name: "Mustard Seeds Yellow - Greenfields 500g", unit: "Unit", price: 3.8, category: "Spices", lastOrderDate: 1723669390451 },
  { sku: "SPITOS", name: "Turmeric - Greenfields 500g", unit: "Unit", price: 3.43, category: "Spices", lastOrderDate: 1725484077016 },
  { sku: "MAYHV05", name: "Hellmann's - Vegan Mayo 5L - 4.74kg", unit: "Unit", price: 34.44, category: "Sauces", lastOrderDate: 1730325098499 },
  { sku: "THY", name: "Thyme", unit: "Bunch", price: 1.32, category: "Herbs", lastOrderDate: 1731710409284 },
  { sku: "BAS-T", name: "Basil Thai", unit: "Bunch", price: 3.14, category: "Herbs", lastOrderDate: 1731710409284 },
  { sku: "CORI-ANDER", name: "Coriander", unit: "Bunch", price: 1.13, category: "Herbs", lastOrderDate: 1731710409284 },
  { sku: "DILL", name: "Dill", unit: "Bunch", price: 1.26, category: "Herbs", lastOrderDate: 1732055515236 },
  { sku: "BAS-T", name: "BASIL THAI BUNCH", unit: "Each", price: null, category: "Herbs", lastOrderDate: 1731019021766 },
  { sku: "CORI-ANDER", name: "CORIANDER (20xBox)", unit: "Box", price: null, category: "Herbs", lastOrderDate: 1731879578918 },
  { sku: "CHIV-BNCH", name: "CHIVE BUNCH", unit: "Each", price: null, category: "Herbs", lastOrderDate: 1731710409284 },
  { sku: "BERGAMOT", name: "BERGAMOT KG", unit: "Each", price: null, category: "Fruits", lastOrderDate: null },
  { sku: "SHISO-GREEN", name: "SHISO LEAF GREEN PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1732055515236 },
  { sku: "PARS-FL", name: "PARSLEY FLAT BUNCH", unit: "Each", price: null, category: "Herbs", lastOrderDate: 1731533603277 },
  { sku: "VERBENA", name: "LEMON VERBENA BUNCH", unit: "Each", price: null, category: "Herbs", lastOrderDate: 1726605653440 },
  { sku: "MI-NAST-BLU", name: "MICRO NASTURTIUM BLUE PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1726605653440 },
  { sku: "MI-CRIMSON", name: "MICRO CRIMSON RADISH", unit: "Each", price: null, category: "Micros", lastOrderDate: 1726605653440 },
  { sku: "MI-MIZUNA", name: "MICRO MIZUNA PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1729892271283 },
  { sku: "MI-AMA", name: "MICRO RED AMARANTH PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1732055515236 },
  { sku: "MI-CORIANDER", name: "MICRO CORIANDER CRESS PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1732055515236 },
  { sku: "ROSEMARY", name: "ROSEMARY", unit: "Each", price: null, category: "Herbs", lastOrderDate: 1731276138055 },
  { sku: "POUS", name: "POUSSE", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1731107883661 },
  { sku: "CUC-BAB", name: "CUCUMBER BABY", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1729892271283 },
  { sku: "RAD-B", name: "RADISH BREAKFAST", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "LET-CAS", name: "LETTUCE CASTELFRANCO", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1729201515315 },
  { sku: "CORN-FR", name: "CORN SWEET FRESH IN HUSK N/AAAA (30xBox)", unit: "Box", price: null, category: "Vegetables", lastOrderDate: 1729199889505 },
  { sku: "ONI-REDB", name: "ONION RED BUNCHED EACH", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1726782216069 },
  { sku: "BUTTERMILKX5LTR", name: "DAIRY BUTTER MILK X5LTR", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1731533603277 },
  { sku: "VIOLA", name: "VIOLA FLOWERS PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1731879578918 },
  { sku: "MI-BORAGE-FLOW", name: "MICRO BORAGE FLOWERS PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1731019021766 },
  { sku: "MI-GARLIC-FLOWER", name: "MICRO GARLIC FLOWER PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1731533603277 },
  { sku: "MI-CORNFLO", name: "MICRO CORNFLOWERS PUNNET", unit: "Each", price: null, category: "Micros", lastOrderDate: 1730503426051 },
  { sku: "POT-RATT-BOX", name: "POTATOES RATTE", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1732055515236 },
  { sku: "BANANALEAF", name: "BANANA LEAF 500G", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1724878878242 },
  { sku: "PUR-LYCHEE", name: "PUREE LYCHEE FRZ 1KG", unit: "Each", price: null, category: "Frozen", lastOrderDate: 1726000316152 },
  { sku: "EGG-Q", name: "EGGS QUAIL PUNNET", unit: "Each", price: null, category: "Dairy & Eggs", lastOrderDate: 1729201515315 },
  { sku: "AUB", name: "AUBERGINES (5xBox)", unit: "Box", price: null, category: "Vegetables", lastOrderDate: 1731969183927 },
  { sku: "CHIL-GRN-KG", name: "CHILLIES DUTCH GREEN", unit: "Each", price: null, category: "Vegetables", lastOrderDate: null },
  { sku: "TURK-CHILLI", name: "TURKISH CHILLI", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1730660533759 },
  { sku: "PEP-ROM", name: "PEPPER ROMERO", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1729289211671 },
  { sku: "PEP-ITA-YELL", name: "PEPPER YELLOW ITALIAN", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1724272721060 },
  { sku: "PEP-RED", name: "PEPPER RED", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1731107883661 },
  { sku: "COURGETTE", name: "COURGETTE", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1731622291289 },
  { sku: "CAB-FLAT", name: "CABBAGE FLAT", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1721638920185 },
  { sku: "CAB-RED", name: "CABBAGE RED", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1731276138055 },
  { sku: "ONI-SW", name: "ONION SWEET WHITE", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1731879578918 },
  { sku: "ONI-B", name: "ONION BABY KG", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1728255571321 },
  { sku: "POT-NEW-BOX", name: "POTATOES NEW", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1730325098499 },
  { sku: "CUCUMB", name: "CUCUMBER", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1731710409284 },
  { sku: "CORN-SWT-EA", name: "CORN ON THE COB P/P", unit: "Each", price: null, category: "Vegetables", lastOrderDate: 1731107883661 },
  { sku: "PARSNIP", name: "PARSNIP", unit: "Kg", price: null, category: "Vegetables", lastOrderDate: 1732056077570 },
  { sku: "ORIL99", name: "Golden Swan - Lychee in Syrup 24 x 567ml", unit: "Pack", price: 1.96, category: "Dry Goods", lastOrderDate: null },
  { sku: "SUGS10", name: "Soft Light Brown Sugar - Tate & Lyle 3kg", unit: "Unit", price: 8.21, category: "Dry Goods", lastOrderDate: 1725659421971 },
  { sku: "ORIT23", name: "Tofu Silken - Yutaka - Ambient", unit: "Unit", price: 2.21, category: "Dry Goods", lastOrderDate: null },
  { sku: "CASTER", name: "CASTER SUGAR 5KG", unit: "Each", price: null, category: "Dry Goods", lastOrderDate: 1725052896584 },
  { sku: "MALDON", name: "MALDON SEA SALT 1.4KG", unit: "Each", price: null, category: "Dry Goods", lastOrderDate: 1727031439158 },
  { sku: "COCO-CHAOK", name: "COCONUT MILK CHAOKOH 2.9KG", unit: "EA", price: null, category: "Dry Goods", lastOrderDate: 1724273240172 },
  { sku: "GAR-POW", name: "GARLIC POWDER 500G", unit: "Each", price: null, category: "Dry Goods", lastOrderDate: 1725310061805 },
  { sku: "KETCH-HEINZ", name: "HEINZ TOMATO KETCHUP 2.2KG", unit: "Each", price: null, category: "Dry Goods", lastOrderDate: 1731107883661 },
  { sku: "VINEGAR-WHITE", name: "VINEGAR WHITE WINE 5LTR", unit: "Each", price: null, category: "Dry Goods", lastOrderDate: 1731969183927 },
  { sku: "EGGFRC1", name: "Eggs Barn Clarence Court -  Burfords 5 Dozen - 60 Eggs", unit: "Pack", price: 31.11, category: "Dairy & Eggs", lastOrderDate: 1730928741283 },
];

export const ouiChefCatalogueItems = rawOuiChefCatalogue
  .map((product) => ({
    id: `oui-${slugify(product.sku)}-${slugify(product.unit)}-${slugify(product.name)}`,
    ingredient: product.name,
    supplier: "Oui Chef",
    supplierProduct: product.name,
    unit: normalizeUnit(product.unit),
    fallbackPrice: product.price,
    preferred: product.lastOrderDate !== null,
    category: product.category,
    sku: product.sku,
    lastOrdered:
      product.lastOrderDate !== null
        ? new Date(product.lastOrderDate).toISOString()
        : undefined,
  }))
  .sort(
    (a, b) =>
      Number(b.preferred) - Number(a.preferred) ||
      a.category.localeCompare(b.category) ||
      a.supplierProduct.localeCompare(b.supplierProduct)
  );

export const ouiChefCatalogueStats = {
  total: rawOuiChefCatalogue.length,
  preferred: rawOuiChefCatalogue.filter(
    (product) => product.lastOrderDate !== null
  ).length,
  nonPreferred: rawOuiChefCatalogue.filter(
    (product) => product.lastOrderDate === null
  ).length,
};
