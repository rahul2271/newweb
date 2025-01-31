
import React from "react";
import { motion } from "framer-motion";

const WebDevelopmentPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-10">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-purple-500">RC Tech Solutions</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          We don’t just build websites — we craft digital masterpieces that drive growth, wow audiences, and dominate industries.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-4 bg-purple-500 rounded-full text-lg font-bold text-black hover:bg-purple-600 transition"
        >
          Get Started
        </motion.button>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-purple-500">RC Tech Solutions</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Tailored Solutions",
              description:
                "Custom web solutions that perfectly match your vision, audience, and goals.",
            },
            {
              title: "Cutting-Edge Technologies",
              description:
                "We use the latest tools like Next.js, React, and Tailwind CSS for future-ready sites.",
            },
            {
              title: "Responsive Design",
              description:
                "Flawless performance on any device — smartphones, tablets, or desktops.",
            },
            {
              title: "SEO and AEO Optimization",
              description:
                "Rank higher and answer user queries directly with our optimized websites.",
            },
            {
              title: "End-to-End Support",
              description:
                "From brainstorming ideas to maintaining your live site, we’ve got you covered.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-500">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-purple-500 text-black">
        <h2 className="text-4xl font-bold text-center mb-8">
          Let’s Build Something Amazing Together
        </h2>
        <p className="text-lg text-center max-w-2xl mx-auto mb-8">
          Ready to own the digital world? Let’s create a website that makes waves.
        </p>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition"
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage;
