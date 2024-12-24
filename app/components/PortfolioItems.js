"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Sample data for portfolio items
const portfolioItems = [
  {
    image: "https://via.placeholder.com/600x400?text=Project+1", // Sample image
    title: "Modern E-commerce Platform",
    tagline: "A modern e-commerce platform",
    description:
      "An e-commerce platform with cutting-edge UI/UX and integrated payment systems.",
    outcome: "Increased sales by 40% within the first month.",
  },
  {
    image: "https://via.placeholder.com/600x400?text=Project+2", // Sample image
    title: "SEO-Driven Web Design",
    tagline: "SEO-driven web design",
    description:
      "A fully responsive website optimized for search engines, with a focus on user engagement.",
    outcome: "Achieved 200% increase in organic traffic.",
  },
  {
    image: "https://via.placeholder.com/600x400?text=Project+3", // Sample image
    title: "Branding & Web Redesign",
    tagline: "Branding & Web Redesign",
    description:
      "A complete branding and website redesign for a tech startup, focusing on modern aesthetics.",
    outcome: "Enhanced brand recognition and customer trust.",
  },
  // Add more portfolio items as needed
];

const InteractivePortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="py-20 px-8 md:px-12 bg-[#0d0f11] text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">
        Showcasing Our Best Work
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => openModal(item)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center text-white">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2">{item.tagline}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-lg w-full text-black"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal on clicking inside it
          >
            <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-lg mb-4">{selectedProject.description}</p>
            <p className="text-lg mb-4 font-semibold">{selectedProject.outcome}</p>
            <button
              className="bg-[#953ee2] text-white py-2 px-6 rounded-full mt-4 w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-12">
        <a
          href="#contact"
          className="bg-gradient-to-br from-[#953ee2] to-black text-white py-2 px-8 rounded-full text-lg font-semibold"
        >
          Want This for Your Brand? Let’s Talk.
        </a>
      </div>
    </section>
  );
};

export default InteractivePortfolio;
