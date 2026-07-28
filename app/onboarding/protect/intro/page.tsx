"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Search, Trash2, Watch } from "lucide-react";

export default function ProtectIntroPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-10 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f4f4f5] text-[#111111]"}`}
    >
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
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

      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-2">
          Less of you, online.
        </h1>
        <p
          className={`text-[13px] font-mono mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Serus handles the ongoing work for you.
        </p>

        <div className="flex flex-col gap-4 w-full mb-8">
          <div
            className={`p-4 rounded-2xl border text-left flex items-center gap-4 ${isDarkMode ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}`}
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-[#b490ff]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-medium block">
                Find your exposure
              </span>
              <span className="text-xs font-mono text-gray-400">
                Serus scans the internet continuously for your exposure.
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border text-left flex items-center gap-4 ${isDarkMode ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}`}
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-medium block">
                Remove data automatically
              </span>
              <span className="text-xs font-mono text-gray-400">
                Serus submits removal requests automatically where possible.
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-2xl border text-left flex items-center gap-4 ${isDarkMode ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}`}
          >
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Watch className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-medium block">
                Surveillance of your data
              </span>
              <span className="text-xs font-mono text-gray-400">
                Serus alerts you when new findings appear.
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <Link href="/onboarding/protect/light-scan-intro" className="w-full">
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shadow-sm cursor-pointer">
              Continue
            </button>
          </Link>
          <Link
            href="/onboarding"
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
