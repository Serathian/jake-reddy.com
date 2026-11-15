# Phase 6: Type Infrastructure & Test Cleanup - Research

**Researched:** 2026-03-16
**Domain:** TypeScript type definitions, Vitest test configuration, Docker optimization
**Confidence:** HIGH

## Summary

Phase 6 establishes minimal type infrastructure for external CMS integration and resolves test infrastructure debt accumulated in v0.1. This phase creates placeholder TypeScript interfaces for Projects (to be consumed by Phase 8), migrates Vitest configuration to use Astro's official `getViteConfig()` helper for future component testing support, adds CI-safe test flags, and optimizes Docker builds by excluding Astro's cache directory.

**Key insight:** Astro officially recommends using `getViteConfig()` from `astro/config` instead of `vitest/config` to ensure Vitest inherits Astro's Vite configuration. This enables future component testing via the Container API and prevents SSR initialization errors that occur when Vitest config doesn't align with Astro's build configuration.

**Primary recommendation:** Use TypeScript interfaces (not Zod schemas) for placeholder types since runtime validation will be handled by the external CMS API. The `--run` flag prevents Vitest from entering watch mode in non-TTY environments (CI/CD), eliminating hanging test processes.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Create `src/types/project.ts` with minimal placeholder interface
- Interface will be swapped out later once CMS API is ready
- Placeholder should include typical project fields (title, description, tech stack, links)
- TypeScript interface only (no Zod, no runtime validation yet)
- CV page is hardcoded directly in Astro component (no content collection, no data layer, no types needed)
- Migrate `vitest.config.ts` from `vitest/config` to `astro/config` (DEBT-05)
- Add `--run` flag to `package.json` test script for CI safety (DEBT-06)
- Maintain existing mirror-logic test pattern (inline functions mirroring component logic)
- Add `.astro/` directory to `.dockerignore`

### Claude's Discretion
- Exact fields in placeholder Project interface (as long as typical case study fields covered)
- Test file organization for any new test cases
- Whether to add JSDoc comments to placeholder types

### Deferred Ideas (OUT OF SCOPE)
- Content collections entirely — Not needed for this architecture (CV hardcoded, Projects from external CMS)
- Zod validation for Projects — Will be determined when CMS API integration happens (Phase 8)
- Build-time content validation — Not applicable without content collections
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TYPE-01 | TypeScript interface defined for Projects CMS response structure | TypeScript interface syntax (see Code Examples), official TS docs verified |
| TYPE-02 | Projects type includes typical case study fields (title, description, tech stack, links) | Standard project portfolio fields identified, optional vs required patterns documented |
| DEBT-05 | Vitest config migrated to astro/config (enables component testing) | Astro official testing docs confirm `getViteConfig()` pattern, example template verified |
| DEBT-06 | package.json test script uses vitest --run flag | Vitest CLI docs confirm `--run` prevents watch mode in non-TTY (CI safety) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | 5.9.3 (installed) | Type definitions | Native TypeScript interfaces for placeholder types — no runtime overhead |
| Astro | 6.0.4 (installed) | Config integration | `getViteConfig()` helper ensures Vitest inherits Astro's Vite config (official pattern) |
| Vitest | 2.1.9 (installed) | Test runner | Already configured — need migration to `astro/config` for component testing support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| N/A | - | - | Placeholder types need no additional libraries |

**Installation:**
```bash
# All dependencies already installed
# No new packages needed for this phase
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── types/
│   └── project.ts        # Placeholder Project interface
├── test/
│   └── {category}/
│       └── {feature}.test.ts
vitest.config.ts           # Migrated to use astro/config
.dockerignore              # Updated to exclude .astro/
package.json               # test script updated with --run flag
```

