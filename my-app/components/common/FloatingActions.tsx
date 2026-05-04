"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

export const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>
      <button
        className={`back-to-top${showBackToTop ? " show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
};
