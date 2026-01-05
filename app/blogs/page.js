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
// import { db } from "../firebase";
// import CategorySwiper from "./Swiper";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   startAfter,
// } from "firebase/firestore";
// import Image from "next/image";
// import Link from "next/link";
// import Script from "next/script";

// export const revalidate = 30;

// // ---------- Utils ----------
// const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

// const formatDate = (dateValue) => {
//   try {
//     const d = dateValue?.toDate?.() || new Date(dateValue);
//     return isNaN(d)
//       ? "Unpublished"
//       : d.toLocaleDateString("en-IN", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         });
//   } catch {
//     return "Unpublished";
//   }
// };

// const computeReadingTime = (html = "") =>
//   Math.max(1, Math.ceil(stripHtmlTags(html).split(/\s+/).length / 200));

// const PAGE_SIZE = 9;

// // ---------- Firestore ----------
// async function fetchBlogs({ category = "All", search = "", page = 1 }) {
//   let q =
//     category !== "All"
//       ? query(
//           collection(db, "blogs"),
//           where("category", "==", category),
//           orderBy("date", "desc"),
//           limit(PAGE_SIZE)
//         )
//       : query(collection(db, "blogs"), orderBy("date", "desc"), limit(PAGE_SIZE));

//   if (page > 1) {
//     const prevLimit = (page - 1) * PAGE_SIZE;

//     const prevQ =
//       category !== "All"
//         ? query(
//             collection(db, "blogs"),
//             where("category", "==", category),
//             orderBy("date", "desc"),
//             limit(prevLimit)
//           )
//         : query(collection(db, "blogs"), orderBy("date", "desc"), limit(prevLimit));

//     const prevSnap = await getDocs(prevQ);
//     const last = prevSnap.docs[prevSnap.docs.length - 1];

//     if (!last) return [];
//     q = query(q, startAfter(last));
//   }

//   const snap = await getDocs(q);
//   let blogs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//   if (search) {
//     const s = search.toLowerCase();
//     blogs = blogs.filter((blog) => {
//       const title = (blog.title || "").toLowerCase();
//       const content = stripHtmlTags(blog.content || "").toLowerCase();
//       const cat = (blog.category || "").toLowerCase();
//       return title.includes(s) || content.includes(s) || cat.includes(s);
//     });
//   }

//   return blogs;
// }

// async function getCategories() {
//   const snap = await getDocs(collection(db, "blogs"));
//   const categories = [
//     ...new Set(snap.docs.map((d) => d.data().category).filter(Boolean)),
//   ];
//   return ["All", ...categories.sort()];
// }

// // ---------- Metadata ----------
// export async function generateMetadata({ searchParams }) {
//   const params = await searchParams;
//   const snap = await getDocs(
//     query(collection(db, "blogs"), orderBy("date", "desc"), limit(3))
//   );
//   const blogs = snap.docs.map((d) => d.data());

//   const desc = blogs
//     .map((b) => stripHtmlTags(b.content || ""))
//     .join(" ")
//     .slice(0, 160);

//   return {
//     title: `RC Tech Journal${params?.search ? ` – Search "${params.search}"` : ""}`,
//     description: desc,
//     openGraph: {
//       title: "RC Tech Journal",
//       url: "https://www.rctechsolutions.com/blogs",
//       description: desc,
//     },
//   };
// }

// // ---------- Page ----------
// export default async function BlogsPage({ searchParams }) {
//   const params = await searchParams;
//   const category = params?.category || "All";
//   const search = params?.search || "";
//   const page = Math.max(1, parseInt(params?.page || "1", 10));

//   const [blogs, categories] = await Promise.all([
//     fetchBlogs({ category, search, page }),
//     getCategories(),
//   ]);

//   const showFeatured = page === 1 && category === "All" && !search;
//   const featured = showFeatured && blogs.length >= 3 ? blogs.slice(0, 3) : [];
//   const rest = showFeatured ? blogs.slice(3) : blogs;

//   // Empty state (still show UI so user can change filters)
//   const isEmpty = !blogs || blogs.length === 0;

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <Script
//         id="schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Blog",
//             name: "RC Tech Journal",
//             url: "https://www.rctechsolutions.com/blogs",
//           }),
//         }}
//       />

//       {/* Subtle background grid */}
//       <div className="pointer-events-none fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.10)_1px,transparent_1px)] [background-size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/70" />
//       </div>

//       {/* Hero */}
//       <section className="border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 sm:pb-12">
//           <div className="flex flex-col lg:flex-row gap-10 lg:items-end">
//             <div className="flex-1">
//               <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
//                 <span className="h-2 w-2 rounded-full bg-indigo-600" />
//                 <span className="text-[11px] font-semibold tracking-[0.24em] text-indigo-700 uppercase">
//                   RC TECH JOURNAL
//                 </span>
//               </div>

//               <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight">
//                 Sharp ideas on tech,
//                 <span className="pb-10 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                   freelancing & growth.
//                 </span>
//               </h1>

//               <p className=" text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
//                 Deep dives, playbooks, and behind-the-scenes of building premium web
//                 experiences, scaling services, and shipping faster as a solo founder.
//               </p>

//               <div className="mt-6 flex flex-wrap gap-3">
//                 <Link
//                   href="/portfolio"
//                   className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300 transition"
//                 >
//                   View portfolio
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:bg-black transition"
//                 >
//                   Work with RC Tech
//                 </Link>
//               </div>
//             </div>

