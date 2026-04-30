import React from "react";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  backgroundImage,
  children,
}) => {
  return (
    <section className="page-hero" style={{ "--hero-image": `url('${backgroundImage}')` } as React.CSSProperties}>
      <div className="hero-overlay"></div>
      <Container className="page-hero-content">
        {eyebrow && <span className="eyebrow light">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </Container>
    </section>
  );
};
