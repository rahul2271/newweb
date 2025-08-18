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
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const snapshot = await getDocs(blogsCollection);
        let blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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
    setCurrentPage(1);
  }, [search, selectedCategory, blogs]);

  const sortedFilteredBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = a.date?.toDate ? a.date.toDate() : new Date(0);
    const dateB = b.date?.toDate ? b.date.toDate() : new Date(0);
    return dateB - dateA;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedFilteredBlogs.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredBlogs.length / articlesPerPage);

  return (
    <div className="relative bg-white text-black min-h-screen font-sans">
      <Script
        id="blogs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://www.rctechsolutions.com/blogs",
            "url": "https://www.rctechsolutions.com/blogs",
            "name": "RC Tech Solutions Blogs",
            "description":
              "Explore trending blogs by RC Tech Solutions on web development, freelancing, design, tech, SEO, and career growth.",
            "publisher": {
              "@type": "Organization",
              "name": "RC Tech Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.rctechsolutions.com/logo.png"
              }
            },
            "author": {
              "@type": "Person",
              "name": "Rahul Chauhan",
              "url": "https://www.rctechsolutions.com"
            },
            "image": "https://www.rctechsolutions.com/og/blogs-cover.jpg",
            "inLanguage": "en-IN"
          })
        }}
      />
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          The <span className="text-[#7b3fe4]">RC Tech</span> Journal
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
          Subtle, thoughtful, and inspired by tomorrow — explore curated digital narratives.
        </p>
      </section>

      {/* Search and Category Filter */}
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

      {/* Featured Blogs */}
      {filteredBlogs.some((blog) => blog.featured) && (
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-xl font-medium mb-8 text-[#7b3fe4]">Featured Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs
              .filter((blog) => blog.featured)
              .sort((a, b) => {
                const dateA = a.date?.toDate ? a.date.toDate() : new Date(0);
                const dateB = b.date?.toDate ? b.date.toDate() : new Date(0);
                return dateB - dateA;
              })
              .map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <article className="shadow-2xl bg-white rounded-xl overflow-hidden border border-gray-200 transition hover:border-[#7b3fe4]">
                    <div className="relative h-56 w-full">
                      {blog.blogImageUrl ? (
                        <Image
                          src={blog.blogImageUrl}
                          alt={blog.title}
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
                      <h3 className="text-lg font-semibold mb-2 text-black group-hover:text-[#7b3fe4]">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {stripHtmlTags(blog.content).slice(0, 200)}...
                      </p>
                      <div className="mt-4 text-xs text-gray-500">
                        {blog.author} • Published on: {formatDate(blog.date)}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* All Articles with Pagination */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-lg font-medium mb-6 text-gray-700">All Articles</h2>

        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No articles found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentArticles.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition hover:border-[#7b3fe4]">
                    <div className="relative h-44 w-full">
                      {blog.blogImageUrl ? (
                        <Image
                          src={blog.blogImageUrl}
                          alt={blog.title}
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

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === index + 1
                      ? "bg-[#7b3fe4] text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
