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
  getCountFromServer,
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
const FEATURED_SIZE = 3;

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

async function fetchFeaturedBlogs() {
  const q = query(
    collection(db, "blogs"),
    where("featured", "==", true),
    orderBy("date", "desc"),
    limit(FEATURED_SIZE)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function getPostCount({ category = "All" }) {
  const base = collection(db, "blogs");
  const q = category !== "All"
    ? query(base, where("category", "==", category))
    : base;

  const snap = await getCountFromServer(q);
  return snap.data().count;
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

  const showFeatured = page === 1 && category === "All" && !search;

  const [blogs, categories, featuredBlogs, totalPosts] = await Promise.all([
    fetchBlogs({ category, search, page }),
    getCategories(),
    showFeatured ? fetchFeaturedBlogs() : Promise.resolve([]),
    getPostCount({ category }),
  ]);

  const featuredIds = new Set(featuredBlogs.map((b) => b.id));
  const rest = showFeatured 
    ? blogs.filter((b) => !featuredIds.has(b.id))
    : blogs;

  const isEmpty = !rest || rest.length === 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
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

      {/* Enhanced background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-indigo-50/30" />
      </div>

      {/* Hero */}
      <section className="border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
                  RC TECH JOURNAL
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900">
                Sharp ideas on tech, <br className="hidden lg:block"/>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  freelancing & growth.
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Deep dives, playbooks, and behind-the-scenes of building premium web
                experiences, scaling services, and shipping faster as a solo founder.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
                >
                  View portfolio
                </Link>
                <Link
                target="_blank"
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 hover:shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
                >
                  Work with RC Tech
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div className="w-full lg:w-[360px] rounded-[2rem] border border-gray-100 bg-white/60 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_32px_70px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-500">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  Live Stats
                </p>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
              
              <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Posts</p>
                  <p className="text-xl font-bold text-gray-900">{totalPosts}</p>
                </div>
                <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Topics</p>
                  <p className="text-xl font-bold text-gray-900">{Math.max(1, categories.length - 1)}</p>
                </div>
                <div className="bg-white p-4 text-center hover:bg-gray-50 transition-colors">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Update</p>
                  <p className="text-sm font-bold text-gray-900 pt-1">Weekly</p>
                </div>
              </div>
              
              <p className="mt-5 text-xs text-center text-gray-500 font-medium">
                Tip: Combine filters for faster discovery ⚡️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters - Sticky & Blur */}
      <section className="sticky md:sticky top-0 z-30 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="w-full lg:max-w-md">
              <form action="/blogs" className="relative group">
                <input type="hidden" name="category" value={category} />
                <input type="hidden" name="page" value="1" />

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>

                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search articles..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-11 pr-24 py-3 text-sm font-medium text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                />

                {search ? (
                  <Link
                    prefetch={false}
                    href={`/blogs?category=${encodeURIComponent(category)}&page=1`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                  >
                    Clear
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm border border-gray-100 hover:bg-gray-50 transition"
                  >
                    Search
                  </button>
                )}
              </form>
            </div>
            
            <div className="flex-1 w-full overflow-hidden">
                <CategorySwiper categories={categories} active={category} search={search} />
            </div>
          </div>

          {(search || category !== "All") && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Showing {rest.length} result{rest.length === 1 ? "" : "s"}
              {search && <span className="text-gray-300">•</span>}
              {search && <span>Search: "{search}"</span>}
              {category !== "All" && <span className="text-gray-300">•</span>}
              {category !== "All" && <span>Category : {category}</span>}
            </div>
          )}
        </div>
      </section>

      {/* Featured Section - Premium Glass Design */}
      {featuredBlogs.length > 0 && showFeatured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <div className="flex items-center justify-between mb-10">
            <div className="inline-flex items-center gap-4 px-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 hover:rotate-6 transition-transform duration-500">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Featured Reads
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-0.5">
                  Handpicked stories for you
                </p>
              </div>
            </div>
            
            <div className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 bg-indigo-50/50 px-5 py-2.5 rounded-full border border-indigo-100">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              {featuredBlogs.length} highlights
            </div>
          </div>

          <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog, idx) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group relative block h-full"
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-indigo-100/50 border border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/40">
                  
                  {/* Image Area */}
                  <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                    {blog.blogImageUrl ? (
                      <Image
                        src={blog.blogImageUrl}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                        <span className="text-indigo-300 opacity-50">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay - Smooth Fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
                        {idx === 0 ? "🏆 Editor's Choice" : idx === 1 ? "🔥 Trending" : "✨ New Arrival"}
                      </span>
                    </div>
                  </div>

                  {/* Content Card - Overlapping Glass Effect */}
                  <div className="relative -mt-16 px-5 pb-6">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/50 relative z-10">
                      <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-500">
                        <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                          {blog.category || "Tech"}
                        </span>
                        <span>{computeReadingTime(blog.content)} min read</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h3>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                            {(blog.author?.[0] || "R").toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-gray-600">{blog.author || "RC Team"}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-400">{formatDate(blog.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles Grid - Clean & Minimal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
            Latest Articles
          </h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            Page {page}
          </span>
        </div>

        {isEmpty ? (
          <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              We couldn't find any articles matching your criteria. Try different keywords.
            </p>
            <Link
              prefetch={false}
              href="/blogs"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all duration-300"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col bg-white rounded-[1.5rem] border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                  {blog.blogImageUrl ? (
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-gray-300">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {blog.category && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                        {blog.category}
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400 font-medium ml-auto">
                      {computeReadingTime(blog.content)} min read
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {stripHtmlTags(blog.content || "").slice(0, 150)}…
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-semibold text-gray-400">
                      {formatDate(blog.date)}
                    </span>
                    <span className="text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="flex justify-center gap-3">
            {page > 1 && (
              <Link
                prefetch={false}
                href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page - 1}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                ← Previous
              </Link>
            )}

            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-lg">
              {page}
            </div>

            {blogs.length === PAGE_SIZE && (
              <Link
                prefetch={false}
                href={`/blogs?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}&page=${page + 1}`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Next Page →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Fixed CTAs - Optimized for Conversions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <Link
            href="/portfolio"
            className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[10px] font-bold">Portfolio</span>
          </Link>
          <Link
            href="https://cal.com/your-username"
            className="flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-transform"
          >
            <span className="text-xs font-bold">Book Call</span>
          </Link>
        </div>
      </div>

      <div className="hidden xl:block fixed bottom-8 inset-x-0 z-40 pointer-events-none px-8">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full p-2.5 pl-8 border border-white/50 shadow-2xl shadow-indigo-500/10 flex items-center justify-between pointer-events-auto hover:scale-[1.01] transition-transform duration-500 ring-1 ring-gray-900/5">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-medium text-gray-600">
              <span className="font-bold text-gray-900">Available for new projects.</span> Let's build something premium.
            </p>
          </div>
          <div className="flex gap-2">
             <Link href="/portfolio" className="px-6 py-3 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
              Portfolio
            </Link>
            <Link target="_blank" href="https://www.rctechsolutions.com/contact" className="px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-bold shadow-lg shadow-gray-900/20 hover:bg-black hover:-translate-y-0.5 transition-all">
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
