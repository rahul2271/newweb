'use client'
import { useState } from 'react';
import { FaQuestionCircle, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We offer web development, digital marketing, SEO, and custom video editing services. We work with you to build solutions tailored to your business.',
  },
  {
    question: 'How do I get started?',
    answer:
      'To start working with us, simply reach out through the contact form or book a consultation call. We’ll guide you through the planning process.',
  },
  {
    question: 'What is your pricing?',
    answer:
      'Our pricing depends on the scope of the project. We offer customized solutions to suit your needs and budget. Contact us for a free consultation.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'The timeline varies based on the complexity of the project. Typically, it ranges from a few weeks to a few months. We’ll provide a more detailed timeline after understanding your requirements.',
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black  py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-12">Frequently Asked Questions</h2>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-gray-300"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer  transition-all"
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
      </div>

      {/* CTA Section */}
      <div className="text-center mt-10">
        <p className="text-lg text-gray-200">
          Didn’t find what you’re looking for?{' '}
          <a
            href="#"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-semibold "
          >
            Chat with Us
          </a>
        </p>
      </div>
    </div>
  );
};

export default FaqSection;
