// components/terms-of-service/index.js

import React from 'react';

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the services provided by RC Tech Solutions ('we', 'our', 'us'), you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, you must not use our services.",
    ],
  },
  {
    title: "2. Services",
    content: [
      "RC Tech Solutions offers web development, digital marketing, SEO, branding, and related digital services. We reserve the right to modify or discontinue any service at any time without prior notice.",
    ],
  },
  {
    title: "3. User Responsibilities",
    content: [
      "You agree to provide accurate and complete information when engaging with our services.",
      "You are responsible for maintaining the confidentiality of any account credentials and activities that occur under your account.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content, trademarks, designs, code, and materials created or displayed by RC Tech Solutions remain our intellectual property unless otherwise agreed upon in writing.",
      "You may not copy, reproduce, or redistribute our intellectual property without express permission.",
    ],
  },
  {
    title: "5. Payments and Refunds",
    content: [
      "All payments must be made upfront or as per the mutually agreed contract.",
      "Refunds will be granted only if we fail to deliver as per the terms of agreement and after reviewing the case.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "RC Tech Solutions shall not be liable for any indirect, incidental, or consequential damages arising out of or related to your use of our services.",
    ],
  },
  {
    title: "7. Termination",
    content: [
      "We reserve the right to suspend or terminate services to any client who violates these Terms or engages in abusive, illegal, or harmful conduct.",
    ],
  },
  {
    title: "8. Changes to Terms",
    content: [
      "We may update these Terms of Service from time to time. The updated version will be posted on our website with the revised date.",
    ],
  },
  {
    title: "9. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of [Your City, India].",
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen px-6 py-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-6">Effective Date: June 23, 2025</p>

        {sections.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{section.title}</h2>
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              {section.content.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-700">If you have any questions about these Terms, contact us at:</p>
          <p className="mt-1 text-purple-700 font-medium">business@rctechsolutions.com</p>
          <p>
            Website:{' '}
            <a href="https://www.rctechsolutions.com" className="text-blue-600 underline">
              www.rctechsolutions.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
