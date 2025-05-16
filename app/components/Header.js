'use client'
import { useState } from 'react'
import { Menu, ChevronDown, User } from 'lucide-react'
import Link from 'next/link'

export default function Example() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white   px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="/rclogo.png" className="h-20 w-20 text-2xl font-bold text-purple-700"/>
          

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
          <Link href="/" className="hover:text-purple-700 transition">Home</Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1  transition">
              Services <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border rounded-md shadow-lg p-4 w-48 space-y-2 z-50">
                <Link href="/web-development" className="block hover:text-purple-700">Web Development</Link>
                <Link href="/seo" className="block hover:text-purple-700">SEO</Link>
                <Link href="/marketing" className="block hover:text-purple-700">Digital Marketing</Link>
                <Link href="/design" className="block hover:text-purple-700">Graphics Design</Link>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-purple-700 transition">About</Link>
          <Link href="/contact" className="hover:text-purple-700 transition">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-800 hover:text-purple-700">
            <User size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 px-4 py-3 space-y-2">
          <Link href="/" className="block text-gray-800 hover:text-purple-700">Home</Link>
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center text-gray-800 hover:text-purple-700">
              Services <ChevronDown size={18} />
            </summary>
            <div className="ml-4 mt-2 space-y-1">
              <Link href="/web-development" className="block">Web Development</Link>
              <Link href="/seo" className="block">SEO</Link>
              <Link href="/marketing" className="block">Digital Marketing</Link>
              <Link href="/design" className="block">Graphics Design</Link>
            </div>
          </details>
          <Link href="/about" className="block text-gray-800 hover:text-purple-700">About</Link>
          <Link href="/contact" className="block text-gray-800 hover:text-purple-700">Contact</Link>
        </div>
      )}
    </header>
  )
}
