"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/autoplay"; // Import Swiper autoplay styles
import { Autoplay } from "swiper/modules"; // Import Autoplay module from Swiper

export default function BrandsSection() {
  const brands = [
    { name: "Zoho", logo: "/zoho.png" },
    { name: "Freshworks", logo: "/freshworks.png" },
    { name: "Chargebee", logo: "/chargebee.png" },
    { name: "Razorpay", logo: "/razorpay.png" },
    { name: "Cleartax", logo: "/cleartax.png" },
    { name: "Store My Goods", logo: "/bedeol.png" },

    { name: "Minimalist", logo: "/redtape.png" },
    { name: "Yukti Herbs", logo: "/yukti herbs.png" },
    { name: "Unacademy", logo: "/un.png" },
    { name: "Dr. Andriana Setnik", logo: "/geek.png" },
    // { name: "SWCC", logo: "/swcc.png" },
    // { name: "Woodland", logo: "/woodland.webp" },
    // { name: "Almas Drinking Water", logo: "/almas.png" },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-300 via-white to-gray-300 py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-[50px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-6xl font-extrabold">
          Brands That <span className="italic underline">Trust</span> Us
        </h2>

        {/* Swiper for Mobile (Auto-Scroll) */}
        <div className="lg:hidden">
          <Swiper
            spaceBetween={10} // Reduced gap between logos
            slidesPerView={3} // Increase slides per view for mobile
            loop={true}
            autoplay={{
              delay: 2000, // Auto-scroll delay (2 seconds per slide)
              disableOnInteraction: false, // Keep autoplay active even after interaction
            }}
            modules={[Autoplay]} // Pass the Autoplay module here
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 10, // Adjust gap for 640px+ screens
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10, // Adjust gap for 768px+ screens
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10, // Adjust gap for larger screens
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
                className="w-[150px] h-[150px] object-contain transition duration-300 filter brightness-100 "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
