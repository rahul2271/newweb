// app/blogs/page.jsx
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

// --- Utils ---
const stripHtmlTags = (html = "") => html.replace(/<[^>]+>/g, "");

const formatDate = (dateValue) => {
  try {
    if (!dateValue) return "Unpublished";
    if (typeof dateValue.toDate === "function") {
      return dateValue.toDate().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    const parsed = new Date(dateValue);
    if (!isNaN(parsed)) {
      return parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return "Unpublished";
  } catch {
    return "Unpublished";
  }
};

const computeReadingTime = (html) => {
  const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

// --- Fetch Blogs ---
async function fetchBlogs({ search = "", category = "All", page = 1 }) {
  const blogs = [];
  const PAGE_SIZE = 6;

  try {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(30));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching blogs:", e);
    return { blogs: [], total: 0 };
  }

  // Filtering
  let filtered = blogs;
  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        stripHtmlTags(b.content).toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category !== "All") {
    filtered = filtered.filter((b) => b.category === category);
  }

  // ✅ Sort by date after filtering
  filtered = filtered.sort((a, b) => {
    const dateA = a.date?.toDate?.() || (a.date ? new Date(a.date) : new Date(0));
    const dateB = b.date?.toDate?.() || (b.date ? new Date(b.date) : new Date(0));
    return dateB - dateA; // newest first
  });

  // Pagination
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginated = filtered.slice(start, end);

  return { blogs: paginated, total: filtered.length };
}

// --- Fetch Blogs for Metadata ---
async function fetchBlogsForMeta() {
  const blogs = [];
  try {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(5));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching blogs for metadata:", e);
  }
  return blogs;
}

// ✅ Generate Metadata
export async function generateMetadata() {
  const blogs = await fetchBlogsForMeta();

  const titles = blogs.map((b) => b.title).join(", ").slice(0, 150);
  const descriptions = blogs
    .map((b) => (b.content ? b.content.slice(0, 100) : ""))
    .join(" | ")
    .slice(0, 250);

  // ✅ Collect metaKeywords from Firestore
  const keywords = blogs
    .flatMap((b) =>
      Array.isArray(b.metaKeywords)
        ? b.metaKeywords
        : (b.metaKeywords || "").split(",")
    )
    .map((kw) => kw.trim())
    .filter(Boolean);

  return {
    title: "RC Tech Journal – Explore All Articles",
    description:
      descriptions ||
      "Explore trending blogs on technology, career growth, freelancing, and web development.",
    keywords, // 👈 will generate <meta name="keywords">
    openGraph: {
      title: "RC Tech Journal",
      description:
        descriptions ||
        "Explore trending blogs on technology, career growth, freelancing, and web development.",
      url: "https://www.rctechsolutions.com/blogs",
    },
    twitter: {
      card: "summary_large_image",
      title: "RC Tech Journal",
      description:
        descriptions ||
        "Explore trending blogs on technology, career growth, freelancing, and web development.",
    },
  };
}

// ✅ Blogs Page Component
export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "All";
  const page = parseInt(params?.page || "1", 10);

  const { blogs, total } = await fetchBlogs({ search, category, page });
  if (!blogs) return notFound();

  // ✅ Featured always shows latest 2 blogs
  const featured = blogs.slice(0, 2);
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const totalPages = Math.ceil(total / 6);

  return (
    <div className="min-h-screen bg-white text-black ">
      <Script
        id="blogs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
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
            potentialAction: {
              "@type": "ContactAction",
              target: "https://www.rctechsolutions.com/contact",
              name: "Book Free 1:1 Consultation",
            },
            inLanguage: "en-IN",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-[#7b3fe4] to-indigo-500 text-white">
        <h1 className="text-5xl font-bold">RC Tech Journal</h1>
        <p className="mt-3 text-lg opacity-90">
          Fresh perspectives on tech, freelancing, design & growth.
        </p>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <form className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search articles..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl "
          />
          <select
            name="category"
            defaultValue={category}
            className="px-4 py-2 rounded-xl border "
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#7b3fe4] text-white hover:bg-[#6a32c9]"
          >
            Apply
          </button>
        </form>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold mb-6">🌟 Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
              >
                <div className="relative h-60">
                  {blog.blogImageUrl && (
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#7b3fe4]">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {stripHtmlTags(blog.content).slice(0, 150)}...
                  </p>
                  <div className="mt-3 text-xs text-gray-500 flex gap-2">
                    <span>{blog.author || "RC Tech Team"}</span>
                    • <span>{formatDate(blog.date)}</span> •{" "}
                    <span>{computeReadingTime(blog.content)} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Link
              href={`/blogs/${blog.slug}`}
              className="group block rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
            >
              <div className="relative h-40">
                {blog.blogImageUrl && (
                  <Image
                    src={blog.blogImageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#7b3fe4]">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {stripHtmlTags(blog.content).slice(0, 120)}...
                </p>
                <div className="mt-2 text-xs text-gray-500 flex gap-2">
                  <span>{blog.author || "RC Tech Team"}</span>
                  • <span>{formatDate(blog.date)}</span> •{" "}
                  <span>{computeReadingTime(blog.content)} min</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="text-center my-8 flex justify-center gap-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/blogs?search=${search}&category=${category}&page=${i + 1}`}
            className={`px-4 py-2 rounded-lg ${
              page === i + 1 ? "bg-[#7b3fe4] text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
