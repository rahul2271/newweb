"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";




export default function about() {
  const stats = [
    { label: "Projects Completed", count: 125 },
    { label: "Years of Combined Experience", count: 33 },
    { label: "Client Satisfaction", count: 99, suffix: "%" },
    { label: "Recognitions & Awards", count: 26 },
  ];

  const [visibleStats, setVisibleStats] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          let current = 0;
          const end = stat.count;
          const step = end / 100;
          const duration = 800;

          const timer = setInterval(() => {
            current += step;
            setVisibleStats(prev => {
              const updated = [...prev];
              updated[index] = Math.min(Math.round(current), end);
              return updated;
            });
            if (current >= end) clearInterval(timer);
          }, duration / 100);
        });
      }
    }, { threshold: 0.4 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const logos = ["/logo1.svg", "/logo2.svg", "/logo3.svg", "/logo4.svg"];
  const testimonials = [
    { name: "Jane Doe", feedback: "RC Tech delivered exactly what we needed. Fast, reliable, and pixel-perfect.", avatar: "/avatar1.jpg" },
    { name: "David Kumar", feedback: "One of the best development partners we’ve worked with.", avatar: "/avatar2.jpg" },
  ];

  return (
    <>
    <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="w-full h-full">
            <img
              src="https://www.rctechsolutions.com/rahulchauhan.jpg"
              alt="Rahul Chauhan - Founder of RC Tech Solutions"
              className="w-full h-full object-cover rounded-3xl border border-gray-200 shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
                    >
                      Our <span className="font-semibold ">Founder</span>
                    </motion.h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Rahul Chauhan is the driving force behind RC Tech Solutions. What started as a solo venture in 2021 quickly evolved into a thriving digital studio under his leadership.
              With a passion for design precision and performance-driven development, he built a team that shares the same hunger for clean code, scalable systems, and impactful brand experiences.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Rahul believes in keeping things simple, focused, and authentic — values that reflect in every project RC Tech delivers today. When not working, he’s often exploring new design trends, mentoring startups, or automating workflows.
            </p>
            <div className="mt-4">
              <span className="inline-block text-sm font-medium text-gray-700">Founder & CEO — RC Tech Solutions</span>
            </div>
          </div>
        </div>
      </section>
      {/* ACHIEVEMENT STORY BLOCK */}
      <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                     <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
                    >
                      Our <span className="font-semibold ">Achievements</span>
                    </motion.h2>
                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                      Our achievement story is a testament to teamwork and perseverance. Together, we've overcome challenges, celebrated victories, and created a narrative of progress and success.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">33+ Years</h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">Influencing Digital Landscapes Together</p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">125+ Projects</h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">Excellence Achieved Through Success</p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">26+ Awards</h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">Our Dedication to Innovation Wins Understanding</p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold leading-9">99% Happy Clients</h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">Mirrors our Focus on Client Satisfaction.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow transition-all duration-700 ease-in-out justify-center items-center flex">
                <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">Read More</span>
                <svg className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SECTION - MISSION & VALUES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
                    >
                      Driven by Vision. <span className="font-semibold ">Grounded in Values.</span>
                    </motion.h2>
         
          <p className="text-gray-600 text-base max-w-3xl mx-auto mb-10">
            At RC Tech Solutions, our mission is simple: deliver future-forward digital solutions rooted in trust, transparency, and tenacity. Our values shape every pixel and process we build.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Integrity", desc: "We uphold transparency and ethics in everything." },
              { title: "Innovation", desc: "We code and design with a future-first mindset." },
              { title: "Excellence", desc: "We don't settle. We iterate until it's perfect." },
              { title: "Collaboration", desc: "We grow through listening, learning, and co-creating." },
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow transition duration-500">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}