# Roadmap: jake-reddy.com

**Created:** 2026-03-12
**Granularity:** Standard (5 phases)
**Coverage:** 37/37 v1 requirements mapped ✓

## Core Value

Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## Phases

- [ ] **Phase 1: Foundation & Infrastructure** - Astro project initialized with Docker and local development working
- [ ] **Phase 2: CI/CD Pipeline** - Automated quality checks and Docker publishing operational
- [ ] **Phase 3: Design System Implementation** - Nordic minimalist visual language established across all UI
- [ ] **Phase 4: Layout & Navigation** - Fixed header and shared page structure working
- [ ] **Phase 5: Core Content Pages** - Home and About pages complete with responsive design

## Phase Details

### Phase 1: Foundation & Infrastructure
**Goal:** Development environment and deployment pipeline operational so content development can begin

**Depends on:** Nothing (first phase)

**Requirements:** INFR-01, INFR-02, INFR-03, INFR-04, INFR-05, INFR-06, QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, TEST-01

**Success Criteria** (what must be TRUE):
  1. Developer can run `npm run dev` and view site at localhost:4321
  2. Developer can run `docker build` and produce working image under 100MB
  3. Docker container serves static files on port 80 with health check passing
  4. Production build completes without TypeScript or linting errors
  5. Vitest is configured and can run tests

**Plans:** 4 plans

Plans:
- [x] 01-01-PLAN.md — Initialize Astro 6 with TypeScript and project structure (COMPLETE - 6min, 2 tasks)
- [x] 01-02-PLAN.md — Configure development tooling (ESLint, Prettier, Vitest) (COMPLETE - 16min, 5 tasks)
- [ ] 01-03-PLAN.md — Create Docker configuration with multi-stage build
- [ ] 01-04-PLAN.md — Verify Phase 1 integration and production readiness

---

### Phase 2: CI/CD Pipeline
**Goal:** Automated quality checks and Docker publishing working so every commit is validated and releases are automatic

**Depends on:** Phase 1 (needs project structure and Docker configuration)

**Requirements:** CICD-01, CICD-02, CICD-03, CICD-04, CICD-05, CICD-06, CICD-07, TEST-03

**Success Criteria** (what must be TRUE):
  1. Every push triggers GitHub Actions workflow that runs linting, type checking, and tests
  2. Failed checks block deployment (visible red X on commit)
  3. Creating a git tag (e.g., v0.1.0) automatically builds Docker image
  4. Docker image is pushed to GitHub Container Registry with correct tag
  5. GitHub release is created automatically from tag with release notes

**Plans:** 2 plans

Plans:
- [ ] 02-01-PLAN.md — Expand CI workflow with complete quality checks
- [ ] 02-02-PLAN.md — Create release workflow for Docker publishing and GitHub releases

---

### Phase 3: Design System Implementation
**Goal:** Nordic minimalist visual language established so all pages have consistent, striking appearance

**Depends on:** Phase 1 (needs Astro project structure)

**Requirements:** DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06

**Success Criteria** (what must be TRUE):
  1. All colors use monochrome palette (black #000000, white #FFFFFF, defined grays)
  2. Headings render in JetBrains Mono, body text in IBM Plex Sans
  3. All spacing follows 8px grid system (8px, 16px, 24px, 32px, etc.)
  4. No rounded corners anywhere (border-radius: 0)
  5. Contrast ratios meet WCAG AAA standards (7:1 for normal text)
  6. Borders are crisp (1-2px solid) with minimal or no shadows

**Plans:** TBD

---

### Phase 4: Layout & Navigation
**Goal:** Fixed header and shared page structure working so users can navigate between pages consistently

**Depends on:** Phase 3 (needs design system for styling)

**Requirements:** NAV-01, NAV-02

**Success Criteria** (what must be TRUE):
  1. Navigation header appears at top of every page with consistent styling
  2. Header remains fixed during page scroll (position: fixed)
  3. Header includes "Home" and "About" links that work from any page
  4. Footer appears on every page with GitHub, LinkedIn, and email links
  5. Layout component wraps all pages with consistent structure

**Plans:** TBD

---

### Phase 5: Core Content Pages
**Goal:** Home and About pages complete with responsive design so visitors see professional content on any device

**Depends on:** Phase 4 (needs layout and navigation structure)

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, NAV-03, NAV-04, NAV-05, TEST-02

**Success Criteria** (what must be TRUE):
  1. Home page displays name, role, and tagline with professional introduction
  2. Home page includes 3-5 brief professional highlights
  3. About page shows background, professional philosophy, and Nordic lifestyle context
  4. Contact information visible in footer (email, GitHub, LinkedIn clickable)
  5. All pages render correctly on mobile (375px), tablet (768px), and desktop (1024px+)
  6. Critical components have test coverage

**Plans:** TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Infrastructure | 1/4 | In progress | - |
| 2. CI/CD Pipeline | 0/TBD | Not started | - |
| 3. Design System Implementation | 0/TBD | Not started | - |
| 4. Layout & Navigation | 0/TBD | Not started | - |
| 5. Core Content Pages | 0/TBD | Not started | - |

## Research Flags

All phases use standard, well-documented patterns from official sources:

- **Phase 1:** Official Astro Docker recipe, proven multi-stage build patterns
- **Phase 2:** Mature GitHub Actions ecosystem, standard CI/CD workflows
- **Phase 3:** Plain CSS with variables, standard responsive design patterns
- **Phase 4:** Astro layout composition pattern from official docs
- **Phase 5:** Straightforward content implementation using established components

**No phases require `/gsd-research-phase`** — all patterns are standard and well-documented.

## Notes

### Coverage Validation
✓ All 37 v1 requirements mapped to exactly one phase
✓ No orphaned requirements
✓ No duplicate mappings

### Phase Rationale

**1. Foundation first:** Docker and tooling configuration affects all subsequent work. Building on wrong foundation causes rework.

**2. CI/CD second:** Quality automation enables safe development. Catch issues early before content development begins.

**3. Design before components:** Visual language must exist before building UI. Components need design tokens to be styled correctly.

**4. Shared structure before pages:** Layout composition pattern means all pages depend on Layout component. Build foundation before content.

**5. Content last:** Pages use established layout, design system, and navigation. Content is final layer applied to complete structure.

### Deferred to v2

The following requirements are explicitly out of scope for v1 (from REQUIREMENTS.md v2 section):
- CV page (CONT-06, CONT-07, CONT-08)
- Projects showcase (CONT-09, CONT-10)
- Design enhancements (DSGN-07, DSGN-08)
- Performance optimization (INFR-07)
- PDF resume download (INFR-08)
- Blog functionality (BLOG-01 through BLOG-04)

Focus on Home and About pages first. CV and projects can be added in v2 after core identity is established.

---
*Last updated: 2026-03-12 after Plan 01-01 complete*
