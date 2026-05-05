import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { groupSitemapEntries } from "@/lib/sitemap";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all public pages on ProKitchenTech.",
};

const groupTitles = {
  Core: "Main Pages",
  Products: "Products",
  News: "News",
};

export default function SitemapPage() {
  const groupedEntries = groupSitemapEntries();

  return (
    <section className="legal-page">
      <Container className="legal-container">
        <span className="eyebrow">Sitemap</span>
        <h1>Sitemap</h1>
        <p className="legal-lead">All public pages are generated from the same route registry used by the XML sitemap.</p>

        <div className="legal-content sitemap-content">
          {Object.entries(groupedEntries).map(([group, entries]) => (
            <section key={group}>
              <h2>{groupTitles[group as keyof typeof groupTitles]}</h2>
              <div className="sitemap-link-grid">
                {entries.map((entry) => (
                  <Link key={entry.path} href={entry.path}>
                    {entry.title}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
