# Project Research Summary

**Project:** Portfolio v1.0 Milestone (CV, Projects, Performance, Animations, Images)
**Domain:** Developer Portfolio Website (Static Site with Content Management)
**Researched:** 2026-03-15
**Confidence:** HIGH

## Executive Summary

This portfolio v1.0 milestone adds CV pages, project showcases, image optimization, performance validation, and subtle animations to an existing Astro 6.0.4 + Tailwind 4 static site. Research reveals that **Astro's built-in capabilities handle nearly all requirements without additional dependencies**—the existing stack already includes markdown rendering, image optimization via `astro:assets`, view transitions for animations, and static generation for performance.

The recommended approach leverages Astro's Content Collections API for type-safe CV and project data management, built-in `<Image />` component for automatic WebP conversion and responsive sizing, CSS-only animations with `prefers-reduced-motion` guards (aligning with Nordic minimalist design), and Lighthouse CI in GitHub Actions to enforce the 90+ performance requirement. The primary integration points are: (1) content collections schema definition in `src/content.config.ts`, (2) new page routes for `/cv` and `/projects`, (3) component boundaries separating CV and project presentation logic, and (4) Nginx configuration updates for compression and caching.

Key risks center around build-time validation failures (content collection schema mismatches breaking builds), Docker image bloat from improper image optimization setup (can jump from 50MB to 200MB+), and accessibility violations if animations don't respect `prefers-reduced-motion`. Mitigation strategies include: starting with optional Zod schema fields during content migration, testing production builds (`npm run preview`) before Lighthouse audits (not dev server), and wrapping all animations in `@media (prefers-reduced-motion: no-preference)` guards. The existing Docker multi-stage build and mirror-logic test patterns require zero changes—all new features integrate cleanly into v0.1 foundations.

## Key Findings

### Recommended Stack

**Zero new production dependencies required.** Astro 6.0.4 bundles all necessary capabilities: markdown rendering via remark/rehype, Sharp image processor for optimization, view transitions API for animations, and static HTML generation for performance. The only addition is `@lhci/cli` as a dev dependency for automated Lighthouse validation in CI/CD.

**Core technologies:**
- **Astro Content Collections** (built-in) — Type-safe content management for CV data (JSON) and projects (markdown). Zod schema validation at build time prevents runtime errors. Eliminates need for external CMS in v1.0.
- **`astro:assets` module** (built-in) — Image optimization with `<Image />` component. Automatic WebP/AVIF conversion, responsive `srcset` generation, lazy loading, CLS prevention. Sharp bundled, no manual installation.
- **`astro:transitions` module** (built-in) — Subtle page transitions and animations. Respects `prefers-reduced-motion` automatically. Fits Nordic minimalist design (purposeful, not flashy). Alternative: CSS-only animations for full control.
- **Lighthouse CI** (`@lhci/cli@^0.14.0` dev dependency) — Automated performance validation in GitHub Actions. Enforces 90+ score requirement across performance, accessibility, best practices, SEO categories.

**Critical version notes:**
- Astro 6.0.4 includes glob() loader for content collections (new API as of 6.x)
- Compatible with existing Tailwind 4.2.1 and Node.js 22.12.0 setup
- No migration breaking changes from v0.1

### Expected Features

Research analyzed 1500+ developer portfolios via GitHub collections and examined successful examples (Brittany Chiang, Josh W Comeau, Lee Robinson, Amruth Pillai). Clear patterns emerged for experienced developers (5+ years):

**Must have (table stakes):**
- **Professional CV/work experience** — Users expect detailed employment history with company names, dates, roles, tech stacks. Missing this = portfolio feels incomplete for senior-level credibility.
- **Project showcase (3-5 curated)** — Quality over quantity. Best portfolios feature detailed case studies showing problem-solving approach, not just final products. Tech stack per project essential.
- **Technical skills showcase** — Organized by category (Frontend, Backend, DevOps). For 5yr experience, demonstrate depth not just breadth. Avoid gimmicky skill bars/percentages (anti-pattern).
- **Responsive design** — Mobile, tablet, desktop. Non-negotiable in 2026. Nordic minimalist design should scale elegantly.
- **Contact methods** — Email + GitHub + LinkedIn minimum. Contact forms with backend are anti-pattern (maintenance overhead, spam handling).

