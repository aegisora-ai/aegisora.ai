"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowUp, Sparkles } from "lucide-react";

// Aegisora'nın Özel Mavi Kıvılcımı (Dönen AI Sembolü)
const AegisoraSpark = ({
  className = "w-5 h-5 text-[#0066EE]",
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

export default function ChatMockup() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center px-4 sm:px-6 font-sans overflow-hidden bg-transparent z-10">
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Üst Rozet ve Dönen Mavi Sembol */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-full px-5 py-2 flex items-center gap-2.5 mb-8 border border-white/50 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-[#0066EE]/10 flex items-center justify-center">
            <AegisoraSpark
              className="w-3.5 h-3.5 text-[#0066EE]"
              isThinking={true}
            />
          </div>
          <span className="text-[13px] font-mono text-gray-700 font-medium">
            Autonomous Zero-Trust Shield
          </span>
        </div>

        {/* Ana Başlık */}
        <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif text-[#111111] leading-[1.1] tracking-tight mb-6">
          Intelligence meets absolute privacy.
        </h2>

        {/* Açıklama */}
        <p className="text-gray-600 font-mono text-sm sm:text-base max-w-2xl leading-relaxed mb-14">
          Aegisora intercepts, neutralizes, and scrubs your digital exposure in
          real-time, backed by decentralized encryption.
        </p>

        {/* Mesajlaşma Arayüzü (Chat Mockup Kartı) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-[#14151a]/95 backdrop-blur-3xl border border-white/15 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-6 sm:p-8 text-left space-y-6"
        >
          {/* Chat Başlık / Durum Çubuğu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <AegisoraSpark className="w-4 h-4 text-[#0066EE]" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">
                  Aegisora Core Intelligence
                </h4>
                <p className="text-[11px] text-[#0066EE] font-mono">
                  Encrypted Vector Active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure</span>
            </div>
          </div>

          {/* Konuşma Balonları */}
          <div className="space-y-4 py-2">
            {/* Kullanıcı Mesajı */}
            <div className="flex justify-end">
              <div className="max-w-[80%] px-4.5 py-3 bg-white text-gray-900 rounded-[20px] rounded-tr-sm font-medium text-sm shadow-md">
                Scan my digital footprint for exposed credentials and secure my
                perimeter.
              </div>
            </div>

            {/* AI Yanıtı */}
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-1">
                <AegisoraSpark className="w-3.5 h-3.5 text-[#0066EE]" />
              </div>
              <div className="max-w-[85%] bg-white/5 border border-white/10 text-gray-200 rounded-[20px] rounded-tl-sm p-4 text-sm leading-relaxed space-y-2 backdrop-blur-md">
                <p className="text-gray-100 font-medium">
                  Scan completed successfully.
                </p>
                <p className="text-xs font-mono text-gray-400">
                  • 3 exposed endpoints locked under zero-knowledge encryption.
                  <br />• Public records scrub vector initialized.
                </p>
              </div>
            </div>
          </div>

          {/* Mockup İçindeki Giriş Çubuğu */}
          <div className="pt-2">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 flex items-center gap-3">
              <div className="flex-1 text-xs text-gray-400 font-mono">
                Ask Aegisora to secure another asset...
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0066EE] text-white flex items-center justify-center shadow-md">
                <ArrowUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