//             {/* Stats card */}
//             <div className="w-full lg:w-[380px] rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-6">
//               <p className="text-[11px] font-semibold tracking-[0.22em] text-gray-500 uppercase">
//                 Browse smarter
//               </p>
//               <div className="mt-4 grid grid-cols-3 gap-3">
//                 <div className="rounded-2xl border border-gray-100 bg-white p-4">
//                   <p className="text-xs text-gray-500">Posts</p>
//                   <p className="mt-1 text-lg font-semibold text-gray-900">
//                     {isEmpty ? "0" : `${blogs.length}+`}
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-gray-100 bg-white p-4">
//                   <p className="text-xs text-gray-500">Categories</p>
//                   <p className="mt-1 text-lg font-semibold text-gray-900">
//                     {Math.max(1, categories.length - 1)}
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-gray-100 bg-white p-4">
//                   <p className="text-xs text-gray-500">Updated</p>
//                   <p className="mt-1 text-lg font-semibold text-gray-900">Weekly</p>
//                 </div>
//               </div>
//               <p className="mt-4 text-sm text-gray-600">
//                 Tip: use category chips + search together for faster discovery.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="sticky top-0 z-30 border-b border-gray-100 bg-white/85 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center lg:justify-between">
//             {/* Search */}
//             <div className="w-full lg:max-w-md">
//               <form action="/blogs" className="relative">
//                 {/* Keep current category when searching */}
//                 <input type="hidden" name="category" value={category} />
//                 <input type="hidden" name="page" value="1" />

//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg
//                     className="h-5 w-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </span>

//                 <input
//                   name="search"
//                   defaultValue={search}
//                   placeholder="Search articles..."
//                   className="w-full rounded-2xl border border-gray-200 bg-white px-12 pr-24 py-3.5 text-sm shadow-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
//                 />

//                 {search ? (
//                   <Link
//                     prefetch={false}
//                     href={`/blogs?category=${encodeURIComponent(category)}&page=1`}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
//                     aria-label="Clear search"
//                   >
//                     Clear
//                   </Link>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
//                   >
//                     Search
//                   </button>
//                 )}
//               </form>
//             </div>
// <CategorySwiper categories={categories} active={category} search={search} />
//             {/* Categories (scrollable on mobile) */}
//             {/* <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
//               {categories.map((cat) => {
//                 const active = category === cat;
//                 return (
//                   <Link
//                     key={cat}
//                     prefetch={false}
//                     href={`/blogs?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(
//                       search
//                     )}&page=1`}
//                     className={[
//                       "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm",
//                       active
//                         ? "bg-indigo-600 text-white shadow-indigo-200"
//                         : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
//                     ].join(" ")}
//                   >
//                     {cat}
//                   </Link>
//                 );
//               })}
//             </div> */}
//           </div>

//           {(search || category !== "All") && (
//             <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-sm text-gray-600">
//               <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
//                 <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
//                 Showing {blogs.length} result{blogs.length === 1 ? "" : "s"}
//               </span>
//               {search && (
//                 <span className="rounded-full bg-gray-50 px-3 py-1">
//                   Search: “{search}”
//                 </span>
//               )}
//               {category !== "All" && (
//                 <span className="rounded-full bg-gray-50 px-3 py-1">
//                   Category: {category}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Featured */}
//       {featured.length > 0 && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
//               Featured reads
//             </h2>
//             <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               {featured.length} highlights
//             </span>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {featured.map((blog, idx) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2"
//               >
//                 <div className="relative h-56 w-full overflow-hidden">
//                   {blog.blogImageUrl ? (
//                     <Image
//                       src={blog.blogImageUrl}
//                       alt={blog.title || "Blog cover"}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                       priority={idx === 0}
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//                       <span className="text-gray-400 text-sm font-semibold">
//                         No cover image
//                       </span>
//                     </div>
//                   )}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

//                   <div className="absolute bottom-5 left-5 right-5">
//                     <p className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow-sm">
//                       {idx === 0 ? "Editor’s Pick" : idx === 1 ? "Most Read" : "Fresh"}
//                     </p>

//                     <h3 className="mt-3 text-xl font-semibold leading-snug text-white drop-shadow">
//                       {blog.title}
//                     </h3>

//                     <p className="mt-2 text-xs text-white/90 line-clamp-2">
//                       {stripHtmlTags(blog.content || "").slice(0, 140)}…
//                     </p>

//                     <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/80">
//                       <span>{blog.author || "RC Tech Team"}</span>
//                       <span>•</span>
//                       <span>{formatDate(blog.date)}</span>
//                       <span>•</span>
//                       <span>{computeReadingTime(blog.content)} min</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Grid */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
//             Latest articles
//           </h2>
//           <span className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
//             Page {page} · {rest.length} shown
//           </span>
//         </div>

