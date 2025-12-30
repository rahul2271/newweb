// import { db } from "../../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   increment,
// } from "firebase/firestore";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import BlogContentWithToc from "./BlogContentWithToc";
// import { parse } from "node-html-parser";
// import React from "react";

// export const revalidate = 60; // ISR: regenerate every 60s

// // ✅ Serialize Firestore data for server rendering
// function serializeBlogData(data) {
//   return {
//     ...data,
//     createdAt: data.createdAt?.toDate?.().toISOString() || null,
//     updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
//     date: data.date?.toDate?.().toISOString() || null,
//   };
// }

// // ✅ Pre-generate blog slugs for static generation
// export async function generateStaticParams() {
//   const snapshot = await getDocs(collection(db, "blogs"));
//   return snapshot.docs.map((doc) => ({
//     slug: doc.data().slug,
//   }));
// }

// // ✅ Metadata for SEO
// export async function generateMetadata({ params }) {
//   const resolvedParams = await params; // ✅ await in App Router
//   const decodedSlug = decodeURIComponent(resolvedParams.slug);

//   const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
//   const snapshot = await getDocs(q);

//   if (snapshot.empty) {
//     return {
//       title: "Blog Not Found | RC Tech Solutions",
//       description: "This blog could not be found.",
//       robots: { index: false, follow: false },
//     };
//   }

//   const blog = serializeBlogData(snapshot.docs[0].data());

//   return {
//     title: `${blog.title} | RC Tech Solutions`,
//     description: blog.metaDescription || blog.title,
//     openGraph: {
//       title: blog.title,
//       description: blog.metaDescription || blog.title,
//       images: [blog.blogImageUrl],
//       url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: blog.metaDescription || blog.title,
//       images: [blog.blogImageUrl],
//     },
//     alternates: {
//       canonical: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//     },
//     metadataBase: new URL("https://www.rctechsolutions.com"),
//     robots: { index: true, follow: true },
//   };
// }

// // ✅ Main Blog Page
// export default async function Page({ params }) {
//   const decodedSlug = decodeURIComponent(params.slug);
//   const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
//   const snapshot = await getDocs(q);

//   if (snapshot.empty) notFound();

//   const docSnap = snapshot.docs[0];
//   const blog = serializeBlogData(docSnap.data());
//   const blogId = docSnap.id;

//   // ✅ Increment views (non-blocking)
//   updateDoc(doc(db, "blogs", blogId), { views: increment(1) }).catch(console.error);

//   // ✅ Server-side TOC generation using node-html-parser
//   let toc = [];
//   let processedContent = blog.content || "";

//   if (blog.content) {
//     const root = parse(blog.content);
//     const headings = root.querySelectorAll("h2, h3");

//     toc = headings.map((heading, index) => {
//       const id = `heading-${index}`;
//       heading.setAttribute("id", id);
//       return { id, text: heading.textContent, level: heading.tagName };
//     });

//     processedContent = root.toString(); // HTML with IDs injected
//   }

//   return (
//     <>
//       {/* JSON-LD Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             mainEntityOfPage: {
//               "@type": "WebPage",
//               "@id": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//             },
//             headline: blog.title,
//             description: blog.metaDescription || blog.title,
//             image: blog.blogImageUrl,
//             author: {
//               "@type": "Organization",
//               name: "RC Tech Solutions",
//               url: "https://www.rctechsolutions.com",
//             },
//             publisher: {
//               "@type": "Organization",
//               name: "RC Tech Solutions",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://www.rctechsolutions.com/logo.png",
//               },
//             },
//             datePublished: blog.createdAt,
//             dateModified: blog.updatedAt || blog.createdAt,
//             keywords: blog.keywords?.join(", ") || "",
//             url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//           }),
//         }}
//       />

//       {/* Blog Image */}
//       <div className="flex justify-center mb-6">
//         <Image
//           src={blog.blogImageUrl}
//           alt={blog.title}
//           width={1200}
//           height={600}
//           className="rounded-md"
//         />
//       </div>

