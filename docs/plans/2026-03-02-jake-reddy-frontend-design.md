# jake-reddy.com — Frontend Design Document

**Date:** 2026-03-02
**Status:** Implemented

## Purpose

Personal portfolio site for Jake Reddy, a full stack developer with 4 years of experience. Goals:
- Professional self-promotion and CV hosting
- Future home for dev blog and project showcase
- Headless CMS frontend (Payload CMS v3 via `basecamp` repo) — mock data in first build

## Aesthetic Direction: Editorial Precision

Think a well-designed developer documentation site crossed with a print magazine. Typography carries the page; color is annotation not decoration.

**The one memorable thing:** A 3px purple vertical bar anchoring each page's hero heading — like a magazine pull-quote rule. Unexpected and editorial without being decorative.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (CSS @theme config) |
| Display font | Syne 800 — geometric grotesque, distinct letterforms |
| Body font | Lora 400/italic — editorial serif warmth |
| Mono font | Geist Mono — dates, meta, code |
| Package manager | npm |

## Color System

| Token | Hex | Semantic role |
|---|---|---|
| `--color-purple` | `#7c3aed` | Primary — nav active, heading accent bars |
| `--color-teal` | `#0d9488` | Secondary — "Building ·" label, hover on links |
| `--color-orange` | `#ea580c` | CTA — one per page: CV download, contact submit |
| `--color-ink` | `#0f172a` | Headings and body text |
| `--color-muted` | `#64748b` | Dates, captions, meta |
| `--color-rule` | `#e2e8f0` | Dividers, borders |
| `--color-surface` | `#f9fafb` | Page background |

**Rule:** No gradients. No colored section backgrounds. Color appears in text and borders only.

## Pages

### Home (`/`)
Editorial masthead: purple bar + Syne 800 name at 7xl, Lora italic subtitle, thin rule, bio paragraph, two text-style CTAs (orange CV, bordered contact). "Building ·" teal annotation at bottom.

### About (`/about`)
Same heading treatment. 5-column grid: left 3 = bio + typographic experience list; right 2 = plain grouped skills (small-caps categories, comma-separated text — no tag pills) + contact text links + CV download.

### Contact (`/contact`)
Heading + intro + `→ text-link` style contacts + divider + plain form (Name, Email, Message). Server action logs to console; redirects to `?sent=1` on success. No email service yet.

## Anti-Patterns Rejected

Gradient hero, animated typing, floating blobs, skill progress bars, `hover:scale-105`, glassmorphism, centered-everything layout, icon+title+description triptych, `rounded-2xl` everywhere, "I'm passionate about..." copy, "Let's work together!" CTAs, gradient text.

## Data Layer

`src/data/` contains typed mock data that mirrors future Payload CMS REST API shapes. Migration = swap `import { profile } from '@/data/profile'` for a `fetch()` call.

## Future Phases

- Wire to Payload CMS (`https://cms.jake-reddy.com/api/`)
- `/writing` and `/writing/[slug]` — blog from `jr_posts` collection
- `/projects` — from `jr_projects` collection
- Contact form → Resend email service
- Dark mode
