"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Scale,
  Monitor,
  Star,
  Eye,
  Users,
  Zap,
  Landmark,
  PenTool,
  FileText,
  UserCheck,
} from "lucide-react";

const changingTexts = [
  "Find the contact details for...",
  "Help me hide my address from public records.",
  "Do an analysis of my exposure.",
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

  // Ortadaki arama çubuğu metninin dönmesini sağlayan efekt
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % changingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sol taraftaki rozetler ve konumları
  const leftBadges = [
    {
      text: "Legal Teams",
      icon: <Scale className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "10%",
      left: "8%",
    },
    {
      text: "Tech Companies",
      icon: <Monitor className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "30%",
      left: "18%",
    },
    {
      text: "Public Figures",
      icon: <Star className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "50%",
      left: "2%",
    },
    {
      text: "Reputation managers",
      icon: <Eye className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "70%",
      left: "12%",
    },
    {
      text: "Board Members",
      icon: <Users className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "88%",
      left: "6%",
    },
  ];

  // Sağ taraftaki rozetler ve konumları
  const rightBadges = [
    {
      text: "Founders",
      icon: <Zap className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "12%",
      right: "8%",
    },
    {
      text: "Financial institutions",
      icon: <Landmark className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "32%",
      right: "2%",
    },
    {
      text: "Journalists",
      icon: <PenTool className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "52%",
      right: "16%",
    },
    {
      text: "Publishers",
      icon: <FileText className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "72%",
      right: "6%",
    },
    {
      text: "Executive leadership",
      icon: <UserCheck className="w-3.5 h-3.5 text-[#0066EE]" />,
      top: "90%",
      right: "14%",
    },
  ];

  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 px-6 bg-transparent font-sans z-10">
      {/* Üst Metin ve Butonlar */}
      <div className="text-center max-w-2xl mb-16 z-20 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight mb-6">
          Made for anyone.
        </h2>

        <p className="font-mono text-gray-600 text-[13px] md:text-[14px] leading-relaxed max-w-[500px] mb-8 font-medium">
          Whether you're protecting yourself, your team, or your entire
          organization — Aegisora keeps your people's data out of the wrong
          hands.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-[#0066EE] hover:bg-[#005bb5] text-white text-[13px] font-medium px-6 py-3 rounded-full transition-colors shadow-md cursor-pointer">
            Sign up for Free
          </button>
          <button className="text-gray-700 hover:text-black text-[13px] font-medium transition-colors px-2 cursor-pointer">
            For Business
          </button>
        </div>
      </div>

      {/* Yüzen Rozetler ve Merkezi Kart Alanı */}
      <div className="relative w-full max-w-[1200px] h-[650px] flex items-center justify-center">
        {/* Masaüstü İçin Sol Rozetler (z-30 ile her zaman önde ve belirgin) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          {leftBadges.map((badge, idx) => (
            <motion.div
              key={`left-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="absolute bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] rounded-full px-5 py-2.5 flex items-center gap-3 text-gray-800 pointer-events-auto hover:bg-white hover:scale-105 transition-all cursor-default"
              style={{ top: badge.top, left: badge.left }}
            >
              <div className="w-6 h-6 rounded-full bg-[#0066EE]/10 flex items-center justify-center">
                {badge.icon}
              </div>
              <span className="text-[13px] font-semibold font-sans tracking-tight">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Masaüstü İçin Sağ Rozetler (z-30 ile her zaman önde ve belirgin) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
          {rightBadges.map((badge, idx) => (
            <motion.div
              key={`right-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="absolute bg-white/90 backdrop-blur-md border border-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] rounded-full px-5 py-2.5 flex items-center gap-3 text-gray-800 pointer-events-auto hover:bg-white hover:scale-105 transition-all cursor-default"
              style={{ top: badge.top, right: badge.right }}
            >
              <div className="w-6 h-6 rounded-full bg-[#0066EE]/10 flex items-center justify-center">
                {badge.icon}
              </div>
              <span className="text-[13px] font-semibold font-sans tracking-tight">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Merkezi Odak Kartı (Arka plan görseli ve Aegisora Chat Barı ile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[380px] h-[540px] bg-[#14151a] rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.3)] z-20 flex flex-col justify-end p-6 border border-white/20"
        >
          {/* Arka Plan Görseli (public klasöründeki lüks görsel veya Unsplash alternatifi) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop')",
            }}
          />

          {/* Derinlik Veren Degrade Katmanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-black/40 to-transparent"></div>

          {/* Kart İçi Etkileşimli Arama Çubuğu (Aegisora Dönen Mavi Sembolü ile) */}
          <div className="relative z-30 w-full bg-[#1c1d24]/90 backdrop-blur-2xl border border-white/20 rounded-[1.25rem] p-2.5 pl-4 flex items-center gap-3 shadow-2xl">
            {/* Dönen Mavi AI Sembolü */}
            <div className="w-5 h-5 rounded-full bg-[#0066EE]/20 flex items-center justify-center">
              <AegisoraSpark isThinking={true} />
            </div>

            {/* Animasyonlu Metin Alanı */}
            <div className="flex-1 relative h-5 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-200 text-[12px] font-mono absolute w-full truncate"
                >
                  {changingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Gönder Butonu */}
            <button className="w-8 h-8 rounded-full bg-[#0066EE] hover:bg-[#005bb5] transition-colors flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer">
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
