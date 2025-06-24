import { Metadata } from "next";
import About from "./aboutus";

export const metadata = {
  title: "About Us | RC Tech Solutions",
  description: "Learn about RC Tech Solutions, our founder, our mission, and the values that drive our digital innovation.",
  keywords: ["RC Tech Solutions", "Rahul Chauhan", "About RC Tech", "Web Development Agency", "UI UX Studio", "India Tech Company"],
  openGraph: {
    title: "About Us | RC Tech Solutions",
    description: "Discover the story behind RC Tech Solutions — our journey, our achievements, and what drives us forward.",
    url: "https://www.rctechsolutions.com/About",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/rahulchauhan.jpg",
        width: 1200,
        height: 630,
        alt: "Founder Rahul Chauhan - RC Tech Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | RC Tech Solutions",
    description: "Meet our founder and explore our journey of innovation at RC Tech Solutions.",
    images: ["https://www.rctechsolutions.com/rahulchauhan.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: "https://www.rctechsolutions.com/aboutus",
  },
};

export default function AboutUsPage() {
  return (
    
    <About/>
    
  );
}
