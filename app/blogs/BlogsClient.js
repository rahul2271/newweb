// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   orderBy,
//   startAfter,
//   limit,
//   getDocs,
// } from "firebase/firestore";
// import Link from "next/link";
// import Image from "next/image";

// const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");
// const formatDate = (dateValue) => {
//   try {
//     if (!dateValue) return "Unpublished";

//     // Firestore Timestamp
//     if (typeof dateValue.toDate === "function") {
//       return dateValue.toDate().toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//     }

//     // JS Date object
//     if (dateValue instanceof Date) {
//       return dateValue.toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//     }

//     // String or number (ISO / yyyy-mm-dd / timestamp)
//     const parsed = new Date(dateValue);
//     if (!isNaN(parsed)) {
//       return parsed.toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//     }

//     return "Unpublished";
//   } catch {
//     return "Unpublished";
//   }
// };

// const computeReadingTime = (html) => {
//   const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
//   return Math.max(1, Math.ceil(words / 200));
// };


// export default function BlogsClient({ initialBlogs }) {
//   const [blogs, setBlogs] = useState(initialBlogs);
//   const [lastDoc, setLastDoc] = useState(initialBlogs[initialBlogs.length - 1]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");

//   // Extract categories dynamically
//   useEffect(() => {
//     const cats = new Set();
//     initialBlogs.forEach((b) => {
//       if (b.category) cats.add(b.category);
//     });
//     setCategories(["All", ...Array.from(cats)]);
//   }, [initialBlogs]);

//   // Load more blogs
//   const loadMore = async () => {
//     if (!lastDoc?.date) return;
//     setLoading(true);
//     try {
//       const q = query(
//         collection(db, "blogs"),
//         orderBy("date", "desc"),
//         startAfter(lastDoc.date),
//         limit(6)
//       );
//       const snap = await getDocs(q);
//       const newBlogs = [];
//       snap.forEach((doc) => newBlogs.push({ id: doc.id, ...doc.data() }));
//       setBlogs((prev) => [...prev, ...newBlogs]);
//       setLastDoc(newBlogs[newBlogs.length - 1]);
//     } catch (e) {
//       console.error("Load more error:", e);
//     }
//     setLoading(false);
//   };

//   // Apply search & category filter
//   const filtered = blogs.filter((b) => {
//     const matchesSearch =
//       b.title.toLowerCase().includes(search.toLowerCase()) ||
//       stripHtmlTags(b.content).toLowerCase().includes(search.toLowerCase());
//     const matchesCategory =
//       activeCategory === "All" || b.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <section className="max-w-7xl mx-auto px-6 py-12">
//       {/* 🔎 Search + Filter */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search articles..."
//           className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl dark:bg-gray-800 dark:border-gray-600"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <div className="flex flex-wrap gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 activeCategory === cat
//                   ? "bg-[#7b3fe4] text-white"
//                   : "bg-gray-100 dark:bg-gray-700 text-gray-600"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 📄 Blogs Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filtered.map((blog) => (
//           <Link
//             key={blog.id}
//             href={`/blogs/${blog.slug}`}
//             className="group block rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
//           >
//             <div className="relative h-40">
//               {blog.blogImageUrl && (
//                 <Image
//                   src={blog.blogImageUrl}
//                   alt={blog.title}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//               )}
//             </div>
//             <div className="p-4">
//               <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#7b3fe4]">
//                 {blog.title}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
//                 {stripHtmlTags(blog.content).slice(0, 120)}...
//               </p>
//               <div className="mt-2 text-xs text-gray-500 flex gap-2">
//                 <span>{blog.author || "RC Tech Team"}</span>
//                 • <span>{formatDate(blog.date)}</span> •{" "}
//                 <span>{computeReadingTime(blog.content)} min</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* 📄 Load More */}
//       {lastDoc && (
//         <div className="text-center mt-8">
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="px-6 py-2 rounded-xl bg-[#7b3fe4] text-white hover:bg-[#6a32c9] disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}

//       {/* 📬 Newsletter */}
//       <section className="mt-20 bg-gradient-to-r from-[#7b3fe4] to-indigo-500 text-white py-12 rounded-3xl">
//         <div className="max-w-2xl mx-auto text-center px-6">
//           <h3 className="text-2xl font-semibold mb-2">
//             Subscribe to RC Tech Journal
//           </h3>
//           <p className="text-white/90 mb-6">
//             Get the latest blogs on tech, design, freelancing, and growth.
//           </p>
//           <form
//             action="#"
//             method="POST"
//             className="flex flex-col sm:flex-row items-center gap-3"
//           >
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               className="flex-1 px-4 py-3 rounded-xl text-black outline-none focus:ring-2 focus:ring-white"
//             />
//             <button
//               type="submit"
//               className="px-6 py-3 rounded-xl bg-white text-[#7b3fe4] font-semibold hover:bg-gray-100 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>
//     </section>
//   );
// }
