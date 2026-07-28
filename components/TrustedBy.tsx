"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
  const logos = [
    {
      name: "Meta",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "CLOUDFLARE",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "Google",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "amazon",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "pwc",
      cls: "font-serif font-bold text-xl sm:text-2xl text-slate-800 italic",
    },
    {
      name: "Vercel",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "Stripe",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
  ];

  return (
    // bg-transparent yaptık ve border çizgilerini kaldırdık
    <section className="w-full py-12 bg-transparent flex flex-col items-center justify-center relative z-10">
      {/* Başlık */}
      <p className="relative z-10 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-10 text-center px-4">
        Trusted by people at leading companies
      </p>

      {/* SÜREKLİ AKAN (LOOP) ŞİRKET LOGOLARI */}
      <div
        className="relative z-10 w-full flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {[...Array(2)].map((_, arrayIndex) => (
            <div
              key={arrayIndex}
              className="flex gap-16 sm:gap-24 items-center px-8 sm:px-12"
            >
              {logos.map((logo, index) => (
                <span
                  key={index}
                  className={`${logo.cls} opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer`}
                >
                  {logo.name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
