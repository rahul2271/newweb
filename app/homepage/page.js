import Homepage from "@/components/HeroSection";
import BrandsSection from "@/components/TrustedBrands";
import ProductTeamSection from "@/components/Timeline";
import Quiz from "@/components/Quiz";
import ServicesCard from "@/components/capabilities";
import ValueProposition from "@/components/ValueProposition";
import CtoSection from "@/components/Result";
import CTASection from "@/components/CTASection";
import FaqSection from "@/components/FAQSection";
import Chatbot from "@/components/Chatbot";

// ✅ Metadata for SEO
export const metadata = {
  title: "RC Tech Solutions",
  description: "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
  metadataBase: new URL("https://www.rctechsolutions.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RC Tech Solutions",
    description: "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
    url: "https://www.rctechsolutions.com",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/rclogo.png",
        width: 800,
        height: 600,
        alt: "RC Tech Solutions Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Tech Solutions",
    description: "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
    images: ["https://www.rctechsolutions.com/rclogo.png"],
  },
};

// ✅ JSON-LD Structured Data
const schemaWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RC Tech Solutions",
  url: "https://www.rctechsolutions.com",
  description: "We build luxury-grade digital solutions — websites, branding, SEO, and more.",
  publisher: {
    "@type": "Organization",
    name: "RC Tech Solutions",
    logo: {
      "@type": "ImageObject",
      url: "https://www.rctechsolutions.com/rclogo.png",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.rctechsolutions.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.instagram.com/rctechsolutions",
    "https://www.linkedin.com/company/rctechsolutions",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaWebsite),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrganization),
        }}
      />

      {/* Page Sections */}
      <Homepage />
      <BrandsSection />
      <ProductTeamSection />
      <div>
        <Quiz />
      </div>
      <ServicesCard />
      <ValueProposition />
      <CtoSection />
      <CTASection />
      <FaqSection />
      <Chatbot />
    </>
  );
}