//       {/* Blog Content with server-side TOC */}
//       <BlogContentWithToc
//         blog={blog}
//         blogId={blogId}
//         toc={toc}
//         processedContent={processedContent}
//       />
//     </>
//   );
// }





// import { db } from "../../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   increment,
// } from "firebase/firestore";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import BlogContentWithToc from "./BlogContentWithToc";
// import { parse } from "node-html-parser";
// import React from "react";

// export const revalidate = 60; // ISR: regenerate every 60s

// // ✅ Serialize Firestore timestamps for server rendering
// function serializeBlogData(data) {
//   return {
//     ...data,
//     createdAt: data.createdAt?.toDate?.().toISOString() || null,
//     updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
//     date: data.date?.toDate?.().toISOString() || null,
//   };
// }

// // ✅ Pre-generate blog slugs for static generation
// export async function generateStaticParams() {
//   const snapshot = await getDocs(collection(db, "blogs"));
//   return snapshot.docs.map((doc) => ({
//     slug: doc.data().slug,
//   }));
// }

// // ✅ Metadata for SEO (now includes meta keywords)
// export async function generateMetadata({ params }) {
//   const resolvedParams = await params;
//   const decodedSlug = decodeURIComponent(resolvedParams.slug);

//   const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
//   const snapshot = await getDocs(q);

//   if (snapshot.empty) {
//     return {
//       title: "Blog Not Found | RC Tech Solutions",
//       description: "This blog could not be found.",
//       robots: { index: false, follow: false },
//     };
//   }

//   const blog = serializeBlogData(snapshot.docs[0].data());

//   return {
//     title: `${blog.title} | RC Tech Solutions`,
//     description: blog.metaDescription || blog.title,
//     keywords: blog.keywords || [], // ✅ Added: generates <meta name="keywords">
//     openGraph: {
//       title: blog.title,
//       description: blog.metaDescription || blog.title,
//       images: [blog.blogImageUrl],
//       url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: blog.metaDescription || blog.title,
//       images: [blog.blogImageUrl],
//     },
//     alternates: {
//       canonical: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//     },
//     metadataBase: new URL("https://www.rctechsolutions.com"),
//     robots: { index: true, follow: true },
//   };
// }

// // ✅ Main Blog Page
// export default async function Page({ params }) {
//   const decodedSlug = decodeURIComponent(params.slug);
//   const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
//   const snapshot = await getDocs(q);

//   if (snapshot.empty) notFound();

//   const docSnap = snapshot.docs[0];
//   const blog = serializeBlogData(docSnap.data());
//   const blogId = docSnap.id;

//   // ✅ Increment views asynchronously
//   updateDoc(doc(db, "blogs", blogId), { views: increment(1) }).catch(console.error);

//   // ✅ Server-side Table of Contents generation
//   let toc = [];
//   let processedContent = blog.content || "";

//   if (blog.content) {
//     const root = parse(blog.content);
//     const headings = root.querySelectorAll("h2, h3");

//     toc = headings.map((heading, index) => {
//       const id = `heading-${index}`;
//       heading.setAttribute("id", id);
//       return { id, text: heading.textContent, level: heading.tagName };
//     });

//     processedContent = root.toString(); // HTML with heading IDs
//   }

//   return (
//     <>
//       {/* ✅ JSON-LD Schema for SEO */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             mainEntityOfPage: {
//               "@type": "WebPage",
//               "@id": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//             },
//             headline: blog.title,
//             description: blog.metaDescription || blog.title,
//             image: blog.blogImageUrl,
//             author: {
//               "@type": "Organization",
//               name: "RC Tech Solutions",
//               url: "https://www.rctechsolutions.com",
//             },
//             publisher: {
//               "@type": "Organization",
//               name: "RC Tech Solutions",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://www.rctechsolutions.com/logo.png",
//               },
//             },
//             datePublished: blog.createdAt,
//             dateModified: blog.updatedAt || blog.createdAt,
//             keywords: blog.keywords?.join(", ") || "",
//             url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//           }),
//         }}
//       />

