import Home from "./homepage/page";

export const metadata = {
  title: "Best Software Development Company for Digital Success | RC tech Solutions",
  description:
    "Your vision, our expertise. As the best software development company, we design and develop custom software that enhances productivity and maximizes business efficiency.",
  metadataBase: new URL("https://www.rctechsolutions.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
  title: "Best Software Development Company for Digital Success | RC tech Solutions",
    title: "RC Tech Solutions | Turning Ideas into Digital Reality",
    description:
      "Your vision, our expertise. As the best software development company, we design and develop custom software that enhances productivity and maximizes business efficiency.",
    url: "https://www.rctechsolutions.com",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/rclogo.png",
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
    images: ["https://www.rctechsolutions.com/rclogo.png"],
  },
};

export default function Page() {
  return <Home />;
}
