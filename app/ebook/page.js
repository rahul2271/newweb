import EbookClient from "./EbookClient";

export const metadata = {
  title: "Learn to Code, Earn from Code | Student Developer eBook",
  description:
    "Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips.",
  keywords: [
    "learn coding",
    "earn from coding",
    "student developer ebook",
    "programming for students",
    "coding guide",
    "web development ebook",
  ],
  authors: [{ name: "RC Tech Solutions" }],
  alternates: { canonical: "https://www.rctechsolutions.com/ebook" },
  openGraph: {
    title: "Learn to Code, Earn from Code | Student Developer eBook",
    description:
      "Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips.",
    url: "https://www.rctechsolutions.com/ebook",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/ebookpdf.jpg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn to Code, Earn from Code | Student Developer eBook",
    description:
      "Master coding and start earning — A complete student guide with 120+ pages, bonus resources, and practical earning tips.",
    images: ["https://www.rctechsolutions.com/ebookpdf.jpg"],
    site: "@RCTechSolutions",
  },
};

export default function EbookPage() {
  return <EbookClient />;
}
