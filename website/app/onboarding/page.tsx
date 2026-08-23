"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Shield, Cpu } from "lucide-react";

export default function OnboardingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedOption, setSelectedOption] = useState<
    "protect" | "intelligence"
  >("protect");

  return (
    <main
      className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-10 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f4f4f5] text-[#111111]"}`}
    >
      {/* Üst Bar */}
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
          <span className="text-[18px] font-serif tracking-tight mt-0.5">
            Serus
          </span>
        </div>

        <div
          className={`flex items-center p-1 rounded-full border ${isDarkMode ? "border-gray-800 bg-[#141414]" : "border-gray-300 bg-white shadow-sm"}`}
        >
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-1.5 rounded-full transition-colors ${!isDarkMode ? "bg-gray-200 text-black" : "text-gray-400"}`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? "bg-[#222222] text-white" : "text-gray-500"}`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Orta Alan */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-10 text-center">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 border shadow-sm ${isDarkMode ? "bg-[#141414] border-gray-800 text-[#b490ff]" : "bg-white border-gray-200 text-purple-600"}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
          </svg>
        </div>

        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-3">
          Let's get started
        </h1>
        <p
          className={`text-[13px] font-mono mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Choose how you'd like to get started with Serus.
        </p>

        {/* Seçenek Kartları */}
        <div className="flex flex-col gap-4 w-full mb-8">
          <div
            onClick={() => setSelectedOption("protect")}
            className={`p-5 rounded-3xl border text-left cursor-pointer transition-all flex items-start justify-between ${
              selectedOption === "protect"
                ? isDarkMode
                  ? "border-[#b490ff] bg-[#141414]"
                  : "border-black bg-white shadow-md"
                : isDarkMode
                  ? "border-gray-800 bg-[#121212]"
                  : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 mt-1">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-medium block mb-1">
                  I want to protect myself
                </span>
                <span className="text-[11px] font-mono text-purple-400 block mb-1">
                  Best for
                </span>
                <p className="text-xs font-mono text-gray-400 leading-relaxed">
                  Finding what's exposed about you, removing it, and letting
                  Serus keep watch in the background. If something new shows up,
                  you'll know.
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedOption("intelligence")}
            className={`p-5 rounded-3xl border text-left cursor-pointer transition-all flex items-start justify-between ${
              selectedOption === "intelligence"
                ? isDarkMode
                  ? "border-[#b490ff] bg-[#141414]"
                  : "border-black bg-white shadow-md"
                : isDarkMode
                  ? "border-gray-800 bg-[#121212]"
                  : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-[#b490ff] mt-1">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-medium block mb-1">
                  I want to use Intelligence
                </span>
                <span className="text-[11px] font-mono text-purple-400 block mb-1">
                  Best for
                </span>
                <p className="text-xs font-mono text-gray-400 leading-relaxed">
                  Exploring digital footprints, your own or others, and seeing
                  how the pieces connect.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/onboarding/protect/intro" className="w-full max-w-sm">
          <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shadow-sm cursor-pointer">
            Continue
          </button>
        </Link>
      </div>

      <div className="w-full h-4"></div>
    </main>
  );
}
