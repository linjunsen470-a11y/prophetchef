"use client";

import React, { useState } from "react";
import { stegaClean } from "next-sanity";
import type { SanityImage } from "@/sanity/types";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
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
          <ProductImageFrame
            src={cleanActiveImage}
            alt={stegaClean(activeImage?.alt || "Product")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            ratio="1x1"
            priority
            className="rounded-[10px] border border-[color:var(--border)] bg-white shadow-[var(--shadow)]"
          />
        ) : (
          <div className="aspect-square w-full bg-[#f4f7f9] flex items-center justify-center text-slate-400 rounded-[10px] border border-[color:var(--border)]">
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
              <ProductImageFrame
                src={imgUrl}
                alt={stegaClean(img?.alt || `Product view ${i + 1}`)}
                sizes="112px"
                ratio="thumb"
                padded={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};