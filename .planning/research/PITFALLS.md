# Pitfalls Research

**Domain:** Personal Portfolio Website (Astro + Docker + GitHub Actions CI/CD)
**Researched:** 2026-03-12
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Building Static Site Inside Docker Without Proper Context

**What goes wrong:**
Docker builds fail or produce incorrect output because Astro's build process doesn't have access to necessary files (source code, configs, assets) or includes unnecessary files (node_modules, .git) that bloat the image.

**Why it happens:**
Developers copy entire project directory with `COPY . .` before properly configuring `.dockerignore`, or they exclude critical files (like `public/` or `src/`) thinking they're optimizing. Astro requires specific directory structure and config files to build correctly.

**How to avoid:**
- Create comprehensive `.dockerignore` that excludes `node_modules/`, `dist/`, `.git/`, and build artifacts BUT includes essential files
- Use explicit `COPY` statements in correct order: `package*.json` first (for dependency caching), then config files, then source
- Verify `.dockerignore` excludes development files but keeps `public/`, `src/`, `astro.config.mjs`, `tsconfig.json`, and any custom configs
- Test Docker build locally before pushing to CI/CD

**Warning signs:**
- Docker build succeeds but served site is empty or missing assets
- Build fails with "Cannot find module" errors for Astro or Vite
- Image size is unexpectedly large (500MB+ for static site)
- Fonts, images, or styles don't load in production

**Phase to address:**
Phase 1 (Docker Setup) - Must be configured correctly from the start as it affects all subsequent phases.

---

### Pitfall 2: Wrong Nginx Configuration for SPA-Style Routing

**What goes wrong:**
Direct navigation to routes (like `/about` or `/cv`) returns 404 errors even though the site works when navigating from home page. Nginx serves the static files but doesn't handle Astro's routing correctly.

**Why it happens:**
Default Nginx configuration serves files exactly as named. Astro static sites generate `/about/index.html` but Nginx looks for `/about` file. Without proper `try_files` directive, Nginx returns 404 instead of serving the correct HTML file.

**How to avoid:**
- Use `try_files $uri $uri/index.html =404;` in Nginx location block
- Configure proper `index` directive: `index index.html index.htm;`
- Set correct `root` path to match Docker COPY destination
- Include MIME types configuration: `include /etc/nginx/mime.types;`
- Test all routes with direct URLs, not just clicking through the site

**Warning signs:**
- Home page works but `/about` or `/cv` returns 404
- Browser console shows "Failed to load resource: 404" for HTML pages
- Refreshing any non-home page breaks the site
- Works in local dev (`npm run dev`) but fails in Docker

**Phase to address:**
Phase 2 (Static Site Serving) - Configure immediately when setting up Nginx, verify before moving to CI/CD.

---

### Pitfall 3: Hardcoded Paths and Incorrect Base URL Configuration

**What goes wrong:**
Assets (images, fonts, CSS, JS) fail to load in production because paths are hardcoded to localhost or don't account for deployment context. Site appears broken with missing styles and images.

**Why it happens:**
Astro uses `/` as base by default. If deploying to subdirectory or CDN, assets reference wrong paths. Developers hardcode `http://localhost:3000` or forget to configure `base` and `site` in `astro.config.mjs`.

**How to avoid:**
- Configure `site` in `astro.config.mjs`: `site: 'https://jake-reddy.com'`
- Set `base` if deploying to subdirectory (not needed for root domain)
- Use Astro's built-in path helpers, never hardcode URLs
- Test build output (`dist/`) with a local server (`npx serve dist`) before Docker
- Verify all asset paths in generated HTML are relative or correctly absolute

**Warning signs:**
- CSS and fonts load in dev but not in production
- Images return 404 errors
- JavaScript bundles fail to load
- Browser console shows "Failed to load resource" for static assets
- Site works at `localhost` but breaks when deployed

**Phase to address:**
Phase 1 (Project Setup) - Configure before first build to avoid fixing hardcoded paths later.

