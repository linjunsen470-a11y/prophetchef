import React from "react";
import { applications } from "@/data/applications";
import { Container } from "../common/Container";

export const ApplicationsPreview = () => {
  return (
    <section className="section bg-light">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">Applications</span>
          <h2>Solutions for Different Kitchen Projects</h2>
        </div>
        <a className="btn btn-secondary" href="/applications">View Applications</a>
      </Container>
      <Container className="application-preview-grid">
        {applications.map((app) => (
          <article key={app.id}>
            <span>{app.id}</span>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </article>
        ))}
      </Container>
    </section>
  );
};
