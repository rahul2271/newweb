'use client';
import Link from 'next/link';

export default function CTASection() {
  return (
    <>
      {/* Main CTA Section */}
      <section className="bg-gradient-to-br from-gray-300 via-white to-gray-300 py-20 text-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 md:text-5xl font-extrabold text-center pb-12 text-gray-900">Let’s Create Digital Masterpieces Together</h2>
          <p className="text-lg text-gray-900 md:text-xl mb-8">Don’t wait. Start building the future of your brand today.</p>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[#953ee2] hover:text-white hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Sticky CTA Button */}
      {/* <div className="fixed bottom-8 right-8">
        <Link
          href="#contact"
          className="bg-[#953ee2] text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-[#953ee2] hover:scale-110"
        >
          Contact Us
        </Link>
      </div> */}
    </>
  );
}
