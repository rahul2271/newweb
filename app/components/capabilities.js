'use client';

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

const categories = ["All", "Web Development", "Design & Branding", "Marketing & SEO", "Cloud & DevOps"];

const services = [
  {
    id: 1,
    title: "AI Powered Solutions",
    description:
      "Unlock business automation, intelligent insights, and predictive workflows with our custom AI-powered development services tailored for startups and enterprises.",
    icon: <RiRobot2Line size={30} />,
    category: "Web Development",
    slug: "ai-powered",
  },
  {
    id: 2,
    title: "Cloud Integration & Infrastructure",
    description:
      "Seamless cloud-native infrastructure setups ensuring scalability, security, and performance. Leverage AWS, Azure, or GCP with our cloud consulting experts at RC Tech Solutions.",
    icon: <RiCloudLine size={30} />,
    category: "Cloud & DevOps",
    slug: "cloud-integration",
  },
  {
    id: 3,
    title: "DevOps & Continuous Deployment",
    description:
      "Accelerate delivery cycles with CI/CD pipelines, automated deployments, and 24/7 infrastructure monitoring. Trust RC Tech Solutions for expert DevOps services.",
    icon: <RiStackLine size={30} />,
    category: "Cloud & DevOps",
    slug: "devops-and-cloud",
  },
  {
    id: 4,
    title: "Digital Branding & Visual Identity",
    description:
      "Build a unique brand voice and visual identity. From logos to brand guidelines, we help your business connect and convert with emotional storytelling through design, crafted by Rahul Chauhan and team.",
    icon: <RiPaintBrushLine size={30} />,
    category: "Design & Branding",
    slug: "digital-branding",
  },
  {
    id: 5,
    title: "Digital Marketing Campaigns",
    description:
      "Drive qualified traffic and generate leads with targeted SEO, PPC, email marketing, and social media ad campaigns led by RC Tech Solutions' expert marketing team.",
    icon: <RiMegaphoneLine size={30} />,
    category: "Marketing & SEO",
    slug: "digital-marketing",
  },
  {
    id: 6,
    title: "eCommerce Website Development",
    description:
      "Scalable, high-converting online stores with secure payments, logistics, and custom checkout flows. From Shopify to WooCommerce, RC Tech Solutions delivers it all.",
    icon: <RiShoppingCartLine size={30} />,
    category: "Web Development",
    slug: "ecommerce",
  },
  {
    id: 7,
    title: "Mobile App Development",
    description:
      "Custom iOS and Android app development with responsive UI/UX. Rahul Chauhan's development team ensures performance-driven mobile solutions.",
    icon: <RiSmartphoneLine size={30} />,
    category: "Web Development",
    slug: "mobile-apps",
  },
  {
    id: 8,
    title: "SEO Optimization & Content Strategy",
    description:
      "Improve Google rankings with technical SEO audits, keyword research, and content optimization powered by RC Tech Solutions' SEO experts.",
    icon: <RiSearchLine size={30} />,
    category: "Marketing & SEO",
    slug: "seo",
  },
  {
    id: 9,
    title: "Custom Web Development",
    description:
      "From high-performance landing pages to full-stack web applications, Rahul Chauhan and RC Tech Solutions deliver scalable, SEO-friendly websites tailored to your business goals.",
    icon: <RiCodeSSlashLine size={30} />,
    category: "Web Development",
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
    <section id="services" className="relative py-20 px-6 bg-black text-black">
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
        >
          Our <span className="font-semibold">Digital Services</span>
        </motion.h2>

        <p className="text-gray-100 mb-10 max-w-2xl mx-auto">
          Explore our full suite of <strong>web development services</strong>, <strong>SEO and digital marketing solutions</strong>, <strong>cloud infrastructure consulting</strong>, <strong>AI automation tools</strong>, and <strong>UI/UX design services</strong> crafted and led by the team at RC Tech Solutions under the leadership of Rahul Chauhan.
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

        {/* Human Touch Emotional Block */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 mb-4"
          >
            Why Brands Trust RC Tech Solutions
          </motion.h3>

          <p className="text-gray-200 text-md md:text-lg leading-relaxed">
            We get it. You've seen countless agencies promising results.  
            But here at RC Tech Solutions, led by <strong>Rahul Chauhan</strong>,  
            we're driven by passion, precision, and genuine care for your business.  
            From late-night strategy sessions to coffee-fueled design sprints,  
            we're here to craft digital solutions that aren't just good—they're exceptional.
          </p>

          <p className="text-gray-400 text-sm mt-6">
            Every line of code, every pixel, every keyword strategy we deliver  
            carries one goal: <strong>Real measurable growth for your brand.</strong>
          </p>

          <p className="text-gray-200 text-md mt-6">
            Let’s create something extraordinary together.
          </p>
        </div>

        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
          >
            Get Started with RC Tech Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
