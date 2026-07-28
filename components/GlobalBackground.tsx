"use client";

import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      {/* Sayfa boyunca süzülen, bölümleri birbirine bağlayan devasa ve akışkan mavi ışıklar */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -120, 120, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-[#0066EE]/18 blur-[180px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 120, 0],
          y: [0, 150, -150, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#3b82f6]/18 blur-[200px]"
      />
      <motion.div
        animate={{
          x: [0, 90, -90, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.25, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[20%] w-[65vw] h-[65vw] rounded-full bg-[#0055cc]/15 blur-[190px]"
      />
    </div>
  );
}
