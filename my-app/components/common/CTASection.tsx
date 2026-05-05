import React from "react";
import { MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import { Button } from "./Button";

export const CTASection = () => {
  return (
    <section className="site-cta">
      <Container className="cta-inner sm:block">
        <div>
          <span className="eyebrow light">Project Inquiry</span>
          <h2 className="sm:text-[34px]">
            Get a Free Quote Today
          </h2>
          <p>
            Tell us your kitchen project requirements. Our team will recommend suitable equipment and provide a fast quotation.
          </p>
        </div>
        <div className="cta-actions">
          <Button href="/contact" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
          <Button 
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`}
            variant="outline-light"
            target="_blank"
            rel="noopener"
            iconStart={<MessageCircle aria-hidden="true" />}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
};
