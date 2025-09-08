

// pages/api/audit.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing URL" });
    }

    // Google PageSpeed Insights API endpoint
    const apiKey = process.env.PAGESPEED_API_KEY; // Add in Vercel → Settings → Environment Variables
    const auditUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${apiKey}`;

    console.log("Auditing:", auditUrl);

    const response = await fetch(auditUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    // Extract useful metrics
    const lighthouse = data.lighthouseResult?.categories;
    const results = {
      performance: lighthouse?.performance?.score * 100 || 0,
      accessibility: lighthouse?.accessibility?.score * 100 || 0,
      bestPractices: lighthouse?.["best-practices"]?.score * 100 || 0,
      seo: lighthouse?.seo?.score * 100 || 0,
    };

    return res.status(200).json(results);
  } catch (error) {
    console.error("Audit API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

