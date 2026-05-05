"use client";

import React, { useState } from "react";
import { stegaClean } from "next-sanity";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const cleanActiveImage = stegaClean(activeImage);

  return (
    <div className="product-gallery">
      <div className="main-product-image">
        <img src={cleanActiveImage} alt="Product" />
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
            <img src={stegaClean(img)} alt={`Product view ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
