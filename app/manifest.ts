import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kommee",
    short_name: "Kommee",
    description: "Kitchen cost control, purchasing, invoices, stock and recipe costing.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#315C46",
    theme_color: "#315C46",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "food"],
    icons: [
      {
        src: "/kommee-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/kommee-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
