import type { Project, BlogPost } from '../types';

type ProcessLike = { env?: Record<string, string | undefined> };

function getEnv(key: string): string | undefined {
  const proc = (globalThis as { process?: ProcessLike }).process;
  return proc?.env?.[key] ?? (import.meta.env as Record<string, string | undefined>)[key];
}

function getCmsUrl(): string {
  return getEnv('CMS_URL') || 'http://localhost:3000';
}

function isCmsStrictMode(): boolean {
  return getEnv('CMS_REQUIRE_ONLINE') === 'true';
}

type CmsTag = string | { name?: string };

interface CmsProjectLink {
  label: string;
  url: string;
}

interface CmsProjectDoc {
  title: string;
  slug: string;
  description: string;
  tags?: CmsTag[];
  links?: CmsProjectLink[];
  featured?: boolean;
}

interface CmsBlogPostDoc {
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  published_at?: string;
  createdAt?: string;
  reading_time_minutes?: number;
  tags?: CmsTag[];
  featured?: boolean;
  seo_title?: string;
  seo_description?: string;
}

interface CmsListResponse<T> {
  docs?: T[];
}

function mapTags(tags?: CmsTag[]): string[] {
  return tags?.map((t) => (typeof t === 'string' ? t : t.name || '')) || [];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${getCmsUrl()}/api/jr_projects?limit=100`, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`CMS status ${res.status}`);
    const data = (await res.json()) as CmsListResponse<CmsProjectDoc>;

    if (data.docs && Array.isArray(data.docs)) {
      return data.docs.map((doc) => ({
        title: doc.title,
        slug: doc.slug,
        description: doc.description,
        tags: mapTags(doc.tags),
        links: doc.links?.map((l) => ({ label: l.label, url: l.url })) || [],
        featured: doc.featured || false,
      }));
    }

    return [];
  } catch (err) {
    if (isCmsStrictMode()) {
      throw err instanceof Error
        ? err
        : new Error('Basecamp CMS unreachable while fetching projects');
    }
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${getCmsUrl()}/api/jr_posts?where[status][equals]=published&sort=-published_at&limit=100`,
      {
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!res.ok) throw new Error(`CMS status ${res.status}`);
    const data = (await res.json()) as CmsListResponse<CmsBlogPostDoc>;

    if (data.docs && Array.isArray(data.docs)) {
      return data.docs.map((doc) => ({
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt || '',
        content: doc.body || '',
        publishedAt: doc.published_at || doc.createdAt || '',
        readingTime: doc.reading_time_minutes ? `${doc.reading_time_minutes} min read` : undefined,
        tags: mapTags(doc.tags),
        featured: doc.featured || false,
        seoTitle: doc.seo_title || undefined,
        seoDescription: doc.seo_description || undefined,
      }));
    }

    return [];
  } catch (err) {
    if (isCmsStrictMode()) {
      throw err instanceof Error ? err : new Error('Basecamp CMS unreachable while fetching posts');
    }
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}
