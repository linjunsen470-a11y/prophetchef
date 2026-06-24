import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { Container } from "@/components/common/Container";
import { JsonLd } from "@/components/common/JsonLd";
import { PageHero } from "@/components/common/PageHero";
import { applicationHeroImage } from "@/data/application-images";
import { buildSeoMetadata } from "@/lib/seo";
import { buildApplicationSeoDescription } from "@/lib/seo-content";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getApplication, getApplicationSlugs, getSiteSettings } from "@/sanity/queries";

interface ApplicationPageProps {
  params: Promise<{ slug: string }>;
}

function splitEquipmentTags(value: string | undefined) {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function generateStaticParams() {
  return getApplicationSlugs();
}

export async function generateMetadata({ params }: ApplicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [application, settings] = await Promise.all([
    getApplication(slug, { stega: false }),
    getSiteSettings({ stega: false }),
  ]);

  if (!application) return {};

  const title = `${application.name} Kitchen Equipment Solution`;
  const description = buildApplicationSeoDescription(application);

  return buildSeoMetadata({
    seo: application.seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/applications/${slug}`,
    image: application.seo?.openGraphImage || application.image || { url: applicationHeroImage.src, alt: applicationHeroImage.alt },
    siteName: getSiteName(settings),
  });
}

export default async function ApplicationDetailPage({ params }: ApplicationPageProps) {
  const { slug } = await params;
  const [application, settings] = await Promise.all([getApplication(slug), getSiteSettings()]);

  if (!application) {
    notFound();
  }

  const siteUrl = getSiteUrl(settings);
  const applicationUrl = `${siteUrl}/applications/${stegaClean(application.slug)}`;
  const description = buildApplicationSeoDescription(application);
  const equipmentTags = splitEquipmentTags(application.recommended);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${application.name} Kitchen Equipment Solution`,
    description,
    url: applicationUrl,
    serviceType: "Commercial kitchen equipment planning and supply",
    areaServed: "Worldwide",
    provider: {
      "@type": "Organization",
      name: getSiteName(settings),
      url: siteUrl,
    },
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", url: siteUrl },
    { name: "Applications", url: `${siteUrl}/applications` },
    { name: application.name, url: applicationUrl },
  ]);

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <Breadcrumb items={[{ name: "Applications", href: "/applications" }, { name: application.name }]} />

      <PageHero
        eyebrow="Application Solution"
        title={`${application.name} Kitchen Equipment Solution`}
        description={description}
        backgroundImage={application.image?.url || applicationHeroImage.src}
        backgroundImageAlt={application.image?.alt || applicationHeroImage.alt}
        compact
      />

      <section className="section">
        <Container className="grid grid-cols-[1.05fr_0.95fr] max-[900px]:grid-cols-1 gap-8 items-start">
          <div>
            <span className="eyebrow">Project Planning</span>
            <h2 className="mt-3 mb-4 text-[color:var(--text)] text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.1]">
              Equipment Mix for {application.name}
            </h2>
            <p className="text-[18px] leading-[1.75] text-[color:var(--muted)] m-0">{description}</p>
          </div>
          <div className="p-7 border border-[color:var(--border)] rounded-[10px] bg-[#f8fafc]">
            <h3 className="m-0 mb-4 text-[22px] font-extrabold text-[color:var(--text)]">Recommended Equipment</h3>
            {equipmentTags.length > 0 ? (
              <ul className="m-0 p-0 list-none grid gap-3">
                {equipmentTags.map((tag) => (
                  <li key={tag} className="flex items-start gap-3 text-[color:var(--text)] font-bold">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--orange)]" />
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-[color:var(--muted)]">Contact ProphetChef for a recommended equipment list based on your kitchen layout and capacity target.</p>
            )}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

