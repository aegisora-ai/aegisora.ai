"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function GlobalBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full bg-[#030712]">
      {/*
        GPU-accelerated background:
        Motion is expressed as rotate/scale (not x/y translation) to avoid
        mobile jank. Blur radius is tuned per breakpoint for performance.
        Animation is disabled entirely when the user has requested
        reduced motion at the OS level.
      */}
      <div className="absolute inset-0 opacity-50 mix-blend-screen">
        {/* Top-left orb - Deep Electric Blue */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 90, 0],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] min-w-[300px] min-h-[300px] rounded-full bg-[#0052FF]/15 blur-[120px] md:blur-[200px] will-change-transform"
        />

        {/* Right-middle orb - Subtle Cyber Indigo */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, -90, 0],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] right-[-15%] w-[70vw] h-[70vw] min-w-[350px] min-h-[350px] rounded-full bg-[#1d4ed8]/12 blur-[140px] md:blur-[220px] will-change-transform"
        />

        {/* Bottom-left orb - Midnight Accent */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 90, 0],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-[10%] w-[65vw] h-[65vw] min-w-[320px] min-h-[320px] rounded-full bg-[#2563eb]/10 blur-[130px] md:blur-[210px] will-change-transform"
        />
      </div>
    </div>
  );
}
