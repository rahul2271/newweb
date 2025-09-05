import Link from "next/link";
import Head from "next/head";
import WebinarSlider from "../components/WebinarSlider";

export default async function WebinarList() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/webinars`, { cache: "no-store" });
  const data = await res.json();
  const today = new Date();

  // Pre-format dates to prevent hydration errors
  const webinars = data.map((w) => ({
    ...w,
    formattedDate: new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(w.date)),
  }));

  const getStatus = (webinar) => {
    if (webinar.live) return { text: "Live", color: "bg-green-100 text-green-800" };
    const webinarDate = new Date(webinar.date);
    if (webinarDate.toDateString() === today.toDateString())
      return { text: "Upcoming", color: "bg-blue-100 text-blue-800" };
    if (webinarDate > today) return { text: "Scheduled", color: "bg-gray-100 text-gray-800" };
    return { text: "Past", color: "bg-red-100 text-red-800" };
  };

  return (
    <>
      <Head>
        <title>Upcoming Webinars | RC Tech Solutions</title>
        <meta name="description" content="Join our free webinars on technology, career growth, and AI. Register for live sessions and access exclusive freebies at RC Tech Solutions." />
      </Head>

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": webinars.map((w, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${baseUrl}/webinars/${w.id}`,
            "name": w.title,
            "startDate": w.date,
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "eventStatus": w.live
              ? "https://schema.org/EventLive"
              : new Date(w.date) > today
              ? "https://schema.org/EventScheduled"
              : "https://schema.org/EventCancelled",
            "description": w.description,
          })),
        })}
      </script>

      <main className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white min-h-screen p-6 sm:p-10">
        <h1 className="text-4xl text-black sm:text-5xl font-bold text-center mb-10 sm:mb-14">
          Upcoming Webinars
        </h1>

        {/* Mobile Swiper */}
        <WebinarSlider webinars={webinars} />

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {webinars.map((webinar) => {
            const status = getStatus(webinar);
            return (
              <div key={webinar.id} className="relative group p-8 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:translate-y-3 ease-in-out">
                {webinar.imageUrl && <img src={webinar.imageUrl} alt={webinar.title} className="w-full h-48 object-cover rounded-xl mb-6 group-hover:scale-110 transition-all duration-500" />}
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-2">{webinar.title}</h2>
                <p className="text-sm sm:text-base text-gray-400 mb-4">{webinar.formattedDate}</p>
                <p className="text-sm sm:text-base text-gray-300 line-clamp-3 mb-6">{webinar.description}</p>

                <span className={`absolute top-4 right-4 inline-block px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>{status.text}</span>

                {status.text !== "Past" && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <Link href={`/webinars/${webinar.id}`} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l duration-300 ease-in-out">
                      Register for Free
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Freebies Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Exclusive Freebies</h2>
          <p className="text-lg text-gray-600 mb-6">Download our exclusive eBooks and get free access to a webinar today!</p>
          <Link href="/freebies" className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-black text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
            Grab Your Freebie
          </Link>
        </div>
      </main>
    </>
  );
}
