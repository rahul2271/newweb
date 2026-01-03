// // // app/blogs/page.jsx
// // import { db } from "../firebase";
// // import {
// //   collection,
// //   getDocs,
// //   query,
// //   orderBy,
// //   limit,
// // } from "firebase/firestore";
// // import Image from "next/image";
// // import Link from "next/link";
// // import Script from "next/script";
// // import { notFound } from "next/navigation";

// // // --- Utils ---
// // const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

// // const formatDate = (dateValue) => {
// //   try {
// //     if (!dateValue) return "Unpublished";
// //     if (typeof dateValue.toDate === "function") {
// //       return dateValue.toDate().toLocaleDateString("en-IN", {
// //         day: "numeric",
// //         month: "short",
// //         year: "numeric",
// //       });
// //     }
// //     if (dateValue instanceof Date) {
// //       return dateValue.toLocaleDateString("en-IN", {
// //         day: "numeric",
// //         month: "short",
// //         year: "numeric",
// //       });
// //     }
// //     const parsed = new Date(dateValue);
// //     if (!isNaN(parsed)) {
// //       return parsed.toLocaleDateString("en-IN", {
// //         day: "numeric",
// //         month: "short",
// //         year: "numeric",
// //       });
// //     }
// //     return "Unpublished";
// //   } catch {
// //     return "Unpublished";
// //   }
// // };

// // const computeReadingTime = (html) => {
// //   const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
// //   return Math.max(1, Math.ceil(words / 200));
// // };

// // // --- Fetch Blogs ---
// // async function fetchBlogs({ search = "", category = "All", page = 1 }) {
// //   const blogs = [];
// //   const PAGE_SIZE = 6;

// //   try {
// //     const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(30));
// //     const snapshot = await getDocs(q);
// //     snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));
// //   } catch (e) {
// //     console.error("Error fetching blogs:", e);
// //     return { blogs: [], total: 0 };
// //   }

// //   // Filtering
// //   let filtered = blogs;
// //   if (search) {
// //     filtered = filtered.filter(
// //       (b) =>
// //         b.title.toLowerCase().includes(search.toLowerCase()) ||
// //         stripHtmlTags(b.content).toLowerCase().includes(search.toLowerCase())
// //     );
// //   }
// //   if (category !== "All") {
// //     filtered = filtered.filter((b) => b.category === category);
// //   }

// //   // ✅ Sort by date after filtering
// //   filtered = filtered.sort((a, b) => {
// //     const dateA = a.date?.toDate?.() || (a.date ? new Date(a.date) : new Date(0));
// //     const dateB = b.date?.toDate?.() || (b.date ? new Date(b.date) : new Date(0));
// //     return dateB - dateA; // newest first
// //   });

// //   // Pagination
// //   const start = (page - 1) * PAGE_SIZE;
// //   const end = start + PAGE_SIZE;
// //   const paginated = filtered.slice(start, end);

// //   return { blogs: paginated, total: filtered.length };
// // }

// // // --- Fetch Blogs for Metadata ---
// // async function fetchBlogsForMeta() {
// //   const blogs = [];
// //   try {
// //     const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(5));
// //     const snapshot = await getDocs(q);
// //     snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));
// //   } catch (e) {
// //     console.error("Error fetching blogs for metadata:", e);
// //   }
// //   return blogs;
// // }

// // // ✅ Generate Metadata
// // export async function generateMetadata() {
// //   const blogs = await fetchBlogsForMeta();

// //   const titles = blogs.map((b) => b.title).join(", ").slice(0, 150);
// //   const descriptions = blogs
// //     .map((b) => (b.content ? b.content.slice(0, 100) : ""))
// //     .join(" | ")
// //     .slice(0, 250);

// //   // ✅ Collect metaKeywords from Firestore
// //   const keywords = blogs
// //     .flatMap((b) =>
// //       Array.isArray(b.metaKeywords)
// //         ? b.metaKeywords
// //         : (b.metaKeywords || "").split(",")
// //     )
// //     .map((kw) => kw.trim())
// //     .filter(Boolean);

