# Architecture Research

**Domain:** Personal Portfolio Website (Static Site)
**Researched:** 2026-03-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser / User                        │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Request
┌────────────────────▼────────────────────────────────────┐
│                  Nginx Container                         │
│              (Serves Static Files)                       │
│                    Port 80/443                           │
└────────────────────┬────────────────────────────────────┘
                     │ Reads from
┌────────────────────▼────────────────────────────────────┐
│              Static Build Output                         │
│                  /dist/*.html                            │
│                  /dist/_astro/*.css                      │
│                  /dist/_astro/*.js                       │
│                  /dist/images/*                          │
└─────────────────────────────────────────────────────────┘
         ▲
         │ Build Process
┌────────┴────────────────────────────────────────────────┐
│              Astro Build System                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  Pages  │  │ Layouts │  │Component│  │ Styles  │   │
│  │ (.astro)│  │(.astro) │  │ (.astro)│  │  (.css) │   │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │
│       │            │            │            │          │
│       └────────────┴────────────┴────────────┘          │
│                    │                                     │
│            ┌───────▼────────┐                           │
│            │ Vite Bundler   │                           │
│            └───────┬────────┘                           │
└────────────────────┼────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                Source Files                              │
├─────────────────────────────────────────────────────────┤
│  src/                                                    │
│    ├── pages/          (Routes)                         │
│    ├── layouts/        (Page templates)                 │
│    ├── components/     (Reusable UI)                    │
│    ├── styles/         (Global CSS)                     │
│    └── assets/         (Images, fonts)                  │
│  public/               (Static assets)                  │
└─────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Pages | Define routes and top-level content | `.astro` files in `src/pages/` (index.astro, about.astro, cv.astro) |
| Layouts | Provide consistent page structure | `.astro` files in `src/layouts/` with `<slot />` for content injection |
| Components | Reusable UI elements (Header, Footer, etc.) | `.astro` files in `src/components/` |
| Styles | Visual presentation and design system | CSS files (global in `src/styles/`, scoped in components) |
| Assets | Images, fonts, icons | Optimized images in `src/assets/`, static files in `public/` |
| Build System | Transforms source to production output | Astro + Vite (bundles, minifies, optimizes) |
| Web Server | Serves static files to browsers | Nginx in Docker container |

## Recommended Project Structure

```
jake-reddy.com/
├── .github/
│   └── workflows/        # CI/CD pipelines
│       ├── ci.yml        # Linting, TypeScript, tests
│       └── release.yml   # Docker build and publish
├── src/
│   ├── pages/            # Routes (file-based routing)
│   │   ├── index.astro   # Home page (/)
│   │   ├── about.astro   # About page (/about)
│   │   └── cv.astro      # CV page (/cv)
│   ├── layouts/          # Page templates
│   │   └── Layout.astro  # Main layout with header, footer
│   ├── components/       # Reusable UI components
│   │   ├── Header.astro  # Fixed navigation header
│   │   ├── Footer.astro  # Page footer
│   │   └── ...           # Other components as needed
│   ├── styles/           # Global CSS
│   │   └── global.css    # Design system implementation
│   └── assets/           # Images (optimized by Astro)
│       └── images/       # Photos, graphics
├── public/               # Static assets (copied as-is)
│   ├── favicon.svg       # Site icon
│   └── robots.txt        # SEO directives
├── .dockerignore         # Files to exclude from Docker
├── Dockerfile            # Container build instructions
├── nginx.conf            # Nginx configuration
├── astro.config.mjs      # Astro configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

### Structure Rationale

- **src/pages/:** File-based routing — each `.astro` file becomes a route automatically. `index.astro` = `/`, `about.astro` = `/about`, etc.
- **src/layouts/:** Layout components wrap pages with common structure (header, footer, meta tags). Layouts use `<slot />` to inject page content.
- **src/components/:** Small, reusable Astro components. Automatically scoped styles prevent CSS conflicts.
- **src/styles/:** Global CSS for design system tokens (colors, typography, spacing grid). Imported in layout.
- **src/assets/:** Images processed by Astro's image optimization (resizing, format conversion, lazy loading).
- **public/:** Static files served directly without processing (favicon, robots.txt, PDFs).

## Architectural Patterns

### Pattern 1: Layout Composition

**What:** Wrap pages in a shared layout component to provide consistent structure (header, footer, meta tags).

**When to use:** Every page that needs common elements (navigation, SEO tags, global styles).

**Trade-offs:** 
- **Pro:** DRY — define header/footer once, used everywhere
- **Pro:** Consistent UX across all pages
- **Con:** Adds one level of component nesting

**Example:**
```astro
---
// src/layouts/Layout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <Header />
    <main>
      <slot /> <!-- Page content injected here -->
    </main>
    <Footer />
  </body>
</html>
```

Usage in page:
```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
---
<Layout title="About Jake" description="Background and philosophy">
  <h1>About Me</h1>
  <p>Content here...</p>
</Layout>
```

### Pattern 2: Scoped Component Styles

**What:** Write CSS directly in `<style>` tags within components. Astro automatically scopes styles to that component only.

**When to use:** Component-specific styling that shouldn't affect other components.

**Trade-offs:**
- **Pro:** No CSS class name conflicts (automatic scoping)
- **Pro:** Co-located styles with markup (easier maintenance)
- **Con:** Slightly verbose for very simple components

**Example:**
```astro
---
// src/components/Button.astro
interface Props {
  text: string;
}
const { text } = Astro.props;
---
<button class="btn">{text}</button>

<style>
  /* Scoped to this component only */
  .btn {
    padding: 8px 16px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
  }
  .btn:hover {
    background: #333;
  }
