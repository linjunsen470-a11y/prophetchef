import React from "react";
import Image from "next/image";
import { Container } from "../common/Container";
import { Button } from "@/components/common/Button";
import { CheckCircle2 } from "lucide-react";
import type { MediaTextSection } from "@/sanity/types";
import { siteConfig } from "@/data/site";
import { resolveSanityImage, shouldSkipNextOptimization } from "@/lib/images";
import styles from "./FactoryPreview.module.css";

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
        "10+ years manufacturing experience",
        "7000sqm production base",
        "Integrated metal processing and assembly workflow",
        "Export support for distributors and project contractors",
        "On-site showroom available for project review",
      ];

  const previewImageSrc =
    resolveSanityImage(data?.image, { width: 960, quality: 85 }) || siteConfig.factoryPreviewImage;

  return (
    <section className="section factory-preview">
      <Container className="grid grid-cols-2 max-[1080px]:grid-cols-1 gap-[56px] items-center">
        <div className="relative min-h-[430px] w-full">
          <Image
            src={previewImageSrc}
            alt={data?.image?.alt || "ProphetChef production facility"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={shouldSkipNextOptimization(previewImageSrc)}
            className="rounded-[10px] object-cover shadow-[var(--shadow)]"
          />
        </div>
        <div className={styles.factoryCopy}>
          <span className="eyebrow">{data?.eyebrow || "Factory Strength"}</span>
          <h2>{data?.title || "Built for Stable Supply and Global Project Delivery"}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="list-none p-0 my-[22px]">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-[9px] relative pl-0 my-2.5 text-[color:var(--muted)] font-semibold">
                <CheckCircle2 aria-hidden="true" className="w-[18px] h-[18px] mt-[3px] text-[color:var(--orange)] shrink-0" />
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
