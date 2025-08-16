import MobileAppsPage from "./mob";

export const metadata = {
  title: "Custom Mobile App Development for iOS & Android | RC Tech Solutions",
  description:
    "Get innovative, user-friendly mobile apps with RC Tech Solutions. Expert mobile app development services for startups, enterprises, and global brands.",
  keywords: [
    "mobile app development services",
    "android app development",
    "ios app development",
    "react native apps",
    "cross platform app development",
    "UI/UX prototyping",
    "Figma app design",
    "backend integration apps",
    "App Store Optimization",
    "IT solutions company India"
  ],
  authors: [{ name: "RC Tech Solutions" }],
  alternates: {
    canonical: "https://www.rctechsolutions.com/services/mobile-apps",
  },
  openGraph: {
    title: "Custom Mobile App Development for iOS & Android | RC Tech Solutions",
    description:
      "Get innovative, user-friendly mobile apps with RC Tech Solutions. Expert mobile app development services for startups, enterprises, and global brands.",
    url: "https://www.rctechsolutions.com/services/mobile-apps",
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
    title: "Custom Mobile App Development for iOS & Android | RC Tech Solutions",
    description:
      "Get innovative, user-friendly mobile apps with RC Tech Solutions. Expert mobile app development services for startups, enterprises, and global brands.",
    images: ["https://www.rctechsolutions.com/rclogo.png"],
    site: "@RCTechSolutions",
  },
};

export default function MobileAppsPagee() {
  return <MobileAppsPage />;
}
