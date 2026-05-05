import React from "react";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Contact ProKitchenTech"
        description="Get in touch with our sales team for product catalogs, quotations and kitchen project planning."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      />

      <section className={styles.contactSection}>
        <Container className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <span className="eyebrow">Get in Touch</span>
            <h2>How Can We Help Your Foodservice Project?</h2>
            <p className={styles.lead}>Our experts are ready to assist you with equipment selection, technical specifications and factory-direct supply chains.</p>
            
            <div className={styles.methodsGrid}>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><Mail aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>Sales Email</strong>
                  <a href={`mailto:${siteConfig.email}`} className={styles.methodLink}>{siteConfig.email}</a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><PhoneCall aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>WhatsApp / Phone</strong>
                  <a 
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`} 
                    target="_blank" 
                    rel="noopener" 
                    className={styles.methodLink}
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <span className={styles.contactMethodIcon}><MapPin aria-hidden="true" /></span>
                <div className={styles.methodContent}>
                  <strong>Factory Address</strong>
                  <p className={styles.methodText}>{siteConfig.address}</p>
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
