"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export default function LightScanIntroPage() {
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
          className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${isDarkMode ? "bg-[#141414] border-gray-800 text-[#b490ff]" : "bg-white border-gray-200 text-purple-600"}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>

        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-2">
          Three steps to start.
        </h1>
        <p
          className={`text-[13px] font-mono mb-10 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          This is what we&apos;re going to do in this onboarding.
        </p>

        {/* Adım Listesi */}
        <div className="flex flex-col gap-6 w-full text-left mb-10">
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-300 flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="text-sm font-medium block text-white mb-0.5">
                Quick scan
              </span>
              <span className="text-xs font-mono text-gray-400">
                Serus finds the trivial, high-risk exposures most people have.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-300 flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="text-sm font-medium block text-white mb-0.5">
                First removal
              </span>
              <span className="text-xs font-mono text-gray-400">
                Serus walks you through clearing your first exposures.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-[#222] border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-300 flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <span className="text-sm font-medium block text-white mb-0.5">
                Deep scan
              </span>
              <span className="text-xs font-mono text-gray-400">
                Run a deeper scan to find extensive exposure based on your
                preferences.
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <Link href="/onboarding/protect/identity" className="w-full">
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shadow-sm cursor-pointer">
              Continue
            </button>
          </Link>
          <Link
            href="/onboarding/protect/intro"
            className="text-xs font-medium text-gray-400 hover:text-white transition-colors py-1"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="w-full h-4"></div>
    </main>
  );
}
