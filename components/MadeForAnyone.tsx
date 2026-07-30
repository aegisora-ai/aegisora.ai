"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Shield,
  Server,
  Code,
  Globe,
  Cpu,
  Zap,
  Lock,
  TerminalSquare,
  Binary,
  ShieldAlert,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// Enterprise AI Vizyonu İçin Güncellenmiş Komutlar
const changingTexts = [
  "Deploy zero-trust policy to engineering swarm...",
  "Intercept all external tool calls containing PII...",
  "Analyze reasoning traces for shadow model usage...",
];

// Aegisora'nın Özel Mavi Kıvılcımı (Dönen AI Sembolü)
const AegisoraSpark = ({
  className = "w-4 h-4 text-[#0066EE]",
  isThinking = false,
}) => {
  return (
    <motion.div
      animate={
        isThinking
          ? { rotate: [0, 180, 360], scale: [1, 1.2, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={
        isThinking
          ? { duration: 2, ease: "linear", repeat: Infinity }
          : { duration: 0.3 }
      }
      className={`flex-shrink-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </motion.div>
  );
};

export default function MadeForAnyone() {
  const [textIndex, setTextIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ortadaki arama çubuğu metninin dönmesini sağlayan efekt
  useEffect(() => {
    if (isProcessing || isSuccess) return;
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % changingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isProcessing, isSuccess]);

  // Butona tıklanınca çalışacak Görsel Şölen ve /login yönlendirmesi
  const handleProcessAction = () => {
    if (isProcessing || isSuccess) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Başarı göstergesinden sonra login sayfasına yönlendir
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }, 2500);
  };

  // Sol taraftaki Enterprise rozetler ve konumları
  const leftBadges = [
    {
      text: "Security Operations (SecOps)",
      icon: <Shield className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "10%",
      left: "8%",
    },
    {
      text: "AI Infrastructure Teams",
      icon: <Server className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "30%",
      left: "18%",
    },
    {
      text: "Machine Learning Engineers",
      icon: <Code className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "50%",
      left: "2%",
    },
    {
      text: "Enterprise Governance",
      icon: <Globe className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "70%",
      left: "12%",
    },
    {
      text: "Chief Information Security Officers",
      icon: <Cpu className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "88%",
      left: "6%",
    },
  ];

  // Sağ taraftaki Enterprise rozetler ve konumları
  const rightBadges = [
    {
      text: "Data Privacy Officers",
      icon: <Lock className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "12%",
      right: "8%",
    },
    {
      text: "DevSecOps Engineers",
      icon: <TerminalSquare className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "32%",
      right: "2%",
    },
    {
      text: "AI Agent Developers",
      icon: <Binary className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "52%",
      right: "16%",
    },
    {
      text: "Compliance Auditors",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "72%",
      right: "6%",
    },
    {
      text: "Platform Engineering",
      icon: <Zap className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "90%",
      right: "14%",
    },
  ];

  // Kod Bazlı Arka Plan Ağı (Neural Network/Grid Görünümü) İçin
  const renderGridLines = () => {
    const lines = [];
    for (let i = 0; i < 20; i++) {
      lines.push(
        <div
          key={`h-${i}`}
          className="absolute w-full h-[1px] bg-blue-500/10"
          style={{ top: `${(i / 20) * 100}%` }}
        />,
      );
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute h-full w-[1px] bg-blue-500/10"
          style={{ left: `${(i / 20) * 100}%` }}
        />,
      );
    }
    return lines;
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-6 bg-transparent font-sans z-10">
      {/* Üst Metin ve Butonlar */}
      <div className="text-center max-w-3xl mb-16 z-20 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight mb-6">
          Built for AI-Native Enterprises.
        </h2>

        <p className="font-mono text-gray-600 text-[13px] md:text-[14px] leading-relaxed max-w-[600px] mb-8 font-medium">
          Whether you're securing a single agent or governing an entire swarm of
          autonomous systems — Aegisora enforces your constitution at runtime.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-6 py-3 rounded-full transition-colors shadow-md cursor-pointer inline-flex items-center justify-center"
          >
            Explore Architecture
          </Link>
          <Link
            href="/login"
            className="text-gray-700 hover:text-black text-[13px] font-medium transition-colors px-2 cursor-pointer inline-flex items-center"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Yüzen Rozetler ve Merkezi Kart Alanı */}
      <div className="relative w-full max-w-[1200px] h-[650px] flex items-center justify-center">
        {/* Masaüstü İçin Sol Rozetler */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          {leftBadges.map((badge, idx) => (
            <motion.div
              key={`left-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="absolute bg-[#111111]/95 backdrop-blur-md border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.2)] rounded-full px-5 py-2.5 flex items-center gap-3 text-gray-200 pointer-events-auto hover:bg-black hover:border-blue-500/30 hover:scale-105 transition-all cursor-default"
              style={{ top: badge.top, left: badge.left }}
            >
              <div className="w-6 h-6 rounded-full bg-[#0066EE]/20 flex items-center justify-center">
                {badge.icon}
              </div>
              <span className="text-[12px] font-mono tracking-tight">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Masaüstü İçin Sağ Rozetler */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          {rightBadges.map((badge, idx) => (
            <motion.div
              key={`right-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="absolute bg-[#111111]/95 backdrop-blur-md border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.2)] rounded-full px-5 py-2.5 flex items-center gap-3 text-gray-200 pointer-events-auto hover:bg-black hover:border-blue-500/30 hover:scale-105 transition-all cursor-default"
              style={{ top: badge.top, right: badge.right }}
            >
              <div className="w-6 h-6 rounded-full bg-[#0066EE]/20 flex items-center justify-center">
                {badge.icon}
              </div>
              <span className="text-[12px] font-mono tracking-tight">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Merkezi Odak Kartı (Görsel ve Komut Çubuğu İle) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative w-full max-w-[380px] h-[540px] bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden z-20 flex flex-col justify-end p-6 border transition-all duration-500 ${isProcessing ? "border-blue-500/50 shadow-[0_0_50px_rgba(0,102,238,0.3)]" : isSuccess ? "border-emerald-500/50 shadow-[0_0_50px_rgba(52,211,153,0.2)]" : "border-white/10 shadow-2xl"}`}
        >
          {/* Soyut Teknoloji / Profesyonel Dark Mode Arka Plan Görseli */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-lighten"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop')",
            }}
          />

          {/* Geometrik Ağ Arka Planı (Neural Network İlüzyonu) */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30 mix-blend-overlay">
            {renderGridLines()}
          </div>

          {/* İşlem Sırasında Çıkan Lazer Tarama (Scanner) Efekti */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_20px_#3b82f6] z-10"
              />
            )}
          </AnimatePresence>

          {/* İşlem Sırasında Mavi Parlama */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-600/10 mix-blend-screen z-0"
              />
            )}
          </AnimatePresence>

          {/* Derinlik Veren Koyu Degrade Katmanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10"></div>

          {/* İşlem Merkezi Overlay (Processing State) */}
          <AnimatePresence>
            {(isProcessing || isSuccess) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-[85%] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                {isProcessing ? (
                  <>
                    <AegisoraSpark
                      isThinking={true}
                      className="w-10 h-10 text-blue-500 mb-4"
                    />
                    <span className="text-blue-400 font-mono text-[11px] uppercase tracking-widest animate-pulse">
                      Executing Protocol...
                    </span>
                    <span className="text-gray-400 font-mono text-[10px] mt-2 text-center">
                      Intercepting vector signals
                      <br />
                      and applying zero-trust.
                    </span>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                    <span className="text-emerald-400 font-mono text-[11px] uppercase tracking-widest">
                      Redirecting to Login
                    </span>
                    <span className="text-gray-400 font-mono text-[10px] mt-2 text-center">
                      Launching secure gateway...
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kart İçi Etkileşimli Arama Çubuğu */}
          <div className="relative z-30 w-full bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[1.25rem] p-2.5 pl-4 flex items-center gap-3 shadow-2xl">
            {/* Dönen Mavi AI Sembolü */}
            <div className="w-5 h-5 rounded-full bg-[#0066EE]/20 flex items-center justify-center">
              <AegisoraSpark isThinking={!isProcessing && !isSuccess} />
            </div>

            {/* Animasyonlu Metin Alanı */}
            <div className="flex-1 relative h-5 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={
                    isProcessing
                      ? "processing"
                      : isSuccess
                        ? "success"
                        : textIndex
                  }
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`text-[11px] font-mono absolute w-full truncate ${isProcessing ? "text-blue-400" : isSuccess ? "text-emerald-400" : "text-gray-300"}`}
                >
                  <span className="mr-2">{">"}</span>
                  {isProcessing
                    ? "Applying zero-trust matrix..."
                    : isSuccess
                      ? "Redirecting to portal..."
                      : changingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Gönder Butonu */}
            <button
              onClick={handleProcessAction}
              disabled={isProcessing || isSuccess}
              className={`w-8 h-8 rounded-full transition-all flex items-center justify-center flex-shrink-0 shadow-md outline-none
                ${isProcessing || isSuccess ? "bg-[#1a1b23] border border-white/10 cursor-not-allowed" : "bg-[#0066EE] hover:bg-[#005bb5] cursor-pointer"}
              `}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowUp className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
