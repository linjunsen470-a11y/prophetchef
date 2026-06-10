"use client";

import React, { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSidebar } from "@/components/product/ProductSidebar";
import type { Product } from "@/sanity/types";

import styles from "./ProductsShowcase.module.css";

interface ProductListClientProps {
  products: Product[];
  initialCategorySlug?: string;
}

function resolveInitialCategory(products: Product[], initialCategorySlug?: string) {
  if (!initialCategorySlug) return "All Products";
  const match = products.find((product) => product.category?.slug === initialCategorySlug);
  return match?.category?.name || "All Products";
}

export function ProductListClient({ products, initialCategorySlug }: ProductListClientProps) {
  const [activeCategory, setActiveCategory] = useState(() => resolveInitialCategory(products, initialCategorySlug));

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category?.name || "Uncategorized"))).sort(),
    [products],
  );

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter((product) => (product.category?.name || "Uncategorized") === activeCategory);

  return (
    <Container className={styles.productsLayout}>
      <ProductSidebar
        activeCategory={activeCategory}
        categories={categories}
        onCategoryChange={setActiveCategory}
      />
      <div className={styles.productsMain}>
        <div className={styles.productToolbar}>
          <div>
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.12em] text-[12px] font-black text-[color:var(--orange)]">Catalog</span>
            <p><strong>{filteredProducts.length}</strong> product models for commercial foodservice equipment procurement.</p>
          </div>
          <span className={styles.productCountPill}>{activeCategory}</span>
        </div>
        <div className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-6">
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