import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Camera } from "lucide-react";
import type { Product } from "@/sanity/types";
import { resolveSanityImage } from "@/lib/images";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  index: number;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, showCategory = true }) => {
  const imageUrl = resolveSanityImage(product.coverImage, { width: 640, quality: 80 });
  const cleanSlug = stegaClean(product.slug);
  const productHref = `/products/${cleanSlug}`;
  const categoryName = product.category?.name || "Uncategorized";
  const titleId = `product-card-title-${cleanSlug}`;
  const variantCount = product.variants?.length || 0;

  return (
    <article
      className={`${styles.productCard}${showCategory ? "" : ` ${styles.productCardNoCategory}`}`}
      data-category={categoryName}
    >
      <Link href={productHref} className={styles.productCardLink} aria-labelledby={titleId}>
        <div className={styles.productMedia} aria-hidden="true">
          {imageUrl ? (
            <ProductImageFrame
              src={imageUrl}
              alt={product.coverImage?.alt || product.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ratio="1x1"
              imageClassName={styles.productMediaImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <Camera size={48} strokeWidth={1} />
              <span>Image coming soon</span>
            </div>
          )}
        </div>
        <div className={styles.productBody}>
          <div className={styles.productCardTopline}>
            <div className={styles.productMetaLeading}>
              <span className={styles.productNumber}>{(index + 1).toString().padStart(2, "0")}</span>
              {showCategory && <span className={styles.productCategoryBadge}>{categoryName}</span>}
            </div>
            {variantCount > 0 ? (
              <span className={styles.productModel}>{variantCount} models</span>
            ) : (
              product.modelCode && <span className={styles.productModel}>{product.modelCode}</span>
            )}
          </div>
          <h3 id={titleId} className={styles.productTitle}>
            {product.name}
          </h3>
          {product.description && <p className={styles.productDescription}>{product.description}</p>}
        </div>
      </Link>
    </article>
  );
};
