import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogContentWithToc from './BlogContentWithToc'; // This can be a client component if needed
import React from 'react';

export const dynamic = 'force-dynamic';

// ✅ Server-side metadata generation for SEO
export async function generateMetadata({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const q = query(collection(db, 'blogs'), where('slug', '==', decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      title: 'Blog Not Found | RC Tech Solutions',
      description: 'This blog could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const blog = snapshot.docs[0].data();

  return {
    title: `${blog.title} | RC Tech Solutions`,
    description: blog.metaDescription || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.title,
      images: [blog.blogImageUrl],
      url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metaDescription || blog.title,
      images: [blog.blogImageUrl],
    },
    alternates: {
      canonical: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
    },
    metadataBase: new URL('https://www.rctechsolutions.com'),
    robots: { index: true, follow: true },
  };
}

// ✅ Server-rendered blog page
export default async function Page({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const q = query(collection(db, 'blogs'), where('slug', '==', decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const docSnap = snapshot.docs[0];
  const blog = docSnap.data();
  const blogId = docSnap.id;

  // ✅ Increment views non-blocking (optional error catch)
  updateDoc(doc(db, 'blogs', blogId), {
    views: increment(1),
  }).catch((err) => console.error('Failed to update views:', err));

  // ✅ Safely parse created/updated timestamps
  const createdAt = blog.createdAt?.toDate?.() || new Date();
  const updatedAt = blog.updatedAt?.toDate?.() || createdAt;

  const publishedDate = createdAt.toISOString();
  const modifiedDate = updatedAt.toISOString();

  return (
    <>
      {/* ✅ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
            },
            "headline": blog.title,
            "description": blog.metaDescription || blog.title,
            "image": blog.blogImageUrl,
            "author": {
              "@type": "Organization",
              "name": "RC Tech Solutions",
              "url": "https://www.rctechsolutions.com",
            },
            "publisher": {
              "@type": "Organization",
              "name": "RC Tech Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.rctechsolutions.com/logo.png",
              },
            },
            "datePublished": publishedDate,
            "dateModified": modifiedDate,
            "keywords": blog.keywords?.join(', ') || '',
            "url": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
          }),
        }}
      />

      {/* ✅ Blog Image */}
      <div className="flex justify-center mb-6">
        <Image
          src={blog.blogImageUrl}
          alt={blog.title}
          width={1200}
          height={600}
          className="rounded-md"
        />
      </div>

      {/* ✅ Main Blog Content */}
      <BlogContentWithToc blog={blog} blogId={blogId} />
    </>
  );
}
