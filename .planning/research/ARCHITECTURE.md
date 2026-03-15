# Architecture Patterns: Portfolio with CV, Projects, Performance, Animations, Images

**Domain:** Portfolio website with content management
**Researched:** 2026-03-15
**Confidence:** HIGH

## Recommended Architecture

Integration architecture for v1.0 features (CV, Projects, Performance, Animations, Images) into existing Astro 6.0.4 static site with Tailwind 4, Docker multi-stage build, and mirror-logic test pattern.

### System Overview

```
Existing Foundation (v0.1):
├── src/pages/*.astro          → Route handlers
├── src/layouts/BaseLayout.astro → Shared page structure
├── src/components/layout/*     → Header, Footer
├── src/styles/theme.css        → Tailwind 4 design tokens
└── Docker multi-stage build    → Node build → Nginx runtime

New Additions (v1.0):
├── src/content/config.ts       → Content collections schema (NEW)
├── src/content/cv/*.json       → CV data (NEW)
├── src/content/projects/*.md   → Project markdown (NEW)
├── src/pages/cv.astro          → CV page route (NEW)
├── src/pages/projects/         → Projects routes (NEW)
├── src/components/cv/*         → CV components (NEW)
├── src/components/projects/*   → Project components (NEW)
├── src/assets/images/          → Optimized images (NEW)
└── Astro built-in optimization → Performance (ENHANCED)
```

---

## Integration Points

### 1. Content Collections (Markdown CMS)

**Pattern:** Astro's built-in Content Collections API with `glob()` loader
**Confidence:** HIGH (Official Astro documentation, current version)

#### Where It Plugs In

**New file:** `src/content.config.ts`
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects collection: markdown files with frontmatter
const projects = defineCollection({
  loader: glob({ 
    pattern: '**/*.md', 
    base: './src/content/projects' 
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    featured: z.boolean().default(false),
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    publishedDate: z.coerce.date(),
    coverImage: z.string().optional(),
  }),
});

// CV collection: structured JSON data
const cv = defineCollection({
  loader: glob({ 
    pattern: '**/*.json', 
    base: './src/content/cv' 
  }),
  schema: z.object({
    experience: z.array(z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string(),
      technologies: z.array(z.string()),
    })),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      year: z.string(),
    })),
    skills: z.object({
      languages: z.array(z.string()),
      frameworks: z.array(z.string()),
      tools: z.array(z.string()),
    }),
  }),
});

export const collections = { projects, cv };
```

**Integration notes:**
- Lives in `src/content.config.ts` (Astro convention)
- Collections defined once, queried anywhere
- TypeScript types auto-generated
- Zod validation at build time
- Works with existing mirror-logic test pattern (test data via inline functions, not .astro imports)

#### Data Flow

```
Content files (markdown/JSON)
  ↓
Content Collections API validates with Zod schema
  ↓
Type-safe data available via getCollection() / getEntry()
  ↓
Components render validated data
  ↓
Static HTML at build time
```

**Source:** https://docs.astro.build/en/guides/content-collections/ (Astro 6.x official docs)

---

### 2. Page Routes (CV & Projects)

**Pattern:** File-based routing with dynamic routes for projects
**Confidence:** HIGH

#### CV Page

**New file:** `src/pages/cv.astro`
```astro
---
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ExperienceSection from '../components/cv/ExperienceSection.astro';
import EducationSection from '../components/cv/EducationSection.astro';
import SkillsSection from '../components/cv/SkillsSection.astro';

const cvData = await getEntry('cv', 'main');
---
<BaseLayout title="CV | Jake Reddy" description="...">
  <main class="max-w-[1200px] mx-auto px-4 py-10 md:px-8 md:py-16">
    <h1 class="font-display text-4xl font-bold mb-8">CV</h1>
    <ExperienceSection experience={cvData.data.experience} />
    <EducationSection education={cvData.data.education} />
    <SkillsSection skills={cvData.data.skills} />
  </main>
</BaseLayout>
```

**Integration notes:**
- Uses existing `BaseLayout.astro` (fixed header pattern already works)
- Follows established page structure (max-width, spacing grid)
- Query data in frontmatter, render in template
- Static generation at build time

#### Projects Pages

**New file:** `src/pages/projects/index.astro` (List view)
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/projects/ProjectCard.astro';

const allProjects = (await getCollection('projects'))
  .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
const featuredProjects = allProjects.filter(p => p.data.featured);
---
<BaseLayout title="Projects | Jake Reddy" description="...">
  <section class="max-w-[1200px] mx-auto px-4 py-10">
    <h1 class="font-display text-4xl font-bold mb-8">Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {allProjects.map(project => (
        <ProjectCard project={project} />
      ))}
    </div>
  </section>
</BaseLayout>
```

