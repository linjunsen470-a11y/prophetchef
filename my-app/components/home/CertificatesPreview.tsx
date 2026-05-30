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
      <Container className="certificate-strip">
        {displayCertificates.map((cert) => {
          const Icon = getIcon(cert.icon, FileCheck);
          return (
            <div key={cert.label}>
              <Icon aria-hidden="true" />
              {cert.label}
            </div>
          );
        })}
      </Container>
    </section>
  );
};
