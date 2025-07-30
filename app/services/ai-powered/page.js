'use client';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode, FaCogs, FaPalette, FaTabletAlt, FaDatabase,
  FaCode, FaLayerGroup, FaTools, FaShoppingCart, FaArrowRight
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SeoSchema from '../../components/SeoSchema';
import { NextSeo } from 'next-seo';

// Custom Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const services = [/*... your services array remains unchanged ...*/];

function ServiceCard({ icon: Icon, title, description, color, delay = 0 }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 ease-in-out overflow-hidden"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full pointer-events-none`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      <div className="text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800"
      >
        {question}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-2 text-indigo-500">▼</motion.span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

const faqs = [/*... your FAQs array remains unchanged ...*/];

export default function AIPoweredSolutionsPage() {
  const isMobile = useIsMobile();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "RC Tech Solutions",
      "image": "https://www.rctechsolutions.com/rclogo.png",
      "url": "https://www.rctechsolutions.com/services/ai-powered",
      "telephone": "+91-7009646377",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chandigarh",
        "addressRegion": "Chandigarh",
        "postalCode": "160061",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "description": "AI-powered solutions provider offering AI Chatbots, NLP, Computer Vision, ML Models, and Predictive Analytics.",
      "areaServed": ["IN"],
      "sameAs": [
        "https://www.instagram.com/rc_tech_solutions",
        "https://www.linkedin.com/company/rctechsolutions"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Powered Solutions | RC Tech Solutions",
      "url": "https://www.rctechsolutions.com/services/ai-powered",
      "description": "Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics.",
      "inLanguage": "en",
      "isPartOf": {
        "@type": "WebSite",
        "url": "https://www.rctechsolutions.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rctechsolutions.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Powered Solutions",
          "item": "https://www.rctechsolutions.com/services/ai-powered"
        }
      ]
    }
  ];

  return (
    <>
      <NextSeo
        title="AI Powered Solutions | RC Tech Solutions"
        description="Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics."
        canonical="https://www.rctechsolutions.com/services/ai-powered"
        openGraph={{
          url: 'https://www.rctechsolutions.com/services/ai-powered',
          title: 'AI Powered Solutions | RC Tech Solutions',
          description: 'Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics.',
          site_name: 'RC Tech Solutions',
        }}
      />
      <SeoSchema schemas={schemas} />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-4 sm:px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-center lg:text-left w-full lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              AI-Powered Solutions<br />That Drive <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Transform your business with our AI Chatbots, NLP Solutions, Predictive Analytics, and Custom AI Software Development.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#151b55] border border-[#2d3473] px-6 py-8 md:px-8 md:py-10 rounded-xl text-left w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Hire Dedicated AI Teams or Get Project-Based AI Consulting</h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold w-full shadow-lg">
              Contact Our AI Experts →
            </button>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-[#f9f9f9] py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold leading-tight mb-12">
            AI-Powered Services
          </motion.h2>
          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard {...service} delay={0.2 + index * 0.1} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} delay={0.4 + index * 0.1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold mb-8">
            Frequently Asked Questions (FAQs)
          </motion.h2>
          <div className="text-left">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Business with AI?
        </motion.h2>
        <p className="mb-6 text-lg">Contact RC Tech Solutions today for a free consultation and discover how our AI-powered solutions can drive growth.</p>
        <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white shadow-lg transition duration-300">
          Get a Free AI Consultation →
        </motion.a>
      </section>
    </>
  );
}
