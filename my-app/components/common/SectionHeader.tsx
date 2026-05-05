import React from "react";
import { Container } from "./Container";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center" | "split";
  className?: string;
  children?: React.ReactNode; // For buttons in split mode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  alignment = "left",
  className = "",
  children,
}) => {
  if (alignment === "split") {
    return (
      <Container className={`section-heading split-heading ${className}`}>
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
    <Container className={`section-heading ${alignment === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Container>
  );
};
