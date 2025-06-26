"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MissingHomepageSections() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto space-y-24">

      {/* Portfolio / Fake Projects Section with Online Images */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">Recent Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              img: "https://images.unsplash.com/photo-1618246131244-50f5553e1f6b",
              title: "Luxury eCommerce Website",
              desc: "Designed a mobile-first shopping platform with sleek UI."
            },
            {
              img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
              title: "SaaS Dashboard UI",
              desc: "Built an analytics dashboard for a tech startup."
            },
            {
              img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
              title: "Portfolio Website",
              desc: "Crafted a personal brand site for a digital marketer."
            }
          ].map((project, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-6 bg-white rounded-xl shadow-lg transition">
              <Image src={project.img} alt={project.title} width={500} height={300} className="rounded-xl object-cover w-full h-48" />
              <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Auto Swiping Testimonials Slider */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">What Our Clients Say</h2>
        <Swiper spaceBetween={30} autoplay={{ delay: 3000 }} loop={true} className="rounded-xl shadow">
          {["RC Tech Solutions transformed our website! Amazing work!", "Great SEO results within 3 months!", "Excellent UI/UX and timely delivery."].map((review, index) => (

            <SwiperSlide key={index}>
              <div className="p-8 bg-gradient-to-br from-white to-gray-50 text-center rounded-xl">
                <p className="text-gray-700 italic text-lg">"{review}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Google Reviews Styled Section */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">What People Are Saying On Google</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Amit Verma",
              rating: 5,
              comment: "Fantastic service and great attention to detail."
            },
            {
              name: "Sneha Kapoor",
              rating: 5,
              comment: "Our go-to agency for website projects!"
            }
          ].map((gReview, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="p-6 bg-white rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Google_2015_logo.svg" alt="Google Logo" width={24} height={24} />
                <h3 className="font-semibold">{gReview.name}</h3>
              </div>
              <p className="text-yellow-500">{"★".repeat(gReview.rating)}</p>
              <p className="text-gray-600 text-sm mt-2">"{gReview.comment}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications Section with Real Online Logos */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">Our Certifications</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_Partners_badge.png", "https://cdn.shopify.com/assets2/experts/seo.png", "https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified-Developer-Associate_512x512.6e255b473a.png"].map((src, index) => (
            <img key={index} src={src} alt="Certification Badge" className="w-32 h-auto object-contain" />
          ))}
        </div>
      </motion.div>

    </section>
  );
}
