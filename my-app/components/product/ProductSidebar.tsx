"use client";

import React from "react";
import { Boxes, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import styles from "./ProductsShowcase.module.css";

interface ProductSidebarProps {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ 
  activeCategory, 
  categories,
  onCategoryChange 
}) => {
  return (
    <aside className={styles.categorySidebar} aria-label="Product categories">
      <h2><Boxes aria-hidden="true" />Categories</h2>
      <button 
        className={activeCategory === "All Products" ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
        onClick={() => onCategoryChange("All Products")}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button 
          key={category}
          className={activeCategory === category ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
      <div className={styles.sidebarCta}>
        <strong>Need project pricing?</strong>
        <p>Share your kitchen type and target capacity for a factory quote.</p>
        <Button href="/contact" variant="primary" size="small">Request Quote <Send aria-hidden="true" /></Button>
      </div>
    </aside>
  );
};
