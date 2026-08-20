import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kitchen Insights",
    short_name: "Kitchen Insights",
    description: "Kitchen cost control, purchasing, invoices, stock and recipe costing.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#214f3d",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "food"],
    icons: [
      {
        src: "/pwa-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
