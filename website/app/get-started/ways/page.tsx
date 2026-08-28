"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Cpu,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Database,
  Globe,
} from "lucide-react";

export default function GetStartedWaysPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Hangi kartın (Intelligence veya Protection) seçili olduğunu tutuyoruz
  const [selectedCard, setSelectedCard] = useState<
    "intelligence" | "protection" | null
  >(null);

  // Akordeon menülerin açılıp kapanma durumları
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false);
  const [isProtectionOpen, setIsProtectionOpen] = useState(false);

  return (
    <main
      className={`min-h-screen w-full flex flex-col justify-between p-6 lg:p-10 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f4f4f5] text-[#111111]"}`}
    >
      {/* Üst Bar: Logo ve Tema Değiştirici */}
      <header className="w-full flex items-center justify-between">
        <Link
          href="/get-started"
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
            <circle cx="7" cy="7" r="1.5" />
            <circle cx="17" cy="17" r="1.5" />
            <circle cx="7" cy="17" r="1.5" />
            <circle cx="17" cy="7" r="1.5" />
          </svg>
          <span className="text-[18px] font-serif tracking-tight mt-0.5">
            Serus
          </span>
        </Link>

        <div
          className={`flex items-center p-1 rounded-full border ${isDarkMode ? "b order-gray-800 bg-[#141414]" : "b order-gray-300 bg-white shado w-sm"}`}
        >
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-1.5 rounded-full transition-colors ${!isDarkMode ? "bg-gray-200 text-black" : "text-gray-400 hover:text-white"}`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? "bg-[#222222] text-white" : "text-gray-500 hover:text-black"}`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Orta Alan: Başlık ve İki Seçenek Kutusu */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-10">
        {/* Ortadaki Logo İkonu */}
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 border shado w-sm ${isDarkMode ? "bg-[#141414] b order-gray-800" : "bg-white b order-gray-200"}`}
        >
          <svg
            className="w-4 h-4 text-[#b490ff]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </div>

        {/* Ana Başlık ve Açıklama */}
        <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-3 text-center">
          Two ways to use Serus
        </h1>
        <p
          className={`text-[13px] font-mono mb-10 text-center max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Explore your own footprint or someone else&apos;s, then protect it manually
          or on autopilot.
        </p>

        {/* 2'li Kart Yapısı (Intelligence & Protection) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
          {/* Kart 1: Intelligence */}
          <div
            onClick={() => setSelectedCard("intelligence")}
            className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCard === "intelligence"
                ? isDarkMode
                  ? "b order-[#b490ff] bg-[#141414]"
                  : "b order-black bg-white shado w-md"
                : isDarkMode
                  ? "b order-gray-800 bg-[#121212] hover:b order-gray-700"
                  : "b order-gray-200 bg-white hover:b order-gray-300 shado w-sm"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-[#b490ff]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-serif font-medium">Intelligence</h2>
              </div>
              <p
                className={`text-[13px] font-mono leading-relaxed mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Three tools for exploring any digital footprint. Each one finds
                something different.
              </p>
            </div>

            {/* Akordeon Butonu ve İçeriği */}
            <div className="w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsIntelligenceOpen(!isIntelligenceOpen);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-[13px] font-medium transition-colors ${
                  isDarkMode
                    ? "b order-gray-800 bg-[#1a1a1a] text-gray-200"
                    : "b order-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                <span>The Intelligence toolkit</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-500/20">
                    3
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isIntelligenceOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              <AnimatePresence>
                {isIntelligenceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflo w-hidden flex flex-col gap-2 mt-2 pt-1"
                  >
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <Sparkles className="w-4 h-4 text-[#b490ff] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-white mb-0.5">
                          Serus AI
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          Ask Serus to search sources and find information.
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <Database className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-white mb-0.5">
                          Source Search
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          Look anything up by name, email, phone, username, or
                          wallet, then pivot into what&apos;s connected.
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <Globe className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-white mb-0.5">
                          Dark Web Scan
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          Swarm billions of leaked records for compromised data
                          tied to an identity.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Kart 2: Protection */}
          <div
            onClick={() => setSelectedCard("protection")}
            className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCard === "protection"
                ? isDarkMode
                  ? "b order-[#b490ff] bg-[#141414]"
                  : "b order-black bg-white shado w-md"
                : isDarkMode
                  ? "b order-gray-800 bg-[#121212] hover:b order-gray-700"
                  : "b order-gray-200 bg-white hover:b order-gray-300 shado w-sm"
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-serif font-medium">Protection</h2>
              </div>
              <p
                className={`text-[13px] font-mono leading-relaxed mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Add your own data markers and let Serus monitor, organize,
                explain, and remove large parts of them automatically.
              </p>
            </div>

            {/* Akordeon Butonu ve İçeriği */}
            <div className="w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProtectionOpen(!isProtectionOpen);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-[13px] font-medium transition-colors ${
                  isDarkMode
                    ? "b order-gray-800 bg-[#1a1a1a] text-gray-200"
                    : "b order-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                <span>The Protection toolkit</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-500/20">
                    4
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isProtectionOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              <AnimatePresence>
                {isProtectionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflo w-hidden flex flex-col gap-2 mt-2 pt-1"
                  >
                    <div
                      className={`p-3 rounded-xl border text-xs ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <span className="font-semibold block text-white mb-0.5">
                        Autopilot data removal
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        Sends legal takedown requests automatically and keeps
                        re-submitting them.
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border text-xs ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <span className="font-semibold block text-white mb-0.5">
                        Continuous monitoring
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        Watches data brokers, the surface web, the dark web, and
                        your accounts around the clock.
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border text-xs ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <span className="font-semibold block text-white mb-0.5">
                        Health Score
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        A 0–100 read on your exposure, broken down by category.
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border text-xs ${isDarkMode ? "b order-gray-800/80 bg-[#161616]" : "b order-gray-200 bg-gray-50"}`}
                    >
                      <span className="font-semibold block text-white mb-0.5">
                        Reputation Score
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        Tracks your online mentions and sentiment, with an AI
                        summary.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Alt Butonlar: Next ve Back */}
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <Link href="/get-started/account" className="w-full">
            <button className="w-full py-3.5 bg-[#b490ff] hover:bg-[#a37bf5] text-black font-medium text-[14px] rounded-full transition-colors shado w-sm cursor-pointer">
              Next
            </button>
          </Link>
          <Link
            href="/get-started"
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
