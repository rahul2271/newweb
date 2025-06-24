"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const stripHtmlTags = (html) => {
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
    return "";
  } catch {
    return "";
  }
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const snapshot = await getDocs(blogsCollection);
        let blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        blogList.sort((a, b) => {
          if (b.featured === a.featured) {
            return new Date(b.date?.toDate?.() || 0) - new Date(a.date?.toDate?.() || 0);
          }
          return b.featured ? 1 : -1;
        });

        setBlogs(blogList);
        setFilteredBlogs(blogList);

        const rawCategories = blogList
          .flatMap((blog) => (Array.isArray(blog.category) ? blog.category : [blog.category]))
          .filter(Boolean);
        const uniqueCategories = Array.from(new Set(rawCategories));
        const desiredOrder = ["all", "student", "professional", "career", "freelance", "tech", "design", "marketing", "development", "seo", "life"];
        const sortedCategories = desiredOrder.filter((cat) => cat === "all" || uniqueCategories.includes(cat));
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = [...blogs];

    if (selectedCategory !== "all") {
      result = result.filter((blog) =>
        Array.isArray(blog.category)
          ? blog.category.includes(selectedCategory)
          : blog.category === selectedCategory
      );
    }

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          stripHtmlTags(blog.content).toLowerCase().includes(term)
      );
    }

    setFilteredBlogs(result);
  }, [search, selectedCategory, blogs]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredBlogs.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
      item: {
        "@type": "BlogPosting",
        headline: blog.title,
        author: { "@type": "Person", name: blog.author },
        image: blog.blogImageUrl,
        datePublished: formatDate(blog.date),
      },
    })),
  };

  return (
    <>
      <div className="relative bg-white text-black min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        <section className="max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            The <span className="text-[#7b3fe4]">RC Tech</span> Journal
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Subtle, thoughtful, and inspired by tomorrow — explore curated digital narratives.
          </p>
        </section>

        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 bg-white text-black placeholder:text-gray-400 focus:ring-2 focus:ring-[#7b3fe4] focus:outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:ring-2 focus:ring-[#7b3fe4]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white text-black">
                {typeof cat === "string" ? cat.charAt(0).toUpperCase() + cat.slice(1) : ""}
              </option>
            ))}
          </select>
        </div>

        {filteredBlogs.some((blog) => blog.featured) && (
          <section className="max-w-6xl mx-auto px-6 mb-20">
            <h2 className="text-xl font-medium mb-8 text-[#7b3fe4]">Featured</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              {filteredBlogs.filter(blog => blog.featured).map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <article className="shadow-2xl bg-white rounded-xl overflow-hidden border border-gray-200 transition-all hover:border-[#7b3fe4]">
                    <div className="relative h-56 w-full">
                      <Image
                        src={blog.blogImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-2 text-black group-hover:text-[#7b3fe4]">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {stripHtmlTags(blog.content).slice(0, 200)}...
                      </p>
                      <div className="mt-4 text-xs text-gray-500">
                        {blog.author} • {formatDate(blog.date)}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-lg font-medium mb-6 text-gray-700">All Articles</h2>
          {filteredBlogs.filter((blog) => !blog.featured).length === 0 ? (
            <p className="text-center text-gray-500 py-10">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredBlogs.filter(blog => !blog.featured).map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition hover:border-[#7b3fe4]">
                    <div className="relative h-44 w-full">
                      <Image
                        src={blog.blogImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-black group-hover:text-[#7b3fe4] mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {stripHtmlTags(blog.content).slice(0, 100)}...
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        {blog.author} • {formatDate(blog.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
