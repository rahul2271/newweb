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

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";

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
    slug: "ai-powered",
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
    slug: "seo",
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
    slug: "devops-and-cloud",
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

const ServiceCard = ({ service, idx, openIndex, toggleIndex }) => (
  <div
    onClick={() => toggleIndex(idx)}
    className="cursor-pointer p-6 rounded-3xl bg-black border border-white/10 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-4">
      <div className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg">
        {service.icon}
      </div>
      <h3 className="text-xl font-regular tracking-wide group-hover:text-purple-400 transition duration-300">
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
        <Link target="_blank" href={`/services/${service.slug}`}>
          <button  className="text-sm font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md">
            Know More →
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const CapabilitiesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl text-center pb-12 font-light text-gray-200 tracking-tight leading-tight  "
        >
          Our <span className="font-semibold ">Services</span>
        </motion.h2>

        {/* Mobile View - Swiper */}
        <div className="lg:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            // pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {services.map((service, idx) => (
              <SwiperSlide key={idx}>
                <ServiceCard
                  service={service}
                  idx={idx}
                  openIndex={openIndex}
                  toggleIndex={toggleIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden lg:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              service={service}
              idx={idx}
              openIndex={openIndex}
              toggleIndex={toggleIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesAccordion;
