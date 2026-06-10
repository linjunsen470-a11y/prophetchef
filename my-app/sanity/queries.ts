import { sanityFetch } from "./client";
import type {
  Application,
  ApplicationsPageSettings,
  Category,
  Certificate,
  CertificatesPageSettings,
  ContactPageSettings,
  FactoryPageSettings,
  HomePageSettings,
  NewsItem,
  NewsPageSettings,
  Product,
  ProductsPageSettings,
  SiteSettings,
} from "./types";

interface QueryOptions {
  stega?: boolean;
  perspective?: "published" | "drafts";
}

const seoFields = `
  metaTitle,
  metaDescription,
  canonicalUrl,
  openGraphTitle,
  openGraphDescription,
  "openGraphImage": openGraphImage {
    "url": asset->url,
    alt
  },
  noIndex
`;

const imageFields = `
  "url": asset->url,
  alt
`;

const ctaFields = `
  text,
  href
`;

const pageHeroFields = `
  eyebrow,
  title,
  description,
  "backgroundImage": backgroundImage {
    ${imageFields}
  },
  "primaryCta": primaryCta { ${ctaFields} },
  "secondaryCta": secondaryCta { ${ctaFields} }
`;

const sectionHeaderFields = `
  eyebrow,
  title,
  description,
  "cta": cta { ${ctaFields} }
`;

const statFields = `
  _key,
  value,
  label,
  icon
`;

const textCardFields = `
  _key,
  title,
  description,
  icon
`;

const mediaTextSectionFields = `
  eyebrow,
  title,
  "paragraphs": coalesce(paragraphs, []),
  "image": image {
    ${imageFields}
  },
  "bullets": coalesce(bullets, []),
  "cta": cta { ${ctaFields} }
`;

const categoryFields = `
  _id,
  _type,
  "id": _id,
  name,
  "slug": slug.current,
  description,
  "image": image {
    ${imageFields}
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
    ${imageFields}
  },
  "gallery": gallery[] {
    ${imageFields}
  },
  "features": features[] {
    _key,
    title,
    description
  },
  "specifications": specifications[] {
    _key,
    label,
    value
  },
  "faqs": coalesce(faqs, []),
  "tags": coalesce(tags, []),
  modelCode,
  isArchived,
  "seo": seo { ${seoFields} }
`;

const newsCategoryFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  description
`;

const newsFields = `
  "id": _id,
  _updatedAt,
  "updatedAt": _updatedAt,
  title,
  excerpt,
  "coverImage": coverImage {
    ${imageFields}
  },
  "date": coalesce(publishedAt, _createdAt),
  "category": category-> { ${newsCategoryFields} },
  "tags": coalesce(tags, []),
  "slug": slug.current,
  body,
  "faqs": coalesce(faqs, []),
  isArchived,
  "seo": seo { ${seoFields} }
`;

const applicationFields = `
  _id,
  _type,
  "id": _id,
  name,
  "slug": slug.current,
  description,
  recommended,
  "image": image {
    ${imageFields}
  },
  quoteProductName,
  orderRank
`;

const certificateFields = `
  _id,
  _type,
  "id": _id,
  title,
  shortLabel,
  description,
  icon,
  orderRank
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

