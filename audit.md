# Project Audit Notes

This file tracks the main production risks found during review. It is not a changelog.

## Current Status

- The production app is `my-app`, a Next.js App Router site for a B2B commercial kitchen equipment manufacturer.
- The CMS workspace is `studio-prophetchef`, a Sanity Studio used to manage products and news content.
- `html_files` is a legacy static HTML reference and should not be treated as the source of truth for the app.
- Sanity integration is in progress through `my-app/sanity/*` and `studio-prophetchef/schemaTypes/*`.

## High Priority Risks

1. Inquiry API is still not production-ready.
   - `my-app/app/api/inquiry/route.ts` accepts arbitrary JSON and returns success.
   - Before launch it needs validation, rate limiting, spam protection, and actual lead delivery or persistence.
   - Do not log full PII payloads in production.

2. Data availability affects public pages.
   - Product and news pages now depend on Sanity-backed data paths.
   - Empty Sanity datasets can create empty catalog/news states.
   - Keep local fallback behavior explicit where needed, and verify empty states in the browser.

3. Global CSS remains large and fragile.
   - `my-app/app/globals.css` still carries most visual styling.
   - Do not shrink it by bulk deletion. Many pages rely on these classes.
   - Any CSS migration must be page-by-page with browser screenshots for desktop and mobile.

## Medium Priority Risks

1. Product/category routing must stay aligned.
   - Links may use hashes, query strings, and Sanity slugs.
   - Product filters should handle URL state consistently if public links are expected to pre-filter.

2. SEO metadata needs continued cleanup.
   - Product and news detail pages should expose specific title, description, canonical URL, OG image, and structured data where possible.
   - Sitemap generation should avoid reporting every page as changed on every build unless content actually changed.

3. Image optimization is incomplete.
   - Many components still use raw `<img>`.
   - Moving to `next/image` requires configuring remote image sources for Sanity CDN and any retained external images.

## Verification Baseline

Run these before committing production-facing changes:

```bash
cd my-app
npm run lint
npm run build
```

For visual work, also inspect at least:

- `/`
- `/products`
- `/products/[slug]`
- `/news`
- `/news/[slug]`
- `/contact`

Use a real browser or MCP browser tooling. HTTP status alone is not enough for frontend verification.
