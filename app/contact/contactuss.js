"use client";
import Head from "next/head";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Format as required by SheetDB API
    const payload = {
      data: {
        name: data["data[name]"],
        email: data["data[email]"],
        phone: data["data[phone]"],
        contact_method: data["data[contact_method]"],
        message: data["data[message]"],
      },
    };

    try {
      const res = await fetch("https://sheetdb.io/api/v1/nac4zyu6aoaoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        e.target.reset(); // clear form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | RC Tech Solutions</title>
        <meta
          name="description"
          content="Contact RC Tech Solutions for expert web development, software consulting, IT services, and digital transformation. Let’s build your next big idea together."
        />
        <meta
          name="keywords"
          content="RC Tech Solutions, Contact, Web Development India, Software Company, IT Consulting, Tech Support"
        />
        <link rel="canonical" href="https://www.rctechsolutions.com/contact" />
      </Head>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://pagedone.io/asset/uploads/1696488602.png"
              alt="RC Tech Office"
              className="w-full h-full object-cover lg:rounded-l-2xl"
            />
            <h1 className="absolute top-10 left-10 text-white text-4xl font-bold">Contact RC Tech Solutions</h1>
            <div className="absolute bottom-0 w-full bg-white bg-opacity-90 backdrop-blur-lg p-6 lg:p-10 rounded-t-2xl">
              <div className="space-y-4 text-gray-800">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  +91-7009646377
                </div>
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  business@rctechsolutions.com
                </div>
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  Mohali, Punjab
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-gray-50 p-6 lg:p-10 rounded-2xl shadow">
            {submitted ? (
              <div className="text-green-600 text-xl font-semibold">
                🎉 Thank you! Your message has been submitted. We’ll get back to you within 24 hours.
              </div>
            ) : (
              <>
                <h2 className="text-indigo-600 text-3xl font-semibold mb-6">
                  Let’s Build Something Great Together
                </h2>
                <p className="text-gray-600 mb-6">
                  Whether you're looking for a new website, IT solution, or digital upgrade — we’re just one message away.
                  Expect a response within 24 hours.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="data[name]"
                    required
                    placeholder="Your Name"
                    className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="data[email]"
                    required
                    placeholder="Email Address"
                    className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="data[phone]"
                    placeholder="Phone Number"
                    className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                  />

                  <div>
                    <h4 className="text-gray-600 font-medium mb-2">Preferred Contact Method</h4>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input type="radio" name="data[contact_method]" value="Email" className="mr-2" /> Email
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="data[contact_method]" value="Phone" className="mr-2" /> Phone
                      </label>
                    </div>
                  </div>

                  <textarea
                    name="data[message]"
                    required
                    placeholder="Your Message"
                    rows="4"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}