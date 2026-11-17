import type { MenuSectionDefinition } from "./menuCatalogue";

// Fictional menu prices used only for Kommee's separate demo tenant.
export const demoMenuSections: MenuSectionDefinition[] = [
  {
    name: "Sample Menu",
    items: [
      { name: "Avocado Corn Tacos (Demo)", price: 12.5, description: "Avocado, blue corn tortillas, herbs and lime", dietary: "V · VG" },
      { name: "Green Rice Bowl (Demo)", price: 13.5, description: "Rice, avocado, coriander and fresh lime", dietary: "V · VG" },
      { name: "Crispy Citrus Potatoes (Demo)", price: 7.2, description: "Crisp potatoes with citrus dressing", dietary: "V · VG" },
    ],
  },
];
