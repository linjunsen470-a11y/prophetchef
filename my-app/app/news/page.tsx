"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CTASection } from "@/components/common/CTASection";

const newsItems = [
  {
    id: 1,
    title: "Why Commercial Kitchens Are Switching to Induction Cooking",
    excerpt: "Induction cooking is becoming a practical upgrade for restaurants, canteens and central kitchens seeking cleaner heat and lower operating costs.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-18",
    category: "Industry News",
    slug: "why-switching-to-induction"
  },
  {
    id: 2,
    title: "How to Choose an Automatic Cooking Machine for Chain Restaurants",
    excerpt: "Key points for evaluating capacity, recipe standardization, cleaning convenience and after-sales support.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-10",
    category: "Product Knowledge",
    slug: "how-to-choose-automatic-cooking-machine"
  },
  {
    id: 3,
    title: "Complete Commercial Kitchen Equipment Checklist for New Restaurants",
    excerpt: "A practical planning checklist for new foodservice projects, covering cooking, dishwashing, preparation and storage.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-28",
    category: "Product Knowledge",
    slug: "kitchen-equipment-checklist"
  },
  {
    id: 4,
    title: "The Real Cost-Saving Benefits of Commercial Induction Cookers",
    excerpt: "A clear look at energy efficiency, maintenance reduction and working environment improvements.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-15",
    category: "Industry News",
    slug: "cost-saving-benefits-induction"
  },
  {
    id: 5,
    title: "How Combi Ovens Improve Kitchen Efficiency",
    excerpt: "Combi ovens help operators reduce equipment footprint while improving production consistency.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-02",
    category: "Product Knowledge",
    slug: "how-combi-ovens-improve-efficiency"
  },
  {
    id: 6,
    title: "Commercial Dishwasher Buying Guide for Hotels",
    excerpt: "Selection advice for hotel buyers comparing undercounter, hood type and conveyor dishwashers.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-20",
    category: "Product Knowledge",
    slug: "commercial-dishwasher-buying-guide"
  },
  {
    id: 7,
    title: "Central Kitchen Equipment Planning Tips",
    excerpt: "How to plan cooking lines, washing zones and preparation areas for central kitchen projects.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-06",
    category: "Company News",
    slug: "central-kitchen-planning-tips"
  },
  {
    id: 8,
    title: "OEM Kitchen Equipment: What Distributors Should Know",
    excerpt: "Important considerations for brand customization, certification documents and stable supply.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-22",
    category: "Company News",
    slug: "oem-kitchen-equipment-distributors"
  },
  {
    id: 9,
    title: "Gas vs Induction Cooking in Commercial Kitchens",
    excerpt: "A balanced comparison of power source, heat control, installation requirements and kitchen workflow.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-10",
    category: "Industry News",
    slug: "gas-vs-induction-cooking"
  }
];

const categories = ["All", "Company News", "Industry News", "Product Knowledge"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <main>
      <PageHero 
        eyebrow="News"
        title="News & Industry Insights"
        description="Commercial kitchen equipment knowledge, product selection guides and company updates."
        backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80"
      />
      
      <section className="section">
        <Container className="flex gap-2 flex-wrap mb-[28px]">
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

        <Container className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {filteredNews.map((item) => (
            <BlogCard key={item.id} {...item} />
          ))}
        </Container>
      </section>

      <CTASection />
    </main>
  );
}

