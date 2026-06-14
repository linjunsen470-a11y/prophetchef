import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Mail, MapPin, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/site";
import { getIcon } from "@/components/common/IconByName";
import { getContactInfo, getSiteName } from "@/lib/site-settings";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import styles from "./Footer.module.css";

const productLinks = [
  ["Tabletop & Built-in Induction Equipment", "/products?category=tabletop-built-in-induction-equipment"],
  ["Automatic Cooking Machines", "/products?category=automatic-cooking-machines"],
  ["Steamers, Ovens & Soup Kettles", "/products?category=steamers-ovens-soup-kettles"],
  ["Freestanding Wok & Soup Cookers", "/products?category=freestanding-wok-soup-cookers"],
  ["Freestanding Induction Line", "/products?category=freestanding-induction-line"],
  ["Specialty Cooking Equipment", "/products?category=specialty-cooking-equipment"],
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
  const siteName = getSiteName(settings);
  const logo = settings?.logoLight || settings?.logo;
  const logoSrc = logo ? resolveSanityImage(logo, { width: 320, quality: 85 }) : undefined;
  const description = settings?.description || siteConfig.description;
  const contact = getContactInfo(settings);
  const socialLinks = settings?.socialLinks?.filter((link) => link.platform && link.url) || [];
  const products = settings?.footerProductLinks?.length
    ? settings.footerProductLinks.map((link) => [link.label, link.href] as const)
    : productLinks;
  const company = settings?.footerCompanyLinks?.length
    ? settings.footerCompanyLinks.map((link) => [link.label, link.href] as const)
    : companyLinks;
  const badges = settings?.footerBadges?.length
    ? settings.footerBadges
    : [
        { label: "OEM / ODM", value: "", icon: "badgeCheck" },
        { label: "CE / ISO", value: "", icon: "badgeCheck" },
        { label: "Factory Direct", value: "", icon: "factory" },
      ];

  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerIntro}>
          <Link className={styles.footerBrand} href="/">
            {logoSrc ? (
              <div className="relative h-10 w-40">
                <Image 
                  src={logoSrc} 
                  alt={siteName} 
                  fill 
                  sizes="160px"
                  unoptimized={shouldSkipNextOptimization(logoSrc)}
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <>
                <span className={styles.brandMark}>PKT</span>
                <span>{siteName}</span>
              </>
            )}
          </Link>
          <p>{description}</p>
          <div className={styles.footerBadges} aria-label="Company capabilities">
            {badges.map((badge) => {
              const Icon = getIcon(badge.icon, BadgeCheck);
              return (
                <span key={badge.label}>
                  <Icon aria-hidden="true" />
                  {badge.label}
                </span>
              );
            })}
          </div>
          {socialLinks.length > 0 && (
            <div className={styles.socialLinks} aria-label="Social links">
              {socialLinks.map((link) => (
                <a href={link.url} key={`${link.platform}-${link.url}`} target="_blank" rel="noopener">
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footerLinks}>
          <h3>Products</h3>
          {products.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.footerLinks}>
          <h3>Company</h3>
          {company.map(([label, href]) => (
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
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">
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
