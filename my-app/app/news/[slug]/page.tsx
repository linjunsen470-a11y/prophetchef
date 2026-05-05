import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { newsItems } from "@/data/news";

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find((newsItem) => newsItem.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Breadcrumb 
        items={[
          { name: "News", href: "/news" },
          { name: item.title }
        ]} 
      />
      
      <section className="py-[100px] md:py-[60px]">
        <Container className="max-w-[860px] mx-auto">
          <div className="flex gap-[14px] text-muted font-800 text-[14px] mb-3">
            <span>{item.date}</span>
            <span className="text-orange">{item.category}</span>
          </div>
          <h1 className="text-[48px] leading-[1.1] tracking-[-0.04em] m-[0_0_32px] font-800 sm:text-[34px]">{item.title}</h1>
          <div className="text-[18px] leading-[1.7] text-slate-700 sm:text-[17px]">
            <p>{item.excerpt}</p>
            <img src={item.image} alt={item.title} className="w-full rounded-[22px] my-8 mx-0 shadow-custom" />
            <h2 className="text-[32px] my-[42px] mx-0 mb-4 text-blue font-800">The Benefits of Modernized Kitchen Solutions</h2>
            <p>Switching to modern equipment like automatic cooking machines and high-power induction woks provides several key advantages for B2B buyers and project contractors:</p>
            <ul className="my-6 mx-0 pl-5 list-disc">
              <li className="mb-3"><strong>Standardized Quality:</strong> Recipe-controlled cooking ensures every dish meets the same standard across multiple restaurant branches.</li>
              <li className="mb-3"><strong>Labor Efficiency:</strong> Automatic stirring and programmable cycles reduce the need for constant chef supervision.</li>
              <li className="mb-3"><strong>Energy Savings:</strong> Precise heat application reduces waste heat and lowers monthly utility bills in high-volume canteens.</li>
            </ul>
            <p>Our factory supports OEM customization, allowing distributors to offer branded equipment that meets specific market voltage and safety requirements.</p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
