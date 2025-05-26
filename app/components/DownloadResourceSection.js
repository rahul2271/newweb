"use client";
import { useState } from "react";

export default function DownloadResourceSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://sheetdb.io/api/v1/YOUR_SHEETDB_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) setSubmitted(true);
      else alert("Something went wrong.");
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Left Side */}
        <div className="space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            We Build More Than Just Websites.
          </h2>
          <p className="text-lg text-gray-300 max-w-md">
            We craft digital experiences that elevate your brand and build trust with your audience. 
            Let’s make something impactful — together.
          </p>
          <div className="w-20 h-1 bg-purple-500 rounded-full mt-4"></div>
        </div>

        {/* Right Side Form */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-purple-400">You're In!</h3>
              <p className="text-gray-300">We'll connect with you shortly. Stay tuned 🚀</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl font-bold mb-2 text-white">Get Started With Us</h3>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="accent-purple-500"
                />
                <label className="text-sm text-gray-300">Subscribe to our newsletter</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 bg-gradient-to-r ${
                  loading
                    ? "from-gray-600 to-gray-700"
                    : "from-purple-600 to-indigo-600"
                } rounded-lg text-white font-semibold transition-transform duration-300 hover:scale-105 shadow-lg`}
              >
                {loading ? "Submitting..." : "Submit & Start Building"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
