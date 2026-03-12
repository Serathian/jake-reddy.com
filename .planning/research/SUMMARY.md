# Project Research Summary

**Project:** Personal Developer Portfolio Website
**Domain:** Static portfolio site for 5yr full-stack developer
**Researched:** 2026-03-12
**Confidence:** HIGH

## Executive Summary

This is a static personal portfolio website for a 5-year experienced full-stack developer with a Nordic minimalist design aesthetic. Expert portfolios in this domain are built as static sites using modern static site generators (Astro is current industry standard), containerized with Docker, and deployed via automated CI/CD pipelines. The recommended approach is Astro 6 + Docker + GitHub Actions, serving static files through Nginx.

The research reveals a clear stack choice (Astro 6 with Node 22+, TypeScript, plain CSS), well-defined feature requirements (professional intro, work experience, technical skills, contact methods are table stakes; project case studies and blog are differentiators but can be deferred), and proven architectural patterns (static-first with layout composition, scoped component styles, multi-stage Docker builds). The technology stack is mature with official documentation covering all required patterns.

Key risks center on Docker configuration (improper .dockerignore, wrong Nginx routing, bloated images) and CI/CD permissions (GitHub Container Registry access). All risks have well-documented prevention strategies from official sources. The Nordic minimalist design differentiates from typical portfolios while the 8px grid system and established color palette provide clear implementation constraints. This is a low-risk, high-confidence project with established patterns.

## Key Findings

### Recommended Stack

Astro 6 is the optimal choice for content-focused portfolio sites in 2026. It provides static site generation with zero JavaScript by default, excellent developer experience, and official Docker recipes. The stack leverages Node 22+ (required for Astro 6), TypeScript for type safety, and plain CSS with variables (avoiding Tailwind due to custom Nordic design system requirements).

**Core technologies:**
- **Astro 6.0.4:** Static site generator — Industry standard for portfolios, fast builds, minimal JS, official Docker/CI/CD recipes
- **Node.js 22.12.0+:** Runtime environment — Required by Astro 6, LTS version ensures stability
- **TypeScript 5.x:** Type safety — Built into Astro, catches errors at build time with zero config needed
- **Nginx (Alpine):** Web server — Lightweight (5-10MB), proven for static files, official Astro pattern
- **Docker Multi-stage:** Containerization — Reduces image size 60-70%, separates build/runtime dependencies
- **GitHub Actions + GHCR:** CI/CD — Native GitHub integration, free for public repos, mature ecosystem

**Testing & Quality:**
- Vitest 2.x for unit/integration tests (Vite-native, fast, official recommendation)
- Playwright 1.x for E2E tests (cross-browser, Microsoft-backed)
- @astrojs/check for TypeScript validation in CI

**Style approach:** Plain CSS with CSS Variables for design tokens. Astro's scoped styles prevent conflicts. Tailwind explicitly avoided due to custom Nordic design system with pre-defined tokens.

### Expected Features

Portfolio sites have clear expectations: professional introduction, work experience, technical skills, and contact methods are non-negotiable table stakes. Missing these signals an incomplete or unprofessional portfolio. For a 5-year experienced developer, quality depth matters more than feature breadth.

**Must have (table stakes):**
- Professional introduction/hero section — First impression, establishes who you are immediately
- Work experience with chronological history — Proves 5yr professional credibility, must show progression
- Technical skills showcase — Demonstrates capability breadth, should show depth not just listing
- Contact methods (email, GitHub, LinkedIn) — Non-negotiable, visitors need to reach you
- Responsive design — Expected in 2026, Nordic aesthetic must scale to mobile/tablet/desktop
- About page with philosophy — Humanizes developer, differentiates at senior level
- Fixed navigation header — Usability requirement for multi-page site

**Should have (competitive advantage):**
- Project showcase (3-5 best projects) — Proof of work, quality over quantity for experienced devs
- Detailed project case studies — Shows problem-solving, not just outputs; separates mid/senior from junior
- Metrics/impact statements — Quantifies achievements (e.g., "improved performance 40%"), critical for senior credibility
- Open source contributions — Demonstrates community involvement, real-world collaboration
- Nordic minimalist design implementation — Already planned, serves as differentiator reflecting personal brand

**Defer (v2+):**
- Blog functionality — Correctly deferred until 5-10 quality posts ready; empty blog worse than no blog
- Downloadable PDF resume — Add when HR feedback indicates need, low effort convenience feature
- Dark mode toggle — Nice to have but Nordic monochrome may not need it, evaluate post-launch

**Anti-features to avoid:**
- Contact form with backend — Maintenance overhead, spam handling, no value over email links
- Skill percentage bars — Subjective, impossible to quantify, looks junior/gimmicky
- Every project ever built — Dilutes quality, shows lack of curation at 5yr experience level
- Excessive animations — Contradicts Nordic minimalism, hurts performance and accessibility

