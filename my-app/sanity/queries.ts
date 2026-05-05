import { sanityFetch } from "./client";
import type { NewsItem, Product } from "./types";

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

export async function getProducts() {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, name asc) {${productFields}}`,
  });
}

export async function getProduct(slug: string) {
  return sanityFetch<Product | null>({
    query: `*[_type == "product" && slug.current == $slug][0] {${productFields}}`,
    params: { slug },
  });
}

export async function getProductSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "product" && defined(slug.current)] {"slug": slug.current}`,
  });
}

export async function getRelatedProducts(category: string, slug: string) {
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && category == $category && slug.current != $slug] | order(coalesce(orderRank, 9999) asc, name asc)[0...4] {${productFields}}`,
    params: { category, slug },
  });
}

export async function getNewsItems() {
  return sanityFetch<NewsItem[]>({
    query: `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {${newsFields}}`,
  });
}

export async function getNewsItem(slug: string) {
  return sanityFetch<NewsItem | null>({
    query: `*[_type == "newsArticle" && slug.current == $slug][0] {${newsFields}}`,
    params: { slug },
  });
}

export async function getNewsSlugs() {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "newsArticle" && defined(slug.current)] {"slug": slug.current}`,
  });
}
