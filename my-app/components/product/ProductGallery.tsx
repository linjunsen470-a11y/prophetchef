"use client";

import React, { useState } from "react";
import Image from "next/image";
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
        {cleanActiveImage ? (
          <Image 
            src={cleanActiveImage} 
            alt={stegaClean(activeImage?.alt || "Product")} 
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>
      <div className={styles.thumbnailRow}>
        {images.map((img, i) => {
          const imgUrl = stegaClean(img?.url || "");
          if (!imgUrl) return null;
          return (
            <button 
              key={i} 
              className={`${styles.thumb} ${
                activeImage === img ? styles.active : ""
              }`}
              onClick={() => setActiveImage(img)}
              aria-label={`Show product image ${i + 1}`}
            >
              <Image 
                src={imgUrl} 
                alt={stegaClean(img?.alt || `Product view ${i + 1}`)} 
                fill
                sizes="(max-width: 768px) 86px, 112px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
