# Jake Reddy — Agent Instructions

`jake-reddy.com` is Jake Reddy's personal engineering portfolio, resume, and technical blog built with **Astro 5 and Tailwind CSS**.

---

## 1. Architecture & Design

* **Static Site Generation**: Astro generates pure static HTML, CSS, and minimal clientside JavaScript.
* **Production Runtime**: Serves pre-built static assets from `/app/dist` using an Alpine-based Nginx container (`Dockerfile`) on port 80 behind Traefik.
* **Content Collections**: Blog articles, engineering projects, and case studies are authored using Markdown/MDX with strict Zod content schema validations.
* **Performance & A11y**: Enforces perfect Lighthouse performance, fast First Contentful Paint (FCP), zero layout shifts, and semantic accessible HTML.

---

## 2. Directory Structure

* `src/pages/`: Astro file-based routes (`index.astro`, `about.astro`, `cv.astro`, `projects.astro`, `blog/`).
* `src/components/`: Reusable UI elements (`Header.astro`, `Footer.astro`, `BlogCard.astro`, `ProjectCard.astro`).
* `src/layouts/`: Base HTML document and navigation layout (`BaseLayout.astro`).
* `src/styles/`: Global styles and design tokens (`global.css`, `theme.css`).

---

## 3. Development Commands

```bash
# Start Astro local dev server (port 3002)
npm run dev

# Run Vitest unit & content tests
npm test

# Typecheck TypeScript and Astro files
npm run typecheck

# Build static production bundle
npm run build
```