//       {/* ✅ Blog Featured Image */}
//       <div className="flex justify-center mb-6">
//         <Image
//           src={blog.blogImageUrl}
//           alt={blog.title}
//           width={1200}
//           height={600}
//           className="rounded-md"
//         />
//       </div>

//       {/* ✅ Blog Content + Table of Contents */}
//       <BlogContentWithToc
//         blog={blog}
//         blogId={blogId}
//         toc={toc}
//         processedContent={processedContent}
//       />
//     </>
//   );
// }

import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogContentWithToc from "./BlogContentWithToc";
import { parse } from "node-html-parser";
import React from "react";

export const revalidate = 60; // ISR: regenerate every 60s

// ✅ Serialize Firestore timestamps
function serializeBlogData(data) {
  return {
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() || null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
    date: data.date?.toDate?.().toISOString() || null,
  };
}

// ✅ Pre-generate blog slugs
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "blogs"));
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }));
}

// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      title: "Blog Not Found | RC Tech Solutions",
      description: "This blog could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const blog = serializeBlogData(snapshot.docs[0].data());

  return {
    title: `${blog.title} | RC Tech Solutions`,
    description: blog.metaDescription || blog.title,
    keywords: blog.keywords || [],
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.title,
      images: [blog.blogImageUrl],
      url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
      type: 'article',
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription || blog.title,
      images: [blog.blogImageUrl],
    },
    alternates: {
      canonical: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
    },
    metadataBase: new URL("https://www.rctechsolutions.com"),
    robots: { index: true, follow: true },
  };
}

// ✅ Main Blog Page
export default async function Page({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) notFound();

  const docSnap = snapshot.docs[0];
  const blog = serializeBlogData(docSnap.data());
  const blogId = docSnap.id;

  // ✅ Increment views (non-blocking)
  updateDoc(doc(db, "blogs", blogId), { views: increment(1) }).catch(console.error);

  // ✅ TOC generation logic
  let toc = [];
  let processedContent = blog.content || "";
  if (blog.content) {
    const root = parse(blog.content);
    const headings = root.querySelectorAll("h2, h3");
    toc = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);
      return { id, text: heading.textContent, level: heading.tagName };
    });
    processedContent = root.toString();
  }

  // ✅ COMBINED SCHEMA (Blog + FAQ + Breadcrumb)
  const jsonLd = [
    {
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
      "datePublished": blog.createdAt,
      "dateModified": blog.updatedAt || blog.createdAt,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rctechsolutions.com" },
        { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.rctechsolutions.com/blogs" },
        { "@type": "ListItem", "position": 3, "name": blog.title, "item": `https://www.rctechsolutions.com/blogs/${blog.slug}` }
      ]
    }
  ];

  // If the blog is the one about "Is Web Development Dying", inject the FAQ items
  if (blog.slug.includes("is-web-development-dying")) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is web development dying in 2025?",
          "acceptedAnswer": { "@type": "Answer", "text": "No, web development is not dying. While AI handles basic code, complex custom architecture demand is growing." }
        },
        {
          "@type": "Question",
          "name": "Will AI replace web developers?",
          "acceptedAnswer": { "@type": "Answer", "text": "AI will not replace developers; it will replace repetitive tasks, acting as a co-pilot for architects." }
        }
      ]
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-6">
          <Image
            src={blog.blogImageUrl}
            alt={blog.title}
            width={1200}
            height={600}
            className="rounded-md object-cover"
            priority
          />
        </div>

        <BlogContentWithToc
          blog={blog}
          blogId={blogId}
          toc={toc}
          processedContent={processedContent}
        />
      </div>
    </>
  );
}