// //   return {
// //     title: "RC Tech Journal – Explore All Articles",
// //     description:
// //       descriptions ||
// //       "Explore trending blogs on technology, career growth, freelancing, and web development.",
// //     keywords, // 👈 will generate <meta name="keywords">
// //     openGraph: {
// //       title: "RC Tech Journal",
// //       description:
// //         descriptions ||
// //         "Explore trending blogs on technology, career growth, freelancing, and web development.",
// //       url: "https://www.rctechsolutions.com/blogs",
// //     },
// //     twitter: {
// //       card: "summary_large_image",
// //       title: "RC Tech Journal",
// //       description:
// //         descriptions ||
// //         "Explore trending blogs on technology, career growth, freelancing, and web development.",
// //     },
// //   };
// // }

// // // ✅ Blogs Page Component
// // export default async function BlogsPage({ searchParams }) {
// //   const params = await searchParams;
// //   const search = params?.search || "";
// //   const category = params?.category || "All";
// //   const page = parseInt(params?.page || "1", 10);

// //   const { blogs, total } = await fetchBlogs({ search, category, page });
// //   if (!blogs) return notFound();

// //   // ✅ Featured always shows latest 2 blogs
// //   const featured = blogs.slice(0, 2);
// //   const categories = ["All", ...new Set(blogs.map((b) => b.category))];
// //   const totalPages = Math.ceil(total / 6);

// //   return (
// //     <div className="min-h-screen bg-white text-black ">
// //       <Script
// //         id="blogs-schema"
// //         type="application/ld+json"
// //         dangerouslySetInnerHTML={{
// //           __html: JSON.stringify({
// //             "@context": "https://schema.org",
// //             "@type": "Blog",
// //             url: "https://www.rctechsolutions.com/blogs",
// //             name: "RC Tech Solutions Blogs",
// //             description:
// //               "Explore trending blogs by RC Tech Solutions on web development, freelancing, design, tech, SEO, and career growth.",
// //             publisher: {
// //               "@type": "Organization",
// //               name: "RC Tech Solutions",
// //               logo: {
// //                 "@type": "ImageObject",
// //                 url: "https://www.rctechsolutions.com/logo.png",
// //               },
// //             },
// //             potentialAction: {
// //               "@type": "ContactAction",
// //               target: "https://www.rctechsolutions.com/contact",
// //               name: "Book Free 1:1 Consultation",
// //             },
// //             inLanguage: "en-IN",
// //           }),
// //         }}
// //       />

// //       {/* Hero Section */}
// //       <section className="text-center py-20 px-6 bg-gradient-to-r from-[#7b3fe4] to-indigo-500 text-white">
// //         <h1 className="text-5xl font-bold">RC Tech Journal</h1>
// //         <p className="mt-3 text-lg opacity-90">
// //           Fresh perspectives on tech, freelancing, design & growth.
// //         </p>
// //       </section>

// //       {/* Search + Filter */}
// //       <section className="max-w-7xl mx-auto px-6 py-8">
// //         <form className="flex flex-col md:flex-row justify-between items-center gap-4">
// //           <input
// //             type="text"
// //             name="search"
// //             defaultValue={search}
// //             placeholder="Search articles..."
// //             className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl "
// //           />
// //           <select
// //             name="category"
// //             defaultValue={category}
// //             className="px-4 py-2 rounded-xl border "
// //           >
// //             {categories.map((cat) => (
// //               <option key={cat}>{cat}</option>
// //             ))}
// //           </select>
// //           <button
// //             type="submit"
// //             className="px-6 py-2 rounded-xl bg-[#7b3fe4] text-white hover:bg-[#6a32c9]"
// //           >
// //             Apply
// //           </button>
// //         </form>
// //       </section>

