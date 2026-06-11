"use client";

import React, { useMemo, useState } from "react";
import type { SanityImage } from "@/sanity/types";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: SanityImage[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const validImages = useMemo(
    () => images.filter((image) => Boolean(image?.url)),
    [images],
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
  const activeImage =
    validImages.find((image) => image.url === selectedImageUrl) ||
    validImages[0];
  const activeImageUrl = activeImage?.url || "";

  return (
    <div className={styles.productGallery}>
      <div className={styles.mainProductImage}>
        {activeImageUrl ? (
          <ProductImageFrame
            src={activeImageUrl}
            alt={activeImage?.alt || "Product"}
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
        {validImages.map((img, i) => {
          const imgUrl = img.url || "";
          return (
            <button
              key={i}
              className={`${styles.thumb} ${
                activeImageUrl === imgUrl ? styles.active : ""
              }`}
              onClick={() => setSelectedImageUrl(imgUrl)}
              aria-label={`Show product image ${i + 1}`}
            >
              <ProductImageFrame
                src={imgUrl}
                alt={img?.alt || `Product view ${i + 1}`}
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
