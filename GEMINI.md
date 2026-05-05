# Prophetchef Project Overview

Prophetchef is a B2B commercial kitchen equipment manufacturer's web platform. The project follows a headless architecture, separating the frontend from the content management system.

## Project Structure

- `my-app/`: The primary Next.js frontend application.
- `studio-prophetchef/`: Sanity Studio CMS for managing products, news, and other content.
- `html_files/`: Legacy static HTML files (Reference only; not for production use).

## Core Technologies

### Frontend (`my-app`)
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, CSS Modules
- **Content:** Sanity via `next-sanity` (includes Visual Editing and Sanity Live)
- **Icons:** Lucide React

### CMS (`studio-prophetchef`)
- **Tool:** Sanity Studio v5
- **Plugins:** Structure Tool, Presentation Tool (Visual Editing), Vision Tool
- **Styling:** Styled Components (internal to Sanity)

## Building and Running

### Prerequisites
- Node.js (v20+ recommended)
- `pnpm` (Package manager used across the project)

### Frontend Development
```bash
cd my-app
pnpm install
pnpm dev    # Starts development server at http://localhost:3000
pnpm build  # Production build
pnpm lint   # Run ESLint
```

### CMS Development
```bash
cd studio-prophetchef
pnpm install
pnpm dev    # Starts Sanity Studio at http://localhost:3333
pnpm build  # Builds the Studio for deployment
```

## Development Conventions

### Styling & UI
- **Tailwind 4:** Preferred for most UI components.
- **CSS Modules:** Used for complex or highly scoped component styles.
- **globals.css:** Maintain with care. Do not add page-specific styles here. Move uncertain legacy styles to `styles/legacy.css`.
- **Design Language:** Preserve the industrial blue and orange B2B aesthetic.
- **Server Components:** Use Server Components by default. Only use `'use client'` for interactive components.

### Content & Data
- **Sanity Schema:** Located in `studio-prophetchef/schemaTypes`.
- **Queries:** GROQ queries are managed within `my-app/sanity/queries.ts`.
- **Visual Editing:** Enabled via Sanity's Presentation Tool, allowing real-time content previews.

### SEO & Performance
- **Image Optimization:** Prioritize using `next/image` over raw `<img>` tags.
- **Metadata:** Centrally managed in `my-app/data/site.ts` and utilized in `layout.tsx`.

## Key Files & Directories

- `my-app/app/`: Next.js App Router routes and layouts.
- `my-app/components/`: Reusable UI components organized by feature.
- `my-app/sanity/`: Sanity client configuration, queries, and generated types.
- `studio-prophetchef/schemaTypes/`: CMS schema definitions.
- `audit.md`: Current project status and high-priority risks.
- `AGENTS.MD`: Specific instructions for AI agents working in this repository.
