"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

// Aegisora Spark Symbol
const AegisoraSpark = ({ className = "w-6 h-6 text-blue-400" }) => (
  <motion.div
    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className={`flex-shrink-0 ${className}`}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
    </svg>
  </motion.div>
);

export default function GetStartedCTA() {
  return (
    <section className="relative w-full py-28 px-6 bg-transparent font-sans flex flex-col items-center justify-center z-10 text-white">
      <div className="w-full max-w-[1200px] bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/90 rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] grid grid-cols-1 lg:grid-cols-12">
        {/* Sol Taraf: Koyu Tema Giriş & Kayıt Alanı */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8 bg-zinc-950/80 relative z-10 border-b lg:border-b-0 lg:border-r border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/50 px-3.5 py-1.5 rounded-full">
                Instant Deployment
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight mb-4 leading-tight">
              Get started for free.
            </h2>

            <p className="font-mono text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Deploy your runtime constitution and secure your autonomous AI
              swarms in under 2 minutes.
            </p>
          </div>

          {/* Butonlar */}
          <div className="space-y-3 max-w-md w-full">
            {/* Google ile Devam Et */}
            <Link
              href="/auth/google"
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 rounded-2xl py-3.5 px-6 font-medium text-xs sm:text-sm flex items-center justify-center gap-3 transition-all duration-200 shadow-md cursor-pointer group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </Link>

            {/* E-posta ile Devam Et */}
            <Link
              href="/login"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-3.5 px-6 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <span>Continue with Email</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="font-mono text-[11px] text-zinc-500 text-center pt-2">
              By continuing, you acknowledge Aegisora&apos;s{" "}
              <Link
                href="/terms"
                className="text-zinc-400 underline hover:text-white"
              >
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link
                href="/privacy"
                className="text-zinc-400 underline hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Sağ Taraf: Orbital Güvenlik Simülasyonu & Rozet */}
        <div className="lg:col-span-6 bg-zinc-900/60 p-8 sm:p-12 flex flex-col justify-between items-center relative overflow-hidden min-h-[380px]">
          <div className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent blur-2xl pointer-events-none" />

          {/* Dönen Yörünge ve Spark Görseli */}
          <div className="relative w-64 h-64 flex items-center justify-center my-auto">
            {/* Dış Yörünge Halkası */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-zinc-800 rounded-full border-dashed"
            >
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#60a5fa]" />
            </motion.div>

            {/* İç Yörünge Halkası */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border border-zinc-800/80 rounded-full"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#34d399]" />
            </motion.div>

            {/* Merkez Çekirdek */}
            <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative z-10">
              <AegisoraSpark className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          {/* Alt Güvenlik Durum Barı */}
          <div className="w-full bg-zinc-950/90 border border-zinc-800 rounded-2xl px-5 py-3 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300 font-medium">
                Runtime Shield Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2.5 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" /> SOC2 Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
