# Foundation (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Execution mode for this project:** the developer types the code by hand; Claude explains, reviews and only writes files when asked (see `~/.claude/CLAUDE.md`).

**Goal:** A running Next.js project with the agreed folder structure, design tokens, typed content and the site shell (header, footer, mobile action bar) — the base every page builds on.

**Architecture:** Next.js App Router, statically rendered. Content lives in typed TS files under `src/content`. Visual tokens from mockup v2 live in Tailwind v4 `@theme` in `globals.css`.

**Tech Stack:** Next.js 16.4.x, React, TypeScript strict, Tailwind CSS 4.x, ESLint, npm. Node 24.

**Spec:** `PROJECT_BRIEF.md` · visual reference `.superpowers/brainstorm/1506-1794785303/content/anasayfa-taslak-v2.html`

## Global Constraints

- UI text Turkish; code, comments, identifiers, docs, commits English.
- Static rendering; no database; no CMS.
- Colors: `#1b1f23` anthracite, `#b23a22` primer red (only accent), `#737c86` galvanized grey, `#d9dde1` hairline, `#f1f2f3` surface, `#ffffff`.
- Font: Archivo variable (`wdth` 62–125) via `next/font/google`.
- Raw media stays in `_assets/` (git-ignored); only optimized images in `public/images/`.
- No secrets in source; `.env.example` with placeholders.

## Review Focus

- Mobile 360–390 px: no horizontal scroll; sticky action bar does not cover the footer's last line.
- Keyboard: every header link, menu button and action-bar link reachable with visible focus.
- Turkish characters (İ, ı, ş, ğ, ç) render in Archivo at every weight used.
- `tel:` and WhatsApp links built from one source (`company.ts`), never hard-coded twice.
- Placeholder data is visibly marked until real data replaces it (`isPlaceholder` flag).

---

### Task 1: Scaffold + folder structure (developer)

**Files:** project root, `src/` tree, `.gitignore`, `package.json`

- [ ] Create the app in a temporary subfolder (root already contains CLAUDE.md, `_assets`, etc.), then move it up.
- [ ] Rename `package.json` `name` to `meva-celik`.
- [ ] Add `_assets/`, `.superpowers/`, `.playwright-mcp/` to `.gitignore`.
- [ ] Create the folder skeleton:

```
src/
  app/                 routes (Turkish URLs)
  components/
    layout/            Header, Footer, MobileActionBar
    sections/          page sections (home hero, process, …)
    ui/                small reusable pieces (Button, …)
  content/             typed site data (company, projects, services)
  lib/                 helpers (seo, email, validation)
public/images/         optimized images
```

- [ ] Verify: `npm run dev` → http://localhost:3000 shows the starter page; `npm run lint` passes.
- [ ] Commit: `chore: scaffold Next.js app and folder structure`

### Task 2: Design tokens + font

**Files:** Modify `src/app/globals.css`, `src/app/layout.tsx`

- [ ] `globals.css`: replace starter styles; define the Global Constraints colors in `@theme` as `--color-steel`, `--color-primer`, `--color-primer-dark` (`#93301b`), `--color-galvanized`, `--color-hairline`, `--color-surface`; radii `--radius-media: 20px`.
- [ ] `layout.tsx`: load Archivo with `axes: ['wdth']`, `subsets: ['latin', 'latin-ext']`, expose as CSS variable `--font-archivo` and map it to `--font-sans`; `<html lang="tr">`.
- [ ] Verify: a test heading with `font-stretch: 66%` and weight 850 renders condensed with correct Turkish characters.
- [ ] Commit: `feat: add design tokens and Archivo font`

### Task 3: Typed content

**Files:** Create `src/content/types.ts`, `src/content/company.ts`, `src/content/projects.ts`

**Interfaces (produces):**
- `type StructureType = 'fabrika' | 'depo' | 'cok-katli' | 'celik-cati' | 'diger'`
- `interface Project { slug: string; title: string; city: string; district: string; type: StructureType; steelTons?: number; areaM2?: number; year?: number; summary: string; images: { src: string; alt: string }[]; featured?: boolean; isPlaceholder: boolean }`
- `interface Company { name: string; phone: string; phoneDisplay: string; whatsapp: string; email: string; address: string; mapsUrl: string; hours: string; isPlaceholder: boolean }`
- `export const company: Company`, `export const projects: Project[]`
- `getWhatsAppUrl(message?: string): string` and `getTelUrl(): string` in `src/lib/contact.ts`

- [ ] Fill with the mockup's placeholder data, `isPlaceholder: true`.
- [ ] Verify: `npx tsc --noEmit` passes.
- [ ] Commit: `feat: add typed company and project content`

### Task 4: Site shell

**Files:** Create `src/components/layout/Header.tsx`, `Footer.tsx`, `MobileActionBar.tsx`; modify `src/app/layout.tsx`

**Interfaces (consumes):** `company`, `getTelUrl()`, `getWhatsAppUrl()`

- [ ] Header: logo, nav (Hizmetler, Projeler, Tesisimiz, Hakkımızda, İletişim), "Teklif iste" button; transparent variant over hero turning solid after scroll (client component only for the scroll state); mobile menu button opens an accessible menu.
- [ ] Footer and MobileActionBar (Ara / WhatsApp / Teklif iste, visible < 900 px) as in mockup v2.
- [ ] Verify: Playwright screenshots at 1440 and 390 px; keyboard tab-through; no horizontal scroll at 360 px.
- [ ] Commit: `feat: add header, footer and mobile action bar`

---

Later plans (written when we get there): home page sections · projects list + detail · other pages · quote form + email · SEO (metadata, sitemap, robots, JSON-LD) · deployment.
