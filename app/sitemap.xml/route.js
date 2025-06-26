import { NextResponse } from 'next/server';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

// 🔥 This line is REQUIRED to prevent Next.js from caching this route
export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.rctechsolutions.com';

  // ✅ Static site pages
  const staticRoutes = [
    '',
    '/blogs',
    '/about',
    '/contact',
    '/services/ai-powered',
    '/services/cloud-integration',
    '/services/devops-and-cloud',
    '/services/digital-branding',
    '/services/digital-marketing',
    '/services/mobile-apps',
    '/services/seo',
    '/services/web-development',
  ];

  try {
    // ✅ Fetch all blogs from Firestore
    const blogSnapshot = await getDocs(collection(db, 'blogs'));

    const blogUrls = blogSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug;
        if (!slug) return null;
        return `${baseUrl}/blogs/${slug}`;
      })
      .filter(Boolean); // Remove nulls

    // ✅ Merge static and dynamic URLs
    const allUrls = [
      ...staticRoutes.map((path) => `${baseUrl}${path}`),
      ...blogUrls,
    ];

    // ✅ Build XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
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
