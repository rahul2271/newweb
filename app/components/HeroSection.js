'use client';

import Image from 'next/image';

export const Header = () => {
  return (
    
    <section className=" relative min-h-screen bg-gradient-animate bg-400 animate-gradient-flow text-white font-sans overflow-hidden">

      {/* Subtle Texture Background */}
      <div className="absolute inset-0 bg-[url('/bgt.jpg')] bg-cover opacity-50 z-0" />

      {/* Top SVG Wave */}
      <div className="absolute top-0 left-0 w-full z-10">
        <svg viewBox="0 0 1440 320" className="fill-white">
          <path d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,133.3C672,128,768,128,864,117.3C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-40 pb-20 flex flex-col md:flex-row items-center justify-between">
        {/* Text Left */}
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide leading-tight text-white">
            Engineering <br />
            <span className="text-white/70">Digital Legacies</span>
          </h1>
          <p className="mt-6 text-gray-100 text-lg">
            RC Tech Solutions builds future-ready, custom-coded, conversion-focused digital platforms. No templates. No compromise.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg uppercase tracking-wide text-sm"
          >
            Start Your Project
          </a>
        </div>

        {/* Glassmorphic Form */}
        <div className="w-full max-w-md mt-12 md:mt-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white text-center mb-4 tracking-wide">
            Work With Us
          </h3>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-4 py-3 rounded-md bg-white/30 placeholder-gray-300 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 rounded-md bg-white/30 placeholder-gray-300 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
            <textarea
              placeholder="Project Brief"
              rows={3}
              className="w-full mb-4 px-4 py-3 rounded-md bg-white/30 placeholder-gray-300 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-white"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-gray-300 transition-all"
            >
              Send Request →
            </button>
            <p className="text-xs text-gray-200 text-center mt-2">
              We reply within 24 hours.
            </p>
          </form>
        </div>
      </div>

      {/* Bottom SVG Wave */}
      <div className="absolute botton-[-5] md:bottom-0 left-0 w-full z-10 rotate-180">
        <svg viewBox="0 0 1440 320" className="fill-white">
          <path d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,133.3C672,128,768,128,864,117.3C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </section>
  );
};
