"use client";
import { useState, useEffect } from "react";

const SEORecommendations = () => {
  const [url, setUrl] = useState("");
  const [seoData, setSeoData] = useState(null);
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/seo-recommendations?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        setSeoData(data);
      } else {
        throw new Error("Failed to fetch SEO data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompetitorComparison = async () => {
    if (!url || !competitorUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/seo-competitor-comparison?url=${encodeURIComponent(url)}&competitorUrl=${encodeURIComponent(competitorUrl)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSeoData((prev) => ({ ...prev, competitorData: data }));
      } else {
        throw new Error("Failed to fetch competitor data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seo-container max-w-screen-xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">SEO Recommendations</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Website URL"
              className="border rounded-lg px-4 py-2 w-2/3"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Get SEO Data
            </button>
          </div>
        </form>

        <form onSubmit={(e) => { e.preventDefault(); handleCompetitorComparison(); }} className="mt-6 space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="url"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="Enter Competitor URL"
              className="border rounded-lg px-4 py-2 w-2/3"
            />
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg">
              Compare with Competitor
            </button>
          </div>
        </form>
      </div>

      {loading && <div className="text-center py-8">Loading SEO data...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}

      {seoData && (
        <>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Website SEO Overview</h2>
            <p><strong>Title:</strong> {seoData.title || 'N/A'}</p>
            <p><strong>Description:</strong> {seoData.description || 'N/A'}</p>
            <p><strong>Website URL:</strong> <a href={seoData.url} target="_blank" className="text-blue-500 hover:underline">{seoData.url}</a></p>
            <p><strong>Canonical Tag:</strong> {seoData.canonical || 'N/A'}</p>
            <p><strong>Meta Keywords:</strong> {seoData.metaKeywords || 'N/A'}</p>
            <p><strong>Alt Tag Coverage:</strong> {seoData.altTagCoverage ? `${seoData.altTagCoverage}%` : 'N/A'}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Page Performance Metrics</h2>
            <p><strong>Page Speed:</strong> {seoData.pageSpeed || 'N/A'}</p>
            <p><strong>Time to First Byte (TTFB):</strong> {seoData.ttfb || 'N/A'}</p>
            <p><strong>Largest Contentful Paint (LCP):</strong> {seoData.lcp || 'N/A'}</p>
            <p><strong>Cumulative Layout Shift (CLS):</strong> {seoData.cls || 'N/A'}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Keyword Insights</h2>
            {seoData.topKeywords && seoData.topKeywords.length > 0 ? (
              <ul>
                {seoData.topKeywords.map((keyword, index) => (
                  <li key={index}>
                    {keyword} (Volume: {seoData.keywordData[keyword]?.volume || 'N/A'}, Difficulty: {seoData.keywordData[keyword]?.difficulty || 'N/A'})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No keyword data available.</p>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Competitor Comparison</h2>
            {seoData.competitorData ? (
              <div>
                <p><strong>Competitor URL:</strong> {seoData.competitorData.url}</p>
                <p><strong>Competitor Page Speed:</strong> {seoData.competitorData.pageSpeed || 'N/A'}</p>
                <p><strong>Competitor Backlinks:</strong> {seoData.competitorData.backlinks || 'N/A'}</p>
              </div>
            ) : (
              <p>No competitor data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SEORecommendations;
