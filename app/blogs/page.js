import BloogPage from "./blogpage";

export const metadata = {
  title: "Blogs | RC Tech Solutions",
  description:
    "Explore blogs by RC Tech Solutions on technology, web development, freelancing, SEO, design, marketing, and career growth.",
  alternates: {
    canonical: "https://www.rctechsolutions.com/blogs",
  },
  openGraph: {
    title: "RC Tech Solutions Blogs",
    description:
      "Read the latest insights on technology, freelancing, SEO, digital marketing, and business solutions from RC Tech Solutions.",
    url: "https://www.rctechsolutions.com/blogs",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/og/blogs-cover.jpg",
        width: 1200,
        height: 630,
        alt: "RC Tech Solutions Blogs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Tech Solutions Blogs",
    description:
      "Expert blogs on tech, freelancing, SEO, web development, and career growth by RC Tech Solutions.",
    images: ["https://www.rctechsolutions.com/og/blogs-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <BloogPage />;
}
