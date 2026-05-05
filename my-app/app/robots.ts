import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