//         {isEmpty ? (
//           <div className="text-center py-20">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
//               <span className="text-gray-500 text-sm font-semibold">No posts</span>
//             </div>
//             <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//               No posts found
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Try clearing filters or searching a different keyword.
//             </p>
//             <Link
//               prefetch={false}
//               href="/blogs"
//               className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
//             >
//               Back to all posts
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {rest.map((blog) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1.5 transition-all duration-500"
//               >
//                 <div className="relative h-44 w-full overflow-hidden">
//                   {blog.blogImageUrl ? (
//                     <Image
//                       src={blog.blogImageUrl}
//                       alt={blog.title || "Blog cover"}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//                       <span className="text-gray-400 text-sm font-semibold">
//                         No cover image
//                       </span>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 </div>

//                 <div className="flex flex-1 flex-col p-6">
//                   <div className="flex items-center justify-between gap-3">
//                     {blog.category ? (
//                       <span className="inline-flex items-center text-xs text-indigo-700 font-semibold px-3 py-1 bg-indigo-50 rounded-full">
//                         {blog.category}
//                       </span>
//                     ) : (
//                       <span />
//                     )}

//                     <span className="text-[11px] text-gray-500">
//                       {computeReadingTime(blog.content)} min
//                     </span>
//                   </div>

//                   <h3 className="mt-3 text-base font-semibold line-clamp-2 group-hover:text-indigo-700 transition-colors">
//                     {blog.title}
//                   </h3>

//                   <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
//                     {stripHtmlTags(blog.content || "").slice(0, 150)}…
//                   </p>

//                   <div className="mt-5 flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-100">
//                     <span>{formatDate(blog.date)}</span>
//                     <span className="text-indigo-700 font-semibold group-hover:underline">
//                       Read →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Pagination */}
//       {!isEmpty && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
//           <div className="flex justify-center gap-3">
//             {page > 1 && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(
//                   category
//                 )}&search=${encodeURIComponent(search)}&page=${page - 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition whitespace-nowrap"
//               >
//                 ← Previous
//               </Link>
//             )}

//             <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">
//               <span>Page</span>
//               <span className="font-semibold text-gray-900">{page}</span>
//             </div>

//             {blogs.length === PAGE_SIZE && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(
//                   category
//                 )}&search=${encodeURIComponent(search)}&page=${page + 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold shadow-sm hover:bg-indigo-100 hover:shadow-md transition whitespace-nowrap"
//               >
//                 Next →
//               </Link>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Fixed CTA */}
//       {/* Fixed CTA - Mobile-optimized */}
// {/* Ultra-Compact Responsive Mobile Bar */}
// <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
//   <div className="max-w-sm mx-auto grid grid-cols-2 gap-1.5 h-14 items-stretch rounded-t-2xl overflow-hidden bg-gradient-to-r from-indigo-50/80 to-white/90 border border-indigo-100/50">
//     <Link
//       href="/portfolio"
//       className="group flex flex-col items-center justify-center gap-0.5 p-1 text-xs font-bold text-gray-700 hover:text-indigo-700 active:bg-indigo-100/50 transition-all duration-150 rounded-lg"
//     >
//       <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//       </svg>
//       <span className="text-[10px] tracking-tight leading-none">Portfolio</span>
//     </Link>
//     <Link
//       href="https://cal.com/your-username"
//       className="group flex flex-col items-center justify-center gap-0.5 p-1 bg-gradient-to-b from-indigo-600 to-purple-600 text-white font-bold text-xs hover:shadow-lg active:shadow-md active:scale-[0.98] transition-all duration-150 rounded-lg relative overflow-hidden"
//     >
//       <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//       <span className="text-[10px] tracking-tight leading-none uppercase">Book Call</span>
//       <div className="absolute -right-1 -top-1 w-2 h-2 bg-white/20 rounded-full animate-ping" />
//     </Link>
//   </div>
// </div>


// {/* Desktop CTA - Sidebar style */}
// <div className="hidden md:block lg:hidden fixed right-4 bottom-6 z-40 w-80">
//   <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
//     <p className="text-xs font-semibold tracking-[0.22em] text-indigo-600 uppercase mb-2">Need a site?</p>
//     <p className="text-sm text-gray-700 mb-4 leading-relaxed">High-converting Next.js dashboards. Sharp, revenue-focused builds.</p>
//     <div className="space-y-2">
//       <Link href="https://cal.com/your-username" className="w-full block text-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">
//         Book free call
//       </Link>
//       <Link href="/portfolio" className="w-full block text-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
//         View portfolio
//       </Link>
//     </div>
//   </div>
// </div>

// {/* Large desktop - Full width */}
// <div className="hidden xl:block pointer-events-none fixed inset-x-0 bottom-6 z-40 px-8">
//   <div className="pointer-events-auto max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl p-6 flex items-center justify-between hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
//     <div>
//       <p className="text-xs font-semibold tracking-[0.22em] text-indigo-600 uppercase">Work with RC Tech</p>
//       <p className="text-sm text-gray-700 mt-1">Next.js websites that convert. Get your sharp, revenue-focused build.</p>
//     </div>
//     <div className="flex gap-3">
//       <Link href="https://cal.com/your-username" className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:bg-indigo-700 transition whitespace-nowrap">
//         Book free call
//       </Link>
//       <Link href="/portfolio" className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 transition whitespace-nowrap">
//         View portfolio
//       </Link>
//     </div>
//   </div>
// </div>


//       {/* Small helper for hiding scrollbar */}
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );


// app/blogs/page.jsx
// import { db } from "../firebase";
// import CategorySwiper from "./Swiper";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   startAfter,
//   getCountFromServer,
// } from "firebase/firestore";
// import Image from "next/image";
// import Link from "next/link";
// import Script from "next/script";

// export const revalidate = 30;

// // ---------- Utils ----------
// const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

// const formatDate = (dateValue) => {
//   try {
//     const d = dateValue?.toDate?.() || new Date(dateValue);
//     return isNaN(d)
//       ? "Unpublished"
//       : d.toLocaleDateString("en-IN", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         });
//   } catch {
//     return "Unpublished";
//   }
// };

// const computeReadingTime = (html = "") =>
//   Math.max(1, Math.ceil(stripHtmlTags(html).split(/\s+/).length / 200));

// const PAGE_SIZE = 9;
// const FEATURED_SIZE = 3;

// // ---------- Firestore ----------
// async function fetchBlogs({ category = "All", search = "", page = 1 }) {
//   let q =
//     category !== "All"
//       ? query(
//           collection(db, "blogs"),
//           where("category", "==", category),
//           orderBy("date", "desc"),
//           limit(PAGE_SIZE)
//         )
//       : query(collection(db, "blogs"), orderBy("date", "desc"), limit(PAGE_SIZE));

//   if (page > 1) {
//     const prevLimit = (page - 1) * PAGE_SIZE;

//     const prevQ =
//       category !== "All"
//         ? query(
//             collection(db, "blogs"),
//             where("category", "==", category),
//             orderBy("date", "desc"),
//             limit(prevLimit)
//           )
//         : query(collection(db, "blogs"), orderBy("date", "desc"), limit(prevLimit));

//     const prevSnap = await getDocs(prevQ);
//     const last = prevSnap.docs[prevSnap.docs.length - 1];

//     if (!last) return [];
//     q = query(q, startAfter(last));
//   }

//   const snap = await getDocs(q);
//   let blogs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//   if (search) {
//     const s = search.toLowerCase();
//     blogs = blogs.filter((blog) => {
//       const title = (blog.title || "").toLowerCase();
//       const content = stripHtmlTags(blog.content || "").toLowerCase();
//       const cat = (blog.category || "").toLowerCase();
//       return title.includes(s) || content.includes(s) || cat.includes(s);
//     });
//   }

//   return blogs;
// }

// async function fetchFeaturedBlogs() {
//   const q = query(
//     collection(db, "blogs"),
//     where("featured", "==", true),
//     orderBy("date", "desc"),
//     limit(FEATURED_SIZE)
//   );

//   const snap = await getDocs(q);
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// }

// async function getPostCount({ category = "All" }) {
//   const base = collection(db, "blogs");
//   const q = category !== "All"
//     ? query(base, where("category", "==", category))
//     : base;

//   const snap = await getCountFromServer(q);
//   return snap.data().count;
// }

// async function getCategories() {
//   const snap = await getDocs(collection(db, "blogs"));
//   const categories = [
//     ...new Set(snap.docs.map((d) => d.data().category).filter(Boolean)),
//   ];
//   return ["All", ...categories.sort()];
// }

// // ---------- Metadata ----------
// export async function generateMetadata({ searchParams }) {
//   const params = await searchParams;
//   const snap = await getDocs(
//     query(collection(db, "blogs"), orderBy("date", "desc"), limit(3))
//   );
//   const blogs = snap.docs.map((d) => d.data());

//   const desc = blogs
//     .map((b) => stripHtmlTags(b.content || ""))
//     .join(" ")
//     .slice(0, 160);

//   return {
//     title: `RC Tech Journal${params?.search ? ` – Search "${params.search}"` : ""}`,
//     description: desc,
//     openGraph: {
//       title: "RC Tech Journal",
//       url: "https://www.rctechsolutions.com/blogs",
//       description: desc,
//     },
//   };
// }

// // ---------- Page ----------
// export default async function BlogsPage({ searchParams }) {
//   const params = await searchParams;
//   const category = params?.category || "All";
//   const search = params?.search || "";
//   const page = Math.max(1, parseInt(params?.page || "1", 10));

//   const showFeatured = page === 1 && category === "All" && !search;

//   const [blogs, categories, featuredBlogs, totalPosts] = await Promise.all([
//     fetchBlogs({ category, search, page }),
//     getCategories(),
//     showFeatured ? fetchFeaturedBlogs() : Promise.resolve([]),
//     getPostCount({ category }),
//   ]);

//   const featuredIds = new Set(featuredBlogs.map((b) => b.id));
//   const rest = showFeatured 
//     ? blogs.filter((b) => !featuredIds.has(b.id))
//     : blogs;

//   const isEmpty = !rest || rest.length === 0;

//   return (
//     <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
//       <Script
//         id="schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Blog",
//             name: "RC Tech Journal",
//             url: "https://www.rctechsolutions.com/blogs",
//           }),
//         }}
//       />

//       {/* Enhanced background */}
//       <div className="pointer-events-none fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-indigo-50/30" />
//       </div>

//       {/* Hero */}
//       <section className="border-b border-gray-100/80">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
//           <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
//             <div className="flex-1 space-y-6">
//               <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-2 backdrop-blur-sm">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
//                 </span>
//                 <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
//                   RC TECH JOURNAL
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900">
//                 Sharp ideas on tech, <br className="hidden lg:block"/>
//                 <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
//                   freelancing & growth.
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
//                 Deep dives, playbooks, and behind-the-scenes of building premium web
//                 experiences, scaling services, and shipping faster as a solo founder.
//               </p>

//               <div className="flex flex-wrap gap-4 pt-2">
//                 <Link
//                   href="/portfolio"
//                   className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   View portfolio
//                 </Link>
//                 <Link
//                 target="_blank"
//                   href="/contact"
//                   className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 hover:shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   Work with RC Tech
//                 </Link>
//               </div>
//             </div>

//             {/* Stats card */}
//             <div className="w-full lg:w-[360px] rounded-[2rem] border border-gray-100 bg-white/60 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_32px_70px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-500">
//               <div className="flex items-center justify-between mb-6">
//                 <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
//                   Live Stats
//                 </p>
//                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
//               </div>
              
//               <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Posts</p>
//                   <p className="text-xl font-bold text-gray-900">{totalPosts}</p>
//                 </div>
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Topics</p>
//                   <p className="text-xl font-bold text-gray-900">{Math.max(1, categories.length - 1)}</p>
//                 </div>
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Update</p>
//                   <p className="text-sm font-bold text-gray-900 pt-1">Weekly</p>
//                 </div>
//               </div>
              
//               <p className="mt-5 text-xs text-center text-gray-500 font-medium">
//                 Tip: Combine filters for faster discovery ⚡️
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters - Sticky & Blur */}
//       <section className="sticky md:sticky top-0 z-30 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
//             {/* Search */}
//             <div className="w-full lg:max-w-md">
//               <form action="/blogs" className="relative group">
//                 <input type="hidden" name="category" value={category} />
//                 <input type="hidden" name="page" value="1" />

