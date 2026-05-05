import { newsItems } from "@/data/news";
import { products } from "@/data/products";

export type SitemapGroup = "Core" | "Products" | "News";

export interface SitemapEntry {
  path: string;
  title: string;
  group: SitemapGroup;
  lastModified: Date;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", title: "Home", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "weekly", priority: 1 },
  { path: "/products", title: "Products", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "weekly", priority: 0.9 },
  { path: "/factory", title: "Factory", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "monthly", priority: 0.8 },
  { path: "/applications", title: "Applications", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "monthly", priority: 0.8 },
  { path: "/certificates", title: "Certificates", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", title: "News", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", title: "Contact", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", title: "Privacy Policy", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", title: "Terms of Service", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "yearly", priority: 0.3 },
];

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://prokitchentech.com").replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path === "/" ? "" : path}`;
}

export function getSitemapEntries(): SitemapEntry[] {
  const productEntries = products.map<SitemapEntry>((product) => ({
    path: `/products/${product.slug}`,
    title: product.name,
    group: "Products",
    lastModified: new Date("2026-05-05"),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const newsEntries = newsItems.map<SitemapEntry>((item) => ({
    path: `/news/${item.slug}`,
    title: item.title,
    group: "News",
    lastModified: new Date(item.date),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...productEntries, ...newsEntries];
}

export function groupSitemapEntries() {
  return getSitemapEntries().reduce<Record<SitemapGroup, SitemapEntry[]>>(
    (groups, entry) => {
      groups[entry.group].push(entry);
      return groups;
    },
    { Core: [], Products: [], News: [] },
  );
}
