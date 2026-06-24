import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import type { SanityImage } from "@/sanity/types";

const builder = createImageUrlBuilder({ projectId, dataset });

export interface SanityImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
}

export function isSanityImageUrl(src: string | null | undefined) {
  return typeof src === "string" && src.startsWith("https://cdn.sanity.io/images/");
}

export function isOptimizedSanityImageUrl(src: string | null | undefined) {
  return typeof src === "string" && isSanityImageUrl(src) && src.includes("?");
}

export function shouldSkipNextOptimization(src: string | null | undefined) {
  if (typeof src !== "string" || !src) return false;
  if (src.startsWith("/images/")) return true;
  return isSanityImageUrl(src) && !isOptimizedSanityImageUrl(src);
}

export function buildSanityImageUrl(
  image: SanityImage | null | undefined,
  options: SanityImageOptions = {},
) {
  if (!image) return undefined;

  const source = image.assetRef
    ? { asset: { _ref: image.assetRef } }
    : image.url
      ? image
      : null;

  if (!source) {
    return image.url;
  }

  let imageBuilder = builder.image(source);

  if (options.width) imageBuilder = imageBuilder.width(options.width);
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);

  return imageBuilder.auto("format").url();
}

export function resolveSanityImage(
  image: SanityImage | null | undefined,
  options: SanityImageOptions = {},
) {
  if (!image) return undefined;
  return buildSanityImageUrl(image, options) ?? image.url;
}