// //       {/* Featured Articles */}
// //       {featured.length > 0 && (
// //         <section className="max-w-7xl mx-auto px-6 py-12">
// //           <h2 className="text-xl font-semibold mb-6">🌟 Featured Articles</h2>
// //           <div className="grid md:grid-cols-2 gap-6">
// //             {featured.map((blog) => (
// //               <Link
// //                 key={blog.id}
// //                 href={`/blogs/${blog.slug}`}
// //                 className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
// //               >
// //                 <div className="relative h-60">
// //                   {blog.blogImageUrl && (
// //                     <Image
// //                       src={blog.blogImageUrl}
// //                       alt={blog.title}
// //                       fill
// //                       className="object-cover group-hover:scale-105 transition-transform duration-500"
// //                     />
// //                   )}
// //                 </div>
// //                 <div className="p-5">
// //                   <h3 className="text-2xl font-bold mb-2 group-hover:text-[#7b3fe4]">
// //                     {blog.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 line-clamp-3">
// //                     {stripHtmlTags(blog.content).slice(0, 150)}...
// //                   </p>
// //                   <div className="mt-3 text-xs text-gray-500 flex gap-2">
// //                     <span>{blog.author || "RC Tech Team"}</span>
// //                     • <span>{formatDate(blog.date)}</span> •{" "}
// //                     <span>{computeReadingTime(blog.content)} min read</span>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </section>
// //       )}

// //       {/* Blog Grid */}
// //       <section className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {blogs.map((blog) => (
// //           <div key={blog.id}>
// //             <Link
// //               href={`/blogs/${blog.slug}`}
// //               className="group block rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
// //             >
// //               <div className="relative h-40">
// //                 {blog.blogImageUrl && (
// //                   <Image
// //                     src={blog.blogImageUrl}
// //                     alt={blog.title}
// //                     fill
// //                     className="object-cover group-hover:scale-105 transition-transform duration-500"
// //                   />
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#7b3fe4]">
// //                   {blog.title}
// //                 </h3>
// //                 <p className="text-sm text-gray-600 line-clamp-3">
// //                   {stripHtmlTags(blog.content).slice(0, 120)}...
// //                 </p>
// //                 <div className="mt-2 text-xs text-gray-500 flex gap-2">
// //                   <span>{blog.author || "RC Tech Team"}</span>
// //                   • <span>{formatDate(blog.date)}</span> •{" "}
// //                   <span>{computeReadingTime(blog.content)} min</span>
// //                 </div>
// //               </div>
// //             </Link>
// //           </div>
// //         ))}
// //       </section>

// //       {/* Pagination */}
// //       <div className="text-center my-8 flex justify-center gap-4">
// //         {Array.from({ length: totalPages }, (_, i) => (
// //           <Link
// //             key={i}
// //             href={`/blogs?search=${search}&category=${category}&page=${i + 1}`}
// //             className={`px-4 py-2 rounded-lg ${
// //               page === i + 1 ? "bg-[#7b3fe4] text-white" : "bg-gray-100"
// //             }`}
// //           >
// //             {i + 1}
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// // app/blogs/page.jsx
// export const revalidate = 60;

// import { db } from "../firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
// } from "firebase/firestore";
// import Image from "next/image";
// import Link from "next/link";
// import Script from "next/script";
// import { notFound } from "next/navigation";

// // ---------- Utils ----------
// const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

// const formatDate = (dateValue) => {
//   try {
//     if (!dateValue) return "Unpublished";
//     if (typeof dateValue.toDate === "function") {
//       return dateValue.toDate().toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//     }
//     return new Date(dateValue).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return "Unpublished";
//   }
// };

// const computeReadingTime = (html) => {
//   const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
//   return Math.max(1, Math.ceil(words / 200));
// };

// // ---------- Fetch Blogs ----------
// async function fetchBlogs({ search = "", category = "All" }) {
//   const PAGE_SIZE = 6;
//   const blogs = [];

//   let q = query(
//     collection(db, "blogs"),
//     orderBy("date", "desc"),
//     limit(PAGE_SIZE)
//   );

//   if (category !== "All") {
//     q = query(
//       collection(db, "blogs"),
//       where("category", "==", category),
//       orderBy("date", "desc"),
//       limit(PAGE_SIZE)
//     );
//   }

//   const snapshot = await getDocs(q);
//   snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));

//   let filtered = blogs;
//   if (search) {
//     const s = search.toLowerCase();
//     filtered = filtered.filter(
//       (b) =>
//         b.title?.toLowerCase().includes(s) ||
//         stripHtmlTags(b.content || "").toLowerCase().includes(s)
//     );
//   }

//   return { blogs: filtered, total: filtered.length };
// }

