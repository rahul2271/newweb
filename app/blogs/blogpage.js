"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

/** =====================
 *  Minimal UI helpers
 *  ===================== */
const cn = (...cls) => cls.filter(Boolean).join(" ");

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1 rounded-full border transition text-sm",
      active
        ? "bg-[#7b3fe4] text-white border-transparent shadow-sm"
        : "bg-white text-gray-700 border-gray-300 hover:border-[#7b3fe4]"
    )}
  >
    {children}
  </button>
);

const SkeletonCard = () => (
  <div className="animate-pulse bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className="h-44 w-full bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

/** =====================
 *  Content utilities
 *  ===================== */
const stripHtmlTags = (html = "") => {
  if (!html) return "";
  if (typeof window === "undefined") return html; // SSR guard
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const formatDate = (timestamp) => {
  try {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return "";
  } catch {
    return "";
  }
};

const computeReadingTime = (html) => {
  const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200)); // ~200 WPM
};

/**
 * Very light keyword extraction fallback (client-side)
 */
const fallbackExtractKeywords = (html = "", limit = 8) => {
  const text = stripHtmlTags(html).toLowerCase();
  const stop = new Set([
    "about","with","this","that","have","from","there","their","would","could","should","these","those","which","where","when","your","into","such","than","will","then","they","them","some","more","been","also","just","like","what","were","each","only","most","other","because","while","after","before","using","under","over","since","within","among","across","between","again","every","always","never","into","our","you","for","and","the","are","was","were","is","to","in","of","on","by","at","as","it","we","or","an","be","can","not","but","all"
  ]);
  const freq = new Map();
  text.replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 4 && !stop.has(w))
    .forEach((w) => freq.set(w, (freq.get(w) || 0) + 1));
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([w]) => w);
};

/** =====================
 *  Main Blogs Page
 *  ===================== */
