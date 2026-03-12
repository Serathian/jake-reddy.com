import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should pass basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const siteName = 'jake-reddy.com';
    expect(siteName).toContain('jake');
    expect(siteName.length).toBeGreaterThan(0);
  });

  it('should validate TypeScript types', () => {
    const config: { site: string; output: string } = {
      site: 'https://jake-reddy.com',
      output: 'static',
    };
    expect(config.site).toBe('https://jake-reddy.com');
    expect(config.output).toBe('static');
  });
});