**Should have (competitive advantage):**
- **Detailed project case studies** — Walk through challenges, decisions, outcomes. Separates mid/senior from junior developers.
- **Metrics/impact statements** — "Improved performance 40%" > "Built feature X". Transforms technical work into business value. Critical for senior-level credibility.
- **Subtle, purposeful animations** — Memorable without distraction. Nordic minimalist approach: enhance UX, don't overpower content. Must respect `prefers-reduced-motion`.
- **Open source contributions** — Link to significant GitHub work. Shows community involvement and real-world collaboration.
- **Personal brand/unique design** — Nordic minimalist already differentiates. Consistency matters more than trendiness.

**Defer (v2+):**
- **Blog functionality** — Correctly deferred in PROJECT.md. Strong differentiator (thought leadership) but requires consistent content pipeline. Don't launch with empty blog (worse than no blog).
- **Downloadable PDF resume** — Nice convenience for HR systems. Add when recruiting feedback indicates need. Low implementation effort.
- **Testimonials/social proof** — Most valuable for freelancers/consultants. Not critical for employment-focused developers.

**Anti-features (avoid):**
- Contact forms with backend (maintenance burden, spam, server overhead)
- Flashy animations everywhere (contradicts minimalist philosophy, hurts performance/accessibility)
- Skill percentage bars (subjective, impossible to quantify, looks junior)
- Every project ever built (dilutes quality, unfocused)
- Analytics/tracking pixels before they're needed (privacy concerns, GDPR overhead)

### Architecture Approach

Integration architecture for v1.0 features into existing Astro 6.0.4 + Tailwind 4 + Docker multi-stage build follows **file-based routing with content collections pattern**. New features plug into established foundations without breaking existing v0.1 patterns (BaseLayout, fixed header navigation, mirror-logic tests).

**Major components:**

1. **Content Collections Layer** (`src/content.config.ts`, `src/content/`) — Defines Zod schemas for CV data (JSON) and projects (markdown). Validates frontmatter at build time. Auto-generates TypeScript types via `astro:content` module. Integrates with existing mirror-logic test pattern (test data helpers inline, mirror in `.astro` components).

2. **Page Routes Layer** (`src/pages/cv.astro`, `src/pages/projects/`) — New static routes generated at build time. CV page queries content collections via `getEntry()`. Projects list/detail pages use `getCollection()` + `getStaticPaths()` for dynamic routing. All routes extend existing `BaseLayout.astro` (fixed header pattern preserved).

3. **Presentation Components Layer** (`src/components/cv/*`, `src/components/projects/*`) — Atomic components for CV sections (ExperienceSection, EducationSection, SkillsSection) and project displays (ProjectCard, ProjectDetail). Render type-safe data from content collections. No client-side JavaScript required (static content only).

4. **Image Optimization Layer** (Astro `<Image />` + `src/assets/images/`) — Local images stored in `src/assets/`, processed at build time. Automatic WebP conversion, responsive `srcset` generation, lazy loading, CLS prevention. Output to `dist/_astro/` (hashed filenames). Works in Docker multi-stage build (Node.js stage processes images, Nginx stage serves optimized files).

5. **Performance Validation Layer** (Lighthouse CI in GitHub Actions) — Runs after `npm run build` in CI pipeline. Tests production build via `astro preview` (not dev server). Enforces 90+ scores across all categories. Fails build if performance regresses.

**Key architectural decisions:**
- **Static-first:** All new pages pre-rendered at build time (zero hydration overhead)
- **Type-safe content:** Zod schemas eliminate runtime content errors
- **Progressive enhancement:** Animations via CSS only, JavaScript optional
- **No framework lock-in:** Pure Astro components, no client-side framework dependency
- **Docker-compatible:** All build-time processing happens in Node stage, runtime is static Nginx