---

### Pitfall 4: Missing or Incorrect GitHub Actions Permissions for GHCR

**What goes wrong:**
GitHub Actions workflow fails to push Docker image to GitHub Container Registry (ghcr.io) with "Permission denied" or "Unauthorized" errors, even though credentials appear correct.

**Why it happens:**
Workflow doesn't have `packages: write` permission, or uses wrong authentication method (Personal Access Token instead of `GITHUB_TOKEN`), or repository doesn't have proper package settings configured.

**How to avoid:**
- Add explicit permissions block to workflow:
  ```yaml
  permissions:
    contents: read
    packages: write
  ```
- Use `${{ secrets.GITHUB_TOKEN }}` for authentication (auto-provided, no manual secret needed)
- Login to registry: `docker login ghcr.io -u ${{ github.actor }} -p ${{ secrets.GITHUB_TOKEN }}`
- Ensure image name is lowercase and includes namespace: `ghcr.io/username/repo-name`
- Tag releases properly to trigger workflow: `git tag v1.0.0 && git push --tags`

**Warning signs:**
- CI passes linting/tests but fails on Docker push step
- Error messages contain "denied: permission_denied" or "unauthorized"
- Workflow shows "Error: failed to solve: failed to push"
- Can build locally but CI push fails

**Phase to address:**
Phase 4 (CI/CD Automation) - Must be configured correctly when setting up Docker publish workflow.

---

### Pitfall 5: Multi-Stage Docker Build Without Proper Stage Separation

**What goes wrong:**
Production Docker image contains development dependencies, source code, and build tools, resulting in bloated images (400MB+ instead of 50-100MB) and security vulnerabilities.

**Why it happens:**
Developers use single-stage Dockerfile or don't properly separate build and runtime stages. They `COPY . .` in final stage or forget to use `--omit=dev` when installing dependencies.

**How to avoid:**
- Use multi-stage build: `FROM node:alpine AS build` then `FROM nginx:alpine AS runtime`
- Install only production dependencies in build stage
- Copy ONLY built output (`dist/`) to runtime stage, not source code
- Use Alpine images for smaller base size
- Verify final image doesn't contain `node_modules`, `src/`, or package.json
- Check image size: `docker images` should show <100MB for static site

**Warning signs:**
- Image size over 400MB for static Astro site
- Final image contains `src/`, `node_modules/`, or `.git/`
- Security scans show vulnerabilities in dev dependencies
- Container uses more memory than expected

**Phase to address:**
Phase 1 (Docker Setup) - Use multi-stage build pattern from the start.

---

### Pitfall 6: Missing Health Checks and Readiness Verification

**What goes wrong:**
Deployment automation pulls new Docker image and restarts container, but doesn't verify the site is actually working before considering deployment successful. Broken deployments go live.

**Why it happens:**
Docker and orchestration tools don't automatically verify application health. Container starts successfully (Nginx runs) but site might be misconfigured, files missing, or returning errors.

**How to avoid:**
- Add HEALTHCHECK to Dockerfile:
  ```dockerfile
  HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
  ```
- In CI/CD, curl deployment endpoint and check for 200 response
- Verify critical routes (`/`, `/about`, `/cv`) return correct status codes
- Test asset loading (fonts, images) in automated checks
- Use smoke tests in CI pipeline after Docker build

**Warning signs:**
- Container shows "healthy" but site returns errors
- Zero-downtime deployments cause brief outages
- Can't detect deployment failures until manually checking
- No automated rollback when deployment fails

**Phase to address:**
Phase 4 (CI/CD Automation) - Add health checks when setting up automated deployment.

---

### Pitfall 7: Forgetting to Set NODE_ENV and Port Configuration

**What goes wrong:**
Production container runs in development mode (slow, verbose logging, dev dependencies loaded) or listens on wrong port, causing connection failures or performance issues.

**Why it happens:**
Environment variables not explicitly set in Dockerfile or docker-compose. Nginx configured for port 80 but Node expects 3000. Developer assumes defaults will work.