### Architecture Approach

Static site generation with component-based architecture. Astro compiles components to pure HTML at build time, served by Nginx with zero server-side processing at runtime. Layout composition pattern provides DRY structure (header/footer defined once), scoped component styles prevent CSS conflicts, and multi-stage Docker builds separate build dependencies from lightweight runtime.

**Major components:**
1. **Pages (src/pages/)** — Define routes via file-based routing (index.astro → /, about.astro → /about, cv.astro → /cv)
2. **Layouts (src/layouts/)** — Provide consistent page structure with header, footer, meta tags; wrap pages via `<slot />` injection
3. **Components (src/components/)** — Reusable UI elements (Header, Footer) with automatically scoped styles
4. **Styles (src/styles/)** — Global CSS for Nordic design tokens (colors, typography, 8px grid), imported in layout
5. **Build System (Astro + Vite)** — Transforms source to optimized static output (dist/), bundles CSS/JS, optimizes images
6. **Web Server (Nginx)** — Serves static files from dist/ folder, handles routing via try_files directive

**Key patterns:**
- **Layout Composition:** Consistent structure (header/nav/footer) defined once in Layout.astro, reused across all pages
- **Scoped Styles:** Component CSS automatically scoped, no class name conflicts, co-located with markup
- **Static-First:** Pure HTML/CSS by default, zero JavaScript shipped unless explicitly needed via client:* directives
- **Multi-Stage Docker:** Build stage (Node + deps + source) → Runtime stage (Nginx + dist/ only) = 60-70% smaller images

**Build order dependencies:**
1. Foundation (Astro scaffold, TypeScript, Dockerfile, CI) → establishes project structure
2. Design System (global.css, tokens, typography) → visual language before components
3. Layout & Navigation (Layout.astro, Header, Footer) → shared structure before pages
4. Pages (Home, About, CV) → content uses layout and components
5. Polish & Deployment (image optimization, Docker publish) → requires complete site

### Critical Pitfalls

Research identified 7 critical pitfalls with HIGH confidence based on official documentation. All have clear prevention strategies and warning signs for early detection.

1. **Building static site without proper .dockerignore** — Bloated images (400MB+), missing assets in production, or build failures. Prevention: Exclude node_modules/.git/dist but keep public/src/configs, test Docker build locally first.

2. **Wrong Nginx configuration for routing** — Direct navigation to /about or /cv returns 404 even though clicking from home works. Prevention: Use `try_files $uri $uri/index.html =404;` directive, test all routes with direct URLs.

3. **Hardcoded paths and incorrect base URL** — Assets fail to load in production, site looks broken. Prevention: Configure `site: 'https://jake-reddy.com'` in astro.config.mjs, test dist/ with local server before Docker.

4. **Missing GitHub Actions permissions for GHCR** — Docker push fails with "Permission denied" even with correct credentials. Prevention: Add `permissions: { packages: write }` to workflow, use GITHUB_TOKEN not PAT.

5. **Single-stage Docker build** — 400MB+ images with dev dependencies and source code included. Prevention: Use multi-stage build (node:alpine AS build → nginx:alpine AS runtime), verify image <100MB.

6. **No health checks** — Broken deployments go live without detection. Prevention: Add HEALTHCHECK to Dockerfile, verify critical routes return 200 in CI/CD.

7. **Running as root in container** — Security vulnerability if container escapes. Prevention: Add USER directive to Dockerfile (user node or create appuser), verify with docker exec whoami.

## Implications for Roadmap

Based on research, infrastructure must be established before content, design system before components, and shared structure before pages. Docker configuration and CI/CD are foundational (affects all phases), while content and polish are final layers.

### Phase 1: Foundation & Infrastructure
**Rationale:** Establishes project structure, tooling, and deployment pipeline before any content development. Docker and CI/CD affect all subsequent work—must be correct from start to avoid rework.

**Delivers:** 
- Astro 6 project initialized with TypeScript
- Docker multi-stage build with Nginx serving
- GitHub Actions workflows (CI: lint/typecheck/test, Release: Docker publish to GHCR)
- Local development environment verified

**Addresses:** 
- Stack requirements: Astro 6.0.4, Node 22+, TypeScript, Docker, Nginx
- Prevents pitfalls #1, #3, #4, #5, #7 early

**Avoids:** 
- Wrong .dockerignore (bloated images, missing assets)
- Single-stage Docker (400MB+ images)
- Missing GHCR permissions (failed deployments)
- Running as root (security vulnerability)

**Research flag:** Standard patterns, skip `/gsd-research-phase` (official Astro Docker recipe, mature GitHub Actions patterns)

### Phase 2: Design System Implementation
**Rationale:** Visual language must be established before building components and pages. Nordic minimalist design has specific requirements (monochrome palette, JetBrains Mono font, 8px grid, sharp corners) that affect all UI.

