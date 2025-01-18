
"use client"
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const cursorRing = document.querySelector(".custom-cursor-ring");
    const particles = document.querySelector(".custom-cursor-particles");

    let mouseX = 0, mouseY = 0;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move the main cursor and ring
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorRing.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const handleHoverStart = () => {
      cursor.classList.add("hover");
      cursorRing.classList.add("hover");
      particles.classList.add("active");
    };

    const handleHoverEnd = () => {
      cursor.classList.remove("hover");
      cursorRing.classList.remove("hover");
      particles.classList.remove("active");
    };

    // Mouse move and hover events
    document.addEventListener("mousemove", updateCursor);
    const clickableElements = document.querySelectorAll("a, button");
    clickableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updateCursor);
      clickableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="custom-cursor-ring"></div>
      <div className="custom-cursor-particles"></div>
    </>
  );
};

export default CustomCursor;
