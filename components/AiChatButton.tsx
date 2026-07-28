"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Aegisora'ya Özel Mavi Kıvılcım (AI Spark) Animasyonu
const AegisoraSpark = () => {
  return (
    <motion.div
      // Snap & Breathe efekti: Kesik kesik döner ve nefes alır
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
      className="w-6 h-6 flex-shrink-0 text-[#0066EE]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </motion.div>
  );
};

export default function AiChatButton() {
  return (
    // fixed ve z-[9999] sayesinde sayfanın en üstünde ve her zaman görünür kalır
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* İleride yapacağımız AI Chat sayfasına yönlendirecek link */}
      <Link href="/ai-chat">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 bg-[#111111] border border-white/10 rounded-full shadow-[0_8px_30px_rgba(0,102,238,0.25)] hover:shadow-[0_8px_30px_rgba(0,102,238,0.5)] transition-shadow duration-300 cursor-pointer group"
        >
          <AegisoraSpark />

          {/* Üzerine gelince çıkan "Ask Aegisora" minik tooltiği (İsteğe bağlı, çok şık durur) */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111111] border border-white/10 rounded-lg text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
            Ask Aegisora AI
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
