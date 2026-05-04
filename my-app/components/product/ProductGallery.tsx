"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="main-product-image">
        <img src={activeImage} alt="Product" />
      </div>
      <div className="thumbnail-row">
        {images.map((img, i) => (
          <button 
            key={i} 
            className={`thumb ${
              activeImage === img ? "active" : ""
            }`}
            onClick={() => setActiveImage(img)}
            aria-label={`Show product image ${i + 1}`}
          >
            <img src={img} alt={`Product view ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
