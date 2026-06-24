import type { Metadata } from "next";
import type { SeoData } from "@/sanity/types";

interface BuildSeoMetadataOptions {
  seo?: SeoData;
  title: string;
  description: string;
  canonical: string;
  image?: {
    url?: string;
    alt?: string;
  };
  siteName?: string;
  type?: "website" | "article";
}

const MIN_USEFUL_DESCRIPTION_LENGTH = 70;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripTrailingBrand(title: string, siteName?: string) {
  if (!siteName) return title;

  const normalizedSiteName = siteName.trim();
  if (!normalizedSiteName) return title;

  return title
    .replace(new RegExp(`\\s*[|\\-:]\\s*${escapeRegExp(normalizedSiteName)}\\s*$`, "i"), "")
    .trim();
}

function resolveDescription(primary: string | undefined, fallback: string) {
  const trimmedPrimary = primary?.trim();
  if (trimmedPrimary && trimmedPrimary.length >= MIN_USEFUL_DESCRIPTION_LENGTH) {
    return trimmedPrimary;
  }
  return fallback;
}

export function buildSeoMetadata({
  seo,
  title,
  description,
  canonical,
  image,
  siteName,
  type = "website",
}: BuildSeoMetadataOptions): Metadata {
  const metaTitle = stripTrailingBrand(seo?.metaTitle || title, siteName);
  const metaDescription = resolveDescription(seo?.metaDescription, description);
  const ogTitle = seo?.openGraphTitle || (siteName ? `${metaTitle} | ${siteName}` : metaTitle);
  const ogDescription = resolveDescription(seo?.openGraphDescription, metaDescription);
  const ogImage = seo?.openGraphImage || image;
  const resolvedCanonical = seo?.canonicalUrl || canonical;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: resolvedCanonical,
    },
    robots: seo?.noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: resolvedCanonical,
      siteName,
      images: ogImage?.url
        ? [
            {
              url: ogImage.url,
              alt: ogImage.alt || ogTitle,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage?.url ? [ogImage.url] : [],
    },
  };
}

