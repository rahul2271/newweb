'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaAws,
  FaCloud,
  FaLock,
  FaServer,
  FaRocket,
  FaArrowRight,
} from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SeoSchema from '../../components/SeoSchema';

const faqs = [
  { question: 'What is cloud integration?', answer: 'Cloud integration connects multiple cloud-based systems and on-premises applications to function as a cohesive unit.' },
  { question: 'Which cloud platforms do you support?', answer: 'We support AWS, Microsoft Azure, Google Cloud Platform, and more.' },
  { question: 'What is Kubernetes orchestration?', answer: 'Kubernetes orchestrates the deployment, scaling, and management of containerized applications.' },
  { question: 'How secure are your cloud integration solutions?', answer: 'We follow industry best practices with encryption, identity management, and threat detection for high-level cloud security.' },
  { question: 'Do you provide disaster recovery solutions?', answer: 'Yes, we offer disaster recovery and backup solutions to minimize downtime and data loss.' },
  { question: 'Can you help migrate our existing infrastructure to the cloud?', answer: 'Absolutely! We provide seamless cloud migration services with minimal business disruption.' },
  { question: 'Do you offer cloud cost optimization services?', answer: 'Yes, we help optimize cloud resource usage and reduce operational costs.' },
  { question: 'What industries do you serve for cloud integration?', answer: 'We serve industries like Healthcare, Finance, Retail, E-commerce, Education, and more.' },
  { question: 'Do you offer 24/7 cloud support?', answer: 'Yes, we provide round-the-clock support and cloud infrastructure monitoring.' },
  { question: 'How long does cloud migration usually take?', answer: 'Timelines depend on project complexity, typically ranging from a few weeks to a few months.' },
  { question: 'Can you integrate legacy systems with modern cloud services?', answer: 'Yes, we specialize in hybrid integrations connecting legacy applications with modern cloud platforms.' },
  { question: 'Do you offer DevOps and CI/CD integration in cloud projects?', answer: 'Yes, we help set up CI/CD pipelines and integrate DevOps practices within cloud environments.' },
  { question: 'Is multi-cloud deployment possible?', answer: 'Absolutely! We design and manage multi-cloud architectures as per your business needs.' },
  { question: 'Do you offer performance monitoring after deployment?', answer: 'Yes, we provide continuous performance tracking, logging, and analytics post-deployment.' },
  { question: 'What is your pricing model for cloud services?', answer: 'We offer flexible engagement models including fixed price, hourly billing, and dedicated resource hiring.' }
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

const cloudFeatures = [
  { title: 'AWS & Azure Cloud', icon: FaAws, color: 'from-orange-400 to-yellow-500' },
  { title: 'Cloud Storage & Backup', icon: FaCloud, color: 'from-blue-400 to-cyan-600' },
  { title: 'Kubernetes Orchestration', icon: SiKubernetes, color: 'from-indigo-500 to-purple-600' },
  { title: 'Cloud Security', icon: FaLock, color: 'from-green-400 to-teal-500' },
  { title: 'Scalable Infrastructure', icon: FaServer, color: 'from-gray-500 to-gray-700' },
  { title: 'Cloud Performance Optimization', icon: FaRocket, color: 'from-pink-500 to-red-600' },
];

function FeatureCard({ icon: Icon, title, color, delay = 0 }) {
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
      className="relative group p-6 border border-transparent bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer"
    >
      <motion.div
        className={`absolute left-0 top-0 w-2 h-2 bg-gradient-to-r ${color} rounded-full`}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 40, stiffness: 300, mass: 0.5 }}
        style={{ zIndex: 10 }}
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
      />
      <div className="text-3xl mb-4 text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-800">
        Learn More
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-600" />
      </div>
    </motion.div>
  );
}

export default function CloudIntegrationPage() {
  const isMobile = useIsMobile();

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'RC Tech Solutions',
      url: 'https://www.rctechsolutions.com/services/cloud-integration',
      image: 'https://www.rctechsolutions.com/logo.png',
      description:
        'RC Tech Solutions offers enterprise-grade cloud integration services including AWS, Azure, Kubernetes, cloud security, and infrastructure optimization.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi',
        addressRegion: 'Delhi',
        postalCode: '110001',
        addressCountry: 'IN'
      },
      telephone: '+91-7009646377',
      areaServed: ['IN'],
      priceRange: '$$',
      sameAs: [
        'https://www.instagram.com/rc_tech_solutions',
        'https://www.linkedin.com/company/rctechsolutions'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.rctechsolutions.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Cloud Integration',
          item: 'https://www.rctechsolutions.com/services/cloud-integration'
        }
      ]
    }
  ];

  return (
    <>
      <SeoSchema schemas={schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-white px-6 md:px-16 py-20 overflow-hidden md:pt-[180px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0c0e10] to-gray-900 z-0" />
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/grid-lines.svg')] bg-cover bg-center" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left w-full lg:w-2/3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-[#2d3473] rounded-full text-sm bg-[#151b55] text-white/80">
              Trusted Cloud Integration Experts with <span className="text-blue-400 font-semibold">seamless migration</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Cloud Integration Solutions<br />
              That Accelerate Your{' '}
              <span className="bg-gradient-to-r from-[#3f83f8] to-[#a855f7] bg-clip-text text-transparent">Business Growth</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We help you unify your cloud services with secure, scalable, and performance-driven integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151b55] border border-[#2d3473] px-8 py-10 rounded-xl text-left w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white leading-snug mb-6">
              Connect your apps,<br />
              migrate data &<br />
              <span className="underline decoration-lime-300">secure your cloud</span>
            </h3>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 w-full shadow-lg">
              Talk to Our Experts →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f9f9f9] py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          >
            Cloud Integration Features
          </motion.h2>

          {isMobile ? (
            <Swiper spaceBetween={20} slidesPerView={1.2} loop>
              {cloudFeatures.map((feature, index) => (
                <SwiperSlide key={index}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    color={feature.color}
                    delay={0.2 + index * 0.1}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cloudFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  color={feature.color}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

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
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready for Seamless Cloud Integration?
        </motion.h2>
        <p className="mb-6 text-lg">Let RC Tech Solutions handle your cloud migration, security, and optimization needs. Connect with us today!</p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white shadow-lg transition duration-300"
        >
          Get a Free Cloud Consultation →
        </motion.a>
      </section>
    </>
  );
}