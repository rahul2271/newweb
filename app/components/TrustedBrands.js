"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

export default function BrandsSection() {
  const brands = [
    { name: "Zoho", logo: "/zoho.png" },
    { name: "Freshworks", logo: "/freshworks.png" },
    { name: "Chargebee", logo: "/chargebee.png" },
    { name: "Razorpay", logo: "/razorpay.png" },
    { name: "Cleartax", logo: "/cleartax.png" },
    { name: "Locus", logo: "/locus.png" },
    { name: "minimalist", logo: "/redtape.png" },
    { name: "yuktiherbs", logo: "/yukti herbs.png" },
    { name: "unacademy", logo: "/un.png" },
    { name: "Dr. Andriana Setnik", logo: "/geek.png" },
    { name: "Store My Goods", logo: "/bedeol.png" },
    { name: "SWCC", logo: "/swcc.png" },
    { name: "Woodland", logo: "/woodland.webp" },
    { name: "Almas Drinking Water", logo: "/almas.png" },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-[50px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-6xl font-extrabold">
          Brands That <span className="italic underline">Trust</span> Us
        </h2>

        {/* Marquee Animation for Scrolling Logos (Desktop) */}
        <div className="hidden lg:block overflow-hidden relative">
          <div className="absolute animate-marquee">
            <div className="flex space-x-10">
              {brands.map((brand, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-28 h-28 object-contain transition duration-300 filter brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Swiper for Mobile (Auto-Scroll with slow rotation) */}
        <div className="lg:hidden">
          <Swiper
            spaceBetween={20} // Increased gap between logos
            slidesPerView={3} // Adjust number of logos visible on mobile
            loop={true}
            autoplay={{
              delay: 3000, // Slow auto-scroll delay (3 seconds per slide)
              disableOnInteraction: false, // Keep autoplay active even after interaction
            }}
            speed={5000} // Slow down the transition speed
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 15, // Adjust gap for 640px+ screens
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20, // Adjust gap for 768px+ screens
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20, // Adjust gap for larger screens
              },
            }}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-28 h-28 object-contain filter brightness-0 invert transition duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for Larger Screens (For larger screens without Swiper) */}
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-[150px] h-[150px] object-contain transition duration-300 filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
