import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { NewsBody } from "@/components/blog/NewsBody";
import { getNewsItem, getNewsSlugs } from "@/sanity/queries";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNewsSlugs();
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug, { stega: false });
  if (!item) return {};

  const seo = item.seo;
  const title = seo?.metaTitle || `${item.title} | ${siteConfig.name}`;
  const description = seo?.metaDescription || item.excerpt;
  const ogImage = seo?.openGraphImage?.url || item.coverImage?.url;

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl || `${siteConfig.url}/news/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: seo?.openGraphImage?.alt || item.coverImage?.alt || item.title }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  if (!item) {
    notFound();
  }

  const displayDate = new Date(item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
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
            <div className="mb-8">
              <Link href="/news" className="inline-flex items-center text-sm font-bold text-orange hover:gap-2 transition-all gap-1">
                <ChevronLeft size={16} /> Back to News
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-bold text-slate-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange" />
                <span>{displayDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-orange" />
                <span>{item.category}</span>
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
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={stegaClean(item.coverImage?.url || "")} 
              alt={stegaClean(item.coverImage?.alt || item.title)} 
              className="w-full h-full object-cover"
            />
          </div>
        </Container>

        {/* Content Body */}
        <Container className="max-w-[800px]">
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-orange prose-img:rounded-2xl">
            <NewsBody blocks={item.body} fallback={item.excerpt} />
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>

      <CTASection />
    </>
  );
}
