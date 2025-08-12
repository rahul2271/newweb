'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What services does RC Tech Solutions offer?',
    answer: (
      <>
        We specialize in{' '}
        <Link target='_blank' href="/services/web-development" className="text-purple-400 hover:underline">
          web development
        </Link>
        ,{' '}
        <Link target='_blank' href="/services/seo" className="text-purple-400 hover:underline">
          SEO services
        </Link>
        ,{' '}
        <Link target='_blank' href="/services/digital-marketing" className="text-purple-400 hover:underline">
          digital marketing
        </Link>
        ,
        ,{' '}
        <Link target='_blank' href="/services/cloud-integration" className="text-purple-400 hover:underline">
          cloud integration
        </Link>{' '}
        and{' '}
        <Link target='_blank' href="/services/web-development" className="text-purple-400 hover:underline">
          custom web development
        </Link>{' '}
        under the leadership of Rahul Chauhan.
      </>
    ),
  },
  {
    question: 'How do I get started with a project?',
    answer:
      'Simply fill out our contact form or book a consultation call. Our team at RC Tech Solutions will guide you step by step through the onboarding and project discovery process.',
  },
  {
    question: 'What is the typical website development timeline?',
    answer:
      'Depending on complexity, most website projects take between 3 to 8 weeks. Larger or more custom web apps may take several months. We always share a detailed project timeline upfront.',
  },
  {
    question: 'How much does a website or digital marketing project cost?',
    answer:
      'Our pricing is completely customized. After understanding your goals, scope, and requirements, we provide a tailored quote that suits your business and budget.',
  },
  {
    question: 'Do you offer SEO services as part of website development?',
    answer:
      'Yes! All websites we build are SEO-optimized by default. We also offer advanced SEO packages including keyword research, on-page SEO, and content strategy to help you rank on Google.',
  },
  {
    question: 'Do you provide ongoing support and website maintenance?',
    answer:
      'Absolutely! RC Tech Solutions offers website maintenance, performance monitoring, updates, and continuous technical support even after project delivery.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer:
      'Yes! Whether your site looks outdated or isn’t performing, our team specializes in website redesigns focused on better UI/UX, faster load times, and improved conversion rates.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Of course. We love working with startups, entrepreneurs, and small businesses looking to scale online. Rahul Chauhan personally reviews small business digital growth plans.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'We’ve worked with clients in eCommerce, healthcare, SaaS, education, finance, and many more. Our solutions are flexible and industry-agnostic.',
  },
  {
    question: 'Do you offer content creation and copywriting services?',
    answer:
      'Yes, we have a dedicated content and copywriting team that creates SEO-focused website content, blog posts, product descriptions, and ad copy for your brand.',
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-12">
        Frequently Asked Questions about RC Tech Solutions
      </h2>

      <div className="max-w-2xl mx-auto space-y-6">
        {displayedFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-gray-300"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center space-x-2">
                <FaQuestionCircle className="text-purple-600" />
                <span className="font-medium text-gray-200">{faq.question}</span>
              </div>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-purple-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: activeIndex === index ? 'auto' : 0,
                opacity: activeIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden p-4 text-gray-300"
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        ))}

        {faqs.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-black hover:scale-105 transition-transform"
            >
              {showAll ? 'Show Less FAQs' : 'Show More FAQs'}
            </button>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-gray-200">
          Still have questions?{' '}
          <a
            href="/contact"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-semibold"
          >
            Contact RC Tech Solutions
          </a>
        </p>
      </div>
    </div>
  );
};

export default FaqSection;
