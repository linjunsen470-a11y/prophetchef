import Image from "next/image";
import { Container } from "@/components/common/Container";
import { factoryTourHighlightImages } from "@/data/factory-gallery";

export function FactoryTourStrip() {
  return (
    <section className="section bg-[var(--light)]">
      <Container className="section-heading">
        <span className="eyebrow">Factory Tour</span>
        <h2>From Our Workshop Floor to Your Kitchen Project</h2>
        <p>
          A quick look at ProphetChef manufacturing, showroom breadth and real installation references for
          global B2B buyers.
        </p>
      </Container>
      <Container className="grid grid-cols-5 max-[1080px]:grid-cols-3 max-[760px]:grid-cols-2 gap-3">
        {factoryTourHighlightImages.map((image) => (
          <figure
            key={image.id}
            className="m-0 overflow-hidden rounded-[8px] border border-[color:var(--border)] bg-white shadow-[0_8px_20px_rgba(9,24,39,0.05)]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={image.src} alt={image.alt} fill sizes="240px" className="object-cover" />
            </div>
            <figcaption className="px-3 py-2.5 text-[13px] font-extrabold leading-[1.3] text-[color:var(--blue)]">
              {image.title}
            </figcaption>
          </figure>
        ))}
      </Container>
    </section>
  );
}