"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function About() {
  const imageURL = "https://www.rctechsolutions.com/rahulchauhan.jpg"; // Replace with your image

  const stats = [
    { label: "Projects Completed", count: 125 },
    { label: "Years Combined Experience", count: 33 },
    { label: "Client Satisfaction", count: 99, suffix: "%" },
    { label: "Recognitions & Awards", count: 26 },
  ];

  const [visibleStats, setVisibleStats] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          let start = 0;
          const end = stat.count;
          const duration = 800;
          const increment = end / 100;

          const timer = setInterval(() => {
            start += increment;
            setVisibleStats(prev => {
              const updated = [...prev];
              updated[index] = Math.min(Math.round(start), end);
              return updated;
            });
            if (start >= end) clearInterval(timer);
          }, duration / 100);
        });
      }
    }, { threshold: 0.4 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>About Us | RC Tech Solutions</title>
        <meta
          name="description"
          content="Minimalist web development and branding agency in India led by Rahul Chauhan. Learn about our journey and impact."
        />
        <meta
          name="keywords"
          content="RC Tech Solutions, Rahul Chauhan, web development India, branding agency Chandigarh, custom websites"
        />
      </Head>

      {/* INTRO */}
      <section className="bg-white text-center py-20 px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">About RC Tech Solutions</h1>
        <p className="max-w-xl mx-auto text-gray-600 text-base leading-relaxed">
          We’re a purpose-driven digital agency — minimal, mindful, and made to deliver. Focused on meaningful design, fast code, and digital clarity.
        </p>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={imageURL}
              alt="Rahul Chauhan - Founder"
              className="w-full h-auto rounded-xl object-cover shadow-sm"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#953ee2] mb-4">Rahul's Journey</h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              I started RC Tech Solutions in 2022, not just to build websites — but to solve real business problems with design that matters and code that scales.
              <br /><br />
              From sleepless nights to live launches, every project has taught us one thing — clarity and consistency wins. We stay minimal so your brand speaks loud.
              <br /><br />
              We’re not here for short wins. We’re here to build digital foundations that last.
            </p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="bg-white py-20 px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-10">What We’ve Built So Far</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div key={idx} className="rounded-md p-4 border border-gray-100 shadow-sm bg-gray-50">
                <p className="text-3xl font-bold text-[#953ee2]">
                  {visibleStats[idx]}
                  {item.suffix || ""}
                </p>
                <p className="text-sm text-gray-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f9f6ff] py-16 px-6 text-center">
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">We’re a quiet force in digital.</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          No noise. Just work that works. If you’re a startup, small business, or someone who values quality — let’s talk.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#953ee2] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-purple-700 transition"
        >
          Let's Work Together
        </a>
      </section>

      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RC Tech Solutions",
            url: "https://www.rctechsolutions.com",
            logo: "https://www.rctechsolutions.com/rclogo.png",
            founder: "Rahul Chauhan",
            foundingDate: "2022",
            description:
              "RC Tech Solutions is a minimalist web development and branding agency in Chandigarh, led by founder Rahul Chauhan.",
            sameAs: [
              "https://www.instagram.com/rctechsolutions",
              "https://www.linkedin.com/company/rctechsolutions"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-7009646377",
              contactType: "Customer Support",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"]
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chandigarh",
              addressRegion: "Chandigarh",
              postalCode: "160061",
              addressCountry: "IN"
            }
          }),
        }}
      />
    </>
  );
}
