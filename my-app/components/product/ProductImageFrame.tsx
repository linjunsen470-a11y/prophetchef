import Image from "next/image";
import { isSanityImageUrl } from "@/lib/images";
import styles from "./ProductImageFrame.module.css";

type ProductImageRatio = "4x3" | "1x1" | "thumb";

interface ProductImageFrameProps {
  src: string;
  alt: string;
  sizes: string;
  ratio?: ProductImageRatio;
  padded?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

const ratioClassMap: Record<ProductImageRatio, string> = {
  "4x3": styles.ratio4x3,
  "1x1": styles.ratio1x1,
  thumb: styles.ratioThumb,
};

export function ProductImageFrame({
  src,
  alt,
  sizes,
  ratio = "1x1",
  padded = true,
  priority = false,
  className = "",
  imageClassName = "",
}: ProductImageFrameProps) {
  return (
    <div
      className={`${styles.frame} ${ratioClassMap[ratio]} ${padded ? styles.padded : ""} ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isSanityImageUrl(src)}
        className={`${styles.frameFill} ${styles.image} ${imageClassName}`.trim()}
      />
    </div>
  );
}
