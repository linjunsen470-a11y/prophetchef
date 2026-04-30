import React from "react";
import { Container } from "../common/Container";

export const FactoryPreview = () => {
  return (
    <section className="section factory-preview">
      <Container className="two-col align-center">
        <div className="image-stack">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80" 
            alt="Commercial kitchen equipment production base" 
            loading="lazy" 
          />
        </div>
        <div>
          <span className="eyebrow">Factory Strength</span>
          <h2>Built for Stable Supply and Global Project Delivery</h2>
          <p>Our production base integrates laser cutting, bending, welding, assembly and testing lines, supported by R&D, QC, sales and after-sales teams.</p>
          <ul className="check-list">
            <li>20+ years manufacturing experience</li>
            <li>15000㎡ production base</li>
            <li>Integrated metal processing and assembly workflow</li>
            <li>Export support for distributors and project contractors</li>
          </ul>
          <a className="btn btn-primary" href="/factory">Explore Our Factory</a>
        </div>
      </Container>
    </section>
  );
};
