// app/blogs/page.js
import BlogPage from "../blogss/page";

export const metadata = {
  title: "Blogs: RC Tech Solutions | Everything directly from Technology.",
  description:
    "Explore RC Tech Solutions blog — curated insights on tech, freelancing, SEO, development, and more.",
  openGraph: {
    title: "Blogs: RC Tech Solutions | Everything directly from Technology.",
    description:
      "Explore RC Tech Solutions blog — curated insights on tech, freelancing, SEO, development, and more.",
    url: "https://www.rctechsolutions.com/blogs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RC Tech Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Tech Blogs | Curated Thoughts. Designed for Impact.",
    description:
      "Explore curated insights on technology, career, freelancing, design, SEO, and more.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "RC Tech Solutions",
    "Tech Blogs",
    "Freelancing",
    "Web Development",
    "SEO",
    "Design Thinking",
    "Digital Marketing",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function Bloger() {
  return <BlogPage />;
}
