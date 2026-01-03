"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';

export default function ParallaxButton({ text, href }) {
  return (
    <Parallax speed={10} className="inline-block">
      <motion.a
        href={href}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-white text-[#953ee2] font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {text}
      </motion.a>
    </Parallax>
  );
}
