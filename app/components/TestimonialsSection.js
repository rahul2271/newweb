// components/TestimonialsSection.js
'use client'
import { useState } from 'react';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "RC Tech Solutions helped us increase our site traffic by 40% within 3 months. Their attention to detail and innovative approach made all the difference.",
      name: "John Doe",
      title: "Marketing Director",
      company: "Company A",
      image: "/images/client1.jpg",
    },
    {
      quote: "Our website performance improved dramatically, leading to a 25% conversion rate increase. The RC Tech team was responsive and proactive.",
      name: "Jane Smith",
      title: "CEO",
      company: "Company B",
      image: "/images/client2.jpg",
    },
    {
      quote: "RC Tech Solutions transformed our website and helped us scale our online presence. Their expertise is unmatched.",
      name: "Emily Johnson",
      title: "Founder",
      company: "Company C",
      image: "/images/client3.jpg",
    },
  ];

  const successStats = [
    { label: "100+ clients served", value: "100+" },
    { label: "1M+ website visitors reached", value: "1M+" },
    { label: "5+ years of proven results", value: "5+" },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 px-8 bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        {/* Client Logos */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Clients</h2>
          <div className="flex justify-center space-x-8">
            <img src="/images/logo1.png" alt="Client A Logo" className="h-12" />
            <img src="/images/logo2.png" alt="Client B Logo" className="h-12" />
            <img src="/images/logo3.png" alt="Client C Logo" className="h-12" />
            <img src="/images/logo4.png" alt="Client D Logo" className="h-12" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">What Our Clients Say</h3>
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg italic text-gray-600 mb-4">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="flex items-center justify-center mt-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].title} at {testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="bg-gray-300 text-gray-800 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                &lt;
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-gray-300 text-gray-800 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Client Success Stats */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-4xl font-semibold text-purple-600">{stat.value}</p>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#case-studies"
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            See More Success Stories
          </a>
        </div>
      </div>
    </section>
  );
}