//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </span>

//                 <input
//                   name="search"
//                   defaultValue={search}
//                   placeholder="Search articles..."
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-11 pr-24 py-3 text-sm font-medium text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
//                 />

//                 {search ? (
//                   <Link
//                     prefetch={false}
//                     href={`/blogs?category=${encodeURIComponent(category)}&page=1`}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
//                   >
//                     Clear
//                   </Link>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm border border-gray-100 hover:bg-gray-50 transition"
//                   >
//                     Search
//                   </button>
//                 )}
//               </form>
//             </div>
            
//             <div className="flex-1 w-full overflow-hidden">
//                 <CategorySwiper categories={categories} active={category} search={search} />
//             </div>
//           </div>

//           {(search || category !== "All") && (
//             <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500 animate-in fade-in slide-in-from-top-2 duration-300">
//               <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
//               Showing {rest.length} result{rest.length === 1 ? "" : "s"}
//               {search && <span className="text-gray-300">•</span>}
//               {search && <span>Search: "{search}"</span>}
//               {category !== "All" && <span className="text-gray-300">•</span>}
//               {category !== "All" && <span>Category: {category}</span>}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Featured Section - Premium Glass Design */}
//       {featuredBlogs.length > 0 && showFeatured && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
//           <div className="flex items-center justify-between mb-10">
//             <div className="inline-flex items-center gap-4 px-1">
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 hover:rotate-6 transition-transform duration-500">
//                 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
//                   Featured Reads
//                 </h2>
//                 <p className="text-sm text-gray-500 font-medium mt-0.5">
//                   Handpicked stories for you
//                 </p>
//               </div>
//             </div>
            
