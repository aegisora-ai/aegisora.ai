"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, User, Users } from "lucide-react";

export default function ProtectionScopePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scope, setScope] = useState<"just-me" | "team">("just-me");

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
          Want to protect more than just yourself?
        </h1>
        <p
          className={`text-[13px] font-mono mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Let us know if you&apos;d like to extend protection to your team or
          business.
        </p>

        <div className="flex flex-col gap-4 w-full mb-8">
          <div
            onClick={() => setScope("just-me")}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-center gap-3 ${
              scope === "just-me"
                ? isDarkMode
                  ? "b order-[#b490ff] bg-[#141414]"
                  : "b order-black bg-white shado w-md"
                : isDarkMode
                  ? "b order-gray-800 bg-[#121212]"
                  : "b order-gray-200 bg-white"
            }`}
          >
            <User className="w-4 h-4 text-[#b490ff]" />
            <span className="text-sm font-mono">Just me</span>
          </div>

          <div
            onClick={() => setScope("team")}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-center gap-3 ${
              scope === "team"
                ? isDarkMode
                  ? "b order-[#b490ff] bg-[#141414]"
                  : "b order-black bg-white shado w-md"
                : isDarkMode
                  ? "b order-gray-800 bg-[#121212]"
                  : "b order-gray-200 bg-white"
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-mono">I have a team or business</span>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <Link href="/scan-setup" className="w-full">
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shado w-sm cursor-pointer">
              Continue
            </button>
          </Link>
          <Link
            href="/onboarding/protect/location"
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
