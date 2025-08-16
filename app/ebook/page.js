"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { NextSeo } from "next-seo";
import { Star, Lock, Zap, BookOpen, Shield, Gift, Users, Award } from "lucide-react";

export default function EbookPage() {
  const [basePrice, setBasePrice] = useState(100); // default ₹1.00
  const [gstAmount, setGstAmount] = useState(basePrice * 0.18);
  const [finalPrice, setFinalPrice] = useState(basePrice + gstAmount);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [copiesLeft, setCopiesLeft] = useState(47);

  const formRef = useRef(null);

  // Update GST & final price when base price changes
  useEffect(() => {
    const gst = basePrice * 0.18;
    setGstAmount(gst);
    setFinalPrice(basePrice + gst);
  }, [basePrice]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "FIRST10") {
      setBasePrice(0);
      setFinalPrice(0);
      setGstAmount(0);
      alert("🎉 Coupon applied! You get this for free.");
    } else {
      alert("❌ Invalid coupon code");
    }
  };

  const sendEbookDirect = async () => {
    setLoading(true);
    const res = await fetch("/api/sendEbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: "FREE_COUPON", email, name }),
    });
    setLoading(false);

    if (res.ok) {
      alert("✅ eBook sent to your email!");
      setCheckoutOpen(false);
    } else {
      alert("❌ Failed to send email");
    }
  };

  const handlePayment = () => {
    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }

    if (finalPrice === 0) {
      sendEbookDirect();
      return;
    }

    const options = {
      key: "rzp_live_R5X3mt2251rX6I",
      amount: Math.round(finalPrice),
      currency: "INR",
      name: "RC Tech Solutions",
      description: "Student Developer eBook",
      handler: async function (response) {
        alert("✅ Payment successful!");
        setLoading(true);
        await fetch("/api/sendEbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            email,
            name,
          }),
        });
        setLoading(false);
        setCheckoutOpen(false);
      },
      prefill: { name, email, contact: "" },
      theme: { color: "#953ee2" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const openCheckout = () => {
    setCheckoutOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <>
      <NextSeo
        title="Learn to Code, Earn from Code | Student Developer eBook"
        description="Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips."
        canonical="https://www.rctechsolutions.com/ebook"
        openGraph={{
          url: "https://www.rctechsolutions.com/ebook",
          title: "Learn to Code, Earn from Code | Student Developer eBook",
          description:
            "Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips.",
          site_name: "RC Tech Solutions",
        }}
      />

      <Head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Learn to Code, Earn from Code - eBook",
              image: "https://www.rctechsolutions.com/ebookpdf.jpg",
              description:
                "A complete guide for students to learn coding and earn from skills.",
              brand: { "@type": "Brand", name: "RC Tech Solutions" },
              offers: {
                "@type": "Offer",
                url: "https://www.rctechsolutions.com/ebook",
                priceCurrency: "INR",
                price: finalPrice === 0 ? "0" : (finalPrice / 100).toFixed(2),
                priceValidUntil: "2025-12-31",
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center p-6 relative">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full mt-16 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <img
              src="/ebookpdf.jpg"
              alt="Student Developer eBook"
              className="rounded-xl w-[220px] shadow-lg border border-purple-200"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-purple-700 leading-snug">
                Learn to Code, Earn from Code
              </h1>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Exclusive for students who want to master coding skills and convert them into real income.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
            <div className="text-2xl font-bold text-gray-800 flex flex-col items-center sm:items-start">
              <span className="text-green-600 text-3xl">
                ₹{(finalPrice / 100).toFixed(2)}
              </span>
            </div>
            <button
              onClick={openCheckout}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg mt-4 sm:mt-0 font-semibold animate-pulse"
            >
              {finalPrice === 0 ? "Get Student Access" : "Buy Now"}
            </button>
          </div>
        </div>

        {checkoutOpen && (
          <div ref={formRef} className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">
              <h2 className="text-lg font-bold mb-4 text-center">Complete Your Access</h2>
              <input
                type="text"
                placeholder="Your Full Name"
                className="border rounded-lg p-3 w-full mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border rounded-lg p-3 w-full mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Your Price (₹)"
                className="border rounded-lg p-3 w-full mb-3"
                min="1"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= 1) {
                    setBasePrice(val * 100);
                  } else {
                    setBasePrice(100);
                  }
                }}
              />
              <button
                onClick={applyDiscount}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full mb-3"
              >
                Apply Discount
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-lg w-full font-semibold"
              >
                {loading
                  ? "Processing..."
                  : finalPrice === 0
                  ? "Get for Free"
                  : "Proceed to Payment"}
              </button>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="w-full mt-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