**Data flow:** Content files (markdown/JSON) → Content Collections API validates with Zod → Type-safe data via `getCollection()` → Components render validated data → Static HTML at build → Docker copies `dist/` to Nginx → Cached with immutable headers.

### Critical Pitfalls

Research identified 7 critical pitfalls from Astro documentation, Docker optimization patterns, and WCAG AAA accessibility requirements:

1. **Content Collections Schema Mismatch Breaking Build** — Zod validation fails at build time (not dev time) when frontmatter doesn't match schema. Single field type mismatch breaks entire build in CI. **Prevention:** Use `z.coerce.date()` for dates, start with `.optional()` fields during migration, test `npm run build` locally before pushing, restart dev server after schema changes.

2. **Image Optimization Bloating Docker Image Size** — Optimized images in `dist/_astro/` are correct, but accidentally copying `src/` to final Nginx stage doubles storage (50MB → 200MB+). **Prevention:** Only copy `dist/` folder in Dockerfile final stage, use `.dockerignore` to exclude `src/`, `node_modules/`, `.git/`, monitor image size in CI (<100MB threshold).

3. **Lighthouse Performance Score Measured Against Wrong Build** — Testing dev server (`npm run dev`) yields 20-30 points lower than production due to unminified assets, no compression, HMR overhead. False negatives waste optimization time. **Prevention:** Always test `npm run build && npm run preview`, use `astro preview` not `dev`, run Lighthouse CI against preview deployments, disable browser cache when testing manually.

4. **Markdown XSS via Unsanitized Frontmatter** — Frontmatter fields rendered as HTML without sanitization create XSS vulnerabilities if content comes from external sources. Markdown body is sanitized (remark), but YAML frontmatter is trusted by default. **Prevention:** Never use `set:html` with frontmatter strings, validate external content before writing to markdown, use Zod `.transform()` to strip HTML, keep authoring internal (personal portfolio = low risk).

5. **`prefers-reduced-motion` Ignored, Animations Cause Accessibility Failures** — CSS animations run by default without media query guard. Violates WCAG AAA (project requirement). Users with motion sensitivity experience nausea/headaches. **Prevention:** Wrap ALL animations in `@media (prefers-reduced-motion: no-preference)`, test with system motion setting disabled, use Astro `transition:animate` directives (respect reduced-motion automatically), audit with Lighthouse accessibility check.

6. **Content Collection Build Cache Stale After Schema Changes** — `.astro/` directory caches collection metadata. Schema changes regenerate types but cache can be stale if dev server running. TypeScript errors show old schema structure. **Prevention:** Restart dev server after schema changes (`s + enter`), run `astro sync` to regenerate types, add `.astro/` to `.dockerignore` (never cache in Docker builds), clear cache when errors don't make sense (`rm -rf .astro/`).

7. **View Transitions Breaking Script Re-execution** — Client-side navigation means scripts with `is:inline` run once on initial load but don't re-run. Event listeners stop working after navigation. **Prevention:** Listen to `astro:page-load` event instead of `DOMContentLoaded`, use `data-astro-rerun` attribute for scripts that must re-execute, use `transition:persist` for stateful components, test navigation flows (not just initial load).

## Implications for Roadmap

Based on research, suggested 5-phase structure aligns with dependency order, architectural boundaries, and pitfall prevention:

### Phase 1: Content Collections Foundation
**Rationale:** Content collections are the data foundation for both CV and Projects features. Schema definition must happen first to enable type-safe development. Prevents schema mismatch pitfall (critical) by establishing structure before content creation.

**Delivers:** 
- `src/content.config.ts` with Zod schemas for CV (JSON) and projects (markdown)
- Content collections setup integrated with existing mirror-logic test pattern
- Build-time validation configured (`astro check` in CI)
- `.astro/` cache handling documented and `.dockerignore` updated

