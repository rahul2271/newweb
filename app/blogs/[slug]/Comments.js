"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!blogId) return;
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "blogs", blogId, "comments"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "blogs", blogId, "comments"), {
        name,
        text: comment,
        createdAt: serverTimestamp(),
      });
      setName("");
      setComment("");
      // Refresh comments
      const q = query(
        collection(db, "blogs", blogId, "comments"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-black">Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Comment"
          className="border border-gray-300 rounded px-4 py-2"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {comments.length} Comment{comments.length !== 1 ? "s" : ""}
        </h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="border border-gray-200 rounded p-3 bg-gray-50"
              >
                <p className="text-gray-800">{c.text}</p>
                <p className="text-sm text-gray-500 mt-2">
                  – <strong>{c.name}</strong>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
