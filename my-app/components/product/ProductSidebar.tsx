"use client";

import React from "react";
import { categories } from "@/data/categories";

interface ProductSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <aside className="category-sidebar" aria-label="Product categories">
      <h2>Categories</h2>
      <button 
        className={`filter-btn ${
          activeCategory === "All Products" ? "active" : ""
        }`}
        onClick={() => onCategoryChange("All Products")}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button 
          key={cat.name}
          className={`filter-btn ${
            activeCategory === cat.name ? "active" : ""
          }`}
          onClick={() => onCategoryChange(cat.name)}
        >
          {cat.name}
        </button>
      ))}
      <div className="sidebar-cta">
        <strong>Need OEM Kitchen Equipment?</strong>
        <p>Contact us for factory price and customization support.</p>
        <a className="btn btn-primary btn-small" href="/contact">Contact Supplier</a>
      </div>
    </aside>
  );
};
