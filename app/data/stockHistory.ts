export type HistoricalStockItem = {
    category: string;
    storage: string;
    name: string;
    quantity: number | string | null;
    unit: string;
    notes: string;
  };
  
  export type HistoricalStockTake = {
    id: string;
    date: string;
    label: string;
    sourceSheet: string;
    items: HistoricalStockItem[];
  };
  
  type RawItem = [
    string,
    string,
    string,
    number | string | null,
    string,
    string
  ];
  
  type RawTake = [
    string,
    string,
    string,
    string,
    RawItem[]
  ];
  
  const raw: RawTake[] = [
    [
      "stock-2026-04-29",
      "2026-04-29",
      "29 Apr 2026",
      "294",
      [
        ["MEAT", "Chilled", "Lamb cutlets", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Pork belly chicharron", 6.7, "kg", ""],
        ["MEAT", "Chilled", "Half chicken", 6.5, "kg", ""],
        ["MEAT", "Chilled", "Short rib", 5.7, "kg", ""],
        ["MEAT", "Chilled", "Ribeye", "12 x 300g / 2.5", "kg", ""],
        ["MEAT", "Chilled", "Tomahawk", 1.3, "kg", ""],
        ["MEAT", "Chilled", "Birria", 2.5, "kg", ""],
        ["MEAT", "Chilled", "Carnitas service", 6.5, "kg", ""],
        ["MEAT", "Chilled", "Chicken thigh pastor marinade", 11, "kg", ""],
  
        ["FISH", "Chilled", "Tempura prawns", 3.8, "kg", ""],
        ["FISH", "Chilled", "26/30 prawn", 2.8, "kg", ""],
        ["FISH", "Chilled", "Tuna", 1.25, "kg", "Sliced"],
        ["FISH", "Chilled", "Stonebass", "600g cut + 6.5kg unprepped", "", ""],
        ["FISH", "Dry/Prep", "Katsuoboshi", 500, "g", ""],
        ["FISH", "Chilled", "Trout", 500, "g", "Sliced"],
        ["FISH", "Chilled", "Black cod", 867, "g", "pending freezer"],
        ["FISH", "Chilled", "Cod", 1.9, "kg", ""],
  
        ["PREPPED VEG / SECTION", "Chilled", "Hispi cabbage cooked", 4.2, "kg", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Corn on the cob", 2, "kg", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Pink fur potatoes cooked", 5, "kg", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Edamame pods", 500, "g", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Edamame beans", 1, "kg", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Edible flowers", 2, "punnet", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Cherry tomato", 1, "punnet", ""],
        ["PREPPED VEG / SECTION", "Chilled", "Dill", 1, "bunch", ""],
        ["PREPPED VEG / SECTION", "Prep", "Totopos fried", 6, "kg", ""],
  
        ["OILS", "Dry/Prep", "Charcoal oil", 5, "l", ""],
        ["OILS", "Dry/Prep", "Pepita oil", 5, "l", ""],
        ["OILS", "Dry/Prep", "Rapeseed Oil", 200, "l", ""],
  
        ["DRY GOODS", "Dry", "Corn flour", 3, "kg", ""],
        ["DRY GOODS", "Dry", "Rice flour", 0, "kg", ""],
        ["DRY GOODS", "Dry", "Potato flour", 0, "kg", ""],
        ["DRY GOODS", "Dry", "Gram flour", 0, "kg", ""],
        ["DRY GOODS", "Dry", "Sugar", 0, "kg", ""],
        ["DRY GOODS", "Dry", "Salt", 0, "kg", ""],
        ["DRY GOODS", "Dry", "Black pepper", 0, "kg", ""],
  
        ["DAIRY", "Chilled", "Butter", 0, "kg", ""],
        ["DAIRY", "Chilled", "Comté", 0, "kg", ""],
  
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Miso", 0, "kg", ""],
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Mirin", 0, "l", ""],
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Sake", 0, "l", ""],
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Rice vinegar", 0, "l", ""],
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Fish sauce", 0, "l", ""],
        ["SAUCES / CONDIMENTS", "Dry/Prep", "Aji Amarillo", 0, "kg", ""],
  
        ["HERBS / PRODUCE", "Chilled", "Coriander", 0, "kg", ""],
        ["HERBS / PRODUCE", "Chilled", "Chives", 0, "kg", ""],
        ["HERBS / PRODUCE", "Chilled", "Garlic", 0, "kg", ""],
        ["HERBS / PRODUCE", "Chilled", "Spring onion", 0, "kg", ""],
        ["HERBS / PRODUCE", "Chilled", "Lime", 0, "kg", ""],
  
        ["TORTILLAS", "Dry", "Masafina tortilla 12cm", 0, "each", ""],
        ["TORTILLAS", "Dry", "Masafina tortilla 10cm", 0, "each", ""],
        ["TORTILLAS", "Dry", "Masafina blue corn tortilla 12cm", 0, "each", ""]
      ]
    ],
  
    [
      "stock-2026-05-29",
      "2026-05-29",
      "29 May 2026",
      "295",
      [
        ["MEAT", "Chilled", "Lamb cutlets", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Pork belly chicharron", 10, "kg", ""],
        ["MEAT", "Chilled", "Half chicken", 4.7, "kg", ""],
        ["MEAT", "Chilled", "Short rib", 8, "kg", ""],
        ["MEAT", "Chilled", "Ribeye", 34.5, "kg", ""],
        ["MEAT", "Chilled", "Tomahawk", 1.225, "kg", ""],
        ["MEAT", "Chilled", "Birria", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Carnitas service", 6.7, "kg", ""],
        ["MEAT", "Chilled", "Chicken thigh pastor marinade", 8.6, "kg", ""],
        ["MEAT", "", "pork belly skin", 5, "", ""],
  
        ["FISH", "Chilled", "Tempura prawns", 0.54, "kg", ""],
        ["FISH", "Chilled", "26/30 prawn", 6, "kg", ""],
        ["FISH", "Chilled", "Tuna", 0.4, "kg", "Sliced"],
        ["FISH", "Chilled", "Stonebass", 3.2, "kg", ""],
  
        ["DRY GOODS", "Dry", "Cornflour", 3, "kg", ""]
      ]
    ],
  
    [
      "stock-2026-06-30",
      "2026-06-30",
      "30 Jun 2026",
      "306",
      [
        ["MEAT", "Chilled", "Lamb cutlets", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Pork belly chicharron", 10, "kg", ""],
        ["MEAT", "Chilled", "Half chicken", 4.7, "kg", ""],
        ["MEAT", "Chilled", "Short rib", 8, "kg", ""],
        ["MEAT", "Chilled", "Ribeye", 34.5, "kg", ""],
        ["MEAT", "Chilled", "Tomahawk", 1.225, "kg", ""],
        ["MEAT", "Chilled", "Birria", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Carnitas service", 6.7, "kg", ""],
        ["MEAT", "Chilled", "Chicken thigh pastor marinade", 8.6, "kg", ""],
  
        ["FISH", "Chilled", "Tempura prawns", 0.54, "kg", ""],
        ["FISH", "Chilled", "26/30 prawn", 6, "kg", ""],
        ["FISH", "Chilled", "Tuna", 0.4, "kg", ""],
        ["FISH", "Chilled", "Stonebass", 3.2, "kg", ""],
  
        ["DRY GOODS", "Dry", "Cornflour", 3, "kg", ""]
      ]
    ],
  
    [
      "stock-2026-07-31",
      "2026-07-31",
      "31 Jul 2026",
      "317",
      [
        ["MEAT", "Chilled", "Lamb cutlets", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Pork belly chicharron", 10, "kg", "9kg cooked, 15 uncooked"],
        ["MEAT", "Chilled", "Half chicken", 4.7, "kg", ""],
        ["MEAT", "Chilled", "Short rib", 8, "kg", ""],
        ["MEAT", "Chilled", "Ribeye", 34.5, "kg", ""],
        ["MEAT", "Chilled", "Tomahawk", 1.225, "kg", ""],
        ["MEAT", "Chilled", "Birria", 2.2, "kg", ""],
        ["MEAT", "Chilled", "Carnitas service", 6.7, "kg", ""],
        ["MEAT", "Chilled", "Chicken thigh pastor marinade", 8.6, "kg", ""],
        ["MEAT", "", "pork belly skin", 5, "", ""],
  
        ["FISH", "Chilled", "Tempura prawns", 0.54, "kg", ""],
        ["FISH", "Chilled", "26/30 prawn", 6, "kg", ""],
        ["FISH", "Chilled", "Tuna", 0.4, "kg", "Sliced"],
        ["FISH", "Chilled", "Stonebass", 3.2, "kg", ""],
  
        ["DRY GOODS", "Dry", "Cornflour", 3, "kg", ""]
      ]
    ]
  ];
  
  export const historicalStockTakes: HistoricalStockTake[] =
    raw.map(
      ([id, date, label, sourceSheet, items]) => ({
        id,
        date,
        label,
        sourceSheet,
        items: items.map(
          ([
            category,
            storage,
            name,
            quantity,
            unit,
            notes,
          ]) => ({
            category,
            storage,
            name,
            quantity,
            unit,
            notes,
          })
        ),
      })
    );
  
  export const latestHistoricalStockTake =
    historicalStockTakes[
      historicalStockTakes.length - 1
    ];