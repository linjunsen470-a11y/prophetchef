import React from "react";
import { siteConfig } from "@/data/site";

export const HeroSection = () => {
  return (
    <section 
      className="hero hero-home" 
      style={{ "--hero-image": `url('${siteConfig.ogImage}')` } as React.CSSProperties}
    >
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="eyebrow light">Commercial Foodservice Equipment Factory</span>
        <h1>Commercial Kitchen Equipment Manufacturer for Global Foodservice Projects</h1>
        <p>20+ years of manufacturing experience in induction cooking, automatic cooking machines, combi ovens, dishwashers and complete kitchen solutions.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/products">View Products</a>
          <a className="btn btn-outline-light" href="/contact">Contact Supplier</a>
        </div>
        <div className="trust-tags">
          {siteConfig.trustTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
