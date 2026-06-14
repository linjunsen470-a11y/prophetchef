import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Send } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/common/Button";
import { getIcon } from "@/components/common/IconByName";
import { getFactoryPageSettings, getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import { heroImages } from "@/data/hero-images";
import type { FactoryPageSettings, StatItem, TextCard } from "@/sanity/types";

const fallbackFactory: FactoryPageSettings = {
  hero: {
    eyebrow: "Factory",
    title: "Factory Strength You Can Trust",
    description:
      "Integrated manufacturing capability for commercial kitchen equipment, OEM projects and global distribution partners.",
    backgroundImage: {
      url: heroImages.factory,
      alt: "ProphetChef factory exterior",
    } as never,
  },
  overview: {
    eyebrow: "Factory Overview",
    title: "One-Stop Manufacturing for Commercial Foodservice Equipment",
    paragraphs: [
      "With 20+ years of manufacturing experience, a 15000sqm production base and 750+ employees, ProphetChef supports distributors, kitchen contractors and foodservice project buyers in more than 50 export countries.",
      "Our integrated production line covers commercial induction cooking, wok ranges, built-in modules and specialty foodservice equipment.",
    ],
    image: {
      url: "/images/factory/exterior-03.webp",
      alt: "ProphetChef production facility",
    } as never,
    cta: { text: "Request Factory Price", href: "/contact" },
  },
  stats: [
    { value: "15000sqm", label: "Factory", icon: "factory" },
    { value: "750+", label: "Employees", icon: "users" },
    { value: "18", label: "R&D Personnel", icon: "sparkles" },
    { value: "75", label: "QC Inspectors", icon: "shieldCheck" },
    { value: "114", label: "Sales Team", icon: "mailCheck" },
    { value: "64", label: "After-sales Instructors", icon: "headset" },
  ],
  productionHeader: { eyebrow: "Production Capability", title: "From Sheet Metal to Final Testing" },
  productionSteps: [
    { title: "Laser Cutting", description: "Precise sheet metal processing for stainless steel components.", icon: "scissors" },
    { title: "Sheet Metal Workshop", description: "Stable manufacturing workflow for commercial-grade equipment bodies.", icon: "building" },
    { title: "Bending", description: "Accurate forming for durable panels and structural parts.", icon: "wrench" },
    { title: "Welding", description: "Professional welding for heavy-duty stainless steel construction.", icon: "zap" },
    { title: "Assembly Line", description: "Organized assembly for induction, gas, dishwashing and oven products.", icon: "settings" },
    { title: "Aging Test", description: "Electrical and performance checks before packing.", icon: "clipboardCheck" },
    { title: "Salt Spray Test", description: "Corrosion-resistance evaluation for key metal parts.", icon: "flask" },
    { title: "Quality Inspection", description: "Final QC before shipment and export packaging.", icon: "shieldCheck" },
  ],
  teamHeader: { eyebrow: "Team Structure", title: "Specialized Teams for Global B2B Orders" },
  teamItems: [
    { title: "R&D Team", description: "Product improvement, electrical design and custom development." },
    { title: "Engineering Team", description: "Project layout support and technical matching." },
    { title: "Production Team", description: "Stable production scheduling and assembly execution." },
    { title: "QC Team", description: "Incoming, in-process and pre-shipment inspection." },
    { title: "Sales Team", description: "Quotation, export documents and distributor support." },
    { title: "After-sales Team", description: "Installation guidance, spare parts and troubleshooting support." },
  ],
  marketsHeader: { eyebrow: "Global Export", title: "Export Markets We Support" },
  exportMarkets: [
    { value: "", label: "Southeast Asia", icon: "waves" },
    { value: "", label: "Middle East", icon: "landmark" },
    { value: "", label: "Europe", icon: "map" },
    { value: "", label: "North America", icon: "plane" },
    { value: "", label: "South America", icon: "ship" },
    { value: "", label: "Africa", icon: "mapPin" },
    { value: "", label: "Australia", icon: "compass" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getFactoryPageSettings({ stega: false }),
    getSiteSettings({ stega: false }),
  ]);
  const hero = page?.hero || fallbackFactory.hero;
  const seo = page?.seo;
  const title = hero?.title || "Factory";
  const description = hero?.description || "";
  return buildSeoMetadata({
    seo,
    title,
    description,
    canonical: `${getSiteUrl(settings)}/factory`,
    image: seo?.openGraphImage || hero?.backgroundImage || settings?.globalSeo?.openGraphImage,
    siteName: getSiteName(settings),
  });
}

function renderStats(items: StatItem[] | undefined) {
  return (items || []).map((item) => {
    const Icon = getIcon(item.icon, BadgeCheck);
    return (
      <div key={`${item.value}-${item.label}`} className="p-6 border border-[color:var(--border)] rounded-[10px] bg-white text-center">
        <Icon aria-hidden="true" className="w-6 h-6 mx-auto mb-3 text-[color:var(--orange)]" />
        <strong className="block text-[color:var(--blue)] text-[32px] font-black leading-none">{item.value}</strong>
        <span className="block mt-2 text-[color:var(--muted)] text-[14px]">{item.label}</span>
      </div>
    );
  });
}

function renderCards(items: TextCard[] | undefined) {
  return (items || []).map((item) => {
    const Icon = getIcon(item.icon, BadgeCheck);
    return (
      <article key={item._key || item.title} className="p-6 border border-[color:var(--border)] rounded-[var(--radius)] bg-white shadow-[0_10px_26px_rgba(9,24,39,0.05)]">
        {item.icon && (
          <span className="inline-grid place-items-center w-[42px] h-[42px] mb-4 rounded-[7px] bg-[#edf3f8] text-[color:var(--blue)]">
            <Icon aria-hidden="true" className="w-[21px] h-[21px]" />
          </span>
        )}
        <h3 className="m-0 mb-2.5 text-[20px] font-extrabold leading-[1.25]">{item.title}</h3>
        {item.description && <p className="m-0 text-[color:var(--muted)]">{item.description}</p>}
      </article>
    );
  });
}

export default async function FactoryPage() {
  const page = (await getFactoryPageSettings()) || {};
  const hero = page.hero || fallbackFactory.hero;
  const overview = page.overview || fallbackFactory.overview;
  const stats = page.stats?.length ? page.stats : fallbackFactory.stats;
  const productionSteps = page.productionSteps?.length ? page.productionSteps : fallbackFactory.productionSteps;
  const teamItems = page.teamItems?.length ? page.teamItems : fallbackFactory.teamItems;
  const exportMarkets = page.exportMarkets?.length ? page.exportMarkets : fallbackFactory.exportMarkets;
  const overviewImageSrc =
    resolveSanityImage(overview?.image, { width: 960, quality: 85 }) ||
    fallbackFactory.overview?.image?.url ||
    "";

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow}
        title={hero?.title || "Factory Strength You Can Trust"}
        description={hero?.description}
        backgroundImage={hero?.backgroundImage?.url}
        backgroundImageAlt={hero?.backgroundImage?.alt || ""}
      />

      <section className="section">
        <Container className="grid grid-cols-2 max-[1080px]:grid-cols-1 gap-[56px] items-center">
          <div className="relative min-h-[430px] w-full">
            <Image
              src={overviewImageSrc}
              alt={overview?.image?.alt || "Commercial kitchen equipment factory overview"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={shouldSkipNextOptimization(overviewImageSrc)}
              className="rounded-[10px] object-cover shadow-[var(--shadow)]"
            />
          </div>
          <div>
            <span className="eyebrow">{overview?.eyebrow || "Factory Overview"}</span>
            <h2 className="my-2.5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.12] tracking-[-0.04em]">{overview?.title}</h2>
            <div className="text-[color:var(--muted)] text-[17px] leading-[1.65]">
              {(overview?.paragraphs || []).map((paragraph) => (
                <p key={paragraph} className="m-0 mb-4">{paragraph}</p>
              ))}
            </div>
            <div className="mt-7">
              <Button href={overview?.cta?.href || "/contact"} iconEnd={<Send aria-hidden="true" />}>
                {overview?.cta?.text || "Request Factory Price"}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-[var(--light)]">
        <Container className="grid grid-cols-6 max-[1080px]:grid-cols-3 max-[760px]:grid-cols-1 gap-4">{renderStats(stats)}</Container>
      </section>

      <section className="section">
        <Container className="section-heading">
          <span className="eyebrow">{page.productionHeader?.eyebrow || fallbackFactory.productionHeader?.eyebrow}</span>
          <h2>{page.productionHeader?.title || fallbackFactory.productionHeader?.title}</h2>
          {page.productionHeader?.description && <p>{page.productionHeader.description}</p>}
        </Container>
        <Container className="grid grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-5">{renderCards(productionSteps)}</Container>
      </section>

      <section className="section bg-[var(--light)]">
        <Container className="section-heading">
          <span className="eyebrow">{page.teamHeader?.eyebrow || fallbackFactory.teamHeader?.eyebrow}</span>
          <h2>{page.teamHeader?.title || fallbackFactory.teamHeader?.title}</h2>
          {page.teamHeader?.description && <p>{page.teamHeader.description}</p>}
        </Container>
        <Container className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-5">{renderCards(teamItems)}</Container>
      </section>

      <section className="section">
        <Container className="section-heading">
          <span className="eyebrow">{page.marketsHeader?.eyebrow || fallbackFactory.marketsHeader?.eyebrow}</span>
          <h2>{page.marketsHeader?.title || fallbackFactory.marketsHeader?.title}</h2>
          {page.marketsHeader?.description && <p>{page.marketsHeader.description}</p>}
        </Container>
        <Container className="flex flex-wrap gap-3">
          {(exportMarkets || []).map((market) => {
            const Icon = getIcon(market.icon, BadgeCheck);
            return (
              <span key={market.label} className="inline-flex items-center gap-2 px-[18px] py-3.5 border border-[#cfd8e3] rounded-[6px] bg-[#edf3f8] text-[color:var(--blue)] font-extrabold">
                <Icon aria-hidden="true" className="w-4 h-4 text-[color:var(--orange)]" />
                {market.value ? `${market.value} ` : ""}
                {market.label}
              </span>
            );
          })}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
