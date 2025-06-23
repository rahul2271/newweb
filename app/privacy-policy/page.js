import Head from 'next/head';

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "We may collect personal information like your name, email, phone number, and business details you provide directly.",
      "We automatically collect technical data like IP address, browser, device type, and usage behavior via cookies and analytics tools.",
      "We may also receive information from third-party platforms or integrations when you engage with our services.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To provide and improve our services, respond to inquiries, process payments, and send service-related or promotional messages (only with your consent).",
      "To ensure security, prevent fraud, and comply with legal obligations.",
    ],
  },
  {
    title: "3. Legal Basis for Processing (EU/EEA)",
    content: [
      "We rely on consent, contractual necessity, legitimate interest, and legal obligations as legal bases for processing data under GDPR.",
    ],
  },
  {
    title: "4. Sharing Your Information",
    content: [
      "We do not sell your personal data. We may share it with trusted service providers and legal authorities as required.",
    ],
  },
  {
    title: "5. Cookies and Tracking",
    content: [
      "We use cookies to enhance user experience. You can manage cookie settings via your browser.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain data only as long as necessary for the stated purposes or as required by law.",
    ],
  },
  {
    title: "7. Your Privacy Rights",
    content: [
      "You may have the right to access, correct, delete your data, or object to its processing based on your region.",
      "Contact us to exercise your rights.",
    ],
  },
  {
    title: "8. Data Security",
    content: [
      "We implement strong security measures to protect your personal information from unauthorized access or loss.",
    ],
  },
  {
    title: "9. International Data Transfers",
    content: [
      "Your data may be transferred outside your country. We ensure appropriate safeguards are in place for international transfers.",
    ],
  },
  {
    title: "10. Children’s Privacy",
    content: [
      "Our services are not intended for children under 13. We do not knowingly collect data from minors.",
    ],
  },
  {
    title: "11. Changes to This Policy",
    content: [
      "We may update this policy. Changes will be posted with the revised effective date. Please review periodically.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | RC Tech Solutions</title>
        <meta name="description" content="Global Privacy Policy of RC Tech Solutions" />
      </Head>

      <main className="min-h-screen px-6 py-12 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-8">Global Privacy Policy</h1>
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
            <p className="text-gray-700">For questions or concerns, contact us at:</p>
            <p className="mt-1 text-purple-700 font-medium">business@rctechsolutions.com</p>
            <p>
              Website:{' '}
              <a href="https://www.rctechsolutions.com" className="text-blue-600 underline">
                www.rctechsolutions.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
