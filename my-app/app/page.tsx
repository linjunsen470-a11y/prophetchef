import { HeroSection } from "@/components/home/HeroSection";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FactoryPreview } from "@/components/home/FactoryPreview";

import { ApplicationsPreview } from "@/components/home/ApplicationsPreview";
import { CertificatesPreview } from "@/components/home/CertificatesPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CTASection } from "@/components/common/CTASection";
import { getHomePageSettings, getSiteSettings } from "@/sanity/queries";
import { siteConfig } from "@/data/site";
import { buildSeoMetadata } from "@/lib/seo";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, siteSettings] = await Promise.all([
    getHomePageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const rawSeo = settings?.seo;
  const seo = rawSeo?.metaTitle?.trim().toLowerCase() === "prophetchef homepage" ? { ...rawSeo, metaTitle: undefined } : rawSeo;
  const title = siteConfig.title;
  const description = seo?.metaDescription || siteConfig.description;
  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: getSiteUrl(siteSettings),
    image: seo?.openGraphImage || { url: siteConfig.ogImage, alt: title },
    siteName: getSiteName(siteSettings),
  });
}

export default async function Home() {
  const settings = await getHomePageSettings();

  return (
    <>
      <HeroSection data={settings?.hero} />
      <ProductCategories categories={settings?.featuredCategories} header={settings?.categorySection} />
      <FeaturedProducts products={settings?.featuredProducts} header={settings?.featuredProductsSection} />
      <FactoryPreview data={settings?.factoryPreview} />
      <ApplicationsPreview
        applications={settings?.featuredApplications}
        header={settings?.applicationsPreviewSection}
      />
      <CertificatesPreview
        certificates={settings?.featuredCertificates}
        header={settings?.certificatesPreviewSection}
      />
      <NewsPreview data={settings?.newsSection} />
      <CTASection />
    </>
  );
}



