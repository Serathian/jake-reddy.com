# Stack Research

**Domain:** Portfolio v1.0 enhancement — CV, Projects, Performance, Animations, Images
**Researched:** 2026-03-15
**Confidence:** HIGH

## Executive Summary

For v1.0 milestone features (CV page, Projects showcase, performance optimization, animations, image optimization), **Astro 6.0.4's built-in capabilities handle nearly everything without additional dependencies**. The existing stack already includes the necessary tools; the focus should be on leveraging Astro's native features rather than adding external libraries.

**Key findings:**
- Markdown rendering: Built-in (no additional package needed)
- Image optimization: Built-in `astro:assets` module (no additional package needed)
- Performance: Built-in optimization tools + Lighthouse CI for validation
- Animations: Built-in `astro:transitions` module for subtle, purposeful animations
- No CMS integration required for v1.0 (mocked markdown content in content collections)

## Stack Additions NOT Needed

### What's Already Built Into Astro 6.0.4

| Built-in Feature | Purpose | Why No Addition Needed |
|------------------|---------|------------------------|
| Markdown rendering | Projects markdown content | Astro includes remark + rehype processors by default with GitHub-flavored markdown |
| `<Image />` component | Image optimization | Built-in component from `astro:assets` handles optimization, format conversion, responsive sizing |
| View transitions | Subtle animations | Built-in `<ClientRouter />` component with `transition:*` directives, respects `prefers-reduced-motion` |
| Sharp image processor | Image transformation | Bundled with Astro, no manual installation needed |
| Content collections | Projects showcase data | Built-in type-safe content management with Zod schemas |

## Stack Additions Required

### Development Tools Only

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| `@lhci/cli` | `^0.14.0` | Lighthouse CI for performance validation | CI/CD pipeline to enforce Lighthouse 90+ requirement |

### Installation

```bash
# Lighthouse CI for performance validation (dev dependency only)
npm install -D @lhci/cli
```

## Implementation Approach by Feature

### CV Page
**Stack:** Pure Astro `.astro` components + TypeScript data structures
- No markdown needed (structured data, not prose)
- Define TypeScript interfaces for work experience, education, skills
- Render with Astro components using type-safe data

**Example structure:**
```typescript
// src/data/cv.ts
export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}
```

### Projects Showcase
**Stack:** Astro Content Collections + built-in markdown rendering
- Store projects as `.md` files in `src/content/projects/`
- Use content collections with Zod schema for type safety
- Render markdown body with `<Content />` component from `render()`

**Configuration:**
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects };
```

### Image Optimization
**Stack:** Built-in `astro:assets` module (already available)
- Use `<Image />` component from `astro:assets` for all images
- Automatic format conversion (WebP/AVIF), responsive sizing, lazy loading
- For CV headshot and project screenshots

**Usage pattern:**
```astro
---
import { Image } from 'astro:assets';
import projectImage from '../assets/project-screenshot.png';
---
<Image src={projectImage} alt="Project screenshot" width={800} />
```

### Performance Optimization
**Stack:** Astro built-ins + Lighthouse CI for validation
- Astro 6.0.4 already optimizes: static generation, minimal JS, automatic code splitting
- Add Lighthouse CI to GitHub Actions to enforce 90+ score requirement
- Use built-in `astro check` for TypeScript validation (already in build script)

**Lighthouse CI configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### Animations
**Stack:** Astro built-in `astro:transitions` module (already available)
- Use `<ClientRouter />` component in layout for SPA-like transitions
- Apply `transition:*` directives to elements needing animation
- Built-in `prefers-reduced-motion` support (accessibility requirement met automatically)
- Use subtle built-in animations: `fade`, `slide`, or define custom CSS animations

**Nordic minimalist approach:**
```astro
---
// Subtle fade on page transitions, respects prefers-reduced-motion
import { ClientRouter } from 'astro:transitions';
---
<html>
  <head>
    <ClientRouter />
  </head>
  <body>
    <header transition:persist>
      <!-- Fixed nav persists across pages -->
    </header>
    <main transition:animate="fade">
      <!-- Content fades subtly on navigation -->
      <slot />
    </main>
  </body>
