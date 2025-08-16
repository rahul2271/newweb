import DigitalMarketingPage from "./marketing";

export const metadata = {
  title: "Expert Digital Marketing Services for Business Growth | RC Tech Solutions",
  description:
    "From SEO to PPC, our Digital Marketing Services empower your brand. Partner with RC Tech Solutions to reach, engage, and convert your ideal customers.",
  keywords: [
    "digital marketing services",
    "SEO marketing",
    "social media management",
    "Google Ads campaigns",
    "email marketing",
    "influencer marketing",
    "video marketing",
    "conversion optimization",
    "IT solutions company India"
  ],
  authors: [{ name: "RC Tech Solutions" }],
  alternates: {
    canonical: "https://www.rctechsolutions.com/services/digital-marketing",
  },
  openGraph: {
    title: "Expert Digital Marketing Services for Business Growth | RC Tech Solutions",
    description:
      "From SEO to PPC, our Digital Marketing Services empower your brand. Partner with RC Tech Solutions to reach, engage, and convert your ideal customers.",
    url: "https://www.rctechsolutions.com/services/digital-marketing",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/rclogo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Digital Marketing Services for Business Growth | RC Tech Solutions",
    description:
      "From SEO to PPC, our Digital Marketing Services empower your brand. Partner with RC Tech Solutions to reach, engage, and convert your ideal customers.",
    images: ["https://www.rctechsolutions.com/rclogo.png"],
    site: "@RCTechSolutions",
  },
};

export default function DigitalMarketingPagee() {
  return <DigitalMarketingPage />;
}
