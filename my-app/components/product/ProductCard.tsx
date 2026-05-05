import React from "react";
import Link from "next/link";
import { ArrowRight, PackageCheck, Send } from "lucide-react";
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
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-body">
        <div className="product-card-topline">
          <div className="product-number">{(index + 1).toString().padStart(2, "0")}</div>
          <span><PackageCheck aria-hidden="true" />Factory supply</span>
        </div>
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
            <Send aria-hidden="true" />
          </Link>
          <Link 
            href={`/products/${product.slug}`} 
            className="btn btn-secondary btn-small"
          >
            View Details
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