**New file:** `src/pages/projects/[id].astro` (Detail view)
```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---
<BaseLayout title={project.data.title} description={project.data.description}>
  <article class="max-w-[1200px] mx-auto px-4 py-10">
    <h1 class="font-display text-4xl font-bold mb-4">{project.data.title}</h1>
    <p class="text-[#595959] mb-8">{project.data.description}</p>
    <Content />
  </article>
</BaseLayout>
```

**Integration notes:**
- `getStaticPaths()` generates routes at build time (Astro static site pattern)
- `render()` transforms markdown body to HTML
- `<Content />` component outputs rendered markdown
- Follows existing layout patterns (BaseLayout, spacing grid, typography)

**Source:** https://docs.astro.build/en/guides/content-collections/#generating-routes-from-content

---

### 3. Image Optimization

**Pattern:** Astro's built-in `<Image />` component + `astro:assets`
**Confidence:** HIGH (Official Astro feature, production-ready)

#### Where It Plugs In

**Store images:** `src/assets/images/` (local images, processed at build time)

**Use in components:**
```astro
---
import { Image } from 'astro:assets';
import projectImage from '../../assets/images/project-screenshot.png';
---
<Image 
  src={projectImage} 
  alt="Project screenshot" 
  width={800} 
  height={600}
  format="webp"
  quality={85}
/>
```

**Integration notes:**
- `<Image />` automatically optimizes: WebP conversion, sizing, lazy loading
- Generates `srcset` for responsive images
- Width/height prevent CLS (Cumulative Layout Shift)
- Images processed at build time (Docker build stage includes Node.js)
- Output in `dist/` alongside HTML

**For markdown content (projects):**
```markdown
![Project screenshot](../../assets/images/screenshot.png)
```
Astro automatically processes images in markdown via content collections.

**Optimization features:**
- Format conversion (PNG → WebP/AVIF)
- Automatic resizing
- Lazy loading (`loading="lazy"`)
- CLS prevention (width/height inferred)
- Sharp image service (default, no config needed)

**Source:** https://docs.astro.build/en/guides/images/

---

### 4. Performance Optimization

**Pattern:** Astro's built-in static generation + minimal JavaScript
**Confidence:** HIGH

#### Existing Performance Advantages

Astro already provides:
- **Zero JavaScript by default** — No hydration unless explicitly needed
- **Static HTML generation** — All routes pre-rendered at build
- **Automatic code splitting** — Per-page bundles
- **CSS inlining** — Critical CSS inlined, rest async loaded

#### Additional Optimizations for Lighthouse 90+

**Build-time optimizations (already built-in):**
1. **HTML minification** — Enabled by default in production builds
2. **CSS minification** — Tailwind 4 production build purges unused styles
3. **Image optimization** — `<Image />` component handles this
4. **Font preloading** — Already configured in `BaseLayout.astro`:
   ```astro
   <Font cssVariable="--font-jetbrains-mono" preload />
   <Font cssVariable="--font-ibm-plex-sans" preload />
   ```

**Runtime optimizations:**
1. **Nginx gzip compression** — Add to `nginx.conf`:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;
   gzip_comp_level 6;
   ```

2. **Cache headers** — Add to `nginx.conf`:
   ```nginx
   location ~* \.(jpg|jpeg|png|webp|avif|gif|svg|css|js|woff2)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

3. **Preconnect to Google Fonts** — Add to `BaseLayout.astro`:
   ```astro
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   ```

**No additional dependencies required.** Astro's static output is already optimized.

**Source:** https://docs.astro.build/en/develop-and-build/ (Build section confirms automatic optimizations)

---

### 5. Animations

**Pattern:** CSS transitions with `prefers-reduced-motion` media query
**Confidence:** HIGH

#### Where It Plugs In

**Global animation utilities:** `src/styles/global.css`
```css
/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Default transitions for interactive elements */
@media (prefers-reduced-motion: no-preference) {
  a,
  button {
    transition: color 200ms ease, background-color 200ms ease, border-color 200ms ease;
  }
}
```

**Component-level animations:**
```astro
---
// src/components/projects/ProjectCard.astro
---
<article class="project-card">
  <!-- content -->
</article>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .project-card {
      transition: transform 200ms ease, box-shadow 200ms ease;
    }
    
    .project-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
</style>
```

