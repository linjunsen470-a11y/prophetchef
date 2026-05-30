import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { Category } from "@/sanity/types";
import type { SectionHeaderData } from "@/sanity/types";
import { categories as staticCategories } from "@/data/categories";

type StaticCategory = (typeof staticCategories)[number];
type DisplayCategory = Category | StaticCategory;

interface ProductCategoriesProps {
  categories?: Category[];
  header?: SectionHeaderData;
}

export const ProductCategories = ({ categories, header }: ProductCategoriesProps) => {
  const displayCategories: DisplayCategory[] = categories?.length ? categories : staticCategories;

  return (
    <section className="section">
      <Container className="section-heading">
        <span className="eyebrow">{header?.eyebrow || "Product Categories"}</span>
        <h2>{header?.title || "Commercial Kitchen Equipment for B2B Buyers"}</h2>
        <p>
          {header?.description ||
            "Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects."}
        </p>
      </Container>
      <Container className="category-grid">
        {displayCategories.map((cat) => {
          const name = cat.name;
          const description = cat.description;
          const image = typeof cat.image === "object" ? cat.image?.url : cat.image;
          const href = "slug" in cat ? `/products?category=${cat.slug}` : cat.href;

          return (
            <article key={name} className="category-card">
              <div className="category-image relative h-[190px] w-full">
                {image ? (
                  <Image 
                    src={image} 
                    alt={name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
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
