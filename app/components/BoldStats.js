"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Define the stats you want to display
const stats = [
  { number: 40, label: "Websites Delivered" },
  { number: 15746, label: "Users Reached" },
  { number: 99.9, label: "Client Satisfaction Rate" },
];

const BoldStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0)); // Initialize counts for each stat

  useEffect(() => {
    // Animate each stat from 0 to its target value
    stats.forEach((stat, index) => {
      const interval = setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.number) {
            updated[index] = Math.min(updated[index] + Math.ceil(stat.number / 100), stat.number); // Increment count
          }
          return updated;
        });
      }, 20); // Update every 20ms

      // Clear interval when animation is complete
      return () => clearInterval(interval);
    });
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-100 to-white text-white py-20 px-8 md:px-12">
      <h2 className="text-4xl font-medium text-center mb-12 text-gray-900">
        Results That Speak for Themselves
      </h2>

      <div className="rounded-[30px] p-6 shadow-lg-lg lg:shadow-xl text-purple-600 flex flex-wrap justify-center gap-8 md:grid md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              rotate: 3,
            }}
          >
            <div className="text-5xl md:text-6xl font-extrabold">
              {counts[index]}{stat.number === 99.9 ? "%" : (stat.number === 40 || stat.number === 15746 ? "+" : "")}
            </div>
            <p className="text-lg mt-4">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center mt-6 font-light text-lg text-gray-900">
        These aren’t just numbers. These are real results for real businesses.
      </p>
    </section>
  );
};

export default BoldStats;
