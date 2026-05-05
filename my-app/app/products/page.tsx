import { BadgeCheck, Factory, Globe2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ProductListClient } from "@/components/product/ProductListClient";
import { getProducts } from "@/sanity/queries";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Commercial Kitchen Equipment Products"
        description="Explore our complete product range for restaurants, hotels, canteens and central kitchens."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      >
        <div className="product-hero-metrics" aria-label="Product capabilities">
          <span><Factory aria-hidden="true" />Factory direct</span>
          <span><BadgeCheck aria-hidden="true" />OEM / ODM</span>
          <span><Globe2 aria-hidden="true" />Export-ready</span>
        </div>
      </PageHero>

      <section className="products-showcase">
        <ProductListClient products={products} />
      </section>

      <CTASection />
    </>
  );
}
