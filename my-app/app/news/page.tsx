import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { NewsListClient } from "@/components/blog/NewsListClient";
import { getNewsItems } from "@/sanity/queries";

export default async function NewsPage() {
  const newsItems = await getNewsItems();

  return (
    <>
      <PageHero
        eyebrow="News"
        title="News & Industry Insights"
        description="Commercial kitchen equipment knowledge, product selection guides and company updates."
        compact
      />

      <section className="section">
        <NewsListClient newsItems={newsItems} />
      </section>

      <CTASection />
    </>
  );
}
