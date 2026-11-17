import type { Recipe, RecipeIngredient } from "./recipes";

// Transcribed from Kitchen_Recipes_Complete_Revised.docx (15 Nov 2026).
// X1 batch only; the document also carries X10 reference columns.
// The author explicitly excluded the mochi stock list and ice creams.
function prep(
  name: string,
  ingredients: RecipeIngredient[],
  method: string,
  allergenNotes: string,
  sourceNotes = ""
): Recipe {
  return {
    name,
    type: "Prep",
    yieldAmount: null,
    ingredients,
    procedure: method,
    allergens: ({
      "Miso Pastor": ["Soybeans"],
      "Oyster – Garnish & Service": ["Molluscs"],
      "Milk Crumb": ["Milk", "Gluten"],
      "Chimichurri": ["Fish"],
      "Miso Dressing": ["Soybeans"],
      "Panisse": ["Milk"],
    } as Record<string, string[]>)[name] ?? [],
    notes: [
      "Source: Kitchen_Recipes_Complete_Revised.docx, 15 November 2026. Amounts are X1; scale by batch for X10.",
      allergenNotes ? `Dietary / allergens: ${allergenNotes}` : "",
      sourceNotes,
    ].filter(Boolean).join("\n\n"),
  };
}

export const november2026Recipes: Recipe[] = [
  prep(
    "Miso Pastor",
    [
      { name: "Achiote paste (axiote)", quantity: 380, unit: "g" },
      { name: "Miso", quantity: 1000, unit: "g" },
      { name: "Soy sauce", quantity: 600, unit: "ml" },
      { name: "Red wine vinegar", quantity: 600, unit: "ml" },
      { name: "Brown sugar", quantity: 500, unit: "g" },
      { name: "Black pepper", quantity: 30, unit: "g" },
      { name: "Cumin", quantity: 30, unit: "g" },
      { name: "Confit garlic", quantity: 900, unit: "g" },
      { name: "Rapeseed oil", quantity: 800, unit: "ml" },
    ],
    "1. Combine the achiote, miso, soy sauce, red wine vinegar, brown sugar, black pepper, cumin and confit garlic.\n2. Blend until smooth, then add the rapeseed oil gradually and blend to combine.\n3. Transfer to a labelled container and refrigerate.",
    "Soya (miso, soy sauce). Check soy sauce and miso for wheat/gluten.",
    "Original user notes supplied quantities only. Method is a practical suggestion in the revised book."
  ),
  prep(
    "Oyster – Green Dressing",
    [
      { name: "Rice vinegar", quantity: 700, unit: "g" },
      { name: "Mirin", quantity: 350, unit: "g" },
      { name: "Water", quantity: 250, unit: "g" },
      { name: "Green jalapeño, deseeded", quantity: 1, unit: "each" },
      { name: "Shiso leaves", quantity: 10, unit: "leaves" },
      { name: "Cucumber skins", quantity: 250, unit: "g" },
      { name: "Salt", quantity: 8, unit: "g" },
      { name: "Sugar, optional", quantity: null, unit: "10–15 g if needed" },
    ],
    "1. Peel the cucumbers and deseed the jalapeño.\n2. Blend rice vinegar, mirin, water, jalapeño, shiso, cucumber skins and salt until bright green.\n3. Pass through a fine chinois over ice.\n4. Taste very cold; adjust with sugar only if necessary.\n5. Keep refrigerated and very cold.",
    "Check mirin and vinegar product labels for allergens.",
    "Optional sugar is a range (10–15 g) and has intentionally not been assigned a fixed cost quantity."
  ),
  prep(
    "Oyster – Garnish & Service",
    [
      { name: "Maldon oyster", quantity: 1, unit: "each" },
      { name: "Oyster – Green Dressing", quantity: 5, unit: "ml" },
      { name: "Apple & cucumber mix", quantity: null, unit: "6–7 g per oyster" },
      { name: "Green jalapeño, thinly sliced", quantity: 1, unit: "slice" },
      { name: "Edible alyssum flowers", quantity: null, unit: "small amount" },
    ],
    "APPLE & CUCUMBER BATCH: Granny Smith apple, 2–3 mm brunoise: 200 g; cucumber, 2–3 mm brunoise: 80 g.\n1. Cut the apple shortly before service and mix with a little oyster dressing to prevent oxidation.\n2. Dice cucumber to match and combine. Keep chilled.\n3. Mix the apple and cucumber with dressing 15–20 minutes before service.\n4. Place 6–7 g apple/cucumber mix on each oyster; add approximately 5 ml dressing.\n5. Finish with one thin jalapeño slice and a little edible alyssum.",
    "Molluscs (oysters).",
    "The apple & cucumber batch yield is NOT the same as the 10-oyster plating column. Service target: fresh, lightly acidic, slightly sweet, vegetal and spicy."
  ),
  prep(
    "Passion Fruit Tiger's Milk",
    [
      { name: "Tiger Milk", quantity: 1500, unit: "ml" },
      { name: "Passion fruit juice", quantity: 140, unit: "g" },
      { name: "Rapeseed oil", quantity: 140, unit: "g" },
      { name: "Aji amarillo paste", quantity: 4, unit: "tbsp" },
      { name: "Xanthan gum", quantity: null, unit: "as needed" },
    ],
    "1. Combine classic tiger’s milk, passion fruit juice and aji amarillo paste in the Thermomix.\n2. With the machine running, gradually add rapeseed oil to emulsify.\n3. Add a little xanthan if required to thicken and stabilise.",
    "Allergens depend on the classic tiger’s milk base; verify its recipe."
  ),
  prep(
    "Black Bean Dip",
    [
      { name: "Black beans", quantity: 2500, unit: "g" },
      { name: "Chipotle salt", quantity: 35, unit: "g" },
      { name: "Confit garlic", quantity: 90, unit: "g" },
      { name: "Coriander", quantity: 50, unit: "g" },
      { name: "Black pepper", quantity: 20, unit: "g" },
    ],
    "1. Use cooked, food-safe black beans; drain if necessary.\n2. Blend beans with chipotle salt, confit garlic, coriander and black pepper until desired texture.\n3. Transfer to a labelled container and refrigerate.",
    "Vegan, subject to ingredient specifications.",
    "The source does not clarify whether 2.5 kg is cooked or drained bean weight. Method is suggested rather than supplied."
  ),
  prep(
    "Tempura Batter",
    [
      { name: "Rice flour or gluten-free flour", quantity: 120, unit: "g" },
      { name: "Potato flour", quantity: 70, unit: "g" },
      { name: "Sparkling water", quantity: null, unit: "to consistency" },
    ],
    "1. Combine rice flour (or gluten-free flour) and potato flour.\n2. Gradually whisk in cold sparkling water to a smooth batter of desired consistency.\n3. Use promptly for best texture.",
    "Vegan. Gluten-free only with verified gluten-free ingredients and handling.",
    "The November source specifies no water amount. Do not substitute the older saved 200 ml as a confirmed X1 quantity."
  ),
  prep(
    "Lamb Cutlet Marinade",
    [
      { name: "Kimchi no moto paste (glass jar)", quantity: 450, unit: "ml" },
      { name: "Garlic, minced", quantity: 6, unit: "heads" },
      { name: "Sugar", quantity: 50, unit: "g" },
      { name: "Grapeseed oil", quantity: 200, unit: "ml" },
      { name: "Shiso leaves", quantity: 5, unit: "leaves" },
    ],
    "1. Mince the garlic and shiso leaves.\n2. Blend or whisk with kimchi no moto paste, sugar and grapeseed oil until combined.\n3. Use to marinate lamb cutlets, refrigerated.",
    "Meat dish. Check kimchi no moto for fish, crustaceans, soya and wheat.",
    "Method is suggested because the original supplied ingredients only."
  ),
  prep(
    "Milk Crumb",
    [
      { name: "Powdered milk, whole or non-fat", quantity: 100, unit: "g" },
      { name: "Plain flour", quantity: 40, unit: "g" },
      { name: "Cornflour / corn starch", quantity: 20, unit: "g" },
      { name: "Sugar", quantity: 35, unit: "g" },
      { name: "Salt", quantity: 4, unit: "g" },
      { name: "Butter, melted", quantity: 75, unit: "g" },
    ],
    "1. Mix ingredients until evenly combined.\n2. Spread flat and evenly on a baking tray.\n3. Bake at 150°C until toasted; cool before storing.",
    "Vegetarian. Milk and wheat (gluten).",
    "Approximate yield: 274 g X1 / 2.74 kg X10."
  ),
  prep(
    "Chive Oil",
    [
      { name: "Chives", quantity: 200, unit: "g" },
      { name: "Grapeseed oil", quantity: 800, unit: "g" },
    ],
    "1. Blanch chives in salted boiling water for 10 seconds.\n2. Refresh in iced water.\n3. Dry completely with paper towels.\n4. Blend with grapeseed oil for 1–2 minutes until bright green.\n5. Pass through a fine sieve, cheesecloth or blue cloth.",
    "Vegan. No UK-declarable allergens listed in the ingredients."
  ),
  prep(
    "Chimichurri",
    [
      { name: "Thai basil", quantity: 22, unit: "g" },
      { name: "Coriander", quantity: 50, unit: "g" },
      { name: "Shallot", quantity: 25, unit: "g" },
      { name: "Lemongrass", quantity: 10, unit: "g" },
      { name: "Lime juice", quantity: 50, unit: "g" },
      { name: "Fish sauce", quantity: 50, unit: "g" },
      { name: "Kaffir lime leaves", quantity: 35, unit: "g" },
      { name: "Garlic", quantity: 20, unit: "g" },
      { name: "Spring onion, green part", quantity: 30, unit: "g" },
      { name: "Pickled jalapeño", quantity: 30, unit: "g" },
      { name: "Grapeseed oil", quantity: 285, unit: "g" },
    ],
    "1. Place herbs, vegetables, aromatics, lime juice and fish sauce in the Thermomix.\n2. Blend until uniformly textured.\n3. Gradually emulsify with grapeseed oil.",
    "Fish (fish sauce)."
  ),
  prep(
    "Miso Dressing",
    [
      { name: "Miso", quantity: 2000, unit: "g" },
      { name: "Sugar", quantity: null, unit: "1.1–1.2 kg" },
      { name: "Mirin", quantity: 400, unit: "ml" },
      { name: "Sake", quantity: 400, unit: "ml" },
    ],
    "1. Warm sake in a large pan. If flambéing, follow kitchen fire-safety procedures; flames do not guarantee all alcohol is removed.\n2. Add mirin, stirring in the sugar until dissolved.\n3. Remove from heat, add miso and blend with a hand blender until smooth.",
    "Soya (miso). Check miso for wheat/barley. Contains sake and mirin.",
    "Sugar is a range in the source (1.1–1.2 kg), so no fixed costing quantity is assigned."
  ),
  prep(
    "Pickle Liquor",
    [
      { name: "Shiragiku rice vinegar", quantity: 300, unit: "ml" },
      { name: "Sugar", quantity: 200, unit: "g" },
      { name: "Water", quantity: 100, unit: "ml" },
    ],
    "1. Dissolve sugar in water, gently warming if required.\n2. Add rice vinegar and mix well.\n3. Chill before use.",
    "Vegan. Check vinegar product label for allergens.",
    "Method is suggested because the original supplied quantities only."
  ),
  prep(
    "Panisse",
    [
      { name: "Water (first pan)", quantity: 2500, unit: "g" },
      { name: "Butter (first pan)", quantity: 1000, unit: "g" },
      { name: "Water (gram-flour paste)", quantity: 1250, unit: "g" },
      { name: "Gram flour", quantity: 1000, unit: "g" },
      { name: "Salt", quantity: 40, unit: "g" },
      { name: "Comté, grated", quantity: 200, unit: "g" },
      { name: "Caramelised onion", quantity: 400, unit: "g" },
    ],
    "1. Bring the 2.5 kg water and butter to a simmer in the first pan.\n2. In a separate bowl, combine 1.25 kg water, gram flour and salt to a smooth paste.\n3. Add gram-flour paste to simmering butter-water; whisk constantly for approximately 10 minutes until thickened.\n4. Remove from heat and fold in Comté and caramelised onion.\n5. Grease a gastro tray, pour in and level.\n6. Cover with baking parchment and blast chill until firm.",
    "Vegetarian. Milk (butter, Comté)."
  ),
];
