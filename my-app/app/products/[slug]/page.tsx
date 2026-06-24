import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { buildProductSeoDescription } from "@/lib/seo-content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { JsonLd } from "@/components/common/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/common/CTASection";
import { resolveSanityImage } from "@/lib/images";
import { getProduct, getProductSlugs, getRelatedProducts, getSiteSettings } from "@/sanity/queries";
import type { ProductVariant } from "@/sanity/types";
import styles from "@/components/product/ProductDetail.module.css";
import { ProductViewTracker } from "@/components/product/ProductViewTracker";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const GENERIC_PRODUCT_TAGS = new Set([
  "prophetchef",
  "commercial kitchen",
  "commercial kitchen equipment",
  "commercial induction",
  "commercial induction equipment",
  "cooking equipment",
  "induction",
  "kitchen equipment",
]);

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, " ");
}

function getDisplayTags(tags: string[], categoryName: string) {
  const categoryKey = normalizeTag(categoryName);
  const seen = new Set<string>();

  return tags
    .filter((tag) => {
      const key = normalizeTag(tag);
      if (!key || seen.has(key) || GENERIC_PRODUCT_TAGS.has(key) || key === categoryKey) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .slice(0, 3);
}

function joinParts(parts: Array<string | undefined>, separator: string) {
  return parts.filter(Boolean).join(separator);
}

function formatDimensions(variant: ProductVariant) {
  return joinParts([variant.lengthMm, variant.widthMm, variant.heightMm], " x ");
}

export async function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProduct(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  if (!product) return {};

  const seo = product.seo;
  const description = buildProductSeoDescription(product);
  return buildSeoMetadata({
    seo,
    title: product.name,
    description,
    canonical: `${getSiteUrl(settings)}/products/${slug}`,
    image: seo?.openGraphImage || product.coverImage,
    siteName: getSiteName(settings),
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProduct(slug), getSiteSettings()]);

  if (!product) {
    notFound();
  }

  const siteName = getSiteName(settings);
  const categoryId = product.category?._id;
  const categoryName = product.category?.name || "Uncategorized";
  const categorySlug = product.category?.slug;
  const relatedProducts = await getRelatedProducts(categoryId, slug);
  
  // Combine cover image and gallery for the slider
  const galleryImages = [
    product.coverImage,
    ...(product.gallery || []),
  ].filter((image): image is NonNullable<typeof image> => Boolean(image));

  const siteUrl = getSiteUrl(settings);
  const productImageUrl = product.coverImage
    ? stegaClean(resolveSanityImage(product.coverImage, { width: 1200, quality: 85 }) || product.coverImage.url || "")
    : "";
  const productUrl = `${siteUrl}/products/${stegaClean(product.slug)}`;
  const variants = product.variants || [];
  const displayTags = getDisplayTags(product.tags, categoryName);
  const productSeoDescription = buildProductSeoDescription(product);
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": productImageUrl ? [productImageUrl] : [],
    "description": productSeoDescription,
    "sku": product.modelCode || variants[0]?.modelCode || undefined,
    "mpn": product.modelCode || variants[0]?.modelCode || undefined,
    "category": categoryName,
    "keywords": product.tags?.join(", "),
    "brand": {
      "@type": "Brand",
      "name": siteName
    },
    "url": productUrl,
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Contact ProphetChef for project quotation based on model configuration, order quantity and destination market."
      }
    },
    "additionalProperty": product.specifications?.map((spec) => ({
      "@type": "PropertyValue",
      "name": spec.label,
      "value": spec.value
    })),
    "isVariantOf": variants.length
      ? variants.map((variant) => ({
          "@type": "ProductModel",
          "name": variant.productNameEn || product.name,
          "model": variant.modelCode,
        }))
      : undefined,
  };
  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
    { name: "Products", url: `${siteUrl}/products` },
    ...(categorySlug ? [{ name: categoryName, url: `${siteUrl}/products/category/${stegaClean(categorySlug)}` }] : []),
    { name: product.name, url: productUrl },
  ];
  const breadcrumbSchema = breadcrumbJsonLd(breadcrumbItems);
  const faqSchema = faqJsonLd(product.faqs);
  const schemas = faqSchema ? [jsonLd, breadcrumbSchema, faqSchema] : [jsonLd, breadcrumbSchema];

  return (
    <>
      <ProductViewTracker productName={product.name} categoryName={categoryName} />
      <JsonLd data={schemas} />
      <Breadcrumb 
        items={[
          { name: "Products", href: "/products" },
          { name: categoryName, href: categorySlug ? `/products/category/${encodeURIComponent(stegaClean(categorySlug))}` : "/products" },
          { name: product.name }
        ]} 
      />

      <section className={styles.productDetailHero}>
        <Container className={styles.productDetailGrid}>
          <ProductGallery images={galleryImages} />
          
          <div className={styles.productSummary}>
            <span className="eyebrow">{categoryName}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            
            <div className="flex flex-wrap gap-[7px] my-3.5">
              {displayTags.map(tag => (
                <span key={tag} className="bg-[#edf3f8] text-[color:var(--blue)] border border-[#cfd8e3] px-[11px] py-2 rounded-[6px] text-[13px] font-bold">{tag}</span>
              ))}
              {variants.length > 0 && <span className="bg-[#edf3f8] text-[color:var(--blue)] border border-[#cfd8e3] px-[11px] py-2 rounded-[6px] text-[13px] font-bold">{variants.length} Models</span>}
              {product.modelCode && <span className="bg-[#edf3f8] text-[color:var(--blue)] border border-[#cfd8e3] px-[11px] py-2 rounded-[6px] text-[13px] font-bold">Model: {product.modelCode}</span>}
            </div>

            <div className={styles.miniTrust}>
              <span>Fast quotation</span>
              <span>Factory direct supply</span>
              <span>Export packaging</span>
            </div>

            <div className={styles.productSummaryStats} aria-label="Procurement advantages">
              <div><strong>12 mo</strong><span>Warranty</span></div>
              <div><strong>OEM</strong><span>Customization</span></div>
              <div><strong>CE</strong><span>Certified</span></div>
            </div>
          </div>
        </Container>
      </section>

      {product.features && product.features.length > 0 && (
        <section className="section bg-light">
          <Container className="section-heading">
            <span className="eyebrow">Key Features</span>
            <h2>Engineered for High-Performance Environments</h2>
          </Container>
          <Container className="grid grid-cols-3 max-[760px]:grid-cols-1 gap-5">
            {product.features.map((feature, idx) => (
              <article key={idx} className="p-6 bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_26px_rgba(9,24,39,0.05)]">
                <span className="inline-flex mb-3.5 text-[color:var(--orange)] font-black">{(idx + 1).toString().padStart(2, '0')}</span>
                <h3 className="m-0 mb-2.5 text-[20px] leading-[1.25] font-extrabold">{feature.title}</h3>
                {feature.description && <p className="m-0 text-[color:var(--muted)]">{feature.description}</p>}
              </article>
            ))}
          </Container>
        </section>
      )}

      {variants.length > 0 && (
        <section className="section">
          <Container className="section-heading">
            <span className="eyebrow">Technical Parameters</span>
            <h2>Available Models</h2>
          </Container>
          <Container>
            <div className={styles.variantTableWrap}>
              <table className={styles.variantTable}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Product</th>
                    <th>Dimensions (mm)</th>
                    <th>Power</th>
                    <th>Voltage / Frequency</th>
                    <th>Extra</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => {
                    const dimensions = formatDimensions(variant);
                    const extra = joinParts([
                      variant.extraLabelEn,
                      joinParts([variant.extraValue, variant.extraUnit], " "),
                    ], ": ");
                    return (
                      <tr key={variant._key || variant.modelCode}>
                        <th>{variant.modelCode}</th>
                        <td>{variant.productNameEn || product.name}</td>
                        <td>{dimensions || "Contact for details"}</td>
                        <td>{variant.powerKw ? `${variant.powerKw} kW` : "Contact for details"}</td>
                        <td>{joinParts([variant.voltageV ? `${variant.voltageV} V` : undefined, variant.frequencyHz ? `${variant.frequencyHz} Hz` : undefined], " / ") || "Contact for details"}</td>
                        <td>{extra || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {product.specifications && product.specifications.length > 0 && (
        <section className={variants.length > 0 ? "section bg-light" : "section"}>
          <Container className="section-heading">
            <span className="eyebrow">Specifications</span>
            <h2>Product Notes</h2>
          </Container>
          <Container className="table-wrap">
            <table className={styles.specTable}>
              <tbody>
                {product.specifications.map((spec, idx) => (
                  <tr key={idx}>
                    <th>{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
                <tr>
                  <th>Warranty</th>
                  <td>12 months standard warranty with spare parts support</td>
                </tr>
              </tbody>
            </table>
          </Container>
        </section>
      )}

      {product.faqs && product.faqs.length > 0 && (
        <section className="section bg-light">
          <Container className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </Container>
          <Container className={styles.productFaqGrid}>
            {product.faqs.map((faq) => (
              <article key={faq._key || faq.question} className={styles.productFaqCard}>
                <span className={styles.faqMarker} aria-hidden="true">Q</span>
                <div>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              </article>
            ))}
          </Container>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <Container className="section-heading split-heading">
            <div>
              <span className="eyebrow">Related Products</span>
              <h2>More {categoryName}</h2>
            </div>
            <Button href="/products" variant="secondary">All Products</Button>
          </Container>
          <Container className="grid grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-6">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} showCategory={false} />
            ))}
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}




