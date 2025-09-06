"use client";

import { useState, useEffect, useRef } from "react";

export default function TextToSpeech({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const [voice, setVoice] = useState(null);

  const synthRef = useRef(null);
  const indexRef = useRef(0);
  const chunksRef = useRef([]);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;

    let voices = synth.getVoices();

    if (!voices.length) {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        selectVoice(voices);
      };
    } else {
      selectVoice(voices);
    }

    function selectVoice(voicesList) {
      const femaleVoice = voicesList.find(
        (v) =>
          v.lang.includes("en") &&
          /female|woman|FEMALE|WOMAN/i.test(v.name + v.voiceURI)
      );
      const defaultVoice = voicesList.find((v) => v.lang.includes("en"));
      setVoice(femaleVoice || defaultVoice || voicesList[0]);
    }

    // Split text by punctuation into chunks
    const sentences = text.match(/[^\.!\?]+[\.!\?]+|\s*[^\.!\?]+$/g) || [];
    const chunks = sentences.map((s) => s.trim()).filter(Boolean);
    chunksRef.current = chunks;
    indexRef.current = 0;

    return () => {
      synth.cancel();
    };
  }, [text]);

  const speakChunk = () => {
    const synth = synthRef.current;
    if (!synth || indexRef.current >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    const chunk = chunksRef.current[indexRef.current];
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "en-IN";

    if (voice) {
      utterance.voice = voice;
    }

    // Add small variations to pitch and rate for more expressiveness
    utterance.rate = 1 + (Math.random() - 0.5) * 0.1; // Slight variation
    utterance.pitch = 1 + (Math.random() - 0.5) * 0.2;

    utterance.onend = () => {
      indexRef.current += 1;
      setTimeout(() => {
        speakChunk();
      }, 200); // small pause between sentences
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handlePlay = () => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    indexRef.current = 0;
    setIsPlaying(true);
    setIsPaused(false);
    speakChunk();
  };

  const handlePause = () => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleResume = () => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.resume();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
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
