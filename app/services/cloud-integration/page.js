import CloudIntegrationPage from "./cloud";

export const metadata = {
  title: "Expert Cloud Infrastructure Services | RC Tech Solutions",
  description:
    "Optimize performance and reduce costs with RC Tech Solutions’ Cloud Infrastructure Services. Your partner in secure, scalable, and reliable cloud solutions.",
  keywords: [
    "cloud integration",
    "AWS cloud services",
    "Azure cloud services",
    "Kubernetes orchestration",
    "cloud security",
    "cloud migration",
    "cloud backup solutions",
    "cloud performance optimization",
    "enterprise cloud solutions",
  ],
  authors: [{ name: "RC Tech Solutions" }],
  alternates: { canonical: "https://www.rctechsolutions.com/services/cloud-integration" },
  openGraph: {
    title: "Expert Cloud Infrastructure Services | RC Tech Solutions",
    description:
      "Optimize performance and reduce costs with RC Tech Solutions’ Cloud Infrastructure Services. Your partner in secure, scalable, and reliable cloud solutions.",
    url: "https://www.rctechsolutions.com/services/cloud-integration",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/logo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Cloud Infrastructure Services | RC Tech Solutions",
    description:
      "Optimize performance and reduce costs with RC Tech Solutions’ Cloud Infrastructure Services. Your partner in secure, scalable, and reliable cloud solutions.",
    images: ["https://www.rctechsolutions.com/logo.png"],
    site: "@RCTechSolutions",
  },
};

export default function CloudIntegrationPagee() {
  return <CloudIntegrationPage />;
}
