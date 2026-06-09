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
      <Container className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-[22px]">
        {displayCategories.map((cat) => {
          const name = cat.name;
          const description = cat.description;
          const image = typeof cat.image === "object" ? cat.image?.url : cat.image;
          const href = "slug" in cat ? `/products?category=${cat.slug}` : cat.href;

          return (
            <article key={name} className="bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_26px_rgba(9,24,39,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(9,24,39,0.08)]">
              <div className="relative h-[190px] w-full">
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
