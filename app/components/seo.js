"use client";
import { useState } from "react";

export default function SeoAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/seo-recommendations/route.js", { // Updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching SEO audit:", error);
      alert("Failed to fetch SEO audit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">SEO Audit Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-4 w-full rounded-md bg-gray-800 border border-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md"
          disabled={loading}
        >
          {loading ? "Auditing..." : "Audit Now"}
        </button>
      </form>
      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">SEO Audit Results</h2>
          <pre className="bg-gray-800 p-4 rounded-md">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
