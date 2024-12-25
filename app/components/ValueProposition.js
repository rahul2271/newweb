'use client'
import { useEffect } from 'react';

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
    <section className="py-16 px-8 bg-gradient-to-r from-purple-100 to-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column (Text) */}
        <div className="space-y-6 animate-on-scroll opacity-0 transform -translate-x-10">
          <h2 className="text-3xl font-semibold text-gray-800">What Sets RC Tech Solutions Apart?</h2>
          <p className="text-xl text-gray-600">We don’t just build websites; we create powerful digital solutions that help your brand thrive in a competitive world.</p>
          <ul className="space-y-4 list-none">
            <li className="flex items-center text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Custom-built websites that align with your business goals.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Performance-driven web development to accelerate your growth.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Full-service digital solutions: from strategy to execution.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Transparent, client-first approach for reliable results.
            </li>
          </ul>
        </div>

        {/* Right Column (Visuals) */}
        <div className=" space-y-6 animate-on-scroll opacity-0 transform -translate-x-10">
          <div className="flex justify-center">
            <img src="flow.png" alt="Flowchart" className=" w-full max-w-md h-auto" />
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="text-center mt-12">
        <a href="#why-us" className="inline-block px-8 py-3 bg-gradient-to-br from-[#953ee2] to-black text-white text-sm md:text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          Discover How We Can Help You Grow
        </a>
      </div>
    </section>
  );
}
