"use client";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as per your requirement
    };

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Re-check on window resize

    const cursor = document.querySelector(".custom-cursor");
    const cursorRing = document.querySelector(".custom-cursor-ring");
    const particles = document.querySelector(".custom-cursor-particles");

    if (!isMobile) {
      let mouseX = 0,
        mouseY = 0;

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
    } else {
      // Remove any styles or effects if needed
      if (cursor) cursor.style.display = "none";
      if (cursorRing) cursorRing.style.display = "none";
      if (particles) particles.style.display = "none";
    }
  }, [isMobile]);

  if (isMobile) {
    // Do not render the cursor on mobile
    return null;
  }

  return (
    <>
      <div className="custom-cursor"></div>
      <div className="custom-cursor-ring"></div>
      <div className="custom-cursor-particles"></div>
    </>
  );
};

export default CustomCursor;
