import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { CTASection } from "@/components/common/CTASection";

export default function FactoryPage() {
  return (
    <>
      <PageHero 
        title="Our Manufacturing Excellence"
        description="A specialized factory for high-end commercial kitchen equipment, ensuring precision, durability and performance."
        backgroundImage="https://images.unsplash.com/photo-1565538810643-95bdb8100270?auto=format&fit=crop&w=1600&q=80"
      />
      
      <section className="py-[100px] md:py-[60px]">
        <Container className="grid grid-cols-[1fr_1fr] gap-14 items-center lg:grid-cols-1 lg:gap-10">
          <div>
            <span className="eyebrow">Direct Manufacturer</span>
            <h2 className="text-[clamp(32px,4vw,44px)] leading-[1.1] tracking-[-0.03em] m-[12px_0_24px] font-800">Advanced Production Facility in Foshan</h2>
            <div className="text-[17px] leading-[1.65] text-muted space-y-4">
              <p>Located in the heart of China&apos;s kitchen equipment manufacturing hub, ProKitchenTech operates a 5,000+ square meter facility dedicated to the production of premium induction and automatic cooking equipment.</p>
              <p>Our facility is equipped with precision CNC laser cutting, specialized assembly lines for electronic controllers, and heavy-duty stainless steel welding stations to ensure every piece of equipment meets global commercial standards.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-light p-5 rounded-[16px] border border-border">
                <span className="block text-[32px] font-900 text-blue mb-1">5000+</span>
                <span className="text-[14px] font-800 text-slate-500 uppercase tracking-wider">Sq Meters Factory</span>
              </div>
              <div className="bg-light p-5 rounded-[16px] border border-border">
                <span className="block text-[32px] font-900 text-blue mb-1">15+</span>
                <span className="text-[14px] font-800 text-slate-500 uppercase tracking-wider">Years Experience</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" alt="Factory Production" className="w-full rounded-[24px] shadow-custom" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[20px] shadow-custom border border-border flex items-center gap-4 sm:hidden">
              <div className="w-12 h-12 rounded-full bg-blue text-white flex items-center justify-center font-900">ISO</div>
              <div>
                <strong className="block">Quality Managed</strong>
                <span className="text-[13px] text-muted">ISO9001 Certification</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-[100px] bg-blue text-white md:py-[60px]">
        <Container className="text-center mb-14">
          <span className="eyebrow text-orange/90">Our Process</span>
          <h2 className="text-[38px] font-800 mt-2">Quality Control at Every Step</h2>
        </Container>
        <Container className="grid grid-cols-4 gap-8 lg:grid-cols-2 sm:grid-cols-1">
          <div className="process-card">
            <div className="text-[42px] font-900 opacity-20 mb-2">01</div>
            <h3 className="text-[20px] font-800 mb-3">Material Selection</h3>
            <p className="text-white/70 text-[14px]">We strictly use high-grade SUS304 stainless steel and imported IGBT components for long-term stability.</p>
          </div>
          <div className="process-card">
            <div className="text-[42px] font-900 opacity-20 mb-2">02</div>
            <h3 className="text-[20px] font-800 mb-3">Precision Cutting</h3>
            <p className="text-white/70 text-[14px]">Laser cutting technology ensures accurate dimensions for perfect assembly and hygienic finishes.</p>
          </div>
          <div className="process-card">
            <div className="text-[42px] font-900 opacity-20 mb-2">03</div>
            <h3 className="text-[20px] font-800 mb-3">Modular Assembly</h3>
            <p className="text-white/70 text-[14px]">Modular core designs allow for easier maintenance and faster response to OEM requirements.</p>
          </div>
          <div className="process-card">
            <div className="text-[42px] font-900 opacity-20 mb-2">04</div>
            <h3 className="text-[20px] font-800 mb-3">Rigorous Testing</h3>
            <p className="text-white/70 text-[14px]">Each unit undergoes a 24-hour continuous load test before export packaging and shipping.</p>
          </div>
        </Container>
      </section>

      <section className="py-[100px] md:py-[60px]">
        <Container className="text-center mb-14">
          <span className="eyebrow">Factory Environment</span>
          <h2 className="text-[38px] font-800 mt-2">Modern Production Lines</h2>
        </Container>
        <Container className="grid grid-cols-[1.2fr_0.8fr] gap-6 h-[500px] lg:grid-cols-1 lg:h-auto">
          <img src="https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=1000&q=80" alt="Assembly" className="w-full h-full object-cover rounded-[24px] lg:h-[300px]" />
          <div className="grid grid-rows-2 gap-6 h-full lg:h-auto">
            <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80" alt="Testing" className="w-full h-full object-cover rounded-[24px] lg:h-[200px]" />
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" alt="Warehouse" className="w-full h-full object-cover rounded-[24px] lg:h-[200px]" />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
