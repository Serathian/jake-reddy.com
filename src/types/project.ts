/**
 * Placeholder interface for Project data from external CMS.
 *
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
