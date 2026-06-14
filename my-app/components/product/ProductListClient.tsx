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
  return match?.category?.slug || "All Products";
}

export function ProductListClient({ products, initialCategorySlug }: ProductListClientProps) {
  const [activeCategory, setActiveCategory] = useState(() => resolveInitialCategory(products, initialCategorySlug));

  const categories = useMemo(
    () => {
      const categoryMap = new Map<string, string>();
      for (const product of products) {
        if (product.category?.slug && product.category?.name) {
          categoryMap.set(product.category.slug, product.category.name);
        }
      }
      return Array.from(categoryMap, ([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
    },
    [products],
  );

  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter((product) => product.category?.slug === activeCategory);
  const activeCategoryName = activeCategory === "All Products"
    ? "All Products"
    : categories.find((category) => category.slug === activeCategory)?.name || "All Products";
  const variantCount = filteredProducts.reduce((count, product) => count + (product.variants?.length || 0), 0);

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
            <span className={styles.toolbarEyebrow}>Catalog</span>
            <p><strong>{filteredProducts.length}</strong> product series / <strong>{variantCount}</strong> model variants</p>
          </div>
          <span className={styles.productCountPill}>{activeCategoryName}</span>
        </div>
        <div className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              showCategory={false}
            />
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
