import Image from "next/image";
import type { FactoryImage } from "@/data/factory-gallery";

interface FactoryImageGridProps {
  images: FactoryImage[];
  columns?: 2 | 3 | 4;
  aspect?: "video" | "square";
  showCaption?: boolean;
}

const columnClasses: Record<NonNullable<FactoryImageGridProps["columns"]>, string> = {
  2: "grid-cols-2 max-[760px]:grid-cols-1",
  3: "grid-cols-3 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1",
  4: "grid-cols-4 max-[1080px]:grid-cols-2 max-[760px]:grid-cols-1",
};

const aspectClasses: Record<NonNullable<FactoryImageGridProps["aspect"]>, string> = {
  video: "aspect-[4/3]",
  square: "aspect-square",
};

export function FactoryImageGrid({
  images,
  columns = 3,
  aspect = "video",
  showCaption = true,
}: FactoryImageGridProps) {
  return (
    <div className={`grid ${columnClasses[columns]} gap-5`}>
      {images.map((image) => (
        <figure
          key={image.id}
          className="m-0 overflow-hidden rounded-[10px] border border-[color:var(--border)] bg-white shadow-[0_10px_26px_rgba(9,24,39,0.05)]"
        >
          <div className={`relative w-full ${aspectClasses[aspect]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          {showCaption && (
            <figcaption className="px-4 py-3.5">
              <strong className="block text-[15px] font-extrabold text-[color:var(--text)] leading-[1.3]">
                {image.title}
              </strong>
              {image.caption && (
                <p className="m-0 mt-1.5 text-[14px] leading-[1.55] text-[color:var(--muted)]">{image.caption}</p>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}