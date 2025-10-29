'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaMobileAlt,
  FaAndroid,
  FaApple,
  FaReact,
  FaDatabase,
  FaFigma,
  FaRocket,
  FaArrowRight,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Head from 'next/head';
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

const mobileServices = [
  { title: 'Android App Development', icon: FaAndroid, color: 'from-green-400 to-green-600' },
  { title: 'iOS App Development', icon: FaApple, color: 'from-gray-400 to-black' },
  { title: 'React Native Development', icon: FaReact, color: 'from-cyan-500 to-blue-600' },
  { title: 'UI/UX Prototyping (Figma)', icon: FaFigma, color: 'from-pink-500 to-purple-600' },
  { title: 'Backend Integration', icon: FaDatabase, color: 'from-indigo-500 to-purple-500' },
  { title: 'App Store Launch & ASO', icon: FaRocket, color: 'from-yellow-400 to-orange-500' },
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
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-in-out overflow-hidden"
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

      <div className="text-4xl mb-4 text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>

      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-900 font-medium cursor-pointer select-none">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2 group-hover:text-indigo-600" />
      </div>
    </motion.div>
  );
}

function SeoSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mobile App Development Services | RC Tech Solutions",
    "description": "We build Android, iOS, and cross-platform mobile apps with backend integration, UI/UX, and ASO support. Book your free consultation today!",
    "url": "https://www.rctechsolutions.com/services/mobile-apps",
    "breadcrumb": {
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
          "name": "Services",
          "item": "https://www.rctechsolutions.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Mobile App Development",
          "item": "https://www.rctechsolutions.com/services/mobile-apps"
        }
      ]
    }
  };

  return (
    <Head>
      <title>Mobile App Development Services | RC Tech Solutions</title>
      <meta name="description" content="We build Android, iOS, and cross-platform mobile apps with backend integration, UI/UX, and ASO support. Book your free consultation today!" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </Head>
  );
}

export default function MobileAppsPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <SeoSchema />

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
            {/* Breadcrumbs */}
            <nav className="text-sm text-white/60 mb-4">
              <ol className="flex space-x-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li>/</li>
                <li><a href="/services" className="hover:text-white">Services</a></li>
                <li>/</li>
                <li className="text-white font-semibold">Mobile App Development</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-[#2d3473] rounded-full text-sm bg-[#151b55] text-white/80">
              From Idea to App Store
              <span className="text-blue-400 font-semibold ml-2">We Build & Launch</span>
              <span className="flex items-center gap-1 px-2 border-l border-[#2d3473] ml-2">
                <FaMobileAlt className="text-green-400" />
                <span className="text-white font-bold">Cross-Platform</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                Mobile App Development
              </span>{' '}
              that Drives Engagement
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Providing top-notch <a 
    href="/" 
    className="text-purple-400 hover:underline" target="_blank"
  >
    Mobile app development services
  </a>, we design and build fast, intuitive, and scalable apps tailored for iOS, Android, and cross-platform use.

            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Have an app idea in mind?<br />
              Let’s turn it into reality.
            </h3>
            <Link target="_blank" href="/contact" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Book Free App Consultation →
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
            Our Mobile App Services
          </motion.h2>
<p className="text-gray-800 max-w-7xl pb-8 text-md md:text-lg leading-relaxed">
Partner with the <a 
    href="/" 
    className="text-purple-400 hover:underline" target="_blank"
  >
    Best IT company for startups
  </a>—RC Tech Solutions—offering premier Mobile app development Services. We specialize in crafting high-performing, user-centric apps across iOS, Android, and cross-platform environments like React Native. Our services include UI/UX prototyping via Figma, seamless backend integration, and App Store Optimization (ASO) for maximum visibility. Launch confidently with our strategic approach, designed to elevate your startup’s mobile presence from concept to successful deployment.


          </p>
          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {mobileServices.map((service, index) => (
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
              {mobileServices.map((service, index) => (
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
