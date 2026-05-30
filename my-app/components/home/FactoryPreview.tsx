import React from "react";
import Image from "next/image";
import { Container } from "../common/Container";
import { Button } from "@/components/common/Button";
import { CheckCircle2 } from "lucide-react";
import type { MediaTextSection } from "@/sanity/types";

interface FactoryPreviewProps {
  data?: MediaTextSection;
}

export const FactoryPreview = ({ data }: FactoryPreviewProps) => {
  const paragraphs = data?.paragraphs?.length
    ? data.paragraphs
    : [
        "Our production base integrates laser cutting, bending, welding, assembly and testing lines, supported by R&D, QC, sales and after-sales teams.",
      ];
  const bullets = data?.bullets?.length
    ? data.bullets
    : [
        "20+ years manufacturing experience",
        "15000sqm production base",
        "Integrated metal processing and assembly workflow",
        "Export support for distributors and project contractors",
      ];

  return (
    <section className="section factory-preview">
      <Container className="two-col align-center">
        <div className="image-stack relative min-h-[430px] w-full">
          <Image
            src={data?.image?.url || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"}
            alt={data?.image?.alt || "Commercial kitchen equipment production base"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-[22px] object-cover shadow-[var(--shadow)]"
          />
        </div>
        <div>
          <span className="eyebrow">{data?.eyebrow || "Factory Strength"}</span>
          <h2>{data?.title || "Built for Stable Supply and Global Project Delivery"}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="check-list">
            {bullets.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Button variant="primary" href={data?.cta?.href || "/factory"}>
            {data?.cta?.text || "Explore Our Factory"}
          </Button>
        </div>
      </Container>
    </section>
  );
};