// // ---------- Metadata ----------
// export async function generateMetadata() {
//   return {
//     title: "RC Tech Journal – Explore All Articles",
//     description:
//       "Explore trending blogs on technology, career growth, freelancing, and web development.",
//     openGraph: {
//       title: "RC Tech Journal",
//       description:
//         "Explore trending blogs on technology, career growth, freelancing, and web development.",
//       url: "https://www.rctechsolutions.com/blogs",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "RC Tech Journal",
//       description:
//         "Explore trending blogs on technology, career growth, freelancing, and web development.",
//     },
//   };
// }

// // ---------- Page ----------
// export default async function BlogsPage({ searchParams }) {
//   const search = searchParams?.search || "";
//   const category = searchParams?.category || "All";

//   const { blogs } = await fetchBlogs({ search, category });
//   if (!blogs) return notFound();

//   const featured = blogs.slice(0, 2);
//   const categories = ["All", ...new Set(blogs.map((b) => b.category))];

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <Script
//         id="blogs-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Blog",
//             url: "https://www.rctechsolutions.com/blogs",
//             name: "RC Tech Solutions Blogs",
//             description:
//               "Explore trending blogs by RC Tech Solutions on web development, freelancing, design, tech, SEO, and career growth.",
//             publisher: {
//               "@type": "Organization",
//               name: "RC Tech Solutions",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://www.rctechsolutions.com/logo.png",
//               },
//             },
//             inLanguage: "en-IN",
//           }),
//         }}
//       />

//       {/* Hero */}
//       <section className="text-center py-20 px-6 bg-gradient-to-r from-[#7b3fe4] to-indigo-500 text-white">
//         <h1 className="text-5xl font-bold">RC Tech Journal</h1>
//         <p className="mt-3 text-lg opacity-90">
//           Fresh perspectives on tech, freelancing, design & growth.
//         </p>
//       </section>

//       {/* Search + Filter */}
//       <section className="max-w-7xl mx-auto px-6 py-8">
//         <form className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             name="search"
//             defaultValue={search}
//             placeholder="Search articles..."
//             className="w-full md:w-1/2 px-4 py-2 border rounded-xl"
//           />
//           <select
//             name="category"
//             defaultValue={category}
//             className="px-4 py-2 rounded-xl border"
//           >
//             {categories.map((cat) => (
//               <option key={cat}>{cat}</option>
//             ))}
//           </select>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-xl bg-[#7b3fe4] text-white hover:bg-[#6a32c9]"
//           >
//             Apply
//           </button>
//         </form>
//       </section>

