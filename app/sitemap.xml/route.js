import { NextResponse } from 'next/server';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

// Prevent Next.js caching
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.rctechsolutions.com';

  // Static pages with custom priorities
  const staticRoutes = [
    { path: '', priority: '1.0' }, // Homepage — highest priority
    { path: '/about', priority: '0.9' },
    { path: '/contact', priority: '0.9' },
    { path: '/blogs', priority: '0.9' },
    { path: '/services/ai-powered', priority: '0.9' },
    { path: '/services/cloud-integration', priority: '0.9' },
    { path: '/services/devops-and-cloud', priority: '0.9' },
    { path: '/services/digital-branding', priority: '0.9' },
    { path: '/services/digital-marketing', priority: '0.9' },
    { path: '/services/mobile-apps', priority: '0.9' },
    { path: '/services/seo', priority: '0.9' },
    { path: '/services/web-development', priority: '0.9' },
  ];

  try {
    // Fetch blog posts from Firestore
    const blogSnapshot = await getDocs(collection(db, 'blogs'));

    const blogUrls = blogSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug;
        if (!slug) return null;
        return {
          url: `${baseUrl}/blogs/${slug}`,
          priority: '0.9', // Blogs – slightly lower priority
        };
      })
      .filter(Boolean);

    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    ({ path, priority }) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
${blogUrls
  .map(
    ({ url, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Failed to generate sitemap', { status: 500 });
  }
}
