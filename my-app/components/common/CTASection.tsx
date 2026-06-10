import React from "react";
import { MessageCircle, Send } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { getSiteSettings } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { getContactInfo, whatsappUrl } from "@/lib/site-settings";

import styles from "./CTASection.module.css";

interface CTASectionProps {
  settings?: SiteSettings | null;
}

export const CTASection = async ({ settings }: CTASectionProps = {}) => {
  const resolvedSettings = settings === undefined ? await getSiteSettings() : settings;
  const globalCta = resolvedSettings?.globalCta;
  const contact = getContactInfo(resolvedSettings);
  const primaryCta = globalCta?.primaryCta;
  const whatsappMessage = globalCta?.whatsappMessage || "Hello ProphetChef, I would like to request a quote.";

  return (
    <section className={styles.siteCta}>
      <Container className={styles.ctaInner}>
        <div>
          <span className="eyebrow light">{globalCta?.eyebrow || "Project Inquiry"}</span>
          <h2>
            {globalCta?.title || "Get a Free Quote Today"}
          </h2>
          <p>
            {globalCta?.description ||
              "Tell us your kitchen project requirements. Our team will recommend suitable equipment and provide a fast quotation."}
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Button href={primaryCta?.href || "/contact"} iconEnd={<Send aria-hidden="true" />}>
            {primaryCta?.text || "Send Inquiry"}
          </Button>
          <Button 
            href={whatsappUrl(contact.whatsapp, whatsappMessage)}
            variant="outline-light"
            target="_blank"
            rel="noopener"
            iconStart={<MessageCircle aria-hidden="true" />}
          >
            {globalCta?.whatsappText || "Chat on WhatsApp"}
          </Button>
        </div>
      </Container>
    </section>
  );
};
