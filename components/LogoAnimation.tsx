"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LogoAnimation() {
  const containerRef = useRef(null);
  // Performans: Animasyon sadece ekrandayken çalışır.
  const isInView = useInView(containerRef, { once: false, margin: "50px" });

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-[300px] bg-black overflow-hidden"
      aria-label="Aegisora Animated Logo"
      role="img"
    >
      <motion.svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // GPU Hızlandırma ve erişilebilirlik için gerekli tanımlamalar
        className="will-change-[stroke-dashoffset,opacity]"
      >
        <motion.path
          d="M... (Buraya logonun SVG path verileri gelecek) ..."
          stroke="#f4f4f5"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          // Sadece ekrandayken (isInView) çizim animasyonunu tetikle
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.svg>
    </div>
  );
}
