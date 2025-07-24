import Home from "./homepage/page";

export const metadata = {
  title: "RC Tech Solutions | Turning Ideas into Digital Reality",
  description:
    "We build luxury-grade digital solutions — websites, branding, SEO, and more. Join India's most trusted digital agency for premium business growth.",
  openGraph: {
    title: "RC Tech Solutions | Turning Ideas into Digital Reality",
    description:
      "Custom websites, SEO, branding, and marketing solutions tailored to your business. Experience premium digital transformation with RC Tech Solutions.",
    url: "https://rctechsolutions.com",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://rctechsolutions.com/rclogo.png",
        width: 1200,
        height: 630,
        alt: "RC Tech Solutions Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Tech Solutions",
    description:
      "Luxury-grade web development and branding by RC Tech Solutions.",
    images: ["https://rctechsolutions.com/rclogo.png"],
  },
};

export default function Page() {
  return <Home />;
}
