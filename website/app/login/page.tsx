"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Mail, Lock } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid login credentials.";

      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between py-10 px-4 bg-[#070709] text-white font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Link
          href="/"
          className="flex items-center gap-3 mb-8 cursor-pointer group"
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

        <div className="w-full max-w-[440px] flex flex-col gap-4">
          <div className="w-full bg-[#121215] border border-gray-800/80 rounded-[28px] p-8 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif font-medium tracking-tight mb-1.5">
                Sign in to Aegisora
              </h1>
              <p className="text-[12px] font-mono text-gray-400">
                Welcome back! Please sign in to continue
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
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

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-mono text-[#0066EE] hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#19191d] border border-gray-800 rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors tracking-widest"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-white hover:bg-gray-200 text-black font-medium text-[13px] rounded-xl transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-400 font-mono">
              Don't have an account?{" "}
              <Link
                href="/get-started"
                className="text-white font-medium hover:text-[#0066EE] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
