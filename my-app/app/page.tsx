import { siteConfig } from "@/data/site";
import type { CSSProperties } from "react";
import Link from "next/link";

const categories = [
  {
    title: "Commercial Induction Cookers",
    description: "High-power induction cooking for wok ranges, stock pots and modular cook lines.",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Commercial-Induction-Cookers",
  },
  {
    title: "Automatic Cooking Machines",
    description: "Recipe-controlled automatic cooking for chain restaurants and central kitchens.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Automatic-Cooking-Machines",
  },
  {
    title: "Combi Ovens",
    description: "Steam and convection ovens for efficient baking, roasting and reheating.",
    image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Combi-Ovens",
  },
  {
    title: "Commercial Dishwashers",
    description: "Undercounter, hood type and project dishwashing equipment.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    href: "/products#Commercial-Dishwashers",
  },
  {
    title: "Modular Cooking Systems",
    description: "Integrated stainless steel cooking suites for professional kitchens.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    href: "/products#Modular-Cooking-Systems",
  },
  {
    title: "Custom Kitchen Solutions",
    description: "OEM / ODM equipment and one-stop planning for global foodservice projects.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    href: "/products#Custom-Kitchen-Solutions",
  },
];

const products = [
  {
    name: "Heavy Duty Commercial Induction Wok Cooker",
    category: "Commercial Induction Cookers",
    description: "High-power wok station for hotel, canteen and central kitchen cooking lines.",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    tags: ["8-30kW", "SUS304", "CE"],
  },
  {
    name: "360° Automatic Stir-fry Cooking Machine",
    category: "Automatic Cooking Machines",
    description: "Programmable rotating cooker for standardized recipes and chain restaurants.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    tags: ["Auto Stir", "Touch Panel", "OEM"],
  },
  {
    name: "Commercial Combi Steam Oven",
    category: "Combi Ovens",
    description: "Steam, convection and mixed cooking modes for efficient batch production.",
    image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["6/10/20 Trays", "Steam", "Digital"],
  },
  {
    name: "Hood Type Commercial Dishwasher",
    category: "Commercial Dishwashers",
    description: "High-temperature washing system for hotels, schools and catering kitchens.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Rack Type", "Low Water", "Fast Cycle"],
  },
  {
    name: "Modular Induction Cooking Range",
    category: "Modular Cooking Systems",
    description: "Integrated commercial cooking line for professional open kitchens.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    tags: ["Modular", "Custom", "Heavy Duty"],
  },
  {
    name: "Automatic Pasta Cooker",
    category: "Food Processing Equipment",
    description: "Stainless steel electric pasta boiler for fast food and restaurant chains.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    tags: ["6 Baskets", "Timer", "Easy Clean"],
  },
];

const applications = [
  ["01", "School Cafeteria", "Large-batch cooking and dishwashing equipment for safe daily meal service."],
  ["02", "Hotel Kitchen", "Professional cooking, ovens and washing lines for all-day operations."],
  ["03", "Chain Restaurant", "Standardized equipment for repeatable recipes and faster staff training."],
  ["04", "Central Kitchen", "Custom stainless steel equipment for high-volume production and dispatch."],
];

