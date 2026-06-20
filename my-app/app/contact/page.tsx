import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactPageSettings, getSiteSettings } from "@/sanity/queries";
import { getContactInfo, getSiteName, getSiteUrl, whatsappUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { heroImages } from "@/data/hero-images";
import styles from "./Contact.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getContactPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const seo = page?.seo;
  const title = page?.hero?.title || "Contact ProphetChef";
  const description =
    page?.hero?.description ||
    "Get in touch with our sales team for product catalogs, quotations and kitchen project planning.";

  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/contact`,
    image: seo?.openGraphImage || page?.hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPageSettings(), getSiteSettings()]);
  const contact = getContactInfo(settings);
  const hero = page?.hero;

  return (
    <>
      <PageHero 
        eyebrow={hero?.eyebrow}
        title={hero?.title || "Contact ProphetChef"}
        description={
          hero?.description ||
          "Get in touch with our sales team for product catalogs, quotations and kitchen project planning."
        }
        backgroundImage={
          hero?.backgroundImage?.url ||
          heroImages.contact
        }
        backgroundImageAlt={hero?.backgroundImage?.alt || "Contact ProphetChef Commercial Kitchen Experts"}
      />

      <section className={styles.contactSection}>
        <Container className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <span className="eyebrow">{page?.eyebrow || "Get in Touch"}</span>
            <h2>{page?.heading || "How Can We Help Your Foodservice Project?"}</h2>
            <p className={styles.lead}>
              {page?.lead ||
                "Our experts are ready to assist you with equipment selection, technical specifications and factory-direct supply chains."}
            </p>
            
            <div className={styles.methodsGrid}>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><Mail aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>Sales Email</strong>
                  <a href={`mailto:${contact.email}`} className={styles.methodLink}>{contact.email}</a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><PhoneCall aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>WhatsApp / Phone</strong>
                  <a 
                    href={whatsappUrl(contact.whatsapp, settings?.globalCta?.whatsappMessage)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.methodLink}
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><MapPin aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>Factory Address</strong>
                  <p className={styles.methodText}>{contact.address}</p>
                </div>
              </div>
            </div>
          </div>
          
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
