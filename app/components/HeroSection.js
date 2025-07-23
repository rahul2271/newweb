'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    try {
      const res = await fetch('https://sheetdb.io/api/v1/0arxv3vf8lrsq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      });

      if (res.ok) {
        setShowModal(true);
        form.reset();
      } else {
        alert('⚠️ Submission failed.');
      }
    } catch (error) {
      console.error(error);
      alert('⚠️ Something went wrong.');
    }
  };


export default function DataAnalytics() {
  

  return (
    <>
      <Head>
        <title>Data Analytics</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600;900&display=swap"
          rel="stylesheet"
        />
      </Head>

   
        {/* Header Section */}
        <header className="header-section">
          <div className="header-content">
            {/* Navbar */}
            

            {/* Hero Section */}
            <div className="hero-container p-15">
              <div className="hero-left">
                <div className="version highlight">
                  <Image src="./edit-brightness.svg" alt="version" width={20} height={20} />
                  <span>v3.1 released. <a href="/">Learn more</a></span>
                </div>
                <h1 className="hero-heading">
                  <span>Turning ideas</span> into Digital Reality
                </h1>
                <p className="hero-description">
                  <span>Modern, scalable, and SEO-optimized websites for businesses of every size.</span>
                </p>
                <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your business email"
              className="w-full sm:w-[300px] rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="btn hero-btn-1"
            >
              Consult Now
            </button>
          </form>

              
              </div>
              <img src="./image 1.png" alt="hero-image" width={400} height={300} className="hero-img" />
            </div>
          </div>
          
        </header>

        {/* Main & Section content here -- You can use similar logic to wrap mid sections */}

        {/* Footer Section */}
      
      
    </>
  );
}
