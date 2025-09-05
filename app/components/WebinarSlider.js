'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

export default function WebinarSlider({ webinars }) {
  const today = new Date();

  const getStatus = (webinar) => {
    if (webinar.live) return { text: "Live", color: "bg-green-100 text-green-800" };
    const webinarDate = new Date(webinar.date);
    if (webinarDate.toDateString() === today.toDateString())
      return { text: "Upcoming", color: "bg-blue-100 text-blue-800" };
    if (webinarDate > today) return { text: "Scheduled", color: "bg-gray-100 text-gray-800" };
    return { text: "Past", color: "bg-red-100 text-red-800" };
  };

  return (
    <div className="block sm:hidden mb-10">
      <Swiper spaceBetween={16} slidesPerView={1} loop>
        {webinars.map((webinar) => {
          const status = getStatus(webinar);
          return (
            <SwiperSlide key={webinar.id}>
              <div className="relative group p-6 bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:translate-y-3 ease-in-out">
                {webinar.imageUrl && (
                  <img
                    src={webinar.imageUrl}
                    alt={webinar.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-110 transition-all duration-500"
                  />
                )}
                <h2 className="text-2xl font-semibold text-gray-200 mb-2">{webinar.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{webinar.formattedDate}</p>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">{webinar.description}</p>

                <span className={`absolute top-4 right-4 inline-block px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                  {status.text}
                </span>

                {status.text !== "Past" && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <Link
                      href={`/webinars/${webinar.id}`}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l duration-300 ease-in-out"
                    >
                      Register for Free
                    </Link>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
