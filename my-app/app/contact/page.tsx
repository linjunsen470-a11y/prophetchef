import React from "react";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Contact ProKitchenTech"
        description="Get in touch with our sales team for product catalogs, quotations and kitchen project planning."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-[100px] md:py-[60px]">
        <Container className="grid grid-cols-[1fr_1.2fr] gap-[62px] items-start lg:grid-cols-1 lg:gap-[42px]">
          <div className="contact-info">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="text-[38px] leading-[1.15] mt-[10px] mb-4 font-800">How Can We Help Your Foodservice Project?</h2>
            <p className="text-muted text-[18px] mb-8">Our experts are ready to assist you with equipment selection, technical specifications and factory-direct supply chains.</p>
            
            <div className="grid gap-6">
              <div className="method contact-method">
                <span className="contact-method-icon"><Mail aria-hidden="true" /></span>
                <div>
                  <strong className="block text-[14px] text-blue uppercase tracking-wider mb-1 font-800">Sales Email</strong>
                  <a href={`mailto:${siteConfig.email}`} className="text-[20px] font-800 text-text no-underline hover:text-orange transition-colors duration-200">{siteConfig.email}</a>
                </div>
              </div>
              <div className="method contact-method">
                <span className="contact-method-icon"><PhoneCall aria-hidden="true" /></span>
                <div>
                  <strong className="block text-[14px] text-blue uppercase tracking-wider mb-1 font-800">WhatsApp / Phone</strong>
                  <a href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`} target="_blank" rel="noopener" className="text-[20px] font-800 text-text no-underline hover:text-orange transition-colors duration-200">{siteConfig.phone}</a>
                </div>
              </div>
              <div className="method contact-method">
                <span className="contact-method-icon"><MapPin aria-hidden="true" /></span>
                <div>
                  <strong className="block text-[14px] text-blue uppercase tracking-wider mb-1 font-800">Factory Address</strong>
                  <p className="text-[20px] font-800 text-text m-0">{siteConfig.address}</p>
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
