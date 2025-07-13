import Contact from "./contactuss";
import { Metadata } from 'next';

export const metadata = {
  title: "Contact Us | RC Tech Solutions",
  description: "Contact RC Tech Solutions for expert web development, software consulting, IT services, and digital transformation. Let’s build your next big idea together.",
  keywords: ["RC Tech Solutions", "Contact", "Web Development India", "Software Company", "IT Consulting", "Tech Support"],
  alternates: {
    canonical: "https://rctechsolutions.com/contact",
  },
  openGraph: {
    title: "Contact Us | RC Tech Solutions",
    description: "Connect with RC Tech Solutions to bring your digital ideas to life. Quick response guaranteed.",
    url: "https://rctechsolutions.com/contact",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://pagedone.io/asset/uploads/1696488602.png",
        width: 1200,
        height: 630,
        alt: "RC Tech Solutions Office",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | RC Tech Solutions",
    description: "Reach out to RC Tech Solutions for collaborative digital growth.",
    images: ["https://pagedone.io/asset/uploads/1696488602.png"],
  },
};
export default function ConatctUsPage() {
  return (
    
    <Contact/>
  );
}