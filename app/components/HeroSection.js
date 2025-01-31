'use client'
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Optional: handle sticky CTA visibility during scroll if necessary
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-Screen Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline // Essential for mobile video playback
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero1.mp4" type="video/mp4" />
        <source src="/hero.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 opacity-90 z-5"></div> */}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold uppercase leading-tight mb-4">
          Turning ideas into Digital reality.
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl font-light mb-8">
        Your business isn’t average. Neither are we. Let’s build something extraordinary together.        </p>

        {/* CTA Button */}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:rotate-2 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 transform ${isHovered ? 'scale-105' : ''}`}
        >
          {isHovered ? "Let's Build" : "Start Your Journey"}
        </button>
      </div>
    </section>
  );
}
