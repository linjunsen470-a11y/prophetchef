"use client";

import React, { useState } from "react";
import { stegaClean } from "next-sanity";
import type { SanityImage } from "@/sanity/types";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: SanityImage[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const cleanActiveImage = stegaClean(activeImage?.url || "");

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainProductImage}>
        <img src={cleanActiveImage} alt={stegaClean(activeImage?.alt || "Product")} />
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
            <img src={stegaClean(img?.url || "")} alt={stegaClean(img?.alt || `Product view ${i + 1}`)} />
          </button>
        ))}
      </div>
    </div>
  );
};