</style>
```

### Pattern 3: Static-First with Progressive Enhancement

**What:** Build entirely static HTML/CSS, add JavaScript only for interactivity (via Islands Architecture).

**When to use:** Portfolio sites, content sites, marketing pages where performance is critical.

**Trade-offs:**
- **Pro:** Excellent performance (no JavaScript by default)
- **Pro:** SEO-friendly (fully rendered HTML)
- **Con:** Interactive features require explicit `client:*` directives

**Example:**
```astro
---
// src/pages/index.astro
// Static by default — no JavaScript sent to browser
---
<Layout title="Home">
  <h1>Welcome</h1>
  <p>This content is pre-rendered to HTML.</p>
  
  <!-- Only this component gets JavaScript: -->
  <ImageCarousel client:load />
</Layout>
```

## Data Flow

### Build-Time Flow (Static Site Generation)

```
Source Files (.astro, .css, images)
    ↓
Astro Compiler
    ↓ (processes components)
Vite Bundler
    ↓ (optimizes assets)
dist/ folder (static HTML, CSS, JS, images)
    ↓ (copied into container)
Docker Image
    ↓ (deployed)
Nginx serves files
    ↓ (HTTP response)
Browser renders page
```

### Request Flow (Production)

```
User navigates to /about
    ↓
Nginx receives request
    ↓
Nginx reads /dist/about.html
    ↓
Nginx serves HTML + assets (CSS, images)
    ↓
Browser renders page (no server-side processing)
```

### Key Data Flows

1. **Page Rendering:** Pages are compiled to static HTML at build time. No runtime rendering.
2. **Style Processing:** CSS is bundled, minified, and split into chunks. Shared styles between pages are extracted for caching.
3. **Image Optimization:** Images in `src/assets/` are resized, optimized, and converted to modern formats (WebP, AVIF) at build time.
4. **Component Composition:** Layouts and components are composed at build time into final HTML output.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-10 pages | Monolithic structure works perfectly. Single layout, shared components. |
| 10-100 pages | Consider page-specific layouts if designs diverge. Use content collections for blog posts or repeated content. |
| 100+ pages | Implement content collections with build-time querying. Consider on-demand rendering for rarely-accessed pages. |

### Scaling Priorities

1. **First bottleneck:** Build time (for 100+ pages). Solution: Use Astro's on-demand rendering or incremental builds.
2. **Second bottleneck:** Docker image size (many images). Solution: Optimize images aggressively, use CDN for large assets.

**For this portfolio (3 pages):** No scaling concerns. Standard static site generation is optimal.

## Anti-Patterns

### Anti-Pattern 1: Client-Side Rendering for Static Content

**What people do:** Add React/Vue components with `client:load` for static content (text, images).

**Why it's wrong:** Ships unnecessary JavaScript, slower page loads, worse SEO, no benefit for static content.

**Do this instead:** Use `.astro` components for static content. They render to pure HTML with zero JavaScript.

**Example:**
```astro
<!-- ❌ Bad: Sends React runtime for static content -->
<MyReactComponent client:load>
  <h1>Static text</h1>
</MyReactComponent>

<!-- ✅ Good: Pure HTML, no JavaScript -->
<h1>Static text</h1>
```

### Anti-Pattern 2: Global CSS Without Scoping

**What people do:** Write all CSS in global files without component scoping, use generic class names like `.button`, `.card`.

**Why it's wrong:** CSS conflicts as site grows, hard to maintain, difficult to delete unused styles.

**Do this instead:** Use scoped styles in components for component-specific CSS. Use global styles only for design system tokens (colors, typography, spacing).

**Example:**
```astro
<!-- ❌ Bad: Global CSS everywhere -->
<style is:global>
  .button { ... }  /* Conflicts with other .button classes */
</style>

<!-- ✅ Good: Scoped styles -->
<style>
  button { ... }  /* Only affects this component */
</style>
```

### Anti-Pattern 3: Ignoring Image Optimization

**What people do:** Put images in `public/` folder and reference directly, no optimization.

**Why it's wrong:** Large image files slow page loads, no responsive sizing, no modern formats (WebP, AVIF).

**Do this instead:** Put images in `src/assets/`, import them in components. Astro automatically optimizes.

**Example:**
```astro
<!-- ❌ Bad: No optimization -->
<img src="/public/photo.jpg" alt="Photo" />

