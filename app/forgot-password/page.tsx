"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Check your email for the secure password reset link.",
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to send reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-6 bg-zinc-950 text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
      {/* Arkaplan Işık Efektleri */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,238,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[440px] flex flex-col gap-6 relative z-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-3 group cursor-pointer outline-none mb-2"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <Image
              src="/logo-white.png"
              alt="Aegisora Logo"
              fill
              className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              sizes="36px"
            />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Aegisora
          </span>
        </Link>

        {/* Form Kutusu (Glassmorphism & Dark Mode) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Form İçi İnce Işık Çizgisi */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/40 px-3 py-1 rounded-full mb-3 inline-block">
              Perimeter Security
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif tracking-tight mb-2 text-white">
              Reset Password
            </h1>
            <p className="text-[12px] font-mono text-zinc-400 leading-relaxed">
              Enter your work email and we&apos;ll dispatch a secure recovery
              link.
            </p>
          </div>

          {/* Mesaj Gösterimi */}
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs font-mono ${
                message.type === "success"
                  ? "bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 shadow-sm"
                  : "bg-red-950/40 border border-red-800/50 text-red-400 shadow-sm"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              )}
              <p className="leading-relaxed">{message.text}</p>
            </motion.div>
          )}

          <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                Work email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || message?.type === "success"}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-mono font-medium text-[13px] rounded-xl transition-all shadow-[0_8px_20px_rgba(0,102,238,0.25)] hover:shadow-[0_10px_25px_rgba(0,102,238,0.35)] cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed outline-none uppercase tracking-wider"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          <div className="text-center pt-8 border-t border-zinc-800/80 mt-8">
            <Link
              href="/login"
              className="text-xs font-mono text-zinc-400 hover:text-blue-400 transition-colors outline-none inline-flex items-center gap-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </motion.div>

        {/* Alt Güvenlik Notu */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          End-to-end encrypted recovery gateway
        </div>
      </div>
    </main>
  );
}
