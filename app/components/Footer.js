// components/Footer.js
"use client"
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

    // AI-ish spam filtering (expandable)
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
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-6 sm:px-10 relative overflow-hidden">
      {/* AI Glow */}
      {/* <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div> */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400">RC Tech Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 3126, Sector 82, JLPL Industrial Area, Sahibzada Ajit Singh Nagar, Punjab 140306</li>
              <li>📞 +91 70096-46377</li>
              <li>📧 business@rctechsolutions.com</li>
            </ul>
            <p className="text-xs mt-3 italic text-purple-200">{greeting} – Powered by Team RC </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-purple-400 transition">About</a></li>
              <li><a href="/services" className="hover:text-purple-400 transition">Services</a></li>
              <li><a href="/ai-tools" className="hover:text-purple-400 transition">Our AI Tools</a></li>
              <li><a href="/careers" className="hover:text-purple-400 transition">Careers</a></li>
              <li><a href="/case-studies" className="hover:text-purple-400 transition">Case Studies</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Join AI Digest</h3>
            <p className="text-sm text-gray-400 mb-4">Get cutting-edge tech & AI updates every week.</p>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="you@futuremail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                <Mail size={16} />
              </button>
            </form>
            {status === 'success' && <p className="text-green-400 text-sm mt-2">You're in! Welcome 🎉</p>}
            {status === 'error' && <p className="text-red-400 text-sm mt-2">Oops! Try a valid email.</p>}
          </div>

          {/* Social & AI Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Let’s Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" className="hover:text-purple-400"><Facebook /></a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-purple-400"><Linkedin /></a>
              <a href="https://instagram.com" target="_blank" className="hover:text-purple-400"><Instagram /></a>
            </div>
            <button
              onClick={() => alert("Coming soon: AI Chat Support 🤖")}
              className="flex items-center space-x-2 text-sm text-purple-400 hover:text-white transition"
            >
              <Bot size={18} />
              <span>Ask Our AI Assistant</span>
            </button>
            <ul className="space-y-2 mt-4 text-sm text-gray-400">
              <li><a href="/privacy-policy" className="hover:text-purple-400">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-purple-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} RC Tech Solutions – Innovating with AI ✨
        </div>
      </div>
    </footer>
  );
}
