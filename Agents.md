# Agents.md — jake-reddy.com

Professional/tech portfolio and blog for Jake Reddy.

**Repo location:** `c:\Repositories\droplet-stack\jake-reddy.com\`

---

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS v4
- Fonts: Syne 800 (headings), Lora (body), Geist Mono (meta)
- Colors: purple `#7c3aed`, teal `#0d9488`, orange `#ea580c` — defined as `@theme` CSS vars in `src/app/globals.css`
- Payload CMS backend at `https://cms.jake-reddy.com/api` — collections `jr_posts`, `jr_projects`

## CMS Types

All CMS collection types come from the shared generated package:

```
@basecamp-cms/basecamp-cms-types
```

**Do not define CMS types locally.** Import them via the local barrel:

```typescript
import type { JrPost, JrProject, Author, Tag, Media } from '@/types'
```

`src/types/index.ts` re-exports these from `@basecamp-cms/basecamp-cms-types` and adds any frontend-only types.
If a type is missing, check `node_modules/@basecamp-cms/basecamp-cms-types/dist/index.d.ts` before defining locally.

## What's Built

| Area | Files | Status |
|---|---|---|
| Layout + fonts | `src/app/layout.tsx`, `globals.css` | Done |
| Home page | `src/app/page.tsx`, `src/components/hero.tsx`, `src/components/current-project.tsx` | Done |
| About page | `src/app/about/page.tsx`, `src/components/about-bio.tsx`, `src/components/experience-list.tsx`, `src/components/skills-section.tsx` | Done |
| Contact page | `src/app/contact/page.tsx`, `src/components/contact-links.tsx`, `src/components/contact-form.tsx` | Done |
| Data layer | `src/data/` — mock data, typed to match Payload API shape | Done |
| Nav + footer | `src/components/nav.tsx`, `src/components/footer.tsx` | Done |
| Server action | `src/app/actions.ts` — contact form logs to console | Done |
| Types | `src/types/index.ts` | Done |

## Still To Build

- Blog listing page: `/posts` — fetches `jr_posts` from Payload
- Blog post page: `/posts/[slug]` — renders rich text body
- Projects page: `/projects` — fetches `jr_projects`

## Design Rules

- No gradients, no tag pills, no centered-everything
- One orange CTA per page
- Data layer: `src/data/` holds mock data; wire to Payload API when CMS is populated

## Running

```bash
cd c:/Repositories/droplet-stack/jake-reddy.com
npm run dev   # http://localhost:3000
npm test      # Vitest
npm run build # verify zero TS errors
```
