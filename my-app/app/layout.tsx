import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import Script from "next/script";
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
    metadataBase: new URL(getSiteUrl(settings)),
    title: {
      default: title,
      template: `%s | ${getSiteName(settings)}`,
    },
    icons: {
      icon: "/favicon.ico",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const shouldRenderSanityLive = isDraftModeEnabled && process.env.NODE_ENV !== "development";
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="antialiased">
      <body className="flex flex-col min-h-screen">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
        <FloatingActions settings={settings} />
        <JsonLd data={organizationJsonLd(settings)} />
        {isDraftModeEnabled && (
          <>
            {shouldRenderSanityLive && <SanityLive />}
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
