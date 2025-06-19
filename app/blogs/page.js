"use client";

import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

const stripHtmlTags = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const snapshot = await getDocs(blogsCollection);
        let blogList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        blogList.sort((a, b) => {
          if (b.featured === a.featured) {
            return new Date(b.date) - new Date(a.date);
          }
          return b.featured ? 1 : -1;
        });

        setBlogs(blogList);
        setFilteredBlogs(blogList);

        const rawCategories = blogList
          .flatMap(blog => Array.isArray(blog.category) ? blog.category : [blog.category])
          .filter(Boolean);

        const uniqueCategories = Array.from(new Set(rawCategories));
        const desiredOrder = [
          "all", "student", "professional", "career", "freelance", "tech", "design", "marketing", "development", "seo", "life"
        ];
        const sortedCategories = desiredOrder.filter(cat => cat === "all" || uniqueCategories.includes(cat));
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = [...blogs];

    if (selectedCategory !== 'all') {
      result = result.filter(blog =>
        Array.isArray(blog.category)
          ? blog.category.includes(selectedCategory)
          : blog.category === selectedCategory
      );
    }

    if (search.trim() !== '') {
      const term = search.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        stripHtmlTags(blog.content).toLowerCase().includes(term)
      );
    }

    setFilteredBlogs(result);
  }, [search, selectedCategory, blogs]);

  return (
    <div className="relative">
      {/* 🌌 Sparkling Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* 🧠 Blog Content */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        {/* 🔍 Filters */}<div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
  <div className="blob w-[400px] h-[400px] bg-[#953ee2] top-[40%] left-[5%]" />
  <div className="blob w-[300px] h-[300px] bg-[#953ee2] top-[40%] left-[70%]" />
  <div className="blob w-[500px] h-[500px] bg-[#953ee2] top-[80%] left-[30%]" />
</div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#953ee2]"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 rounded-md border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#953ee2]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : ''}
              </option>
            ))}
          </select>
        </div>

        {/* ✨ Featured Blogs */}
        {filteredBlogs.some(blog => blog.featured) && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6 border-l-4 pl-4 border-[#953ee2]">
              Curated • Featured Reads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredBlogs.filter(blog => blog.featured).map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group animate-fadeInUp">
                  <article className="border border-white/10 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-[#0d0d0d] to-[#111]">
                    <div className="relative h-[260px] w-full overflow-hidden">
                      <Image
                        src={blog.blogImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs uppercase text-[#953ee2] tracking-wider mb-2 inline-block">
                        Featured
                      </span>
                      <h3 className="text-white text-xl font-semibold group-hover:text-[#953ee2] transition-colors duration-200">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                        {stripHtmlTags(blog.content).slice(0, 220)}...
                      </p>
                      <div className="mt-4 text-gray-500 text-xs">
                        By <span className="text-white">{blog.author}</span> • {blog.date}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 📰 Latest Blogs */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Latest Blogs</h2>
          {filteredBlogs.filter(blog => !blog.featured).length === 0 ? (
            <p className="text-center text-white py-10">No blogs found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredBlogs.filter(blog => !blog.featured).map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group animate-fadeInUp">
                  <div className="bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-[180px] w-full overflow-hidden">
                      <Image
                        src={blog.blogImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col h-[280px]">
                      <h2 className="text-white font-semibold text-base mb-2 group-hover:text-[#953ee2] transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 flex-grow">
                        {stripHtmlTags(blog.content).slice(0, 100)}...
                      </p>
                      <p className="text-gray-500 text-xs">
                        By <span className="text-white">{blog.author}</span> • {blog.date}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
