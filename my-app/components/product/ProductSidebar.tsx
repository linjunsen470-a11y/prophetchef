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
    <aside className="sticky top-[100px] self-start border border-border rounded-custom p-[18px] bg-white lg:static" aria-label="Product categories">
      <h2 className="text-[20px] m-[0_0_14px] font-800">Categories</h2>
      <button 
        className={`block w-full text-left bg-white border border-transparent rounded-[12px] p-[12px_14px] my-1 mx-0 font-750 text-text cursor-pointer transition-all duration-200 ${
          activeCategory === "All Products" ? "bg-[#eff6ff] border-[#dbeafe] text-blue" : "hover:bg-[#eff6ff] hover:border-[#dbeafe] hover:text-blue"
        }`}
        onClick={() => onCategoryChange("All Products")}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button 
          key={cat.name}
          className={`block w-full text-left bg-white border border-transparent rounded-[12px] p-[12px_14px] my-1 mx-0 font-750 text-text cursor-pointer transition-all duration-200 ${
            activeCategory === cat.name ? "bg-[#eff6ff] border-[#dbeafe] text-blue" : "hover:bg-[#eff6ff] hover:border-[#dbeafe] hover:text-blue"
          }`}
          onClick={() => onCategoryChange(cat.name)}
        >
          {cat.name}
        </button>
      ))}
      <div className="mt-5 p-[18px] bg-light rounded-[12px]">
        <strong className="block mb-2">Need OEM Kitchen Equipment?</strong>
        <p className="text-[13px] text-muted mb-[14px]">Contact us for factory price and customization support.</p>
        <a className="btn btn-primary btn-small" href="/contact">Contact Supplier</a>
      </div>
    </aside>
  );
};
