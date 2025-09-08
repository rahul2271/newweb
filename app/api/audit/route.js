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

    // Example: Using Google PageSpeed Insights API
    const apiKey = process.env.PAGESPEED_API_KEY; // Add in Vercel → Environment Variables
    const auditUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${apiKey}`;

    console.log("Calling external audit service:", auditUrl);

    const response = await fetch(auditUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Audit API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
