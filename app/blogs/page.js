"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase/client";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function PublicBlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.status === "published"); // ✅ match status field
      setBlogs(blogList);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b) => (
          <div key={b.id} className="p-4 border rounded-lg shadow bg-white">
            <img
              src={b.image || "/placeholder.jpg"}
              className="h-48 w-full object-cover rounded"
              alt={b.title}
            />
            <h2 className="text-xl font-semibold mt-2">{b.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{b.tags?.join(", ")}</p>
            <Link
              href={`/blogs/${b.id}`}
              className="text-purple-600 mt-2 inline-block"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
