"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      ring.style.transform = `translate(${x}px, ${y}px)`
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500 shadow-[0_0_15px_rgba(149,62,226,0.4)] transition-transform duration-75 pointer-events-none z-[9999]"
    />
  )
}
