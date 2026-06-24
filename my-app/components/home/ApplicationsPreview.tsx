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
      <Container className="grid grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1 gap-5">
        {displayApplications.map((app) => (
          <article
            key={app.id}
            className="p-6 bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_26px_rgba(9,24,39,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(9,24,39,0.08)]"
          >
            <span className="inline-flex items-center gap-1.5 text-[color:var(--orange)] font-black mb-3">
              <BadgeCheck aria-hidden="true" className="w-[17px] h-[17px]" />
              {app.id}
            </span>
            <h3 className="m-0 mb-2 text-[20px] leading-[1.25] font-extrabold text-[color:var(--text)]">{app.name}</h3>
            <p className="text-[color:var(--muted)] m-0">{app.description}</p>
          </article>
        ))}
      </Container>
    </section>
  );
};