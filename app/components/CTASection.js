'use client';
import Link from 'next/link';

export default function CTASection() {
  return (
    <>
      {/* Main CTA Section */}
      <section className="bg-[#0d0f11] py-20 text-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4">Let’s Create Digital Masterpieces Together</h2>
          <p className="text-xl mb-8">Don’t wait. Start building the future of your brand today.</p>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="bg-white text-[#953ee2] px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[#953ee2] hover:text-white hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-8 right-8">
        <Link
          href="#contact"
          className="bg-[#953ee2] text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-[#953ee2] hover:scale-110"
        >
          Contact Us
        </Link>
      </div>
    </>
  );
}