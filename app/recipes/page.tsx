import Link from "next/link";

type RecipeIngredient = {
  name: string;
  quantity: number | null;
  unit: string;
  unitCost?: number | null;
};

type Recipe = {
  name: string;
  type: "Prep" | "Menu";
  linkedMenuItem?: string;
  yieldAmount?: number | null;
  yieldUnit?: string;
  ingredients: RecipeIngredient[];
  notes?: string;
};

const recipes: Recipe[] = [
  {
    name: "Passion Fruit Tiger's Milk",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      {
        name: "Classic tiger's milk",
        quantity: 1500,
        unit: "ml",
      },
      {
        name: "Passion fruit juice",
        quantity: 140,
        unit: "g",
      },
      {
        name: "Rapeseed oil",
        quantity: 140,
        unit: "g",
      },
      {
        name: "Ají amarillo",
        quantity: 4,
        unit: "tbsp",
      },
      {
        name: "Xanthan gum",
        quantity: null,
        unit: "as needed",
      },
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
      {
        name: "Black beans",
        quantity: 2500,
        unit: "g",
      },
      {
        name: "Chipotle salt",
        quantity: 35,
        unit: "g",
      },
      {
        name: "Confit garlic",
        quantity: 90,
        unit: "g",
      },
      {
        name: "Coriander",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Black pepper",
        quantity: 20,
        unit: "g",
      },
    ],
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
      {
        name: "Potato flour",
        quantity: 70,
        unit: "g",
      },
      {
        name: "Sparkling water",
        quantity: null,
        unit: "as needed",
      },
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
      {
        name: "Kimchi no moto paste",
        quantity: 450,
        unit: "ml",
      },
      {
        name: "Garlic",
        quantity: 6,
        unit: "heads",
      },
      {
        name: "Sugar",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Grapeseed oil",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Shiso leaf",
        quantity: 5,
        unit: "pieces",
      },
    ],
  },

  {
    name: "Chive Oil",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      {
        name: "Chives",
        quantity: 200,
        unit: "g",
      },
      {
        name: "Grapeseed oil",
        quantity: 800,
        unit: "g",
      },
    ],
    notes:
      "Blanch chives briefly, chill, dry, blend with oil and strain.",
  },

  {
    name: "Chimichurri",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      {
        name: "Thai basil",
        quantity: 22,
        unit: "g",
      },
      {
        name: "Coriander",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Shallot",
        quantity: 25,
        unit: "g",
      },
      {
        name: "Lemongrass",
        quantity: 10,
        unit: "g",
      },
      {
        name: "Lime juice",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Fish sauce",
        quantity: 50,
        unit: "g",
      },
      {
        name: "Kaffir lime leaf",
        quantity: 35,
        unit: "g",
      },
      {
        name: "Garlic",
        quantity: 20,
        unit: "g",
      },
      {
        name: "Spring onion",
        quantity: 30,
        unit: "g",
      },
      {
        name: "Pickled jalapeño",
        quantity: 30,
        unit: "g",
      },
      {
        name: "Grapeseed oil",
        quantity: 285,
        unit: "g",
      },
    ],
  },

  {
    name: "Pickle Liquor",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "ml",
    ingredients: [
      {
        name: "Shiragiku rice vinegar",
        quantity: 300,
        unit: "ml",
      },
      {
        name: "Sugar",
        quantity: 200,
        unit: "g",
      },
      {
        name: "Water",
        quantity: 100,
        unit: "ml",
      },
    ],
  },

  {
    name: "Miso Dressing",
    type: "Prep",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      {
        name: "Miso",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Sugar",
        quantity: 1150,
        unit: "g",
      },
      {
        name: "Mirin",
        quantity: 400,
        unit: "ml",
      },
      {
        name: "Sake",
        quantity: 400,
        unit: "ml",
      },
    ],
    notes:
      "Warm sake and burn off alcohol. Add mirin, dissolve sugar, remove from heat, add miso and blend smooth.",
  },

  {
    name: "Panisse",
    type: "Prep",
    linkedMenuItem: "Comte Cubes",
    yieldAmount: null,
    yieldUnit: "g",
    ingredients: [
      {
        name: "Water",
        quantity: 2500,
        unit: "g",
      },
      {
        name: "Butter",
        quantity: 1000,
        unit: "g",
      },
      {
        name: "Water",
        quantity: 1250,
        unit: "g",
      },
      {
        name: "Gram flour",
        quantity: 1000,
        unit: "g",
      },
      {
        name: "Salt",
        quantity: 40,
        unit: "g",
      },
      {
        name: "Comte",
        quantity: 200,
        unit: "g",
      },
      {
        name: "Caramelised onion",
        quantity: 400,
        unit: "g",
      },
    ],
    notes:
      "This is the prep recipe used for the Comte Cubes menu item. Screenshot may contain further ingredients below the visible area.",
  },

  {
    name: "Milk Crumb",
    type: "Prep",
    yieldAmount: 274,
    yieldUnit: "g",
    ingredients: [
      {
        name: "Powdered whole milk",
        quantity: 100,
        unit: "g",
      },
      {
        name: "All-purpose flour",
        quantity: 40,
        unit: "g",
      },
      {
        name: "Cornstarch",
        quantity: 20,
        unit: "g",
      },
      {
        name: "Sugar",
        quantity: 35,
        unit: "g",
      },
      {
        name: "Salt",
        quantity: 4,
        unit: "g",
      },
      {
        name: "Butter",
        quantity: 75,
        unit: "g",
      },
    ],
    notes:
      "Mix, spread flat on baking sheet and bake at 150C until toasted.",
  },

  {
    name: "Ribeye Steak 300g",
    type: "Menu",
    linkedMenuItem: "Ribeye Steak 300g",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      {
        name: "Ribeye",
        quantity: 300,
        unit: "g",
      },
      {
        name: "Chimichurri",
        quantity: 35,
        unit: "g",
      },
      {
        name: "10cm Masafina tortilla",
        quantity: null,
        unit: "pieces",
      },
      {
        name: "Chipotle salt",
        quantity: null,
        unit: "g",
      },
    ],
  },

  {
    name: "Longhorn Grass Fed Beef Short Rib",
    type: "Menu",
    linkedMenuItem: "Longhorn Grass Fed Beef Short Rib",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      {
        name: "Short rib",
        quantity: null,
        unit: "g",
      },
      {
        name: "Chocolate and pepita mole",
        quantity: null,
        unit: "g",
      },
      {
        name: "10cm Masafina tortilla",
        quantity: null,
        unit: "pieces",
      },
    ],
  },

  {
    name: "Chicken Pastor",
    type: "Menu",
    linkedMenuItem: "Chicken Pastor",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      {
        name: "Chicken thigh",
        quantity: null,
        unit: "g",
      },
      {
        name: "Pastor marinade",
        quantity: null,
        unit: "g",
      },
      {
        name: "Pineapple",
        quantity: null,
        unit: "g",
      },
      {
        name: "12cm Masafina tortilla",
        quantity: 2,
        unit: "pieces",
      },
    ],
  },

  {
    name: "Brisket & Cheek Birria",
    type: "Menu",
    linkedMenuItem: "Brisket & Cheek Birria",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      {
        name: "Birria beef",
        quantity: null,
        unit: "g",
      },
      {
        name: "Requeson cheese",
        quantity: null,
        unit: "g",
      },
      {
        name: "Onion",
        quantity: null,
        unit: "g",
      },
      {
        name: "Birria dipping stock",
        quantity: null,
        unit: "ml",
      },
      {
        name: "12cm Masafina tortilla",
        quantity: 2,
        unit: "pieces",
      },
    ],
  },

  {
    name: "Smoked Aubergine",
    type: "Menu",
    linkedMenuItem: "Smoked Aubergine",
    yieldAmount: 1,
    yieldUnit: "portion",
    ingredients: [
      {
        name: "Smoked aubergine",
        quantity: null,
        unit: "g",
      },
      {
        name: "Butternut squash",
        quantity: null,
        unit: "g",
      },
      {
        name: "Vegan feta",
        quantity: null,
        unit: "g",
      },
      {
        name: "Pickled onion",
        quantity: null,
        unit: "g",
      },
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
      {
        name: "Carnitas pork",
        quantity: null,
        unit: "g",
      },
      {
        name: "Salsa verde",
        quantity: null,
        unit: "g",
      },
      {
        name: "10cm Masafina tortilla",
        quantity: 5,
        unit: "pieces",
      },
    ],
  },
];

