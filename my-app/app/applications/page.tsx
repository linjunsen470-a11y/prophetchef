import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";
import { applications } from "@/data/applications";

export default function ApplicationsPage() {
  return (
    <>
      <PageHero 
        title="Solutions for Different Kitchen Projects"
        description="We provide professional kitchen equipment planning and supply for diverse foodservice scenarios."
        backgroundImage="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-[100px] md:py-[60px]">
        <SectionHeader 
          eyebrow="Application Scenarios"
          title="Engineered for Professional Performance"
          description="From high-traffic restaurant chains to large-volume central kitchens, our equipment supports various operational needs."
        />
        <Container className="grid gap-12">
          {applications.map((app, idx) => (
            <article key={app.id} className="grid grid-cols-2 gap-14 items-center lg:grid-cols-1 lg:gap-8">
              <div className={`scenario-info ${idx % 2 !== 0 ? "lg:order-none order-1" : ""}`}>
                <span className="text-orange font-900 text-[18px]">{app.id}</span>
                <h2 className="text-[36px] m-[8px_0_16px] font-800">{app.name}</h2>
                <p className="text-muted text-[18px] mb-[22px]">{app.description}</p>
                <ul className="m-0 p-0 list-none space-y-2">
                  <li className="flex items-center gap-2 before:content-['✓'] before:text-orange before:font-900">High-durability equipment for 12h+ operation</li>
                  <li className="flex items-center gap-2 before:content-['✓'] before:text-orange before:font-900">Efficient workflow planning support</li>
                  <li className="flex items-center gap-2 before:content-['✓'] before:text-orange before:font-900">Standardized cooking results</li>
                </ul>
              </div>
              <div className="scenario-image">
                <img 
                  src={`https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?auto=format&fit=crop&w=1200&q=80`} 
                  alt={app.name} 
                  className="rounded-[22px] w-full h-[420px] object-cover shadow-custom md:h-[320px]"
                  loading="lazy" 
                />
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
