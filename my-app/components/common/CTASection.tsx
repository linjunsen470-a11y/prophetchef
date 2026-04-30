import React from "react";
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
        <div className="flex gap-3 flex-wrap items-center sm:mt-[18px]">
          <Button href="/contact">Send Inquiry</Button>
          <Button 
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ProKitchenTech%2C%20I%20would%20like%20to%20request%20a%20quote.`}
            variant="outline-light"
            target="_blank"
            rel="noopener"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
};

