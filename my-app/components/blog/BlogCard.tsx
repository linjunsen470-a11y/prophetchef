import React from "react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, category, image, slug }) => {
  return (
    <article className="news-card">
      <div className="news-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="news-body">
        <div className="news-meta">
          <span>{date}</span>
          <span>{category}</span>
        </div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link href={`/news/${slug}`} className="text-link">
          Read More →
        </Link>
      </div>
    </article>
  );
};
