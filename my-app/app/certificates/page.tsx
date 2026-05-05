import React from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";

const certificates = [
  { icon: "CE", title: "CE" },
  { icon: "ISO", title: "ISO 9001" },
  { icon: "RoHS", title: "RoHS" },
  { icon: "ETL", title: "ETL" },
  { icon: "Quality", title: "Quality Inspection Report" },
  { icon: "Patent", title: "Patent Certificate" },
  { icon: "Utility", title: "Utility Model Certificate" },
  { icon: "Export", title: "Export Compliance Document" },
];

const processSteps = [
  "Raw material inspection",
  "Production inspection",
  "Electrical safety test",
  "Aging test",
  "Packing inspection",
  "Pre-shipment inspection",
];

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificates"
        title="Certified for Global Commercial Kitchen Markets"
        description="Product compliance documents and quality control support for commercial kitchen equipment importers."
        backgroundImage="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80"
      />

      <section className="section">
        <SectionHeader eyebrow="Certificate Wall" title="Documents for B2B Procurement and Import Clearance" />
        <Container className="cert-grid">
          {certificates.map((cert) => (
            <article key={cert.title} className="cert-card">
              <div className="cert-icon">{cert.icon}</div>
              <h3>{cert.title}</h3>
              <p>Available for selected commercial kitchen equipment models and export projects.</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="section bg-light">
        <SectionHeader eyebrow="Quality Control Process" title="Inspection from Raw Material to Shipment" />
        <Container className="process-timeline">
          {processSteps.map((step) => (
            <div key={step}>{step}</div>
          ))}
        </Container>
      </section>

      <section className="section compact-cta">
        <Container className="split-heading">
          <div>
            <h2>Need certificates for import clearance?</h2>
            <p>Contact us to get product documents for your selected models and destination market.</p>
          </div>
          <Link className="btn btn-primary" href="/contact">
            Contact Us
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
