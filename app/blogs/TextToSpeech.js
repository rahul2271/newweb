"use client";

import { useState, useEffect } from "react";

export default function TextToSpeech({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    if (!utterance) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-IN"; // set appropriate language
      setUtterance(u);
    }
  }, [text, utterance]);

  const handlePlay = () => {
    if (utterance) {
      window.speechSynthesis.cancel(); // stop any existing speech
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const handleResume = () => {
    window.speechSynthesis.resume();
    setIsPlaying(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="flex gap-2 mt-2 items-center">
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ▶ Play
        </button>
      ) : (
        <button
          onClick={handlePause}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ⏸ Pause
        </button>
      )}
      <button
        onClick={handleResume}
        className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        🔄 Resume
      </button>
      <button
        onClick={handleStop}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        ⏹ Stop
      </button>
    </div>
  );
}
