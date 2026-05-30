import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowRight, Camera } from "lucide-react";

import type { NewsCategory, SanityImage } from "@/sanity/types";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category?: NewsCategory;
  coverImage: SanityImage;
  slug: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category, coverImage, slug }) => {
  const displayDate = date.slice(0, 10);
  const cleanImage = stegaClean(coverImage?.url || null);
  const cleanSlug = stegaClean(slug);
  const categoryLabel = category?.title || "News";

  return (
    <article className="bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_30px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
      <div className="relative h-[210px] w-full overflow-hidden bg-[linear-gradient(135deg,rgba(30,58,95,0.2),rgba(249,115,22,0.1))] bg-slate-200">
        {cleanImage ? (
          <Image 
            src={cleanImage}
            alt={stegaClean(coverImage?.alt || title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover h-[210px] w-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-400">
            <Camera size={32} strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="p-[22px]">
        <div className="flex flex-wrap gap-3 text-[color:var(--muted)] text-[13px] mb-2.5">
          <span>{displayDate}</span>
          <span className="text-[color:var(--orange)] font-extrabold">{categoryLabel}</span>
        </div>
        <h3 className="m-0 mb-2.5 text-[20px] leading-[1.25] font-extrabold text-[color:var(--text)]">{title}</h3>
        <p className="text-[color:var(--muted)] m-0 mb-4">{excerpt}</p>
        <Link href={`/news/${cleanSlug}`} className="inline-flex items-center gap-1.5 font-extrabold text-[color:var(--orange)] hover:text-[color:var(--orange-dark)] transition-colors">
          Read More <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};
