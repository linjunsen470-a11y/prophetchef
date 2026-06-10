import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import { FloatingActions } from "@/components/common/FloatingActions";
import { JsonLd } from "@/components/common/JsonLd";
import { SanityLive } from "@/sanity/client";
import { getSiteSettings } from "@/sanity/queries";
import { getSiteName, getSiteUrl } from "@/lib/site-settings";
import { buildSeoMetadata } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings({ stega: false });
  const seo = settings?.globalSeo;
  const title = seo?.metaTitle || settings?.title || siteConfig.title;
  const description = seo?.metaDescription || settings?.description || siteConfig.description;
  const canonical = seo?.canonicalUrl || getSiteUrl(settings);

  const metadata = buildSeoMetadata({
    seo,
    title,
    description,
    canonical,
    image: seo?.openGraphImage || { url: siteConfig.ogImage, alt: title },
    siteName: getSiteName(settings),
  });

  return {
    ...metadata,
    title: {
      default: title,
      template: `%s | ${getSiteName(settings)}`,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="antialiased">
      <body className="flex flex-col min-h-screen">
        <Header settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
        <FloatingActions settings={settings} />
        <JsonLd data={organizationJsonLd(settings)} />
        <SanityLive />
        {isDraftModeEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
