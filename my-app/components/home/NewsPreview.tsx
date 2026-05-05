import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { BlogCard } from "../blog/BlogCard";

export const NewsPreview = () => {
  const news = [
    {
      title: "Why Commercial Kitchens Are Switching to Induction Cooking",
      excerpt: "Induction cooking is becoming a practical upgrade for restaurants, canteens and central kitchens seeking cleaner heat and lower operating costs.",
      date: "2026-04-18",
      category: "Industry News",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80",
      slug: "why-commercial-kitchens-switching-induction",
    },
    {
      title: "How to Choose an Automatic Cooking Machine for Chain Restaurants",
      excerpt: "Key points for evaluating capacity, recipe standardization, cleaning convenience and after-sales support.",
      date: "2026-04-10",
      category: "Product Knowledge",
      image: "https://images.unsplash.com/photo-1590577976322-3d231fe70aba?auto=format&fit=crop&w=1200&q=80",
      slug: "how-to-choose-automatic-cooking-machine",
    },
    {
      title: "Complete Commercial Kitchen Equipment Checklist for New Restaurants",
      excerpt: "A practical planning checklist for new foodservice projects, covering cooking, dishwashing, preparation and storage.",
      date: "2026-03-28",
      category: "Product Knowledge",
      image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
      slug: "complete-commercial-kitchen-checklist",
    },
  ];

  return (
    <section className="section bg-light">
      <div className="container section-heading split-heading">
        <div>
          <span className="eyebrow">News</span>
          <h2>Industry Insights and Product Knowledge</h2>
        </div>
        <Button variant="secondary" href="/news">View All News</Button>
      </div>
      <div className="container news-grid">
        {news.map((item) => (
          <BlogCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  );
};
