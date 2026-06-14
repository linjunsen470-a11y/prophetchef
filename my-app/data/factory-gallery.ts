export type FactoryImageCategory = "exterior" | "showroom" | "workshop" | "installation";

export interface FactoryImage {
  id: string;
  src: string;
  category: FactoryImageCategory;
  title: string;
  alt: string;
  caption?: string;
}

const factoryImageBase = "/images/factory";

export const factoryImages: FactoryImage[] = [
  {
    id: "exterior-01",
    src: `${factoryImageBase}/exterior-office-workshop-corridor-01.webp`,
    category: "exterior",
    title: "Office and Production Corridor",
    alt: "ProphetChef factory office building and workshop corridor",
    caption: "Organized facility connecting administration and production zones.",
  },
  {
    id: "exterior-02",
    src: `${factoryImageBase}/exterior-office-workshop-corridor-02.webp`,
    category: "exterior",
    title: "Factory Campus Walkway",
    alt: "ProphetChef factory campus walkway between office and workshops",
    caption: "Clear logistics routes for stable export production scheduling.",
  },
  {
    id: "exterior-03",
    src: `${factoryImageBase}/exterior-workshop-main-road.webp`,
    category: "exterior",
    title: "Workshop Main Road",
    alt: "ProphetChef production facility main road and workshop buildings",
    caption: "15,000m² integrated manufacturing base for commercial kitchen equipment.",
  },
  {
    id: "showroom-04",
    src: `${factoryImageBase}/showroom-induction-integrated-kitchen.webp`,
    category: "showroom",
    title: "Induction & Integrated Kitchen Line",
    alt: "Commercial induction cookers and integrated kitchen equipment showroom",
    caption: "Full-range induction cooking and integrated kitchen solutions on display.",
  },
  {
    id: "showroom-05",
    src: `${factoryImageBase}/showroom-fast-food-fryer-zone.webp`,
    category: "showroom",
    title: "Fast Food & Fryer Zone",
    alt: "Fast food and commercial fryer equipment showroom zone",
    caption: "Fryers and fast-food production equipment for chain restaurant projects.",
  },
  {
    id: "showroom-06",
    src: `${factoryImageBase}/showroom-auto-cooking-commercial-ranges.webp`,
    category: "showroom",
    title: "Automatic Cooking & Commercial Ranges",
    alt: "Automatic cooking machines and commercial range equipment showroom",
    caption: "Automatic stir-fry machines and commercial cooking lines for standardized output.",
  },
  {
    id: "showroom-07",
    src: `${factoryImageBase}/showroom-wok-baking-equipment.webp`,
    category: "showroom",
    title: "Wok Ranges & Baking Equipment",
    alt: "Commercial wok ranges and baking equipment showroom",
    caption: "Heavy-duty wok cookers and baking equipment for hotel and catering kitchens.",
  },
  {
    id: "showroom-08",
    src: `${factoryImageBase}/showroom-smart-kitchen-noodle-cooker.webp`,
    category: "showroom",
    title: "Smart Kitchen & Noodle Cooker Line",
    alt: "Smart kitchen equipment and automatic noodle cooker showroom",
    caption: "Smart kitchen systems including automatic lifting noodle cookers.",
  },
  {
    id: "showroom-09",
    src: `${factoryImageBase}/showroom-premium-island-range.webp`,
    category: "showroom",
    title: "Premium Island Range Display",
    alt: "Premium integrated commercial island range equipment display",
    caption: "High-end island cooking lines for hotel and premium foodservice projects.",
  },
  {
    id: "showroom-10",
    src: `${factoryImageBase}/showroom-teppanyaki-equipment.webp`,
    category: "showroom",
    title: "Teppanyaki Equipment",
    alt: "Japanese teppanyaki commercial cooking equipment display",
    caption: "Specialty teppanyaki equipment for restaurant and hotel applications.",
  },
  {
    id: "showroom-11",
    src: `${factoryImageBase}/showroom-range-line-client-logo-wall.webp`,
    category: "showroom",
    title: "Range Line & Partner Logo Wall",
    alt: "Commercial range equipment line and global partner logo wall at ProphetChef showroom",
    caption: "Trusted manufacturing partner for distributors and project contractors worldwide.",
  },
  {
    id: "showroom-12",
    src: `${factoryImageBase}/showroom-open-kitchen-demo-zone.webp`,
    category: "showroom",
    title: "Open Kitchen Demo Zone",
    alt: "Smart open kitchen demonstration zone with commercial equipment",
    caption: "Open-kitchen demo zone for visible cooking and front-of-house projects.",
  },
  {
    id: "showroom-13",
    src: `${factoryImageBase}/showroom-prep-station-workbench.webp`,
    category: "showroom",
    title: "Prep Station Workbench",
    alt: "Commercial kitchen prep station with stainless steel workbench",
    caption: "Standard prep zones for central kitchen and high-volume catering workflows.",
  },
  {
    id: "showroom-14",
    src: `${factoryImageBase}/showroom-cleaning-sanitation-zone.webp`,
    category: "showroom",
    title: "Cleaning & Sanitation Zone",
    alt: "Commercial kitchen cleaning and knife sanitization zone",
    caption: "Hygienic back-of-house cleaning layout aligned with food safety requirements.",
  },
  {
    id: "showroom-15",
    src: `${factoryImageBase}/showroom-conveyor-fast-food-line.webp`,
    category: "showroom",
    title: "Conveyor Fast Food Line",
    alt: "Automated fast food production conveyor line equipment",
    caption: "Automated conveyor lines for school cafeterias and chain fast-food projects.",
  },
  {
    id: "workshop-16",
    src: `${factoryImageBase}/workshop-induction-assembly-welding.webp`,
    category: "workshop",
    title: "Induction Assembly & Welding",
    alt: "Commercial induction cooker core component assembly and welding workshop",
    caption: "Core induction components assembled and welded in-house.",
  },
  {
    id: "workshop-17",
    src: `${factoryImageBase}/workshop-sheet-metal-stamping.webp`,
    category: "workshop",
    title: "Sheet Metal Stamping",
    alt: "Sheet metal stamping and hardware processing workshop",
    caption: "Precision sheet metal processing for stainless-steel equipment bodies.",
  },
  {
    id: "workshop-18",
    src: `${factoryImageBase}/workshop-cnc-bending.webp`,
    category: "workshop",
    title: "CNC Bending",
    alt: "CNC automatic bending machine operation in commercial equipment factory",
    caption: "CNC bending for accurate panels and structural parts.",
  },
  {
    id: "workshop-19",
    src: `${factoryImageBase}/workshop-dishwasher-assembly.webp`,
    category: "workshop",
    title: "Dishwasher Assembly",
    alt: "Commercial dishwasher assembly and wiring workshop",
    caption: "Commercial dishwashers assembled and wired on dedicated lines.",
  },
  {
    id: "workshop-20",
    src: `${factoryImageBase}/workshop-heavy-equipment-assembly.webp`,
    category: "workshop",
    title: "Heavy Equipment Assembly",
    alt: "Heavy commercial kitchen equipment and fan assembly workshop",
    caption: "Heavy-duty commercial equipment assembled for stable long-term operation.",
  },
  {
    id: "workshop-21",
    src: `${factoryImageBase}/workshop-hood-dishwasher-assembly.webp`,
    category: "workshop",
    title: "Hood Dishwasher Assembly",
    alt: "Hood type commercial dishwasher welding and assembly workshop",
    caption: "Hood-type dishwashers welded and assembled for project installations.",
  },
  {
    id: "workshop-22",
    src: `${factoryImageBase}/workshop-precision-welding-polishing.webp`,
    category: "workshop",
    title: "Precision Welding & Polishing",
    alt: "Precision metal welding and polishing workshop for commercial kitchen equipment",
    caption: "Precision welding and polishing for durable stainless-steel construction.",
  },
  {
    id: "workshop-23",
    src: `${factoryImageBase}/workshop-range-dishwasher-polishing.webp`,
    category: "workshop",
    title: "Range & Dishwasher Polishing",
    alt: "Commercial range and dishwasher welding polishing workshop",
    caption: "Final metal finishing for ranges and dishwashers before quality inspection.",
  },
  {
    id: "installation-24",
    src: `${factoryImageBase}/installation-drum-wok-rice-steamer.webp`,
    category: "installation",
    title: "Drum Wok & Rice Steamer Installation",
    alt: "Commercial smart kitchen with drum wok cooker and rice steamer installation",
    caption: "Real installation reference for distributors and project contractors.",
  },
  {
    id: "installation-25",
    src: `${factoryImageBase}/installation-rice-roll-noodle-machines.webp`,
    category: "installation",
    title: "Rice Roll & Noodle Machine Installation",
    alt: "Commercial smart kitchen with automatic rice roll steamer and noodle cooker",
    caption: "Automated specialty cooking equipment deployed in live kitchen environments.",
  },
];

