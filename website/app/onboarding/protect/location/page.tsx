"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Store, Lock, ChevronDown } from "lucide-react";

export default function ProtectLocationPage() {
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
          className={`flex items-center p-1 rounded-full border ${isDarkMode ? "b order-gray-800 bg-[#141414]" : "b order-gray-300 bg-white"}`}
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
        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-2">
          Where are you based?
        </h1>
        <p
          className={`text-[13px] font-mono mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Serus will start the search there.
        </p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161619] border b order-gray-800 text-[11px] font-mono text-gray-400 mb-8">
          <Store className="w-3 h-3 text-amber-400" />
          <span>Helps target broker scans</span>
        </div>

        <div className="flex flex-col gap-1.5 w-full text-left mb-8">
          <label className="text-xs font-mono text-gray-400">Country*</label>
          <div className="relative">
            <select className="w-full bg-[#141417] border b order-gray-800 rounded-xl px-3.5 py-3 text-xs text-white appearance-none focus:outline-none focus:b order-gray-600 cursor-pointer">
              <option value="">Select country</option>
              <option value="DE">Germany</option>
              <option value="TR">Turkey</option>
              <option value="US">United States</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-3 mb-10">
          <Link
            href="/onboarding/protection-scope?from=protect-location"
            className="w-full"
          >
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shado w-sm cursor-pointer">
              Continue
            </button>
          </Link>
          <Link
            href="/onboarding/protect/identity"
            className="text-xs font-medium text-gray-400 hover:text-white transition-colors py-1"
          >
            Back
          </Link>
        </div>

        <div className="w-full bg-[#0d1c14] border b order-emerald-900/30 rounded-2xl p-4 text-left font-mono text-xs text-emerald-400/90 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Lock className="w-4 h-4" />
            <span>Built on trust.</span>
          </div>
          <p className="text-[11px] text-gray-400">
            • We will never sell any user information or data.
          </p>
          <p className="text-[11px] text-gray-400">
            • All data is encrypted in transit and when stored.
          </p>
        </div>
      </div>

      <div className="w-full h-4"></div>
    </main>
  );
}
