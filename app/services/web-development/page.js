'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaPalette,
  FaDatabase,
  FaShoppingCart,
  FaTools,
  FaLaptopCode,
  FaCogs,
  FaTabletAlt,
  FaLayerGroup,
  FaFacebookF,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
  { title: 'Web Application Development', icon: FaLaptopCode, color: 'from-sky-400 to-blue-500' },
  { title: 'Website Design & Development', icon: FaPalette, color: 'from-green-400 to-teal-500' },
  { title: 'Web Portal Development', icon: FaLayerGroup, color: 'from-orange-400 to-yellow-500' },
  { title: 'Progressive Web App Development', icon: FaTabletAlt, color: 'from-yellow-400 to-amber-500' },
  { title: 'Front-end Design & Development', icon: FaCode, color: 'from-purple-500 to-indigo-500' },
  { title: 'Back-end Web Development', icon: FaDatabase, color: 'from-blue-500 to-indigo-600' },
  { title: 'E-commerce Development', icon: FaShoppingCart, color: 'from-teal-400 to-green-400' },
  { title: 'Custom CMS Development', icon: FaCogs, color: 'from-pink-400 to-red-500' },
  { title: 'Web Support & Maintenance', icon: FaTools, color: 'from-indigo-400 to-purple-500' },
];

function ServiceCard({ icon: Icon, title, color, delay = 0 }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.04] transition-transform duration-300 ease-in-out overflow-hidden cursor-pointer"
      tabIndex={0}
      aria-label={`Service: ${title}`}
      role="button"
    >
      <motion.div
        className={`absolute left-0 top-0 w-3 h-3 bg-gradient-to-r ${color} rounded-full`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
      />
      <div className="text-4xl mb-5 text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-indigo-600 font-medium">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

export default function WebDevelopmentPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-6 md:px-16 py-24 overflow-hidden md:pt-[180px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0c0e10] to-gray-900 z-0" />
        <div
          className="absolute inset-0 z-0 opacity-20 bg-[url('/grid-lines.svg')] bg-cover bg-center"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left w-full lg:w-2/3"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border border-[#2d3473] rounded-full text-sm bg-[#151b55] text-white/90 select-none">
              Top-rated development company with{' '}
              <span className="text-blue-400 font-semibold ml-1">300+ reviews</span>
              <span className="flex items-center gap-1 px-3 border-l border-[#2d3473] ml-3">
                <FaFacebookF className="text-blue-500" aria-hidden="true" />
                <span className="text-white font-bold">4.8</span>
                <span className="flex text-orange-400 text-xs" aria-hidden="true">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="text-white ml-1">50 reviews</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Custom Web Development Solutions
              <br />
              That Drive&nbsp;
              <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              Achieve your business goals with our custom web development services, building powerful websites and applications tailored to your needs.

            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-10 py-12 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-8">
              Get{' '}
              <span className="underline decoration-orange-400 decoration-2 underline-offset-2">
                Project-based
              </span>
              <br />
              solutions or hire
              <br />
              <span className="underline decoration-lime-300 decoration-2 underline-offset-2">
                dedicated teams
              </span>
            </h3>
            <button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg"
              aria-label="Discuss your requirements"
            >
              Discuss Your Requirements →
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-14"
          >
            Our Services
          </motion.h2>
<p className="text-gray-800 max-w-7xl pb-8 text-md md:text-lg leading-relaxed">
When it comes to selecting the Best Software development company for your next project, RC Tech Solutions sets the standard. Our Custom web development services encompass everything from user-first front-end design to robust back-end systems and seamless content management solutions. We don’t do one-size-fits-all—we do what works for you. Whether you need a progressive web app, an e-commerce store, or a corporate portal, our bespoke approach ensures your digital solution is as unique as your business. Let us craft a website that performs visually, functionally, and strategically.


          </p>
          {isMobile ? (
            <Swiper spaceBetween={24} slidesPerView={1.2} loop>
              {services.map((service, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
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
