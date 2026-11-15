import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getBlogPostBySlug, getBlogPosts, getProjects } from '../../lib/cms';

describe('CMS client without mock fallbacks', () => {
  beforeEach(() => {
    vi.stubEnv('CMS_URL', 'http://cms.test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns an empty array when Basecamp CMS has zero projects or posts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ docs: [] }),
      })
    );

    const projects = await getProjects();
    const posts = await getBlogPosts();

    expect(projects).toEqual([]);
    expect(posts).toEqual([]);
  });

  it('returns empty arrays instead of mock data when CMS is offline in non-strict mode', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));

    const projects = await getProjects();
    const posts = await getBlogPosts();
    const post = await getBlogPostBySlug('any-slug');

    expect(projects).toEqual([]);
    expect(posts).toEqual([]);
    expect(post).toBeUndefined();
  });

  it('throws when CMS is offline or errors while CMS_REQUIRE_ONLINE is true', async () => {
    vi.stubEnv('CMS_REQUIRE_ONLINE', 'true');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')));

    await expect(getProjects()).rejects.toThrow('Network down');
    await expect(getBlogPosts()).rejects.toThrow('Network down');
  });

  it('still allows empty CMS docs array when CMS_REQUIRE_ONLINE is true', async () => {
    vi.stubEnv('CMS_REQUIRE_ONLINE', 'true');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ docs: [] }),
      })
    );

    await expect(getProjects()).resolves.toEqual([]);
    await expect(getBlogPosts()).resolves.toEqual([]);
  });

  it('maps seo_title and seo_description from CMS posts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          docs: [
            {
              title: 'Droplet Architecture',
              slug: 'droplet-architecture',
              excerpt: 'Single droplet setup.',
              body: '# Hello',
              published_at: '2026-10-01T12:00:00Z',
              reading_time_minutes: 4,
              tags: [{ name: 'Docker' }],
              featured: true,
              seo_title: 'Custom SEO Title',
              seo_description: 'Custom SEO description for crawlers.',
            },
          ],
        }),
      })
    );

    const [post] = await getBlogPosts();
    expect(post).toMatchObject({
      title: 'Droplet Architecture',
      slug: 'droplet-architecture',
      seoTitle: 'Custom SEO Title',
      seoDescription: 'Custom SEO description for crawlers.',
      tags: ['Docker'],
      readingTime: '4 min read',
      featured: true,
    });
  });
});
