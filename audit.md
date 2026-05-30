# Project Audit Notes

This file tracks the main production risks found during review. It is not a changelog.

## Current Status

- The production app is `my-app`, a Next.js App Router site for a B2B commercial kitchen equipment manufacturer.
- The CMS workspace is `studio-prophetchef`, a Sanity Studio used to manage products and news content.
- `html_files` is a legacy static HTML reference and should not be treated as the source of truth for the app.
- Sanity integration is successfully implemented through `my-app/sanity/*` and `studio-prophetchef/schemaTypes/*`.

## High Priority Risks

1. Inquiry API is still in transition to production-ready.
   - [IN PROGRESS] Resend email-sending integration is being configured with validation and spam protection.
   - [TODO] Ensure rate limiting or cloud-based spam protection (like Turnstile/reCAPTCHA) is enabled on the frontend form.
   - [IMPORTANT] Do not log full PII payloads in production.

2. Data availability affects public pages.
   - Product and news pages depend on Sanity-backed data paths.
   - [COMPLETED] Static fallbacks (e.g. `staticCategories`) are implemented to prevent empty-dataset catalog/news breakages.

3. Global CSS remains large and fragile.
   - `my-app/app/globals.css` still carries most visual styling (over 1300 lines).
   - Do not shrink it by bulk deletion. Many pages rely on these classes.
   - [TODO] Migrate complex component classes to Tailwind v4 or component CSS modules gradually.

## Medium Priority Risks

1. Product/category routing must stay aligned.
   - Product filters should handle URL state consistently if public links are expected to pre-filter.

2. SEO metadata is active.
   - [COMPLETED] Dynamic sitemap, metadata helpers, and robots.ts are configured.

3. Image optimization is complete.
   - [COMPLETED] Custom remote image patterns are configured for Sanity CDN and Unsplash image loading.

## Verification Baseline

Run these before committing production-facing changes:

```bash
cd my-app
pnpm run lint
pnpm run build
```

For visual work, also inspect at least:

- `/`
- `/products`
- `/products/[slug]`
- `/news`
- `/news/[slug]`
- `/contact`

Use a real browser or MCP browser tooling. HTTP status alone is not enough for frontend verification.
