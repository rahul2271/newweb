'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalForm({ show, onClose, fields, title = "Book Free SEO Consultation", sheetdbEndpoint }) {
  const [formState, setFormState] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(sheetdbEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formState }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function closeModal() {
    setStatus("");
    onClose();
    setFormState({});
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8 min-w-[320px] max-w-full relative"
            initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-indigo-600"
              onClick={closeModal}>×</button>
            <h3 className="font-bold text-xl mb-6 text-indigo-700">{title}</h3>
            {status === "success" ? (
              <motion.div className="text-green-600 font-semibold text-center pt-8 pb-6"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                Thank you! Your details are received.<br />We will contact you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map(field => (
                  <div key={field.name}>
                    <label className="block mb-1 text-sm">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name} required={field.required}
                        value={formState[field.name] || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                      />
                    ) : (
                      <input
                        name={field.name} type={field.type} required={field.required}
                        value={formState[field.name] || ""}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    )}
                  </div>
                ))}
                <button type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-5 py-2 text-white font-semibold shadow hover:scale-105 transition">
                  {status === "loading" ? "Sending..." : "Send"}
                </button>
                {status === "error" && (
                  <div className="text-red-500 pt-2">Could not submit, please try again.</div>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
