import { NextResponse } from 'next/server';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.rctechsolutions.com';

  // Static pages
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'monthly' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/ai-powered', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/cloud-integration', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/devops-and-cloud', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/digital-branding', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/digital-marketing', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/mobile-apps', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/seo', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/web-development', priority: '0.9', changefreq: 'monthly' },
  ];

  try {
    const blogSnapshot = await getDocs(collection(db, 'blogs'));

    const blogUrls = blogSnapshot.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slug;
      const updatedAt = data.updatedAt?.toDate?.().toISOString() || new Date().toISOString();

      if (!slug) return null;

      return {
        url: `${baseUrl}/blogs/${slug}`,
        priority: '0.9',
        changefreq: 'weekly',
        lastmod: updatedAt,
      };
    }).filter(Boolean);

    // Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(({ path, priority, changefreq }) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    
    <priority>${priority}</priority>
  </url>`).join('')}
${blogUrls.map(({ url, priority, changefreq, lastmod }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
   
    <priority>${priority}</priority>
  </url>`).join('')}
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
