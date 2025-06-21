'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaCogs,
  FaPalette,
  FaTabletAlt,
  FaDatabase,
  FaCode,
  FaLayerGroup,
  FaTools,
  FaShoppingCart,
  FaArrowRight,
  FaFacebookF,
  FaStar,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SeoSchema from '../../components/SeoSchema';

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

const services = [
  { title: 'AI Chatbot Development', icon: FaLaptopCode, color: 'from-purple-500 to-indigo-500' },
  { title: 'Custom AI Solutions', icon: FaCogs, color: 'from-blue-500 to-teal-500' },
  { title: 'Natural Language Processing (NLP)', icon: FaPalette, color: 'from-green-400 to-lime-500' },
  { title: 'Computer Vision Applications', icon: FaTabletAlt, color: 'from-pink-500 to-red-500' },
  { title: 'Predictive Analytics', icon: FaDatabase, color: 'from-orange-400 to-yellow-500' },
  { title: 'AI Integration for Web & Mobile', icon: FaCode, color: 'from-sky-500 to-blue-600' },
  { title: 'Machine Learning Models', icon: FaLayerGroup, color: 'from-amber-500 to-yellow-400' },
  { title: 'Voice Recognition Systems', icon: FaTools, color: 'from-indigo-400 to-violet-500' },
  { title: 'AI-Based Recommendation Engines', icon: FaShoppingCart, color: 'from-teal-400 to-cyan-500' },
];

function ServiceCard({ icon: Icon, title, color, delay = 0 }) {
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
      <div className="text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>
    </motion.div>
  );
}

export default function AIPoweredSolutionsPage() {
  const isMobile = useIsMobile();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "RC Tech Solutions",
      image: "https://www.rctechsolutions.com/rclogo.png",
      url: "https://www.rctechsolutions.com/services/ai-powered",
      telephone: "+91-7009646377",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chandigarh",
        addressRegion: "Chandigarh",
        postalCode: "160061",
        addressCountry: "IN"
      },
      priceRange: "$$",
      description: "We provide AI-powered solutions like NLP, Computer Vision, Predictive Analytics, and more to drive digital transformation.",
      areaServed: ["IN"],
      sameAs: [
        "https://www.instagram.com/rc_tech_solutions",
        "https://www.linkedin.com/company/rctechsolutions"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.rctechsolutions.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Powered Solutions",
          item: "https://www.rctechsolutions.com/services/ai-powered"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "AI Powered Solutions | RC Tech Solutions",
      url: "https://www.rctechsolutions.com/services/ai-powered",
      description: "AI-Powered services by RC Tech Solutions, including NLP, Computer Vision, ML, AI Chatbots & more. Hire expert AI teams or get tailored project-based solutions.",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        url: "https://www.rctechsolutions.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "RC Tech Solutions",
      url: "https://www.rctechsolutions.com",
      logo: "https://www.rctechsolutions.com/rclogo.png",
      sameAs: [
        "https://www.instagram.com/rc_tech_solutions",
        "https://www.linkedin.com/company/rctechsolutions"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7009646377",
        contactType: "Customer Support",
        areaServed: "IN",
        availableLanguage: "English"
      }
    }
  ];

  return (
    <>
      <SeoSchema schemas={schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-4 sm:px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0c0e10] to-gray-900 z-0" />
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/grid-lines.svg')] bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left w-full lg:w-2/3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-[#2d3473] rounded-full text-sm bg-[#151b55] text-white/80">
              Top-rated AI solutions provider with <span className="text-blue-400 font-semibold">300+ reviews</span>
              <span className="flex items-center gap-1 px-2 border-l border-[#2d3473] ml-2">
                <FaFacebookF className="text-blue-500" />
                <span className="text-white font-bold">4.8</span>
                <span className="flex text-orange-400 text-xs">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</span>
                <span className="text-white ml-1">50 reviews</span>
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              AI-Powered Solutions<br />That Drive{' '}
              <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Empower your business with cutting-edge AI tools built to scale, adapt, and transform your operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-6 py-8 md:px-8 md:py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Get <span className="underline decoration-orange-400">Project-based</span><br />solutions or hire<br />
              <span className="underline decoration-lime-300">dedicated AI teams</span>
            </h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Discuss Your Requirements →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#f9f9f9] py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          >
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
    </>
  );
}
