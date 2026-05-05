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
    () => ["All", ...Array.from(new Set(newsItems.map((item) => item.category))).sort()],
    [newsItems],
  );

  const filteredNews = activeCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <Container className="news-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`news-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </Container>

      <Container className="news-grid">
        {filteredNews.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </Container>
    </>
  );
}
