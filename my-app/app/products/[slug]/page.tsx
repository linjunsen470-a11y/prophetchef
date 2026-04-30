import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products, Product } from "@/data/products";
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

      <section className="py-[100px] md:py-[60px]">
        <Container className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-start lg:grid-cols-1">
          <ProductGallery images={[product.image, ...products.slice(0, 2).map(p => p.image)]} />
          
          <div className="product-summary">
            <span className="eyebrow">{product.category}</span>
            <h1 className="text-[clamp(34px,4.5vw,56px)] leading-[1.08] tracking-[-0.05em] my-[12px] mx-0 mb-[18px] font-800">
              {product.name}
            </h1>
            <p className="text-muted text-[17px]">{product.description}</p>
            <div className="flex flex-wrap gap-[7px] my-[14px] mx-0 mb-[18px]">
              {product.tags.map(tag => (
                <span key={tag} className="bg-[#eff6ff] text-blue border border-[#dbeafe] py-2 px-[11px] rounded-full text-[13px] font-750">
                  {tag}
                </span>
              ))}
              <span className="bg-[#eff6ff] text-blue border border-[#dbeafe] py-2 px-[11px] rounded-full text-[13px] font-750">SUS304 Stainless Steel</span>
              <span className="bg-[#eff6ff] text-blue border border-[#dbeafe] py-2 px-[11px] rounded-full text-[13px] font-750">CE Certified</span>
            </div>
            <div className="flex gap-3 mt-6">
              <Button href="#product-inquiry">Send Inquiry</Button>
              <Button 
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`}
                variant="secondary"
                target="_blank"
                rel="noopener"
              >
                Chat on WhatsApp
              </Button>
            </div>
            <div className="flex gap-[10px] flex-wrap mt-[22px]">
              <span className="inline-flex py-2 px-3 rounded-full border border-[#dbeafe] bg-[#eff6ff] text-[13px] text-blue">Fast quotation</span>
              <span className="inline-flex py-2 px-3 rounded-full border border-[#dbeafe] bg-[#eff6ff] text-[13px] text-blue">Factory direct supply</span>
              <span className="inline-flex py-2 px-3 rounded-full border border-[#dbeafe] bg-[#eff6ff] text-[13px] text-blue">Export packaging</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-[100px] bg-light md:py-[60px]">
        <Container className="mb-10">
          <span className="eyebrow">Key Features</span>
          <h2 className="text-[32px] font-800 mt-2">Engineered for High-Volume Commercial Kitchens</h2>
        </Container>
        <Container className="grid grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">Fast Heating</h3>
            <p className="text-muted m-0 text-[14px]">High-efficiency induction coil helps reduce preheating time in busy cooking operations.</p>
          </article>
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">Energy Saving</h3>
            <p className="text-muted m-0 text-[14px]">Direct heat transfer improves energy use and reduces unnecessary heat loss.</p>
          </article>
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">Easy Cleaning</h3>
            <p className="text-muted m-0 text-[14px]">Smooth stainless steel structure supports fast daily cleaning and maintenance.</p>
          </article>
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">Safe Operation</h3>
            <p className="text-muted m-0 text-[14px]">Flameless cooking improves kitchen working conditions and reduces open-fire risk.</p>
          </article>
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">Durable Body</h3>
            <p className="text-muted m-0 text-[14px]">SUS304 stainless steel construction supports heavy-duty commercial use.</p>
          </article>
          <article className="p-6 bg-white border border-border rounded-custom">
            <h3 className="m-0 mb-[10px] text-[20px] font-800">High-Volume Use</h3>
            <p className="text-muted m-0 text-[14px]">Suitable for restaurants, hotels, canteens and central kitchen production lines.</p>
          </article>
        </Container>
      </section>

      <section className="py-[100px] md:py-[60px]">
        <Container className="mb-10">
          <span className="eyebrow">Technical Parameters</span>
          <h2 className="text-[32px] font-800 mt-2">Product Specifications</h2>
        </Container>
        <Container className="overflow-hidden border border-border rounded-[18px]">
          <table className="w-full border-collapse bg-white">
            <tbody>
              <tr className="border-b border-border">
                <th className="bg-slate-100 p-[18px] text-left w-[220px] text-blue font-800">Model</th>
                <td className="p-[18px] text-left">PKT-{product.id}-Series</td>
              </tr>
              <tr className="border-b border-border">
                <th className="bg-slate-100 p-[18px] text-left w-[220px] text-blue font-800">Material</th>
                <td className="p-[18px] text-left">SUS304 stainless steel body</td>
              </tr>
              <tr className="border-b border-border">
                <th className="bg-slate-100 p-[18px] text-left w-[220px] text-blue font-800">Application</th>
                <td className="p-[18px] text-left">Restaurant, hotel kitchen, school canteen, central kitchen</td>
              </tr>
              <tr className="border-b border-border">
                <th className="bg-slate-100 p-[18px] text-left w-[220px] text-blue font-800">Warranty</th>
                <td className="p-[18px] text-left">12 months standard warranty with spare parts support</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-[100px] md:py-[60px]">
          <Container className="flex items-center justify-between mb-10">
            <div>
              <span className="eyebrow">Related Products</span>
              <h2 className="text-[32px] font-800 mt-2">More {product.category}</h2>
            </div>
            <Button href="/products" variant="secondary">All Products</Button>
          </Container>
          <Container className="grid grid-cols-4 gap-5 lg:grid-cols-2 sm:grid-cols-1">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </Container>
        </section>
      )}

      <section className="py-[100px] bg-light md:py-[60px]" id="product-inquiry">
        <Container className="grid grid-cols-[0.85fr_1.15fr] gap-10 items-start lg:grid-cols-1">
          <div className="inquiry-info">
            <span className="eyebrow">Product Inquiry</span>
            <h2 className="text-[32px] font-800 mt-[10px]">Request Product Price and Specification</h2>
            <p className="text-muted mt-4">Send your required model, voltage, quantity and destination country. Our sales team will reply with a quotation and product documents.</p>
          </div>
          <ProductInquiryForm productName={product.name} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
