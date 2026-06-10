import React from "react";
import { Container } from "./Container";
import styles from "./Hero.module.css";
import { heroImages } from "@/data/hero-images";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  compact?: boolean;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  backgroundImage = heroImages.fallback,
  backgroundImageAlt = "",
  compact = false,
  children,
}) => {
  return (
    <section className={`${styles.pageHero} ${compact ? styles.pageHeroCompact : ""}`}>
      {/* Keep CMS image URLs in the DOM for Presentation click-to-edit overlays. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImage}
        alt={backgroundImageAlt}
        className={styles.heroBackgroundImage}
      />
      <div className={styles.heroOverlay}></div>
      <Container className={styles.pageHeroContent}>
        {eyebrow && <span className="eyebrow light">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </Container>
    </section>
  );
};