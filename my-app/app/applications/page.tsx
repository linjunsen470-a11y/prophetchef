import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/common/CTASection";

const applications = [
  {
    name: "School Cafeteria",
    description: "Large-batch cooking, food warming and dishwashing for daily meal service.",
    recommended: "Induction wok cooker, combi oven, hood type dishwasher",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Hotel Kitchen",
    description: "All-day production equipment for breakfast, banquets and a la carte service.",
    recommended: "Combi oven, gas cooker, dishwasher, modular range",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Chain Restaurant",
    description: "Standardized cooking equipment for consistent recipes across locations.",
    recommended: "Automatic cooking machine, pasta cooker, induction cooker",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Central Kitchen",
    description: "High-volume cooking and dispatch systems for prepared food production.",
    recommended: "Automatic cooking kettle, modular line, dishwashing system",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Fast Food Restaurant",
    description: "Compact equipment for fast cooking, boiling and washing workflow.",
    recommended: "Pasta cooker, induction hob, undercounter dishwasher",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Asian Restaurant",
    description: "High-output wok cooking and soup preparation equipment.",
    recommended: "Induction wok cooker, stock pot stove, gas range",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Food Factory",
    description: "Processing and batch cooking equipment for packaged food production.",
    recommended: "Sauce kettle, automatic cooker, custom line",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Catering Service",
    description: "Mobile-friendly and reliable equipment for event meal preparation.",
    recommended: "Combi oven, dishwasher, modular equipment",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Commercial Kitchen Solutions for Different Applications"
        description="Recommended commercial kitchen equipment combinations for foodservice projects and professional buyers."
        backgroundImage="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
      />

      <section className="section">
        <SectionHeader
          eyebrow="Application Grid"
          title="Find the Right Equipment for Your Kitchen Type"
          alignment="center"
          className="application-grid-heading"
        />
        <Container className="application-grid">
          {applications.map((item) => (
            <article key={item.name} className="application-card">
              <figure className="application-image">
                <img src={item.image} alt={item.name} loading="lazy" />
              </figure>
              <div className="application-card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Recommended:</strong> {item.recommended}
                </p>
                <div className="card-actions">
                  <Button variant="secondary" size="small" href="#solution-detail">
                    View Solution
                  </Button>
                  <Button variant="primary" size="small" href={`/contact?product=${encodeURIComponent(`${item.name} Solution`)}`}>
                    Get Quote <Send aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="section bg-light" id="solution-detail">
        <SectionHeader eyebrow="Detailed Solutions" title="Project Planning Examples" />
        <Container className="solution-grid">
          <article className="solution-card">
            <h3>Central Kitchen Solution</h3>
            <h4>Pain Points</h4>
            <p>Central kitchens need high-capacity production, safe workflows, stable recipes and efficient cleaning zones.</p>
            <h4>Recommended Equipment</h4>
            <p>Automatic cooking machines, induction kettles, combi ovens, modular cooking lines and rack dishwashers.</p>
            <h4>Benefits</h4>
            <p>Improved production consistency, reduced labor dependency, better energy use and easier quality control.</p>
            <Button variant="primary" href="/contact?product=Central%20Kitchen%20Solution">
              Request Project Consultation <ArrowRight aria-hidden="true" />
            </Button>
          </article>
          <article className="solution-card">
            <h3>Chain Restaurant Solution</h3>
            <h4>Pain Points</h4>
            <p>Multi-store restaurant brands need standardized taste, fast staff training and equipment that is easy to maintain.</p>
            <h4>Recommended Equipment</h4>
            <p>Automatic stir-fry machines, pasta cookers, countertop induction cookers, combi ovens and undercounter dishwashers.</p>
            <h4>Benefits</h4>
            <p>Repeatable recipes, faster service speed, controlled operating costs and scalable procurement.</p>
            <Button variant="primary" href="/contact?product=Chain%20Restaurant%20Solution">
              Discuss Your Chain&apos;s Needs <ArrowRight aria-hidden="true" />
            </Button>
          </article>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
