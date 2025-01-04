'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function WebinarList() {
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      const res = await fetch('/api/webinars');
      const data = await res.json();
      setWebinars(data);
    };
    fetchWebinars();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white min-h-screen p-6 sm:p-10">
      <h1 className="text-4xl text-black sm:text-5xl font-bold text-center mb-10 sm:mb-14">
        Upcoming Webinars
      </h1>

      {/* Mobile Slider */}
      <div className="block sm:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          navigation
          loop
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
          }}
        >
          {webinars.map((webinar) => (
            <SwiperSlide key={webinar.id}>
              <div className="relative group p-8 bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:translate-y-3 ease-in-out">
                {/* Webinar Image (if available) */}
                {webinar.imageUrl && (
                  <img
                    src={webinar.imageUrl}
                    alt={webinar.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-110 transition-all duration-500"
                  />
                )}
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-2">
                  {webinar.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mb-4">{webinar.date}</p>
                <p className="text-sm sm:text-base text-gray-300 line-clamp-3 mb-6">
                  {webinar.description}
                </p>

                {/* Status Badge */}
                {webinar.live ? (
                  <span className="absolute top-4 right-4 inline-block bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold rounded-full">
                    Live
                  </span>
                ) : webinar.date === today ? (
                  <span className="absolute top-4 right-4 inline-block bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold rounded-full">
                    Upcoming
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 inline-block bg-gray-100 text-gray-800 px-3 py-1 text-xs font-semibold rounded-full">
                    Scheduled
                  </span>
                )}

                {/* Register CTA */}
                <div className="absolute bottom-6 left-6 right-6">
                  <Link
                    href={`/webinars/${webinar.id}`}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l duration-300 ease-in-out"
                  >
                    Register for Free
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid  grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {webinars.map((webinar) => (
          <div
            key={webinar.id}
            className="relative group p-8 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:translate-y-3 ease-in-out"
          >
            {/* Webinar Image (if available) */}
            {webinar.imageUrl && (
              <img
                src={webinar.imageUrl}
                alt={webinar.title}
                className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-110 transition-all duration-500"
              />
            )}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-2">
              {webinar.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-4">{webinar.date}</p>
            <p className="text-sm sm:text-base text-gray-300 line-clamp-3 mb-6">
              {webinar.description}
            </p>

            {/* Status Badge */}
            {webinar.live ? (
              <span className="absolute top-4 right-4 inline-block bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold rounded-full">
                Live
              </span>
            ) : webinar.date === today ? (
              <span className="absolute top-4 right-4 inline-block bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold rounded-full">
                Upcoming
              </span>
            ) : (
              <span className="absolute top-4 right-4 inline-block bg-gray-100 text-gray-800 px-3 py-1 text-xs font-semibold rounded-full">
                Scheduled
              </span>
            )}

            {/* Register CTA */}
            <div className="absolute bottom-6  left-6 right-6">
              <Link
                href={`/webinars/${webinar.id}`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2  px-4 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l duration-300 ease-in-out"
              >
                Register for Free
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Freebies Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Exclusive Freebies</h2>
        <p className="text-lg text-gray-600 mb-6">
          Download our exclusive eBooks and get free access to a webinar today!
        </p>
        <Link
          href="/freebies"
          className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-black text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Grab Your Freebie
        </Link>
      </div>
    </main>
  );
}
