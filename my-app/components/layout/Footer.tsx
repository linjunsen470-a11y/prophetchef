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

import { SiteSettings } from "@/sanity/types";

interface FooterProps {
  settings?: SiteSettings | null;
}

export const Footer = ({ settings }: FooterProps) => {
  const siteName = settings?.title || siteConfig.name;
  const description = settings?.description || siteConfig.description;
  const contact = settings?.contactInfo || {
    email: siteConfig.email,
    phone: siteConfig.phone,
    address: siteConfig.address,
  };

  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerIntro}>
          <Link className={styles.footerBrand} href="/">
            {settings?.logo?.url ? (
              <img src={settings.logo.url} alt={siteName} className={styles.footerLogo} />
            ) : (
              <>
                <span className={styles.brandMark}>PKT</span>
                <span>{siteName}</span>
              </>
            )}
          </Link>
          <p>{description}</p>
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
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span><PhoneCall aria-hidden="true" />WhatsApp</span>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener">
              {contact.phone}
            </a>
            <span><MapPin aria-hidden="true" />Address</span>
            <p>{contact.address}</p>
          </address>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <span>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</span>
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
