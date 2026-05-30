import type { Metadata } from "next";
import { ArrowRight, FileCheck } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/common/Button";
import { getIcon } from "@/components/common/IconByName";
import { getCertificates, getCertificatesPageSettings, getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import type { Certificate, CertificatesPageSettings } from "@/sanity/types";

const fallbackCertificates: Certificate[] = [
  { _id: "ce", _type: "certificate", id: "ce", shortLabel: "CE", title: "CE", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "badgeCheck" },
  { _id: "iso", _type: "certificate", id: "iso", shortLabel: "ISO", title: "ISO 9001", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "shieldCheck" },
  { _id: "rohs", _type: "certificate", id: "rohs", shortLabel: "RoHS", title: "RoHS", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "recycle" },
  { _id: "etl", _type: "certificate", id: "etl", shortLabel: "ETL", title: "ETL", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "plug" },
  { _id: "quality", _type: "certificate", id: "quality", shortLabel: "Quality", title: "Quality Inspection Report", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "clipboardCheck" },
  { _id: "patent", _type: "certificate", id: "patent", shortLabel: "Patent", title: "Patent Certificate", description: "Available for selected commercial kitchen equipment models and export projects.", icon: "fileCheck" },
];

const fallbackPage: CertificatesPageSettings = {
  hero: {
    eyebrow: "Certificates",
    title: "Certified for Global Commercial Kitchen Markets",
    description: "Product compliance documents and quality control support for commercial kitchen equipment importers.",
    backgroundImage: {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
      alt: "Commercial kitchen certificates",
    } as never,
  },
  certificatesHeader: {
    eyebrow: "Certificate Wall",
    title: "Documents for B2B Procurement and Import Clearance",
  },
  processHeader: {
    eyebrow: "Quality Control Process",
    title: "Inspection from Raw Material to Shipment",
  },
  processSteps: [
    "Raw material inspection",
    "Production inspection",
    "Electrical safety test",
    "Aging test",
    "Packing inspection",
    "Pre-shipment inspection",
  ],
  documentationCta: {
    title: "Need certificates for import clearance?",
    description: "Contact us to get product documents for your selected models and destination market.",
    button: { text: "Request Full Documentation", href: "/contact" },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getCertificatesPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const hero = page?.hero || fallbackPage.hero;
  const seo = page?.seo;
  const title = hero?.title || "Certificates";
  const description = hero?.description || "";
  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/certificates`,
    image: seo?.openGraphImage || hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function CertificatesPage() {
  const [page, allCertificates] = await Promise.all([getCertificatesPageSettings(), getCertificates()]);
  const hero = page?.hero || fallbackPage.hero;
  const certificates = page?.featuredCertificates?.length
    ? page.featuredCertificates
    : allCertificates.length
      ? allCertificates
      : fallbackCertificates;
  const processSteps = page?.processSteps?.length ? page.processSteps : fallbackPage.processSteps;
  const documentationCta = page?.documentationCta || fallbackPage.documentationCta;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow}
        title={hero?.title || "Certified for Global Commercial Kitchen Markets"}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage?.url}
      />

      <section className="section">
        <SectionHeader
          eyebrow={page?.certificatesHeader?.eyebrow || fallbackPage.certificatesHeader?.eyebrow}
          title={page?.certificatesHeader?.title || fallbackPage.certificatesHeader?.title || ""}
          description={page?.certificatesHeader?.description}
        />
        <Container className="grid grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-5">
          {certificates.map((cert) => (
            <article key={cert.id || cert.title} className="p-7 text-center bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_30px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
              <div className="w-[76px] h-[76px] grid place-items-center mx-auto mb-[18px] rounded-[18px] bg-[#eff6ff] text-[color:var(--blue)] font-black">
                {cert.shortLabel}
              </div>
              <h3 className="m-0 mb-2 font-extrabold text-[color:var(--text)] text-[20px] leading-[1.25]">{cert.title}</h3>
              <p className="m-0 text-[color:var(--muted)]">{cert.description}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="section bg-light">
        <SectionHeader
          eyebrow={page?.processHeader?.eyebrow || fallbackPage.processHeader?.eyebrow}
          title={page?.processHeader?.title || fallbackPage.processHeader?.title || ""}
          description={page?.processHeader?.description}
        />
        <Container className="grid grid-cols-6 max-[1080px]:grid-cols-3 max-[760px]:grid-cols-1 gap-3">
          {(processSteps || []).map((step) => {
            const Icon = getIcon("fileCheck", FileCheck);
            return (
              <div key={step} className="min-h-[92px] grid place-items-center border border-[color:var(--border)] rounded-[16px] bg-white p-[18px] text-[color:var(--blue)] text-center font-extrabold">
                <div>
                  <Icon aria-hidden="true" className="mr-2 inline-block" size={18} />
                  {step}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="section py-16">
        <Container className="split-heading">
          <div>
            <h2>{documentationCta?.title}</h2>
            <p>{documentationCta?.description}</p>
          </div>
          <Button variant="primary" href={documentationCta?.button?.href || "/contact"}>
            {documentationCta?.button?.text || "Request Full Documentation"}
            <ArrowRight aria-hidden="true" />
          </Button>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
