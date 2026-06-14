import Image from "next/image";
import { Container } from "@/components/common/Container";
import { factoryTrustImage } from "@/data/factory-gallery";

export function FactoryTrustStrip() {
  return (
    <section className="section bg-[var(--light)]">
      <Container className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] max-[1080px]:grid-cols-1 gap-10 items-center">
        <div className="relative min-h-[320px] w-full overflow-hidden rounded-[10px] shadow-[var(--shadow)]">
          <Image
            src={factoryTrustImage.src}
            alt={factoryTrustImage.alt}
            fill
            sizes="(max-width: 1080px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="eyebrow">Trusted Manufacturing Partner</span>
          <h2 className="my-2.5 text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.12] tracking-[-0.04em]">
            Built for Distributors, Contractors and Export Buyers
          </h2>
          <p className="m-0 mb-4 text-[17px] leading-[1.65] text-[color:var(--muted)]">
            Our on-site showroom and production workshops support OEM/ODM projects, project quotations and
            long-term supply partnerships across global foodservice markets.
          </p>
          <ul className="list-none p-0 m-0 grid gap-2.5 text-[15px] font-semibold text-[color:var(--blue)]">
            <li>On-site equipment review before placing bulk orders</li>
            <li>Integrated metal processing, assembly and QC under one roof</li>
            <li>Export documentation and after-sales support for importers</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}