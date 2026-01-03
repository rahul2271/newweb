'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaRocket,
  FaSearchDollar,
  FaLink,
  FaChartLine,
  FaTags,
  FaTools,
  FaFileAlt,
  FaFacebookF,
  FaStar,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

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

const seoServices = [
  { title: 'Technical SEO Audit', icon: FaTools, color: 'from-red-500 to-pink-500' },
  { title: 'On-Page Optimization', icon: FaTags, color: 'from-green-500 to-lime-500' },
  { title: 'Keyword Research', icon: FaSearchDollar, color: 'from-indigo-500 to-violet-500' },
  { title: 'Content Strategy', icon: FaFileAlt, color: 'from-blue-500 to-sky-400' },
  { title: 'Backlink Building', icon: FaLink, color: 'from-orange-500 to-yellow-500' },
  { title: 'Analytics & Reporting', icon: FaChartLine, color: 'from-teal-400 to-cyan-500' },
  { title: 'Local SEO', icon: FaRocket, color: 'from-purple-600 to-fuchsia-500' },
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
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
      />
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

export default function SEODominationPage() {
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
              Rank Higher Organically{' '}
              <span className="text-blue-400 font-semibold">across industries</span>
              <span className="flex items-center gap-1 px-2 border-l border-[#2d3473] ml-2">
                <FaFacebookF className="text-blue-500" />
                <span className="text-white font-bold">4.9</span>
                <span className="flex text-orange-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
                <span className="text-white ml-1">90 reviews</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Dominate Google with{' '}
              <span className="bg-gradient-to-r from-[#facc15] to-[#f97316] bg-clip-text text-transparent">
                Advanced SEO
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Boost your rankings and attract more customers with our advanced <a 
    href="/" 
    className="text-purple-400 hover:underline" target="_blank"
  >
    SEO services for small businesses
  </a>, designed to help you dominate Google search results.

            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Let your business be found <br />
              when customers need it the most.
            </h3>
            <Link target="_blank"
  href="/contact"
  className="block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full text-center shadow-lg"
>
  Book a Free SEO Consultation →
</Link>
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
            Our SEO Domination Services
          </motion.h2>
<p className="text-gray-800 max-w-7xl pb-8 text-md md:text-lg leading-relaxed">
Gain searchable dominance with RC Tech Solutions—your partner in SEO services for small businesses and recognized as the Best <a 
    href="/" 
    className="text-purple-400 hover:underline" target="_blank"
  >
    IT company for startups
  </a>. Our SEO Domination Services start with rigorous Technical SEO Audits and Keyword Research, progress through sophisticated On-Page Optimization, Content Strategy, and Backlink Building, and are reinforced by insightful Analytics & Reporting and precise Local SEO. We don’t just boost rankings; we drive relevant, conversion-ready traffic to fuel your growth. It’s SEO engineered to scale your startup.


          </p>
          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {seoServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    color={service.color}
                    delay={0.2 + index * 0.1}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  color={service.color}
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
