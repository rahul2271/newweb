"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaCode,
  FaRobot,
  FaPaintBrush,
  FaSearch,
  FaServer,
  FaShoppingCart,
  FaCloud,
  FaMobileAlt,
  FaBullhorn,
} from "react-icons/fa";

const services = [
  {
    title: "Web Development",
    icon: <FaCode />,
    slug: "web-development",
    sub: ["Frontend", "Backend", "API Integration", "CMS / eCommerce"],
  },
  {
    title: "AI-Powered Solutions",
    icon: <FaRobot />,
    slug: "ai-powered-solutions",
    sub: ["Chatbots", "AI Automation", "Recommendation Engines"],
  },
  {
    title: "Digital Branding",
    icon: <FaPaintBrush />,
    slug: "digital-branding",
    sub: ["Brand Identity", "UI/UX Design", "Creative Assets"],
  },
  {
    title: "SEO Domination",
    icon: <FaSearch />,
    slug: "seo-domination",
    sub: ["On-Page", "Technical SEO", "Link Building"],
  },
  {
    title: "Digital Marketing",
    icon: <FaBullhorn />,
    slug: "digital-marketing",
    sub: ["SMM", "Email Marketing", "Paid Ads", "Content Marketing"],
  },
  {
    title: "DevOps & Cloud",
    icon: <FaServer />,
    slug: "devops-cloud",
    sub: ["CI/CD", "Cloud Setup", "Monitoring & Logs"],
  },
  {
    title: "Mobile Apps",
    icon: <FaMobileAlt />,
    slug: "mobile-apps",
    sub: ["Android", "iOS", "Cross-platform"],
  },
  {
    title: "eCommerce",
    icon: <FaShoppingCart />,
    slug: "ecommerce",
    sub: ["Online Stores", "Payment Integration", "Order Systems"],
  },
  {
    title: "Cloud Integration",
    icon: <FaCloud />,
    slug: "cloud-integration",
    sub: ["AWS / Azure", "Migration", "Security"],
  },
];

const CapabilitiesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

const toggleIndex = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold mb-16 text-center tracking-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Services
          </span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => toggleIndex(idx)}
              className="cursor-pointer p-6 rounded-3xl bg-black border border-white/10 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-wide group-hover:text-purple-400 transition duration-300">
                  {service.title}
                </h3>
              </div>

              <div
                className={`mt-4 transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-4 pl-4 space-y-2 text-sm text-gray-300">
                  {service.sub.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400">•</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link href={`/services/${service.slug}`}>
                    <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md">
                      Know More →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesAccordion;
