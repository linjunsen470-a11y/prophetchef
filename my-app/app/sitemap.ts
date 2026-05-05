import { MetadataRoute } from "next";
import { absoluteUrl, getSitemapEntries } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
