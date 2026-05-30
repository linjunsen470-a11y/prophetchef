import React from "react";
import Image from "next/image";
import {
  Building2,
  ClipboardCheck,
  Compass,
  Factory,
  FlaskConical,
  Headset,
  Landmark,
  MailCheck,
  Map,
  MapPinned,
  Plane,
  Scissors,
  Send,
  Settings,
  ShieldCheck,
  Ship,
  Sparkles,
  Users,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { CTASection } from "@/components/common/CTASection";
import { Button } from "@/components/common/Button";

const factoryStats = [
  { value: "15000sqm", label: "Factory", icon: Factory },
  { value: "750+", label: "Employees", icon: Users },
  { value: "18", label: "R&D Personnel", icon: Sparkles },
  { value: "75", label: "QC Inspectors", icon: ShieldCheck },
  { value: "114", label: "Sales Team", icon: MailCheck },
  { value: "64", label: "After-sales Instructors", icon: Headset },
];

const productionSteps = [
  {
    title: "Laser Cutting",
    description: "Precise sheet metal processing for stainless steel components.",
    icon: Scissors,
  },
  {
    title: "Sheet Metal Workshop",
    description: "Stable manufacturing workflow for commercial-grade equipment bodies.",
    icon: Building2,
  },
  {
    title: "Bending",
    description: "Accurate forming for durable panels and structural parts.",
    icon: Wrench,
  },
  {
    title: "Welding",
    description: "Professional welding for heavy-duty stainless steel construction.",
    icon: Zap,
  },
  {
    title: "Assembly Line",
    description: "Organized assembly for induction, gas, dishwashing and oven products.",
    icon: Settings,
  },
  {
    title: "Aging Test",
    description: "Electrical and performance checks before packing.",
    icon: ClipboardCheck,
  },
  {
    title: "Salt Spray Test",
    description: "Corrosion-resistance evaluation for key metal parts.",
    icon: FlaskConical,
  },
  {
    title: "Quality Inspection",
    description: "Final QC before shipment and export packaging.",
    icon: ShieldCheck,
  },
];

const teamStructure = [
  {
    title: "R&D Team",
    description: "Product improvement, electrical design and custom development.",
  },
  {
    title: "Engineering Team",
    description: "Project layout support and technical matching.",
  },
  {
    title: "Production Team",
    description: "Stable production scheduling and assembly execution.",
  },
  {
    title: "QC Team",
    description: "Incoming, in-process and pre-shipment inspection.",
  },
  {
    title: "Sales Team",
    description: "Quotation, export documents and distributor support.",
  },
  {
    title: "After-sales Team",
    description: "Installation guidance, spare parts and troubleshooting support.",
  },
];

const exportMarkets = [
  { name: "Southeast Asia", icon: Waves },
  { name: "Middle East", icon: Landmark },
  { name: "Europe", icon: Map },
  { name: "North America", icon: Plane },
  { name: "South America", icon: Ship },
  { name: "Africa", icon: MapPinned },
  { name: "Australia", icon: Compass },
];

export default function FactoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Factory"
        title="Factory Strength You Can Trust"
        description="Integrated manufacturing capability for commercial kitchen equipment, OEM projects and global distribution partners."
        backgroundImage="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section">
        <Container className="two-col align-center">
          <div className="relative min-h-[430px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"
              alt="Commercial kitchen equipment factory overview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-[22px] object-cover shadow-[var(--shadow)]"
            />
          </div>
          <div>
            <span className="eyebrow">Factory Overview</span>
            <h2 className="factory-overview-title">
              One-Stop Manufacturing for Commercial Foodservice Equipment
            </h2>
            <div className="factory-copy">
              <p>
                With 20+ years of manufacturing experience, a 15000sqm production base and
                750+ employees, ProKitchenTech supports distributors, kitchen contractors
                and foodservice project buyers in more than 50 export countries.
              </p>
              <p>
                Our integrated production line covers induction cooking, gas cooking,
                dishwashing, ovens and custom kitchen equipment.
              </p>
            </div>
            <div className="mt-7">
              <Button href="/contact" iconEnd={<Send aria-hidden="true" />}>Request Factory Price</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-[var(--light)]">
        <Container className="factory-data-grid">
          {factoryStats.map((stat) => {
            const Icon = stat.icon;
            return (
            <div key={stat.label}>
              <Icon aria-hidden="true" />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
            );
          })}
        </Container>
      </section>

      <section className="section">
        <Container className="section-heading">
          <span className="eyebrow">Production Capability</span>
          <h2>From Sheet Metal to Final Testing</h2>
        </Container>
        <Container className="factory-process-grid">
          {productionSteps.map((step) => {
            const Icon = step.icon;
            return (
            <article key={step.title}>
              <span className="factory-card-icon"><Icon aria-hidden="true" /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
            );
          })}
        </Container>
      </section>

      <section className="section bg-[var(--light)]">
        <Container className="section-heading">
          <span className="eyebrow">Team Structure</span>
          <h2>Specialized Teams for Global B2B Orders</h2>
        </Container>
        <Container className="factory-team-grid">
          {teamStructure.map((team) => (
            <article key={team.title}>
              <h3>{team.title}</h3>
              <p>{team.description}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="section">
        <Container className="section-heading">
          <span className="eyebrow">Global Export</span>
          <h2>Export Markets We Support</h2>
        </Container>
        <Container className="factory-market-grid">
          {exportMarkets.map((market) => {
            const Icon = market.icon;
            return (
            <span key={market.name}>
              <Icon aria-hidden="true" />
              {market.name}
            </span>
            );
          })}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
