import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ProductListClient } from "@/components/product/ProductListClient";
import { getProducts, getProductsPageSettings, getSiteSettings } from "@/sanity/queries";
import { getIcon } from "@/components/common/IconByName";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getProductsPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const seo = page?.seo;
  const title = page?.hero?.title || "Commercial Induction Cooker Products";
  const description =
    page?.hero?.description ||
    "Explore ProphetChef commercial induction cookers, wok ranges, built-in modules and specialty cooking equipment.";

  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/products`,
    image: seo?.openGraphImage || page?.hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: initialCategorySlug } = await searchParams;
  const [products, page] = await Promise.all([getProducts(), getProductsPageSettings()]);
  const hero = page?.hero;
  const metrics = page?.metrics?.length
    ? page.metrics
    : [
        { label: "Factory direct", value: "", icon: "factory" },
        { label: "OEM / ODM", value: "", icon: "badgeCheck" },
        { label: "Export-ready", value: "", icon: "globe" },
      ];

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || "Products"}
        title={hero?.title || "Commercial Induction Cooker Products"}
        description={
          hero?.description ||
          "Explore ProphetChef commercial induction cookers, wok ranges, built-in modules and specialty cooking equipment."
        }
        backgroundImage={hero?.backgroundImage?.url || "/images/products/hero-wok-range.webp"}
      >
        <div className="flex flex-wrap gap-2 mt-6" aria-label="Product capabilities">
          {metrics.map((metric) => {
            const Icon = getIcon(metric.icon, BadgeCheck);
            return (
              <span key={metric.label} className="inline-flex items-center gap-2 px-3 py-2 border border-white/20 rounded-[6px] bg-white/8 text-white text-[13px] font-extrabold">
                <Icon aria-hidden="true" className="w-[15px] h-[15px]" />
                {metric.value ? `${metric.value} ` : ""}
                {metric.label}
              </span>
            );
          })}
        </div>
      </PageHero>

      <section className="py-[76px] max-[760px]:py-16 bg-[linear-gradient(180deg,#f8fafc_0,#fff_220px)]">
        <ProductListClient products={products} initialCategorySlug={initialCategorySlug} />
      </section>

      <CTASection />
    </>
  );
}
