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
pnpm run dev
pnpm run lint
pnpm run build
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

- `pnpm run lint`
- `pnpm run build`
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

## Styling Rules (global.css)

Do not add page-specific or component-specific styles to `app/globals.css`.

`globals.css` is reserved for:
- Tailwind imports
- Base styles, CSS variables, design tokens
- html/body/:root styles
- Required third-party overrides

Preferred styling order:
1. Tailwind utility classes in JSX
2. Existing reusable React components
3. New reusable React components
4. CSS Modules for complex scoped styles
5. `globals.css` only when the style is truly global

When refactoring, do not delete uncertain global styles directly. Move them to `styles/legacy.css` and document them.

## Audit And Hardening Guidance

When performing code audits or resilience work:

- Prefer minimal, reviewable fixes over broad formatting-only rewrites.
- Document each audited risk as either fixed, intentionally deferred, or not reproducible.
- Keep security helpers small and shared; for example, link sanitization belongs in a reusable `lib/` helper rather than one-off component logic.
- Treat CMS-provided URLs, labels, image fields, and dates as untrusted or optional unless schema validation is part of the same task.
- Do not mask production configuration problems with silent fallbacks. User-facing forms may return safe messages, but server logs should retain enough non-sensitive context for debugging.
- Avoid logging PII in production logs. Development-only logs must be clearly marked.

## Package Manager

Use `pnpm` for the active Next.js app unless a task explicitly asks for another package manager. Prefer:

```bash
cd my-app
pnpm install
pnpm run lint
pnpm run build
```

The repository may contain older `npm` examples in legacy documentation; update touched docs to `pnpm` when making frontend changes.
