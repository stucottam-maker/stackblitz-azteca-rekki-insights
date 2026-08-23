import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kitchen Insights",
    short_name: "Kitchen Insights",
    description: "Kitchen cost control, purchasing, invoices, stock and recipe costing.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#172554",
    theme_color: "#172554",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "food"],
    icons: [
      {
        src: "/pwa-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/pwa-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
