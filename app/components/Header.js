'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdvancedHeader() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    }
    if (navbarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // prevent background scroll when menu open
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [navbarOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-10 flex items-center justify-between py-4">
        {/* Animated Logo */}
        <motion.a
          href="#"
          className="flex items-center space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
        >
          <motion.img
            src="./rclogo.png"
            alt="logo"
            className="w-20 max-sm:w-16"
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
          />
          <motion.span
            className="hidden sm:inline text-xl font-bold text-purple-700 select-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            RC Tech Solutions
          </motion.span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-gray-800">
          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#team" className="hover:text-blue-600 transition">
            Team
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Feature
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Blog
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>

          {/* AI Coming Soon Badge */}
          <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse select-none">
            <FiCpu className="mr-1" />
            AI Coming Soon
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {navbarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
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
      aria-label="Mobile Navigation"
      style={{ width: '100vw', height: '100vh' }}
    >
      <button
        aria-label="Close Menu"
        onClick={() => setNavbarOpen(false)}
        className="self-end mb-6 p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <FiX size={28} />
      </button>

      <a href="#" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Home</a>
      <a href="#team" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Team</a>
      <a href="#" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Feature</a>
      <a href="#" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Blog</a>
      <a href="#" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>About</a>
      <a href="#" className="text-2xl font-semibold mb-4 hover:text-blue-600" onClick={() => setNavbarOpen(false)}>Contact</a>

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
