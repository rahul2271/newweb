"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    content: "",
    blogImageUrl: "",
  });

  // ✅ Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchBlogs();
  }, []);

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  // ✅ Start Editing
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      content: blog.content || "",
      blogImageUrl: blog.blogImageUrl || "",
    });
  };

  // ✅ Save Updates
  const handleSave = async () => {
    if (!editingBlog) return;

    const updatedData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    await updateDoc(doc(db, "blogs", editingBlog.id), updatedData);

    setBlogs(
      blogs.map((b) =>
        b.id === editingBlog.id ? { ...b, ...updatedData } : b
      )
    );

    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      category: "",
      tags: "",
      content: "",
      blogImageUrl: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

      {/* ✅ Blog List */}
      {blogs.map((b) => (
        <div key={b.id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{b.title}</h2>
          <p className="text-gray-500">{b.slug}</p>
          <p className="text-sm">Category: {b.category}</p>
          <p className="text-sm">
            Tags: {Array.isArray(b.tags) ? b.tags.join(", ") : b.tags}
          </p>

          {b.blogImageUrl && (
            <img
              src={b.blogImageUrl}
              alt={b.title}
              className="w-48 h-32 object-cover rounded mt-2"
            />
          )}

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleEdit(b)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(b.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Edit Form */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.blogImageUrl}
              onChange={(e) =>
                setFormData({ ...formData, blogImageUrl: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <ReactQuill
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              className="mb-4"
            />

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingBlog(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
