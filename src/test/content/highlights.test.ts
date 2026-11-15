import { describe, it, expect } from 'vitest';

// Mirror-logic pattern: define function inline — do NOT import .astro files
interface Highlight {
  title: string;
  description: string;
}

function getHighlights(): Highlight[] {
  return [
    {
      title: 'Full-Stack Software Engineering',
      description:
        'Building production systems end-to-end with language-agnostic problem solving, performance tuning, and clean architecture.',
    },
    {
      title: 'API & System Architecture',
      description:
        'REST, GraphQL, and microservice architectures designed for clarity, versioned for longevity, and built to scale.',
    },
    {
      title: 'Developer Experience & DevOps',
      description:
        'CI/CD pipelines, Docker containerisation, and automated tooling that make shipping fast and reliable.',
    },
  ];
}

describe('getHighlights', () => {
  it('returns an array of objects with title and description properties', () => {
    const highlights = getHighlights();
    expect(Array.isArray(highlights)).toBe(true);
    highlights.forEach((item) => {
      expect(typeof item.title).toBe('string');
      expect(typeof item.description).toBe('string');
    });
  });

  it('returns between 3 and 5 items (inclusive)', () => {
    const highlights = getHighlights();
    expect(highlights.length).toBeGreaterThanOrEqual(3);
    expect(highlights.length).toBeLessThanOrEqual(5);
  });

  it('every item has a non-empty title', () => {
    const highlights = getHighlights();
    highlights.forEach((item) => {
      expect(item.title.trim().length).toBeGreaterThan(0);
    });
  });

  it('every item has a non-empty description', () => {
    const highlights = getHighlights();
    highlights.forEach((item) => {
      expect(item.description.trim().length).toBeGreaterThan(0);
    });
  });
});
