import React from "react";
import { Container } from "../common/Container";
import { Button } from "@/components/common/Button";
import { CheckCircle2 } from "lucide-react";

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
            <li><CheckCircle2 aria-hidden="true" />20+ years manufacturing experience</li>
            <li><CheckCircle2 aria-hidden="true" />15000㎡ production base</li>
            <li><CheckCircle2 aria-hidden="true" />Integrated metal processing and assembly workflow</li>
            <li><CheckCircle2 aria-hidden="true" />Export support for distributors and project contractors</li>
          </ul>
          <Button variant="primary" href="/factory">Explore Our Factory</Button>
        </div>
      </Container>
    </section>
  );
};
