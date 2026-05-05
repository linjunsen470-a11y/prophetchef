import React from "react";
import { siteConfig } from "@/data/site";
import { Container } from "../common/Container";

import styles from "./TrustBar.module.css";

export const TrustBar = () => {
  return (
    <section className={styles.trustBar}>
      <Container className={styles.trustGrid}>
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
