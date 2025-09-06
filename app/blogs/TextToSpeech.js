"use client";

import { useState, useEffect } from "react";

export default function TextToSpeech({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    setUtterance(u);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    if (utterance && supported) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) {
    return (
      <div className="mt-6 p-4 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 text-center">
        Sorry, your browser doesn’t support voice playback.
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-lg mx-auto">
      <p className="text-center text-gray-700 mb-4 text-sm">
        📖 Don’t feel like reading? Listen to the blog instead.
      </p>
      <div className="flex justify-center gap-3">
        {!isPlaying && !isPaused ? (
          <button
            onClick={handlePlay}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm"
          >
            ▶ Play
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm"
          >
            ⏸ Pause
          </button>
        )}
        <button
          onClick={handleResume}
          disabled={!isPaused}
          className={`px-5 py-2 rounded-xl transition-all duration-200 ${
            isPaused
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          🔄 Resume
        </button>
        <button
          onClick={handleStop}
          className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm"
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}
