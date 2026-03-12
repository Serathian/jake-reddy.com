# Stack Research

**Domain:** Personal Developer Portfolio Website
**Researched:** 2026-03-12
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | ^6.0.4 | Static site generator | Optimal for content-focused sites with minimal JS, fast builds, excellent DX. Astro 6 is current stable (March 2026). Industry standard for portfolio sites. |
| Node.js | >=22.12.0 | Runtime environment | Required by Astro 6. LTS version ensures stability and security patches. |
| TypeScript | ^5.x | Type safety | Built into Astro, provides excellent DX and catches errors at build time. No configuration needed with Astro 6's new defaults. |
| Vite | (bundled) | Build tool | Bundled with Astro, provides fast HMR, optimized builds, and modern asset handling. No separate installation needed. |

### Styling

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Plain CSS | (native) | Component styling | Default recommendation for portfolio sites. Astro's scoped styles prevent conflicts, no build configuration needed. |
| CSS Variables | (native) | Design tokens | Native browser support, perfect for design systems like Nordic minimalism. Pass variables via `define:vars` directive. |
| Sass/SCSS | ^1.x (optional) | CSS preprocessor | Only if you need nesting/mixins. Simple `npm install sass` + `<style lang="scss">`. Not necessary for this project. |

**Rationale for skipping Tailwind:** The project uses a pre-defined Nordic design system with custom design tokens (8px grid, specific typography, exact colors). Plain CSS with variables gives full control without Tailwind's utility class overhead. Tailwind 4 is available via `@tailwindcss/vite` but unnecessary for this use case.

### Docker & Deployment

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Docker | latest | Containerization | Industry standard, required per project constraints. Astro official recipe available. |
| Nginx | alpine | Web server | Lightweight (5-10MB base image), proven for static files, official Astro Docker recipe uses it. |
| Multi-stage build | (pattern) | Optimization | Reduces final image size by 60-70%, separates build/runtime dependencies. Official Astro pattern. |

### CI/CD

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GitHub Actions | (native) | CI/CD pipeline | Already integrated with GitHub, no additional service needed. Free for public repos, excellent Astro support. |
| GitHub Container Registry | (native) | Docker registry | ghcr.io integrated with GitHub, no external service, automatic auth, free for public repos. |

### Testing

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vitest | ^2.x | Unit/integration tests | Vite-native, fast, official Astro recommendation. Use `getViteConfig()` helper for zero-config setup. |
| Playwright | ^1.x | E2E tests | Cross-browser testing, official Astro docs recommend. Mature, Microsoft-backed, excellent DX. |
| @astrojs/check | (bundled) | Type checking | Built into Astro CLI, runs TypeScript checks without separate tsc. Use in CI. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Optional but recommended. Use `eslint-plugin-astro` for Astro-specific rules. |
| Prettier | Code formatting | Optional. Use `prettier-plugin-astro` if needed. Astro has opinions on formatting. |
| astro-imagetools | Image optimization | Consider if adding images beyond basic Sharp processing. |

## Installation

