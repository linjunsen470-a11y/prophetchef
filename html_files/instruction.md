# Static-To-Next Migration Instructions

The files in `html_files` represent the original static website. Use them only as reference when improving the Next.js implementation.

## Recommended Migration Approach

1. Preserve the existing B2B industrial visual style.
2. Move repeated HTML patterns into React components.
3. Keep display-only components as Server Components by default.
4. Use Client Components only for browser state and interactions:
   - mobile menu
   - product filtering
   - product gallery thumbnails
   - form submit states
   - back-to-top button
   - category tabs
5. Move structured content into typed data or Sanity, not hardcoded page markup.

## Current Source Of Truth

- Frontend app: `../my-app`
- Sanity Studio: `../studio-prophetchef`
- Legacy static reference: `../html_files`

## Styling Guidance

The current Next.js app still relies heavily on `app/globals.css`. Do not remove large parts of global CSS without verifying every affected page in a browser.

When reducing CSS:

- migrate one page or component group at a time
- keep visual parity with screenshots
- check desktop and mobile
- run lint/build after each meaningful step

## Acceptance Criteria For Visual Changes

- Header spacing and active states match the existing design.
- Hero sections keep readable contrast and correct button styles.
- Product cards and news cards preserve image ratio, hover states, and tag styles.
- Footer remains organized on desktop and stacked cleanly on mobile.
- Floating WhatsApp and back-to-top controls do not cover critical content.
