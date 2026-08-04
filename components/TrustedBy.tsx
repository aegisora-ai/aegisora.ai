"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
  // Şirket isimlerini "Müşteri" yalanından çıkarıp,
  // "Entegre Çalıştığımız Ekosistemler" gerçekliğine çektik.
  const logos = [
    {
      name: "OpenAI",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "Anthropic",
      cls: "font-serif font-bold text-xl sm:text-2xl text-slate-800 italic",
    },
    {
      name: "Azure AI",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "AWS Bedrock",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "GitHub",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "Slack",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
    {
      name: "Vercel",
      cls: "font-sans font-bold text-xl sm:text-2xl text-slate-800",
    },
  ];

  return (
    <section className="w-full py-12 bg-transparent flex flex-col items-center justify-center relative z-10 overflow-hidden">
      {/* Başlık: Dürüst ve Kurumsal B2B Mesajı */}
      <p className="relative z-10 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-10 text-center px-4">
        Seamlessly Integrates With Modern Ecosystems
      </p>

      {/* SÜREKLİ AKAN (LOOP) ENTEGRASYON LOGOLARI */}
      <div
        className="relative z-10 w-full flex overflow-hidden pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* GPU Hızlandırması (will-change-transform) eklendi */}
        <motion.div
          className="flex whitespace-nowrap items-center w-max will-change-transform"
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
                  className={`${logo.cls} opacity-40 grayscale transition-all duration-300`}
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
