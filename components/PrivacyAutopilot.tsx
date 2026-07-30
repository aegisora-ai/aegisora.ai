"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Lock,
  Shield,
  Terminal,
  ShieldAlert,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

// -----------------------------------------
// 1. DİNAMİK BİLEŞEN: ZERO-TRUST PROXY
// -----------------------------------------
const ProxyAnimation = () => (
  <div className="absolute bottom-0 left-0 w-full h-full bg-transparent overflow-hidden flex items-center justify-center">
    <div className="relative w-full h-full flex flex-col items-center justify-start pt-32">
      {/* Merkezdeki Veri Hattı */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-blue-500/20"></div>

      {/* Aşağı Akan Temiz Veri (Mavi) */}
      <motion.div
        animate={{ y: [-20, 250], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"
      />

      {/* Aşağı Akan Riskli Veri (Kırmızı) ve Bloklanma Efekti */}
      <motion.div
        animate={{ y: [-20, 100], opacity: [0, 1, 0], scale: [1, 1, 2] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeOut",
          delay: 1,
        }}
        className="absolute ml-8 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
      />

      <motion.div
        animate={{ y: [-20, 200], opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          delay: 0.5,
        }}
        className="absolute mr-8 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
      />

      {/* Tarama Çizgisi (Scanner Line) */}
      <motion.div
        animate={{ y: [0, 150, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-full max-w-[120px] h-[1px] bg-blue-500/50 shadow-[0_0_15px_#3b82f6] mt-4 relative"
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 border border-blue-400 rotate-45"></div>
      </motion.div>
    </div>
  </div>
);

// -----------------------------------------
// 2. DİNAMİK BİLEŞEN: PII MASKING
// -----------------------------------------
const MaskingAnimation = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-full bg-transparent overflow-hidden p-6 pb-8 flex flex-col justify-end gap-3 font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
          Live Output
        </span>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <Lock className="w-3 h-3" /> Encrypted
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* Satır 1 */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-600">user.email</span>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[12px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded w-fit"
          >
            j***.d**@enterprise.com
          </motion.div>
        </div>
        {/* Satır 2 */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-600">payment.credit_card</span>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            className="text-[12px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded w-fit flex items-center gap-2"
          >
            **** **** **** 4921
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------
// 3. DİNAMİK BİLEŞEN: NEURAL FIREWALL
// -----------------------------------------
const FirewallAnimation = () => (
  <div className="relative mt-8 w-[170px] h-[170px] bg-[#111111] border border-white/5 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
    {/* Dalgalanan Radar (Pulse) Efekti */}
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
      className="absolute w-12 h-12 border border-blue-500/50 rounded-full"
    />
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "easeOut" }}
      className="absolute w-12 h-12 border border-blue-500/50 rounded-full"
    />

    {/* Merkez Kalkan */}
    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/40 rounded-xl flex items-center justify-center z-10 backdrop-blur-sm">
      <Shield className="w-5 h-5 text-blue-400" />
    </div>

    {/* Saldıran Kırmızı Noktalar (Bloklanıyor) */}
    <motion.div
      animate={{ x: [-60, -20], opacity: [0, 1, 0], scale: [1, 1, 2] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="absolute left-1/2 top-1/2 -mt-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
    />
    <motion.div
      animate={{ x: [60, 20], opacity: [0, 1, 0], scale: [1, 1, 2] }}
      transition={{ repeat: Infinity, duration: 1.5, delay: 0.7 }}
      className="absolute right-1/2 top-[40%] -mt-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
    />
  </div>
);

// -----------------------------------------
// 4. DİNAMİK BİLEŞEN: COMMAND CENTER
// -----------------------------------------
const TerminalAnimation = () => (
  <div className="absolute bottom-0 left-0 w-full h-full bg-transparent overflow-hidden p-6 pb-8 flex flex-col justify-end font-mono text-[10px] sm:text-[11px] leading-relaxed">
    {/* Terminal Butonları */}
    <div className="flex gap-1.5 mb-4 relative z-10">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
    </div>

    {/* Kayan Terminal Yazıları */}
    <div className="relative flex-1 overflow-hidden">
      <motion.div
        animate={{ y: [0, -80] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute top-0 left-0 w-full flex flex-col gap-2"
      >
        <p className="text-gray-400">
          <span className="text-blue-500">root@aegisora:~$</span> tail -f
          swarm.log
        </p>
        <p className="text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3" /> [SECURE] Policy deployed to
          Finance_Agent_01
        </p>
        <p className="text-gray-500">
          Analyzing reasoning traces for Agent_04...
        </p>
        <p className="text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-3 h-3" /> [BLOCKED] Unauthorized API tool
          call intercepted.
        </p>
        <p className="text-blue-400">
          [INFO] Masking PII in outbound packet...
        </p>
        <p className="text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3" /> [SECURE] Packet scrubbed and
          released.
        </p>
        <p className="text-gray-500">Awaiting next instruction...</p>
      </motion.div>
    </div>
  </div>
);

export default function PrivacyAutopilot() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [animatedIndex, setAnimatedIndex] = useState(0);

  const toggleCard = (cardName: string) => {
    setActiveCard((prev) => (prev === cardName ? null : cardName));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-28 px-6 bg-transparent font-sans flex flex-col items-center relative z-10">
      {/* Başlık Alanı */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-5xl font-serif text-[#111111] mb-5 tracking-tight">
          Zero-Trust Architecture. Built for scale.
        </h2>
        <p className="font-mono text-[13px] text-gray-500 max-w-lg leading-relaxed mb-8">
          Move beyond passive monitoring. Aegisora actively intercepts reasoning
          traces and enforces security policies across your entire agentic
          ecosystem.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-6 py-2.5 rounded-full transition-all shadow-md cursor-pointer">
            Explore Architecture
          </button>
          <button className="text-gray-600 hover:text-black text-[13px] font-medium px-4 py-2 transition-colors cursor-pointer">
            Read the Docs
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
        {/* 1. Kart: Sol (Zero-Trust Proxy) */}
        <div
          className={`lg:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2rem] relative overflow-hidden flex flex-col items-center p-6 shadow-2xl min-h-[420px] transition-all duration-500 ${animatedIndex === 0 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
        >
          {animatedIndex === 0 && (
            <motion.div
              layoutId="activeStroke"
              className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div
            onClick={() => toggleCard("proxy")}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
          >
            <div className="p-1 bg-gray-100 rounded-lg">
              <Activity className="w-3.5 h-3.5 text-[#0066EE]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                Zero-Trust Proxy
              </span>
              <span className="text-[10px] text-gray-500 font-mono leading-none">
                Click for info
              </span>
            </div>
          </div>

          <AnimatePresence>
            {activeCard === "proxy" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-4 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                  <span className="text-xs font-bold text-gray-900">
                    Active Interception
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                  Zero-latency interception of every reasoning trace and tool
                  call across your autonomous AI ecosystems.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DİNAMİK ANİMASYON */}
          <ProxyAnimation />
        </div>

        {/* 2. Sütun: Orta İki Kart */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Üst Orta: (PII Masking) */}
          <div
            className={`flex-1 bg-[#0a0a0a] border border-white/10 rounded-[2rem] relative overflow-hidden flex flex-col items-center p-6 shadow-2xl min-h-[260px] transition-all duration-500 ${animatedIndex === 1 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
          >
            {animatedIndex === 1 && (
              <motion.div
                layoutId="activeStroke"
                className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div
              onClick={() => toggleCard("masking")}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60"
            >
              <div className="p-1 bg-gray-100 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-[#0066EE]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                  PII Masking
                </span>
                <span className="text-[10px] text-gray-500 font-mono leading-none">
                  Click for info
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === "masking" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-6 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                    <span className="text-xs font-bold text-gray-900">
                      Automated Compliance
                    </span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                    Instantly detect and mask sensitive enterprise data (PII)
                    before it ever reaches external LLM endpoints.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DİNAMİK ANİMASYON */}
            <MaskingAnimation />
          </div>

          {/* Alt Orta: (Neural Firewall) */}
          <div
            className={`flex-1 bg-[#0a0a0a] border border-white/10 rounded-[2rem] relative overflow-hidden flex items-center justify-center p-6 shadow-2xl min-h-[260px] transition-all duration-500 ${animatedIndex === 2 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
          >
            {animatedIndex === 2 && (
              <motion.div
                layoutId="activeStroke"
                className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div
              onClick={() => toggleCard("firewall")}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60 z-30"
            >
              <div className="p-1 bg-gray-100 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#0066EE]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                  Neural Firewall
                </span>
                <span className="text-[10px] text-gray-500 font-mono leading-none">
                  Click for info
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === "firewall" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-6 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                    <span className="text-xs font-bold text-gray-900">
                      Threat Prevention
                    </span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                    Block adversarial prompt injections, jailbreaks, and
                    unauthorized tool calls autonomously in real-time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DİNAMİK ANİMASYON */}
            <FirewallAnimation />
          </div>
        </div>

        {/* 3. Kart: Sağ (Command Center) */}
        <div
          className={`lg:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-[2rem] relative overflow-hidden flex flex-col items-center p-6 shadow-2xl min-h-[420px] transition-all duration-500 ${animatedIndex === 3 ? "ring-2 ring-[#0066EE] shadow-[0_10px_30px_rgba(0,102,238,0.2)]" : ""}`}
        >
          {animatedIndex === 3 && (
            <motion.div
              layoutId="activeStroke"
              className="absolute inset-0 border-2 border-[#0066EE] rounded-[2rem] pointer-events-none z-20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div
            onClick={() => toggleCard("command")}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm z-30 cursor-pointer hover:bg-white transition-all border border-gray-200/60 z-30"
          >
            <div className="p-1 bg-gray-100 rounded-lg">
              <Terminal className="w-3.5 h-3.5 text-[#0066EE]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold text-gray-900 leading-tight">
                Command Center
              </span>
              <span className="text-[10px] text-gray-500 font-mono leading-none">
                Click for info
              </span>
            </div>
          </div>

          <AnimatePresence>
            {activeCard === "command" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-4 top-20 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl z-40 border border-gray-200 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0066EE]"></div>
                  <span className="text-xs font-bold text-gray-900">
                    Operational Oversight
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed font-mono">
                  Centralized operational oversight. Monitor active agents,
                  blocked threats, and zero-trust compliance scores in a single
                  pane of glass.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DİNAMİK ANİMASYON */}
          <TerminalAnimation />
        </div>
      </div>
    </section>
  );
}