<!-- ✅ Good: Automatic optimization -->
---
import { Image } from 'astro:assets';
import photo from '../assets/images/photo.jpg';
---
<Image src={photo} alt="Photo" />
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Actions | YAML workflows in `.github/workflows/` | Runs CI on push, builds Docker image on tag |
| GitHub Container Registry | Docker push via `docker/build-push-action` | Triggered by release tags (e.g., v1.0.0) |
| DigitalOcean (infrastructure) | Docker image pulled by external docker-compose | Out of scope for this project |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pages ↔ Layouts | Props passed to layout component | Pages wrapped in layout via component nesting |
| Layouts ↔ Components | Component imports | Layout imports and renders Header, Footer |
| Components ↔ Styles | Scoped `<style>` tags | CSS scoped to component by default |
| Pages ↔ Assets | Import statements | Images imported from `src/assets/` |

## Docker Deployment Architecture

### Multi-Stage Build Pattern

**Recommended for this project:** Multi-stage build separates build dependencies from runtime, reducing final image size.

```dockerfile
# Stage 1: Build
FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

**Why multi-stage:**
- **Build stage** includes Node.js, npm, TypeScript compiler, all dev dependencies (~500MB+)
- **Runtime stage** only includes Nginx and built files (~50MB)
- Final image size drastically smaller, faster pulls, smaller security surface

### Nginx Configuration

Nginx serves static files and handles routing for single-page-app-style URLs (though not needed for this multi-page site).

**Key configuration:**
- `gzip on` — Compress text files (HTML, CSS, JS) for faster transfer
- `try_files $uri $uri/index.html =404` — Serve index.html for directory requests
- Error page handling — Serve custom 404 page

## Suggested Build Order

**Phase order for implementation:**

1. **Foundation Phase**
   - **Why first:** Establishes project structure, tooling, CI pipeline
   - **Components:** Astro project scaffold, TypeScript config, GitHub Actions setup, Dockerfile, Docker build
   - **Build order:**
     1. Initialize Astro project (`npm create astro@latest`)
     2. Configure TypeScript (`tsconfig.json`)
     3. Create Dockerfile + `.dockerignore`
     4. Set up GitHub Actions workflows (CI, release)
     5. Verify Docker build locally
   - **Dependency:** None — this is the foundation

2. **Design System Phase**
   - **Why second:** Establishes visual language before building components
   - **Components:** Global CSS, design tokens, typography, spacing grid
   - **Build order:**
     1. Create `src/styles/global.css`
     2. Define CSS variables (colors, fonts, spacing)
     3. Import design system fonts (JetBrains Mono, IBM Plex Sans)
     4. Implement base styles (reset, typography, layout primitives)
   - **Dependency:** Needs Foundation Phase (project structure)

3. **Layout & Navigation Phase**
   - **Why third:** Shared structure needed before building pages
   - **Components:** Layout component, Header, Footer
   - **Build order:**
     1. Create `src/layouts/Layout.astro` (page wrapper)
     2. Build `src/components/Header.astro` (fixed navigation)
     3. Build `src/components/Footer.astro`
     4. Wire up global styles import in layout
   - **Dependency:** Needs Design System Phase (styles to apply)

4. **Pages Phase**
   - **Why fourth:** Content pages use layout and components
   - **Components:** Home, About, CV pages
   - **Build order:**
     1. Create `src/pages/index.astro` (Home)
     2. Create `src/pages/about.astro` (About)
     3. Create `src/pages/cv.astro` (CV)
     4. Add page-specific content and styles
   - **Dependency:** Needs Layout & Navigation Phase (layout to wrap pages)

5. **Polish & Deployment Phase**
   - **Why last:** Optimization and deployment require complete site
   - **Components:** Image optimization, responsive design, Docker publish
   - **Build order:**
     1. Optimize images (compress, convert to WebP)
     2. Test responsive layouts (mobile, tablet, desktop)
     3. Tag release (triggers Docker build)
     4. Verify Docker image in registry
   - **Dependency:** Needs Pages Phase (complete site to deploy)

## Sources

- [Astro Project Structure (Official Docs)](https://docs.astro.build/en/basics/project-structure/) — HIGH confidence
- [Astro Content Collections (Official Docs)](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence
- [Astro Islands Architecture (Official Docs)](https://docs.astro.build/en/concepts/islands/) — HIGH confidence
- [Astro Docker Recipe (Official Docs)](https://docs.astro.build/en/recipes/docker/) — HIGH confidence
- [Astro Styling Guide (Official Docs)](https://docs.astro.build/en/guides/styling/) — HIGH confidence

---
*Architecture research for: Personal Portfolio Website with Astro + Docker*
*Researched: 2026-03-12*
