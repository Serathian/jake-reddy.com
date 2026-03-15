# Pitfalls Research

**Domain:** Astro 6 Static Site — Adding CV, Projects (Markdown CMS), Performance, Animations, Images
**Researched:** 2026-03-15
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Content Collections Schema Mismatch Breaking Build

**What goes wrong:**
Astro's build fails with cryptic Zod validation errors when frontmatter in markdown files doesn't match the defined collection schema. This happens at build time, not dev time, causing CI failures and blocking deployments.

**Why it happens:**
Developers define a strict Zod schema in `src/content.config.ts` but forget to validate existing markdown files against it. Astro enforces schema validation at build time (not just when querying), and a single mismatched field type (e.g., string vs date) breaks the entire build.

**How to avoid:**
1. **Start the dev server after defining schema** — Astro validates collections on dev server start
2. **Use `z.coerce.date()` instead of `z.date()`** for date fields in frontmatter (handles string-to-date conversion)
3. **Make new fields optional initially** with `.optional()` while migrating existing content
4. **Test build locally** with `npm run build` before pushing (dev server doesn't catch all validation issues)
5. **Use generated TypeScript types** from `astro:content` in components to catch mismatches early

**Warning signs:**
- Dev server starts but build fails with Zod errors
- Error message like `Expected date, received string` in CI logs
- Build worked locally but fails in Docker/CI (different Node versions can affect Zod behavior)

**Phase to address:**
Phase 1 (Content Collections Setup) — Define schema with all fields optional first, then tighten after content is migrated.

---

### Pitfall 2: Image Optimization Bloating Docker Image Size

**What goes wrong:**
Astro's image optimization generates multiple optimized versions of each image (different sizes, formats like WebP/AVIF) at build time. In a multi-stage Docker build, these optimized images are copied to the final Nginx stage, but source images in `src/` are also accidentally copied, doubling image storage and bloating the Docker image from ~50MB to 200MB+.

**Why it happens:**
The Dockerfile copies the entire build output (`COPY --from=build /app/dist /usr/share/nginx/html/`) which correctly includes optimized images. But developers often forget that Astro's `<Image />` component stores optimized images in `dist/_astro/`, while source images remain in `src/assets/`. If the Dockerfile isn't careful, both get copied.

**How to avoid:**
1. **Only copy `dist/` folder** in final stage (never copy `src/` or root directory)
2. **Use `.dockerignore`** to exclude `src/`, `node_modules/`, `.git/` from build context
3. **Monitor Docker image size** — set a CI check that fails if image exceeds expected size (e.g., 100MB for static site)
4. **Use `sharp` for image optimization** (Astro's default) — it's faster than `squoosh` and produces smaller files
5. **Configure image formats wisely** — `formats={['avif', 'webp']}` generates 2x files; use `['webp']` if AVIF support isn't critical
6. **Set `output: 'static'` in astro.config.mjs** to ensure SSG mode (SSR mode would require different Docker setup)

**Warning signs:**
- Docker image size suddenly jumps after adding images
- Build stage takes significantly longer (5+ minutes for small portfolio)
- Multiple copies of same image in different formats in `dist/`
- `docker images` shows size >100MB for a simple portfolio site

**Phase to address:**
Phase 3 (Image Optimization) — Before adding production images, test Docker build size and set CI size limits.

---

### Pitfall 3: Lighthouse Performance Score Measured Against Wrong Build

**What goes wrong:**
Developers run Lighthouse against the development server (`npm run dev`) instead of production build (`npm run build && npm run preview`), getting misleading scores. Dev server scores are 20-30 points lower due to unminified assets, missing compression, and hot-reload overhead. Teams celebrate hitting Lighthouse 90+ locally, then fail in production.

**Why it happens:**
Astro's dev server is optimized for developer experience (fast HMR, detailed error messages, source maps) not performance. Production builds enable minification, tree-shaking, and compression. Lighthouse run against dev server shows worst-case performance, creating false negatives. Conversely, testing with browser caching enabled creates false positives.

**How to avoid:**
1. **Always test production builds:** `npm run build && npm run preview` before Lighthouse audit
2. **Use `astro preview` not `astro dev`** for performance testing
3. **Disable browser cache** when testing (Lighthouse does this automatically, but manual tests don't)
4. **Test in Docker container** if that's your deployment target (Nginx compression settings differ from Vite preview)
5. **Test on real hardware** not just localhost (network latency matters for Lighthouse)
6. **Run Lighthouse in CI** against preview deployments, not local builds
7. **Compare lab vs field data** — Lighthouse is lab data; real users experience different conditions

**Warning signs:**
- Lighthouse score varies wildly between runs (>10 point swings)
- Dev server scores are suspiciously high (>90 without optimization)
- Production score is lower than dev score (red flag — caching issue)
- "Reduce unused JavaScript" suggestions for Astro core code (means dev build was tested)

**Phase to address:**
Phase 4 (Performance Optimization) — Set up automated Lighthouse CI against preview deployments before claiming 90+ score.

---

### Pitfall 4: Markdown XSS via Unsanitized Frontmatter

**What goes wrong:**
Content collections frontmatter is trusted by default. If project data (CV entries, project descriptions) is sourced from external input (CMS, API, user submissions), malicious HTML/JavaScript in frontmatter fields gets rendered unsanitized, creating XSS vulnerabilities.

**Why it happens:**
Astro treats frontmatter as trusted developer-authored content. The markdown body is sanitized by the markdown parser (remark), but frontmatter string fields are rendered directly as HTML. Developers assume all content is safe because it's "markdown," but frontmatter is just YAML/TOML data parsed into JavaScript objects.

**How to avoid:**
1. **Never render untrusted frontmatter as HTML** — use `{post.data.title}` not `<div set:html={post.data.title} />`
2. **Validate and sanitize external content** before writing to markdown files
3. **Use Zod schema `.transform()`** to strip HTML from frontmatter strings:
   ```ts
   title: z.string().transform(val => val.replace(/<[^>]*>/g, ''))
   ```
4. **Keep content authoring internal** — for a personal portfolio, author CV/projects yourself (no external CMS needed)
5. **If using a CMS**, use Astro's content loader API with sanitization, don't blindly write CMS content to markdown files
6. **Enable CSP headers** in nginx.conf to mitigate XSS impact

**Warning signs:**
- Content includes `<script>` tags in frontmatter
- Titles or descriptions contain HTML entities (`&lt;`, `&gt;`)
- External CMS integration without validation layer

**Phase to address:**
Phase 1 (Content Collections) — Since project uses local markdown files authored by developer, risk is LOW. But document this for future CMS integration.

---

### Pitfall 5: `prefers-reduced-motion` Ignored, Animations Cause Accessibility Failures

**What goes wrong:**
Developers add CSS animations or Astro view transitions without checking `prefers-reduced-motion` media query. Users with motion sensitivity (vestibular disorders, epilepsy) experience nausea, headaches, or worse. WCAG AAA compliance (project requirement per MASTER.md) is broken.

**Why it happens:**
CSS animations run by default unless explicitly disabled. Developers test with default browser settings (motion enabled) and never check reduced-motion preference. Astro's view transitions API respects `prefers-reduced-motion` by default, but custom CSS animations do not unless wrapped in media query.

**How to avoid:**
1. **Wrap ALL animations in media query:**
   ```css
   @media (prefers-reduced-motion: no-preference) {
     .fade-in { animation: fade 300ms; }
   }
   ```
2. **Test with reduced motion enabled** — macOS: System Preferences > Accessibility > Display > Reduce motion
3. **Use Astro's `transition:animate` directives** — they respect `prefers-reduced-motion` automatically
4. **Provide fallback for view transitions** — `<ClientRouter fallback="swap" />` for browsers without View Transitions API
5. **Document motion in design system** — specify which animations are disabled in reduced-motion mode
6. **Audit with Lighthouse** — "prefers-reduced-motion" is a Lighthouse accessibility check

**Warning signs:**
- Animations run regardless of browser motion settings
- Lighthouse flags "Does not respect prefers-reduced-motion"
- No `@media (prefers-reduced-motion)` in CSS files
- View transitions enabled without fallback strategy

**Phase to address:**
Phase 5 (Animations) — Before adding ANY animations, test with reduced motion enabled and wrap all animations in media query.

---

### Pitfall 6: Content Collection Build Cache Stale After Schema Changes

**What goes wrong:**
After changing content collection schema in `src/content.config.ts`, the dev server or build uses stale cached types, causing TypeScript errors that don't match actual schema. Types show old schema structure, queries fail with "Property does not exist" errors.

**Why it happens:**
Astro caches collection metadata in `.astro/` directory for performance. When schema changes, TypeScript types are regenerated, but the cache can become stale if the dev server is running. This is especially problematic in Docker builds where `.astro/` might be cached between builds.

**How to avoid:**
1. **Restart dev server after schema changes** — `s + enter` in dev server, or full restart
2. **Run `astro sync`** manually to regenerate types: `npm run astro sync`
3. **Add `.astro/` to `.dockerignore`** — never cache this directory in Docker builds
4. **Clear cache when TypeScript errors don't make sense:** `rm -rf .astro/ && npm run dev`
5. **Use `astro check` in CI** — validates schema matches content before build

**Warning signs:**
- TypeScript errors about missing properties that exist in schema
- `getCollection()` type shows old schema structure
- Build works locally but fails in CI (cached `.astro/` directory)
- Schema changes don't reflect in editor autocomplete

**Phase to address:**
Phase 1 (Content Collections) — Document cache clearing in project README for contributors.

---

### Pitfall 7: View Transitions Breaking Script Re-execution

**What goes wrong:**
JavaScript that works on initial page load stops working after client-side navigation via view transitions. Event listeners don't fire, interactive elements become unresponsive, analytics fire multiple times or not at all.

**Why it happens:**
With view transitions enabled via `<ClientRouter />`, navigation is client-side (SPA-like). Scripts with `is:inline` run once on initial load but don't re-run on subsequent navigations. Regular bundled scripts are treated as modules and never re-execute. Developers expect full page refresh behavior but get SPA behavior.

**How to avoid:**
1. **Listen to Astro lifecycle events** instead of `DOMContentLoaded`:
   ```js
   document.addEventListener('astro:page-load', () => {
     // Re-run initialization code
   });
   ```
2. **Use `data-astro-rerun` attribute** for inline scripts that must re-execute:
   ```html
   <script is:inline data-astro-rerun>
     // This runs on every navigation
   </script>
   ```
3. **Preserve state with `transition:persist`** on islands/components that should maintain state
4. **Test navigation flows** — don't just test initial page load, click through all routes
5. **Avoid global state assumptions** — check if state exists before initializing

**Warning signs:**
- Mobile menu works on first page but breaks after navigation
- Analytics fire twice (once for initial load, once for view transition)
- Theme toggle resets to default on navigation
- Third-party widgets (chat, analytics) don't initialize on subsequent pages

**Phase to address:**
Phase 5 (Animations) — When adding view transitions, audit all existing scripts and wrap in lifecycle events.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip image optimization, use `<img>` tags | Faster initial implementation | Larger bundle, slower load, poor Lighthouse scores | Never — image optimization is trivial with Astro |
| Use `any` type for collection entries | Avoid TypeScript complexity | No type safety, runtime errors, harder refactoring | Never — Astro generates types automatically |
| Skip content collection schema, use `glob()` | Avoid schema definition | No validation, build-time errors, no autocomplete | Never for structured content (CV, projects) |
| Test Lighthouse on dev server | Skip build step in testing | False performance metrics, wasted optimization time | Never — always test production builds |
| Hardcode content in components | Avoid markdown setup | Difficult updates, no separation of concerns | Acceptable for one-off pages (About, Contact) |
| Use view transitions without fallback | Simpler code | Broken navigation in Safari/Firefox (pre-support) | Never — always provide fallback |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Markdown + Build | Frontmatter date as `Date` object breaks schema | Use `z.coerce.date()` for frontmatter dates |
| Images + Docker | Copying `src/` to final stage bloats image | Only copy `dist/` folder, use `.dockerignore` |
| Animations + Performance | View transitions increase JavaScript bundle | Use `fallback="swap"` for CSS-only transitions |
| Content Collections + TypeScript | Schema changes don't update types | Restart dev server or run `astro sync` |
| View Transitions + Analytics | Page view events fire twice (SPA navigation) | Listen to `astro:page-load` event, not `DOMContentLoaded` |
| Images + Build Time | Building 10+ images takes 5+ minutes | Limit to 3-5 hero images, use WebP only (not AVIF) |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Too many optimized image formats | Build time >5 minutes for small site | Use `['webp']` only, not `['avif', 'webp']` | >10 images with multiple formats |
| Unminified CSS in production | Lighthouse "Reduce unused CSS" warning | Ensure `output: 'static'` in config, test `preview` | If testing dev server |
| Client-side rendering content | Slow FCP, LCP >2.5s | Use static Astro components, not client-side frameworks | When using React for static content |
| Large bundle size from unused imports | Lighthouse "Reduce unused JavaScript" | Tree-shake imports, use `import type` for TS types | Importing entire libraries for one function |
| Blocking font loads | FOIT (flash of invisible text) | Use `font-display: swap` in `@font-face` | Custom fonts without `font-display` |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Rendering untrusted frontmatter as HTML | XSS vulnerability | Never use `set:html` with external content |
| Exposing `.env` in Docker image | API key leaks | Add `.env` to `.dockerignore` |
| Missing CSP headers in Nginx | XSS, clickjacking | Add CSP to `nginx.conf` (INFR-05 in backlog) |
| Serving source maps in production | Code exposure | Disable source maps: `astro.config.mjs` `vite: { build: { sourcemap: false } }` |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animations without reduced-motion check | Motion sickness, accessibility barrier | Wrap animations in `@media (prefers-reduced-motion: no-preference)` |
| View transitions breaking back button | Confusion, loss of navigation state | Test back/forward navigation, use `transition:persist` for state |
| Long build times blocking content updates | Stale content, deployment delays | Keep image count low (<10), optimize build cache |
| Missing `alt` text on images | Screen reader users can't understand images | Astro enforces `alt` attribute on `<Image />` component |
| Invisible focus indicators | Keyboard users can't navigate | Ensure `:focus-visible` styles match design system |

## "Looks Done But Isn't" Checklist

- [ ] **Content Collections:** Schema defined but not tested against actual markdown files — verify `npm run build` succeeds
- [ ] **Images:** Optimized locally but Docker image size not checked — verify image <100MB with `docker images`
- [ ] **Performance:** Lighthouse 90+ on dev server but not production build — verify `npm run preview` + Lighthouse
- [ ] **Animations:** Animations work but reduced-motion not tested — toggle system setting and verify animations disabled
- [ ] **Markdown Rendering:** Renders in dev but Zod validation fails in build — verify `astro check` passes
- [ ] **View Transitions:** Works in Chrome but breaks in Safari — test fallback with `<ClientRouter fallback="swap" />`
- [ ] **TypeScript:** No TS errors in editor but `astro check` fails — verify CI runs `astro check`
- [ ] **Docker Build:** Builds locally but fails in CI due to cache — verify `.dockerignore` excludes `.astro/`, `node_modules/`

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Schema mismatch breaking build | LOW | 1. Check build error for field name<br>2. Update schema or frontmatter<br>3. Run `npm run build` to verify |
| Docker image bloat (200MB+) | LOW | 1. Review `.dockerignore` for exclusions<br>2. Ensure only `dist/` copied in final stage<br>3. Rebuild and verify size |
| Lighthouse score fails in production | MEDIUM | 1. Test with `npm run preview` not `dev`<br>2. Check Nginx compression settings<br>3. Run Lighthouse CI on preview deployment |
| Content collection cache stale | LOW | 1. Delete `.astro/` directory<br>2. Run `npm run astro sync`<br>3. Restart dev server |
| Animations cause motion sickness | MEDIUM | 1. Wrap all animations in `prefers-reduced-motion` media query<br>2. Test with system motion setting disabled<br>3. Document in design system |
| XSS from untrusted frontmatter | HIGH | 1. Audit all `set:html` usage<br>2. Add Zod `.transform()` to strip HTML<br>3. Add CSP headers to Nginx |
| View transitions break scripts | MEDIUM | 1. Identify affected scripts<br>2. Wrap in `astro:page-load` event listener<br>3. Test navigation between all routes |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Schema mismatch breaking build | Phase 1 (Content Collections) | `npm run build` succeeds in CI |
| Image optimization bloating Docker | Phase 3 (Image Optimization) | Docker image size <100MB |
| Lighthouse tested against dev server | Phase 4 (Performance) | Lighthouse CI runs against `preview` |
| Animations ignore reduced-motion | Phase 5 (Animations) | System motion setting disabled, animations don't run |
| Content collection cache stale | Phase 1 (Content Collections) | `.astro/` in `.dockerignore`, `astro check` in CI |
| Markdown XSS vulnerability | Phase 1 (Content Collections) | No `set:html` with frontmatter, CSP headers configured |
| View transitions break scripts | Phase 5 (Animations) | All routes navigable, scripts work after navigation |

## Sources

**Official Documentation (HIGH confidence):**
- Astro Content Collections: https://docs.astro.build/en/guides/content-collections/ (retrieved 2026-03-15)
- Astro Images: https://docs.astro.build/en/guides/images/ (retrieved 2026-03-15)
- Astro Docker Recipe: https://docs.astro.build/en/recipes/docker/ (retrieved 2026-03-15)
- Astro View Transitions: https://docs.astro.build/en/guides/view-transitions/ (retrieved 2026-03-15)

**Project Context (HIGH confidence):**
- .planning/PROJECT.md — Current tech stack (Astro 6.0.4, Docker, Nginx, WCAG AAA requirement)
- Dockerfile — Multi-stage build setup, current image optimization strategy
- design-system/nordic-developer-portfolio/MASTER.md — Design constraints (minimal motion, accessibility)

**Domain Knowledge (MEDIUM confidence):**
- Lighthouse scoring methodology — lab vs field data, caching impact
- Zod validation behavior — type coercion patterns, schema evolution
- Docker build optimization — layer caching, `.dockerignore` best practices
- WCAG AAA motion requirements — `prefers-reduced-motion` compliance

---
*Pitfalls research for: Astro 6 portfolio with CV, Projects, Performance, Animations, Images*
*Researched: 2026-03-15*