**Delivers:**
- Global CSS with Nordic design tokens (colors, typography, spacing)
- Font setup (JetBrains Mono, IBM Plex Sans) with proper loading
- Base styles and CSS reset
- Responsive breakpoints for mobile/tablet/desktop

**Uses:**
- Plain CSS with CSS Variables (not Tailwind—custom design system)
- Scoped component styles (Astro pattern)

**Implements:**
- Architecture: Global styles layer (src/styles/global.css)
- Feature: Nordic minimalist design differentiator

**Research flag:** Standard CSS patterns, skip research-phase (well-documented, no framework dependencies)

### Phase 3: Layout & Navigation Structure
**Rationale:** Shared structure (layout, header, footer) must exist before individual pages. Layout composition pattern is foundational—every page depends on it.

**Delivers:**
- Layout.astro component with meta tags, header/footer slots
- Fixed navigation Header.astro component
- Footer.astro component with social links
- Responsive navigation for mobile

**Addresses:**
- Feature: Fixed navigation header (table stakes)
- Feature: Contact methods in footer (GitHub, LinkedIn, email)
- Architecture: Layout composition pattern

**Avoids:**
- Pitfall #2: Wrong Nginx routing (configure try_files for multi-page structure)

**Research flag:** Standard Astro patterns, skip research-phase (official docs, proven patterns)

### Phase 4: Core Content Pages
**Rationale:** Content pages use established layout and design system. Pages are independent (can be built in parallel) but all depend on Phase 2 & 3 foundation.

**Delivers:**
- Home page (index.astro) with professional introduction and highlights
- About page (about.astro) with background, philosophy, Nordic lifestyle context
- CV page (cv.astro) with work experience, skills, achievements

**Addresses:**
- Features: Professional introduction, work experience, technical skills, about page (all table stakes)
- Feature: Metrics/impact statements in CV
- Architecture: Pages layer (src/pages/)

**Implements:**
- Component scoped styles for page-specific elements
- Responsive layouts for all device sizes

**Research flag:** Content-focused, skip research-phase (straightforward implementation using established components)

### Phase 5: Project Showcase
**Rationale:** Projects demonstrate actual capabilities but require content curation. Can be added to Home or CV page, or separate page. Deferred slightly to prioritize core pages first.

**Delivers:**
- 3-5 curated project entries with descriptions
- Tech stack tags per project
- Links to live demos and GitHub repos
- Optional: Project case studies with problem/solution/outcome

**Addresses:**
- Feature: Project showcase (table stakes for portfolios)
- Feature: Tech stack transparency per project
- Optional: Detailed case studies (competitive advantage)

**Research flag:** Standard content patterns, skip research-phase (straightforward implementation)

### Phase 6: Polish & Deployment
**Rationale:** Optimization and deployment verification require complete site. Final quality checks before launch.

**Delivers:**
- Image optimization (compression, WebP conversion)
- Responsive design testing across devices
- Performance optimization (Lighthouse audit)
- Health checks in Dockerfile
- Production deployment with verification

**Addresses:**
- Feature: Responsive design (table stakes)
- Feature: Professional presentation (bug-free, polished)

**Avoids:**
- Pitfall #6: Missing health checks (broken deployments)
- UX pitfalls: Oversized images, missing viewport tags, no 404 page

**Research flag:** Testing phase, may need `/gsd-research-phase` for Lighthouse optimization if scores below 90

### Phase Ordering Rationale

**Infrastructure first (Phase 1):** Docker and CI/CD configuration affects every subsequent phase. Wrong Nginx config or missing GHCR permissions discovered in Phase 6 would require rebuilding deployment infrastructure. Pitfall research emphasizes "configure correctly from start" for Docker.

**Design before components (Phase 2 → 3):** Architecture research shows scoped component styles depend on design tokens. Building Header without global.css means rewriting styles when design system is added. Nordic aesthetic with specific constraints must be established first.

**Shared structure before pages (Phase 3 → 4):** Layout composition pattern means all pages depend on Layout.astro. Building pages first leads to code duplication (header/footer repeated) then refactoring. Feature research confirms fixed navigation is table stakes—must exist before content.

**Content before polish (Phase 4 → 5 → 6):** Can't optimize images that don't exist yet. Responsive testing requires complete content. Feature research shows professional presentation is final layer applied to complete content, not built in isolation.

**Projects slightly deferred (Phase 5):** While projects are table stakes, they can integrate into existing pages. Core identity pages (Home, About, CV) are higher priority—professionals judge portfolio on work history and skills first, projects second. Feature research: "3-5 strong projects better than 20 weak ones" suggests curation time is needed.

### Research Flags

