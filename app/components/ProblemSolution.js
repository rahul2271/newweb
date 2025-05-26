'use client';
import { useState, useEffect } from 'react';

export default function ProblemSolution() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative w-full py-32 bg-white overflow-hidden font-sans bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-32">

        {/* Left Side: Problem Block */}
        <div className="w-full md:w-1/2 text-left">
          <h2
            className={`text-[2.5rem] md:text-[3.2rem] leading-tight font-light bg-gradient-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent transition-all duration-1000 ease-out
            ${scrollPosition > 80 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            You're not here for ordinary.<br />
            You're building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 font-extrabold"><br></br>Brand that wins</span>.
          </h2>

          <div className="mt-12 flex flex-col gap-8 text-gray-600 text-[15px] leading-relaxed">
            <p className={`${scrollPosition > 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
              Traffic is coming, but <span className="font-semibold text-black">conversions are stuck</span>. Something’s off.
            </p>
            <p className={`${scrollPosition > 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-100`}>
              Your site looks okay — but <span className="font-semibold text-black">it doesn’t sell</span>. You know it.
            </p>
            <p className={`${scrollPosition > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-200`}>
              You’ve grown, but your digital presence feels like it’s stuck in <span className="font-semibold text-black">2014</span>.
            </p>
          </div>
        </div>

        {/* Right Side: Solution Box */}
        <div
          className={`w-full md:w-1/2 bg-white/30 border border-gray-200 rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-1000 ease-in-out
          ${scrollPosition > 150 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-black to-[#444] bg-clip-text text-transparent">
            Your Brand Deserves Premium. Not Basic.
          </h3>

          <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium mb-10">
            We don’t do templates. We don’t promise miracles. We build high-converting, future-proof digital ecosystems that do what they’re meant to — bring ROI, reputation, and results.
          </p>

          <a
            href="#services"
            className="inline-block px-10 py-3 text-white text-sm font-semibold rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] shadow-lg hover:scale-105 hover:shadow-xl hover:rotate-[.5deg] transition-transform duration-300"
          >
            Work With Class
          </a>
        </div>
      </div>
    </section>
  );
}
