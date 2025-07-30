'use client';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaCogs,
  FaPalette,
  FaTabletAlt,
  FaDatabase,
  FaCode,
  FaLayerGroup,
  FaTools,
  FaShoppingCart,
  FaArrowRight,
  FaFacebookF,
  FaStar,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SeoSchema from '../../components/SeoSchema';
import { NextSeo } from 'next-seo';
<NextSeo
  title="AI Powered Solutions | RC Tech Solutions"
  description="Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics."
  canonical="https://www.rctechsolutions.com/services/ai-powered"
  openGraph={{
    url: 'https://www.rctechsolutions.com/services/ai-powered',
    title: 'AI Powered Solutions | RC Tech Solutions',
    description:
      'Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics.',
    site_name: 'RC Tech Solutions',
  }}
/>

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const services = [
  { title: 'AI Chatbot Development', icon: FaLaptopCode, description: 'Build intelligent chatbots for customer support, sales, and automation.', color: 'from-purple-500 to-indigo-500' },
  { title: 'Custom AI Solutions', icon: FaCogs, description: 'Tailor-made AI software for your unique business needs.', color: 'from-blue-500 to-teal-500' },
  { title: 'Natural Language Processing (NLP)', icon: FaPalette, description: 'Extract insights from text using sentiment analysis, text summarization, and more.', color: 'from-green-400 to-lime-500' },
  { title: 'Computer Vision Applications', icon: FaTabletAlt, description: 'Implement image recognition, object detection, and video analytics.', color: 'from-pink-500 to-red-500' },
  { title: 'Predictive Analytics', icon: FaDatabase, description: 'Forecast trends and customer behaviors using AI-driven insights.', color: 'from-orange-400 to-yellow-500' },
  { title: 'AI Integration for Web & Mobile', icon: FaCode, description: 'Seamlessly embed AI models into your websites and mobile apps.', color: 'from-sky-500 to-blue-600' },
  { title: 'Machine Learning Models', icon: FaLayerGroup, description: 'Design and deploy classification, forecasting, and recommendation models.', color: 'from-amber-500 to-yellow-400' },
  { title: 'Voice Recognition Systems', icon: FaTools, description: 'Develop voice-enabled AI apps with speech-to-text and voice biometrics.', color: 'from-indigo-400 to-violet-500' },
  { title: 'AI-Based Recommendation Engines', icon: FaShoppingCart, description: 'Enhance product discovery and sales with AI-driven recommendations.', color: 'from-teal-400 to-cyan-500' },
];

function ServiceCard({ icon: Icon, title, description, color, delay = 0 }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 ease-in-out overflow-hidden"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full pointer-events-none`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      <div className="text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>
    </motion.div>
  );
}
const faqs = [
  {
    question: 'What industries can benefit from your AI solutions?',
    answer: 'Our AI solutions cater to industries like Healthcare, E-commerce, Finance, Education, and Manufacturing, helping them optimize operations and improve decision-making.'
  },
  {
    question: 'Do you offer customized AI models?',
    answer: 'Yes, we design and develop custom AI models tailored to your business needs, whether it’s NLP, computer vision, or predictive analytics.'
  },
  {
    question: 'How long does it take to build an AI solution?',
    answer: 'Project timelines depend on complexity and requirements, but most AI solutions take between 4 to 12 weeks from design to deployment.'
  },
  {
    question: 'Can I hire dedicated AI developers from your team?',
    answer: 'Absolutely! We offer both project-based engagement and dedicated AI developer hiring models.'
  },
  {
    question: 'Do you offer post-deployment AI support and maintenance?',
    answer: 'Yes, we provide comprehensive post-deployment support, model optimization, and AI maintenance packages.'
  },
  {
    question: 'Are your AI solutions scalable for enterprise-level deployment?',
    answer: 'Definitely! We design our AI architectures to scale efficiently, whether you’re a startup or a large enterprise.'
  },
  {
    question: 'Can you integrate AI features into existing mobile or web apps?',
    answer: 'Yes, we specialize in AI integration with existing web and mobile platforms using APIs, microservices, or custom code.'
  },
  {
    question: 'What AI technologies and frameworks do you work with?',
    answer: 'We use TensorFlow, PyTorch, OpenAI APIs, Google Cloud AI, AWS AI services, Hugging Face Transformers, and more.'
  }
];
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        {question}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2 text-indigo-500"
        >
          ▼
        </motion.span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}
export default function AIPoweredSolutionsPage() {
  const isMobile = useIsMobile();
  const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "RC Tech Solutions",
    "image": "https://www.rctechsolutions.com/rclogo.png",
    "url": "https://www.rctechsolutions.com/services/ai-powered",
    "telephone": "+91-7009646377",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chandigarh",
      "addressRegion": "Chandigarh",
      "postalCode": "160061",
      "addressCountry": "IN"
    },
    "priceRange": "$$",
    "description": "AI-powered solutions provider offering AI Chatbots, NLP, Computer Vision, ML Models, and Predictive Analytics.",
    "areaServed": ["IN"],
    "sameAs": [
      "https://www.instagram.com/rc_tech_solutions",
      "https://www.linkedin.com/company/rctechsolutions"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Powered Solutions | RC Tech Solutions",
    "url": "https://www.rctechsolutions.com/services/ai-powered",
    "description": "Hire top-rated AI development company for NLP, AI Chatbots, Computer Vision, Machine Learning, and Predictive Analytics.",
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://www.rctechsolutions.com"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    
    "author": {
      "@type": "Organization",
      "name": "RC Tech Solutions"
    },

  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.rctechsolutions.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Powered Solutions",
        "item": "https://www.rctechsolutions.com/services/ai-powered"
      }
    ]
  }
];


function ServiceCard({ icon: Icon, title, description, color, delay = 0 }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 ease-in-out overflow-hidden"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full pointer-events-none`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`} />
      <div className="text-3xl mb-4 text-indigo-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500" />
      </div>
    </motion.div>
  );

  
}; // Keep your existing SEO schema
  return (
    <>
    
      <SeoSchema schemas={schemas} />
      
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-4 sm:px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-center lg:text-left w-full lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              AI-Powered Solutions<br />That Drive <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Transform your business with our AI Chatbots, NLP Solutions, Predictive Analytics, and Custom AI Software Development.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[#151b55] border border-[#2d3473] px-6 py-8 md:px-8 md:py-10 rounded-xl text-left w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">Hire Dedicated AI Teams or Get Project-Based AI Consulting</h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Contact Our AI Experts →
            </button>
          </motion.div>
        </div>
      </section>
      <section className="bg-[#f9f9f9] py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold leading-tight mb-12">
            AI-Powered Services
          </motion.h2>
          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard {...service} delay={0.2 + index * 0.1} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} delay={0.4 + index * 0.1} />
              ))}
            </div>
          )}
        </div>
      </section>
         {/* FAQs Section with Animation */}
      <section className="py-16 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-8"
          >
            Frequently Asked Questions (FAQs)
          </motion.h2>
          <div className="text-left">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
<section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-3xl md:text-4xl font-bold mb-4"
  >
    Ready to Transform Your Business with AI?
  </motion.h2>
  <p className="mb-6 text-lg">Contact RC Tech Solutions today for a free consultation and discover how our AI-powered solutions can drive growth.</p>
  <motion.a
    href="/contact"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white shadow-lg transition duration-300"
  >
    Get a Free AI Consultation →
  </motion.a>
</section>
    </>
  );
}
