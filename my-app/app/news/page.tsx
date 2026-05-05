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
        backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80"
      />

      <section className="section">
        <NewsListClient newsItems={newsItems} />
      </section>

      <CTASection />
    </>
  );
}
