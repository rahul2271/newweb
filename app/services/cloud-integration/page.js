'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaAws,
  FaCloud,
  FaLock,
  FaServer,
  FaRocket,
  FaArrowRight,
} from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

const cloudFeatures = [
  { title: 'AWS & Azure Cloud', icon: FaAws, color: 'from-orange-400 to-yellow-500' },
  { title: 'Cloud Storage & Backup', icon: FaCloud, color: 'from-blue-400 to-cyan-600' },
  { title: 'Kubernetes Orchestration', icon: SiKubernetes, color: 'from-indigo-500 to-purple-600' },
  { title: 'Cloud Security', icon: FaLock, color: 'from-green-400 to-teal-500' },
  { title: 'Scalable Infrastructure', icon: FaServer, color: 'from-gray-500 to-gray-700' },
  { title: 'Cloud Performance Optimization', icon: FaRocket, color: 'from-pink-500 to-red-600' },
];

function FeatureCard({ icon: Icon, title, color, delay = 0 }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
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
      {/* Glowing cursor follower */}
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{ zIndex: 10 }}
      />
      {/* Hover bar */}
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

export default function CloudIntegrationPage() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0c0e10] to-gray-900 z-0" />
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/grid-lines.svg')] bg-cover bg-center" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left w-full lg:w-2/3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-[#2d3473] rounded-full text-sm bg-[#151b55] text-white/80">
              Trusted Cloud Integration Experts with <span className="text-blue-400 font-semibold">seamless migration</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Cloud Integration Solutions<br />
              That Accelerate Your&nbsp;
              <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Business Growth</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We help you unify your cloud services with secure, scalable, and performance-driven integration.
            </p>
          </motion.div>

          {/* Right Box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Connect your apps,<br />
              migrate data &<br />
              <span className="underline decoration-lime-300">secure your cloud</span>
            </h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Talk to Our Experts →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f9f9f9] py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          >
            Cloud Integration Features
          </motion.h2>

          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {cloudFeatures.map((feature, index) => (
                <SwiperSlide key={index}>
                  <FeatureCard
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
              {cloudFeatures.map((feature, index) => (
                <FeatureCard
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
