import { Send, Factory, Globe2, Clock3, Maximize } from "lucide-react";
import { Button } from "@/components/common/Button";
import styles from "@/components/common/Hero.module.css";
import { siteConfig } from "@/data/site";

interface HeroSectionProps {
  data?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: {
      text?: string;
      link?: string;
    };
  };
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const eyebrow = data?.eyebrow || "Commercial Foodservice Equipment Factory";
  const title = data?.title || "Commercial Kitchen Equipment for Global Foodservice Projects";
  const description =
    data?.description ||
    "Factory-direct induction cooking, automatic cooking machines, combi ovens, dishwashers and complete stainless steel kitchen solutions.";
  const ctaText = data?.cta?.text || "View Products";
  const ctaLink = data?.cta?.link || "/products";

  return (
    <section className={`${styles.hero} ${styles.homeHeroCompact}`}>
      <div className={styles.heroOverlay}></div>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow light">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.heroActions}>
            <Button variant="primary" href={ctaLink}>{ctaText}</Button>
            <Button variant="outline-light" href="/contact">
              Contact Supplier <Send aria-hidden="true" />
            </Button>
          </div>
          <div className={styles.trustTags}>
            {siteConfig.trustTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroProof} aria-label="Factory capabilities">
          <div>
            <Factory aria-hidden="true" />
            <strong>20+</strong>
            <span>Years Mfg.</span>
          </div>
          <div>
            <Maximize aria-hidden="true" />
            <strong>15000+</strong>
            <span>Area (m²)</span>
          </div>
          <div>
            <Globe2 aria-hidden="true" />
            <strong>50+</strong>
            <span>Countries</span>
          </div>
          <div>
            <Clock3 aria-hidden="true" />
            <strong>24h</strong>
            <span>Fast Quote</span>
          </div>
        </div>
      </div>
    </section>
  );
};
