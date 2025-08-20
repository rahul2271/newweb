// components/Footer.js
"use client";
import { useState, useEffect } from 'react';
import { Mail, Facebook, Linkedin, Instagram, Bot } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning 👋');
    else if (hour < 18) setGreeting('Good Afternoon ☀️');
    else setGreeting('Good Evening 🌙');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    if (!email.includes('@') || email.length < 6 || email.match(/(test|fake|xyz)/i)) {
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('https://sheetdb.io/api/v1/YOUR_SHEETDB_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [{ email }] }),
      });

      if (response.ok) {
        setEmail('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white text-[#111] px-6 sm:px-12 py-20 font-sans tracking-wide border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-12">

          {/* Brand Info */}
          <div>
            <h3 className="text-3xl font-semibold text-[#953ee2] mb-4">RC Tech Solutions</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              3126, Sector 82,<br />
              JLPL Industrial Area,<br />
              Mohali, Punjab 140306
            </p>
            <p className="mt-2 text-sm text-gray-700">📞 +91 70096-46377</p>
            <p className="text-sm text-gray-700">📧 business@rctechsolutions.com</p>
            <p className="mt-3 text-xs italic text-[#953ee2]">{greeting} — Powered by Team RC</p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-medium text-[#111] mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-[#953ee2] transition">About</a></li>
              
              
              
              <li><a href="/blogs" className="hover:text-[#953ee2] transition">Blogs</a></li>
              <li><a href="/ebook" className="hover:text-[#953ee2] transition">E-Book</a></li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium text-[#111] mb-4">Join AI Digest</h4>
            <p className="text-sm text-gray-600 mb-4">
              Weekly tech, design, and AI updates—elevated.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="you@futuremail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#953ee2]"
                required
              />
              <button
                type="submit"
                className="bg-[#953ee2] hover:bg-[#7e2dd1] text-white px-4 py-2 rounded-full transition"
              >
                <Mail size={16} />
              </button>
            </form>
            {status === 'success' && <p className="text-green-600 text-sm mt-2">You're in! Welcome 🎉</p>}
            {status === 'error' && <p className="text-red-600 text-sm mt-2">Oops! Try a valid email.</p>}
          </div>

          {/* Social + Assistant */}
          <div>
            <h4 className="text-lg font-medium text-[#111] mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/rchauhanweb" target="_blank" className="hover:text-[#953ee2]"><Facebook /></a>
              <a href="https://www.linkedin.com/in/er-rahul-chauhan/" target="_blank" className="hover:text-[#953ee2]"><Linkedin /></a>
              <a href="https://www.instagram.com/rc_tech_solutions/" target="_blank" className="hover:text-[#953ee2]"><Instagram /></a>
            </div>
            <button
              onClick={() => alert("Coming soon: AI Chat Support 🤖")}
              className="flex items-center space-x-2 text-sm text-[#953ee2] hover:text-[#111] transition"
            >
              <Bot size={18} />
              <span>Ask Our AI Assistant</span>
            </button>
            <ul className="space-y-2 mt-4 text-sm text-gray-600">
              <li><a href="/privacy-policy" className="hover:text-[#953ee2]">Privacy Policy</a></li>
              <li><a href="/terms-of-services" className="hover:text-[#953ee2]">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-500 border-t pt-6">
          &copy; {new Date().getFullYear()} <span className="text-[#111] font-semibold">RC Tech Solutions</span> — Elevating Innovation ⚡
        </div>
      </div>
    </footer>
  );
}
