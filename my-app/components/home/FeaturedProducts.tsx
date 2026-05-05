import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { products } from "@/data/products";
import { Container } from "../common/Container";
import { ProductCard } from "../product/ProductCard";

export const FeaturedProducts = () => {
  // Just show the first 6 products as featured
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="section bg-light">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">Featured Products</span>
          <h2>Factory Direct Commercial Foodservice Equipment</h2>
        </div>
        <Button variant="secondary" href="/products">View All Products</Button>
      </Container>
      
      <Container className="product-grid">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </Container>
    </section>
  );
};
