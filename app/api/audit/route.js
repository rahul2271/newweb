export const runtime = "nodejs"; // ✅ avoid Edge timeout

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "Missing URL." }, { status: 400 });
    }

    if (!process.env.PAGESPEED_API_KEY) {
      return Response.json(
        { error: "❌ API Key not found in server environment." },
        { status: 500 }
      );
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${process.env.PAGESPEED_API_KEY}`;

    console.log("📡 Fetching from Google:", apiUrl);

    const res = await fetch(apiUrl, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Google API Error:", data);
      return Response.json(
        { error: data.error?.message || "Google API returned an error." },
        { status: 400 }
      );
    }

    const lighthouse = data.lighthouseResult?.categories;
    if (!lighthouse) {
      return Response.json(
        { error: "No audit results returned from Google." },
        { status: 500 }
      );
    }

    return Response.json({
      performance: Math.round(lighthouse.performance.score * 100),
      accessibility: Math.round(lighthouse.accessibility.score * 100),
      bestPractices: Math.round(lighthouse["best-practices"].score * 100),
      seo: Math.round(lighthouse.seo.score * 100),
    });
  } catch (err) {
    console.error("❌ Server Crash:", err);
    return Response.json(
      { error: "⚠️ Server crashed before completing request." },
      { status: 500 }
    );
  }
}
