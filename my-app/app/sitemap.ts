import { MetadataRoute } from "next";
import { absoluteUrl, getSitemapEntries } from "@/lib/sitemap";
import { getSiteSettings } from "@/sanity/queries";
import { getSiteUrl } from "@/lib/site-settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, settings] = await Promise.all([
    getSitemapEntries(),
    getSiteSettings({ stega: false }),
  ]);
  const siteUrl = getSiteUrl(settings);

  return entries.map((entry) => ({
    url: absoluteUrl(entry.path, siteUrl),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
