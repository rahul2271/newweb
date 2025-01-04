
  // app/api/seo-recommendations/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
  
    if (!url) {
      return new Response('URL parameter is required', { status: 400 });
    }
  
    const API_KEY = 'f4347e8ec4a74370ee1325f9b67c2af692a5c3355111919e3c1e05459ee568ba';  // Replace with your actual SerpApi key
    const API_URL = `https://serpapi.com/search.json?q=${encodeURIComponent(url)}&api_key=${API_KEY}`;
  
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
  
      // Check if response contains organic results
      if (!data.organic_results) {
        return new Response('No SEO data found for this website', { status: 404 });
      }
  
      // Structure the data for the frontend
      const seoData = {
        title: data.organic_results[0]?.title || "No title available",
        description: data.organic_results[0]?.snippet || "No description available",
        url: data.organic_results[0]?.link || "",
        keywordRanking: data.search_information?.total_results || "Not Available",
        backlinks: data.related_links || [],
        issues: data.errors || [],
        traffic: {
          // Example structure for traffic-related data (e.g., top keywords, CPC)
          keywords: data.top_keywords || [],
          cpc: data.cpc?.avg || "Not Available",
        }
      };
  
      return new Response(JSON.stringify(seoData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      return new Response('Failed to fetch SEO recommendations', { status: 500 });
    }
  }
  