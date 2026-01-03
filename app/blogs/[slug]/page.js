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

// // ✅ Serialize Firestore timestamps
// function serializeBlogData(data) {
//   return {
//     ...data,
//     createdAt: data.createdAt?.toDate?.().toISOString() || null,
//     updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
//     date: data.date?.toDate?.().toISOString() || null,
//   };
// }

// // ✅ Pre-generate blog slugs
// export async function generateStaticParams() {
//   const snapshot = await getDocs(collection(db, "blogs"));
//   return snapshot.docs.map((doc) => ({
//     slug: doc.data().slug,
//   }));
// }

// // ✅ Metadata for SEO
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
//     keywords: blog.keywords || [],
//     openGraph: {
//       title: blog.title,
//       description: blog.metaDescription || blog.title,
//       images: [blog.blogImageUrl],
//       url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//       type: 'article',
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
//   const resolvedParams = await params;
//   const decodedSlug = decodeURIComponent(resolvedParams.slug);
//   const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
//   const snapshot = await getDocs(q);

//   if (snapshot.empty) notFound();

//   const docSnap = snapshot.docs[0];
//   const blog = serializeBlogData(docSnap.data());
//   const blogId = docSnap.id;

//   // ✅ Increment views (non-blocking)
//   updateDoc(doc(db, "blogs", blogId), { views: increment(1) }).catch(console.error);

//   // ✅ TOC generation logic
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
//     processedContent = root.toString();
//   }

//   // ✅ COMBINED SCHEMA (Blog + FAQ + Breadcrumb)
//   const jsonLd = [
//     {
//       "@context": "https://schema.org",
//       "@type": "BlogPosting",
//       "mainEntityOfPage": {
//         "@type": "WebPage",
//         "@id": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
//       },
//       "headline": blog.title,
//       "description": blog.metaDescription || blog.title,
//       "image": blog.blogImageUrl,
//       "author": {
//         "@type": "Organization",
//         "name": "RC Tech Solutions",
//         "url": "https://www.rctechsolutions.com",
//       },
//       "publisher": {
//         "@type": "Organization",
//         "name": "RC Tech Solutions",
//         "logo": {
//           "@type": "ImageObject",
//           "url": "https://www.rctechsolutions.com/logo.png",
//         },
//       },
//       "datePublished": blog.createdAt,
//       "dateModified": blog.updatedAt || blog.createdAt,
//     },
//     {
//       "@context": "https://schema.org",
//       "@type": "BreadcrumbList",
//       "itemListElement": [
//         { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rctechsolutions.com" },
//         { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://www.rctechsolutions.com/blogs" },
//         { "@type": "ListItem", "position": 3, "name": blog.title, "item": `https://www.rctechsolutions.com/blogs/${blog.slug}` }
//       ]
//     }
//   ];

//   // If the blog is the one about "Is Web Development Dying", inject the FAQ items
//   if (blog.slug.includes("is-web-development-dying")) {
//     jsonLd.push({
//       "@context": "https://schema.org",
//       "@type": "FAQPage",
//       "mainEntity": [
//         {
//           "@type": "Question",
//           "name": "Is web development dying in 2025?",
//           "acceptedAnswer": { "@type": "Answer", "text": "No, web development is not dying. While AI handles basic code, complex custom architecture demand is growing." }
//         },
//         {
//           "@type": "Question",
//           "name": "Will AI replace web developers?",
//           "acceptedAnswer": { "@type": "Answer", "text": "AI will not replace developers; it will replace repetitive tasks, acting as a co-pilot for architects." }
//         }
//       ]
//     });
//   }

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <div className=" mx-auto px-4 py-8">
//         <div className="flex justify-center mb-6">
//           <Image
//             src={blog.blogImageUrl}
//             alt={blog.title}
//             width={1200}
//             height={600}
//             className="rounded-md object-cover"
//             priority
//           />
//         </div>

//         <BlogContentWithToc
//           blog={blog}
//           blogId={blogId}
//           toc={toc}
//           processedContent={processedContent}
//         />
//       </div>
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
  return snapshot.docs.map((docSnap) => ({
    slug: docSnap.data().slug,
  }));
}

