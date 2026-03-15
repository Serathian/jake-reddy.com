import { describe, it, expect } from 'vitest';

// Mirror-logic pattern: define function inline — do NOT import Footer.astro
interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

function getContactLinks(): ContactLink[] {
  return [
    {
      label: 'GitHub',
      href: 'https://github.com/jareddy',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jareddy',
      external: true,
    },
    {
      label: 'Email',
      href: 'mailto:jake@jake-reddy.com',
      external: false,
    },
  ];
}

describe('getContactLinks', () => {
  it('returns an array of objects with label, href, and external properties', () => {
    const links = getContactLinks();
    expect(Array.isArray(links)).toBe(true);
    links.forEach((item) => {
      expect(typeof item.label).toBe('string');
      expect(typeof item.href).toBe('string');
      expect(typeof item.external).toBe('boolean');
    });
  });

  it('returns exactly 3 items', () => {
    const links = getContactLinks();
    expect(links.length).toBe(3);
  });

  it('GitHub item href starts with "https://github.com/"', () => {
    const links = getContactLinks();
    const github = links.find((l) => l.label === 'GitHub');
    expect(github).toBeDefined();
    expect(github!.href.startsWith('https://github.com/')).toBe(true);
  });

  it('LinkedIn item href starts with "https://linkedin.com/in/"', () => {
    const links = getContactLinks();
    const linkedin = links.find((l) => l.label === 'LinkedIn');
    expect(linkedin).toBeDefined();
    expect(linkedin!.href.startsWith('https://linkedin.com/in/')).toBe(true);
  });

  it('Email item href starts with "mailto:"', () => {
    const links = getContactLinks();
    const email = links.find((l) => l.label === 'Email');
    expect(email).toBeDefined();
    expect(email!.href.startsWith('mailto:')).toBe(true);
  });

  it('all labels are non-empty strings', () => {
    const links = getContactLinks();
    links.forEach((item) => {
      expect(item.label.trim().length).toBeGreaterThan(0);
    });
  });

  it('GitHub and LinkedIn have external=true, Email has external=false', () => {
    const links = getContactLinks();
    const github = links.find((l) => l.label === 'GitHub');
    const linkedin = links.find((l) => l.label === 'LinkedIn');
    const email = links.find((l) => l.label === 'Email');
    expect(github!.external).toBe(true);
    expect(linkedin!.external).toBe(true);
    expect(email!.external).toBe(false);
  });
});
