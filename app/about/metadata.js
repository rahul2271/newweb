// app/about/metadata.js

export const metadata = {
  title: "About RC Tech Solutions | Web Development & Branding Agency in India",
  description:
    "RC Tech Solutions is a Chandigarh-based digital agency offering custom web development, branding, and UI/UX design for startups and businesses. Founded by Rahul Chauhan in 2022.",
  keywords:
    "RC Tech Solutions, Rahul Chauhan, Chandigarh web development, branding agency India, custom website design, UI UX services, SEO optimized websites, startup web development, Indian digital agency",
  authors: [{ name: "Rahul Chauhan", url: "https://www.rctechsolutions.com" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "About RC Tech Solutions | Web Dev Company India",
    description:
      "Led by Rahul Chauhan, RC Tech Solutions builds clean, scalable web development and branding solutions for startups.",
    url: "https://www.rctechsolutions.com/about",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/rahulchauhan.jpg",
        width: 1200,
        height: 630,
        alt: "Rahul Chauhan - RC Tech Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RC Tech Solutions | Premium Web Development",
    description:
      "RC Tech Solutions helps businesses scale with SEO-first custom web design & branding. Based in Chandigarh, India.",
    images: ["https://www.rctechsolutions.com/rahulchauhan.jpg"],
  },
  alternates: {
    canonical: "https://www.rctechsolutions.com/about",
  },
};
