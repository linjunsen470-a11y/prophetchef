import {
  getApplicationsPageSettings,
  getCertificatesPageSettings,
  getContactPageSettings,
  getFactoryPageSettings,
  getHomePageSettings,
  getNewsItems,
  getNewsPageSettings,
  getProducts,
  getProductsPageSettings,
  getSiteSettings,
} from "@/sanity/queries";
import { siteConfig } from "@/data/site";

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
  return (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path === "/" ? "" : path}`;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [
    products,
    newsItems,
    settings,
    homePage,
    productsPage,
    factoryPage,
    applicationsPage,
    certificatesPage,
    newsPage,
    contactPage,
  ] = await Promise.all([
    getProducts(),
    getNewsItems(),
    getSiteSettings({ stega: false }),
    getHomePageSettings({ stega: false }),
    getProductsPageSettings({ stega: false }),
    getFactoryPageSettings({ stega: false }),
    getApplicationsPageSettings({ stega: false }),
    getCertificatesPageSettings({ stega: false }),
    getNewsPageSettings({ stega: false }),
    getContactPageSettings({ stega: false }),
  ]);

  const fallbackDate = settings?._updatedAt ? new Date(settings._updatedAt) : new Date("2026-05-30");
  const noIndexPaths = new Set(
    [
      homePage?.seo?.noIndex ? "/" : null,
      productsPage?.seo?.noIndex ? "/products" : null,
      factoryPage?.seo?.noIndex ? "/factory" : null,
      applicationsPage?.seo?.noIndex ? "/applications" : null,
      certificatesPage?.seo?.noIndex ? "/certificates" : null,
      newsPage?.seo?.noIndex ? "/news" : null,
      contactPage?.seo?.noIndex ? "/contact" : null,
    ].filter(Boolean) as string[],
  );

  const mappedStaticEntries = staticEntries
    .filter((entry) => !noIndexPaths.has(entry.path))
    .map(entry => ({
      ...entry,
      lastModified: fallbackDate
    }));

  const productEntries = products
    .filter((product) => !product.seo?.noIndex)
    .map<SitemapEntry>((product) => ({
      path: `/products/${product.slug}`,
      title: product.name,
      group: "Products",
      lastModified: product.updatedAt ? new Date(product.updatedAt) : fallbackDate,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  const newsEntries = newsItems
    .filter((item) => !item.seo?.noIndex)
    .map<SitemapEntry>((item) => ({
      path: `/news/${item.slug}`,
      title: item.title,
      group: "News",
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(item.date),
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [...mappedStaticEntries, ...productEntries, ...newsEntries];
}

export async function groupSitemapEntries() {
  const entries = await getSitemapEntries();

  return entries.reduce<Record<SitemapGroup, SitemapEntry[]>>(
    (groups, entry) => {
      groups[entry.group].push(entry);
      return groups;
    },
    { Core: [], Products: [], News: [] },
  );
}
