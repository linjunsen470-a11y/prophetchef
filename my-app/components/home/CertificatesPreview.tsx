import React from "react";
import { certificates } from "@/data/applications";
import { Container } from "../common/Container";
import {
  BadgeCheck,
  ClipboardCheck,
  FileCheck,
  PlugZap,
  Recycle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const certificateIcons: Record<string, LucideIcon> = {
  CE: BadgeCheck,
  "ISO 9001": ShieldCheck,
  RoHS: Recycle,
  ETL: PlugZap,
  "Inspection Report": ClipboardCheck,
  "Patent Certificate": FileCheck,
};

export const CertificatesPreview = () => {
  return (
    <section className="section">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">Certificates</span>
          <h2>Compliance Support for Global Buyers</h2>
        </div>
        <a className="btn btn-secondary" href="/certificates">View Certificates</a>
      </Container>
      <Container className="certificate-strip">
        {certificates.map((cert) => (
          <div key={cert}>
            {React.createElement(certificateIcons[cert] ?? FileCheck, { "aria-hidden": true })}
            {cert}
          </div>
        ))}
      </Container>
    </section>
  );
};
