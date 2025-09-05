// app/components/LatestBlogs.jsx
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";



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

// --- Fetch last 3 blogs ---
async function fetchLatestBlogs() {
  const blogs = [];
  try {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(3));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => blogs.push({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching latest blogs:", err);
  }
  return blogs;
}

// --- Component ---
export default async function LatestBlogs() {
  const blogs = await fetchLatestBlogs();

  if (!blogs.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2
          
          className="text-4xl md:text-6xl md:pb-[25px] font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
        >
          Our Latest <span className="font-semibold ">Blogs</span>
        </h2>
        <Link
          href="/blogs"
          className="text-[#7b3fe4] hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
          >
            <div className="relative h-44">
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
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#7b3fe4] line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {stripHtmlTags(blog.content).slice(0, 120)}...
              </p>
              <div className="mt-2 text-xs text-gray-500 flex gap-2">
                <span>{blog.author || "RC Tech Team"}</span>
                • <span>{formatDate(blog.date)}</span> •{" "}
                <span>{computeReadingTime(blog.content)} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
