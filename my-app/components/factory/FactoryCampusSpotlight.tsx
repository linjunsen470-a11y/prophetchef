import Image from "next/image";
import { Container } from "@/components/common/Container";
import { factoryCampusImage } from "@/data/factory-gallery";

export function FactoryCampusSpotlight() {
  return (
    <section className="section bg-[var(--light)]">
      <Container className="section-heading">
        <span className="eyebrow">Factory Campus</span>
        <h2>Office-to-Workshop Infrastructure for Export Production</h2>
        <p>
          A connected factory campus keeps project communication, production scheduling and quality control aligned
          for distributor and OEM orders.
        </p>
      </Container>
      <Container>
        <figure className="m-0 overflow-hidden rounded-[12px] border border-[color:var(--border)] bg-white shadow-[var(--shadow)]">
          <div className="relative aspect-[21/9] max-[760px]:aspect-[16/10] w-full">
            <Image
              src={factoryCampusImage.src}
              alt={factoryCampusImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,24,39,0.72)_0%,rgba(9,24,39,0.18)_55%,rgba(9,24,39,0.05)_100%)]" />
            <figcaption className="absolute inset-y-0 left-0 flex max-w-[min(100%,520px)] flex-col justify-end p-6 max-[760px]:p-5 text-white">
              <strong className="text-[clamp(22px,3vw,34px)] font-extrabold leading-[1.12] tracking-[-0.03em]">
                {factoryCampusImage.title}
              </strong>
              {factoryCampusImage.caption && (
                <p className="m-0 mt-3 text-[15px] leading-[1.6] text-white/88">{factoryCampusImage.caption}</p>
              )}
            </figcaption>
          </div>
        </figure>
      </Container>
    </section>
  );
}