// app/layout.js
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import AdvancedHeader from "./components/Header";
import Example from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";
import CustomCursor from "./components/CursorEffect";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KQBSZ2Z9');
            `,
          }}
        />

        {/* Razorpay Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>

      <body className={`${playfairDisplay.variable} antialiased`}>
        {/* Google Tag Manager (noscript) fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQBSZ2Z9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Header */}
        <AdvancedHeader />

        {/* Page Content */}
        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
