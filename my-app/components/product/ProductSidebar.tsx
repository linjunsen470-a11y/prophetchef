"use client";

import React from "react";
import { ArrowRight, Boxes, Send } from "lucide-react";
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
        <ArrowRight aria-hidden="true" />
        All Products
      </button>
      {categories.map((category) => (
        <button 
          key={category}
          className={activeCategory === category ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
          onClick={() => onCategoryChange(category)}
        >
          <ArrowRight aria-hidden="true" />
          {category}
        </button>
      ))}
      <div className={styles.sidebarCta}>
        <strong>Need OEM Kitchen Equipment?</strong>
        <p>Contact us for factory price and customization support.</p>
        <Button href="/contact" variant="primary" size="small">Contact Supplier <Send aria-hidden="true" /></Button>
      </div>
    </aside>
  );
};
