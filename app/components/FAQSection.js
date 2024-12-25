'use client'
import { useState } from 'react';

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="py-12 px-6 md:px-8 bg-[#0d0f11]">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-200 mb-8 md:mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="border-b border-gray-300">
            <button
              onClick={() => toggle(1)}
              className="w-full text-left py-4 text-lg md:text-xl font-medium text-gray-200 flex justify-between items-center focus:outline-none"
            >
              <span>How quickly can I expect my website to be live?</span>
              <svg
                className={`w-6 h-6 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`transition-all duration-500 overflow-hidden ${open === 1 ? 'max-h-screen py-4' : 'max-h-0'}`}
            >
              <p className="text-gray-600 text-sm md:text-base">
                Our typical website timeline is 4-6 weeks, depending on the complexity of your project.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggle(2)}
              className="w-full text-left py-4 text-lg md:text-xl font-medium text-gray-200 flex justify-between items-center focus:outline-none"
            >
              <span>What makes your web development different from others?</span>
              <svg
                className={`w-6 h-6 transition-transform ${open === 2 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`transition-all duration-500 overflow-hidden ${open === 2 ? 'max-h-screen py-4' : 'max-h-0'}`}
            >
              <p className="text-gray-600 text-sm md:text-base">
                We focus on responsive design, user experience, and high-performance coding practices to ensure your site not only looks great but also functions at its best.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 md:mt-10 text-center">
          <a
            href="#contact"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-gradient-to-br from-[#953ee2] to-black text-white text-sm md:text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Have More Questions? Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
