import { sanityFetch } from "./client";
import type { NewsItem, Product, Category, HomePageSettings, SiteSettings } from "./types";

interface QueryOptions {
  stega?: boolean;
  perspective?: "published" | "drafts";
}

const seoFields = `
  metaTitle,
  metaDescription,
  canonicalUrl,
  "openGraphImage": openGraphImage {
    "url": asset->url,
    alt
  }
`;

const categoryFields = `
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  description,
  "image": image {
    "url": asset->url,
    alt
  }
`;

const productFields = `
  _id,
  "id": _id,
  _updatedAt,
  "updatedAt": _updatedAt,
  name,
  "slug": slug.current,
  "category": category-> { ${categoryFields} },
  description,
  "coverImage": coverImage {
    "url": asset->url,
    alt
  },
  "gallery": gallery[] {
    "url": asset->url,
    alt
  },
  "features": coalesce(features, []),
  "specifications": coalesce(specifications, []),
  "tags": coalesce(tags, []),
  modelCode,
  isArchived,
  "seo": seo { ${seoFields} }
`;

const newsFields = `
  "id": _id,
  _updatedAt,
  "updatedAt": _updatedAt,
  title,
  excerpt,
  "coverImage": coverImage {
    "url": asset->url,
    alt
  },
  "date": coalesce(publishedAt, _createdAt),
  category,
  "tags": coalesce(tags, []),
  "slug": slug.current,
  body,
  isArchived,
  "seo": seo { ${seoFields} }
`;

export async function getProducts(options: QueryOptions = {}) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && defined(slug.current) && !isArchived] | order(coalesce(orderRank, 9999) asc, name asc) {${productFields}}`,
    ...options,
  });
}

export async function getProduct(slug: string, options: QueryOptions = {}) {
  return sanityFetch<Product | null>({
    query: `*[_type == "product" && slug.current == $slug && !isArchived][0] {${productFields}}`,
    params: { slug },
    ...options,
  });
}

export async function getProductSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "product" && defined(slug.current) && !isArchived] {"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function getRelatedProducts(categoryId: string | undefined, slug: string, options: QueryOptions = {}) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && category._ref == $categoryId && slug.current != $slug && !isArchived] | order(coalesce(orderRank, 9999) asc, name asc)[0...4] {${productFields}}`,
    params: { categoryId: categoryId || "", slug },
    ...options,
  });
}

export async function getCategories(options: QueryOptions = {}) {
  return sanityFetch<Category[]>({
    query: `*[_type == "category"] | order(orderRank asc, name asc) {${categoryFields}}`,
    ...options,
  });
}

export async function getNewsItems(options: QueryOptions = {}) {
  return sanityFetch<NewsItem[]>({
    query: `*[_type == "newsArticle" && defined(slug.current) && !isArchived] | order(publishedAt desc, _createdAt desc) {${newsFields}}`,
    ...options,
  });
}

export async function getNewsItem(slug: string, options: QueryOptions = {}) {
  return sanityFetch<NewsItem | null>({
    query: `*[_type == "newsArticle" && slug.current == $slug && !isArchived][0] {${newsFields}}`,
    params: { slug },
    ...options,
  });
}

export async function getNewsSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "newsArticle" && defined(slug.current) && !isArchived] {"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function getHomePageSettings(options: QueryOptions = {}) {
  return sanityFetch<HomePageSettings | null>({
    query: `*[_type == "homePage"][0] {
      title,
      hero {
        eyebrow,
        title,
        description,
        cta
      },
      "featuredCategories": featuredCategories[]-> { ${categoryFields} },
      "featuredProducts": featuredProducts[]-> { ${productFields} },
      "newsSection": {
        title,
        subtitle,
        "articles": articles[]-> { ${newsFields} }
      },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getSiteSettings(options: QueryOptions = {}) {
  return sanityFetch<SiteSettings | null>({
    query: `*[_type == "siteSettings"][0] {
      _updatedAt,
      title,
      description,
      "logo": logo { "url": asset->url },
      contactInfo,
      socialLinks,
      "globalSeo": globalSeo { ${seoFields} }
    }`,
    ...options,
  });
}