//             <div className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 bg-indigo-50/50 px-5 py-2.5 rounded-full border border-indigo-100">
//               <span className="relative flex h-2 w-2 mr-1">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//               </span>
//               {featuredBlogs.length} highlights
//             </div>
//           </div>

//           <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
//             {featuredBlogs.map((blog, idx) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group relative block h-full"
//               >
//                 <div className="relative h-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-indigo-100/50 border border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/40">
                  
//                   {/* Image Area */}
//                   <div className="relative h-72 w-full overflow-hidden bg-gray-100">
//                     {blog.blogImageUrl ? (
//                       <Image
//                         src={blog.blogImageUrl}
//                         alt={blog.title}
//                         fill
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
//                         priority={idx === 0}
//                       />
//                     ) : (
//                       <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//                         <span className="text-indigo-300 opacity-50">
//                           <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                           </svg>
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Gradient Overlay - Smooth Fade */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                    
//                     {/* Floating Badge */}
//                     <div className="absolute top-5 left-5">
//                       <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
//                         {idx === 0 ? "🏆 Editor's Choice" : idx === 1 ? "🔥 Trending" : "✨ New Arrival"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content Card - Overlapping Glass Effect */}
//                   <div className="relative -mt-16 px-5 pb-6">
//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/50 relative z-10">
//                       <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-500">
//                         <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
//                           {blog.category || "Tech"}
//                         </span>
//                         <span>{computeReadingTime(blog.content)} min read</span>
//                       </div>

//                       <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
//                         {blog.title}
//                       </h3>
                      
//                       <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
//                             {(blog.author?.[0] || "R").toUpperCase()}
//                           </div>
//                           <span className="text-xs font-semibold text-gray-600">{blog.author || "RC Team"}</span>
//                         </div>
//                         <span className="text-xs font-medium text-gray-400">{formatDate(blog.date)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Latest Articles Grid - Clean & Minimal */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
//             Latest Articles
//           </h2>
//           <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
//             Page {page}
//           </span>
//         </div>

