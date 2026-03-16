# Roadmap: jake-reddy.com

## Milestones

- ✅ **v0.1 Portfolio MVP** — Phases 1–5 (shipped 2026-03-15)
- 🚧 **v1.0 Feature-Complete Portfolio** — Phases 6–10 (in progress)

## Phases

<details>
<summary>✅ v0.1 Portfolio MVP (Phases 1–5) — SHIPPED 2026-03-15</summary>

- [x] Phase 1: Foundation & Infrastructure (4/4 plans) — completed 2026-03-13
- [x] Phase 2: CI/CD Pipeline (2/2 plans) — completed 2026-03-14
- [x] Phase 3: Design System Implementation (3/3 plans) — completed 2026-03-15
- [x] Phase 4: Layout & Navigation (2/2 plans) — completed 2026-03-15
- [x] Phase 5: Core Content Pages (4/4 plans) — completed 2026-03-15

See `.planning/milestones/v0.1-ROADMAP.md` for full phase details.

</details>

### 🚧 v1.0 Feature-Complete Portfolio (In Progress)

**Milestone Goal:** Complete portfolio with CV, Projects, performance optimization, and purposeful animations.

**Overview:** Transform v0.1 foundation into professional showcase through data-first approach: establish type-safe content collections, implement CV page with structured data, add Projects showcase with markdown rendering, optimize images, and polish with Lighthouse 90+ performance validation and Nordic-minimalist animations.

#### Phase 6: Type Infrastructure & Test Cleanup
**Goal**: Create placeholder Project types for CMS integration and fix test infrastructure debt
**Depends on**: v0.1 foundations (phases 1-5 complete)
**Requirements**: TYPE-01, TYPE-02, DEBT-05, DEBT-06
**Success Criteria** (what must be TRUE):
  1. TypeScript interface defined for Projects in `src/types/project.ts` (placeholder for future CMS integration)
  2. Test infrastructure uses `astro/config` instead of `vitest/config` (enables future component testing)
  3. Test script includes `--run` flag for CI safety (non-TTY environments)
  4. Docker build excludes `.astro/` cache directory (verified in `.dockerignore`)
**Plans**: TBD

Plans:
- [ ] TBD (to be planned)

#### Phase 7: CV Page
**Goal**: Professional CV page with hardcoded content displaying 5 years of work experience, education, and technical skills
**Depends on**: Phase 6 (test infrastructure ready)
**Requirements**: CV-01, CV-02, CV-03, CV-04, CV-05, CV-06, CV-07, CV-08, DEBT-01, DEBT-02, DEBT-03, DEBT-04
**Success Criteria** (what must be TRUE):
  1. User can navigate to `/cv` route and view complete CV content (hardcoded in Astro component)
  2. CV displays 5 years of work experience with company names, roles, dates, and achievement metrics (e.g., "Improved performance 40%")
  3. CV shows education section and technical skills organized by category (Frontend, Backend, DevOps)
  4. CV is responsive across mobile (375px), tablet (768px), and desktop (1024px+) breakpoints
  5. CV link appears in navigation header alongside Home and About links
  6. Design system debt resolved: CSS custom properties added (`--color-secondary`, `--color-border`), header uses `rgba(255,255,255,0.98)`, components use `text-[#595959]` instead of gray utilities
**Plans**: TBD

Plans:
- [ ] TBD (to be planned)

#### Phase 8: Projects Showcase
**Goal**: Featured projects showcase with case study detail pages fetching content from external CMS API
**Depends on**: Phase 7 (CV page complete)
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, PROJ-07, PROJ-08, PROJ-09, PROJ-10
**Success Criteria** (what must be TRUE):
  1. User can navigate to `/projects` and view 3-5 featured projects in grid layout
  2. Each project card displays title, tech stack, and brief description
  3. User can click project to view detailed case study page at `/projects/[id]` route
  4. Project detail pages render content fetched from external CMS API using Project types from Phase 6
  5. Projects follow case study format (problem, solution, outcome) and are responsive across all breakpoints
  6. Projects link appears in navigation header
**Plans**: TBD

Plans:
- [ ] TBD (to be planned)

#### Phase 9: Image Optimization
**Goal**: Production-ready image optimization with WebP format, responsive sizing, and controlled Docker image size
**Depends on**: Phase 8 (projects content exists)
**Requirements**: IMG-01, IMG-02, IMG-03, IMG-04, IMG-05, IMG-06, IMG-07, IMG-08
**Success Criteria** (what must be TRUE):
  1. CV headshot and project screenshots use Astro `<Image />` component with automatic WebP conversion
  2. Images implement responsive `srcset` for different screen sizes and lazy loading
  3. Images prevent Cumulative Layout Shift (explicit width/height attributes)
  4. Docker image size remains under 100MB after adding production images
  5. Source images excluded from final Docker stage (only optimized `dist/_astro/` assets copied)
**Plans**: TBD

Plans:
- [ ] TBD (to be planned)

#### Phase 10: Performance & Animations
**Goal**: Lighthouse 90+ validation across all categories and purposeful animations respecting reduced-motion
**Depends on**: Phase 9 (complete content and images ready for testing)
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, PERF-07, PERF-08, ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06
**Success Criteria** (what must be TRUE):
  1. Lighthouse CI runs in GitHub Actions and validates production builds (not dev server)
  2. All pages (Home, About, CV, Projects list, Project details) score 90+ across Performance, Accessibility, Best Practices, and SEO categories
  3. Nginx serves compressed text assets (gzip) and sets cache headers for static assets
  4. Subtle animations enhance UX without distraction, align with Nordic minimalist philosophy, and achieve WCAG AAA compliance
  5. All animations respect `prefers-reduced-motion` media query (tested with system setting enabled)
**Plans**: TBD

Plans:
- [ ] TBD (to be planned)

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation & Infrastructure | v0.1 | 4/4 | Complete | 2026-03-13 |
| 2. CI/CD Pipeline | v0.1 | 2/2 | Complete | 2026-03-14 |
| 3. Design System Implementation | v0.1 | 3/3 | Complete | 2026-03-15 |
| 4. Layout & Navigation | v0.1 | 2/2 | Complete | 2026-03-15 |
| 5. Core Content Pages | v0.1 | 4/4 | Complete | 2026-03-15 |
| 6. Content Collections Foundation | v1.0 | 0/TBD | Not started | - |
| 7. CV Page | v1.0 | 0/TBD | Not started | - |
| 8. Projects Showcase | v1.0 | 0/TBD | Not started | - |
| 9. Image Optimization | v1.0 | 0/TBD | Not started | - |
| 10. Performance & Animations | v1.0 | 0/TBD | Not started | - |

---
*Last updated: 2026-03-15 after v1.0 milestone roadmap created*
