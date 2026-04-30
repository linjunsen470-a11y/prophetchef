import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <article className="product-card" data-category={product.category}>
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <div className="product-number">{(index + 1).toString().padStart(2, "0")}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="tag-row">
          {product.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-actions">
          <Link 
            href={`/contact?product=${encodeURIComponent(product.name)}`} 
            className="btn btn-primary btn-small quick-inquiry"
          >
            Quick Inquiry
          </Link>
          <Link 
            href={`/products/${product.slug}`} 
            className="btn btn-secondary btn-small"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};
