export type RecipeIngredient = {
  name: string;
  quantity: number | null;
  unit: string;
};

export type Recipe = {
  name: string;
  type: "Prep" | "Menu";
  linkedMenuItem?: string;
  yieldAmount?: number | null;
  yieldUnit?: string;
  ingredients: RecipeIngredient[];
  notes?: string;
};

export function recipeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const recipes: Recipe[] = [
  {
    name: "Passion Fruit Tiger's Milk",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      { name: "Classic tiger's milk", quantity: 1500, unit: "ml" },
      { name: "Passion fruit juice", quantity: 140, unit: "g" },
      { name: "Rapeseed oil", quantity: 140, unit: "g" },
      { name: "Ají amarillo", quantity: 4, unit: "tbsp" },
      { name: "Xanthan gum", quantity: null, unit: "as needed" },
    ],
    notes:
      "Blend tiger's milk, passion fruit juice and ají amarillo. Slowly emulsify with oil. Add xanthan gum as needed.",
  },

  {
    name: "Black Bean Dip",
    type: "Prep",
    linkedMenuItem: "Black Bean Dip",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Cooked black beans", quantity: 1500, unit: "g" },
      { name: "Confit garlic", quantity: 70, unit: "g" },
      { name: "Chipotle salt", quantity: 25, unit: "g" },
      { name: "Coriander", quantity: 35, unit: "g" },
      { name: "Black pepper", quantity: 20, unit: "g" },
    ],
    notes:
      "Method: Blend all ingredients, place in vacuum-pack bags and freeze. Dietary: vegan. Kitchen note: contains onion/garlic.",
  },

  {
    name: "Baja Slaw",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Purple cabbage", quantity: 500, unit: "g" },
      { name: "Carrots", quantity: 200, unit: "g" },
      { name: "Daikon", quantity: 200, unit: "g" },
      { name: "Coriander", quantity: 100, unit: "g" },
    ],
    notes:
      "Prep: shave the purple cabbage, grate the carrots and daikon, and slice the coriander. Method: combine all ingredients and mix. For service add a little chipotle mayo.",
  },

  {
    name: "Apple Sauce",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Pink Lady apple", quantity: 8, unit: "each" },
      { name: "Green apple", quantity: 8, unit: "each" },
      { name: "Ancho chilli", quantity: 2, unit: "each" },
      { name: "Lime juice", quantity: 100, unit: "g" },
      { name: "Brown sugar", quantity: 100, unit: "g" },
      { name: "Water", quantity: 200, unit: "g" },
      { name: "Cinnamon", quantity: 1, unit: "g" },
      { name: "Brown butter", quantity: 100, unit: "g" },
    ],
    notes:
      "Method: Cook the apples and sugar in a pan. When the apples start to soften add the water. Blend everything together, then add the remaining ingredients. Dietary: vegetarian. Allergen: milk/dairy.",
  },

  {
    name: "Coconut Flour",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Corn flour", quantity: 200, unit: "g" },
      { name: "Fine salt", quantity: 25, unit: "g" },
      { name: "Chipotle powder", quantity: 10, unit: "g" },
      { name: "Desiccated coconut", quantity: 500, unit: "g" },
    ],
    notes: "Method: combine all ingredients together and mix.",
  },

  {
    name: "Coriander Aioli",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Coriander", quantity: 2, unit: "bunches" },
      { name: "Water", quantity: 150, unit: "g" },
      { name: "Dijon mustard", quantity: 85, unit: "g" },
      { name: "Jalapeño", quantity: 2, unit: "each" },
      { name: "Confit garlic", quantity: 30, unit: "g" },
      { name: "Lime juice", quantity: 70, unit: "g" },
      { name: "Egg yolk", quantity: 200, unit: "g" },
      { name: "Rapeseed oil", quantity: 800, unit: "g" },
      { name: "Black pepper", quantity: 10, unit: "g" },
      { name: "Salt", quantity: 30, unit: "g" },
    ],
    notes:
      "Prep: use seedless jalapeño. Method: in the Thermomix add coriander, water and jalapeño and blend. Add the remaining ingredients except the oil. Slowly add the rapeseed oil while blending to emulsify, then place in vacuum-pack bags. Dietary: vegetarian. Allergens: eggs, mustard. Kitchen note: contains garlic/onion.",
  },

  {
    name: "Mexican Romesco",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Sun-dried tomatoes", quantity: 200, unit: "g" },
      { name: "Sweet red peppers", quantity: 600, unit: "g" },
      { name: "Confit garlic", quantity: 20, unit: "g" },
      { name: "Ají amarillo", quantity: 30, unit: "g" },
      { name: "Oregano", quantity: 5, unit: "g" },
      { name: "Garlic oil", quantity: 500, unit: "g" },
    ],
    notes:
      "Method: soak the sun-dried tomatoes in water until soft. Blend all ingredients together, adding the garlic oil slowly at the end. Dietary: vegan. Kitchen note: contains onion/garlic.",
  },

  {
    name: "Azteca Sweet Pickle",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "White vinegar", quantity: 600, unit: "g" },
      { name: "Water", quantity: 1600, unit: "g" },
      { name: "Sugar", quantity: 1000, unit: "g" },
    ],
    notes:
      "Method: combine all ingredients in a pot and bring to a slow boil, just enough to dissolve the sugar. Place in the blast chiller to cool. Used for courgette. Allergen note from source sheet: sulphites.",
  },

  {
    name: "Miso Butter",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Confit garlic", quantity: 130, unit: "g" },
      { name: "White miso", quantity: 200, unit: "g" },
      { name: "Soy", quantity: 50, unit: "g" },
      { name: "Mirin", quantity: 50, unit: "g" },
      { name: "Rapeseed oil", quantity: 850, unit: "g" },
      { name: "Garlic oil", quantity: 150, unit: "g" },
    ],
    notes:
      "Method: add the confit garlic, white miso, soy and mirin to a blender and blitz. Mix the rapeseed and garlic oils together, then slowly add the oils to the blended mixture to emulsify. Dietary: vegan. Allergen: soy. Kitchen note: contains onion/garlic.",
  },

  {
    name: "Pepita Chili Oil",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Ancho chilli", quantity: 150, unit: "g" },
      { name: "Pepita seeds", quantity: 200, unit: "g" },
      { name: "Rapeseed oil", quantity: 800, unit: "g" },
      { name: "Árbol chilli", quantity: 1, unit: "each" },
      { name: "Maldon salt", quantity: 5, unit: "g" },
      { name: "Smoked habanero", quantity: 1, unit: "each" },
    ],
    notes:
      "Method: de-stem and de-seed the ancho chillies, then lightly toast them on the grill. Roast the pepita seeds. Blend all ingredients for at least 3 minutes on speed 10. Dietary: vegan.",
  },

  {
    name: "Azteca Base Pickle",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Rice wine vinegar", quantity: 1000, unit: "g" },
      { name: "Water", quantity: 500, unit: "g" },
      { name: "Sugar", quantity: 250, unit: "g" },
    ],
    notes:
      "Method: combine all ingredients in a pot and bring to a slow boil, just enough to dissolve the sugar. Place in the blast chiller to cool. Allergen note from source sheet: sulphites.",
  },

  {
    name: "Lime Gel",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Lime juice", quantity: 200, unit: "g" },
      { name: "Water", quantity: 100, unit: "g" },
      { name: "Caster sugar", quantity: 50, unit: "g" },
      { name: "Agar-agar", quantity: 10, unit: "g" },
      { name: "Water (to finish)", quantity: 200, unit: "g" },
    ],
    notes:
      "Method: bring the lime juice, 100g water and caster sugar to the boil. Whisk in the agar-agar for around 4 minutes. Chill the mixture. Once solid, add the remaining 200g water and blend. Dietary: vegan.",
  },

  {
    name: "Crumble",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Brown butter", quantity: 500, unit: "g" },
      { name: "Caster sugar", quantity: 250, unit: "g" },
      { name: "Plain flour", quantity: 600, unit: "g" },
    ],
    notes:
      "Method: mix all ingredients, bake at 180°C for 15 minutes, mix, then bake for 12 minutes more. Dietary: vegetarian. Allergens: dairy/milk, gluten.",
  },

  {
    name: "Camote",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Orange sweet potato", quantity: 7, unit: "kg" },
    ],
    notes:
      "Method: cut the sweet potatoes in half and bake at 175°C for 45 minutes. While still hot and easy to handle, transfer to the Thermomix and blend until smooth. Place in vacuum-pack bags and chill; close the bags only once completely cold. Dietary: vegan.",
  },

  {
    name: "Margarita Cheesecake",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Soft cheese", quantity: 500, unit: "g" },
      { name: "Caster sugar", quantity: 250, unit: "g" },
      { name: "Double cream", quantity: 600, unit: "g" },
      { name: "Tequila", quantity: null, unit: "g" },
    ],
    notes:
      "Method: mix the soft cheese and caster sugar in the mixer until smooth. Add the tequila and double cream and mix together, then place in piping bags. The tequila quantity is obscured on the source sheet and has been left unset. Allergens noted on source: dairy, sulphites.",
  },

  {
    name: "Tuile",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Oil", quantity: 70, unit: "g" },
      { name: "Water", quantity: 60, unit: "g" },
      { name: "Plain flour", quantity: 15, unit: "g" },
      { name: "Red food colour", quantity: 2, unit: "g" },
    ],
    notes:
      "Method: mix everything and transfer to a squeeze bottle. Heat a non-stick pan and add a small amount in the centre. Wait until small holes appear, then gently remove with a spatula and drain on a cloth-lined tray. While still warm, sprinkle Tajín on top. Dietary: vegan. Allergen: gluten.",
  },

  {
    name: "Vegan Aji Amarillo Mayo",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Vegan mayo", quantity: 1, unit: "kg" },
      { name: "Ají amarillo", quantity: 120, unit: "g" },
      { name: "Lime juice", quantity: 20, unit: "g" },
    ],
    notes: "Method: combine all ingredients in a bowl and whisk. Dietary: vegan.",
  },

  {
    name: "Trout Salt",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Fine salt", quantity: 400, unit: "g" },
      { name: "Caster sugar", quantity: 600, unit: "g" },
      { name: "Beetroot powder", quantity: 100, unit: "g" },
      { name: "Fennel seeds", quantity: 10, unit: "g" },
      { name: "Black pepper", quantity: 10, unit: "g" },
      { name: "Coriander seeds", quantity: 100, unit: "g" },
    ],
    notes:
      "Method: toast all the seeds in a pan, then grind them. Mix all ingredients together.",
  },

  {
    name: "Wild Mushroom Mix",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Wild mushrooms", quantity: 2, unit: "trays" },
      { name: "Romero peppers", quantity: 1, unit: "kg" },
      { name: "White onions", quantity: 7, unit: "each" },
      { name: "Garlic", quantity: 10, unit: "cloves" },
      { name: "Garlic oil", quantity: 80, unit: "g" },
      { name: "Soya sauce", quantity: 175, unit: "g" },
      { name: "Chipotle salt", quantity: null, unit: "to taste" },
    ],
    notes:
      "Method: cut the mushrooms into equal pieces. Julienne the Romero peppers and slice the onions and garlic. Add the garlic oil to a pot and cook the onions and peppers until soft. Add the garlic, then the mushrooms, and cook until soft. Add the soya sauce and adjust the chipotle salt to taste.",
  },

  {
    name: "Crisp Onions",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Corn flour", quantity: 200, unit: "g" },
      { name: "Fine salt", quantity: 10, unit: "g" },
      { name: "Chipotle powder", quantity: 5, unit: "g" },
      { name: "White onions", quantity: null, unit: "as needed" },
    ],
    notes:
      "Method: combine the corn flour, fine salt and chipotle powder. Halve and julienne the onions, toss with the flour mix and shake off excess using a steam tray. Deep-fry until golden; do not overcook. Dietary: vegan. The onion quantity is not shown on the source sheet.",
  },

  {
    name: "Smoked Aubergine Prep",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Aubergine", quantity: 666, unit: "g" },
      { name: "Garlic, grated", quantity: 40, unit: "g" },
      { name: "Grapeseed oil", quantity: 110, unit: "g" },
      { name: "Maldon salt", quantity: 20, unit: "g" },
      { name: "Caster sugar", quantity: 10, unit: "g" },
      { name: "Aubergine ash", quantity: 16, unit: "g" },
    ],
    notes:
      "Method: burn the aubergine skin on the grill. Transfer the grilled aubergines to a tray, cover with cling film and steam until soft. Peel, reserving the skin. Dry the skins in the oven on low fan at 65°C, then blitz to a black powder for the aubergine ash. Whisk the aubergine flesh with the remaining ingredients. Dietary: vegan.",
  },

  {
    name: "Churros",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Milk", quantity: 300, unit: "g" },
      { name: "Water", quantity: 100, unit: "g" },
      { name: "Butter", quantity: 100, unit: "g" },
      { name: "Sugar", quantity: 70, unit: "g" },
      { name: "Vanilla extract", quantity: 20, unit: "g" },
      { name: "Plain flour", quantity: 400, unit: "g" },
      { name: "Salt", quantity: 2, unit: "g" },
      { name: "Cinnamon sugar", quantity: null, unit: "after frying" },
    ],
    notes:
      "Method: in a pan combine the milk, water, salt, butter, sugar and vanilla and heat without boiling. Remove from the heat, add half the flour and whisk well. Return to the heat, add the remaining flour and cook with a spatula until the dough no longer sticks to the pan. Finish working the dough by hand while still hot. Cinnamon sugar mix: 3kg caster sugar + 90g cinnamon. Dietary: vegetarian. Allergens: dairy/milk, gluten.",
  },

  {
    name: "Prawn Marinade",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Piquillo peppers", quantity: 800, unit: "g" },
      { name: "Chipotle paste", quantity: 400, unit: "g" },
      { name: "Coal oil", quantity: 100, unit: "g" },
      { name: "Salt", quantity: 20, unit: "g" },
    ],
    notes:
      "Method: add all ingredients to a blender and blitz until smooth. Dietary note on source sheet: vegan.",
  },

  {
    name: "Black Eyed Beans Puree",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Black eye beans", quantity: 1500, unit: "g" },
      { name: "Garlic oil", quantity: 200, unit: "g" },
      { name: "Coriander with stem", quantity: 40, unit: "g" },
      { name: "Salt", quantity: null, unit: "to taste" },
      { name: "Black pepper", quantity: 10, unit: "g" },
      { name: "Water", quantity: null, unit: "until smooth" },
    ],
    notes:
      "Method: cook the beans until soft, then blend everything until smooth. Dietary: vegan. Kitchen note: contains onion/garlic.",
  },

  {
    name: "Ceviche Sauce",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      { name: "Tiger Milk", quantity: 1, unit: "L" },
      { name: "Fish scraps, no skin or bones", quantity: 200, unit: "g" },
    ],
    notes: "Method: blend all ingredients in the Thermomix.",
  },

  {
    name: "Chilli and Mezcal Jam",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Árbol chilli", quantity: 12, unit: "each" },
      { name: "Caster sugar", quantity: 500, unit: "g" },
      { name: "White vinegar", quantity: 15, unit: "g" },
      { name: "Water", quantity: 800, unit: "g" },
      { name: "Agar-agar", quantity: 30, unit: "g" },
      { name: "Mezcal", quantity: 25, unit: "ml" },
    ],
    notes:
      "Method: de-stem, chop and de-seed the chillies. Add the water, vinegar, sugar and chillies to a pot and reduce. Add the agar-agar, bring to the boil and chill. Add enough water to create a gel consistency, blend and bottle. Source sheet notes a 1 month shelf life. Dietary: vegan. Allergen note: sulphites. Contains alcohol.",
  },

  {
    name: "Cindy's Peach Habanero",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Yellow peaches", quantity: null, unit: "cans" },
      { name: "Piquillo peppers", quantity: null, unit: "g" },
      { name: "Dried smoked habanero", quantity: null, unit: "g" },
      { name: "Lime juice", quantity: 125, unit: "g" },
      { name: "Coriander", quantity: 125, unit: "g" },
      { name: "Jalapeño salt", quantity: 70, unit: "g" },
      { name: "Sesame oil", quantity: 120, unit: "g" },
      { name: "Brown sugar", quantity: 400, unit: "g" },
    ],
    notes:
      "Method: dice the peaches. In a saucepan melt the brown sugar with the sesame oil, add the peaches and simmer over medium heat until soft and caramelised. Add the remaining ingredients to the Thermomix and blitz at speed 5.5 for 2 minutes. Dietary: vegan. Allergen: sesame. The quantities for yellow peaches, piquillo peppers and dried smoked habanero are obscured by glare on the source sheet, so they have been left unset rather than guessed.",
  },

  {
    name: "House Hot Sauce",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Garlic", quantity: 16, unit: "g" },
      { name: "Ginger", quantity: 135, unit: "g" },
      { name: "Soy sauce tamari", quantity: 216, unit: "g" },
      { name: "White vinegar", quantity: 175, unit: "g" },
      { name: "Dried chilli árbol", quantity: 40, unit: "g" },
      { name: "Caster sugar", quantity: 21, unit: "g" },
      { name: "Mirin", quantity: null, unit: "quantity not shown" },
    ],
    notes:
      "Method: place the ingredients in a blender and blend for 5 minutes, then strain and push all the pulp through the sieve. Mirin is handwritten on the source sheet but no quantity is shown, so it has been left unset.",
  },

  {
    name: "Tempura Batter",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      {
        name: "Rice flour / gluten free flour",
        quantity: 120,
        unit: "g",
      },
      { name: "Potato flour", quantity: 70, unit: "g" },
      { name: "Sparkling water", quantity: null, unit: "ml" },
    ],
    notes: "Mix with sparkling water until smooth.",
  },

  {
    name: "Lamb Cutlet Marinade",
    type: "Prep",
    linkedMenuItem: "Lamb Cutlets",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      { name: "Kimchi no moto paste", quantity: 450, unit: "ml" },
      { name: "Garlic", quantity: 6, unit: "heads" },
      { name: "Sugar", quantity: 50, unit: "g" },
      { name: "Grapeseed oil", quantity: 200, unit: "ml" },
      { name: "Shiso leaf", quantity: 5, unit: "pieces" },
    ],
  },

  {
    name: "Chive Oil",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      { name: "Chives", quantity: 200, unit: "g" },
      { name: "Grapeseed oil", quantity: 800, unit: "g" },
    ],
    notes:
      "Blanch the chives in salted boiling water for 10 seconds. Chill immediately, dry completely, blend with oil and strain.",
  },

  {
    name: "Chimichurri",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Thai basil", quantity: 22, unit: "g" },
      { name: "Coriander", quantity: 50, unit: "g" },
      { name: "Shallot", quantity: 25, unit: "g" },
      { name: "Lemongrass", quantity: 10, unit: "g" },
      { name: "Lime juice", quantity: 50, unit: "g" },
      { name: "Fish sauce", quantity: 50, unit: "g" },
      { name: "Kaffir lime leaf", quantity: 35, unit: "g" },
      { name: "Garlic", quantity: 20, unit: "g" },
      { name: "Spring onion", quantity: 30, unit: "g" },
      { name: "Pickled jalapeño", quantity: 30, unit: "g" },
      { name: "Grapeseed oil", quantity: 285, unit: "g" },
    ],
  },

  {
    name: "Pickle Liquor",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      { name: "Shiragiku rice vinegar", quantity: 300, unit: "ml" },
      { name: "Sugar", quantity: 200, unit: "g" },
      { name: "Water", quantity: 100, unit: "ml" },
    ],
  },

  {
    name: "Miso Dressing",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Miso", quantity: 2000, unit: "g" },
      { name: "Sugar", quantity: 1150, unit: "g" },
      { name: "Mirin", quantity: 400, unit: "ml" },
      { name: "Sake", quantity: 400, unit: "ml" },
    ],
    notes:
      "Warm sake and burn off alcohol. Add mirin, dissolve sugar, remove from heat, add miso and blend until smooth.",
  },

  {
    name: "Panisse",
    type: "Prep",
    linkedMenuItem: "Comte Cubes",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      { name: "Water", quantity: 2500, unit: "g" },
      { name: "Butter", quantity: 1000, unit: "g" },
      { name: "Water", quantity: 1250, unit: "g" },
      { name: "Gram flour", quantity: 1000, unit: "g" },
      { name: "Salt", quantity: 40, unit: "g" },
      { name: "Comte", quantity: 200, unit: "g" },
      { name: "Caramelised onion", quantity: 400, unit: "g" },
    ],
    notes:
      "Prep recipe for the Comte Cubes menu item. More ingredients may exist below the original screenshot.",
  },

  {
    name: "Milk Crumb",
    type: "Prep",
    yieldAmount: 274,
    yieldUnit: "g",
    ingredients: [
      { name: "Powdered whole milk", quantity: 100, unit: "g" },
      { name: "All-purpose flour", quantity: 40, unit: "g" },
      { name: "Cornstarch", quantity: 20, unit: "g" },
      { name: "Sugar", quantity: 35, unit: "g" },
      { name: "Salt", quantity: 4, unit: "g" },
      { name: "Butter", quantity: 75, unit: "g" },
    ],
    notes:
      "Mix together, spread flat on a baking sheet and bake at 150°C until toasted.",
  },

  {
    name: "Ribeye Steak 300g",
    type: "Menu",
    linkedMenuItem: "Ribeye Steak 300g",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Ribeye", quantity: 300, unit: "g" },
      { name: "Chimichurri", quantity: 35, unit: "g" },
      { name: "10cm Masafina tortilla", quantity: null, unit: "pieces" },
      { name: "Chipotle salt", quantity: null, unit: "g" },
    ],
  },

  {
    name: "Longhorn Grass Fed Beef Short Rib",
    type: "Menu",
    linkedMenuItem: "Longhorn Grass Fed Beef Short Rib",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Short rib", quantity: null, unit: "g" },
      { name: "Chocolate and pepita mole", quantity: null, unit: "g" },
      { name: "10cm Masafina tortilla", quantity: null, unit: "pieces" },
    ],
  },

  {
    name: "Chicken Pastor",
    type: "Menu",
    linkedMenuItem: "Chicken Pastor",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Chicken thigh", quantity: null, unit: "g" },
      { name: "Pastor marinade", quantity: null, unit: "g" },
      { name: "Pineapple", quantity: null, unit: "g" },
      { name: "12cm Masafina tortilla", quantity: 2, unit: "pieces" },
    ],
  },

  {
    name: "Brisket & Cheek Birria",
    type: "Menu",
    linkedMenuItem: "Brisket & Cheek Birria",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Birria beef", quantity: null, unit: "g" },
      { name: "Requeson cheese", quantity: null, unit: "g" },
      { name: "Onion", quantity: null, unit: "g" },
      { name: "Birria dipping stock", quantity: null, unit: "ml" },
      { name: "12cm Masafina tortilla", quantity: 2, unit: "pieces" },
    ],
  },

  {
    name: "Smoked Aubergine",
    type: "Menu",
    linkedMenuItem: "Smoked Aubergine",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Smoked Aubergine Prep", quantity: null, unit: "g" },
      { name: "Butternut squash", quantity: null, unit: "g" },
      { name: "Vegan feta", quantity: null, unit: "g" },
      { name: "Pickled onion", quantity: null, unit: "g" },
      {
        name: "12cm Masafina heritage blue corn tortilla",
        quantity: 2,
        unit: "pieces",
      },
    ],
  },

  {
    name: "Pork Carnitas",
    type: "Menu",
    linkedMenuItem: "Pork Carnitas",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      { name: "Carnitas pork", quantity: null, unit: "g" },
      { name: "Salsa verde", quantity: null, unit: "g" },
      { name: "10cm Masafina tortilla", quantity: 5, unit: "pieces" },
    ],
  },
];