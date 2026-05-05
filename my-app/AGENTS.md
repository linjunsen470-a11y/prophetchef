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

## Styling Rules

- `app/globals.css` is intentionally still broad.
- If migrating styles to Tailwind, do it incrementally and validate each affected route.
- Do not remove a global selector until all usages are replaced and verified.
- Header, hero, CTA, card grids, and footer require screenshot checks after style changes.

## Sanity Data

- Frontend Sanity helpers live in `sanity/`.
- Studio schemas live outside this app in `../studio-prophetchef`.
- Do not edit Studio schemas from this directory unless the task explicitly covers CMS schema work.

## Verification

Run:

```bash
npm run lint
npm run build
```

For browser checks, use:

```text
/
/products
/news
/contact
```

Also check representative detail routes when product or news data changes.
