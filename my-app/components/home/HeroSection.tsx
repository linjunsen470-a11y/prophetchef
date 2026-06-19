import { Factory, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import { getIcon } from "@/components/common/IconByName";
import styles from "@/components/common/Hero.module.css";
import { siteConfig } from "@/data/site";
import type { StatItem } from "@/sanity/types";

interface HeroSectionProps {
  data?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    backgroundImage?: {
      url?: string;
      alt?: string;
    };
    primaryCta?: {
      text?: string;
      href?: string;
    };
    secondaryCta?: {
      text?: string;
      href?: string;
    };
    trustTags?: string[];
    proofItems?: StatItem[];
  };
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const eyebrow = data?.eyebrow || "Commercial Induction Equipment Manufacturer";
  const title = data?.title || "Commercial Induction Cookers for Global Foodservice Projects";
  const description =
    data?.description ||
    "Factory-direct countertop induction cookers, commercial wok ranges, built-in modules, fryers and noodle cooking equipment for export buyers.";
  const heroImage = data?.backgroundImage?.url || siteConfig.homeHeroImage;
  const ctaText = data?.primaryCta?.text || "View Products";
  const ctaLink = data?.primaryCta?.href || "/products";
  const secondaryCtaText = data?.secondaryCta?.text || "Contact Supplier";
  const secondaryCtaLink = data?.secondaryCta?.href || "/contact";
  const trustTags = data?.trustTags?.length ? data.trustTags : siteConfig.trustTags;
  const proofItems = data?.proofItems?.length
    ? data.proofItems
    : [
        { value: "10+", label: "Years Mfg.", icon: "factory" },
        { value: "7000+", label: "Area (sqm)", icon: "maximize" },
        { value: "30+", label: "Countries", icon: "globe" },
        { value: "24h", label: "Service Support", icon: "clock" },
      ];

  return (
    <section className={`${styles.hero} ${styles.homeHeroCompact}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImage}
        alt={data?.backgroundImage?.alt || ""}
        className={styles.heroBackgroundImage}
      />
      <div className={styles.heroOverlay}></div>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow light">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.heroActions}>
            <Button variant="primary" href={ctaLink}>
              {ctaText}
            </Button>
            <Button variant="outline-light" href={secondaryCtaLink}>
              {secondaryCtaText} <Send aria-hidden="true" />
            </Button>
          </div>
          <div className={styles.trustTags}>
            {trustTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroProof} aria-label="Factory capabilities">
          {proofItems.map((item) => {
            const Icon = getIcon(item.icon, Factory);
            return (
              <div key={`${item.value}-${item.label}`}>
                <Icon aria-hidden="true" />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
