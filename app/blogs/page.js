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
        const blogList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);
        setFilteredBlogs(blogList);

        // Sanitize and extract unique categories
        const rawCategories = blogList
          .map(blog => blog.category)
          .filter(cat => typeof cat === 'string' && cat.trim() !== '');

        const uniqueCategories = Array.from(new Set(rawCategories));

        // Define desired sort order
        const desiredOrder = [
          "all", "student", "professional", "career", "freelance", "tech", "design", "marketing", "development", "seo", "life"
        ];

        // Sorted & filtered categories
        const sortedCategories = desiredOrder.filter(cat => cat === "all" || uniqueCategories.includes(cat));

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    // Search by title + content
    if (search.trim() !== '') {
      const searchTerm = search.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        stripHtmlTags(blog.content).toLowerCase().includes(searchTerm)
      );
    }

    setFilteredBlogs(result);
  }, [search, selectedCategory, blogs]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-mypurple"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-md border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-mypurple"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {typeof cat === 'string'
                ? cat.charAt(0).toUpperCase() + cat.slice(1)
                : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      <div className="flex flex-wrap -mx-2">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-white w-full py-10">No blogs found.</div>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-6">
              <div className="bg-black p-4 shadow-mypurple shadow-md rounded-lg h-[430px] overflow-hidden">
                <Link href={`/blogs/${blog.slug}`} className="block h-full">
                  <div className="h-[180px] relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={blog.blogImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="bg-white text-mypurple font-bold text-lg rounded px-2 py-1 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-white text-sm mb-2">
                    {stripHtmlTags(blog.content).slice(0, 100)}...
                  </p>
                  <p className="text-white text-[10px] mt-auto">
                    By {blog.author} on {blog.date}
                  </p>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
