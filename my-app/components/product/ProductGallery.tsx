"use client";

import React, { useState } from "react";
import { stegaClean } from "next-sanity";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const cleanActiveImage = stegaClean(activeImage);

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainProductImage}>
        <img src={cleanActiveImage} alt="Product" />
      </div>
      <div className={styles.thumbnailRow}>
        {images.map((img, i) => (
          <button 
            key={i} 
            className={`${styles.thumb} ${
              activeImage === img ? styles.active : ""
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
