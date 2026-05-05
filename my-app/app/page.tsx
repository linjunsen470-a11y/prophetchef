import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FactoryPreview } from "@/components/home/FactoryPreview";
import { ApplicationsPreview } from "@/components/home/ApplicationsPreview";
import { CertificatesPreview } from "@/components/home/CertificatesPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CTASection } from "@/components/common/CTASection";
import { getHomePageSettings } from "@/sanity/queries";

export default async function Home() {
  const settings = await getHomePageSettings();

  return (
    <>
      <HeroSection />
      <TrustBar />
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


