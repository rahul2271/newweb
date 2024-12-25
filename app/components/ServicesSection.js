'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Slider with ssr: false to disable server-side rendering
const Slider = dynamic(() => import('react-slick'), { ssr: false });

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ServicesSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // Default to 1 card on mobile
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,  // Mobile (less than 768px)
        settings: {
          slidesToShow: 1,  // Show 1 card at a time
          slidesToScroll: 1,
          centerMode: true,  // Center the card on mobile
          centerPadding: '20px', // Add some padding to create gaps
        },
      },
      {
        breakpoint: 1024,  // Tablet (between 768px and 1024px)
        settings: {
          slidesToShow: 2,  // Show 2 cards at a time
          slidesToScroll: 1,
          centerMode: false,  // No centering for tablet
        },
      },
      {
        breakpoint: 1200,  // Desktop (greater than 1024px)
        settings: {
          slidesToShow: 3,  // Show 3 cards at a time
          slidesToScroll: 1,
          centerMode: false,  // No centering for desktop
        },
      },
    ],
  };

  return (
    <>
      {/* Mobile-only Section with Slider */}
      <section className="block lg:hidden bg-gradient-to-r from-purple-100 to-white py-20 mx-auto shadow-md text-gray-200 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl text-gray-900 font-bold text-center mb-12">Our Services</h2>

          {/* Slick Carousel */}
          <Slider {...settings}>
            {[ // Service Cards
              { icon: 'web.png', title: 'Web Development', description: 'We create user-centric designs that convert.' },
              { icon: 'digital-marketing.png', title: 'Digital Marketing', description: 'Grow your business with data-driven strategies.' },
              { icon: 'graphics-design.png', title: 'Graphics Designing', description: 'Creative visuals that speak volumes.' },
              { icon: 'seo.png', title: 'SEO', description: 'Be seen. Be heard. Dominate search results.' },
              { icon: 'smm.png', title: 'Social Media Marketing', description: 'Engage your audience like never before.' },
              { icon: 'video-editing.png', title: 'Video Editing', description: 'We make content that resonates and gets shared.' },
            ].map((service, index) => (
              <div
                key={index}
                className="mt-10 relative flex-shrink-0 p-6 rounded-xl shadow-xl w-full sm:w-80 transition-all transform duration-500 group hover:scale-105 hover:rotate-2 hover:shadow-2xl bg-gradient-to-br from-[#953ee2] to-black z-30"
              >
                {/* Background for hover effect */}
                <div className=" absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black via-[#953ee2] to-black rounded-xl blur-sm transition-opacity duration-500"></div>

                <div className="relative z-20 text-center">
                  <img
                    src={`/icons/${service.icon}`}
                    alt={service.title}
                    className="h-[80px] w-[80px] mx-auto mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-lg text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="#portfolio"
              className="bg-gradient-to-br from-black to-[#953ee2] inline-block bg-primary text-white px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-110"
            >
              See Our Results
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop-only Section with Grid */}
      <section className="hidden lg:block bg-gradient-to-r from-purple-100 to-white py-20 mx-auto shadow-md text-gray-200 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-5xl text-gray-900 font-medium text-center mb-12">Our Services</h2>

          {/* Services Wrapper */}
          <div className="flex sm:flex-wrap  sm:overflow-x-auto sm:gap-8 py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-smooth">
            {[ // Service Cards
              { icon: 'web.png', title: 'Web Development', description: 'We create user-centric designs that convert.' },
              { icon: 'digital-marketing.png', title: 'Digital Marketing', description: 'Grow your business with data-driven strategies.' },
              { icon: 'graphics-design.png', title: 'Graphics Designing', description: 'Creative visuals that speak volumes.' },
              { icon: 'seo.png', title: 'SEO', description: 'Be seen. Be heard. Dominate search results.' },
              { icon: 'smm.png', title: 'Social Media Marketing', description: 'Engage your audience like never before.' },
              { icon: 'video-editing.png', title: 'Video Editing', description: 'We make content that resonates and gets shared.' },
            ].map((service, index) => (
              <div
                key={index}
                className="ml-10 relative flex-shrink-0 p-6 rounded-xl shadow-xl w-80 transition-all transform duration-500 group hover:scale-105 hover:rotate-2 hover:shadow-2xl bg-gradient-to-br from-[#953ee2] to-black z-30"
              >
                {/* Background for hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black via-[#953ee2] to-black rounded-xl blur-sm transition-opacity duration-500"></div>
                
                <div className="relative z-20 text-center">
                  <img
                    src={`/icons/${service.icon}`}
                    alt={service.title}
                    className="h-[80px] w-[80px] mx-auto mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <h3 className="text-2xl font-regular text-white">{service.title}</h3>
                  <p className="mt-4 text-md font-light text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="#portfolio"
              className="bg-gradient-to-br from-black to-[#953ee2] inline-block bg-primary text-white px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-110"
            >
              See Our Results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
