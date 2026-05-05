"use client";

import React, { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSidebar } from "@/components/product/ProductSidebar";
import type { Product } from "@/sanity/types";

interface ProductListClientProps {
  products: Product[];
}

export function ProductListClient({ products }: ProductListClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category?.name || "Uncategorized"))).sort(),
    [products],
  );

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter((product) => (product.category?.name || "Uncategorized") === activeCategory);

  return (
    <Container className="products-layout">
      <ProductSidebar
        activeCategory={activeCategory}
        categories={categories}
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
  );
}
