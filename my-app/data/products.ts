export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  specs?: Record<string, string>;
  features?: string[];
}

export const products: Product[] = [
  {
    id: "01",
    name: "Heavy Duty Commercial Induction Wok Cooker",
    slug: "heavy-duty-commercial-induction-wok-cooker",
    category: "Commercial Induction Cookers",
    description: "High-power wok station for hotel, canteen and central kitchen cooking lines.",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    tags: ["8-30kW", "SUS304", "CE"],
  },
  {
    id: "02",
    name: "360° Automatic Stir-fry Cooking Machine",
    slug: "360-automatic-stir-fry-cooking-machine",
    category: "Automatic Cooking Machines",
    description: "Programmable rotating cooker for standardized recipes and chain restaurants.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    tags: ["Auto Stir", "Touch Panel", "OEM"],
  },
  {
    id: "03",
    name: "Commercial Combi Steam Oven",
    slug: "commercial-combi-steam-oven",
    category: "Combi Ovens",
    description: "Steam, convection and mixed cooking modes for efficient batch production.",
    image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["6/10/20 Trays", "Steam", "Digital"],
  },
  {
    id: "04",
    name: "Hood Type Commercial Dishwasher",
    slug: "hood-type-commercial-dishwasher",
    category: "Commercial Dishwashers",
    description: "High-temperature washing system for hotels, schools and catering kitchens.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Rack Type", "Low Water", "Fast Cycle"],
  },
  {
    id: "05",
    name: "Modular Induction Cooking Range",
    slug: "modular-induction-cooking-range",
    category: "Modular Cooking Systems",
    description: "Integrated commercial cooking line for professional open kitchens.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    tags: ["Modular", "Custom", "Heavy Duty"],
  },
  {
    id: "06",
    name: "Automatic Pasta Cooker",
    slug: "automatic-pasta-cooker",
    category: "Food Processing Equipment",
    description: "Stainless steel electric pasta boiler for fast food and restaurant chains.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    tags: ["6 Baskets", "Timer", "Easy Clean"],
  },
  {
    id: "07",
    name: "Heavy Duty Gas Stock Pot Stove",
    slug: "heavy-duty-gas-stock-pot-stove",
    category: "Gas Cookers",
    description: "Durable gas cooking equipment for soups, stocks and large-volume cooking.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    tags: ["LPG/NG", "Cast Iron", "Durable"],
  },
  {
    id: "08",
    name: "Countertop Commercial Induction Cooker",
    slug: "countertop-commercial-induction-cooker",
    category: "Commercial Induction Cookers",
    description: "Compact high-efficiency induction hob for restaurant prep stations.",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    tags: ["3.5-5kW", "Portable", "Safe"],
  },
  {
    id: "09",
    name: "Automatic Sauce Cooking Kettle",
    slug: "automatic-sauce-cooking-kettle",
    category: "Automatic Cooking Machines",
    description: "Tilting mixing kettle for sauces, fillings and prepared food production.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    tags: ["Tilting", "Mixer", "Steam Jacket"],
  },
  {
    id: "10",
    name: "Bakery Electric Convection Oven",
    slug: "bakery-electric-convection-oven",
    category: "Combi Ovens",
    description: "Reliable baking oven for bakeries, hotels and foodservice operations.",
    image: "https://images.unsplash.com/photo-1581578017423-5f3e4f0d41f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Multi Tray", "Even Heat", "Timer"],
  },
  {
    id: "11",
    name: "Undercounter Commercial Dishwasher",
    slug: "undercounter-commercial-dishwasher",
    category: "Commercial Dishwashers",
    description: "Space-saving dishwasher for bars, cafés and small restaurants.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Compact", "Fast Wash", "Stainless"],
  },
  {
    id: "12",
    name: "Custom Central Kitchen Equipment Line",
    slug: "custom-central-kitchen-equipment-line",
    category: "Custom Kitchen Solutions",
    description: "Turnkey equipment planning and customized manufacturing for project buyers.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    tags: ["Turnkey", "OEM/ODM", "Layout Support"],
  },
];
