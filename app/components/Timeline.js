'use client'
import { useState } from 'react';

const milestones = [
  {
    title: 'Strategic Planning',
    description: "We don't just plan; we strategize. Backed by data and client insights, our roadmap ensures a seamless development journey.",
    icon: '📝',
    tech: 'Figma, Adobe XD',
    animation: 'animate-glow',
  },
  {
    title: 'Creative Design',
    description: "From wireframes to polished interfaces, we blend creativity with functionality, ensuring designs that convert.",
    icon: '🎨',
    tech: 'Figma, Adobe XD',
    animation: 'animate-glow',
  },
  {
    title: 'Cutting-Edge Development',
    description: "Built with the latest tech stacks for speed, scalability, and seamless functionality.",
    icon: '💻',
    tech: 'Next.js, React',
    animation: 'animate-glow',
  },
  {
    title: 'Rigorous Testing',
    description: "Automated and manual testing ensure that every feature runs flawlessly across all devices.",
    icon: '🔧',
    tech: 'Jest, Cypress',
    animation: 'animate-glow',
  },
  {
    title: 'Seamless Launch & Maintenance',
    description: "From deployment to ongoing updates, we ensure your project stays ahead of the curve.",
    icon: '🚀',
    tech: 'Docker, Kubernetes',
    animation: 'animate-glow',
  },
];

export default function Timeline() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-100 to-white max-w-auto mx-auto p-6 md:p-10">
        <h2 className="text-2xl md:text-4xl text-center font-bold text-purple mb-8 md:mb-10">Our Proven Process: From Dream to Reality</h2>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple to-darkblue" />
          
          {/* Flexbox adjusted for mobile */}
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-8 md:mb-10">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`cursor-pointer relative flex flex-col items-center w-1/2 md:w-auto mb-6 md:mb-0 ${currentStep === index ? 'text-purple' : 'text-gray-600'}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`p-4 rounded-full bg-white shadow-md ${currentStep === index ? 'border-4 border-gradient-to-br from-[#953ee2] to-black' : ''}`}>
                  <span className="text-4xl">{milestone.icon}</span>
                </div>
                <span className={`mt-2 text-sm text-center md:text-base ${currentStep === index ? 'font-semibold' : ''}`}>{milestone.title}</span>
              </div>
            ))}
          </div>

          {/* Milestone details section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-center rounded-lg shadow-lg text-gray-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-200">{milestones[currentStep].title}</h3>
            <p className="mt-2 text-sm md:text-gray-200">{milestones[currentStep].description}</p>
            <p className="mt-4 text-xs md:text-sm text-gray-300">Tech Stack: {milestones[currentStep].tech}</p>
          </div>
        </div>


        <div className="flex justify-center mt-8 md:mt-10">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 rounded-full hover:bg-white hover:text-purple border-2 border-purple transition-all">
            Let's Build the Future Together
          </button>
        </div>
      </div>
    </>
  );
}
