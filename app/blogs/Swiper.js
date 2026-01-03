"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

export default function CategorySwiper({ categories = [], active = "All", search = "" }) {
  const wrapRef = useRef(null);

  const hrefFor = useMemo(() => {
    return (cat) =>
      `/blogs?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(search)}&page=1`;
  }, [search]);

  useEffect(() => {
    const el = wrapRef.current?.querySelector?.(`[data-cat="${CSS.escape(active)}"]`);
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [active]);

  const scrollByDir = (dir) => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left/Right buttons (desktop) */}
      <button
        type="button"
        onClick={() => scrollByDir(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 backdrop-blur shadow-sm hover:shadow transition"
        aria-label="Scroll categories left"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={() => scrollByDir(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 backdrop-blur shadow-sm hover:shadow transition"
        aria-label="Scroll categories right"
      >
        ›
      </button>

      {/* Swipe area */}
      <div
        ref={wrapRef}
        className="no-scrollbar flex gap-2 overflow-x-auto py-1 px-1 md:px-12 scroll-smooth"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {categories.map((cat) => {
          const isActive = cat === active;

          return (
            <Link
              key={cat}
              href={hrefFor(cat)}
              prefetch={false}
              data-cat={cat}
              className={[
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm",
                "focus:outline-none focus:ring-4 focus:ring-indigo-100",
                isActive
                  ? "bg-indigo-600 text-white shadow-indigo-200"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
              ].join(" ")}
              style={{ scrollSnapAlign: "center" }}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* subtle fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent md:w-14" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent md:w-14" />
    </div>
  );
}
