// components/ThankYouModal.js
"use client";
import { motion } from 'framer-motion';

export default function ThankYouModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold text-green-600">🎉 Thank You!</h2>
        <p className="mt-2 text-gray-700">
          Your email has been received. We’ll get in touch soon!
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
