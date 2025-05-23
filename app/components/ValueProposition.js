'use client'
import { useEffect } from 'react';
import { motion } from 'framer-motion';


export default function ValueProposition() {
  useEffect(() => {
    // Adding animation class dynamically for animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add('opacity-100', 'transform', 'translate-x-0', 'transition-all', 'duration-1000');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 px-8 bg-white to-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column (Text) */}
        <div className="space-y-6 animate-on-scroll opacity-0 transform -translate-x-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl text-left pb-12 font-light text-gray-200 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 "
        >
          What sets <span className="font-semibold ">RC Tech Solutions aparts?</span>
        </motion.h2>
          <p className="text-md md:text-xl font-regular text-gray-600">We don’t just build websites; we create powerful digital solutions that help your brand thrive in a competitive world.</p>
          <ul className="space-y-4 list-none">
            <li className="flex items-center text:sm md:text-lg font-light text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Custom-built websites that align with your business goals.
            </li>
            <li className="flex items-center font-light text:sm md:text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Performance-driven web development to accelerate your growth.
            </li>
            <li className="flex items-center font-light text:sm md:text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Full-service digital solutions: from strategy to execution.
            </li>
            <li className="flex items-center font-light text:sm md:text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Transparent, client-first approach for reliable results.
            </li>
          </ul>
        </div>

        {/* Right Column (Visuals) */}
        <div className="md:mt-[-20px] space-y-6 animate-on-scroll opacity-0 transform -translate-x-10">
          <div className="flex justify-center">
            <img src="flow.png" alt="Flowchart" className=" w-full max-w-md h-auto" />
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="text-center mt-12">
        <a href="#why-us" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm md:text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          Discover How We Can Help You Grow
        </a>
      </div>
    </section>
  );
}
