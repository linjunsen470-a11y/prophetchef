export interface SanityImage {
  _type?: "image";
  assetRef?: string;
  asset?: {
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
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: SanityImage;
  noIndex?: boolean;
}

export interface CtaButton {
  text?: string;
  href?: string;
}

export interface FaqItem {
  _key?: string;
  question: string;
  answer: string;
}

export interface PageHeroData {
  eyebrow?: string;
  title?: string;
  description?: string;
  backgroundImage?: SanityImage;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
}

export interface SectionHeaderData {
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: CtaButton;
}

export interface StatItem {
  _key?: string;
  value?: string;
  label: string;
  icon?: string;
}

export interface TextCard {
  _key?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface MediaTextSection {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  image?: SanityImage;
  bullets?: string[];
  cta?: CtaButton;
}

export interface ProductFeature {
  _key?: string;
  title: string;
  description?: string;
}

export interface ProductSpecification {
  _key?: string;
  label: string;
  value: string;
}

export interface ProductVariant {
  _key?: string;
  productNameEn?: string;
  productNameZh?: string;
  modelCode: string;
  lengthMm?: string;
  widthMm?: string;
  heightMm?: string;
  powerKw?: string;
  voltageV?: string;
  frequencyHz?: string;
  extraLabelEn?: string;
  extraValue?: string;
  extraUnit?: string;
  sourceImage?: string;
  sourceNote?: string;
  needsReview?: boolean;
  orderRank?: number;
}

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: string;
  description?: string;
  image?: SanityImage;
}

export interface NewsCategory {
  _id: string;
  _type: "newsCategory";
  title: string;
  slug: string;
  description?: string;
}

export interface Product {
  _id: string;
  _type: "product";
  id: string; // Internal ID
  _updatedAt?: string;
  updatedAt?: string;
  name: string;
  nameZh?: string;
  slug: string;
  category?: Category;
  description: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  features?: ProductFeature[];
  specifications?: ProductSpecification[];
  faqs?: FaqItem[];
  tags: string[];
  modelCode?: string;
  catalogPageId?: number;
  catalogPageNo?: number;
  catalogPageCode?: string;
  sourceNote?: string;
  variants?: ProductVariant[];
  isArchived?: boolean;
  seo?: SeoData;
}

export interface Application {
  _id: string;
  _type: "application";
  id: string;
  name: string;
  slug: string;
  description?: string;
  recommended?: string;
  image?: SanityImage;
  quoteProductName?: string;
  orderRank?: number;
}

export interface Certificate {
  _id: string;
  _type: "certificate";
  id: string;
  title: string;
  shortLabel: string;
  description?: string;
  icon?: string;
  orderRank?: number;
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
  coverImage?: SanityImage;
  date: string;
  _updatedAt?: string;
  updatedAt?: string;
  category?: NewsCategory;
  slug: string;
  tags?: string[];
  body?: NewsBlock[];
  faqs?: FaqItem[];
  isArchived?: boolean;
  seo?: SeoData;
}

export interface HomePageSettings {
  title: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    backgroundImage?: SanityImage;
    primaryCta?: CtaButton;
    secondaryCta?: CtaButton;
    trustTags?: string[];
    proofItems?: StatItem[];
  };
  categorySection?: SectionHeaderData;
  featuredCategories?: Category[];
  featuredProductsSection?: SectionHeaderData;
  featuredProducts?: Product[];
  factoryPreview?: MediaTextSection;
  applicationsPreviewSection?: SectionHeaderData;
  featuredApplications?: Application[];
  certificatesPreviewSection?: SectionHeaderData;
  featuredCertificates?: Certificate[];
  newsSection?: {
    title?: string;
    subtitle?: string;
    articles?: NewsItem[];
  };
  seo?: SeoData;
}

export interface SiteSettings {
  _updatedAt?: string;
  title: string;
  legalName?: string;
  description?: string;
  siteUrl?: string;
  logo?: SanityImage;
  logoLight?: SanityImage;
  logoDark?: SanityImage;
  contactInfo?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
  };
  mainNavigation?: Array<{
    _key?: string;
    label: string;
    href: string;
  }>;
  footerProductLinks?: Array<{
    _key?: string;
    label: string;
    href: string;
  }>;
  footerCompanyLinks?: Array<{
    _key?: string;
    label: string;
    href: string;
  }>;
  footerBadges?: StatItem[];
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  globalCta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryCta?: CtaButton;
    whatsappText?: string;
    whatsappMessage?: string;
  };
  globalSeo?: SeoData;
}

export interface ProductsPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  metrics?: StatItem[];
  seo?: SeoData;
}

export interface NewsPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  seo?: SeoData;
}

export interface FactoryPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  overview?: MediaTextSection;
  stats?: StatItem[];
  productionHeader?: SectionHeaderData;
  productionSteps?: TextCard[];
  teamHeader?: SectionHeaderData;
  teamItems?: TextCard[];
  marketsHeader?: SectionHeaderData;
  exportMarkets?: StatItem[];
  seo?: SeoData;
}

export interface ApplicationsPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  gridHeader?: SectionHeaderData;
  featuredApplications?: Application[];
  solutionsHeader?: SectionHeaderData;
  solutionDetails?: Array<{
    _key?: string;
    title: string;
    painPoints?: string;
    recommendedEquipment?: string;
    benefits?: string;
    cta?: CtaButton;
  }>;
  seo?: SeoData;
}

export interface CertificatesPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  certificatesHeader?: SectionHeaderData;
  featuredCertificates?: Certificate[];
  processHeader?: SectionHeaderData;
  processSteps?: string[];
  documentationCta?: {
    title?: string;
    description?: string;
    button?: CtaButton;
  };
  seo?: SeoData;
}

export interface ContactPageSettings {
  _updatedAt?: string;
  title?: string;
  hero?: PageHeroData;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  seo?: SeoData;
}
