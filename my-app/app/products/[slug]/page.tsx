import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInquiryForm } from "@/components/product/ProductInquiryForm";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/common/CTASection";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/sanity/queries";
import styles from "@/components/product/ProductDetail.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug, { stega: false });
  if (!product) return {};

  const seo = product.seo;
  const title = seo?.metaTitle || `${product.name} | ${siteConfig.name}`;
  const description = seo?.metaDescription || product.description;
  const ogImage = seo?.openGraphImage?.url || product.coverImage?.url;

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl || `${siteConfig.url}/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: seo?.openGraphImage?.alt || product.coverImage?.alt || product.name }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, slug);
  
  // Combine cover image and gallery for the slider
  const galleryImages = [
    product.coverImage,
    ...(product.gallery || [])
  ].filter(Boolean);

  return (
    <>
      <Breadcrumb 
        items={[
          { name: "Products", href: "/products" },
          { name: product.category, href: `/products?category=${encodeURIComponent(stegaClean(product.category))}` },
          { name: product.name }
        ]} 
      />

      <section className={styles.productDetailHero}>
        <Container className={styles.productDetailGrid}>
          <ProductGallery images={galleryImages} />
          
          <div className={styles.productSummary}>
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            
            <div className="tag-row large">
              {product.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
              {product.modelCode && <span>Model: {product.modelCode}</span>}
            </div>

            <div className="hero-actions">
              <Button href="#product-inquiry" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
              <Button 
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20${encodeURIComponent(product.name)}.`}
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
          <Container className="feature-grid">
            {product.features.map((feature, idx) => (
              <article key={idx}>
                <span>{(idx + 1).toString().padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                {feature.description && <p>{feature.description}</p>}
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

      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <Container className="section-heading split-heading">
            <div>
              <span className="eyebrow">Related Products</span>
              <h2>More {product.category}</h2>
            </div>
            <Button href="/products" variant="secondary">All Products</Button>
          </Container>
          <Container className="product-grid related-product-grid">
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
            
            <ul className="check-list mt-8">
              <li><CheckCircle2 /> Professional technical support</li>
              <li><CheckCircle2 /> Global export experience</li>
              <li><CheckCircle2 /> Competitive factory pricing</li>
            </ul>
          </div>
          <ProductInquiryForm productName={product.name} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