export default function BloogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortMode, setSortMode] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const col = collection(db, "blogs");
        let q = query(col, orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        list = list.map((b) => ({
          ...b,
          category: Array.isArray(b.category)
            ? b.category
            : b.category
            ? [b.category]
            : [],
          categoryPath: Array.isArray(b.categoryPath) ? b.categoryPath : [],
          tags: Array.isArray(b.tags) ? b.tags : [],
          views: typeof b.views === "number" ? b.views : 0,
        }));

        setBlogs(list);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /** Categories & tags */
  const { orderedCategories, allTags } = useMemo(() => {
    const rawCats = new Set();
    const tagSet = new Set();

    blogs.forEach((b) => {
      if (b.categoryPath?.length) rawCats.add(b.categoryPath[0]);
      else if (b.category?.length) rawCats.add(b.category[0]);

      (b.tags || []).forEach((t) => t && tagSet.add(String(t).toLowerCase()));
    });

    const desiredOrder = [
      "all",
      "student",
      "professional",
      "career",
      "freelance",
      "tech",
      "design",
      "marketing",
      "development",
      "seo",
      "life",
    ];

    const uniques = ["all", ...Array.from(rawCats)];
    const sorted = desiredOrder.filter((c) => uniques.includes(c));

    return { orderedCategories: sorted, allTags: Array.from(tagSet).sort() };
  }, [blogs]);

  /** Apply filters */
  const filtered = useMemo(() => {
    let result = [...blogs];

    if (selectedCategory !== "all") {
      result = result.filter((b) => {
        const top = b.categoryPath?.[0] || b.category?.[0];
        return top === selectedCategory;
      });
    }

    if (selectedTags.length) {
      result = result.filter((b) =>
        selectedTags.every((t) => b.tags?.map((x) => String(x).toLowerCase()).includes(t))
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((b) => {
        const text = stripHtmlTags(b.content || "").toLowerCase();
        return (
          b.title?.toLowerCase().includes(term) ||
          text.includes(term) ||
          b.tags?.some((t) => String(t).toLowerCase().includes(term))
        );
      });
    }

    result.sort((a, b) => {
      if (sortMode === "popular") return (b.views || 0) - (a.views || 0);
      const da = a.date?.toDate ? a.date.toDate() : new Date(0);
      const db = b.date?.toDate ? b.date.toDate() : new Date(0);
      return sortMode === "oldest" ? da - db : db - da;
    });

    return result;
  }, [blogs, search, selectedCategory, selectedTags, sortMode]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / articlesPerPage));
  const start = (currentPage - 1) * articlesPerPage;
  const current = filtered.slice(start, start + articlesPerPage);

  // Debounce search
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debounced, selectedCategory, selectedTags, sortMode]);

  /** =====================
   *  Render
   *  ===================== */
  return (
    <div className="relative bg-white text-black min-h-screen font-sans">
      {/* Schema.org for Blogs */}
      <Script
        id="blogs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://www.rctechsolutions.com/blogs",
            url: "https://www.rctechsolutions.com/blogs",
            name: "RC Tech Solutions Blogs",
            description:
              "Explore trending blogs by RC Tech Solutions on web development, freelancing, design, tech, SEO, and career growth.",
            publisher: {
              "@type": "Organization",
              name: "RC Tech Solutions",
              logo: {
                "@type": "ImageObject",
                url: "https://www.rctechsolutions.com/logo.png",
              },
            },
            author: {
              "@type": "Person",
              name: "Rahul Chauhan",
              url: "https://www.rctechsolutions.com",
            },
            image: "https://www.rctechsolutions.com/og/blogs-cover.jpg",
            inLanguage: "en-IN",
          }),
        }}
      />

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          The <span className="text-[#7b3fe4]">RC Tech</span> Journal
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-xl mx-auto">
          Subtle, thoughtful, and inspired by tomorrow — curated digital narratives.
        </p>
      </section>

      {/* Controls */}
      <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex-1 flex items-center gap-3">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search articles, topics, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#7b3fe4] focus:outline-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-[#7b3fe4]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {orderedCategories.map((cat) => (
              <Chip
                key={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-2 flex flex-wrap gap-2">
          {allTags.slice(0, 20).map((t) => {
            const active = selectedTags.includes(t);
            return (
              <Chip
                key={t}
                active={active}
                onClick={() =>
                  setSelectedTags((prev) =>
                    active ? prev.filter((x) => x !== t) : [...prev, t]
                  )
                }
              >
                #{t}
              </Chip>
            );
          })}
          {allTags.length > 20 && (
            <span className="text-sm text-gray-500">+{allTags.length - 20} more</span>
          )}
        </div>
      )}

      {/* Featured */}
      {filtered.some((b) => b.featured) && (
        <section className="max-w-6xl mx-auto px-6 mt-6 mb-12">
          <h2 className="text-xl font-medium mb-5 text-[#7b3fe4]">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered
              .filter((b) => b.featured)
              .slice(0, 4)
              .map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <article className="shadow-2xl bg-white rounded-2xl overflow-hidden border border-gray-200 transition hover:border-[#7b3fe4]">
                    <div className="relative h-56 w-full">
                      {blog.blogImageUrl ? (
                        <Image
                          src={blog.blogImageUrl}
                          alt={blog.title || "Blog image"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {(blog.tags || []).slice(0, 3).map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700">#{String(t).toLowerCase()}</span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold mb-1 text-black group-hover:text-[#7b3fe4] line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {stripHtmlTags(blog.content).slice(0, 180)}...
                      </p>
                      <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                        <span>{blog.author || "RC Tech Team"}</span>
                        <span>•</span>
                        <span>{formatDate(blog.date)}</span>
                        <span>•</span>
                        <span>{computeReadingTime(blog.content)} min read</span>
                      </div>
                      
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-700">All Articles</h2>
          <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <p>No articles found. Try adjusting filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {current.map((blog) => {
                const reading = computeReadingTime(blog.content);
                const kw = (blog.keywords && blog.keywords.length
                  ? blog.keywords
                  : fallbackExtractKeywords(blog.content)
                ).slice(0, 6);

                return (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition hover:border-[#7b3fe4]">
                      <div className="relative h-44 w-full">
                        {blog.blogImageUrl ? (
                          <Image
                            src={blog.blogImageUrl}
                            alt={blog.title || "Blog image"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        {/* Breadcrumb from categoryPath */}
                        {blog.categoryPath?.length > 0 && (
                          <div className="text-[11px] text-gray-500 mb-1">
                            {blog.categoryPath.map((c, i) => (
                              <span key={i}>
                                {c[0].toUpperCase() + c.slice(1)}
                                {i < blog.categoryPath.length - 1 && " / "}
                              </span>
                            ))}
                          </div>
                        )}

                        <h3 className="text-base font-semibold text-black group-hover:text-[#7b3fe4] mb-1 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                          {stripHtmlTags(blog.content).slice(0, 120)}...
                        </p>

                        {/* Keywords (chips) */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {kw.map((k) => (
                            <span key={k} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600">{k}</span>
                          ))}
                        </div>

                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                          <span>{blog.author || "RC Tech Team"}</span>
                          <span>•</span>
                          <span>{formatDate(blog.date)}</span>
                          <span>•</span>
                          <span>{reading} min read</span>
                          {typeof blog.views === "number" && (
                            <>
                              <span>•</span>
                              <span>{blog.views.toLocaleString()} views</span>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={cn(
                      "px-4 py-2 rounded-xl border",
                      currentPage === p
                        ? "bg-[#7b3fe4] text-white border-transparent"
                        : "bg-white text-black border-gray-300 hover:border-[#7b3fe4]"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Minimal footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} RC Tech Solutions</p>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#7b3fe4]">Home</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#7b3fe4]">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#7b3fe4]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