//         {isEmpty ? (
//           <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
//             <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
//               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
//             <p className="text-gray-500 mb-8 max-w-sm mx-auto">
//               We couldn't find any articles matching your criteria. Try different keywords.
//             </p>
//             <Link
//               prefetch={false}
//               href="/blogs"
//               className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
//             >
//               Clear filters
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {rest.map((blog) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group flex flex-col bg-white rounded-[1.5rem] border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
//               >
//                 <div className="relative h-48 w-full overflow-hidden bg-gray-50">
//                   {blog.blogImageUrl ? (
//                     <Image
//                       src={blog.blogImageUrl}
//                       alt={blog.title}
//                       fill
//                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center">
//                       <span className="text-gray-300">No Image</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-1 flex-col p-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     {blog.category && (
//                       <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
//                         {blog.category}
//                       </span>
//                     )}
//                     <span className="text-[11px] text-gray-400 font-medium ml-auto">
//                       {computeReadingTime(blog.content)} min read
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
//                     {blog.title}
//                   </h3>

//                   <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-1">
//                     {stripHtmlTags(blog.content || "").slice(0, 150)}…
//                   </p>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//                     <span className="text-xs font-semibold text-gray-400">
//                       {formatDate(blog.date)}
//                     </span>
//                     <span className="text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
//                       Read →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Pagination */}
//       {!isEmpty && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
//           <div className="flex justify-center gap-3">
//             {page > 1 && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page - 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
//               >
//                 ← Previous
//               </Link>
//             )}

//             <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-lg">
//               {page}
//             </div>

//             {blogs.length === PAGE_SIZE && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page + 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
//               >
//                 Next Page →
//               </Link>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Fixed CTAs - Optimized for Conversions */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
//         <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
//           <Link
//             href="/portfolio"
//             className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//           >
//             <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//             </svg>
//             <span className="text-[10px] font-bold">Portfolio</span>
//           </Link>
//           <Link
//             href="https://cal.com/your-username"
//             className="flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-transform"
//           >
//             <span className="text-xs font-bold">Book Call</span>
//           </Link>
//         </div>
//       </div>

//       <div className="hidden xl:block fixed bottom-8 inset-x-0 z-40 pointer-events-none px-8">
//         <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full p-2.5 pl-8 border border-white/50 shadow-2xl shadow-indigo-500/10 flex items-center justify-between pointer-events-auto hover:scale-[1.01] transition-transform duration-500 ring-1 ring-gray-900/5">
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//             <p className="text-sm font-medium text-gray-600">
//               <span className="font-bold text-gray-900">Available for new projects.</span> Let's build something premium.
//             </p>
//           </div>
//           <div className="flex gap-2">
//              <Link href="/portfolio" className="px-6 py-3 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
//               Portfolio
//             </Link>
//             <Link target="_blank" href="https://www.rctechsolutions.com/contact" className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-bold shadow-lg shadow-gray-900/20 hover:bg-black hover:-translate-y-0.5 transition-all">
//               Book a Call
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           animation: gradient 6s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }




// app/blogs/page.jsx
// import { db } from "../firebase";
// import CategorySwiper from "./Swiper";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   where,
//   startAfter,
//   getCountFromServer,
// } from "firebase/firestore";
// import Image from "next/image";
// import Link from "next/link";
// import Script from "next/script";

// export const revalidate = 30;

// // ---------- Utils ----------
// const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

// const formatDate = (dateValue) => {
//   try {
//     const d = dateValue?.toDate?.() || new Date(dateValue);
//     return isNaN(d)
//       ? "Unpublished"
//       : d.toLocaleDateString("en-IN", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         });
//   } catch {
//     return "Unpublished";
//   }
// };

// const computeReadingTime = (html = "") =>
//   Math.max(1, Math.ceil(stripHtmlTags(html).split(/\s+/).length / 200));

// const PAGE_SIZE = 9;
// const FEATURED_SIZE = 3;

// // ---------- Firestore ----------
// async function fetchBlogs({ category = "All", search = "", page = 1 }) {
//   let q =
//     category !== "All"
//       ? query(
//           collection(db, "blogs"),
//           where("category", "==", category),
//           orderBy("date", "desc"),
//           limit(PAGE_SIZE)
//         )
//       : query(collection(db, "blogs"), orderBy("date", "desc"), limit(PAGE_SIZE));

//   if (page > 1) {
//     const prevLimit = (page - 1) * PAGE_SIZE;

//     const prevQ =
//       category !== "All"
//         ? query(
//             collection(db, "blogs"),
//             where("category", "==", category),
//             orderBy("date", "desc"),
//             limit(prevLimit)
//           )
//         : query(collection(db, "blogs"), orderBy("date", "desc"), limit(prevLimit));

//     const prevSnap = await getDocs(prevQ);
//     const last = prevSnap.docs[prevSnap.docs.length - 1];

//     if (!last) return [];
//     q = query(q, startAfter(last));
//   }

//   const snap = await getDocs(q);
//   let blogs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//   if (search) {
//     const s = search.toLowerCase();
//     blogs = blogs.filter((blog) => {
//       const title = (blog.title || "").toLowerCase();
//       const content = stripHtmlTags(blog.content || "").toLowerCase();
//       const cat = (blog.category || "").toLowerCase();
//       return title.includes(s) || content.includes(s) || cat.includes(s);
//     });
//   }

//   return blogs;
// }

// async function fetchFeaturedBlogs() {
//   const q = query(
//     collection(db, "blogs"),
//     where("featured", "==", true),
//     orderBy("date", "desc"),
//     limit(FEATURED_SIZE)
//   );

//   const snap = await getDocs(q);
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// }

// async function getPostCount({ category = "All" }) {
//   const base = collection(db, "blogs");
//   const q = category !== "All"
//     ? query(base, where("category", "==", category))
//     : base;

//   const snap = await getCountFromServer(q);
//   return snap.data().count;
// }

// async function getCategories() {
//   const snap = await getDocs(collection(db, "blogs"));
//   const categories = [
//     ...new Set(snap.docs.map((d) => d.data().category).filter(Boolean)),
//   ];
//   return ["All", ...categories.sort()];
// }

// // ---------- Metadata ----------
// export async function generateMetadata({ searchParams }) {
//   const params = await searchParams;
//   const snap = await getDocs(
//     query(collection(db, "blogs"), orderBy("date", "desc"), limit(3))
//   );
//   const blogs = snap.docs.map((d) => d.data());

//   const desc = blogs
//     .map((b) => stripHtmlTags(b.content || ""))
//     .join(" ")
//     .slice(0, 160);

//   return {
//     title: `RC Tech Journal${params?.search ? ` – Search "${params.search}"` : ""}`,
//     description: desc,
//     openGraph: {
//       title: "RC Tech Journal",
//       url: "https://www.rctechsolutions.com/blogs",
//       description: desc,
//     },
//   };
// }

// // ---------- Page ----------
// export default async function BlogsPage({ searchParams }) {
//   const params = await searchParams;
//   const category = params?.category || "All";
//   const search = params?.search || "";
//   const page = Math.max(1, parseInt(params?.page || "1", 10));

//   const showFeatured = page === 1 && category === "All" && !search;

//   const [blogs, categories, featuredBlogs, totalPosts] = await Promise.all([
//     fetchBlogs({ category, search, page }),
//     getCategories(),
//     showFeatured ? fetchFeaturedBlogs() : Promise.resolve([]),
//     getPostCount({ category }),
//   ]);

//   const featuredIds = new Set(featuredBlogs.map((b) => b.id));
//   const rest = showFeatured 
//     ? blogs.filter((b) => !featuredIds.has(b.id))
//     : blogs;

//   const isEmpty = !rest || rest.length === 0;

//   return (
//     <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
//       <Script
//         id="schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Blog",
//             name: "RC Tech Journal",
//             url: "https://www.rctechsolutions.com/blogs",
//           }),
//         }}
//       />

//       {/* Enhanced background */}
//       <div className="pointer-events-none fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-indigo-50/30" />
//       </div>

//       {/* Hero */}
//       <section className="border-b border-gray-100/80">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
//           <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
//             <div className="flex-1 space-y-6">
//               <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-2 backdrop-blur-sm">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
//                 </span>
//                 <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
//                   RC TECH JOURNAL
//                 </span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900">
//                 Sharp ideas on tech, <br className="hidden lg:block"/>
//                 <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
//                   freelancing & growth.
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
//                 Deep dives, playbooks, and behind-the-scenes of building premium web
//                 experiences, scaling services, and shipping faster as a solo founder.
//               </p>

//               <div className="flex flex-wrap gap-4 pt-2">
//                 <Link
//                   href="/portfolio"
//                   className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   View portfolio
//                 </Link>
//                 <Link
//                 target="_blank"
//                   href="/contact"
//                   className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 hover:shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   Work with RC Tech
//                 </Link>
//               </div>
//             </div>

//             {/* Stats card */}
//             <div className="w-full lg:w-[360px] rounded-[2rem] border border-gray-100 bg-white/60 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_32px_70px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-500">
//               <div className="flex items-center justify-between mb-6">
//                 <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
//                   Live Stats
//                 </p>
//                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
//               </div>
              
//               <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Posts</p>
//                   <p className="text-xl font-bold text-gray-900">{totalPosts}</p>
//                 </div>
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Topics</p>
//                   <p className="text-xl font-bold text-gray-900">{Math.max(1, categories.length - 1)}</p>
//                 </div>
//                 <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
//                   <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Update</p>
//                   <p className="text-sm font-bold text-gray-900 pt-1">Weekly</p>
//                 </div>
//               </div>
              
//               <p className="mt-5 text-xs text-center text-gray-500 font-medium">
//                 Tip: Combine filters for faster discovery ⚡️
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters - Sticky & Blur */}
//       <section className="sticky md:sticky top-0 z-30 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
//             {/* Search */}
//             <div className="w-full lg:max-w-md">
//               <form action="/blogs" className="relative group">
//                 <input type="hidden" name="category" value={category} />
//                 <input type="hidden" name="page" value="1" />

