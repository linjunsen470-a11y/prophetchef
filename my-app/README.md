# ProKitchenTech Frontend

This is the active Next.js frontend for the ProKitchenTech commercial kitchen equipment website.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity content access through `next-sanity`
- Lucide React icons

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If another Next.js server is already using port 3000, use another port:

```bash
npm run dev -- -p 3005
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
app/
  page.tsx
  products/
  news/
  contact/
  sitemap.ts
  robots.ts
components/
  blog/
  common/
  contact/
  home/
  layout/
  product/
data/
  static fallback/site data
lib/
  sitemap helpers
sanity/
  client, queries, env, frontend types
```

## Environment

Sanity connection values are read in `sanity/env.ts`. Set the required values in `.env.local` for local development.

Typical variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
```

## Styling

`app/globals.css` currently contains most of the site visual system. It includes page-level styles, shared card styles, responsive behavior, and legacy class names.

Do not bulk-delete global CSS. If reducing it:

- migrate one component/page group at a time
- preserve visual parity
- verify with browser screenshots
- keep shared component APIs stable

## Verification

Before committing frontend changes:

```bash
npm run lint
npm run build
```

For layout or styling changes, inspect these routes in a real browser:

- `/`
- `/products`
- `/products/[slug]`
- `/news`
- `/news/[slug]`
- `/contact`

Known lint warnings currently include raw `<img>` usage and a few unused variables. Treat new warnings separately from existing baseline warnings.
