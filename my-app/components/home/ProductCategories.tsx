import React from "react";
import { Container } from "../common/Container";
import { categories } from "@/data/categories";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const ProductCategories = () => {
  return (
    <section className="section">
      <Container className="section-heading">
        <span className="eyebrow">Product Categories</span>
        <h2>Commercial Kitchen Equipment for B2B Buyers</h2>
        <p>Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects.</p>
      </Container>
      <Container className="category-grid">
        {categories.map((cat) => (
          <article key={cat.name} className="category-card">
            <div className="category-image">
              <img src={cat.image} alt={cat.name} loading="lazy" />
            </div>
            <div className="category-content">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <Link href={cat.href} className="text-link">
                View Category <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
};
