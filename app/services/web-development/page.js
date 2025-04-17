'use client';

import { motion } from 'framer-motion';
import {
  FaCode, FaPalette, FaDatabase, FaShoppingCart, FaTools,
  FaLaptopCode, FaCogs, FaTabletAlt, FaLayerGroup, FaFacebookF, FaStar, FaArrowRight
} from 'react-icons/fa';

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

export default function WebDevelopmentPage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0c0e10] to-gray-900 z-0"></div>
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
              Top-rated development company with <span className="text-blue-400 font-semibold">300+ reviews</span>
              <span className="flex items-center gap-1 px-2 border-l border-[#2d3473] ml-2">
                <FaFacebookF className="text-blue-500" />
                <span className="text-white font-bold">4.8</span>
                <span className="flex text-orange-400 text-xs">
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
              Custom Web Development Solutions<br />That Drive&nbsp;
              <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Results</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Partner with us to build high-performing websites and web applications that achieve your business goals.
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
              Get <span className="underline decoration-orange-400">Project-based</span><br />
              solutions or hire<br />
              <span className="underline decoration-lime-300">dedicated teams</span>
            </h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Discuss Your Requirements →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#f9f9f9] py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Wide Range of Custom<br />
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Web Development Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
          >
            We offer a variety of <strong>custom web development services</strong> tailored for businesses of all sizes. From e-commerce platforms to scalable web apps — we craft premium, secure, and stunning digital experiences.
          </motion.p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out`}
                >
                  <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
                  <div className={`text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 transition-all group-hover:text-gray-800">
                    Learn More
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-block"
          >
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-8 rounded-full shadow-xl text-base font-semibold transition-all duration-300">
              Share Your Requirements →
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
