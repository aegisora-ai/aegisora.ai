"use client";

import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full bg-[#050505]">
      {/* 
        GPU Hızlandırmalı Arka Plan:
        Mobil çökmeleri önlemek için hareketler (x, y) döndürmeye (rotate) çevrildi.
        Bulanıklık değerleri (blur) ekran boyutuna göre optimize edildi.
      */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        {/* Sol Üst Orb */}
        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] min-w-[300px] min-h-[300px] rounded-full bg-[#0066EE]/20 blur-[100px] md:blur-[180px] will-change-transform"
        />

        {/* Sağ Orta Orb */}
        <motion.div
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[-10%] w-[70vw] h-[70vw] min-w-[350px] min-h-[350px] rounded-full bg-[#3b82f6]/15 blur-[120px] md:blur-[200px] will-change-transform"
        />

        {/* Sol Alt Orb */}
        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[10%] w-[65vw] h-[65vw] min-w-[320px] min-h-[320px] rounded-full bg-[#0055cc]/15 blur-[100px] md:blur-[190px] will-change-transform"
        />
      </div>
    </div>
  );
}
