export type ApplicationSlug =
  | "school-cafeteria"
  | "hotel-kitchen"
  | "chain-restaurant"
  | "central-kitchen"
  | "fast-food-restaurant"
  | "catering-service";

export interface ApplicationImage {
  slug: ApplicationSlug | "hero";
  src: string;
  alt: string;
  title: string;
  description: string;
  sourcePhoto: string;
}

const applicationImageBase = "/images/applications";

export const applicationHeroImage = {
  src: `${applicationImageBase}/hero.webp`,
  alt: "Polished stainless-steel commercial kitchen with professional range lines and prep stations",
  title: "Commercial Kitchen Solutions",
  description:
    "Professional commercial kitchen environment suited to foodservice projects across schools, hotels, chains and central production.",
  sourcePhoto: "Pexels 28704740 — commercial kitchen stainless steel equipment",
} as const;

export const applicationCardImages: Record<ApplicationSlug, ApplicationImage> = {
  "school-cafeteria": {
    slug: "school-cafeteria",
    src: `${applicationImageBase}/school-cafeteria.webp`,
    alt: "Cafeteria staff preparing food at a modern service counter with warm lighting",
    title: "School Cafeteria",
    description:
      "Large-batch cooking, food warming and dishwashing equipment for daily institutional meal service in schools and similar settings.",
    sourcePhoto: "Pexels 5973727 — cafeteria serving counter",
  },
  "hotel-kitchen": {
    slug: "hotel-kitchen",
    src: `${applicationImageBase}/hotel-kitchen.webp`,
    alt: "Professional kitchen with chefs cooking and plating gourmet dishes",
    title: "Hotel Kitchen",
    description:
      "All-day production equipment for breakfast, banquets and à la carte service in hotels and high-end restaurants.",
    sourcePhoto: "Pexels 2290753 — hotel restaurant kitchen with chefs",
  },
  "chain-restaurant": {
    slug: "chain-restaurant",
    src: `${applicationImageBase}/chain-restaurant.webp`,
    alt: "Modern standardized commercial kitchen line with stainless steel equipment and prep areas",
    title: "Chain Restaurant",
    description:
      "Standardized cooking equipment for consistent recipes and repeatable workflows across multiple franchise locations.",
    sourcePhoto: "Pexels 2696064 — standardized kitchen line",
  },
  "central-kitchen": {
    slug: "central-kitchen",
    src: `${applicationImageBase}/central-kitchen.webp`,
    alt: "Workers in protective gear and masks preparing food in high-volume industrial central kitchen",
    title: "Central Kitchen",
    description:
      "Industrial food production kitchen designed for batch cooking, portioning and dispatch to multiple outlets or locations.",
    sourcePhoto: "Pexels 35244397 — workers in blue uniforms in central kitchen",
  },
  "fast-food-restaurant": {
    slug: "fast-food-restaurant",
    src: `${applicationImageBase}/fast-food-restaurant.webp`,
    alt: "Bustling quick service restaurant kitchen prep line under warm lights",
    title: "Fast Food Restaurant",
    description:
      "High-throughput quick-service kitchen setup for standardized recipes, fast ticket times and consistent high-volume operations.",
    sourcePhoto: "Pexels 29560600 — fast food cooking line",
  },
  "catering-service": {
    slug: "catering-service",
    src: `${applicationImageBase}/catering-service.webp`,
    alt: "Chefs preparing and plating dishes for a large catering banquet event",
    title: "Catering Service",
    description:
      "Large-scale professional prep kitchen equipment for event banquets, mobile catering and high-volume dispatch.",
    sourcePhoto: "Pexels 9585644 — catering buffet plating prep",
  },
};

/** Image paths keyed by application slug for page fallbacks and previews. */
export const applicationImages: Record<ApplicationSlug, string> = {
  "school-cafeteria": applicationCardImages["school-cafeteria"].src,
  "hotel-kitchen": applicationCardImages["hotel-kitchen"].src,
  "chain-restaurant": applicationCardImages["chain-restaurant"].src,
  "central-kitchen": applicationCardImages["central-kitchen"].src,
  "fast-food-restaurant": applicationCardImages["fast-food-restaurant"].src,
  "catering-service": applicationCardImages["catering-service"].src,
};