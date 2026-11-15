import type { APIRoute } from 'astro';
import { getBlogPosts } from '../lib/cms';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.toString() || 'https://jake-reddy.com').replace(/\/$/, '');
  const staticPaths = ['/', '/projects', '/blog', '/about', '/cv'];
  const posts = await getBlogPosts();

  const entries = [
    ...staticPaths.map((path) => ({
      loc: `${origin}${path}`,
      lastmod: undefined as string | undefined,
    })),
    ...posts.map((post) => ({
      loc: `${origin}/blog/${post.slug}`,
      lastmod: post.publishedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
