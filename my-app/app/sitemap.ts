import { MetadataRoute } from "next";
import { absoluteUrl, getSitemapEntries } from "@/lib/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();

  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
