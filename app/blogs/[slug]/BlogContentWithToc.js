'use client';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';

export default function BlogContentWithToc({ blog, blogId }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blog.content;
    const headings = [...tempDiv.querySelectorAll('h2, h3')].map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: heading.tagName,
    }));
    setToc(headings);
  }, [blog.content]);

  return (
    <article className="max-w-5xl mx-auto px-6 py-12 bg-white shadow-xl rounded-lg border border-gray-100">
      {/* ✅ Table of Contents */}
      {toc.length > 0 && (
        <nav className="bg-gray-50 p-5 rounded mb-8 border border-gray-200">
          <h2 className="text-xl font-bold mb-3 text-gray-800">📑 Table of Contents</h2>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 'H3' ? 'ml-4 text-sm' : 'text-base'}>
                <a href={`#${item.id}`} className="text-blue-700 hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* ✅ Blog Content */}
      <div
        className="prose prose-lg max-w-none text-gray-900"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* ✅ Author Info */}
      <p className="mt-8 text-sm text-gray-500 text-right italic">By {blog.author}</p>

      {/* ✅ Comments Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">💬 Leave a Comment</h2>
        <Comments blogId={blogId} />
      </section>

      {/* ✅ Global Typography + Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Poppins', sans-serif;
        }
        .prose h1 {
          font-size: 2.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }
        .prose h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .prose p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 1.25rem;
        }
        .prose ul,
        .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose blockquote {
          border-left: 4px solid #7c3aed;
          background-color: #f9fafb;
          padding: 0.75rem 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.5rem 0;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>
    </article>
  );
}
