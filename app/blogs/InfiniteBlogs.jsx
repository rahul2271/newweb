"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InfiniteScroll({ hasNext, nextHref }) {
  const ref = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Reset loading when page param changes
  useEffect(() => {
    setLoading(false);
  }, [searchParams?.get("page")]);

  useEffect(() => {
    if (!ref.current || !hasNext || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoading(true);
          router.push(nextHref, { scroll: false });
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasNext, nextHref, loading, router]);

  return (
    <div ref={ref} className="flex justify-center py-12">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 animate-pulse">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
          Loading more...
        </div>
      )}
    </div>
  );
}
