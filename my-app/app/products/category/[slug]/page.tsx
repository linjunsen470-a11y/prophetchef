import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { Container } from "@/components/common/Container";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/product/ProductCard";
import { heroImages } from "@/data/hero-images";
import { buildSeoMetadata } from "@/lib/seo";
import { buildCategorySeoDescription } from "@/lib/seo-content";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { getCategory, getCategorySlugs, getProductsByCategory, getSiteSettings } from "@/sanity/queries";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategorySlugs();
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [category, settings] = await Promise.all([
    getCategory(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ]);

  if (!category) return {};

  const products = await getProductsByCategory(category._id, { stega: false });
  if (products.length === 0) return {};

  const title = `${category.name} Manufacturer`;
  const description = buildCategorySeoDescription(category, products);

  return buildSeoMetadata({
    seo: category.seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/products/category/${slug}`,
    image: category.seo?.openGraphImage || category.image,
    siteName: getSiteName(settings),
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, settings] = await Promise.all([getCategory(slug), getSiteSettings()]);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category._id);
  if (products.length === 0) {
    notFound();
  }

  const siteUrl = getSiteUrl(settings);
  const categoryUrl = `${siteUrl}/products/category/${stegaClean(category.slug)}`;
  const description = buildCategorySeoDescription(category, products);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} Products`,
    description,
    url: categoryUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}/products/${stegaClean(product.slug)}`,
    })),
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Products", url: `${siteUrl}/products` },
    { name: category.name, url: categoryUrl },
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />
      <Breadcrumb items={[{ name: "Products", href: "/products" }, { name: category.name }]} />

      <PageHero
        eyebrow="Product Category"
        title={`${category.name} Manufacturer`}
        description={description}
        backgroundImage={category.image?.url || heroImages.products}
        backgroundImageAlt={category.image?.alt || `${category.name} commercial kitchen equipment`}
        compact
      />

      <section className="section bg-light">
        <Container className="section-heading split-heading">
          <div>
            <span className="eyebrow">Category Products</span>
            <h2>{category.name} Series</h2>
            <p>Compare available models, technical parameters and factory-direct procurement options.</p>
          </div>
        </Container>
        <Container className="grid grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} showCategory={false} />
          ))}
        </Container>

      </section>

      <CTASection />
    </>
  );
}