const news = [
  {
    date: "2026-04-18",
    category: "Industry News",
    title: "Why Commercial Kitchens Are Switching to Induction Cooking",
    excerpt: "Induction cooking is becoming a practical upgrade for restaurants, canteens and central kitchens seeking cleaner heat and lower operating costs.",
  },
  {
    date: "2026-04-10",
    category: "Product Knowledge",
    title: "How to Choose an Automatic Cooking Machine for Chain Restaurants",
    excerpt: "Key points for evaluating capacity, recipe standardization, cleaning convenience and after-sales support.",
  },
  {
    date: "2026-03-28",
    category: "Product Knowledge",
    title: "Complete Commercial Kitchen Equipment Checklist for New Restaurants",
    excerpt: "A practical planning checklist for new foodservice projects, covering cooking, dishwashing, preparation and storage.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero-home" style={{ "--hero-image": `url('${siteConfig.ogImage}')` } as CSSProperties}>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow light">Commercial Foodservice Equipment Factory</span>
          <h1>Commercial Kitchen Equipment Manufacturer for Global Foodservice Projects</h1>
          <p>20+ years of manufacturing experience in induction cooking, automatic cooking machines, combi ovens, dishwashers and complete kitchen solutions.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/products">View Products</Link>
            <Link className="btn btn-outline-light" href="/contact">Contact Supplier</Link>
          </div>
          <div className="trust-tags">
            <span>OEM / ODM Available</span>
            <span>CE / ISO Certified</span>
            <span>Fast Quotation Within 24 Hours</span>
          </div>
        </div>
      </section>

      <section className="trust-bar">
        <div className="container trust-grid">
          <div><strong>20+</strong><span>Years Experience</span></div>
          <div><strong>15000m²</strong><span>Factory Area</span></div>
          <div><strong>750+</strong><span>Skilled Employees</span></div>
          <div><strong>50+</strong><span>Export Countries</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <span className="eyebrow">Product Categories</span>
          <h2>Commercial Kitchen Equipment for B2B Buyers</h2>
          <p>Find core equipment categories for restaurants, hotels, school canteens and central kitchen projects.</p>
        </div>
        <div className="container category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.title}>
              <div className="category-image">
                <img src={category.image} alt={category.title} loading="lazy" />
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link href={category.href} className="text-link">View Category →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-light">
        <div className="container section-heading split-heading">
          <div>
            <span className="eyebrow">Featured Products</span>
            <h2>Factory Direct Commercial Foodservice Equipment</h2>
          </div>
          <Link className="btn btn-secondary" href="/products">View All Products</Link>
        </div>
        <div className="container product-grid featured-grid">
          {products.map((product, index) => (
            <article className="product-card" data-category={product.category} key={product.name}>
              <div className="product-media">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="product-body">
                <div className="product-number">{String(index + 1).padStart(2, "0")}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="tag-row">
                  {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="card-actions">
                  <Link className="btn btn-primary btn-small quick-inquiry" href={`/contact?product=${encodeURIComponent(product.name)}`}>Quick Inquiry</Link>
                  <Link className="btn btn-secondary btn-small" href="/products/heavy-duty-commercial-induction-wok-cooker">View Details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section factory-preview">
        <div className="container two-col align-center">
          <div className="image-stack">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80" alt="Commercial kitchen equipment production base" loading="lazy" />
          </div>
          <div>
            <span className="eyebrow">Factory Strength</span>
            <h2>Built for Stable Supply and Global Project Delivery</h2>
            <p>Our production base integrates laser cutting, bending, welding, assembly and testing lines, supported by R&D, QC, sales and after-sales teams.</p>
            <ul className="check-list">
              <li>20+ years manufacturing experience</li>
              <li>15000m² production base</li>
              <li>Integrated metal processing and assembly workflow</li>
              <li>Export support for distributors and project contractors</li>
            </ul>
            <Link className="btn btn-primary" href="/factory">Explore Our Factory</Link>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container section-heading split-heading">
          <div>
            <span className="eyebrow">Applications</span>
            <h2>Solutions for Different Kitchen Projects</h2>
          </div>
          <Link className="btn btn-secondary" href="/applications">View Applications</Link>
        </div>
        <div className="container application-preview-grid">
          {applications.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading split-heading">
          <div>
            <span className="eyebrow">Certificates</span>
            <h2>Compliance Support for Global Buyers</h2>
          </div>
          <Link className="btn btn-secondary" href="/certificates">View Certificates</Link>
        </div>
        <div className="container certificate-strip">
          {["CE", "ISO 9001", "RoHS", "ETL", "Inspection Report", "Patent Certificate"].map((cert) => (
            <div key={cert}>{cert}</div>
          ))}
        </div>
      </section>

      <section className="section bg-light">
        <div className="container section-heading split-heading">
          <div>
            <span className="eyebrow">News</span>
            <h2>Industry Insights and Product Knowledge</h2>
          </div>
          <Link className="btn btn-secondary" href="/news">View All News</Link>
        </div>
        <div className="container news-grid">
          {news.map((item) => (
            <article className="news-card" data-category={item.category} key={item.title}>
              <div className="news-image">
                <img src="https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80" alt={item.title} loading="lazy" />
              </div>
              <div className="news-body">
                <div className="news-meta"><span>{item.date}</span><span>{item.category}</span></div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link className="text-link" href="/news/why-commercial-kitchens-switching-induction">Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-cta">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Project Inquiry</span>
            <h2>Get a Free Quote Today</h2>
            <p>Tell us your kitchen project requirements. Our team will recommend suitable equipment and provide a fast quotation.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/contact">Send Inquiry</Link>
            <a className="btn btn-outline-light" href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`} target="_blank" rel="noopener">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
