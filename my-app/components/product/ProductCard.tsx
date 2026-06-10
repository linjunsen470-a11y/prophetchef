import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Camera } from "lucide-react";
import type { Product } from "@/sanity/types";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const imageUrl = product.coverImage?.url;
  const cleanImage = stegaClean(imageUrl || null);
  const cleanSlug = stegaClean(product.slug);
  const productHref = `/products/${cleanSlug}`;
  const visibleTags = product.tags.slice(0, 3);
  const hiddenTagCount = Math.max(product.tags.length - visibleTags.length, 0);

  return (
    <article className={styles.productCard} data-category={product.category?.name || "Uncategorized"}>
      <Link href={productHref} className={styles.productMedia} aria-label={`View details for ${product.name}`}>
        {cleanImage ? (
          <ProductImageFrame
            src={cleanImage}
            alt={stegaClean(product.coverImage?.alt || product.name)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            imageClassName={styles.productMediaImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <Camera size={48} strokeWidth={1} />
            <span>Image coming soon</span>
          </div>
        )}
        <span className={styles.productCategoryBadge}>{product.category?.name || "Uncategorized"}</span>
      </Link>
      <div className={styles.productBody}>
        <div className={styles.productCardTopline}>
          <div className={styles.productNumber}>{(index + 1).toString().padStart(2, "0")}</div>
          {product.modelCode && <span>{product.modelCode}</span>}
        </div>
        <h3>
          <Link href={productHref} className={styles.productTitleLink}>
            {product.name}
          </Link>
        </h3>
        <p>{product.description}</p>
        <div className={styles.tagRow}>
          {visibleTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {hiddenTagCount > 0 && <span>+{hiddenTagCount}</span>}
        </div>
      </div>
    </article>
  );
};
