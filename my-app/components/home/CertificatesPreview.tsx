import React from "react";
import { certificates } from "@/data/applications";
import { Container } from "../common/Container";

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
            {cert}
          </div>
        ))}
      </Container>
    </section>
  );
};
