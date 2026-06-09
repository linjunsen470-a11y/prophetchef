import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { getContactInfo, getSiteName, getSiteUrl, whatsappUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { JsonLd } from "@/components/common/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInquiryForm } from "@/components/product/ProductInquiryForm";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/common/CTASection";
import { getProduct, getProductSlugs, getRelatedProducts, getSiteSettings } from "@/sanity/queries";
import styles from "@/components/product/ProductDetail.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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
  return buildSeoMetadata({
    seo,
    title: product.name,
    description: product.description,
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

  const contact = getContactInfo(settings);
  const siteName = getSiteName(settings);
  const categoryId = product.category?._id;
  const categoryName = product.category?.name || "Uncategorized";
  const relatedProducts = await getRelatedProducts(categoryId, slug);
  
  // Combine cover image and gallery for the slider
  const galleryImages = [
    product.coverImage,
    ...(product.gallery || [])
  ].filter(Boolean);

  const siteUrl = getSiteUrl(settings);
  const productImageUrl = product.coverImage?.url ? stegaClean(product.coverImage.url) : "";
  const productUrl = `${siteUrl}/products/${stegaClean(product.slug)}`;
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": productImageUrl ? [productImageUrl] : [],
    "description": product.description,
    "sku": product.modelCode || undefined,
    "mpn": product.modelCode || undefined,
    "category": categoryName,
    "keywords": product.tags?.join(", "),
    "brand": {
      "@type": "Brand",
      "name": siteName
    },
    "url": productUrl,
    "additionalProperty": product.specifications?.map((spec) => ({
      "@type": "PropertyValue",
      "name": spec.label,
      "value": spec.value
    })),
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Products", url: `${siteUrl}/products` },
    { name: product.name, url: productUrl },
  ]);
  const faqSchema = faqJsonLd(product.faqs);
  const schemas = faqSchema ? [jsonLd, breadcrumbSchema, faqSchema] : [jsonLd, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemas} />
      <Breadcrumb 
        items={[
          { name: "Products", href: "/products" },
          { name: categoryName, href: `/products?category=${encodeURIComponent(stegaClean(categoryName))}` },
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
              {product.tags.map(tag => (
                <span key={tag} className="bg-[#edf3f8] text-[color:var(--blue)] border border-[#cfd8e3] px-[11px] py-2 rounded-[6px] text-[13px] font-bold">{tag}</span>
              ))}
              {product.modelCode && <span className="bg-[#edf3f8] text-[color:var(--blue)] border border-[#cfd8e3] px-[11px] py-2 rounded-[6px] text-[13px] font-bold">Model: {product.modelCode}</span>}
            </div>

            <div className="flex flex-wrap gap-3 mt-6 max-[560px]:flex-col max-[560px]:items-stretch">
              <Button href="#product-inquiry" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
              <Button 
                href={whatsappUrl(
                  contact.whatsapp,
                  `Hello ${siteName}, I would like to request a quote for ${product.name}.`,
                )}
                variant="secondary"
                target="_blank"
                rel="noopener"
                iconStart={<MessageCircle aria-hidden="true" />}
              >
                Chat on WhatsApp
              </Button>
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

      {product.specifications && product.specifications.length > 0 && (
        <section className="section">
          <Container className="section-heading">
            <span className="eyebrow">Technical Parameters</span>
            <h2>Product Specifications</h2>
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
          <Container className="factory-team-grid">
            {product.faqs.map((faq) => (
              <article key={faq._key || faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
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
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </Container>
        </section>
      )}

      <section className="section bg-light" id="product-inquiry">
        <Container className={styles.inquiryLayout}>
          <div>
            <span className="eyebrow">Product Inquiry</span>
            <h2>Request Product Price and Specification</h2>
            <p>Send your required model, voltage, quantity and destination country. Our sales team will reply with a quotation and product documents.</p>
            
            <ul className="list-none p-0 my-[22px] mt-8">
              <li className="flex items-start gap-[9px] relative pl-0 my-2.5 text-[color:var(--muted)] font-semibold"><CheckCircle2 className="w-[18px] h-[18px] mt-[3px] text-[color:var(--orange)] shrink-0" /> Professional technical support</li>
              <li className="flex items-start gap-[9px] relative pl-0 my-2.5 text-[color:var(--muted)] font-semibold"><CheckCircle2 className="w-[18px] h-[18px] mt-[3px] text-[color:var(--orange)] shrink-0" /> Global export experience</li>
              <li className="flex items-start gap-[9px] relative pl-0 my-2.5 text-[color:var(--muted)] font-semibold"><CheckCircle2 className="w-[18px] h-[18px] mt-[3px] text-[color:var(--orange)] shrink-0" /> Competitive factory pricing</li>
            </ul>
          </div>
          <ProductInquiryForm productName={product.name} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
