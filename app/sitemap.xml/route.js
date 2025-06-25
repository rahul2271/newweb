import { NextResponse } from 'next/server';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path if needed

export async function GET() {
  const baseUrl = 'https://www.rctechsolutions.com';

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

  const blogSnapshot = await getDocs(collection(db, 'blogs'));

  const blogUrls = blogSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      const slug = data.slug; // ✅ use the `slug` field
      if (!slug) return null;
      return `${baseUrl}/blogs/${slug}`;
    })
    .filter(Boolean); // remove nulls

  const allUrls = [
    ...staticRoutes.map((path) => `${baseUrl}${path}`),
    ...blogUrls,
  ];

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
}