**Addresses Features:**
- Foundation for CV page (table stakes)
- Foundation for Projects showcase (table stakes)

**Avoids Pitfalls:**
- Pitfall #1: Schema mismatch breaking build (start with optional fields, test locally)
- Pitfall #6: Build cache stale after changes (`.astro/` in `.dockerignore`, restart protocol)

**Research Flag:** Standard pattern (Astro official docs), skip additional research.

---

### Phase 2: CV Page Implementation
**Rationale:** CV is structured data (not prose), simpler than Projects (no markdown rendering). Validates content collections integration before adding markdown complexity. Natural follow-on to Phase 1.

**Delivers:**
- `/cv` route with detailed work experience, education, skills sections
- CV components (ExperienceSection, EducationSection, SkillsSection)
- CV data file (`src/content/cv/main.json`) with 5yr experience documented
- Navigation header updated with CV link

**Addresses Features:**
- Professional CV/work experience (must-have table stakes)
- Technical skills showcase (must-have table stakes)
- Metrics/impact statements (should-have differentiator)

**Uses Stack:**
- Astro Content Collections for CV data querying (`getEntry()`)
- Existing BaseLayout pattern for page structure
- Tailwind 4 + Nordic design tokens for styling

**Avoids Pitfalls:**
- Pitfall #1: Test CV data against schema before committing
- Pitfall #4: CV data is internal/trusted, XSS risk LOW (document for future)

**Research Flag:** Standard pattern (structured data rendering), skip additional research.

---

### Phase 3: Projects Showcase
**Rationale:** Builds on content collections foundation (Phase 1) but adds markdown rendering complexity. Requires dynamic routing (`getStaticPaths()`) and `render()` API. Projects showcase is must-have feature but more complex than CV.

**Delivers:**
- `/projects` list page with project grid (3-5 featured projects)
- `/projects/[id]` dynamic detail pages with markdown content rendering
- Project components (ProjectCard, ProjectDetail)
- Project markdown files with frontmatter (title, tech stack, dates, demo/GitHub links)

**Addresses Features:**
- Project showcase (must-have table stakes)
- Detailed project case studies (should-have differentiator)
- Tech stack per project (should-have differentiator)

**Implements Architecture:**
- Content collections markdown rendering via `render()` + `<Content />`
- Dynamic route generation with `getStaticPaths()`
- Integration with existing BaseLayout and navigation

**Avoids Pitfalls:**
- Pitfall #1: Validate project frontmatter schema (dates as `z.coerce.date()`)
- Pitfall #4: Projects authored internally, XSS risk LOW (no external CMS in v1.0)

**Research Flag:** Standard pattern (Astro markdown + dynamic routes docs), skip additional research.

---

### Phase 4: Image Optimization
**Rationale:** Projects showcase (Phase 3) needs images for case studies. Image optimization must be configured before adding production images to prevent Docker bloat pitfall (critical). CV headshot also requires optimization.

**Delivers:**
- `src/assets/images/` directory structure (projects/, cv/ subdirectories)
- `<Image />` component integration for CV headshot and project screenshots
- Docker configuration verified (image size <100MB)
- `.dockerignore` updated to exclude source images
- Responsive images with WebP format, lazy loading, CLS prevention

**Addresses Features:**
- Project case studies with screenshots (visual evidence of work)
- Professional presentation (table stakes—polished imagery)

**Uses Stack:**
- Astro `<Image />` from `astro:assets` (built-in)
- Sharp processor (bundled with Astro)
- Nginx cache headers for optimized images

**Avoids Pitfalls:**
- Pitfall #2: Docker image bloat (only copy `dist/`, monitor size in CI)
- Pitfall #3: Build time increases (acceptable, mitigated by Astro caching)

**Research Flag:** Standard pattern (Astro image docs), skip additional research. **However**, monitor Docker build size closely—this is where bloat pitfall surfaces.

---