//       {/* Featured */}
//       {featured.length > 0 && (
//         <section className="max-w-7xl mx-auto px-6 py-12">
//           <h2 className="text-xl font-semibold mb-6">🌟 Featured Articles</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             {featured.map((blog) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
//               >
//                 <div className="relative h-60">
//                   {blog.blogImageUrl && (
//                     <Image
//                       src={blog.blogImageUrl}
//                       alt={blog.title}
//                       fill
//                       priority
//                       className="object-cover group-hover:scale-105 transition-transform"
//                     />
//                   )}
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-2xl font-bold mb-2 group-hover:text-[#7b3fe4]">
//                     {blog.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 line-clamp-3">
//                     {stripHtmlTags(blog.content).slice(0, 150)}...
//                   </p>
//                   <div className="mt-3 text-xs text-gray-500 flex gap-2">
//                     <span>{blog.author || "RC Tech Team"}</span> •{" "}
//                     <span>{formatDate(blog.date)}</span> •{" "}
//                     <span>{computeReadingTime(blog.content)} min read</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Grid */}
//       <section className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogs.map((blog) => (
//           <Link
//             key={blog.id}
//             href={`/blogs/${blog.slug}`}
//             className="group block rounded-2xl overflow-hidden shadow-md bg-white border hover:shadow-lg transition"
//           >
//             <div className="relative h-40">
//               {blog.blogImageUrl && (
//                 <Image
//                   src={blog.blogImageUrl}
//                   alt={blog.title}
//                   fill
//                   loading="lazy"
//                   className="object-cover group-hover:scale-105 transition-transform"
//                 />
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#7b3fe4]">
//                 {blog.title}
//               </h3>
//               <p className="text-sm text-gray-600 line-clamp-3">
//                 {stripHtmlTags(blog.content).slice(0, 120)}...
//               </p>
//               <div className="mt-2 text-xs text-gray-500 flex gap-2">
//                 <span>{blog.author || "RC Tech Team"}</span> •{" "}
//                 <span>{formatDate(blog.date)}</span> •{" "}
//                 <span>{computeReadingTime(blog.content)} min</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </section>
//     </div>
//   );
// }


// import { getBlogs, getFeaturedBlogs } from "../lib/blogs.js";

// export const dynamic = "force-dynamic";

// export default async function BlogsPage({ searchParams }) {
//   const page = Number(searchParams.page || 1);
//   const category = searchParams.category;

//   const [blogs, featured] = await Promise.all([
//     getBlogs({ page, limit: 6, category }),
//     getFeaturedBlogs(),
//   ]);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       {page === 1 && (
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-4">Featured</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {featured.map((b) => (
//               <FeaturedBlogCard key={b.id} blog={b} />
//             ))}
//           </div>
//         </section>
//       )}

//       <section className="grid md:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))}
//       </section>

//       <Pagination page={page} />
//     </div>
//   );
// }


// app/blogs/page.jsx
import { db } from "../firebase";
import CategorySwiper from "./Swiper";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  startAfter,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const revalidate = 30;

// ---------- Utils ----------
const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

const formatDate = (dateValue) => {
  try {
    const d = dateValue?.toDate?.() || new Date(dateValue);
    return isNaN(d)
      ? "Unpublished"
      : d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  } catch {
    return "Unpublished";
  }
};

const computeReadingTime = (html = "") =>
  Math.max(1, Math.ceil(stripHtmlTags(html).split(/\s+/).length / 200));

const PAGE_SIZE = 9;

// ---------- Firestore ----------
async function fetchBlogs({ category = "All", search = "", page = 1 }) {
  let q =
    category !== "All"
      ? query(
          collection(db, "blogs"),
          where("category", "==", category),
          orderBy("date", "desc"),
          limit(PAGE_SIZE)
        )
      : query(collection(db, "blogs"), orderBy("date", "desc"), limit(PAGE_SIZE));

  if (page > 1) {
    const prevLimit = (page - 1) * PAGE_SIZE;

    const prevQ =
      category !== "All"
        ? query(
            collection(db, "blogs"),
            where("category", "==", category),
            orderBy("date", "desc"),
            limit(prevLimit)
          )
        : query(collection(db, "blogs"), orderBy("date", "desc"), limit(prevLimit));

    const prevSnap = await getDocs(prevQ);
    const last = prevSnap.docs[prevSnap.docs.length - 1];

    if (!last) return [];
    q = query(q, startAfter(last));
  }

  const snap = await getDocs(q);
  let blogs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (search) {
    const s = search.toLowerCase();
    blogs = blogs.filter((blog) => {
      const title = (blog.title || "").toLowerCase();
      const content = stripHtmlTags(blog.content || "").toLowerCase();
      const cat = (blog.category || "").toLowerCase();
      return title.includes(s) || content.includes(s) || cat.includes(s);
    });
  }

  return blogs;
}

async function getCategories() {
  const snap = await getDocs(collection(db, "blogs"));
  const categories = [
    ...new Set(snap.docs.map((d) => d.data().category).filter(Boolean)),
  ];
  return ["All", ...categories.sort()];
}

// ---------- Metadata ----------
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const snap = await getDocs(
    query(collection(db, "blogs"), orderBy("date", "desc"), limit(3))
  );
  const blogs = snap.docs.map((d) => d.data());

  const desc = blogs
    .map((b) => stripHtmlTags(b.content || ""))
    .join(" ")
    .slice(0, 160);

  return {
    title: `RC Tech Journal${params?.search ? ` – Search "${params.search}"` : ""}`,
    description: desc,
    openGraph: {
      title: "RC Tech Journal",
      url: "https://www.rctechsolutions.com/blogs",
      description: desc,
    },
  };
}

