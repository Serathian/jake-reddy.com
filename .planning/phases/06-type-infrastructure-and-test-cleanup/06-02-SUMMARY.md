---
phase: 06-type-infrastructure-and-test-cleanup
plan: 02
subsystem: testing
tags: [vitest, astro, docker, ci-cd, test-infrastructure]

# Dependency graph
requires:
  - phase: 01-foundation-infrastructure
    provides: Vitest test framework setup
provides:
  - Vitest config using Astro's getViteConfig() for component testing support
  - CI-safe test script with --run flag
  - Optimized Docker builds excluding .astro/ cache
affects: [08-projects-showcase, future-component-testing]

# Tech tracking
tech-stack:
  added: []
  patterns: [astro-vitest-integration, ci-safe-testing, docker-cache-exclusion]

key-files:
  created: []
  modified:
    - vitest.config.ts
    - package.json
    - .dockerignore

key-decisions:
  - "Upgraded Vitest from 2.1.9 to 3.2.4 (required for Astro 6 getViteConfig() compatibility)"
  - "Used triple-slash reference '/// <reference types=\"vitest\" />' not 'vitest/config'"
  - "Added .astro/ with trailing slash to .dockerignore for explicit directory exclusion"

patterns-established:
  - "Astro + Vitest integration: Use getViteConfig() from astro/config for proper Vite config inheritance"
  - "CI-safe testing: Explicit --run flag in package.json test script prevents watch mode hanging"
  - "Docker optimization: Exclude build caches (.astro/) to prevent 10-50MB image bloat"

requirements-completed: [DEBT-05, DEBT-06]

# Metrics
duration: 4min
completed: 2026-03-16
---

# Phase 6 Plan 2: Test Infrastructure Debt Cleanup Summary

**Migrated Vitest to Astro's official getViteConfig() helper, added CI-safe --run flag, and optimized Docker builds by excluding Astro cache**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-16T10:23:22Z
- **Completed:** 2026-03-16T10:27:45Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Vitest config migrated to use Astro's official integration pattern (enables future component testing)
- Test script now CI-safe with explicit --run flag (prevents hanging in non-TTY environments)
- Docker builds optimized by excluding .astro/ cache directory (reduces image size)
- All 20 existing tests passing with new configuration

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate Vitest config to astro/config** - `2fd3cf4` (feat)
2. **Task 2: Add --run flag to test script and exclude .astro/ from Docker** - `bb87886` (chore)

**Plan metadata:** (to be committed after STATE.md update)

## Files Created/Modified
- `vitest.config.ts` - Migrated from vitest/config defineConfig() to astro/config getViteConfig()
- `package.json` - Updated test script from 'vitest' to 'vitest --run', upgraded Vitest to 3.2.4
- `.dockerignore` - Added .astro/ to exclude Astro build cache from Docker images

## Decisions Made

**Vitest version upgrade required:** Discovered that getViteConfig() from astro/config requires Vitest 3.x to work with Astro 6. The original project used Vitest 2.1.9, which caused SSR initialization errors. Upgraded to Vitest 3.2.4 (matching official Astro template) resolved the issue.

**Triple-slash reference syntax:** Official Astro template uses `/// <reference types="vitest" />` not `/// <reference types="vitest/config" />`. The simpler syntax works correctly with getViteConfig().

**.astro/ exclusion pattern:** Used `.astro/` with trailing slash in .dockerignore for explicit directory exclusion, following Docker best practices for clarity.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Upgraded Vitest to 3.2.4 for Astro 6 compatibility**
- **Found during:** Task 1 (Migrate Vitest config)
- **Issue:** getViteConfig() from astro/config caused "Cannot read properties of undefined (reading 'ssr')" error with Vitest 2.1.9. The Astro vite-plugin-head plugin failed to initialize properly with older Vitest version.
- **Fix:** Upgraded vitest from ^2.1.9 to ^3.2.4 and @vitest/ui from ^2.1.9 to ^3.2.4 to match official Astro with-vitest template
- **Files modified:** package.json, package-lock.json
- **Verification:** npm test passes with all 20 tests, getViteConfig() loads without SSR errors
- **Committed in:** 2fd3cf4 (part of Task 1 commit)

**2. [Rule 3 - Blocking] Corrected triple-slash reference syntax**
- **Found during:** Task 1 (Migrate Vitest config)
- **Issue:** Research suggested `/// <reference types="vitest/config" />` but official Astro template uses `/// <reference types="vitest" />`
- **Fix:** Used simpler `/// <reference types="vitest" />` syntax matching official template
- **Files modified:** vitest.config.ts
- **Verification:** TypeScript recognizes Vitest config types, no IDE errors
- **Committed in:** 2fd3cf4 (part of Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking issues)
**Impact on plan:** Both fixes necessary for correct migration. Vitest version upgrade was critical discovery - plan research was based on Vitest 2.x assumptions, but Astro 6 requires Vitest 3.x. No scope creep - both changes support the planned migration.

## Issues Encountered

**Initial SSR initialization error:** First attempt at migration produced "Cannot read properties of undefined (reading 'ssr')" error. Root cause was Vitest version incompatibility. The project had Vitest 2.1.9 installed (from Phase 1), but Astro 6's getViteConfig() requires Vitest 3.x. Verification with official Astro template (which uses Vitest 3.2.4) confirmed the version requirement. Upgrade resolved the issue immediately.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Test infrastructure debt resolved. Vitest now properly integrated with Astro's Vite configuration, enabling future component testing via Container API (Phase 8+). CI safety improved with explicit --run flag. Docker builds optimized by excluding Astro cache.

Phase 6 complete (2/2 plans). Ready for Phase 7 planning: CV Page implementation.

---
*Phase: 06-type-infrastructure-and-test-cleanup*
*Completed: 2026-03-16*
