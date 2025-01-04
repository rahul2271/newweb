'use client'
import { useState, useEffect } from 'react';

export default function ProblemSolution() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position to apply dynamic scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
        // <section className="relative w-full py-20 bg-[#0d0f11] text-white">bg-gradient-to-r from-purple-100 to-white
        <section className="relative w-full py-20 bg-gradient-to-r from-purple-100 to-white text-white">

    <div className="flex flex-col md:flex-row items-center justify-center max-w-screen-xl mx-auto px-4 gap-x-12">
        {/* Left Side: Problem */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">

          <h2 className={` text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-3xl md:text-5xl tracking-tight leading-tight font-extrabold leading-tight mb-6 text-gray-900 opacity-0 transition-all duration-1000 ease-in-out
            ${scrollPosition > 100 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'}`}>
            Is Your Digital Strategy Leaving You Behind?
          </h2>
          <div className="flex justify-center md:justify-start space-x-8">
            <div className={`text-gray-900 font-light opacity-0 transition-opacity duration-1000 ease-in-out
              ${scrollPosition > 200 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'} flex flex-col items-center`}>
              <img src="/icons/low-sales.png" alt="Low Conversions" className="h-[70px] w-[70px] shadow-xl rounded-[50px] mb-4 transition-transform duration-1000 ease-in-out" />
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-md '>Low Conversions</p>
            </div>
            <div className={`text-gray-900 font-light opacity-0 transition-opacity duration-1000 ease-in-out
              ${scrollPosition > 300 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'} flex flex-col items-center`}>
              <img src="/icons/poor-traffic.png" alt="Poor Traffic" className="h-[70px] w-[70px] mb-4 shadow-xl rounded-[50px] transition-transform duration-1000 ease-in-out" />
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-md '>Poor Traffic</p>
            </div>
            <div className={`text-gray-900 font-light opacity-0 transition-opacity duration-1000 ease-in-out
              ${scrollPosition > 400 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'} flex flex-col items-center`}>
              <img src="/icons/outdated-design.png" alt="Outdated Design" className="h-[70px] w-[70px] shadow-xl rounded-[50px] mb-4 transition-transform duration-1000 ease-in-out" />
              <p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-md '>Outdated Design</p>
            </div>
          </div>
        </div>

        {/* Right Side: Solution */}
        <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900  p-6 shadow-2xl rounded-[50px] md:w-1/2 text-center md:mt-[70px] mt-[-40px] md:text-left">
          <h2 className={`text-gray-200 text-2xl md:text-3xl font-regular leading-tight mb-6 opacity-0 transition-all duration-1000 ease-in-out
            ${scrollPosition > 100 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'}`}>
            We Turn Your Struggles Into Digital Triumphs
          </h2>
          <p className={`text-gray-300 text-[10px] font-light md:text-sm mb-6 opacity-0 transition-opacity duration-1000 ease-in-out
            ${scrollPosition > 200 ? 'opacity-100 transform translate-x-0' : 'opacity-0 translate-x-8'}`}>
            From increasing conversions to designing modern, high-performance websites, we’re here to change the game.
          </p>

          {/* CTA Button */}
          <a
            href="#services"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:rotate-2 inline-block  text-white px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-110 "
          >
            Discover How We Do It
          </a>
        </div>
      </div>
    </section>
  );
}
