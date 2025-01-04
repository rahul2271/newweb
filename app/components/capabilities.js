'use client';
import React from "react";
import {
  FaCode,
  FaRobot,
  FaPaintBrush,
  FaSearch,
  FaServer,
  FaShoppingCart,
  FaCloud,
  FaMobileAlt,
  FaRocket,
  FaChartBar,
  FaLock,
  FaUserShield,
  FaHandshake,
  FaTools,
} from "react-icons/fa";

const Capabilities = () => {
  const capabilities = [
    {
      title: "Web Development",
      description: "You dream it, we build it. Websites that perform and impress.",
      hoverText: "Code Your Dreams into Reality.",
      icon: <FaCode />,
    },
    {
      title: "AI-Powered Solutions",
      description: "We embed AI into your workflows for unstoppable results.",
      hoverText: "Smarter, Faster, Better.",
      icon: <FaRobot />,
    },
    {
      title: "Digital Branding",
      description: "Crafting bold identities for unforgettable brands.",
      hoverText: "Your Brand, Amplified.",
      icon: <FaPaintBrush />,
    },
    {
      title: "SEO Domination",
      description: "Rank higher. Stay visible. Crush the competition.",
      hoverText: "Outrank & Outshine.",
      icon: <FaSearch />,
    },
    {
      title: "DevOps Excellence",
      description: "Streamlined processes and zero downtime.",
      hoverText: "Effortless Operations.",
      icon: <FaServer />,
    },
    {
      title: "eCommerce Empires",
      description: "We build seamless shopping experiences that sell.",
      hoverText: "Shop Smart, Sell Big.",
      icon: <FaShoppingCart />,
    },
    {
      title: "Cloud Integration",
      description: "Scalable, secure, and designed for the future.",
      hoverText: "Powered by the Cloud.",
      icon: <FaCloud />,
    },
    {
      title: "Mobile App Development",
      description: "Apps with powerful functionality across iOS and Android.",
      hoverText: "Tap Into Innovation.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Startup Launch Support",
      description: "Helping startups disrupt markets and succeed boldly.",
      hoverText: "Your Launch, Our Mission.",
      icon: <FaRocket />,
    },
    {
      title: "Data Analytics & Insights",
      description: "Transforming data into actionable insights.",
      hoverText: "Decisions, Simplified.",
      icon: <FaChartBar />,
    },
    {
      title: "Cybersecurity Services",
      description: "Protect your assets with cutting-edge security.",
      hoverText: "Safety, Redefined.",
      icon: <FaLock />,
    },
    {
      title: "User Privacy Protection",
      description: "We prioritize data protection and compliance.",
      hoverText: "Your Data, Your Rules.",
      icon: <FaUserShield />,
    },
    {
      title: "Strategic Partnerships",
      description: "Building collaborations for mutual growth.",
      hoverText: "Together, We Grow.",
      icon: <FaHandshake />,
    },
    {
      title: "Technical Support",
      description: "24/7 assistance for uninterrupted operations.",
      hoverText: "Always There, Always Ready.",
      icon: <FaTools />,
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Capabilities</span>
          </h2>
          <p className="text-lg opacity-80">Where innovation meets expertise. We redefine possibilities.</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-md mb-6 group-hover:rotate-180 transform transition-transform duration-700">
                <div className="text-white text-4xl">{capability.icon}</div>
              </div>

              {/* Normal Content */}
              <div className="text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-4">{capability.title}</h3>
                <p className="text-gray-300">{capability.description}</p>
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-2xl font-extrabold text-white mb-4">{capability.hoverText}</h3>
                <a
                  href="#"
                  className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden overflow-x-auto whitespace-nowrap space-x-4 snap-x snap-mandatory scrollbar-hide">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="relative inline-block w-72 group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-500  snap-center overflow-hidden"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-md mb-6 group-hover:rotate-180 transform transition-transform duration-700">
                <div className="text-white text-4xl">{capability.icon}</div>
              </div>

              {/* Normal Content */}
              <div className="text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl place-content-center mx-auto max-w-auto font-bold mb-4">{capability.title}</h3>
                {/* <p className="text-gray-300 text-[12px]">{capability.description}</p> */}
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                <h3 className="text-lg font-extrabold text-white mb-4">{capability.hoverText}</h3>
                <a
                  href="#"
                  className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-full shadow-xl hover:bg-gray-100 transition duration-300"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <a
            href="#"
            className="inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-semibold rounded-[50px] shadow-xl hover:scale-110 transform transition duration-500"
          >
            Let’s Build Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