### Phase 5: Performance Optimization & Animations
**Rationale:** Performance validation and animations are polish features that require complete content (CV, Projects, Images) to test accurately. Lighthouse must test production build with real content. Animations are final touch for Nordic minimalist aesthetic.

**Delivers:**
- Lighthouse CI integration in GitHub Actions (enforces 90+ scores)
- `lighthouserc.json` configuration for all routes
- Nginx compression and cache headers configured
- CSS animation utilities with `prefers-reduced-motion` guards
- Subtle page transitions (optional: Astro view transitions or CSS-only)

**Addresses Features:**
- Performance requirement (Lighthouse 90+, project requirement)
- Subtle, purposeful animations (should-have differentiator for Nordic design)
- Accessibility compliance (WCAG AAA via reduced-motion support)

**Uses Stack:**
- Lighthouse CI (`@lhci/cli` dev dependency)
- Astro built-in view transitions or CSS animations
- Nginx configuration updates for production optimization

**Avoids Pitfalls:**
- Pitfall #3: Test production builds (`npm run preview`), not dev server
- Pitfall #5: All animations wrapped in `prefers-reduced-motion` media query, test with system setting disabled
- Pitfall #7: If using view transitions, test navigation between all routes, use `astro:page-load` events

**Research Flag:** **Needs validation during planning.** Performance testing requires understanding deployment environment (Vercel/Netlify/self-hosted affects Lighthouse scores). Animation strategy needs design system alignment (view transitions vs. CSS-only).

---

### Phase Ordering Rationale

**Dependency order:**
- Content Collections (Phase 1) → CV (Phase 2) → Projects (Phase 3): Data foundation enables content rendering
- Projects (Phase 3) → Images (Phase 4): Can't optimize images before knowing image requirements from projects
- All content (Phases 1-4) → Performance (Phase 5): Can't validate performance without complete content

**Architectural boundaries:**
- Phases 1-3 are data/content layer (collections, pages, components)
- Phase 4 is asset optimization layer (images)
- Phase 5 is validation/polish layer (performance, animations)

