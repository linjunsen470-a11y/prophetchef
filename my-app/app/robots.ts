import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/sitemap";
import { getSiteSettings } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings({ stega: false });
  const siteUrl = getSiteUrl(settings);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml", siteUrl),
  };
}
