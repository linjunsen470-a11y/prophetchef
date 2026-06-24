import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import { Category } from "@/sanity/types";
import type { SectionHeaderData } from "@/sanity/types";
import { categories as staticCategories } from "@/data/categories";
import { ProductImageFrame } from "@/components/product/ProductImageFrame";

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
        <h2>{header?.title || "Commercial Induction Equipment for B2B Buyers"}</h2>
        <p>
          {header?.description ||
            "Browse ProphetChef core product families for restaurants, hotels, school canteens and central kitchen projects."}
        </p>
      </Container>
      <Container className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-[22px]">
        {displayCategories.map((cat) => {
          const name = cat.name;
          const description = cat.description;
          const image = typeof cat.image === "object" ? cat.image?.url : cat.image;
          const href = `/products/category/${cat.slug}`;

          return (
            <article key={name} className="bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_26px_rgba(9,24,39,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(9,24,39,0.08)]">
              {image ? (
                <ProductImageFrame
                  src={image}
                  alt={name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="aspect-square w-full bg-[#f4f7f9] flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}
              <div className="p-[22px]">
                <h3 className="m-0 mb-2.5 text-[20px] leading-[1.25] font-extrabold text-[color:var(--text)]">{name}</h3>
                <p className="text-[color:var(--muted)] m-0 mb-4">{description}</p>
                <Link href={href} className="inline-flex items-center gap-1.5 font-extrabold text-[color:var(--orange)] hover:text-[color:var(--orange-dark)] transition-colors">
                  View Category <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
};


