"use client";
import { useState } from "react";

export default function WebsiteAuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ⚠️ Replace with your actual Google API Key
  const API_KEY = "AIzaSyDRiBdOvuXxWzF2P2QoXmI7Qlbbe_fB_CQ";

  const handleAudit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const auditUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${API_KEY}`;

      const res = await fetch(auditUrl);
      const data = await res.json();

      if (res.ok) {
        const lighthouse = data.lighthouseResult?.categories;
        const results = {
          performance: lighthouse?.performance?.score * 100 || 0,
          accessibility: lighthouse?.accessibility?.score * 100 || 0,
          bestPractices: lighthouse?.["best-practices"]?.score * 100 || 0,
          seo: lighthouse?.seo?.score * 100 || 0,
        };
        setResult(results);
      } else {
        setError(data.error?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to audit service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-gray-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-4 text-center">
          🚀 Free Website Audit
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter your website URL and email to get instant insights.
        </p>

        <form onSubmit={handleAudit} className="space-y-4">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
          />

          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Auditing..." : "Run Free Audit"}
          </button>
        </form>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-300 mb-4 text-center">
              ✅ Audit Results
            </h2>
            <ul className="space-y-2">
              <li>Performance: {result.performance}%</li>
              <li>Accessibility: {result.accessibility}%</li>
              <li>Best Practices: {result.bestPractices}%</li>
              <li>SEO: {result.seo}%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
