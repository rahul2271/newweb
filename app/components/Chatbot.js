// components/Chatbot.js
'use client'
import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 z-50 w-16 h-16  bg-gradient-to-r from-purple-600 to-blue-600 shadow-xl text-white rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300"
      >
        <span className="text-2xl font-bold">💬</span>
      </div>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-80 max-w-full bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg text-gray-800">Chat with Us!</h4>
            <button
              onClick={toggleChatbot}
              className="text-xl text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Hey! Need help? Ask me anything about our services, or let’s talk about your project.</p>
            <div className="mt-6">
              {/* Live Chat Button */}
              <a
                href="mailto:contact@yourcompany.com" // Replace with live chat or support link
                className="inline-block py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
              >
                Chat with a Human
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
