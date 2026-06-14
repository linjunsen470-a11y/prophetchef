"use client";

import React from "react";
import { Boxes } from "lucide-react";
import styles from "./ProductsShowcase.module.css";

interface ProductSidebarProps {
  activeCategory: string;
  categories: Array<{ name: string; slug: string }>;
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
          key={category.slug}
          className={activeCategory === category.slug ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </aside>
  );
};
