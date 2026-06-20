import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { NewsListClient } from "@/components/blog/NewsListClient";
import { getNewsItems, getNewsPageSettings, getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { heroImages } from "@/data/hero-images";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getNewsPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const seo = page?.seo;
  const title = page?.hero?.title || "News & Industry Insights";
  const description =
    page?.hero?.description ||
    "Commercial kitchen equipment knowledge, product selection guides and company updates.";

  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/news`,
    image: seo?.openGraphImage || page?.hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function NewsPage() {
  const [newsItems, page] = await Promise.all([getNewsItems(), getNewsPageSettings()]);
  const hero = page?.hero;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || "News"}
        title={hero?.title || "News & Industry Insights"}
        description={
          hero?.description ||
          "Commercial kitchen equipment knowledge, product selection guides and company updates."
        }
        backgroundImage={hero?.backgroundImage?.url || heroImages.news}
        backgroundImageAlt={hero?.backgroundImage?.alt || "ProphetChef Commercial Cooking Equipment News and Industry Insights"}
        compact
      />

      <section className="section">
        <NewsListClient newsItems={newsItems} />
      </section>

      <CTASection />
    </>
  );
}
