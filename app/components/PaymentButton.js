'use client';

import React, { useState } from 'react';
import Script from 'next/script';

export default function PaymentButton({ webinar }) {
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webinarId: webinar.id, amount: webinar.price }),
      });
      const data = await res.json();

      if (!data.success) throw new Error('Payment initiation failed');

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: webinar.title,
        description: webinar.description,
        order_id: data.order_id,
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          window.location.href = `/webinars/live/${webinar.id}`;
        },
        prefill: {
          name: data.userName || '',
          email: data.userEmail || '',
          contact: data.userContact || '',
        },
        theme: { color: '#953ee2' },
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert('Razorpay SDK not loaded. Refresh the page.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
        onError={() => alert('Failed to load Razorpay SDK.')}
      />
      <button
        onClick={handlePayment}
        disabled={isPaying}
        className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ${
          isPaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
        }`}
      >
        {isPaying ? 'Processing Payment...' : 'Pay Now'}
      </button>
    </>
  );
}
