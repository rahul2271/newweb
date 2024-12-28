"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    logo: "/client-logo1.png",
    quote: "RC Tech Solutions redefined our digital strategy. The impact was immediate!",
    details: "Increased traffic by 45%, enhanced UI/UX, and boosted conversion rates.",
  },
  {
    logo: "/client-logo2.png",
    quote: "Their professionalism and expertise are unmatched!",
    details: "Achieved 30% cost savings in our campaigns.",
  },
  {
    logo: "/client-logo3.png",
    quote: "A complete game-changer for our online presence.",
    details: "Revenue growth of 60% in just 6 months.",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4 text-white">
      {/* Section Title */}
      <h2 className="text-4xl font-medium text-center mb-12">Success Stories</h2>

      {/* Testimonial Slider */}
      <div className="flex justify-center items-center">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-60 perspective-1000 snap-center"
            >
              <motion.div
                className="relative w-full h-full transform transition-transform duration-700 hover:rotate-y-180 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105"
                style={{ transformStyle: "preserve-3d", overflow: "visible" }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 bg-gray-100 text-black flex flex-col items-center justify-center rounded-xl p-4"
                  style={{ backfaceVisibility: "hidden", overflow: "visible" }}
                >
                  {/* Client Logo with Circular Shape */}
                  <img
                    src={testimonial.logo}
                    alt="Client Logo"
                    className="w-20 h-20 mb-4 rounded-full object-cover"
                  />
                  <p className="text-sm text-center">{testimonial.quote}</p>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 bg-purple-600 text-white flex flex-col items-center justify-center rounded-xl p-6"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-sm text-center">{testimonial.details}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all">
          See More Success Stories
        </button>
      </div>
    </section>
  );
}
