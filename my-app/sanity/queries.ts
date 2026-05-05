import { sanityFetch } from "./client";
import type { NewsItem, Product } from "./types";

interface QueryOptions {
  stega?: boolean;
  perspective?: "published" | "drafts";
}

const productFields = `
  "id": _id,
  name,
  "slug": slug.current,
  category,
  description,
  "image": imageUrl,
  "tags": coalesce(tags, []),
  modelCode
`;

const newsFields = `
  "id": _id,
  title,
  excerpt,
  "image": imageUrl,
  "date": coalesce(publishedAt, _createdAt),
  category,
  "slug": slug.current,
  body
`;

export async function getProducts(options: QueryOptions = {}) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, name asc) {${productFields}}`,
    ...options,
  });
}

export async function getProduct(slug: string, options: QueryOptions = {}) {
  return sanityFetch<Product | null>({
    query: `*[_type == "product" && slug.current == $slug][0] {${productFields}}`,
    params: { slug },
    ...options,
  });
}

export async function getProductSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "product" && defined(slug.current)] {"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function getRelatedProducts(category: string, slug: string, options: QueryOptions = {}) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && category == $category && slug.current != $slug] | order(coalesce(orderRank, 9999) asc, name asc)[0...4] {${productFields}}`,
    params: { category, slug },
    ...options,
  });
}

export async function getNewsItems(options: QueryOptions = {}) {
  return sanityFetch<NewsItem[]>({
    query: `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {${newsFields}}`,
    ...options,
  });
}

export async function getNewsItem(slug: string, options: QueryOptions = {}) {
  return sanityFetch<NewsItem | null>({
    query: `*[_type == "newsArticle" && slug.current == $slug][0] {${newsFields}}`,
    params: { slug },
    ...options,
  });
}

export async function getNewsSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "newsArticle" && defined(slug.current)] {"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}
