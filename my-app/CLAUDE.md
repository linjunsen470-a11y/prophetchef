# Claude / Agent Notes

See `AGENTS.md` in this directory and `../AGENTS.MD` at the repository root.

## Short Version

- This is the active Next.js frontend.
- Preserve the existing B2B industrial blue/orange design.
- Do not bulk-convert or bulk-delete global CSS.
- Keep Sanity Studio changes in `../studio-prophetchef` unless the task explicitly covers schema work.
- Use `pnpm`, not npm, for frontend commands.
- Run `pnpm run lint` and `pnpm run build` before finalizing meaningful changes.
- Use browser verification for UI changes.
- SEO metadata should use `lib/seo.ts`; generated SEO descriptions live in `lib/seo-content.ts`.
- Keep `/products/category/[slug]`, `/applications/[slug]`, `/sitemap.xml`, and HTML sitemap entries in sync when public routes or Sanity slugs change.