**How to avoid:**
- Set explicit ENV variables in Dockerfile:
  ```dockerfile
  ENV NODE_ENV=production
  ENV HOST=0.0.0.0
  ENV PORT=80
  ```
- For static site with Nginx, map ports correctly: `-p 8080:80`
- Document expected environment variables in README
- Verify with `docker inspect` that env vars are set correctly
- Test locally with same env vars as production

**Warning signs:**
- Container starts but site unreachable
- Logs show "dev" mode or verbose debugging output
- Performance significantly slower than expected
- Can access on `localhost:3000` but not configured port

**Phase to address:**
Phase 1 (Docker Setup) - Configure when creating Dockerfile.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip .dockerignore, use COPY . . | Faster initial setup | Bloated images, slower builds, secret leakage risk | Never - takes 2 minutes to create |
| Single-stage Dockerfile | Simpler Dockerfile | 4-5x larger images, slower deployments, security risks | Never for production |
| Use latest tag for Node base image | Always "newest" | Unexpected breaking changes, build failures | Development only; pin versions for production |
| Manual deployment without CI/CD | No workflow setup time | Error-prone, inconsistent, time-consuming per deploy | Acceptable for first MVP, add CI/CD by v1.0 |
| Skip TypeScript type checking in CI | Faster CI runs | Type errors reach production | Never - type checking takes <30s |
| Commit .env files to repo | Quick config sharing | Security vulnerability, credentials exposed | Never - use .env.example template instead |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Container Registry | Using Personal Access Token | Use `${{ secrets.GITHUB_TOKEN }}` with `packages: write` permission |
| Astro Image Optimization | Forgetting to include Sharp in Docker | Install Sharp in Dockerfile: `RUN npm install sharp` |
| Nginx + Astro | Missing try_files directive | Add `try_files $uri $uri/index.html =404;` |
| Docker Build on Mac M1/M2 | Building only ARM images | Use `--platform linux/amd64` for x86 compatibility |
| TypeScript in Docker | Build fails with type errors | Run `tsc --noEmit` in CI before Docker build |
| JetBrains Mono font | Font not loading in production | Verify font files in `public/fonts/` are copied to dist |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Installing all dependencies in final stage | 400MB+ image | Use `npm ci --omit=dev` and multi-stage build | Immediately; wastes bandwidth and storage |
| Not using layer caching in CI | 5+ minute builds every time | Copy package.json first, cache /root/.npm | With frequent commits (>10/day) |
| Missing nginx gzip compression | Slow page loads, high bandwidth | Configure gzip in nginx.conf | As soon as users access over slow connections |
| Copying node_modules to runtime image | Slow container start | Only copy dist/ in final stage | Noticed in production under load |
| No Docker layer caching | Rebuilds everything on source change | Separate deps installation from source copy | Becomes painful with >20 dependencies |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Running as root in container | Container escape → host compromise | Add USER directive: `USER node` or `RUN adduser -D appuser && USER appuser` |
| Exposing debug ports (9229) in production | Remote code execution | Only EXPOSE debug ports in dev builds, not production |
| Including .env files in image | Leaked credentials | Add .env to .dockerignore, use runtime environment variables |
| Using node:latest without pinning | Supply chain attacks, breaking changes | Pin specific version: `FROM node:20.11.1-alpine3.19` |
| Missing Content-Security-Policy headers | XSS attacks | Configure CSP in Nginx: `add_header Content-Security-Policy "default-src 'self';"` |
| Committing GitHub Action secrets | Token leakage | Use repository secrets, never hardcode in workflow YAML |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No 404 page | Confusing white screen on broken links | Create `src/pages/404.astro` and configure nginx error_page |
| Missing Open Graph tags | Poor social media sharing | Add OG tags to all pages with proper images/descriptions |
| Fonts loading without fallbacks | Flash of unstyled text (FOUT) | Define font-display: swap and system font fallbacks |
| No loading states for fonts | Text invisible until font loads | Use font-display: swap in @font-face |
| Oversize images in dist/ | Slow initial page load | Use Astro Image component with optimization |
| Missing mobile viewport meta tag | Broken mobile layout | Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |

