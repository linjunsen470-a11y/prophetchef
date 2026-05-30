import { HeroSection } from "@/components/home/HeroSection";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FactoryPreview } from "@/components/home/FactoryPreview";
import { ApplicationsPreview } from "@/components/home/ApplicationsPreview";
import { CertificatesPreview } from "@/components/home/CertificatesPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CTASection } from "@/components/common/CTASection";
import { getHomePageSettings } from "@/sanity/queries";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getHomePageSettings({ stega: false });
  const seo = settings?.seo;
  const title = seo?.metaTitle || settings?.title || siteConfig.title;
  const description = seo?.metaDescription || siteConfig.description;
  const ogImage = seo?.openGraphImage?.url || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl || siteConfig.url,
    },
    openGraph: {
      title,
      description,
      url: seo?.canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: ogImage ? [{ url: ogImage, alt: seo?.openGraphImage?.alt || title }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function Home() {
  const settings = await getHomePageSettings();

  return (
    <>
      <HeroSection data={settings?.hero} />
      <ProductCategories categories={settings?.featuredCategories} />
      <FeaturedProducts products={settings?.featuredProducts} />
      <FactoryPreview />
      <ApplicationsPreview />
      <CertificatesPreview />
      <NewsPreview data={settings?.newsSection} />
      <CTASection />
    </>
  );
}

