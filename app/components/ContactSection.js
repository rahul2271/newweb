"use client"
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send to an API or email)
    console.log(formData);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        {/* Headline and Subtext */}
        <div className="text-center mb-8">
          <h2 className="md:text-3xl text-xl font-bold">Let’s Build Something Great Together</h2>
          <p className="mt-4 md:text-lg text-xl">Fill out the form below or drop us a message, and we'll get back to you ASAP!</p>
        </div>

        {/* Contact Form and Google Map */}
        <div className="flex flex-col sm:flex-row gap-8">
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-1/2 bg-white text-gray-900 rounded-lg p-6 shadow-md"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg sm:text-xl font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg sm:text-xl font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg sm:text-xl font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg h-32 text-base sm:text-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
            >
              Submit Your Inquiry
            </button>
          </form>

          {/* Google Maps Integration */}
          <div className="w-full sm:w-1/2 mt-8 sm:mt-0">
            <div className="h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