## "Looks Done But Isn't" Checklist

- [ ] **Docker build succeeds** — Often missing: Health checks, proper EXPOSE ports, correct CMD/ENTRYPOINT
  - Verify: `docker ps` shows healthy status, can curl endpoints
- [ ] **Site loads locally** — Often missing: Works on localhost but breaks with domain/subdirectory
  - Verify: Test with actual domain name, check asset paths with browser DevTools
- [ ] **Navigation works** — Often missing: Direct URL navigation returns 404 (SPA routing issue)
  - Verify: Visit `/about` and `/cv` directly in browser, refresh pages
- [ ] **CI/CD passes** — Often missing: Tests pass but deployment never happens or fails silently
  - Verify: Check GitHub Container Registry for new image tag, inspect workflow logs
- [ ] **Responsive design** — Often missing: Looks good on desktop, breaks on mobile
  - Verify: Test on actual mobile device, not just browser DevTools
- [ ] **Fonts render** — Often missing: Fonts work locally but fail in production (path issues)
  - Verify: Check Network tab for font loading, test with cleared cache

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong Nginx config (404 on routes) | LOW | Update nginx.conf, rebuild image, redeploy (~15 min) |
| Bloated Docker image (400MB+) | MEDIUM | Refactor to multi-stage build, requires Dockerfile rewrite (~2 hours) |
| Missing GHCR permissions | LOW | Add permissions block to workflow, re-run action (~5 min) |
| Hardcoded localhost URLs | MEDIUM | Find/replace all occurrences, configure Astro site URL, rebuild (~1-2 hours) |
| No health checks in deployment | MEDIUM | Add HEALTHCHECK to Dockerfile, update deployment scripts (~1 hour) |
| Root user in container | HIGH | Requires security audit, Dockerfile refactor, testing (~4 hours) |
| Leaked secrets in .env | CRITICAL | Rotate all credentials, fix .dockerignore, audit git history (~1 day) |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Wrong .dockerignore configuration | Phase 1 (Docker Setup) | Check `docker images` size, inspect image contents with `docker run --rm -it <image> sh` |
| Missing Nginx try_files directive | Phase 2 (Static Serving) | Direct navigation to `/about` returns 200, not 404 |
| Incorrect base URL configuration | Phase 1 (Project Setup) | Build locally, serve dist/ folder, verify asset loading |
| Missing GHCR permissions | Phase 4 (CI/CD) | Workflow successfully pushes image, visible in ghcr.io |
| Single-stage Docker build | Phase 1 (Docker Setup) | Image size under 100MB for static site |
| No health checks | Phase 4 (CI/CD) | `docker ps` shows "(healthy)" status |
| Wrong NODE_ENV | Phase 1 (Docker Setup) | `docker exec <container> env` shows NODE_ENV=production |
| Running as root | Phase 1 (Docker Setup) | `docker exec <container> whoami` returns non-root user |

## Sources

- [Astro Official Troubleshooting Guide](https://docs.astro.build/en/guides/troubleshooting/) (Official, High Confidence)
- [Astro Deployment Documentation](https://docs.astro.build/en/guides/deploy/) (Official, High Confidence)
- [Astro Docker Recipe](https://docs.astro.build/en/recipes/docker/) (Official, High Confidence)
- [Docker Node.js Best Practices](https://docs.docker.com/language/nodejs/build-images/) (Official, High Confidence)
- [GitHub Actions Docker Publishing Guide](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images) (Official, High Confidence)

---
*Pitfalls research for: Personal Portfolio Website (Astro + Docker + GitHub Actions)*
*Researched: 2026-03-12*
*Confidence: HIGH — All findings verified against official documentation from Astro, Docker, and GitHub*
