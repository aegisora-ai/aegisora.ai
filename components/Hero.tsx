"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Aegisora'nın kurumsal B2B AI vizyonuna uygun daktilo yazıları
const PHRASES = [
  "Monitor autonomous agent telemetry in real-time.",
  "Enforce zero-trust AI governance policies.",
  "Audit LLM prompt injections and data leaks.",
  "Deploy enterprise shield for your AI infrastructure.",
];

// Aegisora'ya Özel Mavi Kıvılcım (AI Spark) Animasyonu
const AegisoraSpark = () => {
  return (
    <motion.div
      animate={{
        rotate: [0, 180, 180, 360],
        scale: [1, 1.25, 0.85, 1],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1],
        repeat: Infinity,
      }}
      className="w-5 h-5 flex-shrink-0 text-[#0066EE]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </motion.div>
  );
};

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  // Typewriter (Yazı yazma/silme) Efekti
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % PHRASES.length;
      const fullText = PHRASES[i];

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1),
      );

      // Yazma hızı (silinirken daha hızlı)
      setTypingSpeed(isDeleting ? 30 : 60);

      // Kelime bittiyse bekle ve silmeye başla
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Yazdıktan sonra 2 saniye bekle
      }
      // Silme bittiyse sıradaki kelimeye geç
      else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Yeni kelimeye başlamadan önce yarım saniye bekle
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 bg-transparent overflow-visible font-sans">
      {/* HAREKETLİ MESH GRADIENT */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0066EE]/25 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/30 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 90, -90, 0],
            y: [0, 90, -90, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-[#60a5fa]/35 blur-[100px]"
        />
      </div>

      {/* Ana İçerik Konteyneri */}
      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center z-10 mx-auto">
        {/* Sol Sütun: Tipografi ve Giriş Kutusu */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-serif text-[#111111] leading-[1.08] tracking-tight mb-6">
            Every AI agent.
            <br />
            Under control.
          </h1>
          <p className="text-slate-600 font-mono text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-8 max-w-md">
            The enterprise governance layer for autonomous systems. We secure
            your AI infrastructure from prompt injections, shadow models, and
            data leaks.
          </p>

          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-[24px] p-4 sm:p-5 w-full max-w-[380px] shadow-sm flex flex-col gap-3">
            <Link href="/get-started" className="w-full">
              <button className="w-full flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#222222] transition-colors text-white py-3 px-4 rounded-xl text-[13px] font-medium cursor-pointer shadow-sm">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </Link>
            <Link href="/get-started" className="w-full">
              <button className="w-full flex items-center justify-center bg-white text-[#111] py-3 px-4 rounded-xl hover:bg-[#f8f9fa] transition-colors text-[13px] font-medium shadow-sm border border-gray-200 cursor-pointer">
                Continue with work email
              </button>
            </Link>
            <p className="text-[10.5px] text-slate-500 text-center leading-relaxed mt-1">
              By continuing, you acknowledge Aegisora's{" "}
              <a
                href="/legal/gdpr"
                className="underline hover:text-[#0066EE] transition-colors"
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                href="/legal/gdpr"
                className="underline hover:text-[#0066EE] transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Sağ Sütun: Özel Görsel Alanı */}
        <div className="relative w-full max-w-[440px] lg:max-w-[460px] mx-auto aspect-square lg:aspect-[4/4.5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,102,238,0.15)] bg-black">
          <Image
            src="/hero-visual.png"
            alt="Aegisora Platform Preview"
            fill
            className="object-cover"
            priority
          />

          {/* Alt Kısımdaki Animasyonlu Sorgu Çubuğu Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="bg-[#2a2a2a]/80 backdrop-blur-xl border border-white/10 rounded-[1.25rem] p-2 pl-4 flex items-center gap-3 shadow-2xl h-[46px]">
              {/* YENİ: Mavi Aegisora AI Kıvılcımı */}
              <AegisoraSpark />

              {/* Typewriter Efektli Yazı Alanı */}
              <div className="text-gray-100 text-[13px] font-medium flex-1 overflow-hidden whitespace-nowrap">
                {currentText}
                <span className="inline-block w-[1.5px] h-3.5 bg-white/70 ml-[2px] animate-pulse align-middle"></span>
              </div>

              <Link href="/get-started">
                <button className="p-2.5 bg-white/10 hover:bg-[#0066EE] rounded-xl transition-colors cursor-pointer flex-shrink-0 group">
                  <ArrowUp className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
