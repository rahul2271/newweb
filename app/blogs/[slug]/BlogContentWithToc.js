'use client';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';

export default function BlogContentWithToc({ blog, blogId }) {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [processedContent, setProcessedContent] = useState(blog.content || "");
  const [showMobileToc, setShowMobileToc] = useState(false);

  // ✅ Normalize blog.date to a string
  const blogDate = blog?.date?.toDate
    ? blog.date.toDate().toISOString()
    : typeof blog.date === "string"
    ? blog.date
    : null;

  // Process blog content → inject IDs
  useEffect(() => {
    if (!blog.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, 'text/html');

    const headings = [...doc.querySelectorAll('h2, h3')].map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      return {
        id,
        text: heading.textContent,
        level: heading.tagName,
      };
    });

    setToc(headings);
    setProcessedContent(doc.body.innerHTML);
  }, [blog.content]);

  // Active Section detection
  useEffect(() => {
    const headings = toc.map((t) => document.getElementById(t.id));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    headings.forEach((h) => h && observer.observe(h));
    return () => observer.disconnect();
  }, [toc]);

  // Reading Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setReadingProgress((scrollY / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reading time
  const words = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').split(/\s+/).length
    : 0;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      {/* ✅ Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* ✅ Blog Content */}
        <article className="lg:col-span-9 bg-white text-gray-900 shadow-2xl rounded-2xl border border-gray-800 p-8">
          <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span>✍️ {blog.author}</span>
            {blogDate && (
              <span>📅 {new Date(blogDate).toLocaleDateString()}</span>
            )}
            <span>⏱️ {readingTime} min read</span>
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none !transition-none text-gray-900 !animate-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">💬 Leave a Comment</h2>
            <Comments blogId={blogId} />
          </section>
        </article>

        {/* ✅ Desktop TOC */}
        {toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-xl">
              <h2 className="text-lg font-bold mb-4 text-white">📑 On this page</h2>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded transition-all  ${
                        activeId === item.id
                          ? 'text-purple-400 bg-gray-800 border-l-4 border-purple-500 shadow-md'
                          : 'text-gray-300 hover:text-purple-300 hover:bg-gray-800'
                      } ${item.level === 'H3' ? 'ml-4 text-sm' : 'text-base'}`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {/* ✅ Mobile TOC Button */}
      {toc.length > 0 && (
        <button
          onClick={() => setShowMobileToc(true)}
          className="fixed bottom-20 right-6 lg:hidden bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700"
        >
          📑 TOC
        </button>
      )}

      {/* ✅ Mobile TOC Drawer */}
      {showMobileToc && (
        <div className="fixed inset-0 z-50 bg-black/70 flex">
          <div className="w-72 bg-gray-900 h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">📑 On this page</h2>
              <button
                onClick={() => setShowMobileToc(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setShowMobileToc(false)}
                    className={`block px-3 py-2 rounded ${
                      activeId === item.id
                        ? 'text-purple-400 bg-gray-800 border-l-4 border-purple-500'
                        : 'text-gray-300 hover:text-purple-300 hover:bg-gray-800'
                    } ${item.level === 'H3' ? 'ml-4 text-sm' : 'text-base'}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ✅ Back to Top */}
      {readingProgress > 10 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          ⬆️
        </button>
      )}

      {/* ✅ Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .prose * {
          transition: none !important;
          animation: none !important;
        }
        .prose h2,
        .prose h3 {
          scroll-margin-top: 100px;
        }
        .prose p {
          color: black !important;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .prose a {
          color: #a78bfa;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #c4b5fd;
        }
      `}</style>
    </div>
  );
}