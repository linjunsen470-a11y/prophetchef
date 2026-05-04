"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { ProductSidebar } from "@/components/product/ProductSidebar";
import { ProductCard } from "@/components/product/ProductCard";
import { CTASection } from "@/components/common/CTASection";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <PageHero 
        eyebrow="Products"
        title="Commercial Kitchen Equipment Products"
        description="Explore our complete product range for restaurants, hotels, canteens and central kitchens."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      >
        <div className="product-hero-metrics" aria-label="Product capabilities">
          <span>Factory direct</span>
          <span>OEM / ODM</span>
          <span>Export-ready</span>
        </div>
      </PageHero>
      
      <section className="products-showcase">
        <Container className="products-layout">
          <ProductSidebar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <div className="products-main">
            <div className="product-toolbar">
              <div>
                <span className="eyebrow">Catalog</span>
                <p><strong>{filteredProducts.length}</strong> product models for commercial foodservice equipment procurement.</p>
              </div>
              <span className="product-count-pill">{activeCategory}</span>
            </div>
            <div className="product-grid products-page-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-[60px] text-center text-muted border border-dashed border-border rounded-[12px]">
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
