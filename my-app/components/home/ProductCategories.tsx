import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { Category } from "@/sanity/types";
import { categories as staticCategories } from "@/data/categories";

type StaticCategory = (typeof staticCategories)[number];
type DisplayCategory = Category | StaticCategory;

interface ProductCategoriesProps {
  categories?: Category[];
}

export const ProductCategories = ({ categories }: ProductCategoriesProps) => {
  const displayCategories: DisplayCategory[] = categories?.length ? categories : staticCategories;

  return (
    <section className="section">
      <Container className="section-heading">
        <span className="eyebrow">Product Categories</span>
        <h2>Commercial Kitchen Equipment for B2B Buyers</h2>
        <p>Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects.</p>
      </Container>
      <Container className="category-grid">
        {displayCategories.map((cat) => {
          const name = cat.name;
          const description = cat.description;
          const image = typeof cat.image === "object" ? cat.image?.url : cat.image;
          const href = "slug" in cat ? `/products?category=${cat.slug}` : cat.href;

          return (
            <article key={name} className="category-card">
              <div className="category-image">
                <img src={image} alt={name} loading="lazy" />
              </div>
              <div className="category-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <Link href={href} className="text-link">
                  View Category <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
};
