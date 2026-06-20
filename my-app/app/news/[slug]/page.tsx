import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { stegaClean } from "next-sanity";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { CTASection } from "@/components/common/CTASection";
import { NewsBody } from "@/components/blog/NewsBody";
import { getNewsItem, getNewsSlugs, getSiteSettings } from "@/sanity/queries";
import { Calendar, Tag } from "lucide-react";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNewsSlugs();
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [item, settings] = await Promise.all([
    getNewsItem(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  if (!item) return {};

  const seo = item.seo;
  return buildSeoMetadata({
    seo,
    title: item.title,
    description: item.excerpt,
    canonical: `${getSiteUrl(settings)}/news/${slug}`,
    image: seo?.openGraphImage || item.coverImage,
    siteName: getSiteName(settings),
    type: "article",
  });
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const [item, settings] = await Promise.all([getNewsItem(slug), getSiteSettings()]);

  if (!item) {
    notFound();
  }

  const displayDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const siteUrl = getSiteUrl(settings);
  const siteName = getSiteName(settings);
  const newsUrl = `${siteUrl}/news/${stegaClean(item.slug)}`;
  const coverImageSrc = resolveSanityImage(item.coverImage, { width: 1200, quality: 85 }) || "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": item.title,
    "description": item.excerpt,
    "image": coverImageSrc ? [stegaClean(coverImageSrc)] : [],
    "datePublished": item.date,
    "dateModified": item.updatedAt || item.date,
    "articleSection": item.category?.title,
    "author": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": settings?.logo?.url
        ? {
            "@type": "ImageObject",
            "url": settings.logo.url
          }
        : {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo/logo-horizontal-light.svg`
          }
    }
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "News", url: `${siteUrl}/news` },
    { name: item.title, url: newsUrl },
  ]);
  const faqSchema = faqJsonLd(item.faqs);
  const schemas = faqSchema ? [jsonLd, breadcrumbSchema, faqSchema] : [jsonLd, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemas} />
      <Breadcrumb 
        items={[
          { name: "News", href: "/news" },
          { name: item.title }
        ]} 
      />
      
      <article className="pb-24">
        {/* Hero Header */}
        <div className="bg-slate-50 py-20 border-b border-slate-200">
          <Container className="max-w-[900px]">
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-bold text-slate-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange" />
                <span>{displayDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-orange" />
                <span>{item.category?.title || "News"}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-slate-900 mb-8">
              {item.title}
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-orange pl-6">
              {item.excerpt}
            </p>
          </Container>
        </div>

        {/* Featured Image */}
        <Container className="max-w-[1000px] -mt-10 md:-mt-16 mb-16">
          <div className="relative aspect-[16/9] rounded-[10px] overflow-hidden shadow-[0_14px_34px_rgba(9,24,39,0.14)] border-4 border-white">
            <Image 
              src={coverImageSrc} 
              alt={item.coverImage?.alt || item.title} 
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 1000px"
              unoptimized={shouldSkipNextOptimization(coverImageSrc)}
              className="object-cover"
            />
          </div>
        </Container>

        {/* Content Body */}
        <Container className="max-w-[800px]">
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-orange prose-img:rounded-[10px]">
            <NewsBody blocks={item.body} fallback={item.excerpt} />
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-[6px] text-sm font-bold border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>

      {item.faqs && item.faqs.length > 0 && (
        <section className="section bg-light">
          <Container className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions</h2>
          </Container>
          <Container className="factory-team-grid">
            {item.faqs.map((faq) => (
              <article key={faq._key || faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