**Phases with standard patterns (skip `/gsd-research-phase`):**
- **Phase 1 (Foundation):** Official Astro Docker recipe, mature GitHub Actions patterns, well-documented in STACK.md
- **Phase 2 (Design System):** Plain CSS, no framework, standard responsive design patterns
- **Phase 3 (Layout):** Astro layout composition pattern, official docs cover thoroughly
- **Phase 4 (Content Pages):** Straightforward implementation, no complex integrations
- **Phase 5 (Projects):** Content-focused, standard markup patterns

**Phase likely needing deeper research:**
- **Phase 6 (Polish):** If Lighthouse performance scores below 90, may need `/gsd-research-phase` for optimization techniques (lazy loading, code splitting, critical CSS). Otherwise standard patterns apply.

**Optional future research:**
- **Blog functionality (v2):** Will need `/gsd-research-phase` for content collections, MDX integration, RSS feeds when added post-launch

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Astro 6 docs (March 2026), explicit Node 22+ requirement, proven Docker patterns, mature GitHub Actions ecosystem |
| Features | HIGH | Analysis of 5+ successful developer portfolios (Brittany Chiang, Josh Comeau, Lee Robinson), GitHub collection of 1500+ portfolios confirms patterns, aligned with 5yr experience level |
| Architecture | HIGH | Official Astro architecture patterns, proven Nginx configuration, standard static site patterns, well-documented in official recipes |
| Pitfalls | HIGH | All 7 critical pitfalls sourced from official Astro/Docker/GitHub docs, prevention strategies verified against official best practices |

**Overall confidence:** HIGH

All research areas achieved HIGH confidence through official documentation and proven patterns. Stack recommendations verified against Astro 6.0.4 release notes (March 12, 2026). Feature analysis based on direct examination of successful portfolios from developers with 5+ years experience. Architecture patterns sourced from official Astro guides. Pitfall prevention strategies drawn from official troubleshooting documentation.

### Gaps to Address

**Minor gaps (low risk, handle during implementation):**

- **Font loading strategy:** Nordic design requires JetBrains Mono and IBM Plex Sans. Research confirmed font-display: swap for FOUT prevention, but specific font file hosting (Google Fonts vs self-hosted) not specified. Decision: Evaluate during Phase 2 based on performance requirements.

- **Project showcase location:** Feature research shows 3-5 projects are table stakes but didn't specify page structure (dedicated /projects page vs integrated into Home/CV). Decision: Evaluate during Phase 4 based on content volume.

- **Lighthouse optimization threshold:** Performance optimization needed but specific score targets not defined. Decision: During Phase 6, target 90+ on all categories (accessibility, SEO, best practices) per industry standards.

- **404 page design:** UX pitfalls mention need for custom 404 page but design not specified. Decision: Apply Nordic minimalist aesthetic during Phase 6, keep simple (heading + navigation).

**No critical gaps identified.** All major decisions (stack, architecture, features) have clear direction with HIGH confidence. Minor decisions can be resolved during implementation without additional research.

## Sources

### Primary (HIGH confidence)
- [Astro Official Documentation](https://docs.astro.build/) — Stack, architecture, Docker patterns, tested against Astro 6.0.4 (March 2026)
- [Astro Docker Recipe](https://docs.astro.build/en/recipes/docker/) — Multi-stage build pattern, Nginx configuration
- [Astro Upgrade Guide v6](https://docs.astro.build/en/guides/upgrade-to/v6/) — Version-specific requirements, breaking changes
- [Docker Node.js Best Practices](https://docs.docker.com/language/nodejs/build-images/) — Multi-stage builds, security patterns
- [GitHub Actions Documentation](https://docs.github.com/en/actions/) — CI/CD workflows, GHCR publishing

### Secondary (HIGH confidence, verified patterns)
- Brittany Chiang portfolio (brittanychiang.com) — Frontend engineer, strong project case studies, accessibility focus
- Josh W Comeau portfolio (joshwcomeau.com) — Technical educator, interactive blog, thought leadership
- Lee Robinson portfolio (leerob.io) — Former Vercel, minimal content-focused approach
- Amruth Pillai portfolio (amruthpillai.com) — Senior frontend, comprehensive resume-on-web
- GitHub emmabostian/developer-portfolios (21.1k stars) — Curated collection of 1500+ portfolios, pattern validation

### Research Methodology
- **Stack:** Official Astro 6 docs + Node LTS requirements + Docker official patterns
- **Features:** Analysis of 5 successful portfolios + 1500+ portfolio collection + feature categorization (table stakes/differentiators/anti-features)
- **Architecture:** Official Astro architecture guide + Docker multi-stage patterns + Nginx static serving recipes
- **Pitfalls:** Official troubleshooting docs from Astro/Docker/GitHub + common mistakes documented in official best practices

---
*Research completed: 2026-03-12*
*Ready for roadmap: yes*
