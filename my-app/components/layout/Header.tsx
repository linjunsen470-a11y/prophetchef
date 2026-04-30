"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navigation } from "@/data/navigation";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `site-header ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "menu-open" : ""}`;

  return (
    <header className={headerClasses} id="siteHeader">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark">PKT</span>
          <span>{siteConfig.name}</span>
        </Link>
        
        <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`} id="mainNav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={item.href === "/" ? "active" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="Language options">
            <span>EN</span><span>ES</span><span>FR</span><span>RU</span><span>AR</span>
          </div>
          <Link className="btn btn-primary btn-small" href="/contact">Get Quote</Link>
          <button 
            className="mobile-toggle" 
            id="mobileToggle" 
            aria-label="Toggle mobile menu" 
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
