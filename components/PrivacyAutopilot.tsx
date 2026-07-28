"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  Watch,
  Cpu,
  AlertTriangle,
  Shield,
  Radar,
} from "lucide-react";

export default function PrivacyAutopilot() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Hangi kartın etrafında dinamik mavi çizginin döndüğünü takip eden state (0, 1, 2, 3)
  const [animatedIndex, setAnimatedIndex] = useState(0);

  const toggleCard = (cardName: string) => {
    setActiveCard((prev) => (prev === cardName ? null : cardName));
  };

  // 3.5 saniyede bir sıradaki karta mavi stroke döngüsü geçişi (Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-28 px-6 bg-transparent font-sans flex flex-col items-center relative z-10">
      {/* Başlık ve Açıklama Alanı */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-5xl font-serif text-[#111111] mb-5 tracking-tight">
          Privacy on autopilot.
        </h2>
        <p className="font-mono text-[13px] text-gray-500 max-w-md leading-relaxed mb-8">
          Aegisora finds, monitors, and removes your exposed personal data -
          automatically.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-6 py-2.5 rounded-full transition-all shadow-md cursor-pointer">
            Sign up for Free
          </button>
          <button className="text-gray-600 hover:text-black text-[13px] font-medium px-4 py-2 transition-colors cursor-pointer">
            For Business
          </button>
        </div>
      </div>

      {/* Bento Grid (Asimetrik Izgara) Alanı */}
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
        {/* 1. Kart: Sol - Telefon Mockup (Find Exposure / Autonomous Surveillance) */}
        <div
          className={`lg:col-span-3 bg-[#e8e8ea] rounded-[2rem] relative overflow-hidden flex flex-col items-center justify-end p-6 shadow-sm min-h-[420px] transition-all duration-500 ${animatedIndex === 0 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
        >
          {animatedIndex === 0 && (
            <motion.div
              layoutId="activeStroke"
              className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div
            onClick={() => toggleCard("find")}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
          >
            <div className="p-1 bg-gray-100 rounded-lg">
              <Radar className="w-3.5 h-3.5 text-[#0066EE]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                Surveillance
              </span>
              <span className="text-[10px] text-gray-500 font-mono leading-none">
                Click for info
              </span>
            </div>
          </div>

          <AnimatePresence>
            {activeCard === "find" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-4 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                  <span className="text-xs font-bold text-gray-900">
                    Autonomous Surveillance
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                  Continuous background monitoring of deep web nodes and public
                  registries to identify where your personal information
                  appears.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-[180px] h-[320px] -mb-10 bg-[#111] rounded-[2rem] border-[6px] border-gray-800 flex flex-col overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0066EE]/30 to-black p-4 flex flex-col items-center">
              <span className="text-white text-[10px] font-bold mt-12 text-center text-blue-400">
                72 Exposures Neutralized
              </span>
              <div className="w-full h-1 bg-blue-500/50 rounded-full mt-2"></div>
              <div className="w-full h-1 bg-blue-500/50 rounded-full mt-2"></div>
            </div>
          </div>
        </div>

        {/* 2. Sütun: Orta İki Kart */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Üst Orta: Monitör (Remove data / Instant Data Erasure) */}
          <div
            className={`flex-1 bg-[#dcdce0] rounded-[2rem] relative overflow-hidden flex items-end justify-center p-6 shadow-sm min-h-[260px] transition-all duration-500 ${animatedIndex === 1 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
          >
            {animatedIndex === 1 && (
              <motion.div
                layoutId="activeStroke"
                className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div
              onClick={() => toggleCard("remove")}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
            >
              <div className="p-1 bg-gray-100 rounded-lg">
                <Trash2 className="w-3.5 h-3.5 text-[#0066EE]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                  Data Erasure
                </span>
                <span className="text-[10px] text-gray-500 font-mono leading-none">
                  Click for info
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === "remove" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-6 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                    <span className="text-xs font-bold text-gray-900">
                      Instant Data Erasure
                    </span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                    Automated GDPR and CCPA removal requests executed in
                    real-time across hundreds of sources without manual work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-[280px] h-[160px] -mb-6 bg-[#111] rounded-t-xl border-[8px] border-b-0 border-gray-800 shadow-xl flex items-center justify-center overflow-hidden">
              <div className="w-full h-full p-4 flex flex-col gap-2 opacity-50">
                <div className="w-1/2 h-2 bg-blue-500/60 rounded-full"></div>
                <div className="w-3/4 h-2 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Alt Orta: Akıllı Saat (Surveillance / AI Perimeter Shield) */}
          <div
            className={`flex-1 bg-[#d5cfc5] rounded-[2rem] relative overflow-hidden flex items-center justify-center p-6 shadow-sm min-h-[260px] transition-all duration-500 ${animatedIndex === 2 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
          >
            {animatedIndex === 2 && (
              <motion.div
                layoutId="activeStroke"
                className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div
              onClick={() => toggleCard("surveillance")}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
            >
              <div className="p-1 bg-gray-100 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#0066EE]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                  Perimeter Shield
                </span>
                <span className="text-[10px] text-gray-500 font-mono leading-none">
                  Click for info
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === "surveillance" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-6 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                    <span className="text-xs font-bold text-gray-900">
                      AI Perimeter Shield
                    </span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                    Proactive alert system deployed directly to your secure
                    endpoints the moment new data exposure risks are detected.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-[110px] h-[130px] bg-[#111] rounded-[2rem] border-[4px] border-gray-400 shadow-2xl flex items-center justify-center relative">
              <span className="text-blue-400 text-[10px] font-mono z-10">
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* 3. Kart: Sağ - Laptop (Intelligence / Deep Threat Intelligence) */}
        <div
          className={`lg:col-span-4 bg-[#e2e2e4] rounded-[2rem] relative overflow-hidden flex items-end justify-center pt-20 px-6 shadow-sm min-h-[420px] transition-all duration-500 ${animatedIndex === 3 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
        >
          {animatedIndex === 3 && (
            <motion.div
              layoutId="activeStroke"
              className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div
            onClick={() => toggleCard("intelligence")}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
          >
            <div className="p-1 bg-gray-100 rounded-lg">
              <Cpu className="w-3.5 h-3.5 text-[#0066EE]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                Intelligence
              </span>
              <span className="text-[10px] text-gray-500 font-mono leading-none">
                Click for info
              </span>
            </div>
          </div>

          <AnimatePresence>
            {activeCard === "intelligence" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-4 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                  <span className="text-xs font-bold text-gray-900">
                    Deep Threat Intelligence
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                  Run deep investigations on any digital footprint using
                  AI-powered OSINT tools to uncover risks and isolate
                  vulnerability vectors.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-[320px] h-[300px] -mb-10 bg-[#0a0a0a] rounded-t-2xl border-t-[8px] border-x-[8px] border-gray-800 shadow-2xl p-6 overflow-hidden relative">
            <div className="font-mono text-[11px] text-gray-400 space-y-2 opacity-80">
              <p>
                <span className="text-[#0066EE]">admin@aegisora</span>:~$ init
                scan
              </p>
              <p>{">"} checking deep web nodes...</p>
              <p>{">"} running cross-reference...</p>
              <p className="text-emerald-400">{">"} 0 new exposures found.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
