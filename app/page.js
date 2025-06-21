




"use client";

import Image from "next/image";
import Head from "next/head";
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import SuccessStories from "./components/SuccessStories";
import BoldStats from "./components/BoldStats";
import CTASection from "./components/CTASection";
import ValueProposition from "./components/ValueProposition";
import DownloadResourceSection from "./components/DownloadResourceSection";
import FaqSection from "./components/FAQSection";
import BlogSection from "./components/BlogSection";
import Chatbot from "./components/Chatbot";
import WebinarList from "./webinars/page";
import Quiz from "./components/Quiz";
import Capabilities from "./components/capabilities";
import BrandsSection from "./components/TrustedBrands";
import Homepage from "./components/HeroSection";
import TeamSection from "./components/Team";

export default function Home() {
  const schemaWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RC Tech Solutions",
    "url": "https://www.rctechsolutions.com",
    "description": "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
    "publisher": {
      "@type": "Organization",
      "name": "RC Tech Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.rctechsolutions.com/rclogo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.rctechsolutions.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RC Tech Solutions",
    "url": "https://www.rctechsolutions.com",
    "logo": "https://wwww.rctechsolutios.com/rclogo.png",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+91-7009646377",
      "contactType": "Customer Service",
      "areaServed": "IN"
    }],
    "sameAs": [
      "https://www.instagram.com/rctechsolutions",
      "https://www.linkedin.com/company/rctechsolutions"
    ]
  };

  return (
    <>
      {/* Structured Data JSON-LD */}
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
      <ProblemSolution />
      <div><Quiz /></div>
      <Capabilities />
      <ValueProposition />
      <DownloadResourceSection />
      <CTASection />
      <TeamSection />
      <FaqSection />
      <Chatbot />
    </>
  );
}
