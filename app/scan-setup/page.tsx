"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Radio } from "lucide-react";

export default function ScanSetupPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-10 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f4f4f5] text-[#111111]"}`}
    >
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span className="text-[18px] font-serif tracking-tight mt-0.5">
            Serus
          </span>
        </div>
        <div
          className={`flex items-center p-1 rounded-full border ${isDarkMode ? "border-gray-800 bg-[#141414]" : "border-gray-300 bg-white"}`}
        >
          <button
            onClick={() => setIsDarkMode(false)}
            className="p-1.5 rounded-full text-gray-400"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className="p-1.5 rounded-full text-white bg-[#222]"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full py-10 text-center">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${isDarkMode ? "bg-[#141414] border-gray-800 text-[#b490ff]" : "bg-white border-gray-200 text-purple-600"}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>

        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-3">
          Ready when you are.
        </h1>
        <p
          className={`text-[13px] font-mono mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Hit start. Serus takes it from here.
        </p>

        <div className="w-full max-w-sm flex flex-col items-center gap-3 mb-4">
          <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Start Scan</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-gray-500">
          ⏱️ Takes about a minute
        </span>
      </div>

      <div className="w-full h-4"></div>
    </main>
  );
}
