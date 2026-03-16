# Phase 6: Content Collections Foundation - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish minimal type infrastructure for Projects CMS integration and fix test infrastructure debt. CV page will be hardcoded (no data layer), Projects will fetch from external CMS API (data types provided when CMS ready).

**Scope clarification:** Original roadmap assumed Astro content collections, but architecture uses hardcoded CV + external CMS for Projects. Phase 6 creates placeholder types and fixes test infrastructure only.

</domain>

<decisions>
## Implementation Decisions

### Projects Type Interface
- Create `src/types/project.ts` with minimal placeholder interface
- Interface will be swapped out later once CMS API is ready
- Placeholder should include typical project fields (title, description, tech stack, links)
- TypeScript interface only (no Zod, no runtime validation yet)

### CV Data Architecture
- CV page is hardcoded directly in Astro component
- No content collection, no data layer, no types needed
- Content lives in the component markup

### Test Infrastructure Fixes
- Migrate `vitest.config.ts` from `vitest/config` to `astro/config` (DEBT-05)
- Add `--run` flag to `package.json` test script for CI safety (DEBT-06)
- Maintain existing mirror-logic test pattern (inline functions mirroring component logic)

### Docker Cache Handling
- Add `.astro/` directory to `.dockerignore`
- Prevents Astro build cache from bloating Docker images

### Claude's Discretion
- Exact fields in placeholder Project interface (as long as typical case study fields covered)
- Test file organization for any new test cases
- Whether to add JSDoc comments to placeholder types

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Mirror-logic test pattern**: Test files define inline functions mirroring component logic (e.g., `src/test/navigation/active-link.test.ts`)
- **Vitest globals enabled**: Tests import from 'vitest' directly without setup files

### Established Patterns
- **Test organization**: `src/test/{category}/{feature}.test.ts` structure
- **Current Vitest config**: Uses `vitest/config` with `globals: true` and `environment: 'node'`
- **CI script**: `npm test` currently runs `vitest` (missing `--run` for non-TTY safety)

### Integration Points
- Phase 8 (Projects Showcase) will import from `src/types/project.ts` for CMS API calls
- Phase 7 (CV Page) needs no data layer integration (hardcoded content)

</code_context>

<specifics>
## Specific Ideas

- "CV is going to be hard coded" — No data layer needed, content lives in component
- "Projects come from the CMS which is not in scope of this project. I will provide the CMS API and datatypes once it is ready" — Create placeholder types now, swap later
- "Strip unknown is a good tactic for schema strictness" — Noted for future validation (when CMS integration happens)

</specifics>

<deferred>
## Deferred Ideas

- Content collections entirely — Not needed for this architecture (CV hardcoded, Projects from external CMS)
- Zod validation for Projects — Will be determined when CMS API integration happens (Phase 8)
- Build-time content validation — Not applicable without content collections

</deferred>

---

*Phase: 06-content-collections-foundation*
*Context gathered: 2026-03-15*
