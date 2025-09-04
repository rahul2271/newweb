import { db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// --- Utils ---
const stripHtmlTags = (html = "") => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
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
    return "";
  } catch {
    return "";
  }
};

const computeReadingTime = (html) => {
  const words = stripHtmlTags(html).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

// --- Fetch Blogs (server-side) ---
async function fetchBlogs() {
  const blogs = [];
  try {
    const col = collection(db, "blogs");
    const q = query(col, orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const data = doc.data();
      blogs.push({
        id: doc.id,
        ...data,
        date: data.date || null,
      });
    });
  } catch (e) {
    console.error("Error fetching blogs:", e);
  }
  return blogs;
}

// --- Main Page (Server Component) ---
export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <div className="relative bg-white text-black min-h-screen font-sans">
      {/* Schema.org JSON-LD */}
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
            image: "https://www.rctechsolutions.com/og/blogs-cover.jpg",
            inLanguage: "en-IN",
          }),
        }}
      />

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          The <span className="text-[#7b3fe4]">RC Tech</span> Journal
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg max-w-xl mx-auto">
          Subtle, thoughtful, and inspired by tomorrow — curated digital narratives.
        </p>
      </section>

      {/* All Articles */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-lg font-medium text-gray-700 mb-6">All Articles</h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
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
                    <h3 className="text-base font-semibold text-black group-hover:text-[#7b3fe4] mb-1 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {stripHtmlTags(blog.content).slice(0, 120)}...
                    </p>
                    <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
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
        )}
      </section>
    </div>
  );
}
