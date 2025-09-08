export async function POST(req) {
  try {
    const { url } = await req.json();

    console.log("🔍 Incoming URL:", url);
    console.log("🔑 API Key loaded?", !!process.env.PAGESPEED_API_KEY);

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${process.env.PAGESPEED_API_KEY}`;

    console.log("📡 Fetching:", apiUrl);

    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("✅ API Response:", data);

    if (!res.ok) {
      return Response.json({ error: data.error?.message || "API Error" }, { status: 400 });
    }

    return Response.json({
      performance: Math.round(data.lighthouseResult.categories.performance.score * 100),
      accessibility: Math.round(data.lighthouseResult.categories.accessibility.score * 100),
      bestPractices: Math.round(data.lighthouseResult.categories["best-practices"].score * 100),
      seo: Math.round(data.lighthouseResult.categories.seo.score * 100),
    });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return Response.json({ error: "Failed to fetch audit results." }, { status: 500 });
  }
}
