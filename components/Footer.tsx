"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Aegisora Mavi Kıvılcım Logosu
const AegisoraSpark = () => {
  return (
    <div className="w-5 h-5 flex-shrink-0 text-[#0066EE]" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
      </svg>
    </div>
  );
};

export default function Footer() {
  const footerRef = useRef(null);
  // Animasyonların sadece Footer ekrandayken çalışmasını sağlar
  const isInView = useInView(footerRef, { once: false, margin: "200px" });

  return (
    <footer
      ref={footerRef}
      className="w-full pt-20 pb-12 px-6 bg-transparent font-sans text-slate-600 relative z-10 border-t border-slate-300/40"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* GET STARTED KARTI */}
        <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px] mb-24 relative z-20">
          {/* Sol Taraf: Kayıt / Giriş Alanı */}
          <div className="lg:col-span-6 p-10 sm:p-14 lg:p-16 flex flex-col justify-center items-start relative z-30 bg-white">
            <h2 className="text-4xl sm:text-5xl font-serif text-[#111111] tracking-tight mb-4">
              Get started for free
            </h2>
            <p className="font-mono text-xs sm:text-sm text-slate-500 mb-10 leading-relaxed">
              Deploy your runtime constitution and secure your autonomous AI
              swarms in under 2 minutes.
            </p>

            <div className="w-full space-y-4 max-w-sm">
              <Link
                href="/login"
                className="w-full bg-[#14151a] hover:bg-black text-white py-3.5 px-6 rounded-2xl font-sans text-sm font-medium transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
                  />
                </svg>
                <span>Continue with Google</span>
              </Link>

              <Link
                href="/login"
                className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300/80 py-3.5 px-6 rounded-2xl font-sans text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue with email</span>
              </Link>
            </div>

            <p className="text-[11px] font-mono text-slate-400 mt-8 leading-normal">
              By continuing, you acknowledge Aegisora's{" "}
              <Link href="#" className="underline hover:text-slate-700">
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link href="#" className="underline hover:text-slate-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Sağ Taraf: GPU Hızlandırmalı Animasyonlu Alan */}
          <div className="lg:col-span-6 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center p-12 z-10">
            {/* Arka plan akışkan dalgalar - Sadece Viewport'tayken çalışır */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <motion.div
                animate={
                  isInView
                    ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                        x: [-30, 30, -30],
                        y: [-20, 20, -20],
                      }
                    : { scale: 1, rotate: 0, x: 0, y: 0 }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-blue-600/40 via-indigo-600/30 to-transparent blur-[80px] will-change-transform"
              />
              <motion.div
                animate={
                  isInView
                    ? {
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                        x: [20, -20, 20],
                        y: [20, -20, 20],
                      }
                    : { scale: 1, rotate: 0, x: 0, y: 0 }
                }
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/35 via-cyan-500/20 to-transparent blur-[90px] will-change-transform"
              />
            </div>

            {/* Dönen Geometrik Çemberler */}
            <div className="relative z-10 w-full max-w-[320px] h-[320px] flex items-center justify-center">
              <motion.div
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-blue-500/20 rounded-full flex items-center justify-center will-change-transform"
              >
                <div className="absolute top-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6]"></div>
              </motion.div>

              <motion.div
                animate={isInView ? { rotate: -360 } : { rotate: 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-white/10 rounded-full flex items-center justify-center border-dashed will-change-transform"
              >
                <div className="absolute bottom-0 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_12px_#818cf8]"></div>
              </motion.div>

              <motion.div
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 border border-blue-400/30 rounded-full flex items-center justify-center will-change-transform"
              >
                <div className="absolute right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
              </motion.div>

              <motion.div
                animate={
                  isInView
                    ? { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,102,238,0.3)] will-change-transform"
              >
                <svg
                  className="w-8 h-8 text-blue-400 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.25 1.5L12.75 1.5L12.75 9L19.5 4.5L20.25 5.5L14.25 10.5L22.5 11.25L22.5 12.75L14.25 13.5L20.25 18.5L19.5 19.5L12.75 15L12.75 22.5L11.25 22.5L11.25 15L4.5 19.5L3.75 18.5L9.75 13.5L1.5 12.75L1.5 11.25L9.75 10.5L3.75 5.5L4.5 4.5L11.25 9L11.25 1.5Z" />
                </svg>
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md z-20">
              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Runtime Shield Active</span>
              </div>
              <span className="font-mono text-[10px] text-blue-400">
                SOC2 Ready
              </span>
            </div>
          </div>
        </div>

        {/* Üst Kısım: Logo ve Vizyon Açıklaması */}
        <div className="flex flex-col items-center text-center max-w-xl mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <AegisoraSpark />
            <span className="font-serif text-2xl font-medium text-slate-900 tracking-tight">
              Aegisora
            </span>
          </div>
          <p className="font-mono text-xs leading-relaxed text-slate-500">
            The runtime constitution for autonomous AI organizations. We don't
            just monitor AI; we govern it while it is thinking.
          </p>

          <div className="flex items-center gap-6 mt-6">
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Alt Menü Sütunları */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 pb-16 border-b border-slate-300/40 font-mono text-xs">
          {/* Sütun 1: Company */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Company
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Careers
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
          </div>
          {/* Sütun 2: Help */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Help
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Support
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Status
            </Link>
          </div>
          {/* Sütun 3: Security */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Security
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Our Practices
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              GDPR
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              DPA
            </Link>
          </div>
          {/* Sütun 4: Product */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Product
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Sign up
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              For businesses
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Pricing
            </Link>
          </div>
          {/* Sütun 5: Contact */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Contact
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Contact Sales
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Business inquiry
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Partnership
            </Link>
          </div>
          {/* Sütun 6: Legal */}
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Legal
            </span>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Acceptable Use
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              Subprocessors
            </Link>
          </div>
        </div>

        {/* En Alt Bilgi ve Telif (Copyright & AI Info) */}
        <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>Aegisora by ANON AI Labs, Inc.</div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-900 transition-colors">
              AI Info
            </Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">
              AI Policy
            </Link>
          </div>
          <div>&copy; 2026 Aegisora. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
