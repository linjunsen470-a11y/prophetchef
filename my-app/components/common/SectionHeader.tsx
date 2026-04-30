import React from "react";
import { Container } from "./Container";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center" | "split";
  children?: React.ReactNode; // For buttons in split mode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  alignment = "left",
  children,
}) => {
  if (alignment === "split") {
    return (
      <Container className="section-heading split-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </Container>
    );
  }

  return (
    <Container className={`section-heading ${alignment === "center" ? "text-center mx-auto" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Container>
  );
};
