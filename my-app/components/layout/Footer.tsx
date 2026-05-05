import Link from "next/link";
import { BadgeCheck, Factory, Mail, MapPin, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/site";
import styles from "./Footer.module.css";

const productLinks = [
  ["Commercial Induction Cookers", "/products#Commercial-Induction-Cookers"],
  ["Automatic Cooking Machines", "/products#Automatic-Cooking-Machines"],
  ["Combi Ovens", "/products#Combi-Ovens"],
  ["Commercial Dishwashers", "/products#Commercial-Dishwashers"],
  ["Modular Cooking Systems", "/products#Modular-Cooking-Systems"],
  ["Custom Kitchen Solutions", "/products#Custom-Kitchen-Solutions"],
];

const companyLinks = [
  ["Factory", "/factory"],
  ["Applications", "/applications"],
  ["Certificates", "/certificates"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

export const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerIntro}>
          <Link className={styles.footerBrand} href="/">
            <span className={styles.brandMark}>PKT</span>
            <span>{siteConfig.name}</span>
          </Link>
          <p>{siteConfig.description}</p>
          <div className={styles.footerBadges} aria-label="Company capabilities">
            <span><BadgeCheck aria-hidden="true" />OEM / ODM</span>
            <span><BadgeCheck aria-hidden="true" />CE / ISO</span>
            <span><Factory aria-hidden="true" />Factory Direct</span>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h3>Products</h3>
          {productLinks.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.footerLinks}>
          <h3>Company</h3>
          {companyLinks.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.footerContact}>
          <h3>Contact</h3>
          <address>
            <span><Mail aria-hidden="true" />Email</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span><PhoneCall aria-hidden="true" />WhatsApp</span>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener">
              {siteConfig.phone}
            </a>
            <span><MapPin aria-hidden="true" />Address</span>
            <p>{siteConfig.address}</p>
          </address>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <span>&copy; 2026 {siteConfig.name}. All rights reserved.</span>
          <nav aria-label="Footer legal links">
            <Link href="/privacy">Privacy Policy</Link>
            <span aria-hidden="true">/</span>
            <Link href="/terms">Terms of Service</Link>
            <span aria-hidden="true">/</span>
            <Link href="/sitemap">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