export const factoryImageById = Object.fromEntries(
  factoryImages.map((image) => [image.id, image]),
) as Record<string, FactoryImage>;

export function getFactoryImagesByCategory(category: FactoryImageCategory) {
  return factoryImages.filter((image) => image.category === category);
}

export const factoryExteriorImages = getFactoryImagesByCategory("exterior");
export const factoryShowroomImages = getFactoryImagesByCategory("showroom");
export const factoryWorkshopImages = getFactoryImagesByCategory("workshop");
export const factoryInstallationImages = getFactoryImagesByCategory("installation");

export const factoryTrustImage = factoryImageById["showroom-11"];

export const factoryProductionStepImages: Record<string, string> = {
  "Laser Cutting": factoryImageById["workshop-17"].src,
  "Sheet Metal Workshop": factoryImageById["workshop-17"].src,
  Bending: factoryImageById["workshop-18"].src,
  Welding: factoryImageById["workshop-16"].src,
  "Assembly Line": factoryImageById["workshop-19"].src,
  "Aging Test": factoryImageById["workshop-20"].src,
  "Salt Spray Test": factoryImageById["workshop-22"].src,
  "Quality Inspection": factoryImageById["showroom-14"].src,
};

export const applicationFactoryImages: Record<string, string> = {
  "school-cafeteria": factoryImageById["showroom-15"].src,
  "hotel-kitchen": factoryImageById["showroom-09"].src,
  "chain-restaurant": factoryImageById["showroom-06"].src,
  "central-kitchen": factoryImageById["showroom-13"].src,
  "open-kitchen": factoryImageById["showroom-12"].src,
  teppanyaki: factoryImageById["showroom-10"].src,
};

export const homeApplicationPreviewImages = [
  factoryImageById["showroom-15"],
  factoryImageById["showroom-09"],
  factoryImageById["showroom-06"],
  factoryImageById["showroom-13"],
];

export const factoryTourHighlightImages = [
  factoryImageById["exterior-01"],
  factoryImageById["workshop-16"],
  factoryImageById["showroom-04"],
  factoryImageById["showroom-11"],
  factoryImageById["installation-24"],
];