'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdvancedHeader() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    }

    if (navbarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [navbarOpen]);

  // Scroll to section with sticky navbar offset
  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const yOffset = -80; // adjust for your sticky navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });

      setNavbarOpen(false);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 w-full shadow-sm">
      <div className="container mx-auto px-4 sm:px-10 flex items-center justify-between py-4">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <motion.img
            src="/rclogo.png"
            alt="RC Tech Solutions Logo"
            className="w-[100px]"
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <span className="hidden sm:block text-xs font-medium text-gray-900 mt-1">
            RC Tech Solutions
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-gray-800">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <button onClick={() => scrollToSection('teams')} className="hover:text-blue-600 transition">Brands Associated</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-blue-600 transition">Services</button>
          <Link href="/blogs" className="hover:text-blue-600 transition">Blog</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>

          <div className="flex items-center bg-purple-100 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold animate-pulse select-none">
            <FiCpu className="mr-1" />
            AI is Coming Soon
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {navbarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {navbarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setNavbarOpen(false)}
            aria-hidden="true"
          />
          <nav
            ref={menuRef}
            className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col p-6"
            style={{ width: '100vw', height: '100vh' }}
          >
            <button
              aria-label="Close Menu"
              onClick={() => setNavbarOpen(false)}
              className="self-end mb-6 p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <FiX size={28} />
            </button>

            <Link href="/" className="text-2xl mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Home</Link>
            <button onClick={() => scrollToSection('team')} className="text-2xl mb-4 text-left hover:text-blue-600">Team</button>
            <button onClick={() => scrollToSection('services')} className="text-2xl mb-4 text-left hover:text-blue-600">Services</button>
            <Link href="/blogs" className="text-2xl mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Blog</Link>
            <Link href="/about" className="text-2xl mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>About</Link>
            <Link href="/contact" className="text-2xl mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Contact</Link>

            <div className="flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-lg font-semibold animate-pulse select-none max-w-max mt-20">
              <FiCpu className="mr-2" />
              AI Coming Soon
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
