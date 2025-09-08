// app/api/audit/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.lighthouseResult) {
      return NextResponse.json(
        { error: "No audit data returned. Check API key or URL." },
        { status: 500 }
      );
    }

    const categories = data.lighthouseResult.categories;

    return NextResponse.json({
      performance: categories.performance?.score
        ? categories.performance.score * 100
        : "N/A",
      accessibility: categories.accessibility?.score
        ? categories.accessibility.score * 100
        : "N/A",
      bestPractices: categories["best-practices"]?.score
        ? categories["best-practices"].score * 100
        : "N/A",
      seo: categories.seo?.score ? categories.seo.score * 100 : "N/A",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch audit results" },
      { status: 500 }
    );
  }
}
