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
  const [counting, setCounting] = useState(false);

  // Trigger counting animation once component mounts
  useEffect(() => {
    setCounting(true);
  }, []);

  return (
    <section className="rounded-[150px] bg-[#0d0f11] text-white py-20 px-8 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-12">
        Results That Speak for Themselves
      </h2>

      <div className="grid grid-cols-1 text-purple-600 md:grid-cols-3 gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0, // Slide-in effect
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05, // Hover effect
              rotate: 3, // Slight rotation on hover
            }}
          >
            <motion.div
              className="text-5xl md:text-6xl font-extrabold"
              initial={{ count: 1 }}
              animate={{
                count: counting ? stat.number : 1, // Start from 1 and animate to the target number
              }}
              transition={{
                count: {
                  duration: 2,
                  ease: "easeOut",
                },
              }}
            >
              {/* Dynamically render the count with + sign */}
              {counting ? `${Math.floor(stat.number)}+` : 1}
            </motion.div>
            <p className="text-lg mt-4">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center mt-6 text-lg">
        These aren’t just numbers. These are real results for real businesses.
      </p>
    </section>
  );
};

export default BoldStats;
