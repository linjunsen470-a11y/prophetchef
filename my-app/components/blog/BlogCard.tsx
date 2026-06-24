import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowRight, Camera } from "lucide-react";

import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import type { NewsCategory, SanityImage } from "@/sanity/types";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category?: NewsCategory;
  coverImage?: SanityImage;
  slug: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category, coverImage, slug }) => {
  const displayDate = date.slice(0, 10);
  const imageUrl = resolveSanityImage(coverImage, { width: 560, quality: 80 }) || null;
  const cleanImageUrl = imageUrl ? stegaClean(imageUrl) : null;
  const cleanSlug = stegaClean(slug);
  const categoryLabel = category?.title || "News";

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={shouldSkipNextOptimization(cleanImageUrl)}
            className={styles.mediaImage}
          />
        ) : (
          <div className={styles.mediaPlaceholder}>
            <Camera size={32} strokeWidth={1} />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{displayDate}</span>
          <span className={styles.category}>{categoryLabel}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <Link href={`/news/${cleanSlug}`} className={styles.readMore}>
          Read More
          <ArrowRight aria-hidden="true" className={styles.readMoreIcon} />
        </Link>
      </div>
    </article>
  );
};