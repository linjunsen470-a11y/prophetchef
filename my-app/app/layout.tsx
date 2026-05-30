import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import { FloatingActions } from "@/components/common/FloatingActions";
import { SanityLive } from "@/sanity/client";
import { getSiteSettings } from "@/sanity/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings({ stega: false });
  const seo = settings?.globalSeo;
  const title = seo?.metaTitle || settings?.title || siteConfig.title;
  const description = seo?.metaDescription || settings?.description || siteConfig.description;
  const ogImage = seo?.openGraphImage?.url || siteConfig.ogImage;
  const canonical = seo?.canonicalUrl || siteConfig.url;

  return {
    title: {
      default: title,
      template: `%s | ${settings?.title || siteConfig.name}`,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings?.title || siteConfig.name,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: seo?.openGraphImage?.alt || title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex flex-col min-h-screen">
        <Header settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
        <FloatingActions />
        <SanityLive />
        {isDraftModeEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