**Integration notes:**
- CSS-only animations (no JavaScript required)
- Respects system accessibility preferences
- Fits Nordic minimalist design (subtle, purposeful)
- No additional dependencies (uses native CSS)

**Animation targets:**
- Navigation links (color transitions)
- Project cards (hover lift effect)
- Button interactions (background color transitions)
- Page load fade-ins (optional, test with design system first)

**Anti-patterns to avoid:**
- No auto-playing animations
- No infinite animations
- No animations blocking interaction
- No animations without `prefers-reduced-motion` guard

---

## Component Boundaries

### New Components Needed

| Component | Responsibility | Location | Depends On |
|-----------|---------------|----------|------------|
| **ExperienceSection.astro** | Render CV work experience list | `src/components/cv/` | CV data from content collections |
| **EducationSection.astro** | Render CV education list | `src/components/cv/` | CV data from content collections |
| **SkillsSection.astro** | Render CV skills grouped by category | `src/components/cv/` | CV data from content collections |
| **ProjectCard.astro** | Display project summary in grid | `src/components/projects/` | Project data from content collections |
| **ProjectDetail.astro** | Render full project markdown content | `src/components/projects/` | Project data + rendered markdown |

### Modified Components

| Component | Modification | Reason |
|-----------|-------------|--------|
| **Header.astro** | Add nav links for `/cv` and `/projects` | New pages need navigation |
| **BaseLayout.astro** | (No changes needed) | Already supports new pages |
| **theme.css** | Add missing `--color-secondary` and `--color-border` tokens | Fix tech debt from v0.1 |

### Unchanged Components

- `Footer.astro` — No changes needed
- `Button.astro` — Reusable across new pages as-is

---

## Data Flow

### Content Collections Data Flow

```
1. Author writes content
   ├── src/content/cv/main.json (CV data)
   └── src/content/projects/*.md (Project markdown files)

2. Build time: Astro validates schemas
   ├── src/content.config.ts defines schemas
   └── Zod validates frontmatter + data structures

3. Pages query collections
   ├── getCollection('projects') → array of all projects
   ├── getEntry('cv', 'main') → CV data object
   └── render(project) → { Content } component

4. Components render data
   ├── Type-safe props from collections
   └── Markdown rendered to HTML via <Content />

5. Static HTML output
   └── dist/ contains pre-rendered pages
```

### Image Processing Flow

```
1. Import image in component
   import screenshot from '../../assets/images/screenshot.png';

2. Build time: Astro optimizes image
   ├── Resize to specified dimensions
   ├── Convert to WebP/AVIF
   └── Generate srcset for responsive images

3. Output optimized files
   └── dist/_astro/screenshot.hash.webp

4. HTML includes optimized references
   <img src="/_astro/screenshot.hash.webp" 
        srcset="..." 
        loading="lazy" 
        width="800" 
        height="600" />
```

---

## Build Order

**Build pipeline:** Node.js build → Static files → Nginx runtime (existing Docker multi-stage pattern)

### Build Steps (Sequential)

1. **Install dependencies** (Stage: `build-deps`)
   ```bash
   npm install
   ```

2. **Content validation** (During `astro build`)
   - Load `src/content.config.ts`
   - Validate all collections against schemas
   - Fail build if validation errors

3. **Image optimization** (During `astro build`)
   - Process all `<Image />` components
   - Process images in markdown files
   - Generate optimized files in `dist/_astro/`

4. **Page generation** (During `astro build`)
   - Generate static routes from `src/pages/`
   - Generate dynamic routes from `getStaticPaths()`
   - Render markdown content via `render()`

5. **Asset bundling** (During `astro build`)
   - Bundle and minify CSS
   - Copy `public/` assets
   - Generate HTML with inlined critical CSS

