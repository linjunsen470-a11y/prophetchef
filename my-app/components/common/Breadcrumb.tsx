import React from "react";
import Link from "next/link";
import { Container } from "./Container";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <section className="bg-light border-b border-border py-[18px]">
      <Container className="flex gap-[10px] items-center text-muted text-[14px]">
        <Link href="/" className="text-blue font-800 no-underline">Home</Link>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="text-blue font-800 no-underline">{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
          </React.Fragment>
        ))}
      </Container>
    </section>
  );
};
