import { sanityFetch } from "./client";
import type { NewsItem, Product } from "./types";

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

const productFields = `
  "id": _id,
  name,
  "slug": slug.current,
  category,
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

export async function getRelatedProducts(category: string, slug: string, options: QueryOptions = {}) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && category == $category && slug.current != $slug && !isArchived] | order(coalesce(orderRank, 9999) asc, name asc)[0...4] {${productFields}}`,
    params: { category, slug },
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
