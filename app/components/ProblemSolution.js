'use client';
import { useState, useEffect } from 'react';

export default function ProblemSolution() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-20">
        
        {/* Left Side: Problems */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2
            className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#a56eff] via-[#867efc] to-[#6dc6ff] bg-clip-text text-transparent mb-8 transition-all duration-1000 ease-in-out
            ${scrollPosition > 80 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            Is Your Digital Strategy Costing You Growth?
          </h2>

          <div className="flex justify-center md:justify-start gap-10">
            {[
              { icon: '/icons/low-sale.png', label: 'Low Conversions', trigger: 100 },
              { icon: '/icons/low-trafficc.png', label: 'Poor Traffic', trigger: 200 },
              { icon: '/icons/reject_5421402.png', label: 'Outdated Design', trigger: 300 },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center transition-all duration-1000 ease-in-out
              ${scrollPosition > item.trigger ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="h-[70px] w-[70px] bg-white p-2 rounded-full shadow-md shadow-purple-700/30">
                  <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                </div>
                <p className="text-sm mt-3 font-semibold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-transparent bg-clip-text">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Solution Box */}
        <div className={`w-full md:w-1/2 md:mt-0 -mt-16 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-[0_10px_60px_rgba(172,121,255,0.2)] transition-all duration-1000 ease-in-out
          ${scrollPosition > 150 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-[#ffffff] to-[#d1d1ff] bg-clip-text text-transparent">
            We Turn Your Challenges Into Opportunities.
          </h2>

          <p className="text-sm md:text-base text-gray-300 mb-8 leading-relaxed">
            From driving quality traffic to turning visitors into loyal customers with high-converting and aesthetic designs — we architect digital excellence for brands that demand performance and class.
          </p>

          <a
            href="#services"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-xl hover:rotate-[1deg] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            Discover How We Do It
          </a>
        </div>
      </div>
    </section>
  );
}