// ---------- Page ----------
export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "All";
  const search = params?.search || "";
  const page = Math.max(1, parseInt(params?.page || "1", 10));

  const [blogs, categories] = await Promise.all([
    fetchBlogs({ category, search, page }),
    getCategories(),
  ]);

  const showFeatured = page === 1 && category === "All" && !search;
  const featured = showFeatured && blogs.length >= 3 ? blogs.slice(0, 3) : [];
  const rest = showFeatured ? blogs.slice(3) : blogs;

  // Empty state (still show UI so user can change filters)
  const isEmpty = !blogs || blogs.length === 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Script
        id="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "RC Tech Journal",
            url: "https://www.rctechsolutions.com/blogs",
          }),
        }}
      />

      {/* Subtle background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.10)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/70" />
      </div>

      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 sm:pb-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:items-end">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                <span className="text-[11px] font-semibold tracking-[0.24em] text-indigo-700 uppercase">
                  RC TECH JOURNAL
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight">
                Sharp ideas on tech,
                <span className="pb-10 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  freelancing & growth.
                </span>
              </h1>

              <p className=" text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Deep dives, playbooks, and behind-the-scenes of building premium web
                experiences, scaling services, and shipping faster as a solo founder.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                >
                  View portfolio
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:bg-black transition"
                >
                  Work with RC Tech
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div className="w-full lg:w-[380px] rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-6">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-gray-500 uppercase">
                Browse smarter
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs text-gray-500">Posts</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {isEmpty ? "0" : `${blogs.length}+`}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs text-gray-500">Categories</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {Math.max(1, categories.length - 1)}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs text-gray-500">Updated</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">Weekly</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Tip: use category chips + search together for faster discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 border-b border-gray-100 bg-white/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="w-full lg:max-w-md">
              <form action="/blogs" className="relative">
                {/* Keep current category when searching */}
                <input type="hidden" name="category" value={category} />
                <input type="hidden" name="page" value="1" />

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>

                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search articles..."
                  className="w-full rounded-2xl border border-gray-200 bg-white px-12 pr-24 py-3.5 text-sm shadow-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
                />

                {search ? (
                  <Link
                    prefetch={false}
                    href={`/blogs?category=${encodeURIComponent(category)}&page=1`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                    aria-label="Clear search"
                  >
                    Clear
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                  >
                    Search
                  </button>
                )}
              </form>
            </div>
<CategorySwiper categories={categories} active={category} search={search} />
            {/* Categories (scrollable on mobile) */}
            {/* <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const active = category === cat;
                return (
                  <Link
                    key={cat}
                    prefetch={false}
                    href={`/blogs?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(
                      search
                    )}&page=1`}
                    className={[
                      "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm",
                      active
                        ? "bg-indigo-600 text-white shadow-indigo-200"
                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
                    ].join(" ")}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div> */}
          </div>

          {(search || category !== "All") && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                Showing {blogs.length} result{blogs.length === 1 ? "" : "s"}
              </span>
              {search && (
                <span className="rounded-full bg-gray-50 px-3 py-1">
                  Search: “{search}”
                </span>
              )}
              {category !== "All" && (
                <span className="rounded-full bg-gray-50 px-3 py-1">
                  Category: {category}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
              Featured reads
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {featured.length} highlights
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((blog, idx) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  {blog.blogImageUrl ? (
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title || "Blog cover"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-semibold">
                        No cover image
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow-sm">
                      {idx === 0 ? "Editor’s Pick" : idx === 1 ? "Most Read" : "Fresh"}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-white drop-shadow">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-xs text-white/90 line-clamp-2">
                      {stripHtmlTags(blog.content || "").slice(0, 140)}…
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/80">
                      <span>{blog.author || "RC Tech Team"}</span>
                      <span>•</span>
                      <span>{formatDate(blog.date)}</span>
                      <span>•</span>
                      <span>{computeReadingTime(blog.content)} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
            Latest articles
          </h2>
          <span className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
            Page {page} · {rest.length} shown
          </span>
        </div>

        {isEmpty ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
              <span className="text-gray-500 text-sm font-semibold">No posts</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try clearing filters or searching a different keyword.
            </p>
            <Link
              prefetch={false}
              href="/blogs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Back to all posts
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  {blog.blogImageUrl ? (
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title || "Blog cover"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-semibold">
                        No cover image
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    {blog.category ? (
                      <span className="inline-flex items-center text-xs text-indigo-700 font-semibold px-3 py-1 bg-indigo-50 rounded-full">
                        {blog.category}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="text-[11px] text-gray-500">
                      {computeReadingTime(blog.content)} min
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold line-clamp-2 group-hover:text-indigo-700 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
                    {stripHtmlTags(blog.content || "").slice(0, 150)}…
                  </p>

                  <div className="mt-5 flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-100">
                    <span>{formatDate(blog.date)}</span>
                    <span className="text-indigo-700 font-semibold group-hover:underline">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {!isEmpty && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <div className="flex justify-center gap-3">
            {page > 1 && (
              <Link
                prefetch={false}
                href={`/blogs?category=${encodeURIComponent(
                  category
                )}&search=${encodeURIComponent(search)}&page=${page - 1}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition whitespace-nowrap"
              >
                ← Previous
              </Link>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">
              <span>Page</span>
              <span className="font-semibold text-gray-900">{page}</span>
            </div>

            {blogs.length === PAGE_SIZE && (
              <Link
                prefetch={false}
                href={`/blogs?category=${encodeURIComponent(
                  category
                )}&search=${encodeURIComponent(search)}&page=${page + 1}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold shadow-sm hover:bg-indigo-100 hover:shadow-md transition whitespace-nowrap"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Fixed CTA */}
      {/* Fixed CTA - Mobile-optimized */}
{/* Ultra-Compact Responsive Mobile Bar */}
<div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
  <div className="max-w-sm mx-auto grid grid-cols-2 gap-1.5 h-14 items-stretch rounded-t-2xl overflow-hidden bg-gradient-to-r from-indigo-50/80 to-white/90 border border-indigo-100/50">
    <Link
      href="/portfolio"
      className="group flex flex-col items-center justify-center gap-0.5 p-1 text-xs font-bold text-gray-700 hover:text-indigo-700 active:bg-indigo-100/50 transition-all duration-150 rounded-lg"
    >
      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <span className="text-[10px] tracking-tight leading-none">Portfolio</span>
    </Link>
    <Link
      href="https://cal.com/your-username"
      className="group flex flex-col items-center justify-center gap-0.5 p-1 bg-gradient-to-b from-indigo-600 to-purple-600 text-white font-bold text-xs hover:shadow-lg active:shadow-md active:scale-[0.98] transition-all duration-150 rounded-lg relative overflow-hidden"
    >
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-[10px] tracking-tight leading-none uppercase">Book Call</span>
      <div className="absolute -right-1 -top-1 w-2 h-2 bg-white/20 rounded-full animate-ping" />
    </Link>
  </div>
</div>


{/* Desktop CTA - Sidebar style */}
<div className="hidden md:block lg:hidden fixed right-4 bottom-6 z-40 w-80">
  <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
    <p className="text-xs font-semibold tracking-[0.22em] text-indigo-600 uppercase mb-2">Need a site?</p>
    <p className="text-sm text-gray-700 mb-4 leading-relaxed">High-converting Next.js dashboards. Sharp, revenue-focused builds.</p>
    <div className="space-y-2">
      <Link href="https://cal.com/your-username" className="w-full block text-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">
        Book free call
      </Link>
      <Link href="/portfolio" className="w-full block text-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
        View portfolio
      </Link>
    </div>
  </div>
</div>

{/* Large desktop - Full width */}
<div className="hidden xl:block pointer-events-none fixed inset-x-0 bottom-6 z-40 px-8">
  <div className="pointer-events-auto max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl p-6 flex items-center justify-between hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
    <div>
      <p className="text-xs font-semibold tracking-[0.22em] text-indigo-600 uppercase">Work with RC Tech</p>
      <p className="text-sm text-gray-700 mt-1">Next.js websites that convert. Get your sharp, revenue-focused build.</p>
    </div>
    <div className="flex gap-3">
      <Link href="https://cal.com/your-username" className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:bg-indigo-700 transition whitespace-nowrap">
        Book free call
      </Link>
      <Link href="/portfolio" className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 transition whitespace-nowrap">
        View portfolio
      </Link>
    </div>
  </div>
</div>


      {/* Small helper for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

