// components/DownloadResourceSection.js
'use client'
import { useState } from 'react';

export default function DownloadResourceSection() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here (e.g., send form data to backend or email service)
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-8 bg-gradient-to-r from-purple-100 to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side (Text) */}
          <div className="space-y-6">
            <h2 className="text-5xl font-medium text-gray-800">Download Our Free Resource</h2>
            <p className="text-lg font-light text-gray-600">
              Get the ultimate guide to growing your business online with actionable tips on website optimization, SEO, and digital marketing.
            </p>

            {/* Download Button */}
            <button
              onClick={() => setFormVisible(true)}
              className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span>Download Now</span>
              <svg
                className="w-5 h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Right Side (Form) */}
          <div>
            {formVisible && !submitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fill in your details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 mt-4"
                  >
                    Submit and Download
                  </button>
                </div>
              </form>
            ) : submitted ? (
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Thank you for downloading!</h3>
                <p className="text-gray-600">Check your email for the download link.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
