import { siteConfig } from "@/data/site";
import type { SiteSettings } from "@/sanity/types";

export function getSiteName(settings?: SiteSettings | null) {
  return settings?.title || siteConfig.name;
}

export function getSiteUrl(settings?: SiteSettings | null) {
  return (settings?.siteUrl || siteConfig.url).replace(/\/$/, "");
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
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}