// ✅ Metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const qRef = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(qRef);

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
      type: "article",
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

  const qRef = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(qRef);

  if (snapshot.empty) notFound();

  const docSnap = snapshot.docs[0];
  const blog = serializeBlogData(docSnap.data());
  const blogId = docSnap.id;

  // ✅ Increment views (non-blocking)
  updateDoc(doc(db, "blogs", blogId), { views: increment(1) }).catch(
    console.error
  );

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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
      },
      headline: blog.title,
      description: blog.metaDescription || blog.title,
      image: blog.blogImageUrl,
      author: {
        "@type": "Organization",
        name: "RC Tech Solutions",
        url: "https://www.rctechsolutions.com",
      },
      publisher: {
        "@type": "Organization",
        name: "RC Tech Solutions",
        logo: {
          "@type": "ImageObject",
          url: "https://www.rctechsolutions.com/logo.png",
        },
      },
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.rctechsolutions.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blogs",
          item: "https://www.rctechsolutions.com/blogs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blog.title,
          item: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
        },
      ],
    },
  ];

  // FAQ only for specific slug
  if (blog.slug && blog.slug.includes("is-web-development-dying")) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is web development dying in 2025?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, web development is not dying. While AI handles basic code, complex custom architecture demand is growing.",
          },
        },
        {
          "@type": "Question",
          name: "Will AI replace web developers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI will not replace developers; it will replace repetitive tasks, acting as a co-pilot for architects.",
          },
        },
      ],
    });
  }

  // UI helpers
  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const readingTime =
    Math.max(
      1,
      Math.ceil(
        (blog.content || "")
          .replace(/<[^>]+>/g, "")
          .split(/\s+/).length / 200
      )
    ) + " min read";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f9fafb]">
        {/* Top breadcrumb / meta bar */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 text-xs text-gray-500 flex flex-wrap items-center gap-2">
            <span className="uppercase tracking-[0.25em] text-indigo-600">
              RC TECH JOURNAL
            </span>
            <span className="hidden sm:inline text-gray-300">/</span>
            <span className="hidden sm:inline">Blogs</span>
            <span className="hidden sm:inline text-gray-300">/</span>
            <span className="line-clamp-1 text-gray-700">{blog.title}</span>
          </div>
        </div>

        {/* Main layout */}
        <main className="mx-auto max-w-6xl px-4 lg:px-6 py-8 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
            {/* Article column */}
            <article className="min-w-0">
              <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover image */}
                {blog.blogImageUrl && (
                  <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80">
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/90">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-black/40 px-3 py-1">
                          {blog.author || "RC Tech Team"}
                        </span>
                        {formattedDate && (
                          <span className="rounded-full bg-black/30 px-3 py-1">
                            {formattedDate}
                          </span>
                        )}
                      </div>
                      <span className="rounded-full bg-black/30 px-3 py-1">
                        {readingTime}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content wrapper */}
                <div className="px-5 pb-8 pt-6 sm:px-8 sm:pt-7 sm:pb-10">
                  {/* Title + chip row */}
                  <header className="mb-6 border-b border-gray-100 pb-5">
                    <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
                      {blog.category && (
                        <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                          {blog.category}
                        </span>
                      )}
                      {blog.readingLevel && (
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1">
                          {blog.readingLevel}
                        </span>
                      )}
                      {blog.views != null && (
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1">
                          {blog.views} views
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight text-gray-900">
                      {blog.title}
                    </h1>

                    {blog.metaDescription && (
                      <p className="mt-3 text-sm text-gray-600 max-w-2xl">
                        {blog.metaDescription}
                      </p>
                    )}
                  </header>

                  {/* Blog body – direct HTML */}
                  <div className="prose prose-gray max-w-none prose-img:rounded-xl prose-headings:scroll-mt-24">
                    <div
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Right column: TOC + CTA */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* TOC card */}
                {toc.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-2">
                      On this page
                    </p>
                    <nav className="space-y-1 text-sm">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={
                            "block truncate rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900 " +
                            (item.level === "H3"
                              ? "ml-3 text-xs border-l border-gray-200"
                              : "")
                          }
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Work-with-me card */}
                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-4 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600">
                    WORK WITH RC TECH
                  </p>
                  <h2 className="mt-2 text-sm font-semibold text-gray-900">
                    Turn your ideas into sharp, revenue-focused web experiences.
                  </h2>
                  <p className="mt-2 text-xs text-gray-600">
                    Custom Next.js builds, SaaS dashboards, and conversion-focused funnels for
                    founders, coaches, and D2C brands.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href="https://cal.com/your-username" // replace with your real link
                      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 transition"
                    >
                      Book a free strategy call
                    </a>
                    <a
                      href="/portfolio"
                      className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-[11px] font-medium text-gray-800 hover:bg-gray-50 transition"
                    >
                      View recent work
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
