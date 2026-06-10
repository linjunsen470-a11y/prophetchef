"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { getContactInfo, whatsappUrl } from "@/lib/site-settings";
import type { SiteSettings } from "@/sanity/types";

import styles from "./FloatingActions.module.css";

interface FloatingActionsProps {
  settings?: SiteSettings | null;
}

export const FloatingActions = ({ settings }: FloatingActionsProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contact = getContactInfo(settings);
  const message =
    settings?.globalCta?.whatsappMessage || "Hello ProphetChef, I would like to request a quote.";

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        className={styles.whatsappFloat}
        href={whatsappUrl(contact.whatsapp, message)}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
      <button
        className={`${styles.backToTop}${showBackToTop ? ` ${styles.show}` : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp aria-hidden="true" />
      </button>
    </>
  );
};
