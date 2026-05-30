import React from "react";
import { certificates as staticCertificates } from "@/data/applications";
import { Container } from "../common/Container";
import { FileCheck } from "lucide-react";
import { Button } from "@/components/common/Button";
import { getIcon } from "@/components/common/IconByName";
import { getCertificates } from "@/sanity/queries";
import type { Certificate, SectionHeaderData } from "@/sanity/types";

interface CertificatesPreviewProps {
  certificates?: Certificate[];
  header?: SectionHeaderData;
}

export const CertificatesPreview = async ({ certificates, header }: CertificatesPreviewProps) => {
  let displayCertificates =
    certificates?.map((cert) => ({
      label: cert.title,
      icon: cert.icon,
    })) || [];

  if (displayCertificates.length === 0) {
    const cmsCertificates = await getCertificates();
    displayCertificates = cmsCertificates.length
      ? cmsCertificates.map((cert) => ({ label: cert.title, icon: cert.icon }))
      : staticCertificates.map((cert) => ({ label: cert, icon: undefined }));
  }

  return (
    <section className="section">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">{header?.eyebrow || "Certificates"}</span>
          <h2>{header?.title || "Compliance Support for Global Buyers"}</h2>
          {header?.description && <p>{header.description}</p>}
        </div>
        <Button variant="secondary" href={header?.cta?.href || "/certificates"}>
          {header?.cta?.text || "View Certificates"}
        </Button>
      </Container>
      <Container className="grid grid-cols-6 max-[760px]:grid-cols-2 gap-[14px]">
        {displayCertificates.map((cert) => {
          const Icon = getIcon(cert.icon, FileCheck);
          return (
            <div key={cert.label} className="min-h-[110px] flex flex-col items-center justify-center gap-2.5 border border-[color:var(--border)] rounded-[16px] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] font-black text-[color:var(--blue)] text-center px-[18px] py-3.5 shadow-[0_10px_26px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#fed7aa] hover:shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
              <Icon aria-hidden="true" className="w-[42px] h-[42px] p-[9.33px] rounded-[14px] bg-[#fff7ed] text-[color:var(--orange)] stroke-[2px]" />
              {cert.label}
            </div>
          );
        })}
      </Container>
    </section>
  );
};
