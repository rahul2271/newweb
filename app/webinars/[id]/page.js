"use client"
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WebinarPage({ params: paramsPromise }) {
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    paramsPromise.then((p) => setId(p.id));
  }, [paramsPromise]);

  useEffect(() => {
    if (!id) return;
    const fetchWebinar = async () => {
      try {
        const res = await fetch(`/api/webinars?id=${id}`);
        const data = await res.json();
        setWebinar(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load webinar.");
      } finally {
        setLoading(false);
      }
    };
    fetchWebinar();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.contact) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webinarId: webinar.id, amount: webinar.price, ...formData }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Payment failed");

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: webinar.title,
        description: webinar.description,
        order_id: data.order_id,
        prefill: { ...formData },
        handler: (response) => {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          router.push(`/webinars/live/${webinar.id}`);
        },
        theme: { color: "#6B21A8" },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else alert("Razorpay SDK not loaded. Refresh page.");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-10 text-center text-lg">Loading webinar details...</p>;
  if (!webinar) return <p className="p-10 text-center text-lg">Webinar not found.</p>;

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-16">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12"
      >
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">{webinar.title}</h1>
          <p className="text-lg md:text-xl text-gray-700">{webinar.description}</p>
          <p className="text-gray-500">Speaker: <strong>{webinar.speaker}</strong></p>
          <p className="text-gray-400">Date: {new Date(webinar.date).toLocaleDateString("en-GB")}</p>
          <p className="text-4xl font-bold text-purple-700">₹{webinar.price}</p>
          <p className="text-sm text-gray-500">Secure your seat now! Limited slots available.</p>
        </div>

        <motion.div 
          className="flex-1 bg-white p-8 rounded-2xl shadow-xl w-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Reserve Your Spot</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 mb-3 rounded border border-gray-300 focus:ring-2 focus:ring-purple-400"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 mb-3 rounded border border-gray-300 focus:ring-2 focus:ring-purple-400"/>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full p-3 mb-3 rounded border border-gray-300 focus:ring-2 focus:ring-purple-400"/>
          <button 
            onClick={handlePayment} 
            disabled={submitting} 
            className={`w-full py-4 font-semibold text-white rounded-lg shadow-lg transition-all transform hover:scale-105 ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"}`}
          >
            {submitting ? "Processing..." : "Pay & Register"}
          </button>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8 }} 
        className="bg-white rounded-3xl shadow-2xl p-12 space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why You Can't Miss This Webinar</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li>💡 Expert insights and hands-on guidance from <strong>{webinar.speaker}</strong>.</li>
          <li>🚀 Practical skills you can implement immediately to see results.</li>
          <li>❓ Interactive Q&A session to resolve your doubts.</li>
          <li>🎁 Exclusive resources worth ₹2,000+ included.</li>
          <li>💰 Affordable at just ₹{webinar.price} — cheaper than private coaching!</li>
        </ul>
      </motion.section>

      {/* Scarcity / Urgency Section */}
      <motion.section 
        initial={{ x: -50, opacity: 0 }} 
        whileInView={{ x: 0, opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8 }}
        className="bg-purple-50 border-l-4 border-purple-600 p-10 rounded-3xl shadow-xl text-purple-800 space-y-4"
      >
        <h3 className="text-2xl font-bold">Hurry! Limited Seats Available</h3>
        <p>Join now to secure your spot and access all exclusive bonuses. Seats are filling fast!</p>
      </motion.section>

      {/* Bonus Section */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8 }}
        className="bg-yellow-50 rounded-3xl shadow-xl p-10 space-y-4 border-l-4 border-yellow-500"
      >
        <h3 className="text-2xl font-semibold text-yellow-800">Special Bonus for Registrants</h3>
        <p className="text-gray-700">Get eBooks, webinar recordings, and templates to reinforce your learning after the session. Everything delivered instantly after the webinar!</p>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-xl p-10 space-y-6"
      >
        <h3 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h3>
        <div className="space-y-4 text-gray-700">
          <p><strong>Q:</strong> How will I access the webinar?<br/><strong>A:</strong> You will receive a private link via email immediately after registration.</p>
          <p><strong>Q:</strong> Can I get a recording?<br/><strong>A:</strong> Yes, all participants receive recordings and bonus resources.</p>
          <p><strong>Q:</strong> Is my payment secure?<br/><strong>A:</strong> Payments are securely processed via Razorpay.</p>
        </div>
      </motion.section>
    </main>
  );
}
