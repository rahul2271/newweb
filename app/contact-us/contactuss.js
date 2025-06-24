import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | RC Tech Solutions</title>
        <meta name="description" content="Contact RC Tech Solutions for expert web development, software consulting, IT services, and digital transformation. Let’s build your next big idea together." />
        <meta name="keywords" content="RC Tech Solutions, Contact, Web Development India, Software Company, IT Consulting, Tech Support" />
        <link rel="canonical" href="https://yourdomain.com/contact" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "mainEntity": {
                "@type": "Organization",
                "name": "RC Tech Solutions",
                "url": "https://yourdomain.com",
                "logo": "https://yourdomain.com/logo.png",
                "email": "support@rctechsolutions.com",
                "telephone": "+91-9876543210",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "654 Sycamore Avenue",
                  "addressLocality": "New Delhi",
                  "addressRegion": "DL",
                  "postalCode": "110001",
                  "addressCountry": "IN"
                }
              }
            }),
          }}
        />
      </Head>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          
          {/* Left Section - Image + Info */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://pagedone.io/asset/uploads/1696488602.png"
              alt="RC Tech Office"
              className="w-full h-full object-cover lg:rounded-l-2xl"
            />
            <h1 className="absolute top-10 left-10 text-white text-4xl font-bold">Contact RC Tech Solutions</h1>

            <div className="absolute bottom-0 w-full bg-white bg-opacity-90 backdrop-blur-lg p-6 lg:p-10 rounded-t-2xl">
              <div className="space-y-4 text-gray-800">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  +91-7009646377
                </div>
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  business@rctechsolutions.com
                </div>
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-4"></span>
                  Mohali, Punjab
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-gray-50 p-6 lg:p-10 rounded-2xl shadow">
            <h2 className="text-indigo-600 text-3xl font-semibold mb-6">Let’s Build Something Great Together</h2>
            <p className="text-gray-600 mb-6">
              Whether you're looking for a new website, IT solution, or digital upgrade — we’re just one message away. Expect a response within 24 hours.
            </p>

            <form method="POST" action="https://sheetdb.io/api/v1/nac4zyu6aoaoz" className="space-y-6">
              <input
                type="text"
                name="data[name]"
                required
                placeholder="Your Name"
                className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <input
                type="email"
                name="data[email]"
                required
                placeholder="Email Address"
                className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <input
                type="text"
                name="data[phone]"
                placeholder="Phone Number"
                className="w-full h-12 border border-gray-200 rounded-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
              />

              <div>
                <h4 className="text-gray-600 font-medium mb-2">Preferred Contact Method</h4>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="data[contact_method]" value="Email" className="mr-2" /> Email
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="data[contact_method]" value="Phone" className="mr-2" /> Phone
                  </label>
                </div>
              </div>

              <textarea
                name="data[message]"
                required
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
