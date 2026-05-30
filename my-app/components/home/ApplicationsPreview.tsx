import React from "react";
import { Button } from "@/components/common/Button";
import { applications as staticApplications } from "@/data/applications";
import { Container } from "../common/Container";
import { BadgeCheck } from "lucide-react";
import { getApplications } from "@/sanity/queries";
import type { Application, SectionHeaderData } from "@/sanity/types";

interface ApplicationsPreviewProps {
  applications?: Application[];
  header?: SectionHeaderData;
}

export const ApplicationsPreview = async ({ applications, header }: ApplicationsPreviewProps) => {
  let displayApplications =
    applications?.map((item, index) => ({
      id: String(index + 1).padStart(2, "0"),
      name: item.name,
      description: item.description || "",
    })) || [];

  if (displayApplications.length === 0) {
    const cmsApplications = await getApplications();
    displayApplications = cmsApplications.length
      ? cmsApplications.slice(0, 4).map((item, index) => ({
          id: String(index + 1).padStart(2, "0"),
          name: item.name,
          description: item.description || "",
        }))
      : staticApplications;
  }

  return (
    <section className="section bg-light">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">{header?.eyebrow || "Applications"}</span>
          <h2>{header?.title || "Solutions for Different Kitchen Projects"}</h2>
          {header?.description && <p>{header.description}</p>}
        </div>
        <Button variant="secondary" href={header?.cta?.href || "/applications"}>
          {header?.cta?.text || "View Applications"}
        </Button>
      </Container>
      <Container className="application-preview-grid">
        {displayApplications.map((app) => (
          <article key={app.id}>
            <span>
              <BadgeCheck aria-hidden="true" />
              {app.id}
            </span>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </article>
        ))}
      </Container>
    </section>
  );
};
