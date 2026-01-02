"use client";

import { useEffect, useRef, useState } from "react";
import { fetchMoreBlogs } from "./actions";
import Link from "next/link";
import Image from "next/image";

export default function InfiniteBlogs({ initialBlogs, initialCursor, category }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || loading || done) return;

      setLoading(true);

      const res = await fetchMoreBlogs({ cursor, category });

      if (!res.blogs.length) {
        setDone(true);
      } else {
        setBlogs((prev) => [...prev, ...res.blogs]);
        setCursor(res.cursor);
      }

      setLoading(false);
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [cursor, category, loading, done]);

  return (
    <>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="block border rounded-xl overflow-hidden"
          >
            <div className="relative h-40">
              {blog.blogImageUrl && (
                <Image
                  src={blog.blogImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </section>

      <div ref={loaderRef} className="h-16 flex items-center justify-center">
        {loading && <span>Loading…</span>}
        {done && <span>No more articles</span>}
      </div>
    </>
  );
}
