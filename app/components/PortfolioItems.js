"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample Portfolio Items
const portfolioItems = [
  {
    image: "https://source.unsplash.com/800x600/?laptop",
    title: "Modern E-commerce Platform",
    tagline: "Selling made seamless.",
    description: "A cutting-edge platform featuring seamless UI/UX and integrated payment gateways designed for conversion.",
    outcome: "📈 Boosted monthly sales by 40% within the first month.",
  },
  {
    image: "https://source.unsplash.com/800x600/?seo",
    title: "SEO-Driven Web Design",
    tagline: "Optimized to dominate search.",
    description: "Fully responsive, search-engine-optimized website designed to boost visibility and user engagement.",
    outcome: "🚀 Increased organic traffic by 200%.",
  },
  {
    image: "https://source.unsplash.com/800x600/?branding",
    title: "Branding & Web Redesign",
    tagline: "Rebranding for impact.",
    description: "A sleek branding and design overhaul for a tech startup aiming to build authority and trust.",
    outcome: "🌟 Elevated brand recall and audience trust.",
  },
];

const InteractivePortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative">
      <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 md:text-5xl font-extrabold text-center pb-12 text-gray-900">
        Showcasing Our Best Work
      </h2>

      <div className="grid grid-cols-1 pt-12 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer group"
            onClick={() => setSelectedProject(item)}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm mt-2 text-gray-300">{item.tagline}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-gray-900 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-3">{selectedProject.title}</h3>
              <p className="text-md text-gray-700 mb-4">{selectedProject.description}</p>
              <p className="text-md font-semibold text-[#953ee2]">{selectedProject.outcome}</p>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 bg-[#953ee2] hover:bg-purple-700 text-white py-2 px-5 rounded-full w-full transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-20">
        <a
          href="#contact"
          className="bg-gradient-to-r from-[#953ee2] to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 px-8 rounded-full text-lg font-bold transition-all"
        >
          Want This for Your Brand? Let’s Talk.
        </a>
      </div>
    </section>
  );
};

export default InteractivePortfolio;
