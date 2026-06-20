import type { Metadata } from "next";
import Image from "next/image";
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
import { certificatesQcImage } from "@/data/factory-gallery";
import { heroImages } from "@/data/hero-images";
import type { Certificate, CertificatesPageSettings } from "@/sanity/types";
import styles from "./Certificates.module.css";

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
      url: heroImages.certificates,
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
        backgroundImage={hero?.backgroundImage?.url || heroImages.certificates}
        backgroundImageAlt={hero?.backgroundImage?.alt || "ProphetChef Global Export Compliance Certificates"}
        compact
      />

      <section className="section">
        <SectionHeader
          eyebrow={page?.certificatesHeader?.eyebrow || fallbackPage.certificatesHeader?.eyebrow}
          title={page?.certificatesHeader?.title || fallbackPage.certificatesHeader?.title || ""}
          description={page?.certificatesHeader?.description}
        />
        <Container className={styles.certificateGrid}>
          {certificates.map((cert) => (
            <article key={cert.id || cert.title} className={styles.certificateCard}>
              <div className={styles.certificateBadge}>{cert.shortLabel}</div>
              <h3>{cert.title}</h3>
              {cert.description && <p>{cert.description}</p>}
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
        <Container className={styles.processLayout}>
          <div className={styles.processSteps}>
            {(processSteps || []).map((step) => {
              const Icon = getIcon("fileCheck", FileCheck);
              return (
                <div key={step} className={styles.processStep}>
                  <span className={styles.processStepInner}>
                    <Icon aria-hidden="true" size={18} />
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
          <figure className={styles.qcFigure}>
            <div className={styles.qcImageWrap}>
              <Image
                src={certificatesQcImage.src}
                alt={certificatesQcImage.alt}
                fill
                sizes="(max-width: 1080px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className={styles.qcCaption}>{certificatesQcImage.caption}</figcaption>
          </figure>
        </Container>
      </section>

      <section className="section py-16">
        <SectionHeader
          title={documentationCta?.title || "Need certificates for import clearance?"}
          description={documentationCta?.description}
          alignment="split"
          className={styles.documentationCta}
        >
          <div className={styles.documentationActions}>
            <Button
              variant="primary"
              href={documentationCta?.button?.href || "/contact"}
              iconEnd={<ArrowRight aria-hidden="true" />}
              fullWidthMobile
            >
              {documentationCta?.button?.text || "Request Full Documentation"}
            </Button>
          </div>
        </SectionHeader>
      </section>

      <CTASection />
    </>
  );
}