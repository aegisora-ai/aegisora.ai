"use client";

import { motion } from "framer-motion";

export default function LogoAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-[300px] bg-black">
      <motion.svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M... (Buraya logonun SVG path verileri gelecek) ..."
          stroke="#f4f4f5"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 5, // Tam istediğin gibi 5 saniyelik animasyon süresi
            ease: "easeInOut",
            repeat: Infinity, // Belirli sürede bir tekrarlaması için sürekli döngü
            repeatDelay: 1, // Her bitişte 1 saniye bekleyip tekrar başa sarar
          }}
        />
      </motion.svg>
    </div>
  );
}
