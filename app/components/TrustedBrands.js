"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export default function BrandsSection() {
  const brands = [
    { name: "Zoho", logo: "/zoho.png" },
    { name: "Freshworks", logo: "/freshworks.png" },
    { name: "Chargebee", logo: "/chargebee.png" },
    { name: "Razorpay", logo: "/razorpay.png" },
    { name: "Cleartax", logo: "/cleartax.png" },
    { name: "Store My Goods", logo: "/bedeol.png" },
    { name: "Minimalist", logo: "/redtape.png" },
    { name: "Yukti Herbs", logo: "/yukti herbs.png" },
    { name: "Unacademy", logo: "/un.png" },
    { name: "Dr. Andriana Setnik", logo: "/geek.png" },
  ];

  return (
    <section id="teams" className="relative bg-white py-5">
      <div className="container mx-auto px-6 text-center ">
        {/* Fancy Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-gray-400 mb-2  "
        >
          Our Clients
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
        >
          Brands That <span className="font-semibold ">Trust Us</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="mt-6 text-lg text-gray-500 max-w-5xl mx-auto"
        >
We collaborate with forward-thinking businesses that value performance, design, and
measurable growth. Trusted by startups and enterprises, our partnerships reflect why we’re
among the top software development companies in the industry.

        </motion.p>

        {/* Mobile Swiper */}
        <div className="lg:hidden mt-16">
          <Swiper
            spaceBetween={40}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-xl backdrop-blur-md bg-white/40 shadow-inner border border-gray-100 flex items-center justify-center hover:scale-105 transition-all duration-300">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain  hover:grayscale-0 transition duration-500"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-16 mt-24"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center"
            >
              <div className="w-[140px] h-[140px] rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg border border-gray-200 p-6 transition-all duration-300 flex items-center justify-center hover:shadow-2xl">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain  hover:grayscale-0 transition duration-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
