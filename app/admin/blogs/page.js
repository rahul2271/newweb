"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

// Dynamically import Quill (avoids SSR issues)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";


export default function AdminBlogEditor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload Image to Firebase Storage
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `blogs/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
      }

      await addDoc(collection(db, "blogs"), {
        title,
        slug,
        description,
        content,
        tags: tags.split(",").map((t) => t.trim().toLowerCase()),
        category,
        blogImageUrl: imageUrl,
        status: "published", // or draft
        date: serverTimestamp(),
        views: 0,
      });

      alert("✅ Blog Published!");
      setTitle(""); setSlug(""); setDescription(""); setContent(""); 
      setTags(""); setCategory(""); setImage(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6">✍️ Publish Blog</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        placeholder="Slug (unique URL)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <textarea
        placeholder="Meta Description (SEO)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3 h-20"
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        className="h-64 mb-6"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={handlePublish}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
      >
        {loading ? "Publishing..." : "🚀 Publish Blog"}
      </button>
    </div>
  );
}
