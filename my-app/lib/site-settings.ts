import { siteConfig } from "@/data/site";
import { normalizeSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/sanity/types";

export function getSiteName(settings?: SiteSettings | null) {
  return settings?.title || siteConfig.name;
}

export function getSiteUrl(settings?: SiteSettings | null) {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || settings?.siteUrl || siteConfig.url);
}

export function getContactInfo(settings?: SiteSettings | null) {
  return {
    email: settings?.contactInfo?.email || siteConfig.email,
    phone: settings?.contactInfo?.phone || siteConfig.phone,
    whatsapp: settings?.contactInfo?.whatsapp || siteConfig.whatsapp,
    address: settings?.contactInfo?.address || siteConfig.address,
  };
}

export function whatsappUrl(whatsapp: string, message?: string) {
  const text = message || "Hello ProphetChef, I would like to request a quote.";
  const normalizedPhone = whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
}
