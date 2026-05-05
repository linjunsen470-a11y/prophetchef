import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowRight, Camera } from "lucide-react";

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
  const cleanImage = stegaClean(coverImage?.url || null);
  const cleanSlug = stegaClean(slug);

  return (
    <article className="news-card">
      <div className="news-image">
        {cleanImage ? (
          <Image 
            src={cleanImage}
            alt={stegaClean(coverImage?.alt || title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-400">
            <Camera size={32} strokeWidth={1} />
          </div>
        )}
      </div>
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
