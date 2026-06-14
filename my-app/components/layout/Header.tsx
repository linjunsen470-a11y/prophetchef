"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/common/Button";
import { getSiteName } from "@/lib/site-settings";
import { isSanityImageUrl } from "@/lib/images";
import styles from "./Header.module.css";

import { SiteSettings } from "@/sanity/types";

interface HeaderProps {
  settings?: SiteSettings | null;
}

export const Header = ({ settings }: HeaderProps) => {
  const siteName = getSiteName(settings);
  const logo = settings?.logoLight || settings?.logo;
  const mainNavigation = settings?.mainNavigation?.length
    ? settings.mainNavigation.map((item) => ({ name: item.label, href: item.href }))
    : navigation;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const headerClasses = `${styles.siteHeader} ${isScrolled ? styles.scrolled : ""} ${isMobileMenuOpen ? styles.menuOpen : ""}`;
  const isActivePath = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className={headerClasses} id="siteHeader">
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label={`${siteName} home`}>
          {logo?.url ? (
            <div className="relative h-10 w-40">
              <Image 
                src={logo.url} 
                alt={siteName} 
                fill 
                sizes="160px"
                unoptimized={isSanityImageUrl(logo.url)}
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <>
              <span className={styles.brandMark}>PKT</span>
              <span>{siteName}</span>
            </>
          )}
        </Link>
        
        <nav className={`${styles.mainNav} ${isMobileMenuOpen ? styles.open : ""}`} id="mainNav" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={isActivePath(item.href) ? styles.active : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/contact" className={styles.mobileQuoteLink} onClick={() => setIsMobileMenuOpen(false)}>
            Get Quote
            <Send aria-hidden="true" />
          </Link>
        </nav>

        <div className={styles.headerActions}>
          <Button variant="primary" size="small" href="/contact" className={styles.getQuoteBtn}>
            Get Quote
            <Send aria-hidden="true" />
          </Button>
          <button 
            className={styles.mobileToggle} 
            id="mobileToggle" 
            type="button"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-controls="mainNav"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
