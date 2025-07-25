"use client";

import Head from "next/head"; // Only needed if you're using Pages Router
import CtoSection from "../components/Result";
import CTASection from "../components/CTASection";
import ValueProposition from "../components/ValueProposition";
// import DownloadResourceSection from "../components/DownloadResourceSection";
import FaqSection from "../components/FAQSection";
import Chatbot from "../components/Chatbot";
import ProductTeamSection from "../components/Timeline";
import Quiz from "../components/Quiz";
import ServicesCard from "../components/capabilities";
import BrandsSection from "../components/TrustedBrands";
import Homepage from "../components/HeroSection";
// import TeamSection from "../components/Team";

export default function Home() {
  const schemaWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RC Tech Solutions",
    url: "https://rctechsolutions.com",
    description: "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
    publisher: {
      "@type": "Organization",
      name: "RC Tech Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rctechsolutions.com/rclogo.png"
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.rctechsolutions.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RC Tech Solutions",
    url: "https://www.rctechsolutions.com",
    logo: "https://www.rctechsolutions.com/rclogo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-7009646377",
        contactType: "Customer Service",
        areaServed: "IN"
      }
    ],
    sameAs: [
      "https://www.instagram.com/rctechsolutions",
      "https://www.linkedin.com/company/rctechsolutions"
    ]
  };

  return (
    <>
      {/* Meta & SEO */}
      <Head>
        <title>RC Tech Solutions</title>
        <meta name="description" content="We build luxury-grade digital solutions — websites, branding, SEO, and more." />
        <link rel="canonical" href="https://rctechsolutions.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="RC Tech Solutions" />
        <meta property="og:description" content="We build luxury-grade digital solutions — websites, branding, SEO, and more." />
        <meta property="og:image" content="https://www.rctechsolutions.com/rclogo.png" />
        <meta property="og:url" content="https://rctechsolutions.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RC Tech Solutions" />
        <meta name="twitter:description" content="We build luxury-grade digital solutions — websites, branding, SEO, and more." />
        <meta name="twitter:image" content="https://www.rctechsolutions.com/rclogo.png" />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
      />

      {/* Animate.css */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      {/* Page Sections */}
      <Homepage />
      <BrandsSection />
      <ProductTeamSection />
      <div><Quiz /></div>
      <ServicesCard />
      <ValueProposition />
      <CtoSection />
      <CTASection />
      <FaqSection />
      <Chatbot />
    </>
  );
}
