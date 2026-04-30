import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";
import { certificates } from "@/data/applications";

export default function CertificatesPage() {
  return (
    <>
      <PageHero 
        title="Quality Assurance and Certification"
        description="Our products are manufactured to meet global safety and quality standards for commercial kitchen equipment."
        backgroundImage="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-[100px] md:py-[60px]">
        <SectionHeader 
          eyebrow="Compliance"
          title="Meeting Global Industry Standards"
          description="We prioritize safety, efficiency and durability in our manufacturing process, supported by internationally recognized certifications."
        />
        <Container className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {certificates.map((cert) => (
            <article key={cert} className="p-8 border border-border rounded-custom bg-white text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-custom">
              <div className="w-20 h-20 mx-auto mb-5 grid place-items-center bg-[#eff6ff] text-blue rounded-[20px] font-900 text-[18px]">
                {cert}
              </div>
              <h3 className="m-[0_0_10px] font-800">{cert} Certification</h3>
              <p className="text-muted text-[14px] m-0">Ensuring our commercial kitchen equipment complies with international safety and quality protocols for export markets.</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-[100px] bg-light md:py-[60px]">
        <Container className="grid grid-cols-2 gap-14 items-center lg:grid-cols-1">
          <div>
            <span className="eyebrow">Quality Control</span>
            <h2 className="text-[38px] leading-[1.15] mt-[10px] mb-4 font-800">Strict Inspection at Every Stage</h2>
            <p className="text-muted text-[18px] mb-8">Every piece of equipment undergoes a series of inspections before leaving our factory, including electrical safety tests, functional verification and finish quality checks.</p>
          </div>
          <div className="qc-image">
             <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80" alt="Quality Control Inspection" className="rounded-[22px] w-full shadow-custom" loading="lazy" />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
