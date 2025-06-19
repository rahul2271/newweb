"use client";

import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState } from "react";
import Link from "next/link";
import {
  RiCodeSSlashLine,
  RiPaintBrushLine,
  RiMegaphoneLine,
  RiSearchLine,
  RiCloudLine,
  RiSmartphoneLine,
  RiShoppingCartLine,
  RiRobot2Line,
  RiStackLine,
} from "react-icons/ri";

const categories = ["All", "Development", "Design", "Marketing", "Cloud"];

const services = [
  {
    id: 1,
    title: "AI Powered Solutions",
    description:
      "Unlock automation & insights with AI-powered tools tailored to your workflow.",
    icon: <RiRobot2Line size={30} />,
    category: "Development",
    slug: "ai-powered",
  },
  {
    id: 2,
    title: "Cloud Integration",
    description: "Seamless cloud-native infrastructure for scalability and performance.",
    icon: <RiCloudLine size={30} />,
    category: "Cloud",
    slug: "cloud-integration",
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    description: "Automate deployments, monitor infrastructure, and ensure uptime.",
    icon: <RiStackLine size={30} />,
    category: "Cloud",
    slug: "devops-and-cloud",
  },
  {
    id: 4,
    title: "Digital Branding",
    description: "Build a brand that speaks your story through visuals & strategy.",
    icon: <RiPaintBrushLine size={30} />,
    category: "Design",
    slug: "digital-branding",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Data-backed growth strategies from SEO to paid ads.",
    icon: <RiMegaphoneLine size={30} />,
    category: "Marketing",
    slug: "digital-marketing",
  },
  {
    id: 6,
    title: "Ecommerce Solutions",
    description: "Scalable storefronts with payment, logistics, and analytics built-in.",
    icon: <RiShoppingCartLine size={30} />,
    category: "Development",
    slug: "ecommerce",
  },
  {
    id: 7,
    title: "Mobile Apps",
    description: "Cross-platform apps with native performance and UX.",
    icon: <RiSmartphoneLine size={30} />,
    category: "Development",
    slug: "mobile-apps",
  },
  {
    id: 8,
    title: "SEO & Visibility",
    description: "Optimized content & structure for maximum organic reach.",
    icon: <RiSearchLine size={30} />,
    category: "Marketing",
    slug: "seo",
  },
  {
    id: 9,
    title: "Web Development",
    description: "From landing pages to full-stack apps, we engineer quality.",
    icon: <RiCodeSSlashLine size={30} />,
    category: "Development",
    slug: "web-development",
  },
];

export default function ServicesCard() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <section id="Services" className="relative py-20 px-6 bg-black text-black">
      {/* <div className="absolute top-[-100px] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-purple-300 opacity-20 rounded-full blur-3xl z-0"></div> */}

      <div className="relative z-10 max-w-7xl mx-auto text-center">
       <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
        >
          Our <span className="font-semibold ">Services</span>
        </motion.h2>
        <p className="text-gray-100 mb-10">
          Crafted solutions that elevate your digital presence.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white border-gray-900"
                  : "border-gray-800 text-gray-200 hover:bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 hover:text-purple-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/services/${service.slug}`} passHref>
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer h-full"
                  >
                    <div className="text-purple-600 mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </Tilt>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
