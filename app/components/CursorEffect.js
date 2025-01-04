'use client';

import { useEffect } from 'react';

const CursorEffect = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const smokeContainer = document.getElementById('smoke');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMoving = false;

    // Smooth transition towards the mouse
    const smoothMove = () => {
      if (isMoving) {
        cursorX += (mouseX - cursorX) / 8; // Smoothing factor
        cursorY += (mouseY - cursorY) / 8; // Smoothing factor

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(smoothMove);
    };

    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
      }
      generatePowderParticles(e);  // Create particles on mouse move
    };

    // Function to generate particles (powder effect) on mouse move
    const generatePowderParticles = (e) => {
      const particle = document.createElement('div');
      particle.classList.add('cursor-particle');
      particle.style.left = `${e.clientX - 6}px`;
      particle.style.top = `${e.clientY - 6}px`;
      
      smokeContainer.appendChild(particle);

      // Remove the particle after animation ends
      setTimeout(() => {
        smokeContainer.removeChild(particle);
      }, 1000); // Matches the duration of the animation
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Start smooth cursor movement
    smoothMove();

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div id="cursor" className="cursor-dot"></div>
      <div id="smoke" className="cursor-smoke"></div>
    </>
  );
};

export default CursorEffect;
