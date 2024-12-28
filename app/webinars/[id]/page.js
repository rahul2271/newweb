'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function WebinarDetails({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap the params Promise
  const { id } = params; // Access the unwrapped id property

  const [webinar, setWebinar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false); // To track payment button loading state
  const [razorpayLoaded, setRazorpayLoaded] = useState(false); // Track Razorpay load status
  const router = useRouter();

  // Load Razorpay script and handle the load event
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => alert('Failed to load Razorpay SDK. Please refresh the page.');
    document.body.appendChild(script);

    return () => {
      // Clean up script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Fetch webinar details
    const fetchWebinar = async () => {
      try {
        const res = await fetch(`/api/webinars?id=${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch webinar data');
        }
        const data = await res.json();
        setWebinar(data);
      } catch (error) {
        console.error('Error fetching webinar:', error);
        alert('Failed to load webinar details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinar();
  }, [id]);

  const handlePayment = async () => {
    setIsPaying(true);

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webinarId: webinar.id, amount: webinar.price }),
      });

      const data = await res.json();

      if (data.success && razorpayLoaded) {
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: webinar.title,
          description: webinar.description,
          order_id: data.order_id,
          handler: () => {
            alert('Payment successful!');
            router.push(`/webinars/live/${id}`);
          },
          prefill: {
            name: 'Your Name', // Replace with actual user data if available
            email: 'your-email@example.com', // Replace with actual user email
            contact: '1234567890', // Replace with actual user contact number
          },
          theme: {
            color: '#953ee2', // Your brand's primary color
          },
        };

        // Check if Razorpay is loaded before creating an instance
        if (window.Razorpay) {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          alert('Razorpay SDK is not loaded yet. Please try again.');
        }
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
        onError={() => alert('Failed to load Razorpay SDK. Please refresh the page.')}
      />
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">{webinar.title}</h1>
          <p className="text-gray-600 mb-4">{webinar.description}</p>
          <p className="text-lg font-semibold mb-4">Price: ₹{webinar.price}</p>
          <button
            onClick={handlePayment}
            className={`px-6 py-3 text-white rounded shadow-lg ${
              isPaying
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500'
            }`}
            disabled={isPaying}
          >
            {isPaying ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </main>
    </>
  );
}
