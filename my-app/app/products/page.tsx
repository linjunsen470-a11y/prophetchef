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
        title="Commercial Kitchen Equipment Products"
        description="Explore our complete product range for restaurants, hotels, canteens and central kitchens."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      />
      
      <section className="py-[100px] md:py-[60px]">
        <Container className="grid grid-cols-[280px_1fr] gap-8 lg:grid-cols-1">
          <ProductSidebar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <div>
            <div className="mb-5 text-muted">
              <p><strong>{filteredProducts.length}+</strong> product models for commercial foodservice equipment procurement.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
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