</html>
```

**Custom subtle animation (if needed):**
```astro
<style is:global>
  @keyframes subtle-slide {
    from {
      opacity: 0;
      transform: translateY(8px); /* 8px = 1 spacing unit */
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
```

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/mdx` | MDX adds JSX support not needed for simple markdown content | Built-in markdown with content collections |
| External markdown parsers (e.g., `marked`, `markdown-it`) | Astro includes remark/rehype by default | Astro's built-in markdown processor |
| Image optimization libraries (e.g., `sharp` manually, `imagemin`) | Astro bundles Sharp and handles optimization | `<Image />` from `astro:assets` |
| Animation libraries (e.g., `framer-motion`, `gsap`, `anime.js`) | Too heavy for subtle purposeful animations; conflicts with minimalist aesthetic | Built-in `astro:transitions` + CSS animations |
| CSS-in-JS libraries | Adds runtime overhead, conflicts with Tailwind 4 + CSS custom properties approach | Tailwind 4 + CSS custom properties (already established) |
| Client-side frameworks for static content | CV and Projects are static content, no interactivity needed | Pure Astro components |

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro content collections | Headless CMS (Contentful, Sanity) | If content needs non-technical editor UI or multi-user collaboration (not v1.0 scope) |
| Built-in `<Image />` | Cloudinary, Imgix | If serving 1000s of images or need complex transformations beyond format/size (not v1.0 scope) |
| CSS animations + `astro:transitions` | JavaScript animation libraries | If complex interactive animations needed (not aligned with minimalist design) |
| Lighthouse CI in GitHub Actions | Manual Lighthouse audits | Never — automated validation prevents regression |

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `astro@6.0.4` | `@lhci/cli@^0.14.0` | No conflicts; Lighthouse CI reads static output from `dist/` |
| `astro@6.0.4` | `tailwindcss@^4.2.1` | Already validated in v0.1 |
| Astro built-in Sharp | Node.js 22.12.0+ | Already specified in `package.json` engines |

## Migration Notes from v0.1

### No Breaking Changes
- All existing Astro 6.0.4 + Tailwind 4 patterns remain unchanged
- New features use built-in Astro capabilities, no new paradigms

### Integration Points
1. **Content Collections** — Add `src/content.config.ts` to define `projects` collection
2. **Image Assets** — Create `src/assets/` directory for project images, CV headshot
3. **View Transitions** — Add `<ClientRouter />` to existing layout (opt-in per page or global)
4. **Lighthouse CI** — Add to `.github/workflows/ci.yml` after build step

## Performance Implications

### Build Time
- **Image optimization:** First build will be slower (Sharp processing), subsequent builds cached
- **Content collections:** Negligible impact (compiles markdown at build time)
- **View transitions:** No build-time impact (runtime feature)

**Mitigation:** Astro 6.0 includes incremental build caching; only changed images reprocess.

### Runtime Performance
- **Zero JavaScript overhead** for CV, Projects pages (static content)
- **View transitions:** ~5KB gzipped for `<ClientRouter />` (only if used)
- **Lighthouse 90+ achievable** with built-in optimizations (static generation, minimal JS, image optimization)

## Lighthouse CI GitHub Actions Integration

### Workflow Addition

Add to `.github/workflows/ci.yml` after build step:

```yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun --config=lighthouserc.json
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### Configuration File

Create `lighthouserc.json` at project root:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": [
        "http://localhost/",
        "http://localhost/about/",
        "http://localhost/cv/",
        "http://localhost/projects/"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "uses-responsive-images": "off",
        "offscreen-images": "warn"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

## Sources

- **HIGH Confidence:** https://docs.astro.build/en/guides/markdown-content/ — Official Astro markdown documentation (verified March 15, 2026)
- **HIGH Confidence:** https://docs.astro.build/en/guides/images/ — Official Astro image optimization documentation (verified March 15, 2026)
- **HIGH Confidence:** https://docs.astro.build/en/guides/view-transitions/ — Official Astro view transitions documentation (verified March 15, 2026)
- **HIGH Confidence:** https://docs.astro.build/en/guides/integrations-guide/ — Official Astro integrations guide (verified March 15, 2026)
- **HIGH Confidence:** Package.json analysis — Verified existing Astro 6.0.4 installation includes all needed capabilities
- **MEDIUM Confidence:** Lighthouse CI documentation (v0.14.0 current stable) — Standard tool for performance validation
- **HIGH Confidence:** Astro built-in Sharp — Documented in Astro 6.0.4 image guide, no manual installation required

---
*Stack research for: Portfolio v1.0 milestone (CV, Projects, Performance, Animations, Images)*
*Researched: 2026-03-15*
*Researcher confidence: HIGH — All recommendations based on official Astro documentation for version 6.0.4*