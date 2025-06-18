"use client";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">{blog.title}</h1>
      <img src={blog.image} className="w-full max-h-[400px] object-cover rounded mb-6" />
      <div className="text-sm text-gray-500 mb-4">{blog.tags?.join(", ")}</div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
}
