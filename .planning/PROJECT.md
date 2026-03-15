# jake-reddy.com

## What This Is

A personal portfolio website showcasing Jake Reddy's 5 years of full-stack development experience with a Nordic minimalist design. Built with Astro and deployed as a Docker container to GitHub Container Registry. v0.1 ships Home and About pages; CV and Projects pages come in v0.2.

## Core Value

Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## Requirements

### Validated

- ✓ Home page with introduction and professional highlights — v0.1
- ✓ About page with background, philosophy, and Nordic lifestyle context — v0.1
- ✓ Fixed navigation header across all pages — v0.1
- ✓ Nordic minimalist design system (monochrome palette, JetBrains Mono + IBM Plex Sans, 8px grid, sharp corners, WCAG AAA) — v0.1
- ✓ Responsive layout (mobile 375px, tablet 768px, desktop 1024px+) — v0.1
- ✓ Docker multi-stage build (Node build + Nginx runtime, non-root user, health check) — v0.1
- ✓ GitHub Actions CI: linting, TypeScript checking, tests — v0.1
- ✓ Automated Docker image build and push to GHCR on tagged releases — v0.1
- ✓ GitHub release creation from tags — v0.1
- ✓ Contact information visible (email, GitHub, LinkedIn links in footer) — v0.1

### Active

- [ ] CV page with detailed work experience, education, and technical skills (CONT-06, CONT-07, CONT-08)
- [ ] Projects showcase section — 3-5 featured projects with tech stacks (CONT-09, CONT-10)
- [ ] Performance optimization (Lighthouse score 90+) (INFR-07)
- [ ] Subtle purposeful animations respecting prefers-reduced-motion (DSGN-07)
- [ ] Image optimization (DSGN-08)

### Out of Scope

- Blog functionality — Content not ready, target v2+
- Docker compose configuration — Handled by separate infrastructure project
- DigitalOcean droplet configuration — Handled by separate infrastructure
- Domain DNS configuration — Already handled externally
- Deployment automation (pulling image to server) — Handled by existing infrastructure
- PDF CV download — Not required for v0.1, evaluate for v0.2
- Contact form with backend — Adds complexity, maintenance overhead; email links sufficient
- Analytics or tracking — Privacy concerns, GDPR overhead; not needed for portfolio
- Dark mode toggle — Nordic monochrome design may not need it; evaluate post-launch

## Context

**Current state (v0.1):**
483 LOC (Astro/TS/CSS). Tech stack: Astro 6.0.4, Tailwind 4, TypeScript strict, Nginx Docker.
Two content pages live: Home (Hero + Highlights) and About (Background, Philosophy, Nordic Life).
CI/CD fully operational: every push validated, every tag publishes Docker image to GHCR.

**Design System:**
Pre-defined Nordic minimalist design system at `design-system/nordic-developer-portfolio/MASTER.md`. Implementation note: DSGN-01–06 are functionally complete but have documentation gaps (unchecked boxes in requirements) — known tech debt from v0.1 audit.

**Technical debt from v0.1:**
- Vitest config uses `vitest/config` instead of `astro/config` (will break if Astro components tested)
- `package.json` test script uses `vitest` without `--run` (unsafe for non-TTY CI environments)
- Missing `--color-secondary` and `--color-border` CSS custom properties in theme.css
- Header uses `bg-white` (fully opaque) instead of `rgba(255,255,255,0.98)` per design spec
- Home page has 5 instances of `text-gray-700` instead of `text-[#595959]`
- Footer has 3 instances of `text-gray-600` instead of `text-[#595959]`

**Target Audience:**
Potential employers, clients, and professional contacts looking to learn about Jake's experience and capabilities.

**Infrastructure Context:**
Deployment chain: code → Docker image (this project) → existing docker-compose setup → DigitalOcean droplet. This project ends at publishing the Docker image.

## Constraints

- **Tech Stack**: Astro (static site generator) — content-focused, fast builds, minimal JavaScript
- **Design**: Nordic minimalist design system — pre-defined, must be implemented faithfully
- **Hosting**: DigitalOcean droplet via docker-compose — infrastructure exists, project outputs Docker image
- **Registry**: GitHub Container Registry (ghcr.io) — integrated with GitHub
- **CI Platform**: GitHub Actions — repository already on GitHub

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro for static generation | Content-focused site, no need for heavy client-side framework | ✓ Good — fast builds, minimal JS, clean Astro patterns |
| Nginx for Docker container | Lightweight, proven for serving static files | ✓ Good — non-root user, health check, try_files routing working |
| Tag-triggered releases | Clear versioning, explicit release control | ✓ Good — CI/CD fully operational |
| Include tests in CI | Ensure quality, catch issues before release | ✓ Good — mirror-logic test pattern for page content working well |
| Blog deferred to v2 | Content not ready, focus on core pages first | ✓ Good — keeps v0.1 scope tight |
| CV page deferred to v0.2 | Simplified scope — establish core identity first | ✓ Good — shipped clean foundation faster |
| Tailwind 4 with CSS custom properties | Design token approach for Nordic palette | ⚠️ Revisit — missing --color-secondary and --color-border declarations; components use hardcoded hex |
| Mirror-logic test pattern | Test content data via inline functions, no .astro imports | ✓ Good — avoids Astro component test complexity, patterns established |

---
*Last updated: 2026-03-15 after v0.1 milestone*
