# Meva Çelik — Project Brief

Status: draft for review · 2026-11-16

## 1. Intent

Meva Çelik designs, fabricates (own workshop) and erects steel structures: factory buildings, warehouses, multi-storey steel buildings, steel roofs. The website must make a prospective client (factory owner, investor, contractor) think "they have actually built this, at this scale" within seconds, and make it effortless to ask for a quote — mostly from a phone.

Success = qualified quote requests and calls/WhatsApp messages from the site.

## 2. Goals, non-goals, anti-goals

**Goals**
- Present real projects with concrete data (location, tonnage, m², year, structure type).
- Show the one-team process: design → own-workshop fabrication → on-site erection.
- Quote request in under a minute on mobile; call / WhatsApp always one tap away.
- Strong local SEO (Kocaeli / Marmara region, "çelik konstrüksiyon", "çelik fabrika binası", etc.).
- Fast: static rendering, optimized images, good Lighthouse scores.

**Non-goals (for now)**
- CMS / admin panel (content lives in typed local files).
- Storing form submissions (email only — decided 2026-11-16).
- English version (structure content so it can be added; no i18n yet).
- Blog / news.

**Anti-goals (would make it a failure even if it works)**
- Stock photos or invented numbers going live. Every figure must come from the company.
- Looking like a WordPress template (sliders, icon boxes, cluttered top bar) — the competitors' default.
- Slow mobile load because of unoptimized photos/video.

## 3. Competitor notes (2026-11-16)

- Ada Gürsoy (Sakarya): most polished; dark navy, stat cards, logo marquee.
- Betonart (Gebze): dark + mustard, technical-drawing grid, "180+ projects".
- AS-GER, Şahi Çelik, Başkan Çelik Yapı: dated WP templates, stock imagery.
- Çimtaş: large corporate, classic layout, strong aerial facility photo.
- Common gap: no per-project data, stock photos, weak mobile quote flow → our edge.

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| **Next.js (App Router) static site, content in typed TS files** | Full design control, fast, great SEO; content edits need a developer until a CMS is added | **Chosen** (project default, matches "prefer static, typed local content") |
| WordPress + theme | Client can edit content; looks like competitors, slower, plugin maintenance | Rejected |
| Next.js + headless CMS from day one | Client self-editing; extra setup and cost before content even exists | Deferred — revisit once content volume is known |

## 5. Visual direction (approved 2026-11-16)

Reference mockup: `.superpowers/brainstorm/1506-1794785303/content/anasayfa-taslak-v2.html`

- Full-bleed photo hero; condensed headline bottom-left; header transparent over hero, white after scroll.
- Signature element: thin dimension lines + elevation mark drawn on the real project photo, animated once on load (respects reduced motion). Nothing else animates on its own.
- Type: Archivo (variable; condensed 850 for headlines, regular width for body).
- Colors: anthracite `#1b1f23`, primer red `#b23a22` (single accent), galvanized grey `#737c86`, hairline `#d9dde1`, surface `#f1f2f3`, white.
- Pill buttons, 20px radius on media, generous spacing.
- Mobile: sticky bottom bar — Ara / WhatsApp / Teklif iste.

## 6. Sitemap

| Route | Content |
|---|---|
| `/` | Hero, intro + key facts, 3-step process, recent projects (horizontal cards), facility, client logos, quote form |
| `/hizmetler` | Design, fabrication, erection (+ roof/façade cladding if offered) |
| `/projeler` | All projects, filter by structure type |
| `/projeler/[slug]` | Gallery, location, tonnage, m², year, scope; statically generated |
| `/tesisimiz` | Workshop, equipment, capacity, certificates (may merge into Hakkımızda) |
| `/hakkimizda` | Company story, team |
| `/iletisim` | Quote form, map, phone, WhatsApp, address, hours |
| `/kvkk` | Privacy notice (KVKK aydınlatma metni) |

## 7. Technical decisions

- Next.js (App Router) + TypeScript strict + Tailwind CSS, npm.
- Static rendering everywhere; project pages via `generateStaticParams`.
- Content: typed files (e.g. `projects.ts`, `company.ts`), Turkish strings kept out of components where practical so an English version can be added later.
- Images: originals stay in `_assets/` (not deployed); optimized versions in `/public`, rendered with `next/image`.
- Video (if used): short muted loop ≤ ~3 MB MP4 with poster; long videos embedded from YouTube.
- Quote form: Server Action → server-side validation (Zod) → email. No storage. Email sending sits behind a single `sendQuoteEmail()` function so the transport can be chosen later: SMTP of the company mailbox from the purchased hosting (e.g. via Nodemailer) or a transactional service (e.g. Resend).
- Spam: honeypot field + minimum fill time + Cloudflare Turnstile.
- SEO: per-page metadata, Open Graph images, `sitemap.ts`, `robots.ts`, JSON-LD `LocalBusiness` / `Organization`.
- Hosting: **TBD** — company will purchase hosting (domain + mailboxes likely come with it). Constraint: the form's Server Action needs a Node.js runtime. If the chosen hosting is PHP-only shared hosting, options are (a) host the site on Vercel and use the hosting only for domain + email, or (b) choose a plan with Node.js support. Check Node.js support before buying. Develop and preview on Vercel meanwhile.
- Secrets only in env vars; `.env.example` with placeholders.
- Accessibility: semantic HTML, alt text, visible focus, keyboard-usable carousel and form.

## 8. Content needed from the company

- [ ] Logo (vector: SVG / AI / PDF)
- [ ] Project list: name, city/district, type, tonnage, m², year, short scope, whether client name may be shown
- [ ] Original-resolution photos per project (not WhatsApp-compressed) + any videos
- [ ] Company facts: founding year, completed project count, workshop area, crane capacity, monthly capacity, certificates (EN 1090, ISO …)
- [ ] Contact: phone, WhatsApp number, email, address, working hours, Google Maps link
- [ ] Client logos + permission to display
- [ ] Consent for identifiable workers in photos (KVKK)
- [ ] KVKK notice text (or approval of a drafted one)
- [ ] Domain name and who owns it

## 9. Open questions

- Is roof/façade cladding a service to list separately?
- Merge Tesisimiz into Hakkımızda? (decide once content is in)
- Which email address receives quote requests?
- Hosting provider/plan (Node.js support?) and therefore email transport (hosting SMTP vs. transactional service).

## 10. Left to the builder

Component breakdown, exact Tailwind token mapping, carousel implementation (CSS scroll-snap, no library), image sizes/breakpoints, file/folder names beyond the agreed structure.