6. **Output to dist/** (After build completes)
   ```
   dist/
   ├── index.html
   ├── about.html
   ├── cv.html
   ├── projects/
   │   ├── index.html
   │   └── [project-id].html
   └── _astro/
       ├── *.css
       ├── *.webp (optimized images)
       └── *.js (minimal, if any)
   ```

7. **Copy to Nginx runtime** (Stage: `runtime`)
   ```dockerfile
   COPY --from=build /app/dist /usr/share/nginx/html/
   ```

**No changes to existing Docker build process.** Content collections and image optimization happen during `npm run build` step (already in Dockerfile).

---

## File Structure

### Proposed Directory Structure

```
src/
├── content/                    # NEW: Content collections
│   ├── config.ts               # Collection schemas (projects, cv)
│   ├── cv/
│   │   └── main.json           # CV data (experience, education, skills)
│   └── projects/
│       ├── project-1.md        # Project markdown files
│       ├── project-2.md
│       └── project-3.md
│
├── assets/                     # NEW: Optimized images
│   └── images/
│       ├── projects/
│       │   ├── project-1-screenshot.png
│       │   └── project-2-screenshot.png
│       └── cv/
│           └── profile-photo.jpg
│
├── components/
│   ├── layout/                 # Existing
│   │   ├── Header.astro        # MODIFIED: Add CV/Projects nav links
│   │   └── Footer.astro
│   ├── ui/                     # Existing
│   │   └── Button.astro
│   ├── cv/                     # NEW: CV components
│   │   ├── ExperienceSection.astro
│   │   ├── EducationSection.astro
│   │   └── SkillsSection.astro
│   └── projects/               # NEW: Project components
│       ├── ProjectCard.astro
│       └── ProjectDetail.astro
│
├── layouts/
│   └── BaseLayout.astro        # Existing, no changes
│
├── pages/
│   ├── index.astro             # Existing
│   ├── about.astro             # Existing
│   ├── cv.astro                # NEW: CV page
│   └── projects/
│       ├── index.astro         # NEW: Projects list
│       └── [id].astro          # NEW: Project detail (dynamic route)
│
└── styles/
    ├── global.css              # MODIFIED: Add animation utilities
    └── theme.css               # MODIFIED: Add --color-secondary, --color-border
```

### Test Files (Mirror-Logic Pattern)

Following existing pattern (data helpers in `.test.ts`, logic mirrored in `.astro`):

```
src/
└── pages/
    ├── cv.test.ts              # NEW: Test CV data access helpers
    └── projects/
        ├── index.test.ts       # NEW: Test project list helpers
        └── [id].test.ts        # NEW: Test project detail helpers
```

**Example test pattern:**
```typescript
// src/pages/cv.test.ts
import { describe, it, expect } from 'vitest';

// Helper function to format work experience (mirrored in cv.astro)
function formatExperience(exp: any) {
  const endDate = exp.endDate || 'Present';
  return `${exp.role} at ${exp.company} (${exp.startDate} - ${endDate})`;
}

describe('CV page helpers', () => {
  it('formats experience with end date', () => {
    const exp = {
      company: 'Example Corp',
      role: 'Developer',
      startDate: '2020',
      endDate: '2022',
    };
    expect(formatExperience(exp)).toBe('Developer at Example Corp (2020 - 2022)');
  });

  it('formats current experience without end date', () => {
    const exp = {
      company: 'Current Corp',
      role: 'Senior Developer',
      startDate: '2022',
    };
    expect(formatExperience(exp)).toBe('Senior Developer at Current Corp (2022 - Present)');
  });
});
```

---

## Performance Budget

**Target:** Lighthouse score 90+ across all metrics

### Expected Scores (Based on Astro Static Architecture)

| Metric | Target | Confidence | Rationale |
|--------|--------|-----------|-----------|
| **Performance** | 95-100 | HIGH | Static HTML, minimal JS, optimized images, CDN fonts |
| **Accessibility** | 95-100 | HIGH | Semantic HTML, WCAG AAA contrast, alt text enforced |
| **Best Practices** | 95-100 | HIGH | HTTPS (deployment), no console errors, modern formats |
| **SEO** | 95-100 | HIGH | Meta tags, semantic HTML, sitemap (add later) |

### Performance Optimizations Applied

1. **Zero hydration overhead** — No client-side framework JavaScript
2. **Optimized images** — WebP/AVIF, lazy loading, responsive srcset
3. **Minimal CSS** — Tailwind purges unused styles, critical CSS inlined
4. **Fast fonts** — Preloaded Google Fonts, font-display: swap
5. **Static output** — No server-side rendering latency
6. **Nginx caching** — Static assets cached with immutable headers

### Known Bottlenecks (None Expected)

- **Build time may increase** with image optimization (acceptable tradeoff)
- **First Contentful Paint** may vary by network (fonts from Google CDN)

---

## Testing Strategy

**Pattern:** Mirror-logic test pattern (existing, proven in v0.1)

### What to Test

1. **Content collection schemas** (Zod validation)
   - CV data structure matches schema
   - Project frontmatter matches schema
   - Invalid data fails build

2. **Data transformation helpers** (Mirror-logic pattern)
   - Format functions for dates, lists, etc.
   - Test helpers in `.test.ts`, mirror in `.astro`

3. **Route generation** (Static paths)
   - `getStaticPaths()` generates expected routes
   - All projects have corresponding pages

4. **Image optimization** (Build output validation)
   - Check `dist/_astro/` for optimized images
   - Verify WebP/AVIF formats generated

5. **Performance** (Lighthouse CI)
   - Run Lighthouse in CI after build
   - Fail if score < 90 in any category

### Test Coverage

```
src/
├── pages/
│   ├── cv.test.ts              # CV data helpers
│   └── projects/
│       ├── index.test.ts       # Project list helpers
│       └── [id].test.ts        # Project detail helpers
│
└── components/
    ├── cv/
    │   └── ExperienceSection.test.ts  # Format experience data
    └── projects/
        └── ProjectCard.test.ts        # Format project card data
```

**No component rendering tests** (mirror-logic pattern avoids this complexity).

---

## Anti-Patterns to Avoid

### Content Collections

**❌ DON'T:** Import `.astro` files in tests
**✅ DO:** Test data helpers inline, mirror logic in `.astro`

**❌ DON'T:** Store content in `src/data/` as raw imports
**✅ DO:** Use content collections (`src/content/`) for CMS-like data

**❌ DON'T:** Manually type frontmatter
**✅ DO:** Define schemas in `src/content.config.ts`, get types for free

### Images

**❌ DON'T:** Use `<img>` for local images without optimization
**✅ DO:** Use `<Image />` component for local images

**❌ DON'T:** Store images in `public/` if they need optimization
**✅ DO:** Store in `src/assets/` for build-time optimization

**❌ DON'T:** Forget `alt` attributes (Astro enforces this)
**✅ DO:** Provide descriptive alt text for accessibility

### Performance

**❌ DON'T:** Add client-side JavaScript unless necessary
**✅ DO:** Use static HTML and CSS-only interactions

**❌ DON'T:** Load all images eagerly
**✅ DO:** Use `loading="lazy"` (default in `<Image />`)

**❌ DON'T:** Skip `prefers-reduced-motion` checks
**✅ DO:** Guard all animations with media query

### Animations

**❌ DON'T:** Use JavaScript for simple transitions
**✅ DO:** Use CSS transitions for performance

**❌ DON'T:** Animate without respecting user preferences
**✅ DO:** Always include `@media (prefers-reduced-motion: reduce)`

**❌ DON'T:** Use infinite animations or auto-play
**✅ DO:** Use user-triggered, purposeful animations

---

## Scalability Considerations

| Concern | At 5 Projects | At 20 Projects | At 100 Projects |
|---------|--------------|----------------|-----------------|
| **Build time** | ~10s | ~15-20s | ~30-45s (image optimization bottleneck) |
| **Content management** | Manual markdown | Manual markdown | Consider CMS integration (out of scope for v1.0) |
| **Image storage** | Local (`src/assets/`) | Local | Consider CDN (Cloudinary, ImageKit) |
| **Route generation** | Static paths | Static paths | Static paths (Astro handles thousands) |

**v1.0 scope (3-5 projects):** No scalability concerns. Current architecture sufficient.

**Future considerations (v2+):**
- CMS integration (Sanity, Contentful) for non-technical content updates
- Image CDN for larger asset libraries
- Pagination for project list (20+ projects)

---

## Sources

**HIGH confidence (Official Astro documentation, current version):**
- Content Collections: https://docs.astro.build/en/guides/content-collections/ (Astro 6.x)
- Images: https://docs.astro.build/en/guides/images/ (Astro 6.x)
- Build & Deploy: https://docs.astro.build/en/develop-and-build/ (Astro 6.x)

**MEDIUM confidence (Standard web practices):**
- CSS animations with `prefers-reduced-motion`: MDN Web Docs standard
- Lighthouse performance metrics: Google Web Vitals documentation
- Nginx optimization: Standard static site configuration patterns

**Existing codebase (v0.1):**
- Docker multi-stage build: Proven pattern in current `Dockerfile`
- Mirror-logic tests: Established pattern in `src/pages/index.test.ts`
- BaseLayout structure: Fixed header pattern working across Home/About pages

---
*Architecture research for v1.0 milestone: CV, Projects, Performance, Animations, Images*
*Researched: 2026-03-15*
