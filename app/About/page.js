"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function about() {
  const imageURL = "https://www.rctechsolutions.com/rahulchauhan.jpg";

  const stats = [
    { label: "Projects Completed", count: 96 },
    { label: "Years of Combined Experience", count: 4 },
    { label: "Client Satisfaction", count: 99, suffix: "%" },
    { label: "Recognitions & Awards", count: 26 },
  ];

  const [visibleStats, setVisibleStats] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          let start = 0;
          const end = stat.count;
          const duration = 800;
          const increment = end / 100;
          const timer = setInterval(() => {
            start += increment;
            setVisibleStats(prev => {
              const updated = [...prev];
              updated[index] = Math.min(Math.round(start), end);
              return updated;
            });
            if (start >= end) clearInterval(timer);
          }, duration / 100);
        });
      }
    }, { threshold: 0.4 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-white via-[#f9f6ff] to-white text-center py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About RC Tech Solutions</h1>
          <p className="max-w-xl mx-auto text-gray-600 text-base leading-relaxed">
            We are a creative digital studio based in Chandigarh — turning ideas into scalable websites and bold brand experiences. Minimalist by design. Strategic by intent.
          </p>
        </motion.div>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={imageURL}
              alt="Rahul Chauhan - Founder"
              className="w-full h-auto rounded-xl object-cover shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-[#953ee2] mb-4">How It All Started</h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              In late 2021, I was just another tech enthusiast — no team, no budget — just belief. By early 2022, <strong>RC Tech Solutions</strong> launched with one free project and a vision to build brands through clean code and smart design.
              <br /><br />
              From broken builds to client wins, each challenge became fuel. I kept things small, focused, and honest — and that made us reliable. What started as one-person hustle is now a trusted name for startups and business owners looking for clarity in a noisy digital space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-20 px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            className="text-2xl font-semibold text-gray-900 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Journey in Numbers
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-md p-4 border border-gray-100 shadow-sm bg-gray-50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl font-bold text-[#953ee2]">
                  {visibleStats[idx]}
                  {item.suffix || ""}
                </p>
                <p className="text-sm text-gray-600 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#f9f6ff] via-white to-[#f9f6ff] py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">Let’s Build Your Digital Presence</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">
            Whether you’re launching a brand, scaling a startup, or revamping your website — RC Tech Solutions is your digital partner.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#953ee2] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </>
  );
}