//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </span>

//                 <input
//                   name="search"
//                   defaultValue={search}
//                   placeholder="Search articles..."
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-11 pr-24 py-3 text-sm font-medium text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
//                 />

//                 {search ? (
//                   <Link
//                     prefetch={false}
//                     href={`/blogs?category=${encodeURIComponent(category)}&page=1`}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
//                   >
//                     Clear
//                   </Link>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm border border-gray-100 hover:bg-gray-50 transition"
//                   >
//                     Search
//                   </button>
//                 )}
//               </form>
//             </div>
            
//             <div className="flex-1 w-full overflow-hidden">
//                 <CategorySwiper categories={categories} active={category} search={search} />
//             </div>
//           </div>

//           {(search || category !== "All") && (
//             <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500 animate-in fade-in slide-in-from-top-2 duration-300">
//               <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
//               Showing {rest.length} result{rest.length === 1 ? "" : "s"}
//               {search && <span className="text-gray-300">•</span>}
//               {search && <span>Search: "{search}"</span>}
//               {category !== "All" && <span className="text-gray-300">•</span>}
//               {category !== "All" && <span>Category : {category}</span>}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Featured Section - Premium Glass Design */}
//       {featuredBlogs.length > 0 && showFeatured && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
//           <div className="flex items-center justify-between mb-10">
//             <div className="inline-flex items-center gap-4 px-1">
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 hover:rotate-6 transition-transform duration-500">
//                 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
//                   Featured Reads
//                 </h2>
//                 <p className="text-sm text-gray-500 font-medium mt-0.5">
//                   Handpicked stories for you
//                 </p>
//               </div>
//             </div>
            
//             <div className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 bg-indigo-50/50 px-5 py-2.5 rounded-full border border-indigo-100">
//               <span className="relative flex h-2 w-2 mr-1">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//               </span>
//               {featuredBlogs.length} highlights
//             </div>
//           </div>

//           <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
//             {featuredBlogs.map((blog, idx) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group relative block h-full"
//               >
//                 <div className="relative h-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-indigo-100/50 border border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/40">
                  
//                   {/* Image Area */}
//                   <div className="relative h-72 w-full overflow-hidden bg-gray-100">
//                     {blog.blogImageUrl ? (
//                       <Image
//                         src={blog.blogImageUrl}
//                         alt={blog.title}
//                         fill
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
//                         priority={idx === 0}
//                       />
//                     ) : (
//                       <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//                         <span className="text-indigo-300 opacity-50">
//                           <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                           </svg>
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Gradient Overlay - Smooth Fade */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                    
//                     {/* Floating Badge */}
//                     <div className="absolute top-5 left-5">
//                       <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
//                         {idx === 0 ? "🏆 Editor's Choice" : idx === 1 ? "🔥 Trending" : "✨ New Arrival"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content Card - Overlapping Glass Effect */}
//                   <div className="relative -mt-16 px-5 pb-6">
//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/50 relative z-10">
//                       <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-500">
//                         <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
//                           {blog.category || "Tech"}
//                         </span>
//                         <span>{computeReadingTime(blog.content)} min read</span>
//                       </div>

//                       <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
//                         {blog.title}
//                       </h3>
                      
//                       <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
//                             {(blog.author?.[0] || "R").toUpperCase()}
//                           </div>
//                           <span className="text-xs font-semibold text-gray-600">{blog.author || "RC Team"}</span>
//                         </div>
//                         <span className="text-xs font-medium text-gray-400">{formatDate(blog.date)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Latest Articles Grid - Clean & Minimal */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
//             Latest Articles
//           </h2>
//           <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
//             Page {page}
//           </span>
//         </div>

