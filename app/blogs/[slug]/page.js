import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import BlogContentWithToc from './BlogContentWithToc';

export const dynamic = 'force-dynamic';

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

export default async function Page({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const q = query(collection(db, 'blogs'), where('slug', '==', decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const blog = snapshot.docs[0].data();
  const blogId = snapshot.docs[0].id;

  // Increment views (non-blocking)
  updateDoc(doc(db, 'blogs', blogId), {
    views: increment(1),
  });

  return (
    <>
      {/* ✅ Centered Featured Image */}
      <div className="flex justify-center mb-6">
        <Image
          src={blog.blogImageUrl}
          alt={blog.title}
          width={1200}
          height={600}
          className="rounded-md"
        />
      </div>

      {/* ✅ Blog Content with TOC + Comments */}
      <BlogContentWithToc blog={blog} blogId={blogId} />
    </>
  );
}
