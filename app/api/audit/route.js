export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!process.env.PAGESPEED_API_KEY) {
      return Response.json(
        { error: "❌ API Key not found in server environment." },
        { status: 500 }
      );
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${process.env.PAGESPEED_API_KEY}`;

    console.log("📡 Fetching:", apiUrl);

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Google API Error:", data);
      return Response.json(
        { error: data.error?.message || "Google API returned an error." },
        { status: 400 }
      );
    }

    return Response.json({
      performance: Math.round(data.lighthouseResult.categories.performance.score * 100),
      accessibility: Math.round(data.lighthouseResult.categories.accessibility.score * 100),
      bestPractices: Math.round(
        data.lighthouseResult.categories["best-practices"].score * 100
      ),
      seo: Math.round(data.lighthouseResult.categories.seo.score * 100),
    });
  } catch (err) {
    console.error("❌ Server Crash:", err);
    return Response.json(
      { error: "⚠️ Server crashed before completing request." },
      { status: 500 }
    );
  }
}
