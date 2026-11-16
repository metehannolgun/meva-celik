# Meva Çelik — project rules

Global rules in ~/.claude/CLAUDE.md apply. This file adds project specifics.

## Product
Corporate website for Meva Çelik (steel company). Goal: present the company, its products/services and references, and collect contact / quote requests.
Scope and content details: see `PROJECT_BRIEF.md` (to be written together in the first session).

## Project specifics
- UI language: Turkish (structure content so an English version can be added later, but don't build i18n until asked).
- SEO matters: metadata per page, Open Graph, sitemap, robots, structured data (Organization/LocalBusiness).
- Prefer static rendering; content in typed local files until a CMS/admin is requested.
- Contact/quote form: server-side validation + spam protection; Supabase only if submissions must be stored.
- Images optimized via next/image; real company assets go in /public, never hotlinked.
