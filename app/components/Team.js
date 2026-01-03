'use client'

import Image from 'next/image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { motion } from "framer-motion";

export default function Example() {
  return (
    <section 
      className="relative py-24 px-6 font-sans bg-cover bg-center bg-no-repeat text-gray-900"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90a7e086ee7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div id='team' className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center pb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600"
          >
            Meet the <span className="font-semibold">RC Tech Solutions Team</span>
          </motion.h2>
          <p className="text-gray-600 text-xl leading-tight pt-8 max-w-xl mx-auto">
            A powerhouse of <strong>Web Developers</strong>, <strong>SEO Experts</strong>, <strong>UI/UX Designers</strong>, and <strong>Digital Marketing Strategists</strong> – all driven by one goal: <em>Making your business grow online.</em>
          </p>
        </div>

        {/* Founder Highlight */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-200 hover:shadow-2xl transition">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/rahul.jpeg"
                alt="Rahul Chauhan - Founder of RC Tech Solutions"
                className="w-40 h-40 rounded-full object-cover border-4 border-[#953ee2] shadow-md"
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600">
                  Rahul Chauhan
                </h3>
                <p className="tracking-wide text-sm font-light text-[#953ee2] mt-1">
                  Founder & Digital Strategy Expert
                </p>
                <p className="mt-4 text-gray-700 text-md leading-relaxed max-w-xl">
                  At <strong>RC Tech Solutions</strong>, I don’t just build websites—I engineer <strong>digital growth strategies</strong> that turn clicks into customers.  
                  <span className="block mt-2 text-black font-semibold italic">
                    "We don’t follow market trends. We create them."
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
              role: 'UI/UX Engineer & Web Designer',
              img: 'https://i.pravatar.cc/150?img=12',
              desc: 'Crafting user-focused designs that boost conversions and engagement. From Figma to final code—Ananya makes it flow.',
            },
            {
              name: 'Karan Mehta',
              role: 'Full Stack Developer (Node.js / React / Next.js)',
              img: 'https://i.pravatar.cc/150?img=22',
              desc: 'Specializing in high-performance, scalable web apps. Karan ensures our projects load fast and rank well on Google.',
            },
            {
              name: 'Simran Kaur',
              role: 'SEO & Digital Marketing Strategist',
              img: 'https://i.pravatar.cc/150?img=30',
              desc: 'From SEO audits to keyword-driven content plans, Simran helps clients dominate Google search and improve online visibility.',
            },
          ].map((member, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <img
                src={member.img}
                alt={`${member.name} - ${member.role} at RC Tech Solutions`}
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
