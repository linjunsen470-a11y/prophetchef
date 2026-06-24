# ProphetChef Sanity Studio

This directory contains the Sanity Studio for managing ProphetChef website content.

The production-facing frontend app is in `../my-app`.

## Stack

- Sanity Studio 5
- React 19
- TypeScript
- Sanity Vision plugin

## Development

Install dependencies:

```bash
pnpm install
```

Start Studio:

```bash
pnpm dev
```

Build Studio:

```bash
pnpm build
```

Deploy Studio:

```bash
pnpm deploy
```

## Content Schemas

Schema files live in:

```text
schemaTypes/
  application.ts
  category.ts
  certificate.ts
  homePage.ts
  newsArticle.ts
  newsCategory.ts
  pageSettings.ts
  product.ts
  seo.ts
  sharedObjects.ts
  siteSettings.ts
  slugValidation.ts
  index.ts
```

Current content areas:

- site settings, navigation, footer, and global CTA
- page settings for core marketing pages
- home page sections
- products and product categories
- application solution pages
- certificates
- news articles and news categories
- reusable SEO fields and shared content objects

## Frontend Integration

The frontend reads Sanity content through `../my-app/sanity/*`.

When changing schemas:

1. Update Studio schema files.
2. Update frontend query fields in `../my-app/sanity/queries.ts`.
3. Update frontend TypeScript types in `../my-app/sanity/types.ts`.
4. Update route metadata, sitemap logic, and structured data when route-facing SEO fields change.
5. Verify affected pages in the browser.

Route-facing document types currently include:

```text
product -> /products/[slug]
category -> /products/category/[slug]
application -> /applications/[slug]
newsArticle -> /news/[slug]
```

For these types, keep slug validation, title/description fields, images, and `seo` object behavior compatible with the frontend. Avoid deleting or renaming published slugs without a redirect plan.

## Initial Content Import

The project includes an import script:

```bash
pnpm import:initial
```

Review `scripts/importInitialContent.mjs` before running it against a production dataset.

## Verification

For Studio-only changes:

```bash
pnpm build
```

For schema changes that affect the frontend, also run in `../my-app`:

```bash
pnpm run lint
pnpm run build
```

Then inspect representative frontend routes such as:

```text
/products/[slug]
/products/category/[slug]
/applications/[slug]
/news/[slug]
/sitemap.xml
```

## Safety

- Do not commit generated `dist/` or `node_modules/` changes unless explicitly intended.
- Avoid destructive dataset actions without a backup.
- Keep schema changes backward-compatible when existing content is already published.
- Treat SEO, slug, image, URL, and date fields as production-facing because they feed metadata, structured data, and sitemap output.
