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

export function buildSeoMetadata({
  seo,
  title,
  description,
  canonical,
  image,
  siteName,
  type = "website",
}: BuildSeoMetadataOptions): Metadata {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description;
  const ogTitle = seo?.openGraphTitle || metaTitle;
  const ogDescription = seo?.openGraphDescription || metaDescription;
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
