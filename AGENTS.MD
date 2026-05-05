# Repository Agent Instructions

This repository contains three related areas:

- `my-app`: active Next.js frontend
- `studio-prophetchef`: Sanity Studio CMS
- `html_files`: legacy static website reference

## General Rules

- Preserve user changes. Do not revert unrelated work.
- Keep frontend, CMS schema, and legacy reference work separate.
- Make scoped changes that match the existing architecture.
- Run verification commands relevant to the area you changed.
- For UI work, verify in a browser with screenshots or MCP browser tools.

## Active App

The production-facing frontend is `my-app`.

Use:

```bash
cd my-app
npm run dev
npm run lint
npm run build
```

The app uses Next.js App Router, TypeScript, Tailwind CSS 4, and Sanity content helpers.

Important frontend guidance:

- Do not bulk-delete `app/globals.css`.
- Do not convert shared layout components to long Tailwind class strings without browser verification.
- Preserve the industrial blue/orange B2B design language.
- Keep Server Components by default; use Client Components only for real browser interactivity.

## Sanity Studio

The CMS Studio is `studio-prophetchef`.

Use:

```bash
cd studio-prophetchef
pnpm dev
pnpm build
```

Schema changes must be coordinated with frontend queries and types.

## Legacy Static Files

`html_files` is reference-only.

Do not treat it as production source. Use it for visual/content comparison when needed.

## Verification Matrix

For frontend changes:

- `npm run lint`
- `npm run build`
- browser check `/`, `/products`, `/news`, `/contact`

For Studio changes:

- `pnpm build`
- inspect schema registration in `schemaTypes/index.ts`

For content/query changes:

- check empty states
- check populated states when data is available
- verify sitemap and robots if routes changed

## Commit Hygiene

- Do not commit transient screenshots, browser traces, build output, or `node_modules` unless explicitly requested.
- Keep commit messages factual and scoped.
- If a request says "commit all", confirm whether generated artifacts should be included when they are present.
