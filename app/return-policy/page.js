import Head from "next/head";

const sections = [
  {
    title: "1. Digital Product Nature",
    content: [
      "All products sold on RC Tech Solutions are digital in nature (e-books, downloadable resources, or online content).",
      "Once a digital product is delivered or accessed, it cannot be physically returned.",
    ],
  },
  {
    title: "2. No-Return Policy",
    content: [
      "Due to the nature of digital products, all sales are final and non-returnable once the product has been accessed or downloaded.",
    ],
  },
  {
    title: "3. Refund Eligibility",
    content: [
      "Refunds are only considered in exceptional cases such as duplicate payments or technical delivery failures where the customer did not receive access to the product.",
      "Refund requests must be made within 7 days of purchase.",
    ],
  },
  {
    title: "4. How to Request a Refund",
    content: [
      "To request a refund, please contact us via email with your full name, transaction ID, date of purchase, and the reason for your request.",
      "Requests without proper details may be delayed or rejected.",
    ],
  },
  {
    title: "5. Refund Processing",
    content: [
      "If approved, refunds will be processed to the original payment method.",
      "Refunds may take 5–10 business days to reflect, depending on your payment provider or bank.",
    ],
  },
  {
    title: "6. Non-Refundable Cases",
    content: [
      "Refunds will not be granted for change of mind, lack of usage, device incompatibility, or dissatisfaction after access.",
    ],
  },
  {
    title: "7. Fraud Prevention",
    content: [
      "We reserve the right to deny refund requests that show signs of abuse, repeated refund attempts, or fraudulent behavior.",
    ],
  },
  {
    title: "8. Policy Updates",
    content: [
      "We may update this Return & Refund Policy from time to time.",
      "Any changes will be posted on this page with an updated effective date.",
    ],
  },
];

export default function ReturnPolicy() {
  return (
    <>
      <Head>
        <title>Return & Refund Policy | RC Tech Solutions</title>
        <meta
          name="description"
          content="Return and Refund Policy for digital products sold by RC Tech Solutions"
        />
      </Head>

      <main className="min-h-screen px-6 py-12 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-8">
            Return & Refund Policy
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Effective Date: June 23, 2025
          </p>

          {sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                {section.content.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">For refund-related queries, contact:</p>
            <p className="mt-1 text-purple-700 font-medium">
              business@rctechsolutions.com
            </p>
            <p>
              Website:{" "}
              <a
                href="https://www.rctechsolutions.com"
                className="text-blue-600 underline"
              >
                www.rctechsolutions.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
