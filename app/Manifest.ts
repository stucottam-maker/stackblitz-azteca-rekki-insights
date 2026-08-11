import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kitchen Insights",
    short_name: "Kitchen Insights",
    description:
      "Kitchen cost control, ordering, stock, invoices and recipe management.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#173f35",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
