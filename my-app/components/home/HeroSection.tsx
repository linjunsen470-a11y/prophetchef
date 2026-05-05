import { Send, Factory, Globe2, Clock3 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/common/Button";
import styles from "@/components/common/Hero.module.css";

export const HeroSection = () => {
  return (
    <section 
      className={styles.hero} 
      style={{ "--hero-image": `url('${siteConfig.homeHeroImage}')` } as React.CSSProperties}
    >
      <div className={styles.heroOverlay}></div>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow light">Commercial Foodservice Equipment Factory</span>
          <h1>Commercial Kitchen Equipment for Global Foodservice Projects</h1>
          <p>Factory-direct induction cooking, automatic cooking machines, combi ovens, dishwashers and complete stainless steel kitchen solutions.</p>
          <div className={styles.heroActions}>
            <Button variant="primary" href="/products">View Products</Button>
            <Button variant="outline-light" href="/contact">Contact Supplier <Send aria-hidden="true" /></Button>
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
            <span>Years Manufacturing</span>
          </div>
          <div>
            <Globe2 aria-hidden="true" />
            <strong>50+</strong>
            <span>Export Countries</span>
          </div>
          <div>
            <Clock3 aria-hidden="true" />
            <strong>24h</strong>
            <span>Fast Quotation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
