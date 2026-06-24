# Agent Instructions For `my-app`

This directory is the active Next.js frontend. Follow the root `../AGENTS.MD` first, then these local rules.

## Priorities

1. Preserve the current visual design unless the task explicitly asks for a redesign.
2. Keep frontend work separate from Sanity Studio work.
3. Verify visual changes in a browser, not only with `curl` or build output.
4. Do not bulk-delete `app/globals.css`.

## Frontend Rules

- Use App Router conventions under `app/`.
- Prefer Server Components for static marketing sections.
- Use Client Components only for stateful browser behavior.
- Keep shared components stable:
  - `components/layout/Header.tsx`
  - `components/layout/Footer.tsx`
  - `components/common/Button.tsx`
  - `components/common/PageHero.tsx`
  - `components/common/CTASection.tsx`
  - `components/product/ProductCard.tsx`
- Avoid large rewrites when a scoped fix is enough.
- Keep audit fixes focused; avoid formatting entire files unless formatting is part of the changed lines.
- Use `lib/urls.ts` for CMS-managed or untrusted links instead of hand-rolling protocol checks.

## SEO Rules

- Route metadata should go through `lib/seo.ts` unless a page has a very specific reason not to.
- Use `lib/seo-content.ts` for generated product, category, and application descriptions so short CMS fields do not become thin metadata.
- Keep canonical URL patterns aligned with route patterns:
  - `/products/[slug]`
  - `/products/category/[slug]`
  - `/applications/[slug]`
  - `/news/[slug]`
- When adding or renaming public routes, update `lib/sitemap.ts`, `app/sitemap/page.tsx`, and any relevant internal links.
- Product detail JSON-LD should retain Product, Offer, BreadcrumbList, and FAQPage when FAQs exist.
- Category pages should retain ItemList and BreadcrumbList JSON-LD.
- Application detail pages should retain Service and BreadcrumbList JSON-LD.
- Use `stegaClean` before putting stega-enabled strings into routes, canonical URLs, or structured data.

## Styling Rules

- `app/globals.css` is intentionally still broad.
- If migrating styles to Tailwind, do it incrementally and validate each affected route.
- Do not remove a global selector until all usages are replaced and verified.
- Header, hero, CTA, card grids, and footer require screenshot checks after style changes.

## Sanity Data

- Treat Sanity-managed URLs, dates, image fields, arrays, and labels as optional/untrusted in frontend rendering.
- Render placeholders for missing image URLs instead of passing empty strings to `next/image`.
- Frontend Sanity helpers live in `sanity/`.
- Studio schemas live outside this app in `../studio-prophetchef`.
- Do not edit Studio schemas from this directory unless the task explicitly covers CMS schema work.
- If category or application schema fields change, update frontend queries, types, detail routes, and sitemap entries together.

## Verification

Run:

```bash
pnpm run lint
pnpm run build
```

For browser checks, use:

```text
/
/products
/products/[slug]
/products/category/[slug]
/applications
/applications/[slug]
/news
/contact
```

Also check representative detail routes when product, category, application, or news data changes. If `pnpm run build` fails while fetching Sanity during prerendering, capture the exact DNS/network error and note whether compilation and TypeScript completed first.
