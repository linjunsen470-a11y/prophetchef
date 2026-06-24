import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const allItems: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <section className={styles.breadcrumbSection}>
      <Container>
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            {allItems.map((item, index) => {
              const isCurrent = index === allItems.length - 1;

              return (
                <li className={styles.breadcrumbItem} key={`${item.name}-${index}`}>
                  {index > 0 && (
                    <ChevronRight className={styles.separator} aria-hidden="true" />
                  )}
                  {item.href && !isCurrent ? (
                    <Link href={item.href} className={styles.link}>
                      {item.name}
                    </Link>
                  ) : (
                    <span className={styles.current} aria-current={isCurrent ? "page" : undefined}>
                      {item.name}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </section>
  );
};