//         {isEmpty ? (
//           <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
//             <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
//               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
//             <p className="text-gray-500 mb-8 max-w-sm mx-auto">
//               We couldn't find any articles matching your criteria. Try different keywords.
//             </p>
//             <Link
//               prefetch={false}
//               href="/blogs"
//               className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
//             >
//               Clear filters
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {rest.map((blog) => (
//               <Link
//                 key={blog.id}
//                 href={`/blogs/${blog.slug}`}
//                 className="group flex flex-col bg-white rounded-[1.5rem] border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
//               >
//                 <div className="relative h-48 w-full overflow-hidden bg-gray-50">
//                   {blog.blogImageUrl ? (
//                     <Image
//                       src={blog.blogImageUrl}
//                       alt={blog.title}
//                       fill
//                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center">
//                       <span className="text-gray-300">No Image</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-1 flex-col p-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     {blog.category && (
//                       <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
//                         {blog.category}
//                       </span>
//                     )}
//                     <span className="text-[11px] text-gray-400 font-medium ml-auto">
//                       {computeReadingTime(blog.content)} min read
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
//                     {blog.title}
//                   </h3>

//                   <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-1">
//                     {stripHtmlTags(blog.content || "").slice(0, 150)}…
//                   </p>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-50">
//                     <span className="text-xs font-semibold text-gray-400">
//                       {formatDate(blog.date)}
//                     </span>
//                     <span className="text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
//                       Read →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Pagination */}
//       {!isEmpty && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
//           <div className="flex justify-center gap-3">
//             {page > 1 && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page - 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
//               >
//                 ← Previous
//               </Link>
//             )}

//             <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-lg">
//               {page}
//             </div>

//             {blogs.length === PAGE_SIZE && (
//               <Link
//                 prefetch={false}
//                 href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page + 1}`}
//                 className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
//               >
//                 Next Page →
//               </Link>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Fixed CTAs - Optimized for Conversions */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
//         <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
//           <Link
//             href="/portfolio"
//             className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
//           >
//             <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//             </svg>
//             <span className="text-[10px] font-bold">Portfolio</span>
//           </Link>
//           <Link
//             href="https://cal.com/your-username"
//             className="flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-transform"
//           >
//             <span className="text-xs font-bold">Book Call</span>
//           </Link>
//         </div>
//       </div>

//       <div className="hidden xl:block fixed bottom-8 inset-x-0 z-40 pointer-events-none px-8">
//         <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full p-2.5 pl-8 border border-white/50 shadow-2xl shadow-indigo-500/10 flex items-center justify-between pointer-events-auto hover:scale-[1.01] transition-transform duration-500 ring-1 ring-gray-900/5">
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//             <p className="text-sm font-medium text-gray-600">
//               <span className="font-bold text-gray-900">Available for new projects.</span> Let's build something premium.
//             </p>
//           </div>
//           <div className="flex gap-2">
//              <Link href="/portfolio" className="px-6 py-3 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
//               Portfolio
//             </Link>
//             <Link target="_blank" href="https://www.rctechsolutions.com/contact" className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-bold shadow-lg shadow-gray-900/20 hover:bg-black hover:-translate-y-0.5 transition-all">
//               Book a Call
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           animation: gradient 6s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


// }





// app/blogs/page.jsx
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 300;

const PAGE_SIZE = 6;

const stripHtml = (s = "") => s.replace(/<[^>]+>/g, "");
const formatDate = (value) => {
  if (!value) return "";
  const d = value.toDate ? value.toDate() : new Date(value);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getExcerpt = (blog) => blog.excerpt || stripHtml(blog.content || "");

async function fetchAll() {
  const snap = await getDocs(query(collection(db, "blogs"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default async function BlogsPage({ searchParams }) {
  const page = Math.max(1, Number(searchParams?.page || 1));
  const search = (searchParams?.search || "").toLowerCase();
  const category = searchParams?.category || "All";

  const allBlogs = await fetchAll();

  const categories = ["All", ...new Set(allBlogs.map((b) => b.category).filter(Boolean))];

  let filtered = allBlogs;
  if (category !== "All") filtered = filtered.filter((b) => b.category === category);
  if (search) {
    filtered = filtered.filter((b) =>
      b.title?.toLowerCase().includes(search) ||
      stripHtml(b.content || "").toLowerCase().includes(search)
    );
  }

  const start = (page - 1) * PAGE_SIZE;
  const blogs = filtered.slice(start, start + PAGE_SIZE);
  const hasNext = start + PAGE_SIZE < filtered.length;

  return (
    <main className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            RC Journal
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b mb-10">
          <div className="max-w-7xl mx-auto py-3 flex flex-col gap-3">

            {/* Search */}
            <form className="w-full sm:max-w-sm">
              <input type="hidden" name="category" value={category} />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              />
            </form>

            {/* Category Scroll */}
            <div className="relative">

              <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />

              <div className="flex items-center gap-2">

                <a href="#cat-start" className="hidden md:flex p-2 rounded-full border hover:bg-gray-100">
                  ←
                </a>

                <div
                  id="cat-start"
                  className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-1"
                >
                  {categories.map((cat, i) => (
                    <Link
                      key={cat}
                      id={i === categories.length - 1 ? "cat-end" : undefined}
                      href={`/blogs?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(search)}`}
                      className={`snap-start px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                        cat === category
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                <a href="#cat-end" className="hidden md:flex p-2 rounded-full border hover:bg-gray-100">
                  →
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {/* Blog Grid */}
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">

          {blogs.map((blog) => (
            <article key={blog.id} className="group flex flex-col w-full h-full">


              <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden rounded-2xl">
                {blog.blogImageUrl && (
                  <Image
  src={blog.blogImageUrl}
  alt={blog.title}
  width={600}
  height={400}
  className="object-cover w-full h-48 sm:h-56 lg:h-64 group-hover:scale-105 transition"
/>

                )}
              </Link>

              <div className="flex flex-col flex-1 px-1 sm:px-0">

                <div className="mt-4 sm:mt-6 flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                  <time>{formatDate(blog.date)}</time>
                  {blog.category && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[10px] sm:text-xs font-medium text-gray-700">
                      {blog.category}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-snug line-clamp-2">

                  <Link href={`/blogs/${blog.slug}`} className="hover:text-indigo-600">
                    {blog.title}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">

                  {getExcerpt(blog)}
                </p>

                <div className="mt-auto pt-4 sm:pt-6 flex items-center gap-3">

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {(blog.author || "R").slice(0, 1)}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 text-sm">
                      {blog.author || "RC Team"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {blog.authorRole || "Contributor"}
                    </p>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-14 sm:mt-20">
          {page > 1 && (
            <Link
              href={`/blogs?page=${page - 1}&category=${category}&search=${search}`}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-medium"
            >
              ← Previous
            </Link>
          )}

          <span className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">
            {page}
          </span>

          {hasNext && (
            <Link
              href={`/blogs?page=${page + 1}&category=${category}&search=${search}`}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-medium"
            >
              Next →
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}
