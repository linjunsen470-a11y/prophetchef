import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { groupSitemapEntries } from "@/lib/sitemap";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Browse all public pages on ProphetChef.",
  alternates: {
    canonical: `${siteConfig.url}/sitemap`,
  },
};

const groupTitles = {
  Core: "Main Pages",
  Products: "Products",
  News: "News",
};

export default async function SitemapPage() {
  const groupedEntries = await groupSitemapEntries();

  return (
    <section className="py-24 max-md:py-16 bg-[linear-gradient(180deg,#f8fafc_0,#fff_260px)]">
      <Container className="max-w-[880px]">
        <span className="inline-flex items-center gap-2 uppercase tracking-[0.12em] text-[12px] font-black text-[color:var(--orange)]">Sitemap</span>
        <h1 className="mt-3 mb-4 text-[color:var(--text)] text-[clamp(38px,5vw,58px)] font-extrabold leading-[1.06] tracking-[-0.045em]">Sitemap</h1>
        <p className="m-0 text-[color:var(--muted)] text-[18px] leading-[1.7]">All public pages are generated from the same route registry used by the XML sitemap.</p>

        <div className="mt-[42px] p-[34px] max-md:p-6 border border-[color:var(--border)] rounded-[10px] bg-white shadow-[0_14px_34px_rgba(9,24,39,0.08)]">
          {Object.entries(groupedEntries).map(([group, entries]) => (
            <section key={group} className="mt-[34px] first:mt-0">
              <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">{groupTitles[group as keyof typeof groupTitles]}</h2>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                {entries.map((entry) => (
                  <Link
                    key={entry.path}
                    href={entry.path}
                    className="block p-[13px_15px] border border-[color:var(--border)] rounded-[12px] bg-[#f8fafc] text-[color:var(--blue)] leading-[1.35] hover:border-[#fed7aa] hover:bg-[#fff7ed] hover:text-[color:var(--orange-dark)] transition-colors"
                  >
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
