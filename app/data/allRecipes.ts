import {
  recipes as baseRecipes,
  recipeSlug,
  type Recipe,
  type RecipeIngredient,
} from "./recipes";

const extraRecipes: Recipe[] = [
  {
    name: "Birria Marinade",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Dry ancho chilli", quantity: 9, unit: "each" },
      { name: "Dry árbol chilli", quantity: 9, unit: "each" },
      { name: "Red onion", quantity: 8, unit: "each" },
      { name: "Garlic clove", quantity: 18, unit: "each" },
      { name: "Red tomatoes", quantity: 24, unit: "each" },
      { name: "Black pepper", quantity: 18, unit: "g" },
      { name: "Avocado powder", quantity: 5, unit: "g" },
      { name: "Water", quantity: null, unit: "to cover" },
    ],
    notes:
      "Method: halve and grill the onions. Grill the tomatoes. De-stem and toast/grill the chillies. Put everything in a pot and just cover with water. Bring to a simmer and cook until the onions and tomatoes are soft. Blend, adding a little water if needed to help the mixture move. Season to taste; the source sheet says it should be a little spicy with a tomato flavour.",
  },

  {
    name: "Birria Beef",
    type: "Prep",
    linkedMenuItem: "Brisket & Cheek Birria",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Dry ancho chilli", quantity: 6, unit: "each" },
      { name: "Dry árbol chilli", quantity: 4, unit: "each" },
      { name: "Red onion", quantity: 4, unit: "each" },
      { name: "Garlic clove", quantity: 12, unit: "each" },
      { name: "Red tomatoes", quantity: 12, unit: "each" },
      { name: "Brisket", quantity: 2, unit: "pieces" },
      { name: "Ox cheek", quantity: 10, unit: "kg" },
      { name: "Birria Marinade", quantity: null, unit: "1 kg per gastro" },
      { name: "Water", quantity: null, unit: "to cover" },
    ],
    notes:
      "Source section: Cooking the Birra. Method: trim the sinew from the brisket and ox cheeks. Season heavily and sear on the grill. Separate the brisket and ox cheek into two large gastros. Add 1 kg birria marinade to the gastros as directed on the source sheet. Grill the tomatoes and red onions and divide the remaining ingredients between the gastros. Cover with just enough water and cook in the oven on the Birra setting. The sheet does not make clear whether the 1 kg marinade instruction is total or per gastro, so it has not been converted into a fixed cost quantity.",
  },

  {
    name: "Pollo A La Brasa Marinade",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Achiote paste", quantity: 400, unit: "g" },
      { name: "Confit Garlic", quantity: 900, unit: "g" },
      { name: "Rosemary, finely chopped", quantity: 30, unit: "g" },
      { name: "Cumin seeds, toasted and blitzed", quantity: 30, unit: "g" },
      { name: "Black pepper, cracked", quantity: 30, unit: "g" },
      { name: "Soy sauce", quantity: 600, unit: "g" },
      { name: "Red wine vinegar", quantity: 600, unit: "g" },
      { name: "Rapeseed oil", quantity: 800, unit: "g" },
      { name: "White miso", quantity: 1600, unit: "g" },
      { name: "Soft brown sugar", quantity: 500, unit: "g" },
    ],
    notes:
      "Method: whisk all ingredients until combined. Store in the fridge for 5 days. The first ingredient on the source sheet has 'chipotle in adobo paste' crossed out and replaced by handwritten 'achiote'; this recipe uses Achiote paste 400 g.",
  },

  {
    name: "Salsa Macha",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Ginger", quantity: 80, unit: "g" },
      { name: "Rapeseed oil", quantity: 60, unit: "g" },
      { name: "Toasted sesame seeds", quantity: 50, unit: "g" },
      { name: "Dry chipotle", quantity: 2, unit: "each" },
      { name: "Fish sauce", quantity: 80, unit: "g" },
      { name: "Sesame oil", quantity: 150, unit: "g" },
    ],
    notes:
      "Method from the sheet: dice the ginger into small pieces and cook it in the oil until soft. Toast the chillies, soften them in warm water, scrape out the seeds and dice. Reduce the fish sauce until caramelised. Blend the ingredients, then add the sesame oil after blending. A handwritten correction says not to add the sesame seeds or sesame oil at the blending stage; the exact final wording is cut off in the photo, so it has been preserved as a caution rather than guessed. The sheet labels this vegetarian and flags sesame, but it also lists fish sauce, so the vegetarian label should be checked.",
  },

  {
    name: "Chicken Pastor Marinade",
    type: "Prep",
    linkedMenuItem: "Chicken Pastor",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Orange juice", quantity: 125, unit: "g" },
      { name: "Rapeseed oil", quantity: 85, unit: "g" },
      { name: "Salt", quantity: 12, unit: "g" },
      { name: "Garlic cloves", quantity: 2, unit: "each" },
      { name: "Mexican oregano", quantity: 10, unit: "g" },
      { name: "Cumin seeds", quantity: 3, unit: "g" },
      { name: "Whole black pepper", quantity: 3, unit: "g" },
      { name: "Achiote paste", quantity: 56, unit: "g" },
    ],
    notes:
      "Method: place all ingredients in a blender and blend until smooth. The X1 column lists 56 g achiote paste. The X5 column originally shows 280 g but has a handwritten correction to 380 g; the X1 quantity has been kept as printed rather than recalculated from the handwritten batch correction.",
  },

  {
    name: "Confit Garlic",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Garlic", quantity: 1, unit: "kg" },
      { name: "Rapeseed oil", quantity: 5, unit: "L" },
    ],
    notes:
      "Method: place the garlic and rapeseed oil in a pot and cook on low heat. Make sure the garlic confits gently and does not deep-fry.",
  },

  {
    name: "Tiger Milk",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "White onion", quantity: 200, unit: "g" },
      { name: "Celery", quantity: 300, unit: "g" },
      { name: "Lime juice", quantity: 2500, unit: "g" },
      { name: "Ginger", quantity: 170, unit: "g" },
      { name: "Garlic", quantity: 30, unit: "g" },
      { name: "Salt", quantity: 115, unit: "g" },
      { name: "Miso paste", quantity: 50, unit: "g" },
      { name: "Turkish chilli", quantity: 50, unit: "g" },
      { name: "Coriander stem", quantity: 40, unit: "g" },
      { name: "Ice", quantity: 700, unit: "g" },
    ],
    notes:
      "Source sheet title: Tigers milk. Method: blend all ingredients in the Thermomix. Dietary note on source: vegan. Kitchen note on source: contains onion and garlic.",
  },

  {
    name: "Tres Leches Sauce",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Milk powder", quantity: 300, unit: "g" },
      { name: "Double cream", quantity: 1000, unit: "g" },
      { name: "Condensed milk", quantity: 1, unit: "can" },
    ],
    notes:
      "Method: in a mixer bowl combine 800 g of the double cream with the condensed milk and milk powder. Mix first with a spatula, then switch on the mixer and whip to a Chantilly consistency without over-mixing. Fold in the remaining 200 g double cream with a spatula. Allergen: milk/dairy.",
  },
];

function patchRecipe(recipe: Recipe): Recipe {
  if (recipe.name === "Chicken Pastor") {
    return {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) =>
        ingredient.name === "Pastor marinade"
          ? { ...ingredient, name: "Chicken Pastor Marinade" }
          : ingredient
      ),
    };
  }

  if (recipe.name === "Passion Fruit Tiger's Milk") {
    return {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) =>
        ingredient.name === "Classic tiger's milk"
          ? { ...ingredient, name: "Tiger Milk" }
          : ingredient
      ),
    };
  }

  return recipe;
}

export const recipes: Recipe[] = [
  ...baseRecipes.map(patchRecipe),
  ...extraRecipes,
];

export { recipeSlug };
export type { Recipe, RecipeIngredient };
