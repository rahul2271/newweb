'use client';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section className="bg-[#0d0f11] py-20 mx-auto shadow-md text-gray-200 rounded-[150px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>

        {/* Services Wrapper */}
        <div className="flex sm:flex-nowrap sm:overflow-x-auto sm:gap-8 py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="relative flex-shrink-0 p-6 rounded-xl shadow-xl w-80 transition-all transform duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl bg-gradient-to-br from-[#953ee2] to-black z-10"
            >
              {/* Hover Animation Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black via-[#953ee2] to-black rounded-xl blur-sm transition-opacity duration-500"></div>
              
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
  );
}
