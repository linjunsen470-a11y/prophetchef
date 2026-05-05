import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowRight, PackageCheck, Send } from "lucide-react";
import type { Product } from "@/sanity/types";
import { Button } from "@/components/common/Button";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const cleanImage = stegaClean(product.image);
  const cleanName = stegaClean(product.name);
  const cleanSlug = stegaClean(product.slug);

  return (
    <article className={styles.productCard} data-category={product.category}>
      <div className={styles.productMedia}>
        <img src={cleanImage} alt={product.name} loading="lazy" />
        <span className={styles.productCategoryBadge}>{product.category}</span>
      </div>
      <div className={styles.productBody}>
        <div className={styles.productCardTopline}>
          <div className={styles.productNumber}>{(index + 1).toString().padStart(2, "0")}</div>
          <span><PackageCheck aria-hidden="true" />Factory supply</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className={styles.tagRow}>
          {product.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.cardActions}>
          <Button 
            href={`/contact?product=${encodeURIComponent(cleanName)}`} 
            variant="primary" size="small" className="quick-inquiry"
          >
            Quick Inquiry
            <Send aria-hidden="true" />
          </Button>
          <Button 
            href={`/products/${cleanSlug}`} 
            variant="secondary" size="small"
          >
            View Details
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
};
