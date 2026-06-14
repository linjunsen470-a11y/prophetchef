import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";
import { getApplications, getApplicationsPageSettings, getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import { applicationFactoryImages } from "@/data/factory-gallery";
import { heroImages } from "@/data/hero-images";
import type { Application, ApplicationsPageSettings } from "@/sanity/types";
import styles from "./Applications.module.css";

const fallbackApplications: Application[] = [
  {
    _id: "school-cafeteria",
    _type: "application",
    id: "school-cafeteria",
    name: "School Cafeteria",
    slug: "school-cafeteria",
    description: "Large-batch cooking, food warming and dishwashing for daily meal service.",
    recommended: "Induction wok cooker, combi oven, hood type dishwasher",
    image: {
      url: applicationFactoryImages["school-cafeteria"],
      alt: "School cafeteria fast food production line",
    } as never,
  },
  {
    _id: "hotel-kitchen",
    _type: "application",
    id: "hotel-kitchen",
    name: "Hotel Kitchen",
    slug: "hotel-kitchen",
    description: "All-day production equipment for breakfast, banquets and a la carte service.",
    recommended: "Combi oven, gas cooker, dishwasher, modular range",
    image: {
      url: applicationFactoryImages["hotel-kitchen"],
      alt: "Hotel kitchen premium island range equipment",
    } as never,
  },
  {
    _id: "chain-restaurant",
    _type: "application",
    id: "chain-restaurant",
    name: "Chain Restaurant",
    slug: "chain-restaurant",
    description: "Standardized cooking equipment for consistent recipes across locations.",
    recommended: "Automatic cooking machine, pasta cooker, induction cooker",
    image: {
      url: applicationFactoryImages["chain-restaurant"],
      alt: "Chain restaurant automatic cooking equipment showroom",
    } as never,
  },
  {
    _id: "central-kitchen",
    _type: "application",
    id: "central-kitchen",
    name: "Central Kitchen",
    slug: "central-kitchen",
    description: "High-volume cooking and dispatch systems for prepared food production.",
    recommended: "Automatic cooking kettle, modular line, dishwashing system",
    image: {
      url: applicationFactoryImages["central-kitchen"],
      alt: "Central kitchen prep station workbench",
    } as never,
  },
];

const fallbackPage: ApplicationsPageSettings = {
  hero: {
    eyebrow: "Applications",
    title: "Commercial Kitchen Solutions for Different Applications",
    description:
      "Recommended commercial kitchen equipment combinations for foodservice projects and professional buyers.",
    backgroundImage: {
      url: heroImages.applications,
      alt: "Commercial kitchen application showroom",
    } as never,
  },
  gridHeader: {
    eyebrow: "Application Grid",
    title: "Find the Right Equipment for Your Kitchen Type",
  },
  solutionsHeader: {
    eyebrow: "Detailed Solutions",
    title: "Project Planning Examples",
  },
  solutionDetails: [
    {
      title: "Central Kitchen Solution",
      painPoints:
        "Central kitchens need high-capacity production, safe workflows, stable recipes and efficient cleaning zones.",
      recommendedEquipment:
        "Automatic cooking machines, induction kettles, combi ovens, modular cooking lines and rack dishwashers.",
      benefits:
        "Improved production consistency, reduced labor dependency, better energy use and easier quality control.",
      cta: { text: "Request Project Consultation", href: "/contact?product=Central%20Kitchen%20Solution" },
    },
    {
      title: "Chain Restaurant Solution",
      painPoints:
        "Multi-store restaurant brands need standardized taste, fast staff training and equipment that is easy to maintain.",
      recommendedEquipment:
        "Automatic stir-fry machines, pasta cookers, countertop induction cookers, combi ovens and undercounter dishwashers.",
      benefits: "Repeatable recipes, faster service speed, controlled operating costs and scalable procurement.",
      cta: { text: "Discuss Your Chain's Needs", href: "/contact?product=Chain%20Restaurant%20Solution" },
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getApplicationsPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const hero = page?.hero || fallbackPage.hero;
  const seo = page?.seo;
  const title = hero?.title || "Applications";
  const description = hero?.description || "";
  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/applications`,
    image: seo?.openGraphImage || hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function ApplicationsPage() {
  const [page, allApplications] = await Promise.all([getApplicationsPageSettings(), getApplications()]);
  const hero = page?.hero || fallbackPage.hero;
  const applications = page?.featuredApplications?.length
    ? page.featuredApplications
    : allApplications.length
      ? allApplications
      : fallbackApplications;
  const solutionDetails = page?.solutionDetails?.length ? page.solutionDetails : fallbackPage.solutionDetails;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow}
        title={hero?.title || "Commercial Kitchen Solutions for Different Applications"}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage?.url}
        backgroundImageAlt={hero?.backgroundImage?.alt || ""}
        compact
      />

      <section className="section">
        <SectionHeader
          eyebrow={page?.gridHeader?.eyebrow || fallbackPage.gridHeader?.eyebrow}
          title={page?.gridHeader?.title || fallbackPage.gridHeader?.title || ""}
          description={page?.gridHeader?.description}
          alignment="split"
          className={styles.applicationGridHeading}
        >
          <div className={styles.sectionActions}>
            <Button variant="primary" href="/contact?product=Application%20Solution" iconEnd={<Send aria-hidden="true" />}>
              Request Solution Quote
            </Button>
            <a href="#solution-detail" className={styles.textLink}>
              Planning Notes
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </SectionHeader>
        <Container className={styles.applicationGrid}>
          {applications.map((item) => {
            const fallbackImage =
              (item.slug && applicationFactoryImages[item.slug]) ||
              fallbackApplications.find((entry) => entry.slug === item.slug)?.image?.url ||
              fallbackApplications[0].image?.url ||
              "";
            const applicationImageSrc =
              resolveSanityImage(item.image, { width: 720, quality: 85 }) || fallbackImage;

            return (
            <article key={item.id || item.name} className={styles.applicationCard}>
              <figure className={styles.applicationImage}>
                <Image
                  src={applicationImageSrc}
                  alt={item.image?.alt || item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={shouldSkipNextOptimization(applicationImageSrc)}
                  className="object-cover"
                />
              </figure>
              <div className={styles.applicationCardBody}>
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                {item.recommended && (
                  <div className={styles.recommendedLine}>
                    <strong>Recommended</strong>
                    <span>{item.recommended}</span>
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </Container>
      </section>

      <section className="section bg-light" id="solution-detail">
        <SectionHeader
          eyebrow={page?.solutionsHeader?.eyebrow || fallbackPage.solutionsHeader?.eyebrow}
          title={page?.solutionsHeader?.title || fallbackPage.solutionsHeader?.title || ""}
          description={page?.solutionsHeader?.description}
        />
        <Container className={styles.solutionGrid}>
          {(solutionDetails || []).map((solution) => (
            <article className={styles.solutionCard} key={solution._key || solution.title}>
              <h3>{solution.title}</h3>
              <div className={styles.solutionFacts}>
                {solution.painPoints && (
                  <div>
                    <h4><CheckCircle2 aria-hidden="true" />Planning Focus</h4>
                    <p>{solution.painPoints}</p>
                  </div>
                )}
                {solution.recommendedEquipment && (
                  <div>
                    <h4><CheckCircle2 aria-hidden="true" />Equipment Mix</h4>
                    <p>{solution.recommendedEquipment}</p>
                  </div>
                )}
                {solution.benefits && (
                  <div>
                    <h4><CheckCircle2 aria-hidden="true" />Buyer Outcome</h4>
                    <p>{solution.benefits}</p>
                  </div>
                )}
              </div>
              <Button variant="primary" href={solution.cta?.href || "/contact"}>
                {solution.cta?.text || "Request Quote"} <ArrowRight aria-hidden="true" />
              </Button>
            </article>
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
