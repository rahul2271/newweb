// import { Poppins } from "next/font/google";
// import "./globals.css";
// import AdvancedHeader from "./components/Header";
// import Footer from "./components/Footer";
// import CustomCursor from "./components/CursorEffect";
// import Script from "next/script";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });



// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
        
//         {/* Razorpay external script (safe here as it's src based) */}
//         <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
//       </head>
//       <body className={`${poppins.variable} antialiased`}>

//         {/* Google Tag Manager */}
//         <Script id="gtm-init" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','GTM-KQBSZ2Z9');
//           `}
//         </Script>

//         {/* Google Analytics (Gtag) */}
//         <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YLHN7WV840" />
//         <Script id="gtag-init" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-YLHN7WV840');
//           `}
//         </Script>

//         {/* Facebook Pixel */}
//         <Script id="fb-pixel" strategy="afterInteractive">
//           {`
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}(window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');
//             fbq('init', '1925925141537683');
//             fbq('track', 'PageView');
//           `}
//         </Script>

//         {/* GTM NoScript */}
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-KQBSZ2Z9"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           ></iframe>
//         </noscript>

//         {/* Facebook Pixel NoScript */}
//         <noscript>
//           <img
//             height="1"
//             width="1"
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=1925925141537683&ev=PageView&noscript=1"
//           />
//         </noscript>

//         {/* Custom Components */}
//         <CustomCursor />
//         <AdvancedHeader />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }





import { Poppins } from "next/font/google";
import "./globals.css";
import AdvancedHeader from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CursorEffect";
import Script from "next/script";

export const metadata = {
  title: "RC Tech Solutions | Best Web Development & Digital Solutions Agency",
  description:
    "RC Tech Solutions builds high-performing websites and delivers digital excellence through web development, SEO, SMM, and branding expertise.",
  keywords: [
    "RC Tech Solutions",
    "web development company",
    "digital marketing agency",
    "SEO services",
    "branding agency",
    "Next.js development",
    "website design India",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "RC Tech Solutions | Best Web Development & Digital Solutions Agency",
    description:
      "We craft websites that convert, brands that stand out, and strategies that scale — powered by RC Tech Solutions.",
    url: "https://www.rctechsolutions.com",
    siteName: "RC Tech Solutions",
    images: [
      {
        url: "https://www.rctechsolutions.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RC Tech Solutions Website Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.rctechsolutions.com",
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>

      <body className={`${poppins.variable} antialiased`}>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KQBSZ2Z9');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YLHN7WV840"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YLHN7WV840');
          `}
        </Script>

        {/* Meta / Facebook Pixel (Multiple Pixels) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1925925141537683');
            fbq('init', '2322739851486802');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQBSZ2Z9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1925925141537683&ev=PageView&noscript=1"
          />
        </noscript>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2322739851486802&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Layout Components */}
        <CustomCursor />
        <AdvancedHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
