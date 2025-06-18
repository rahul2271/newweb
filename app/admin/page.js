"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/client";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/admin/login");
    });
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    };
    fetchBlogs();
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>
        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <button
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/admin/create")}
      >
        Create New Blog
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div key={b.id} className="p-4 bg-zinc-900 rounded-xl text-white">
            {b.image ? (
  <img src={b.image} className="h-32 object-cover w-full rounded" alt="cover" />
) : (
  <div className="h-32 w-full bg-zinc-800 rounded flex items-center justify-center text-zinc-400 text-sm">
    No Image
  </div>
)}

            <h2 className="text-xl mt-2 font-bold">{b.title}</h2>
            <p className="text-sm text-zinc-400">{b.tags?.join(", ")}</p>
            <button
              className="mt-2 px-3 py-1 bg-yellow-400 text-black rounded"
              onClick={() => router.push(`/admin/edit/${b.id}`)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
