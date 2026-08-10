export type Supplier = {
  name: string;
  logo: string;
};

export const suppliers: Record<string, Supplier> = {
  "Fin and Flounder": {
    name: "Fin and Flounder",
    logo: "/suppliers/fin-and-flounder.png",
  },

  "Crazy Dan's House of Meat": {
    name: "Crazy Dan's House of Meat",
    logo: "/suppliers/crazy-dans.png",
  },
"Tazaki Foods": {
  name: "Tazaki Foods",
  logo: "/suppliers/tazaki-foods.png",
  email: "japanesesales@tazakifoods.com",
  orderMethod: "Email",
},
  Mexgrocer: {
    name: "Mexgrocer",
    logo: "/suppliers/mexgrocer.png",
  },

  "Woods Fine Foods": {
    name: "Woods Fine Foods",
    logo: "/suppliers/woods.png",
  },

  "Ascot Wholesale": {
    name: "Ascot Wholesale",
    logo: "/suppliers/ascot-wholesale.png",
  },

  "Big K Charcoal": {
    name: "Big K Charcoal",
    logo: "/suppliers/big-k.png",
  },

  "Raynor Hygiene": {
    name: "Raynor Hygiene",
    logo: "/suppliers/raynor-hygiene.png",
  },

  "Oui Chef": {
    name: "Oui Chef",
    logo: "/suppliers/oui-chef.png",
  },

  "James Knight of Mayfair": {
    name: "James Knight of Mayfair",
    logo: "/suppliers/james-knight.png",
  },

  "Albion Fine Foods": {
    name: "Albion Fine Foods",
    logo: "/suppliers/albion.png",
  },

  Masafina: {
    name: "Masafina",
    logo: "/suppliers/masafina.png",
  },

  "Spitalfields Fruit & Veg": {
    name: "Spitalfields Fruit & Veg",
    logo: "/suppliers/spitalfields.png",
  },
};

export function getSupplierLogo(supplierName: string) {
  return suppliers[supplierName]?.logo ?? null;
}
