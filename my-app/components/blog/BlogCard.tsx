import React from "react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowRight } from "lucide-react";

import type { SanityImage } from "@/sanity/types";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: SanityImage;
  slug: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category, coverImage, slug }) => {
  const displayDate = date.slice(0, 10);
  const cleanImage = stegaClean(coverImage?.url || "");
  const cleanSlug = stegaClean(slug);

  return (
    <article className="news-card">
      <div
        className="news-image"
        aria-label={stegaClean(coverImage?.alt || title)}
        role="img"
        style={{ "--card-image": `url('${cleanImage}')` } as React.CSSProperties}
      />
      <div className="news-body">
        <div className="news-meta">
          <span>{displayDate}</span>
          <span>{category}</span>
        </div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link href={`/news/${cleanSlug}`} className="text-link">
          Read More <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
