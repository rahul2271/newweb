"use client";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const commentsData = [
  { id: 1, name: "Aarav Sharma", text: "This ebook gave me a new perspective. Worth every rupee!", avatar: "https://i.pravatar.cc/150?img=11", likes: 12 },
  { id: 2, name: "Priya Mehta", text: "Short, crisp, and full of wisdom. Loved it!", avatar: "https://i.pravatar.cc/150?img=12", likes: 8 },
  { id: 3, name: "Rohan Verma", text: "99₹ feels like nothing for such deep insights. Must read!", avatar: "https://i.pravatar.cc/150?img=13", likes: 15 },
  { id: 4, name: "Simran Kaur", text: "Made me rethink life decisions. Amazing ebook!", avatar: "https://i.pravatar.cc/150?img=14", likes: 20 },
  { id: 5, name: "Aditya Singh", text: "Very relatable, very real. Highly recommend!", avatar: "https://i.pravatar.cc/150?img=15", likes: 5 },
  { id: 6, name: "Neha Gupta", text: "Rarely do I finish an ebook in one sitting. This one—I did!", avatar: "https://i.pravatar.cc/150?img=16", likes: 10 },
  { id: 7, name: "Kunal Joshi", text: "Beautifully written, feels like a personal conversation.", avatar: "https://i.pravatar.cc/150?img=17", likes: 9 },
  { id: 8, name: "Ishita Roy", text: "Got emotional reading it. Thank you for writing this!", avatar: "https://i.pravatar.cc/150?img=18", likes: 14 },
];

export default function CommentsSection() {
  const [comments, setComments] = useState(commentsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-swipe logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 4 >= comments.length ? 0 : prev + 4
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [comments.length]);

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const visibleComments = comments.slice(currentIndex, currentIndex + 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        💬 Reader’s Voices
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {visibleComments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col bg-white shadow-lg rounded-2xl p-5 transition hover:shadow-2xl"
          >
            <div className="flex items-center mb-3">
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-12 h-12 rounded-full border border-gray-300 mr-3"
              />
              <h4 className="text-lg font-semibold text-gray-800">
                {comment.name}
              </h4>
            </div>
            <p className="text-gray-600 text-sm flex-1">{comment.text}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
              >
                <FaHeart /> <span>{comment.likes}</span>
              </button>
              <span className="text-xs text-gray-400">Verified Reader ✅</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
