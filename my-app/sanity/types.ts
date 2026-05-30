export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  url?: string;
  alt: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  openGraphImage?: SanityImage;
}

export interface ProductFeature {
  title: string;
  description?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: string;
  description?: string;
  image?: SanityImage;
}

export interface Product {
  _id: string;
  _type: "product";
  id: string; // Internal ID
  name: string;
  slug: string;
  category?: Category;
  description: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
  tags: string[];
  modelCode?: string;
  isArchived: boolean;
  seo?: SeoData;
}

export interface NewsBlockChild {
  _key: string;
  text?: string;
}

export interface NewsBlock {
  _key: string;
  _type: string;
  style?: string;
  listItem?: string;
  children?: NewsBlockChild[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  coverImage: SanityImage;
  date: string;
  category: string;
  slug: string;
  tags?: string[];
  body?: NewsBlock[];
  isArchived: boolean;
  seo?: SeoData;
}

export interface HomePageSettings {
  title: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: {
      text?: string;
      link?: string;
    };
  };
  featuredCategories?: Category[];
  featuredProducts?: Product[];
  newsSection?: {
    title?: string;
    subtitle?: string;
    articles?: NewsItem[];
  };
  seo?: SeoData;
}

export interface SiteSettings {
  title: string;
  description?: string;
  logo?: SanityImage;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  globalSeo?: SeoData;
}
