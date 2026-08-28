"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, ChevronDown, Check, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  "Deutsch", "English", "Español", "Français", "Italiano",
  "Português", "한국어", "日本語", "简体中文", "繁體中文"
];

export default function SignupPage() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [isVerified, setIsVerified] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVerify = () => {
    setTimeout(() => setIsVerified(true), 600);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f4f4f5] font-sans flex flex-col selection:bg-[#0051c3]/30">

      {/* HEADER */}
      <header className="w-full p-4 sm:p-6 flex items-center justify-between z-20 shrink-0">
        <Link href="/" className="flex items-center group outline-none">
          <img
            src="/aegisora-logo-blue.png"
            alt="Aegisora Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-3 relative">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors bg-transparent border border-transparent hover:border-[#27272a] px-3 py-1.5 rounded-md outline-none"
            >
              <Globe className="w-4 h-4" />
              {selectedLang}
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.1 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-[#18181b] border border-[#27272a] rounded-lg shadow-2xl py-2 z-50"
                >
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang}
                      onClick={() => { setSelectedLang(lang); setIsLangOpen(false); }}
                      className="w-full text-left px-4 py-2 text-[13px] text-[#a1a1aa] hover:text-white hover:bg-[#27272a] flex items-center justify-between transition-colors"
                    >
                      {lang}
                      {selectedLang === lang && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="#" className="border border-[#27272a] hover:bg-[#18181b] text-[13px] font-medium text-white px-4 py-1.5 rounded-md transition-colors outline-none">
            Support
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-[440px] mx-auto z-10 pb-12 pt-4">

        <h1 className="text-[26px] leading-tight font-bold text-white tracking-tight mb-8 text-center px-4">
          Build, protect, and connect with Aegisora
        </h1>

        <div className="w-full flex flex-col gap-3 mb-6">
          <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#3f3f46] hover:bg-[#18181b] rounded-md py-2.5 transition-colors outline-none">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="text-[13px] font-bold text-[#d4d4d8]">Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#3f3f46] hover:bg-[#18181b] rounded-md py-2.5 transition-colors outline-none">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.689.827-1.338 2.337-1.144 3.714 1.338.104 2.715-.688 3.431-1.702z"/></svg>
            <span className="text-[13px] font-bold text-[#d4d4d8]">Continue with Apple</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#3f3f46] hover:bg-[#18181b] rounded-md py-2.5 transition-colors outline-none">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <span className="text-[13px] font-bold text-[#d4d4d8]">Continue with GitHub</span>
          </button>
        </div>

        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#f4f4f5]">Email</label>
            <input
              type="email"
              className="w-full bg-[#111113] border border-[#3f3f46] focus:border-[#0051c3] rounded-md px-3 py-2 text-[14px] text-white outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#f4f4f5]">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-[#111113] border border-[#3f3f46] focus:border-[#0051c3] rounded-md pl-3 pr-10 py-2 text-[14px] text-white outline-none transition-colors"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 mt-1 cursor-pointer group w-fit">
            <div className="w-4 h-4 rounded border border-[#3f3f46] bg-white flex items-center justify-center">
              <Check className="w-3 h-3 text-black" strokeWidth={3} />
            </div>
            <span className="text-[13px] text-[#d4d4d8] group-hover:text-white transition-colors">Save email and login method on this device</span>
          </label>

          {/* TURNSTILE CAPTCHA */}
          <div className="mt-2">
            <p className="text-[13px] text-[#d4d4d8] mb-2">Let us know you are human</p>
            <div className="w-full border border-[#3f3f46] bg-[#1c1c1f] rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleVerify}
                  className={`w-6 h-6 rounded border flex items-center justify-center transition-colors outline-none ${isVerified ? 'border-[#0051c3] bg-[#0051c3]/10' : 'border-[#52525b] hover:border-white'}`}
                >
                  {isVerified && <Check className="w-4 h-4 text-[#0051c3]" />}
                </button>
                <span className="text-[13px] text-white font-medium">Verify you are human</span>
              </div>
              <div className="flex flex-col items-end opacity-80">
                <img
                  src="/aegisora-logo-blue.png"
                  alt="Aegisora Secure"
                  className="h-3.5 w-auto mb-1"
                />
                <div className="flex items-center gap-1.5 text-[9px] text-[#a1a1aa]">
                  <Link href="#" className="hover:underline">Privacy</Link>
                  <span>•</span>
                  <Link href="#" className="hover:underline">Terms</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <p className="text-[12px] text-[#71717a]">
              By continuing, I agree to Aegisora&apos;s <Link href="#" className="text-[#d4d4d8] underline underline-offset-2 hover:text-white font-semibold">terms</Link>, <Link href="#" className="text-[#d4d4d8] underline underline-offset-2 hover:text-white font-semibold">privacy policy</Link>, and <Link href="#" className="text-[#d4d4d8] underline underline-offset-2 hover:text-white font-semibold">cookie policy</Link>.
            </p>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-[#3f3f46] bg-transparent flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:border-[#0051c3] transition-colors">
              </div>
              <span className="text-[12px] text-[#71717a] leading-tight group-hover:text-[#a1a1aa] transition-colors">
                [Optional] I would like to receive occasional email updates and special offers for Aegisora products, services, and events.
              </span>
            </label>
          </div>

          <Link href="/dashboard" className="w-full bg-[#0051c3] hover:bg-[#0046a8] text-white rounded-md py-2.5 text-[15px] font-medium mt-2 transition-colors flex items-center justify-center outline-none">
            Sign up
          </Link>

          <p className="text-center mt-4 text-[13px] text-[#a1a1aa]">
            Already have an account? <Link href="/login" className="text-white font-bold hover:underline underline-offset-2">Log in</Link>
          </p>

        </form>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-6 flex flex-col items-center justify-center gap-4 mt-auto border-t border-[#27272a] bg-[#000000]">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-[#d4d4d8]">
          <Link href="#" className="hover:text-white transition-colors font-medium">Support</Link>
          <span className="text-[#3f3f46]">|</span>
          <Link href="#" className="hover:text-white transition-colors font-medium">System Status</Link>
          <span className="text-[#3f3f46]">|</span>
          <Link href="#" className="hover:text-white transition-colors font-medium">Careers</Link>
          <span className="text-[#3f3f46]">|</span>
          <Link href="#" className="hover:text-white transition-colors font-medium">Terms of Use</Link>
          <span className="text-[#3f3f46]">|</span>
          <Link href="#" className="hover:text-white transition-colors font-medium">Report Security Issues</Link>
          <span className="text-[#3f3f46]">|</span>
          <Link href="#" className="hover:text-white transition-colors font-medium">Privacy Policy</Link>
          <span className="text-[#3f3f46]">|</span>
          <button className="flex items-center gap-1.5 text-[#3b82f6] hover:text-[#60a5fa] transition-colors font-medium outline-none">
            <div className="bg-[#3b82f6] text-white flex items-center justify-center px-[3px] py-[2px] rounded-[2px] gap-[1px]">
              <Check className="w-2.5 h-2.5" strokeWidth={3} /><X className="w-2.5 h-2.5" strokeWidth={3} />
            </div>
            Cookie Preferences
          </button>
        </div>
        <div className="text-[12px] text-[#71717a]">
          © 2026 Aegisora, Inc.
        </div>
      </footer>

    </div>
  );
}
