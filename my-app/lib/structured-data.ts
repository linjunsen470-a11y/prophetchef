import type { FaqItem, SiteSettings } from "@/sanity/types";
import { getContactInfo, getSiteName, getSiteUrl } from "@/lib/site-settings";

export function organizationJsonLd(settings?: SiteSettings | null) {
  const siteUrl = getSiteUrl(settings);
  const contact = getContactInfo(settings);
  const sameAs = settings?.socialLinks?.map((link) => link.url).filter(Boolean) || [];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.legalName || getSiteName(settings),
    alternateName: settings?.title,
    url: siteUrl,
    logo: settings?.logo?.url,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: contact.email,
      telephone: contact.phone,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
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
