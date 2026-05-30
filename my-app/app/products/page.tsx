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
  const title = page?.hero?.title || "Commercial Kitchen Equipment Products";
  const description =
    page?.hero?.description ||
    "Explore our complete product range for restaurants, hotels, canteens and central kitchens.";

  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/products`,
    image: seo?.openGraphImage || page?.hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function ProductsPage() {
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
        title={hero?.title || "Commercial Kitchen Equipment Products"}
        description={
          hero?.description ||
          "Explore our complete product range for restaurants, hotels, canteens and central kitchens."
        }
        backgroundImage={
          hero?.backgroundImage?.url ||
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
        }
      >
        <div className="product-hero-metrics" aria-label="Product capabilities">
          {metrics.map((metric) => {
            const Icon = getIcon(metric.icon, BadgeCheck);
            return (
              <span key={metric.label}>
                <Icon aria-hidden="true" />
                {metric.value ? `${metric.value} ` : ""}
                {metric.label}
              </span>
            );
          })}
        </div>
      </PageHero>

      <section className="products-showcase">
        <ProductListClient products={products} />
      </section>

      <CTASection />
    </>
  );
}