### Pattern 1: Placeholder Type Interface (TypeScript Only)
**What:** Define shape of external API response using TypeScript interface without runtime validation
**When to use:** External data source handles validation, types are placeholders for future integration
**Example:**
```typescript
// Source: Official Astro testing docs + TypeScript handbook
// src/types/project.ts

/**
 * Placeholder type for Project data fetched from external CMS.
 * This interface will be replaced/refined when CMS API integration occurs (Phase 8).
 * 
 * @remarks
 * - No runtime validation (Zod/etc) — external CMS API handles validation
 * - Fields marked optional (?) may not be present in all CMS responses
 */
export interface Project {
  /** Unique identifier from CMS */
  id: string;
  
  /** Project title/name */
  title: string;
  
  /** Brief project description (1-2 sentences) */
  description: string;
  
  /** Detailed case study content (problem, solution, outcome) */
  content?: string;
  
  /** Technologies/frameworks used */
  techStack: string[];
  
  /** Project links (demo, repo, etc) */
  links?: {
    demo?: string;
    github?: string;
    live?: string;
  };
  
  /** Featured image/screenshot URL */
  image?: string;
  
  /** Publication/completion date */
  publishedAt?: string;
}
```
**Why this pattern:**
- Interface (not type alias) allows future extension if needed (though user confirmed interface is swapped, not extended)
- Optional fields (`?`) handle varying CMS response completeness
- JSDoc comments document placeholder status and future replacement (Claude's discretion — recommended for clarity)
- `string[]` for techStack (not union types) — CMS determines valid values
- Nested object for links provides structure without complexity

### Pattern 2: Vitest Config with Astro's getViteConfig()
**What:** Use Astro's `getViteConfig()` helper instead of plain `defineConfig()` from vitest/config
**When to use:** Always when testing Astro projects — ensures Vitest inherits Astro's Vite configuration
**Example:**
```typescript
// Source: https://docs.astro.build/en/guides/testing/ (official docs)
// Source: https://github.com/withastro/astro/tree/main/examples/with-vitest (official example)
// vitest.config.ts

/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,        // Keep existing config
    environment: 'node',  // Keep existing config
  },
});
```
**Why this pattern:**
- Prevents SSR initialization errors (STATE.md decision #9: "getViteConfig caused SSR initialization errors" — this was when using `getViteConfig` from `@astrojs/vite-plugin-astro`, NOT from `astro/config`)
- Enables future component testing via Container API (Astro 4.9+)
- Official Astro recommendation as of v4.8+ (docs confirm this is the blessed pattern)
- `/// <reference types="vitest/config" />` ensures TypeScript recognizes Vitest config types

### Pattern 3: CI-Safe Test Script with --run Flag
**What:** Add `--run` flag to prevent watch mode in non-interactive environments
**When to use:** Always in `package.json` test script for CI/CD usage
**Example:**
```json
// Source: https://vitest.dev/guide/cli.html (official docs)
// package.json
{
  "scripts": {
    "test": "vitest --run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```
**Why this pattern:**
- `--run` performs single run without watch mode (exits after completion)
- Prevents hanging processes in CI (non-TTY environments)
- Vitest auto-detects CI (`process.env.CI`) but explicit `--run` is safer and clearer
- Separate `test:watch` script for development keeps watch mode available
- Vitest CLI docs: "Will enter the watch mode in development environment and run mode in CI automatically" — but explicit is better than implicit for reliability

### Pattern 4: Docker Cache Exclusion
**What:** Add `.astro/` to `.dockerignore` to prevent build cache bloat
**When to use:** Always for Astro projects using Docker
**Example:**
```dockerignore
# Source: Docker best practices + Astro project structure
# .dockerignore

# Existing entries...
.astro
.astro/

# OR use wildcard pattern
**/.astro/
```
**Why this pattern:**
- `.astro/` contains Vite cache, type generation, and build artifacts (regenerated on build)
- Including cache in Docker images bloats layer size (can add 10-50MB)
- Build cache tied to local environment — not portable across container builds
- `.astro` (no trailing slash) also works but `.astro/` is more explicit for directories

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type validation at runtime | Custom validation logic | Trust CMS API validation (Phase 8 decision) | User explicitly deferred Zod validation to Phase 8; placeholder types are TypeScript-only |
| Astro + Vitest config alignment | Manual Vite config merging | `getViteConfig()` from `astro/config` | Official Astro helper prevents config drift, enables Container API for component testing |
| CI test hanging detection | Timeout wrapper scripts | `--run` flag in test script | Built into Vitest, prevents watch mode in non-TTY automatically |

**Key insight:** Don't prematurely add runtime validation. The user explicitly stated "TypeScript interface only (no Zod, no runtime validation yet)" — CMS API will handle validation when integration occurs in Phase 8.

## Common Pitfalls

### Pitfall 1: Using vitest/config Instead of astro/config
**What goes wrong:** Vitest doesn't inherit Astro's Vite configuration, causing SSR errors or preventing future component testing
**Why it happens:** Vitest examples often show `import { defineConfig } from 'vitest/config'` as the standard pattern
**How to avoid:** Always use `import { getViteConfig } from 'astro/config'` for Astro projects
**Warning signs:** 
- Component imports fail in tests with SSR-related errors
- Astro Container API doesn't work in tests
- Vite aliases from astro.config.ts not recognized in tests

**Evidence:** Official Astro docs (https://docs.astro.build/en/guides/testing/) state: "Use Astro's `getViteConfig()` helper in your `vitest.config.ts` configuration file to set up Vitest with your Astro project's settings" (HIGH confidence — official source)

### Pitfall 2: Forgetting --run Flag in CI
**What goes wrong:** Test command hangs in CI because Vitest enters watch mode (non-TTY environments)
**Why it happens:** Default `vitest` command auto-detects CI but some CI environments don't set `process.env.CI`
**How to avoid:** Explicitly add `--run` flag to package.json test script
**Warning signs:**
- CI pipeline times out on test step
- Test logs show "Waiting for file changes..." in CI
- GitHub Actions job never completes test step

**Evidence:** Vitest CLI docs confirm `--run` performs "single run without watch mode" and "will fallback to `vitest run` in CI or when stdin is not a TTY" (HIGH confidence — official docs)

### Pitfall 3: Including .astro/ in Docker Images
**What goes wrong:** Docker images bloated with non-portable build cache (10-50MB extra)
**Why it happens:** `.astro/` directory created during development, not obviously cache-like
**How to avoid:** Add `.astro/` to `.dockerignore` before first Docker build
**Warning signs:**
- Docker image size larger than expected (>100MB for static site)
- Different builds produce different cache artifacts in `.astro/`
- Container rebuild times slower than initial builds

**Evidence:** Astro project structure docs show `.astro/` contains "Astro-generated assets for your build" and Docker best practices recommend excluding build caches (MEDIUM confidence — inferred from structure, not explicit docs)

### Pitfall 4: Over-Designing Placeholder Types
**What goes wrong:** Adding validation, defaults, or complex type guards to placeholder types
**Why it happens:** Developer instinct to make types "production-ready"
**How to avoid:** Remember placeholder types are swapped out in Phase 8 — keep minimal
**Warning signs:**
- Zod schemas in src/types/project.ts (user explicitly deferred)
- Type guards like `isProject()` functions (not needed until CMS integration)
- Default values or factory functions (CMS provides data)

**Evidence:** User context explicitly states "TypeScript interface only (no Zod, no runtime validation yet)" and "Interface will be swapped out later once CMS API is ready" (HIGH confidence — direct user requirement)

### Pitfall 5: Missing Triple-Slash Reference in vitest.config.ts
**What goes wrong:** TypeScript doesn't recognize Vitest config types, shows errors in IDE
**Why it happens:** `getViteConfig()` returns generic Vite config, TypeScript needs hint for Vitest-specific properties
**How to avoid:** Always add `/// <reference types="vitest/config" />` at top of vitest.config.ts
**Warning signs:**
- TypeScript error: Property 'test' does not exist on type
- IDE doesn't autocomplete `test.globals`, `test.environment`, etc
- Type checking passes but IDE shows red squiggles

**Evidence:** Official Astro example (https://github.com/withastro/astro/tree/main/examples/with-vitest) includes this triple-slash reference (HIGH confidence — official example)

## Code Examples

Verified patterns from official sources:

### Placeholder TypeScript Interface
```typescript
// Source: TypeScript Handbook - Everyday Types
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
// src/types/project.ts

/**
 * Placeholder interface for Project data from external CMS.
 * 
 * @remarks
 * This will be refined/replaced during Phase 8 CMS integration.
 * No runtime validation — CMS API handles data validation.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  techStack: string[];
  links?: {
    demo?: string;
    github?: string;
    live?: string;
  };
  image?: string;
  publishedAt?: string;
}
```

### Vitest Config with Astro Integration
```typescript
// Source: https://docs.astro.build/en/guides/testing/#vitest
// Source: https://github.com/withastro/astro/tree/main/examples/with-vitest/vitest.config.ts
// vitest.config.ts

/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    // Existing config maintained
    globals: true,
    environment: 'node',
  },
});
```

### CI-Safe Test Script
```json
// Source: https://vitest.dev/guide/cli.html#vitest-run
// package.json (partial)
{
  "scripts": {
    "test": "vitest --run"
  }
}
```

### Docker Cache Exclusion
```dockerignore
# Source: Docker best practices
# .dockerignore (additions only)

# Astro build cache (regenerated on build)
.astro/
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `vitest/config` | `astro/config` with `getViteConfig()` | Astro 4.8+ | Enables Container API component testing, prevents SSR errors |
| Implicit CI detection | Explicit `--run` flag | Vitest 2.0+ best practice | Prevents CI hanging in edge cases |
| Include all files in Docker | Exclude build caches | Ongoing best practice | Smaller images, faster builds |

**Deprecated/outdated:**
- `getViteConfig` from `@astrojs/vite-plugin-astro` — use `astro/config` instead (Astro 4.8+)
- Relying solely on `process.env.CI` detection — explicit `--run` more reliable

## Open Questions

1. **Should Project interface include metadata fields (createdAt, updatedAt, status)?**
   - What we know: User wants "typical case study fields"
   - What's unclear: Whether CMS metadata should be in placeholder
   - Recommendation: Omit CMS-specific metadata from placeholder — can add during Phase 8 based on actual CMS API response

2. **Should links object include additional platforms (LinkedIn post, YouTube demo, etc)?**
   - What we know: User specified "demo and GitHub links"
   - What's unclear: Whether to support other link types
   - Recommendation: Keep flexible with optional `links` object — additional properties can be added without breaking changes

3. **Should we test the placeholder types?**
   - What we know: Mirror-logic test pattern exists for component logic
   - What's unclear: Whether placeholder types need test coverage
   - Recommendation: No tests for placeholder types — they're swapped out in Phase 8, testing would be low value

## Validation Architecture

> **Note:** Nyquist validation is enabled in `.planning/config.json` (`workflow.nyquist_validation: true`)

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.1.9 |
| Config file | `vitest.config.ts` (migrated to `astro/config`) |
| Quick run command | `npm test` (post-migration with `--run` flag) |
| Full suite command | `npm test` (same — no separate suite) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TYPE-01 | TypeScript interface exists for Project | manual | Type check via `npm run typecheck` | ❌ Wave 0 |
| TYPE-02 | Project interface includes case study fields | manual | Type check via `npm run typecheck` | ❌ Wave 0 |
| DEBT-05 | Vitest uses astro/config | manual | Verify vitest.config.ts imports | ✅ (will verify migration) |
| DEBT-06 | Test script includes --run flag | manual | Verify package.json test script | ✅ (will verify update) |

### Sampling Rate
- **Per task commit:** `npm run typecheck` (verifies TypeScript interface validity)
- **Per wave merge:** `npm test && npm run typecheck` (existing tests + type checking)
- **Phase gate:** Full type checking green + vitest config validated before `/gsd-verify-work`

### Wave 0 Gaps
- No automated tests for placeholder types (intentional — types are placeholders)
- Config migration validated by inspection (verifying imports)
- Test script flag validated by inspection (verifying package.json)

*(All validation for this phase is configuration/type checking, not runtime tests)*

## Sources

### Primary (HIGH confidence)
- Astro Testing Guide - https://docs.astro.build/en/guides/testing/ (official docs)
- Astro with-vitest Example - https://github.com/withastro/astro/tree/main/examples/with-vitest (official template)
- Vitest CLI Reference - https://vitest.dev/guide/cli.html (official docs)
- TypeScript Handbook - Everyday Types - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html (official docs)

### Secondary (MEDIUM confidence)
- Astro Configuration Reference - https://docs.astro.build/en/reference/configuration-reference/ (official docs, verified config options exist)
- Docker best practices - General guidance on excluding build caches (industry standard, not Astro-specific)

### Tertiary (LOW confidence)
- None — all findings verified with official sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, official docs confirm `getViteConfig()` pattern
- Architecture: HIGH - Official Astro example template demonstrates exact pattern, Vitest docs confirm `--run` flag behavior
- Pitfalls: HIGH - Official sources document all major pitfalls (SSR errors, watch mode in CI, etc)

**Research date:** 2026-03-16
**Valid until:** 60 days (stable APIs — TypeScript/Vitest/Astro APIs unlikely to change significantly)
