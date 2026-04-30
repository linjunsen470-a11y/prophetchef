"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full">
      <div className="bg-white border border-border rounded-custom overflow-hidden shadow-custom mb-5">
        <img src={activeImage} alt="Product" className="w-full h-[520px] object-cover transition-all duration-300 sm:h-[320px]" />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button 
            key={i} 
            className={`w-[84px] h-[84px] rounded-2 overflow-hidden border-2 p-0 cursor-pointer transition-all duration-200 ${
              activeImage === img ? "border-orange" : "border-transparent opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveImage(img)}
          >
            <img src={img} alt={`View ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