```bash
# Core - Initialize Astro project
npm create astro@latest

# Testing (if needed)
npm install -D vitest @vitest/ui
npm install -D @playwright/test

# Docker - No installation needed, use Dockerfile

# CI/CD - GitHub Actions configured via .github/workflows/*.yml
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro | Next.js | Need heavy client-side interactivity, React ecosystem required, or hybrid SSR/SSG patterns. Overkill for portfolio. |
| Astro | Gatsby | Never. Gatsby is effectively deprecated (2023), community has moved to Astro/Next. |
| Vitest | Jest | Using older projects with Jest infrastructure. Vitest is faster, better Vite integration, similar API. |
| Playwright | Cypress | Preference for Cypress API or existing Cypress infrastructure. Playwright is faster, better cross-browser. |
| Nginx | Apache | Need .htaccess or specific Apache modules. Nginx is lighter and faster for static files. |
| Plain CSS | Tailwind | Building multiple sites with shared utility classes, or team prefers Tailwind. Not needed here. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Astro.glob() | Removed in Astro 6. | `import.meta.glob()` (Vite native) or content collections |
| CommonJS config | Removed in Astro 6. | ESM config files (.mjs or type: module) |
| %xx% in routes | Removed in Astro 6. | Use standard URL encoding patterns |
| Tailwind 3 | Legacy, superseded by Tailwind 4. | Tailwind 4 (via @tailwindcss/vite) or plain CSS |
| CJS packages | Not ESM-compatible, cause build issues. | ESM packages or configure vite.ssr.noExternal |
| Node < 22.12.0 | Astro 6 requirement. | Node 22.12.0+ (LTS) |

## Stack Patterns by Variant

**If building blog functionality later:**
- Add `@astrojs/mdx` for enhanced Markdown
- Use content collections for type-safe posts
- Consider RSS feed via `@astrojs/sitemap`

**If adding authentication:**
- Use `astro:actions` for form handling
- Integrate auth provider (Auth.js, Clerk, etc.)
- Consider session management with `astro:session`

**If deploying to Vercel/Netlify instead:**
- Remove Docker configuration
- Add platform-specific adapter: `@astrojs/vercel` or `@astrojs/netlify`
- Keep GitHub Actions for pre-deployment checks

**If adding CMS:**
- Content collections work with headless CMS (Contentful, Sanity, etc.)
- Use content loaders for external data
- Consider `astro:db` for structured data

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| astro@6.0.4 | Node >=22.12.0 | Astro 6 requires Node 22+. Earlier Node versions not supported. |
| vitest@2.x | astro@6.x | Use `getViteConfig()` helper from Astro config |
| @playwright/test@1.x | astro@6.x | No special compatibility concerns |
| TypeScript@5.x | astro@6.x | Astro 6 includes updated tsconfig.json defaults |

## Docker Configuration

### Recommended Dockerfile (Static Site with Nginx)

```dockerfile
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
```

### Nginx Configuration

```nginx
worker_processes 1;

events {
  worker_connections 1024;
}

http {
  server {
    listen 8080;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;
    include /etc/nginx/mime.types;

    gzip on;
    gzip_min_length 1000;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    error_page 404 /404.html;
    location = /404.html {
      root /usr/share/nginx/html;
      internal;
    }

    location / {
      try_files $uri $uri/index.html =404;
    }
  }
}
```

## GitHub Actions Workflows

### Recommended Pipeline Structure

1. **Lint & Type Check** (on PR + push)
   - `npm run lint`
   - `astro check` (TypeScript)
   - `npm run build` (catch build errors)

2. **Test** (on PR + push)
   - Vitest unit tests
   - Playwright E2E tests (optional for v1)

3. **Build Docker Image** (on tag)
   - Build multi-arch image (amd64, arm64)
   - Push to ghcr.io
   - Tag with semantic version

4. **Create Release** (on tag)
   - GitHub Release with changelog
   - Link to Docker image

## CI/CD Example Workflow Files

### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx astro check
      - run: npm run build

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
```

### .github/workflows/release.yml
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

## TypeScript Configuration

Astro 6 provides modern TypeScript defaults. No custom tsconfig needed for basic setup. Default includes:

- `strict: true`
- `esModuleInterop: true`
- `skipLibCheck: true`
- `moduleResolution: "bundler"`
- `jsx: "react-jsx"` (for framework components)

## Testing Setup

### Vitest Configuration (vitest.config.ts)

```typescript
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

### Playwright Configuration (playwright.config.ts)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview',
    port: 4321,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## Sources

- https://docs.astro.build/en/getting-started/ — Astro official documentation (verified March 2026)
- https://docs.astro.build/en/recipes/docker/ — Official Docker recipe
- https://docs.astro.build/en/guides/testing/ — Official testing guide
- https://docs.astro.build/en/guides/deploy/ — Official deployment guide
- https://github.com/withastro/astro/releases — Astro 6.0.4 release (March 12, 2026)
- https://docs.astro.build/en/guides/styling/ — Official styling guide
- https://docs.astro.build/en/guides/upgrade-to/v6/ — Astro 6 upgrade guide

**Confidence Assessment:**
- **Astro version and features:** HIGH (official docs, recent release)
- **Docker configuration:** HIGH (official Astro recipe, proven pattern)
- **CI/CD patterns:** HIGH (GitHub Actions standard, no breaking changes)
- **Testing tools:** HIGH (official Astro recommendations, mature ecosystem)
- **Node.js version:** HIGH (explicitly documented requirement)

---
*Stack research for: Personal Portfolio Website*
*Researched: 2026-03-12*