function getRecipeStatus(recipe: Recipe) {
  if (
    recipe.yieldAmount === null ||
    recipe.yieldAmount === undefined
  ) {
    return "Yield needed";
  }

  const hasMissingQuantity = recipe.ingredients.some(
    (ingredient) =>
      ingredient.quantity === null ||
      ingredient.quantity === undefined
  );

  if (hasMissingQuantity) {
    return "Recipe incomplete";
  }

  return "Ready to cost";
}

export default function RecipesPage() {
  const prepRecipes = recipes.filter(
    (recipe) => recipe.type === "Prep"
  );

  const menuRecipes = recipes.filter(
    (recipe) => recipe.type === "Menu"
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>

          <div>
            <p className="brand-name">Azteca Insights</p>
            <p className="brand-subtitle">
              Kitchen cost control
            </p>
          </div>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Main navigation"
        >
          <Link className="nav-link" href="/">
            <span className="nav-icon">⌂</span>
            Dashboard
          </Link>

          <Link
            className="nav-link"
            href="/invoices"
          >
            <span className="nav-icon">▤</span>
            Invoices
          </Link>

          <Link
            className="nav-link"
            href="/ingredients"
          >
            <span className="nav-icon">◫</span>
            Ingredients
          </Link>

          <Link
            className="nav-link nav-link-active"
            href="/recipes"
          >
            <span className="nav-icon">◇</span>
            Recipes
          </Link>

          <Link
            className="nav-link"
            href="/menu"
          >
            <span className="nav-icon">☰</span>
            Menu
          </Link>

          <Link
            className="nav-link"
            href="/stock"
          >
            <span className="nav-icon">□</span>
            Stock counts
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="restaurant-card">
            <div className="restaurant-avatar">
              AZ
            </div>

            <div>
              <p className="restaurant-name">
                Azteca
              </p>

              <p className="restaurant-location">
                Battersea, London
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Recipe costing
            </p>

            <h1>Recipes</h1>

            <p className="page-description">
              Prep recipes and menu recipes used to
              calculate live dish costs.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
          >
            + Add recipe
          </button>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">
              Total recipes
            </p>

            <p className="stat-value">
              {recipes.length}
            </p>

            <p className="stat-change neutral">
              Prep and menu recipes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Prep recipes
            </p>

            <p className="stat-value">
              {prepRecipes.length}
            </p>

            <p className="stat-change neutral">
              Sauces, marinades and batches
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Menu recipes
            </p>

            <p className="stat-value">
              {menuRecipes.length}
            </p>

            <p className="stat-change neutral">
              Linked to menu dishes
            </p>
          </article>

          <article className="stat-card">
            <p className="stat-label">
              Costed recipes
            </p>

            <p className="stat-value">
              0
            </p>

            <p className="stat-change warning">
              Ingredient prices needed
            </p>
          </article>
        </section>

        <section className="recipe-section-grid">
          <article className="panel recipe-list-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Batch recipes
                </p>

                <h2>Prep recipes</h2>
              </div>

              <span className="menu-section-count">
                {prepRecipes.length}
              </span>
            </div>

            <div className="recipe-card-list">
              {prepRecipes.map((recipe) => {
                const status =
                  getRecipeStatus(recipe);

                return (
                  <article
                    className="recipe-card"
                    key={recipe.name}
                  >
                    <div className="recipe-card-top">
                      <div>
                        <p className="recipe-name">
                          {recipe.name}
                        </p>

                        {recipe.linkedMenuItem && (
                          <p className="muted-text">
                            Used in{" "}
                            {recipe.linkedMenuItem}
                          </p>
                        )}
                      </div>

                      <span
                        className={`status-badge ${
                          status === "Ready to cost"
                            ? "status-approved"
                            : "status-review"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="recipe-meta">
                      <span>
                        {
                          recipe.ingredients
                            .length
                        }{" "}
                        ingredients
                      </span>

                      <span>
                        Yield:{" "}
                        {recipe.yieldAmount
                          ? `${recipe.yieldAmount} ${
                              recipe.yieldUnit ??
                              ""
                            }`
                          : "needed"}
                      </span>
                    </div>

                    <div className="recipe-ingredients-preview">
                      {recipe.ingredients
                        .slice(0, 4)
                        .map((ingredient) => (
                          <span
                            key={`${recipe.name}-${ingredient.name}-${ingredient.quantity}`}
                          >
                            {ingredient.name}
                          </span>
                        ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="panel recipe-list-panel">
            <div className="panel-header">
              <div>
                <p className="panel-kicker">
                  Menu dishes
                </p>

                <h2>Menu recipes</h2>
              </div>

              <span className="menu-section-count">
                {menuRecipes.length}
              </span>
            </div>

            <div className="recipe-card-list">
              {menuRecipes.map((recipe) => {
                const status =
                  getRecipeStatus(recipe);

                return (
                  <article
                    className="recipe-card"
                    key={recipe.name}
                  >
                    <div className="recipe-card-top">
                      <div>
                        <p className="recipe-name">
                          {recipe.name}
                        </p>

                        <p className="muted-text">
                          Menu item
                        </p>
                      </div>

                      <span
                        className={`status-badge ${
                          status === "Ready to cost"
                            ? "status-approved"
                            : "status-review"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="recipe-meta">
                      <span>
                        {
                          recipe.ingredients
                            .length
                        }{" "}
                        ingredients
                      </span>

                      <span>
                        Yield:{" "}
                        {recipe.yieldAmount
                          ? `${recipe.yieldAmount} ${
                              recipe.yieldUnit ??
                              ""
                            }`
                          : "needed"}
                      </span>
                    </div>

                    <div className="recipe-ingredients-preview">
                      {recipe.ingredients
                        .slice(0, 4)
                        .map((ingredient) => (
                          <span
                            key={`${recipe.name}-${ingredient.name}-${ingredient.quantity}`}
                          >
                            {ingredient.name}
                          </span>
                        ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}