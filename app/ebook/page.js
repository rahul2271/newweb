"use client";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import {
  Star, Lock, Zap, BookOpen, Shield, Gift, Users, Award, CheckCircle
} from "lucide-react";
import { Imprima } from "next/font/google";
import { NextSeo } from 'next-seo';
<NextSeo
  title="Learn to Code, Earn from Code | Student Developer eBook"
  description="Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips."
  canonical="https://www.rctechsolutions.com/ebook"
  openGraph={{
    url: 'https://www.rctechsolutions.com/ebook',
    title: 'Learn to Code, Earn from Code | Student Developer eBook',
    description:
      'Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips.',
    site_name: 'RC Tech Solutions',
  }}
/>

export default function EbookPage() {
  const [basePrice, setBasePrice] = useState(100); // default ₹199.00
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

const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Learn to Code, Earn from Code - Student Developer eBook",
    image: "https://www.rctechsolutions.com/ebookpdf.jpg",
    description:
      "A complete guide for students to learn coding and earn from their skills. Includes 120+ pages, earning strategies, and bonus resources.",
    brand: {
      "@type": "Brand",
      name: "RC Tech Solutions",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.rctechsolutions.com/ebook",
      priceCurrency: "INR",
      price: "1",
      priceValidUntil: "2025-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

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
    if (finalPrice < 100 && finalPrice !== 0) {
      alert("Minimum payable amount is ₹1 (before GST).");
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
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  return (
    <>
     <Head>
        <title>Learn to Code, Earn from Code | Student Developer eBook</title>
        <meta
          name="description"
          content="Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips."
        />
        <meta
          name="keywords"
          content="learn coding, earn from coding, student developer ebook, programming for students, coding guide, web development ebook"
        />
        <link rel="canonical" href="https://www.rctechsolutions.com/ebook" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center p-6 relative">
      
      {/* Sticky urgency banner */}
      <div className="top-0 w-full text-purple-900 text-center py-3 px-4 text-sm font-medium z-50 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 shadow-sm bg-white rounded-xl">
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          🚀 Free for limited period of time
        </span>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          🎯 {copiesLeft} left — Once it’s gone, it’s gone forever
        </span>
        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
          ⏳ {formatTime(countdown)}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
          💡 Pay what you can — even ₹1 — learning for all
        </span>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full mt-16 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 blur-3xl rounded-full opacity-50"></div>

        <div className="flex flex-wrap gap-3 mt-5 mb-4">
          <span className="bg-green-600/20 text-green-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Users className="w-4 h-4" /> Trusted by 30+ coding clubs
          </span>
          <span className="bg-yellow-600/20 text-yellow-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Award className="w-4 h-4" /> Endorsed by top developers
          </span>
          <span className="bg-red-600/20 text-red-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Award className="w-4 h-4" /> Students Centric
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <img
            src="/ebookpdf.jpg"
            alt="Student Developer eBook"
            className="rounded-xl w-[220px] shadow-lg border border-purple-200"
          />
          <div className="flex-1">
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-yellow-400 w-5 h-5"
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                (200+ Verified Student Reviews)
              </span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-purple-700 leading-snug">
              Learn to Code, Earn from Code 
            </h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Exclusive for students who want to master coding skills and
              convert them into real income — without wasting years guessing what works.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-purple-600" /> 120+ pages
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-purple-600" /> Actionable tips
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-purple-600" /> Secure payment
              </span>
              <span className="flex items-center gap-1">
                <Gift className="w-4 h-4 text-purple-600" /> Bonus templates
              </span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
          <div className="text-2xl font-bold text-gray-800 flex flex-col items-center sm:items-start">
            <span className="text-gray-500 text-sm line-through">
              Student Price ₹499.00
            </span>
            <span className="text-green-600 text-3xl">
              ₹{(finalPrice / 100).toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              *Support fee only — you set your own price so everyone can afford it 💜
            </span>
          </div>
          <button
            onClick={openCheckout}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg mt-4 sm:mt-0 font-semibold animate-pulse"
          >
            {finalPrice === 0 ? "Get Student Access" : "Buy Now"}
          </button>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
          <Lock className="w-3 h-3" /> Secure checkout • Instant email delivery
        </p>
      </div>

      {/* Checkout Form */}
      {checkoutOpen && (
        <div
          ref={formRef}
          className="inset-0 pt-20 flex items-end sm:items-center justify-center z-50"
        >
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:w-[450px] p-6 animate-slideUp">
            <h2 className="text-lg font-bold mb-4">Complete Your Access</h2>
            <p className="text-sm text-gray-600 mb-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
              💡 <strong>Note:</strong> This eBook is <strong>not for profit</strong>.  
              You can choose any amount you’re comfortable with — even ₹1 — so that
              every student can afford it. Our goal is to make sure
              <strong> everyone has access</strong>, regardless of financial situation.
            </p>
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
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Discount Code"
                className="border rounded-lg p-3 flex-grow"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                onClick={applyDiscount}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900"
              >
                Apply
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p>Base Price: ₹{(basePrice / 100).toFixed(2)}</p>
              <p>GST (18%): ₹{(gstAmount / 100).toFixed(2)}</p>
              <h2 className="text-lg font-bold mt-2">
                Total: ₹{(finalPrice / 100).toFixed(2)}
              </h2>
            </div>
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

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
    </>
  );
}
