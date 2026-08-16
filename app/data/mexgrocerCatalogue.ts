/**
 * Mexgrocer catalogue for Kitchen Insights.
 *
 * Generated from mexgrocer-products.json (2026-08-16T17:32:43.833Z).
 * The raw export is retained below; the default catalogue removes obvious
 * alcohol, gifts, books, kitchenware, decorations, and unrelated retail items.
 */

export interface MexgrocerProduct {
  itemId: number | null;
  title: string;
  url: string;
  department: string;
  categorySlug: string;
  availability: string;
  price: number | null;
  priceFrom: boolean;
  image: string;
}

export interface MexgrocerCatalogueExclusion {
  itemId: number | null;
  title: string;
  reason: string;
}

export const rawMexgrocerCatalogue: readonly MexgrocerProduct[] = [
  {
    "itemId": 4435,
    "title": "10\" Poco Loco Flour Tortillas",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/10-poco-loco-flour-tortillas",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 6.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/10%20inch%20Tortillas%20Poco%20Loco.jpg?t=1772013777"
  },
  {
    "itemId": 4437,
    "title": "12\" Poco Loco Flour Tortillas",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/12-poco-loco-flour-tortillas",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 8.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/12%20Poco%20Loco.jpg?t=1672851728"
  },
  {
    "itemId": 4402,
    "title": "16cm Black Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/16cm-black-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "Out of Stock",
    "price": 26.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2016cm%20Black%201.JPG?t=1695111325"
  },
  {
    "itemId": 4403,
    "title": "16cm Red Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/16cm-red-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "Out of Stock",
    "price": 26.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2016cm%20Red%201.jpg?t=1695111320"
  },
  {
    "itemId": 4398,
    "title": "16cm Tortilla Press Silver",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/16cm-tortilla-press-silver",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "In Stock",
    "price": 26.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2016cm%20Silver%201.jpg?t=1695111325"
  },
  {
    "itemId": 7100,
    "title": "1800 Coconut Liqueur 50ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/1800-coconut-liqueur-50ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Coconut%20Liqueur%2050ml.jpg?t=1723537268"
  },
  {
    "itemId": 6348,
    "title": "1800 Coconut Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/1800-coconut-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Coconut%20Liqueur.jpg?t=1723537268"
  },
  {
    "itemId": 5417,
    "title": "1800 Tequila Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/1800-tequila-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 63.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Tequila%20Anejo.jpg?t=1720604506"
  },
  {
    "itemId": 4220,
    "title": "1800 Tequila Cristalino 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/1800-tequila-cristalino-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 67.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Tequila%20Crsitalino.jpg?t=1720604716"
  },
  {
    "itemId": 6278,
    "title": "1800 Tequila Mini Silver 50ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/1800-tequila-mini-silver-50ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 3,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20mini%20silver.jpg?t=1723536171"
  },
  {
    "itemId": 5410,
    "title": "1800 Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/1800-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 49.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Tequila%20Reposado.jpg?t=1720604506"
  },
  {
    "itemId": 4221,
    "title": "1800 Tequila Silver 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/1800-tequila-silver-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 54,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1800%20Tequila%20Blanco.jpg?t=1720604506"
  },
  {
    "itemId": 4399,
    "title": "19cm Black Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/19cm-black-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2019cm%20Black%201.JPG?t=1727092809"
  },
  {
    "itemId": 5617,
    "title": "19cm Red Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/19cm-red-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "Out of Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2019cm%20Red%201.jpg?t=1660147763"
  },
  {
    "itemId": 4401,
    "title": "19cm Silver Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/19cm-silver-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2019cm%20Silver%201.jpg?t=1660147763"
  },
  {
    "itemId": 5618,
    "title": "25cm Silver Tortilla Press",
    "url": "https://www.mexgrocer.co.uk/food/tortilla-press/25cm-silver-tortilla-press",
    "department": "food",
    "categorySlug": "tortilla-press",
    "availability": "In Stock",
    "price": 58.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20Press%2025cm.jpg?t=1680710741"
  },
  {
    "itemId": 4884,
    "title": "6\" Cream Plastic Tortilla Warmer",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/6-cream-plastic-tortilla-warmer",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cream%20Warmer%202.jpg?t=1671410822"
  },
  {
    "itemId": 5404,
    "title": "6\" Plastic Tortilla Warmer - Red",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/6-plastic-tortilla-warmer-red",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Plastic%20tortilla%20warmer%20red.jpg?t=1660147763"
  },
  {
    "itemId": 6869,
    "title": "818 Blanco Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/818-blanco-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 48.97,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/818%20Blanco%20Tequila%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 6870,
    "title": "818 Repsado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/818-repsado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 58.74,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/818%20Reposado.jpg?t=1695284104"
  },
  {
    "itemId": 5758,
    "title": "Abasolo Corn Whisky 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/abasolo-corn-whisky-700ml",
    "department": "drinks",
    "categorySlug": "",
    "availability": "In Stock",
    "price": 48.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Absalo%20Wiskey.jpg?t=1723508544"
  },
  {
    "itemId": 4879,
    "title": "Abuelita Chocolate 540g",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/abuelita-chocolate-540g",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "Out of Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nestle%20Abuelita%20Chocolate.JPG?t=1724314942"
  },
  {
    "itemId": 7473,
    "title": "Aciduladito Sweets 500g",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/aciduladito-sweets-500g",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "Out of Stock",
    "price": 11.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Aciduladtio%20Sweets%20500g.png?t=1784709713"
  },
  {
    "itemId": 7121,
    "title": "Agave Syrup 25kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/agave-syrup-25kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 170,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%2025kg.jpg?t=1733234757"
  },
  {
    "itemId": 5853,
    "title": "Agave Syrup 330g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/agave-syrup-330g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%20330g%20updated.jpg?t=1772015703"
  },
  {
    "itemId": 5755,
    "title": "Agave Syrup 5.6kg",
    "url": "https://www.mexgrocer.co.uk/food/desserts/agave-syrup-56kg",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 55,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%205.6kg.jpg?t=1763130444"
  },
  {
    "itemId": 7222,
    "title": "Agavesito 500ml Agave Syrup",
    "url": "https://www.mexgrocer.co.uk/brands/agavesito/agavesito-500ml-agave-syrup",
    "department": "brands",
    "categorySlug": "agavesito",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agavesito%20500ml.jpg?t=1738594610"
  },
  {
    "itemId": 4261,
    "title": "Alipus San Andres Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/alipus-san-andres-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alipus%20San%20Andres%20Mezcal.jpg?t=1723537268"
  },
  {
    "itemId": 4262,
    "title": "Alipus San Baltazar Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/alipus-san-baltazar-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 66,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alipus%20San%20Balt%20Mezcal.jpg?t=1723537268"
  },
  {
    "itemId": 4290,
    "title": "Alipus San Juan Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/alipus-san-juan-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 64.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alipus%20San%20Juan%20Mezcal.jpg?t=1723508544"
  },
  {
    "itemId": 4263,
    "title": "Alipus Santa Ana Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/alipus-santa-ana-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 66,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alipus%20Santa%20Ana%20Mezcal.jpg?t=1723494117"
  },
  {
    "itemId": 7091,
    "title": "Alma Finca Orange Liquer 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/alma-finca-orange-liquer-40-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 39.59,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alma%20Finca%20Orange%20Liquer%2040%25%20700ml.jpg?t=1723537268"
  },
  {
    "itemId": 4258,
    "title": "Amaras Cupreata Guerrero Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/amaras-cupreata-guerrero-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "Out of Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Amores%20Cupreata.jpg?t=1731344343"
  },
  {
    "itemId": 6672,
    "title": "Amaras Espadin Reposado Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/amaras-espadin-reposado-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 65.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Amores%20Reposado.jpg?t=1723508544"
  },
  {
    "itemId": 6847,
    "title": "Amargo Angostura Vallet Liqueur 45% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/amargo-angostura-vallet-liqueur-45-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 33.76,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Amargo%20Angostura%20Vallet%20Liqueur%2045%25%20700ml.jpg?t=1689934435"
  },
  {
    "itemId": 5958,
    "title": "Ancho Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/ancho-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Powder%202.jpg?t=1660837606"
  },
  {
    "itemId": 7463,
    "title": "Ancho Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/crushed-chillies/ancho-flakes-500g",
    "department": "food",
    "categorySlug": "crushed-chillies",
    "availability": "In Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Flakes%20500g.png?t=1782384603"
  },
  {
    "itemId": 5408,
    "title": "Ancho Reyes Chilli Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/ancho-reyes-chilli-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 55.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20reyes%20liquor.jpg?t=1723515810"
  },
  {
    "itemId": 4829,
    "title": "Ancho Reyes Verde Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/ancho-reyes-verde-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 55.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Reyes%20Poblano%20chillie%20liquor.jpg?t=1723508544"
  },
  {
    "itemId": 5220,
    "title": "Ancho Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/ancho-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 36,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Whole%202.jpg?t=1720604506"
  },
  {
    "itemId": 4944,
    "title": "Animas Espadin Cupreata 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/animas-espadin-cupreata-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "In Stock",
    "price": 82.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Animas%20Mezcal%20Espadin%20Cupreata%20700ml.jpg?t=1723536171"
  },
  {
    "itemId": 6945,
    "title": "Antica Cantina Cheese Dip 300g",
    "url": "https://www.mexgrocer.co.uk/food/cheese/antica-cantina-cheese-dip-300g",
    "department": "food",
    "categorySlug": "cheese",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Antica%20Cantina%20Cheese%20Dip%20300g.jpg?t=1706477178"
  },
  {
    "itemId": 7464,
    "title": "Arbol Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/arbol-flakes-500g",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "In Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/arbol%20flakes.jpg?t=1782384603"
  },
  {
    "itemId": 5219,
    "title": "Arbol Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/food/chillies/whole-dried-chillies/arbol-whole-dried-chilli-1kg",
    "department": "food",
    "categorySlug": "whole-dried-chillies",
    "availability": "In Stock",
    "price": 46,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Arbol%20Whole.jpg?t=1720604506"
  },
  {
    "itemId": 5081,
    "title": "Arette Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/arette-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "Out of Stock",
    "price": 36,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Arrette%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 5067,
    "title": "Arette Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/arette-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 39.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Arrette%20Repo.jpg?t=1720604506"
  },
  {
    "itemId": 5846,
    "title": "Armonico Gin Seco 50%  500ml bottle",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/armonico-gin-seco-50-500ml-bottle",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 50.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Armonico.png?t=1723515810"
  },
  {
    "itemId": 6349,
    "title": "ArteNOM 1146 Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/artenom-1146-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 85.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/ArteNOM%20Anejo.jpg?t=1720604506"
  },
  {
    "itemId": 6351,
    "title": "ArteNOM 1414 Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/artenom-1414-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 72,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/ArteNOM%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 6350,
    "title": "ArteNOM 1579 Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/artenom-1579-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 66,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/ArteNOM%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 6787,
    "title": "ASADA The Art of Mexican-Style Grilling",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/asada-the-art-of-mexican-style-grilling",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/ASADA%20The%20Art%20of%20Mexcan-Style%20Grilling.jpg?t=1680710741"
  },
  {
    "itemId": 4850,
    "title": "Avocado Leaf Powder 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/speciality/avocado-leaf-powder-1kg",
    "department": "catering-sizes",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Powder.png?t=1714565486"
  },
  {
    "itemId": 4983,
    "title": "Avocado Leaves Whole 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/speciality/avocado-leaves-whole-1kg",
    "department": "catering-sizes",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 38.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Leaves%20Whole.jpg?t=1660147763"
  },
  {
    "itemId": 5086,
    "title": "Bacanora Aguamiel 700ml  41%",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/bacanora-aguamiel-700ml-41",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "Out of Stock",
    "price": 57.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Bacanora%20Aguamiel%20750ml%20-%20New.jpg?t=1723536171"
  },
  {
    "itemId": 6614,
    "title": "Bacanora Santo Pecado",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/bacanora-santo-pecado",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 57.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Bacanora%20Santo%20Pecado.jpg?t=1723537268"
  },
  {
    "itemId": 5063,
    "title": "Balam Raicilla Costa 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/balam-raicilla-costa-700ml",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Balam%20Raicilla%20Costa.png?t=1723515810"
  },
  {
    "itemId": 5079,
    "title": "Balam Raicilla Madurado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/balam-raicilla-madurado-700ml",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "Out of Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Balam%20Raicilla%20Madurado.png?t=1723536171"
  },
  {
    "itemId": 4960,
    "title": "Balam Raicilla Sierra 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/balam-raicilla-sierra-700ml",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Balam%20Raicilla%20Sierra.png?t=1723515810"
  },
  {
    "itemId": 6499,
    "title": "Barrilito Beer 325ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/barrilito-beer-325ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "Out of Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Barrilito.jpg?t=1663328465"
  },
  {
    "itemId": 7261,
    "title": "Bohemia Oscura 355ml Mexican Beer",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/bohemia-oscura-355ml-mexican-beer",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.84,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Bohemia%20Oscura%20355ml.jpg?t=1749132318"
  },
  {
    "itemId": 4996,
    "title": "Boing Grape 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-grape-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Grape%20237ml%20NEW.jpg?t=1772015699"
  },
  {
    "itemId": 5085,
    "title": "Boing Guava 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-guava-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Guava.jpg?t=1720604716"
  },
  {
    "itemId": 7241,
    "title": "BOING JUICY KIT",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-juicy-kit",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 6.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/BOING%20JUICY%20KIT.jpg?t=1746021934"
  },
  {
    "itemId": 4963,
    "title": "Boing Mango 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-mango-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Mango%20237ml%20NEW.jpg?t=1772015699"
  },
  {
    "itemId": 6341,
    "title": "Boing Strawberry 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-strawberry-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Strawberry%20237ml%20NEW.jpg?t=1772015700"
  },
  {
    "itemId": 6641,
    "title": "Botanero Kit | Chicharron & Valentina Salsa",
    "url": "https://www.mexgrocer.co.uk/meals/kits/botanero-kit-chicharron-valentina-salsa",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 4.75,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Botanero%20kit%20-%20NEW.jpg?t=1750773219"
  },
  {
    "itemId": 5698,
    "title": "Botanero Salsa Clasica Hot Sauce 370g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/mild-table-sauces/botanero-salsa-clasica-hot-sauce-370g",
    "department": "food",
    "categorySlug": "mild-table-sauces",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/botanera.jpg?t=1723515810"
  },
  {
    "itemId": 5304,
    "title": "Bruxo No.1 Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/bruxo-no1-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 55.51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/bottle%20Bruxo%20No.1%20new.jpg?t=1723537268"
  },
  {
    "itemId": 5027,
    "title": "Bruxo No.2 Mezcal Joven 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/bruxo-no2-mezcal-joven-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 58.08,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/bottle%20Bruxo%20No.2%20new.jpg?t=1723508544"
  },
  {
    "itemId": 4907,
    "title": "Bruxo No.3 Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/bruxo-no3-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "In Stock",
    "price": 67.76,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/bottle%20Bruxo%20No.3%20new.jpg?t=1723494117"
  },
  {
    "itemId": 4242,
    "title": "Bruxo No.4 Blend Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/bruxo-no4-blend-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "In Stock",
    "price": 74.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/bottle%20Bruxo%20No.4%20new.jpg?t=1723494117"
  },
  {
    "itemId": 4243,
    "title": "Bruxo No.5 Tobala Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/bruxo-no5-tobala-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "Out of Stock",
    "price": 102.56,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/bottle%20Bruxo%20No.5%20new.jpg?t=1723508544"
  },
  {
    "itemId": 4244,
    "title": "Bruxo X Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/bruxo-x-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 43.86,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20Bruxo%20X.jpg?t=1723494117"
  },
  {
    "itemId": 5532,
    "title": "Bufalo Clasico Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/hot-sauces/bufalo-clasico-hot-sauce-150ml",
    "department": "food",
    "categorySlug": "hot-sauces",
    "availability": "Out of Stock",
    "price": 2.1,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Bufalo%20Clasico%20Hot%20Sauce%20150ml%20%28new%29.jpg?t=1712757656"
  },
  {
    "itemId": 5316,
    "title": "Cabrito Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/cabrito-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 37.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cabrito%20blanco.jpg?t=1720604716"
  },
  {
    "itemId": 7352,
    "title": "Cacto Original Prickly Pear & White Peach Soda 330ml",
    "url": "https://www.mexgrocer.co.uk/brands/cacto/cacto-original-prickly-pear-white-peach-soda-330ml",
    "department": "brands",
    "categorySlug": "cacto",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cacto%20Peach%20SKU.png?t=1770027620"
  },
  {
    "itemId": 7351,
    "title": "Cacto Original Prickly Pear Soda 330ml",
    "url": "https://www.mexgrocer.co.uk/brands/cacto/cacto-original-prickly-pear-soda-330ml",
    "department": "brands",
    "categorySlug": "cacto",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cacto%20Prickly%20Pear%20SKU.png?t=1770027620"
  },
  {
    "itemId": 5307,
    "title": "Calle 23 Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/calle-23-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 73.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Calle%2023%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 5313,
    "title": "Calle 23 Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/calle-23-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 49.44,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Calle%2023%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 5312,
    "title": "Calle 23 Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/calle-23-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 61.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Calle%2023%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 7354,
    "title": "Cantinero Tequila Anejo 38% 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/cantinero/cantinero-tequila-anejo-38-700ml",
    "department": "brands",
    "categorySlug": "cantinero",
    "availability": "In Stock",
    "price": 33.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cantinero%20Anejo%20750ml.jpg?t=1764065780"
  },
  {
    "itemId": 6008,
    "title": "Cantinero Tequila Blanco 38% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cantinero-tequila-blanco-38-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 30.47,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cantinero%20Blanco%2038%25%20750ml.jpg?t=1764065778"
  },
  {
    "itemId": 6009,
    "title": "Cantinero Tequila Reposado 38% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/cantinero-tequila-reposado-38-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 30.76,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cantinero%20Reposado%2038%25%20750ml.jpg?t=1764065778"
  },
  {
    "itemId": 7394,
    "title": "Cantinero Tequila Triple Pack",
    "url": "https://www.mexgrocer.co.uk/brands/cantinero/cantinero-tequila-triple-pack",
    "department": "brands",
    "categorySlug": "cantinero",
    "availability": "In Stock",
    "price": 90,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cantinero%20Tequila%20Triple%20Pack.jpg?t=1769520319"
  },
  {
    "itemId": 7120,
    "title": "Carey Tomatillo Whole 340g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/carey/carey-tomatillo-whole-340g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "carey",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Carey%20Tomatillo%20Whole%20340g%20NEW.jpg?t=1772030737"
  },
  {
    "itemId": 5842,
    "title": "Casa Argentina - Chimichurri Mixed Dried Herbs 100g",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/argentina/casa-argentina-chimichurri-mixed-dried-herbs-100g",
    "department": "food",
    "categorySlug": "argentina",
    "availability": "Out of Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casa-Argentina-Premium-Chimichurri-Mixed-dried-herbs-x-100g.jpg?t=1663328465"
  },
  {
    "itemId": 6663,
    "title": "Casa Dragones Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/casa-dragones-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 186.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casa%20Dragones%20Tequila%20Anejo%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 5482,
    "title": "Casa Dragones Joven Tequila 700ml  40%",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/casa-dragones-joven-tequila-700ml-40",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 306.72,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casa_Dragones_Joven.jpg?t=1720604716"
  },
  {
    "itemId": 4964,
    "title": "Casa Dragones Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/casa-dragones-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "Out of Stock",
    "price": 99.43,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casa%20Dragones%20Tequila%20Blanco%20700ml%201.jpg?t=1720604506"
  },
  {
    "itemId": 5760,
    "title": "Casamigos Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/casamigos-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 84,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casamigos%20Anejo.jpg?t=1723515810"
  },
  {
    "itemId": 5761,
    "title": "Casamigos Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/casamigos-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 68.76,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casamigos%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 5483,
    "title": "Casamigos Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/casamigos-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 81.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casamigos%20-%20NEW.jpg?t=1720604716"
  },
  {
    "itemId": 5543,
    "title": "Cascabel Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/cascabel-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cascabel.jpg?t=1660837606"
  },
  {
    "itemId": 6208,
    "title": "Cascahuin Blanco Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/cascahuin-blanco-tequila-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "Out of Stock",
    "price": 41.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cascahuin%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 6209,
    "title": "Cascahuin Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/cascahuin-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 44.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cascahuin%20Reposado.jpg?t=1720604506"
  },
  {
    "itemId": 6748,
    "title": "Catrina Blanco Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/catrina-blanco-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 44.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Catrina%20Blanco%20Tequila%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 6750,
    "title": "Catrina Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/catrina-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 47.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Catrina%20Reposado%20Tequila%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 7074,
    "title": "Cazcabel Blanco Tequila 38% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cazcabel-blanco-tequila-38-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 34.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Blanco_100%25_agave%20%284%29.png?t=1717148375"
  },
  {
    "itemId": 7073,
    "title": "Cazcabel Coconut Tequila 34% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cazcabel-coconut-tequila-34-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 33,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/COCO.png?t=1717148376"
  },
  {
    "itemId": 7076,
    "title": "Cazcabel Honey Tequila 34% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cazcabel-honey-tequila-34-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 33.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1.CAZ_HONEY%20%283%29.png?t=1782226141"
  },
  {
    "itemId": 7075,
    "title": "Cazcabel Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cazcabel-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 36.36,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/1.CAZ_REPOSADO.png?t=1718352471"
  },
  {
    "itemId": 4300,
    "title": "Cerveza Noche Buena 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/cerveza-noche-buena-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.84,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Noche%20Buena.jpg?t=1664795200"
  },
  {
    "itemId": 4233,
    "title": "Charanda El Tarasco Rum Silver 700ml 38%",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/charanda-el-tarasco-rum-silver-700ml-38",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 44.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Tarasco%20Gran%20Reserva%20Silver.jpg?t=1723508544"
  },
  {
    "itemId": 4236,
    "title": "Charanda Sol Tarasco Extra Aged Rum 700ml 40%",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/charanda-sol-tarasco-extra-aged-rum-700ml-40",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 56.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sol%20Tarasco%20Extra%20Aged.jpg?t=1723537268"
  },
  {
    "itemId": 5587,
    "title": "Charro Hat",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/charro-hat",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "Out of Stock",
    "price": 57.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Charro%20Hat%20Black%20%26%20Silver%201.jpg?t=1683612626"
  },
  {
    "itemId": 7439,
    "title": "Chatica Small Panela Sugar Cane 500g",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/chatica-small-panela-sugar-cane-500g",
    "department": "food",
    "categorySlug": "latin-american-food",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Panela.jpg?t=1779449710"
  },
  {
    "itemId": 7363,
    "title": "Che Dulce de Leche Classic Style 1kg",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/che-dulce-de-leche-classic-style-1kg",
    "department": "food",
    "categorySlug": "latin-american-food",
    "availability": "Out of Stock",
    "price": 17,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Che%20Dulce%20de%20Leche%20Classic%20Style%201kg.jpg?t=1765458110"
  },
  {
    "itemId": 6218,
    "title": "Chicharron 100g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-100g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharon%20100g.jpg?t=1663328465"
  },
  {
    "itemId": 7063,
    "title": "CHICHARRON 100G (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-100g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharron%20100g%20%28Pack%203%29.jpg?t=1723508544"
  },
  {
    "itemId": 6219,
    "title": "Chicharron Jalapeno 70g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-jalapeno-70g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/KAI030_20x70g.jpg?t=1710163896"
  },
  {
    "itemId": 7229,
    "title": "Chicharron Jalapeno 70g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-jalapeno-70g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 7,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharron%20Jalapeno%2070g%20%28Pack%203%29.jpg?t=1739274060"
  },
  {
    "itemId": 6838,
    "title": "Chilaquiles Verdes Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/chilaquiles-verdes-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 9.75,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chilaquiles%20Verdes%20Kit.jpg?t=1768319113"
  },
  {
    "itemId": 5930,
    "title": "Chipotle Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/chipotle-chilli-flakes-500g",
    "department": "food",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 21,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chipotle%20Crushed%202.JPG?t=1739971556"
  },
  {
    "itemId": 5232,
    "title": "Chipotle Morita Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/chipotle-morita-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "Out of Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/chipotle%20morita%20powder.jpg?t=1741254268"
  },
  {
    "itemId": 5430,
    "title": "Chocolate Drink Pack with Wood Molinillo",
    "url": "https://www.mexgrocer.co.uk/meals/kits/chocolate-drink-pack-with-wood-molinillo",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chocolate%20Drink%20Pack%20with%20Wood%20Molinillo.jpg?t=1741597495"
  },
  {
    "itemId": 5434,
    "title": "Cholula Chipotle Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-chipotle-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cholula-chipotle-hot-sauce.jpg?t=1663328465"
  },
  {
    "itemId": 5428,
    "title": "Cholula Garlic and Chili Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-garlic-and-chili-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20garlic.jpg?t=1663328465"
  },
  {
    "itemId": 4465,
    "title": "Cholula Limon Hot Sauce150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-limon-hot-sauce150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20Limon%20150ml.JPG?t=1730377369"
  },
  {
    "itemId": 6015,
    "title": "Cholula Origianl Hot Sauce 1.9lt",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-origianl-hot-sauce-19lt",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 21.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20catering.jpg?t=1663328465"
  },
  {
    "itemId": 4464,
    "title": "Cholula Original Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-original-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20original.jpg?t=1663920238"
  },
  {
    "itemId": 6824,
    "title": "Cholula Sauce Collection",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-sauce-collection",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20Sauce%20Collection.jpg?t=1720604716"
  },
  {
    "itemId": 5052,
    "title": "Chorizo Unit",
    "url": "https://www.mexgrocer.co.uk/food/speciality/chorizo-unit",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 12.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chorizo%20Unit.jpg?t=1703157595"
  },
  {
    "itemId": 4988,
    "title": "Churros Mix - Pronto 350g",
    "url": "https://www.mexgrocer.co.uk/brands/pronto/churros-mix-pronto-350g",
    "department": "brands",
    "categorySlug": "pronto",
    "availability": "Out of Stock",
    "price": 3.7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Churros%20Pronto.jpg?t=1664272172"
  },
  {
    "itemId": 5431,
    "title": "Churrumais 64g Crispy Corn Sticks with Lime",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/churrumais-64g-crispy-corn-sticks-with-lime",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/churrumais.jpg?t=1738848131"
  },
  {
    "itemId": 7064,
    "title": "Churrumaiz 64g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/churrumaiz-64g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/churrumais%203%20pack.jpg?t=1723494117"
  },
  {
    "itemId": 6352,
    "title": "Cimarron Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/cimarron-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 34.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cimarron.jpg?t=1720604716"
  },
  {
    "itemId": 6729,
    "title": "Ciudad de Mexico Cookbook",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/ciudad-de-mexico-cookbook",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "Out of Stock",
    "price": 26,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ciudad%201.jpg?t=1669978621"
  },
  {
    "itemId": 5365,
    "title": "Clamato 946ml Bottle",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-946ml-bottle",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 7.08,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato.JPG?t=1723730375"
  },
  {
    "itemId": 6827,
    "title": "Clamato Bottle 296ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-bottle-296ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Bottle%20296ml%20NEW.jpg?t=1772030747"
  },
  {
    "itemId": 7206,
    "title": "Clamato Cubano Bottle 946ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-cubano-bottle-946ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Cubano%20Bottle%20946g.jpg?t=1733229633"
  },
  {
    "itemId": 7452,
    "title": "Clamato Cubano Glass Bottle 473ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-cubano-glass-bottle-473ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 4.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Cubano%20Glass%20Bottle%20473ml.jpg?t=1781789299"
  },
  {
    "itemId": 4519,
    "title": "Clemente Jacques Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 14.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Chipotle%20in%20Adobo%20%20NEW.jpg?t=1772016227"
  },
  {
    "itemId": 4521,
    "title": "Clemente Jacques Chipotle in Adobo 210g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-in-adobo-210g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Chipotle%20in%20Adobo%20210g%20NEW.jpg?t=1772016226"
  },
  {
    "itemId": 6236,
    "title": "Clemente Jacques Chipotle Mashed 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-mashed-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 3.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20chipotle%20squeeze%20220g.jpg?t=1776695924"
  },
  {
    "itemId": 7231,
    "title": "Clemente Jacques Habanero Relish 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-habanero-relish-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Habanero%20Relish%20220g.jpg?t=1739278220"
  },
  {
    "itemId": 6882,
    "title": "Clemente Jacques Home Style Casera Salsa 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-home-style-casera-salsa-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656057011%20-%20Clemente%20Jacques%20Casera%20Salsa.jpg?t=1740057626"
  },
  {
    "itemId": 5577,
    "title": "Clemente Jacques Jalapeno Chillies in Slices 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-chillies-in-slices-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Chillies%20in%20Slices%20220g%20updated.jpg?t=1739884345"
  },
  {
    "itemId": 4522,
    "title": "Clemente Jacques Jalapeno Chillies Whole 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-chillies-whole-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 1.7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/jacques%20jalapeno%20whole%20220g.jpg?t=1776695861"
  },
  {
    "itemId": 7215,
    "title": "Clemente Jacques Jalapeno Mashed 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-mashed-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Mashed%20220g.jpg?t=1737451343"
  },
  {
    "itemId": 7061,
    "title": "Clemente Jacques Jalapeno Nacho Slice 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-nacho-slice-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 8.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Nacho%20Slice%202.8kg.jpg?t=1714637527"
  },
  {
    "itemId": 5513,
    "title": "Clemente Jacques Jalapenos Nacho 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapenos-nacho-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente-Jacques-Nachos-220g.jpg?t=1776695894"
  },
  {
    "itemId": 6248,
    "title": "Clemente Jacques Salsa Verde Bottle 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-salsa-verde-bottle-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656056011%20-%20Clemente%20Jacques%20Salsa%20Verde.jpg?t=1740057597"
  },
  {
    "itemId": 6891,
    "title": "Clemente Jacques Taquera Salsa Bottle 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-taquera-salsa-bottle-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656058011%20-%20Clemente%20Jacques%20Taquera%20Salsa.jpg?t=1740057627"
  },
  {
    "itemId": 6246,
    "title": "Clemente Jacques Whole Jalapeno 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-whole-jalapeno-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 5.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapenos%20Whole%202.8kg.jpg?t=1776702246"
  },
  {
    "itemId": 6792,
    "title": "Clemente Jacques Whole Tomatillo 3kg Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-whole-tomatillo-3kg-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Whole%20Tomatillo%203kg.jpg?t=1772017899"
  },
  {
    "itemId": 5807,
    "title": "Clutch Tassels Bag",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/waxaca-mx/clutch-tassels-bag",
    "department": "fashion-craft-gifts",
    "categorySlug": "waxaca-mx",
    "availability": "In Stock",
    "price": 52,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clutch%20Tassel%20bag.jpg?t=1663328465"
  },
  {
    "itemId": 6867,
    "title": "Cocina Mexicana Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/cocina-mexicana-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cocina%20Mexicana%20.jpg?t=1695046513"
  },
  {
    "itemId": 6629,
    "title": "Codigo 1530 Mezcal Ancestral/Joven 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/codigo-1530-mezcal-ancestraljoven-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 180,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Codigo%20Mezcal%20Ancestral.jpg?t=1723537268"
  },
  {
    "itemId": 6619,
    "title": "Codigo 1530 Tequila Extra Anejo Origen 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/codigo-1530-tequila-extra-anejo-origen-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 324.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Codigo%20Extra%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 5828,
    "title": "Comal Imusa 28cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/comal-imusa-28cm",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "In Stock",
    "price": 36,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Comal%20Edit.jpg?t=1664577335"
  },
  {
    "itemId": 5737,
    "title": "Comida Mexicana Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/comida-mexicana-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Comida%20Mexicana%20Book.jpg?t=1663328465"
  },
  {
    "itemId": 4245,
    "title": "Corte Vetusto Mezcal Joven Ensamble 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/corte-vetusto-mezcal-joven-ensamble-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "In Stock",
    "price": 102,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Corte%20Vetusto%20Ensamble%20Mezcal%20new.jpg?t=1723536171"
  },
  {
    "itemId": 4246,
    "title": "Corte Vetusto Mezcal Joven Espadin 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/corte-vetusto-mezcal-joven-espadin-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 63.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Corte%20Vetusto%20Espadin%20Mezcal%20new.jpg?t=1723508544"
  },
  {
    "itemId": 4247,
    "title": "Corte Vetusto Mezcal Joven Tobala 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/corte-vetusto-mezcal-joven-tobala-700ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "In Stock",
    "price": 102,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Corte%20Vetusto%20Tobala%20Mezcal%20new.jpg?t=1723515810"
  },
  {
    "itemId": 6589,
    "title": "Curado Blue Agave 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/curado-blue-agave-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 50.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Curado%20Blue%20Agave.jpg?t=1720604716"
  },
  {
    "itemId": 6588,
    "title": "Curado Cupreta 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/curado-cupreta-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 50.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Curado%20Cupreta.jpg?t=1720604716"
  },
  {
    "itemId": 6587,
    "title": "Curado Espadin 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/curado-espadin-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 50.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Curado%20Espadin.jpg?t=1720604716"
  },
  {
    "itemId": 5022,
    "title": "D'aristi Xtabentun 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/daristi-xtabentun-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "Out of Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/XTA%20New%20Bottle.jpg?t=1723537268"
  },
  {
    "itemId": 7289,
    "title": "Day of the Dead Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/day-of-the-dead-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 26,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Day%20of%20the%20Dead.jpg?t=1757426578"
  },
  {
    "itemId": 7046,
    "title": "De La Rosa Japanese Peanuts 14 Pieces",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/de-la-rosa-japanese-peanuts-14-pieces",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "Out of Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/De%20La%20Rosa%20Japanese%20Peanuts%2014%20Pieces.jpg?t=1772017899"
  },
  {
    "itemId": 5302,
    "title": "Del Maguey Mezcal Chichicapa 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/del-maguey-mezcal-chichicapa-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 99.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Del%20Maguey%20Mezcal%20Chichicapa.jpg?t=1723494117"
  },
  {
    "itemId": 5300,
    "title": "Del Maguey Mezcal San Luis Del Rio 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/del-maguey-mezcal-san-luis-del-rio-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 114,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Del%20Maguey%20Mezcal%20SLdR%20Azul.jpg?t=1723494117"
  },
  {
    "itemId": 5299,
    "title": "Del Maguey Mezcal Vida 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/del-maguey-mezcal-vida-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 61.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Del%20Maguey%20Mezcal%20Vida.jpg?t=1723537268"
  },
  {
    "itemId": 5959,
    "title": "Discreto Encanto Red Wine",
    "url": "https://www.mexgrocer.co.uk/brands/discreto-encanto-wine/discreto-encanto-red-wine",
    "department": "brands",
    "categorySlug": "discreto-encanto-wine",
    "availability": "In Stock",
    "price": 22.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Discreto%20Encanto%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 5310,
    "title": "Don Julio Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/don-julio-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "Out of Stock",
    "price": 84,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20Julio%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 5309,
    "title": "Don Julio Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/don-julio-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 65.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20Julio%20blanco.jpeg?t=1720604716"
  },
  {
    "itemId": 7440,
    "title": "Don Julio Paloma kit",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/gifts/don-julio-paloma-kit",
    "department": "fashion-craft-gifts",
    "categorySlug": "gifts",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20Julio%20x%20Tajin.jpg?t=1779441182"
  },
  {
    "itemId": 5308,
    "title": "Don Julio Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/don-julio-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 90,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20Julio%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 5529,
    "title": "Dona Maria Adobo 235g Mexican Cooking Sauce for Chicken & Meats",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-adobo-235g-mexican-cooking-sauce-for-chicken-meats",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Adobo%20Dona%20Maria%20-%20NEW.jpg?t=1750774577"
  },
  {
    "itemId": 6363,
    "title": "Dona Maria Green Mole 235g Green Mole Sauce with Tomatillo & Pumpkin Seeds",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-green-mole-235g-green-mole-sauce-with-tomatillo-pumpkin-seeds",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mole%20Verde%20Dona%20Maria%20-%20NEW.jpg?t=1687773165"
  },
  {
    "itemId": 6199,
    "title": "Dona Maria Mole Brown 235g Traditional Mole Sauce with Chocolate & Spices",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-mole-brown-235g-traditional-mole-sauce-with-chocolate-spices",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20Mole%20235g.jpg?t=1750774577"
  },
  {
    "itemId": 5531,
    "title": "Dona Maria Pipian 235g Mole Pipian Sauce with Roasted Pumpkin Seeds",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-pipian-235g-mole-pipian-sauce-with-roasted-pumpkin-seeds",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pipian%20Dona%20Maria%20-%20NEW.jpg?t=1750774577"
  },
  {
    "itemId": 7083,
    "title": "Dona Maria ready to use Green Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-green-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Green%20Mole%20360g.jpg?t=1720604716"
  },
  {
    "itemId": 7082,
    "title": "Dona Maria ready to use Poblano Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-poblano-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Poblano%20Mole%20360g.jpg?t=1720604716"
  },
  {
    "itemId": 7085,
    "title": "Dona Maria ready to use Red Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-red-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Red%20Mole%20360g.jpg?t=1720604506"
  },
  {
    "itemId": 4292,
    "title": "Dos Equis Lager Beer 350ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/dos-equis-lager-beer-350ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dos%20XX.png?t=1759997729"
  },
  {
    "itemId": 5541,
    "title": "Dried Black Beans 25kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/beans/dried-black-beans-25kg",
    "department": "catering-sizes",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/black%20beans%20catrinas.jpg?t=1664577335"
  },
  {
    "itemId": 5540,
    "title": "Dried Pinto Beans 25kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/beans/dried-pinto-beans-25kg",
    "department": "catering-sizes",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/pinto%20beans%2025kg.jpg?t=1720604506"
  },
  {
    "itemId": 7232,
    "title": "Durum Flour Tortillas 30cm (12\")",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/durum-flour-tortillas-30cm-12",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Durum%20Flour%20Tortillas%2030cm.jpg?t=1740050743"
  },
  {
    "itemId": 4929,
    "title": "El Camino del Pensador Ensamble 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/wild-agave-mezcals/el-camino-del-pensador-ensamble-500ml",
    "department": "drinks",
    "categorySlug": "wild-agave-mezcals",
    "availability": "Out of Stock",
    "price": 43.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Camino%20del%20Pensador%20Mezcal.JPG?t=1723536171"
  },
  {
    "itemId": 6401,
    "title": "El Camino del Pensador Espadin 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/el-camino-del-pensador-espadin-500ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 52.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Camino%20del%20Pensador%20Joven.jpg?t=1723508544"
  },
  {
    "itemId": 6819,
    "title": "El Hispano Chipotle Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/el-hispano-chipotle-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "Out of Stock",
    "price": 44.81,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Hispano%20Chipotle%20Liqueur.jpg?t=1683612626"
  },
  {
    "itemId": 6818,
    "title": "El Hispano Jalapeno Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/el-hispano-jalapeno-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 44.81,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Hispano%20Jalapeno%20Liqueur.jpg?t=1683612626"
  },
  {
    "itemId": 6215,
    "title": "El Mexicano Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Chipotle%20in%20Adobo%202.8kg.png?t=1776771321"
  },
  {
    "itemId": 4313,
    "title": "El Mexicano Pinto Beans Refried 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pinto-beans-refried-3kg",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 9.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pinto%20Beans%20Refried%203kg%20%28NEW%29.jpg?t=1711368383"
  },
  {
    "itemId": 4303,
    "title": "El Mexicano Pozole 3kg Mexican White Hominy in Brine",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pozole-3kg-mexican-white-hominy-in-brine",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pozolo%203kg.jpg?t=1776771312"
  },
  {
    "itemId": 4315,
    "title": "El Mexicano Pozole 822g Mexican White Hominy in Brine",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pozole-822g-mexican-white-hominy-in-brine",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 2.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pozole%20822g.JPG?t=1776771313"
  },
  {
    "itemId": 4305,
    "title": "El Mexicano Tomatillo Whole 767g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-tomatillo-whole-767g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 3.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Tomatillo%20Whole%20767g.JPG?t=1776771312"
  },
  {
    "itemId": 6411,
    "title": "El Rayo Tequila Plata 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/el-rayo-tequila-plata-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 39.96,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Rayo%20Plata.jpg?t=1720604506"
  },
  {
    "itemId": 6410,
    "title": "El Rayo Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/el-rayo-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 42.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Rayo%20Reposado.jpg?t=1720604506"
  },
  {
    "itemId": 6785,
    "title": "EL YUCATECO \"BIG FIVE\" HOT SAUCE KIT",
    "url": "https://www.mexgrocer.co.uk/meals/kits/el-yucateco-big-five-hot-sauce-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/EL%20YUCATECO%20HOT%20SAUCE%20KIT.jpg?t=1680710741"
  },
  {
    "itemId": 4433,
    "title": "El Yucateco Achiote Liquid 300ml Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-liquid-300ml-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%20Liquid%20300ml.jpg?t=1738847083"
  },
  {
    "itemId": 4429,
    "title": "El Yucateco Achiote Paste 100g Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-paste-100g-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%20Paste%20100g.jpg?t=1738847082"
  },
  {
    "itemId": 4431,
    "title": "El Yucateco Achiote Paste 1kg Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-paste-1kg-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%201kg.jpg?t=1738847083"
  },
  {
    "itemId": 4420,
    "title": "El Yucateco Caribbean Habanero 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-caribbean-habanero-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Caribbean%20Habanero%20Salsa%20120ml.JPG?t=1724246347"
  },
  {
    "itemId": 5975,
    "title": "El Yucateco Charola Habanero 4 x 22ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-charola-habanero-4-x-22ml",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mini%204%20pack.jpg?t=1663834724"
  },
  {
    "itemId": 5433,
    "title": "El Yucateco Chilmole Paste 100g Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-chilmole-paste-100g-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chilmole%20-%20NEW.jpg?t=1738847082"
  },
  {
    "itemId": 4424,
    "title": "El Yucateco Chipotle Salsa 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-chipotle-salsa-150ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Chipotle%20Salsa%20150ml.JPG?t=1724246348"
  },
  {
    "itemId": 6935,
    "title": "El Yucateco Habanero & Chiltepin 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-chiltepin-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Chiltepin%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 6939,
    "title": "El Yucateco Habanero & Coffee 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-coffee-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Coffee%20120ml%20NEW.png?t=1772554615"
  },
  {
    "itemId": 6937,
    "title": "El Yucateco Habanero & Ghost 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-ghost-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 4.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Ghost%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 6936,
    "title": "El Yucateco Habanero & Grilled Pineapple",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-grilled-pineapple",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Grilled%20Pineapple%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 5906,
    "title": "El Yucateco Habanero 4 x 120ml Pack",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-habanero-4-x-120ml-pack",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Salsa%204%20Pack%202.jpg?t=1720604716"
  },
  {
    "itemId": 4426,
    "title": "El Yucateco Habanero Black Label Reserve 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-black-label-reserve-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Black%20Hot%20Sauce.png?t=1660147763"
  },
  {
    "itemId": 4421,
    "title": "El Yucateco Habanero Green 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-green-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Green%20Habanero%20Salsa%20120ml.JPG?t=1724246348"
  },
  {
    "itemId": 7435,
    "title": "El Yucateco Habanero Green 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-green-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Green%202L.jpg?t=1779814186"
  },
  {
    "itemId": 4419,
    "title": "El Yucateco Habanero Hot Sauce 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-hot-sauce-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Kutbil%20Habanero%20GREAT%20TASTE.jpg?t=1689934434"
  },
  {
    "itemId": 4422,
    "title": "El Yucateco Habanero Red 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-red-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Red%20Great%20Taste.jpg?t=1689934434"
  },
  {
    "itemId": 7434,
    "title": "El Yucateco Habanero Red 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-red-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Red%202L.jpg?t=1780332501"
  },
  {
    "itemId": 7437,
    "title": "El Yucateco Habanero XXXtra Hot 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-xxxtra-hot-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Xxtra%20Hot%202L%20NEW.jpg?t=1779814186"
  },
  {
    "itemId": 4409,
    "title": "El Yucateco Horchata Coconut Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-horchata-coconut-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Horchata%20Coco%20Concentrate%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 4411,
    "title": "El Yucateco Horchata Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-horchata-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Horchata%20Concentrate%20700ml.jpg?t=1660147763"
  },
  {
    "itemId": 6955,
    "title": "El Yucateco Hot Sauce Flavour Pack",
    "url": "https://www.mexgrocer.co.uk/meals/kits/el-yucateco-hot-sauce-flavour-pack",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 17.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Hot%20Sauce%20Flavour%20Pack.jpg?t=1720604716"
  },
  {
    "itemId": 4423,
    "title": "El Yucateco Jalapeno Salsa 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-jalapeno-salsa-150ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Jalapeno%20Salsa%20150ml.JPG?t=1720604716"
  },
  {
    "itemId": 4408,
    "title": "El Yucateco Jamaica Hibiscus Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-jamaica-hibiscus-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Jamaica%20Concentrate%20700ml.jpg?t=1738835368"
  },
  {
    "itemId": 6942,
    "title": "El Yucateco Marisquera Red 120ml Seafood Hot Sauce",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-marisquera-red-120ml-seafood-hot-sauce",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Marisquera%20Red%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 7482,
    "title": "El Yucateco Mayakut Salsa de Habanero 105ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-mayakut-salsa-de-habanero-105ml",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Mayakut%20Habanero%20Salsa%20.jpg?t=1785505959"
  },
  {
    "itemId": 4410,
    "title": "El Yucateco Tamarind Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-tamarind-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Tamarindo%20Concentrate%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 7471,
    "title": "Electrolit Blueberry Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-blueberry-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Blueberry%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7202,
    "title": "Electrolit Coconut Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-coconut-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Coconut%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1733241081"
  },
  {
    "itemId": 7291,
    "title": "Electrolit Grape Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-grape-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Grape%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1758020546"
  },
  {
    "itemId": 7420,
    "title": "Electrolit Guava Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-guava-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Guava%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1776085029"
  },
  {
    "itemId": 7468,
    "title": "Electrolit Horchata Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-horchata-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Horchata%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7236,
    "title": "Electrolit Lime Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-lime-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Lime%20Flavoured%20Mineral%20Water.jpg?t=1741613318"
  },
  {
    "itemId": 7237,
    "title": "Electrolit Orange Mandarine Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/drinks/electrolit-orange-mandarine-flavoured-mineral-water-625ml",
    "department": "drinks",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Orange%20Mandarine%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1769089589"
  },
  {
    "itemId": 7469,
    "title": "Electrolit Pineapple Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-pineapple-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Pineapple%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7348,
    "title": "Electrolit Ponche Zero Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-ponche-zero-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Ponche%20Zero%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1762169033"
  },
  {
    "itemId": 7199,
    "title": "Electrolit Strawberry & Kiwi Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-kiwi-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/electrolit%20strawberry%20and%20kiwi%20mineral%20water%20625ml.jpg?t=1733241081"
  },
  {
    "itemId": 7472,
    "title": "Electrolit Strawberry & Kiwi ZERO Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-kiwi-zero-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Strawberry%20%26%20Kiwi%20ZERO%20Flavoured%20Mineral%20Water%20625ml%20.jpg?t=1784290553"
  },
  {
    "itemId": 7347,
    "title": "Electrolit Strawberry Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Strawberry%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1762169033"
  },
  {
    "itemId": 6866,
    "title": "Everyone Loves Tacos Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/everyone-loves-tacos-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Everyone%20Loves%20Tacos.jpg?t=1695046514"
  },
  {
    "itemId": 7281,
    "title": "Excellia Blanco 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/excellia-blanco-40-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 61.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/excellia%20blanco%20awards.jpg?t=1756742416"
  },
  {
    "itemId": 7282,
    "title": "Excellia Reposado 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/excellia-reposado-40-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 64.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Excellia%20Reposado%2040%25%20700ml.jpg?t=1756373960"
  },
  {
    "itemId": 5793,
    "title": "Facemask Chain",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/facemask-chain",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 25.71,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/facemask%20chain%20new.jpg?t=1663328465"
  },
  {
    "itemId": 6849,
    "title": "Fernet Vallet Liqueur 35% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/fernet-vallet-liqueur-35-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 30.65,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fernet%20Vallet%20Liqueur%2035%25%20700ml.jpg?t=1689934435"
  },
  {
    "itemId": 7333,
    "title": "Fiestas Pozole 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-pozole-1kg",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "In Stock",
    "price": 5.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Pozole%201kg.jpg?t=1759402026"
  },
  {
    "itemId": 7331,
    "title": "Fiestas Tostadas 275g",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-tostadas-275g",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Tostadas%20275g.jpg?t=1759402026"
  },
  {
    "itemId": 7330,
    "title": "Fiestas Totopos Corn Tortilla Chips 400g",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-totopos-corn-tortilla-chips-400g",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Totopos%20Corn%20Tortilla%20Chips%20400g%20NEW.jpg?t=1772017902"
  },
  {
    "itemId": 4941,
    "title": "Fortaleza Tequila Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/fortaleza-tequila-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 126,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/fortaleza-anejo-new.jpg?t=1720604716"
  },
  {
    "itemId": 4932,
    "title": "Fortaleza Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/fortaleza-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 84,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/fortaleza-blanco-new.jpg?t=1720604716"
  },
  {
    "itemId": 5026,
    "title": "Fortaleza Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/fortaleza-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "Out of Stock",
    "price": 92.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/fortaleza-reposado-new.jpg?t=1720604716"
  },
  {
    "itemId": 4885,
    "title": "Frida Kahlo Carry Bag",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/frida-kahlo-carry-bag",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "In Stock",
    "price": 16.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Frida%20Bag.jpg?t=1717148376"
  },
  {
    "itemId": 5771,
    "title": "Frida Kahlo Floral Light Shade",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/viva-los-muertos/frida-kahlo-floral-light-shade",
    "department": "fashion-craft-gifts",
    "categorySlug": "viva-los-muertos",
    "availability": "In Stock",
    "price": 50,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Frida%20Kahlo%20Floral%20lampshade.jpg?t=1663328465"
  },
  {
    "itemId": 5831,
    "title": "Frida Kahlo Necklace",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/waxaca-mx/frida-kahlo-necklace",
    "department": "fashion-craft-gifts",
    "categorySlug": "waxaca-mx",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Frida%20Kahlo%20Neckless.jpg?t=1663328465"
  },
  {
    "itemId": 7107,
    "title": "Friendship Bracelets - Beige",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/friendship-bracelets-beige",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 27.43,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/friendship%20bracelet-%20white%20new.jpg?t=1743594699"
  },
  {
    "itemId": 5786,
    "title": "Friendship Bracelets - Black",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/friendship-bracelets-black",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 27.43,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/friendship%20bracelets%20new.jpg?t=1725357523"
  },
  {
    "itemId": 4209,
    "title": "G4 Tequila Blanco 700ml 40%",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/g4-tequila-blanco-700ml-40",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 45.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20G4%20blanco.jpg?t=1720604716"
  },
  {
    "itemId": 5061,
    "title": "Gem & Bolt Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/gem-bolt-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 74.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gem%20%26%20Bolt.jpg?t=1723515810"
  },
  {
    "itemId": 6766,
    "title": "Gin Condesa Clasica 43% 70cl",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/gin-condesa-clasica-43-70cl",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 39.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Condesa%20Clasica%201.jpg?t=1678191552"
  },
  {
    "itemId": 6767,
    "title": "Gin Condesa Prickly Pear 43% 70cl",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/gin-condesa-prickly-pear-43-70cl",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 39.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Condesa%20Prickly%20Pear%201.jpg?t=1678191552"
  },
  {
    "itemId": 6564,
    "title": "Golden Nuts 60g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/golden-nuts-60g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/golden%20nuts%202.jpg?t=1720604506"
  },
  {
    "itemId": 6966,
    "title": "Golden Nuts 60g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/golden-nuts-60g-pack-of-3",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 6.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Golden%20Nuts%2060g%20%28Pack%20of%203%29.jpg?t=1723515810"
  },
  {
    "itemId": 7400,
    "title": "Goya Aji Amarillo Yellow Hot Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-aji-amarillo-yellow-hot-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Aji%20Amarillo%20Yellow%20Hot%20Pepper%20Paste%20213g.png?t=1772192325"
  },
  {
    "itemId": 7402,
    "title": "Goya Aji Panca Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-aji-panca-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Aji%20Panca%20Pepper%20Paste%20213g.png?t=1772192325"
  },
  {
    "itemId": 7403,
    "title": "Goya Peruvian Pepper Paste Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-peruvian-pepper-paste-bundle",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 17.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Peruvian%20Pepper%20Paste%20Bundle.jpg?t=1773058869"
  },
  {
    "itemId": 7401,
    "title": "Goya Rocoto Red Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-rocoto-red-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Rocoto%20Red%20Pepper%20Paste%20213g%20NEW.png?t=1773852260"
  },
  {
    "itemId": 4230,
    "title": "Gran Centenario Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/gran-centenario-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 67.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gran%20Centenario%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 4228,
    "title": "Gran Centenario Plata 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/gran-centenario-plata-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gran%20Centenario%20Plata.jpg?t=1720604716"
  },
  {
    "itemId": 4229,
    "title": "Gran Centenario Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/gran-centenario-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 53.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gran%20Centenario%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 6006,
    "title": "Gran Orendain Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/gran-orendain-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 43.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Foto_GO_Blanco_021717_Aut.jpg?t=1720604716"
  },
  {
    "itemId": 6007,
    "title": "Gran Orendain Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/gran-orendain-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 45.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/thumbnail_Foto_GO_Reposado_Aut.jpg?t=1720604506"
  },
  {
    "itemId": 6846,
    "title": "Granada Vallet Liqueur 32% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/granada-vallet-liqueur-32-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 33.83,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Granada%20Vallet%20Liqueur%2032%25%20700ml.jpg?t=1689934434"
  },
  {
    "itemId": 4395,
    "title": "Guajillo Chilli Flakes 500gr",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/guajillo-chilli-flakes-500gr",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "In Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guajillo%20new.jpg?t=1738852742"
  },
  {
    "itemId": 5218,
    "title": "Guajillo Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/guajillo-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 32,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guajillo%20Whole.jpg?t=1720604716"
  },
  {
    "itemId": 4359,
    "title": "Guanajuato 15cm Cactus Corn Tortillas 340g",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/guanajuato-15cm-cactus-corn-tortillas-340g",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/15cm%20Cactus%20Corn%20Tortilla%20Zip%20Lock%201.JPG?t=1770993599"
  },
  {
    "itemId": 4355,
    "title": "Guanajuato 15cm Yellow Corn Tortilla For Frying 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/guanajuato-15cm-yellow-corn-tortilla-for-frying-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 5.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/15CM%20YELLOW%20CORN%20TORTILLA%20FOR%20FRYING%201KG%20NEW.jpg?t=1720604506"
  },
  {
    "itemId": 7180,
    "title": "Guava Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/guava-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guava%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 6044,
    "title": "Gustinos Wheat Flour Snack Pellets for frying GUSANO 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-gusano-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Gusano.jpg?t=1720604716"
  },
  {
    "itemId": 6056,
    "title": "Gustinos Wheat Flour Snack Pellets for frying MIX 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-mix-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Pasta%20mix.jpg?t=1663328465"
  },
  {
    "itemId": 6050,
    "title": "Gustinos Wheat Flour Snack Pellets for frying RAQUETA 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-raqueta-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Raqueta.jpg?t=1723536171"
  },
  {
    "itemId": 6042,
    "title": "Gustinos Wheat Flour Snack Pellets for frying RUEDA 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-rueda-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Rueda.jpg?t=1663328465"
  },
  {
    "itemId": 5547,
    "title": "Habanero Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/habanero-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 62,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/habanero%20dry%201kg.jpg?t=1664577335"
  },
  {
    "itemId": 4892,
    "title": "Harina Pan (sweet) Red 500g Corn Flour for Arepas",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-sweet-red-500g-corn-flour-for-arepas",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "Out of Stock",
    "price": 5.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20Pan%20%28sweet%29%20Red%20500g%20NEW.png?t=1785406373"
  },
  {
    "itemId": 5223,
    "title": "Harina Pan Amarillo 1kg Yellow Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-amarillo-1kg-yellow-corn-flour",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "In Stock",
    "price": 4.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20Pan%20Amarilla%201kg%20NEW.jpg?t=1774349419"
  },
  {
    "itemId": 5226,
    "title": "Harina Pan Blanca 1kg White Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-blanca-1kg-white-corn-flour",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "In Stock",
    "price": 4.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20PAN%20Blanca.jpeg?t=1738852719"
  },
  {
    "itemId": 5811,
    "title": "Heart Pompoms Earrings",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/waxaca-mx/heart-pompoms-earrings",
    "department": "fashion-craft-gifts",
    "categorySlug": "waxaca-mx",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Heart%20Pompom%20Earrings.jpg?t=1663328465"
  },
  {
    "itemId": 4654,
    "title": "Herdez Casera Salsa 210g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-casera-salsa-210g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 1.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Casera%20Salsa%20210g%20NEW.jpg?t=1772551223"
  },
  {
    "itemId": 4651,
    "title": "Herdez Ranchera Salsa 220g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-ranchera-salsa-220g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Ranchera%20220g.JPG?t=1668500632"
  },
  {
    "itemId": 7243,
    "title": "HERDEZ SALSA DIPS KIT",
    "url": "https://www.mexgrocer.co.uk/meals/kits/herdez-salsa-dips-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 11.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Dips%20Kit.jpg?t=1746702217"
  },
  {
    "itemId": 4656,
    "title": "Herdez Salsa Verde 210g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-210g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Verde%20210g.JPG?t=1725445050"
  },
  {
    "itemId": 6993,
    "title": "Herdez Salsa Verde Jar 453g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-jar-453g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Verde%20Jar%20453g%20NEW.jpg?t=1772020676"
  },
  {
    "itemId": 4649,
    "title": "Herdez Salsa Verde with Avocado 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-with-avocado-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20de%20Guacamole.jpg?t=1663328465"
  },
  {
    "itemId": 6898,
    "title": "Herdez Spicy Chipotle Salsa Cremoso 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-spicy-chipotle-salsa-cremoso-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Spicy%20Chipotle%20Cremoso%20240g.jpg?t=1720604506"
  },
  {
    "itemId": 6897,
    "title": "Herdez Spicy Guacamole Sauce 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-spicy-guacamole-sauce-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Spicy%20Guacamole%20240g.jpg?t=1720604716"
  },
  {
    "itemId": 7174,
    "title": "Herdez White Corn with Poblano 220g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-white-corn-with-poblano-220g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20White%20Corn%20with%20Poblano%20220g.jpg?t=1733227347"
  },
  {
    "itemId": 4342,
    "title": "Herencia de Plata Tequila Coffee 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/herencia-de-plata-tequila-coffee-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 30.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/DSC_0909.JPG?t=1720604716"
  },
  {
    "itemId": 6760,
    "title": "Herradura Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/herradura-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 64.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herradura%20Anejo.jpeg?t=1720604716"
  },
  {
    "itemId": 5332,
    "title": "Herradura Plata 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/herradura-plata-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 51.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herradura%20Plata.jpeg?t=1720604716"
  },
  {
    "itemId": 5331,
    "title": "Herradura Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/herradura-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "Out of Stock",
    "price": 57.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herradura%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 5503,
    "title": "Hibiscus Mezcal Paloma",
    "url": "https://www.mexgrocer.co.uk/meals/kits/hibiscus-mezcal-paloma",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 49.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/SMOKY%20PALOMA%20OJO%20DE%20DIOS%202KEYS%20%281%29.png?t=1779377494"
  },
  {
    "itemId": 7438,
    "title": "Hibiscus Moy 1kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/hibiscus-moy-1kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 18,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Hibiscus%20Moy%201kg.png?t=1779120517"
  },
  {
    "itemId": 6668,
    "title": "Hoja Santa 10g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/hoja-santa-10g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/hoja%20santa.jpg?t=1760610874"
  },
  {
    "itemId": 7433,
    "title": "Hot Honey Cazcabel Tequila Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/hot-honey-cazcabel-tequila-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 38,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/HOT%20HONEY%2045G%20tajin.png?t=1782296019"
  },
  {
    "itemId": 5556,
    "title": "Hot Nuts Peanuts 75g Spicy Peanuts with Chilli & Lime",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/hot-nuts-peanuts-75g-spicy-peanuts-with-chilli-lime",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.52,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/hot%20nuts.jpg?t=1778848995"
  },
  {
    "itemId": 4995,
    "title": "Huana Guanabana Mayan 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/huana-guanabana-mayan-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/huana%20image%20new.jpg?t=1723508544"
  },
  {
    "itemId": 6997,
    "title": "Huarache Press",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/huarache-press",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 50.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Huarache%20Press.jpg?t=1712757654"
  },
  {
    "itemId": 6834,
    "title": "Indio Lager Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/indio-lager-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "Out of Stock",
    "price": 3.54,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Indio%20Beer%20Bottle%20355ml.jpg?t=1729605083"
  },
  {
    "itemId": 7242,
    "title": "ISADORA REFRIED BEANS PACK",
    "url": "https://www.mexgrocer.co.uk/meals/kits/isadora-refried-beans-pack",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Beans%20Pack.jpg?t=1746702217"
  },
  {
    "itemId": 7327,
    "title": "Isadora Refried Black Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-black-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "Out of Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Black%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 7328,
    "title": "Isadora Refried Peruvian Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-peruvian-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Peruvian%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 7292,
    "title": "Isadora Refried Pinto Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-pinto-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Pinto%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 4393,
    "title": "Jalapeno Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/jalapeno-chilli-flakes-500g",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "Out of Stock",
    "price": 14.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/jalapeno%20flakes%202.jpg?t=1738862528"
  },
  {
    "itemId": 7259,
    "title": "Jalapeno Chips 52g Spicy Potato Crisps",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/jalapeno-chips-52g-spicy-potato-crisps",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/potato%20chips%20jalapenos.jpg?t=1749467185"
  },
  {
    "itemId": 7430,
    "title": "Jarritos Fruit Punch 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-fruit-punch-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/F.jpg?t=1778493080"
  },
  {
    "itemId": 4688,
    "title": "Jarritos Grapefruit 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-grapefruit-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARGlass_Grapefruit_International.png?t=1736784486"
  },
  {
    "itemId": 4693,
    "title": "Jarritos Guava 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-guava-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Guava.jpg?t=1663328465"
  },
  {
    "itemId": 4687,
    "title": "Jarritos Lime 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-lime-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Lime%20New%20Stock%20Photo.jpg?t=1720604716"
  },
  {
    "itemId": 4689,
    "title": "Jarritos Mandarin 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mandarin-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20mandarin.jpg?t=1663328465"
  },
  {
    "itemId": 4690,
    "title": "Jarritos Mango 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mango-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Mango.jpg?t=1663328465"
  },
  {
    "itemId": 4694,
    "title": "Jarritos Mexican Cola 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mexican-cola-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "In Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARGlass_Cola_International.png?t=1736784487"
  },
  {
    "itemId": 5347,
    "title": "Jarritos Pineapple 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-pineapple-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarriots%20Pineapple.jpg?t=1664577335"
  },
  {
    "itemId": 6809,
    "title": "Jarritos Rainbow Kit",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-rainbow-kit",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 17.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARRITOS%20RAINBOW%20%28temporary%20cola%20and%20strawberry%29.jpg?t=1734958683"
  },
  {
    "itemId": 6722,
    "title": "Jarritos Strawberry 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-strawberry-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Strawberry.jpg?t=1667318711"
  },
  {
    "itemId": 7429,
    "title": "Jarritos Tamarind 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-tamarind-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Tamarind%20370ml.jpg?t=1778494325"
  },
  {
    "itemId": 5363,
    "title": "Jose Cuervo Margarita Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/jose-cuervo-margarita-mix",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "Out of Stock",
    "price": 11.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jose%20Cuervo%20Margarita%20Mix%201lt.jpg?t=1725283855"
  },
  {
    "itemId": 4226,
    "title": "Jose Cuervo Reserva De La Familia 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/jose-cuervo-reserva-de-la-familia-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 172.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jose%20Cuervo%20Reserva%20De%20La%20Familia.jpg?t=1720604716"
  },
  {
    "itemId": 4222,
    "title": "Jose Cuervo Tradicional Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/jose-cuervo-tradicional-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 43.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tradicional%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 4973,
    "title": "Jose Cuervo Tradicional Silver 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/jose-cuervo-tradicional-silver-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 36.48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jose%20Cuervo%20Tradicional%20Plata%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 6586,
    "title": "KAH Tequila Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/kah-tequila-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 72,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/KAH%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 6585,
    "title": "KAH Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/kah-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 54.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/KAH%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 6584,
    "title": "KAH Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/kah-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 57.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/KAH%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 5075,
    "title": "Kalani Coconut Rum Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/kalani-coconut-rum-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 31.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kalani%20Coconut%20Liquer.jpg?t=1723536171"
  },
  {
    "itemId": 6757,
    "title": "Kankun Jalapeno 2kg",
    "url": "https://www.mexgrocer.co.uk/brands/kankun/kankun-jalapeno-2kg",
    "department": "brands",
    "categorySlug": "kankun",
    "availability": "Out of Stock",
    "price": 8.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kankun%20Jalapeno%202kg.jpg?t=1675859705"
  },
  {
    "itemId": 6756,
    "title": "KanKun Pibil 2kg",
    "url": "https://www.mexgrocer.co.uk/brands/kankun/kankun-pibil-2kg",
    "department": "brands",
    "categorySlug": "kankun",
    "availability": "Out of Stock",
    "price": 63.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kankun%20Pibil%202kg.jpg?t=1675859707"
  },
  {
    "itemId": 5507,
    "title": "Ki Gourmet Chipotle Adelita 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-chipotle-adelita-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Adelita.jpg?t=1738853106"
  },
  {
    "itemId": 5489,
    "title": "Ki Gourmet Green with Chilli La Dona 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-green-with-chilli-la-dona-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Dona.jpg?t=1738853106"
  },
  {
    "itemId": 5486,
    "title": "Ki Gourmet Mango Huapango 420g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-mango-huapango-420g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20Huapango.jpg?t=1738853106"
  },
  {
    "itemId": 5510,
    "title": "Ki Gourmet Morita Llorona 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-morita-llorona-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Llorona.jpg?t=1738853106"
  },
  {
    "itemId": 5276,
    "title": "Knorr Mexican Style Rice 160g",
    "url": "https://www.mexgrocer.co.uk/food/rice-and-soups/knorr-mexican-style-rice-160g",
    "department": "food",
    "categorySlug": "rice-and-soups",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Knorr%20Arroz%20a%20la%20Mexicana%202.JPG?t=1732793264"
  },
  {
    "itemId": 5409,
    "title": "Knorr Poblano Rice 160g",
    "url": "https://www.mexgrocer.co.uk/food/rice-and-soups/knorr-poblano-rice-160g",
    "department": "food",
    "categorySlug": "rice-and-soups",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/poblano.jpg?t=1664577335"
  },
  {
    "itemId": 7453,
    "title": "Knorr Tomato Powder 200g",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/knorr-tomato-powder-200g",
    "department": "food",
    "categorySlug": "seasonings",
    "availability": "In Stock",
    "price": 13,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Knorr%20Tomato%20Powder%20200g.png?t=1782207344"
  },
  {
    "itemId": 7097,
    "title": "Koch El Mezcal Ensamble 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/koch-el-mezcal-ensamble-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 63.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kock%20Ensamble.jpg?t=1723515810"
  },
  {
    "itemId": 7096,
    "title": "Koch El Mezcal Madrecuishe 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/koch-el-mezcal-madrecuishe-mexican-mezcal",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 69.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kock%20Madrecuishe.jpg?t=1723508544"
  },
  {
    "itemId": 5813,
    "title": "Koch El Mezcal Tobasiche 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/koch-el-mezcal-tobasiche-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 69.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Koch%20Tobasiche.jpg?t=1723536171"
  },
  {
    "itemId": 6685,
    "title": "Komos Tequila Anejo Cristalino 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/komos-tequila-anejo-cristalino-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "Out of Stock",
    "price": 126.19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Komos%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 6686,
    "title": "Komos Tequila Extra Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/komos-tequila-extra-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 392.68,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Komos%20Extra%20Anejo.jpg?t=1720604506"
  },
  {
    "itemId": 6684,
    "title": "Komos Tequila Reposado Rosa 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/komos-tequila-reposado-rosa-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "Out of Stock",
    "price": 115.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Komos%20Reposado.jpg?t=1720604506"
  },
  {
    "itemId": 5612,
    "title": "La Anita Marinade Pastor Sauce Bottle 300ml",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/pastes/la-anita-marinade-pastor-sauce-bottle-300ml",
    "department": "food",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Anota%20pastor%20marinade.jpg?t=1738855352"
  },
  {
    "itemId": 6929,
    "title": "La Anita Pastor Marinde Bottle 3.8Lt",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/pastes/la-anita-pastor-marinde-bottle-38lt",
    "department": "food",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 49.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Anita%20Pastor%20Marinde%20Bottle%203.8Lt.jpg?t=1706023595"
  },
  {
    "itemId": 7340,
    "title": "La Artesanal Extra Hot Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-extra-hot-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20Macha%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7343,
    "title": "La Artesanal Honey and Cranberry Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-honey-and-cranberry-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Artesanal%20Blueberry%20Salsa%20Macha%20200g.jpg?t=1763650465"
  },
  {
    "itemId": 7345,
    "title": "La Artesanal Medium Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-medium-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20No%20Tan%20Macha%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7341,
    "title": "La Artesanal Peanut and Morita Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-peanut-and-morita-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20Peanut%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7393,
    "title": "La Artesanal Salsa Macha Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-salsa-macha-bundle",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Artesanal%20Salsa%20Macha%20Bundle.jpg?t=1769074391"
  },
  {
    "itemId": 6111,
    "title": "La Costena Black Whole Beans 400g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-black-whole-beans-400g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20black%20beans%20400g.jpg?t=1663328465"
  },
  {
    "itemId": 6084,
    "title": "La Costena Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 23.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20chipotle%20in%20adobo%202.8kg.jpg?t=1776702236"
  },
  {
    "itemId": 7213,
    "title": "La Costena Chipotle in Adobo Picados Jar 230g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-picados-jar-230g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Chipotle%20in%20Adobo%20Picados%20jar%20230g.png?t=1737390640"
  },
  {
    "itemId": 4493,
    "title": "La Costena Chipotle in Adobo Sauce 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-sauce-199g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Chipotle%20in%20Adobo%20Sauce%20199g%20UPDATED.jpg?t=1696326571"
  },
  {
    "itemId": 6128,
    "title": "La Costena Elote Dorado Whole 220g Sweet Corn",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-elote-dorado-whole-220g-sweet-corn",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20gold%20corn.jpg?t=1776771320"
  },
  {
    "itemId": 7255,
    "title": "La Costena Green Salsa 475g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-green-salsa-475g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Green%20Salsa%20475g.jpg?t=1749029483"
  },
  {
    "itemId": 6113,
    "title": "La Costena Guacamole Salsa 465g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-guacamole-salsa-465g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Guacamole%20Salsa%20465g.jpg?t=1748510629"
  },
  {
    "itemId": 6115,
    "title": "La Costena Guayaba Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-guayaba-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20guava%20paste.jpg?t=1663328465"
  },
  {
    "itemId": 6093,
    "title": "La Costena Habanero Rajas 210g Habanero Pepper Slices",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-habanero-rajas-210g-habanero-pepper-slices",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20habaneros%20slices.jpg?t=1776771321"
  },
  {
    "itemId": 6094,
    "title": "La Costena Habanero Whole 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-habanero-whole-200g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20habaneros.jpg?t=1782467505"
  },
  {
    "itemId": 6082,
    "title": "La Costena Huitlacoche 380g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-huitlacoche-380g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 12.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20huitlacoche.jpg?t=1663328465"
  },
  {
    "itemId": 6090,
    "title": "La Costena Jalapeno Chilli Picados 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-chilli-picados-220g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20jalapeno%20pickled%20220g.jpg?t=1776771319"
  },
  {
    "itemId": 5578,
    "title": "La Costena Jalapeno Chillies Whole 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-chillies-whole-220g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20jalapenos%20220g.jpg?t=1782994609"
  },
  {
    "itemId": 6120,
    "title": "La Costena Jalapeno Nacho 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-jalapeno-nacho-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 9.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Jalapeno%20nacho%20slices%203kg.jpg?t=1776771319"
  },
  {
    "itemId": 7212,
    "title": "La Costena Jalapeno Nacho Jar 210g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-jalapeno-nacho-jar-210g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.55,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Jalapeno%20Nacho%20Jar%20210g.jpg?t=1772013242"
  },
  {
    "itemId": 6293,
    "title": "La Costena Jalapeno Red Slices 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-red-slices-199g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/LA%20COSTENA%20JALAPENO%20RED%20SLICES%20199G%20%28updated%29.jpg?t=1717148376"
  },
  {
    "itemId": 6138,
    "title": "La Costena Jalapeno Slices 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-slices-199g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/LA%20COSTENA%20JALAPENO%20SLICES%20199G%20%28updated%29.jpg?t=1711368382"
  },
  {
    "itemId": 6088,
    "title": "La Costena Jalapeno Whole 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-whole-28kg",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20jalapenos%203kg.jpg?t=1776771299"
  },
  {
    "itemId": 6807,
    "title": "La Costena Maiz Blanco 820g Mexican Pozole",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-maiz-blanco-820g-mexican-pozole",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Maiz%20Blanco%20820g%20NEW.png?t=1772458767"
  },
  {
    "itemId": 6840,
    "title": "La Costena Membrillo Chamoy Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-membrillo-chamoy-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Membrillo%20Chamoy%20Paste%20240g.jpg?t=1725531420"
  },
  {
    "itemId": 6145,
    "title": "La Costena Membrillo Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-membrillo-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20membrillo%20paste.jpg?t=1663328465"
  },
  {
    "itemId": 6395,
    "title": "La Costena Mexican Red Salsa 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-mexican-red-salsa-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 13.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Mexican%20Red%20Salsa%202.8kg%20UPDATED.jpg?t=1696326552"
  },
  {
    "itemId": 7428,
    "title": "La Costena Pickled Carrots 230g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-pickled-carrots-230g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 0.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Pickled%20Carrots%20230g.jpg?t=1776782587"
  },
  {
    "itemId": 6109,
    "title": "La Costena Pinto Whole Beans 400g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-pinto-whole-beans-400g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Whole%20pinto%20bean%20400g.jpg?t=1752160296"
  },
  {
    "itemId": 7214,
    "title": "La Costena Red Nacho Jalapeno Tatemado 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-red-nacho-jalapeno-tatemado-220g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Red%20Nacho%20Jalapeno%20Tatemado%20220g%20HQ.jpg?t=1737994855"
  },
  {
    "itemId": 6086,
    "title": "La Costena Refried Black Beans Pouch 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-refried-black-beans-pouch-220g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Refried%20Black%20Beans%20Pouch%20220g.png?t=1663328465"
  },
  {
    "itemId": 6104,
    "title": "La Costena Refried Pinto Beans Pouch 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-refried-pinto-beans-pouch-220g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20pinto%20bean%20pouch.jpg?t=1720604506"
  },
  {
    "itemId": 6079,
    "title": "La Costena Salsa Dip Hot 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-hot-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20hot%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6076,
    "title": "La Costena Salsa Dip Medium 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-medium-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20medium%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6075,
    "title": "La Costena Salsa Dip Mild 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-mild-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20mild%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6853,
    "title": "La Costena Salsa Dips",
    "url": "https://www.mexgrocer.co.uk/meals/kits/la-costena-salsa-dips",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 8.49,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Dips%20.jpg?t=1691509886"
  },
  {
    "itemId": 6108,
    "title": "La Costena Salsa Mexicana Casera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-mexicana-casera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Mexicana%20Casera%20250g%20new.jpg?t=1769681995"
  },
  {
    "itemId": 6295,
    "title": "La Costena Salsa Picante 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-picante-370ml",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20para%20bonata%20salsa.jpg?t=1663328465"
  },
  {
    "itemId": 4490,
    "title": "La Costena Salsa Ranchera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-ranchera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Ranchera%20250g%20new.jpg?t=1769681138"
  },
  {
    "itemId": 4491,
    "title": "La Costena Salsa Taquera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-taquera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Taquera%20250g%20new.jpg?t=1769681138"
  },
  {
    "itemId": 6391,
    "title": "La Costena Salsa Verde 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-verde-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 13.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Verde%202.8kg.jpg?t=1772013227"
  },
  {
    "itemId": 4515,
    "title": "La Costena Salsa Verde 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-verde-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Verde%20250g%20new.jpg?t=1769681144"
  },
  {
    "itemId": 6291,
    "title": "La Costena Serrano Chillies Toreados 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-serrano-chillies-toreados-220g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20serranos%20toreados%20220g.jpg?t=1776771319"
  },
  {
    "itemId": 5581,
    "title": "La Costena Serrano Whole Chillies 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-serrano-whole-chillies-199g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Serrano%20Whole%20Chillies%20199g.jpg?t=1772013228"
  },
  {
    "itemId": 6284,
    "title": "La Costena Tamal de Elote 110g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tamal-de-elote-110g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tamal%20elote.jpg?t=1663328465"
  },
  {
    "itemId": 6282,
    "title": "La Costena Tamal Dulce 110g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tamal-dulce-110g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tamal%20dulce.jpg?t=1663328465"
  },
  {
    "itemId": 6186,
    "title": "La Costena Tomatillo Whole 2.8kg Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tomatillo-whole-28kg-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tomatillos%20whole%202.8kg.jpg?t=1780396867"
  },
  {
    "itemId": 6188,
    "title": "La Costena Tomatillos 794g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tomatillos-794g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tomatillos%20whole%20794g.jpg?t=1781700435"
  },
  {
    "itemId": 7396,
    "title": "La Costena Traditional Mexican Salsa Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-traditional-mexican-salsa-bundle",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 10,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costenaa%20Traditional%20Mexican%20Salsa%20Bundle%201.jpg?t=1769682601"
  },
  {
    "itemId": 6289,
    "title": "La Costena Vinagre de Manzana 1050ml",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-vinagre-de-manzana-1050ml",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20vinegar.jpg?t=1663328465"
  },
  {
    "itemId": 6812,
    "title": "La Fonda 6\" Flour Tortilla",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-6-flour-tortilla",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Flour%20Tortilla.jpg?t=1772013237"
  },
  {
    "itemId": 7238,
    "title": "La Fonda Blue Flautas Tortillas 20 Pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-flautas-tortillas-20-pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Flautas%20Tortillas%2020%20Pcs.jpg?t=1741876895"
  },
  {
    "itemId": 7224,
    "title": "La Fonda Blue Placera 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-placera-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Placera%2020PCS%20NEW.jpg?t=1773916849"
  },
  {
    "itemId": 7225,
    "title": "La Fonda Blue Taquera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-taquera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Taquera%20Tortillas%2020PCS%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 7223,
    "title": "La Fonda Blue Tradicional 20PCS Tortillas",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-tradicional-20pcs-tortillas",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Tradicional%2020PCS%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 7219,
    "title": "La Fonda Cactus Strips Jar 460g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-strips-jar-460g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Strips%20Jar%20460g%20%28230g%20Drained%20Weight%29.jpg?t=1771946785"
  },
  {
    "itemId": 7218,
    "title": "La Fonda Cactus Strips Pouch 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-strips-pouch-1kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Strips%20Pouch%201kg%20NEW.jpg?t=1772013242"
  },
  {
    "itemId": 7221,
    "title": "La Fonda Cactus Whole Leaves Jar 460g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-whole-leaves-jar-460g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Whole%20Leaves%20Jar%20460g%20%28230g%20Drained%20Weight%29.jpg?t=1771946785"
  },
  {
    "itemId": 7220,
    "title": "La Fonda Cactus Whole Leaves Pouch 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-whole-leaves-pouch-1kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Whole%20Leaves%20Pouch%201kg%20NEW.jpg?t=1772013242"
  },
  {
    "itemId": 7462,
    "title": "La Fonda Chipotle Morita Powder 500g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-chipotle-morita-powder-500g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 17,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Chipotle%20Morita%20Powder%20500g.jpg?t=1782314443"
  },
  {
    "itemId": 7240,
    "title": "La Fonda Fresh Extra Large Corn Tortilla 20pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-extra-large-corn-tortilla-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 19,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Extra%20Large%20Corn%20Tortilla%2020pcs%20NEW.png?t=1773919949"
  },
  {
    "itemId": 7235,
    "title": "La Fonda Fresh Flautas Tortillas 20 Pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-flautas-tortillas-20-pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 6.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Flautas%20Tortillas%2020%20Pcs%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 6918,
    "title": "La Fonda Fresh Placera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-placera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Placera%20Tortillas%2020PCS%20NEW.jpg?t=1773916844"
  },
  {
    "itemId": 6916,
    "title": "La Fonda Fresh Taquera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-taquera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Taquera%20Tortillas%2020PCS%20NEW.jpg?t=1773916844"
  },
  {
    "itemId": 7387,
    "title": "La Fonda LS Placera Corn Tortilla 36 x 20pcs Case",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-ls-placera-corn-tortilla-36-x-20pcs-case",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 119,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7386,
    "title": "La Fonda LS Taquera Corn Tortilla 18 x 20pcs Case",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-long-shelf-life-taquera-corn-tortilla-18-x-20pcs-case",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 63,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7338,
    "title": "La Fonda LS Tradicional Corn Tortilla 18 x 20 Case",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/corn-tortillas/la-fonda-ls-tradicional-corn-tortilla-18-x-20-case",
    "department": "catering-sizes",
    "categorySlug": "corn-tortillas",
    "availability": "In Stock",
    "price": 63,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7427,
    "title": "La Fonda Pickled Cactus in Brine 330g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-pickled-cactus-in-brine-330g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Pickled%20Cactus%20in%20Brine%20330g.png?t=1776769729"
  },
  {
    "itemId": 7454,
    "title": "La Fonda Tomatillo Whole 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-tomatillo-whole-28kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 10.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Tomatillo%202.8kg.jpg?t=1782207572"
  },
  {
    "itemId": 7355,
    "title": "La Fonda Tradicional Corn Tortillas 8 Pieces",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-tradicional-corn-tortillas-8-pieces",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Tradicional%20Corn%20Tortillas%208%20Pieces%20NEW.jpg?t=1775663302"
  },
  {
    "itemId": 6907,
    "title": "La Fonda Tradicional Fresh Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/food/corn-tortillas/la-fonda-tradicional-fresh-tortillas-20pcs",
    "department": "food",
    "categorySlug": "corn-tortillas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Tradicional%20Tortillas%2020PCS%20NEW.jpg?t=1773852254"
  },
  {
    "itemId": 7457,
    "title": "La Fonda Whole Dried Cascabel 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-cascabel-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Cascabel%2075g.jpg?t=1782314442"
  },
  {
    "itemId": 7456,
    "title": "La Fonda Whole Dried Jalapeno 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-jalapeno-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Jalapeno%2075g.jpg?t=1782314442"
  },
  {
    "itemId": 7461,
    "title": "La Fonda Whole Dried Morita 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-morita-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Morita%2075g.jpg?t=1782314443"
  },
  {
    "itemId": 7460,
    "title": "La Fonda Whole Dried Mulato 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-mulato-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Mulato%2075g.jpg?t=1782314443"
  },
  {
    "itemId": 6822,
    "title": "La Sierra Bayos Beans Whole 560g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-bayos-beans-whole-560g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Bayos%20Beans%20Whole%20560g%20NEW.png?t=1772539376"
  },
  {
    "itemId": 5607,
    "title": "La Sierra Chilaquiles Verdes 370g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-chilaquiles-verdes-370g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Chilaquiles%20Verde%20370g.jpg?t=1738855352"
  },
  {
    "itemId": 6896,
    "title": "La Sierra Dried Black Beans",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-dried-black-beans",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 3.33,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Dried%20Black%20Beans%20900g%202026.jpg?t=1770648666"
  },
  {
    "itemId": 7230,
    "title": "La Sierra Dried Pinto Beans",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-dried-pinto-beans",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 3.33,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Dried%20Pinto%20Beans%20900g%20copy.jpg?t=1739274053"
  },
  {
    "itemId": 5672,
    "title": "La Sierra Red Chilaquiles 370g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-red-chilaquiles-370g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20sierra%20Chilaquiles%20Rojos.jpg?t=1720604716"
  },
  {
    "itemId": 6260,
    "title": "La Sierra Refried Pinto Beans 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-refried-pinto-beans-3kg",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 9.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Pinto%20Refried%20Beans%202.8kg.JPG?t=1762257275"
  },
  {
    "itemId": 6264,
    "title": "La Sierra Whole Pinto Beans 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-whole-pinto-beans-3kg",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 7.13,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Pinto%20Beans%20Whole%203kg.JPG?t=1750786392"
  },
  {
    "itemId": 7450,
    "title": "Large Mexican Flag",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/large-mexican-flag",
    "department": "fashion-craft-gifts",
    "categorySlug": "",
    "availability": "In Stock",
    "price": 18,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Flag%20Large.jpg?t=1781687431"
  },
  {
    "itemId": 7244,
    "title": "Las Catrinas Avocado Leaves 70g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/las-catrinas-avocado-leaves-70g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Leaves%20Whole.jpg?t=1747069449"
  },
  {
    "itemId": 4386,
    "title": "Las Catrinas Black Beans Dried 500g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-black-beans-dried-500g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Black%20Beans%20500g.JPG?t=1731406974"
  },
  {
    "itemId": 4383,
    "title": "Las Catrinas Chipotle Morita Chilli Dried 40g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-chipotle-morita-chilli-dried-40g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/morita%20w%20catrinas%202.jpg?t=1673875100"
  },
  {
    "itemId": 5432,
    "title": "Las Catrinas Cinnamon Quills - Canela 100g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-cinnamon-quills-canela-100g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cinnamon%20-%20NEW.jpg?t=1660147763"
  },
  {
    "itemId": 5546,
    "title": "Las Catrinas Habanero Dried Chilli 30g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-habanero-dried-chilli-30g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/habanero%20w%20catrinas.jpg?t=1664577335"
  },
  {
    "itemId": 5575,
    "title": "Las Catrinas Piloncillo 230g Raw Cane Sugar",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-piloncillo-230g-raw-cane-sugar",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/piloncillo.jpg?t=1738855344"
  },
  {
    "itemId": 4336,
    "title": "Las Catrinas Pinto Dried Beans 500g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-pinto-dried-beans-500g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Pinto%20Beans%20500g.JPG?t=1720604716"
  },
  {
    "itemId": 6517,
    "title": "Las Catrinas Salty Chilli Margarita Rim 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-salty-chilli-margarita-rim-1kg",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 13,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Salty%20Chilli%20Margarita%20rim.jpg?t=1663328465"
  },
  {
    "itemId": 6520,
    "title": "Las Catrinas Sweet Hibiscus Margarita Rim 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-sweet-hibiscus-margarita-rim-1kg",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "Out of Stock",
    "price": 13,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sweet%20Hibiscus%20Salt.jpg?t=1663934583"
  },
  {
    "itemId": 7280,
    "title": "Licor 43 31% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/licor-43-31-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 31.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Licor%2043%2031%25%20700ml.jpg?t=1756373960"
  },
  {
    "itemId": 7193,
    "title": "Lime Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/lime-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lime%20Tang%20Powder%20104g.jpg?t=1733234719"
  },
  {
    "itemId": 7263,
    "title": "Loltun Pastor Cooking Paste 320g",
    "url": "https://www.mexgrocer.co.uk/brands/loltun/loltun-pastor-cooking-paste-320g",
    "department": "brands",
    "categorySlug": "loltun",
    "availability": "In Stock",
    "price": 5.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lol%20Tun%20Pastor.jpg?t=1749463074"
  },
  {
    "itemId": 7262,
    "title": "Loltun Pibil Cooking Paste 320g",
    "url": "https://www.mexgrocer.co.uk/brands/loltun/loltun-pibil-cooking-paste-320g",
    "department": "brands",
    "categorySlug": "loltun",
    "availability": "In Stock",
    "price": 5.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lol%20Tun%20Pibil.jpg?t=1749463074"
  },
  {
    "itemId": 5579,
    "title": "Loteria Game Set",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/loteria-game-set",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "In Stock",
    "price": 5.94,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Loteria%20game%20set.jpg?t=1662714561"
  },
  {
    "itemId": 5788,
    "title": "LOVE Bracelet",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/love-bracelet",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 17.14,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Love%20bracelet%20new.jpg?t=1725357523"
  },
  {
    "itemId": 6040,
    "title": "Lucas Gusano",
    "url": "https://www.mexgrocer.co.uk/food/candy/lucas-gusano",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 13.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lucas%20gusano.jpg?t=1720604506"
  },
  {
    "itemId": 5872,
    "title": "Lucas Muecas Sweet Chamoy Candy with Chilli Mix Powder",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/lucas-muecas-sweet-chamoy-candy-with-chilli-mix-powder",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/lucas%20muecas.jpg?t=1738751811"
  },
  {
    "itemId": 4953,
    "title": "Macha Christmas Fruit Ponche Drink 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-christmas-fruit-ponche-drink-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 1.53,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ponche%20navideno%20Macha.jpg?t=1664793366"
  },
  {
    "itemId": 5877,
    "title": "Macha Guava Fruit in Syrup 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-guava-fruit-in-syrup-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/guayaba%20new.jpg?t=1663328465"
  },
  {
    "itemId": 6382,
    "title": "Macha Sugar Cane 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-sugar-cane-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sugar%20Cane.jpg?t=1663328465"
  },
  {
    "itemId": 5002,
    "title": "Macha Tejocote 908g",
    "url": "https://www.mexgrocer.co.uk/sale-items/macha-tejocote-908g",
    "department": "sale-items",
    "categorySlug": "",
    "availability": "In Stock",
    "price": 1.53,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tejocote%20Macha.jpg?t=1660147763"
  },
  {
    "itemId": 6591,
    "title": "Madre Mezcal Ensamble 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/madre-mezcal-ensamble-200ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 33.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Madre%20Mezcal%20Ensamble%20200ml.jpg?t=1736421962"
  },
  {
    "itemId": 6592,
    "title": "Madre Mezcal Ensamble 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/madre-mezcal-ensamble-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 73.44,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Madre%20Mezcal%20New%20Image.jpg?t=1723494117"
  },
  {
    "itemId": 4225,
    "title": "Maestro Dobel Diamante 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/maestro-dobel-diamante-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 68.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Diamante.jpg?t=1720604716"
  },
  {
    "itemId": 4224,
    "title": "Maestro Dobel Humito 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/maestro-dobel-humito-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 64.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maestro%20Dobel%20Humito.jpg?t=1720604716"
  },
  {
    "itemId": 7094,
    "title": "Maestro Dobel Silver 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/maestro-dobel-silver-200ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 18,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maestro%20Dobel%20Silver%2020cl.jpg?t=1720604716"
  },
  {
    "itemId": 4223,
    "title": "Maestro Dobel Silver 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/maestro-dobel-silver-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 62.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maestro%20Dobel%20Silver.jpg?t=1720604716"
  },
  {
    "itemId": 6321,
    "title": "Maggie Black Sauce Bottle 800ml",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/maggie-black-sauce-bottle-800ml",
    "department": "food",
    "categorySlug": "seasonings",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jugo.jpg?t=1663328465"
  },
  {
    "itemId": 5582,
    "title": "Maizena Cajeta 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-cajeta-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20cajeta.jpg?t=1738855345"
  },
  {
    "itemId": 5585,
    "title": "Maizena Chocolate 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-chocolate-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20chocolate.jpg?t=1738855345"
  },
  {
    "itemId": 5584,
    "title": "Maizena Coconut 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-coconut-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20coconut.jpg?t=1738855345"
  },
  {
    "itemId": 5391,
    "title": "Maizena Nuez Walnut 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-nuez-walnut-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maizena%20Walnut.jpg?t=1738855346"
  },
  {
    "itemId": 5388,
    "title": "Maizena Vanilla 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-vanilla-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maizena%20Vainilla%20new.jpg?t=1738855346"
  },
  {
    "itemId": 6658,
    "title": "Mamacita - Mexican Cookbook by Andrea Pons",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/mamacita-mexican-cookbook-by-andrea-pons",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 21.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mamacita%201.jpg?t=1663328465"
  },
  {
    "itemId": 7194,
    "title": "Mango Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/mango-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mango%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 5631,
    "title": "Manita de la Suerte Lollipop",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/manita-de-la-suerte-lollipop",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Manita%20de%20la%20Suerte.jpg?t=1720604716"
  },
  {
    "itemId": 7350,
    "title": "Manzanita Sol 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/manzanita-sol-355ml",
    "department": "drinks",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Manzanita%20Sol%20355ml.jpg?t=1762429708"
  },
  {
    "itemId": 6323,
    "title": "Marinela Cinnamon Canelitas Cookies 60g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-cinnamon-canelitas-cookies-60g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 1.56,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Canelitas%20Unit.jpg?t=1720604506"
  },
  {
    "itemId": 6331,
    "title": "Marinela Pineapple Barritas Cookies 55g",
    "url": "https://www.mexgrocer.co.uk/brands/marinela/marinela-pineapple-barritas-cookies-55g",
    "department": "brands",
    "categorySlug": "marinela",
    "availability": "Out of Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Barritas%20Pineapple%20Unit.jpg?t=1761590579"
  },
  {
    "itemId": 6325,
    "title": "Marinela Polvorones Shortbread Orange Cookies 74g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-polvorones-shortbread-orange-cookies-74g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 1.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Polvorones%20Unit%20update.jpg?t=1776857354"
  },
  {
    "itemId": 6329,
    "title": "Marinela Strawberry Barritas Cookies 55g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-strawberry-barritas-cookies-55g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "Out of Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Barritas%20Strawberry%20Unit.jpg?t=1720604716"
  },
  {
    "itemId": 5271,
    "title": "Maruchan Shrimp with Lime and Habanero Soup",
    "url": "https://www.mexgrocer.co.uk/meals/ready-meals/maruchan-shrimp-with-lime-and-habanero-soup",
    "department": "meals",
    "categorySlug": "ready-meals",
    "availability": "Out of Stock",
    "price": 0.63,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maruchan%20Shrimp%20with%20Habanero.JPG?t=1723494117"
  },
  {
    "itemId": 5598,
    "title": "Maruchan Shrimp with Piquin Chilli Soup 64g",
    "url": "https://www.mexgrocer.co.uk/meals/ready-meals/maruchan-shrimp-with-piquin-chilli-soup-64g",
    "department": "meals",
    "categorySlug": "ready-meals",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maruchan%20Shrimp%20with%20Piquin%20Chile.JPG?t=1724156363"
  },
  {
    "itemId": 6695,
    "title": "Masa - Techniques, Recipes, and Reflections on a Timeless Staple",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/masa-techniques-recipes-and-reflections-on-a-timeless-staple",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 26,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Masa%201.jpg?t=1663331530"
  },
  {
    "itemId": 7467,
    "title": "MasaMaiz Blue Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-blue-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "In Stock",
    "price": 100,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20Blue%20Corn%20Flour%2020kg.jpg?t=1783008086"
  },
  {
    "itemId": 7465,
    "title": "MasaMaiz White Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-white-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "Out of Stock",
    "price": 80,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20White%20Corn%20Flour%2020kg1.jpg?t=1783008085"
  },
  {
    "itemId": 7466,
    "title": "MasaMaiz Yellow Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-yellow-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "Out of Stock",
    "price": 95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20Yellow%20Corn%20Flour%2020kg1.jpg?t=1783008086"
  },
  {
    "itemId": 7250,
    "title": "Maseca Antojitos 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/maseca/maseca-antojitos-1kg",
    "department": "brands",
    "categorySlug": "maseca",
    "availability": "Out of Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Antojitos%20for%20Frying%201kg.jpg?t=1759752417"
  },
  {
    "itemId": 4469,
    "title": "Maseca Blue Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-blue-corn-flour-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "Out of Stock",
    "price": 3.59,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Blue%201kg%20New.jpg?t=1720604716"
  },
  {
    "itemId": 4468,
    "title": "Maseca Corn Flour for Tamales 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-corn-flour-for-tamales-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "In Stock",
    "price": 2.69,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Tamales.jpg?t=1720604716"
  },
  {
    "itemId": 4467,
    "title": "Maseca White Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-white-corn-flour-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "Out of Stock",
    "price": 3.59,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca.JPG?t=1738679669"
  },
  {
    "itemId": 7451,
    "title": "Maseca Yellow 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/maseca/maseca-yellow-1kg",
    "department": "brands",
    "categorySlug": "maseca",
    "availability": "Out of Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Yellow%201kg.jpg?t=1781789299"
  },
  {
    "itemId": 7346,
    "title": "Mata De Monte Mezcal 29% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mata-de-monte-mezcal-29-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mata%20De%20Monte%20Mezcal%2029%25%20700ml.jpg?t=1761904339"
  },
  {
    "itemId": 5336,
    "title": "Mayordomo Chocolate 500g Mexican Hot Chocolate Tablets",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/mayordomo-chocolate-500g-mexican-hot-chocolate-tablets",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chocolate%20Mayordomo.jpg?t=1750779192"
  },
  {
    "itemId": 5500,
    "title": "Mayordomo Mole Black 4.5 kg",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-black-45-kg",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 78,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cubeta-de-mole-negro-4.5kg-mayordomo-oaxaqueno.jpg?t=1777391055"
  },
  {
    "itemId": 5499,
    "title": "Mayordomo Mole Red 4.5 kg",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-red-45-kg",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 78,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mayordomo%20red%20mole%204.5kg.jpg?t=1725361475"
  },
  {
    "itemId": 4826,
    "title": "Mayordomo Mole Red 460g",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-red-460g",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mayordomo%20Mole%20Red%20460g%20NEW.png?t=1772552562"
  },
  {
    "itemId": 5105,
    "title": "Mayordomo Oaxaqueno Mole 460g",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-oaxaqueno-mole-460g",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mayordomo%20Oaxaqueno%20Mole%20460g%20NEW.png?t=1772552527"
  },
  {
    "itemId": 5014,
    "title": "Maza Real Red Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maza-real-red-corn-flour-1kg",
    "department": "food",
    "categorySlug": "masa-harina",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Real%20Maza%20Red%20Corn.png?t=1720604506"
  },
  {
    "itemId": 7339,
    "title": "Maza Real Red Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maza-real-red-corn-flour-20kg",
    "department": "food",
    "categorySlug": "masa-harina",
    "availability": "Out of Stock",
    "price": 110,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maza%20Real%20Red%20Corn%20Flour%2020kg.jpg?t=1761780300"
  },
  {
    "itemId": 5399,
    "title": "Mazahua Doll",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/other-decorations/mazahua-doll",
    "department": "fashion-craft-gifts",
    "categorySlug": "other-decorations",
    "availability": "In Stock",
    "price": 5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mazahua%20Doll.jpg?t=1743594691"
  },
  {
    "itemId": 5286,
    "title": "Mazapan De La Rosa Peanut Candy",
    "url": "https://www.mexgrocer.co.uk/food/candy/traditional/mazapan-de-la-rosa-peanut-candy",
    "department": "food",
    "categorySlug": "traditional",
    "availability": "Out of Stock",
    "price": 2.28,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mazapan%20Original%20%28Updated%29.jpg?t=1724082856"
  },
  {
    "itemId": 4864,
    "title": "Metate Volcanic Stone",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/metate-volcanic-stone",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 67.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/metate.jpg?t=1660837606"
  },
  {
    "itemId": 7474,
    "title": "Mexican Dried Chillies & Chipotle in Adobo Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-dried-chillies-chipotle-in-adobo-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chillies%20%26%20Chipotle%20in%20Adobo%20Kit.png?t=1784800346"
  },
  {
    "itemId": 7455,
    "title": "Mexican Gaban Poncho",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/mexican-gaban-poncho",
    "department": "fashion-craft-gifts",
    "categorySlug": "",
    "availability": "In Stock",
    "price": 25,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Gaban%20Poncho.jpg?t=1782302483"
  },
  {
    "itemId": 7106,
    "title": "Mexican Kite Cappuccino Brown Earrings",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/waxaca-mx/mexican-kite-cappuccino-brown-earrings",
    "department": "fashion-craft-gifts",
    "categorySlug": "waxaca-mx",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Brown%20Kite%20Earrings.jpg?t=1743594699"
  },
  {
    "itemId": 7360,
    "title": "Mexican Mayca Cajeta Caramel Spread 320g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/mexican-mayca-cajeta-caramel-spread-320g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Mayca%20Cajeta%20Caramel%20Spread%20-%20320g.jpg?t=1772030750"
  },
  {
    "itemId": 7484,
    "title": "Mexican Salsa Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-salsa-kit-buy-at-mexgrocer-uk",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 14.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Salsa%20Kit.jpg?t=1786114710"
  },
  {
    "itemId": 7388,
    "title": "Mexican Street Corn Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-street-corn-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MEXICAN%20STREET%20CORN%20KIT.png?t=1768322787"
  },
  {
    "itemId": 5243,
    "title": "Mexico - The Cookbook",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/mexico-the-cookbook",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 39.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexico%20the%20Cookbook%20image.jpg?t=1725357518"
  },
  {
    "itemId": 7424,
    "title": "Mezcal Reina Espadin 48% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-reina-espadin-48-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 68.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/reina%20espadin.jpg?t=1776178914"
  },
  {
    "itemId": 7444,
    "title": "Mezcal Reina Mezcalita with Lime 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-reina-mezcalita-with-lime-200ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 4.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20Reina%20Mezcalita%20with%20Lime%20200ml.jpg?t=1781532143"
  },
  {
    "itemId": 7423,
    "title": "Mezcal Reina Paloma 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-reina-paloma-200ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 4.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/e7c319e2-f99a-4400-abc4-d45231303c0a%20-%20Edited.png?t=1776680718"
  },
  {
    "itemId": 7426,
    "title": "Mezcal Reina Tobala 37% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-reina-tobala-37-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 144,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tobala%20mezcal.png?t=1776178914"
  },
  {
    "itemId": 7425,
    "title": "Mezcal Reina Tobasiche 48% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-reina-tobasiche-48-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 78,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20Reina%20Tobasiche%2048%25%20700ml.jpg?t=1776178914"
  },
  {
    "itemId": 4260,
    "title": "Mezcal Union Uno 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcal-union-uno-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 57.84,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal_Union_Bottle.jpg?t=1723536171"
  },
  {
    "itemId": 6360,
    "title": "Mezcales de Leyenda Durango 47% - Agave Cenizo 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-durango-47-agave-cenizo-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "In Stock",
    "price": 61.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Cenizo.jpg?t=1723508544"
  },
  {
    "itemId": 6469,
    "title": "Mezcales de Leyenda Durango 48% - Agave Verde 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-durango-48-agave-verde-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 80.11,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Durango%20Verde.jpg?t=1723537268"
  },
  {
    "itemId": 6361,
    "title": "Mezcales de Leyenda Guerrero 45% - Agave Cupreta - Ancho 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-guerrero-45-agave-cupreta-ancho-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/leyenda%20ancho.jpg?t=1723508544"
  },
  {
    "itemId": 6362,
    "title": "Mezcales de Leyenda Oaxaca 42% - Agave Tobala 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-oaxaca-42-agave-tobala-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 53.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Tobala%20Oaxaca.jpg?t=1723508544"
  },
  {
    "itemId": 6473,
    "title": "Mezcales de Leyenda Oaxaca 47% - Agave Coyote 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-oaxaca-47-agave-coyote-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 85.64,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Coyote%20Oaxaca.jpg?t=1723537268"
  },
  {
    "itemId": 6472,
    "title": "Mezcales de Leyenda Oaxaca 48% - Agave Mexicano 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-oaxaca-48-agave-mexicano-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 87.49,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Mexicano%20Oaxaca.jpg?t=1723494117"
  },
  {
    "itemId": 6738,
    "title": "Mezcales de Leyenda Oaxaca 50.1% Agave Espadin 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-oaxaca-501-agave-espadin-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "Out of Stock",
    "price": 60.48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Espadin%20Oaxaca.jpg?t=1723494117"
  },
  {
    "itemId": 6475,
    "title": "Mezcales de Leyenda Oaxaca 50% - Agave Jabali 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-oaxaca-50-agave-jabali-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 113.34,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Jabali%20Oaxaca.jpg?t=1723508544"
  },
  {
    "itemId": 6471,
    "title": "Mezcales de Leyenda Puebla 47% - Agave Pichumel 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/mezcales-de-leyenda-puebla-47-agave-pichumel-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 80.11,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Pichumel.jpg?t=1723536171"
  },
  {
    "itemId": 6359,
    "title": "Mezcales de Leyenda San Luis Potosi 42% - Agave Salmiana - Verde 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-san-luis-potosi-42-agave-salmiana-verde-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "In Stock",
    "price": 51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20San%20Luis%20Verde.jpg?t=1723515810"
  },
  {
    "itemId": 4256,
    "title": "Mezcales de Leyenda Tripack 3 x 100ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-tripack-3-x-100ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "Out of Stock",
    "price": 41.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcales%20de%20Leyenda%20Tripack.jpg?t=1723508544"
  },
  {
    "itemId": 6759,
    "title": "Mezcalita Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mezcalita-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 42.98,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mezcalita%20and%20free%20tajin.jpg?t=1727794032"
  },
  {
    "itemId": 6601,
    "title": "Mi Adelita Stone Ground Tortilla Blue Corn Chips 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-blue-corn-chips-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Blue%20200g%20Bio.jpg?t=1663328465"
  },
  {
    "itemId": 6599,
    "title": "Mi Adelita Stone Ground Tortilla Chips Chilli 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-chilli-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Chilli%20200g%20Bio.jpg?t=1664793366"
  },
  {
    "itemId": 6600,
    "title": "Mi Adelita Stone Ground Tortilla Chips Paprika 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-paprika-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Paprika%20200g%20Bio.jpg?t=1663663706"
  },
  {
    "itemId": 6598,
    "title": "Mi Adelita Stone Ground Tortilla Chips Sea Salt 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-sea-salt-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Sea%20Salt%20200g%20Bio.jpg?t=1663328465"
  },
  {
    "itemId": 6637,
    "title": "Mi Adelita Stone Ground Tortilla Chips Sea Salt 1kg",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-sea-salt-1kg",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 19.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Sea%20Salt%201kg.jpg?t=1663328465"
  },
  {
    "itemId": 6841,
    "title": "Mi Adelita Tortilla Chips Bundle",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mi-adelita-tortilla-chips-bundle",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mi%20Adelita%20Bundle.jpg?t=1689617568"
  },
  {
    "itemId": 6643,
    "title": "Michelada Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/michelada-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Michelada%201.jpg?t=1767788112"
  },
  {
    "itemId": 5472,
    "title": "Miguelito Chile Powder 950g",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/miguelito-chile-powder-950g",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 12.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Miguelito%20Powder%20950g.png?t=1720604716"
  },
  {
    "itemId": 5564,
    "title": "Miguelitos Chile powder Bag with 100",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/miguelitos-chile-powder-bag-with-100",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "In Stock",
    "price": 15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/miguelito%20sachets%20-%20NEW.jpg?t=1720604716"
  },
  {
    "itemId": 5827,
    "title": "Milagrito Hand-embroidered Black Facemask",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/papatxoa/milagrito-hand-embroidered-black-facemask",
    "department": "fashion-craft-gifts",
    "categorySlug": "papatxoa",
    "availability": "In Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Alebrijes%20Facemask%20Collection%20-%20Milagrito%202.jpg?t=1725357525"
  },
  {
    "itemId": 5787,
    "title": "Mini Frida Kahlo Bracelet",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/mini-frida-kahlo-bracelet",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 30.86,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mini%20Frida%20new.jpg?t=1663328465"
  },
  {
    "itemId": 5554,
    "title": "Mini Mexican Flags (50 Pack)",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/mini-mexican-flags-50-pack",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "Out of Stock",
    "price": 10.68,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mini%20mexican%20flags%20toothpicks.jpg?t=1662714561"
  },
  {
    "itemId": 4294,
    "title": "Modelo Especial Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/modelo-especial-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Modelo%20Special%20355ml.JPG?t=1739870726"
  },
  {
    "itemId": 7260,
    "title": "Modelo Negra Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/modelo-negra-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Modelo%20Negra%20355ml.jpg?t=1749132295"
  },
  {
    "itemId": 5406,
    "title": "Molcajete Plastic 12cm (For Salsas)",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/molcajete-plastic-12cm-for-salsas",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "Out of Stock",
    "price": 3.3,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Molcajete%2012cm%20Plastic%20updated.jpg?t=1696840296"
  },
  {
    "itemId": 5407,
    "title": "Molcajete Volcanic Stone - 20cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/molcajete-volcanic-stone-20cm",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 50.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Molcajete.jpg?t=1734957711"
  },
  {
    "itemId": 5589,
    "title": "Molinillo - Mexican Chocolate Stirrer",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/molinillo-mexican-chocolate-stirrer",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/chocolate%20stirrer%20-%20NEW.jpg?t=1660147763"
  },
  {
    "itemId": 6297,
    "title": "Morita Chipotle Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/food/chillies/whole-dried-chillies/morita-chipotle-whole-dried-chilli-1kg",
    "department": "food",
    "categorySlug": "whole-dried-chillies",
    "availability": "In Stock",
    "price": 38,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chipotle%20Morita%20Whole.jpg?t=1664577335"
  },
  {
    "itemId": 4701,
    "title": "Mulato Whole Dried Chilli",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/mulato-whole-dried-chilli",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mulato%20w%20catrinas.jpg?t=1760104458"
  },
  {
    "itemId": 6495,
    "title": "Nacional Morelos American Pale Ale Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/nacional-morelos-american-pale-ale-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "Out of Stock",
    "price": 3.12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nacional%20Morelos%20Fusil.jpg?t=1663328465"
  },
  {
    "itemId": 6721,
    "title": "Nacional Morelos Nacion Lager Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/nacional-morelos-nacion-lager-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "Out of Stock",
    "price": 2.64,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nacional%20Morelos%20Nacion.jpg?t=1666762807"
  },
  {
    "itemId": 6590,
    "title": "Narano Bitter Orange Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/narano-bitter-orange-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Narano.jpg?t=1723508544"
  },
  {
    "itemId": 4326,
    "title": "Naturelo Blue Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-mexican-blue-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20Blue%2020kg%201.jpg?t=1749463061"
  },
  {
    "itemId": 4321,
    "title": "Naturelo Harina De Maiz Azul 1kg Blue Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-harina-de-maiz-azul-1kg-blue-corn-flour",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 5.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20Blue%201kg.jpg?t=1738922797"
  },
  {
    "itemId": 4324,
    "title": "Naturelo Harina De Maiz Blanco 1kg White Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-harina-de-maiz-blanco-1kg-white-corn-flour",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20White%201kg.jpg?t=1738922797"
  },
  {
    "itemId": 4325,
    "title": "Naturelo White Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-white-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20White%2020kg%201.jpg?t=1738922768"
  },
  {
    "itemId": 5759,
    "title": "Nixta Corn Liqueur 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/liqueurs/nixta-corn-liqueur-700ml",
    "department": "drinks",
    "categorySlug": "liqueurs",
    "availability": "In Stock",
    "price": 41.59,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nixta%20Licor%20de%20elote.jpg?t=1723536171"
  },
  {
    "itemId": 7277,
    "title": "Nocheluna Sotol 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/sotol/nocheluna-sotol-700ml",
    "department": "drinks",
    "categorySlug": "sotol",
    "availability": "In Stock",
    "price": 71.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nocheluna%20Sotol%20700ml.jpg?t=1754044671"
  },
  {
    "itemId": 7442,
    "title": "Nopal Cactus Powder 12kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/nopal-cactus-powder-12kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 328,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Powder%2012kg.jpg?t=1780490672"
  },
  {
    "itemId": 7247,
    "title": "Nopal Mild Chilli 250g",
    "url": "https://www.mexgrocer.co.uk/brands/nopal/nopal-mild-chilli-250g",
    "department": "brands",
    "categorySlug": "nopal",
    "availability": "In Stock",
    "price": 11.45,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Mild%20Chilli%20250g.jpg?t=1748338877"
  },
  {
    "itemId": 7248,
    "title": "Nopal Powder 300g",
    "url": "https://www.mexgrocer.co.uk/brands/nopal/nopal-powder-300g",
    "department": "brands",
    "categorySlug": "nopal",
    "availability": "In Stock",
    "price": 22.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Powder%20350g.jpg?t=1748338877"
  },
  {
    "itemId": 6000,
    "title": "Nopalia Churritos Chipotle 100g - Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/nopalia-churritos-chipotle-100g-cactus-chips",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20churritos%20chipotle.jpg?t=1749732900"
  },
  {
    "itemId": 6002,
    "title": "Nopalia Churritos Habanero 100g - Spicy Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/nopalia-churritos-habanero-100g-spicy-cactus-chips",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20Churritos%20Habanero%20100g%20%28new%29.jpg?t=1732019816"
  },
  {
    "itemId": 5980,
    "title": "Nopalia Churritos Original 100g - Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/brands/nopalia/nopalia-churritos-original-100g-cactus-chips",
    "department": "brands",
    "categorySlug": "nopalia",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20churritos%20original.jpg?t=1749732900"
  },
  {
    "itemId": 7078,
    "title": "Norteña - Cookbook for Authentic Mexican Recipes",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/nortena-cookbook-for-authentic-mexican-recipes",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 26,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nortena.jpg?t=1718352471"
  },
  {
    "itemId": 5329,
    "title": "Ocho Blanco 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/ocho-blanco-500ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 37.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ocho%20Blanco%20New.jpg?t=1720604716"
  },
  {
    "itemId": 5992,
    "title": "Ocho Extra Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/ocho-extra-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "Out of Stock",
    "price": 103.87,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ocho%20Extra%20Anejo%201.jpg?t=1720604506"
  },
  {
    "itemId": 5328,
    "title": "Ocho Reposado 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/ocho-reposado-500ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "Out of Stock",
    "price": 27.72,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ocho%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 6676,
    "title": "Ojo de Dios Hibiscus Mezcal 700ml 35% Abv",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/ojo-de-dios-hibiscus-mezcal-700ml-35-abv",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 45,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ojo%20de%20Dios%20Hibiscus%202.jpg?t=1723537268"
  },
  {
    "itemId": 5527,
    "title": "Ojo De Dios Mezcal 42% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/ojo-de-dios-mezcal-42-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 47.1,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ojo%20de%20Dios%202.jpg?t=1723537268"
  },
  {
    "itemId": 6070,
    "title": "Ojo De Dios Mezcal Odd Cafe 700ml 35% Abv",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/ojo-de-dios-mezcal-odd-cafe-700ml-35-abv",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 45,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ojo%20de%20Dios%20Coffee%203.jpg?t=1723508544"
  },
  {
    "itemId": 6718,
    "title": "Ojo de Dios Mezcal Triple Pack",
    "url": "https://www.mexgrocer.co.uk/brands/ojo-de-dios-mezcal/ojo-de-dios-mezcal-triple-pack",
    "department": "brands",
    "categorySlug": "ojo-de-dios-mezcal",
    "availability": "Out of Stock",
    "price": 128.94,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/ojo%20de%20dios%20triple%20pack.jpg?t=1723537268"
  },
  {
    "itemId": 5321,
    "title": "Olmeca Altos Plata 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/olmeca-altos-plata-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Olmeca%20Altos%20Plata.jpg?t=1720604716"
  },
  {
    "itemId": 5327,
    "title": "Olmeca Altos Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/olmeca-altos-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 55.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Olmeca%20Altos%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 7192,
    "title": "Orange Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/orange-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Orange%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 5278,
    "title": "Pachicletas Lollipop",
    "url": "https://www.mexgrocer.co.uk/food/candy/lolipops/pachicletas-lollipop",
    "department": "food",
    "categorySlug": "lolipops",
    "availability": "In Stock",
    "price": 9.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pachicleta.jpg?t=1660147763"
  },
  {
    "itemId": 6367,
    "title": "Papel Picado Day of the Dead - 10 Sheets",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/papel-picado-day-of-the-dead-10-sheets",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Papel%20Picado%20DotD%201.jpg?t=1720604506"
  },
  {
    "itemId": 5859,
    "title": "Papel Picado Landscapes (45 x 35 cm)",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/papel-picado-landscapes-45-x-35-cm",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Papel%20Picado%20landscape%201.jpg?t=1725358975"
  },
  {
    "itemId": 5861,
    "title": "Papel Picado Rodeo (45 x 35 cm)",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/papel-picado-rodeo-45-x-35-cm",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Papel%20Rodeo%203.jpg?t=1720604716"
  },
  {
    "itemId": 4397,
    "title": "Pasilla Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/crushed-chillies/pasilla-chilli-flakes-500g",
    "department": "food",
    "categorySlug": "crushed-chillies",
    "availability": "Out of Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/pasilla%20flakes%20new.jpg?t=1738855341"
  },
  {
    "itemId": 5956,
    "title": "Pasilla Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/pasilla-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pasilla%20Powder.jpg?t=1660837606"
  },
  {
    "itemId": 5228,
    "title": "Pasilla Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/pasilla-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 29,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/PASILLA.jpg?t=1720604506"
  },
  {
    "itemId": 6768,
    "title": "Pasote Anejo 40% 70cl",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pasote-anejo-40-70cl",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 67.09,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pasote%20Anejo%201.jpg?t=1679410900"
  },
  {
    "itemId": 6770,
    "title": "Pasote Reposado 40% 70cl",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pasote-reposado-40-70cl",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 60.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pasote%20Reposado%201.jpg?t=1679408477"
  },
  {
    "itemId": 5326,
    "title": "Patron Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/patron-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "Out of Stock",
    "price": 74.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Patron%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 5325,
    "title": "Patron Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/patron-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 63.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Patron%20reposado.jpg?t=1720604716"
  },
  {
    "itemId": 5324,
    "title": "Patron Silver 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/patron-silver-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Patron%20Silver.jpg?t=1720604716"
  },
  {
    "itemId": 7275,
    "title": "Patron Silver Tequila mini 50ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/patron-silver-tequila-mini-50ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/patron%20silver%20mini%2050ml.jpg?t=1753699396"
  },
  {
    "itemId": 5560,
    "title": "Pelon Pelo Rico",
    "url": "https://www.mexgrocer.co.uk/food/candy/pelon-pelo-rico",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 9.48,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pelon%20Pelo%20Rico%2012%20x%2035g%20Bag.jpg?t=1754559210"
  },
  {
    "itemId": 5678,
    "title": "Pelon Pelonete 210g",
    "url": "https://www.mexgrocer.co.uk/sale-items/pelon-pelonete-210g",
    "department": "sale-items",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 8.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pelon%20Pelonete.jpg?t=1664577335"
  },
  {
    "itemId": 6951,
    "title": "Pimentae Spicy Margarita Tequila Cocktail 125ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pimentae-spicy-margarita-tequila-cocktail-125ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 4.44,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tommys%20Spicy%20Margarita%20125ml.jpg?t=1723715080"
  },
  {
    "itemId": 7480,
    "title": "Pimentae Spicy Mezcal Margarita 125ml",
    "url": "https://www.mexgrocer.co.uk/brands/pimentae/pimentae-spicy-mezcal-margarita-125ml",
    "department": "brands",
    "categorySlug": "pimentae",
    "availability": "In Stock",
    "price": 4.44,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Spicy%20Mezcal%20Margarita%20125ml.jpg?t=1785496232"
  },
  {
    "itemId": 7481,
    "title": "Pimentae Tequila Espresso Martini 125ml",
    "url": "https://www.mexgrocer.co.uk/brands/pimentae/pimentae-tequila-espresso-martini-125ml",
    "department": "brands",
    "categorySlug": "pimentae",
    "availability": "In Stock",
    "price": 4.44,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tequila%20Espresso%20Martini%20125ml.jpg?t=1786114709"
  },
  {
    "itemId": 7479,
    "title": "Pimentae Tequila Grapefruit Margarita 125ml",
    "url": "https://www.mexgrocer.co.uk/brands/pimentae/pimentae-tequila-grapefruit-margarita-125ml",
    "department": "brands",
    "categorySlug": "pimentae",
    "availability": "In Stock",
    "price": 4.44,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tequila%20Grapefruit%20Margarita%20125ml.jpg?t=1785496232"
  },
  {
    "itemId": 6953,
    "title": "Pimentae Tommy Margarita 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pimentae-tommy-margarita-500ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 27.42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tommy%20Margarita%20500ml.jpg?t=1707399739"
  },
  {
    "itemId": 6949,
    "title": "Pimentae Tommy's Margarita Tequila Cocktail 125ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pimentae-tommys-margarita-tequila-cocktail-125ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 4.44,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tommy%20Margarita%20125ml.jpg?t=1723714470"
  },
  {
    "itemId": 6948,
    "title": "Pimentae Tommys Spicy Margarita 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/pimentae-tommys-spicy-margarita-500ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 27.42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pimentae%20Tommys%20Spicy%20Margarita%20500ml.jpg?t=1707399740"
  },
  {
    "itemId": 4675,
    "title": "Pinata Cheese Sauce Plain 3kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/pinata-cheese-sauce-plain-3kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pinata%20Cheese%20Sauce.jpg?t=1660147763"
  },
  {
    "itemId": 6956,
    "title": "Pinata Cheese Sauce with Jalapeno Chilli 3kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/salsas-and-sauces/pinata-cheese-sauce-with-jalapeno-chilli-3kg",
    "department": "catering-sizes",
    "categorySlug": "salsas-and-sauces",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pinata%20Cheddar%20Cheese%20Sauce%20with%20Jalapeno%203kg.jpg?t=1707730053"
  },
  {
    "itemId": 5382,
    "title": "Pinata Handmade Foldable",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/pinata-handmade-foldable",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pinata.jpg?t=1662714561"
  },
  {
    "itemId": 5317,
    "title": "Plastic Mini Molcajeta 5.5cm (For Spices)",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/plastic-mini-molcajeta-55cm-for-spices",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 2.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Molcajete%20Plastic.JPG?t=1732808957"
  },
  {
    "itemId": 4379,
    "title": "Pre Cut Blue Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-blue-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Blue%20Corn%20Tortilla%201kg.png?t=1660147763"
  },
  {
    "itemId": 4367,
    "title": "Pre Cut Cactus Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-cactus-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Cactus%20Corn%20Tortillas%201kg.JPG?t=1732790302"
  },
  {
    "itemId": 4368,
    "title": "Pre Cut Chipotle Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-chipotle-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Chipotle%20Corn%20Tortillas%201kg.JPG?t=1726240889"
  },
  {
    "itemId": 4369,
    "title": "Pre Cut Guajillo Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-guajillo-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "Out of Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Guajillo%20Corn%20Tortillas%201kg.JPG?t=1727284929"
  },
  {
    "itemId": 4370,
    "title": "Pre Cut Yellow Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-yellow-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Yellow%20Corn%20Tortillas%201kg.JPG?t=1726226404"
  },
  {
    "itemId": 6996,
    "title": "Premium Lemon Squeezer",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/premium-lemon-squeezer",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "Out of Stock",
    "price": 18,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Premium%20Lemon%20Squeezer.jpg?t=1712757656"
  },
  {
    "itemId": 5091,
    "title": "Pronto Hot Cake Mix 500g",
    "url": "https://www.mexgrocer.co.uk/brands/pronto/pronto-hot-cake-mix-500g",
    "department": "brands",
    "categorySlug": "pronto",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pronto%20Hot%20Cake%20Mix%20500g.jpg?t=1738925938"
  },
  {
    "itemId": 7024,
    "title": "Pulparindo Chamoy 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindo-chamoy-20-pieces-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Chamoy%2020%20Pieces.jpg?t=1714053605"
  },
  {
    "itemId": 6122,
    "title": "Pulparindo Mango 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/pulparindo-mango-20-pieces-tamarind-sweets",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Mango.jpg?t=1738768577"
  },
  {
    "itemId": 5254,
    "title": "Pulparindo Red Extra Hot 20Pcs Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/pulparindo-red-extra-hot-20pcs-tamarind-sweets",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Hot%20Box.JPG?t=1738768551"
  },
  {
    "itemId": 6124,
    "title": "Pulparindo Watermelon 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/pulparindo-watermelon-20-pieces-tamarind-sweets",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Watermelon.jpg?t=1738768577"
  },
  {
    "itemId": 5257,
    "title": "Pulparindo Yellow 20PCS Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/pulparindo-yellow-20pcs-tamarind-sweets",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Box%202.JPG?t=1738768551"
  },
  {
    "itemId": 7051,
    "title": "Pulparindots 360g Tamarind Candy",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-360g-tamarind-candy",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20360g.jpg?t=1714053603"
  },
  {
    "itemId": 7057,
    "title": "Pulparindots Extra Hot 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-extra-hot-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Extra%20Hot%20360g.jpg?t=1714053602"
  },
  {
    "itemId": 7052,
    "title": "Pulparindots Mango 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-mango-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Mango%20360g.jpg?t=1714053604"
  },
  {
    "itemId": 7055,
    "title": "Pulparindots Watermelon 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-watermelon-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Watermelon%20360g.jpg?t=1714053603"
  },
  {
    "itemId": 6865,
    "title": "Real Mexican Food Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/real-mexican-food-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Real%20Mexican%20Food%20Book.jpg?t=1695046486"
  },
  {
    "itemId": 7477,
    "title": "Rey Campero Mezcal Pechuga 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/rey-campero-mezcal-pechuga-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 87.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rey%20Campero%20Mezcal%20Pechuga%20700ml.jpg?t=1785153726"
  },
  {
    "itemId": 7475,
    "title": "Rey Campero Mezcal Sierra Negra 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/rey-campero-mezcal-sierra-negra-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 87.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/RC%20Sierra%20Negra.jpg?t=1785153726"
  },
  {
    "itemId": 7478,
    "title": "Rey Campero Mezcal Tepextate 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/rey-campero-mezcal-tepextate-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 87.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/RC%20Tepeztate.jpg?t=1785153726"
  },
  {
    "itemId": 7476,
    "title": "Rey Campero Mezcal Tobala 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/rey-campero-mezcal-tobala-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 87.6,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/RC%20Tobala.jpg?t=1785153726"
  },
  {
    "itemId": 6604,
    "title": "Rooster Rojo Anejo Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/rooster-rojo-anejo-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 38.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rooster%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 6603,
    "title": "Rooster Rojo Blanco Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/rooster-rojo-blanco-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 31.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rooster%20Blanco.jpg?t=1720604506"
  },
  {
    "itemId": 6967,
    "title": "Rooster Rojo Reposado Smoke Pineapple Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/rooster-rojo-reposado-smoke-pineapple-tequila-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 37.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rooster%20Rojo%20Reposado%20Smoke%20Pineapple%20Tequila%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 6602,
    "title": "Rooster Rojo Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/rooster-rojo-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 34.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rooster%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 5785,
    "title": "Rosa Earrings",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/rosa-earrings",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 42.86,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Rosa%20Earrings%20new.jpg?t=1663328465"
  },
  {
    "itemId": 7258,
    "title": "Runners Fuego 72g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/runners-fuego-72g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Runners%20Fuego.jpeg?t=1749113859"
  },
  {
    "itemId": 7257,
    "title": "Runners Lemon & Chilli 72g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/runners-lemon-chilli-72g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Runners%2068g.jpeg?t=1749113859"
  },
  {
    "itemId": 7065,
    "title": "Sabritas Lime 42g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/sabritas-lime-42g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sabritas%20Lime%2042g%20%28Pack%20of%203%29.jpg?t=1723537268"
  },
  {
    "itemId": 4830,
    "title": "Sabritas Lime 42g Potato Crisps",
    "url": "https://www.mexgrocer.co.uk/brands/sabritas/sabritas-lime-42g-potato-crisps",
    "department": "brands",
    "categorySlug": "sabritas",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/sabritas%20lime%20new.jpg?t=1761209143"
  },
  {
    "itemId": 5536,
    "title": "Salsa Huichol 190g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/salsa-huichol-190g",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/huichol%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 7278,
    "title": "Salsa Huichol Black 190g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/salsa-huichol-black-190g",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Salsa%20Huichol%20Black%20190g.jpg?t=1755593030"
  },
  {
    "itemId": 5481,
    "title": "Salvador Jimenez & Mariachi Mexteca",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/other-decorations/salvador-jimenez-mariachi-mexteca",
    "department": "fashion-craft-gifts",
    "categorySlug": "other-decorations",
    "availability": "In Stock",
    "price": 8.33,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Salvador%20Jimenez%20CD%20-%20NEW.jpg?t=1660147763"
  },
  {
    "itemId": 6004,
    "title": "San Cosme Mezcal 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/san-cosme-mezcal-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "Out of Stock",
    "price": 55.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/thumbnail_San%20Cosme.jpg?t=1723494117"
  },
  {
    "itemId": 7175,
    "title": "San Miguel Artichoke Hearts 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-artichoke-hearts-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Artichoke%20Hearts%20400g%20new.jpg?t=1779374487"
  },
  {
    "itemId": 5946,
    "title": "San Miguel Chipotle Sauce De La Abuela",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/san-miguel-chipotle-sauce-de-la-abuela",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Chipotle%20Sauce%20De%20La%20Abuela%20450g%20.jpg?t=1720604716"
  },
  {
    "itemId": 5940,
    "title": "San Miguel Del Patron 450g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-del-patron-450g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Del%20Patron%20sauce.png?t=1720604716"
  },
  {
    "itemId": 7256,
    "title": "San Miguel Enchilada Sauce Green 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-enchilada-sauce-green-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Enchilada%20Green%20Sauce%20400g%20NEW.png?t=1772458745"
  },
  {
    "itemId": 7152,
    "title": "San Miguel Enchilada Sauce Red 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-enchilada-sauce-red-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Enchilada%20Red%20Sauce%20400g%20NEW.png?t=1772458745"
  },
  {
    "itemId": 5948,
    "title": "San Miguel Habanero Sauce Don Pancho 450g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-habanero-sauce-don-pancho-450g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20pancho%20habanero%20sauce.png?t=1720604716"
  },
  {
    "itemId": 5942,
    "title": "San Miguel Jalapeno Sauce De Dona Chole",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-jalapeno-sauce-de-dona-chole",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20jalapenbo%20Sauce%20-Dona%20Chole%20450g.png?t=1720604506"
  },
  {
    "itemId": 5944,
    "title": "San Miguel Pasilla Sauce De La Nana",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-pasilla-sauce-de-la-nana",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Pasilla%20Sauce%20la%20nana.png?t=1720604716"
  },
  {
    "itemId": 4625,
    "title": "San Miguel Poblano Pepper Strips 220g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-poblano-pepper-strips-220g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Poblano%20Strips%20220g.png?t=1772456948"
  },
  {
    "itemId": 4626,
    "title": "San Miguel Poblano Whole Peppers 780g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-poblano-whole-peppers-780g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 7.19,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Poblano%20Whole%20780g%20NEW.png?t=1772458014"
  },
  {
    "itemId": 4856,
    "title": "Sangria Senorial 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/sangria-senorial-355ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.28,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sangria%20Casera%20355ml.JPG?t=1732790310"
  },
  {
    "itemId": 5590,
    "title": "Sangrita Viuda de Sanchez 1000ml",
    "url": "https://www.mexgrocer.co.uk/drinks/bar-essentials/sangrita-viuda-de-sanchez-1000ml",
    "department": "drinks",
    "categorySlug": "bar-essentials",
    "availability": "In Stock",
    "price": 9.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sangrita.jpg?t=1720604506"
  },
  {
    "itemId": 7390,
    "title": "Sanissimo Salmas 144g",
    "url": "https://www.mexgrocer.co.uk/brands/sanissimo/sanissimo-salmas-144g",
    "department": "brands",
    "categorySlug": "sanissimo",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sanissimo%20Salmas%20144g.jpg?t=1769001210"
  },
  {
    "itemId": 4601,
    "title": "Sanissimo Tostadas 216g",
    "url": "https://www.mexgrocer.co.uk/brands/sanissimo/sanissimo-tostadas-216g",
    "department": "brands",
    "categorySlug": "sanissimo",
    "availability": "Out of Stock",
    "price": 4.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sanissimo%20Tostadas%20Box%20216g%20%28updated%29.jpg?t=1720604716"
  },
  {
    "itemId": 6982,
    "title": "Sazon Natural Ancho Chilli Flakes 380g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-flakes-380g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Flakes%20380g.jpg?t=1712757656"
  },
  {
    "itemId": 7018,
    "title": "Sazon Natural Ancho Chilli Flakes 85g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-flakes-85g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Flakes%2085g.jpg?t=1714053602"
  },
  {
    "itemId": 7016,
    "title": "Sazon Natural Ancho Chilli Powder 120g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-powder-120g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Powder%20120g.jpg?t=1714053605"
  },
  {
    "itemId": 6980,
    "title": "Sazon Natural Ancho Chilli Powder 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-powder-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Powder%20550g.jpg?t=1712757656"
  },
  {
    "itemId": 6987,
    "title": "Sazon Natural Chipotle Flakes 380g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-flakes-380g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Flakes%20380g.jpg?t=1712757656"
  },
  {
    "itemId": 7022,
    "title": "Sazon Natural Chipotle Flakes 85g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-flakes-85g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Flakes%2085g.jpg?t=1714053602"
  },
  {
    "itemId": 7020,
    "title": "Sazon Natural Chipotle Powder 120g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-powder-120g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Powder%20120g.jpg?t=1714053603"
  },
  {
    "itemId": 6984,
    "title": "Sazon Natural Chipotle Powder 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-powder-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Powder%20550g.jpg?t=1712757654"
  },
  {
    "itemId": 7010,
    "title": "Sazon Natural Fajita \"Pibil Style\" Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-fajita-pibil-style-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Fajita%20Pibil%20Style%20Seasoning%20142g.jpg?t=1714053602"
  },
  {
    "itemId": 7000,
    "title": "Sazon Natural Fajita \"Pibil Style\" Seasoning 700g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-fajita-pibil-style-seasoning-700g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Fajita%20Pibil%20Style%20Seasoning%20700g.jpg?t=1712757654"
  },
  {
    "itemId": 7012,
    "title": "Sazon Natural Mexican Adobo Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-mexican-adobo-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Mexican%20Adobo%20Seasoning%20142g.jpg?t=1714053604"
  },
  {
    "itemId": 7002,
    "title": "Sazon Natural Mexican Adobo Seasoning 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-mexican-adobo-seasoning-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Mexican%20Adobo%20Seasoning%20550g.jpg?t=1712757655"
  },
  {
    "itemId": 7014,
    "title": "Sazon Natural Piko Pikin Guacamole Mix 150g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-piko-pikin-guacamole-mix-150g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Piko%20Pikin%20Guacamole%20Mix%20150g.jpg?t=1714053602"
  },
  {
    "itemId": 7005,
    "title": "Sazon Natural Piko Pikin Gucamole Mix 738g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-piko-pikin-gucamole-mix-738g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Piko%20Pikin%20Gucamole%20Mix%20738g.jpg?t=1712757654"
  },
  {
    "itemId": 7008,
    "title": "Sazon Natural Taco Al Pastor Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-taco-al-pastor-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Taco%20Al%20Pastor%20Seasoning%20142g.jpg?t=1714053604"
  },
  {
    "itemId": 6989,
    "title": "Sazon Natural Taco Al Pastor Seasoning 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-taco-al-pastor-seasoning-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Taco%20Al%20Pastor%20Seasoning%20550g.jpg?t=1712757654"
  },
  {
    "itemId": 6852,
    "title": "SHHH! Mezcal 47% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mezcal/shhh-mezcal-47-700ml",
    "department": "drinks",
    "categorySlug": "mezcal",
    "availability": "In Stock",
    "price": 99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/SHH%21%20Mezcal%20700ml.jpg?t=1689934435"
  },
  {
    "itemId": 7108,
    "title": "SHINE Bracelet",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/shine-bracelet",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 17.14,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Shine%20bracelet%20new%202.jpg?t=1743594699"
  },
  {
    "itemId": 5555,
    "title": "Skwinkles Clasico Chamoy",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-clasico-chamoy",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20clasicos%20new.jpg?t=1664577335"
  },
  {
    "itemId": 5293,
    "title": "Skwinkles Rellenos Pineapple",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-rellenos-pineapple",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 7.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20Relleno.jpeg?t=1779108948"
  },
  {
    "itemId": 4808,
    "title": "Skwinkles Rellenos Watermelon Sandia Enchilada",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-rellenos-watermelon-sandia-enchilada",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20rellenos%20watermelon%20pack%20of%2012.jpg?t=1664577335"
  },
  {
    "itemId": 6825,
    "title": "Skwinkles Salsaghetti 12 Pack",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-salsaghetti-12-pack",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20Salsaghetti%2012%20Pack.jpg?t=1683612626"
  },
  {
    "itemId": 7431,
    "title": "Small Beer Mexican Lager 2.5%",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/small-beer-mexican-lager-25",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 2.28,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Small%20Beer%20Mexican%20Lager%202.5%25.jpg?t=1778574731"
  },
  {
    "itemId": 7077,
    "title": "Sobremesa Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/sobremesa-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 27,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sobremesa%20Book.jpg?t=1718352471"
  },
  {
    "itemId": 6817,
    "title": "Sol Tarasco \"Hongos\" Anejo Rum 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/sol-tarasco-hongos-anejo-rum-40-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 55.73,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sol%20Tarasco%20Hongos%20Charanda%20Anejo%20Rum.jpg?t=1683612626"
  },
  {
    "itemId": 6815,
    "title": "Sol Tarasco 4 Year Charanda Anejo Rum 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/sol-tarasco-4-year-charanda-anejo-rum-40-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sol%20Tarasco%204%20YO%20Charanda%20Anejo%20Rum.jpg?t=1683612626"
  },
  {
    "itemId": 6816,
    "title": "Sol Tarasco 8 Year Charanda Anejo Rum 42% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/sol-tarasco-8-year-charanda-anejo-rum-42-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 55.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sol%20Tarasco%208%20YO%20Charanda%20Anejo%20Rum.jpg?t=1683612626"
  },
  {
    "itemId": 5812,
    "title": "Sotol Sotomayor Excepcional Ensamble 750ml",
    "url": "https://www.mexgrocer.co.uk/drinks/spirits/sotol-sotomayor-excepcional-ensamble-750ml",
    "department": "drinks",
    "categorySlug": "spirits",
    "availability": "In Stock",
    "price": 86.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/sotomayor-ensamble-sotol.jpg?t=1723536171"
  },
  {
    "itemId": 7395,
    "title": "Spicy Hibiscus Margarita Kit",
    "url": "https://www.mexgrocer.co.uk/brands/ojo-de-dios-mezcal/spicy-hibiscus-margarita-kit",
    "department": "brands",
    "categorySlug": "ojo-de-dios-mezcal",
    "availability": "In Stock",
    "price": 51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/spicy%20margarita%20ojo%20de%20dios.jpg?t=1769530875"
  },
  {
    "itemId": 7274,
    "title": "Spicy Margarita Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/spicy-margarita-cocktail",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 39,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Spicy%20Margarita%20Kit.jpg?t=1769521660"
  },
  {
    "itemId": 4872,
    "title": "Squirt Grapefruit Can 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/squirt-grapefruit-can-355ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Squirt%20Can%20355ml.jpg?t=1720604716"
  },
  {
    "itemId": 5790,
    "title": "Star and Cherry Quartz Bracelet",
    "url": "https://www.mexgrocer.co.uk/fashion-craft-gifts/casa-orozco/star-and-cherry-quartz-bracelet",
    "department": "fashion-craft-gifts",
    "categorySlug": "casa-orozco",
    "availability": "In Stock",
    "price": 34.29,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/star%20and%20cherry%20quartz%20new.jpg?t=1663328465"
  },
  {
    "itemId": 7413,
    "title": "SU Tequila Blanco 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/su-tequila-blanco-40-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/SU%20Tequila%20Blanco%2040%25%20700ml.jpg?t=1774522516"
  },
  {
    "itemId": 7414,
    "title": "SU Tequila Reposado 40% 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/su-tequila-reposado-40-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 47.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/SU%20Tequila%20Reposado%2040%25%20700ml.jpg?t=1774522516"
  },
  {
    "itemId": 7142,
    "title": "Sugar Skull Calaveritas 9cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/decorations/sugar-skull-calaveritas-9cm",
    "department": "food",
    "categorySlug": "decorations",
    "availability": "In Stock",
    "price": 9.48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sugar%20Skull%20Calaveritas%209cm%20new.png?t=1785146091"
  },
  {
    "itemId": 7290,
    "title": "Tacos by Lily Ramirez-Froan",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/tacos-by-lily-ramirez-froan",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 15,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tacos%20by%20Lily%20Ramirez-Froan.jpg?t=1757591452"
  },
  {
    "itemId": 5424,
    "title": "Tacos!",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/tacos",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 13.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cook%20in%20a%20book%20tacos.jpg?t=1725357521"
  },
  {
    "itemId": 4453,
    "title": "Tajin Ancho Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-ancho-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Ancho%20Chilli%2075g.jpg?t=1663328465"
  },
  {
    "itemId": 4455,
    "title": "Tajin Arbol Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-arbol-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Arbol%2075g.jpg?t=1664273061"
  },
  {
    "itemId": 7485,
    "title": "Tajin Chamoy Liquid 308ml",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chamoy-liquid-308ml",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tjn_fruitChamoy_15-38oz_455ml_1.0003.png?t=1786704141"
  },
  {
    "itemId": 4696,
    "title": "Tajin Chamoy Liquid 455ml",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chamoy-liquid-455ml",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tjn_fruitChamoy_15-38oz_455ml_1.0003.png?t=1709638821"
  },
  {
    "itemId": 6802,
    "title": "Tajin Chili and Lime Seasoning 142g & Chamoy Pack",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chili-and-lime-seasoning-142g-chamoy-pack",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tajin%20chamoy%20kit.jpg?t=1720604716"
  },
  {
    "itemId": 7324,
    "title": "Tajin Chili and Lime Seasoning 45g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chili-and-lime-seasoning-45g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chili%20and%20Lime%20Seasoning%2045g.jpg?t=1759224396"
  },
  {
    "itemId": 4451,
    "title": "Tajin Chilli & Lime Seasoning Mini Bottle10 x10g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-lime-seasoning-mini-bottle10-x10g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 6.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%208x100g%202.jpg?t=1725630435"
  },
  {
    "itemId": 4443,
    "title": "Tajin Chilli and Lime Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-and-lime-seasoning-142g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20142g.jpg?t=1706477176"
  },
  {
    "itemId": 4332,
    "title": "Tajin Chilli and Lime Seasoning 400g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-and-lime-seasoning-400g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 7.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20400g.jpg?t=1663328465"
  },
  {
    "itemId": 6820,
    "title": "Tajin Dried Chillies (4 x 75g)",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-dried-chillies-4-x-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 16,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chillies%20Bundle.jpg?t=1683612626"
  },
  {
    "itemId": 4460,
    "title": "Tajin Glass Season Rimmer",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-glass-season-rimmer",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20rimmer.jpg?t=1723508544"
  },
  {
    "itemId": 4457,
    "title": "Tajin Guajillo Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-guajillo-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Guajillo%2075g.jpg?t=1663328465"
  },
  {
    "itemId": 5548,
    "title": "Tajin Habanero Powder 45g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-habanero-powder-45g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Habanero_45_gr%20new.jpg?t=1663328465"
  },
  {
    "itemId": 6924,
    "title": "Tajin Keyring",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/seasoning/tajin-keyring",
    "department": "brands",
    "categorySlug": "seasoning",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Keyring.jpg?t=1730816856"
  },
  {
    "itemId": 4442,
    "title": "Tajin Low Sodium Chilli and Lime Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-low-sodium-chilli-and-lime-seasoning-142g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chile%20and%20Lime%20Low%20Sodium%20140g.JPG?t=1724156362"
  },
  {
    "itemId": 4459,
    "title": "Tajin Pasilla Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-pasilla-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Pasilla%2075g.jpg?t=1664273449"
  },
  {
    "itemId": 4450,
    "title": "Tajin Seasoning Bottle 907g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-seasoning-bottle-907g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 15.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20900g.jpg?t=1660837606"
  },
  {
    "itemId": 4452,
    "title": "Tajin To Go 25 Sachets Chilli & Lime Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-to-go-25-sachets-chilli-lime-seasoning",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.38,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20To%20Go%2025x1g.jpg?t=1739201029"
  },
  {
    "itemId": 6906,
    "title": "Takis Blue Heat 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-blue-heat-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Blue%20Heat%2070g%20UPDATE.jpg?t=1772026668"
  },
  {
    "itemId": 7441,
    "title": "Takis Duoz 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-duoz-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Duoz%2070g.jpg?t=1779978401"
  },
  {
    "itemId": 5552,
    "title": "Takis Salsa Brava 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-salsa-brava-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/salsa%20brava.png?t=1720604506"
  },
  {
    "itemId": 6964,
    "title": "Takis Salsa Brava 70g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-salsa-brava-70g-pack-of-3",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Salsa%20Brava%2070g%20%28Pack%203%29.jpg?t=1723536171"
  },
  {
    "itemId": 6476,
    "title": "Tama Roca Banderilla 30 x 50g",
    "url": "https://www.mexgrocer.co.uk/food/candy/tama-roca-banderilla-30-x-50g",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 30,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tamaroca%20Banderliers.jpg?t=1664577335"
  },
  {
    "itemId": 7349,
    "title": "Tama Roca Pellizco 40 Pcs",
    "url": "https://www.mexgrocer.co.uk/food/candy/tama-roca-pellizco-40-pcs",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tama%20Roca%20Pellizco%2040%20Pcs.jpg?t=1762429708"
  },
  {
    "itemId": 7098,
    "title": "Tamal Steamer Cooking Pot Aluminium 20Lt",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/tamal-steamer-cooking-pot-aluminium-20lt",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Steamer%2020L.jpg?t=1723494117"
  },
  {
    "itemId": 5534,
    "title": "Tamazula Black 140ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/tamazula-black-140ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tamazula%20black%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 5535,
    "title": "Tamazula Red 140ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/tamazula-red-140ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tamazula%20red%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 5322,
    "title": "Tapatio Anejo 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/tapatio-anejo-500ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tapatio%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 5320,
    "title": "Tapatio Blanco 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/tapatio-blanco-500ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 38.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tapatio%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 5306,
    "title": "Tapatio Reposado 500ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/tapatio-reposado-500ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 43.2,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tapatio%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 6954,
    "title": "Tapatio Salsa Picante 148ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/tapatio-salsa-picante-148ml",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tapatio%20Salsa%20Picante%20148ml.jpg?t=1720604506"
  },
  {
    "itemId": 5834,
    "title": "Taragui - Yerba Mate with Stems",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/argentina/taragui-yerba-mate-with-stems",
    "department": "food",
    "categorySlug": "argentina",
    "availability": "In Stock",
    "price": 10,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Taragui-yerba-mate-with-stems-con-palo-x-500g.jpg?t=1663328465"
  },
  {
    "itemId": 5561,
    "title": "Tarrito Beer Lollipop Bag",
    "url": "https://www.mexgrocer.co.uk/food/candy/lolipops/tarrito-beer-lollipop-bag",
    "department": "food",
    "categorySlug": "lolipops",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tarrito%20beer%20lollipop.jpg?t=1720604716"
  },
  {
    "itemId": 5741,
    "title": "Tecate Lager Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/tecate-lager-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "Out of Stock",
    "price": 3.36,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tecate.jpg?t=1759997729"
  },
  {
    "itemId": 4250,
    "title": "Tequila Centinela Anejo 3yr 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tequila-centinela-anejo-3yr-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 204,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Centinela%20Anejo%203yr%20new.jpg?t=1720604716"
  },
  {
    "itemId": 4251,
    "title": "Tequila Centinela Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tequila-centinela-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 74.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Centinela%20Anejo.jpg?t=1720604716"
  },
  {
    "itemId": 4252,
    "title": "Tequila Centinela Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tequila-centinela-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 59.94,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tequila%20Centinela%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 4253,
    "title": "Tequila Centinela Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tequila-centinela-reposado-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 64.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Centinela%20Reposado.jpg?t=1720604716"
  },
  {
    "itemId": 6868,
    "title": "Tequila Cocktails Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/tequila-cocktails-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 8.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Cocktails.jpg?t=1695046515"
  },
  {
    "itemId": 6926,
    "title": "Tequila Tierra Noble Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/anejo/tequila-tierra-noble-anejo-700ml",
    "department": "drinks",
    "categorySlug": "anejo",
    "availability": "In Stock",
    "price": 79.44,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Tierra%20Noble%20Anejo%20700ml.jpg?t=1706023596"
  },
  {
    "itemId": 6927,
    "title": "Tequila Tierra Noble Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/tequila-tierra-noble-blanco-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "Out of Stock",
    "price": 59.3,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Tierra%20Noble%20Blanco%20700ml.jpg?t=1706023595"
  },
  {
    "itemId": 6928,
    "title": "Tequila Tierra Noble Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/tequila-tierra-noble-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 68.76,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Tierra%20Noble%20Reposado%20700ml.jpg?t=1706023595"
  },
  {
    "itemId": 4605,
    "title": "Terana Epazote 26g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-epazote-26g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 4.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Epazote%20Chopped%202.JPG?t=1732790309"
  },
  {
    "itemId": 4608,
    "title": "Terana Epazote 400gr",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-epazote-400gr",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 14.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Epazote%20Chopped%20Wholesale.JPG?t=1725361462"
  },
  {
    "itemId": 5250,
    "title": "Terana Oregano 21g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-oregano-21g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Oregano%2021g.JPG?t=1732790309"
  },
  {
    "itemId": 5357,
    "title": "Terana Oregano 400g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-oregano-400g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "Out of Stock",
    "price": 14.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Oregano%20Wholesale.JPG?t=1725361463"
  },
  {
    "itemId": 4212,
    "title": "Terralta Blanco 750ml 40%",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/terralta-blanco-750ml-40",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Terralta%20Blanco.jpg?t=1720604716"
  },
  {
    "itemId": 4213,
    "title": "Terralta Reposado 750ml 40%",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/terralta-reposado-750ml-40",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tequila%20Terralta%20reposado.jpg?t=1720604716"
  },
  {
    "itemId": 7276,
    "title": "The Curators Tajin Pork Puffs 25g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/the-curators-tajin-pork-puffs-25g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Pork%20Puffs%2025g.jpg?t=1754042568"
  },
  {
    "itemId": 6431,
    "title": "The Latin American Cookbook",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/the-latin-american-cookbook",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Latin%20Cookbook.jpg?t=1663328465"
  },
  {
    "itemId": 6932,
    "title": "Tico Blanco Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/blanco/tico-blanco-tequila-700ml",
    "department": "drinks",
    "categorySlug": "blanco",
    "availability": "In Stock",
    "price": 45,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tico%20Blanco.JPG?t=1706477178"
  },
  {
    "itemId": 6933,
    "title": "Tico Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tico-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 49.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tico%20Reposado.JPG?t=1706477179"
  },
  {
    "itemId": 6934,
    "title": "Tico Rosa Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/tico-rosa-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 48.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tico%20Rosa.JPG?t=1706477176"
  },
  {
    "itemId": 6747,
    "title": "Torre de Picos Reposado Tequila 375ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/torre-de-picos-reposado-tequila-375ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 56.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Torre%20de%20Picos%20Reposado%20Tequila%20375ml.jpg?t=1720604716"
  },
  {
    "itemId": 6749,
    "title": "Torre de Picos Reposado Tequila 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/torre-de-picos-reposado-tequila-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 98.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Torre%20de%20Picos%20Reposado%20Tequila%20700ml.jpg?t=1720604506"
  },
  {
    "itemId": 5484,
    "title": "Tortilla Machine VILLAMEX V5",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/other-mexican-products/tortilla-machine-villamex-v5",
    "department": "catering-sizes",
    "categorySlug": "other-mexican-products",
    "availability": "In Stock",
    "price": 1800,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/VILLAMEX%20V5.jpg?t=1730737791"
  },
  {
    "itemId": 5566,
    "title": "Tortilla Making Kit: Tortilla press, 1kg Naturelo & Tortilla Warmer",
    "url": "https://www.mexgrocer.co.uk/meals/kits/tortilla-making-kit-tortilla-press-1kg-naturelo-tortilla-warmer",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 39,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortilla%20making%20kit.jpg?t=1785142010"
  },
  {
    "itemId": 5474,
    "title": "Tortilla Warmer Palm Style",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/tortilla-warmer-palm-style",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tortillero%20palma.jpg?t=1664278900"
  },
  {
    "itemId": 5702,
    "title": "Tortilla Warmer Pewter Black 18cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/tortilla-warmer-pewter-black-18cm",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pewter%20tortilla%20warmer%20black.jpg?t=1663328465"
  },
  {
    "itemId": 5700,
    "title": "Tortilla Warmer Pewter Blue 18cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/tortilla-warmer-pewter-blue-18cm",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pewter%20tortilla%20warmer%20blue.jpg?t=1663328465"
  },
  {
    "itemId": 5701,
    "title": "Tortilla Warmer Pewter Red 18cm",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/tortilla-warmer-pewter-red-18cm",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pewter%20tortilla%20warmer%20red.jpg?t=1663328465"
  },
  {
    "itemId": 4389,
    "title": "Totmoxtle Corn Husks 100g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/totmoxtle-corn-husks-100g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Corn%20Husks%20100g.JPG?t=1730902673"
  },
  {
    "itemId": 4952,
    "title": "Tu Casa Mi Casa Book",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/cookbooks/tu-casa-mi-casa-book",
    "department": "food",
    "categorySlug": "cookbooks",
    "availability": "In Stock",
    "price": 29.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tu%20Casa%20Mi%20Casa%20Book.jpg?t=1660147763"
  },
  {
    "itemId": 7058,
    "title": "Two Keys Frozen Paloma Mix 750ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/two-keys-frozen-paloma-mix-750ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "Out of Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Two%20Keys%20Frozen%20Paloma%20Mix%20750ml.jpg?t=1714565486"
  },
  {
    "itemId": 6427,
    "title": "Two Keys Pink Grapefruit Soda 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/two-keys-pink-grapefruit-soda-200ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.18,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Two%20Keys%20Grapefruit.jpg?t=1663328465"
  },
  {
    "itemId": 6813,
    "title": "Uruapan Pure Agricola Charanda Blanco Rum 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/rum/uruapan-pure-agricola-charanda-blanco-rum-700ml",
    "department": "drinks",
    "categorySlug": "rum",
    "availability": "In Stock",
    "price": 61.44,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Uruapan%20-%20Charanda%20Blanco%20-%20Pure%20Single%20Agricola%20Rum.jpg?t=1683612628"
  },
  {
    "itemId": 4883,
    "title": "Valentina Black 1lt",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-black-1lt",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Black%201lt.jpg?t=1660837606"
  },
  {
    "itemId": 5116,
    "title": "Valentina Black 370ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-black-370ml",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20black%20370ml.jpg?t=1660147763"
  },
  {
    "itemId": 6856,
    "title": "Valentina Hot Sauce Trio",
    "url": "https://www.mexgrocer.co.uk/meals/kits/valentina-hot-sauce-trio",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 5.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Hot%20Sauce%20Trio%20NEW.png?t=1785241408"
  },
  {
    "itemId": 4825,
    "title": "Valentina Mariscos 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-mariscos-370ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20seafood.jpg?t=1663328465"
  },
  {
    "itemId": 5144,
    "title": "Valentina Red 1lt",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-red-1lt",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%201lt.JPG?t=1725009527"
  },
  {
    "itemId": 5113,
    "title": "Valentina Red 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-red-370ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20red%20370ml.jpg?t=1663751872"
  },
  {
    "itemId": 7392,
    "title": "Valentina Red 4Lt",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-red-4lt",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 27,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Red%204L.jpg?t=1769009049"
  },
  {
    "itemId": 5420,
    "title": "Valentina Salsa Sachets 15 x 10g",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-salsa-sachets-15-x-10g",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "Out of Stock",
    "price": 1.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/valentina%20pouches%20-%20NEW.jpg?t=1660837606"
  },
  {
    "itemId": 7407,
    "title": "Vallemex Flor de Calabaza 908g (Pumpkin Flower in Brine)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-flor-de-calabaza-908g-pumpkin-flower-in-brine",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "Out of Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Flor%20de%20Calabaza%20908g.png?t=1773852259"
  },
  {
    "itemId": 7411,
    "title": "Vallemex Guayaba 908g (Mexican Guava in Syrup)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-guayaba-908g-mexican-guava-in-syrup",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Guayaba%20908g.jpg?t=1773852260"
  },
  {
    "itemId": 7408,
    "title": "Vallemex Huitlacoche 908g (Mexican Corn Smut)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-huitlacoche-908g-mexican-corn-smut",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Huitlacoche%20908g.png?t=1773852259"
  },
  {
    "itemId": 7410,
    "title": "Vallemex Nanche 908g",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-nanche-908g",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "Out of Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Nanche%20908g.png?t=1773852259"
  },
  {
    "itemId": 7412,
    "title": "Vallemex Romertios (Seepweed) 908g",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-romertios-seepweed-908g",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Romertios%20908g.png?t=1773852260"
  },
  {
    "itemId": 7404,
    "title": "Vallemex Tejocote 908g (Hawthorn in Syrup)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-tejocote-908g-hawthorn-in-syrup",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Tejocote%20908g.png?t=1773852259"
  },
  {
    "itemId": 5288,
    "title": "Vero Elote Lollipops",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-elote-lollipops",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "Out of Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Elotes.JPG?t=1720604716"
  },
  {
    "itemId": 5280,
    "title": "Vero Mango Lollipops",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-mango-lollipops",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "Out of Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Mango.JPG?t=1725895315"
  },
  {
    "itemId": 5680,
    "title": "Vero Picafresas 100 x 6g Bag",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-picafresas-100-x-6g-bag",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Picafresas%20100%20x%206g%20Bag%20NEW.jpg?t=1779968069"
  },
  {
    "itemId": 6500,
    "title": "Victoria Beer 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/beer/victoria-beer-355ml",
    "department": "drinks",
    "categorySlug": "beer",
    "availability": "In Stock",
    "price": 3.84,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Victoria.jpg?t=1663328465"
  },
  {
    "itemId": 5099,
    "title": "Vitrolero",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/kitchenware/vitrolero",
    "department": "food",
    "categorySlug": "kitchenware",
    "availability": "In Stock",
    "price": 42,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vitrolero.jpg?t=1660147763"
  },
  {
    "itemId": 6035,
    "title": "Vivir Tequila Anejo 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/vivir-tequila-anejo-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 73.15,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vivir%20Tequila%20Anejo.png?t=1720604506"
  },
  {
    "itemId": 6034,
    "title": "Vivir Tequila Blanco 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/vivir-tequila-blanco-700ml",
    "department": "drinks",
    "categorySlug": "tequila",
    "availability": "In Stock",
    "price": 50.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vivir%20Tequila%20Blanco.png?t=1720604716"
  },
  {
    "itemId": 6160,
    "title": "Vivir Tequila Reposado 700ml",
    "url": "https://www.mexgrocer.co.uk/drinks/tequila/reposado/vivir-tequila-reposado-700ml",
    "department": "drinks",
    "categorySlug": "reposado",
    "availability": "In Stock",
    "price": 52.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vivir%20Tequila%20Reposado.png?t=1720604716"
  },
  {
    "itemId": 7254,
    "title": "Xiqueno Mole Sauce 500g",
    "url": "https://www.mexgrocer.co.uk/food/mole-sauces/xiqueno-mole-sauce-500g",
    "department": "food",
    "categorySlug": "mole-sauces",
    "availability": "In Stock",
    "price": 9.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Xiqueno%20Mole.jpg?t=1749130273"
  },
  {
    "itemId": 7317,
    "title": "Zaaschila Creamy Cheese & Jalapeno Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-cheese-jalapeno-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Cheese%20%26%20Jalapeno%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7419,
    "title": "Zaaschila Creamy Cheese & Jalapeno Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-cheese-jalapeno-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Cheese%20%26%20Jalapeno%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7294,
    "title": "Zaaschila Creamy Chipotle Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-chipotle-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Chipotle%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7418,
    "title": "Zaaschila Creamy Chipotle Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-chipotle-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Chipotle%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7316,
    "title": "Zaaschila Creamy Guacamole & Habanero 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-habanero-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20%26%20Habanero%20.jpg?t=1758193506"
  },
  {
    "itemId": 7417,
    "title": "Zaaschila Creamy Guacamole & Habanero 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-habanero-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20%26%20Habanero%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7299,
    "title": "Zaaschila Creamy Guacamole and Jalapeno Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-and-jalapeno-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20and%20Jalapeno%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7416,
    "title": "Zaaschila Creamy Guacamole and Jalapeno Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-and-jalapeno-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20and%20Jalapeno%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7364,
    "title": "Zaaschila Creamy Salsa Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-salsa-bundle",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 13.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Salsa%20Bundle.jpg?t=1766051934"
  },
  {
    "itemId": 7321,
    "title": "Zaaschila Creamy Street Corn Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-street-corn-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Street%20Corn%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7415,
    "title": "Zaaschila Creamy Street Corn Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-street-corn-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 5.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Street%20Corn%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 6994,
    "title": "Zote Pink Soap 200g",
    "url": "https://www.mexgrocer.co.uk/food/other-mexican-items/zote-pink-soap-200g",
    "department": "food",
    "categorySlug": "other-mexican-items",
    "availability": "Out of Stock",
    "price": 2.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zote%20Pink%20Soap%20200g.jpg?t=1723508544"
  }
];

