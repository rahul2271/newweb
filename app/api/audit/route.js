// /app/api/audit/route.js (App Router)
// OR /pages/api/audit.js (Pages Router)

export async function POST(req, res) {
  try {
    const body = await req.json?.() || req.body; // Handle both App/Pages router
    const { url } = body;

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
    }

    const apiKey = process.env.PAGESPEED_API_KEY; // put your API key in .env.local
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 400 });
    }

    // Extract categories (scores are 0-1, so convert to %)
    const categories = data.lighthouseResult.categories;
    const result = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch audit data." }), { status: 500 });
  }
}
