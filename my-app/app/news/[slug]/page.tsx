import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { NewsBody } from "@/components/blog/NewsBody";
import { getNewsItem, getNewsSlugs } from "@/sanity/queries";

export async function generateStaticParams() {
  return getNewsSlugs();
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  if (!item) {
    notFound();
  }

  const displayDate = item.date.slice(0, 10);

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
            <span>{displayDate}</span>
            <span className="text-orange">{item.category}</span>
          </div>
          <h1 className="text-[48px] leading-[1.1] tracking-[-0.04em] m-[0_0_32px] font-800 sm:text-[34px]">{item.title}</h1>
          <div className="text-[18px] leading-[1.7] text-slate-700 sm:text-[17px]">
            <img src={item.image} alt={item.title} className="w-full rounded-[22px] my-8 mx-0 shadow-custom" />
            <NewsBody blocks={item.body} fallback={item.excerpt} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