export const mexgrocerCatalogue: readonly MexgrocerProduct[] = [
  {
    "itemId": 4435,
    "title": "10\" Poco Loco Flour Tortillas",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/10-poco-loco-flour-tortillas",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 6.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/10%20inch%20Tortillas%20Poco%20Loco.jpg?t=1772013777"
  },
  {
    "itemId": 4437,
    "title": "12\" Poco Loco Flour Tortillas",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/12-poco-loco-flour-tortillas",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 8.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/12%20Poco%20Loco.jpg?t=1672851728"
  },
  {
    "itemId": 4879,
    "title": "Abuelita Chocolate 540g",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/abuelita-chocolate-540g",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "Out of Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nestle%20Abuelita%20Chocolate.JPG?t=1724314942"
  },
  {
    "itemId": 7473,
    "title": "Aciduladito Sweets 500g",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/aciduladito-sweets-500g",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "Out of Stock",
    "price": 11.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Aciduladtio%20Sweets%20500g.png?t=1784709713"
  },
  {
    "itemId": 7121,
    "title": "Agave Syrup 25kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/agave-syrup-25kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 170,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%2025kg.jpg?t=1733234757"
  },
  {
    "itemId": 5853,
    "title": "Agave Syrup 330g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/agave-syrup-330g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%20330g%20updated.jpg?t=1772015703"
  },
  {
    "itemId": 5755,
    "title": "Agave Syrup 5.6kg",
    "url": "https://www.mexgrocer.co.uk/food/desserts/agave-syrup-56kg",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 55,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agave%20Syrup%205.6kg.jpg?t=1763130444"
  },
  {
    "itemId": 7222,
    "title": "Agavesito 500ml Agave Syrup",
    "url": "https://www.mexgrocer.co.uk/brands/agavesito/agavesito-500ml-agave-syrup",
    "department": "brands",
    "categorySlug": "agavesito",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Agavesito%20500ml.jpg?t=1738594610"
  },
  {
    "itemId": 5958,
    "title": "Ancho Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/ancho-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Powder%202.jpg?t=1660837606"
  },
  {
    "itemId": 7463,
    "title": "Ancho Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/crushed-chillies/ancho-flakes-500g",
    "department": "food",
    "categorySlug": "crushed-chillies",
    "availability": "In Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Flakes%20500g.png?t=1782384603"
  },
  {
    "itemId": 5220,
    "title": "Ancho Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/ancho-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 36,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ancho%20Whole%202.jpg?t=1720604506"
  },
  {
    "itemId": 6945,
    "title": "Antica Cantina Cheese Dip 300g",
    "url": "https://www.mexgrocer.co.uk/food/cheese/antica-cantina-cheese-dip-300g",
    "department": "food",
    "categorySlug": "cheese",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Antica%20Cantina%20Cheese%20Dip%20300g.jpg?t=1706477178"
  },
  {
    "itemId": 7464,
    "title": "Arbol Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/arbol-flakes-500g",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "In Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/arbol%20flakes.jpg?t=1782384603"
  },
  {
    "itemId": 5219,
    "title": "Arbol Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/food/chillies/whole-dried-chillies/arbol-whole-dried-chilli-1kg",
    "department": "food",
    "categorySlug": "whole-dried-chillies",
    "availability": "In Stock",
    "price": 46,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Arbol%20Whole.jpg?t=1720604506"
  },
  {
    "itemId": 4850,
    "title": "Avocado Leaf Powder 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/speciality/avocado-leaf-powder-1kg",
    "department": "catering-sizes",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Powder.png?t=1714565486"
  },
  {
    "itemId": 4983,
    "title": "Avocado Leaves Whole 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/speciality/avocado-leaves-whole-1kg",
    "department": "catering-sizes",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 38.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Leaves%20Whole.jpg?t=1660147763"
  },
  {
    "itemId": 4996,
    "title": "Boing Grape 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-grape-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Grape%20237ml%20NEW.jpg?t=1772015699"
  },
  {
    "itemId": 5085,
    "title": "Boing Guava 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-guava-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Guava.jpg?t=1720604716"
  },
  {
    "itemId": 7241,
    "title": "BOING JUICY KIT",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-juicy-kit",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 6.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/BOING%20JUICY%20KIT.jpg?t=1746021934"
  },
  {
    "itemId": 4963,
    "title": "Boing Mango 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-mango-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Mango%20237ml%20NEW.jpg?t=1772015699"
  },
  {
    "itemId": 6341,
    "title": "Boing Strawberry 237ml",
    "url": "https://www.mexgrocer.co.uk/brands/boing/boing-strawberry-237ml",
    "department": "brands",
    "categorySlug": "boing",
    "availability": "Out of Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Boing%20Strawberry%20237ml%20NEW.jpg?t=1772015700"
  },
  {
    "itemId": 6641,
    "title": "Botanero Kit | Chicharron & Valentina Salsa",
    "url": "https://www.mexgrocer.co.uk/meals/kits/botanero-kit-chicharron-valentina-salsa",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 4.75,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Botanero%20kit%20-%20NEW.jpg?t=1750773219"
  },
  {
    "itemId": 5698,
    "title": "Botanero Salsa Clasica Hot Sauce 370g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/mild-table-sauces/botanero-salsa-clasica-hot-sauce-370g",
    "department": "food",
    "categorySlug": "mild-table-sauces",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/botanera.jpg?t=1723515810"
  },
  {
    "itemId": 5532,
    "title": "Bufalo Clasico Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/hot-sauces/bufalo-clasico-hot-sauce-150ml",
    "department": "food",
    "categorySlug": "hot-sauces",
    "availability": "Out of Stock",
    "price": 2.1,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Bufalo%20Clasico%20Hot%20Sauce%20150ml%20%28new%29.jpg?t=1712757656"
  },
  {
    "itemId": 7352,
    "title": "Cacto Original Prickly Pear & White Peach Soda 330ml",
    "url": "https://www.mexgrocer.co.uk/brands/cacto/cacto-original-prickly-pear-white-peach-soda-330ml",
    "department": "brands",
    "categorySlug": "cacto",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cacto%20Peach%20SKU.png?t=1770027620"
  },
  {
    "itemId": 7351,
    "title": "Cacto Original Prickly Pear Soda 330ml",
    "url": "https://www.mexgrocer.co.uk/brands/cacto/cacto-original-prickly-pear-soda-330ml",
    "department": "brands",
    "categorySlug": "cacto",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cacto%20Prickly%20Pear%20SKU.png?t=1770027620"
  },
  {
    "itemId": 7120,
    "title": "Carey Tomatillo Whole 340g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/carey/carey-tomatillo-whole-340g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "carey",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Carey%20Tomatillo%20Whole%20340g%20NEW.jpg?t=1772030737"
  },
  {
    "itemId": 5842,
    "title": "Casa Argentina - Chimichurri Mixed Dried Herbs 100g",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/argentina/casa-argentina-chimichurri-mixed-dried-herbs-100g",
    "department": "food",
    "categorySlug": "argentina",
    "availability": "Out of Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Casa-Argentina-Premium-Chimichurri-Mixed-dried-herbs-x-100g.jpg?t=1663328465"
  },
  {
    "itemId": 5543,
    "title": "Cascabel Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/cascabel-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cascabel.jpg?t=1660837606"
  },
  {
    "itemId": 7439,
    "title": "Chatica Small Panela Sugar Cane 500g",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/chatica-small-panela-sugar-cane-500g",
    "department": "food",
    "categorySlug": "latin-american-food",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Panela.jpg?t=1779449710"
  },
  {
    "itemId": 7363,
    "title": "Che Dulce de Leche Classic Style 1kg",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/che-dulce-de-leche-classic-style-1kg",
    "department": "food",
    "categorySlug": "latin-american-food",
    "availability": "Out of Stock",
    "price": 17,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Che%20Dulce%20de%20Leche%20Classic%20Style%201kg.jpg?t=1765458110"
  },
  {
    "itemId": 6218,
    "title": "Chicharron 100g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-100g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharon%20100g.jpg?t=1663328465"
  },
  {
    "itemId": 7063,
    "title": "CHICHARRON 100G (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-100g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharron%20100g%20%28Pack%203%29.jpg?t=1723508544"
  },
  {
    "itemId": 6219,
    "title": "Chicharron Jalapeno 70g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-jalapeno-70g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/KAI030_20x70g.jpg?t=1710163896"
  },
  {
    "itemId": 7229,
    "title": "Chicharron Jalapeno 70g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/chicharron-jalapeno-70g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 7,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chicharron%20Jalapeno%2070g%20%28Pack%203%29.jpg?t=1739274060"
  },
  {
    "itemId": 6838,
    "title": "Chilaquiles Verdes Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/chilaquiles-verdes-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 9.75,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chilaquiles%20Verdes%20Kit.jpg?t=1768319113"
  },
  {
    "itemId": 5930,
    "title": "Chipotle Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/chipotle-chilli-flakes-500g",
    "department": "food",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 21,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chipotle%20Crushed%202.JPG?t=1739971556"
  },
  {
    "itemId": 5232,
    "title": "Chipotle Morita Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/chipotle-morita-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "Out of Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/chipotle%20morita%20powder.jpg?t=1741254268"
  },
  {
    "itemId": 5430,
    "title": "Chocolate Drink Pack with Wood Molinillo",
    "url": "https://www.mexgrocer.co.uk/meals/kits/chocolate-drink-pack-with-wood-molinillo",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 24,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chocolate%20Drink%20Pack%20with%20Wood%20Molinillo.jpg?t=1741597495"
  },
  {
    "itemId": 5434,
    "title": "Cholula Chipotle Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-chipotle-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cholula-chipotle-hot-sauce.jpg?t=1663328465"
  },
  {
    "itemId": 5428,
    "title": "Cholula Garlic and Chili Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-garlic-and-chili-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20garlic.jpg?t=1663328465"
  },
  {
    "itemId": 4465,
    "title": "Cholula Limon Hot Sauce150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-limon-hot-sauce150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20Limon%20150ml.JPG?t=1730377369"
  },
  {
    "itemId": 6015,
    "title": "Cholula Origianl Hot Sauce 1.9lt",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-origianl-hot-sauce-19lt",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 21.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20catering.jpg?t=1663328465"
  },
  {
    "itemId": 4464,
    "title": "Cholula Original Hot Sauce 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-original-hot-sauce-150ml",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20original.jpg?t=1663920238"
  },
  {
    "itemId": 6824,
    "title": "Cholula Sauce Collection",
    "url": "https://www.mexgrocer.co.uk/brands/cholula/cholula-sauce-collection",
    "department": "brands",
    "categorySlug": "cholula",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Cholula%20Sauce%20Collection.jpg?t=1720604716"
  },
  {
    "itemId": 5052,
    "title": "Chorizo Unit",
    "url": "https://www.mexgrocer.co.uk/food/speciality/chorizo-unit",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 12.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chorizo%20Unit.jpg?t=1703157595"
  },
  {
    "itemId": 4988,
    "title": "Churros Mix - Pronto 350g",
    "url": "https://www.mexgrocer.co.uk/brands/pronto/churros-mix-pronto-350g",
    "department": "brands",
    "categorySlug": "pronto",
    "availability": "Out of Stock",
    "price": 3.7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Churros%20Pronto.jpg?t=1664272172"
  },
  {
    "itemId": 5431,
    "title": "Churrumais 64g Crispy Corn Sticks with Lime",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/churrumais-64g-crispy-corn-sticks-with-lime",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/churrumais.jpg?t=1738848131"
  },
  {
    "itemId": 7064,
    "title": "Churrumaiz 64g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/churrumaiz-64g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/churrumais%203%20pack.jpg?t=1723494117"
  },
  {
    "itemId": 5365,
    "title": "Clamato 946ml Bottle",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-946ml-bottle",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 7.08,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato.JPG?t=1723730375"
  },
  {
    "itemId": 6827,
    "title": "Clamato Bottle 296ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-bottle-296ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Bottle%20296ml%20NEW.jpg?t=1772030747"
  },
  {
    "itemId": 7206,
    "title": "Clamato Cubano Bottle 946ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-cubano-bottle-946ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Cubano%20Bottle%20946g.jpg?t=1733229633"
  },
  {
    "itemId": 7452,
    "title": "Clamato Cubano Glass Bottle 473ml",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/clamato-cubano-glass-bottle-473ml",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "In Stock",
    "price": 4.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clamato%20Cubano%20Glass%20Bottle%20473ml.jpg?t=1781789299"
  },
  {
    "itemId": 4519,
    "title": "Clemente Jacques Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 14.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Chipotle%20in%20Adobo%20%20NEW.jpg?t=1772016227"
  },
  {
    "itemId": 4521,
    "title": "Clemente Jacques Chipotle in Adobo 210g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-in-adobo-210g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Chipotle%20in%20Adobo%20210g%20NEW.jpg?t=1772016226"
  },
  {
    "itemId": 6236,
    "title": "Clemente Jacques Chipotle Mashed 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-chipotle-mashed-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 3.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20chipotle%20squeeze%20220g.jpg?t=1776695924"
  },
  {
    "itemId": 7231,
    "title": "Clemente Jacques Habanero Relish 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-habanero-relish-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Habanero%20Relish%20220g.jpg?t=1739278220"
  },
  {
    "itemId": 6882,
    "title": "Clemente Jacques Home Style Casera Salsa 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-home-style-casera-salsa-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656057011%20-%20Clemente%20Jacques%20Casera%20Salsa.jpg?t=1740057626"
  },
  {
    "itemId": 5577,
    "title": "Clemente Jacques Jalapeno Chillies in Slices 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-chillies-in-slices-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Chillies%20in%20Slices%20220g%20updated.jpg?t=1739884345"
  },
  {
    "itemId": 4522,
    "title": "Clemente Jacques Jalapeno Chillies Whole 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-chillies-whole-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 1.7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/jacques%20jalapeno%20whole%20220g.jpg?t=1776695861"
  },
  {
    "itemId": 7215,
    "title": "Clemente Jacques Jalapeno Mashed 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-mashed-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Mashed%20220g.jpg?t=1737451343"
  },
  {
    "itemId": 7061,
    "title": "Clemente Jacques Jalapeno Nacho Slice 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapeno-nacho-slice-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 8.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapeno%20Nacho%20Slice%202.8kg.jpg?t=1714637527"
  },
  {
    "itemId": 5513,
    "title": "Clemente Jacques Jalapenos Nacho 220g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-jalapenos-nacho-220g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente-Jacques-Nachos-220g.jpg?t=1776695894"
  },
  {
    "itemId": 6248,
    "title": "Clemente Jacques Salsa Verde Bottle 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-salsa-verde-bottle-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656056011%20-%20Clemente%20Jacques%20Salsa%20Verde.jpg?t=1740057597"
  },
  {
    "itemId": 6891,
    "title": "Clemente Jacques Taquera Salsa Bottle 370g",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-taquera-salsa-bottle-370g",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/656058011%20-%20Clemente%20Jacques%20Taquera%20Salsa.jpg?t=1740057627"
  },
  {
    "itemId": 6246,
    "title": "Clemente Jacques Whole Jalapeno 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-whole-jalapeno-28kg",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "In Stock",
    "price": 5.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Jalapenos%20Whole%202.8kg.jpg?t=1776702246"
  },
  {
    "itemId": 6792,
    "title": "Clemente Jacques Whole Tomatillo 3kg Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/clemente-jacques/clemente-jacques-whole-tomatillo-3kg-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "clemente-jacques",
    "availability": "Out of Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Clemente%20Jacques%20Whole%20Tomatillo%203kg.jpg?t=1772017899"
  },
  {
    "itemId": 7046,
    "title": "De La Rosa Japanese Peanuts 14 Pieces",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/de-la-rosa-japanese-peanuts-14-pieces",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "Out of Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/De%20La%20Rosa%20Japanese%20Peanuts%2014%20Pieces.jpg?t=1772017899"
  },
  {
    "itemId": 5529,
    "title": "Dona Maria Adobo 235g Mexican Cooking Sauce for Chicken & Meats",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-adobo-235g-mexican-cooking-sauce-for-chicken-meats",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Adobo%20Dona%20Maria%20-%20NEW.jpg?t=1750774577"
  },
  {
    "itemId": 6363,
    "title": "Dona Maria Green Mole 235g Green Mole Sauce with Tomatillo & Pumpkin Seeds",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-green-mole-235g-green-mole-sauce-with-tomatillo-pumpkin-seeds",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mole%20Verde%20Dona%20Maria%20-%20NEW.jpg?t=1687773165"
  },
  {
    "itemId": 6199,
    "title": "Dona Maria Mole Brown 235g Traditional Mole Sauce with Chocolate & Spices",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-mole-brown-235g-traditional-mole-sauce-with-chocolate-spices",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20Mole%20235g.jpg?t=1750774577"
  },
  {
    "itemId": 5531,
    "title": "Dona Maria Pipian 235g Mole Pipian Sauce with Roasted Pumpkin Seeds",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-pipian-235g-mole-pipian-sauce-with-roasted-pumpkin-seeds",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "In Stock",
    "price": 6.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pipian%20Dona%20Maria%20-%20NEW.jpg?t=1750774577"
  },
  {
    "itemId": 7083,
    "title": "Dona Maria ready to use Green Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-green-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Green%20Mole%20360g.jpg?t=1720604716"
  },
  {
    "itemId": 7082,
    "title": "Dona Maria ready to use Poblano Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-poblano-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Poblano%20Mole%20360g.jpg?t=1720604716"
  },
  {
    "itemId": 7085,
    "title": "Dona Maria ready to use Red Mole 360g",
    "url": "https://www.mexgrocer.co.uk/brands/dona-maria/dona-maria-ready-to-use-red-mole-360g",
    "department": "brands",
    "categorySlug": "dona-maria",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Dona%20Maria%20ready%20to%20use%20Red%20Mole%20360g.jpg?t=1720604506"
  },
  {
    "itemId": 5541,
    "title": "Dried Black Beans 25kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/beans/dried-black-beans-25kg",
    "department": "catering-sizes",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/black%20beans%20catrinas.jpg?t=1664577335"
  },
  {
    "itemId": 5540,
    "title": "Dried Pinto Beans 25kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/beans/dried-pinto-beans-25kg",
    "department": "catering-sizes",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/pinto%20beans%2025kg.jpg?t=1720604506"
  },
  {
    "itemId": 7232,
    "title": "Durum Flour Tortillas 30cm (12\")",
    "url": "https://www.mexgrocer.co.uk/food/flour-tortillas/durum-flour-tortillas-30cm-12",
    "department": "food",
    "categorySlug": "flour-tortillas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Durum%20Flour%20Tortillas%2030cm.jpg?t=1740050743"
  },
  {
    "itemId": 6215,
    "title": "El Mexicano Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Chipotle%20in%20Adobo%202.8kg.png?t=1776771321"
  },
  {
    "itemId": 4313,
    "title": "El Mexicano Pinto Beans Refried 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pinto-beans-refried-3kg",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 9.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pinto%20Beans%20Refried%203kg%20%28NEW%29.jpg?t=1711368383"
  },
  {
    "itemId": 4303,
    "title": "El Mexicano Pozole 3kg Mexican White Hominy in Brine",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pozole-3kg-mexican-white-hominy-in-brine",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pozolo%203kg.jpg?t=1776771312"
  },
  {
    "itemId": 4315,
    "title": "El Mexicano Pozole 822g Mexican White Hominy in Brine",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-pozole-822g-mexican-white-hominy-in-brine",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 2.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Pozole%20822g.JPG?t=1776771313"
  },
  {
    "itemId": 4305,
    "title": "El Mexicano Tomatillo Whole 767g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/el-mexicano/el-mexicano-tomatillo-whole-767g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "el-mexicano",
    "availability": "In Stock",
    "price": 3.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Mexicano%20Tomatillo%20Whole%20767g.JPG?t=1776771312"
  },
  {
    "itemId": 6785,
    "title": "EL YUCATECO \"BIG FIVE\" HOT SAUCE KIT",
    "url": "https://www.mexgrocer.co.uk/meals/kits/el-yucateco-big-five-hot-sauce-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/EL%20YUCATECO%20HOT%20SAUCE%20KIT.jpg?t=1680710741"
  },
  {
    "itemId": 4433,
    "title": "El Yucateco Achiote Liquid 300ml Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-liquid-300ml-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%20Liquid%20300ml.jpg?t=1738847083"
  },
  {
    "itemId": 4429,
    "title": "El Yucateco Achiote Paste 100g Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-paste-100g-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%20Paste%20100g.jpg?t=1738847082"
  },
  {
    "itemId": 4431,
    "title": "El Yucateco Achiote Paste 1kg Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-achiote-paste-1kg-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Achiote%201kg.jpg?t=1738847083"
  },
  {
    "itemId": 4420,
    "title": "El Yucateco Caribbean Habanero 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-caribbean-habanero-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Caribbean%20Habanero%20Salsa%20120ml.JPG?t=1724246347"
  },
  {
    "itemId": 5975,
    "title": "El Yucateco Charola Habanero 4 x 22ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-charola-habanero-4-x-22ml",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mini%204%20pack.jpg?t=1663834724"
  },
  {
    "itemId": 5433,
    "title": "El Yucateco Chilmole Paste 100g Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/pastes/el-yucateco-chilmole-paste-100g-seasoning",
    "department": "brands",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chilmole%20-%20NEW.jpg?t=1738847082"
  },
  {
    "itemId": 4424,
    "title": "El Yucateco Chipotle Salsa 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-chipotle-salsa-150ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Chipotle%20Salsa%20150ml.JPG?t=1724246348"
  },
  {
    "itemId": 6935,
    "title": "El Yucateco Habanero & Chiltepin 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-chiltepin-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Chiltepin%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 6939,
    "title": "El Yucateco Habanero & Coffee 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-coffee-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Coffee%20120ml%20NEW.png?t=1772554615"
  },
  {
    "itemId": 6937,
    "title": "El Yucateco Habanero & Ghost 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-ghost-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 4.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Ghost%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 6936,
    "title": "El Yucateco Habanero & Grilled Pineapple",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-grilled-pineapple",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20%26%20Grilled%20Pineapple%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 5906,
    "title": "El Yucateco Habanero 4 x 120ml Pack",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-habanero-4-x-120ml-pack",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Salsa%204%20Pack%202.jpg?t=1720604716"
  },
  {
    "itemId": 4426,
    "title": "El Yucateco Habanero Black Label Reserve 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-black-label-reserve-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Black%20Hot%20Sauce.png?t=1660147763"
  },
  {
    "itemId": 4421,
    "title": "El Yucateco Habanero Green 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-green-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Green%20Habanero%20Salsa%20120ml.JPG?t=1724246348"
  },
  {
    "itemId": 7435,
    "title": "El Yucateco Habanero Green 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-green-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Green%202L.jpg?t=1779814186"
  },
  {
    "itemId": 4419,
    "title": "El Yucateco Habanero Hot Sauce 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-hot-sauce-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Kutbil%20Habanero%20GREAT%20TASTE.jpg?t=1689934434"
  },
  {
    "itemId": 4422,
    "title": "El Yucateco Habanero Red 120ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-red-120ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Red%20Great%20Taste.jpg?t=1689934434"
  },
  {
    "itemId": 7434,
    "title": "El Yucateco Habanero Red 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-red-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Red%202L.jpg?t=1780332501"
  },
  {
    "itemId": 7437,
    "title": "El Yucateco Habanero XXXtra Hot 2L",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-habanero-xxxtra-hot-2l",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Habanero%20Xxtra%20Hot%202L%20NEW.jpg?t=1779814186"
  },
  {
    "itemId": 4409,
    "title": "El Yucateco Horchata Coconut Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-horchata-coconut-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Horchata%20Coco%20Concentrate%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 4411,
    "title": "El Yucateco Horchata Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-horchata-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Horchata%20Concentrate%20700ml.jpg?t=1660147763"
  },
  {
    "itemId": 6955,
    "title": "El Yucateco Hot Sauce Flavour Pack",
    "url": "https://www.mexgrocer.co.uk/meals/kits/el-yucateco-hot-sauce-flavour-pack",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 17.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Hot%20Sauce%20Flavour%20Pack.jpg?t=1720604716"
  },
  {
    "itemId": 4423,
    "title": "El Yucateco Jalapeno Salsa 150ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-jalapeno-salsa-150ml",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Jalapeno%20Salsa%20150ml.JPG?t=1720604716"
  },
  {
    "itemId": 4408,
    "title": "El Yucateco Jamaica Hibiscus Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-jamaica-hibiscus-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Jamaica%20Concentrate%20700ml.jpg?t=1738835368"
  },
  {
    "itemId": 6942,
    "title": "El Yucateco Marisquera Red 120ml Seafood Hot Sauce",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/el-yucateco-marisquera-red-120ml-seafood-hot-sauce",
    "department": "brands",
    "categorySlug": "el-yucateco",
    "availability": "In Stock",
    "price": 2.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Marisquera%20Red%20120ml%20NEW.png?t=1772554614"
  },
  {
    "itemId": 7482,
    "title": "El Yucateco Mayakut Salsa de Habanero 105ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/salsa/el-yucateco-mayakut-salsa-de-habanero-105ml",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Mayakut%20Habanero%20Salsa%20.jpg?t=1785505959"
  },
  {
    "itemId": 4410,
    "title": "El Yucateco Tamarind Concentrate 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/el-yucateco/concentrates/el-yucateco-tamarind-concentrate-700ml",
    "department": "brands",
    "categorySlug": "concentrates",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/El%20Yucateco%20Tamarindo%20Concentrate%20700ml.jpg?t=1720604716"
  },
  {
    "itemId": 7471,
    "title": "Electrolit Blueberry Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-blueberry-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Blueberry%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7202,
    "title": "Electrolit Coconut Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-coconut-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Coconut%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1733241081"
  },
  {
    "itemId": 7291,
    "title": "Electrolit Grape Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-grape-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Grape%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1758020546"
  },
  {
    "itemId": 7420,
    "title": "Electrolit Guava Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-guava-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Guava%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1776085029"
  },
  {
    "itemId": 7468,
    "title": "Electrolit Horchata Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-horchata-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Horchata%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7236,
    "title": "Electrolit Lime Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-lime-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Lime%20Flavoured%20Mineral%20Water.jpg?t=1741613318"
  },
  {
    "itemId": 7237,
    "title": "Electrolit Orange Mandarine Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/drinks/electrolit-orange-mandarine-flavoured-mineral-water-625ml",
    "department": "drinks",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Orange%20Mandarine%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1769089589"
  },
  {
    "itemId": 7469,
    "title": "Electrolit Pineapple Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-pineapple-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Pineapple%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1784290566"
  },
  {
    "itemId": 7348,
    "title": "Electrolit Ponche Zero Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-ponche-zero-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Ponche%20Zero%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1762169033"
  },
  {
    "itemId": 7199,
    "title": "Electrolit Strawberry & Kiwi Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-kiwi-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/electrolit%20strawberry%20and%20kiwi%20mineral%20water%20625ml.jpg?t=1733241081"
  },
  {
    "itemId": 7472,
    "title": "Electrolit Strawberry & Kiwi ZERO Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-kiwi-zero-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Strawberry%20%26%20Kiwi%20ZERO%20Flavoured%20Mineral%20Water%20625ml%20.jpg?t=1784290553"
  },
  {
    "itemId": 7347,
    "title": "Electrolit Strawberry Flavoured Mineral Water 625ml",
    "url": "https://www.mexgrocer.co.uk/brands/electrolit/electrolit-strawberry-flavoured-mineral-water-625ml",
    "department": "brands",
    "categorySlug": "electrolit",
    "availability": "Out of Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Electrolit%20Strawberry%20Flavoured%20Mineral%20Water%20625ml.jpg?t=1762169033"
  },
  {
    "itemId": 7333,
    "title": "Fiestas Pozole 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-pozole-1kg",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "In Stock",
    "price": 5.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Pozole%201kg.jpg?t=1759402026"
  },
  {
    "itemId": 7331,
    "title": "Fiestas Tostadas 275g",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-tostadas-275g",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Tostadas%20275g.jpg?t=1759402026"
  },
  {
    "itemId": 7330,
    "title": "Fiestas Totopos Corn Tortilla Chips 400g",
    "url": "https://www.mexgrocer.co.uk/brands/fiestas/fiestas-totopos-corn-tortilla-chips-400g",
    "department": "brands",
    "categorySlug": "fiestas",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Fiestas%20Totopos%20Corn%20Tortilla%20Chips%20400g%20NEW.jpg?t=1772017902"
  },
  {
    "itemId": 6564,
    "title": "Golden Nuts 60g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/golden-nuts-60g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/golden%20nuts%202.jpg?t=1720604506"
  },
  {
    "itemId": 6966,
    "title": "Golden Nuts 60g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/golden-nuts-60g-pack-of-3",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 6.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Golden%20Nuts%2060g%20%28Pack%20of%203%29.jpg?t=1723515810"
  },
  {
    "itemId": 7400,
    "title": "Goya Aji Amarillo Yellow Hot Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-aji-amarillo-yellow-hot-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Aji%20Amarillo%20Yellow%20Hot%20Pepper%20Paste%20213g.png?t=1772192325"
  },
  {
    "itemId": 7402,
    "title": "Goya Aji Panca Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-aji-panca-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Aji%20Panca%20Pepper%20Paste%20213g.png?t=1772192325"
  },
  {
    "itemId": 7403,
    "title": "Goya Peruvian Pepper Paste Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-peruvian-pepper-paste-bundle",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 17.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Peruvian%20Pepper%20Paste%20Bundle.jpg?t=1773058869"
  },
  {
    "itemId": 7401,
    "title": "Goya Rocoto Red Pepper Paste 213g",
    "url": "https://www.mexgrocer.co.uk/brands/goya/goya-rocoto-red-pepper-paste-213g",
    "department": "brands",
    "categorySlug": "goya",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Goya%20Rocoto%20Red%20Pepper%20Paste%20213g%20NEW.png?t=1773852260"
  },
  {
    "itemId": 4395,
    "title": "Guajillo Chilli Flakes 500gr",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/guajillo-chilli-flakes-500gr",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "In Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guajillo%20new.jpg?t=1738852742"
  },
  {
    "itemId": 5218,
    "title": "Guajillo Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/guajillo-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 32,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guajillo%20Whole.jpg?t=1720604716"
  },
  {
    "itemId": 4359,
    "title": "Guanajuato 15cm Cactus Corn Tortillas 340g",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/guanajuato-15cm-cactus-corn-tortillas-340g",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 3.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/15cm%20Cactus%20Corn%20Tortilla%20Zip%20Lock%201.JPG?t=1770993599"
  },
  {
    "itemId": 4355,
    "title": "Guanajuato 15cm Yellow Corn Tortilla For Frying 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/guanajuato-15cm-yellow-corn-tortilla-for-frying-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 5.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/15CM%20YELLOW%20CORN%20TORTILLA%20FOR%20FRYING%201KG%20NEW.jpg?t=1720604506"
  },
  {
    "itemId": 7180,
    "title": "Guava Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/guava-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Guava%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 6044,
    "title": "Gustinos Wheat Flour Snack Pellets for frying GUSANO 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-gusano-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Gusano.jpg?t=1720604716"
  },
  {
    "itemId": 6056,
    "title": "Gustinos Wheat Flour Snack Pellets for frying MIX 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-mix-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Pasta%20mix.jpg?t=1663328465"
  },
  {
    "itemId": 6050,
    "title": "Gustinos Wheat Flour Snack Pellets for frying RAQUETA 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-raqueta-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Raqueta.jpg?t=1723536171"
  },
  {
    "itemId": 6042,
    "title": "Gustinos Wheat Flour Snack Pellets for frying RUEDA 227g",
    "url": "https://www.mexgrocer.co.uk/brands/gustinos-wheat-snacks/gustinos-wheat-flour-snack-pellets-for-frying-rueda-227g",
    "department": "brands",
    "categorySlug": "gustinos-wheat-snacks",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Gustinos%20Rueda.jpg?t=1663328465"
  },
  {
    "itemId": 5547,
    "title": "Habanero Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/habanero-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 62,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/habanero%20dry%201kg.jpg?t=1664577335"
  },
  {
    "itemId": 4892,
    "title": "Harina Pan (sweet) Red 500g Corn Flour for Arepas",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-sweet-red-500g-corn-flour-for-arepas",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "Out of Stock",
    "price": 5.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20Pan%20%28sweet%29%20Red%20500g%20NEW.png?t=1785406373"
  },
  {
    "itemId": 5223,
    "title": "Harina Pan Amarillo 1kg Yellow Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-amarillo-1kg-yellow-corn-flour",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "In Stock",
    "price": 4.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20Pan%20Amarilla%201kg%20NEW.jpg?t=1774349419"
  },
  {
    "itemId": 5226,
    "title": "Harina Pan Blanca 1kg White Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/harina-pan/harina-pan-blanca-1kg-white-corn-flour",
    "department": "brands",
    "categorySlug": "harina-pan",
    "availability": "In Stock",
    "price": 4.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Harina%20PAN%20Blanca.jpeg?t=1738852719"
  },
  {
    "itemId": 4654,
    "title": "Herdez Casera Salsa 210g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-casera-salsa-210g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 1.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Casera%20Salsa%20210g%20NEW.jpg?t=1772551223"
  },
  {
    "itemId": 4651,
    "title": "Herdez Ranchera Salsa 220g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-ranchera-salsa-220g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Ranchera%20220g.JPG?t=1668500632"
  },
  {
    "itemId": 7243,
    "title": "HERDEZ SALSA DIPS KIT",
    "url": "https://www.mexgrocer.co.uk/meals/kits/herdez-salsa-dips-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 11.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Dips%20Kit.jpg?t=1746702217"
  },
  {
    "itemId": 4656,
    "title": "Herdez Salsa Verde 210g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-210g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Verde%20210g.JPG?t=1725445050"
  },
  {
    "itemId": 6993,
    "title": "Herdez Salsa Verde Jar 453g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-jar-453g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20Verde%20Jar%20453g%20NEW.jpg?t=1772020676"
  },
  {
    "itemId": 4649,
    "title": "Herdez Salsa Verde with Avocado 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-salsa-verde-with-avocado-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Salsa%20de%20Guacamole.jpg?t=1663328465"
  },
  {
    "itemId": 6898,
    "title": "Herdez Spicy Chipotle Salsa Cremoso 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-spicy-chipotle-salsa-cremoso-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Spicy%20Chipotle%20Cremoso%20240g.jpg?t=1720604506"
  },
  {
    "itemId": 6897,
    "title": "Herdez Spicy Guacamole Sauce 240g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-spicy-guacamole-sauce-240g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "In Stock",
    "price": 4.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20Spicy%20Guacamole%20240g.jpg?t=1720604716"
  },
  {
    "itemId": 7174,
    "title": "Herdez White Corn with Poblano 220g",
    "url": "https://www.mexgrocer.co.uk/brands/herdez/herdez-white-corn-with-poblano-220g",
    "department": "brands",
    "categorySlug": "herdez",
    "availability": "Out of Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Herdez%20White%20Corn%20with%20Poblano%20220g.jpg?t=1733227347"
  },
  {
    "itemId": 7438,
    "title": "Hibiscus Moy 1kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/hibiscus-moy-1kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 18,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Hibiscus%20Moy%201kg.png?t=1779120517"
  },
  {
    "itemId": 6668,
    "title": "Hoja Santa 10g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/hoja-santa-10g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 4.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/hoja%20santa.jpg?t=1760610874"
  },
  {
    "itemId": 5556,
    "title": "Hot Nuts Peanuts 75g Spicy Peanuts with Chilli & Lime",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/hot-nuts-peanuts-75g-spicy-peanuts-with-chilli-lime",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.52,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/hot%20nuts.jpg?t=1778848995"
  },
  {
    "itemId": 7242,
    "title": "ISADORA REFRIED BEANS PACK",
    "url": "https://www.mexgrocer.co.uk/meals/kits/isadora-refried-beans-pack",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Beans%20Pack.jpg?t=1746702217"
  },
  {
    "itemId": 7327,
    "title": "Isadora Refried Black Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-black-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "Out of Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Black%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 7328,
    "title": "Isadora Refried Peruvian Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-peruvian-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Peruvian%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 7292,
    "title": "Isadora Refried Pinto Beans 430g",
    "url": "https://www.mexgrocer.co.uk/brands/isadora/isadora-refried-pinto-beans-430g",
    "department": "brands",
    "categorySlug": "isadora",
    "availability": "In Stock",
    "price": 2.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Isadora%20Refried%20Pinto%20Beans%20430g.jpg?t=1759398753"
  },
  {
    "itemId": 4393,
    "title": "Jalapeno Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/crushed-and-powder-chillies/jalapeno-chilli-flakes-500g",
    "department": "catering-sizes",
    "categorySlug": "crushed-and-powder-chillies",
    "availability": "Out of Stock",
    "price": 14.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/jalapeno%20flakes%202.jpg?t=1738862528"
  },
  {
    "itemId": 7259,
    "title": "Jalapeno Chips 52g Spicy Potato Crisps",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/jalapeno-chips-52g-spicy-potato-crisps",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/potato%20chips%20jalapenos.jpg?t=1749467185"
  },
  {
    "itemId": 7430,
    "title": "Jarritos Fruit Punch 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-fruit-punch-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/F.jpg?t=1778493080"
  },
  {
    "itemId": 4688,
    "title": "Jarritos Grapefruit 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-grapefruit-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARGlass_Grapefruit_International.png?t=1736784486"
  },
  {
    "itemId": 4693,
    "title": "Jarritos Guava 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-guava-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Guava.jpg?t=1663328465"
  },
  {
    "itemId": 4687,
    "title": "Jarritos Lime 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-lime-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Lime%20New%20Stock%20Photo.jpg?t=1720604716"
  },
  {
    "itemId": 4689,
    "title": "Jarritos Mandarin 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mandarin-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20mandarin.jpg?t=1663328465"
  },
  {
    "itemId": 4690,
    "title": "Jarritos Mango 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mango-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Mango.jpg?t=1663328465"
  },
  {
    "itemId": 4694,
    "title": "Jarritos Mexican Cola 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-mexican-cola-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "In Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARGlass_Cola_International.png?t=1736784487"
  },
  {
    "itemId": 5347,
    "title": "Jarritos Pineapple 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-pineapple-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarriots%20Pineapple.jpg?t=1664577335"
  },
  {
    "itemId": 6809,
    "title": "Jarritos Rainbow Kit",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-rainbow-kit",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 17.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/JARRITOS%20RAINBOW%20%28temporary%20cola%20and%20strawberry%29.jpg?t=1734958683"
  },
  {
    "itemId": 6722,
    "title": "Jarritos Strawberry 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-strawberry-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Strawberry.jpg?t=1667318711"
  },
  {
    "itemId": 7429,
    "title": "Jarritos Tamarind 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/jarritos/jarritos-tamarind-370ml",
    "department": "brands",
    "categorySlug": "jarritos",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jarritos%20Tamarind%20370ml.jpg?t=1778494325"
  },
  {
    "itemId": 5363,
    "title": "Jose Cuervo Margarita Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/mixers/jose-cuervo-margarita-mix",
    "department": "drinks",
    "categorySlug": "mixers",
    "availability": "Out of Stock",
    "price": 11.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jose%20Cuervo%20Margarita%20Mix%201lt.jpg?t=1725283855"
  },
  {
    "itemId": 6757,
    "title": "Kankun Jalapeno 2kg",
    "url": "https://www.mexgrocer.co.uk/brands/kankun/kankun-jalapeno-2kg",
    "department": "brands",
    "categorySlug": "kankun",
    "availability": "Out of Stock",
    "price": 8.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kankun%20Jalapeno%202kg.jpg?t=1675859705"
  },
  {
    "itemId": 6756,
    "title": "KanKun Pibil 2kg",
    "url": "https://www.mexgrocer.co.uk/brands/kankun/kankun-pibil-2kg",
    "department": "brands",
    "categorySlug": "kankun",
    "availability": "Out of Stock",
    "price": 63.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Kankun%20Pibil%202kg.jpg?t=1675859707"
  },
  {
    "itemId": 5507,
    "title": "Ki Gourmet Chipotle Adelita 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-chipotle-adelita-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Adelita.jpg?t=1738853106"
  },
  {
    "itemId": 5489,
    "title": "Ki Gourmet Green with Chilli La Dona 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-green-with-chilli-la-dona-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Dona.jpg?t=1738853106"
  },
  {
    "itemId": 5486,
    "title": "Ki Gourmet Mango Huapango 420g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-mango-huapango-420g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20Huapango.jpg?t=1738853106"
  },
  {
    "itemId": 5510,
    "title": "Ki Gourmet Morita Llorona 380g Salsa",
    "url": "https://www.mexgrocer.co.uk/brands/ki-gourmet/ki-gourmet-morita-llorona-380g-salsa",
    "department": "brands",
    "categorySlug": "ki-gourmet",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ki%20Gourmet%20-%20La%20Llorona.jpg?t=1738853106"
  },
  {
    "itemId": 5276,
    "title": "Knorr Mexican Style Rice 160g",
    "url": "https://www.mexgrocer.co.uk/food/rice-and-soups/knorr-mexican-style-rice-160g",
    "department": "food",
    "categorySlug": "rice-and-soups",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Knorr%20Arroz%20a%20la%20Mexicana%202.JPG?t=1732793264"
  },
  {
    "itemId": 5409,
    "title": "Knorr Poblano Rice 160g",
    "url": "https://www.mexgrocer.co.uk/food/rice-and-soups/knorr-poblano-rice-160g",
    "department": "food",
    "categorySlug": "rice-and-soups",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/poblano.jpg?t=1664577335"
  },
  {
    "itemId": 7453,
    "title": "Knorr Tomato Powder 200g",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/knorr-tomato-powder-200g",
    "department": "food",
    "categorySlug": "seasonings",
    "availability": "In Stock",
    "price": 13,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Knorr%20Tomato%20Powder%20200g.png?t=1782207344"
  },
  {
    "itemId": 5612,
    "title": "La Anita Marinade Pastor Sauce Bottle 300ml",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/pastes/la-anita-marinade-pastor-sauce-bottle-300ml",
    "department": "food",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Anota%20pastor%20marinade.jpg?t=1738855352"
  },
  {
    "itemId": 6929,
    "title": "La Anita Pastor Marinde Bottle 3.8Lt",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/pastes/la-anita-pastor-marinde-bottle-38lt",
    "department": "food",
    "categorySlug": "pastes",
    "availability": "In Stock",
    "price": 49.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Anita%20Pastor%20Marinde%20Bottle%203.8Lt.jpg?t=1706023595"
  },
  {
    "itemId": 7340,
    "title": "La Artesanal Extra Hot Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-extra-hot-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20Macha%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7343,
    "title": "La Artesanal Honey and Cranberry Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-honey-and-cranberry-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Artesanal%20Blueberry%20Salsa%20Macha%20200g.jpg?t=1763650465"
  },
  {
    "itemId": 7345,
    "title": "La Artesanal Medium Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-medium-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20No%20Tan%20Macha%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7341,
    "title": "La Artesanal Peanut and Morita Salsa Macha 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-peanut-and-morita-salsa-macha-200g",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 5.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Toke%20Innova%20Peanut%20Sauce%20200g.jpg?t=1761824226"
  },
  {
    "itemId": 7393,
    "title": "La Artesanal Salsa Macha Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/la-artesanal/la-artesanal-salsa-macha-bundle",
    "department": "brands",
    "categorySlug": "la-artesanal",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Artesanal%20Salsa%20Macha%20Bundle.jpg?t=1769074391"
  },
  {
    "itemId": 6111,
    "title": "La Costena Black Whole Beans 400g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-black-whole-beans-400g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20black%20beans%20400g.jpg?t=1663328465"
  },
  {
    "itemId": 6084,
    "title": "La Costena Chipotle in Adobo 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 23.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20chipotle%20in%20adobo%202.8kg.jpg?t=1776702236"
  },
  {
    "itemId": 7213,
    "title": "La Costena Chipotle in Adobo Picados Jar 230g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-picados-jar-230g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Chipotle%20in%20Adobo%20Picados%20jar%20230g.png?t=1737390640"
  },
  {
    "itemId": 4493,
    "title": "La Costena Chipotle in Adobo Sauce 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-chipotle-in-adobo-sauce-199g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Chipotle%20in%20Adobo%20Sauce%20199g%20UPDATED.jpg?t=1696326571"
  },
  {
    "itemId": 6128,
    "title": "La Costena Elote Dorado Whole 220g Sweet Corn",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-elote-dorado-whole-220g-sweet-corn",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20gold%20corn.jpg?t=1776771320"
  },
  {
    "itemId": 7255,
    "title": "La Costena Green Salsa 475g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-green-salsa-475g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Green%20Salsa%20475g.jpg?t=1749029483"
  },
  {
    "itemId": 6113,
    "title": "La Costena Guacamole Salsa 465g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-guacamole-salsa-465g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Guacamole%20Salsa%20465g.jpg?t=1748510629"
  },
  {
    "itemId": 6115,
    "title": "La Costena Guayaba Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-guayaba-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20guava%20paste.jpg?t=1663328465"
  },
  {
    "itemId": 6093,
    "title": "La Costena Habanero Rajas 210g Habanero Pepper Slices",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-habanero-rajas-210g-habanero-pepper-slices",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20habaneros%20slices.jpg?t=1776771321"
  },
  {
    "itemId": 6094,
    "title": "La Costena Habanero Whole 200g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-habanero-whole-200g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20habaneros.jpg?t=1782467505"
  },
  {
    "itemId": 6082,
    "title": "La Costena Huitlacoche 380g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-huitlacoche-380g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 12.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20huitlacoche.jpg?t=1663328465"
  },
  {
    "itemId": 6090,
    "title": "La Costena Jalapeno Chilli Picados 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-chilli-picados-220g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20jalapeno%20pickled%20220g.jpg?t=1776771319"
  },
  {
    "itemId": 5578,
    "title": "La Costena Jalapeno Chillies Whole 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-chillies-whole-220g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20jalapenos%20220g.jpg?t=1782994609"
  },
  {
    "itemId": 6120,
    "title": "La Costena Jalapeno Nacho 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-jalapeno-nacho-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 9.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Jalapeno%20nacho%20slices%203kg.jpg?t=1776771319"
  },
  {
    "itemId": 7212,
    "title": "La Costena Jalapeno Nacho Jar 210g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-jalapeno-nacho-jar-210g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.55,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Jalapeno%20Nacho%20Jar%20210g.jpg?t=1772013242"
  },
  {
    "itemId": 6293,
    "title": "La Costena Jalapeno Red Slices 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-red-slices-199g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/LA%20COSTENA%20JALAPENO%20RED%20SLICES%20199G%20%28updated%29.jpg?t=1717148376"
  },
  {
    "itemId": 6138,
    "title": "La Costena Jalapeno Slices 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-slices-199g",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/LA%20COSTENA%20JALAPENO%20SLICES%20199G%20%28updated%29.jpg?t=1711368382"
  },
  {
    "itemId": 6088,
    "title": "La Costena Jalapeno Whole 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/chillies/la-costena-jalapeno-whole-28kg",
    "department": "brands",
    "categorySlug": "chillies",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20whole%20jalapenos%203kg.jpg?t=1776771299"
  },
  {
    "itemId": 6807,
    "title": "La Costena Maiz Blanco 820g Mexican Pozole",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-maiz-blanco-820g-mexican-pozole",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Maiz%20Blanco%20820g%20NEW.png?t=1772458767"
  },
  {
    "itemId": 6840,
    "title": "La Costena Membrillo Chamoy Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-membrillo-chamoy-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Membrillo%20Chamoy%20Paste%20240g.jpg?t=1725531420"
  },
  {
    "itemId": 6145,
    "title": "La Costena Membrillo Paste 240g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-membrillo-paste-240g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.45,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20membrillo%20paste.jpg?t=1663328465"
  },
  {
    "itemId": 6395,
    "title": "La Costena Mexican Red Salsa 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-mexican-red-salsa-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 13.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Mexican%20Red%20Salsa%202.8kg%20UPDATED.jpg?t=1696326552"
  },
  {
    "itemId": 7428,
    "title": "La Costena Pickled Carrots 230g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-pickled-carrots-230g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 0.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Pickled%20Carrots%20230g.jpg?t=1776782587"
  },
  {
    "itemId": 6109,
    "title": "La Costena Pinto Whole Beans 400g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-pinto-whole-beans-400g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Whole%20pinto%20bean%20400g.jpg?t=1752160296"
  },
  {
    "itemId": 7214,
    "title": "La Costena Red Nacho Jalapeno Tatemado 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-red-nacho-jalapeno-tatemado-220g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Red%20Nacho%20Jalapeno%20Tatemado%20220g%20HQ.jpg?t=1737994855"
  },
  {
    "itemId": 6086,
    "title": "La Costena Refried Black Beans Pouch 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-refried-black-beans-pouch-220g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Refried%20Black%20Beans%20Pouch%20220g.png?t=1663328465"
  },
  {
    "itemId": 6104,
    "title": "La Costena Refried Pinto Beans Pouch 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/beans/la-costena-refried-pinto-beans-pouch-220g",
    "department": "brands",
    "categorySlug": "beans",
    "availability": "In Stock",
    "price": 1.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20pinto%20bean%20pouch.jpg?t=1720604506"
  },
  {
    "itemId": 6079,
    "title": "La Costena Salsa Dip Hot 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-hot-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20hot%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6076,
    "title": "La Costena Salsa Dip Medium 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-medium-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20medium%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6075,
    "title": "La Costena Salsa Dip Mild 453g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/salsa/la-costena-salsa-dip-mild-453g",
    "department": "brands",
    "categorySlug": "salsa",
    "availability": "In Stock",
    "price": 3.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20mild%20salsa%20dip.jpg?t=1663328465"
  },
  {
    "itemId": 6853,
    "title": "La Costena Salsa Dips",
    "url": "https://www.mexgrocer.co.uk/meals/kits/la-costena-salsa-dips",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 8.49,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Dips%20.jpg?t=1691509886"
  },
  {
    "itemId": 6108,
    "title": "La Costena Salsa Mexicana Casera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-mexicana-casera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Mexicana%20Casera%20250g%20new.jpg?t=1769681995"
  },
  {
    "itemId": 6295,
    "title": "La Costena Salsa Picante 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-picante-370ml",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20para%20bonata%20salsa.jpg?t=1663328465"
  },
  {
    "itemId": 4490,
    "title": "La Costena Salsa Ranchera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-ranchera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Ranchera%20250g%20new.jpg?t=1769681138"
  },
  {
    "itemId": 4491,
    "title": "La Costena Salsa Taquera 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-taquera-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Taquera%20250g%20new.jpg?t=1769681138"
  },
  {
    "itemId": 6391,
    "title": "La Costena Salsa Verde 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-verde-28kg",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 13.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Verde%202.8kg.jpg?t=1772013227"
  },
  {
    "itemId": 4515,
    "title": "La Costena Salsa Verde 250g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-salsa-verde-250g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Salsa%20Verde%20250g%20new.jpg?t=1769681144"
  },
  {
    "itemId": 6291,
    "title": "La Costena Serrano Chillies Toreados 220g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-serrano-chillies-toreados-220g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20serranos%20toreados%20220g.jpg?t=1776771319"
  },
  {
    "itemId": 5581,
    "title": "La Costena Serrano Whole Chillies 199g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-serrano-whole-chillies-199g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20Serrano%20Whole%20Chillies%20199g.jpg?t=1772013228"
  },
  {
    "itemId": 6284,
    "title": "La Costena Tamal de Elote 110g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tamal-de-elote-110g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tamal%20elote.jpg?t=1663328465"
  },
  {
    "itemId": 6282,
    "title": "La Costena Tamal Dulce 110g",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tamal-dulce-110g",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tamal%20dulce.jpg?t=1663328465"
  },
  {
    "itemId": 6186,
    "title": "La Costena Tomatillo Whole 2.8kg Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tomatillo-whole-28kg-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tomatillos%20whole%202.8kg.jpg?t=1780396867"
  },
  {
    "itemId": 6188,
    "title": "La Costena Tomatillos 794g Mexican Green Tomatoes",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-tomatillos-794g-mexican-green-tomatoes",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20tomatillos%20whole%20794g.jpg?t=1781700435"
  },
  {
    "itemId": 7396,
    "title": "La Costena Traditional Mexican Salsa Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-traditional-mexican-salsa-bundle",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 10,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costenaa%20Traditional%20Mexican%20Salsa%20Bundle%201.jpg?t=1769682601"
  },
  {
    "itemId": 6289,
    "title": "La Costena Vinagre de Manzana 1050ml",
    "url": "https://www.mexgrocer.co.uk/brands/la-costena/la-costena-vinagre-de-manzana-1050ml",
    "department": "brands",
    "categorySlug": "la-costena",
    "availability": "Out of Stock",
    "price": 2.35,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Costena%20vinegar.jpg?t=1663328465"
  },
  {
    "itemId": 6812,
    "title": "La Fonda 6\" Flour Tortilla",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-6-flour-tortilla",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Flour%20Tortilla.jpg?t=1772013237"
  },
  {
    "itemId": 7238,
    "title": "La Fonda Blue Flautas Tortillas 20 Pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-flautas-tortillas-20-pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Flautas%20Tortillas%2020%20Pcs.jpg?t=1741876895"
  },
  {
    "itemId": 7224,
    "title": "La Fonda Blue Placera 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-placera-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Placera%2020PCS%20NEW.jpg?t=1773916849"
  },
  {
    "itemId": 7225,
    "title": "La Fonda Blue Taquera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-taquera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Taquera%20Tortillas%2020PCS%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 7223,
    "title": "La Fonda Blue Tradicional 20PCS Tortillas",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-blue-tradicional-20pcs-tortillas",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.85,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Blue%20Tradicional%2020PCS%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 7219,
    "title": "La Fonda Cactus Strips Jar 460g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-strips-jar-460g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Strips%20Jar%20460g%20%28230g%20Drained%20Weight%29.jpg?t=1771946785"
  },
  {
    "itemId": 7218,
    "title": "La Fonda Cactus Strips Pouch 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-strips-pouch-1kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 6.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Strips%20Pouch%201kg%20NEW.jpg?t=1772013242"
  },
  {
    "itemId": 7221,
    "title": "La Fonda Cactus Whole Leaves Jar 460g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-whole-leaves-jar-460g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Whole%20Leaves%20Jar%20460g%20%28230g%20Drained%20Weight%29.jpg?t=1771946785"
  },
  {
    "itemId": 7220,
    "title": "La Fonda Cactus Whole Leaves Pouch 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-cactus-whole-leaves-pouch-1kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 7,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Cactus%20Whole%20Leaves%20Pouch%201kg%20NEW.jpg?t=1772013242"
  },
  {
    "itemId": 7462,
    "title": "La Fonda Chipotle Morita Powder 500g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-chipotle-morita-powder-500g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 17,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Chipotle%20Morita%20Powder%20500g.jpg?t=1782314443"
  },
  {
    "itemId": 7240,
    "title": "La Fonda Fresh Extra Large Corn Tortilla 20pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-extra-large-corn-tortilla-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 19,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Extra%20Large%20Corn%20Tortilla%2020pcs%20NEW.png?t=1773919949"
  },
  {
    "itemId": 7235,
    "title": "La Fonda Fresh Flautas Tortillas 20 Pcs",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-flautas-tortillas-20-pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 6.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Flautas%20Tortillas%2020%20Pcs%20NEW.jpg?t=1773916848"
  },
  {
    "itemId": 6918,
    "title": "La Fonda Fresh Placera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-placera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Placera%20Tortillas%2020PCS%20NEW.jpg?t=1773916844"
  },
  {
    "itemId": 6916,
    "title": "La Fonda Fresh Taquera Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-fresh-taquera-tortillas-20pcs",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Taquera%20Tortillas%2020PCS%20NEW.jpg?t=1773916844"
  },
  {
    "itemId": 7387,
    "title": "La Fonda LS Placera Corn Tortilla 36 x 20pcs Case",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-ls-placera-corn-tortilla-36-x-20pcs-case",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 119,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7386,
    "title": "La Fonda LS Taquera Corn Tortilla 18 x 20pcs Case",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-long-shelf-life-taquera-corn-tortilla-18-x-20pcs-case",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 63,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7338,
    "title": "La Fonda LS Tradicional Corn Tortilla 18 x 20 Case",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/corn-tortillas/la-fonda-ls-tradicional-corn-tortilla-18-x-20-case",
    "department": "catering-sizes",
    "categorySlug": "corn-tortillas",
    "availability": "In Stock",
    "price": 63,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20LS.png?t=1772805284"
  },
  {
    "itemId": 7427,
    "title": "La Fonda Pickled Cactus in Brine 330g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-pickled-cactus-in-brine-330g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Pickled%20Cactus%20in%20Brine%20330g.png?t=1776769729"
  },
  {
    "itemId": 7454,
    "title": "La Fonda Tomatillo Whole 2.8kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-tomatillo-whole-28kg",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 10.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Tomatillo%202.8kg.jpg?t=1782207572"
  },
  {
    "itemId": 7355,
    "title": "La Fonda Tradicional Corn Tortillas 8 Pieces",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-tradicional-corn-tortillas-8-pieces",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 2.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Tradicional%20Corn%20Tortillas%208%20Pieces%20NEW.jpg?t=1775663302"
  },
  {
    "itemId": 6907,
    "title": "La Fonda Tradicional Fresh Tortillas 20PCS",
    "url": "https://www.mexgrocer.co.uk/food/corn-tortillas/la-fonda-tradicional-fresh-tortillas-20pcs",
    "department": "food",
    "categorySlug": "corn-tortillas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Fresh%20Tradicional%20Tortillas%2020PCS%20NEW.jpg?t=1773852254"
  },
  {
    "itemId": 7457,
    "title": "La Fonda Whole Dried Cascabel 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-cascabel-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Cascabel%2075g.jpg?t=1782314442"
  },
  {
    "itemId": 7456,
    "title": "La Fonda Whole Dried Jalapeno 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-jalapeno-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Jalapeno%2075g.jpg?t=1782314442"
  },
  {
    "itemId": 7461,
    "title": "La Fonda Whole Dried Morita 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-morita-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Morita%2075g.jpg?t=1782314443"
  },
  {
    "itemId": 7460,
    "title": "La Fonda Whole Dried Mulato 75g",
    "url": "https://www.mexgrocer.co.uk/brands/la-fonda/la-fonda-whole-dried-mulato-75g",
    "department": "brands",
    "categorySlug": "la-fonda",
    "availability": "In Stock",
    "price": 3.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Fonda%20Whole%20Dried%20Mulato%2075g.jpg?t=1782314443"
  },
  {
    "itemId": 6822,
    "title": "La Sierra Bayos Beans Whole 560g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-bayos-beans-whole-560g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Bayos%20Beans%20Whole%20560g%20NEW.png?t=1772539376"
  },
  {
    "itemId": 5607,
    "title": "La Sierra Chilaquiles Verdes 370g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-chilaquiles-verdes-370g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Chilaquiles%20Verde%20370g.jpg?t=1738855352"
  },
  {
    "itemId": 6896,
    "title": "La Sierra Dried Black Beans",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-dried-black-beans",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 3.33,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Dried%20Black%20Beans%20900g%202026.jpg?t=1770648666"
  },
  {
    "itemId": 7230,
    "title": "La Sierra Dried Pinto Beans",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-dried-pinto-beans",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 3.33,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Dried%20Pinto%20Beans%20900g%20copy.jpg?t=1739274053"
  },
  {
    "itemId": 5672,
    "title": "La Sierra Red Chilaquiles 370g",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-red-chilaquiles-370g",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20sierra%20Chilaquiles%20Rojos.jpg?t=1720604716"
  },
  {
    "itemId": 6260,
    "title": "La Sierra Refried Pinto Beans 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-refried-pinto-beans-3kg",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 9.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Pinto%20Refried%20Beans%202.8kg.JPG?t=1762257275"
  },
  {
    "itemId": 6264,
    "title": "La Sierra Whole Pinto Beans 3kg",
    "url": "https://www.mexgrocer.co.uk/brands/la-sierra/la-sierra-whole-pinto-beans-3kg",
    "department": "brands",
    "categorySlug": "la-sierra",
    "availability": "In Stock",
    "price": 7.13,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/La%20Sierra%20Pinto%20Beans%20Whole%203kg.JPG?t=1750786392"
  },
  {
    "itemId": 7244,
    "title": "Las Catrinas Avocado Leaves 70g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/las-catrinas-avocado-leaves-70g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Avocado%20Leaves%20Whole.jpg?t=1747069449"
  },
  {
    "itemId": 4386,
    "title": "Las Catrinas Black Beans Dried 500g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-black-beans-dried-500g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Black%20Beans%20500g.JPG?t=1731406974"
  },
  {
    "itemId": 4383,
    "title": "Las Catrinas Chipotle Morita Chilli Dried 40g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-chipotle-morita-chilli-dried-40g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/morita%20w%20catrinas%202.jpg?t=1673875100"
  },
  {
    "itemId": 5432,
    "title": "Las Catrinas Cinnamon Quills - Canela 100g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-cinnamon-quills-canela-100g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 7.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cinnamon%20-%20NEW.jpg?t=1660147763"
  },
  {
    "itemId": 5546,
    "title": "Las Catrinas Habanero Dried Chilli 30g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-habanero-dried-chilli-30g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/habanero%20w%20catrinas.jpg?t=1664577335"
  },
  {
    "itemId": 5575,
    "title": "Las Catrinas Piloncillo 230g Raw Cane Sugar",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-piloncillo-230g-raw-cane-sugar",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/piloncillo.jpg?t=1738855344"
  },
  {
    "itemId": 4336,
    "title": "Las Catrinas Pinto Dried Beans 500g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-pinto-dried-beans-500g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 3.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Pinto%20Beans%20500g.JPG?t=1720604716"
  },
  {
    "itemId": 6517,
    "title": "Las Catrinas Salty Chilli Margarita Rim 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-salty-chilli-margarita-rim-1kg",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 13,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Salty%20Chilli%20Margarita%20rim.jpg?t=1663328465"
  },
  {
    "itemId": 6520,
    "title": "Las Catrinas Sweet Hibiscus Margarita Rim 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/las-catrinas-sweet-hibiscus-margarita-rim-1kg",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "Out of Stock",
    "price": 13,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sweet%20Hibiscus%20Salt.jpg?t=1663934583"
  },
  {
    "itemId": 7193,
    "title": "Lime Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/lime-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lime%20Tang%20Powder%20104g.jpg?t=1733234719"
  },
  {
    "itemId": 7263,
    "title": "Loltun Pastor Cooking Paste 320g",
    "url": "https://www.mexgrocer.co.uk/brands/loltun/loltun-pastor-cooking-paste-320g",
    "department": "brands",
    "categorySlug": "loltun",
    "availability": "In Stock",
    "price": 5.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lol%20Tun%20Pastor.jpg?t=1749463074"
  },
  {
    "itemId": 7262,
    "title": "Loltun Pibil Cooking Paste 320g",
    "url": "https://www.mexgrocer.co.uk/brands/loltun/loltun-pibil-cooking-paste-320g",
    "department": "brands",
    "categorySlug": "loltun",
    "availability": "In Stock",
    "price": 5.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lol%20Tun%20Pibil.jpg?t=1749463074"
  },
  {
    "itemId": 6040,
    "title": "Lucas Gusano",
    "url": "https://www.mexgrocer.co.uk/food/candy/lucas-gusano",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 13.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Lucas%20gusano.jpg?t=1720604506"
  },
  {
    "itemId": 5872,
    "title": "Lucas Muecas Sweet Chamoy Candy with Chilli Mix Powder",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/lucas-muecas-sweet-chamoy-candy-with-chilli-mix-powder",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/lucas%20muecas.jpg?t=1738751811"
  },
  {
    "itemId": 4953,
    "title": "Macha Christmas Fruit Ponche Drink 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-christmas-fruit-ponche-drink-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 1.53,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Ponche%20navideno%20Macha.jpg?t=1664793366"
  },
  {
    "itemId": 5877,
    "title": "Macha Guava Fruit in Syrup 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-guava-fruit-in-syrup-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/guayaba%20new.jpg?t=1663328465"
  },
  {
    "itemId": 6382,
    "title": "Macha Sugar Cane 908g",
    "url": "https://www.mexgrocer.co.uk/food/speciality/macha-sugar-cane-908g",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sugar%20Cane.jpg?t=1663328465"
  },
  {
    "itemId": 5002,
    "title": "Macha Tejocote 908g",
    "url": "https://www.mexgrocer.co.uk/sale-items/macha-tejocote-908g",
    "department": "sale-items",
    "categorySlug": "",
    "availability": "In Stock",
    "price": 1.53,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tejocote%20Macha.jpg?t=1660147763"
  },
  {
    "itemId": 6321,
    "title": "Maggie Black Sauce Bottle 800ml",
    "url": "https://www.mexgrocer.co.uk/food/seasonings/maggie-black-sauce-bottle-800ml",
    "department": "food",
    "categorySlug": "seasonings",
    "availability": "In Stock",
    "price": 30,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Jugo.jpg?t=1663328465"
  },
  {
    "itemId": 5582,
    "title": "Maizena Cajeta 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-cajeta-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20cajeta.jpg?t=1738855345"
  },
  {
    "itemId": 5585,
    "title": "Maizena Chocolate 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-chocolate-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20chocolate.jpg?t=1738855345"
  },
  {
    "itemId": 5584,
    "title": "Maizena Coconut 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-coconut-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/maizena%20coconut.jpg?t=1738855345"
  },
  {
    "itemId": 5391,
    "title": "Maizena Nuez Walnut 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-nuez-walnut-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maizena%20Walnut.jpg?t=1738855346"
  },
  {
    "itemId": 5388,
    "title": "Maizena Vanilla 47g Atole Drink Mix",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/maizena-vanilla-47g-atole-drink-mix",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maizena%20Vainilla%20new.jpg?t=1738855346"
  },
  {
    "itemId": 7194,
    "title": "Mango Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/mango-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mango%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 5631,
    "title": "Manita de la Suerte Lollipop",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/manita-de-la-suerte-lollipop",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Manita%20de%20la%20Suerte.jpg?t=1720604716"
  },
  {
    "itemId": 7350,
    "title": "Manzanita Sol 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/manzanita-sol-355ml",
    "department": "drinks",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 2.88,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Manzanita%20Sol%20355ml.jpg?t=1762429708"
  },
  {
    "itemId": 6323,
    "title": "Marinela Cinnamon Canelitas Cookies 60g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-cinnamon-canelitas-cookies-60g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 1.56,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Canelitas%20Unit.jpg?t=1720604506"
  },
  {
    "itemId": 6331,
    "title": "Marinela Pineapple Barritas Cookies 55g",
    "url": "https://www.mexgrocer.co.uk/brands/marinela/marinela-pineapple-barritas-cookies-55g",
    "department": "brands",
    "categorySlug": "marinela",
    "availability": "Out of Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Barritas%20Pineapple%20Unit.jpg?t=1761590579"
  },
  {
    "itemId": 6325,
    "title": "Marinela Polvorones Shortbread Orange Cookies 74g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-polvorones-shortbread-orange-cookies-74g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 1.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Polvorones%20Unit%20update.jpg?t=1776857354"
  },
  {
    "itemId": 6329,
    "title": "Marinela Strawberry Barritas Cookies 55g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/marinela-strawberry-barritas-cookies-55g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "Out of Stock",
    "price": 1.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Barritas%20Strawberry%20Unit.jpg?t=1720604716"
  },
  {
    "itemId": 5271,
    "title": "Maruchan Shrimp with Lime and Habanero Soup",
    "url": "https://www.mexgrocer.co.uk/meals/ready-meals/maruchan-shrimp-with-lime-and-habanero-soup",
    "department": "meals",
    "categorySlug": "ready-meals",
    "availability": "Out of Stock",
    "price": 0.63,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maruchan%20Shrimp%20with%20Habanero.JPG?t=1723494117"
  },
  {
    "itemId": 5598,
    "title": "Maruchan Shrimp with Piquin Chilli Soup 64g",
    "url": "https://www.mexgrocer.co.uk/meals/ready-meals/maruchan-shrimp-with-piquin-chilli-soup-64g",
    "department": "meals",
    "categorySlug": "ready-meals",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maruchan%20Shrimp%20with%20Piquin%20Chile.JPG?t=1724156363"
  },
  {
    "itemId": 7467,
    "title": "MasaMaiz Blue Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-blue-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "In Stock",
    "price": 100,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20Blue%20Corn%20Flour%2020kg.jpg?t=1783008086"
  },
  {
    "itemId": 7465,
    "title": "MasaMaiz White Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-white-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "Out of Stock",
    "price": 80,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20White%20Corn%20Flour%2020kg1.jpg?t=1783008085"
  },
  {
    "itemId": 7466,
    "title": "MasaMaiz Yellow Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/masamaiz/masamaiz-yellow-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "masamaiz",
    "availability": "Out of Stock",
    "price": 95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MasaMaiz%20Yellow%20Corn%20Flour%2020kg1.jpg?t=1783008086"
  },
  {
    "itemId": 7250,
    "title": "Maseca Antojitos 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/maseca/maseca-antojitos-1kg",
    "department": "brands",
    "categorySlug": "maseca",
    "availability": "Out of Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Antojitos%20for%20Frying%201kg.jpg?t=1759752417"
  },
  {
    "itemId": 4469,
    "title": "Maseca Blue Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-blue-corn-flour-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "Out of Stock",
    "price": 3.59,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Blue%201kg%20New.jpg?t=1720604716"
  },
  {
    "itemId": 4468,
    "title": "Maseca Corn Flour for Tamales 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-corn-flour-for-tamales-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "In Stock",
    "price": 2.69,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Tamales.jpg?t=1720604716"
  },
  {
    "itemId": 4467,
    "title": "Maseca White Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk/maseca-white-corn-flour-1kg",
    "department": "food",
    "categorySlug": "maseca-corn-flour-mexican-food-mexican-corn-flour-flour-corn-mexican-shop-mexgrocer-uk",
    "availability": "Out of Stock",
    "price": 3.59,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca.JPG?t=1738679669"
  },
  {
    "itemId": 7451,
    "title": "Maseca Yellow 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/maseca/maseca-yellow-1kg",
    "department": "brands",
    "categorySlug": "maseca",
    "availability": "Out of Stock",
    "price": 3.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maseca%20Yellow%201kg.jpg?t=1781789299"
  },
  {
    "itemId": 5336,
    "title": "Mayordomo Chocolate 500g Mexican Hot Chocolate Tablets",
    "url": "https://www.mexgrocer.co.uk/drinks/hot-drinks/mayordomo-chocolate-500g-mexican-hot-chocolate-tablets",
    "department": "drinks",
    "categorySlug": "hot-drinks",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chocolate%20Mayordomo.jpg?t=1750779192"
  },
  {
    "itemId": 5500,
    "title": "Mayordomo Mole Black 4.5 kg",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-black-45-kg",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 78,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/cubeta-de-mole-negro-4.5kg-mayordomo-oaxaqueno.jpg?t=1777391055"
  },
  {
    "itemId": 5499,
    "title": "Mayordomo Mole Red 4.5 kg",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-red-45-kg",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 78,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mayordomo%20red%20mole%204.5kg.jpg?t=1725361475"
  },
  {
    "itemId": 4826,
    "title": "Mayordomo Mole Red 460g",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-mole-red-460g",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mayordomo%20Mole%20Red%20460g%20NEW.png?t=1772552562"
  },
  {
    "itemId": 5105,
    "title": "Mayordomo Oaxaqueno Mole 460g",
    "url": "https://www.mexgrocer.co.uk/brands/mayordomo/mayordomo-oaxaqueno-mole-460g",
    "department": "brands",
    "categorySlug": "mayordomo",
    "availability": "In Stock",
    "price": 12.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mayordomo%20Oaxaqueno%20Mole%20460g%20NEW.png?t=1772552527"
  },
  {
    "itemId": 5014,
    "title": "Maza Real Red Corn Flour 1kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maza-real-red-corn-flour-1kg",
    "department": "food",
    "categorySlug": "masa-harina",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Real%20Maza%20Red%20Corn.png?t=1720604506"
  },
  {
    "itemId": 7339,
    "title": "Maza Real Red Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/food/masa-harina/maza-real-red-corn-flour-20kg",
    "department": "food",
    "categorySlug": "masa-harina",
    "availability": "Out of Stock",
    "price": 110,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Maza%20Real%20Red%20Corn%20Flour%2020kg.jpg?t=1761780300"
  },
  {
    "itemId": 5286,
    "title": "Mazapan De La Rosa Peanut Candy",
    "url": "https://www.mexgrocer.co.uk/food/candy/traditional/mazapan-de-la-rosa-peanut-candy",
    "department": "food",
    "categorySlug": "traditional",
    "availability": "Out of Stock",
    "price": 2.28,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mazapan%20Original%20%28Updated%29.jpg?t=1724082856"
  },
  {
    "itemId": 7474,
    "title": "Mexican Dried Chillies & Chipotle in Adobo Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-dried-chillies-chipotle-in-adobo-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chillies%20%26%20Chipotle%20in%20Adobo%20Kit.png?t=1784800346"
  },
  {
    "itemId": 7360,
    "title": "Mexican Mayca Cajeta Caramel Spread 320g",
    "url": "https://www.mexgrocer.co.uk/food/desserts/mexican-mayca-cajeta-caramel-spread-320g",
    "department": "food",
    "categorySlug": "desserts",
    "availability": "In Stock",
    "price": 6.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Mayca%20Cajeta%20Caramel%20Spread%20-%20320g.jpg?t=1772030750"
  },
  {
    "itemId": 7484,
    "title": "Mexican Salsa Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-salsa-kit-buy-at-mexgrocer-uk",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 14.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mexican%20Salsa%20Kit.jpg?t=1786114710"
  },
  {
    "itemId": 7388,
    "title": "Mexican Street Corn Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mexican-street-corn-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 9.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/MEXICAN%20STREET%20CORN%20KIT.png?t=1768322787"
  },
  {
    "itemId": 6360,
    "title": "Mezcales de Leyenda Durango 47% - Agave Cenizo 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-durango-47-agave-cenizo-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "In Stock",
    "price": 61.8,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Cenizo.jpg?t=1723508544"
  },
  {
    "itemId": 6738,
    "title": "Mezcales de Leyenda Oaxaca 50.1% Agave Espadin 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-oaxaca-501-agave-espadin-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "Out of Stock",
    "price": 60.48,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20Espadin%20Oaxaca.jpg?t=1723494117"
  },
  {
    "itemId": 6359,
    "title": "Mezcales de Leyenda San Luis Potosi 42% - Agave Salmiana - Verde 700ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-san-luis-potosi-42-agave-salmiana-verde-700ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "In Stock",
    "price": 51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcal%20de%20Leyenda%20San%20Luis%20Verde.jpg?t=1723515810"
  },
  {
    "itemId": 4256,
    "title": "Mezcales de Leyenda Tripack 3 x 100ml",
    "url": "https://www.mexgrocer.co.uk/brands/mezcal-de-leyenda/mezcales-de-leyenda-tripack-3-x-100ml",
    "department": "brands",
    "categorySlug": "mezcal-de-leyenda",
    "availability": "Out of Stock",
    "price": 41.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mezcales%20de%20Leyenda%20Tripack.jpg?t=1723508544"
  },
  {
    "itemId": 6759,
    "title": "Mezcalita Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mezcalita-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "Out of Stock",
    "price": 42.98,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mezcalita%20and%20free%20tajin.jpg?t=1727794032"
  },
  {
    "itemId": 6601,
    "title": "Mi Adelita Stone Ground Tortilla Blue Corn Chips 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-blue-corn-chips-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Blue%20200g%20Bio.jpg?t=1663328465"
  },
  {
    "itemId": 6599,
    "title": "Mi Adelita Stone Ground Tortilla Chips Chilli 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-chilli-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Chilli%20200g%20Bio.jpg?t=1664793366"
  },
  {
    "itemId": 6600,
    "title": "Mi Adelita Stone Ground Tortilla Chips Paprika 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-paprika-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Paprika%20200g%20Bio.jpg?t=1663663706"
  },
  {
    "itemId": 6598,
    "title": "Mi Adelita Stone Ground Tortilla Chips Sea Salt 150g",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-sea-salt-150g",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Sea%20Salt%20200g%20Bio.jpg?t=1663328465"
  },
  {
    "itemId": 6637,
    "title": "Mi Adelita Stone Ground Tortilla Chips Sea Salt 1kg",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/mi-adelita-stone-ground-tortilla-chips-sea-salt-1kg",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "In Stock",
    "price": 19.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Stone%20Ground%20Chips%20Sea%20Salt%201kg.jpg?t=1663328465"
  },
  {
    "itemId": 6841,
    "title": "Mi Adelita Tortilla Chips Bundle",
    "url": "https://www.mexgrocer.co.uk/meals/kits/mi-adelita-tortilla-chips-bundle",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 10.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Mi%20Adelita%20Bundle.jpg?t=1689617568"
  },
  {
    "itemId": 6643,
    "title": "Michelada Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/michelada-kit",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 14,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Michelada%201.jpg?t=1767788112"
  },
  {
    "itemId": 5472,
    "title": "Miguelito Chile Powder 950g",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/miguelito-chile-powder-950g",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 12.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Miguelito%20Powder%20950g.png?t=1720604716"
  },
  {
    "itemId": 5564,
    "title": "Miguelitos Chile powder Bag with 100",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/miguelitos-chile-powder-bag-with-100",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "In Stock",
    "price": 15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/miguelito%20sachets%20-%20NEW.jpg?t=1720604716"
  },
  {
    "itemId": 6297,
    "title": "Morita Chipotle Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/food/chillies/whole-dried-chillies/morita-chipotle-whole-dried-chilli-1kg",
    "department": "food",
    "categorySlug": "whole-dried-chillies",
    "availability": "In Stock",
    "price": 38,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Chipotle%20Morita%20Whole.jpg?t=1664577335"
  },
  {
    "itemId": 4701,
    "title": "Mulato Whole Dried Chilli",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/mulato-whole-dried-chilli",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/mulato%20w%20catrinas.jpg?t=1760104458"
  },
  {
    "itemId": 4326,
    "title": "Naturelo Blue Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-mexican-blue-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 85,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20Blue%2020kg%201.jpg?t=1749463061"
  },
  {
    "itemId": 4321,
    "title": "Naturelo Harina De Maiz Azul 1kg Blue Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-harina-de-maiz-azul-1kg-blue-corn-flour",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 5.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20Blue%201kg.jpg?t=1738922797"
  },
  {
    "itemId": 4324,
    "title": "Naturelo Harina De Maiz Blanco 1kg White Corn Flour",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-harina-de-maiz-blanco-1kg-white-corn-flour",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "Out of Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20White%201kg.jpg?t=1738922797"
  },
  {
    "itemId": 4325,
    "title": "Naturelo White Corn Flour 20kg",
    "url": "https://www.mexgrocer.co.uk/brands/naturelo/naturelo-white-corn-flour-20kg",
    "department": "brands",
    "categorySlug": "naturelo",
    "availability": "In Stock",
    "price": 60,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Naturelo%20White%2020kg%201.jpg?t=1738922768"
  },
  {
    "itemId": 7442,
    "title": "Nopal Cactus Powder 12kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/nopal-cactus-powder-12kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 328,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Powder%2012kg.jpg?t=1780490672"
  },
  {
    "itemId": 7247,
    "title": "Nopal Mild Chilli 250g",
    "url": "https://www.mexgrocer.co.uk/brands/nopal/nopal-mild-chilli-250g",
    "department": "brands",
    "categorySlug": "nopal",
    "availability": "In Stock",
    "price": 11.45,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Mild%20Chilli%20250g.jpg?t=1748338877"
  },
  {
    "itemId": 7248,
    "title": "Nopal Powder 300g",
    "url": "https://www.mexgrocer.co.uk/brands/nopal/nopal-powder-300g",
    "department": "brands",
    "categorySlug": "nopal",
    "availability": "In Stock",
    "price": 22.4,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopal%20Powder%20350g.jpg?t=1748338877"
  },
  {
    "itemId": 6000,
    "title": "Nopalia Churritos Chipotle 100g - Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/nopalia-churritos-chipotle-100g-cactus-chips",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20churritos%20chipotle.jpg?t=1749732900"
  },
  {
    "itemId": 6002,
    "title": "Nopalia Churritos Habanero 100g - Spicy Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/nopalia-churritos-habanero-100g-spicy-cactus-chips",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20Churritos%20Habanero%20100g%20%28new%29.jpg?t=1732019816"
  },
  {
    "itemId": 5980,
    "title": "Nopalia Churritos Original 100g - Cactus Chips",
    "url": "https://www.mexgrocer.co.uk/brands/nopalia/nopalia-churritos-original-100g-cactus-chips",
    "department": "brands",
    "categorySlug": "nopalia",
    "availability": "Out of Stock",
    "price": 2.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Nopalia%20churritos%20original.jpg?t=1749732900"
  },
  {
    "itemId": 7192,
    "title": "Orange Tang Powder Mix 8 x 13g",
    "url": "https://www.mexgrocer.co.uk/brands/tang/orange-tang-powder-mix-8-x-13g",
    "department": "brands",
    "categorySlug": "tang",
    "availability": "Out of Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Orange%20Tang%20Powder%20104g.jpg?t=1733227347"
  },
  {
    "itemId": 5278,
    "title": "Pachicletas Lollipop",
    "url": "https://www.mexgrocer.co.uk/food/candy/lolipops/pachicletas-lollipop",
    "department": "food",
    "categorySlug": "lolipops",
    "availability": "In Stock",
    "price": 9.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pachicleta.jpg?t=1660147763"
  },
  {
    "itemId": 4397,
    "title": "Pasilla Chilli Flakes 500g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/crushed-chillies/pasilla-chilli-flakes-500g",
    "department": "food",
    "categorySlug": "crushed-chillies",
    "availability": "Out of Stock",
    "price": 19,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/pasilla%20flakes%20new.jpg?t=1738855341"
  },
  {
    "itemId": 5956,
    "title": "Pasilla Chilli Powder 100g",
    "url": "https://www.mexgrocer.co.uk/food/chillies/ground-chillies/pasilla-chilli-powder-100g",
    "department": "food",
    "categorySlug": "ground-chillies",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pasilla%20Powder.jpg?t=1660837606"
  },
  {
    "itemId": 5228,
    "title": "Pasilla Whole Dried Chilli 1kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/dried-chillies/pasilla-whole-dried-chilli-1kg",
    "department": "catering-sizes",
    "categorySlug": "dried-chillies",
    "availability": "In Stock",
    "price": 29,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/PASILLA.jpg?t=1720604506"
  },
  {
    "itemId": 5560,
    "title": "Pelon Pelo Rico",
    "url": "https://www.mexgrocer.co.uk/food/candy/pelon-pelo-rico",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 9.48,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pelon%20Pelo%20Rico%2012%20x%2035g%20Bag.jpg?t=1754559210"
  },
  {
    "itemId": 5678,
    "title": "Pelon Pelonete 210g",
    "url": "https://www.mexgrocer.co.uk/sale-items/pelon-pelonete-210g",
    "department": "sale-items",
    "categorySlug": "",
    "availability": "Out of Stock",
    "price": 8.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pelon%20Pelonete.jpg?t=1664577335"
  },
  {
    "itemId": 4675,
    "title": "Pinata Cheese Sauce Plain 3kg",
    "url": "https://www.mexgrocer.co.uk/food/speciality/pinata-cheese-sauce-plain-3kg",
    "department": "food",
    "categorySlug": "speciality",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pinata%20Cheese%20Sauce.jpg?t=1660147763"
  },
  {
    "itemId": 6956,
    "title": "Pinata Cheese Sauce with Jalapeno Chilli 3kg",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/salsas-and-sauces/pinata-cheese-sauce-with-jalapeno-chilli-3kg",
    "department": "catering-sizes",
    "categorySlug": "salsas-and-sauces",
    "availability": "In Stock",
    "price": 22,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pinata%20Cheddar%20Cheese%20Sauce%20with%20Jalapeno%203kg.jpg?t=1707730053"
  },
  {
    "itemId": 4379,
    "title": "Pre Cut Blue Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-blue-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Blue%20Corn%20Tortilla%201kg.png?t=1660147763"
  },
  {
    "itemId": 4367,
    "title": "Pre Cut Cactus Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-cactus-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Cactus%20Corn%20Tortillas%201kg.JPG?t=1732790302"
  },
  {
    "itemId": 4368,
    "title": "Pre Cut Chipotle Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-chipotle-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Chipotle%20Corn%20Tortillas%201kg.JPG?t=1726240889"
  },
  {
    "itemId": 4369,
    "title": "Pre Cut Guajillo Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-guajillo-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "Out of Stock",
    "price": 9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Guajillo%20Corn%20Tortillas%201kg.JPG?t=1727284929"
  },
  {
    "itemId": 4370,
    "title": "Pre Cut Yellow Corn Tortilla for Frying 15cm 1kg",
    "url": "https://www.mexgrocer.co.uk/brands/guanajuato/pre-cut-yellow-corn-tortilla-for-frying-15cm-1kg",
    "department": "brands",
    "categorySlug": "guanajuato",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pre%20Cut%20Yellow%20Corn%20Tortillas%201kg.JPG?t=1726226404"
  },
  {
    "itemId": 5091,
    "title": "Pronto Hot Cake Mix 500g",
    "url": "https://www.mexgrocer.co.uk/brands/pronto/pronto-hot-cake-mix-500g",
    "department": "brands",
    "categorySlug": "pronto",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pronto%20Hot%20Cake%20Mix%20500g.jpg?t=1738925938"
  },
  {
    "itemId": 7024,
    "title": "Pulparindo Chamoy 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindo-chamoy-20-pieces-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Chamoy%2020%20Pieces.jpg?t=1714053605"
  },
  {
    "itemId": 6122,
    "title": "Pulparindo Mango 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/pulparindo-mango-20-pieces-tamarind-sweets",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Mango.jpg?t=1738768577"
  },
  {
    "itemId": 5254,
    "title": "Pulparindo Red Extra Hot 20Pcs Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/pulparindo-red-extra-hot-20pcs-tamarind-sweets",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Hot%20Box.JPG?t=1738768551"
  },
  {
    "itemId": 6124,
    "title": "Pulparindo Watermelon 20 Pieces Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/pulparindo-watermelon-20-pieces-tamarind-sweets",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Watermelon.jpg?t=1738768577"
  },
  {
    "itemId": 5257,
    "title": "Pulparindo Yellow 20PCS Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/food/candy/sweet-sour/pulparindo-yellow-20pcs-tamarind-sweets",
    "department": "food",
    "categorySlug": "sweet-sour",
    "availability": "Out of Stock",
    "price": 6.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindo%20Box%202.JPG?t=1738768551"
  },
  {
    "itemId": 7051,
    "title": "Pulparindots 360g Tamarind Candy",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-360g-tamarind-candy",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20360g.jpg?t=1714053603"
  },
  {
    "itemId": 7057,
    "title": "Pulparindots Extra Hot 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-extra-hot-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Extra%20Hot%20360g.jpg?t=1714053602"
  },
  {
    "itemId": 7052,
    "title": "Pulparindots Mango 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-mango-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Mango%20360g.jpg?t=1714053604"
  },
  {
    "itemId": 7055,
    "title": "Pulparindots Watermelon 360g Tamarind Sweets",
    "url": "https://www.mexgrocer.co.uk/brands/de-la-rosa/pulparindots-watermelon-360g-tamarind-sweets",
    "department": "brands",
    "categorySlug": "de-la-rosa",
    "availability": "In Stock",
    "price": 7.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Pulparindots%20Watermelon%20360g.jpg?t=1714053603"
  },
  {
    "itemId": 7258,
    "title": "Runners Fuego 72g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/runners-fuego-72g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Runners%20Fuego.jpeg?t=1749113859"
  },
  {
    "itemId": 7257,
    "title": "Runners Lemon & Chilli 72g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/runners-lemon-chilli-72g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Runners%2068g.jpeg?t=1749113859"
  },
  {
    "itemId": 7065,
    "title": "Sabritas Lime 42g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/food/crisps-snacks/sabritas-lime-42g-pack-of-3",
    "department": "food",
    "categorySlug": "crisps-snacks",
    "availability": "Out of Stock",
    "price": 8.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sabritas%20Lime%2042g%20%28Pack%20of%203%29.jpg?t=1723537268"
  },
  {
    "itemId": 4830,
    "title": "Sabritas Lime 42g Potato Crisps",
    "url": "https://www.mexgrocer.co.uk/brands/sabritas/sabritas-lime-42g-potato-crisps",
    "department": "brands",
    "categorySlug": "sabritas",
    "availability": "Out of Stock",
    "price": 3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/sabritas%20lime%20new.jpg?t=1761209143"
  },
  {
    "itemId": 5536,
    "title": "Salsa Huichol 190g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/salsa-huichol-190g",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/huichol%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 7278,
    "title": "Salsa Huichol Black 190g",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/salsa-huichol-black-190g",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Salsa%20Huichol%20Black%20190g.jpg?t=1755593030"
  },
  {
    "itemId": 7175,
    "title": "San Miguel Artichoke Hearts 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-artichoke-hearts-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Artichoke%20Hearts%20400g%20new.jpg?t=1779374487"
  },
  {
    "itemId": 5946,
    "title": "San Miguel Chipotle Sauce De La Abuela",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/san-miguel-chipotle-sauce-de-la-abuela",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Chipotle%20Sauce%20De%20La%20Abuela%20450g%20.jpg?t=1720604716"
  },
  {
    "itemId": 5940,
    "title": "San Miguel Del Patron 450g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-del-patron-450g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Del%20Patron%20sauce.png?t=1720604716"
  },
  {
    "itemId": 7256,
    "title": "San Miguel Enchilada Sauce Green 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-enchilada-sauce-green-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Enchilada%20Green%20Sauce%20400g%20NEW.png?t=1772458745"
  },
  {
    "itemId": 7152,
    "title": "San Miguel Enchilada Sauce Red 400g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-enchilada-sauce-red-400g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 3.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Enchilada%20Red%20Sauce%20400g%20NEW.png?t=1772458745"
  },
  {
    "itemId": 5948,
    "title": "San Miguel Habanero Sauce Don Pancho 450g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-habanero-sauce-don-pancho-450g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Don%20pancho%20habanero%20sauce.png?t=1720604716"
  },
  {
    "itemId": 5942,
    "title": "San Miguel Jalapeno Sauce De Dona Chole",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-jalapeno-sauce-de-dona-chole",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20jalapenbo%20Sauce%20-Dona%20Chole%20450g.png?t=1720604506"
  },
  {
    "itemId": 5944,
    "title": "San Miguel Pasilla Sauce De La Nana",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-pasilla-sauce-de-la-nana",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Pasilla%20Sauce%20la%20nana.png?t=1720604716"
  },
  {
    "itemId": 4625,
    "title": "San Miguel Poblano Pepper Strips 220g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-poblano-pepper-strips-220g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 2.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Poblano%20Strips%20220g.png?t=1772456948"
  },
  {
    "itemId": 4626,
    "title": "San Miguel Poblano Whole Peppers 780g",
    "url": "https://www.mexgrocer.co.uk/brands/san-miguel/san-miguel-poblano-whole-peppers-780g",
    "department": "brands",
    "categorySlug": "san-miguel",
    "availability": "In Stock",
    "price": 7.19,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/San%20Miguel%20Poblano%20Whole%20780g%20NEW.png?t=1772458014"
  },
  {
    "itemId": 4856,
    "title": "Sangria Senorial 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/sangria-senorial-355ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.28,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sangria%20Casera%20355ml.JPG?t=1732790310"
  },
  {
    "itemId": 5590,
    "title": "Sangrita Viuda de Sanchez 1000ml",
    "url": "https://www.mexgrocer.co.uk/drinks/bar-essentials/sangrita-viuda-de-sanchez-1000ml",
    "department": "drinks",
    "categorySlug": "bar-essentials",
    "availability": "In Stock",
    "price": 9.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sangrita.jpg?t=1720604506"
  },
  {
    "itemId": 7390,
    "title": "Sanissimo Salmas 144g",
    "url": "https://www.mexgrocer.co.uk/brands/sanissimo/sanissimo-salmas-144g",
    "department": "brands",
    "categorySlug": "sanissimo",
    "availability": "Out of Stock",
    "price": 3.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sanissimo%20Salmas%20144g.jpg?t=1769001210"
  },
  {
    "itemId": 4601,
    "title": "Sanissimo Tostadas 216g",
    "url": "https://www.mexgrocer.co.uk/brands/sanissimo/sanissimo-tostadas-216g",
    "department": "brands",
    "categorySlug": "sanissimo",
    "availability": "Out of Stock",
    "price": 4.8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sanissimo%20Tostadas%20Box%20216g%20%28updated%29.jpg?t=1720604716"
  },
  {
    "itemId": 6982,
    "title": "Sazon Natural Ancho Chilli Flakes 380g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-flakes-380g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Flakes%20380g.jpg?t=1712757656"
  },
  {
    "itemId": 7018,
    "title": "Sazon Natural Ancho Chilli Flakes 85g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-flakes-85g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Flakes%2085g.jpg?t=1714053602"
  },
  {
    "itemId": 7016,
    "title": "Sazon Natural Ancho Chilli Powder 120g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-powder-120g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Powder%20120g.jpg?t=1714053605"
  },
  {
    "itemId": 6980,
    "title": "Sazon Natural Ancho Chilli Powder 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-ancho-chilli-powder-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Ancho%20Chilli%20Powder%20550g.jpg?t=1712757656"
  },
  {
    "itemId": 6987,
    "title": "Sazon Natural Chipotle Flakes 380g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-flakes-380g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Flakes%20380g.jpg?t=1712757656"
  },
  {
    "itemId": 7022,
    "title": "Sazon Natural Chipotle Flakes 85g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-flakes-85g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Flakes%2085g.jpg?t=1714053602"
  },
  {
    "itemId": 7020,
    "title": "Sazon Natural Chipotle Powder 120g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-powder-120g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Powder%20120g.jpg?t=1714053603"
  },
  {
    "itemId": 6984,
    "title": "Sazon Natural Chipotle Powder 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-chipotle-powder-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 14.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Chipotle%20Powder%20550g.jpg?t=1712757654"
  },
  {
    "itemId": 7010,
    "title": "Sazon Natural Fajita \"Pibil Style\" Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-fajita-pibil-style-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Fajita%20Pibil%20Style%20Seasoning%20142g.jpg?t=1714053602"
  },
  {
    "itemId": 7000,
    "title": "Sazon Natural Fajita \"Pibil Style\" Seasoning 700g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-fajita-pibil-style-seasoning-700g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Fajita%20Pibil%20Style%20Seasoning%20700g.jpg?t=1712757654"
  },
  {
    "itemId": 7012,
    "title": "Sazon Natural Mexican Adobo Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-mexican-adobo-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Mexican%20Adobo%20Seasoning%20142g.jpg?t=1714053604"
  },
  {
    "itemId": 7002,
    "title": "Sazon Natural Mexican Adobo Seasoning 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-mexican-adobo-seasoning-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Mexican%20Adobo%20Seasoning%20550g.jpg?t=1712757655"
  },
  {
    "itemId": 7014,
    "title": "Sazon Natural Piko Pikin Guacamole Mix 150g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-piko-pikin-guacamole-mix-150g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Piko%20Pikin%20Guacamole%20Mix%20150g.jpg?t=1714053602"
  },
  {
    "itemId": 7005,
    "title": "Sazon Natural Piko Pikin Gucamole Mix 738g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-piko-pikin-gucamole-mix-738g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 0,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Piko%20Pikin%20Gucamole%20Mix%20738g.jpg?t=1712757654"
  },
  {
    "itemId": 7008,
    "title": "Sazon Natural Taco Al Pastor Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-taco-al-pastor-seasoning-142g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "Out of Stock",
    "price": 4.75,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Taco%20Al%20Pastor%20Seasoning%20142g.jpg?t=1714053604"
  },
  {
    "itemId": 6989,
    "title": "Sazon Natural Taco Al Pastor Seasoning 550g",
    "url": "https://www.mexgrocer.co.uk/brands/sazon-natural-mexican-seasoning-and-spices/sazon-natural-taco-al-pastor-seasoning-550g",
    "department": "brands",
    "categorySlug": "sazon-natural-mexican-seasoning-and-spices",
    "availability": "In Stock",
    "price": 13.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Sazon%20Natural%20Taco%20Al%20Pastor%20Seasoning%20550g.jpg?t=1712757654"
  },
  {
    "itemId": 5555,
    "title": "Skwinkles Clasico Chamoy",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-clasico-chamoy",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20clasicos%20new.jpg?t=1664577335"
  },
  {
    "itemId": 5293,
    "title": "Skwinkles Rellenos Pineapple",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-rellenos-pineapple",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 7.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20Relleno.jpeg?t=1779108948"
  },
  {
    "itemId": 4808,
    "title": "Skwinkles Rellenos Watermelon Sandia Enchilada",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-rellenos-watermelon-sandia-enchilada",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20rellenos%20watermelon%20pack%20of%2012.jpg?t=1664577335"
  },
  {
    "itemId": 6825,
    "title": "Skwinkles Salsaghetti 12 Pack",
    "url": "https://www.mexgrocer.co.uk/food/candy/skwinkles-salsaghetti-12-pack",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Skwinkles%20Salsaghetti%2012%20Pack.jpg?t=1683612626"
  },
  {
    "itemId": 7395,
    "title": "Spicy Hibiscus Margarita Kit",
    "url": "https://www.mexgrocer.co.uk/brands/ojo-de-dios-mezcal/spicy-hibiscus-margarita-kit",
    "department": "brands",
    "categorySlug": "ojo-de-dios-mezcal",
    "availability": "In Stock",
    "price": 51,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/spicy%20margarita%20ojo%20de%20dios.jpg?t=1769530875"
  },
  {
    "itemId": 7274,
    "title": "Spicy Margarita Kit",
    "url": "https://www.mexgrocer.co.uk/meals/kits/spicy-margarita-cocktail",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 39,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Spicy%20Margarita%20Kit.jpg?t=1769521660"
  },
  {
    "itemId": 4872,
    "title": "Squirt Grapefruit Can 355ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/squirt-grapefruit-can-355ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Squirt%20Can%20355ml.jpg?t=1720604716"
  },
  {
    "itemId": 4453,
    "title": "Tajin Ancho Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-ancho-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.25,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Ancho%20Chilli%2075g.jpg?t=1663328465"
  },
  {
    "itemId": 4455,
    "title": "Tajin Arbol Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-arbol-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Arbol%2075g.jpg?t=1664273061"
  },
  {
    "itemId": 7485,
    "title": "Tajin Chamoy Liquid 308ml",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chamoy-liquid-308ml",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tjn_fruitChamoy_15-38oz_455ml_1.0003.png?t=1786704141"
  },
  {
    "itemId": 4696,
    "title": "Tajin Chamoy Liquid 455ml",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chamoy-liquid-455ml",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tjn_fruitChamoy_15-38oz_455ml_1.0003.png?t=1709638821"
  },
  {
    "itemId": 6802,
    "title": "Tajin Chili and Lime Seasoning 142g & Chamoy Pack",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chili-and-lime-seasoning-142g-chamoy-pack",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 6.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tajin%20chamoy%20kit.jpg?t=1720604716"
  },
  {
    "itemId": 7324,
    "title": "Tajin Chili and Lime Seasoning 45g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chili-and-lime-seasoning-45g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "Out of Stock",
    "price": 1.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chili%20and%20Lime%20Seasoning%2045g.jpg?t=1759224396"
  },
  {
    "itemId": 4451,
    "title": "Tajin Chilli & Lime Seasoning Mini Bottle10 x10g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-lime-seasoning-mini-bottle10-x10g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 6.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%208x100g%202.jpg?t=1725630435"
  },
  {
    "itemId": 4443,
    "title": "Tajin Chilli and Lime Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-and-lime-seasoning-142g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20142g.jpg?t=1706477176"
  },
  {
    "itemId": 4332,
    "title": "Tajin Chilli and Lime Seasoning 400g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-chilli-and-lime-seasoning-400g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 7.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20400g.jpg?t=1663328465"
  },
  {
    "itemId": 6820,
    "title": "Tajin Dried Chillies (4 x 75g)",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-dried-chillies-4-x-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 16,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chillies%20Bundle.jpg?t=1683612626"
  },
  {
    "itemId": 4460,
    "title": "Tajin Glass Season Rimmer",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-glass-season-rimmer",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "Out of Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20rimmer.jpg?t=1723508544"
  },
  {
    "itemId": 4457,
    "title": "Tajin Guajillo Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-guajillo-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Guajillo%2075g.jpg?t=1663328465"
  },
  {
    "itemId": 5548,
    "title": "Tajin Habanero Powder 45g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-habanero-powder-45g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Habanero_45_gr%20new.jpg?t=1663328465"
  },
  {
    "itemId": 6924,
    "title": "Tajin Keyring",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/seasoning/tajin-keyring",
    "department": "brands",
    "categorySlug": "seasoning",
    "availability": "In Stock",
    "price": 1.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Keyring.jpg?t=1730816856"
  },
  {
    "itemId": 4442,
    "title": "Tajin Low Sodium Chilli and Lime Seasoning 142g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-low-sodium-chilli-and-lime-seasoning-142g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.65,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chile%20and%20Lime%20Low%20Sodium%20140g.JPG?t=1724156362"
  },
  {
    "itemId": 4459,
    "title": "Tajin Pasilla Chilli 75g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-pasilla-chilli-75g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Pasilla%2075g.jpg?t=1664273449"
  },
  {
    "itemId": 4450,
    "title": "Tajin Seasoning Bottle 907g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-seasoning-bottle-907g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 15.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20900g.jpg?t=1660837606"
  },
  {
    "itemId": 4452,
    "title": "Tajin To Go 25 Sachets Chilli & Lime Seasoning",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/tajin-to-go-25-sachets-chilli-lime-seasoning",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 2.38,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Chilli%20and%20Lime%20Seasoning%20To%20Go%2025x1g.jpg?t=1739201029"
  },
  {
    "itemId": 6906,
    "title": "Takis Blue Heat 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-blue-heat-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "In Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Blue%20Heat%2070g%20UPDATE.jpg?t=1772026668"
  },
  {
    "itemId": 7441,
    "title": "Takis Duoz 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-duoz-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 2.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Duoz%2070g.jpg?t=1779978401"
  },
  {
    "itemId": 5552,
    "title": "Takis Salsa Brava 70g",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-salsa-brava-70g",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/salsa%20brava.png?t=1720604506"
  },
  {
    "itemId": 6964,
    "title": "Takis Salsa Brava 70g (Pack of 3)",
    "url": "https://www.mexgrocer.co.uk/brands/barcel/takis-salsa-brava-70g-pack-of-3",
    "department": "brands",
    "categorySlug": "barcel",
    "availability": "Out of Stock",
    "price": 5.5,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Takis%20Salsa%20Brava%2070g%20%28Pack%203%29.jpg?t=1723536171"
  },
  {
    "itemId": 6476,
    "title": "Tama Roca Banderilla 30 x 50g",
    "url": "https://www.mexgrocer.co.uk/food/candy/tama-roca-banderilla-30-x-50g",
    "department": "food",
    "categorySlug": "candy",
    "availability": "Out of Stock",
    "price": 30,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tamaroca%20Banderliers.jpg?t=1664577335"
  },
  {
    "itemId": 7349,
    "title": "Tama Roca Pellizco 40 Pcs",
    "url": "https://www.mexgrocer.co.uk/food/candy/tama-roca-pellizco-40-pcs",
    "department": "food",
    "categorySlug": "candy",
    "availability": "In Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tama%20Roca%20Pellizco%2040%20Pcs.jpg?t=1762429708"
  },
  {
    "itemId": 5534,
    "title": "Tamazula Black 140ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/tamazula-black-140ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tamazula%20black%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 5535,
    "title": "Tamazula Red 140ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/tamazula-red-140ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 1.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tamazula%20red%20-%20NEW.jpg?t=1663328465"
  },
  {
    "itemId": 6954,
    "title": "Tapatio Salsa Picante 148ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/tapatio-salsa-picante-148ml",
    "department": "food",
    "categorySlug": "hot-sauce-salsa",
    "availability": "In Stock",
    "price": 2.99,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tapatio%20Salsa%20Picante%20148ml.jpg?t=1720604506"
  },
  {
    "itemId": 5834,
    "title": "Taragui - Yerba Mate with Stems",
    "url": "https://www.mexgrocer.co.uk/food/latin-american-food/argentina/taragui-yerba-mate-with-stems",
    "department": "food",
    "categorySlug": "argentina",
    "availability": "In Stock",
    "price": 10,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Taragui-yerba-mate-with-stems-con-palo-x-500g.jpg?t=1663328465"
  },
  {
    "itemId": 5561,
    "title": "Tarrito Beer Lollipop Bag",
    "url": "https://www.mexgrocer.co.uk/food/candy/lolipops/tarrito-beer-lollipop-bag",
    "department": "food",
    "categorySlug": "lolipops",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/tarrito%20beer%20lollipop.jpg?t=1720604716"
  },
  {
    "itemId": 4605,
    "title": "Terana Epazote 26g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-epazote-26g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 4.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Epazote%20Chopped%202.JPG?t=1732790309"
  },
  {
    "itemId": 4608,
    "title": "Terana Epazote 400gr",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-epazote-400gr",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 14.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Epazote%20Chopped%20Wholesale.JPG?t=1725361462"
  },
  {
    "itemId": 5250,
    "title": "Terana Oregano 21g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-oregano-21g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "In Stock",
    "price": 3.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Oregano%2021g.JPG?t=1732790309"
  },
  {
    "itemId": 5357,
    "title": "Terana Oregano 400g",
    "url": "https://www.mexgrocer.co.uk/brands/terana/terana-oregano-400g",
    "department": "brands",
    "categorySlug": "terana",
    "availability": "Out of Stock",
    "price": 14.9,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Terana%20Oregano%20Wholesale.JPG?t=1725361463"
  },
  {
    "itemId": 7276,
    "title": "The Curators Tajin Pork Puffs 25g",
    "url": "https://www.mexgrocer.co.uk/brands/tajin/the-curators-tajin-pork-puffs-25g",
    "department": "brands",
    "categorySlug": "tajin",
    "availability": "In Stock",
    "price": 1.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Tajin%20Pork%20Puffs%2025g.jpg?t=1754042568"
  },
  {
    "itemId": 5484,
    "title": "Tortilla Machine VILLAMEX V5",
    "url": "https://www.mexgrocer.co.uk/catering-sizes/other-mexican-products/tortilla-machine-villamex-v5",
    "department": "catering-sizes",
    "categorySlug": "other-mexican-products",
    "availability": "In Stock",
    "price": 1800,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/VILLAMEX%20V5.jpg?t=1730737791"
  },
  {
    "itemId": 4389,
    "title": "Totmoxtle Corn Husks 100g",
    "url": "https://www.mexgrocer.co.uk/brands/las-catrinas/totmoxtle-corn-husks-100g",
    "department": "brands",
    "categorySlug": "las-catrinas",
    "availability": "In Stock",
    "price": 6.25,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Las%20Catrinas%20Corn%20Husks%20100g.JPG?t=1730902673"
  },
  {
    "itemId": 7058,
    "title": "Two Keys Frozen Paloma Mix 750ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/two-keys-frozen-paloma-mix-750ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "Out of Stock",
    "price": 4.2,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Two%20Keys%20Frozen%20Paloma%20Mix%20750ml.jpg?t=1714565486"
  },
  {
    "itemId": 6427,
    "title": "Two Keys Pink Grapefruit Soda 200ml",
    "url": "https://www.mexgrocer.co.uk/drinks/soft-drinks/two-keys-pink-grapefruit-soda-200ml",
    "department": "drinks",
    "categorySlug": "soft-drinks",
    "availability": "In Stock",
    "price": 2.18,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Two%20Keys%20Grapefruit.jpg?t=1663328465"
  },
  {
    "itemId": 4883,
    "title": "Valentina Black 1lt",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-black-1lt",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Black%201lt.jpg?t=1660837606"
  },
  {
    "itemId": 5116,
    "title": "Valentina Black 370ml",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-black-370ml",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20black%20370ml.jpg?t=1660147763"
  },
  {
    "itemId": 6856,
    "title": "Valentina Hot Sauce Trio",
    "url": "https://www.mexgrocer.co.uk/meals/kits/valentina-hot-sauce-trio",
    "department": "meals",
    "categorySlug": "kits",
    "availability": "In Stock",
    "price": 5.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Hot%20Sauce%20Trio%20NEW.png?t=1785241408"
  },
  {
    "itemId": 4825,
    "title": "Valentina Mariscos 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-mariscos-370ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20seafood.jpg?t=1663328465"
  },
  {
    "itemId": 5144,
    "title": "Valentina Red 1lt",
    "url": "https://www.mexgrocer.co.uk/food/hot-sauce-salsa/snack-salsas/valentina-red-1lt",
    "department": "food",
    "categorySlug": "snack-salsas",
    "availability": "In Stock",
    "price": 5.9,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%201lt.JPG?t=1725009527"
  },
  {
    "itemId": 5113,
    "title": "Valentina Red 370ml",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-red-370ml",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 2.15,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20red%20370ml.jpg?t=1663751872"
  },
  {
    "itemId": 7392,
    "title": "Valentina Red 4Lt",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-red-4lt",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "In Stock",
    "price": 27,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Valentina%20Red%204L.jpg?t=1769009049"
  },
  {
    "itemId": 5420,
    "title": "Valentina Salsa Sachets 15 x 10g",
    "url": "https://www.mexgrocer.co.uk/brands/valentina/valentina-salsa-sachets-15-x-10g",
    "department": "brands",
    "categorySlug": "valentina",
    "availability": "Out of Stock",
    "price": 1.95,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/valentina%20pouches%20-%20NEW.jpg?t=1660837606"
  },
  {
    "itemId": 7407,
    "title": "Vallemex Flor de Calabaza 908g (Pumpkin Flower in Brine)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-flor-de-calabaza-908g-pumpkin-flower-in-brine",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "Out of Stock",
    "price": 7.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Flor%20de%20Calabaza%20908g.png?t=1773852259"
  },
  {
    "itemId": 7411,
    "title": "Vallemex Guayaba 908g (Mexican Guava in Syrup)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-guayaba-908g-mexican-guava-in-syrup",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Guayaba%20908g.jpg?t=1773852260"
  },
  {
    "itemId": 7408,
    "title": "Vallemex Huitlacoche 908g (Mexican Corn Smut)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-huitlacoche-908g-mexican-corn-smut",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 8,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Huitlacoche%20908g.png?t=1773852259"
  },
  {
    "itemId": 7410,
    "title": "Vallemex Nanche 908g",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-nanche-908g",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "Out of Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Nanche%20908g.png?t=1773852259"
  },
  {
    "itemId": 7412,
    "title": "Vallemex Romertios (Seepweed) 908g",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-romertios-seepweed-908g",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Romertios%20908g.png?t=1773852260"
  },
  {
    "itemId": 7404,
    "title": "Vallemex Tejocote 908g (Hawthorn in Syrup)",
    "url": "https://www.mexgrocer.co.uk/brands/vallemex/vallemex-tejocote-908g-hawthorn-in-syrup",
    "department": "brands",
    "categorySlug": "vallemex",
    "availability": "In Stock",
    "price": 5.6,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vallemex%20Tejocote%20908g.png?t=1773852259"
  },
  {
    "itemId": 5288,
    "title": "Vero Elote Lollipops",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-elote-lollipops",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "Out of Stock",
    "price": 14.4,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Elotes.JPG?t=1720604716"
  },
  {
    "itemId": 5280,
    "title": "Vero Mango Lollipops",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-mango-lollipops",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "Out of Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Mango.JPG?t=1725895315"
  },
  {
    "itemId": 5680,
    "title": "Vero Picafresas 100 x 6g Bag",
    "url": "https://www.mexgrocer.co.uk/brands/dulces-vero/vero-picafresas-100-x-6g-bag",
    "department": "brands",
    "categorySlug": "dulces-vero",
    "availability": "In Stock",
    "price": 12,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Vero%20Picafresas%20100%20x%206g%20Bag%20NEW.jpg?t=1779968069"
  },
  {
    "itemId": 7254,
    "title": "Xiqueno Mole Sauce 500g",
    "url": "https://www.mexgrocer.co.uk/food/mole-sauces/xiqueno-mole-sauce-500g",
    "department": "food",
    "categorySlug": "mole-sauces",
    "availability": "In Stock",
    "price": 9.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Xiqueno%20Mole.jpg?t=1749130273"
  },
  {
    "itemId": 7317,
    "title": "Zaaschila Creamy Cheese & Jalapeno Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-cheese-jalapeno-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Cheese%20%26%20Jalapeno%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7419,
    "title": "Zaaschila Creamy Cheese & Jalapeno Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-cheese-jalapeno-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Cheese%20%26%20Jalapeno%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7294,
    "title": "Zaaschila Creamy Chipotle Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-chipotle-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Chipotle%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7418,
    "title": "Zaaschila Creamy Chipotle Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-chipotle-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Chipotle%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7316,
    "title": "Zaaschila Creamy Guacamole & Habanero 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-habanero-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20%26%20Habanero%20.jpg?t=1758193506"
  },
  {
    "itemId": 7417,
    "title": "Zaaschila Creamy Guacamole & Habanero 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-habanero-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20%26%20Habanero%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7299,
    "title": "Zaaschila Creamy Guacamole and Jalapeno Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-and-jalapeno-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20and%20Jalapeno%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7416,
    "title": "Zaaschila Creamy Guacamole and Jalapeno Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-guacamole-and-jalapeno-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 4.5,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Guacamole%20and%20Jalapeno%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  },
  {
    "itemId": 7364,
    "title": "Zaaschila Creamy Salsa Bundle",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-salsa-bundle",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 13.99,
    "priceFrom": false,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Salsa%20Bundle.jpg?t=1766051934"
  },
  {
    "itemId": 7321,
    "title": "Zaaschila Creamy Street Corn Sauce 265g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-street-corn-sauce-265g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 2.95,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Street%20Corn%20Sauce%20265g.jpg?t=1758193506"
  },
  {
    "itemId": 7415,
    "title": "Zaaschila Creamy Street Corn Sauce 425g",
    "url": "https://www.mexgrocer.co.uk/brands/zaaschila/zaaschila-creamy-street-corn-sauce-425g",
    "department": "brands",
    "categorySlug": "zaaschila",
    "availability": "In Stock",
    "price": 5.3,
    "priceFrom": true,
    "image": "https://www.mexgrocer.co.uk/images/product/l/Zaaschila%20Creamy%20Street%20Corn%20Sauce%20265g%20no%20size.jpg?t=1774955883"
  }
];

export const mexgrocerCatalogueExclusions: readonly MexgrocerCatalogueExclusion[] = [
  {
    "itemId": 4402,
    "title": "16cm Black Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 4403,
    "title": "16cm Red Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 4398,
    "title": "16cm Tortilla Press Silver",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 7100,
    "title": "1800 Coconut Liqueur 50ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6348,
    "title": "1800 Coconut Liqueur 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5417,
    "title": "1800 Tequila Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 4220,
    "title": "1800 Tequila Cristalino 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6278,
    "title": "1800 Tequila Mini Silver 50ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5410,
    "title": "1800 Tequila Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 4221,
    "title": "1800 Tequila Silver 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4399,
    "title": "19cm Black Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 5617,
    "title": "19cm Red Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 4401,
    "title": "19cm Silver Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 5618,
    "title": "25cm Silver Tortilla Press",
    "reason": "category:tortilla-press"
  },
  {
    "itemId": 4884,
    "title": "6\" Cream Plastic Tortilla Warmer",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5404,
    "title": "6\" Plastic Tortilla Warmer - Red",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6869,
    "title": "818 Blanco Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6870,
    "title": "818 Repsado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5758,
    "title": "Abasolo Corn Whisky 700ml",
    "reason": "title:alcohol"
  },
  {
    "itemId": 4261,
    "title": "Alipus San Andres Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4262,
    "title": "Alipus San Baltazar Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4290,
    "title": "Alipus San Juan Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4263,
    "title": "Alipus Santa Ana Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7091,
    "title": "Alma Finca Orange Liquer 40% 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 4258,
    "title": "Amaras Cupreata Guerrero Mezcal 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 6672,
    "title": "Amaras Espadin Reposado Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6847,
    "title": "Amargo Angostura Vallet Liqueur 45% 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 5408,
    "title": "Ancho Reyes Chilli Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 4829,
    "title": "Ancho Reyes Verde Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 4944,
    "title": "Animas Espadin Cupreata 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 5081,
    "title": "Arette Tequila Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5067,
    "title": "Arette Tequila Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 5846,
    "title": "Armonico Gin Seco 50%  500ml bottle",
    "reason": "category:spirits"
  },
  {
    "itemId": 6349,
    "title": "ArteNOM 1146 Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6351,
    "title": "ArteNOM 1414 Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6350,
    "title": "ArteNOM 1579 Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6787,
    "title": "ASADA The Art of Mexican-Style Grilling",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 5086,
    "title": "Bacanora Aguamiel 700ml  41%",
    "reason": "category:spirits"
  },
  {
    "itemId": 6614,
    "title": "Bacanora Santo Pecado",
    "reason": "category:spirits"
  },
  {
    "itemId": 5063,
    "title": "Balam Raicilla Costa 700ml",
    "reason": "category:spirits"
  },
  {
    "itemId": 5079,
    "title": "Balam Raicilla Madurado 700ml",
    "reason": "category:spirits"
  },
  {
    "itemId": 4960,
    "title": "Balam Raicilla Sierra 700ml",
    "reason": "category:spirits"
  },
  {
    "itemId": 6499,
    "title": "Barrilito Beer 325ml",
    "reason": "category:beer"
  },
  {
    "itemId": 7261,
    "title": "Bohemia Oscura 355ml Mexican Beer",
    "reason": "category:beer"
  },
  {
    "itemId": 5304,
    "title": "Bruxo No.1 Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5027,
    "title": "Bruxo No.2 Mezcal Joven 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4907,
    "title": "Bruxo No.3 Mezcal 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 4242,
    "title": "Bruxo No.4 Blend Mezcal 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 4243,
    "title": "Bruxo No.5 Tobala Mezcal 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 4244,
    "title": "Bruxo X Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5316,
    "title": "Cabrito Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5307,
    "title": "Calle 23 Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5313,
    "title": "Calle 23 Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5312,
    "title": "Calle 23 Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 7354,
    "title": "Cantinero Tequila Anejo 38% 700ml",
    "reason": "title:alcohol"
  },
  {
    "itemId": 6008,
    "title": "Cantinero Tequila Blanco 38% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6009,
    "title": "Cantinero Tequila Reposado 38% 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 7394,
    "title": "Cantinero Tequila Triple Pack",
    "reason": "title:alcohol"
  },
  {
    "itemId": 6663,
    "title": "Casa Dragones Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5482,
    "title": "Casa Dragones Joven Tequila 700ml  40%",
    "reason": "category:tequila"
  },
  {
    "itemId": 4964,
    "title": "Casa Dragones Tequila Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5760,
    "title": "Casamigos Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5761,
    "title": "Casamigos Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5483,
    "title": "Casamigos Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6208,
    "title": "Cascahuin Blanco Tequila 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 6209,
    "title": "Cascahuin Reposado Tequila 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6748,
    "title": "Catrina Blanco Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6750,
    "title": "Catrina Reposado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7074,
    "title": "Cazcabel Blanco Tequila 38% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7073,
    "title": "Cazcabel Coconut Tequila 34% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7076,
    "title": "Cazcabel Honey Tequila 34% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7075,
    "title": "Cazcabel Reposado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4300,
    "title": "Cerveza Noche Buena 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 4233,
    "title": "Charanda El Tarasco Rum Silver 700ml 38%",
    "reason": "category:rum"
  },
  {
    "itemId": 4236,
    "title": "Charanda Sol Tarasco Extra Aged Rum 700ml 40%",
    "reason": "category:rum"
  },
  {
    "itemId": 5587,
    "title": "Charro Hat",
    "reason": "title:gift/decor"
  },
  {
    "itemId": 6352,
    "title": "Cimarron Tequila Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6729,
    "title": "Ciudad de Mexico Cookbook",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 5807,
    "title": "Clutch Tassels Bag",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 6867,
    "title": "Cocina Mexicana Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 6629,
    "title": "Codigo 1530 Mezcal Ancestral/Joven 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6619,
    "title": "Codigo 1530 Tequila Extra Anejo Origen 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5828,
    "title": "Comal Imusa 28cm",
    "reason": "title:kitchenware"
  },
  {
    "itemId": 5737,
    "title": "Comida Mexicana Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 4245,
    "title": "Corte Vetusto Mezcal Joven Ensamble 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 4246,
    "title": "Corte Vetusto Mezcal Joven Espadin 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4247,
    "title": "Corte Vetusto Mezcal Joven Tobala 700ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 6589,
    "title": "Curado Blue Agave 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6588,
    "title": "Curado Cupreta 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6587,
    "title": "Curado Espadin 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5022,
    "title": "D'aristi Xtabentun 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 7289,
    "title": "Day of the Dead Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 5302,
    "title": "Del Maguey Mezcal Chichicapa 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5300,
    "title": "Del Maguey Mezcal San Luis Del Rio 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5299,
    "title": "Del Maguey Mezcal Vida 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5959,
    "title": "Discreto Encanto Red Wine",
    "reason": "title:alcohol"
  },
  {
    "itemId": 5310,
    "title": "Don Julio Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5309,
    "title": "Don Julio Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 7440,
    "title": "Don Julio Paloma kit",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5308,
    "title": "Don Julio Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 4292,
    "title": "Dos Equis Lager Beer 350ml",
    "reason": "category:beer"
  },
  {
    "itemId": 4929,
    "title": "El Camino del Pensador Ensamble 500ml",
    "reason": "category:wild-agave-mezcals"
  },
  {
    "itemId": 6401,
    "title": "El Camino del Pensador Espadin 500ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6819,
    "title": "El Hispano Chipotle Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 6818,
    "title": "El Hispano Jalapeno Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 6411,
    "title": "El Rayo Tequila Plata 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6410,
    "title": "El Rayo Tequila Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6866,
    "title": "Everyone Loves Tacos Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 7281,
    "title": "Excellia Blanco 40% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7282,
    "title": "Excellia Reposado 40% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5793,
    "title": "Facemask Chain",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 6849,
    "title": "Fernet Vallet Liqueur 35% 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 4941,
    "title": "Fortaleza Tequila Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 4932,
    "title": "Fortaleza Tequila Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5026,
    "title": "Fortaleza Tequila Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 4885,
    "title": "Frida Kahlo Carry Bag",
    "reason": "title:gift/decor"
  },
  {
    "itemId": 5771,
    "title": "Frida Kahlo Floral Light Shade",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5831,
    "title": "Frida Kahlo Necklace",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 7107,
    "title": "Friendship Bracelets - Beige",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5786,
    "title": "Friendship Bracelets - Black",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 4209,
    "title": "G4 Tequila Blanco 700ml 40%",
    "reason": "category:tequila"
  },
  {
    "itemId": 5061,
    "title": "Gem & Bolt Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6766,
    "title": "Gin Condesa Clasica 43% 70cl",
    "reason": "category:spirits"
  },
  {
    "itemId": 6767,
    "title": "Gin Condesa Prickly Pear 43% 70cl",
    "reason": "category:spirits"
  },
  {
    "itemId": 4230,
    "title": "Gran Centenario Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4228,
    "title": "Gran Centenario Plata 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4229,
    "title": "Gran Centenario Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6006,
    "title": "Gran Orendain Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6007,
    "title": "Gran Orendain Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6846,
    "title": "Granada Vallet Liqueur 32% 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 5811,
    "title": "Heart Pompoms Earrings",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 4342,
    "title": "Herencia de Plata Tequila Coffee 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6760,
    "title": "Herradura Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5332,
    "title": "Herradura Plata 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5331,
    "title": "Herradura Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 5503,
    "title": "Hibiscus Mezcal Paloma",
    "reason": "title:alcohol"
  },
  {
    "itemId": 7433,
    "title": "Hot Honey Cazcabel Tequila Kit",
    "reason": "title:alcohol"
  },
  {
    "itemId": 4995,
    "title": "Huana Guanabana Mayan 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 6997,
    "title": "Huarache Press",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6834,
    "title": "Indio Lager Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 4226,
    "title": "Jose Cuervo Reserva De La Familia 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4222,
    "title": "Jose Cuervo Tradicional Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4973,
    "title": "Jose Cuervo Tradicional Silver 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 6586,
    "title": "KAH Tequila Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6585,
    "title": "KAH Tequila Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6584,
    "title": "KAH Tequila Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5075,
    "title": "Kalani Coconut Rum Liqueur 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 7097,
    "title": "Koch El Mezcal Ensamble 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7096,
    "title": "Koch El Mezcal Madrecuishe 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5813,
    "title": "Koch El Mezcal Tobasiche 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6685,
    "title": "Komos Tequila Anejo Cristalino 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 6686,
    "title": "Komos Tequila Extra Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 6684,
    "title": "Komos Tequila Reposado Rosa 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 7450,
    "title": "Large Mexican Flag",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 7280,
    "title": "Licor 43 31% 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 5579,
    "title": "Loteria Game Set",
    "reason": "category:decorations"
  },
  {
    "itemId": 5788,
    "title": "LOVE Bracelet",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 6591,
    "title": "Madre Mezcal Ensamble 200ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6592,
    "title": "Madre Mezcal Ensamble 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4225,
    "title": "Maestro Dobel Diamante 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4224,
    "title": "Maestro Dobel Humito 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7094,
    "title": "Maestro Dobel Silver 200ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4223,
    "title": "Maestro Dobel Silver 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6658,
    "title": "Mamacita - Mexican Cookbook by Andrea Pons",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 6695,
    "title": "Masa - Techniques, Recipes, and Reflections on a Timeless Staple",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 7346,
    "title": "Mata De Monte Mezcal 29% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5399,
    "title": "Mazahua Doll",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 4864,
    "title": "Metate Volcanic Stone",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 7455,
    "title": "Mexican Gaban Poncho",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 7106,
    "title": "Mexican Kite Cappuccino Brown Earrings",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5243,
    "title": "Mexico - The Cookbook",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 7424,
    "title": "Mezcal Reina Espadin 48% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7444,
    "title": "Mezcal Reina Mezcalita with Lime 200ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7423,
    "title": "Mezcal Reina Paloma 200ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7426,
    "title": "Mezcal Reina Tobala 37% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7425,
    "title": "Mezcal Reina Tobasiche 48% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 4260,
    "title": "Mezcal Union Uno 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6469,
    "title": "Mezcales de Leyenda Durango 48% - Agave Verde 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6361,
    "title": "Mezcales de Leyenda Guerrero 45% - Agave Cupreta - Ancho 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6362,
    "title": "Mezcales de Leyenda Oaxaca 42% - Agave Tobala 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6473,
    "title": "Mezcales de Leyenda Oaxaca 47% - Agave Coyote 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6472,
    "title": "Mezcales de Leyenda Oaxaca 48% - Agave Mexicano 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6475,
    "title": "Mezcales de Leyenda Oaxaca 50% - Agave Jabali 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6471,
    "title": "Mezcales de Leyenda Puebla 47% - Agave Pichumel 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5827,
    "title": "Milagrito Hand-embroidered Black Facemask",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5787,
    "title": "Mini Frida Kahlo Bracelet",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5554,
    "title": "Mini Mexican Flags (50 Pack)",
    "reason": "category:decorations"
  },
  {
    "itemId": 4294,
    "title": "Modelo Especial Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 7260,
    "title": "Modelo Negra Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 5406,
    "title": "Molcajete Plastic 12cm (For Salsas)",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5407,
    "title": "Molcajete Volcanic Stone - 20cm",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5589,
    "title": "Molinillo - Mexican Chocolate Stirrer",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6495,
    "title": "Nacional Morelos American Pale Ale Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 6721,
    "title": "Nacional Morelos Nacion Lager Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 6590,
    "title": "Narano Bitter Orange Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 5759,
    "title": "Nixta Corn Liqueur 700ml",
    "reason": "category:liqueurs"
  },
  {
    "itemId": 7277,
    "title": "Nocheluna Sotol 700ml",
    "reason": "category:sotol"
  },
  {
    "itemId": 7078,
    "title": "Norteña - Cookbook for Authentic Mexican Recipes",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 5329,
    "title": "Ocho Blanco 500ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5992,
    "title": "Ocho Extra Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5328,
    "title": "Ocho Reposado 500ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6676,
    "title": "Ojo de Dios Hibiscus Mezcal 700ml 35% Abv",
    "reason": "category:mezcal"
  },
  {
    "itemId": 5527,
    "title": "Ojo De Dios Mezcal 42% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6070,
    "title": "Ojo De Dios Mezcal Odd Cafe 700ml 35% Abv",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6718,
    "title": "Ojo de Dios Mezcal Triple Pack",
    "reason": "title:alcohol"
  },
  {
    "itemId": 5321,
    "title": "Olmeca Altos Plata 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5327,
    "title": "Olmeca Altos Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6367,
    "title": "Papel Picado Day of the Dead - 10 Sheets",
    "reason": "title:gift/decor"
  },
  {
    "itemId": 5859,
    "title": "Papel Picado Landscapes (45 x 35 cm)",
    "reason": "category:decorations"
  },
  {
    "itemId": 5861,
    "title": "Papel Picado Rodeo (45 x 35 cm)",
    "reason": "category:decorations"
  },
  {
    "itemId": 6768,
    "title": "Pasote Anejo 40% 70cl",
    "reason": "category:tequila"
  },
  {
    "itemId": 6770,
    "title": "Pasote Reposado 40% 70cl",
    "reason": "category:tequila"
  },
  {
    "itemId": 5326,
    "title": "Patron Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5325,
    "title": "Patron Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 5324,
    "title": "Patron Silver 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 7275,
    "title": "Patron Silver Tequila mini 50ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6951,
    "title": "Pimentae Spicy Margarita Tequila Cocktail 125ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7480,
    "title": "Pimentae Spicy Mezcal Margarita 125ml",
    "reason": "title:alcohol"
  },
  {
    "itemId": 7481,
    "title": "Pimentae Tequila Espresso Martini 125ml",
    "reason": "title:alcohol"
  },
  {
    "itemId": 7479,
    "title": "Pimentae Tequila Grapefruit Margarita 125ml",
    "reason": "title:alcohol"
  },
  {
    "itemId": 6953,
    "title": "Pimentae Tommy Margarita 500ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6949,
    "title": "Pimentae Tommy's Margarita Tequila Cocktail 125ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6948,
    "title": "Pimentae Tommys Spicy Margarita 500ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5382,
    "title": "Pinata Handmade Foldable",
    "reason": "category:decorations"
  },
  {
    "itemId": 5317,
    "title": "Plastic Mini Molcajeta 5.5cm (For Spices)",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6996,
    "title": "Premium Lemon Squeezer",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6865,
    "title": "Real Mexican Food Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 7477,
    "title": "Rey Campero Mezcal Pechuga 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7475,
    "title": "Rey Campero Mezcal Sierra Negra 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7478,
    "title": "Rey Campero Mezcal Tepextate 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7476,
    "title": "Rey Campero Mezcal Tobala 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6604,
    "title": "Rooster Rojo Anejo Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6603,
    "title": "Rooster Rojo Blanco Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6967,
    "title": "Rooster Rojo Reposado Smoke Pineapple Tequila 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6602,
    "title": "Rooster Rojo Reposado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5785,
    "title": "Rosa Earrings",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 5481,
    "title": "Salvador Jimenez & Mariachi Mexteca",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 6004,
    "title": "San Cosme Mezcal 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 6852,
    "title": "SHHH! Mezcal 47% 700ml",
    "reason": "category:mezcal"
  },
  {
    "itemId": 7108,
    "title": "SHINE Bracelet",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 7431,
    "title": "Small Beer Mexican Lager 2.5%",
    "reason": "category:beer"
  },
  {
    "itemId": 7077,
    "title": "Sobremesa Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 6817,
    "title": "Sol Tarasco \"Hongos\" Anejo Rum 40% 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 6815,
    "title": "Sol Tarasco 4 Year Charanda Anejo Rum 40% 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 6816,
    "title": "Sol Tarasco 8 Year Charanda Anejo Rum 42% 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 5812,
    "title": "Sotol Sotomayor Excepcional Ensamble 750ml",
    "reason": "category:spirits"
  },
  {
    "itemId": 5790,
    "title": "Star and Cherry Quartz Bracelet",
    "reason": "department:fashion-craft-gifts"
  },
  {
    "itemId": 7413,
    "title": "SU Tequila Blanco 40% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7414,
    "title": "SU Tequila Reposado 40% 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 7142,
    "title": "Sugar Skull Calaveritas 9cm",
    "reason": "category:decorations"
  },
  {
    "itemId": 7290,
    "title": "Tacos by Lily Ramirez-Froan",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 5424,
    "title": "Tacos!",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 7098,
    "title": "Tamal Steamer Cooking Pot Aluminium 20Lt",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5322,
    "title": "Tapatio Anejo 500ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 5320,
    "title": "Tapatio Blanco 500ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 5306,
    "title": "Tapatio Reposado 500ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 5741,
    "title": "Tecate Lager Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 4250,
    "title": "Tequila Centinela Anejo 3yr 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4251,
    "title": "Tequila Centinela Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4252,
    "title": "Tequila Centinela Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 4253,
    "title": "Tequila Centinela Reposado 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6868,
    "title": "Tequila Cocktails Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 6926,
    "title": "Tequila Tierra Noble Anejo 700ml",
    "reason": "category:anejo"
  },
  {
    "itemId": 6927,
    "title": "Tequila Tierra Noble Blanco 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 6928,
    "title": "Tequila Tierra Noble Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 4212,
    "title": "Terralta Blanco 750ml 40%",
    "reason": "category:tequila"
  },
  {
    "itemId": 4213,
    "title": "Terralta Reposado 750ml 40%",
    "reason": "category:tequila"
  },
  {
    "itemId": 6431,
    "title": "The Latin American Cookbook",
    "reason": "title:book"
  },
  {
    "itemId": 6932,
    "title": "Tico Blanco Tequila 700ml",
    "reason": "category:blanco"
  },
  {
    "itemId": 6933,
    "title": "Tico Reposado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6934,
    "title": "Tico Rosa Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6747,
    "title": "Torre de Picos Reposado Tequila 375ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6749,
    "title": "Torre de Picos Reposado Tequila 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 5566,
    "title": "Tortilla Making Kit: Tortilla press, 1kg Naturelo & Tortilla Warmer",
    "reason": "title:kitchenware"
  },
  {
    "itemId": 5474,
    "title": "Tortilla Warmer Palm Style",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5702,
    "title": "Tortilla Warmer Pewter Black 18cm",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5700,
    "title": "Tortilla Warmer Pewter Blue 18cm",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 5701,
    "title": "Tortilla Warmer Pewter Red 18cm",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 4952,
    "title": "Tu Casa Mi Casa Book",
    "reason": "category:cookbooks"
  },
  {
    "itemId": 6813,
    "title": "Uruapan Pure Agricola Charanda Blanco Rum 700ml",
    "reason": "category:rum"
  },
  {
    "itemId": 6500,
    "title": "Victoria Beer 355ml",
    "reason": "category:beer"
  },
  {
    "itemId": 5099,
    "title": "Vitrolero",
    "reason": "category:kitchenware"
  },
  {
    "itemId": 6035,
    "title": "Vivir Tequila Anejo 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6034,
    "title": "Vivir Tequila Blanco 700ml",
    "reason": "category:tequila"
  },
  {
    "itemId": 6160,
    "title": "Vivir Tequila Reposado 700ml",
    "reason": "category:reposado"
  },
  {
    "itemId": 6994,
    "title": "Zote Pink Soap 200g",
    "reason": "title:unrelated retail"
  }
];

export const mexgrocerCatalogueStats = {
  raw: 767,
  kept: 481,
  excluded: 286,
} as const;

export default mexgrocerCatalogue;
