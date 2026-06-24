import {
  getApplications,
  getApplicationsPageSettings,
  getCategories,
  getCertificatesPageSettings,
  getContactPageSettings,
  getFactoryPageSettings,
  getHomePageSettings,
  getNewsPageSettings,
  getNewsSitemapEntries,
  getProductSitemapEntries,
  getProductsPageSettings,
  getSiteSettings,
} from "@/sanity/queries";
import { siteConfig } from "@/data/site";
import { normalizeSiteUrl } from "@/lib/site-url";

export type SitemapGroup = "Core" | "Categories" | "Products" | "Applications" | "News";

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
  { path: "/sitemap", title: "Sitemap", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", title: "Privacy Policy", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", title: "Terms of Service", group: "Core", lastModified: new Date("2026-05-05"), changeFrequency: "yearly", priority: 0.3 },
];

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url);
}

export function absoluteUrl(path: string, siteUrl?: string) {
  const base = siteUrl || getSiteUrl();
  return `${base}${path === "/" ? "" : path}`;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [
    categories,
    products,
    applications,
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
    getCategories({ stega: false }),
    getProductSitemapEntries(),
    getApplications({ stega: false }),
    getNewsSitemapEntries(),
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
    .map((entry) => ({
      ...entry,
      lastModified: fallbackDate,
    }));

  const categoryEntries = categories
    .filter((category) => !category.seo?.noIndex)
    .map<SitemapEntry>((category) => ({
      path: `/products/category/${category.slug}`,
      title: category.name,
      group: "Categories",
      lastModified: category.updatedAt ? new Date(category.updatedAt) : fallbackDate,
      changeFrequency: "monthly",
      priority: 0.75,
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

  const applicationEntries = applications
    .filter((application) => !application.seo?.noIndex)
    .map<SitemapEntry>((application) => ({
      path: `/applications/${application.slug}`,
      title: application.name,
      group: "Applications",
      lastModified: application.updatedAt ? new Date(application.updatedAt) : fallbackDate,
      changeFrequency: "monthly",
      priority: 0.7,
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

  return [...mappedStaticEntries, ...categoryEntries, ...productEntries, ...applicationEntries, ...newsEntries];
}

export async function groupSitemapEntries() {
  const entries = await getSitemapEntries();

  return entries.reduce<Record<SitemapGroup, SitemapEntry[]>>(
    (groups, entry) => {
      groups[entry.group].push(entry);
      return groups;
    },
    { Core: [], Categories: [], Products: [], Applications: [], News: [] },
  );
}

