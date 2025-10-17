'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function DataAnalytics() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    setSubmitting(true);
    setSuccessMessage('');

    try {
      const res = await fetch('https://sheetdb.io/api/v1/7tneevoxn7zax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      });

      if (res.ok) {
        setShowModal(true);
        form.reset();
        setSuccessMessage('Thank you for your submission!');
      } else {
        alert('⚠️ Submission failed.');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Data Analytics</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="header-section">
        <div className="header-content">
          {/* Hero Section */}
          <div className="hero-container p-15 flex flex-col md:flex-row items-center justify-between">
            <div className="hero-left max-w-xl">
              <div className="version highlight flex items-center space-x-2 mb-3">
                <Image
                  src="/edit-brightness.svg"
                  alt="version"
                  width={20}
                  height={20}
                  priority={true}
                />
                <span className="text-sm text-gray-700">
                  v3.1 released.&nbsp;
                  <a
                    href="/"
                    className="text-indigo-600 hover:underline"
                  >
                    Learn more
                  </a>
                </span>
              </div>

              <h1 className="hero-heading text-4xl font-extrabold leading-tight text-gray-900">
                <span className="block text-base font-light mb-1">
                  Transform Your Vision with
                </span>
                The Best Software Development Company
              </h1>

              <p className="hero-description mt-4 text-lg text-gray-700">
                We create modern, scalable, and SEO-optimized websites and
                applications for businesses of every size.&nbsp;
                <span className="font-semibold">As a trusted IT solutions company in India</span>, we
                combine innovation with technology to bring your digital ideas
                to life.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-4"
                aria-label="Consultation Form"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your business email"
                  disabled={submitting}
                  className="w-full sm:w-[300px] rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  aria-label="Email Address"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className={`btn hero-btn-1 rounded-full px-6 py-3 text-white font-semibold transition ${
                    submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  aria-live="polite"
                >
                  {submitting ? 'Submitting...' : 'Consult Now'}
                </button>
              </form>

              {/* Success message for screen readers */}
              {successMessage && (
                <p
                  role="alert"
                  className="mt-4 text-green-600 font-medium"
                >
                  {successMessage}
                </p>
              )}
            </div>

            <div className="hero-right mt-8 md:mt-0">
              <Image
                src="/image 1.png"
                alt="hero-image"
                width={400}
                height={300}
                className=""
                priority={true} // Preload main hero image for faster LCP
              />
            </div>
          </div>
        </div>
      </header>

      {/* Modal with smooth fade transition */}
      {showModal && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-100 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalHeading"
        >
          <div className="modal-content bg-white rounded-lg p-6 max-w-sm text-center shadow-lg transform transition-transform duration-300 scale-100">
            <h2
              id="modalHeading"
              className="mb-4 text-lg font-semibold text-gray-900"
            >
              Thank you for your submission!
            </h2>
            <button
              className="btn px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setShowModal(false)}
              autoFocus
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
