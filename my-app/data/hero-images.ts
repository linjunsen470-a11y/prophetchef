import { applicationHeroImage } from "@/data/application-images";

export const heroImages = {
  home: "/images/factory/hero-home-factory.webp",
  products: "/images/factory/hero-products-showroom.webp",
  factory: "/images/factory/hero-factory-yard.webp",
  applications: applicationHeroImage.src,
  certificates: "/images/factory/hero-certificates-workshop.webp",
  news: "/images/factory/hero-news-showroom.webp",
  contact: "/images/factory/hero-contact-factory.webp",
  fallback: "/images/hero-dark.webp",
} as const;
