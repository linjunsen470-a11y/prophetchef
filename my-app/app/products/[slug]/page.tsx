import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MessageCircle, Send } from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInquiryForm } from "@/components/product/ProductInquiryForm";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/common/CTASection";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <Breadcrumb 
        items={[
          { name: "Products", href: "/products" },
          { name: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
          { name: product.name }
        ]} 
      />

      <section className="product-detail-hero">
        <Container className="product-detail-grid">
          <ProductGallery images={[product.image, ...products.slice(0, 2).map(p => p.image)]} />
          
          <div className="product-summary">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="tag-row large">
              {product.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
              <span>SUS304 Stainless Steel</span>
              <span>CE Certified</span>
            </div>
            <div className="hero-actions">
              <Button href="#product-inquiry" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
              <Button 
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`}
                variant="secondary"
                target="_blank"
                rel="noopener"
                iconStart={<MessageCircle aria-hidden="true" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
            <div className="mini-trust">
              <span>Fast quotation</span>
              <span>Factory direct supply</span>
              <span>Export packaging</span>
            </div>
            <div className="product-summary-stats" aria-label="Procurement advantages">
              <div><strong>12 mo</strong><span>Warranty</span></div>
              <div><strong>OEM</strong><span>Customization</span></div>
              <div><strong>CE</strong><span>Certified</span></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-light">
        <Container className="section-heading">
          <span className="eyebrow">Key Features</span>
          <h2>Engineered for High-Volume Commercial Kitchens</h2>
        </Container>
        <Container className="feature-grid six">
          <article>
            <span>01</span>
            <h3>Fast Heating</h3>
            <p>High-efficiency induction coil helps reduce preheating time in busy cooking operations.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Energy Saving</h3>
            <p>Direct heat transfer improves energy use and reduces unnecessary heat loss.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Easy Cleaning</h3>
            <p>Smooth stainless steel structure supports fast daily cleaning and maintenance.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Safe Operation</h3>
            <p>Flameless cooking improves kitchen working conditions and reduces open-fire risk.</p>
          </article>
          <article>
            <span>05</span>
            <h3>Durable Body</h3>
            <p>SUS304 stainless steel construction supports heavy-duty commercial use.</p>
          </article>
          <article>
            <span>06</span>
            <h3>High-Volume Use</h3>
            <p>Suitable for restaurants, hotels, canteens and central kitchen production lines.</p>
          </article>
        </Container>
      </section>

      <section className="section">
        <Container className="section-heading">
          <span className="eyebrow">Technical Parameters</span>
          <h2>Product Specifications</h2>
        </Container>
        <Container className="table-wrap">
          <table className="spec-table">
            <tbody>
              <tr>
                <th>Model</th>
                <td>PKT-{product.id}-Series</td>
              </tr>
              <tr>
                <th>Material</th>
                <td>SUS304 stainless steel body</td>
              </tr>
              <tr>
                <th>Application</th>
                <td>Restaurant, hotel kitchen, school canteen, central kitchen</td>
              </tr>
              <tr>
                <th>Customization</th>
                <td>Logo, voltage, panel, size and packaging available</td>
              </tr>
              <tr>
                <th>Warranty</th>
                <td>12 months standard warranty with spare parts support</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </section>

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
        <Container className="inquiry-layout">
          <div>
            <span className="eyebrow">Product Inquiry</span>
            <h2>Request Product Price and Specification</h2>
            <p>Send your required model, voltage, quantity and destination country. Our sales team will reply with a quotation and product documents.</p>
          </div>
          <ProductInquiryForm productName={product.name} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
