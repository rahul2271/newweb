'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function PremiumHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 md:bg-black`}>
      <nav className="w-full px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center text-white font-extrabold text-2xl tracking-tight">
            <img src="/RC Logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="ml-2 hidden sm:inline">RC Tech</span>
          </Link>
        </div>

        <div className="hidden xl:flex gap-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group text-white text-base font-medium"
            >
              <span>{item.name}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#953ee2] to-purple-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link href="/get-started">
            <button className="bg-gradient-to-r from-[#953ee2] to-purple-600 text-white px-6 py-2 rounded-full text-base font-semibold shadow-md hover:scale-105 transition-all">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white p-2 rounded-md hover:bg-white/10 transition"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" className="xl:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-50 bg-[#0f0f0f] px-6 pt-6 pb-10 overflow-y-auto w-full">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 text-white text-xl font-bold">
              <img src="/RC Logo.png" alt="Logo" className="h-8 w-auto" />
              <span>RC Tech</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-10 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/get-started">
              <button className="mt-6 w-full bg-gradient-to-r from-[#953ee2] to-purple-600 text-white px-5 py-3 rounded-full text-lg font-semibold shadow-md">
                Get Started
              </button>
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
