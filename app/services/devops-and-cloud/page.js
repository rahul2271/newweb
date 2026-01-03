import DevOpsCloudPage from "./devcl";

export const metadata = {
  title: " Top Cloud Infrastructure Services | RC Tech Solutions",
  description:
    "Enhance business agility with our Cloud Infrastructure Services. RC Tech Solutions provides secure, scalable DevOps & cloud solutions that drive growth.",
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
    title: " Top Cloud Infrastructure Services | RC Tech Solutions",
    description:
      "Enhance business agility with our Cloud Infrastructure Services. RC Tech Solutions provides secure, scalable DevOps & cloud solutions that drive growth.",
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
    title: "Top Cloud Infrastructure Services | RC Tech Solutions",
    description:
      "Enhance business agility with our Cloud Infrastructure Services. RC Tech Solutions provides secure, scalable DevOps & cloud solutions that drive growth.",
    images: ["https://www.rctechsolutions.com/logo.png"],
    site: "@RCTechSolutions",
  },
};

export default function DevOpsCloudPagee() {
  return <DevOpsCloudPage />;
}
