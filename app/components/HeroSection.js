'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

/**
 * HeroSection – RC Tech Solutions
 * --------------------------------------------------
 * • Mouse-reactive parallax + scroll parallax
 * • SEO-optimised, client-converting copy
 * • CTA glow / ripple on hover & tap
 * • Floating trust badge that follows cursor slightly
 * • Accessible email capture form
 * • Whitish background image with subtle blur overlay
 */

export default function HeroSection() {
  /* ───────────── Scroll-based parallax ───────────── */
  const { scrollYProgress } = useViewportScroll();
  const yImage1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const yImage3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  /* ───────────── Mouse tracking state ───────────── */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

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

  /* Helper: normalised offset (-0.5 → 0.5) */
  const relX = viewport.w ? (mousePos.x - viewport.w / 2) / viewport.w : 0;
  const relY = viewport.h ? (mousePos.y - viewport.h / 2) / viewport.h : 0;

  /* ───────────── Fade-in animation preset ───────────── */
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-44 bg-white bg-cover bg-center text-black">
      {/* Whitish veil for readability */}
      <div className="absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 lg:px-8">
        {/* Headline & tagline */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <h1 className="font-poppins pb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-5xl font-light leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl animate-[textGlow_2s_ease-in-out_infinite]">
            <span className="font-bold">Scalable Web&nbsp;Solutions</span>
            <br />
            That Ignite Digital&nbsp;Growth
          </h1>
          <p className="mx-auto pb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-700">
            We craft blazing-fast, <strong>SEO-optimised</strong>, mobile-responsive websites and SaaS dashboards that{' '}
            <strong>convert visitors into customers</strong>.
          </p>

          {/* Email capture form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="group relative mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:gap-0"
          >
            <label htmlFor="email" className="sr-only">
              Work Email
            </label>
            <motion.input
              id="email"
              type="email"
              required
              placeholder="Enter your business email"
              className="w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-base font-normal tracking-wide text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none"
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="relative w-full overflow-hidden rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold leading-none text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 sm:absolute sm:right-1 sm:top-1 sm:w-auto"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              Get a Free Consultation
            </motion.button>
          </form>

          <p className="mt-4 text-xs font-normal text-gray-500">
            No spam, just strategy. Start your digital journey with RC Tech Solutions.
          </p>
        </motion.div>

        {/* Three layered illustrations with scroll + mouse parallax */}
        <div className="relative flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-0">
          <motion.div
            style={{
              y: yImage1,
              x: relX * 40, // mouse parallax strength
              rotateZ: relX * 6,
            }}
            className="hidden lg:flex flex-shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1634498507905-3a4f8d7ba9e1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Technology Illustration 1"
              width={320}
              height={320}
              priority
              className="rounded-xl object-cover shadow-lg"
            />
          </motion.div>

          <motion.div
            style={{
              y: yImage2,
              x: relX * -20,
              rotateZ: relX * -4,
            }}
            className="hidden lg:flex flex-shrink-0"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Web Design Illustration"
              width={260}
              height={260}
              className="rounded-xl object-cover shadow-lg"
            />
          </motion.div>

          <motion.div
            style={{
              y: yImage3,
              x: relX * 30,
              rotateZ: relX * 5,
            }}
            className="hidden lg:flex flex-shrink-0"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Software Development Illustration"
              width={320}
              height={320}
              className="rounded-xl object-cover shadow-lg"
            />
          </motion.div>
        </div>

        {/* Scroll cue */}
        
      </div>

      {/* Floating trust badge that gently follows the cursor */}
      <motion.div
        style={{
          x: relX * 20,
          y: relY * 20,
        }}
        className="pointer-events-none fixed bottom-6 right-6 hidden select-none lg:block"
      >
        <div className="rounded-xl bg-white/80 px-4 py-2 text-xs font-medium text-gray-800 shadow-lg backdrop-blur-md">
          🚀 Trusted by 50+ global startups
        </div>
      </motion.div>
    </section>
  );
}
