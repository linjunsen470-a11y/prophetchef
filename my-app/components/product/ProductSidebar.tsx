"use client";

import React from "react";
import { ArrowRight, Boxes, Send } from "lucide-react";
import { Button } from "@/components/common/Button";

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
    <aside className="category-sidebar" aria-label="Product categories">
      <h2><Boxes aria-hidden="true" />Categories</h2>
      <button 
        className={`filter-btn ${
          activeCategory === "All Products" ? "active" : ""
        }`}
        onClick={() => onCategoryChange("All Products")}
      >
        <ArrowRight aria-hidden="true" />
        All Products
      </button>
      {categories.map((category) => (
        <button 
          key={category}
          className={`filter-btn ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          <ArrowRight aria-hidden="true" />
          {category}
        </button>
      ))}
      <div className="sidebar-cta">
        <strong>Need OEM Kitchen Equipment?</strong>
        <p>Contact us for factory price and customization support.</p>
        <Button href="/contact" variant="primary" size="small">Contact Supplier <Send aria-hidden="true" /></Button>
      </div>
    </aside>
  );
};
