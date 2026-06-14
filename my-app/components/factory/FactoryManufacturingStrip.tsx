import Image from "next/image";
import { Container } from "@/components/common/Container";
import { factoryImageById } from "@/data/factory-gallery";

const manufacturingImages = [
  factoryImageById["workshop-16"],
  factoryImageById["workshop-18"],
  factoryImageById["workshop-19"],
];

export function FactoryManufacturingStrip() {
  return (
    <section className="py-10 border-y border-[color:var(--border)] bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <Container>
        <div className="mb-5">
          <span className="eyebrow">Manufactured In-house</span>
          <h2 className="m-0 mt-2 text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.03em]">
            Factory-Direct Production for Export Buyers
          </h2>
        </div>
        <div className="grid grid-cols-3 max-[760px]:grid-cols-1 gap-4">
          {manufacturingImages.map((image) => (
            <figure
              key={image.id}
              className="m-0 overflow-hidden rounded-[10px] border border-[color:var(--border)] bg-white shadow-[0_8px_20px_rgba(9,24,39,0.05)]"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 33vw" className="object-cover" />
              </div>
              <figcaption className="px-4 py-3 text-[14px] font-extrabold text-[color:var(--blue)]">{image.title}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}