"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowLeft, Github, Key, Mail, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

function GoogleIcon(props: React.ComponentProps<"svg">) { return (<svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>); }

export default function LoginPage() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { theme } = useTheme();
return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 flex flex-col md:flex-row">

      {/* LEFT SIDE - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative bg-white dark:bg-[#0d0d0f] z-10 shadow-2xl">
        <div className="absolute top-8 left-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="w-full max-w-[400px] mx-auto">
          <Link href="/" className="inline-block mb-10">
            <img src={mounted && theme === 'dark' ? "/aegisora-logo-white.png" : "/aegisora-logo-blue.png"} alt="Aegisora" className="h-10 w-auto" />
          </Link>

          <h1 className="text-[32px] font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-[15px] text-slate-500 mb-8">Sign in to manage your runtime policies and agents.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Email address</label>
              <input type="email" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="name@company.com" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-[12px] font-semibold text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input type="password" className="w-full bg-slate-50 dark:bg-[#1a1a1f] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-[15px] transition-colors shadow-md mt-2">
              Sign in
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
            <span className="text-[12px] text-slate-400 uppercase tracking-widest font-bold">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[14px] font-semibold">
              <Github className="w-5 h-5" /> GitHub
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-[14px] font-semibold">
              <GoogleIcon className="w-5 h-5" /> Google
            </button>
            <div className="pt-2">
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-slate-100 dark:bg-[#1a1a1f] hover:bg-slate-200 dark:hover:bg-white/5 border border-transparent dark:border-slate-800 transition-colors text-[14px] font-bold text-slate-700 dark:text-slate-300">
                <Key className="w-4 h-4" /> Single Sign-On (SAML)
              </button>
            </div>
          </div>

          <p className="text-center text-[14px] text-slate-500 mt-10">
            Don't have an account? <Link href="/contact" className="text-blue-600 font-bold hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Visual / Abstract */}
      <div className="hidden md:flex w-5/12 lg:w-1/2 bg-slate-900 border-l border-slate-800 relative overflow-hidden items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10 max-w-md px-12">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <Fingerprint className="w-8 h-8 text-blue-400" />
          </div>
          <blockquote className="text-[24px] font-bold text-white leading-tight mb-6">
            "Aegisora gave us the confidence to deploy autonomous agents in production without worrying about data exfiltration."
          </blockquote>
          <div>
            <div className="text-[16px] font-bold text-blue-400">Chief Information Security Officer</div>
            <div className="text-[14px] text-slate-400">Fortune 500 Financial Institution</div>
          </div>
        </div>
      </div>

    </div>
  );
}
