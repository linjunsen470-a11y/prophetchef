import React from "react";
import { Container } from "../common/Container";

const categories = [
  {
    title: "Commercial Induction Cookers",
    description: "High-power induction cooking for wok ranges, stock pots and modular cook lines.",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Commercial-Induction-Cookers"
  },
  {
    title: "Automatic Cooking Machines",
    description: "Recipe-controlled automatic cooking for chain restaurants and central kitchens.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Automatic-Cooking-Machines"
  },
  {
    title: "Combi Ovens",
    description: "Steam and convection ovens for efficient baking, roasting and reheating.",
    image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Combi-Ovens"
  },
  {
    title: "Commercial Dishwashers",
    description: "Undercounter, hood type and project dishwashing equipment.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Commercial-Dishwashers"
  },
  {
    title: "Modular Cooking Systems",
    description: "Integrated stainless steel cooking suites for professional kitchens.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    href: "/products#Modular-Cooking-Systems"
  },
  {
    title: "Custom Kitchen Solutions",
    description: "OEM / ODM equipment and one-stop planning for global foodservice projects.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    href: "/products#Custom-Kitchen-Solutions"
  }
];

export const ProductCategories = () => {
  return (
    <section className="section">
      <Container className="section-heading">
        <span className="eyebrow">Product Categories</span>
        <h2>Commercial Kitchen Equipment for B2B Buyers</h2>
        <p>Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects.</p>
      </Container>
      <Container className="category-grid">
        {categories.map((cat) => (
          <article key={cat.title} className="category-card">
            <div className="category-image">
              <img src={cat.image} alt={cat.title} loading="lazy" />
            </div>
            <div className="category-content">
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <a href={cat.href} className="text-link">View Category →</a>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
};
