import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { productSlugRedirects } from "./data/product-slug-redirects";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const studioOrigin = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

function createSecurityHeaders() {
  return [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io wss://*.api.sanity.io",
      `frame-ancestors 'self' ${studioOrigin}`,
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  ];
}

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 10,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecurityHeaders(),
      },
    ];
  },
  async redirects() {
    const productRedirects = productSlugRedirects.map(({ from, to }) => ({
      source: `/products/${from}`,
      destination: `/products/${to}`,
      permanent: true,
    }));

    return [
      ...productRedirects,
      {
        source: "/category/inspiration",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/applications",
        permanent: true,
      },
      {
        source: "/product-category/cooking",
        destination: "/products?category=cooking",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
