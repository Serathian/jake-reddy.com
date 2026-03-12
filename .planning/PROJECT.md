# jake-reddy.com

## What This Is

A personal portfolio website showcasing Jake Reddy's professional experience as a full-stack developer. The site features a Nordic minimalist design with three main pages: Home (introduction and highlights), About (background and philosophy), and CV (detailed professional experience). Built with Astro and deployed as a Docker container to GitHub Container Registry.

## Core Value

Professionally present Jake's 5 years of full-stack development experience with a clean, striking design that reflects Nordic minimalism and technical excellence.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with introduction and professional highlights
- [ ] About page with background, philosophy, and Nordic lifestyle context
- [ ] CV page with detailed work experience, education, and technical skills
- [ ] Fixed navigation header across all pages
- [ ] Nordic minimalist design system implementation (black/white/gray monochrome, JetBrains Mono + IBM Plex Sans typography, 8px spacing grid)
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Docker image build configuration
- [ ] GitHub Actions CI pipeline for linting and TypeScript checking
- [ ] GitHub Actions CI pipeline for running tests
- [ ] Automated Docker image build and push to GitHub Container Registry on tagged releases
- [ ] GitHub release creation from tags

### Out of Scope

- Blog functionality — Deferred to future version, content not ready
- Docker compose configuration — Handled by separate infrastructure project
- DigitalOcean droplet configuration — Handled by separate infrastructure
- Domain DNS configuration — Already handled externally
- Deployment automation (pulling image to server) — Handled by existing infrastructure
- PDF CV download — Not required for v1
- Contact form — Not mentioned in requirements
- Analytics or tracking — Not mentioned in requirements

## Context

**Design System:**
A Nordic minimalist design system was created prior to this project (located in `design-system/nordic-developer-portfolio/MASTER.md`). The design emphasizes:
- Radical simplicity with black/white/gray monochrome palette
- JetBrains Mono for headings (technical authenticity)
- IBM Plex Sans for body text
- 8px base spacing unit
- Sharp corners (no border-radius)
- Minimal shadows, crisp borders
- High contrast (WCAG AAA compliance)

**Target Audience:**
Potential employers, clients, and professional contacts looking to learn about Jake's experience and capabilities.

**Infrastructure Context:**
This website is part of a larger infrastructure stack. The deployment chain is: code → Docker image (this project's responsibility) → existing docker-compose setup → DigitalOcean droplet. This project ends at publishing the Docker image.

## Constraints

- **Tech Stack**: Astro (static site generator) — Chosen for content-focused site, fast builds, minimal JavaScript
- **Design**: Nordic minimalist design system — Pre-defined, must be implemented faithfully
- **Hosting**: DigitalOcean droplet via docker-compose — Infrastructure already exists, project must output Docker image
- **Registry**: GitHub Container Registry (ghcr.io) — Integrated with GitHub, no additional service needed
- **CI Platform**: GitHub Actions — Repository already on GitHub

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro for static generation | Content-focused site, no need for heavy client-side framework | — Pending |
| Nginx for Docker container | Lightweight, proven for serving static files | — Pending |
| Tag-triggered releases | Clear versioning, explicit release control | — Pending |
| Include tests in CI | Ensure quality, catch issues before release | — Pending |
| Blog deferred to v2 | Content not ready, focus on core pages first | — Pending |

---
*Last updated: 2026-03-12 after initialization*
