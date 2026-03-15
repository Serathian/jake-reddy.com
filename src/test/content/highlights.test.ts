import { describe, it, expect } from 'vitest';

// Mirror-logic pattern: define function inline — do NOT import .astro files
interface Highlight {
  title: string;
  description: string;
}

function getHighlights(): Highlight[] {
  return [
    {
      title: 'Full-Stack Engineering',
      description:
        'Five years across TypeScript, Node.js, React, and PostgreSQL — building production systems end to end.',
    },
    {
      title: 'API Design',
      description:
        'REST and GraphQL APIs designed for clarity, versioned for longevity, and documented for the next developer.',
    },
    {
      title: 'Developer Experience',
      description:
        'CI/CD pipelines, Docker containerisation, and tooling that make shipping fast and safe.',
    },
    {
      title: 'Oslo-Based',
      description:
        'Working remotely across European time zones from Oslo, Norway. Fluent in English, Norwegian.',
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
