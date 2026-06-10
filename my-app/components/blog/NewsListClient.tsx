"use client";

import React, { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/common/Container";
import type { NewsItem } from "@/sanity/types";

interface NewsListClientProps {
  newsItems: NewsItem[];
}

export function NewsListClient({ newsItems }: NewsListClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(newsItems.flatMap((item) => (item.category?.title ? [item.category.title] : [])))).sort()],
    [newsItems],
  );

  const filteredNews = activeCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category?.title === activeCategory);

  return (
    <Container className="flex flex-col gap-10 max-[760px]:gap-8">
      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              className={`min-h-[48px] px-[18px] py-[11px] border rounded-[7px] text-[color:var(--text)] font-extrabold cursor-pointer transition-colors ${isActive ? "border-[color:var(--blue)] bg-[color:var(--blue)] text-white" : "border-[color:var(--border)] bg-white hover:border-[color:var(--blue)] hover:bg-[color:var(--blue)] hover:text-white"}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-6">
        {filteredNews.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </Container>
  );
}
