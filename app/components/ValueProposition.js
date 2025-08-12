'use client'
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ValueProposition() {
  useEffect(() => {
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
    <section className="py-20 px-8 bg-white text-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-6 animate-on-scroll opacity-0 transform -translate-x-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
          >
            Why Brands Choose RC Tech Solutions
          </motion.h2>

          <p className="text-md md:text-lg leading-relaxed text-gray-700">
            At RC Tech Solutions, led by Rahul Chauhan, we go beyond delivering projects—we create lasting digital growth partnerships. Every website, app, and campaign is designed with precision, ensuring performance, conversions, and measurable business impact. As a provider of the Best AI Powered Solutions, we integrate innovation into every step, helping businesses stay ahead in the digital era.

          </p>

          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong>Custom Web Development</strong> tailored to your brand vision and business objectives—no templates, no shortcuts.
              </span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong>SEO-Optimized Development</strong> that helps you rank higher and reach more of your target audience organically.
              </span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong>Full-Service Digital Strategy</strong> covering everything from UI/UX design to cloud deployment and performance marketing.
              </span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong>Conversion-Driven Design</strong> that doesn’t just look good—but converts visitors into leads, customers, and fans.
              </span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>
                Transparent, collaborative workflows—<strong>Rahul Chauhan</strong> and his team stay connected with you at every stage.
              </span>
            </li>
          </ul>

          <p className="text-md md:text-lg leading-relaxed text-gray-700 pt-4">
            Whether you’re a startup or an established brand, <strong>RC Tech Solutions</strong> is here to help you scale smart and fast.
          </p>
        </div>

        {/* Right Side: Image / Visual */}
        <div className="animate-on-scroll opacity-0 transform -translate-x-10">
          <img
            src="/flow.png"
            alt="RC Tech Solutions workflow process for digital growth"
            className="w-full max-w-lg mx-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Call-to-Action Button */}
      <div className="text-center mt-16">
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base md:text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Talk to Rahul Chauhan’s Team – Let’s Build Growth Together
        </a>
      </div>
    </section>
  );
}
