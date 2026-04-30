import React from "react";
import { siteConfig } from "@/data/site";
import { Container } from "../common/Container";

export const TrustBar = () => {
  return (
    <section className="trust-bar">
      <Container className="trust-grid">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
};
