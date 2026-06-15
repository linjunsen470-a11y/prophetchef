import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";
import { getApplications, getApplicationsPageSettings, getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import {
  applicationCardImages,
  applicationHeroImage,
  type ApplicationSlug,
} from "@/data/application-images";
import type { Application, ApplicationsPageSettings } from "@/sanity/types";
import styles from "./Applications.module.css";

function splitEquipmentTags(value: string | undefined) {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function resolveApplicationImage(item: Application) {
  const local =
    item.slug && applicationCardImages[item.slug as ApplicationSlug]
      ? applicationCardImages[item.slug as ApplicationSlug]
      : undefined;

  if (local) {
    return { src: local.src, alt: local.alt };
  }

  const remoteSrc = resolveSanityImage(item.image, { width: 960, quality: 85 });
  return {
    src: remoteSrc || "",
    alt: item.image?.alt || item.name,
  };
}

const fallbackApplications: Application[] = (
  Object.keys(applicationCardImages) as ApplicationSlug[]
).map((slug) => {
  const card = applicationCardImages[slug];
  const defaults: Record<ApplicationSlug, { description: string; recommended: string }> = {
    "school-cafeteria": {
      description: "Large-batch cooking, food warming and dishwashing for daily institutional meal service.",
      recommended: "Induction wok cooker, combi oven, hood type dishwasher, modular ranges",
    },
    "hotel-kitchen": {
      description: "All-day production equipment for breakfast, banquets and à la carte service.",
      recommended: "Combi oven, gas cooker, dishwasher, modular range",
    },
    "chain-restaurant": {
      description: "Standardized cooking equipment for consistent recipes and repeatable workflows across locations.",
      recommended: "Automatic cooking machine, pasta cooker, induction cooker",
    },
    "central-kitchen": {
      description: "High-volume cooking and dispatch systems for prepared food production.",
      recommended: "Automatic cooking kettle, modular line, dishwashing system, large kettles",
    },
    "fast-food-restaurant": {
      description: "Compact equipment for fast cooking, boiling and washing workflow in high-turnover QSR settings.",
      recommended: "Pasta cooker, induction hob, undercounter dishwasher, automatic cooking machines",
    },
    "catering-service": {
      description: "Mobile-friendly and reliable equipment for event meal preparation and large-scale dispatch.",
      recommended: "Combi oven, dishwasher, modular equipment, portable lines",
    },
  };

  return {
    _id: slug,
    _type: "application",
    id: slug,
    name: card.title,
    slug,
    description: defaults[slug].description,
    recommended: defaults[slug].recommended,
    image: {
      url: card.src,
      alt: card.alt,
    } as never,
  };
});

const fallbackPage: ApplicationsPageSettings = {
  hero: {
    eyebrow: "Applications",
    title: "Commercial Kitchen Solutions for Different Applications",
    description:
      "Recommended commercial kitchen equipment combinations for foodservice projects and professional buyers.",
    backgroundImage: {
      url: applicationHeroImage.src,
      alt: applicationHeroImage.alt,
    } as never,
  },
  gridHeader: {
    eyebrow: "Kitchen Types",
    title: "Equipment Packages by Application",
    description:
      "Match your project type with proven equipment combinations used in school cafeterias, central kitchens, fast food restaurants and catering services.",
  },
  solutionsHeader: {
    eyebrow: "Project Planning",
    title: "Solution Examples for Complex Kitchen Projects",
    description:
      "Reference layouts for buyers planning central kitchen or multi-store restaurant rollouts.",
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
      cta: { text: "Request project consultation", href: "/contact?product=Central%20Kitchen%20Solution" },
    },
    {
      title: "Chain Restaurant Solution",
      painPoints:
        "Multi-store restaurant brands need standardized taste, fast staff training and equipment that is easy to maintain.",
      recommendedEquipment:
        "Automatic stir-fry machines, pasta cookers, countertop induction cookers, combi ovens and undercounter dishwashers.",
      benefits: "Repeatable recipes, faster service speed, controlled operating costs and scalable procurement.",
      cta: { text: "Discuss your chain rollout", href: "/contact?product=Chain%20Restaurant%20Solution" },
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
    image:
      seo?.openGraphImage ||
      hero?.backgroundImage ||
      { url: applicationHeroImage.src, alt: applicationHeroImage.alt } ||
      settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

export default async function ApplicationsPage() {
  const [page, allApplications] = await Promise.all([getApplicationsPageSettings(), getApplications()]);
  const hero = page?.hero || fallbackPage.hero;
  const rawApplications = page?.featuredApplications?.length
    ? page.featuredApplications
    : allApplications.length
      ? allApplications
      : fallbackApplications;
  const applications = rawApplications.filter(
    (item) => item.slug !== "asian-restaurant" && item.slug !== "food-factory"
  );
  const solutionDetails = page?.solutionDetails?.length ? page.solutionDetails : fallbackPage.solutionDetails;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow}
        title={hero?.title || "Commercial Kitchen Solutions for Different Applications"}
        description={hero?.description}
        backgroundImage={applicationHeroImage.src}
        backgroundImageAlt={applicationHeroImage.alt}
        compact
      />

      <section className="section">
        <SectionHeader
          eyebrow={page?.gridHeader?.eyebrow || fallbackPage.gridHeader?.eyebrow}
          title={page?.gridHeader?.title || fallbackPage.gridHeader?.title || ""}
          description={page?.gridHeader?.description || fallbackPage.gridHeader?.description}
        />
        <Container className={styles.applicationGrid}>
          {applications.map((item) => {
            const { src: applicationImageSrc, alt: applicationImageAlt } = resolveApplicationImage(item);
            const equipmentTags = splitEquipmentTags(item.recommended);

            return (
              <article key={item.id || item.name} className={styles.applicationCard}>
                <figure className={styles.applicationImage}>
                  <Image
                    src={applicationImageSrc}
                    alt={applicationImageAlt}
                    fill
                    sizes="(max-width: 1080px) 100vw, 50vw"
                    unoptimized={shouldSkipNextOptimization(applicationImageSrc)}
                    className="object-cover"
                  />
                </figure>
                <div className={styles.applicationCardBody}>
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  {equipmentTags.length > 0 && (
                    <div className={styles.equipmentTags}>
                      {equipmentTags.map((tag) => (
                        <span key={tag} className={styles.equipmentTag}>
                          {tag}
                        </span>
                      ))}
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
          description={page?.solutionsHeader?.description || fallbackPage.solutionsHeader?.description}
        />
        <Container className={styles.solutionGrid}>
          {(solutionDetails || []).map((solution) => (
            <article className={styles.solutionCard} key={solution._key || solution.title}>
              <div className={styles.solutionCardHeader}>
                <h3>{solution.title}</h3>
              </div>
              <ul className={styles.solutionList}>
                {solution.painPoints && (
                  <li>
                    <strong>
                      <CheckCircle2 aria-hidden="true" />
                      Planning focus
                    </strong>
                    {solution.painPoints}
                  </li>
                )}
                {solution.recommendedEquipment && (
                  <li>
                    <strong>
                      <CheckCircle2 aria-hidden="true" />
                      Equipment mix
                    </strong>
                    {solution.recommendedEquipment}
                  </li>
                )}
                {solution.benefits && (
                  <li>
                    <strong>
                      <CheckCircle2 aria-hidden="true" />
                      Buyer outcome
                    </strong>
                    {solution.benefits}
                  </li>
                )}
              </ul>
              <div className={styles.solutionCardFooter}>
                <a className={styles.solutionLink} href={solution.cta?.href || "/contact"}>
                  {solution.cta?.text || "Request quote"}
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}