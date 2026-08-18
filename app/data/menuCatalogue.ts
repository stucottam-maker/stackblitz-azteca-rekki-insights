export type MenuItemDefinition = {
  name: string;
  price: number;
  description: string;
  dietary?: string;
};

export type MenuSectionDefinition = {
  name: string;
  items: MenuItemDefinition[];
};

export const menuSections: MenuSectionDefinition[] = [
  {
    name: "Para Picar",
    items: [
      { name: "Sea Salt Edamame", price: 5.5, description: "Sesame oil", dietary: "V · VG" },
      { name: "Spicy Edamame", price: 5.5, description: "Chilli garlic, pepita oil", dietary: "V · VG" },
      { name: "Guacamole", price: 12, description: "Edamame, herbs, blue totopos", dietary: "V · VG" },
      { name: "Black Bean Dip", price: 8, description: "Pepita chilli oil, crispy tortilla", dietary: "V · VG" },
      { name: "Pork Belly Chicharrons", price: 15, description: "Camote, ahi amarillo mayo" },
      { name: "King Prawn Tempura", price: 16, description: "Chipotle mayo, lime" },
    ],
  },
  {
    name: "Sashimi and Ceviche",
    items: [
      { name: "Trout Tiradito", price: 18, description: "Smoked tiger's milk, pickled courgette, avocado" },
      { name: "Classico Ceviche", price: 18, description: "Red onions, camote, cherry tomato, coriander" },
      { name: "Tuna Tostada", price: 22, description: "Bluefin tuna, sesame matcha, radish, pepita seeds" },
    ],
  },
  {
    name: "Tacos",
    items: [
      { name: "Wild Mushroom Quesadilla", price: 13, description: "Queso Oaxaca, peach habanero · individual", dietary: "D · V" },
      { name: "Brisket & Cheek Birria", price: 13, description: "Onions, requeson cheese, dipping stock · 2 x 12cm Masafina tortillas", dietary: "D" },
      { name: "Crispy Fish Baja", price: 14, description: "Chipotle mayo, slaw, coriander, smoked coal oil · 2 x 12cm Masafina tortillas" },
      { name: "Coconut King Prawn", price: 13, description: "Cactus pico de gallo, chilli jam, black eye beans, crispy onions · 2 x 12cm Masafina tortillas" },
      { name: "Chicken Pastor", price: 12, description: "Grilled, spicy pineapple · 2 x 12cm Masafina tortillas" },
      { name: "Smoked Aubergine", price: 10, description: "Butternut squash, vegan feta, pickled onion · 2 x 12cm Masafina heritage blue corn tortillas", dietary: "V · VG" },
      { name: "Pork Carnitas", price: 29, description: "All the trimmings, salsa verde · serves 2 · 5 x 10cm Masafina tortillas" },
    ],
  },
  {
    name: "Salsa",
    items: [
      { name: "Salsa El Diablo", price: 2, description: "Hot", dietary: "V · VG" },
      { name: "Salsa Platter of 5 Salsas", price: 11, description: "Blue totopos" },
      { name: "Roasted Salsa Verde", price: 2, description: "", dietary: "V · VG" },
      { name: "Cindy's Peach Habanero", price: 2, description: "Hot", dietary: "V · VG" },
      { name: "Salsa Negra", price: 2, description: "Mild", dietary: "V · VG" },
      { name: "Jalapeño Salsa", price: 2, description: "Sweet / mild", dietary: "V · VG" },
      { name: "House Hot Sauce", price: 2, description: "Hot", dietary: "V · VG" },
      { name: "Chimichurri Verde", price: 2, description: "Mild", dietary: "V · VG" },
    ],
  },
  {
    name: "Sharing Dishes",
    items: [
      { name: "Miso Black Cod", price: 40, description: "220g North Pacific black cod, kimchi cabbage, yuzu miso sauce" },
      { name: "Half Herb Fed Chicken", price: 26, description: "Miso, poblano marinade, caramelised onions" },
      { name: "Ribeye Steak 300g", price: 45, description: "Chimichurri verde, chipotle salt, 10cm Masafina tortillas", dietary: "G" },
      { name: "Longhorn Grass Fed Beef Short Rib", price: 38, description: "Chocolate and pepita mole, 10cm Masafina tortillas", dietary: "N · G" },
      { name: "Lamb Cutlets", price: 38, description: "Citrus herb marinade, chipotle mayo, homemade kimchi" },
      { name: "28 Day Dry Aged Irish Tomahawk Ribeye 1.2kg", price: 90, description: "Chimichurri verde, comte cubes", dietary: "G · D" },
    ],
  },
  {
    name: "Sides",
    items: [
      { name: "Black Beans", price: 6, description: "Smoked pork hock, spring onion crema", dietary: "D" },
      { name: "Grilled Corn on the Cob", price: 6, description: "Chipotle, brown butter, ahi amarillo mayo, coriander", dietary: "V · VG" },
      { name: "Charred Hispi Cabbage", price: 7, description: "Miso, pickled jalapeño", dietary: "V · VG" },
      { name: "Crushed Pink Fir Potatoes", price: 7, description: "Morita chilli oil, ahi amarillo mayo", dietary: "V · VG" },
      { name: "Comte Cubes", price: 6, description: "Made with chickpeas and shallots · 4 pieces", dietary: "D · V" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Cinnamon Churros", price: 8, description: "Tres leches dip", dietary: "D · G" },
      { name: "Cuatro Mochis", price: 12, description: "Coconut, tropical, strawberry cheesecake", dietary: "D · G" },
      { name: "Ice Cream & Sorbet Trio", price: 10, description: "Coconut, dulce de leche, vanilla, chocolate" },
    ],
  },
];
