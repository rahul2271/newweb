"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import ThankYouModal from './ThankYouModal';

export default function HeroSection() {
  const { scrollYProgress } = useViewportScroll();
  const yImage1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const yImage3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateVP = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    updateVP();
    window.addEventListener('resize', updateVP);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', updateVP);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const relX = viewport.w ? (mousePos.x - viewport.w / 2) / viewport.w : 0;
  const relY = viewport.h ? (mousePos.y - viewport.h / 2) / viewport.h : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    try {
      const res = await fetch('https://sheetdb.io/api/v1/0arxv3vf8lrsq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      });

      if (res.ok) {
        setShowModal(true);
        form.reset();
      } else {
        alert('⚠️ Submission failed.');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Something went wrong.');
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 px-4 lg:px-8 text-black">
      {/* Thank You Modal */}
      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm" />

      <div className="mx-auto max-w-7xl">
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
            Websites That Perform. Design That Converts.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            At <strong>RC Tech Solutions</strong>, we help businesses craft fast, user-friendly, and SEO-optimized websites that leave a lasting impression. From design to development, we focus on performance and results.
          </p>

          <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto">
            Whether you’re launching a startup or refreshing an existing brand, our team blends clean UI/UX design with smart development practices to help your site rank better and convert more visitors.
          </p>

          {/* Email Capture Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your business email"
              className="w-full sm:w-[300px] rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg"
            >
              Get Free Consultation
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            No spam. Just honest advice from <strong>RC Tech Solutions</strong>.
          </p>
        </div>

        {/* Parallax Images */}
        <div className="relative hidden lg:flex justify-between items-center gap-8 mt-12">
          <motion.div style={{ y: yImage1, x: relX * 40, rotateZ: relX * 6 }}>
            <Image
              src="https://images.unsplash.com/photo-1634498507905-3a4f8d7ba9e1?q=80&w=1935"
              alt="Custom Website Design"
              width={300}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </motion.div>

          <motion.div style={{ y: yImage2, x: relX * -20, rotateZ: relX * -4 }}>
            <Image
              src="https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=1935"
              alt="UI UX Design Agency"
              width={260}
              height={260}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </motion.div>

          <motion.div style={{ y: yImage3, x: relX * 30, rotateZ: relX * 5 }}>
            <Image
              src="https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=1964"
              alt="SEO Optimized Web Development"
              width={300}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div
        style={{ x: relX * 20, y: relY * 20 }}
        className="hidden lg:block fixed bottom-6 left-6 pointer-events-none select-none"
      >
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 text-xs text-gray-800 rounded-xl shadow-lg">
          🚀 Built with passion by RC Tech Solutions
        </div>
      </motion.div>
    </section>
  );
}
