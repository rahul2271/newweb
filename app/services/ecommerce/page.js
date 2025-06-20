






'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaGoogle,
  FaEnvelopeOpenText,
  FaInstagram,
  FaVideo,
  FaChartBar,
  FaBullseye,
  FaArrowRight,
  FaBullhorn,
  FaStar
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SeoSchema from '@/components/SeoSchema';

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
  { title: 'Social Media Management', icon: FaFacebookF, color: 'from-pink-500 to-yellow-500' },
  { title: 'Google Ads Campaigns', icon: FaGoogle, color: 'from-red-500 to-orange-500' },
  { title: 'Email Marketing', icon: FaEnvelopeOpenText, color: 'from-sky-500 to-indigo-500' },
  { title: 'Influencer Marketing', icon: FaInstagram, color: 'from-purple-500 to-pink-600' },
  { title: 'Video Marketing', icon: FaVideo, color: 'from-amber-500 to-red-500' },
  { title: 'Performance Tracking', icon: FaChartBar, color: 'from-teal-400 to-cyan-500' },
  { title: 'Conversion Optimization', icon: FaBullseye, color: 'from-green-500 to-lime-500' }
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
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      <div className="text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
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

export default function DigitalMarketingPage() {
  const isMobile = useIsMobile();

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'RC Tech Solutions',
      image: 'https://www.rctechsolutions.com/rclogo.png',
      url: 'https://www.rctechsolutions.com/services/digital-marketing',
      telephone: '+91-7009646377',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandigarh',
        addressRegion: 'Chandigarh',
        postalCode: '160061',
        addressCountry: 'IN'
      },
      priceRange: '$$',
      description: 'We deliver strategic digital marketing services including SMM, Google Ads, email campaigns, influencer partnerships, and analytics optimization.',
      areaServed: ['IN'],
      sameAs: [
        'https://www.instagram.com/rctechsolutions',
        'https://www.linkedin.com/company/rctechsolutions'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.rctechsolutions.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Digital Marketing Services',
          item: 'https://www.rctechsolutions.com/services/digital-marketing'
        }
      ]
    }
  ];

  return (
     <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 bg-white rounded-xl border border-transparent shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
                 hover:scale-[1.03]"
    >
      {/* Gradient highlight dot following cursor */}
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full pointer-events-none`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />

      {/* Gradient underline on hover */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
      />

      {/* Icon with smooth hover transform */}
      <div className="text-3xl mb-4 text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Learn more link with arrow */}
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-600" />
      </div>

      {/* Glow border effect on hover */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          boxShadow: `0 0 15px 3px var(--tw-gradient-stops, ${color.replace(
            /from-| to-/g,
            ''
          )})`,
          background: `linear-gradient(to right, var(--tw-gradient-stops))`,
          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
        }}
      />
    </motion.div>
  );
}

export default function EcommercePage() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
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
              Sell Online at Scale
              <span className="text-green-400 font-semibold ml-2">With Conversion-Focused Stores</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                E-Commerce Solutions
              </span>{' '}
              That Convert Visitors into Buyers
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We build blazing-fast online stores with modern design, powerful features, and integrated marketing tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Have products to sell?<br />
              Let’s create a store that performs.
            </h3>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg hover:shadow-xl">
              Book Free Store Strategy Call →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#f9f9f9] py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          >
            Everything You Need to Sell Online
          </motion.h2>

          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {ecommerceFeatures.map((feature, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard
                    icon={feature.icon}
                    title={feature.title}
                    color={feature.color}
                    delay={0.2 + index * 0.1}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecommerceFeatures.map((feature, index) => (
                <ServiceCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  color={feature.color}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
