"use client"
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";


const stripHtmlTags = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
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
            return new Date(b.date) - new Date(a.date);
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
        Array.isArray(blog.category) ? blog.category.includes(selectedCategory) : blog.category === selectedCategory
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

  // Schema.org ItemList structured data
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    
    "itemListElement": filteredBlogs.map((blog, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.rctechsolutions.com/blogs/${blog.slug}`,
      "item": {
        "@type": "BlogPosting",
        "headline": blog.title,
        "author": {
          "@type": "Person",
          "name": blog.author
        },
        "image": blog.blogImageUrl,
        "datePublished": blog.date
      }
    }))
  };

  return (
    <>
     
    <div className="relative bg-white min-h-screen text-black font-sans overflow-x-hidden">
      
      {/* JSON-LD Structured Data */}
      
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
/>


      {/* Background animation */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-tr from-white via-[#f2e9fc] to-white animate-gradient-xy opacity-60"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#111] leading-tight tracking-tight">
          Elevate with{" "}
          <span className="text-[#953ee2] bg-gradient-to-r from-[#953ee2] to-[#b67dfd] bg-clip-text text-transparent">
            RC Tech Blogs
          </span>
        </h1>
        <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
          Curated thoughts. Designed for impact. Built with intent. Discover insights, ideas, and innovations that lead the future.
        </p>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <input
          type="text"
          placeholder="🔍 Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-5 py-3 rounded-xl border border-gray-300 bg-white text-black shadow-sm focus:ring-2 focus:ring-[#953ee2] transition-all"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-1/3 px-5 py-3 rounded-xl border border-gray-300 bg-white text-black shadow-sm focus:ring-2 focus:ring-[#953ee2]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {typeof cat === "string" ? cat.charAt(0).toUpperCase() + cat.slice(1) : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Blogs */}
      {filteredBlogs.some((blog) => blog.featured) && (
        <section className="relative max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl font-bold mb-8 border-l-4 pl-4 border-[#953ee2]">🚀 Featured Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredBlogs.filter(blog => blog.featured).map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                <article className="relative bg-[#0f0f0f] text-white rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden border border-[#953ee2]/10">
                  <div className="absolute top-5 left-5 bg-[#953ee2] text-xs px-3 py-1 rounded-full z-10">Featured</div>
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold group-hover:text-[#953ee2] mb-3 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {stripHtmlTags(blog.content).slice(0, 220)}...
                    </p>
                    <div className="mt-4 text-xs text-gray-400">
                      By <span className="text-white font-semibold">{blog.author}</span> • {blog.date}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Blogs */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-[#111]">📝 Latest Blogs</h2>
        {filteredBlogs.filter((blog) => !blog.featured).length === 0 ? (
          <p className="text-center text-gray-500 py-10">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredBlogs.filter(blog => !blog.featured).map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                <div className="relative bg-[#111111] text-white border border-[#953ee2]/10 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
                  <div className="relative h-[180px] w-full overflow-hidden">
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col h-[280px]">
                    <h2 className="text-white text-lg font-bold mb-2 group-hover:text-[#953ee2] transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 text-sm flex-grow">
                      {stripHtmlTags(blog.content).slice(0, 100)}...
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                      By <span className="text-white font-semibold">{blog.author}</span> • {blog.date}
                    </p>
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