**Pitfall prevention:**
- Phase 1 prevents schema mismatch early (Pitfalls #1, #6)
- Phase 4 prevents Docker bloat before adding many images (Pitfall #2)
- Phase 5 prevents accessibility violations at polish stage (Pitfall #5)

**Incremental value:**
- Phase 2 delivers launchable CV page (standalone value)
- Phase 3 adds Projects (portfolio now feature-complete for must-haves)
- Phases 4-5 are optimization/polish (nice-to-have, can defer if timeline pressured)

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Content Collections):** Astro official docs comprehensive, schema definition well-documented, established pattern
- **Phase 2 (CV Page):** Structured data rendering is straightforward, no complex integrations
- **Phase 3 (Projects Showcase):** Markdown + dynamic routes heavily documented in Astro guides
- **Phase 4 (Image Optimization):** Astro `<Image />` docs clear, Docker optimization is standard practice

**Phase needing validation during planning:**
- **Phase 5 (Performance & Animations):** Performance testing requires deployment environment context (Vercel vs. self-hosted affects scores, Nginx vs. CDN affects optimization). Animation strategy needs design system review (view transitions vs. CSS-only for Nordic minimalism). **Recommendation:** Brief validation task during Phase 5 planning to confirm Lighthouse target environment and animation approach.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | All recommendations from official Astro 6.x documentation (current version). Zero external dependencies reduces risk. Existing stack (Astro 6.0.4) already includes all needed capabilities. |
| Features | **HIGH** | Analysis based on 1500+ portfolios (GitHub collection) + direct examination of 5 successful developer portfolios. Clear patterns for 5yr experience developers. Aligns with PROJECT.md scope. |
| Architecture | **HIGH** | Builds on existing v0.1 patterns (BaseLayout, mirror-logic tests, Docker multi-stage). Content collections, image optimization, static routing all documented in official Astro guides. No paradigm shifts. |
| Pitfalls | **HIGH** | Derived from official Astro documentation (common mistakes sections), Docker optimization best practices, WCAG AAA requirements (project design system). All pitfalls have documented recovery strategies. |

**Overall confidence: HIGH**

Research quality strong across all areas. Stack recommendations are conservative (use built-ins, avoid dependencies). Feature analysis validated against real-world examples. Architecture preserves existing patterns. Pitfalls identified from authoritative sources with clear prevention strategies.

### Gaps to Address

**Minor gaps (handle during implementation):**

1. **Deployment environment for Lighthouse testing** — Research assumes standard static hosting (Vercel/Netlify pattern). If deploying to custom infrastructure, Lighthouse baseline may differ. **Resolution:** Phase 5 planning should confirm deployment target and run baseline Lighthouse audit on current v0.1 site.

2. **Animation strategy alignment with design system** — Research presents two options (Astro view transitions vs. CSS-only animations). Nordic minimalist design system may have preference. **Resolution:** Phase 5 planning reviews `design-system/nordic-developer-portfolio/MASTER.md` for animation guidance, chooses approach before implementation.

3. **Content volume for image optimization** — Research assumes 3-5 projects (PROJECT.md scope). If actual project count is higher, build time implications change. **Resolution:** Phase 3 planning confirms project count, Phase 4 adjusts optimization strategy if needed (e.g., WebP-only instead of AVIF+WebP if >10 projects).

4. **CV data structure complexity** — Research assumes standard work experience format (company, role, dates, description, tech stack). If CV includes publications, certifications, awards, schema may need extension. **Resolution:** Phase 1 planning reviews actual CV content, extends schema if needed (additions are low-risk with optional fields).

**No blocking gaps.** All uncertainties resolvable during phase planning with existing knowledge.

## Sources

### Primary (HIGH confidence)

**Official Astro Documentation (verified 2026-03-15):**
- Content Collections: https://docs.astro.build/en/guides/content-collections/ (Astro 6.x)
- Images: https://docs.astro.build/en/guides/images/ (Astro 6.x)
- View Transitions: https://docs.astro.build/en/guides/view-transitions/ (Astro 6.x)
- Build & Deploy: https://docs.astro.build/en/develop-and-build/ (Astro 6.x)
- Docker Recipe: https://docs.astro.build/en/recipes/docker/ (Astro 6.x)

**Project Context:**
- `.planning/PROJECT.md` — Current stack (Astro 6.0.4, Docker, Nginx), v1.0 scope, WCAG AAA requirement
- `package.json` — Verified Astro 6.0.4 installation, existing dependencies
- `Dockerfile` — Multi-stage build pattern (Node → Nginx), current image optimization approach
- `design-system/nordic-developer-portfolio/MASTER.md` — Design constraints (minimal motion, accessibility, monochrome palette)

**Portfolio Analysis:**
- GitHub emmabostian/developer-portfolios (21.1k stars) — 1500+ portfolio collection, pattern validation
- Live portfolio examination: Brittany Chiang (brittanychiang.com), Josh W Comeau (joshwcomeau.com), Lee Robinson (leerob.io), Amruth Pillai (amruthpillai.com), Adham Dannaway (adhamdannaway.com)

### Secondary (MEDIUM confidence)

**Tool Documentation:**
- Lighthouse CI documentation (v0.14.0) — GitHub Actions integration patterns
- Zod validation library — Type coercion patterns for content collections

**Web Standards:**
- MDN Web Docs — `prefers-reduced-motion` media query specification
- Google Web Vitals — Lighthouse scoring methodology (LCP, FCP, CLS metrics)
- WCAG AAA Guidelines — Motion animation requirements (Success Criterion 2.3.3)

### Tertiary (LOW confidence)

**Domain Knowledge (inferred from patterns):**
- Docker image size benchmarks (50-100MB typical for static sites) — based on common practice, not specific source
- Build time estimates (10-45s for 5-100 projects) — extrapolated from Astro performance characteristics, needs validation

---

*Research completed: 2026-03-15*
*Ready for roadmap: yes*
