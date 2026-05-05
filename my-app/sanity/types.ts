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

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
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
