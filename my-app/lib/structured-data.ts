import type { FaqItem, SiteSettings } from "@/sanity/types";
import { getContactInfo, getSiteName, getSiteUrl } from "@/lib/site-settings";

function postalAddress(address?: string) {
  if (!address) return undefined;

  return {
    "@type": "PostalAddress",
    streetAddress: address,
    addressLocality: "Dongguan",
    addressRegion: "Guangdong",
    addressCountry: "CN",
  };
}

export function organizationJsonLd(settings?: SiteSettings | null) {
  const siteUrl = getSiteUrl(settings);
  const contact = getContactInfo(settings);
  const sameAs = settings?.socialLinks?.map((link) => link.url).filter(Boolean) || [];
  const name = settings?.legalName || getSiteName(settings);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Manufacturer"],
    name,
    alternateName: settings?.title,
    description: settings?.description,
    url: siteUrl,
    logo: settings?.logo?.url,
    image: settings?.logo?.url,
    email: contact.email,
    telephone: contact.phone,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: contact.email,
      telephone: contact.phone,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    address: postalAddress(contact.address),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs?: FaqItem[]) {
  const validFaqs = faqs?.filter((faq) => faq.question && faq.answer) || [];
  if (validFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}


