# ProKitchenTech Sanity Studio

This directory contains the Sanity Studio for managing ProKitchenTech content.

The frontend app is in `../my-app`.

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
  newsArticle.ts
  product.ts
  index.ts
```

Current content areas:

- news articles
- products

## Initial Content Import

The project includes an import script:

```bash
pnpm import:initial
```

Review `scripts/importInitialContent.mjs` before running it against a production dataset.

## Frontend Integration

The frontend reads Sanity content through `../my-app/sanity/*`.

When changing schemas:

1. Update Studio schema files.
2. Update frontend query fields in `my-app/sanity/queries.ts`.
3. Update frontend TypeScript types in `my-app/sanity/types.ts`.
4. Verify affected pages in the browser.

## Safety

- Do not commit generated `dist/` or `node_modules/` changes unless explicitly intended.
- Avoid destructive dataset actions without a backup.
- Keep schema changes backward-compatible when existing content is already published.
