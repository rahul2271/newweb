'use client'

import Image from 'next/image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { motion } from "framer-motion";

export default function TeamSection() {
  return (
    <section 
      className="relative py-24 px-6 font-sans bg-cover bg-center bg-no-repeat text-gray-900"
      style={{
        backgroundImage: "url('./team.png')",
      }}
    >
      {/* Overlay */}
  

      {/* Content Wrapper */}
      <div id='team' className="relative max-w-7xl mx-auto">
        <div className="text-center pb-20 ">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
        >
          Brains behind <span className="font-semibold ">your Success</span>
          <p className="text-gray-600 text-xl leading-tight pt-8 max-w-xl mx-auto">
            Not your average team. We don’t follow trends — we **set** them.
          </p>
        </motion.h2>
          
        </div>

        {/* Founder Highlighted */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-200 hover:shadow-2xl transition">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/rahul.jpeg"
                alt="Rahul Chauhan"
                className="w-40 h-40 rounded-full object-cover border-4 border-[#953ee2] shadow-md"
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600">
                  Rahul Chauhan
                </h3>
                <p className=" tracking-wide text-sm font-ligh text-[#953ee2] mt-1">
                  Founder / Vision Architect
                </p>
                <p className="mt-4 text-gray-700 text-md leading-relaxed max-w-xl">
                  I don’t just build — I redefine digital benchmarks. I create what others call “next level.”  
                  <span className="block mt-2 text-black font-semibold italic">
                    This brand doesn’t follow rules. We write them.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 text-center">
          {[
            {
              name: 'Ananya Singh',
              role: 'UI/UX Engineer',
              img: 'https://i.pravatar.cc/150?img=12',
              desc: 'Designs that aren’t just pretty—they convert.',
            },
            {
              name: 'Karan Mehta',
              role: 'Full Stack Dev',
              img: 'https://i.pravatar.cc/150?img=22',
              desc: 'Code that scales, performs, and never breaks.',
            },
            {
              name: 'Simran Kaur',
              role: 'Digital Strategist',
              img: 'https://i.pravatar.cc/150?img=30',
              desc: 'Strategy that gets noticed — and remembered.',
            },
          ].map((member, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border border-gray-300"
              />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-[#953ee2] text-xs uppercase font-semibold tracking-wider">{member.role}</p>
              <p className="text-gray-600 text-xs mt-2">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
