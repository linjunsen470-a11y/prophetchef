"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CTASection } from "@/components/common/CTASection";
import { newsItems } from "@/data/news";

const categories = ["All", "Company News", "Industry News", "Product Knowledge"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <>
      <PageHero 
        eyebrow="News"
        title="News & Industry Insights"
        description="Commercial kitchen equipment knowledge, product selection guides and company updates."
        backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80"
      />
      
      <section className="section">
        <Container className="news-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`news-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </Container>

        <Container className="news-grid">
          {filteredNews.map((item) => (
            <BlogCard key={item.id} {...item} />
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
