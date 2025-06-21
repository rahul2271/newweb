'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaShoppingCart,
  FaMobileAlt,
  FaCreditCard,
  FaChartLine,
  FaWarehouse,
  FaHeadset,
  FaArrowRight,
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
  { title: 'Custom eCommerce Website', icon: FaShoppingCart, color: 'from-green-500 to-emerald-600' },
  { title: 'Mobile Commerce Solutions', icon: FaMobileAlt, color: 'from-purple-500 to-indigo-600' },
  { title: 'Payment Gateway Integration', icon: FaCreditCard, color: 'from-blue-500 to-cyan-500' },
  { title: 'Sales Analytics & Reports', icon: FaChartLine, color: 'from-pink-500 to-red-500' },
  { title: 'Inventory Management', icon: FaWarehouse, color: 'from-yellow-500 to-orange-600' },
  { title: '24/7 Customer Support Setup', icon: FaHeadset, color: 'from-teal-500 to-blue-600' },
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
      className="relative group p-6 bg-white rounded-xl border border-transparent shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer hover:scale-[1.03]"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full pointer-events-none`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      <div className="text-3xl mb-4 text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-600" />
      </div>
    </motion.div>
  );
}

export default function EcommercePage() {
  const isMobile = useIsMobile();

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'RC Tech Solutions',
      image: 'https://www.rctechsolutions.com/rclogo.png',
      url: 'https://www.rctechsolutions.com/services/ecommerce',
      telephone: '+91-7009646377',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandigarh',
        addressRegion: 'Chandigarh',
        postalCode: '160061',
        addressCountry: 'IN'
      },
      priceRange: '$$',
      description: 'We build powerful, scalable, and conversion-focused eCommerce solutions including website development, payment setup, inventory management, and analytics.',
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
          name: 'eCommerce Services',
          item: 'https://www.rctechsolutions.com/services/ecommerce'
        }
      ]
    }
  ];

  return (
    <>
      <SeoSchema
        title="eCommerce Development Services | RC Tech Solutions"
        description="We build high-converting, scalable online stores with secure payment integration, inventory solutions, and analytics tracking."
        url="https://www.rctechsolutions.com/services/ecommerce"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.rctechsolutions.com' },
          { name: 'eCommerce', url: 'https://www.rctechsolutions.com/services/ecommerce' }
        ]}
        additionalSchemas={schemas}
      />

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
              Scalable Online Stores
              <span className="text-green-400 font-semibold ml-2">for Next-Gen Businesses</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                eCommerce Development Services
              </span>{' '}
              Built to Convert & Scale
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We craft modern eCommerce experiences that drive sales — from custom design to secure payments, analytics & more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Planning your online store?<br />
              Let us build it right.
            </h3>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg hover:shadow-xl">
              Get Free Consultation →
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
            Our eCommerce Solutions
          </motion.h2>

          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {(services || []).map((service, index) => (
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
              {(services || []).map((service, index) => (
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
