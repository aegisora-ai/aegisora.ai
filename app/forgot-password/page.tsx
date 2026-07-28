"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2, Mail } from "lucide-react";
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
      // Supabase şifre sıfırlama e-postası gönderiyor
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // E-postadaki linke tıklayınca gideceği yer
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Check your email for the password reset link.",
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
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 bg-[#070709] text-white font-sans">
      <div className="w-full max-w-[440px] flex flex-col gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-6 cursor-pointer group"
        >
          <div className="relative w-10 h-10">
            <img
              src="/aegisora-logo-white.png"
              alt="Logo"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src="/aegisora-logo-blue.png"
              alt="Logo Blue"
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <span className="text-3xl font-serif tracking-tight text-gray-200 group-hover:text-[#0066EE] transition-colors">
            Aegisora
          </span>
        </Link>

        {/* Form Kutusu */}
        <div className="w-full bg-[#121215] border border-gray-800/80 rounded-[28px] p-8 shadow-2xl flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-medium tracking-tight mb-1.5">
              Reset Password
            </h1>
            <p className="text-[12px] font-mono text-gray-400">
              Enter your email and we'll send a reset link.
            </p>
          </div>

          {/* Mesaj Gösterimi */}
          {message && (
            <div
              className={`mb-6 p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
                message.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <p>{message.text}</p>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#19191d] border border-gray-800 rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || message?.type === "success"}
              className="w-full py-3.5 bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium text-[13px] rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          <div className="text-center pt-6">
            <Link
              href="/login"
              className="text-xs text-gray-400 font-mono hover:text-white transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
