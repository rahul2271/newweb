"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Head from "next/head";
import Image from "next/image";

export default function WebDevelopmentPage() {
  useEffect(() => {
    console.log("Web Development Page Loaded");
  }, []);

  return (
    <>
      <Head>
        <title>Premium Web Development Services | RC Tech Solutions</title>
        <meta
          name="description"
          content="Transform your ideas into reality with premium web development services from RC Tech Solutions."
        />
      </Head>

      <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white min-h-screen font-sans">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 opacity-20 blur-2xl"
            ></motion.div>
          </div>
          <div className="z-10 text-center max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
              Elevate Your Brand with Futuristic Web Development
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              We craft innovative solutions tailored to your business needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-8 px-8 py-4 bg-white text-[#953ee2] font-bold rounded-full shadow-lg hover:shadow-xl transition-transform"
            >
              Get Started
            </motion.button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#1c1c28]">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose RC Tech Solutions?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["Custom Designs", "Speed & Performance", "Scalability"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  className="p-8 bg-[#28293e] rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform"
                  whileHover={{ rotate: 2 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">{item}</h3>
                  <p className="text-gray-400">
                    Our expertise ensures {item.toLowerCase()} for your success.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-white text-[#953ee2] py-20 px-6 md:px-16 lg:px-32">
          <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            {[
              "Planning",
              "Designing",
              "Development",
              "Testing",
              "Deployment",
              "Maintenance",
            ].map((step, index) => (
              <ParallaxProvider key={index}>
                <Parallax speed={5}>
                  <div className="flex flex-col items-center text-center mb-12 md:mb-0">
                    <motion.div
                      className="w-16 h-16 bg-[#953ee2] text-white flex items-center justify-center rounded-full mb-4"
                      whileHover={{ scale: 1.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <h3 className="font-semibold">{step}</h3>
                  </div>
                </Parallax>
              </ParallaxProvider>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 px-6 md:px-16 lg:px-32">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Our Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={`/portfolio/project-${index + 1}.jpg`}
                  alt={`Project ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-110 transition-transform"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#953ee2] text-white py-20 text-center">
          <h2 className="text-4xl font-bold">
            Let’s Build Something Incredible Together
          </h2>
          <p className="mt-4 text-lg">
            Empower your business with cutting-edge web development solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-8 px-8 py-4 bg-white text-[#953ee2] font-bold rounded-full shadow-lg hover:shadow-xl transition-transform"
          >
            Contact Us Now
          </motion.button>
        </section>
      </div>
    </>
  );
}
