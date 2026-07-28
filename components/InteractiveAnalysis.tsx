"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

// Aegisora'ya özel yazılıp silinecek cümleler
const SEARCH_PHRASES = [
  "Analyze my digital footprint for vulnerabilities.",
  "Remove my data from public records.",
  "Scan the dark web for exposed credentials.",
  "Or use my intelligence to find things.",
];

// Mavi Kıvılcım (AI Spark) İkonu ve Animasyonu
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

export default function InteractiveAnalysis() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  // Typewriter (Yazı yazma/silme) Efekti
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % SEARCH_PHRASES.length;
      const fullText = SEARCH_PHRASES[i];

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1),
      );

      setTypingSpeed(isDeleting ? 30 : 60);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 bg-transparent overflow-visible font-sans">
      {/* HAREKETLİ MESH GRADIENT */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 80, -80, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0066EE]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#3b82f6]/20 blur-[150px]"
        />
      </div>

      {/* ANA İÇERİK */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-4">
        <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-serif text-[#111111] leading-[1.05] tracking-tight mb-6">
          Find, analyze and secure <br /> any footprint.
        </h2>
        <p className="text-slate-600 font-mono text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
          Navigate your digital footprint. Find, understand, and remove your
          exposed data - all in one place.
        </p>

        {/* ANİMASYONLU YAPAY ZEKÂ ARAMA ÇUBUĞU */}
        <Link href="/ai-chat" className="w-full max-w-2xl">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full p-2.5 pl-6 flex items-center w-full transition-all hover:shadow-[0_8px_30px_rgba(0,102,238,0.15)] hover:bg-white group cursor-pointer">
            {/* Mavi Kıvılcım İkonu */}
            <div className="mr-3">
              <AegisoraSpark />
            </div>

            {/* Yazılıp Silinen Dinamik Metin Alanı */}
            <div className="flex-1 text-left text-[#111] font-medium text-[14px] sm:text-[15px] overflow-hidden whitespace-nowrap">
              {currentText}
              <span className="inline-block w-[1.5px] h-4 bg-[#0066EE] ml-[2px] animate-pulse align-middle"></span>
            </div>

            <button className="w-11 h-11 rounded-full bg-[#f4f8ff] group-hover:bg-[#0066EE] flex items-center justify-center transition-all duration-300 flex-shrink-0 border border-blue-100 group-hover:border-[#0066EE]">
              <ArrowUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}
