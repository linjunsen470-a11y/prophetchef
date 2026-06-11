# ProphetChef Frontend

This directory contains the active Next.js frontend for the ProphetChef commercial kitchen equipment website. It renders the public marketing site, product catalog, news pages, contact flow, sitemap, and Sanity-powered content sections.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity content access through `next-sanity`
- Lucide React icons
- pnpm workspace package management

## Development

Install dependencies from this directory:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

Open:

```text
http://localhost:3000
```

If another Next.js server is already using port 3000, use another port:

```bash
pnpm run dev -- -p 3005
```

For a clean development restart that stops common stale Next.js processes and removes local build cache, use:

```bash
pnpm run dev:clean
```

## Scripts

```bash
pnpm run dev
pnpm run dev:clean
pnpm run lint
pnpm run build
pnpm run start
```

## Project Structure

```text
app/
  api/                 Route handlers such as the inquiry endpoint
  products/            Product listing and detail routes
  news/                News listing and detail routes
  contact/             Contact page
  sitemap.ts           Metadata sitemap route
  robots.ts            Robots metadata route
components/
  blog/                News cards and body rendering
  common/              Shared UI primitives and SEO helpers
  contact/             Contact form client component
  home/                Home page sections
  layout/              Header and footer
  product/             Product cards, gallery, and inquiry form
data/                  Static fallback/site data
lib/                   SEO, sitemap, URL, image, and site-setting helpers
sanity/                Sanity client, queries, env, and frontend types
styles/                Legacy/global style support
```

## Environment

Sanity connection values are read in `sanity/env.ts`. Set the required values in `.env.local` for local development.

Typical variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_STUDIO_URL=
SANITY_API_READ_TOKEN=
```

Inquiry email delivery uses Resend. Without a real API key, the route runs in sandbox mode after validating payloads.

```text
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
```

## Sanity Content Assumptions

Frontend code should treat Sanity fields as optional unless the component has an explicit fallback. In particular:

- Image fields may be missing a URL; render placeholders instead of passing an empty `src` to `next/image`.
- Slugs, category names, and dates should be cleaned or validated before use in routes, metadata, or structured data.
- Product tags, gallery arrays, FAQ arrays, and page settings should be guarded with safe defaults.
- Studio schema changes live outside this app in `../studio-prophetchef` and should be coordinated with query/type updates.

## Security And Robustness Notes

- Use `lib/urls.ts` when rendering CMS-managed or otherwise untrusted `href` values.
- Shared buttons normalize unsafe links and add safe `rel` values for new tabs.
- Contact and product inquiry forms post JSON to `app/api/inquiry/route.ts`; keep request-size limits, honeypot checks, rate limiting, and PII-safe logging intact.
- Normalize WhatsApp phone numbers through `whatsappUrl()` in `lib/site-settings.ts` rather than building `wa.me` links inline.

## Styling

`app/globals.css` contains global design tokens, base styles, and legacy selectors. Do not bulk-delete it.

When reducing or migrating styles:

- migrate one component/page group at a time
- prefer existing reusable components before adding new global CSS
- preserve visual parity with the industrial blue/orange B2B design language
- verify with browser screenshots for visible layout changes
- keep shared component APIs stable

## Verification

Before committing frontend changes:

```bash
pnpm run lint
pnpm run build
```

For layout or styling changes, inspect these routes in a real browser:

- `/`
- `/products`
- `/products/[slug]`
- `/news`
- `/news/[slug]`
- `/contact`

`pnpm run build` fetches Sanity data during prerendering. If the environment cannot resolve or reach the Sanity CDN, the build can fail during page-data collection even after bundling and TypeScript pass. Record the exact network error in the PR/testing notes rather than treating it as a code failure.