export async function getProductSlugs(): Promise<{ slug: string }[]> {
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

export async function getApplications(options: QueryOptions = {}) {
  return sanityFetch<Application[]>({
    query: `*[_type == "application" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, name asc) {${applicationFields}}`,
    ...options,
  });
}

export async function getCertificates(options: QueryOptions = {}) {
  return sanityFetch<Certificate[]>({
    query: `*[_type == "certificate"] | order(coalesce(orderRank, 9999) asc, title asc) {${certificateFields}}`,
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

export async function getNewsSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>({
    query: `*[_type == "newsArticle" && defined(slug.current) && !isArchived] {"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function getHomePageSettings(options: QueryOptions = {}) {
  return sanityFetch<HomePageSettings | null>({
    query: `*[_id == "homePage" || _type == "homePage"][0] {
      title,
      hero {
        eyebrow,
        title,
        description,
        "backgroundImage": backgroundImage {
          ${imageFields}
        },
        "primaryCta": primaryCta { ${ctaFields} },
        "secondaryCta": secondaryCta { ${ctaFields} },
        "trustTags": coalesce(trustTags, []),
        "proofItems": proofItems[] { ${statFields} }
      },
      "categorySection": categorySection { ${sectionHeaderFields} },
      "featuredCategories": featuredCategories[]-> { ${categoryFields} },
      "featuredProductsSection": featuredProductsSection { ${sectionHeaderFields} },
      "featuredProducts": featuredProducts[]-> { ${productFields} },
      "factoryPreview": factoryPreview { ${mediaTextSectionFields} },
      "applicationsPreviewSection": applicationsPreviewSection { ${sectionHeaderFields} },
      "featuredApplications": featuredApplications[]-> { ${applicationFields} },
      "certificatesPreviewSection": certificatesPreviewSection { ${sectionHeaderFields} },
      "featuredCertificates": featuredCertificates[]-> { ${certificateFields} },
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
    query: `*[_id == "siteSettings" || _type == "siteSettings"][0] {
      _updatedAt,
      title,
      legalName,
      description,
      siteUrl,
      "logo": logo { ${imageFields} },
      contactInfo,
      "mainNavigation": mainNavigation[] {
        _key,
        "label": label,
        href
      },
      "footerProductLinks": footerProductLinks[] {
        _key,
        "label": label,
        href
      },
      "footerCompanyLinks": footerCompanyLinks[] {
        _key,
        "label": label,
        href
      },
      "footerBadges": footerBadges[] { ${statFields} },
      socialLinks,
      "globalCta": globalCta {
        eyebrow,
        title,
        description,
        "primaryCta": primaryCta { ${ctaFields} },
        whatsappText,
        whatsappMessage
      },
      "globalSeo": globalSeo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getProductsPageSettings(options: QueryOptions = {}) {
  return sanityFetch<ProductsPageSettings | null>({
    query: `*[_id == "productsPage" || _type == "productsPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      "metrics": metrics[] { ${statFields} },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getNewsPageSettings(options: QueryOptions = {}) {
  return sanityFetch<NewsPageSettings | null>({
    query: `*[_id == "newsPage" || _type == "newsPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getFactoryPageSettings(options: QueryOptions = {}) {
  return sanityFetch<FactoryPageSettings | null>({
    query: `*[_id == "factoryPage" || _type == "factoryPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      "overview": overview { ${mediaTextSectionFields} },
      "stats": stats[] { ${statFields} },
      "productionHeader": productionHeader { ${sectionHeaderFields} },
      "productionSteps": productionSteps[] { ${textCardFields} },
      "teamHeader": teamHeader { ${sectionHeaderFields} },
      "teamItems": teamItems[] { ${textCardFields} },
      "marketsHeader": marketsHeader { ${sectionHeaderFields} },
      "exportMarkets": exportMarkets[] { ${statFields} },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getApplicationsPageSettings(options: QueryOptions = {}) {
  return sanityFetch<ApplicationsPageSettings | null>({
    query: `*[_id == "applicationsPage" || _type == "applicationsPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      "gridHeader": gridHeader { ${sectionHeaderFields} },
      "featuredApplications": featuredApplications[]-> { ${applicationFields} },
      "solutionsHeader": solutionsHeader { ${sectionHeaderFields} },
      "solutionDetails": solutionDetails[] {
        _key,
        title,
        painPoints,
        recommendedEquipment,
        benefits,
        "cta": cta { ${ctaFields} }
      },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getCertificatesPageSettings(options: QueryOptions = {}) {
  return sanityFetch<CertificatesPageSettings | null>({
    query: `*[_id == "certificatesPage" || _type == "certificatesPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      "certificatesHeader": certificatesHeader { ${sectionHeaderFields} },
      "featuredCertificates": featuredCertificates[]-> { ${certificateFields} },
      "processHeader": processHeader { ${sectionHeaderFields} },
      "processSteps": coalesce(processSteps, []),
      documentationCta {
        title,
        description,
        "button": button { ${ctaFields} }
      },
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}

export async function getContactPageSettings(options: QueryOptions = {}) {
  return sanityFetch<ContactPageSettings | null>({
    query: `*[_id == "contactPage" || _type == "contactPage"][0] {
      _updatedAt,
      title,
      "hero": hero { ${pageHeroFields} },
      eyebrow,
      heading,
      lead,
      "seo": seo { ${seoFields} }
    }`,
    ...options,
  });
}
